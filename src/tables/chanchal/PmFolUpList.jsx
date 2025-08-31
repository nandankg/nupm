import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData ,saveData} from "../../reducer/redux/tableDataSlice";
import { Link,useLocation } from "react-router-dom";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import TableStructure from "../../component/TableStructure";
import PDFExportComponent from "../../component/PDFExportComponent";
import PDFConverter from '../../component/PDFConverter';
import Pagination from "../../component/Pagination";
import { filterTableData } from "../../utils/tableUtils";
import { pmfollowupmainline } from "../../data/tableColumns";
import ExcelExportComponent from "../../component/ExcelExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const PmFolUpList = () => {
  const targetRef = useRef();
  const dispatch = useDispatch();
const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const attendance = useSelector((state) => state.data);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  console.log(attendance);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  console.log(filteredItems);
  const user = JSON.parse(localStorage.getItem("userdata"));
const[failur, setFailur]=useState([]);
useEffect(() => {
    const delayedFunction = () => {
      dispatch(fetchData({ formType: slug }));
    };

    // Set a timeout to call the function after 3 seconds
    const timeout = setTimeout(delayedFunction, 1000); // 3000ms = 3 seconds

    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout); // Cleanup interval on unmount
   }, [dispatch]);


  // Fetch data when the component mounts


  // Update items and filteredItems when data changes
  useEffect(() => {
    if (attendance.data?.data) {
      setItems(attendance.data.data);
      setFilteredItems(attendance.data.data);
    }
  }, [attendance]);
  const itmm = attendance.data.data;
  let filtereddItems;

  if (itmm) {
    filtereddItems = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
    console.log(filtereddItems);

  // Filter data based on search and date filters
  useEffect(() => {
    const newData = filterTableData(
      items,
      searchValue,
      fromDate,
      toDate,
      pmfollowupmainline
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
   useEffect(() => {
      // Filter out rows where all fields are null
      if(filtereddItems){
        filtereddItems.map((itms,idx)=>{
  const filtItem = itms.failure.filter(
    (item) =>
      Object.values(item).some((value) => value !== null)
  );
  setFailur(filtItem);
}
        )
  }
  },[filteredItems])
  console.log(filtereddItems.length)
const handleSave = (id) => {
      dispatch(saveData({ formType: slug,id}));
    };
  return (
    <div className="container mt-5">
      <h1> PM FOLLOWUP SHEET</h1>

      {/* Filter Bar */}
      <ReusableFilterBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <div className="container">
        <PDFConverter targetRef={targetRef} filename="data-report.pdf" defaultOrientation="landscape" />
<table className="table" ref={targetRef}>
        <thead>
          <tr>
            <th rowSpan={filtereddItems.length+1}>
            Form ID
            </th>
            <th rowSpan={filtereddItems.length+1}>
            Created At
            </th>
            <th rowSpan={filtereddItems.length+1}>
            PM DATE
            </th>
            <th colSpan={4}>
            FAILURE 
            </th>
            <th rowSpan={filtereddItems.length}>
              Action
            </th>
          </tr>
          <tr>
            <th>
            FAILURE OBSERVED DURING PM
            </th>
            <th>
            RECTIFICATION DATE
            </th>
            <th>
            RECTIFICATION/ REMARKS
            </th>
            <th>
            ATTENDED BY
            </th>
          </tr>
        </thead>
        <tbody>
          
            {filtereddItems.map((item,index)=>(
              <>
                <tr>
              <th rowSpan={3}>{item.form_id}</th>
            
<th rowSpan={3}>{item.created_at}</th>
<th rowSpan={3}>{item.date}</th>
 <th colSpan={4}>{item.failure[index].length}</th>
 <th rowSpan={3}>
              {item.status === "0" || user?.role == "Admin" ? (
                <>
                <Link
                  to={`/edit/${slug}`}
                  state={{ id: item.id }}
                  className="btn align-content-center"
                  style={{
                    width: "80px",
                    height: "40px",
                    textAlign: "center",
                    backgroundColor: "#FF7900 ",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    handleSave(item.id);
                  }}
                  className="btn align-content-center"
                  style={{
                    width: "80px",
                    height: "40px",
                    textAlign: "center",
                    backgroundColor: "#50C878",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Submit
                </button>
                </>
                 ) : (
                  ""
                )}
              </th>
</tr>
{item.failure.map((flr,idx)=>(
 

flr.FailObsDurPm!== null && flr.RectDate !== null && flr.Remark!== null ?(  
<tr>
<th>{flr.FailObsDurPm}</th>
  <th>{flr.RectDate}</th>
  <th>{flr.Remark}</th>
  <th>{flr.AttendedBy}</th>
  </tr>):("")

))}
</>
))}


          
        </tbody>

      </table>
      </div>
      {/* Table Structure */}
     
      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="PmFolUpList.pdf"
      />
      <ExcelExportComponent
        data={currentItems}
        columns={pmfollowupmainline}
        fileName="PmFolUpList.xlsx"
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

export default PmFolUpList;


