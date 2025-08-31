import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import {
  addLogbook,
  fetchData,
  saveData,
} from "../../reducer/satya/PMLogBookTVMReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";

const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);

const PMLogBookList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "PREVENTIVE MAINTENACE WORKSHEET OF TVM, RCTM & AVM ( HALF YEARLY).pdf"});
  const pmlogbook = useSelector((state) => state.book);
  const [slug, setSlug] = useState("");

  const itmm = pmlogbook.data.data;

  useEffect(() => {
    dispatch(fetchData());
    setSlug(pmlogbook.slug);
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
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Preventive Maintenance Worksheet
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3>
          {" "}
          PREVENTIVE MAINTENACE WORKSHEET OF TVM, RCTM & AVM ( HALF YEARLY)
        </h3>
        <span className="line-box"></span>
        
        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="PREVENTIVE MAINTENACE"
            sheet="PM WORKSHEET OF TVM, RCTM & AVM HY"
            currentTableRef={tableRef.current}
          >
            <button className="btn " style={{ border: "1px solid #0baa9a " }}>
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

        <div ref={targetRef}>
          {filteredItems?.toReversed().map((item, index) => {
            const value = item?.activities;
            return (
              <div key={item.id}>
                <table ref={tableRef}>
                  <thead>
                    <tr>
                      <th className="text-start" colspan="2">
                        FREQUENCY: HALF YEARLY
                      </th>
                      <th className="text-start" colspan="5">
                        Station: {item?.station}
                      </th>
                      <th className="text-start" colspan="2">
                        Annexure: B
                      </th>
                    </tr>
                    <tr>
                      <th className="text-start" colspan="2">
                        DATE: {item?.date}
                      </th>
                      <th className="text-start" colspan={2}>
                        Emp. ID: {item?.user_id}
                      </th>
                      <th className="text-start" colspan={3}>
                        Department: {item?.department}
                      </th>
                      <th className="text-start" colspan="2">
                        DOCUMENT: O&M/AFC/OCC/SDC/CH02
                      </th>
                    </tr>
                    <tr>
                      <th colspan={2}></th>
                      <th colspan={5}></th>
                      <th className="text-start" colspan="2">
                        Ref:O&M/TELE-AFC/SOP/02
                      </th>
                    </tr>
                    <tr>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th rowspan="2">TPNR TVM</th>
                      <th rowspan="2">MWYA RCTM</th>
                      <th rowspan="2">TPNR AVM</th>
                      <th rowspan="2">REMARKS/DEFICIENCIES</th>
                      <th rowspan="2">ACTION TAKEN</th>
                      <th rowspan="2">WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      
                      <td rowSpan="9">Visual Inspection</td>
                      <td className="text-start">
                        Fixing & Alignment of all modules of TVM/RCTM
                      </td>

                      <td>{value?.[0]?.TPNR1}</td>
                      <td>{value?.[0]?.TPNR2}</td>
                      <td>{value?.[0]?.TPNR3}</td>
                      <td>{value?.[0]?.remark}</td>
                      <td>{value?.[0]?.action}</td>
                      <td>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                     
                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>
                      <td>{value?.[1]?.TPNR1}</td>
                      <td>{value?.[1]?.TPNR2}</td>
                      <td>{value?.[1]?.TPNR3}</td>
                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td>{value?.[1]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td className="text-start">
                        Checking Silicon sealing of TVM/RCTM Cabinet
                      </td>
                      <td>{value?.[2]?.TPNR1}</td>
                      <td>{value?.[2]?.TPNR2}</td>
                      <td>{value?.[2]?.TPNR3}</td>
                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td>{value?.[2]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>4</td>
                      <td className="text-start">
                        Checking of any opening inside TVM/RCTM cabinet
                      </td>
                      <td>{value?.[3]?.TPNR1}</td>
                      <td>{value?.[3]?.TPNR2}</td>
                      <td>{value?.[3]?.TPNR3}</td>
                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td>{value?.[3]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        Checking of Power Supply and Battery
                      </td>
                      <td>{value?.[4]?.TPNR1}</td>
                      <td>{value?.[4]?.TPNR2}</td>
                      <td>{value?.[4]?.TPNR3}</td>
                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td>{value?.[4]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>6</td>
                      <td className="text-start">
                        Check Lubrication of all locks with silicone oil
                      </td>
                      <td>{value?.[5]?.TPNR1}</td>
                      <td>{value?.[5]?.TPNR2}</td>
                      <td>{value?.[5]?.TPNR3}</td>
                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td>{value?.[5]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>7</td>
                      <td className="text-start">Check Station ID</td>
                      <td>{value?.[6]?.TPNR1}</td>
                      <td>{value?.[6]?.TPNR2}</td>
                      <td>{value?.[6]?.TPNR3}</td>
                      <td>{value?.[6]?.remark}</td>
                      <td>{value?.[6]?.action}</td>
                      <td>{value?.[6]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>8</td>
                      <td className="text-start">Check Device ID</td>
                      <td>{value?.[7]?.TPNR1}</td>
                      <td>{value?.[7]?.TPNR2}</td>
                      <td>{value?.[7]?.TPNR3}</td>
                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td>{value?.[7]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>9</td>
                      <td className="text-start">Check Date and Time</td>
                      <td>{value?.[8]?.TPNR1}</td>
                      <td>{value?.[8]?.TPNR2}</td>
                      <td>{value?.[8]?.TPNR3}</td>
                      <td>{value?.[8]?.remark}</td>
                      <td>{value?.[8]?.action}</td>
                      <td>{value?.[8]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>10</td>
                      <td rowSpan={10}>Cleaning</td>
                      <td className="text-start">
                        Cleaning of all modules of TVM/RCTM
                      </td>
                      <td>{value?.[9]?.TPNR1}</td>
                      <td>{value?.[9]?.TPNR2}</td>
                      <td>{value?.[9]?.TPNR3}</td>
                      <td>{value?.[9]?.remark}</td>
                      <td>{value?.[9]?.action}</td>
                      <td>{value?.[9]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>11</td>
                      <td className="text-start">
                        Cleaning of lexan covering board of display
                      </td>
                      <td>{value?.[10]?.TPNR1}</td>
                      <td>{value?.[10]?.TPNR2}</td>
                      <td>{value?.[10]?.TPNR3}</td>
                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>12</td>
                      <td className="text-start">
                        Cleaning of Coin hopper opto sensor of TVM
                      </td>
                      <td>{value?.[11]?.TPNR1}</td>
                      <td>{value?.[11]?.TPNR2}</td>
                      <td>{value?.[11]?.TPNR3}</td>
                      <td>{value?.[11]?.remark}</td>
                      <td>{value?.[11]?.action}</td>
                      <td>{value?.[11]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>13</td>
                      <td className="text-start">Cleaning of Cooling fans</td>
                      <td>{value?.[12]?.TPNR1}</td>
                      <td>{value?.[12]?.TPNR2}</td>
                      <td>{value?.[12]?.TPNR3}</td>
                      <td>{value?.[12]?.remark}</td>
                      <td>{value?.[12]?.action}</td>
                      <td>{value?.[12]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>14</td>
                      <td className="text-start">
                        Checking and Cleaning of Cooling fan filter
                      </td>
                      <td>{value?.[13]?.TPNR1}</td>
                      <td>{value?.[13]?.TPNR2}</td>
                      <td>{value?.[13]?.TPNR3}</td>
                      <td>{value?.[13]?.remark}</td>
                      <td>{value?.[13]?.action}</td>
                      <td>{value?.[13]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>15</td>
                      <td className="text-start">Cleaning of BNR/BNA</td>
                      <td>{value?.[14]?.TPNR1}</td>
                      <td>{value?.[14]?.TPNR2}</td>
                      <td>{value?.[14]?.TPNR3}</td>
                      <td>{value?.[14]?.remark}</td>
                      <td>{value?.[14]?.action}</td>
                      <td>{value?.[14]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>16</td>
                      <td className="text-start">
                        Cleaning of Printer and printer heating head
                      </td>
                      <td>{value?.[15]?.TPNR1}</td>
                      <td>{value?.[15]?.TPNR2}</td>
                      <td>{value?.[15]?.TPNR3}</td>
                      <td>{value?.[15]?.remark}</td>
                      <td>{value?.[15]?.action}</td>
                      <td>{value?.[15]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>17</td>
                      <td className="text-start">
                        Cleaning of Bank card reader
                      </td>
                      <td>{value?.[16]?.TPNR1}</td>
                      <td>{value?.[16]?.TPNR2}</td>
                      <td>{value?.[16]?.TPNR3}</td>
                      <td>{value?.[16]?.remark}</td>
                      <td>{value?.[16]?.action}</td>
                      <td>{value?.[16]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>18</td>
                      <td className="text-start">Cleaning of Display</td>
                      <td>{value?.[17]?.TPNR1}</td>
                      <td>{value?.[17]?.TPNR2}</td>
                      <td>{value?.[17]?.TPNR3}</td>
                      <td>{value?.[17]?.remark}</td>
                      <td>{value?.[17]?.action}</td>
                      <td>{value?.[17]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>19</td>
                      <td className="text-start">
                        Cleaning of Token hopper of TVM
                      </td>
                      <td>{value?.[18]?.TPNR1}</td>
                      <td>{value?.[18]?.TPNR2}</td>
                      <td>{value?.[18]?.TPNR3}</td>
                      <td>{value?.[18]?.remark}</td>
                      <td>{value?.[18]?.action}</td>
                      <td>{value?.[18]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>20</td>
                      <td rowSpan={9}>Module Test (Maintenance Menu)</td>
                      <td className="text-start">Check LAN Status</td>
                      <td>{value?.[19]?.TPNR1}</td>
                      <td>{value?.[19]?.TPNR2}</td>
                      <td>{value?.[19]?.TPNR3}</td>
                      <td>{value?.[19]?.remark}</td>
                      <td>{value?.[19]?.action}</td>
                      <td>{value?.[19]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>21</td>
                      <td className="text-start">BNA/BNR Module Test</td>
                      <td>{value?.[20]?.TPNR1}</td>
                      <td>{value?.[20]?.TPNR2}</td>
                      <td>{value?.[20]?.TPNR3}</td>
                      <td>{value?.[20]?.remark}</td>
                      <td>{value?.[20]?.action}</td>
                      <td>{value?.[20]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>22</td>
                      <td className="text-start">Coin Dispenser Test</td>
                      <td>{value?.[21]?.TPNR1}</td>
                      <td>{value?.[21]?.TPNR2}</td>
                      <td>{value?.[21]?.TPNR3}</td>
                      <td>{value?.[21]?.remark}</td>
                      <td>{value?.[21]?.action}</td>
                      <td>{value?.[21]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>23</td>
                      <td className="text-start">Token Dispenser Test</td>
                      <td>{value?.[22]?.TPNR1}</td>
                      <td>{value?.[22]?.TPNR2}</td>
                      <td>{value?.[22]?.TPNR3}</td>
                      <td>{value?.[22]?.remark}</td>
                      <td>{value?.[22]?.action}</td>
                      <td>{value?.[22]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>24</td>
                      <td className="text-start">Card Reader Test</td>
                      <td>{value?.[23]?.TPNR1}</td>
                      <td>{value?.[23]?.TPNR2}</td>
                      <td>{value?.[23]?.TPNR3}</td>
                      <td>{value?.[23]?.remark}</td>
                      <td>{value?.[23]?.action}</td>
                      <td>{value?.[23]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>25</td>
                      <td className="text-start">LCD Test</td>
                      <td>{value?.[24]?.TPNR1}</td>
                      <td>{value?.[24]?.TPNR2}</td>
                      <td>{value?.[24]?.TPNR3}</td>
                      <td>{value?.[24]?.remark}</td>
                      <td>{value?.[24]?.action}</td>
                      <td>{value?.[24]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>26</td>
                      <td className="text-start">PID Test</td>
                      <td>{value?.[25]?.TPNR1}</td>
                      <td>{value?.[25]?.TPNR2}</td>
                      <td>{value?.[25]?.TPNR3}</td>
                      <td>{value?.[25]?.remark}</td>
                      <td>{value?.[25]?.action}</td>
                      <td>{value?.[25]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>27</td>
                      <td className="text-start">Printer Test /Test Print</td>
                      <td>{value?.[26]?.TPNR1}</td>
                      <td>{value?.[26]?.TPNR2}</td>
                      <td>{value?.[26]?.TPNR3}</td>
                      <td>{value?.[26]?.remark}</td>
                      <td>{value?.[26]?.action}</td>
                      <td>{value?.[26]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>28</td>
                      <td className="text-start">Audio Test</td>
                      <td>{value?.[27]?.TPNR1}</td>
                      <td>{value?.[27]?.TPNR2}</td>
                      <td>{value?.[27]?.TPNR3}</td>
                      <td>{value?.[27]?.remark}</td>
                      <td>{value?.[27]?.action}</td>
                      <td>{value?.[27]?.deficiency}</td>
                    </tr>
                    <tr>
                      <th rowSpan={4} colspan={3}>
                        Staff on Duty
                      </th>
                      <th className="text-start" colspan={3}>
                        Name
                      </th>
                      <th className="text-start" colspan={2}>
                        Designation
                      </th>
                      <th className="text-start" colspan={1}>
                        Employee No.
                      </th>
                    </tr>
                    <tr>
                      <td colspan={3}>{item.staff1_name}</td>
                      <td colspan={2}>{item.staff1_desg}</td>
                      <td colspan={1}>{item.staff1_employee}</td>
                    </tr>
                    <tr>
                      <td colspan={3}>{item.staff2_name}</td>
                      <td colspan={2}>{item.staff2_desg}</td>
                      <td colspan={1}>{item.staff2_employee}</td>
                    </tr>
                    <tr>
                      <td colspan={3}>{item.staff3_name}</td>
                      <td colspan={2}>{item.staff3_desg}</td>
                      <td colspan={1}>{item.staff3_employee}</td>
                    </tr>
                  </tbody>
                </table>
                <td className=" " colSpan={13}>
                  {item.status === "0" && user.role == "Admin"? (
                    <div className="d-flex gap-2 align-items-center">
                      <Link
                        to={`/edit/pm-logbook-tvm-half-yearly-sdc`}
                        state={{ id: item.id }}
                        className="btn align-content-center"
                        style={{width:"100px", height: "50px", textAlign: "center", backgroundColor:"#FF7900 ", color: "white", fontSize: "20px"}}
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(id);
                        }}
                        className="btn btn-primary"
                        style={{width:"100px", height: "50px", textAlign: "center", fontSize: "18px"}}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PMLogBookList;
