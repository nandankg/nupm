import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { usePDF } from "react-to-pdf";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addDtrsig,
  fetchData,
  saveData,
} from "../../reducer/akshra/DtrsignalsissueReducer";

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
const DtrsignalsissueList = () => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "dtr_issue_signals.pdf" });
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const DTrsignalsissueList = useSelector((state) => state.dtrsi);
  const [slug, setSlug] = useState("");

  console.log(slug);
  console.log(DTrsignalsissueList.data.data);
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
    if (DTrsignalsissueList.data && DTrsignalsissueList.data.data) {
      setItems(DTrsignalsissueList.data.data);
      setSlug(DTrsignalsissueList.slug);
      setFilteredItems(DTrsignalsissueList.data.data);
    }
  }, [DTrsignalsissueList]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const challan_no = row.challan_no ? row.challan_no.toLowerCase() : "";
      const issued_name = row.issued_name ? row.issued_name.toLowerCase() : "";
      const issued_designation = row.issued_designation
        ? row.issued_designation.toLowerCase()
        : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (challan_no.includes(searchValue.toLowerCase()) ||
          issued_name.includes(searchValue.toLowerCase()) ||
          issued_designation.includes(searchValue.toLowerCase())) &&
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
          <Link underline="hover" color="inherit" to="/dtrsignalissue/register">
            DTR SIGNALS
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3> DTR SIGNALS</h3>
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
            filename="Dtr_issue_table"
            sheet="Dtr_issue_table"
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
      <div className="table-container" ref={targetRef}>
        <table className="table" ref={tableRef}>
          <thead>
            <tr>
              <th colSpan={13}>ISSUES</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>

              <th rowSpan={1} colSpan={2}>
                Challan
              </th>
              <th rowSpan={1} colSpan={3}>
                To Whom Issued
              </th>
              <th rowSpan={1} colSpan={2}>
                Work & Location
              </th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <th rowSpan={1}>Date</th>
              <th rowSpan={1}>Description of Material</th>
              <th rowSpan={1}>Qty</th>
              <th rowSpan={1}>Ledger no./Page</th>
              <th rowSpan={1}>Challan NO</th>
              <th rowSpan={1}>Challan Date</th>
              <th rowSpan={1}>Name</th>
              <th rowSpan={1}>Desig</th>
              {/*<th rowSpan={1}>Sign</th>*/}
              <th rowSpan={1}>What Work</th>
              <th rowSpan={1}>Location Allotted</th>
              {/*<th rowSpan={1}>Sign of Issuer</th>*/}

              <th style={{ width: "150px " }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.material_desc}</td>
                <td>{item.qty}</td>
                <td>{item.ledger_no}</td>

                <td>{item.challan_no}</td>
                <td>{item.challan_date}</td>
                <td>{item.issued_name}</td>
                <td>{item.issued_designation}</td>
                {/*<td>{item.sign}</td>*/}
                <td>{item.for_whatWork}</td>
                <td>{item.location}</td>
                {/*<td>{item.signof}</td>*/}

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

export default DtrsignalsissueList;
