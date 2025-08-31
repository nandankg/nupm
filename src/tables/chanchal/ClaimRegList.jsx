import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  AssuReg,
  fetchData,
  saveData,
} from "../../reducer/chanchal/ClaimRegReducer";
import { usePDF } from "react-to-pdf";

import dayjs from "dayjs";

import filterAllTableData from "../../component/filterAllTableData";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import { claimregistrationregister } from "../../data/tableColumns";
import TableStructure from "../../component/TableStructure";
import PDFExportComponent from "../../component/PDFExportComponent";
import ExcelExportComponent from "../../component/ExcelExportComponent";
const user = JSON.parse(localStorage.getItem("userdata"));
const deprt = user?.department;
console.log(deprt);
const ClaimRegList = () => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "ClaimRegList.pdf" });
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const assetregisters = useSelector((state) => state.claimReg);
  const [slug, setSlug] = useState("");

  console.log(assetregisters);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Items per page
  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);
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
    if (assetregisters.data && assetregisters.data.data) {
      setItems(assetregisters.data.data);
      setSlug(assetregisters.slug);
      setFilteredItems(assetregisters.data.data);
    }
  }, [assetregisters]);

  useEffect(() => {
    const newData = filterAllTableData(
      items,
      searchValue,
      fromDate,
      toDate,
      claimregistrationregister
    );

    setFilteredItems(newData);
  }, [searchValue, fromDate, toDate]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(items);
  return (
    <div className="container mt-5">
      <h1>Claim Registration Register</h1>
      <ReusableFilterBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        tableRef={tableRef}
        toPDF={toPDF}
      />
      <TableStructure
        columns={claimregistrationregister}
        currentItems={currentItems}
        slug={slug}
        targetRef={targetRef}
        tableRef={tableRef}
      />
      <PDFExportComponent
        contentId="section-to-export"
        filename="ClaimRegList.pdf"
      />
      <ExcelExportComponent
        data={currentItems}
        columns={claimregistrationregister}
        fileName="ClaimRegList.xlsx"
      />
      {/* Pagination Controls */}
      <div className="d-flex gap-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-primary   ${
              index + 1 === currentPage ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClaimRegList;
