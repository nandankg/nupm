import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducer/redux/tableDataSlice";
import dayjs from "dayjs";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import ReusableTableMC from "../../component/ReusableTableMC";
import PDFExportComponent from "../../component/PDFExportComponent";

import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import { controlregister } from "../../data/tableColumns";
import ExcelExportComponent from "../../component/ExcelExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const HandoverRecordList = () => {
  const dispatch = useDispatch();

  const [slug, setSlug] = useState(getLastParameter().trim());
  const attendance = useSelector((state) => state.handover);

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
      controlregister
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
      <h1> Handover Record List</h1>

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
        headers={controlregister}
        data={currentItems}
        slug={slug}
      />

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="HandoverRecord list.pdf"
      />
      <ExcelExportComponent
        data={currentItems}
        columns={controlregister}
        fileName="HandoverRecord list.xlsx"
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

export default HandoverRecordList;

// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Breadcrumbs from "@mui/material/Breadcrumbs";

// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DownloadTableExcel } from "react-export-table-to-excel";
// import { usePDF } from "react-to-pdf";
// import { MdPictureAsPdf } from "react-icons/md";
// import {
//   fetchData,
//   saveData,
// } from "../../reducer/monika/HandoverrecordReducer";

// import { RiFileExcel2Fill } from "react-icons/ri";

// const HandoverRecordList = () => {
//   const tableRef = useRef(null);
//   const { toPDF, targetRef } = usePDF({
//     filename: "HandoverRecord list.pdf",
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
//   const handoverlist = useSelector((state) => state.handover);
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);

//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);
//   useEffect(() => {
//     if (handoverlist.data && handoverlist.data.data) {
//       setItems(handoverlist.data.data);
//       setFilteredItems(handoverlist.data.data);
//       setSlug(handoverlist.slug);
//     }
//   }, [handoverlist]);

//   useEffect(() => {
//     handleFilter();
//   }, [searchValue, fromDate, toDate]);

//   const handleFilter = () => {
//     const newData = items.filter((row) => {
//       const reason = row.reason ? row.reason.toLowerCase() : "";
//       const remark = row.remark ? row.remark.toLowerCase() : "";
//       const signOfSC = row.signOfSC ? row.signOfSC.toLowerCase() : "";
//       const date = dayjs(row.date);

//       const isInDateRange =
//         fromDate && toDate
//           ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
//             (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
//           : true;

//       return (
//         (reason.includes(searchValue.toLowerCase()) ||
//           remark.includes(searchValue.toLowerCase()) ||
//           signOfSC.includes(searchValue.toLowerCase())) &&
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
//             Handover Record List
//           </Link>
//           <Link underline="hover" color="inherit">
//             List
//           </Link>
//         </Breadcrumbs>
//       </div>
//       {/* <h3> Handover Record List</h3>
//       <span className="line-box"></span> */}
//       <div className="d-flex justify-content-between">
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
//               filename="HandoverRecord_table"
//               sheet="HandoverRecord_table"
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
//       {/* <Header heading="Handover Record Register" /> */}
//       <div ref={targetRef}>
//         <table className="table" ref={tableRef}>
//           <thead>
//             <tr>
//               <th rowSpan={2}>Sl.no.</th>
//               <th rowSpan={2}>Date</th>
//               <th rowSpan={2}>Time</th>
//               <th colSpan={2}>Changed</th>

//               <th rowSpan={2}>Reason</th>
//               <th rowSpan={2}>Signature of SC</th>
//               <th rowSpan={2}>Remark</th>
//               <th rowSpan={2}>Actions</th>
//             </tr>
//             <tr>
//               <th>From</th>
//               <th>To</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{item.date}</td>
//                 <td>{item.time}</td>
//                 <td>{item.changeFrom}</td>
//                 <td>{item.changeTo}</td>
//                 <td>{item.reason}</td>

//                 <td>{item.signOfSC}</td>
//                 <td>{item.remark}</td>
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

// export default HandoverRecordList;
