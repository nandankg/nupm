import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../reducer/redux/tableDataSlice";
import dayjs from "dayjs";
import ReusableFilterBar from "../component/ReusableFilterBar";
import TableStructure from "../component/TableStructure";
import PDFExportComponent from "../component/PDFExportComponent";
import Pagination from "../component/Pagination";
import { filterTableData } from "../utils/tableUtils";
import { outstandingrecordregister } from "../data/tableColumns";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const OutStandingRecRegList = () => {
  const dispatch = useDispatch();

  const [slug, setSlug] = useState(getLastParameter().trim());
  const terentrylist = useSelector((state) => state.data);

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
    if (terentrylist.data?.data) {
      setItems(terentrylist.data.data);
      setFilteredItems(terentrylist.data.data);
    }
  }, [terentrylist]);

  // Filter data based on search and date filters
  useEffect(() => {
    const newData = filterTableData(
      items,
      searchValue,
      fromDate,
      toDate,
      outstandingrecordregister
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
      <h1>Outstanding Record Register List </h1>

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
        columns={outstandingrecordregister}
        currentItems={currentItems}
        slug={slug}
      />

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="OutStanding Record Register.pdf"
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

export default OutStandingRecRegList;





