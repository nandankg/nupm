import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
} from "../reducer/ColorLightSignalMainlineReducer";
import { createSelector } from "reselect";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function SignalMainlineList() {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "signal-Mainline-List.pdf" });
  const foundrcvart = useSelector((state) => state.signallightstate || []);
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [fromDate, setFromdate] = useState(null);
  const [toDate, setTodate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  // const data = useSelector(selectSignalMainlineData);

  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const itmm = foundrcvart.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  useEffect(() => {
    if (foundrcvart.data && foundrcvart.data.data) {
      setItems(foundrcvart.data.data);

      setFilteredItems(foundrcvart.data.data);
    }
  }, [foundrcvart]);

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
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
  ];
  const quarterlyActivitiestwo = [
    { activity: "Voltage Check in LED Unit Red Aspect" },
    { activity: "Current Check in LED Unit Red Aspect" },
    { activity: "Voltage Check in LED Unit Violet Aspect" },
    { activity: "Current Check in LED Unit Violet Aspect" },
    { activity: "Voltage Check in LED Unit Green Aspect" },
    { activity: "Current Check in LED Unit Green Aspect" },
  ];
  const quarterlyActivitiesthree = [
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
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to={`/form/${slug}`}>
            COLOUR LIGHT SIGNAL MAINTENANCE RECORD QUARTERLY
          </Link>
          <Link underline="hover" color="inherit">
            View
          </Link>
        </Breadcrumbs>
      </div>
      {/* <h3> COLOUR LIGHT SIGNAL MAINTENANCE RECORD QUARTERLY </h3>
      <span className="line-box"></span> */}
      <div className="d-flex justify-content-between align-items-center">
        {/* <input
          type="search"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Here."
        /> */}
        <div className="d-flex align-items-center gap-3 mt-3">
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
        {filteredData?.map((item, indexsc) => (
          <div ref={tableRef} key={indexsc}>
            <>
              <table className="table" ref={tableRef}>
                <thead
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#fff",
                  }}
                >
                  <tr>
                    <th colSpan={1}>Revision - 00</th>
                    <th>O&M/SIGNAL/ LOG /SIG/{item?.id}</th>
                  </tr>
                  <tr>
                    <th>COLOUR LIGHT SIGNAL MAINTENANCE RECORD QUARTERLY</th>
                    <th>SUB-SYSTEM- IXL</th>
                  </tr>
                  <tr>
                    <th className="text-start">SIGNAL NO: {item?.signalno} </th>
                    <th>DATE: {item?.date}</th>
                  </tr>
                  <tr>
                    <th rowSpan={2}>Details of Maintenance Activity</th>

                    <th>{item?.quarterly[0]?.range || "Range (Quarter)"}</th>
                  </tr>
                  <tr>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyActivities.map((activities, index) => {
                    console.log(index);
                    console.log(item);
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
                        {/* <td>{quarterlyData ? quarterlyData.val : "N/A"}</td> */}
                        <td>{status}</td>{" "}
                        {/* Display status in the table body */}
                      </tr>
                    );
                  })}

                  <tr>
                    <th></th>
                    <th>Unit (volt/mA)</th>
                  </tr>
                  {quarterlyActivitiesthree.map((activity, index) => {
                    // Fetch the data from item.quarterlytwo
                    const quarterlyData = item.quarterlytwo?.[index] || {};

                    return (
                      <tr key={index}>
                        <td className="text-start">{activity.activity}</td>
                        <td>
                          {quarterlyData.val || " "} {quarterlyData.unit || ""}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th></th>
                    <th>Unit (volt/mA)</th>
                  </tr>
                  {quarterlyActivitiestwo.map((activity, index) => {
                    // Fetch the data from item.quarterlytwo
                    const quarterlyData = item.quarterlytwo?.[index] || {};

                    return (
                      <tr key={index}>
                        <td className="text-start">{activity.activity}</td>
                        <td>
                          {quarterlyData.val || " "} {quarterlyData.unit || ""}
                        </td>
                      </tr>
                    );
                  })}

                  <tr>
                    <th className="text-start">Remarks</th>
                    <td className="text-start">{item?.remarks}</td>
                  </tr>

                  <tr>
                    <th className="text-start">Name, Designation & Emp. No.</th>
                    <td className="text-start">
                      {item?.name}, {item?.designation}, {item?.employee_id}
                    </td>
                  </tr>
                  {/* <tr>
                    <th className="text-start">Counter Signature</th>
                    <td className="text-start">
                      {item?.countersign}
                    </td>
                  </tr> */}
                </tbody>
                <tr>
                  <td className=" " colSpan={2}>
                    {item.status === "0" || user.role === "Admin" ? (
                      <div>
                        <Link
                          to={`/edit/${slug}`}
                          state={{ id: item.id }}
                          className="btn btn-primary align-content-center mx-3"
                          style={{ width: "120px", padding: "10px" }}
                        >
                          Edit
                        </Link>
                        <button
                          type="submit"
                          onClick={() => handleSave(item.id)}
                          style={{ width: "120px", padding: "10px" }}
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </table>
            </>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SignalMainlineList;
