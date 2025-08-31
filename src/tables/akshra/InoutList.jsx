import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addInout,
  fetchData,
  saveData,
} from "../../reducer/akshra/InoutReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DownloadTableExcel } from "react-export-table-to-excel";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const InoutList = () => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "inout.pdf" });

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const INoutList = useSelector((state) => state.inoutreg);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const navigate = useNavigate();

  console.log(slug);
  console.log(INoutList.data.data);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const delayedFunction = () => {
      dispatch(fetchData());
    };

    // Set a timeout to call the function after 3 seconds
    const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds

    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout); // Cleanup interval on unmount
  }, [dispatch]);

  useEffect(() => {
    if (INoutList.data && INoutList.data.data) {
      setItems(INoutList.data.data);
      setSlug(INoutList.slug);
      setFilteredItems(INoutList.data.data);
    }
  }, [INoutList]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const filename = row.filename ? row.filename.toLowerCase() : "";
      const sentby = row.sentby ? row.sentby.toLowerCase() : "";
      const markedto = row.markedto ? row.markedto.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (filename.includes(searchValue.toLowerCase()) ||
          sentby.includes(searchValue.toLowerCase()) ||
          markedto.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
  };

  const handleSave = (id) => {
    dispatch(saveData(id));
  };

  console.log(items);
  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/inoutt/register">
            IN/OUT DOCUMENT
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3> IN/OUT DOCUMENT</h3>
      <span className="line-box"></span>
      <div className="d-flex justify-content-between">
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
              {/* <button className="btn btn-primary">Export</button>*/}
            </Link>
            <DownloadTableExcel
              filename="inout_table"
              sheet="inout_table"
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
      </div>
      <div ref={targetRef}>
        <table
          className="table"
          style={{ width: "100%", overflowX: "scroll" }}
          ref={tableRef}
        >
          <thead>
            <tr>
              <th colSpan={11}>IN/OUT DOCUMENT</th>
            </tr>
            <tr>
              <th rowSpan={1}>S.NO</th>
              <th rowSpan={1}>FILE NAME</th>
              <th rowSpan={1}>TYPE</th>
              <th rowSpan={1}>SENT BY</th>
              <th rowSpan={1}>IN DATE</th>
              <th rowSpan={1}>TIME1</th>
              <th rowSpan={1}>OUT DATE</th>
              <th rowSpan={1}>TIME2</th>
              <th rowSpan={1}>MARKED TO</th>
              <th rowSpan={1}>REMARKS</th>
              <th style={{ width: "150px " }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.filename}</td>
                <td>{item.type}</td>
                <td>{item.sentby}</td>

                <td>{item.indate}</td>
                <td>{item.intime}</td>
                <td>{item.outdate}</td>
                <td>{item.outtime}</td>
                <td>{item.markedto}</td>
                <td>{item.remarks}</td>
                <td className=" ">
                  {item.status === "0" ? (
                    <div className="d-flex ">
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
    </div>
  );
};

export default InoutList;
