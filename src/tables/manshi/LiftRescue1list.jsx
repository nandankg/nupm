import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { RiFileExcel2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchData, saveData } from "../../reducer/manshi/LiftRescue1Reducer";
const LiftRescue1list = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Lift_Rescue1.pdf" });
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Items per page
  const dispatch = useDispatch();
  const Lift1d = useSelector((state) => state.Lift1);
  const [slug, setSlug] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (Lift1d.data && Lift1d.data.data) {
      setItems(Lift1d.data.data);
      setSlug(Lift1d.slug);
      setFilteredItems(Lift1d.data.data);
    }
  }, [Lift1d]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const station = row.station ? row.station.toLowerCase() : "";
      const lift_no = row.lift_no ? row.lift_no.toLowerCase() : "";
      const name_of_sc = row.name_of_sc ? row.name_of_sc.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (station.includes(searchValue.toLowerCase()) ||
          lift_no.includes(searchValue.toLowerCase()) ||
          name_of_sc.includes(searchValue.toLowerCase())) &&
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

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to={`/form/${slug}`}>
            Lift Rescue
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3>Lift Rescue Drill List</h3>
      <span className="line-box"></span>
      <div className="d-flex justify-content-between align-items-center">
        <input
          type="search"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Here."
        />
        <div className="date-box">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newValue) =>
                setFromDate(newValue ? newValue.startOf("day") : null)
              }
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
              onChange={(newValue) =>
                setToDate(newValue ? newValue.endOf("day") : null)
              }
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
            filename="Lift Rescue Drill"
            sheet="Lift Rescue Drill"
            currentTableRef={tableRef.current}
          >
            <button className="btn " style={{ border: "1px solid #0baa9a " }}>
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
      <div ref={targetRef} className="table-container">
        <table className="table" ref={tableRef}>
          <thead>
            <tr>
              <th rowSpan="2" style={{ minWidth: "200px" }}>
                Date
              </th>
              <th rowSpan="2">Station</th>
              <th rowSpan="2">Lift No.</th>
              <th colSpan="2">Time</th>
              <th rowSpan="2">Total Time taken</th>
              <th rowSpan="2">Name of SC</th>
              <th rowSpan="2">Emp ID</th>
              <th rowSpan="2">Signature of SC</th>
              <th rowSpan="2">Remark</th>
              <th rowSpan="2">Action</th>
            </tr>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td style={{ minWidth: "200px" }}>{item.date}</td>
                <td>{item.station}</td>
                <td>{item.lift_no}</td>
                <td>{item.from_time}</td>
                <td>{item.to_time}</td>
                <td>{item.timeTaken}</td>
                <td>{item.name_of_sc}</td>
                <td>{item.Employ_id}</td>
                <td>{item.TCEmploy_id}</td>
                <td>{item.remarks}</td>
                <td style={{ position: "relative", verticalAlign: "middle" }}>
                  {item.status === "0" ? (
                    <div className="d-flex gap-2">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-success"
                        onClick={() => handleSave(item.id)}
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

export default LiftRescue1list;
