import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { RiFileExcel2Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { fetchData, saveData } from "../../reducer/monika/EarlyReducer";
const EarlyMaintainScheduleList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "EarlyMaintainScheduleList.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const EarlyMaintainScheduleList = useSelector((state) => state.EarlyMaintain);
  console.log(EarlyMaintainScheduleList);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const itmm = EarlyMaintainScheduleList.data.data;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (EarlyMaintainScheduleList.data && EarlyMaintainScheduleList.data.data) {
      setItems(EarlyMaintainScheduleList.data.data);
      setSlug(EarlyMaintainScheduleList.slug);
      setFilteredItems(EarlyMaintainScheduleList.data.data);
    }
  }, [EarlyMaintainScheduleList]);

  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  console.log(filteredItems);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const station = row.station ? row.station.toLowerCase() : "";
      const esc_no = row.esc_no ? row.esc_no.toLowerCase() : "";
      const nameOfSc = row.name_of_sc ? row.name_of_sc.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (station.includes(searchValue.toLowerCase()) ||
          esc_no.includes(searchValue.toLowerCase()) ||
          nameOfSc.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
  };
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
              YEARLY MAINTENANCE SCHEDULE
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        {/* <h3> YEARLY MAINTENANCE SCHEDULE</h3>
        <span className="line-box"></span> */}
        <div className="d-flex justify-content-between align-items-center">
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
                  onChange={(newValue) =>
                    setFromDate(newValue ? newValue.startOf("day") : null)
                  }
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
                  onChange={(newValue) =>
                    setToDate(newValue ? newValue.endOf("day") : null)
                  }
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
                filename="EarlyMaintainScheduleList_table"
                sheet="EarlyMaintainScheduleList_table"
                currentTableRef={tableRef.current}
              >
                <button
                  className="btn "
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

        {filteredData.map((item, index) => {
          return (
            <>
              <div ref={targetRef}>
                <table ref={tableRef} style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th colSpan={2} className="text-start">
                        Station :
                      </th>

                      <th colSpan={2}>Date</th>

                      <th style={{ width: "250px" }}>
                        DOC Annexure-1, version 1.0
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={4} className="text-start">
                        YEARLY MAINTENANCE SCHEDULE
                      </th>
                      <th>DOCUMENT:O&M/Tele/CH03</th>
                    </tr>
                    <tr>
                      <th>System</th>
                      <th colSpan={3}>Activity</th>

                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={5}>PAS</td>
                      <td colSpan={3} className="text-start">
                        1.Check emergency message priority sequence&nbsp;
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
                      <td>{item.systems[0].remarks}</td>
                    </tr>

                    <tr>
                      <td className="text-start" colSpan={3}>
                        a. Announcement from PSB overrides SCR HMI Emergency
                        messages&nbsp;
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
                      <td>{item.systems[0].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        b. SCR HMI emergency announcement overrides OCC
                        emergency messages&nbsp;
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
                      <td> {item.systems[0].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        2. Perform the Internal cleaning of amplifiers with
                        shutting down of necessary equipments&nbsp;
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
                      <td> {item.systems[0].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        3. Take the backup of NCO and QSC &nbsp;
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
                      <td> {item.systems[0].remarks}</td>
                    </tr>

                    <tr>
                      <td rowSpan={3}>PIDS</td>
                      <td colSpan={3} className="text-start">
                        1.Clean inside of display boards using a clean cloth and
                        a brush &nbsp;
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
                      <td>{item.systems[1].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        2.Take the backup of Concorse PIDS&nbsp;
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
                      <td> {item.systems[1].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        3.Take the backup of All platform PIDS &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[1].activities[2].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[1].remarks}</td>
                    </tr>

                    <tr>
                      <td rowSpan={4}>CCTV</td>
                      <td colSpan={3} className="text-start">
                        1. Perform the Internal Cleaning of CCTV HMI & SECURITY
                        HMI. &nbsp;
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
                      <td>{item.systems[2].remarks}</td>
                    </tr>

                    <tr>
                      <td className="text-start" colSpan={3}>
                        2.Check the station level ring verification &nbsp;
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
                      <td>{item.systems[2].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        3.Perform the Internal Cleaning of NVR &nbsp;
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
                      <td>{item.systems[2].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        4.Take Backup of all Access Switch &nbsp;
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
                      <td>{item.systems[2].remarks}</td>
                    </tr>
                    <tr>
                      <td rowSpan={2}>FOTS</td>
                      <td colSpan={3} className="text-start">
                        1.Checking of fiber continuity and fiber loss for dark
                        fibers, using OTDR/Power- Source Meter. Record the
                        values in Fiber loss sheet . &nbsp;
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
                      <td>{item.systems[3].remarks}</td>
                    </tr>

                    <tr>
                      <td className="text-start" colSpan={3}>
                        2.Take the backup of All DSW and ASW &nbsp;
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
                      <td>{item.systems[3].remarks}</td>
                    </tr>

                    <tr>
                      <td rowSpan={4}>TELEPHONE</td>
                      <td colSpan={3} className="text-start">
                        1.Internal cleaning of EPABX cabinet by shutting down
                        completely &nbsp;
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
                      <td>{item.systems[4].remarks}</td>
                    </tr>

                    <tr>
                      <td className="text-start" colSpan={3}>
                        2. Internal cleaning of IPBX server &nbsp;
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
                      <td>{item.systems[4].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        3.Take the backup of IPBX and Media Gateway &nbsp;
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
                      <td>{item.systems[4].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        4.Preform redundancy checks on IPMAX-2(CPUs)&nbsp;
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
                      <td>{item.systems[4].remarks}</td>
                    </tr>

                    <tr>
                      <td rowSpan={2}>ACDB</td>
                      <td colSpan={3} className="text-start">
                        1.Check for Correctness/ tightness of MCBs. &nbsp;
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
                      <td>{item.systems[5].remarks}</td>
                    </tr>

                    <tr>
                      <td className="text-start" colSpan={3}>
                        2.Measure the Output Voltages and observe for any
                        Abnormalities. &nbsp;
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
                      <td>{item.systems[4].remarks}</td>
                    </tr>

                    <tr>
                      <td>UPS</td>
                      <td colSpan={3} className="text-start">
                        1.Internal cleaning of Cubical of UPS
                        System(ATS,UPS-1,UPS2,SCVS,ACDB) &nbsp;
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
                      <td>{item.systems[6].remarks}</td>
                    </tr>

                    <tr>
                      <td rowSpan={2}>SMPS</td>
                      <td colSpan={3} className="text-start">
                        1.Internal cleaning all Module of SMPS &nbsp;
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
                      <td>{item.systems[7].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        2.Check parameters of SMPS from Display Panel&nbsp;
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
                      <td>{item.systems[7].remarks}</td>
                    </tr>

                    <tr>
                      <td rowSpan={3}>IBS</td>
                      <td colSpan={3} className="text-start">
                        1.Visual Inspection of MU & RU&nbsp;
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
                      <td>{item.systems[8].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        2. RF Power measurment&nbsp;
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
                      <td>{item.systems[8].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        3.Check the redundancy paths functional status&nbsp;
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
                      <td>{item.systems[8].remarks}</td>
                    </tr>

                    <tr>
                      <td rowSpan={8}>RADIO</td>
                      <td colSpan={3} className="text-start">
                        1.Base Radio RF test-&nbsp;
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
                      <td>{item.systems[8].remarks}</td>
                    </tr>

                    <tr>
                      <td className="text-start">Equipment</td>
                      <td className="text-start">BR1</td>
                      <td className="text-start">BR2</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className="text-start">a.Tx Frequency (Mhz)</td>
                      <td className="text-start">
                        {item.systems[9].activities[0].details[0].br1}
                      </td>
                      <td className="text-start">
                        {item.systems[9].activities[0].details[0].br2}
                      </td>
                      <td></td>
                    </tr>

                    <tr>
                      <td className="text-start">b.Rx Frequency (Mhz)</td>
                      <td className="text-start">
                        {item.systems[9].activities[0].details[1].br1}
                      </td>
                      <td className="text-start">
                        {item.systems[9].activities[0].details[1].br2}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className="text-start">c. Forward power</td>
                      <td className="text-start">
                        {item.systems[9].activities[0].details[2].br1}
                      </td>
                      <td className="text-start">
                        {item.systems[9].activities[0].details[2].br2}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className="text-start">d.Reflected power</td>
                      <td className="text-start">
                        {item.systems[9].activities[0].details[3].br1}
                      </td>
                      <td className="text-start">
                        {item.systems[9].activities[0].details[3].br2}
                      </td>
                      <td></td>
                    </tr>

                    <tr>
                      <td className="text-start">e.VSWR</td>
                      <td className="text-start">
                        {item.systems[9].activities[0].details[4].br1}
                      </td>
                      <td className="text-start">
                        {item.systems[9].activities[0].details[4].br2}
                      </td>
                      <td></td>
                    </tr>

                    <tr>
                      <td colSpan={3} className="text-start">
                        2.Take the backup of MTS-4 &nbsp;
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
                      <td>{item.systems[8].remarks}</td>
                    </tr>

                    <tr>
                      <td rowSpan={1}>OAIT</td>
                      <td colSpan={3} className="text-start">
                        1.Take the backup of OAIT Switch&nbsp;
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
                      <td>{item.systems[8].remarks}</td>
                    </tr>
                    <tr>
                      <td rowSpan={2}>EARTHING</td>
                      <td colSpan={3} className="text-start">
                        1.Measurement of clean earth resistance&nbsp;
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
                      <td>{item.systems[8].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        2.Checking of Earthing continuity and Maintenance of
                        earth pits&nbsp;
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
                      <td>{item.systems[8].remarks}</td>
                    </tr>

                    <tr>
                      <td rowSpan={2}>ACS</td>
                      <td colSpan={3} className="text-start">
                        1.Take Event log from BIS client at NMS&nbsp;
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
                      <td>{item.systems[8].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={3}>
                        2.Take Backup of BIS server &nbsp;
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
                      <td>{item.systems[8].remarks}</td>
                    </tr>

                    <tr>
                      <td
                        colSpan={5}
                        className="text-center"
                        style={{ height: "40px" }}
                      >
                        Notes :
                      </td>
                    </tr>
                    <tr style={{ height: "200px" }}>
                      <td className="text-start" colSpan={5}>
                        {item.notes}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={5}>
                        <div className="d-flex justify-content-between">
                          <span>
                            Supevisor Name: {item.SName}
                            <br /> EMP ID: {item.SempId}
                          </span>
                          <span>
                            {/* Signature : {item.Ssignature} */}
                            <br />
                            Date & Time:
                            {item.SdateTime}
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={5}>
                        <div className="d-flex justify-content-between">
                          <span>
                            Maintainer Name: {item.MName}
                            <br /> EMP ID: {item.MempId}
                          </span>
                          <span>
                            {/* Signature : {item.Msignature} */}
                            <br />
                            Date & Time:
                            {item.MdateTime}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <td className=" ">
                {item.status === "0" || user?.role == "Admin" ? (
                  <div className="d-flex gap-2">
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
              </td>
            </>
          );
        })}
      </div>
    </>
  );
};

export default EarlyMaintainScheduleList;
