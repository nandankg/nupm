import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import {
  addIncidentregister,
  fetchData,
  saveData,
} from "../../reducer/akshra/IncidentRegisterSignalsReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const IncidentRegisterSignalsList = () => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "lats.pdf" });
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const incidentregister = useSelector((state) => state.incidentsignals);
  const [slug, setSlug] = useState("");

  console.log(slug);
  console.log(incidentregister.data.data);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(items);

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
    if (incidentregister.data.data && incidentregister.data.data) {
      setItems(incidentregister.data.data);
      setSlug(incidentregister.slug);
      setFilteredItems(incidentregister.data.data);
    }
  }, [incidentregister]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const employee_id = row.employee_id ? row.employee_id.toLowerCase() : "";
      const details = row.details ? row.details.toLowerCase() : "";
      const reportedto = row.reportedto ? row.reportedto.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (employee_id.includes(searchValue.toLowerCase()) ||
          details.includes(searchValue.toLowerCase()) ||
          reportedto.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/equipment">
              Incident Signals
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> Incident Register Signals</h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between">
          <input
            type="search"
            name="search"
            placeholder="Search Here."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="d-flex align-items-center gap-3">
            <div className="date-box">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label=" From Date"
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
                {/*button className="btn btn-primary">
                <FaFilter />
              </button> */}
              </Link>
              <DownloadTableExcel
                filename="lats table"
                sheet="lats"
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
                style={{ border: "1px solid #0baa9a" }}
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
                <th>S.No</th>
                <th>Date</th>
                <th>Details Of Incident</th>
                <th>Emp.no</th>
                <th>Emp Name</th>
                <th>Designation</th>
                <th>Remarks</th>
                <th>Reported To</th>
                <th>Employee Id</th>
                {/* <th>Signature</th>*/}
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.details}</td>
                  <td>{item.reportedto}</td>
                  {/* <td>{item.sign}</td>*/}
                  <td>{item.employee_id}</td>
                  <td>{item.remarks}</td>
                  <td className=" ">
                    {item.status === "0" ? (
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
                          className="btn btn-primary"
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
    </>
  );
};

export default IncidentRegisterSignalsList;
