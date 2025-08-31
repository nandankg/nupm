import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import ReusableTableMC from "../../component/ReusableTableMC";
import PDFExportComponent from "../../component/PDFExportComponent";
import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import { nightetsdrillregsiter } from "../../data/tableColumns";
import ExcelExportComponent from "../../component/ExcelExportComponent";
import {
  addEtsDrill,
  fetchData,
  saveData,
} from "../../reducer/manshi/EtsDrillReducer";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}

const ETSDrillList = () => {
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const etsd = useSelector((state) => state.ets);

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
      dispatch(fetchData());
    };

    // Set a timeout to call the function after 3 seconds
    const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds

    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout); // Cleanup interval on unmount
   }, [dispatch]);
  useEffect(() => {
    if (etsd.data && etsd.data.data) {
      setItems(etsd.data.data);
      setSlug(etsd.slug);
      setFilteredItems(etsd.data.data);
    }
  }, [etsd]);

  useEffect(() => {
    const newData = filterTableData(
      items,
      searchValue,
      fromDate,
      toDate,
      nightetsdrillregsiter
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
    <div className="container mt-5">
      <h1>ETS Drill List</h1>
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
        headers={nightetsdrillregsiter}
        data={currentItems}
        slug={slug}
      />

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="ETSDrillList.pdf"
      />
      <ExcelExportComponent
        data={currentItems}
        columns={nightetsdrillregsiter}
        fileName="ETSDrillList.xlsx"
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

export default ETSDrillList;
