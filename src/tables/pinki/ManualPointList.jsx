import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, saveData } from "../../reducer/pinki/ManualPointReducer";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
const ManualPointListP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Manual Point.pdf" });
  const manualpoint = useSelector((state) => state.manualpoint);
  const [slug, setSlug] = useState("");

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (manualpoint.data && manualpoint.data.data) {
      setItems(manualpoint.data.data);
      setSlug(manualpoint.slug);
      setFilteredItems(manualpoint.data.data);
    }
  }, [manualpoint]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const station = row.station ? row.station.toLowerCase() : "";
      const point_no = row.point_no ? row.point_no.toLowerCase() : "";
      const Employ_id = row.Employ_id ? row.Employ_id.toLowerCase() : "";
      const time_operation = row.time_operation
        ? row.time_operation.toLowerCase()
        : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (station.includes(searchValue.toLowerCase()) ||
          point_no.includes(searchValue.toLowerCase()) ||
          Employ_id.includes(searchValue.toLowerCase()) ||
          time_operation.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  console.log(items);

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            to="/form/night_manual_points_operation_drill_register"
          >
            Manual Point Register
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3>Manual Point Register List</h3>
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
              filename="ManualPoint_table"
              sheet="ManualPoint_table"
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
          <thead className="tableheader">
            <tr>
              <th className="text-center" colSpan={14}>
                Manual Point Operational Drill
              </th>
            </tr>
            <tr>
              <th>Date</th>
              <th>Station</th>
              <th>Point No.</th>
              <th>Operation Time</th>
              <th>Reset Time</th>
              <th>Total Time Taken</th>
              <th>Name of SC</th>
              <th>Emp ID</th>
              <th>Signature of SC</th>
              <th>Signature of SM</th>

              <th>Remark</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.station}</td>
                <td>{item.point_no}</td>
                <td>{item.time_operation}</td>
                <td>{item.time_reset}</td>
                <td>{item.totalTime}</td>
                <td>{item.name_of_sc}</td>
                <td>{item.Employ_id}</td>
                <td>{item.TCEmploy_id}</td>
                <td>{item.sign_of_sm}</td>
                <td>{item.remarks}</td>
                <td className=" ">
                  {item.status === "0" ? (
                    <div>
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        style={{
                          padding: "6px 10px",
                          backgroundColor: "#399a63",
                          border: "1px solid #28a745",
                          color: "white",
                        }}
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
      {/* <div className="right">
                <label htmlFor="">Signature of SM</label> <br />
                <span>{items.length > 0 ? items[items.length - 1].sign_of_sm : ''}</span>
            </div> */}
    </div>
  );
};

export default ManualPointListP;
