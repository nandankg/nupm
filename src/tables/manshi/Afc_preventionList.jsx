import { FaFilter, FaCheck, FaTimes } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
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
} from "../../reducer/manshi/Afc_preventionReducer";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const Afc_preventionList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "AfcPreventive(TVM).pdf" });
  

  const dispatch = useDispatch();
  const addafc = useSelector((state) => state.afc);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const itmm = addafc.data.data;
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
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 1000)
    
  };

  
  

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              AFC PREVENTIVE MAINTENANCE
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> AFC PREVENTIVE MAINTENANCE CHECKLIST (Monthly) </h3>
        <span className="line-box"></span>

        <div className="d-flex gap-3">
          <Link to="">
            {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
          </Link>
          <DownloadTableExcel
            filename="AfcPreventive(TVM)"
            sheet="AfcPreventive(TVM)"
            currentTableRef={targetRef.current}
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
            const value = item?.activities;
            return (
              <>
                <table className="table" ref={tableRef}>
                  <thead>
                    <tr>
                      <th colSpan="45">
                        AFC PREVENTIVE MAINTENANCE CHECKLIST (Monthly)
                      </th>
                    </tr>
                    <tr>
                      <th className="text-start" colspan="8">
                        Station Name: {item?.station}{" "}
                      </th>
                     
                      <th className="text-start" colspan="12">
                        FREQUENCY:Monthly
                      </th>
                      <th className="text-start" colspan="8">
                        Month:{item?.month}
                      </th>
                      <th className="text-start" colspan="11">
                        DATE: {item?.date}
                      </th>
                     
                    </tr>
                    <tr>
                      <th colSpan={3}>Equipment</th>
                      <th colSpan={1}>Sr. No.</th>
                      <th colSpan={3}>Activity</th>
                      <th colSpan={10}>DESCRIPTION OF WORK</th>
                      <th colSpan={2}>TVM</th>
                      <th colSpan={2}>TVM</th>
                      <th colSpan={2}>TVM</th>
                      <th colSpan={2}>TVM</th>
                      <th colSpan={2}>TVM</th>
                      <th colspan={5}>REMARKS/ DEFICIENCIES</th>
                      <th colspan={5}>ACTION TAKEN</th>
                      <th colspan={5}>WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        rowSpan={27}
                        colSpan={3}
                        style={{
                          writinTVMMode: "vertical-lr",
                          textAliTVMn: "center",
                        }}
                      >
                        TVM (Ref:O&M/TELE-AFC/SOP/01)
                      </td>
                      <td colspan={1}>1</td>
                      <td rowSpan={9} colspan={3}>
                        Visual Inspection
                      </td>
                      <td className="text-start" colspan={10}>
                        Check Fixing & Alignment of all modules of TVM
                      </td>

                      <td colSpan={2}>{value?.[0]?.TVM1}</td>
                      <td colSpan={2}>{value?.[0]?.TVM2}</td>
                      <td colSpan={2}>{value?.[0]?.TVM3}</td>
                      <td colSpan={2}>{value?.[0]?.TVM4}</td>
                      <td colSpan={2}>{value?.[0]?.TVM5}</td>

                      <td colSpan={5}>{value?.[0]?.remark}</td>
                      <td colSpan={5}>{value?.[0]?.action}</td>
                      <td colSpan={5}>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="text-start" colspan={10}>
                        Checking Silicon sealing of TVM Cabinet
                      </td>
                      <td colspan={2}>{value?.[1]?.TVM1}</td>
                      <td colspan={2}>{value?.[1]?.TVM2}</td>
                      <td colspan={2}>{value?.[1]?.TVM3}</td>
                      <td colspan={2}>{value?.[1]?.TVM4}</td>
                      <td colspan={2}>{value?.[1]?.TVM5}</td>

                      <td colspan={5}>{value?.[1]?.remark}</td>
                      <td colspan={5}>{value?.[1]?.action}</td>
                      <td colspan={5}>{value?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start" colspan={10}>
                        Checking Silicon sealing of TVM Cabinet
                      </td>
                      <td colspan={2}>{value?.[2]?.TVM1}</td>
                      <td colspan={2}>{value?.[2]?.TVM2}</td>
                      <td colspan={2}>{value?.[2]?.TVM3}</td>
                      <td colspan={2}>{value?.[2]?.TVM4}</td>
                      <td colspan={2}>{value?.[2]?.TVM5}</td>

                      <td colspan={5}>{value?.[2]?.remark}</td>
                      <td colspan={5}>{value?.[2]?.action}</td>
                      <td colspan={5}>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start" colspan={10}>
                        Checking of any opening inside TVM cabinet
                      </td>
                      <td colspan={2}>{value?.[3]?.TVM1}</td>
                      <td colspan={2}>{value?.[3]?.TVM2}</td>
                      <td colspan={2}>{value?.[3]?.TVM3}</td>
                      <td colspan={2}>{value?.[3]?.TVM4}</td>
                      <td colspan={2}>{value?.[3]?.TVM5}</td>

                      <td colspan={5}>{value?.[3]?.remark}</td>
                      <td colspan={5}>{value?.[3]?.action}</td>
                      <td colspan={5}>{value?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="text-start" colspan={10}>
                        Checking of Power Supply and Battery
                      </td>
                      <td colspan={2}>{value?.[4]?.TVM1}</td>
                      <td colspan={2}>{value?.[4]?.TVM2}</td>
                      <td colspan={2}>{value?.[4]?.TVM3}</td>
                      <td colspan={2}>{value?.[4]?.TVM4}</td>
                      <td colspan={2}>{value?.[4]?.TVM5}</td>

                      <td colspan={5}>{value?.[4]?.remark}</td>
                      <td colspan={5}>{value?.[4]?.action}</td>
                      <td colspan={5}>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start" colspan={10}>
                        Check Station ID
                      </td>
                      <td colspan={2}>{value?.[5]?.TVM1}</td>
                      <td colspan={2}>{value?.[5]?.TVM2}</td>
                      <td colspan={2}>{value?.[5]?.TVM3}</td>
                      <td colspan={2}>{value?.[5]?.TVM4}</td>
                      <td colspan={2}>{value?.[5]?.TVM5}</td>

                      <td colspan={5}>{value?.[5]?.remark}</td>
                      <td colspan={5}>{value?.[5]?.action}</td>
                      <td colspan={5}>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start" colspan={10}>
                        Check Device ID
                      </td>
                      <td colspan={2}>{value?.[6]?.TVM1}</td>
                      <td colspan={2}>{value?.[6]?.TVM2}</td>
                      <td colspan={2}>{value?.[6]?.TVM3}</td>
                      <td colspan={2}>{value?.[6]?.TVM4}</td>
                      <td colspan={2}>{value?.[6]?.TVM5}</td>

                      <td colspan={5}>{value?.[6]?.remark}</td>
                      <td colspan={5}>{value?.[6]?.action}</td>
                      <td colspan={5}>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start" colspan={10}>
                        Check Date and Time
                      </td>
                      <td colspan={2}>{value?.[7]?.TVM1}</td>
                      <td colspan={2}>{value?.[7]?.TVM2}</td>
                      <td colspan={2}>{value?.[7]?.TVM3}</td>
                      <td colspan={2}>{value?.[7]?.TVM4}</td>
                      <td colspan={2}>{value?.[7]?.TVM5}</td>

                      <td colspan={5}>{value?.[7]?.remark}</td>
                      <td colspan={5}>{value?.[7]?.action}</td>
                      <td colspan={5}>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="text-start" colspan={10}>
                        Check Passenger Information Display (PID)
                      </td>
                      <td colspan={2}>{value?.[8]?.TVM1}</td>
                      <td colspan={2}>{value?.[8]?.TVM2}</td>
                      <td colspan={2}>{value?.[8]?.TVM3}</td>
                      <td colspan={2}>{value?.[8]?.TVM4}</td>
                      <td colspan={2}>{value?.[8]?.TVM5}</td>

                      <td colspan={5}>{value?.[8]?.remark}</td>
                      <td colspan={5}>{value?.[8]?.action}</td>
                      <td colspan={5}>{value?.[8]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>10</td>
                      <td rowSpan={7} colspan={3}>
                        Cleaning
                      </td>
                      <td className="text-start" colspan={10}>
                        Cleaning of all modules of TVM
                      </td>
                      <td colspan={2}>{value?.[9]?.TVM1}</td>
                      <td colspan={2}>{value?.[9]?.TVM2}</td>
                      <td colspan={2}>{value?.[9]?.TVM3}</td>
                      <td colspan={2}>{value?.[9]?.TVM4}</td>
                      <td colspan={2}>{value?.[9]?.TVM5}</td>

                      <td colspan={5}>{value?.[9]?.remark}</td>
                      <td colspan={5}>{value?.[9]?.action}</td>
                      <td colspan={5}>{value?.[9]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="text-start" colspan={10}>
                        Cleaning of lexan covering board of display
                      </td>
                      <td colspan={2}>{value?.[10]?.TVM1}</td>
                      <td colspan={2}>{value?.[10]?.TVM2}</td>
                      <td colspan={2}>{value?.[10]?.TVM3}</td>
                      <td colspan={2}>{value?.[10]?.TVM4}</td>
                      <td colspan={2}>{value?.[10]?.TVM5}</td>

                      <td colspan={5}>{value?.[10]?.remark}</td>
                      <td colspan={5}>{value?.[10]?.action}</td>
                      <td colspan={5}>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="text-start" colspan={10}>
                        Cleaning of Coin hopper opto sensor
                      </td>
                      <td colspan={2}>{value?.[11]?.TVM1}</td>
                      <td colspan={2}>{value?.[11]?.TVM2}</td>
                      <td colspan={2}>{value?.[11]?.TVM3}</td>
                      <td colspan={2}>{value?.[11]?.TVM4}</td>
                      <td colspan={2}>{value?.[11]?.TVM5}</td>

                      <td colspan={5}>{value?.[11]?.remark}</td>
                      <td colspan={5}>{value?.[11]?.action}</td>
                      <td colspan={5}>{value?.[11]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="text-start" colspan={10}>
                        Cleaning of Cooling fans
                      </td>
                      <td colspan={2}>{value?.[12]?.TVM1}</td>
                      <td colspan={2}>{value?.[12]?.TVM2}</td>
                      <td colspan={2}>{value?.[12]?.TVM3}</td>
                      <td colspan={2}>{value?.[12]?.TVM4}</td>
                      <td colspan={2}>{value?.[12]?.TVM5}</td>

                      <td colspan={5}>{value?.[12]?.remark}</td>
                      <td colspan={5}>{value?.[12]?.action}</td>
                      <td colspan={5}>{value?.[12]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="text-start" colspan={10}>
                        Checking and Cleaning of Cooling fan filter
                      </td>
                      <td colspan={2}>{value?.[13]?.TVM1}</td>
                      <td colspan={2}>{value?.[13]?.TVM2}</td>
                      <td colspan={2}>{value?.[13]?.TVM3}</td>
                      <td colspan={2}>{value?.[13]?.TVM4}</td>
                      <td colspan={2}>{value?.[13]?.TVM5}</td>

                      <td colspan={5}>{value?.[13]?.remark}</td>
                      <td colspan={5}>{value?.[13]?.action}</td>
                      <td colspan={5}>{value?.[13]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="text-start" colspan={10}>
                        Cleaning of BNR
                      </td>
                      <td colspan={2}>{value?.[14]?.TVM1}</td>
                      <td colspan={2}>{value?.[14]?.TVM2}</td>
                      <td colspan={2}>{value?.[14]?.TVM3}</td>
                      <td colspan={2}>{value?.[14]?.TVM4}</td>
                      <td colspan={2}>{value?.[14]?.TVM5}</td>

                      <td colspan={5}>{value?.[14]?.remark}</td>
                      <td colspan={5}>{value?.[14]?.action}</td>
                      <td colspan={5}>{value?.[14]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td className="text-start" colspan={10}>
                        Cleaning of Bank card reader
                      </td>
                      <td colspan={2}>{value?.[15]?.TVM1}</td>
                      <td colspan={2}>{value?.[15]?.TVM2}</td>
                      <td colspan={2}>{value?.[15]?.TVM3}</td>
                      <td colspan={2}>{value?.[15]?.TVM4}</td>
                      <td colspan={2}>{value?.[15]?.TVM5}</td>

                      <td colspan={5}>{value?.[15]?.remark}</td>
                      <td colspan={5}>{value?.[15]?.action}</td>
                      <td colspan={5}>{value?.[15]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td rowSpan={11} colspan={3}>
                        Module Test(Maintainance Menu)
                      </td>
                      <td className="text-start" colspan={10}>
                        Check LAN Status (Ping Server)
                      </td>
                      <td colspan={2}>{value?.[16]?.TVM1}</td>
                      <td colspan={2}>{value?.[16]?.TVM2}</td>
                      <td colspan={2}>{value?.[16]?.TVM3}</td>
                      <td colspan={2}>{value?.[16]?.TVM4}</td>
                      <td colspan={2}>{value?.[16]?.TVM5}</td>

                      <td colspan={5}>{value?.[16]?.remark}</td>
                      <td colspan={5}>{value?.[16]?.action}</td>
                      <td colspan={5}>{value?.[16]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td className="text-start" colspan={10}>
                        Component Status
                      </td>
                      <td colspan={2}>{value?.[17]?.TVM1}</td>
                      <td colspan={2}>{value?.[17]?.TVM2}</td>
                      <td colspan={2}>{value?.[17]?.TVM3}</td>
                      <td colspan={2}>{value?.[17]?.TVM4}</td>
                      <td colspan={2}>{value?.[17]?.TVM5}</td>

                      <td colspan={5}>{value?.[17]?.remark}</td>
                      <td colspan={5}>{value?.[17]?.action}</td>
                      <td colspan={5}>{value?.[17]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td className="text-start" colspan={10}>
                        Token Dispenser Test
                      </td>
                      <td colspan={2}>{value?.[18]?.TVM1}</td>
                      <td colspan={2}>{value?.[18]?.TVM2}</td>
                      <td colspan={2}>{value?.[18]?.TVM3}</td>
                      <td colspan={2}>{value?.[18]?.TVM4}</td>
                      <td colspan={2}>{value?.[18]?.TVM5}</td>

                      <td colspan={5}>{value?.[18]?.remark}</td>
                      <td colspan={5}>{value?.[18]?.action}</td>
                      <td colspan={5}>{value?.[18]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td className="text-start" colspan={10}>
                        Bank Note system Test
                      </td>
                      <td colspan={2}>{value?.[19]?.TVM1}</td>
                      <td colspan={2}>{value?.[19]?.TVM2}</td>
                      <td colspan={2}>{value?.[19]?.TVM3}</td>
                      <td colspan={2}>{value?.[19]?.TVM4}</td>
                      <td colspan={2}>{value?.[19]?.TVM5}</td>

                      <td colspan={5}>{value?.[19]?.remark}</td>
                      <td colspan={5}>{value?.[19]?.action}</td>
                      <td colspan={5}>{value?.[19]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td className="text-start" colspan={10}>
                        Payment Terminal Test
                      </td>
                      <td colspan={2}>{value?.[20]?.TVM1}</td>
                      <td colspan={2}>{value?.[20]?.TVM2}</td>
                      <td colspan={2}>{value?.[20]?.TVM3}</td>
                      <td colspan={2}>{value?.[20]?.TVM4}</td>
                      <td colspan={2}>{value?.[20]?.TVM5}</td>

                      <td colspan={5}>{value?.[20]?.remark}</td>
                      <td colspan={5}>{value?.[20]?.action}</td>
                      <td colspan={5}>{value?.[20]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>22</td>
                      <td className="text-start" colspan={10}>
                        Printer Test
                      </td>
                      <td colspan={2}>{value?.[21]?.TVM1}</td>
                      <td colspan={2}>{value?.[21]?.TVM2}</td>
                      <td colspan={2}>{value?.[21]?.TVM3}</td>
                      <td colspan={2}>{value?.[21]?.TVM4}</td>
                      <td colspan={2}>{value?.[21]?.TVM5}</td>

                      <td colspan={5}>{value?.[21]?.remark}</td>
                      <td colspan={5}>{value?.[21]?.action}</td>
                      <td colspan={5}>{value?.[21]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td className="text-start" colspan={10}>
                        Audio Test
                      </td>
                      <td colspan={2}>{value?.[22]?.TVM1}</td>
                      <td colspan={2}>{value?.[22]?.TVM2}</td>
                      <td colspan={2}>{value?.[22]?.TVM3}</td>
                      <td colspan={2}>{value?.[22]?.TVM4}</td>
                      <td colspan={2}>{value?.[22]?.TVM5}</td>

                      <td colspan={5}>{value?.[22]?.remark}</td>
                      <td colspan={5}>{value?.[22]?.action}</td>
                      <td colspan={5}>{value?.[22]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td className="text-start" colspan={10}>
                        Bowl LED Test
                      </td>
                      <td colspan={2}>{value?.[23]?.TVM1}</td>
                      <td colspan={2}>{value?.[23]?.TVM2}</td>
                      <td colspan={2}>{value?.[23]?.TVM3}</td>
                      <td colspan={2}>{value?.[23]?.TVM4}</td>
                      <td colspan={2}>{value?.[23]?.TVM5}</td>

                      <td colspan={5}>{value?.[23]?.remark}</td>
                      <td colspan={5}>{value?.[23]?.action}</td>
                      <td colspan={5}>{value?.[23]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td className="text-start" colspan={10}>
                        Alarm Test
                      </td>
                      <td colspan={2}>{value?.[24]?.TVM1}</td>
                      <td colspan={2}>{value?.[24]?.TVM2}</td>
                      <td colspan={2}>{value?.[24]?.TVM3}</td>
                      <td colspan={2}>{value?.[24]?.TVM4}</td>
                      <td colspan={2}>{value?.[24]?.TVM5}</td>

                      <td colspan={5}>{value?.[24]?.remark}</td>
                      <td colspan={5}>{value?.[24]?.action}</td>
                      <td colspan={5}>{value?.[24]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>26</td>
                      <td className="text-start" colspan={10}>
                        Coin Dispenser Test
                      </td>
                      <td colspan={2}>{value?.[25]?.TVM1}</td>
                      <td colspan={2}>{value?.[25]?.TVM2}</td>
                      <td colspan={2}>{value?.[25]?.TVM3}</td>
                      <td colspan={2}>{value?.[25]?.TVM4}</td>
                      <td colspan={2}>{value?.[25]?.TVM5}</td>

                      <td colspan={5}>{value?.[25]?.remark}</td>
                      <td colspan={5}>{value?.[25]?.action}</td>
                      <td colspan={5}>{value?.[25]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>27</td>
                      <td className="text-start" colspan={10}>
                        Card Reader Test
                      </td>
                      <td colspan={2}>{value?.[26]?.TVM1}</td>
                      <td colspan={2}>{value?.[26]?.TVM2}</td>
                      <td colspan={2}>{value?.[26]?.TVM3}</td>
                      <td colspan={2}>{value?.[26]?.TVM4}</td>
                      <td colspan={2}>{value?.[26]?.TVM5}</td>

                      <td colspan={5}>{value?.[26]?.remark}</td>
                      <td colspan={5}>{value?.[26]?.action}</td>
                      <td colspan={5}>{value?.[26]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td colspan={25}>Staff Name:-{item.staff1_name}</td>
                      <td colspan={5}>Designation:-{item.staff1_desg}</td>
                      <td colSpan={5}>Employee Id:-{item.staff1_sign}</td>
                    </tr>

                    <tr>
                      <td colspan={25}>Staff Name:-{item.staff2_name}</td>
                      <td colspan={5}>Designation:-{item.staff2_desg}</td>
                      <td colSpan={5}>Employee Id:-{item.staff2_sign}</td>
                    </tr>
                    <tr>
                      <td colspan={25}>Staff Name:-{item.staff3_name}</td>
                      <td colspan={5}>Designation:-{item.staff3_desg}</td>
                      <td colSpan={5}>Employee Id:-{item.staff3_sign}</td>
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
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Afc_preventionList;
