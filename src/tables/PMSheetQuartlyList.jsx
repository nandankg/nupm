import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchData, saveData } from "../reducer/PmSheetReducer";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const PmSheetList = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "PMsheetquaterlyregister.pdf",
  });
  const [fromDate, setFromdate] = useState();
  const [toDate, setTodate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const addafcMonthly = useSelector((state) => state.pmsheetstate || []);
  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const itmm = addafcMonthly.data.data;
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }

  useEffect(() => {
    if (addafcMonthly.data && addafcMonthly.data.data) {
      setItems(addafcMonthly.data.data);

      setFilteredItems(addafcMonthly.data.data);
    }
  }, [addafcMonthly]);

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };

  return (
    <div className="container">
      <h3>PM Sheet Quarterly Maintanance Schedule</h3>
      <span className="line-box"></span>
      <div className="d-flex justify-content-between align-items-center">
        {/* <input
          type="search"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Here."
        /> */}
        <div className="d-flex align-items-center gap-3 mt-3">
          <div className="d-flex gap-3">
            <DownloadTableExcel
              filename="PMSheetQuarterly_table"
              sheet="PMSheetQuarterly_table"
              currentTableRef={tableRef.current}
            >
              <button className="btn" style={{ border: "1px solid #0baa9a " }}>
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
        {filteredData?.map((item, index) => (
          <div ref={tableRef} key={index}>
            <table>
              <thead>
                <tr>
                  <th className="text-start" colSpan="2">
                    STATION: {item?.station}
                  </th>
                  <th className="text-start" colSpan="3">
                    DATE: {item?.date}
                  </th>
                  <th className="text-start" colSpan={3}>
                    DOC: Annexure-III, Version:1.0
                  </th>
                </tr>
                <tr>
                  <th className="text-start" colSpan="5">
                    Quarterly MAINTENANCE SCHEDULE
                  </th>
                  <th className="text-start" colSpan={3}>
                    DOCUMENT: O&M/Tele/CH02
                  </th>
                </tr>
                <tr>
                  <th>System</th>
                  <th colSpan={2}>Activity</th>
                  <th>Checkbox</th>
                  <th colSpan={4}>Remark</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={8}>PAS</td>

                  <td className="text-start" colSpan={2}>
                    1.Checking of HMI functionalities
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[0].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[0]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={1} rowSpan={2}>
                    1 a.Making Live announcements
                  </td>
                  <td className="text-start" colSpan={1}>
                    HMI Normal:
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[1].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[1]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={1}>
                    HMI Emergency:
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[2].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[2]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    1 b.Message recording, preview and announcement:
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[3].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[3]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    1 c.Message Scheduling & Repetition:
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[4].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[4]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    2.Check message origin status in HMI
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[5].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[5]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    3. External cleaning of speakers at all Zones
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[6].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[6]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    4.Perform disk defragmentation and restart HMI.
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[7].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[7]?.remark}
                  </td>
                </tr>

                <tr>
                  <td rowSpan={4}>FOTS</td>
                  <td className="text-start" colSpan={2}>
                    1.Login individual SWs for Alarms
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[8].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[8]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    2.Check Redundant power suppy status of DSW
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[9].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[9]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    3.Check Redundant Power supply status of ASW
                  </td>
                  <td
                    className="text-start"
                    style={{ textAlign: "center" }}
                    rowSpan={2}
                  >
                    <span>
                      {item?.activities2[0].ch2 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={2}>
                    {item?.activities2[0]?.remark2}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={1}>
                    Voltage:
                  </td>
                  <th className="text-start" colSpan={1}>
                    {item?.activities2[0]?.input} V
                  </th>
                  {/* <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities2[0].ch2 === "yes" ? "Yes" : "No"}
                    </span>
                  </td> */}

                  {/* <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities2[0]?.remark2}
                  </td> */}
                </tr>
                <tr>
                  <td className="text-start" rowSpan={3}>
                    Tele-Phone
                  </td>
                  <td className="text-start" colSpan={2}>
                    1.Checking of Power Supply Voltage on Back panel of Media
                    Gatway (-45Vdc to -57Vdc)
                  </td>
                  <td
                    className="text-start"
                    style={{ textAlign: "center" }}
                    rowSpan={2}
                  >
                    <span>
                      {item?.activities2[1].ch2 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={2}>
                    {item?.activities2[1]?.remark2}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={1}>
                    Voltage:
                  </td>
                  <th className="text-start" colSpan={1}>
                    {item?.activities2[1]?.input} Vdc
                  </th>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    2.Physical inspection of IDF & MDF
                  </td>

                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[10].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[10]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" rowSpan={4}>
                    CCTV
                  </td>
                  <td className="text-start" colSpan={2}>
                    1.External Cleaning of all Cameras in Depot Boundary, RSS,
                    Workshop, SBL,IBL & Staff Zone
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[11].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[11]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    2.Check for Focussing and alignment of all cameras in All
                    Zone
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[12].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[12]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2} rowSpan={2}>
                    3.Check & REcord Max CPU and RAM Utilization values in NVR
                    (shall be 80%)
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities2[2].ch2 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>
                  <th colSpan={2}>CPU: {item?.activities2[2]?.input} %</th>
                  <td className="text-start" colSpan={2} rowSpan={1}>
                    {item?.activities2[2]?.remark2}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities2[3].ch2 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>
                  <th colSpan={2}>RAM: {item?.activities1[3]?.input} %</th>
                  <td className="text-start" colSpan={2} rowSpan={1}>
                    {item?.activities2[3]?.remark2}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" rowSpan={2}>
                    Clock
                  </td>
                  <td className="text-start" colSpan={2}>
                    1.Check network ping test of MCL and SMCLK
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[13].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[13]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    2.Voltage Mrasurements at data SPD/Terminal block ouput to
                    measure Time Code Signal (shall be greater then 24Vdc.)
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities2[4].ch2 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>
                  <th colSpan={2}>{item?.activities2[4]?.input}Vdc</th>
                  <td className="text-start" colSpan={2} rowSpan={1}>
                    {item?.activities2[4]?.remark2}
                  </td>
                </tr>
                <tr>
                  <td className="text-start">Radio</td>
                  <td className="text-start" colSpan={2}>
                    1.External cleaning of all Modules of Train Radio
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[14].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[14]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" rowSpan={2}>
                    ACDB
                  </td>
                  <td className="text-start" colSpan={2}>
                    1.Check for Correctness.tightness of MCBs.
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[15].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[15]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    2.Measure the Output Voltages and observe for any
                    Abnormalities.
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[16].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[16]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" rowSpan={2}>
                    ACS
                  </td>
                  <td className="text-start" colSpan={2}>
                    1.Verify the Buzzer functioning
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[17].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[17]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    2.Verify the Emergency glass functioning
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[18].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[18]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start">VIDEOWALL</td>
                  <td className="text-start" colSpan={2}>
                    1.External Cleaning of all cubicals, video engine &
                    controller
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[19].ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[19]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start">UPS</td>
                  <td className="text-start" colSpan={2}>
                    1.Load test of battery bank 1 & 2
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[20]?.ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[20]?.remark}
                  </td>
                </tr>
                <tr>
                  <td className="text-start">SMPS</td>
                  <td className="text-start" colSpan={2}>
                    1.Load test of battery bank 1 & 2
                  </td>
                  <td className="text-start" style={{ textAlign: "center" }}>
                    <span>
                      {item?.activities1[21]?.ch1 === "yes" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="text-start" colSpan={4} rowSpan={1}>
                    {item?.activities1[21]?.remark}
                  </td>
                </tr>

                <tr>
                  <th colSpan={9}>NOTES:</th>
                </tr>
                <tr>
                  <td colSpan={9}>{item?.notes}</td>
                </tr>
                <tr>
                  <th>Supervisor Name:- </th>
                  <td>{item?.sup_name} </td>
                  {/* <th >Signature:- </th>
                  <td >{item?.sup_sign} </td> */}
                  <th>Emp ID:- </th>
                  <td>{item?.sup_id} </td>
                  <th colSpan={2}>Date and Time:-</th>
                  <td>{item?.sup_date} </td>
                </tr>
                <tr>
                  <th>Maintainer Name:- </th>
                  <td>{item?.mtn_name} </td>
                  {/* <th >Signature:- </th>
                  <td >{item?.mtn_sign} </td> */}
                  <th>Emp ID:- </th>
                  <td>{item?.mtn_id} </td>
                  <th>Date and Time:-</th>
                  <td colSpan={2}>{item?.mtn_date} </td>
                </tr>
              </tbody>
              <tr>
                <td className=" " colSpan={13}>
                  {item.status === "0" || user.role === "Admin" ? (
                    <div>
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        style={{ width: "120px", padding: "10px" }}
                        className="btn btn-primary align-content-center mx-3"
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(item.id);
                        }}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PmSheetList;
