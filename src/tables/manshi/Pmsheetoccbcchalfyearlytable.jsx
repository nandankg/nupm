import { FaFilter, FaCheck, FaTimes } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { RiFileExcel2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  fetchData,
  saveData,
} from "../../reducer/manshi/Pmsheetoccbcchalfyearlyreducer";

const Pmsheetoccbcchalfyearlytable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "pmsheetoccbcc(half_yearly).pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const pmsheetoccbccData = useSelector((state) => state.pmsheetoccbcc);
  const [slug, setSlug] = useState("");
  const itmm = pmsheetoccbccData.data.data;
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
    if (pmsheetoccbccData.data && pmsheetoccbccData.data.data) {
      setSlug(pmsheetoccbccData.slug);
    }
  }, [pmsheetoccbccData]);

  return (
    <>
      <div className="container">
        <div className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              PM Sheet (OCC & BCC) Half Yearly
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> PM Sheet (OCC & BCC) Half Yearly List</h3>
        <span className="line-box"></span>

        <div className="d-flex gap-3">
          <Link to="">
            {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
          </Link>
          <DownloadTableExcel
            filename="pmsheetoccbcc"
            sheet="pmsheetoccbcc"
            currentTableRef={tableRef.current}
          >
            <button className="btn" style={{ border: "1px solid #0baa9a " }}>
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
          {/* Display pmsheetoccbccData */}
          {filteredItems?.map((item, index) => (
            <div key={index}>
              <table className="table" ref={tableRef}>
                <thead>
                  {/* First Row */}
                  <tr>
                    <th className="text-start" colSpan={1}>
                      Location: BCC, OCC & CER
                    </th>
                    <th className="text-center" colSpan={5}>
                      Date: {item.date}
                    </th>
                    <th className="text-center" colSpan={4}>
                      DOC: Annexure-IV, Version: 1.0
                    </th>
                    <th className="text-center" colspan={1} rowSpan={2}>
                      Check
                    </th>
                  </tr>
                  {/* Second Row */}
                  <tr>
                    <th className="text-start" colSpan={1}>
                      System
                    </th>
                    <th className="text-center" colSpan={5}>
                      Activity
                    </th>
                    <th className="text-center" colSpan={4}>
                      Remark
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* PAS */}
                  <tr>
                    <td rowSpan={3}>PAS</td>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      External cleaning of speakers at all Zones and TER
                      rack&nbsp;{" "}
                    </td>

                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[0]?.activities[0]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[0]?.activities[0]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      Checking the amplifier switch over process&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[0]?.activities[1]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[0]?.activities[1]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start" colSpan={9} rowSpan={1}>
                      Zone 1: {item.systems[0]?.activities[1]?.BCC1?.values[0]}{" "}
                      &nbsp; Zone 2:{" "}
                      {item.systems[0]?.activities[1]?.BCC1?.values[1]} &nbsp;
                      Zone 3: {item.systems[0]?.activities[1]?.BCC1?.values[2]}{" "}
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}></td>
                  </tr>

                  {/* FOTS */}
                  <tr>
                    <td rowSpan={3}>FOTS</td>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      Checking the switching of Normal to standby path and
                      vice-versa
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[1]?.activities[0]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[1]?.activities[0]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      Cleaning & Redundancy check of Core Switch Power supply
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[1]?.activities[1]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[1]?.activities[1]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      Checking of Dressing & Labeling of Fiber patch cords and
                      LAN cables
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[1]?.activities[2]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[1]?.activities[2]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>

                  {/* CCTV */}
                  <tr>
                    <td rowSpan={4}>CCTV</td>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      1. Physical inspection of all equipment in CER and
                      BCC&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[2]?.activities[0]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[2]?.activities[0]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      2. Perform Defragmentation of Windows drives in CLSTR,
                      ENTZ, BVMS-1, BVMS-2&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[2]?.activities[1]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[2]?.activities[1]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      3. Perform Defragmentation of Windows drives in NMS&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[2]?.activities[2]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[2]?.activities[2]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      4. Clean MSO chassis air filter of Video Wall Server&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[2]?.activities[3]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[2]?.activities[3]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>

                  {/* Radio */}
                  <tr>
                    <td rowSpan={6}>Radio</td>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      1. Ensure that all devices & Cables are labeled
                      properly&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[3]?.activities[0]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[3]?.activities[0]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={9} rowSpan={1}>
                      MSO: {item.systems[3]?.activities[0]?.subInputValues?.MSO}{" "}
                      <br />
                      CAD: {
                        item.systems[3]?.activities[0]?.subInputValues?.CAD
                      }{" "}
                      <br />
                      RCW: {
                        item.systems[3]?.activities[0]?.subInputValues?.RCW
                      }{" "}
                      <br />
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      2. Optimize NM Servers and check component status&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[3]?.activities[1]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[3]?.activities[1]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      3. Clean dust filter of NM Server&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[3]?.activities[2]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[3]?.activities[2]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      4. Backup of RCW, Vortex, CAD server and ATSS GW and
                      restart them&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[3]?.activities[3]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[3]?.activities[3]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      5. Perform Tx/Rx check for MTS-4 (RF site) from NMS&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[3]?.activities[4]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[3]?.activities[4]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>

                  {/* MCK */}
                  <tr>
                    <td rowSpan={2}>MCS</td>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      1. Disk cleanup and defragmentation of NMS, restart
                      system&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[4]?.activities[0]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[4]?.activities[0]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      2. Cleaning of racks and checking all connections (Do not
                      remove connections).&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[4]?.activities[1]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[4]?.activities[1]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>

                  {/* OAIT */}
                  <tr>
                    <td rowSpan={3}>OAIT</td>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      1. Checking the switching of Normal to standby path and
                      vice-versa.&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[5]?.activities[0]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[5]?.activities[0]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      2. Cleaning of Fan tray.&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[5]?.activities[1]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[5]?.activities[1]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      3. Check redundancy at EPRS level.&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[5]?.activities[2]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[5]?.activities[2]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>

                  {/* MICS */}
                  <tr>
                    <td rowSpan={2}>MICS</td>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      1. Check labeling of all cables inside each Rack &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[6]?.activities[0]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[6]?.activities[0]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={5} rowSpan={1}>
                      2. Check status of Locks of Telecom Racks &
                      Equipments.&nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item.systems[6]?.activities[1]?.remark}
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item.systems[6]?.activities[1]?.checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                  </tr>

                  {/* Notes */}
                  <tr>
                    <td
                      className="text-start"
                      style={{
                        height: "80px",

                        padding: "10px",

                        fontSize: "20px",
                        color: "#333",
                      }}
                      colSpan={9}
                      rowSpan={1}
                    >
                      <strong>Notes:</strong> {item.notes}
                    </td>
                  </tr>

                  {/* Supervisor and Maintainer */}
                  <tr>
                    <td className="text-start" colSpan={9}>
                      Supervisor Name : {item.SName}{" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <br /> EMP ID:{item.SempId}{" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Date & Time:{item.SdateTime}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={9}>
                      Maintainer Name: {item.MName}{" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <br /> EMP ID: {item.MempId}{" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Date & Time: {item.MdateTime}
                    </td>
                  </tr>
                </tbody>
              </table>

              <td>
                {item.status === "0" ? (
                  <div className="d-flex justify-content-center gap-2">
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: item.id }}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={() => {
                        handleSave(item.id);
                      }}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#339a63",
                        color: "white",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </td>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pmsheetoccbcchalfyearlytable;
