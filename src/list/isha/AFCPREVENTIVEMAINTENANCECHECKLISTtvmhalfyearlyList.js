import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { fetchData } from "../../reducer/isha/AFCPREVENTIVEMAINTENANCECHECKLISTtvmhalfyearlyREducer";
import { filterTableData } from "../../component/tableUtils";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import columns from "../../data/listTableColumn";
import ReusableTable from "../../component/ReusableTable";

const AFCPREVENTIVEMAINTENANCECHECKLISTtvmhalfyearlyList = () => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: " AFC PREVENTIVE MAINTENANCE CHECKLIST (TVM HALF YEARLY)_List.pdf" });

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Items per page
  const jobCardList = useSelector((state) => state.PMbm9);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(items);

  useEffect(() => {
    const delayedFunction = () => {
      dispatch(fetchData({ formType: slug }));
    };

    // Set a timeout to call the function after 3 seconds
    const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds

    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout); // Cleanup interval on unmount
   }, [dispatch]);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (jobCardList.data && jobCardList.data.data) {
      setItems(jobCardList.data.data);
      setSlug(jobCardList.slug);
      setFilteredItems(jobCardList.data.data);
    }
  }, [jobCardList]);

  useEffect(() => {
    const newData = filterTableData(items, searchValue, fromDate, toDate);
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
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
            AFC PREVENTIVE MAINTENANCE CHECKLIST (HALF YEARLY) (ANNEXURE-B)
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
          <h3> AFC PREVENTIVE MAINTENANCE CHECKLIST (TVM HALF YEARLY)</h3>
          <span className="line-box" style={{ width: "900px" }}></span>
        </div>
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
        <ReusableTable
          columns={columns}
          currentItems={currentItems}
          slug={slug}
          targetRef={targetRef}
          tableRef={tableRef}
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
    </>
  );
};
export default AFCPREVENTIVEMAINTENANCECHECKLISTtvmhalfyearlyList;











