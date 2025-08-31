import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addAgent,
  fetchData,
  saveData,
} from "../../reducer/akshra/AgentissueReducer";
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
const AgentissueList = () => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "agent.pdf" });

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const AGentissueList = useSelector((state) => state.agent);
  const [slug, setSlug] = useState("");

  console.log(slug);
  console.log(AGentissueList.data.data);
  const [items, setItems] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const delayedFunction = () => {
      dispatch(fetchData({ formType: slug }));
    };

    // Set a timeout to call the function after 3 seconds
    const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds

    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout); // Cleanup interval on unmount
  }, [dispatch]);

  useEffect(() => {
    if (AGentissueList.data && AGentissueList.data.data) {
      setItems(AGentissueList.data.data);
      setSlug(AGentissueList.slug);
      setFilteredItems(AGentissueList.data.data);
    }
  }, [AGentissueList]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const empid = row.empid ? row.empid.toLowerCase() : "";
      const cardno = row.cardno ? row.cardno.toLowerCase() : "";
      const designation = row.designation ? row.designation.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (empid.includes(searchValue.toLowerCase()) ||
          cardno.includes(searchValue.toLowerCase()) ||
          designation.includes(searchValue.toLowerCase())) &&
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
          <Link underline="hover" color="inherit" to="/agenttiusse">
            AGENT ID ISSUE CARD
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3> AGENT ID ISSUE CARD</h3>
      <span className="line-box"></span>
      <div className="d-flex justify-content-between">
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
          <Link to=""></Link>

          <DownloadTableExcel
            filename="agentissuecard_table"
            sheet="agentissuecard_table"
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
      <div ref={targetRef}>
        <table
          className="table"
          style={{ width: "100%", overflowX: "scroll" }}
          ref={tableRef}
        >
          <thead>
            <tr>
              <th colSpan={10}>AGENT ID ISSUE CARD</th>
            </tr>
            <tr>
              <th rowSpan={1}>S.NO</th>
              <th rowSpan={1}>NAME</th>
              <th rowSpan={1}>DESIGNATION</th>
              <th rowSpan={1}>EMP ID</th>
              <th rowSpan={1}>DATE</th>
              <th rowSpan={1}>SIGNATURE</th>
              <th rowSpan={1}>CARD NO.</th>
              <th rowSpan={1}>DATE</th>
              <th rowSpan={1}>SIGNATUERE</th>

              <th style={{ width: "150px " }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{item.name}</td>
                <td>{item.designation}</td>
                <td>{item.empid}</td>

                <td>{item.date1}</td>
                <td>{item.signature}</td>
                <td>{item.cardno}</td>
                <td>{item.date2}</td>
                <td>{item.sign}</td>

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

export default AgentissueList;
