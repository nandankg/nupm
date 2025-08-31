import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addDtr,
  fetchData,
  saveData,
} from "../../reducer/akshra/DtrregReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DownloadTableExcel } from "react-export-table-to-excel";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const DtrregList = () => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "dtrreg.pdf" });

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const DTrregList = useSelector((state) => state.dtr);
  const [slug, setSlug] = useState("");

  console.log(slug);
  console.log(DTrregList.data.data);
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
    if (DTrregList.data && DTrregList.data.data) {
      setItems(DTrregList.data.data);
      setSlug(DTrregList.slug);
      setFilteredItems(DTrregList.data.data);
    }
  }, [DTrregList]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const challan_no = row.challan_no ? row.challan_no.toLowerCase() : "";
      const issued_name = row.issued_name ? row.issued_name.toLowerCase() : "";
      const location = row.location ? row.location.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (challan_no.includes(searchValue.toLowerCase()) ||
          issued_name.includes(searchValue.toLowerCase()) ||
          location.includes(searchValue.toLowerCase())) &&
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
          <Link underline="hover" color="inherit" to="/dreg">
            DAILY TRANSACTION REGISTER
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3> DAILY TRANSACTION REGISTER</h3>
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
            <Link to=""></Link>
            <DownloadTableExcel
              filename="dtrreg table"
              sheet="dtrreg"
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
              <th colSpan={13}>Issue</th>
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
              <th colSpan={1}>Date</th>
              <th rowSpan={1}>Description of Material</th>
              <th rowSpan={1}>Qty</th>
              <th rowSpan={1}>Ledger no./Page</th>
              <th rowSpan={1}>Challan NO.</th>
              <th rowSpan={1}>Challan Date</th>
              <th colSpan={1}>Name</th>
              <th colSpan={1}>Desig</th>

              <th rowSpan={1}>For What Work</th>

              <th colSpan={1}>Location</th>

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
                {/* <td>{item.sign}</td>*/}
                <td>{item.for_whatWork}</td>
                <td>{item.location}</td>
                {/* <td>{item.signof}</td>*/}

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

export default DtrregList;
