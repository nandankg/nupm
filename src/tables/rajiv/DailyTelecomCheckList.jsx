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
  fetchData,
  saveData,
} from "../../reducer/rajiv/DailyTelecomCheckListReducer";
import PDFExportComponent from "../../component/PDFExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const DailyTelecomCheckList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const dailyTelecomCheckList = useSelector(
    (state) => state.dailyTelecomCheckList
  );
  console.log(dailyTelecomCheckList);
  const [slug, setSlug] = useState(getLastParameter().trim());

  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "Daily Telecom Checklist.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const itmm = dailyTelecomCheckList.data.data;
  let filteredData;
  console.log(id);
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
              Daily Telecom Maintenance Checklist
            </Link>
            <Link underline="hover" color="inherit">
              View
            </Link>
          </Breadcrumbs>
        </div>
        {/* <h3>Daily Telecom Maintenance Checklist</h3>
        <span className="line-box"></span> */}
        <div className="d-flex justify-content-between align-items-center mt-3">
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
              <Link to="">
                {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
              </Link>
              <DownloadTableExcel
                filename="DailyChecklist_table"
                sheet="DailyChecklist_table"
                currentTableRef={tableRef.current}
              >
                <button
                  className="btn"
                  style={{ border: "1px solid #0baa9a " }}
                >
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
        <div ref={targetRef} id="section-to-export">
          {filteredData?.map((item, index) => {
            console.log(item);
            return (
              <>
                <table ref={tableRef}>
                  <thead>
                    <tr>
                      <th colSpan={17} className="text-start">
                        Station :{" "}
                      </th>
                      <th style={{ width: "250px" }}>
                        DOC Annexure-1, version 1.0{" "}
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={18}>Daily Telecom Maintenance Checklist</th>
                    </tr>
                    <tr>
                      <th>SI.No</th>
                      <th colSpan={2}>System</th>
                      <th colSpan={8} style={{ width: "1000px" }}>
                        Activity
                      </th>
                      <th>SI.No</th>
                      <th colSpan={2}>System</th>
                      <th colSpan={6}>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td colSpan={2}>PAS</td>
                      <td colSpan={8} className="text-start">
                        1.Check and clear alarms in PIDS-PAS HMI  &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[0]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2. Checking of PAS equipment in TER&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[0]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>
                      <td>8</td>
                      <td colSpan={2}>IBS</td>
                      <td colSpan={8} className="text-start">
                        1.Check Master Unit & Remote Unit LED status&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[7]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>{" "}
                    </tr>
                    <tr>
                      <td>2</td>
                      <td colSpan={2}>FOTS</td>
                      <td colSpan={8} className="text-start">
                        1.Check for alarm indications in DSW and ASW &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[1]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2.Visual Inspection of LED Status of DSW and ASW&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[1]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>
                      <td>9</td>
                      <td colSpan={2}>ACDB/DCDB</td>
                      <td colSpan={8} className="text-start">
                        1.Check the lamp status of ACDB & DCDB &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[8]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>{" "}
                    </tr>
                    <tr>
                      <td>3</td>
                      <td colSpan={2}>CCTV</td>
                      <td colSpan={8} className="text-start">
                        1.Check Camera Status on Operator Client &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[2]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2.Check NVR & All HDD LED status &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[2]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        3.Check and clear alarms in CCTV HMI &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[2]?.activities[2].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        4.Check if recording is available for both main and
                        redundant recorders &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[2]?.activities[3].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>
                      <td>10</td>
                      <td colSpan={2}>UPS</td>
                      <td colSpan={8} className="text-start">
                        1.Check Incomer-I and Incomer-II availbility Status on
                        ATS Rack &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[9]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2.Check Alarm LED Status of ELCB in ATS Rack &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[9]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        3.Check Alarm LED Status of SCVS Rack&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[9]?.activities[2].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        4.Check Status of UPS-1 and UPS-2 On Display &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[9]?.activities[3].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        5.Check LED Status of ACDB &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[9]?.activities[4].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        6.Visual inspection of BB-1 & BB-2 &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[9]?.activities[5].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>{" "}
                    </tr>
                    <tr>
                      <td>4</td>
                      <td colSpan={2}>Clock</td>
                      <td colSpan={8} className="text-start">
                        1.Visual Inspection of Sub-Master Clock&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[3]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2.Check working of Digital clocks&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[3]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>
                      <td>11</td>
                      <td colSpan={2}>SMPS</td>
                      <td colSpan={8} className="text-start">
                        1.Check and clear alarms in SMPS-1 & SMPS-2&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[10]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2.Visual Inspection of LED Status of all SMR&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[10]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        3.Visual inspection of BB-1 & BB-2&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[10]?.activities[2].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>{" "}
                    </tr>
                    <tr>
                      <td>5</td>
                      <td colSpan={2}>Radio</td>
                      <td colSpan={8} className="text-start">
                        1.Check working of RCP and DCC Handportable by making
                        test call&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[4]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2.Check if any alarm indications in MTS-4&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[4]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        3.Check DCC_RCW Status&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[4]?.activities[2]?.checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>
                      <td>12</td>
                      <td colSpan={2}>GENERAL</td>
                      <td colSpan={8} className="text-start">
                        1.Check status of AC & Note down TER and UPS Room
                        Temperature (Maintained below 30°C)&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[11]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2.Check Working Status of Rack Fans&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[11]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        3.Check water leakage in TER & UPS Rooms&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[11]?.activities[2].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>{" "}
                    </tr>
                    <tr>
                      <td>6</td>
                      <td colSpan={2}>ACS</td>
                      <td colSpan={8} className="text-start">
                        1.Check the Status of Controller&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[5]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2.Check LED Status of PSU of AMC & EML&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[5]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>
                      <td>13</td>
                      <td colSpan={2}>TELEPHONE</td>
                      <td colSpan={8} className="text-start">
                        1.Check LED Status of IPBX-1 & IPBX-2&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[12]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2.Check Status of Cards of Media Gateways &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[12]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        3.Check the LED Status of VOIP Switch &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[12]?.activities[2].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>{" "}
                    </tr>
                    <tr>
                      <td>7</td>
                      <td colSpan={2}>OAIT</td>
                      <td colSpan={8} className="text-start">
                        1.Check for alarm indications in OAIT SW&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[6]?.activities[0].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                        <br />
                        <hr className="m-0" />
                        2.Visual Inspection of LED Status of OAIT SW&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item?.systems?.[6]?.activities[1].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        &nbsp;&nbsp;
                      </td>
                      <td></td>
                      <td colSpan={2}></td>
                      <td colSpan={8} className="text-start"></td>{" "}
                    </tr>
                    <tr>
                      <th>Date</th>
                      <th> SI No.1</th>
                      <th> SI No.2</th>
                      <th> SI No.3</th>
                      <th> SI No.4</th>
                      <th> SI No.5</th>
                      <th> SI No.6</th>
                      <th> SI No.7</th>
                      <th> SI No.8</th>
                      <th> SI No.9</th>
                      <th> SI No.10</th>
                      <th> SI No.11</th>
                      <th> SI No.12</th>
                      <th> SI No.13</th>
                      <th>Remarks</th>
                      <th>Emp Name</th>
                      <th>Emp No.</th>
                      <th>Signature</th>
                    </tr>
                    <tr>
                      <td>{new Date().toLocaleDateString()}</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td>{item.remarks}</td>
                      <td>{item.empName}</td>
                      <td>{item.empId}</td>
                      <td>{item.signature}</td>
                    </tr>
                    <tr>
                      <td colSpan={17}>
                        Notes for Installation & Other Pending Issues
                      </td>
                      <td>Rectified Date : {item.dateTime}</td>
                    </tr>
                    <tr>
                      <td
                        colSpan={18}
                        className="text-start"
                        style={{ height: "80px" }}
                      >
                        Notes : {item.notes}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={18} className="text-start">
                        Verified By (SE/JE) : {item.verifiedBy}
                        <br /> Name : {item.empName}
                        <br />
                        EMP ID : {item.empId}
                        <br />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <td className="d-flex gap-3 mt-3   justify-content-end">
                  {item.status == "0" || user?.role == "Admin" ? (
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
        <PDFExportComponent
          contentId="section-to-export"
          filename="CardInitializationList.pdf"
        />
      </div>
    </>
  );
};

export default DailyTelecomCheckList;
