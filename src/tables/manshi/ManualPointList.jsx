import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import ReusableTableMC from "../../component/ReusableTableMC";
import PDFExportComponent from "../../component/PDFExportComponent";
import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import ExcelExportComponent from "../../component/ExcelExportComponent";
import { nightmanualpointsoperationdrillregister } from "../../data/tableColumns";
import { saveData, fetchData } from "../../reducer/manshi/ManualPointReducer";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const ManualPointList = () => {
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const manual = useSelector((state) => state.manualdrill);

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
    if (manual.data && manual.data.data) {
      setItems(manual.data.data);
      setSlug(manual.slug);
      setFilteredItems(manual.data.data);
    }
  }, [manual]);

 
  useEffect(() => {
    const newData = filterTableData(
      items,
      searchValue,
      fromDate,
      toDate,
      nightmanualpointsoperationdrillregister
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
      <h1>Manual Point Operation List</h1>
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
        headers={nightmanualpointsoperationdrillregister}
        data={currentItems}
        slug={slug}
      />

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="ManualPointList.pdf"
      />
      <ExcelExportComponent
        data={currentItems}
        columns={nightmanualpointsoperationdrillregister}
        fileName="ManualPointList.xlsx"
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

export default ManualPointList;
