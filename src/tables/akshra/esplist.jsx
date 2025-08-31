import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
} from "../../reducer/akshra/SignalMainlineReducer";
import { createSelector } from "reselect";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function SignalMainlineList() {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "signal-Mainline-List.pdf" });
  const foundrcvart = useSelector((state) => state.signallightstate || []);

  const [fromDate, setFromdate] = useState(null);
  const [toDate, setTodate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  // const data = useSelector(selectSignalMainlineData);

  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState("");
  console.log(slug);

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
    if (foundrcvart.data && foundrcvart.data.data) {
      setItems(foundrcvart.data.data);
      setSlug(foundrcvart.slug);
      setFilteredItems(foundrcvart.data.data);
    }
  }, [foundrcvart]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const signalno = row.signalno ? row.signalno.toLowerCase() : "";
      const empno = row.empno ? row.empno.toLowerCase() : "";
      const name_var = row.name ? row.name.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (signalno.includes(searchValue.toLowerCase()) ||
          empno.includes(searchValue.toLowerCase()) ||
          name_var.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
  };

  const handleSave = (id) => {
    dispatch(saveData(id));
  };

  const quarterlyActivities = [
    { activity: "Cleaning of Aspect Housing & LED Unit." },
    { activity: "LED Functioning." },
    { activity: "Earthing Verification." },
    { activity: "Cleaning of MSB" },
    { activity: "Tightening of all terminations inside MSB & Signal Unit" },
    { activity: "Proper illumination of LED" },
    { activity: "Tightening of all Nuts & Bolts including Ladder" },
    { activity: "Healthiness of all Supports, Brackets & Foundation etc." },
    { activity: "Corrosion Observed/Painting Needed" },
    { activity: "Voltage Check in LED Unit Red Aspect" },
    { activity: "Current Check in LED Unit Red Aspect" },
    { activity: "Voltage Check in LED Unit Violet Aspect" },
    { activity: "Current Check in LED Unit Violet Aspect" },
    { activity: "Voltage Check in LED Unit Green Aspect" },
    { activity: "Current Check in LED Unit Green Aspect" },
    { activity: "Cleaning of Route Indicator Housing." },
    { activity: "Voltage in M-Aspect" },
    { activity: "Current in M-Aspect" },
    { activity: "Voltage in D-Aspect" },
    { activity: "Current in D-Aspect" },
    { activity: "Voltage in S-Aspect" },
    { activity: "Current in S-Aspect" },
  ];

  return (
    <div className="container" style={{ maxWidth: "98%" }}>
      <div role="presentation" className="bredcrumbs">
        {/* <Breadcrumbs aria-label="breadcrumb">
         <Link underline="hover" color="inherit" to={/form/${slug}}>
            COLOUR LIGHT SIGNAL MAINTENANCE RECORD QUARTERLY
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>*/}
      </div>
      <h3> COLOUR LIGHT SIGNAL MAINTENANCE RECORD QUARTERLY </h3>
      <span className="line-box"></span>
      <div className="d-flex justify-content-between align-items-center">
        <input
          type="search"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Here."
        />
        <div className="d-flex align-items-center gap-3 mt-3">
          <div className="date-box">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromdate(newValue.startOf("day"))}
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
                onChange={(newValue) => setTodate(newValue.endOf("day"))}
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
              filename="Signal-Mainline-list_table"
              sheet="Signal-Mainline-list_table"
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
        {filteredItems?.map((item, indexsc) => (
          <div ref={tableRef} key={indexsc}>
            <div style={{ overflow: "scroll", height: "70vh" }}>
              <table className="table">
                <thead
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#fff",
                  }}
                >
                  <tr>
                    <th colSpan={1}>Revision - 00</th>
                    <th colSpan={2}>O&M/SIGNAL/ LOG /SIG/08</th>
                  </tr>
                  <tr>
                    <th colSpan={3}>
                      COLOUR LIGHT SIGNAL MAINTENANCE RECORD QUARTERLY
                    </th>
                  </tr>
                  <tr>
                    <th className="text-start">SIGNAL NO: {item?.signalno}</th>
                    <th>DATE: {item?.date}</th>
                    <th>SUB-SYSTEM- IXL</th>
                  </tr>
                  <tr>
                    <th rowSpan={2}>Details of Maintenance Activity</th>
                    <th rowSpan={2}>Unit (volt/mA)</th>
                    <th>{item?.quarterly[0]?.range || "Range (Quarter)"}</th>
                  </tr>
                  <tr>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyActivities.map((activities, index) => {
                    // Fetch the quarterly data based on index
                    const quarterlyData = item.quarterly[index];

                    // Determine the status dynamically based on data
                    const status = quarterlyData
                      ? quarterlyData.checked
                      : "N/A";

                    // Render the row with status instead of range
                    return (
                      <tr key={index}>
                        <td className="text-start">{activities.activity}</td>
                        <td>{quarterlyData ? quarterlyData.val : "N/A"}</td>
                        <td>{status}</td>{" "}
                        {/* Display status in the table body */}
                      </tr>
                    );
                  })}
                  <tr>
                    <th className="text-start">Remarks</th>
                    <td className="text-start" colSpan={2}>
                      {item?.remarks}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start">Signature</th>
                    <td className="text-start" colSpan={2}>
                      {item?.signature}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start">Name, Designation & Emp. No.</th>
                    <td className="text-start" colSpan={2}>
                      {item?.name}, {item?.designation}, {item?.empno}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start">Counter Signature</th>
                    <td className="text-start" colSpan={2}>
                      {item?.countersign}
                    </td>
                  </tr>
                </tbody>
                <tr>
                  <td className=" " colSpan={3}>
                    {item.status === "0"
                      ? {
                          /*  <div>
                        <Link
                          to={/edit/${slug}}
                          state={{ id: item.id }}
                          className="btn btn-primary"
                        >
                          Edit
                        </Link>
                        <button
                          type="submit"
                          onClick={() => handleSave(item.id)}
                          style={{ padding: "7px 15px", marginLeft: "10px" }}
                        >
                          Submit
                        </button>
                      </div>*/
                        }
                      : ""}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SignalMainlineList;
