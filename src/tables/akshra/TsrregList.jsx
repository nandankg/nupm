import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addTsrreg,
  fetchData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
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
const TsrregList = () => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "emefire.pdf" });

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const tsreg = useSelector((state) => state.data);
  const [slug, setSlug] = useState(getLastParameter().trim());

  console.log(slug);
  console.log(tsreg.data.data);
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
    if (tsreg.data && tsreg.data.data) {
      setItems(tsreg.data.data);
      
      setFilteredItems(tsreg.data.data);
    }
  }, [tsreg]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const nameoftc = row.nameoftc ? row.nameoftc.toLowerCase() : "";
      const nameofscc = row.nameofscc ? row.nameofscc.toLowerCase() : "";
      const empid = row.empid ? row.empid.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (nameoftc.includes(searchValue.toLowerCase()) ||
          nameofscc.includes(searchValue.toLowerCase()) ||
          empid.includes(searchValue.toLowerCase())) &&
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
          <Link underline="hover" color="inherit" to="/tsrr">
            TSR List
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3> TSR List</h3>
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
          <Link to="">
            {/*<button className="btn btn-primary">
                <FaFilter />
              </button> */}
          </Link>
          <DownloadTableExcel
            filename="Escalator_table"
            sheet="Escalator_table"
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
      <table border="1">
      <thead>
        <tr>
          <th rowSpan="2">ID</th>
          <th rowSpan="2">Created At</th>
          <th colSpan="9">TSR Imposition</th>
          <th colSpan="8">TSR Alteration</th>
          <th colSpan="7">TSR Cancellation</th>
          
        </tr>
        <tr>
          {/* TSR Imposition Sub-Headers */}
          <th>Date and Time</th>
          <th>Details</th>
          <th>Authority/Dept</th>
          <th>Reason</th>
          <th>Name of TC</th>
          <th>Emp.Id of TC</th>
          <th>Name of ACC.</th>
          <th>Emp.id of ACC</th>
          <th>Remarks</th>
          {/* TSR Alteration Sub-Headers */}
          <th>Date and Time</th>
          <th>Details</th>
          <th>Authority</th>
          <th>Name of TC</th>
          <th>Emp.Id of TC</th>
          <th>Name of ACC.</th>
          <th>Emp.id of ACC</th>
          <th>Remarks</th>
          {/* TSR Cancellation Sub-Headers */}
          <th>Date and Time</th>
          <th>Authority</th>
          <th>Name of TC</th>
          <th>Emp.Id of TC</th>
          <th>Name of ACC.</th>
          <th>Emp.id of ACC</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((row, index) => (
          <tr key={index}>
            <td>{row.form_id}</td>
            <td>{row.created_at}</td>

            {/* TSR Imposition Data */}
            <td>{row.tsrImposition?.dateTime || "-"}</td>
            <td>{row.tsrImposition?.details || "-"}</td>
            <td>{row.tsrImposition?.authority || "-"}</td>
            <td>{row.tsrImposition?.reason || "-"}</td>
            <td>{row.tsrImposition?.tcName || "-"}</td>
            <td>{row.tsrImposition?.tcEmpId || "-"}</td>
            <td>{row.tsrImposition?.accName || "-"}</td>
            <td>{row.tsrImposition?.accEmpId || "-"}</td>
            <td>{row.tsrImposition?.remarks || "-"}</td>

            {/* TSR Alteration Data */}
            <td>{row.tsrAlteration?.dateTime || "-"}</td>
            <td>{row.tsrAlteration?.details || "-"}</td>
            <td>{row.tsrAlteration?.authority || "-"}</td>
            <td>{row.tsrAlteration?.tcName || "-"}</td>
            <td>{row.tsrAlteration?.tcEmpId || "-"}</td>
            <td>{row.tsrAlteration?.accName || "-"}</td>
            <td>{row.tsrAlteration?.accEmpId || "-"}</td>
            <td>{row.tsrAlteration?.remarks || "-"}</td>

            {/* TSR Cancellation Data */}
            <td>{row.tsrCancellation?.dateTime || "-"}</td>
            <td>{row.tsrCancellation?.authority || "-"}</td>
            <td>{row.tsrCancellation?.tcName || "-"}</td>
            <td>{row.tsrCancellation?.tcEmpId || "-"}</td>
            <td>{row.tsrCancellation?.accName || "-"}</td>
            <td>{row.tsrCancellation?.accEmpId || "-"}</td>
            <td>{row.tsrCancellation?.remarks || "-"}</td>

            
      
       <td className=" ">
                  {row.status === "0" ? (
                    <div className="d-flex ">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: row.id }}
                        className="btn btn-primary align-content-center"
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(row.id);
                        }}
                      >
                        Save
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

export default TsrregList;
