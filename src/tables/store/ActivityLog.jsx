import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducer/store/ActivityLogReducer";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import TableStructureLog from "../../component/TableStructureLog";
import PDFExportComponent from "../../component/PDFExportComponent";
import ExcelExportComponent from "../../component/ExcelExportComponent";
import Pagination from "../../component/Pagination"; // If you want to centralize pagination logic
import { filterTableData } from "../../utils/tableUtils";
import { activitylog } from "../../data/tableColumns";

// Utility: Get last URL segment
const getLastUrlSegment = () => {
  const segments = window.location.pathname.split("/").filter(Boolean);
  return segments.pop() || "";
};

const ActivityLog = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.activitylog);

  // State
  const [slug] = useState(getLastUrlSegment().trim());
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);

  // Pagination Config
  const itemsPerPage = 20;
  const pageGroupSize = 15;

  // Fetch data on mount and refresh every 60s
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));

    const refreshInterval = setInterval(() => {
      dispatch(fetchData({ formType: slug }));
    }, 60000); // 60 seconds

    return () => clearInterval(refreshInterval);
  }, [dispatch, slug]);

  // Sync fetched data into local state
  useEffect(() => {
    if (data?.data) {
      setItems(data.data);
      setFilteredItems(data.data);
    }
  }, [data]);

  // Filter table data when search/date changes
  useEffect(() => {
    const updatedData = filterTableData(
      items,
      searchValue,
      fromDate,
      toDate,
      activitylog
    );
    setFilteredItems(updatedData);
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [items, searchValue, fromDate, toDate]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const currentItems = useMemo(() => {
    const firstIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(firstIndex, firstIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  // Pagination Handlers
  const changePage = (page) => setCurrentPage(page);
  const nextGroup = () => endPage < totalPages && setCurrentGroup((g) => g + 1);
  const prevGroup = () => startPage > 1 && setCurrentGroup((g) => g - 1);
  const nextPage = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  // Render Page Numbers
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={`btn btn-primary ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="container mt-5">
      <h1>Activity Log List</h1>

      {/* Filters */}
      <ReusableFilterBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      {/* Loading & Error States */}
      {loading && <p>Loading data...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {/* Table */}
      {!loading && !error && (
        <>
          <TableStructureLog columns={activitylog} currentItems={currentItems} slug={slug} />

          {/* Export Buttons */}
          <div className="d-flex gap-2 my-3">
            <PDFExportComponent
              contentId="section-to-export"
              filename="ActivityLog.pdf"
            />
            <ExcelExportComponent
              data={filteredItems}
              columns={activitylog}
              fileName="ActivityLog.xlsx"
            />
          </div>

          {/* Pagination */}
          <div className="d-flex gap-1 justify-content-center mt-3">
            <button onClick={prevPage} disabled={currentPage === 1} className="btn btn-primary">
              Previous
            </button>
            <button onClick={prevGroup} disabled={startPage === 1} className="btn btn-primary">
              &lt;&lt;
            </button>
            {renderPageNumbers()}
            <button onClick={nextGroup} disabled={endPage === totalPages} className="btn btn-primary">
              &gt;&gt;
            </button>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="btn btn-primary">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityLog;
