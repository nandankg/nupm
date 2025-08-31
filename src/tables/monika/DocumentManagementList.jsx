import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducer/redux/tableDataSlice";
import dayjs from "dayjs";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import TableStructure from "../../component/TableStructure";
import PDFExportComponent from "../../component/PDFExportComponent";
import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import { inoutdocument } from "../../data/tableColumns";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const DocumentManagementList = () => {
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
      inoutdocument
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
      <h1> Document Management List </h1>

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
        columns={inoutdocument}
        currentItems={currentItems}
        slug={slug}
      />

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="DocumentManagement list.pdf"
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

export default DocumentManagementList;

// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import { addDocument } from "../../reducer/monika/DocumentManagementReducer";
// import {
//   fetchData,
//   saveData,
// } from "../../reducer/monika/DocumentManagementReducer";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { RiFileExcel2Fill } from "react-icons/ri";
// import { DownloadTableExcel } from "react-export-table-to-excel";
// import { usePDF } from "react-to-pdf";
// import { MdPictureAsPdf } from "react-icons/md";

// const DocumentManagementList = () => {
//   const tableRef = useRef(null);
//   const { toPDF, targetRef } = usePDF({
//     filename: "DocumentManagement list.pdf",
//   });
//   const user = JSON.parse(localStorage.getItem("userdata"));

//   const [fromDate, setFromDate] = useState();
//   const [toDate, setToDate] = useState();
//   const [searchValue, setSearchValue] = useState("");
//   const [currentPage, setCurrentPage] = useState(1); // Pagination state
//   const itemsPerPage = 5; // Items per page  console.log(items);
//   const dispatch = useDispatch();
//   const [slug, setSlug] = useState("");

//   console.log(slug);
//   const DocumentManagementList = useSelector((state) => state.Document);
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);

//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (DocumentManagementList.data && DocumentManagementList.data.data) {
//       setItems(DocumentManagementList.data.data);
//       setSlug(DocumentManagementList.slug);
//       setFilteredItems(DocumentManagementList.data.data);
//     }
//   }, [DocumentManagementList]);

//   console.log(items);

//   useEffect(() => {
//     handleFilter();
//   }, [searchValue, fromDate, toDate]);

//   const handleFilter = () => {
//     const newData = items.filter((row) => {
//       const filename = row.filename ? row.filename.toLowerCase() : "";
//       const markedto = row.markedto ? row.markedto.toLowerCase() : "";
//       const remarks = row.remarks ? row.remarks.toLowerCase() : "";
//       const sentby = row.sentby ? row.sentby.toLowerCase() : "";

//       const date = dayjs(row.date);

//       const isInDateRange =
//         fromDate && toDate
//           ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
//             (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
//           : true;

//       return (
//         (filename.includes(searchValue.toLowerCase()) ||
//           markedto.includes(searchValue.toLowerCase()) ||
//           sentby.includes(searchValue.toLowerCase()) ||
//           remarks.includes(searchValue.toLowerCase())) &&
//         isInDateRange
//       );
//     });
//     setFilteredItems(newData);
//     setCurrentPage(1); // Reset to the first page after filtering
//   };
//   const handleSave = (id) => {
//     dispatch(saveData(id));
//   };

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
//       <div role="presentation" className="bredcrumbs">
//         <Breadcrumbs aria-label="breadcrumb">
//           <Link underline="hover" color="inherit">
//             Document Management List
//           </Link>
//           <Link underline="hover" color="inherit">
//             List
//           </Link>
//         </Breadcrumbs>
//       </div>
//       {/* <h3>In/Out Document</h3>
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
//               filename="In/Out Document_table"
//               sheet="In/Out Document_table"
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
//               <th colSpan={11}>In/Out Document</th>
//             </tr>
//             <tr>
//               <th>S.No.</th>
//               <th>File Name</th>
//               <th>Type</th>
//               <th>Sent By</th>
//               <th>In Date</th>
//               <th>In Time</th>
//               <th>Out Date</th>
//               <th>Out Time</th>
//               <th>Marked To</th>
//               <th>Remarks</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{item.filename}</td>
//                 <td>{item.type}</td>
//                 <td>{item.sentby}</td>
//                 <td>{item.indate}</td>
//                 <td>{item.intime}</td>
//                 <td>{item.outdate}</td>
//                 <td>{item.outtime}</td>
//                 <td>{item.markedto}</td>
//                 <td>{item.remarks}</td>
//                 <td className=" ">
//                   {item.status === "0" || user?.role == "Admin" ? (
//                     <div className="d-flex">
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
//       <div className="d-flex gap-2">
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

// export default DocumentManagementList;
