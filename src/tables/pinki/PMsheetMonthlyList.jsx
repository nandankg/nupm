import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import {
  addPMsheetMonthly,
  fetchData,
  saveData,
} from "../../reducer/pinki/PMsheetMonthlyDepotReducer";

const PMsheetMonthlyList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "PMSheetMonthly.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const pmsheetmonthly = useSelector((state) => state.pmsheetmonthly);
  const [slug, setSlug] = useState("");
  const itmm = pmsheetmonthly.data.data;
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
    navigate(`list/${slug}`);
  };

  useEffect(() => {
    if (pmsheetmonthly.data && pmsheetmonthly.data.data) {
      setSlug(pmsheetmonthly.slug);
    }
  }, [pmsheetmonthly]);

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              PM Sheet Monthly
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3>PM Sheet Monthly List</h3>
        <span className="line-box"></span>
        <div className="d-flex gap-3">
          <Link to="">
            {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
          </Link>
          <DownloadTableExcel
            filename="PmSheetMonthly"
            sheet="PmSheetMonthly"
            currentTableRef={targetRef.current}
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
        <div ref={targetRef}>
          {filteredItems?.toReversed().map((item, index) => {
            {
              console.log(item);
            }
            return (
              <>
                <table>
                  <thead>
                    <tr>
                      <th colSpan={2} className="text-start">
                        Station :{item.station}{" "}
                      </th>
                      <th>Date : {item.date}</th>
                      <th colSpan={2} style={{ width: "250px" }}>
                        DOC Annexure-II, version 1.0{" "}
                      </th>
                    </tr>

                    <tr>
                      <th>System</th>
                      <th colSpan={2}>Activity</th>

                      <th>Remark</th>
                      <th>Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={8}>PAS</td>
                      <td className="text-start" colSpan={2}>
                        Check announcements at all zones by making local and
                        central announcements. To be checked by visual
                        inspection and observation and record the dB values from
                        NCO.&nbsp;
                      </td>
                      <td className="text-start"></td>
                      <td>
                        {" "}
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
                        &nbsp;
                      </td>
                      <td className="text-start">
                        Previous Values
                        <br />
                        Zone 1 : {
                          item.systems[0].activities[0].BCC2.values[0]
                        }{" "}
                        &nbsp; &nbsp; Zone 2:{" "}
                        {item.systems[0].activities[0].BCC2.values[1]} &nbsp;
                        &nbsp; Zone 3 :{" "}
                        {item.systems[0].activities[0].BCC2.values[2]} &nbsp;
                        &nbsp;
                      </td>
                      <td> {item.systems[0].activities[0].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check the working of all microphones&nbsp;
                      </td>
                      <td>
                        {" "}
                        <td> {item.systems[0].activities[1].remark}</td>
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start">DCC Mic &nbsp;</td>
                      <td></td>
                      <td> </td>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            item.systems[0].activities[1].subCheckboxes.DCC_Mic
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">PPIO Mic &nbsp;</td>
                      <td></td>
                      <td> </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            item.systems[0].activities[1].subCheckboxes.PPIO_Mic
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Remove Temporary files and run disk cleanup on HMI&nbsp;
                      </td>
                      {/* <td className="text-start"></td> */}
                      <td> {item.systems[0].activities[2].remark}</td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check if disk free space is atleast 10% of disk size in
                        HMI
                      </td>
                      <td> {item.systems[0].activities[3].remark}</td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check & Record Max. CPU and RAM Utilization values in
                        HMI (shall be greater 80%)
                      </td>
                      <td className="text-start">
                        CPU : {item.systems[0].activities[4].subInputValues.CPU}
                        % <br /> RAM :{" "}
                        {item.systems[0].activities[4].subInputValues.RAM}%
                      </td>
                      <td>
                        {" "}
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
                    </tr>

                    <tr>
                      <td>FOTS</td>
                      <td className="text-start" colSpan={2}>
                        Verification of Signal for Main and Standby paths for
                        different FOTS rings by using NMS (Check links to
                        adjacent nodes only).
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[1].activities[0].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td rowSpan={6}>Tele Phone</td>
                      <td className="text-start" colSpan={2}>
                        1.Check LED status of all EPABX cards &nbsp;
                      </td>
                      <td> {item.systems[2].activities[0].remark}</td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2.Check HDD LED status of IPBX-1 & IPBX-2&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[2].activities[1].remark}
                      </td>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        3. Check the functionality of IP phone & FSR&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[2].activities[2].remark}
                      </td>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[2].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        4.Verify Backup of all EPABX data on OCC/BCC-NMS ( also
                        when subscriber reconfigured and H/w changed)&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[2].activities[3].remark}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[3].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        5. Cleaning of external surface of EPABX & IPBX&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[2].activities[4].remark}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[4].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        6. Check Internode & PSTN calls functionality for all
                        phones (DCC)&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[2].activities[5].remark}
                      </td>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[5].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>

                    {/* cctv  */}
                    <tr>
                      <td rowSpan={11}>CCTV</td>
                      <td className="text-start" colSpan={2}>
                        1. External cleaning of CCTV rack equipment&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[3].activities[0].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2. Reviewing of windows event viewer in NVR&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[3].activities[1].remark}
                      </td>
                      <td>
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        3. Check for abnormal shutdown of recorder from event
                        viewer&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[3].activities[2].remark}
                      </td>
                      <td>
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        4. Verify time synchronization for HMI & NVR&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[3].activities[3].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        5. Reviewing disk management in NVR&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[3].activities[4].remark}
                      </td>
                      <td>
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        6.Remove Temporary files and run disk cleanup in CCTV
                        HMI&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[3].activities[5].remark}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            item.systems[3].activities[5].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        7.Run server administrator in NVR and check all
                        Hardware&nbsp; status
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[3].activities[6].remark}
                      </td>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            item.systems[3].activities[6].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        8. External cleaning of all cameras&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[3].activities[7].remark}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            item.systems[3].activities[7].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        9.Check if disk free space is atleast 10% of disk size
                        in CCTV & SECURITY HMI&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[3].activities[8].remark}
                      </td>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            item.systems[3].activities[8].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        10.Check & Record Max.CPU & RAM Utilization status in
                        CCTV HMI (shall be 80%)&nbsp;
                      </td>
                      <td className="text-start">
                        CPU : {item.systems[3].activities[9].subInputValues.CPU}
                        % <br /> RAM :{" "}
                        {item.systems[3].activities[9].subInputValues.RAM}%
                      </td>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            item.systems[3].activities[9].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        11.Check & Record Max.CPU & RAM Utilization status in
                        SEC HMI (shall be 80%)&nbsp;
                      </td>
                      <td className="text-start">
                        CPU :{" "}
                        {item.systems[3].activities[10].subInputValues.CPU}%{" "}
                        <br /> RAM :{" "}
                        {item.systems[3].activities[10].subInputValues.RAM}%
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[3].activities[10].remark}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            item.systems[3].activities[10].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>

                    {/* radio  */}
                    <tr>
                      <td rowSpan={12}>Radio</td>
                      <td className="text-start">
                        1.Check status of TSC, BR and DPM&nbsp;
                      </td>
                      <td></td>
                      <td className="text-start">
                        {" "}
                        {item.systems[4].activities[0].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2.Cleaning of RCPs, Call functions, RCP Antenna
                        checking&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[4].activities[1].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start">
                        Group Call &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[4].activities[1].subCheckboxes
                              .Group_Call
                          }
                          disabled
                        />
                      </td>
                      <td className="text-start">
                        Text Message Sending &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[4].activities[1].subCheckboxes
                              .Text_Message_Sending
                          }
                          disabled
                        />
                      </td>
                      <td className="text-start"> </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Private Call &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[4].activities[1].subCheckboxes
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
                            item.systems[4].activities[1].subCheckboxes
                              .Emergency_Call
                          }
                          disabled
                        />{" "}
                      </td>
                      <td className="text-start"> </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        3.Verify Tower Aviation lamp status&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[4].activities[2].remark}
                      </td>
                      <td>
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        4.Check Call functions of DCC_RCW&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[4].activities[3].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start">
                        Group Call &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[4].activities[3].subCheckboxes
                              .Group_Call
                          }
                          disabled
                        />
                      </td>
                      <td className="text-start">
                        Text Message Sending &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[4].activities[3].subCheckboxes
                              .Text_Message_Sending
                          }
                          disabled
                        />
                      </td>
                      <td className="text-start"> </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Private Call &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[4].activities[3].subCheckboxes
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
                            item.systems[4].activities[3].subCheckboxes
                              .Emergency_Call
                          }
                          disabled
                        />{" "}
                      </td>
                      <td className="text-start"> </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        5.Check RSSI level in DCC (above -95 dBm)&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[4].activities[4].remark}
                      </td>
                      <td>
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        RCP Radio ID:&nbsp;
                        <span className="text-decoration-underline">
                          {
                            item.systems[4].activities[4].subInputValues
                              .RCP_Radio_ID
                          }
                        </span>
                        <br />
                        RSSI value: (-){" "}
                        <span className="text-decoration-underline">
                          {
                            item.systems[4].activities[4].subInputValues
                              .RSSI_value
                          }
                        </span>
                        dBm
                      </td>
                      <td className="text-start">
                        HP Radio ID:
                        <span className="text-decoration-underline">
                          {
                            item.systems[4].activities[4].subInputValues
                              .P_Radio_ID
                          }
                        </span>
                        <br /> RSSI value : (-)
                        <span className="text-decoration-underline">
                          {
                            item.systems[4].activities[4].subInputValues
                              .RSSI_value2
                          }
                        </span>
                        dBm
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        6.External cleaning of RCP&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[4].activities[5].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        7.Check the status of All Module(TSC,BR,PSU,Fan Rack
                        etc.) of MTS-4&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[4].activities[6].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    {/* radio ibs  */}
                    <tr>
                      <td>Radio - IBS</td>
                      <td className="text-start" colSpan={2}>
                        2.Cleaning of RCPs, Call functions, RCP Antenna
                        checking&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[5].activities[0].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>

                    {/* MCS  */}
                    <tr>
                      <td rowSpan={2}>MCS</td>
                      <td className="text-start" colSpan={2}>
                        1.Check the working of all indoor & outdoor digital
                        clock&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[6].activities[0].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2.Check Sync. Status of Sub-master clock unit.&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[6].activities[1].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    {/* ACS  */}
                    <tr>
                      <td rowSpan={2}>ACS</td>
                      <td className="text-start" colSpan={2}>
                        1.Check the Power ON Status of EML of Doors&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[7].activities[0].remark}
                      </td>
                      <td>
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2.Check the physical inspection of EML and Reader&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[7].activities[1].remark}
                      </td>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            item.systems[7].activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    {/* Micss  */}
                    <tr>
                      <td rowSpan={3}>Mics</td>
                      <td className="text-start" colSpan={2}>
                        1. Perform Cleaning of all the Racks and External
                        Cleaning of all the Rack Equipments in TER&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[8].activities[0].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2. Check the status of Rack Fans&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[8].activities[1].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        3. Check the status of Earthing cables of each Rack and
                        its Equipments&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[8].activities[2].remark}
                      </td>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            item.systems[8].activities[2].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    {/* Video wall  */}
                    <tr>
                      <td rowSpan={2}> Video Wall</td>
                      <td className="text-start" colSpan={2}>
                        1. External cleaning of Videowall screen&nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[9].activities[0].remark}
                      </td>
                      <td>
                        {" "}
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
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2. External cleaning of Controllers and internal racks{" "}
                        &nbsp;
                      </td>
                      <td className="text-start">
                        {" "}
                        {item.systems[9].activities[1].remark}
                      </td>
                      <td>
                        {" "}
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
                        Signature : {item.Ssignature}
                        <br /> EMP ID:{item.SempId}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Date & Time:{item.SdateTime}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={4}>
                        Maintainer Name: {item.MName}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature
                        : {item.Msignature}
                        <br /> EMP ID: {item.MempId}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Date & Time:
                        {item.MdateTime}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <td className="d-flex gap-3 mt-3   justify-content-end">
                  {item.status == "0" ? (
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
      </div>
    </>
  );
};

export default PMsheetMonthlyList;
