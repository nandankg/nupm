import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addPreMainWork,
  fetchData,
  saveData,
} from "../../reducer/chanchal/PreMainWorkReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaFilePdf } from "react-icons/fa6";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const PreMainWorkList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "PreMainWorkList.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const dispatch = useDispatch();
  const PreMainWorkList = useSelector((state) => state.preMainWork);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const itmm = PreMainWorkList.data.data;
  // console.log(slug);
  console.log(PreMainWorkList.data.data);
  // console.log(items);
  // const user = { role: "Admin" }; // Mock user object

  useEffect(() => {
    dispatch(fetchData());
    setSlug(PreMainWorkList.slug);
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
            <Link
              underline="hover"
              color="inherit"
              to="/form/pm-logbook-yearly1-sdc"
            >
              PREVENTIVE MAINTENACE WORKSHEET OF CENTRAL COMPUTER (YEARLY)
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="PreMainWork_table"
            sheet="PreMainWork_table"
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
        <div ref={targetRef}>
          <h3>
            PREVENTIVE MAINTENACE WORKSHEET OF CENTRAL COMPUTER (YEARLY) List
          </h3>
          <span className="line-box"></span>

          {filteredItems?.toReversed().map((item, index) => {
            const value = item?.activities;
            return (
              <>
                <table className="table" ref={tableRef}>
                  <thead>
                    <tr>
                      <th className="text-start" colSpan="6">
                        {" "}
                      </th>
                      <th className="text-start" colSpan="3">
                        Annexure : C
                      </th>
                    </tr>
                    <tr>
                      <th className="text-start" colSpan="2">
                        FREQUENCY
                      </th>
                      <th className="text-center" colSpan="4">
                        YEARLY
                      </th>
                      <th className="text-start" colSpan="3">
                        DOCUMENT: O&M/AFC/OCC/SDC/CH03
                      </th>
                    </tr>
                    <tr>
                      <th className="text-start" colSpan="2">
                        DATE: {item?.date}
                      </th>
                      <th className="text-start" colSpan="4"></th>
                      <th className="text-start" colSpan="3">
                        Ref:O&M/TELE-AFC/SOP/02
                      </th>
                    </tr>
                    <tr>
                      <th>Sr. No. </th>
                      <th>Network Rack </th>
                      <th>DESCRIPTION OF WORK </th>
                      <th>CC Server Rack </th>
                      <th>Network Rack </th>
                      <th> CCHS Server & Network Rack</th>
                      <th>REMARKS/ DEFFICIENCIES </th>
                      <th>ACTION TAKEN </th>
                      <th>WHY DEFICIENCY COULD NOT BE RECTIFIED </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold">1</td>
                      <td className="fw-bold" rowSpan={14}>
                        Visual Inspection
                      </td>
                      <td className="text-start fw-bold">
                        Checking of all Cable connection and dressing
                      </td>
                      <td>{value?.[0]?.CCServerRack}</td>
                      <td>{value?.[0]?.NetworkRack}</td>
                      <td>{value?.[0]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[0]?.remark}</td>
                      <td>{value?.[0]?.action}</td>
                      <td>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">2</td>
                      <td className="text-start fw-bold">
                        Checking of physical condition of all cable (specially
                        forRodent cut)
                      </td>
                      <td>{value?.[1]?.CCServerRack}</td>
                      <td>{value?.[1]?.NetworkRack}</td>
                      <td>{value?.[1]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td>{value?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">3</td>
                      <td className="text-start fw-bold">
                        Checking of any opening inside rack
                      </td>
                      <td>{value?.[2]?.CCServerRack}</td>
                      <td>{value?.[2]?.NetworkRack}</td>
                      <td>{value?.[2]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">4</td>
                      <td className="text-start fw-bold">
                        Checking of Fan status of Racks and Equipments
                      </td>
                      <td>{value?.[3]?.CCServerRack}</td>
                      <td>{value?.[3]?.NetworkRack}</td>
                      <td>{value?.[3]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td>{value?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">5</td>
                      <td className="text-start fw-bold">
                        Checking of power indication of Rack
                      </td>
                      <td>{value?.[4]?.CCServerRack}</td>
                      <td>{value?.[4]?.NetworkRack}</td>
                      <td>{value?.[4]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">6</td>
                      <td className="text-start fw-bold">
                        Checking of status of KMS
                      </td>
                      <td>{value?.[5]?.CCServerRack}</td>
                      <td>{value?.[5]?.NetworkRack}</td>
                      <td>{value?.[5]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">7</td>
                      <td className="text-start fw-bold">
                        Checking of LED indication of all the 20 drive of Main
                        storage
                      </td>
                      <td>{value?.[6]?.CCServerRack}</td>
                      <td>{value?.[6]?.NetworkRack}</td>
                      <td>{value?.[6]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[6]?.remark}</td>
                      <td>{value?.[6]?.action}</td>
                      <td>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">8</td>
                      <td className="text-start fw-bold">
                        Checking of LED indication of all the 10 drive of Backup
                        storage
                      </td>
                      <td>{value?.[7]?.CCServerRack}</td>
                      <td>{value?.[7]?.NetworkRack}</td>
                      <td>{value?.[7]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">9</td>
                      <td className="text-start fw-bold">
                        Checking of health Status of all the server inside Rack
                      </td>
                      <td>{value?.[8]?.CCServerRack}</td>
                      <td>{value?.[8]?.NetworkRack}</td>
                      <td>{value?.[8]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[8]?.remark}</td>
                      <td>{value?.[8]?.action}</td>
                      <td>{value?.[8]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">10</td>
                      <td className="text-start fw-bold">
                        Checking of health Status of all the Networking
                        equipment inside rack
                      </td>
                      <td>{value?.[9]?.CCServerRack}</td>
                      <td>{value?.[9]?.NetworkRack}</td>
                      <td>{value?.[9]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[9]?.remark}</td>
                      <td>{value?.[9]?.action}</td>
                      <td>{value?.[9]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">11</td>
                      <td className="text-start fw-bold">
                        Checking of health Status of the Tape Library
                      </td>
                      <td>{value?.[10]?.CCServerRack}</td>
                      <td>{value?.[10]?.NetworkRack}</td>
                      <td>{value?.[10]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">12</td>
                      <td className="text-start fw-bold">
                        Checking and ensuring that no excessive heat accumulated
                        inside rack
                      </td>
                      <td>{value?.[11]?.CCServerRack}</td>
                      <td>{value?.[11]?.NetworkRack}</td>
                      <td>{value?.[11]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[11]?.remark}</td>
                      <td>{value?.[11]?.action}</td>
                      <td>{value?.[11]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">13</td>
                      <td className="text-start fw-bold">
                        Checking of LED indication of NTP servers
                      </td>
                      <td>{value?.[12]?.CCServerRack}</td>
                      <td>{value?.[12]?.NetworkRack}</td>
                      <td>{value?.[12]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[12]?.remark}</td>
                      <td>{value?.[12]?.action}</td>
                      <td>{value?.[12]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">14</td>
                      <td className="text-start fw-bold">
                        Checking of health Status of all the Networking
                        equipment inside CER rack
                      </td>
                      <td>{value?.[13]?.CCServerRack}</td>
                      <td>{value?.[13]?.NetworkRack}</td>
                      <td>{value?.[13]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[13]?.remark}</td>
                      <td>{value?.[13]?.action}</td>
                      <td>{value?.[13]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">15</td>
                      <td className="fw-bold" rowSpan={7}>
                        Cleaning
                      </td>
                      <td className="text-start fw-bold">Cleaning of Rack</td>
                      <td>{value?.[14]?.CCServerRack}</td>
                      <td>{value?.[14]?.NetworkRack}</td>
                      <td>{value?.[14]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[14]?.remark}</td>
                      <td>{value?.[14]?.action}</td>
                      <td>{value?.[14]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">16</td>
                      <td className="text-start fw-bold">
                        Exterior cleaning of equipments in the rack
                      </td>
                      <td>{value?.[15]?.CCServerRack}</td>
                      <td>{value?.[15]?.NetworkRack}</td>
                      <td>{value?.[15]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[15]?.remark}</td>
                      <td>{value?.[15]?.action}</td>
                      <td>{value?.[15]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">17</td>
                      <td className="text-start fw-bold">
                        Internal cleaning of CC servers
                      </td>
                      <td>{value?.[16]?.CCServerRack}</td>
                      <td>{value?.[16]?.NetworkRack}</td>
                      <td>{value?.[16]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[16]?.remark}</td>
                      <td>{value?.[16]?.action}</td>
                      <td>{value?.[16]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">18</td>
                      <td className="text-start fw-bold">
                        Internal cleaning of CC Storage devices and Tape Library
                        including tapes.
                      </td>
                      <td>{value?.[17]?.CCServerRack}</td>
                      <td>{value?.[17]?.NetworkRack}</td>
                      <td>{value?.[17]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[17]?.remark}</td>
                      <td>{value?.[17]?.action}</td>
                      <td>{value?.[17]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">19</td>
                      <td className="text-start fw-bold">
                        Internal cleaning of CC networking equipments.
                      </td>
                      <td>{value?.[18]?.CCServerRack}</td>
                      <td>{value?.[18]?.NetworkRack}</td>
                      <td>{value?.[18]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[18]?.remark}</td>
                      <td>{value?.[18]?.action}</td>
                      <td>{value?.[18]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">20</td>
                      <td className="text-start fw-bold">
                        Internal cleaning of Firewall{" "}
                      </td>
                      <td>{value?.[19]?.CCServerRack}</td>
                      <td>{value?.[19]?.NetworkRack}</td>
                      <td>{value?.[19]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[19]?.remark}</td>
                      <td>{value?.[19]?.action}</td>
                      <td>{value?.[19]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">21</td>
                      <td className="text-start fw-bold">
                        Internal cleaning of L2 switch and LIU in CER
                      </td>
                      <td>{value?.[20]?.CCServerRack}</td>
                      <td>{value?.[20]?.NetworkRack}</td>
                      <td>{value?.[20]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[20]?.remark}</td>
                      <td>{value?.[20]?.action}</td>
                      <td>{value?.[20]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">22</td>
                      <td className="fw-bold" rowSpan={8}>
                        Module Test (Maintenace Menu){" "}
                      </td>
                      <td className="text-start fw-bold">
                        Check Voltage between neutral & earth in the rack
                      </td>
                      <td>{value?.[21]?.CCServerRack}</td>
                      <td>{value?.[21]?.NetworkRack}</td>
                      <td>{value?.[21]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[21]?.remark}</td>
                      <td>{value?.[21]?.action}</td>
                      <td>{value?.[21]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">23</td>
                      <td className="text-start fw-bold">
                        Checking of the storage (Fare On DB, AVW DB)
                      </td>
                      <td>{value?.[22]?.CCServerRack}</td>
                      <td>{value?.[22]?.NetworkRack}</td>
                      <td>{value?.[22]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[22]?.remark}</td>
                      <td>{value?.[22]?.action}</td>
                      <td>{value?.[22]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">24</td>
                      <td className="text-start fw-bold">
                        Check Patch updates of servers
                      </td>
                      <td>{value?.[23]?.CCServerRack}</td>
                      <td>{value?.[23]?.NetworkRack}</td>
                      <td>{value?.[23]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[23]?.remark}</td>
                      <td>{value?.[23]?.action}</td>
                      <td>{value?.[23]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">25</td>
                      <td className="text-start fw-bold">
                        Check Firmware of firewall
                      </td>
                      <td>{value?.[24]?.CCServerRack}</td>
                      <td>{value?.[24]?.NetworkRack}</td>
                      <td>{value?.[24]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[24]?.remark}</td>
                      <td>{value?.[24]?.action}</td>
                      <td>{value?.[24]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">26</td>
                      <td className="text-start fw-bold">
                        Check LAN status of all the equipments in the rack
                      </td>
                      <td>{value?.[25]?.CCServerRack}</td>
                      <td>{value?.[25]?.NetworkRack}</td>
                      <td>{value?.[25]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[25]?.remark}</td>
                      <td>{value?.[25]?.action}</td>
                      <td>{value?.[25]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">27</td>
                      <td className="text-start fw-bold">
                        Checking of room temperature
                      </td>
                      <td>{value?.[26]?.CCServerRack}</td>
                      <td>{value?.[26]?.NetworkRack}</td>
                      <td>{value?.[26]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[26]?.remark}</td>
                      <td>{value?.[26]?.action}</td>
                      <td>{value?.[26]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">28</td>
                      <td className="text-start fw-bold">
                        Check all the services of the server
                      </td>
                      <td>{value?.[27]?.CCServerRack}</td>
                      <td>{value?.[27]?.NetworkRack}</td>
                      <td>{value?.[27]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[27]?.remark}</td>
                      <td>{value?.[27]?.action}</td>
                      <td>{value?.[27]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">29</td>
                      <td className="text-start fw-bold">
                        Check if Add Value Website is working
                      </td>
                      <td>{value?.[28]?.CCServerRack}</td>
                      <td>{value?.[28]?.NetworkRack}</td>
                      <td>{value?.[28]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[28]?.remark}</td>
                      <td>{value?.[28]?.action}</td>
                      <td>{value?.[28]?.deficiency}</td>
                    </tr>

                    <tr className="fw-bold">
                      <td rowSpan={4} colSpan={2}>
                        Staff on Duty
                      </td>
                      <td className="text-start" colSpan={2}>
                        Name
                      </td>
                      <td className="text-start" colSpan={2}>
                        Desgination
                      </td>
                      <td className="text-start" colSpan={3}>
                        Employee No.
                      </td>
                      {/* <td className="text-start" colSpan={1}>
                        {" "}
                        Sign
                      </td> */}
                    </tr>
                    <tr>
                      <td colSpan={2}>{item.staff1_name}</td>
                      <td colSpan={2}>{item.staff1_desg}</td>
                      <td colSpan={3}>{item.staff1_employee}</td>
                      {/* <td colSpan={1}>{item.staff1_sign}</td> */}
                    </tr>
                    <tr>
                      <td colSpan={2}>{item.staff2_name}</td>
                      <td colSpan={2}>{item.staff2_desg}</td>
                      <td colSpan={3}>{item.staff2_employee}</td>
                      {/* <td colSpan={1}>{item.staff2_sign}</td> */}
                    </tr>
                    <tr>
                      <td colSpan={2}>{item.staff3_name}</td>
                      <td colSpan={2}>{item.staff3_desg}</td>
                      <td colSpan={3}>{item.staff3_employee}</td>
                      {/* <td colSpan={1}>{item.staff3_sign}</td> */}
                    </tr>
                  </tbody>
                </table>

                <td className=" mb-3">
                  {item.status === "0" || user.role === "Admin" ? (
                    <div>
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        className="btn btn-primary"
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

export default PreMainWorkList;
