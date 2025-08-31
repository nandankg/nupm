import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducer/redux/tableDataSlice";
import dayjs from "dayjs";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import TableStructure from "../../component/TableStructure";
import PDFExportComponent from "../../component/PDFExportComponent";
import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import { linedefect } from "../../data/tableColumns";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const LinedefectList = () => {
  const dispatch = useDispatch();

  const [slug, setSlug] = useState(getLastParameter().trim());
  const axlecounter = useSelector((state) => state.data);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  console.log(fromDate);

  // Fetch data when the component mounts
   useEffect(() => {
       const delayedFunction = () => {
         dispatch(fetchData({ formType: slug }));
       };
   
       // Set a timeout to call the function after 3 seconds
       const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds
   
       // Clean up the timeout if the component unmounts before the delay
       return () => clearTimeout(timeout); // Cleanup interval on unmount
      }, [dispatch]);

  // Update items and filteredItems when data changes
  useEffect(() => {
    if (axlecounter.data?.data) {
      setItems(axlecounter.data.data);
      setFilteredItems(axlecounter.data.data);
    }
  }, [axlecounter]);

  // Filter data based on search and date filters
  useEffect(() => {
    const newData = filterTableData(
      items,
      searchValue,
      fromDate,
      toDate,
      linedefect
    );
    setFilteredItems(newData);
  }, [items, searchValue, fromDate, toDate]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Pagination change handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h1> Line Defect List </h1>

      {/* Filter Bar */}
      <ReusableFilterBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      {/* Table Structure */}
      <TableStructure
        columns={linedefect}
        currentItems={currentItems}
        slug={slug}
      />

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="LineDefect list.pdf"
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default LinedefectList;

// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import { fetchData, saveData } from "../../reducer/monika/LineDefectReducer";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import dayjs from "dayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { RiFileExcel2Fill } from "react-icons/ri";
// import { DownloadTableExcel } from "react-export-table-to-excel";
// import { usePDF } from "react-to-pdf";
// import { MdPictureAsPdf } from "react-icons/md";
// const LinedefectList = () => {
//   const tableRef = useRef(null);
//   const { toPDF, targetRef } = usePDF({
//     filename: "LineDefect list.pdf",
//   });
//   const user = JSON.parse(localStorage.getItem("userdata"));

//   const [fromDate, setFromDate] = useState();
//   const [toDate, setToDate] = useState();
//   const [searchValue, setSearchValue] = useState("");
//   const [currentPage, setCurrentPage] = useState(1); // Pagination state
//   const itemsPerPage = 5; // Items per page
//   const dispatch = useDispatch();
//   const [slug, setSlug] = useState("");

//   console.log(slug);
//   const LinedefectList = useSelector((state) => state.Linedefect);
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);

//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);
//   useEffect(() => {
//     if (LinedefectList.data && LinedefectList.data.data) {
//       setItems(LinedefectList.data.data);
//       setFilteredItems(LinedefectList.data.data);
//       setSlug(LinedefectList.slug);
//     }
//   }, [LinedefectList]);

//   useEffect(() => {
//     handleFilter();
//   }, [searchValue, fromDate, toDate]);

//   const handleFilter = () => {
//     const newData = items.filter((row) => {
//       const empNo = row.empNo ? row.empNo.toLowerCase() : "";
//       const location = row.location ? row.location.toLowerCase() : "";
//       const reportedTime = row.reportedTime
//         ? row.reportedTime.toLowerCase()
//         : "";
//       const trainNo = row.trainNo ? row.trainNo.toLowerCase() : "";
//       const date = dayjs(row.date);

//       const isInDateRange =
//         fromDate && toDate
//           ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
//             (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
//           : true;
//       return (
//         (empNo.includes(searchValue.toLowerCase()) ||
//           location.includes(searchValue.toLowerCase()) ||
//           reportedTime.includes(searchValue.toLowerCase()) ||
//           trainNo.includes(searchValue.toLowerCase())) &&
//         isInDateRange
//       );
//     });

//     setFilteredItems(newData);
//     setCurrentPage(1); // Reset to the first page after filtering
//   };
//   const handleSave = (id) => {
//     dispatch(saveData(id));
//   };

//   console.log(items);

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="container">
//       <div role="presentation " className="bredcrumbs">
//         <Breadcrumbs aria-label="breadcrumb">
//           <Link underline="hover" color="inherit">
//             Line Defect List
//           </Link>
//           <Link underline="hover" color="inherit">
//             List
//           </Link>
//         </Breadcrumbs>
//       </div>
//       {/* <h3> Line Defect Register List</h3>
//       <span className="line-box"></span> */}
//       <div className="d-flex justify-content-between align-items-center">
//         <input
//           type="search"
//           name="search"
//           onChange={(e) => setSearchValue(e.target.value)}
//           placeholder="Search Here."
//         />
//         <div className="d-flex align-items-center gap-3">
//           <div className="date-box">
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="From Date"
//                 value={fromDate}
//                 onChange={(newValue) =>
//                   setFromDate(newValue ? newValue.startOf("day") : null)
//                 }
//                 sx={{
//                   ".MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: "#00b3a1",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#00b3a1",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#00b3a1",
//                     },
//                   },
//                 }}
//               />
//               <DatePicker
//                 label="To Date"
//                 value={toDate}
//                 onChange={(newValue) =>
//                   setToDate(newValue ? newValue.endOf("day") : null)
//                 }
//                 sx={{
//                   ".MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: "#00b3a1",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#00b3a1",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#00b3a1",
//                     },
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </div>

//           <div className="d-flex gap-3">
//             <Link to="">
//               {/* <button className="btn btn-primary">
//               <FaFilter />
//             </button> */}
//             </Link>
//             <DownloadTableExcel
//               filename="LineDefect_table"
//               sheet="LineDefect_table"
//               currentTableRef={tableRef.current}
//             >
//               <button className="btn " style={{ border: "1px solid #0baa9a " }}>
//                 <RiFileExcel2Fill color="#0baa9a " size={25} />
//               </button>
//             </DownloadTableExcel>
//             <button
//               className="btn"
//               onClick={() => toPDF()}
//               style={{
//                 border: "1px solid #0baa9a",
//               }}
//             >
//               <MdPictureAsPdf size={"25px"} color="#850d04" />
//             </button>
//           </div>
//         </div>
//       </div>
//       <div ref={targetRef}>
//         <table className="table" ref={tableRef}>
//           <thead>
//             <tr>
//               <th>Sl.no.</th>
//               <th>Date</th>
//               <th>Reported Time</th>
//               <th>Name Of Train Operator</th>
//               <th>Emp No</th>
//               <th>Location</th>
//               <th>Train No</th>
//               <th>Train Set</th>
//               <th>Failure Description</th>
//               <th>Name Of To</th>
//               <th>Remarks</th>
//               <th>Name Of CC</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{item.date}</td>
//                 <td>{item.reportedTime}</td>
//                 <td>{item.nameOfTrainOperator}</td>
//                 <td>{item.empNo}</td>
//                 <td>{item.location}</td>
//                 <td>{item.trainNo}</td>
//                 <td>{item.trainSet}</td>
//                 <td>{item.failureDescription}</td>
//                 <td>{item.signOfTo}</td>
//                 <td>{item.remarks}</td>
//                 <td>{item.signOfCC}</td>

//                 <td className=" ">
//                   {item.status === "0" || user?.role == "Admin" ? (
//                     <div className="d-flex gap-2">
//                       <Link
//                         to={`/edit/${slug}`}
//                         state={{ id: item.id }}
//                         className="btn btn-primary align-content-center"
//                       >
//                         Edit
//                       </Link>
//                       <button
//                         type="submit"
//                         onClick={() => {
//                           handleSave(item.id);
//                         }}
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="d-flex gap-1">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//             className={`btn btn-primary   ${
//               index + 1 === currentPage ? "active" : ""
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LinedefectList;
