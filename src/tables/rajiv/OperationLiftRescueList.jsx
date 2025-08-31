import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  fetchData,
  saveData,
} from "../../reducer/rajiv/OperationLiftRescueReducer";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const LiftRescueList = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "operation_lift_rescue_list.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const LiftRescueList = useSelector((state) => state.LiftRescue);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Items per page
  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (LiftRescueList.data && LiftRescueList.data.data) {
      setItems(LiftRescueList.data.data);
      setFilteredItems(LiftRescueList.data.data);
    }
  }, [LiftRescueList]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const station = row.station ? row.station.toLowerCase() : "";
      const liftNo = row.lift_no ? row.lift_no.toLowerCase() : "";
      const nameOfSc = row.name_of_sc ? row.name_of_sc.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (station.includes(searchValue.toLowerCase()) ||
          liftNo.includes(searchValue.toLowerCase()) ||
          nameOfSc.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
    setCurrentPage(1);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Lift Rescue Drill List
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>

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
              filename="OperationLift_table"
              sheet="OperationLift_table"
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
      <div ref={targetRef}>
        <table className="table" ref={tableRef}>
          <thead>
            <tr>
              <th rowSpan={2}>S.No</th>
              <th rowSpan={2}>Date</th>
              <th rowSpan={2}>Station</th>
              <th rowSpan={2}>Name Of SC</th>
              <th rowSpan={2}>Emp.Id</th>
              <th rowSpan={2}>Lift No</th>
              <th colSpan={2}>Time</th>
              <th rowSpan={2}>Total Time Taken</th>
              <th rowSpan={2}>Name Of TC</th>
              <th rowSpan={2}>Emp.Id Of TC</th>
              <th rowSpan={2}>Remarks</th>
              <th rowSpan={2}>Action</th>
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
                <td>{item.lift_no}</td>
                <td>{item.from_time}</td>
                <td>{item.to_time}</td>
                <td>{item.timeTaken}</td>
                <td>{item.name_of_tc}</td>
                <td>{item.TCEmploy_id}</td>
                <td>{item.remarks}</td>
                <td className=" ">
                  {item.status === "0" || user?.role == "Admin" ? (
                    <div className="d-flex">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        className="btn btn-primary align-content-center"
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

export default LiftRescueList;
