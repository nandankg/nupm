import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { fetchData, saveData } from "../../reducer/redux/tableDataSlice";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const PMSheetoccYearlyTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);

  const { toPDF, targetRef } = usePDF({
    filename: " YEARLY MAINTENANCE SCHEDUL_Table.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();

  const PMsheetList = useSelector((state) => state.data);
  const [slug, setSlug] = useState(getLastParameter().trim());

  const itmm = PMsheetList.data.data;

 

  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  const handleSave = (id) => {
    dispatch(saveData({ formType: slug, id }));
    navigate(`list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              YEARLY MAINTENANCE SCHEDUL
            </Link>
            <Link underline="hover" color="inherit">
              Table
            </Link>
          </Breadcrumbs>
        </div>
        <div
          className="mb-3 form-heading-container"
          style={{ maxWidth: "95%" }}
        >
          <h3 className="form-heading"> YEARLY MAINTENANCE SCHEDUL</h3>
          <span className="line-box" style={{ width: "470px" }}></span>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex gap-3">
                <Link to="">
                  {/* <button className="btn btn-primary">
                                          <FaFilter />
                                             </button> */}
                </Link>
                <DownloadTableExcel
                  filename="YEARLY_MAINTENANCE_SCHEDUL_Table"
                  sheet=" YEARLY_MAINTENANCE_SCHEDUL_Table"
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
                  style={{ border: "1px solid #0baa9a" }}
                >
                  <MdPictureAsPdf size={"25px"} color="#850d04" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div ref={targetRef}>
          {filteredData?.map((item, indexsc) => (
            <div ref={tableRef} key={indexsc}>
              <table>
                <thead>
                  <tr>
                    <th colSpan={3} style={{ textAlign: "left" }}>
                      Station:
                      {item.station}
                    </th>
                    <th colSpan={3} style={{ textAlign: "left" }}>
                      Date:
                      {item.date}
                    </th>
                  </tr>
                  <tr>
                    <th>System</th>
                    <th colSpan={2}>Activity</th>
                    <th>Checkbox</th>
                    <th colSpan={3}>Remark</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td rowSpan={5}>PAS-PIDS</td>
                    <td className="text-start" colSpan={2}>
                      Perform the Internal cleaning of amplifiers with shutting
                      down if necessary equipments.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[0].activities[0].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[0].activities[0]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Perform Central Servers Redundancy Check.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[0].activities[1].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[0].activities[1]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Check PIDS-PAS and Telephone/Radio Integration by Making
                      Announcements.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[0].activities[2].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[0].activities[2]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Perform PIDS-PAS ATS Link Redundancy Check in
                      co-ordination with Signalling Depratment.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[0].activities[3].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[0].activities[3]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Take Backup of PIDS-PAS Server,NCO,QSC.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[0].activities[4].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[0].activities[4]?.remark}
                    </td>
                  </tr>

                  <tr>
                    <td rowSpan={45}>FOTS</td>
                    <td className="text-start" colSpan={2}>
                      Checking of fiber continuity and fiber loss for Dark
                      fibers, using OTDR.Record the values in Fiber loss sheet.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[0].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[0]?.remark}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start" colSpan={2}>
                      Take the backup of Core Switch and ASW server farm.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[1].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[1]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Calculation of link loss.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[2].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[2]?.remark}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start">
                      Next Station to present station - TPND to BCC:
                      <br />
                      Tx:{item.systems[1].activities[3].BCC1.values[0]} &nbsp;
                      &nbsp; Rx: {item.systems[1].activities[3].BCC1.values[1]}{" "}
                      &nbsp; &nbsp; Loss:{" "}
                      {item.systems[1].activities[3].BCC1.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[3].BCC1.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start">
                      Present Station to Next station - BCC to TPND:
                      <br />
                      Tx:{item.systems[1].activities[3].BCC2.values[0]} &nbsp;
                      &nbsp; Rx: {item.systems[1].activities[3].BCC2.values[1]}{" "}
                      &nbsp; &nbsp; Loss:{" "}
                      {item.systems[1].activities[3].BCC2.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[3].BCC2.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start">
                      Previous Station to present station - SHVA to BCC:
                      <br />
                      Tx:{item.systems[1].activities[3].BCC3.values[0]} &nbsp;
                      &nbsp; Rx: {item.systems[1].activities[3].BCC3.values[1]}{" "}
                      &nbsp; &nbsp; Loss:{" "}
                      {item.systems[1].activities[3].BCC3.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[3].BCC3.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start">
                      Present Station to previous station - BCC to SHVA:
                      <br />
                      Tx:{item.systems[1].activities[3].BCC4.values[0]} &nbsp;
                      &nbsp; Rx: {item.systems[1].activities[3].BCC4.values[1]}{" "}
                      &nbsp; &nbsp; Loss:{" "}
                      {item.systems[1].activities[3].BCC4.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[3].BCC4.values[3]} &nbsp;
                      &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Measure Signal strength of Linkage ports (in dBs)&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[4].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[4]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Measure Signal strength of VFL Linkage ports
                      BCC-OCC.&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[5].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[5]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      BCC to OCC VFL link 1 loss
                      <br />
                      Tx:{item.systems[1].activities[6].BCC5.values[0]} &nbsp;
                      &nbsp; Rx: {item.systems[1].activities[6].BCC5.values[1]}{" "}
                      &nbsp; &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[6]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      BCC to OCC VFL link 2 loss
                      <br />
                      Tx:{item.systems[1].activities[7].BCC6.values[0]} &nbsp;
                      &nbsp; Rx: {item.systems[1].activities[7].BCC6.values[1]}{" "}
                      &nbsp; &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[7]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Measure Signal strength of Linkage ports TPND-BCC.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[8].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[8]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      TPND - S1- PORT 50-BCC
                      <br />
                      Tx:{item.systems[1].activities[9].BCC7.values[0]} &nbsp;
                      &nbsp; Rx: {item.systems[1].activities[9].BCC7.values[1]}{" "}
                      &nbsp; &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[9]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      BCC - 2/2/3
                      <br />
                      Tx:{item.systems[1].activities[10].BCC8.values[0]} &nbsp;
                      &nbsp; Rx: {item.systems[1].activities[10].BCC8.values[1]}{" "}
                      &nbsp; &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[10]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Measure Signal strength of Linkage ports ABST- BCC.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[11].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[11]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      ABST- S1- PORT 50-BCC
                      <br />
                      Tx:{item.systems[1].activities[12].BCC9.values[0]} &nbsp;
                      &nbsp; Rx: {item.systems[1].activities[12].BCC9.values[1]}{" "}
                      &nbsp; &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[12]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      BCC - 2/2/10
                      <br />
                      Tx:{item.systems[1].activities[13].BCC10.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[13].BCC10.values[1]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[13]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Measure Signal strength of Linkage ports AMSM - BCC.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[14].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[14]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      AMSM- S2- PORT 26-BCC
                      <br />
                      Tx:{item.systems[1].activities[15].BCC11.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[15].BCC11.values[1]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[15]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      BCC - 2/1/18
                      <br />
                      Tx:{item.systems[1].activities[16].BCC12.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[16].BCC12.values[1]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[16]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Measure Signal strength of Linkage ports HSGJ - BCC.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[17].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[17]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      HSGJ- S2- PORT 26-BCC
                      <br />
                      Tx:{item.systems[1].activities[18].BCC13.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[18].BCC13.values[1]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[18]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      BCC - 2/1/10
                      <br />
                      Tx:{item.systems[1].activities[19].BCC14.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[19].BCC14.values[1]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[19]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Measure Signal strength of Linkage ports BSNM - BCC.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[20].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[20]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      BSNM - S2- PORT 26-BCC
                      <br />
                      Tx:{item.systems[1].activities[21].BCC15.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[21].BCC15.values[1]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[21]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      BCC - 2/1/12
                      <br />
                      Tx:{item.systems[1].activities[22].BCC16.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[22].BCC16.values[1]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[22]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Measure Signal strength of Linkage ports LHMT - BCC.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[23].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[23]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      LHMT - S1- PORT 50-BCC
                      <br />
                      Tx:{item.systems[1].activities[24].BCC17.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[24].BCC17.values[1]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[24]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2} rowSpan={1}>
                      BCC - 2/1/17
                      <br />
                      Tx:{item.systems[1].activities[25].BCC18.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[25].BCC18.values[1]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[25]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Calculation of link loss (in dBs).
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[26].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[26]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Ring 1:BCC-TPND-ALMB-SHVA.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[27].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[27]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      ALMB to BCC:
                      <br />
                      Tx:{item.systems[1].activities[28].BCC19.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[28].BCC19.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[28].BCC19.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[28].BCC19.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[28]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      BCC to ALMB:
                      <br />
                      Tx:{item.systems[1].activities[29].BCC20.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[29].BCC20.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[29].BCC20.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[29].BCC20.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[29]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Ring 2:BCC-ABST-CHBG-SHVA.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[30].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[30]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      ABST to BCC:
                      <br />
                      Tx:{item.systems[1].activities[31].BCC21.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[31].BCC21.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[31].BCC21.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[31].BCC21.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[31]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      BCC to ABST:
                      <br />
                      Tx:{item.systems[1].activities[32].BCC22.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[32].BCC22.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[32].BCC22.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[32].BCC22.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[32]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Ring 3:BCC-AMSM-CCAP-SHVA.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[33].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[33]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      AMSM to BCC:
                      <br />
                      Tx:{item.systems[1].activities[34].BCC23.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[34].BCC23.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[34].BCC23.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[34].BCC23.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[34]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      BCC to AMSM:
                      <br />
                      Tx:{item.systems[1].activities[35].BCC24.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[35].BCC24.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[35].BCC24.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[35].BCC24.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[35]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Ring 4:BCC-HSGJ-KDSS-SHVA.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[36].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[36]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      HSGJ to BCC:
                      <br />
                      Tx:{item.systems[1].activities[37].BCC25.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[37].BCC25.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[37].BCC25.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[37].BCC25.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[37]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      BCC to HSGJ:
                      <br />
                      Tx:{item.systems[1].activities[38].BCC26.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[38].BCC26.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[38].BCC26.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[38].BCC26.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[38]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Ring 5:BCC-BSNM-VSVM-SHVA.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[39].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[39]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      BSNM to BCC:
                      <br />
                      Tx:{item.systems[1].activities[40].BCC27.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[40].BCC27.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[40].BCC27.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[40].BCC27.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[40]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      BCC to BSNM:
                      <br />
                      Tx:{item.systems[1].activities[41].BCC28.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[41].BCC28.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[41].BCC28.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[41].BCC28.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[41]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Ring 6:BCC-LHMT-MSPA-SHVA.
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[1].activities[42].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[42]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      LHMT to BCC:
                      <br />
                      Tx:{item.systems[1].activities[43].BCC29.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[43].BCC29.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[43].BCC29.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[43].BCC29.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[43]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      BCC to LHMT:
                      <br />
                      Tx:{item.systems[1].activities[44].BCC30.values[0]} &nbsp;
                      &nbsp; Rx:{" "}
                      {item.systems[1].activities[44].BCC30.values[1]} &nbsp;
                      &nbsp; Loss:{" "}
                      {item.systems[1].activities[44].BCC30.values[2]} &nbsp;
                      &nbsp; Prev. loss:{" "}
                      {item.systems[1].activities[44].BCC30.values[3]} &nbsp;
                      &nbsp;
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[1].activities[44]?.remark}
                    </td>
                  </tr>

                  <tr>
                    <td rowSpan={2}>Radio</td>
                    <td className="text-start" colSpan={2}>
                      Clean Interior: Shutdown, cleanout dust by Dry Smooth
                      Cloth, Blower, Vacuum Etc of RCW.&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[2].activities[0].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[2].activities[0]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Take the backup of All Radio(MSO) and CAD Rack
                      Equipmets.&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[2].activities[1].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[2].activities[1]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={1}>Telephone</td>
                    <td className="text-start" colSpan={2}>
                      Internal cleaning of EPABX cabinet by shutting down
                      completely.&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[3].activities[0].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[3].activities[0]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={1}>MSC</td>
                    <td className="text-start" colSpan={2}>
                      Cleaning and Tightening of GPS Receiver.&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[4].activities[0].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[4].activities[0]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={3}>CCTV</td>
                    <td className="text-start" colSpan={2}>
                      Checking of CCTV Server OCC Node to BCC node changeover
                      and vice versa.&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[5].activities[0].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[5].activities[0]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Internal Cleaning of All CCTV Server .&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[5].activities[1].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[5].activities[1]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Take the backup of CCTV Configuration.&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[5].activities[2].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[5].activities[2]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={1}>UPS(60KVA)</td>
                    <td className="text-start" colSpan={2}>
                      Internal Cleaning of All cubical of UPS
                      System(ATS,UPS,SCVS,ACDB).&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[6].activities[0].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[6].activities[0]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>ACS</td>
                    <td className="text-start" colSpan={2}>
                      Take the backup of ACS Configuration.&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[7].activities[0].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[7].activities[0]?.remark}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={2}>
                      Internal Cleaning of ACS Server.&nbsp;
                    </td>
                    <td className="text-start" style={{ textAlign: "center" }}>
                      <span>
                        {item?.systems[7].activities[1].checked === "yes"
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>
                    <td className="text-start" colSpan={4} rowSpan={1}>
                      {item?.systems[7].activities[1]?.remark}
                    </td>
                  </tr>
                </tbody>

                <tr>
                  <td className=" " colSpan={5}>
                    {item.status === "0" || user.role === "Admin" ? (
                      <div className="d-flex gap-2 align-items-center">
                        <Link
                          to={`/edit/${slug}`}
                          state={{ id: item.id }}
                          className="btn align-content-center"
                          style={{
                            width: "100px",
                            height: "50px",
                            textAlign: "center",
                            backgroundColor: "#f4d03f",
                            color: "black",
                            fontSize: "20px",
                          }}
                        >
                          Edit
                        </Link>
                        <button
                          type="submit"
                          onClick={() => {
                            handleSave(item.id);
                          }}
                          className="btn btn-primary"
                          style={{
                            width: "100px",
                            height: "50px",
                            textAlign: "center",
                            fontSize: "18px",
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PMSheetoccYearlyTable;
