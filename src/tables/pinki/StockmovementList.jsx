import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import ReusableTableMC from "../../component/ReusableTableMC";
import PDFExportComponent from "../../component/PDFExportComponent";
import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import ExcelExportComponent from "../../component/ExcelExportComponent";

import { fetchData, saveData } from "../../reducer/redux/tableDataSlice";
import { stockmovementcards } from "../../data/tableColumns";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}

const FoundForeignCurrencyList = () => {
 const dispatch = useDispatch();
   const [slug, setSlug] = useState(getLastParameter().trim());
   const possesionr = useSelector((state) => state.data);
 
   const [items, setItems] = useState([]);
   const [filteredItems, setFilteredItems] = useState([]);
   const [searchValue, setSearchValue] = useState("");
   const [fromDate, setFromDate] = useState(null);
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
       stockmovementcards
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
  return (
    <>
     <div className="container mt-5">
      <h1>Found Foreign Currency List</h1>
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
        headers={stockmovementcards}
        data={currentItems}
        slug={slug}
      />

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="stockmovementcards.pdf"
      />
      <ExcelExportComponent
        data={currentItems}
        columns={stockmovementcards}
        fileName="stockmovementcards.xlsx"
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

export default FoundForeignCurrencyList;
