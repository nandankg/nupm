import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducer/redux/tableDataSlice";

import ReusableFilterBar from "../../component/ReusableFilterBar";
import TableStructureList from "../../component/TableStructureList";
import PDFExportComponent from "../../component/PDFExportComponent";

import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import { listcolumn_one } from "../../data/tableColumns";
import ExcelExportComponent from "../../component/ExcelExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const DailyCheckList = () => {
  const dispatch = useDispatch();

  const [slug, setSlug] = useState(getLastParameter().trim());
  const attendance = useSelector((state) => state.data);

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
    const interval = setInterval(() => {
      dispatch(fetchData({ formType: slug }));
    }, 1000); // Re-fetch every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
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
      listcolumn_one
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
      <h1> Daily Checklist Mainline List</h1>

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
      <TableStructureList
        columns={listcolumn_one}
        currentItems={currentItems}
        slug={slug}
      />

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="dailychecklistmainlineList.pdf"
      />
      <ExcelExportComponent
        data={currentItems}
        columns={listcolumn_one}
        fileName="dailychecklistmainlineList.xlsx"
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

export default DailyCheckList;






