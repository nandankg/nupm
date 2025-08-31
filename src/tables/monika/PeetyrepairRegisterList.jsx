import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducer/redux/tableDataSlice";
import dayjs from "dayjs";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import ReusableTableMC from "../../component/ReusableTableMC";
import PDFExportComponent from "../../component/PDFExportComponent";

import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import { pettyrepairregister } from "../../data/tableColumns";
import ExcelExportComponent from "../../component/ExcelExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const PeetyrepairRegisterList = () => {
  const dispatch = useDispatch();

  const [slug, setSlug] = useState(getLastParameter().trim());
  const attendance = useSelector((state) => state.peetyrepairregister);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  console.log(fromDate);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  console.log(ExcelExportComponent);

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
    if (attendance.data?.data) {
      setItems(attendance.data.data);
      setFilteredItems(attendance.data.data);
    }
  }, [attendance]);

  // Filter data based on search and date filters
  useEffect(() => {
    const newData = filterTableData(
      items,
      searchValue,
      fromDate,
      toDate,
      pettyrepairregister
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
      <h1>Peety Repair List</h1>

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
      <ReusableTableMC
        headers={pettyrepairregister}
        data={currentItems}
        slug={slug}
      />

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="PeetyRepairRegister list.pdf"
      />
      <ExcelExportComponent
        data={currentItems}
        columns={pettyrepairregister}
        fileName="PeetyRepairRegister list.xlxs"
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

export default PeetyrepairRegisterList;

// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import { MdPictureAsPdf } from "react-icons/md";
// import { fetchData, saveData } from "../../reducer/monika/peetyrepairReducer";
// import { usePDF } from "react-to-pdf";
// import { DownloadTableExcel } from "react-export-table-to-excel";
// import { RiFileExcel2Fill } from "react-icons/ri";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// const PeetyrepairRegisterList = () => {
//   const tableRef = useRef(null);
//   const { toPDF, targetRef } = usePDF({
//     filename: "PeetyRepairRegister list.pdf",
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
//   const peetyrepairregisterList = useSelector(
//     (state) => state.peetyrepairregister
//   );
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);

//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (peetyrepairregisterList.data && peetyrepairregisterList.data.data) {
//       setItems(peetyrepairregisterList.data.data);
//       setSlug(peetyrepairregisterList.slug);
//       setFilteredItems(peetyrepairregisterList.data.data);
//     }
//   }, [peetyrepairregisterList]);

//   useEffect(() => {
//     handleFilter();
//   }, [searchValue, fromDate, toDate]);

//   const handleFilter = () => {
//     const newData = items.filter((row) => {
//       const location = row.location ? row.location.toLowerCase() : "";
//       const pertainsTo = row.pertainsTo ? row.pertainsTo.toLowerCase() : "";
//       const natureDetailsOfComplaint1 = row.natureDetailsOfComplaint1
//         ? row.natureDetailsOfComplaint1.toLowerCase()
//         : "";
//       const date = dayjs(row.date);

//       const isInDateRange =
//         fromDate && toDate
//           ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
//             (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
//           : true;
//       return (
//         (location.includes(searchValue.toLowerCase()) ||
//           pertainsTo.includes(searchValue.toLowerCase()) ||
//           natureDetailsOfComplaint1.includes(searchValue.toLowerCase())) &&
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
//             Peety Repair List
//           </Link>
//           <Link underline="hover" color="inherit">
//             List
//           </Link>
//         </Breadcrumbs>
//       </div>
//       {/* <h3> Preety Repair RegisterList</h3>
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
//               filename="PeetyRepairRegister_table"
//               sheet="PeetyRepairRegister_table"
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
//               <th rowSpan={2}>Sl.no.</th>
//               <th rowSpan={2}>Date</th>
//               <th rowSpan={2}>Location</th>
//               <th colSpan={3}>Nature & Details Of Complaint</th>
//               <th rowSpan={2}>Pertains To</th>
//               <th rowSpan={2}>Reported To</th>
//               <th rowSpan={2}>Name Of SM/SC</th>
//               <th colSpan={3}>Action Taken</th>
//               <th rowSpan={2}>Remark Of SSE/SE</th>

//               <th rowSpan={2}>Name Of SEE/SE</th>
//               <th rowSpan={2}>Name Of AM/M</th>
//               <th rowSpan={2}>Action</th>
//             </tr>

//             <tr>
//               <th></th>
//               <th></th>
//               <th></th>

//               <th>Action Date</th>
//               <th>Attended By</th>
//               <th>Details of Workdone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{item.date}</td>
//                 <td>{item.location}</td>
//                 <td>{item.natureDetailsOfComplaint1}</td>
//                 <td>{item.natureDetailsOfComplaint2}</td>
//                 <td>{item.natureDetailsOfComplaint3}</td>
//                 <td>{item.pertainsTo}</td>
//                 <td>{item.reportedTo}</td>
//                 <td>{item.signOfSM}</td>
//                 <td>{item.actiondate}</td>
//                 <td>{item.attendedBy}</td>
//                 <td>{item.detailsOfWorkDone}</td>
//                 <td>{item.remarkOfSE}</td>
//                 <td>{item.signOfSE}</td>
//                 <td>{item.signOfAM}</td>

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

// export default PeetyrepairRegisterList;
