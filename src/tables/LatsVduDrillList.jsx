import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../reducer/redux/tableDataSlice";
import dayjs from "dayjs";
import ReusableFilterBar from "../component/ReusableFilterBar";
import TableStructure from "../component/TableStructure";
import PDFExportComponent from "../component/PDFExportComponent";
import Pagination from "../component/Pagination";
import { filterTableData } from "../utils/tableUtils";
import { nightlatsvdudrillregister } from "../data/tableColumns";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const LatsVduDrillList = () => {
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
      nightlatsvdudrillregister
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
      <h1>LATS/VDU DRILL LIST </h1>

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
        columns={nightlatsvdudrillregister}
        currentItems={currentItems}
        slug={slug}
      />

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="TER Entry Register.pdf"
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

export default LatsVduDrillList;





/*
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { FaFilter, FaFileExcel, FaFilePdf } from "react-icons/fa";
import {
  addlatsvdudrill,
  fetchData,
  saveData,
} from "../reducer/LatsVduDrillReducer";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const LatsVduDrillList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [formValues, setFormValues] = useState();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "latsvdudrill.pdf" });

  const [fromDate, setFromdate] = useState(null);
  const [toDate, setTodate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const dispatch = useDispatch();
  const latsvdudrill = useSelector((state) => state.latsvdudrillstate || []);
  const [items, setItems] = useState([]);
  console.log(latsvdudrill.data.data);

  const [slug, setSlug] = useState("");
  console.log(slug);

  // console.log(items);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (latsvdudrill.data && latsvdudrill.data.data) {
      setItems(latsvdudrill.data.data);
      setSlug(latsvdudrill.slug);
      setFilteredItems(latsvdudrill.data.data);
    }
  }, [latsvdudrill]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const station = row.station ? row.station.toLowerCase() : "";
      const Employ_idvar = row.Employ_id ? row.Employ_id.toLowerCase() : "";
      const nameOfSc = row.name_of_sc ? row.name_of_sc.toLowerCase() : "";
      const id = row.id ? String(row.id).toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (station.includes(searchValue.toLowerCase()) ||
          Employ_idvar.includes(searchValue.toLowerCase()) ||
          id.includes(searchValue.toLowerCase()) ||
          nameOfSc.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
 
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //save button
  const handleSave = (id) => {
    dispatch(saveData(id));
  };

  return (
    <>
      <div className="container">
        
        <h3>LATS/VDU DRILL LIST</h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="search"
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Here."
          />
          <div className="d-flex align-items-center gap-3 mt-3">
            <div className="date-box">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={fromDate}
                  onChange={(newValue) => setFromdate(newValue)}
                  sx={{
                    ".MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#00b3a1",
                      },
                      "&:hover fieldset": {
                        borderColor: "#00b3a1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00b3a1",
                      },
                    },
                  }}
                />
                <DatePicker
                  label="To Date"
                  value={toDate}
                  onChange={(newValue) => setTodate(newValue)}
                  sx={{
                    ".MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#00b3a1",
                      },
                      "&:hover fieldset": {
                        borderColor: "#00b3a1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00b3a1",
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="d-flex gap-3">
              <Link to="">
                { <button className="btn btn-primary">
                                <FaFilter />
                            </button> }

              </Link>
              <DownloadTableExcel
                filename="Escalator_table"
                sheet="Escalator_table"
                currentTableRef={tableRef.current}
              >
                <button
                  className="btn "
                  style={{ border: "1px solid #0baa9a " }}
                >
                  <RiFileExcel2Fill color="#0baa9a " size={25} />
                </button>
              </DownloadTableExcel>
              <button
                className="btn"
                onClick={() => toPDF()}
                style={{
                  border: "1px solid #0baa9a",
                }}
              >
                <MdPictureAsPdf size={"25px"} color="#850d04" />
              </button>
            </div>
          </div>
        </div>
        <div ref={targetRef}>
          <table className="table" ref={tableRef}>
            <thead>
              <tr>
                <th className="text-center" colSpan={13}>
                  LATS/VDU DRILL
                </th>
              </tr>
              <tr className="text-center">
                <th rowSpan={2}>S.No.</th>
                <th rowSpan={2}>Date</th>
                <th rowSpan={2}>Station</th>
                <th rowSpan={2}>Name of SC</th>
                <th rowSpan={2}>Emp. ID</th>
                <th colSpan={2}>Time Control Transfer</th>
                <th rowSpan={2}>LATS/VDU Function/Result</th>
                <th rowSpan={2}>Name of TC</th>
                <th rowSpan={2}>Emp.Id. of TC</th>
                <th rowSpan={2}>Remark</th>
                <th rowSpan={2}>Form ID</th>
                <th rowSpan={2} style={{ width: "150px" }}>
                  Actions
                </th>
              </tr>
              <tr>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.station}</td>
                  <td>{item.name_of_sc}</td>
                  <td>{item.Employ_id}</td>
                  <td>{item.time_from}</td>
                  <td>{item.time_to}</td>
                  <td>{item.result}</td>
                  <td>{item.name_of_tc}</td>
                  <td>{item.TCEmploy_id}</td>
                  <td>{item.remarks}</td>
                  <td>{item.id}</td>
                  <td className=" ">
                    {item.status === "0" && user.role === "Admin" ? (
                      <div>
                        <Link
                          to={`/edit/${slug}`}
                          state={{ id: item.id }}
                          style={{width: "120px", padding: "10px"}}
                          className="btn btn-primary"
                        >
                          Edit
                        </Link>
                        <button
                          type="submit"
                          style={{width: "120px", padding: "10px", marginTop: "10px"}}
                          onClick={() => {
                            handleSave(item.id);
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default LatsVduDrillList;*/
