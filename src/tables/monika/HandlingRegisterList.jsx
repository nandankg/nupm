import React, { useEffect, useState,useRef,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";


import { BiSolidEdit } from "react-icons/bi";
import { FaCircleArrowRight } from "react-icons/fa6";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import ReusableTableMC from "../../component/ReusableTableMC";
import PDFExportComponent from "../../component/PDFExportComponent";
import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import ExcelExportComponent from "../../component/ExcelExportComponent";

import { fetchData, saveData } from "../../reducer/redux/tableDataSlice";
import { handintakingovernotes } from "../../data/tableColumns";
import { IoTerminal } from "react-icons/io5";
import PDFConverter from "../../component/PDFConverter";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}

const HandlingRegisterList = () => {
 const dispatch = useDispatch();
  const targetRef = useRef();
   const [slug, setSlug] = useState(getLastParameter().trim());
   const possesionr = useSelector((state) => state.data);
   const user = JSON.parse(localStorage.getItem("userdata"));
   const [items, setItems] = useState([]);
   const [filteredItems, setFilteredItems] = useState([]);
   const [searchValue, setSearchValue] = useState("");
   const [fromDate, setFromDate] = useState(null);
   const tableRef = useRef(null);
   const [toDate, setToDate] = useState(null);
   console.log(fromDate);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;
   console.log(ExcelExportComponent);
 

 useEffect(() => {
     const delayedFunction = () => {
       dispatch(fetchData({ formType: slug }));
     };
 
     // Set a timeout to call the function after 3 seconds
     const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds
 
     // Clean up the timeout if the component unmounts before the delay
     return () => clearTimeout(timeout); // Cleanup interval on unmount
    }, [dispatch]);

  useEffect(() => {
    if (possesionr.data.data && possesionr.data.data) {
      setItems(possesionr.data.data);
      
      setFilteredItems(possesionr.data.data);
    }
  }, [possesionr]);

  useEffect(() => {
     const newData = filterTableData(
       items,
       searchValue,
       fromDate,
       toDate,
       handintakingovernotes
     );
     setFilteredItems(newData);
   }, [items, searchValue, fromDate, toDate]);
  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   
    
  
    const handleSave = useCallback(async (id) => {
      try {
        // Dispatch saveData and wait for completion
        await dispatch(saveData({ formType: slug, id })).unwrap();
        // Re-fetch data to update the table
        await dispatch(fetchData({ formType: slug })).unwrap();
        alert("Data submitted successfully!");
      } catch (error) {
        alert("Failed to submit data: " + error.message);
      }
    }, [dispatch, slug]);
  return (
    <>
     <div className="container mt-5" ref={targetRef}>
      <h1>Handin Taking Over Note</h1>
       {/* Filter Bar */}
       <ReusableFilterBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
<PDFConverter targetRef={targetRef} filename="data-report.pdf" />
      {/* Table Structure */}
      <div className="container mt-4" ref={targetRef}>
      <table className="table table-bordered text-center align-middle" ref={tableRef}>
        <thead className="table-light">
          <tr>
          <th rowSpan={2}>Form Id</th>
          <th rowSpan={2}>Created At</th>
            <th rowSpan={2}>Location From</th>
            <th rowSpan={2}>Location To</th>
            <th rowSpan={2}>Qty.</th>
            <th rowSpan={2}>Defective/Serviceable/Repaired</th>
            <th rowSpan={2}>Material ID</th>
            <th rowSpan={2}>Remarks</th>
            <th colSpan={4}>Handed Over By</th>
            <th colSpan={4}>Taken Over By</th>
            <th rowSpan={2}>Action</th>
          </tr>
         
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Emp ID</th>
            <th>Date</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Emp ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((item,index)=>(
          <tr>
             <td>{item.form_id}</td>
             <td>{item.created_at}</td>
            <td>{item.locationFrom}</td>
            <td>{item.locationTo}</td>
            <td>{item.qty}</td>
            <td>{item.condition}</td>
            <td>{item.authRefNo}</td>
            <td>{item.remarks}</td>
            <td>{item.handedOverBy.name}</td>
            <td>{item.handedOverBy.designation}</td>
            <td>{item.handedOverBy.empId}</td>
            <td>{item.handedOverBy.date}</td>
            <td>{item.takenOverBy.name}</td>
            <td>{item.takenOverBy.designation}</td>
            <td>{item.takenOverBy.empId}</td>
            <td>{item.takenOverBy.date}</td>
           
            <td>
               <td>
                                {item.status === "0" || user?.role == "Admin" ? (
                                               <>
                                               <Link
                                                 to={`/edit/${slug}`}
                                                 state={{ id: item.id }}
                                                 className="btn align-content-center"
                                                 style={{
                                                   width: "40px",
                                                   height: "40px",
                                                   textAlign: "center",
                                                   backgroundColor: "#FF7900 ",
                                                   color: "white",
                                                   fontSize: "18px",
                                                 }}
                                               ><BiSolidEdit />
                                                </Link>
                                               <button
                                                 onClick={() => {
                                                   handleSave(item.id);
                                                 }}
                                                 className="btn align-content-center mt-2"
                                                 style={{
                                                   width: "40px",
                                                   height: "40px",
                                                   textAlign: "center",
                                                   backgroundColor: "#50C878",
                                                   color: "white",
                                                   fontSize: "18px",
                                                 }}
                                               ><FaCircleArrowRight />
                                               </button>
                                               </>
                                                ) : (
                                                 ""
                                               )}
                              </td>
            </td>
          </tr>
        ))}
          
        </tbody>
      </table>
    </div>

     
      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="handintakingovernotes.pdf"
      />
      <ExcelExportComponent
        data={currentItems}
        columns={handintakingovernotes}
        fileName="handintakingovernotes.xlsx"
      />
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
    </>
  );
};

export default HandlingRegisterList;
