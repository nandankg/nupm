import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducer/redux/tableDataSlice";
import dayjs from "dayjs";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import TableStructure from "../../component/TableStructure";
import EnhancedPDFExportComponent from "../../component/EnhancedPDFExportComponent";

import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import { nightafcgatedrill } from "../../data/tableColumns";
import EnhancedExcelExportComponent from "../../component/EnhancedExcelExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const NightAfcGateDrillList = () => {
  const dispatch = useDispatch();

  const [slug, setSlug] = useState(getLastParameter().trim());
  const attendance = useSelector((state) => state.data);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data when the component mounts
  useEffect(() => {
       const interval = setInterval(() => {
         dispatch(fetchData({ formType: slug }));
       }, 30000); // Re-fetch every 30 seconds (changed from 1 second)
   
       return () => clearInterval(interval); // Cleanup interval on unmount
     }, [dispatch, slug]); // Added 'slug' to dependency array

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
      nightafcgatedrill
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
      <h1>Night Afc Gate Drill</h1>

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
        columns={nightafcgatedrill}
        currentItems={currentItems}
        slug={slug}
      />

      {/* Enhanced Export Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <EnhancedPDFExportComponent
          contentId="section-to-export"
          filename="NightAfcGateDrillList.pdf"
          formName="Night AFC Gate Drill Register"
          formId="NAFC-GDR"
          pageSize="A4"
          orientation="landscape"
        />
        <EnhancedExcelExportComponent
          data={currentItems}
          columns={nightafcgatedrill}
          fileName="NightAfcGateDrillList.xlsx"
          formName="Night AFC Gate Drill Register"
          formId="NAFC-GDR"
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

export default NightAfcGateDrillList;





