import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { fetchData } from "../../reducer/rajiv/SMPSReducer";
import { filterTableData } from "../../component/tableUtils";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import columns from "../../data/listTableColumn";
import ReusableTable from "../../component/ReusableTable";
const SMPSLists = () => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "SMPS SIX MONTHLY.pdf.pdf",
  });

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Items per page
  const jobCardList = useSelector((state) => state.SMPS);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(items);

  useEffect(() => {
    const delayedFunction = () => {
      dispatch(fetchData());
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
              SMPS SIX MONTHLY MAINTENANCE RECORD{" "}
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
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
export default SMPSLists;
