import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducer/redux/tableDataSlice";
import dayjs from "dayjs";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import TableStructure from "../../component/TableStructure";
import EnhancedPDFExportComponent from "../../component/EnhancedPDFExportComponent";

import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import { hardwarefailure } from "../../data/tableColumns";
import EnhancedExcelExportComponent from "../../component/EnhancedExcelExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const HardwareFailureList = () => {
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
  console.log(EnhancedExcelExportComponent);

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
      hardwarefailure
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
      <h1>  Hardware Failure List </h1>

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
        columns={hardwarefailure}
        currentItems={currentItems}
        slug={slug}
      />

      {/* Enhanced Export Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <EnhancedPDFExportComponent
          contentId="section-to-export"
          filename="HardwareFailureList.pdf"
          formName="Hardware Failure Register"
          formId="HWF-REG"
          pageSize="A4"
          orientation="landscape"
        />
        <EnhancedExcelExportComponent
          data={currentItems}
          columns={hardwarefailure}
          fileName="HardwareFailureList.xlsx"
          formName="Hardware Failure Register"
          formId="HWF-REG"
        />
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HardwareFailureList;










