import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addChecklist,
  fetchData,
  saveData,
} from "../../reducer/akshra/PmloogbookReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaFilePdf } from "react-icons/fa6";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { filterTableData } from "../../component/tableUtils";
const Pmloogbook_NewList = ({ checklist }) => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Pmlogbook.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const PMloogbookList = useSelector((state) => state.logbook);
  const [slug, setSlug] = useState("");

  // console.log(slug);
  console.log(PMloogbookList.data.data);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(items);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Items per page
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (PMloogbookList.data && PMloogbookList.data.data) {
      setItems(PMloogbookList.data.data);
      setSlug(PMloogbookList.slug);
      setFilteredItems(PMloogbookList.data.data);
    }
  }, [PMloogbookList]);

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
              PM LOGBOOK MAINLINE
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <div className="d-flex justify-content-between align-items-center">
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
                filename="JobCard_table"
                sheet="JobCard_table"
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
            <thead
              style={{
                position: "sticky",
                top: "0",
                backgroundColor: "#fff",
              }}
            >
              <tr>
                <th className="text-start">Form ID</th>
                <th className="text-start">Date & Time</th>
                <th className="text-start">Station</th>
                <th className="text-start">Employee ID</th>
                <th className="text-start">Emp Name</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((itm, index) => (
                <tr key={index}>
                  <td>{itm.id}</td>
                  <td>{itm.created_at}</td>
                  <td>{itm.station}</td>
                  <td>{itm.user_id}</td>
                  <td>{itm.employee_name}</td>
                  <td>
                    <Link
                      to={`/view/${slug}`}
                      state={{ id: itm.id }}
                      className="btn btn-primary"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </>
  );
};

export default Pmloogbook_NewList;
