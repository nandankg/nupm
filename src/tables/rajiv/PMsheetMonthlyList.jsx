import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
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
import PDFExportComponent from "../../component/PDFExportComponent";
import {
  fetchData,
  saveData,
} from "../../reducer/rajiv/PMsheetMonthlyDepotReducer";
const PMsheetMonthlyListDepot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const PMsheetMonthlyList = useSelector((state) => state.PMsheetMonthly);
  const user = JSON.parse(localStorage.getItem("userdata"));

  console.log(PMsheetMonthlyList);
  const [slug, setSlug] = useState("");
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "PM Sheet Depot Monthly.pdf",
  });

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (PMsheetMonthlyList.data && PMsheetMonthlyList.data.data) {
      setItems(PMsheetMonthlyList.data.data);
      setFilteredItems(PMsheetMonthlyList.data.data);
      setSlug(PMsheetMonthlyList.slug);
    }
  }, [PMsheetMonthlyList]);

  const itmm = PMsheetMonthlyList.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  console.log(items);

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PM Sheet Monthly
            </Link>
            <Link underline="hover" color="inherit">
              View
            </Link>
          </Breadcrumbs>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* <input
            type="search"
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Here."
          /> */}
          <div className="d-flex align-items-center gap-3">
            {/* <div className="date-box">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
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
            </div> */}
            <div className="d-flex gap-3">
              <DownloadTableExcel
                filename="pmdepotmonthly_table"
                sheet="pmdepotmonthly_table"
                currentTableRef={tableRef.current}
              >
                <button
                  className="btn"
                  style={{ border: "1px solid #0baa9a " }}
                >
                  <RiFileExcel2Fill color="#0baa9a " size={25} />
                </button>
              </DownloadTableExcel>

              <PDFExportComponent
                contentId="section-to-export"
                filename="PMSheetMonthly.pdf"
              />
            </div>
          </div>
        </div>
        <div ref={targetRef} id="section-to-export">
          {filteredData?.map((item, index) => {
            return (
              <>
                <table ref={tableRef}>
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
                        central announcements. To be checked by visual
                        inspection and observation and record the dB values from
                        NCO.&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems?.[0].activities[0].checked == "yes"
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
                        DCC Mic &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[0].activities[1].subCheckboxes.DCC_Mic
                          }
                          disabled
                        />
                      </td>
                      <td className="text-start"></td>
                      <td className="text-start"></td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        PPIO Mic &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[0].activities[1].subCheckboxes.PPIO_Mic
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
                      <td className="text-start">{item.systems[0].activities[3].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check & Record Max. CPU and RAM Utilization values in
                        HMI (shall be greater 80%)
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
                        CPU : {item.systems[0].activities[4].subInputValues.CPU}
                        % <br /> RAM :{" "}
                        {item.systems[0].activities[4].subInputValues.RAM}%
                      </td>
                    </tr>

                    <tr>
                      <td>FOTS</td>
                      <td className="text-start" colSpan={2}>
                        Verification of Signal for Main and Standby paths for
                        different FOTS rings by using NMS (Check links to
                        adjacent nodes only).
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
                      <td rowSpan={6}>Tele Phone</td>
                      <td className="text-start" colSpan={2}>
                        1.Check LED status of all EPABX cards &nbsp;
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
                      <td className="text-start" colSpan={2}>
                        2.Check HDD LED status of IPBX-1 & IPBX-2&nbsp;
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
                      <td className="text-start"></td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        3. Check the functionality of IP phone & FSR&nbsp;
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
                      <td className="text-start"></td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        4.Verify Backup of all EPABX data on OCC/BCC-NMS ( also
                        when subscriber reconfigured and H/w changed)&nbsp;
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
                      <td className="text-start"></td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        5. Cleaning of external surface of EPABX & IPBX&nbsp;
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
                      <td className="text-start"></td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        6. Check Internode & PSTN calls functionality for all
                        phones (DCC)&nbsp;
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
                      <td className="text-start"></td>
                    </tr>

                    {/* cctv  */}
                    <tr>
                      <td rowSpan={11}>CCTV</td>
                      <td className="text-start" colSpan={2}>
                        1. External cleaning of CCTV rack equipment&nbsp;
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
                        2. Reviewing of windows event viewer in NVR&nbsp;
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
                        3. Check for abnormal shutdown of recorder from event
                        viewer&nbsp;
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
                        4. Verify time synchronization for HMI & NVR&nbsp;
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
                        5. Reviewing disk management in NVR&nbsp;
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
                    <tr>
                      <td className="text-start" colSpan={2}>
                        6.Remove Temporary files and run disk cleanup in CCTV
                        HMI&nbsp;
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
                      <td className="text-start"></td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        7.Run server administrator in NVR and check all
                        Hardware&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[3].activities[6].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        status
                      </td>
                      <td className="text-start"></td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        8. External cleaning of all cameras&nbsp;
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
                      <td className="text-start"></td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        9.Check if disk free space is atleast 10% of disk size
                        in CCTV & SECURITY HMI&nbsp;
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
                      <td className="text-start"></td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        10.Check & Record Max.CPU & RAM Utilization status in
                        CCTV HMI (shall be 80%)&nbsp;
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
                      <td className="text-start">
                        CPU : {item.systems[3].activities[9].subInputValues.CPU}
                        % <br /> RAM :{" "}
                        {item.systems[3].activities[9].subInputValues.RAM}%
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        11.Check & Record Max.CPU & RAM Utilization status in
                        SEC HMI (shall be 80%)&nbsp;
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
                      <td className="text-start"></td>
                      <td className="text-start">
                        CPU :{" "}
                        {item.systems[3].activities[10].subInputValues.CPU}%{" "}
                        <br /> RAM :{" "}
                        {item.systems[3].activities[10].subInputValues.RAM}%
                      </td>
                    </tr>

                    {/* radio  */}
                    <tr>
                      <td rowSpan={12}>Radio</td>
                      <td className="text-start">
                        1.Check status of TSC, BR and DPM&nbsp;
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
                      <td className="text-start">{item.systems[4].activities[0].remark}</td>
                      <td className="text-start"></td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2.Cleaning of RCPs, Call functions, RCP Antenna
                        checking&nbsp;
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
                      <td className="text-start">{item.systems[4].activities[1].remark}</td>
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
                      <td className="text-start"></td>
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
                      <td className="text-start">{item.systems[4].activities[1].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        3.Verify Tower Aviation lamp status&nbsp;
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
                      <td className="text-start">{item.systems[4].activities[2].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        4.Check Call functions of DCC_RCW&nbsp;
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
                      <td className="text-start">{item.systems[4].activities[3].remark}</td>
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
                      <td className="text-start">{item.systems[4].activities[3].remark}</td>
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
                      <td className="text-start">{item.systems[4].activities[3].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        5.Check RSSI level in DCC (above -95 dBm)&nbsp;
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
                      <td className="text-start">{item.systems[4].activities[4].remark}</td>
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
                      <td className="text-start">{item.systems[4].activities[5].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        7.Check the status of All Module(TSC,BR,PSU,Fan Rack
                        etc.) of MTS-4&nbsp;
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
                      <td className="text-start">{item.systems[4].activities[6].remark}</td>
                    </tr>
                    {/* radio ibs  */}
                    <tr>
                      <td>Radio - IBS</td>
                      <td className="text-start" colSpan={2}>
                        2.Cleaning of RCPs, Call functions, RCP Antenna
                        checking&nbsp;
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
                      <td className="text-start">{item.systems[5].activities[0].remark}</td>
                    </tr>

                    {/* MCS  */}
                    <tr>
                      <td rowSpan={2}>MCS</td>
                      <td className="text-start" colSpan={2}>
                        1.Check the working of all indoor & outdoor digital
                        clock&nbsp;
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
                      <td className="text-start">{item.systems[6].activities[0].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2.Check Sync. Status of Sub-master clock unit.&nbsp;
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
                      <td className="text-start">{item.systems[6].activities[1].remark}</td>
                    </tr>
                    {/* ACS  */}
                    <tr>
                      <td rowSpan={2}>ACS</td>
                      <td className="text-start" colSpan={2}>
                        1.Check the Power ON Status of EML of Doors&nbsp;
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
                      <td className="text-start">{item.systems[7].activities[0].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2.Check the physical inspection of EML and Reader&nbsp;
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
                      <td className="text-start">{item.systems[7].activities[1].remark}</td>
                    </tr>
                    {/* Micss  */}
                    <tr>
                      <td rowSpan={3}>Mics</td>
                      <td className="text-start" colSpan={2}>
                        1. Perform Cleaning of all the Racks and External
                        Cleaning of all the Rack Equipments in TER&nbsp;
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
                      <td className="text-start">{item.systems[8].activities[0].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2. Check the status of Rack Fans&nbsp;
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
                      <td className="text-start">{item.systems[8].activities[1].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        3. Check the status of Earthing cables of each Rack and
                        its Equipments&nbsp;
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
                      <td className="text-start">{item.systems[8].activities[2].remark}</td>
                    </tr>
                    {/* Video wall  */}
                    <tr>
                      <td rowSpan={2}> Video Wall</td>
                      <td className="text-start" colSpan={2}>
                        1. External cleaning of Videowall screen&nbsp;
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
                      <td className="text-start">{item.systems[9].activities[0].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        2. External cleaning of Controllers and internal racks{" "}
                        &nbsp;
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
                      <td className="text-start">{item.systems[9].activities[1].remark}</td>
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
                        {/* Signature : {item.Ssignature} */}
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
                        {/* Signature : {item.Msignature} */}
                        <br /> EMP ID: {item.MempId}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Date & Time:
                        {item.MdateTime}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <td className="d-flex gap-3 mt-3 justify-content-end">
                  {item.status === "0" || user?.role == "Admin" ? (
                    <div className="d-flex ">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        className="btn btn-primary align-content-center mx-3"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-success"
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

export default PMsheetMonthlyListDepot;
