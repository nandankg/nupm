import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useLocation, useNavigate } from "react-router-dom";

import { RiFileExcel2Fill } from "react-icons/ri";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchData, saveData } from "../../reducer/monika/MaintenanceReducer";
const MaintenanceScheduleList = () => {
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
  const MaintenanceScheduleList = useSelector((state) => state.Maintenance);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const itmm = MaintenanceScheduleList.data.data;

  console.log(MaintenanceScheduleList);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (MaintenanceScheduleList.data && MaintenanceScheduleList.data.data) {
      setItems(MaintenanceScheduleList.data.data);
      setFilteredItems(MaintenanceScheduleList.data.data);
      setSlug(MaintenanceScheduleList.slug);
    }
  }, [MaintenanceScheduleList]);
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
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              HALF YEARLY MAINTENANCE SCHEDULE
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        {/* <h3>HALF YEARLY MAINTENANCE SCHEDULE</h3>
        <span className="line-box"></span> */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-3">
              <Link to="">
                {/* <button className="btn btn-primary">
              <FaFilter />
            </button> */}
              </Link>
              <DownloadTableExcel
                filename="MaintenanceScheduleList_table"
                sheet="MaintenanceScheduleList_table"
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

                      <th colSpan={1}>Date</th>

                      <th style={{ width: "250px" }}>
                        DOC Annexure-1, version 1.0
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={3} className="text-start">
                        HALF YEARLY MAINTENANCE SCHEDULE
                      </th>
                      <th>DOCUMENT:O&M/Tele/CH03</th>
                    </tr>
                    <tr>
                      <th>System</th>
                      <th colSpan={2}>Activity</th>

                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={6}>PAS</td>
                      <td colSpan={2} className="text-start">
                        1.Checking the NCO,QSC and amplifier switch-over
                        process&nbsp;
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
                      <td></td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Zone1:&nbsp;
                        {item.systems[0].zones[0]}
                      </td>
                      <td></td>
                      <td>{item.systems[0].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Zone2: &nbsp;
                        {item.systems[0].zones[1]}
                      </td>
                      <td></td>
                      <td>{item.systems[0].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Zone3: &nbsp;
                        {item.systems[0].zones[2]}
                      </td>
                      <td></td>
                      <td>{item.systems[0].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Zone4:&nbsp;
                        {item.systems[0].zones[3]}
                      </td>
                      <td></td>
                      <td>{item.systems[0].remarks}</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Zone5:&nbsp;
                        {item.systems[0].zones[4]}
                      </td>
                      <td></td>
                      <td>{item.systems[0].remarks}</td>
                    </tr>
                    <tr>
                      <td rowSpan={4}>FOTS</td>
                      <td colSpan={2} className="text-start">
                        1.Checking the switching of Normal to standby path and
                        vice-versa station level &nbsp;
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
                      <td className="text-start" colSpan={2}>
                        2.Cleaning of internal Fans &nbsp;
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
                      <td className="text-start" colSpan={2}>
                        3.Check stacking status of DW switches &nbsp;
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
                      <td className="text-start" colSpan={2}>
                        4.Check stacking status of AW switches &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[1].activities[3].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[1].remarks}</td>
                    </tr>
                    <tr>
                      <td rowSpan={3}>CCTV</td>
                      <td colSpan={2} className="text-start">
                        1.Physical inspection of all equipment in TER and DCC
                        &nbsp;
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
                      <td className="text-start" colSpan={2}>
                        2.Perform Defragmentation of Windows drives in NVR
                        &nbsp;
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
                      <td className="text-start" colSpan={2}>
                        3.Perform disk defragmentation and restart HMI. &nbsp;
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
                      <td rowSpan={2}>Clock</td>
                      <td colSpan={2} className="text-start">
                        1.Cleaning of Racks and checking of all connections (Do
                        not remove any connections) &nbsp;
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
                      <td className="text-start" colSpan={2}>
                        2.Check Data Circuits &nbsp;
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
                      <td rowSpan={2}>Radio</td>
                      <td colSpan={2} className="text-start">
                        1.Inspection of all RF Connections &nbsp;
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
                      <td className="text-start" colSpan={2}>
                        2.Check TSC switch over&nbsp;
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
                      <td>TELEPHONE</td>
                      <td colSpan={2} className="text-start">
                        1.Physical inspection of all equipment in TER & DCC
                        &nbsp;
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
                      <td>ACS</td>
                      <td colSpan={2} className="text-start">
                        1.Physical inspection of all Controller in DCC & COET
                        &nbsp;
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
                      <td rowSpan={2}>OAIT</td>
                      <td colSpan={2} className="text-start">
                        1.Checking the switching of Normal to standby path and
                        vice-versa station level &nbsp;
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
                      <td className="text-start" colSpan={2}>
                        2.Cleaning of internal Fans&nbsp;
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
                      <td rowSpan={2}>Mics</td>
                      <td colSpan={2} className="text-start">
                        1.Check labelling of all cables inside each Rack &nbsp;
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
                      <td className="text-start" colSpan={2}>
                        2.Check status of Locks of Telecom Racks, Equipments at
                        TER, UPS, Concourse & PF level.&nbsp;
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
                        colSpan={4}
                        className="text-center"
                        style={{ height: "40px" }}
                      >
                        Notes :
                      </td>
                    </tr>
                    <tr style={{ height: "200px" }}>
                      <td className="text-start" colSpan={4}>
                        {item.notes}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={4}>
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
                      <td className="text-start" colSpan={4}>
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

export default MaintenanceScheduleList;
