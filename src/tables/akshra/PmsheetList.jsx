import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchData, saveData } from "../../reducer/akshra/PmsheetReducer";

import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";

import { DownloadTableExcel } from "react-export-table-to-excel";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const PmsheetList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);

  const { toPDF, targetRef } = usePDF({ filename: "PMSHEET.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const PMsheetList = useSelector((state) => state.PmsheetMonthly);
  const [slug, setSlug] = useState("");
  const itmm = PMsheetList.data.data;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  let filteredItems;

  if (itmm) {
    filteredItems = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredItems);
  }
  const handleSave = (id) => {
    dispatch(saveData(id));
  };

  // useEffect(() => {
  // Initialize items from local storage
  // const storedItems =
  //   JSON.parse(localStorage.getItem("PMsheetList")) || [];
  //  if (storedItems.length > 0) {
  //   console.log("Initializing from local storage:", storedItems);
  //   dispatch(addsheet(storedItems));
  //  }
  // }, [dispatch]);
  // useEffect(() => {
  // Initialize items from local storage
  // const storedItems =
  // JSON.parse(localStorage.getItem("PMsheetList")) || [];
  // if (storedItems.length > 0) {
  //  console.log("Initializing from local storage:", storedItems);
  //   dispatch(addsheet(storedItems));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Sync local storage with Redux store
  //   console.log("Updating local storage:", PMsheetMonthlyList);
  //   if (PMsheetMonthlyList?.length > 0) {
  //     localStorage.setItem(
  //       "PMsheetMonthlyList",
  //       JSON.stringify(PMsheetMonthlyList)
  //     );
  //   }
  // }, [PMsheetMonthlyList]);

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/pmsheet/register">
              PM Sheet (STATION) Monthly
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3>PM Sheet (STATION) Monthly List</h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between">
          <DownloadTableExcel
            filename="PMSHHET_table"
            sheet="=PMSHHET_table"
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
        {filteredItems?.toReversed().map((item, index) => {
          return (
            <>
              <table>
                <thead>
                  <tr>
                    <th colSpan={2} className="text-start">
                      Station :{item.station}{" "}
                    </th>
                    <th>Date : {item.date}</th>
                    <th style={{ width: "250px" }}>
                      DOC Annexure-II, version 1.0{" "}
                    </th>
                  </tr>

                  <tr>
                    <th>System</th>
                    <th colSpan={2}>Activity</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={8}>PAS</td>
                    <td className="text-start" colSpan={2}>
                      Check announcements at all zones by making local and
                      central announcements. To be checked by visual inspection
                      and observation and record the dB values from NCO.&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[0].activities[0].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      Previous Values
                      <br />
                      Zone 1 : {
                        item.systems[0].activities[0].BCC1.values[0]
                      }{" "}
                      &nbsp; &nbsp; Zone 2:{" "}
                      {item.systems[0].activities[0].BCC1.values[1]} &nbsp;
                      &nbsp; Zone 3 :{" "}
                      {item.systems[0].activities[0].BCC1.values[2]} &nbsp;
                      &nbsp; Zone 4 :{" "}
                      {item.systems[0].activities[0].BCC1.values[3]} &nbsp;
                      &nbsp; Zone 5 :{" "}
                      {item.systems[0].activities[0].BCC1.values[4]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start">
                      After Modification(if any)
                      <br />
                      Zone 1 : {
                        item.systems[0].activities[0].BCC2.values[0]
                      }{" "}
                      &nbsp; &nbsp; Zone 2:{" "}
                      {item.systems[0].activities[0].BCC1.values[1]} &nbsp;
                      &nbsp; Zone 3 :{" "}
                      {item.systems[0].activities[0].BCC1.values[2]} &nbsp;
                      &nbsp; Zone 4 :{" "}
                      {item.systems[0].activities[0].BCC1.values[3]} &nbsp;
                      &nbsp; Zone 5 :{" "}
                      {item.systems[0].activities[0].BCC1.values[4]} &nbsp;
                      &nbsp;
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Check the working of all microphones&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[0].activities[1].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      PSB1 &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[0].activities[1].subCheckboxes.PSB1
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      PSB2 &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[0].activities[1].subCheckboxes.PSB2
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Remove Temporary files and run disk cleanup on HMI&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[0].activities[2].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Check if disk free space is atleast 10% of disk size in
                      HMI
                      <input
                        type="checkbox"
                        checked={
                          item.systems[0].activities[3].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Check & Record Max. CPU and RAM Utilization values in HMI
                      (shall be greater 80%)
                      <input
                        type="checkbox"
                        checked={
                          item.systems[0].activities[4].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start">
                      CPU : {item.systems[0].activities[4].subInputValues.CPU}%{" "}
                      <br /> RAM :{" "}
                      {item.systems[0].activities[4].subInputValues.RAM}%
                    </td>
                  </tr>
                  <tr>
                    {/* PIDS */}
                    <td rowSpan={2}>PIDS</td>
                    <td className="text-start" colSpan={2}>
                      1.Check PIDS panel all LED status by sending letter "l"
                      from HMI
                      <input
                        type="checkbox"
                        checked={
                          item.systems[1].activities[0].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>

                  <tr>
                    <td className="text-start" colSpan={2}>
                      2.Check HDD LED status of IPBX-1 & IPBX-2&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[1].activities[1].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  {/* FOTS */}
                  <tr>
                    <td>FOTS</td>
                    <td className="text-start" colSpan={2}>
                      Verification of Signal for Main and Standby paths for
                      different FOTS rings by using NMS (Check links to adjacent
                      nodes only).
                      <input
                        type="checkbox"
                        checked={
                          item.systems[2].activities[0].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td rowSpan={5}>Tele Phone</td>
                    <td className="text-start" colSpan={2}>
                      1.Check the functionality of IP phone &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[3].activities[0].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      2.Cleaning of external surface of EPABX-1 & IPBX &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[3].activities[1].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      3. Check the abnormal shutdown of recorder from event
                      viewer &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[3].activities[2].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      4.Verify time synchronization for HMI & NVR &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[3].activities[3].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      5. Check status of both help phone & emergency phone and
                      make a call &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[3].activities[4].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>

                  {/* cctv  */}
                  <tr>
                    <td rowSpan={9}>CCTV</td>
                    <td className="text-start" colSpan={2}>
                      1. External cleaning of CCTV rack equipment&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[4].activities[0].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      2. Reviewing of windows event viewer in NVR&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[4].activities[1].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      3. Check for abnormal shutdown of recorder from event
                      viewer&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[4].activities[2].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      4. Verify time synchronization for HMI & NVR&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[4].activities[3].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      5. Reviewing disk management in NVR&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[4].activities[4].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      6.Remove Temporary files and run disk cleanup in CCTV
                      HMI&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[4].activities[5].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      7.External cleaning of all cameras in platform, Concourse
                      & Entry/Exit Areas.&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[4].activities[6].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      8. Check if disk free space is atleast 10% of disk size in
                      CCTV HMI &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[4].activities[7].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>

                  <tr>
                    <td className="text-start" colSpan={2}>
                      9.Check & Record Max.CPU & RAM Utilization status in CCTV
                      HMI (shall be 80%)&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[4].activities[8].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start">
                      CPU : {item.systems[4].activities[8].subInputValues.CPU}%{" "}
                      <br /> RAM :{" "}
                      {item.systems[4].activities[8].subInputValues.RAM}%
                    </td>
                  </tr>
                  {/* CLOCK */}
                  <tr>
                    <td rowSpan={4}>CLOCK</td>
                    <td className="text-start" colSpan={2}>
                      1. Check Back light status of Analog Clock &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[5].activities[0].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      2. Check the working of all indoor & outdoor digital clock
                      and Analog Clock &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[5].activities[1].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      3. External Cleaning of Platform Digital & Analog clocks
                      &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[5].activities[2].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      4. Check Sync. Status of Sub-master clock unit.&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[5].activities[3].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>

                  {/* radio  */}
                  <tr>
                    <td rowSpan={9}>Radio</td>
                    <td className="text-start">
                      1.Check status of TSC, BR and DPM&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[6].activities[0].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      2.Cleaning of RCPs, Call functions, RCP Antenna
                      checking&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[6].activities[1].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      Group Call &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[6].activities[1].subCheckboxes.Group_Call
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start">
                      Text Message Sending &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[6].activities[1].subCheckboxes
                            .Text_Message_Sending
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      Private Call &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[6].activities[1].subCheckboxes
                            .Private_Call
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start">
                      Emergency Call &nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[6].activities[1].subCheckboxes
                            .Emergency_Call
                        }
                        disabled
                      />{" "}
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      3.Verify Tower Aviation lamp status&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[6].activities[2].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>

                  <tr>
                    <td className="text-start" colSpan={2}>
                      4.Check RSSI level in SCR (above -95 dBm)&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[6].activities[3].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      RCP Radio ID:&nbsp;
                      <span className="text-decoration-underline">
                        {
                          item.systems[6].activities[3].subInputValues
                            .RCP_Radio_ID
                        }
                      </span>
                      <br />
                      RSSI value: (-){" "}
                      <span className="text-decoration-underline">
                        {
                          item.systems[6].activities[3].subInputValues
                            .RSSI_value
                        }
                      </span>
                      dBm
                    </td>
                    <td className="text-start">
                      HP Radio ID:
                      <span className="text-decoration-underline">
                        {
                          item.systems[6].activities[3].subInputValues
                            .P_Radio_ID
                        }
                      </span>
                      <br /> RSSI value : (-)
                      <span className="text-decoration-underline">
                        {
                          item.systems[6].activities[3].subInputValues
                            .RSSI_value2
                        }
                      </span>
                      dBm
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      5.External cleaning of RCP&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[6].activities[4].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      6.Check the status of All Module(TSC,BR,PSU,Fan Rack etc.)
                      of MTS-4&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[6].activities[5].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  {/* radio ibs  */}
                  <tr>
                    <td>Radio - IBS</td>
                    <td className="text-start" colSpan={2}>
                      1.Cleaning of RCPs, Call functions, RCP Antenna
                      checking&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[7].activities[0].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>

                  {/* ACS  */}
                  <tr>
                    <td rowSpan={2}>ACS</td>
                    <td className="text-start" colSpan={2}>
                      1.Check the Power ON Status of EML of Doors&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[8].activities[0].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      2.Check the physical inspection of EML and Reader&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[8].activities[1].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  {/* MiSC  */}
                  <tr>
                    <td rowSpan={3}>MISC</td>
                    <td className="text-start" colSpan={2}>
                      1. Perform Cleaning of all the Racks and External Cleaning
                      of all the Rack Equipments in TER&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[9].activities[0].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      2. Check the status of Rack Fans&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[9].activities[1].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      3. Check status of Earthing cables of each Rack & its
                      Equipments&nbsp;
                      <input
                        type="checkbox"
                        checked={
                          item.systems[9].activities[2].checked == "yes"
                            ? true
                            : false
                        }
                        disabled
                      />
                    </td>
                    <td className="text-start"></td>
                  </tr>

                  {/* notes  */}
                  <tr>
                    <td
                      className="text-start"
                      style={{ height: "80px" }}
                      colSpan={4}
                    >
                      Notes : {item.notes}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={4}>
                      Supervisor Name : {item.SName}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {/*Signature : {item.Ssignature}*/}
                      <br /> EMP ID:{item.SempId}{" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Date & Time:{item.SdateTime}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={4}>
                      Maintainer Name: {item.MName}{" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {/*Signature
                      : {item.Msignature}*/}
                      <br /> EMP ID: {item.MempId}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Date & Time:
                      {item.MdateTime}
                    </td>
                  </tr>
                </tbody>
              </table>

              <td className="d-flex gap-3 mt-3 justify-content-end">
                {item.status === "0" ? (
                  <div className="d-flex ">
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: item.id }}
                      className="btn btn-primary align-content-center mx-3"
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
            </>
          );
        })}
      </div>
    </>
  );
};

export default PmsheetList;
