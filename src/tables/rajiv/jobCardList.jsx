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
import { fetchData, saveData } from "../../reducer/rajiv/jobCardReducer";
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
  const jobCardList = useSelector((state) => state.jobCard);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "job card list.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [slug, setSlug] = useState(getLastParameter().trim());
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = d.getFullYear();
  return `${day}:${month}:${year}`;
};

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const itmm = jobCardList.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
console.log(filteredData);
  useEffect(() => {
    if (jobCardList.data && jobCardList.data.data) {
      setItems(jobCardList.data.data);
      setFilteredItems(jobCardList.data.data);
    }
  }, [jobCardList]);
console.log(slug)
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
              Job Card
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
              {/* <DownloadTableExcel
                filename="Escalator_table"
                sheet="Escalator_table"
                currentTableRef={tableRef.current}
              >
                <button
                  className="btn"
                  style={{ border: "1px solid #0baa9a " }}
                >
                  <RiFileExcel2Fill color="#0baa9a " size={25} />
                </button>
              </DownloadTableExcel> */}
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
          {filteredData?.map((item) => {
            return (
              <div
                class="container border my-3 p-0"
                style={{ marginLeft: "0px", width: "95%" }}
              >
                <div class=" border-bottom px-3">
                  <div className="d-flex gap-5 ">
                    <span><b>JC No.</b>- LMRC/JC/SIG/{item.jcNo}</span>
                    <span>Date: {formatDate(item.date)}</span>
                  </div>
                  <p><b>Ref. PTW No</b> : {item.ptwNo}</p>
                </div>

                <div class="section"></div>

                <p className="border-bottom px-3 m-0 ">
                  <b>Part A: Job Card issued</b>
                </p>
                <div class="section">
                  <div className="border-bottom px-3">
                    <span
                      style={{ marginRight: "200px" }}
                      className="border-right"
                    >
                      Train -- {item.trainNumber}&nbsp;&nbsp;&nbsp;&nbsp;Car --{" "}
                      {item.carNo}
                      &nbsp;&nbsp;
                    </span>
                    <span>
                      Expected time of completion: {item.expectedCompletionTime}
                    </span>
                  </div>
                  <div className="border-bottom px-3">
                    <p className="m-0">
                      Type of job card:
                      <label class="checkbox-group">
                        &nbsp; Preventive{" "}
                        <input
                          type="checkbox"
                          checked={item.jobType == "Preventive" ? true : false}
                          disabled
                        />
                      </label>
                      <label class="checkbox-group">
                        &nbsp;&nbsp;Corrective{" "}
                        <input
                          type="checkbox"
                          checked={item.jobType == "Corrective" ? true : false}
                          disabled
                        />
                        &nbsp;
                      </label>
                      <label class="checkbox-group">
                        &nbsp; &nbsp;Testing&nbsp;
                        <input
                          type="checkbox"
                          checked={item.jobType == "Testing" ? true : false}
                          disabled
                        />
                        &nbsp;
                      </label>
                      <label class="checkbox-group">
                        &nbsp;&nbsp; Deployment&nbsp;
                        <input
                          type="checkbox"
                          checked={item.jobType == "Deployment" ? true : false}
                          disabled
                        />
                      </label>
                    </p>
                    <span>Description of job card: {item.jobDescription}</span>
                  </div>
                  <p className="m-0 border-bottom px-3">
                    <b>Nature of Work (Mention full details of work/failure and
                    equipment to be worked on):</b> {item.workDetails}
                  </p>
                  <p
                    className="m-0 border-bottom px-3"
                    style={{ height: "100px" }}
                  >
                    WORK: {item.work}
                  </p>
                  <p className="m-0 border-bottom px-3">
                    <input
                      type="checkbox"
                      checked={item.condition1 == "0" ? false : true}
                      disabled
                    />{" "}
                    I Thereby declare that I accept responsibility for carrying
                    out work on the equipment detailed on this permit and that
                    no attempt will be made by me, or by any person under my
                    control, to carry out work on any other equipment.
                  </p>
                  <p className="m-0 border-bottom px-3">
                    <b>Contractor Name: {item.contractorName}</b>
                  </p>
                </div>

                <div class="section">
                  <p className="border-bottom px-3 m-0 ">
                    <b>Part :B Permission to Access</b>
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    Roof Access Required &nbsp;
                    {item.roofAccessRequired }
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    Power Block Required &nbsp;
                    {item.powerBlockRequired }
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    Power Block ensured by(Name of Supervisor) :{" "}
                    {item.powerBlockSupervisor}
                  </p>
                  <p className="border-bottom px-3 m-0 d-flex justify-content-between ">
                    <span>LMRC Staff Name: {item.lmrcStaffName}</span>{" "}
                    <span style={{ marginRight: "220px" }}>
                      {" "}
                      Desig: {item.lmrcStaffDesignation}
                    </span>
                  </p>
                </div>

                <div class="section">
                  <p className="border-bottom px-3 m-0 ">
                    <b>Part C: Failure History: if any</b>
                    {item.failureHistory}
                  </p>
                  <p className="border-bottom px-3 m-0 d-flex justify-content-between ">
                    <span>SGC Name: {item.sgcName}</span>{" "}
                    <span style={{ marginRight: "220px" }}>
                      Date: {formatDate(item.sgcDate)}
                    </span>
                  </p>
                </div>

                <div class="section ">
                  <p className="border-bottom px-3 m-0 ">
                    {" "}
                    <b>
                      Part D: Completion for work (Completion details of work
                      done etc)
                    </b>
                  </p>

                  <p className="border-bottom px-3 m-0 ">
                    <input
                      type="checkbox"
                      checked={item.condition2 != "0" ? true : false}
                      disabled
                    />{" "}
                    I hereby declare that all persons under my control have been
                    withdrawn and all the equipment affected as detailed in part
                    A above have been restored to normal.
                  </p>
                  <p
                    className="border-bottom px-3 m-0 "
                    style={{ height: "200px" }}
                  >
                    Follow Up details:-{" "}
                    <span className="border-bottom">
                      {item.followUpDetails}
                    </span>
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    Train is fit for movement from Signalling side: &nbsp;
                    &nbsp; &nbsp;
                    <label class="checkbox-group">
                      <input
                        type="checkbox"
                        checked={item.atpStatus != "0" ? true : false}
                        disabled
                      />{" "}
                      ATP
                    </label>{" "}
                    &nbsp;
                    <label class="checkbox-group">
                      <input
                        type="checkbox"
                        disabled
                        checked={item.atoStatus != "0" ? true : false}
                      />{" "}
                      ATO
                    </label>
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    Power Block Request cancelled:{" "}
                    <b>
                      {item.powerBlockRequestCancelled}
                    </b>
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    Old Sr No Details along with Equipment:{" "}
                    {item.oldSrNoDetails}
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    New Sr No Details along with Equipment:{" "}
                    {item.newSrNoDetails}
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    Conclusion: {item.conclusion}
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    If work pending: {item.workPending}
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    I have left the train with &nbsp;
                    <label class="checkbox-group">
                      <input
                        type="checkbox"
                        checked={item.auxStatus == "off" ? true : false}
                        disabled
                      />{" "}
                      Aux off &nbsp;
                    </label>
                    <label class="checkbox-group">
                      <input
                        type="checkbox"
                        checked={item.auxStatus == "on" ? true : false}
                        disabled
                      />{" "}
                      Aux on
                    </label>
                  </p>
                  <p className="border-bottom px-3 m-0 ">
                    Train can be energized &nbsp;
                    <b>{item.trainEnergized != "0" ? "Yes" : "No"}</b> &nbsp;
                    Reason: {item.trainEnergizedReason}
                  </p>
                  <div class="signature-group ">
                    <div
                      class="d-flex border-bottom px-3"
                      style={{ gap: "50px" }}
                    >
                      <p className="m-0 col-3">
                        Contractor Staff Name: {item.contractorStaffName}
                      </p>
                      {/* <p
                        className="m-0 col-3"
                        style={{
                          borderLeft: "1px solid black",
                          paddingLeft: "5px",
                        }}
                      >
                        Sign: {item.contractorStaffSign}
                      </p> */}
                      <p
                        className="m-0 col-3"
                        style={{
                          borderLeft: "1px solid black",
                          paddingLeft: "5px",
                        }}
                      >
                        Date: {item.contractorStaffDate}
                      </p>
                      <p
                        className="m-0 col-3"
                        style={{
                          borderLeft: "1px solid black",
                          paddingLeft: "5px",
                        }}
                      >
                        Time: {item.contractorStaffTime}
                      </p>
                    </div>
                    <div
                      class="d-flex border-bottom px-3"
                      style={{ gap: "50px" }}
                    >
                      <p className="m-0 col-3">
                        Signaling Staff Name: {item.signalingStaffName}
                      </p>
                      {/* <p
                        className="m-0 col-3"
                        style={{
                          borderLeft: "1px solid black",
                          paddingLeft: "5px",
                        }}
                      >
                        Sign: {item.signalingStaffSign}
                      </p> */}
                      <p
                        className="m-0 col-3"
                        style={{
                          borderLeft: "1px solid black",
                          paddingLeft: "5px",
                        }}
                      >
                        Date: {item.signalingStaffDate}
                      </p>
                      <p
                        className="m-0 col-3 "
                        style={{
                          borderLeft: "1px solid black",
                          paddingLeft: "5px",
                        }}
                      >
                        Time: {item.signalingStaffTime}
                      </p>
                    </div>
                    <div
                      class="d-flex  px-3 border-bottom"
                      style={{ gap: "50px" }}
                    >
                      <p className="col-3">SGC Name: {item.sgcSignName}</p>
                      {/* <p
                        className="m-0 col-3"
                        style={{
                          borderLeft: "1px solid black",
                          paddingLeft: "5px",
                        }}
                      >
                        Sign: {item.sgcSign}
                      </p> */}
                      <p
                        className="m-0 col-3"
                        style={{
                          borderLeft: "1px solid black",
                          paddingLeft: "5px",
                        }}
                      >
                        Date: {item.sgcSignDate}
                      </p>
                      <p
                        className="m-0 col-3 "
                        style={{
                          borderLeft: "1px solid black",
                          paddingLeft: "5px",
                        }}
                      >
                        Time: {item.sgcSignTime}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-3 m-3  justify-content-end">
                  {item.status == "0" || user?.role == "Admin" ? (
                    <div className="d-flex gap-3">
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
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DailyTelecomCheckList;
