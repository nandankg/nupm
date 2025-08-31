import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addAfcpreventive,
  fetchData,
  saveData,
} from "../../reducer/isha/AFCHALFMONTLYReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import ActionButtons from "../../component/ActionButtons";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const AfcPreventiveMaintenanceTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: " AFC Preventive Maintenance(TOM half-yearly)_Table.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const dispatch = useDispatch();
  const afcpreventive = useSelector(
    (state) => state.AFCPREVENTIVEMAINTENANCECHECKLIST
  );
  const [slug, setSlug] = useState(getLastParameter().trim());
  const itmm = afcpreventive.data.data;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  const handleSave = (id) => {
    dispatch(saveData(id));
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 1000)
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              AFC PREVENTIVE MAINTENANCE CHECKLIST (TOM HALF YEARLY)
              (ANNEXURE-B)
            </Link>
            <Link underline="hover" color="inherit">
              Table
            </Link>
          </Breadcrumbs>
        </div>
        <h3>
          {" "}
          AFC PREVENTIVE MAINTENANCE CHECKLIST (TOM HALF YEARLY) (ANNEXURE-B)
          
        </h3>
        <span className="line-box" style={{ width: "900px" }}></span>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-3">
              <Link to="">
                {/*button className="btn btn-primary">
                <FaFilter />
              </button> */}
              </Link>
              <DownloadTableExcel
                filename="afc_checklist_TOMhalfyearly_table"
                sheet="afc_checklist_TOMhalfyearly_table"
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

        <div ref={targetRef}>
          <table ref={tableRef}>
            {filteredData?.map((item, index) => {
              const value = item?.activities1;
              return (
                <>
                  <thead>
                    <tr>
                      <th className="text-start" colspan="2">
                        STN. NAME: {item?.station}{" "}
                      </th>
                      <th className="text-start" colspan="1">
                       
                      </th>
                      <th className="text-start" colspan="4">
                        DATE: {item?.date}
                      </th>
                      <th className="text-start" colspan="3">
                        MONTH: {item?.month}
                      </th>
                      <th className="text-start" colspan="1">
                       
                      </th>
                      <th className="text-start" colspan="2">
                        DEPARTMENT: {item?.department}
                      </th>
                    </tr>
                    <tr>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan="7">TOM</th>
                      <th rowspan="2" style={{}}>
                        REMARKS/ DEFICIENCIES
                      </th>
                      <th rowspan="2">ACTION TAKEN</th>
                      <th rowspan="2" style={{ alignContent: "end" }}>
                        WHY DEFICIENCY COULD NOT BE RECTIFIED
                      </th>
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
                      <td>1</td>
                      <td rowSpan={8}>Visual Inspection</td>
                      <td className="text-start">
                        Check Fixing & Alignment of all modules of TOM
                      </td>

                      <td>{value?.[0]?.TOM1}</td>
                      <td>{value?.[0]?.TOM2}</td>
                      <td>{value?.[0]?.TOM3}</td>
                      <td>{value?.[0]?.TOM4}</td>
                      <td>{value?.[0]?.TOM5}</td>
                      <td>{value?.[0]?.TOM6}</td>
                      <td>{value?.[0]?.TOM7}</td>
                      <td>{value?.[0]?.remark}</td>
                      <td>{value?.[0]?.action}</td>
                      <td>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>
                      <td>{value?.[1]?.TOM1}</td>
                      <td>{value?.[1]?.TOM2}</td>
                      <td>{value?.[1]?.TOM3}</td>
                      <td>{value?.[1]?.TOM4}</td>
                      <td>{value?.[1]?.TOM5}</td>
                      <td>{value?.[1]?.TOM6}</td>
                      <td>{value?.[1]?.TOM7}</td>
                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td>{value?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">Check Date and Time</td>
                      <td>{value?.[2]?.TOM1}</td>
                      <td>{value?.[2]?.TOM2}</td>
                      <td>{value?.[2]?.TOM3}</td>
                      <td>{value?.[2]?.TOM4}</td>
                      <td>{value?.[2]?.TOM5}</td>
                      <td>{value?.[2]?.TOM6}</td>
                      <td>{value?.[2]?.TOM7}</td>
                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start">
                        Check Lubrication of all locks with silicone oil
                      </td>
                      <td>{value?.[3]?.TOM1}</td>
                      <td>{value?.[3]?.TOM2}</td>
                      <td>{value?.[3]?.TOM3}</td>
                      <td>{value?.[3]?.TOM4}</td>
                      <td>{value?.[3]?.TOM5}</td>
                      <td>{value?.[3]?.TOM6}</td>
                      <td>{value?.[3]?.TOM7}</td>
                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td>{value?.[3]?.deficiency}</td>
                    </tr>
                    
                    <tr>
                    <td>5</td>
                      <td className="text-start">
                      "Sealing of unused USB Port"
                      </td>
                      <td>{value?.[4]?.TOM1}</td>
                      <td>{value?.[4]?.TOM2}</td>
                      <td>{value?.[4]?.TOM3}</td>
                      <td>{value?.[4]?.TOM4}</td>
                      <td>{value?.[4]?.TOM5}</td>
                      <td>{value?.[4]?.TOM6}</td>
                      <td>{value?.[4]?.TOM7}</td>
                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start">
                      "Check TOM should be logged in via login card only",
                      </td>
                      <td>{value?.[5]?.TOM1}</td>
                      <td>{value?.[5]?.TOM2}</td>
                      <td>{value?.[5]?.TOM3}</td>
                      <td>{value?.[5]?.TOM4}</td>
                      <td>{value?.[5]?.TOM5}</td>
                      <td>{value?.[5]?.TOM6}</td>
                      <td>{value?.[5]?.TOM7}</td>
                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start">
                      "Check for disabled USB drives"
                      </td>
                      <td>{value?.[6]?.TOM1}</td>
                      <td>{value?.[6]?.TOM2}</td>
                      <td>{value?.[6]?.TOM3}</td>
                      <td>{value?.[6]?.TOM4}</td>
                      <td>{value?.[6]?.TOM5}</td>
                      <td>{value?.[6]?.TOM6}</td>
                      <td>{value?.[6]?.TOM7}</td>
                      <td>{value?.[6]?.remark}</td>
                      <td>{value?.[6]?.action}</td>
                      <td>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        Cleaning of Opto sensor, Antenna, Token tray, Reject
                        bin, Token box, token path, token hopper
                      </td>
                      <td>{value?.[7]?.TOM1}</td>
                      <td>{value?.[7]?.TOM2}</td>
                      <td>{value?.[7]?.TOM3}</td>
                      <td>{value?.[7]?.TOM4}</td>
                      <td>{value?.[7]?.TOM5}</td>
                      <td>{value?.[7]?.TOM6}</td>
                      <td>{value?.[7]?.TOM7}</td>
                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td rowSpan={2}> Cleaning</td>
                      <td className="text-start">
                        Cleaning of all modules of TOM
                      </td>
                      <td>{value?.[8]?.TOM1}</td>
                      <td>{value?.[8]?.TOM2}</td>
                      <td>{value?.[8]?.TOM3}</td>
                      <td>{value?.[8]?.TOM4}</td>
                      <td>{value?.[8]?.TOM5}</td>
                      <td>{value?.[8]?.TOM6}</td>
                      <td>{value?.[8]?.TOM7}</td>
                      <td>{value?.[8]?.remark}</td>
                      <td>{value?.[8]?.action}</td>
                      <td>{value?.[8]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start"> Cleaning of Trench</td>
                      <td>{value?.[9]?.TOM1}</td>
                      <td>{value?.[9]?.TOM2}</td>
                      <td>{value?.[9]?.TOM3}</td>
                      <td>{value?.[9]?.TOM4}</td>
                      <td>{value?.[9]?.TOM5}</td>
                      <td>{value?.[9]?.TOM6}</td>
                      <td>{value?.[9]?.TOM7}</td>
                      <td>{value?.[9]?.remark}</td>
                      <td>{value?.[9]?.action}</td>
                      <td>{value?.[9]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td rowSpan={9}> Module Test</td>
                      <td className="text-start">
                        Card Reader Writer (CRW) Test
                      </td>
                      <td>{value?.[10]?.TOM1}</td>
                      <td>{value?.[10]?.TOM2}</td>
                      <td>{value?.[10]?.TOM3}</td>
                      <td>{value?.[10]?.TOM4}</td>
                      <td>{value?.[10]?.TOM5}</td>
                      <td>{value?.[10]?.TOM6}</td>
                      <td>{value?.[10]?.TOM7}</td>
                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="text-start">Printer Test</td>
                      <td>{value?.[11]?.TOM1}</td>
                      <td>{value?.[11]?.TOM2}</td>
                      <td>{value?.[11]?.TOM3}</td>
                      <td>{value?.[11]?.TOM4}</td>
                      <td>{value?.[11]?.TOM5}</td>
                      <td>{value?.[11]?.TOM6}</td>
                      <td>{value?.[11]?.TOM7}</td>
                      <td>{value?.[11]?.remark}</td>
                      <td>{value?.[11]?.action}</td>
                      <td>{value?.[11]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="text-start">
                        Passenger Dispaly Unit (PDU) Test
                      </td>
                      <td>{value?.[12]?.TOM1}</td>
                      <td>{value?.[12]?.TOM2}</td>
                      <td>{value?.[12]?.TOM3}</td>
                      <td>{value?.[12]?.TOM4}</td>
                      <td>{value?.[12]?.TOM5}</td>
                      <td>{value?.[12]?.TOM6}</td>
                      <td>{value?.[12]?.TOM7}</td>
                      <td>{value?.[12]?.remark}</td>
                      <td>{value?.[12]?.action}</td>
                      <td>{value?.[12]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="text-start">
                        Token Dispensing Machine (TDM) Test
                      </td>
                      <td>{value?.[13]?.TOM1}</td>
                      <td>{value?.[13]?.TOM2}</td>
                      <td>{value?.[13]?.TOM3}</td>
                      <td>{value?.[13]?.TOM4}</td>
                      <td>{value?.[13]?.TOM5}</td>
                      <td>{value?.[13]?.TOM6}</td>
                      <td>{value?.[13]?.TOM7}</td>
                      <td>{value?.[13]?.remark}</td>
                      <td>{value?.[13]?.action}</td>
                      <td>{value?.[13]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="text-start">Touch Screen Test</td>
                      <td>{value?.[14]?.TOM1}</td>
                      <td>{value?.[14]?.TOM2}</td>
                      <td>{value?.[14]?.TOM3}</td>
                      <td>{value?.[14]?.TOM4}</td>
                      <td>{value?.[14]?.TOM5}</td>
                      <td>{value?.[14]?.TOM6}</td>
                      <td>{value?.[14]?.TOM7}</td>
                      <td>{value?.[14]?.remark}</td>
                      <td>{value?.[14]?.action}</td>
                      <td>{value?.[14]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="text-start">
                        Counter Communication System Test
                      </td>
                      <td>{value?.[15]?.TOM1}</td>
                      <td>{value?.[15]?.TOM2}</td>
                      <td>{value?.[15]?.TOM3}</td>
                      <td>{value?.[15]?.TOM4}</td>
                      <td>{value?.[15]?.TOM5}</td>
                      <td>{value?.[15]?.TOM6}</td>
                      <td>{value?.[15]?.TOM7}</td>
                      <td>{value?.[15]?.remark}</td>
                      <td>{value?.[15]?.action}</td>
                      <td>{value?.[15]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="text-start"> Keyboard, Mouse Testy</td>
                      <td>{value?.[16]?.TOM1}</td>
                      <td>{value?.[16]?.TOM2}</td>
                      <td>{value?.[16]?.TOM3}</td>
                      <td>{value?.[16]?.TOM4}</td>
                      <td>{value?.[16]?.TOM5}</td>
                      <td>{value?.[16]?.TOM6}</td>
                      <td>{value?.[16]?.TOM7}</td>
                      <td>{value?.[16]?.remark}</td>
                      <td>{value?.[16]?.action}</td>
                      <td>{value?.[16]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="text-start">Check LAN Status</td>
                      <td>{value?.[17]?.TOM1}</td>
                      <td>{value?.[17]?.TOM2}</td>
                      <td>{value?.[17]?.TOM3}</td>
                      <td>{value?.[17]?.TOM4}</td>
                      <td>{value?.[17]?.TOM5}</td>
                      <td>{value?.[17]?.TOM6}</td>
                      <td>{value?.[17]?.TOM7}</td>
                      <td>{value?.[17]?.remark}</td>
                      <td>{value?.[17]?.action}</td>
                      <td>{value?.[17]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td className="text-start">Check Power strip</td>
                      <td>{value?.[18]?.TOM1}</td>
                      <td>{value?.[18]?.TOM2}</td>
                      <td>{value?.[18]?.TOM3}</td>
                      <td>{value?.[18]?.TOM4}</td>
                      <td>{value?.[18]?.TOM5}</td>
                      <td>{value?.[18]?.TOM6}</td>
                      <td>{value?.[18]?.TOM7}</td>
                      <td>{value?.[18]?.remark}</td>
                      <td>{value?.[18]?.action}</td>
                      <td>{value?.[18]?.deficiency}</td>
                    </tr>
                  </tbody>
                </>
              );
            })}

            {filteredData?.map((item, indexs) => {
              const value = item?.activities2;
              return (
                <>
                  <thead>
                    <tr>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan="7">EC</th>
                      <th rowspan="2">REMARKS/ DEFICIENCIES</th>
                      <th rowspan="2">ACTION TAKEN</th>
                      <th rowspan="2">WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
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
                      <td>1</td>
                      <td rowSpan={3}>Visual Inspection</td>
                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>

                      <td>{value?.[0]?.EC1}</td>
                      <td>{value?.[0]?.EC2}</td>
                      <td>{value?.[0]?.EC3}</td>
                      <td>{value?.[0]?.EC4}</td>
                      <td>{value?.[0]?.EC5}</td>
                      <td>{value?.[0]?.EC6}</td>
                      <td>{value?.[0]?.EC7}</td>
                      <td>{value?.[0]?.remarks}</td>
                      <td>{value?.[0]?.actions}</td>
                      <td>{value?.[0]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td className="text-start">
                        Tightening of all Electrical Connection in EC
                      </td>
                      <td>{value?.[1]?.EC1}</td>
                      <td>{value?.[1]?.EC2}</td>
                      <td>{value?.[1]?.EC3}</td>
                      <td>{value?.[1]?.EC4}</td>
                      <td>{value?.[1]?.EC5}</td>
                      <td>{value?.[1]?.EC6}</td>
                      <td>{value?.[1]?.EC7}</td>
                      <td>{value?.[1]?.remarks}</td>
                      <td>{value?.[1]?.actions}</td>
                      <td>{value?.[1]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">Checking of all indicators</td>
                      <td>{value?.[2]?.EC1}</td>
                      <td>{value?.[2]?.EC2}</td>
                      <td>{value?.[2]?.EC3}</td>
                      <td>{value?.[2]?.EC4}</td>
                      <td>{value?.[2]?.EC5}</td>
                      <td>{value?.[2]?.EC6}</td>
                      <td>{value?.[2]?.EC7}</td>
                      <td>{value?.[2]?.remarks}</td>
                      <td>{value?.[2]?.actions}</td>
                      <td>{value?.[2]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td rowSpan={1}> Cleaning</td>
                      <td className="text-start">
                        Cleaning of Isolator and all Electrical Cabinet
                      </td>
                      <td>{value?.[3]?.EC1}</td>
                      <td>{value?.[3]?.EC2}</td>
                      <td>{value?.[3]?.EC3}</td>
                      <td>{value?.[3]?.EC4}</td>
                      <td>{value?.[3]?.EC5}</td>
                      <td>{value?.[3]?.EC6}</td>
                      <td>{value?.[3]?.EC7}</td>
                      <td>{value?.[3]?.remarks}</td>
                      <td>{value?.[3]?.actions}</td>
                      <td>{value?.[3]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td rowSpan={2}> Module Test</td>
                      <td className="text-start">
                      ELCB  Push Button Operation
                      </td>
                      <td>{value?.[4]?.EC1}</td>
                      <td>{value?.[4]?.EC2}</td>
                      <td>{value?.[4]?.EC3}</td>
                      <td>{value?.[4]?.EC4}</td>
                      <td>{value?.[4]?.EC5}</td>
                      <td>{value?.[4]?.EC6}</td>
                      <td>{value?.[4]?.EC7}</td>
                      <td>{value?.[4]?.remarks}</td>
                      <td>{value?.[4]?.actions}</td>
                      <td>{value?.[4]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>6</td>

                      <td className="text-start">
                      Testing of Isolator Mode selector
                      </td>
                      <td>{value?.[5]?.EC1}</td>
                      <td>{value?.[5]?.EC2}</td>
                      <td>{value?.[5]?.EC3}</td>
                      <td>{value?.[5]?.EC4}</td>
                      <td>{value?.[5]?.EC5}</td>
                      <td>{value?.[5]?.EC6}</td>
                      <td>{value?.[5]?.EC7}</td>
                      <td>{value?.[5]?.remarks}</td>
                      <td>{value?.[5]?.actions}</td>
                      <td>{value?.[5]?.deficiency1}</td>
                    </tr>
                  </tbody>
                  <tr>
                    <td colSpan={3}>Staff Name :{item.staff1_name}</td>
                    <td colSpan={10}>Staff Designation :{item.staff1_desg}</td>
                  </tr>

                  <tr>
                    <td colSpan={3}>Staff Name :{item.staff2_name}</td>
                    <td colSpan={10}>Staff Designation :{item.staff2_desg}</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>Staff Name :{item.staff3_name}</td>
                    <td colSpan={10}>Staff Designation :{item.staff3_desg}</td>
                  </tr>

                  <tr>
                    <td className=" " colSpan={13}>
                      <ActionButtons
                        item={item}
                        user={user}
                        slug={slug}
                        handleSave={handleSave}
                      />
                      {/* 
                                        {item.status === "0" || user.role === "Admin" ? (
                    <div className="d-flex gap-2 align-items-center">
                                                    <Link
                                                        to={`/edit/pm-logbook-half-yearly-tom-mainline`}
                                                        state={{ id: item.id }}
                                                        className="btn align-content-center"
                                                        style={{ width: "100px", height: "50px", textAlign: "center", backgroundColor: "#f4d03f", color: "black", fontSize: "20px" }}
                                                      >
                                                        Edit
                                                      </Link>
                                                      <button
                                                        type="submit"
                                                        onClick={() => {
                                                          handleSave(item.id);
                                                        }}
                                                        className="btn btn-primary"
                                                        style={{ width: "100px", height: "50px", textAlign: "center", fontSize: "18px" }}
                                                      >
                                                        Submit
                                                    </button>
                                                </div>
                                            ) : (
                                                ""
                                            )} */}
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default AfcPreventiveMaintenanceTable;
