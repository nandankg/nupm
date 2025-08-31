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
import {
  saveData,
  fetchData,
} from "../../reducer/rajiv/OperationStationDiaryReducer";
import { SignLanguageSharp } from "@mui/icons-material";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const OperationStationDiaryList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const OperationStationDiaryList = useSelector(
    (state) => state.OperationStationDiary
  );
  const [slug, setSlug] = useState(getLastParameter().trim());
  const user = JSON.parse(localStorage.getItem("userdata"));

  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Station Diary.pdf" });
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (OperationStationDiaryList.data && OperationStationDiaryList.data.data) {
      setItems(OperationStationDiaryList.data.data);
      setFilteredItems(OperationStationDiaryList.data.data);
    }
  }, [OperationStationDiaryList]);

  const itmm = OperationStationDiaryList.data.data;
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

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Station Diary
            </Link>
            <Link underline="hover" color="inherit">
              List
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
            </div> */}
            <div className="d-flex gap-3">
              <Link to="">
                {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
              </Link>
              <DownloadTableExcel
                filename="Operation Station Diary"
                sheet="Operation Station Diary"
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
        <div ref={targetRef}>
          {filteredData?.map((item, index) => {
            return (
              <>
                <table ref={tableRef}>
                  <thead>
                    <tr>
                      <th>Station Name : {item.stationName}</th>
                      <th colSpan={2}>Date : {item.date}</th>
                      <th>Duty Shift Timing : {item.dutyShiftTimings}</th>
                      <th>Name : {item.name}</th>
                      <th>Designation : {item.designation}</th>
                      <th>Emp No. {item.empNo}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start" colSpan={7}>
                        <b>1. UPMRC (Operations) STAFF on Duty</b>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={7}>
                        Customer Care Center/PSB
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>SI.No. </b>
                      </td>
                      <td>
                        <b>Name & Desg </b>
                      </td>
                      <td>
                        <b>Location </b>
                      </td>
                      <td>
                        <b>Duty Shift Timing </b>
                      </td>
                      <td rowSpan={4} colSpan={3}></td>
                    </tr>
                    {item?.staffOnDuty.map((ite, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {ite.name} &nbsp; {ite.designation}
                          </td>
                          <td>{ite.location}</td>
                          <td>{ite.shiftTiming}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="text-start" colSpan={7}>
                        <b>2. Contractor/Other Staff on Duty</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Agencies</b>
                      </td>
                      <td>
                        <b>Name of Agencies</b>
                      </td>
                      <td>
                        <b>Number of Staff</b>
                      </td>
                      <td>
                        <b>Remarks</b>
                      </td>
                      <td rowSpan={5} colSpan={3}></td>
                    </tr>
                    {item?.contractorStaff?.map((ite, index) => {
                      return index != 4 ? (
                        <tr key={index}>
                          <td>{ite.agency}</td>
                          <td>{ite.agencyName}</td>
                          <td>{ite.numberOfStaff}</td>
                          <td>{ite.remarks}</td>
                        </tr>
                      ) : (
                        <tr key={index}>
                          <td>Other (if available) </td>
                          <td>{ite.agencyName}</td>
                          <td>{ite.numberOfStaff}</td>
                          <td>{ite.remarks}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="text-start" colSpan={7}>
                        <b>3. Event/Incident/Accident</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Time</b>
                      </td>
                      <td>
                        <b>Details</b>
                      </td>
                      <td colSpan={5}></td>
                    </tr>
                    {item?.events.map((ite, index) => {
                      return (
                        <tr key={index}>
                          <td>{ite.time}</td>

                          <td>{ite.details}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="text-start" colSpan={7}>
                        <b>4. Condition of Equipment</b>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">A) VDU : </td>
                      <td>{item.conditionOfEquipment.a ? "Ok" : "Not Ok"}</td>
                      <td className="text-start" colSpan={2}>
                        B) MMI :{" "}
                      </td>
                      <td>{item.conditionOfEquipment.b ? "Ok" : "Not Ok"}</td>
                      <td className="text-start">C) Points & Crossing : </td>
                      <td>{item.conditionOfEquipment.c ? "Ok" : "Not Ok"}</td>
                    </tr>
                    <tr>
                      <td className="text-start">D) Axle counter Reset : </td>
                      <td>{item.conditionOfEquipment.d ? "Yes" : "No"}</td>
                      <td className="text-start" colSpan={2}>
                        E) Station Radio/Hand Portable :{" "}
                      </td>
                      <td>{item.conditionOfEquipment.e ? "Ok" : "Not Ok"}</td>
                    </tr>
                    <tr>
                      <td className="text-start">F) Telecom System: </td>
                      <td>{item.conditionOfEquipment.f ? "Ok" : "Not Ok"}</td>
                      <td className="text-start" colSpan={2}>
                        G) Fire Panel (FACP) :{" "}
                      </td>
                      <td>{item.conditionOfEquipment.g ? "Ok" : "Not Ok"}</td>
                      <td className="text-start">H) Air Condition : </td>
                      <td>{item.conditionOfEquipment.h ? "Ok" : "Not Ok"}</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        I) Essential Equipment as epr SWO :{" "}
                      </td>
                      <td>
                        {item.conditionOfEquipment.i
                          ? "Available"
                          : "Not Available"}
                      </td>
                      <td className="text-start" colSpan={2}>
                        J) Private NUmber Book :{" "}
                      </td>
                      <td>
                        {item.conditionOfEquipment.j
                          ? "Available"
                          : "Not Available"}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={7}>
                        <b>5. Coins & Cash Details</b>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">Coins</td>
                      <td>{item.coinsCash.coins}</td>
                      <td className="text-start" colSpan={2}>
                        Sanctionded Imprest Amount as per finance (in Rs.)
                      </td>
                      <td>{item.coinsCash.sanctionedAmount}</td>
                      <td className="text-start">
                        Total Available Imprest/Foat at station (in Rs.)
                      </td>
                      <td>{item.coinsCash.totalImprest}</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Station Earning for the Day
                      </td>
                      <td>{item.coinsCash.earning}</td>
                      <td className="text-start" colSpan={2}>
                        Total Cash to bank for the day
                      </td>
                      <td>{item.coinsCash.totalCash}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={7}>
                        <b>6. Availability/Non-Availability</b>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        <b>Stock/items </b>
                      </td>
                      <td className="text-start">
                        <b>Opening balance at Start of Shift</b>
                      </td>
                      <td className="text-start">
                        <b>Received from AFC</b>
                      </td>
                      <td className="text-start">
                        <b>Issued to other station</b>
                      </td>
                      <td className="text-start">
                        <b>Received from other station</b>
                      </td>
                      <td className="text-start" colSpan={2}>
                        <b>Balance in Hand (End of Shift)</b>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        <b>Tokens</b>
                      </td>
                      <td>{item.availability.tokens.openingBalance}</td>
                      <td>{item.availability.tokens.receivedFromAFC}</td>
                      <td>{item.availability.tokens.issuedToOtherStation}</td>
                      <td>
                        {item.availability.tokens.receivedFromOtherStation}
                      </td>
                      <td colSpan={2}>
                        {item.availability.tokens.balanceInHand}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        <b>CSC</b>
                      </td>
                      <td>{item.availability.csc.openingBalance}</td>
                      <td>{item.availability.csc.receivedFromAFC}</td>
                      <td>{item.availability.csc.issuedToOtherStation}</td>
                      <td>{item.availability.csc.receivedFromOtherStation}</td>
                      <td colSpan={2}>{item.availability.csc.balanceInHand}</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        <b>Water Bottle (if applicable)</b>
                      </td>
                      <td colSpan={6} className="text-start">
                        {item.availability.waterBottle}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        {" "}
                        7. AFC Report :OK/Not OK (Any mismatch to be mentioned):{" "}
                      </td>
                      <td>{item.afcReport}</td>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        8. Shortcomings in Housekeeping
                      </td>
                      <td>{item.shortcomings}</td>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        9. Upcoming VIP Visit (if any)
                      </td>
                      <td>{item.upcomingVIPVisit}</td>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        10. New Installations/Changes
                      </td>
                      <td>{item.newInstallations}</td>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        {" "}
                        11. Work Permit given to other department that continues
                      </td>
                      <td>{item.workPermit}</td>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td className="text-start">12. New Document Received</td>
                      <td>{item.newDocument}</td>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        13. Reports to be completed or sent
                      </td>
                      <td>{item.reportsCompleted}</td>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        14. Instructions/Message from OCC or higher authority
                      </td>{" "}
                      <td>{item.instructions}</td>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        15. Public Complaints lodged during the shift (if Yes,
                        mention the number)
                      </td>
                      <td>{item.publicComplaints}</td>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td className="text-start">Remarks (if any)</td>
                      <td colSpan={6} className="text-start">
                        {item.remarks}
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

export default OperationStationDiaryList;
