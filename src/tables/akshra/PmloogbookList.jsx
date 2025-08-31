import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { addloog } from "../../reducer/akshra/PmloogbookReducer";
import { fetchData, saveData } from "../../reducer/akshra/ChecklistReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const PmloogbookList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);

  const { toPDF, targetRef } = usePDF({ filename: "pmlogbook.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const PMloogbookList = useSelector((state) => state.logbook);
  const [slug, setSlug] = useState("");
  const itmm = PMloogbookList.data.data;

  useEffect(() => {
    const delayedFunction = () => {
      dispatch(fetchData());
    };

    // Set a timeout to call the function after 3 seconds
    const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds

    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout); // Cleanup interval on unmount
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
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="form/pmloog/register">
              PM LOGBOOK MAINLINE
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> PM LOGBOOK MAININLINE-10</h3>
        <span className="line-box"></span>

        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="AFC_HALF_YEARLY_table"
            sheet="AFC_HALF_YEARLY_table"
            currentTableRef={tableRef.current}
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
      </div>
      <div ref={targetRef}>
        {filteredItems?.toReversed().map((item, index) => {
          const value = item?.activities;
          const Values = item?.activities2;
          return (
            <>
              <table>
                <thead>
                  <tr>
                    <th className="text-start" colspan="3">
                      STN. NAME: {item?.stn_name}{" "}
                    </th>
                    <th className="text-start" colspan="1">
                      FREQUENCY:HALF YEARLY {item?.frequency}
                    </th>
                    <th className="text-start" colspan="7">
                      DATE: {item?.date}
                    </th>
                    <th className="text-start" colspan="3">
                      MONTH: {item?.month}{" "}
                    </th>
                  </tr>
                  <tr>
                    <th rowSpan="6">Equipment</th>
                    <th rowSpan="2">Sr. No.</th>
                    <th rowSpan="2">Activity</th>
                    <th rowSpan="2">DESCRIPTION OF WORK</th>
                    <th colSpan="7">TOM</th>
                    <th rowSpan="2">REMARKS/ DEFICIENCIES</th>
                    <th rowSpan="2">ACTION TAKEN</th>
                    <th rowSpan="2">WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                  </tr>
                  <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      rowSpan={16}
                      style={{
                        writingMode: "vertical-lr",
                        textAlign: "center",
                      }}
                    >
                      TOM (Ref:O&M/TELE-AFC/SOP/01)
                    </td>
                    <td>1</td>
                    <td rowSpan={5}>Visual Inspection</td>
                    <td className="text-start">
                      Check Fixing & Alignment of all modules of TOM
                    </td>

                    <td>{value?.[0]?.T1}</td>
                    <td>{value?.[0]?.T2}</td>
                    <td>{value?.[0]?.T3}</td>
                    <td>{value?.[0]?.T4}</td>
                    <td>{value?.[0]?.T5}</td>
                    <td>{value?.[0]?.T6}</td>
                    <td>{value?.[0]?.T7}</td>

                    <td>{value?.[0]?.remark}</td>
                    <td>{value?.[0]?.action}</td>
                    <td>{value?.[0]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>2</td>

                    <td className="text-start">
                      Checking of all Cable connection and dressing
                    </td>
                    <td>{value?.[1]?.T1}</td>
                    <td>{value?.[1]?.T2}</td>
                    <td>{value?.[1]?.T3}</td>
                    <td>{value?.[1]?.T4}</td>
                    <td>{value?.[1]?.T5}</td>
                    <td>{value?.[1]?.T6}</td>
                    <td>{value?.[1]?.T7}</td>

                    <td>{value?.[1]?.remark}</td>
                    <td>{value?.[1]?.action}</td>
                    <td>{value?.[1]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td className="text-start">Check Date and Time</td>
                    <td>{value?.[2]?.T1}</td>
                    <td>{value?.[2]?.T2}</td>
                    <td>{value?.[2]?.T3}</td>
                    <td>{value?.[2]?.T4}</td>
                    <td>{value?.[2]?.T5}</td>
                    <td>{value?.[2]?.T6}</td>
                    <td>{value?.[2]?.T7}</td>

                    <td>{value?.[2]?.remark}</td>
                    <td>{value?.[2]?.action}</td>
                    <td>{value?.[2]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td className="text-start">
                      Check Lubrication of all locks with Silicon oil
                    </td>
                    <td>{value?.[3]?.T1}</td>
                    <td>{value?.[3]?.T2}</td>
                    <td>{value?.[3]?.T3}</td>
                    <td>{value?.[3]?.T4}</td>
                    <td>{value?.[3]?.T5}</td>
                    <td>{value?.[3]?.T6}</td>
                    <td>{value?.[3]?.T7}</td>

                    <td>{value?.[3]?.remark}</td>
                    <td>{value?.[3]?.action}</td>
                    <td>{value?.[3]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td className="text-start">
                      Cleaning of upto sensor,Antenna, Token tray, Reject bin,
                      Token box, token path, token hopper
                    </td>
                    <td>{value?.[4]?.T1}</td>
                    <td>{value?.[4]?.T2}</td>
                    <td>{value?.[4]?.T3}</td>
                    <td>{value?.[4]?.T4}</td>
                    <td>{value?.[4]?.T5}</td>
                    <td>{value?.[4]?.T6}</td>
                    <td>{value?.[4]?.T7}</td>

                    <td>{value?.[4]?.remark}</td>
                    <td>{value?.[4]?.action}</td>
                    <td>{value?.[4]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td rowSpan={2}>Cleaning</td>
                    <td className="text-start">
                      Cleaning of all modules of TOM
                    </td>
                    <td>{value?.[5]?.T1}</td>
                    <td>{value?.[5]?.T2}</td>
                    <td>{value?.[5]?.T3}</td>
                    <td>{value?.[5]?.T4}</td>
                    <td>{value?.[5]?.T5}</td>
                    <td>{value?.[5]?.T6}</td>
                    <td>{value?.[5]?.T7}</td>

                    <td>{value?.[5]?.remark}</td>
                    <td>{value?.[5]?.action}</td>
                    <td>{value?.[5]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td className="text-start">Cleaning of Trench</td>
                    <td>{value?.[6]?.T1}</td>
                    <td>{value?.[6]?.T2}</td>
                    <td>{value?.[6]?.T3}</td>
                    <td>{value?.[6]?.T4}</td>
                    <td>{value?.[6]?.T5}</td>
                    <td>{value?.[6]?.T6}</td>
                    <td>{value?.[6]?.T7}</td>

                    <td>{value?.[6]?.remark}</td>
                    <td>{value?.[6]?.action}</td>
                    <td>{value?.[6]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td rowSpan={9}>Module Test (Maintenance Menu)</td>
                    <td className="text-start">
                      Card Reader Writer (CRW) Test
                    </td>
                    <td>{value?.[7]?.T1}</td>
                    <td>{value?.[7]?.T2}</td>
                    <td>{value?.[7]?.T3}</td>
                    <td>{value?.[7]?.T4}</td>
                    <td>{value?.[7]?.T5}</td>
                    <td>{value?.[7]?.T6}</td>
                    <td>{value?.[7]?.T7}</td>

                    <td>{value?.[7]?.remark}</td>
                    <td>{value?.[7]?.action}</td>
                    <td>{value?.[7]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>9</td>

                    <td className="text-start">Printer Test</td>
                    <td>{value?.[8]?.T1}</td>
                    <td>{value?.[8]?.T2}</td>
                    <td>{value?.[8]?.T3}</td>
                    <td>{value?.[8]?.T4}</td>
                    <td>{value?.[8]?.T5}</td>
                    <td>{value?.[8]?.T6}</td>
                    <td>{value?.[8]?.T7}</td>

                    <td>{value?.[8]?.remark}</td>
                    <td>{value?.[8]?.action}</td>
                    <td>{value?.[8]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td className="text-start">
                      Passenger Dispaly Unit (PDU) Test
                    </td>
                    <td>{value?.[9]?.T1}</td>
                    <td>{value?.[9]?.T2}</td>
                    <td>{value?.[9]?.T3}</td>
                    <td>{value?.[9]?.T4}</td>
                    <td>{value?.[9]?.T5}</td>
                    <td>{value?.[9]?.T6}</td>
                    <td>{value?.[9]?.T7}</td>

                    <td>{value?.[9]?.remark}</td>
                    <td>{value?.[9]?.action}</td>
                    <td>{value?.[9]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td className="text-start">
                      Token Dispensing Machine (TDM) Test
                    </td>
                    <td>{value?.[10]?.T1}</td>
                    <td>{value?.[10]?.T2}</td>
                    <td>{value?.[10]?.T3}</td>
                    <td>{value?.[10]?.T4}</td>
                    <td>{value?.[10]?.T5}</td>
                    <td>{value?.[10]?.T6}</td>
                    <td>{value?.[10]?.T7}</td>

                    <td>{value?.[10]?.remark}</td>
                    <td>{value?.[10]?.action}</td>
                    <td>{value?.[10]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>12</td>

                    <td className="text-start">Touch Screen Test</td>
                    <td>{value?.[11]?.T1}</td>
                    <td>{value?.[11]?.T2}</td>
                    <td>{value?.[11]?.T3}</td>
                    <td>{value?.[11]?.T4}</td>
                    <td>{value?.[11]?.T5}</td>
                    <td>{value?.[11]?.T6}</td>
                    <td>{value?.[11]?.T7}</td>

                    <td>{value?.[11]?.remark}</td>
                    <td>{value?.[11]?.action}</td>
                    <td>{value?.[11]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>13</td>
                    <td className="text-start">
                      Counter Communication System Test
                    </td>
                    <td>{value?.[12]?.T1}</td>
                    <td>{value?.[12]?.T2}</td>
                    <td>{value?.[12]?.T3}</td>
                    <td>{value?.[12]?.T4}</td>
                    <td>{value?.[12]?.T5}</td>
                    <td>{value?.[12]?.T6}</td>
                    <td>{value?.[12]?.T7}</td>

                    <td>{value?.[12]?.remark}</td>
                    <td>{value?.[12]?.action}</td>
                    <td>{value?.[12]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>14</td>
                    <td className="text-start">Keyboard, Mouse Test</td>
                    <td>{value?.[13]?.T1}</td>
                    <td>{value?.[13]?.T2}</td>
                    <td>{value?.[13]?.T3}</td>
                    <td>{value?.[13]?.T4}</td>
                    <td>{value?.[13]?.T5}</td>
                    <td>{value?.[13]?.T6}</td>
                    <td>{value?.[13]?.T7}</td>

                    <td>{value?.[13]?.remark}</td>
                    <td>{value?.[13]?.action}</td>
                    <td>{value?.[13]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>15</td>
                    <td className="text-start">Check LAN Status</td>
                    <td>{value?.[14]?.T1}</td>
                    <td>{value?.[14]?.T2}</td>
                    <td>{value?.[14]?.T3}</td>
                    <td>{value?.[14]?.T4}</td>
                    <td>{value?.[14]?.T5}</td>
                    <td>{value?.[14]?.T6}</td>
                    <td>{value?.[14]?.T7}</td>

                    <td>{value?.[14]?.remark}</td>
                    <td>{value?.[14]?.action}</td>
                    <td>{value?.[14]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>16</td>
                    <td className="text-start">Check Power strip</td>
                    <td>{value?.[15]?.T1}</td>
                    <td>{value?.[15]?.T2}</td>
                    <td>{value?.[15]?.T3}</td>
                    <td>{value?.[15]?.T4}</td>
                    <td>{value?.[15]?.T5}</td>
                    <td>{value?.[15]?.T6}</td>
                    <td>{value?.[15]?.T7}</td>

                    <td>{value?.[15]?.remark}</td>
                    <td>{value?.[15]?.action}</td>
                    <td>{value?.[15]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>Equip ment.</td>
                    <td>Sr. No.</td>
                    <td>Activity</td>
                    <td>DESCRIPTION OF WORK</td>
                    <td>ISOLATER</td>
                    <td>UPS- EC</td>
                    <td>SCR -EC</td>
                    <td>TOM-EC</td>
                    <td>TOM-EC</td>
                    <td>EFO-EC</td>
                    <td>EFO-EC</td>
                    <td>REMARKS/ DEFFICIENCIES</td>
                    <td>ACTION TAKEN</td>
                    <td>WHY DEFICIENCY COULD NOT BE RECTIFIE</td>
                  </tr>

                  <tr>
                    <td
                      rowSpan={6}
                      style={{
                        writingMode: "vertical-lr",
                        textAlign: "center",
                      }}
                    >
                      EC(Ref:O&M/TELE-AFC/SOP/01)
                    </td>

                    <td>1</td>
                    <td rowSpan={3}>Visual Inspection</td>
                    <td className="text-start">Check Power strip</td>
                    <td>{Values?.[16]?.EC1}</td>
                    <td>{Values?.[16]?.EC2}</td>
                    <td>{Values?.[16]?.EC3}</td>
                    <td>{Values?.[16]?.EC4}</td>
                    <td>{Values?.[16]?.EC5}</td>
                    <td>{Values?.[16]?.EC6}</td>
                    <td>{Values?.[16]?.EC7}</td>

                    <td>{value?.[16]?.remark}</td>
                    <td>{value?.[16]?.action}</td>
                    <td>{value?.[16]?.deficiency}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td className="text-start">
                      Tightening of all Electrical Connection in EC
                    </td>
                    <td>{Values?.[17]?.EC1}</td>
                    <td>{Values?.[17]?.EC2}</td>
                    <td>{Values?.[17]?.EC3}</td>
                    <td>{Values?.[17]?.EC4}</td>
                    <td>{Values?.[17]?.EC5}</td>
                    <td>{Values?.[17]?.EC6}</td>
                    <td>{Values?.[17]?.EC7}</td>

                    <td>{Values?.[17]?.remark}</td>
                    <td>{Values?.[17]?.action}</td>
                    <td>{Values?.[17]?.deficiency}</td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td className="text-start">Checking of all indicators</td>
                    <td>{Values?.[18]?.EC1}</td>
                    <td>{Values?.[18]?.EC2}</td>
                    <td>{Values?.[18]?.EC3}</td>
                    <td>{Values?.[18]?.EC4}</td>
                    <td>{Values?.[18]?.EC5}</td>
                    <td>{Values?.[18]?.EC6}</td>
                    <td>{Values?.[18]?.EC7}</td>

                    <td>{Values?.[18]?.remark}</td>
                    <td>{Values?.[18]?.action}</td>
                    <td>{Values?.[18]?.deficiency}</td>
                  </tr>

                  <tr>
                    <td>4</td>
                    <td rowSpan={1}>Cleaning</td>
                    <td className="text-start">
                      Cleaning of Isolator and all Electrical Cabinet
                    </td>
                    <td>{Values?.[19]?.EC1}</td>
                    <td>{Values?.[19]?.EC2}</td>
                    <td>{Values?.[19]?.EC3}</td>
                    <td>{Values?.[19]?.EC4}</td>
                    <td>{Values?.[19]?.EC5}</td>
                    <td>{Values?.[19]?.EC6}</td>
                    <td>{Values?.[19]?.EC7}</td>

                    <td>{Values?.[19]?.remark}</td>
                    <td>{Values?.[19]?.action}</td>
                    <td>{Values?.[19]?.deficiency}</td>
                  </tr>

                  <tr>
                    <td>5</td>
                    <td rowSpan={2}>Module Test</td>
                    <td className="text-start">ELCB Push Button Operation</td>
                    <td>{Values?.[20]?.EC1}</td>
                    <td>{Values?.[20]?.EC2}</td>
                    <td>{Values?.[20]?.EC3}</td>
                    <td>{Values?.[20]?.EC4}</td>
                    <td>{Values?.[20]?.EC5}</td>
                    <td>{Values?.[20]?.EC6}</td>
                    <td>{Values?.[20]?.EC7}</td>

                    <td>{Values?.[20]?.remark}</td>
                    <td>{Values?.[20]?.action}</td>
                    <td>{Values?.[20]?.deficiency}</td>
                  </tr>

                  <tr>
                    <td>6</td>
                    <td className="text-start">
                      Testing of Isolator Mode selector
                    </td>
                    <td>{Values?.[21]?.EC1}</td>
                    <td>{Values?.[21]?.EC2}</td>
                    <td>{Values?.[21]?.EC3}</td>
                    <td>{Values?.[21]?.EC4}</td>
                    <td>{Values?.[21]?.EC5}</td>
                    <td>{Values?.[21]?.EC6}</td>
                    <td>{Values?.[21]?.EC7}</td>

                    <td>{Values?.[21]?.remark}</td>
                    <td>{Values?.[21]?.action}</td>
                    <td>{Values?.[21]?.deficiency}</td>
                  </tr>

                  <tr>
                    <td rowSpan={4} colSpan={3}>
                      Staff on Duty
                    </td>
                    <td className="text-start">Name</td>
                    <td className="text-start" colSpan={5}>
                      Desg
                    </td>
                    {/*<td className="text-start" colSpan={5}>
                      {" "}
                      Sign
                    </td>*/}
                  </tr>
                  <tr>
                    <td>{item.staff1_name}</td>
                    <td colSpan={5}>{item.staff1_desg}</td>
                    {/*<td colSpan={5}>{item.staff1_sign}</td>*/}
                  </tr>
                  <tr>
                    <td>{item.staff2_name}</td>
                    <td colSpan={5}>{item.staff2_desg}</td>
                    {/*<td colSpan={5}>{item.staff2_sign}</td>*/}
                  </tr>
                  <tr>
                    <td>{item.staff3_name}</td>
                    <td colSpan={5}>{item.staff3_desg}</td>
                    {/*<td colSpan={5}>{item.staff3_sign}</td>*/}
                  </tr>
                </tbody>
              </table>
              <td className="d-flex gap-3 mt-3 justify-content-end">
                {item.status === "0" ? (
                  <div className="d-flex ">
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

export default PmloogbookList;
