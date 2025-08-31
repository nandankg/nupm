import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  saveData,
} from "../../reducer/pinki/IncidentAccidentReportReducer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDateToDDMMYYYY } from '../../component/formatDateToDDMMYYYY';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const IncidentAccidentReportList = () => {
  const navigate = useNavigate();
    
    const location = useLocation();
    const { id } = location.state;
    console.log(id);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "police custody.pdf" });
  const incidentaccidentreport = useSelector(
    (state) => state.incidentaccidentreport
  );
  const [slug, setSlug] = useState(getLastParameter().trim());

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Items per page

  const user = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (incidentaccidentreport.data && incidentaccidentreport.data.data) {
      setItems(incidentaccidentreport.data.data);
    
      setFilteredItems(incidentaccidentreport.data.data);
      
    }
  }, [incidentaccidentreport]);
  const itmm = incidentaccidentreport.data.data;
  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);
  let filterItems;

  if (itmm) {
    filterItems = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filterItems);
  }
  const handleFilter = () => {
    const newData = items.filter((row) => {
      const place_of_incident = row.place_of_incident
        ? row.place_of_incident.toLowerCase()
        : "";
      const tdetails = row.tdetails ? row.tdetails.toLowerCase() : "";
      const name_of_scto = row.name_of_scto
        ? row.name_of_scto.toLowerCase()
        : "";
      const responsible_depart = row.responsible_depart
        ? row.responsible_depart.toLowerCase()
        : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (place_of_incident.includes(searchValue.toLowerCase()) ||
          tdetails.includes(searchValue.toLowerCase()) ||
          name_of_scto.includes(searchValue.toLowerCase()) ||
          responsible_depart.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  console.log(items);
  console.log(filteredItems);

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/form/incident-accident">
            Incident Accident Register
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3>Incident Accident Report Register List</h3>
      <span className="line-box"></span>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <input
          type="search"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Here."
        />
        <div className="d-flex align-items-center gap-3">
          <div className="date-box">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue.startOf("day"))}
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
                onChange={(newValue) => setToDate(newValue.endOf("day"))}
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
              {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
            </Link>
            <DownloadTableExcel
              filename="IncidentReport_table"
              sheet="IncidentReport_table"
              currentTableRef={tableRef.current}
            >
              <button className="btn" style={{ border: "1px solid #0baa9a " }}>
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
      <div ref={targetRef} className="container">
        {filterItems?.map((item, index) => (
          <div ref={tableRef}>
            <div
              key={index}
              className="report-container"
              style={{
                border: "1px solid #000",
                margin: "20px 0",
                padding: "10px",
              }}
            >
              <h4 className="text-center">Incident/Accident Report</h4>
              <div className="report-item">
                <strong>Incident:</strong> {item.incident}
              </div>
              <div className="report-item">
                <strong>Date & Time of Incident:</strong> {formatDateToDDMMYYYY(item.date_incident)}{" "}
                {item.time_incident}
              </div>
              <div className="report-item">
                <strong>Place of Incident:</strong> {item.place_of_incident}
              </div>
              <div className="report-item">
                <strong>Train Details:</strong> {item.tdetails}
              </div>
              <div className="report-item">
                <strong>Name and Emp Id of SCTO:</strong> {item.name_of_scto},{" "}
                {item.empid_of_scto}
              </div>
              <div className="report-item">
                <strong>Reason:</strong> {item.reason}
              </div>
              <div className="report-item">
              {Array.isArray(item.brief) ? item.brief.map(briefItem => <ul><li>{briefItem}</li></ul>) : <p> <strong>Brief:{item.brief}</strong></p>}

             
              </div>
              <div className="report-item">
                <strong>Repercussion:</strong> <ul> {item.repercussion.map((brf)=>(
<li>{brf}</li>
                ))}
                </ul>
              </div>
              <div className="report-item">
                <strong>Responsible Department:</strong>{" "}
                {item.responsible_depart}
              </div>
              <div className="report-item">
                <strong>Name of TC/ACC:</strong> {item.sign_of_tc_acc}
                <br/>
                <strong>Empid of TC/ACC:</strong> {item.unit}
              </div>
              {item.status === "0" || user.role === "Admin" ? (
                <div className="d-flex justify-content-center gap-2">
                  <Link
                    to={`/edit/${slug}`}
                    state={{ id: item.id }}
                    className="btn btn-primary align-content-center "
                  >
                    Edit
                  </Link>
                  <button
                    type="submit"
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
            </div>
          </div>
        ))}
      </div>
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
  );
};

export default IncidentAccidentReportList;
