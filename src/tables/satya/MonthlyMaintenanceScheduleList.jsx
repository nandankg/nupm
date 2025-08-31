import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import {
  addMonthly,
  fetchData,
  saveData,
} from "../../reducer/satya/MonthlyMaintenanceScheduleReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const MonthlyMaintenanceScheduleList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const monthlymaintenance = useSelector((state) => state.schedule);
  const [slug, setSlug] = useState(getLastParameter().trim());

  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "PM OCC-BCC (Monthly).pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const itmm = monthlymaintenance.data.data;

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

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Monthly Maintenance Schedule
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3>PM Sheet (OCC & BCC) Monthly</h3>
        <span className="line-box"></span>
        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="PM OCC-BCC (Monthly)"
            sheet="PM OCC-BCC (Monthly)"
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
          {filteredItems?.toReversed().map((item, index) => {
            console.log(item);
            return (
              <>
                <table style={{ width: "100%" }} ref={tableRef}>
                  <thead>
                    <tr>
                      <th colSpan={2} className="text-start">
                        Station :{item.station}{" "}
                      </th>
                      <th className="text-start">Date : {item.date}</th>
                      <th className="text-start" style={{ width: "250px" }}>
                        DOC Annexure-II, version 1.0{" "}
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={2} className="text-start">
                        Emp. Id : {item.employee_id}
                      </th>
                      <th colSpan={3} className="text-start">
                        Department: {item.department}
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
                      <td rowSpan={9}>PAS-PIDS</td>
                      <td className="text-start" colSpan={2}>
                        Check announcements at all zones by making local and
                        central announcements. To be checked by visual
                        inspection and observation and record the dB values from
                        NCO&nbsp;
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
                      <td>{item.systems[0].activities[0].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Previous Values
                        <br />
                        Zone 1: {
                          item.systems[0].activities[0].BCC1.values[0]
                        }{" "}
                        &nbsp; &nbsp; Zone 2:{" "}
                        {item.systems[0].activities[0].BCC1.values[1]} &nbsp;
                        &nbsp; Zone 3:{" "}
                        {item.systems[0].activities[0].BCC1.values[2]} &nbsp;
                        &nbsp;
                      </td>
                      <td className="text-start">
                        After Modification
                        <br />
                        Zone 1: {
                          item.systems[0].activities[0].BCC2.values[0]
                        }{" "}
                        &nbsp; &nbsp; Zone 2:{" "}
                        {item.systems[0].activities[0].BCC2.values[1]} &nbsp;
                        &nbsp; Zone 3:{" "}
                        {item.systems[0].activities[0].BCC2.values[2]} &nbsp;
                        &nbsp;
                      </td>
                      <td>{item.systems[0].activities[0].remark}</td>
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
                      <td>{item.systems[0].activities[1].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        OCC Mic (TC & CC) &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[0].activities[1].subCheckboxes.DCC_Mic
                          }
                          disabled
                        />
                      </td>
                      <td className="text-start"></td>
                      <td>{item.systems[0].activities[1].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        CSS HMI Mic &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[0].activities[1].subCheckboxes.PPIO_Mic
                          }
                          disabled
                        />
                      </td>
                      <td className="text-start"></td>
                      <td>{item.systems[0].activities[1].remark}</td>
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
                      <td>{item.systems[0].activities[2].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check if disk free space is atleast 10% of disk size in
                        HMI&nbsp;
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
                      <td>{item.systems[0].activities[3].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check & Record Max. CPU and RAM Utilization values in
                        HMI (shall be less than 80%)
                        <input
                          type="checkbox"
                          checked={
                            item.systems[0].activities[4].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        <td className="text-start">
                          OCC: CPU :{" "}
                          {item.systems[0].activities[4].subInputValues.OCC_CPU}
                          % <br /> OCC: RAM :{" "}
                          {item.systems[0].activities[4].subInputValues.OCC_RAM}
                          %
                        </td>
                        <td className="text-start">
                          CSS: CPU :{" "}
                          {item.systems[0].activities[4].subInputValues.CSS_CPU}
                          % <br />
                          CSS: RAM :{" "}
                          {item.systems[0].activities[4].subInputValues.CSS_RAM}
                          %
                        </td>
                        <td className="text-start">
                          BCC: CPU :{" "}
                          {item.systems[0].activities[4].subInputValues.BCC_CPU}
                          % <br />
                          BCC: RAM :{" "}
                          {item.systems[0].activities[4].subInputValues.BCC_RAM}
                          %
                        </td>
                        <td className="text-start">
                          OCC-NMS CPU :{" "}
                          {item.systems[0].activities[4].subInputValues.NMS_CPU}
                          % <br />
                          OCC-NMS RAM :{" "}
                          {item.systems[0].activities[4].subInputValues.NMS_RAM}
                          %
                        </td>
                      </td>

                      <td>{item.systems[0].activities[4].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check PAS Live Audio Announcement Recording in CDRS
                        Machine&nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[0].activities[5].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[0].activities[5].remark}</td>
                    </tr>
                    <tr>
                      <td rowSpan={8}>TELEPHONE</td>
                      <td className="text-start" colSpan={2}>
                        Check LED status of EPABX cards &nbsp;
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
                      <td>{item.systems[1].activities[0].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Cleaning of external surface of EPABX &nbsp;
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
                      <td>{item.systems[1].activities[1].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check LED Status of Server in Telephone Rack (CER)
                        &nbsp;
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
                      <td>{item.systems[1].activities[2].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check Internode & PRI calls functionality for all phones
                        (BCC Theatre) &nbsp;
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
                      <td>{item.systems[1].activities[3].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Physical Inspection of IDF and MDF &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[1].activities[4].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[1].activities[4].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Remove Temporary Files and Check Memory Process in NMS
                        <input
                          type="checkbox"
                          checked={
                            item.systems[1].activities[5].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        <td className="text-start">
                          CPU :{" "}
                          {item.systems[1].activities[5].subInputValues.CPU}%{" "}
                          <br /> RAM :{" "}
                          {item.systems[1].activities[5].subInputValues.RAM}%
                        </td>
                      </td>

                      <td>{item.systems[1].activities[5].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check if disk free space is atleast 10% of disk size in
                        All Attendant Console &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[1].activities[6].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[1].activities[6].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Remove Temporary files and run disk cleanup on All
                        Attendant Console &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[1].activities[7].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[1].activities[7].remark}</td>
                    </tr>
                    <tr>
                      <td rowSpan={12}>CCTV</td>
                      <td className="text-start" colSpan={2}>
                        External cleaning of CCTV rack equipment(CER) &nbsp;
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
                      <td>{item.systems[2].activities[0].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Reviewing of windows event viewer in
                        CLSTR,ENTZ,BVMS-1,BVMS-2 &nbsp;
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
                      <td>{item.systems[2].activities[1].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check for abnormal shutdown of recorder from event
                        viewer &nbsp;
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
                      <td>{item.systems[2].activities[2].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Verify time synchronization for CLSTR,ENTZ,BVMS-1,BVMS-2
                        and HMI &nbsp;
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
                      <td>{item.systems[2].activities[3].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Verify logging status of recorder log files &nbsp;
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
                      <td>{item.systems[2].activities[4].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Reviewing disk management in CLSTR,ENTZ,BVMS-1,BVMS-2
                        &nbsp;
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
                      <td>{item.systems[2].activities[5].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Remove Temporary files and run disk cleanup in OCC/BCC
                        HMI &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[6].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[2].activities[6].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check if disk free space is atleast 10% of disk size in
                        HMI &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[7].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[2].activities[7].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Run server administrator in CLSTR,ENTZ,BVMS-1,BVMS-2 and
                        check all Hardware status &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[8].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[2].activities[8].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Verify Disk Space and clean Temp Files of
                        CLSTR,ENTZ,BVMS-1,BVMS-2 &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[9].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[2].activities[9].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Check & Record Max. CPU and RAM Utilization status in
                        HMI (shall be less than 80%)
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[10].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                        <td className="text-start">
                          CC: CPU :{" "}
                          {item.systems[2].activities[10].subInputValues.CC_CPU}
                          % <br /> CC: RAM :{" "}
                          {item.systems[2].activities[10].subInputValues.CC_RAM}
                          %
                        </td>
                        <td className="text-start">
                          TC: CPU :{" "}
                          {item.systems[2].activities[10].subInputValues.TC_CPU}
                          % <br />
                          TC: RAM :{" "}
                          {item.systems[2].activities[10].subInputValues.TC_RAM}
                          %
                        </td>
                        <td className="text-start">
                          CSS: CPU :{" "}
                          {
                            item.systems[2].activities[10].subInputValues
                              .CSS_CPU
                          }
                          % <br />
                          CSS: RAM :{" "}
                          {
                            item.systems[2].activities[10].subInputValues
                              .CSS_RAM
                          }
                          %
                        </td>
                        <td className="text-start">
                          Security: CPU :{" "}
                          {
                            item.systems[2].activities[10].subInputValues
                              .Security_CPU
                          }
                          % <br />
                          Security: RAM :{" "}
                          {
                            item.systems[2].activities[10].subInputValues
                              .Security_RAM
                          }
                          %
                        </td>
                      </td>

                      <td>{item.systems[2].activities[10].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Environmental Conditions Inspection in Server Rack
                        &nbsp;
                        <input
                          type="checkbox"
                          checked={
                            item.systems[2].activities[11].checked == "yes"
                              ? true
                              : false
                          }
                          disabled
                        />
                      </td>
                      <td>{item.systems[2].activities[11].remark}</td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={4}>
                        Supervisor Name : {item.SName}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        EMP ID:{item.SempId}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Date & Time:{item.SdateTime}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={4}>
                        Supervisor Name: {item.MName}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        EMP ID: {item.MempId}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Date & Time:
                        {item.MdateTime}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <td className=" ">
                  {item.status === "0" ? (
                    <div className="d-flex">
                      <Link
                        to={`/edit/pm-occ-bcc-monthly`}
                        state={{ id: item.id }}
                        className="btn btn-primary align-content-center"
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(id);
                        }}
                        className="btn btn-primary"
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

export default MonthlyMaintenanceScheduleList;
