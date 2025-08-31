import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addChecklist,
  fetchData,
  saveData,
} from "../../reducer/chanchal/Pm_logbook_half_yearly_other_mainline_Reducer";
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
const ChecklistList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  console.log(id);
  const tableRef = useRef(null);
  const [slug, setSlug] = useState(getLastParameter().trim())
  const { toPDF, targetRef } = usePDF({ filename: "ChecklistList.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const ChecklistList = useSelector((state) => state.checklist);
 
  const itmm = ChecklistList.data.data;
  // const user = { role: "Admin" }; // Mock user object

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
              to="/form/pm-logbook-half-yearly-other-mainline"
            >
              AFC PREVENTIVE MAINTENANCE CHECKLIST (HALF YEARLY) (ANNEXURE-B)
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3>
          {" "}
          AFC PREVENTIVE MAINTENANCE CHECKLIST (HALF YEARLY) (ANNEXURE-B)
        </h3>
        <span className="line-box"></span>

        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="Checklist_table"
            sheet="Checklist_table"
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
          {filteredItems?.toReversed().map((item, index) => {
            const val = item?.activities1;
            const value = item?.activities2;
            const values = item?.activities3;
            return (
              <>
                <table className="table" ref={tableRef}>
                  <thead>
                    <tr>
                      <th className="text-start" colSpan="3">
                        STN. NAME: {item?.stn_name}{" "}
                      </th>
                      <th className="text-start" colSpan="9">
                        DATE: {item?.date}{" "}
                      </th>
                      <th className="text-start" colSpan="1">
                        MONTH: {item?.month}{" "}
                      </th>
                    </tr>
                    <tr className="fw-bold">
                      <th rowSpan="1">Equipment</th>
                      <th rowSpan="1">Sr. No.</th>
                      <th rowSpan="1">Activity</th>
                      <th rowSpan="1">DESCRIPTION OF WORK</th>
                      <th rowSpan="1">SC</th>
                      <th rowSpan="1"> </th>
                      <th rowSpan="1"> </th>
                      <th rowSpan="1"> </th>
                      <th rowSpan="1"> </th>
                      <th rowSpan="1"> </th>
                      <th rowSpan="1">REMARKS/ DEFICIENCIES</th>
                      <th rowSpan="1">ACTION TAKEN</th>
                      <th rowSpan="1">WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        rowSpan={8}
                        style={{
                          writingMode: "vertical-lr",
                          textAlign: "center",
                        }}
                      >
                        SC (Ref:O&M/TELE-AFC/SOP/01)
                      </td>
                      <td>1</td>
                      <td rowSpan={3}>Visual Inspection</td>
                      <td className="text-start">
                        Check Fixing & Alignment of all modules of SC
                      </td>

                      <td>{val?.[0]?.SC1}</td>
                      <td>{val?.[0]?.SC2}</td>
                      <td>{val?.[0]?.SC3}</td>
                      <td>{val?.[0]?.SC4}</td>
                      <td>{val?.[0]?.SC5}</td>
                      <td>{val?.[0]?.SC6}</td>
                      <td>{val?.[0]?.remark}</td>
                      <td>{val?.[0]?.action}</td>
                      <td>{val?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>
                      <td>{val?.[1]?.SC1}</td>
                      <td>{val?.[1]?.SC2}</td>
                      <td>{val?.[1]?.SC3}</td>
                      <td>{val?.[1]?.SC4}</td>
                      <td>{val?.[1]?.SC5}</td>
                      <td>{val?.[1]?.SC6}</td>
                      <td>{val?.[1]?.remark}</td>
                      <td>{val?.[1]?.action}</td>
                      <td>{val?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">Check Date and Time</td>
                      <td>{val?.[2]?.SC1}</td>
                      <td>{val?.[2]?.SC2}</td>
                      <td>{val?.[2]?.SC3}</td>
                      <td>{val?.[2]?.SC4}</td>
                      <td>{val?.[2]?.SC5}</td>
                      <td>{val?.[2]?.SC6}</td>
                      <td>{val?.[2]?.remark}</td>
                      <td>{val?.[2]?.action}</td>
                      <td>{val?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td rowSpan={2}>Cleaning</td>
                      <td className="text-start">
                        Cleaning of SC Server (interior & exterior)
                      </td>
                      <td>{val?.[3]?.SC1}</td>
                      <td>{val?.[3]?.SC2}</td>
                      <td>{val?.[3]?.SC3}</td>
                      <td>{val?.[3]?.SC4}</td>
                      <td>{val?.[3]?.SC5}</td>
                      <td>{val?.[3]?.SC6}</td>
                      <td>{val?.[3]?.remark}</td>
                      <td>{val?.[3]?.action}</td>
                      <td>{val?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        Cleaning and checking of sub modules of SC ( Printer,
                        Keyboard and Mouse etc)
                      </td>
                      <td>{val?.[4]?.SC1}</td>
                      <td>{val?.[4]?.SC2}</td>
                      <td>{val?.[4]?.SC3}</td>
                      <td>{val?.[4]?.SC4}</td>
                      <td>{val?.[4]?.SC5}</td>
                      <td>{val?.[4]?.SC6}</td>
                      <td>{val?.[4]?.remark}</td>
                      <td>{val?.[4]?.action}</td>
                      <td>{val?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td rowSpan={3}>Module Test (Maintenanc e Menu)</td>
                      <td className="text-start">
                        Cleaning of SC HDD and check their proper fitment
                      </td>
                      <td>{val?.[5]?.SC1}</td>
                      <td>{val?.[5]?.SC2}</td>
                      <td>{val?.[5]?.SC3}</td>
                      <td>{val?.[5]?.SC4}</td>
                      <td>{val?.[5]?.SC5}</td>
                      <td>{val?.[5]?.SC6}</td>
                      <td>{val?.[5]?.remark}</td>
                      <td>{val?.[5]?.action}</td>
                      <td>{val?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start">
                        Test different modes in device manager by applying and
                        releasing on equipments
                      </td>
                      <td>{val?.[6]?.SC1}</td>
                      <td>{val?.[6]?.SC2}</td>
                      <td>{val?.[6]?.SC3}</td>
                      <td>{val?.[6]?.SC4}</td>
                      <td>{val?.[6]?.SC5}</td>
                      <td>{val?.[6]?.SC6}</td>
                      <td>{val?.[6]?.remark}</td>
                      <td>{val?.[6]?.action}</td>
                      <td>{val?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start">
                        Check working of redundant power supply of SC server
                      </td>
                      <td>{val?.[7]?.SC1}</td>
                      <td>{val?.[7]?.SC2}</td>
                      <td>{val?.[7]?.SC3}</td>
                      <td>{val?.[7]?.SC4}</td>
                      <td>{val?.[7]?.SC5}</td>
                      <td>{val?.[7]?.SC6}</td>
                      <td>{val?.[7]?.remark}</td>
                      <td>{val?.[7]?.action}</td>
                      <td>{val?.[7]?.deficiency}</td>
                    </tr>

                    <tr className="fw-bold">
                      <td>Equip ment.</td>
                      <td>Sr. No.</td>
                      <td>Activity</td>
                      <td>DESCRIPTION OF WORK</td>
                      <td>AVM</td>
                      <td>AVM</td>
                      <td>AVM</td>
                      <td>AVM</td>
                      <td>AVM</td>
                      <td>AVM</td>
                      <td>REMARKS/ DEFFICIENCIES</td>
                      <td>ACTION TAKEN</td>
                      <td>WHY DEFICIENCY COULD NOT BE RECTIFIE</td>
                    </tr>
                    <tr>
                      <td
                        rowSpan={9}
                        style={{
                          writingMode: "vertical-lr",
                          textAlign: "center",
                        }}
                      >
                        AVM (Ref:O&M/TELE-AFC/SOP/01)
                      </td>

                      <td>1</td>
                      <td rowSpan={6}>Visual Inspection</td>
                      <td className="text-start">
                        Check the serviceability of AVM
                      </td>
                      <td>{value?.[0]?.avm1}</td>
                      <td>{value?.[0]?.avm2}</td>
                      <td>{value?.[0]?.avm3}</td>
                      <td>{value?.[0]?.avm4}</td>
                      <td>{value?.[0]?.avm5}</td>
                      <td>{value?.[0]?.avm6}</td>
                      <td>{value?.[0]?.remarkavm}</td>
                      <td>{value?.[0]?.actionavm}</td>
                      <td>{value?.[0]?.deficiencyavm}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>
                      <td>{value?.[1]?.avm1}</td>
                      <td>{value?.[1]?.avm2}</td>
                      <td>{value?.[1]?.avm3}</td>
                      <td>{value?.[1]?.avm4}</td>
                      <td>{value?.[1]?.avm5}</td>
                      <td>{value?.[1]?.avm6}</td>
                      <td>{value?.[1]?.remarkavm}</td>
                      <td>{value?.[1]?.actionavm}</td>
                      <td>{value?.[1]?.deficiencyavm}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">Check Date and Time</td>
                      <td>{value?.[2]?.avm1}</td>
                      <td>{value?.[2]?.avm2}</td>
                      <td>{value?.[2]?.avm3}</td>
                      <td>{value?.[2]?.avm4}</td>
                      <td>{value?.[2]?.avm5}</td>
                      <td>{value?.[2]?.avm6}</td>
                      <td>{value?.[2]?.remarkavm}</td>
                      <td>{value?.[2]?.actionavm}</td>
                      <td>{value?.[2]?.deficiencyavm}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start">Check Station ID</td>
                      <td>{value?.[3]?.avm1}</td>
                      <td>{value?.[3]?.avm2}</td>
                      <td>{value?.[3]?.avm3}</td>
                      <td>{value?.[3]?.avm4}</td>
                      <td>{value?.[3]?.avm5}</td>
                      <td>{value?.[3]?.avm6}</td>
                      <td>{value?.[3]?.remarkavm}</td>
                      <td>{value?.[3]?.actionavm}</td>
                      <td>{value?.[3]?.deficiencyavm}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="text-start">Check Device ID</td>
                      <td>{value?.[4]?.avm1}</td>
                      <td>{value?.[4]?.avm2}</td>
                      <td>{value?.[4]?.avm3}</td>
                      <td>{value?.[4]?.avm4}</td>
                      <td>{value?.[4]?.avm5}</td>
                      <td>{value?.[4]?.avm6}</td>
                      <td>{value?.[4]?.remarkavm}</td>
                      <td>{value?.[4]?.actionavm}</td>
                      <td>{value?.[4]?.deficiencyavm}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start">
                        Check Lubrication of all locks with silicone oil
                      </td>
                      <td>{value?.[5]?.avm1}</td>
                      <td>{value?.[5]?.avm2}</td>
                      <td>{value?.[5]?.avm3}</td>
                      <td>{value?.[5]?.avm4}</td>
                      <td>{value?.[5]?.avm5}</td>
                      <td>{value?.[5]?.avm6}</td>
                      <td>{value?.[5]?.remarkavm}</td>
                      <td>{value?.[5]?.actionavm}</td>
                      <td>{value?.[5]?.deficiencyavm}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td rowSpan={3}>Module Test (Maintenanc e Menu)</td>
                      <td className="text-start">Card Reader Test</td>
                      <td>{value?.[6]?.avm1}</td>
                      <td>{value?.[6]?.avm2}</td>
                      <td>{value?.[6]?.avm3}</td>
                      <td>{value?.[6]?.avm4}</td>
                      <td>{value?.[6]?.avm5}</td>
                      <td>{value?.[6]?.avm6}</td>
                      <td>{value?.[6]?.remarkavm}</td>
                      <td>{value?.[6]?.actionavm}</td>
                      <td>{value?.[6]?.deficiencyavm}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start">
                        Passenger Information Display (PID) Test
                      </td>
                      <td>{value?.[7]?.avm1}</td>
                      <td>{value?.[7]?.avm2}</td>
                      <td>{value?.[7]?.avm3}</td>
                      <td>{value?.[7]?.avm4}</td>
                      <td>{value?.[7]?.avm5}</td>
                      <td>{value?.[7]?.avm6}</td>
                      <td>{value?.[7]?.remarkavm}</td>
                      <td>{value?.[7]?.actionavm}</td>
                      <td>{value?.[7]?.deficiencyavm}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="text-start">
                        Check LAN Status (Ping Server)
                      </td>
                      <td>{value?.[8]?.avm1}</td>
                      <td>{value?.[8]?.avm2}</td>
                      <td>{value?.[8]?.avm3}</td>
                      <td>{value?.[8]?.avm4}</td>
                      <td>{value?.[8]?.avm5}</td>
                      <td>{value?.[8]?.avm6}</td>
                      <td>{value?.[8]?.remarkavm}</td>
                      <td>{value?.[8]?.actionavm}</td>
                      <td>{value?.[8]?.deficiencyavm}</td>
                    </tr>
                    <tr className="fw-bold">
                      <td>Equip ment.</td>
                      <td>Sr. No.</td>
                      <td>Activity</td>
                      <td>DESCRIPTION OF WORK</td>
                      <td>Switch</td>
                      <td>Switch</td>
                      <td>Switch</td>
                      <td>Switch</td>
                      <td>Switch</td>
                      <td>Switch</td>
                      <td>REMARKS/ DEFFICIENCIES</td>
                      <td>ACTION TAKEN</td>
                      <td>WHY DEFICIENCY COULD NOT BE RECTIFIE</td>
                    </tr>
                    <tr>
                      <td
                        rowSpan={8}
                        style={{
                          writingMode: "vertical-lr",
                          textAlign: "center",
                        }}
                      >
                        NETWORK (Ref:O&M/TELE-AFC/SOP/01)
                      </td>
                      <td>1</td>
                      <td rowSpan={3}>Visual Inspection</td>
                      <td className="text-start">
                        Check Fixing & Alignment of all modules of Switch Rack
                      </td>
                      <td>{values?.[0]?.swt1}</td>
                      <td>{values?.[0]?.swt2}</td>
                      <td>{values?.[0]?.swt3}</td>
                      <td>{values?.[0]?.swt4}</td>
                      <td>{values?.[0]?.swt5}</td>
                      <td>{values?.[0]?.swt6}</td>
                      <td>{values?.[0]?.remarkswt}</td>
                      <td>{values?.[0]?.actionswt}</td>
                      <td>{values?.[0]?.deficiencyswt}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>
                      <td>{values?.[1]?.swt1}</td>
                      <td>{values?.[1]?.swt2}</td>
                      <td>{values?.[1]?.swt3}</td>
                      <td>{values?.[1]?.swt4}</td>
                      <td>{values?.[1]?.swt5}</td>
                      <td>{values?.[1]?.swt6}</td>
                      <td>{values?.[1]?.remarkswt}</td>
                      <td>{values?.[1]?.actionswt}</td>
                      <td>{values?.[1]?.deficiencyswt}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">
                        Check internal fan status of Switches
                      </td>
                      <td>{values?.[2]?.swt1}</td>
                      <td>{values?.[2]?.swt2}</td>
                      <td>{values?.[2]?.swt3}</td>
                      <td>{values?.[2]?.swt4}</td>
                      <td>{values?.[2]?.swt5}</td>
                      <td>{values?.[2]?.swt6}</td>
                      <td>{values?.[2]?.remarkswt}</td>
                      <td>{values?.[2]?.actionswt}</td>
                      <td>{values?.[2]?.deficiencyswt}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td rowSpan={3}>Cleaning</td>
                      <td className="text-start">
                        Cleaning of Switch Rack and its fan
                      </td>
                      <td>{values?.[3]?.swt1}</td>
                      <td>{values?.[3]?.swt2}</td>
                      <td>{values?.[3]?.swt3}</td>
                      <td>{values?.[3]?.swt4}</td>
                      <td>{values?.[3]?.swt5}</td>
                      <td>{values?.[3]?.swt6}</td>
                      <td>{values?.[3]?.remarkswt}</td>
                      <td>{values?.[3]?.actionswt}</td>
                      <td>{values?.[3]?.deficiencyswt}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        Internal cleaning of L3 switch
                      </td>
                      <td>{values?.[4]?.swt1}</td>
                      <td>{values?.[4]?.swt2}</td>
                      <td>{values?.[4]?.swt3}</td>
                      <td>{values?.[4]?.swt4}</td>
                      <td>{values?.[4]?.swt5}</td>
                      <td>{values?.[4]?.swt6}</td>
                      <td>{values?.[4]?.remarkswt}</td>
                      <td>{values?.[4]?.actionswt}</td>
                      <td>{values?.[4]?.deficiencyswt}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start">
                        External cleaning of Switch
                      </td>
                      <td>{values?.[5]?.swt1}</td>
                      <td>{values?.[5]?.swt2}</td>
                      <td>{values?.[5]?.swt3}</td>
                      <td>{values?.[5]?.swt4}</td>
                      <td>{values?.[5]?.swt5}</td>
                      <td>{values?.[5]?.swt6}</td>
                      <td>{values?.[5]?.remarkswt}</td>
                      <td>{values?.[5]?.actionswt}</td>
                      <td>{values?.[5]?.deficiencyswt}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td rowSpan={2}>Module Test</td>
                      <td className="text-start">Test of redundant link</td>
                      <td>{values?.[6]?.swt1}</td>
                      <td>{values?.[6]?.swt2}</td>
                      <td>{values?.[6]?.swt3}</td>
                      <td>{values?.[6]?.swt4}</td>
                      <td>{values?.[6]?.swt5}</td>
                      <td>{values?.[6]?.swt6}</td>
                      <td>{values?.[6]?.remarkswt}</td>
                      <td>{values?.[6]?.actionswt}</td>
                      <td>{values?.[6]?.deficiencyswt}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start">
                        Check if Switches are working normal and all equipments
                        are on LAN
                      </td>
                      <td>{values?.[7]?.swt1}</td>
                      <td>{values?.[7]?.swt2}</td>
                      <td>{values?.[7]?.swt3}</td>
                      <td>{values?.[7]?.swt4}</td>
                      <td>{values?.[7]?.swt5}</td>
                      <td>{values?.[7]?.swt6}</td>
                      <td>{values?.[7]?.remarkswt}</td>
                      <td>{values?.[7]?.actionswt}</td>
                      <td>{values?.[7]?.deficiencyswt}</td>
                    </tr>

                    <tr className="fw-bold ">
                      <td rowSpan={4} colSpan={3}>
                        {" "}
                        Staff on Duty{" "}
                      </td>
                      <td className="text-start"> Staff Name </td>
                      <td className="text-start" colSpan={5}>
                        {" "}
                        Desgination{" "}
                      </td>
                      {/* <td className="text-start" colSpan={5}>
                        {" "}
                        Signature{" "}
                      </td> */}
                    </tr>
                    <tr>
                      <td>{item?.staff1_name}</td>
                      <td colSpan={5}>{item?.staff1_desg}</td>
                      {/* <td colSpan={5}>{item?.staff1_sign}</td> */}
                    </tr>
                    <tr>
                      <td>{item?.staff2_name}</td>
                      <td colSpan={5}>{item?.staff2_desg}</td>
                      {/* <td colSpan={5}>{item?.staff2_sign}</td> */}
                    </tr>
                    <tr>
                      <td>{item?.staff3_name}</td>
                      <td colSpan={5}>{item?.staff3_desg}</td>
                      {/* <td colSpan={5}>{item?.staff3_sign}</td> */}
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

export default ChecklistList;
