import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { saveData, fetchData } from "../../reducer/rajiv/PMLogBook3Reducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const OperationStationDiaryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PMLogBook3List = useSelector((state) => state.PMLogBook3);
  const location = useLocation();
  const { id } = location.state;
  const user = JSON.parse(localStorage.getItem("userdata"));

  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename:
      "PREVENTIVE MAINTENACE WORKSHEET OF CENTRAL COMPUER (MONTYLY) Monthly.pdf",
  });
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(slug)
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (PMLogBook3List.data && PMLogBook3List.data.data) {
      setItems(PMLogBook3List.data.data);
      setFilteredItems(PMLogBook3List.data.data);
    }
  }, [PMLogBook3List]);
  const itmm = PMLogBook3List.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  const handleSave = () => {
    dispatch(saveData(id));
    alert(slug)
      navigate(`list/${slug}`);
      // Refresh the page
  
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PREVENTIVE MAINTENACE WORKSHEET OF CENTRAL COMPUER (MONTYLY)
            </Link>
            <Link underline="hover" color="inherit">
              View
            </Link>
          </Breadcrumbs>
        </div>
        {/* <h3> PM Log Book List</h3> */}
        {/* <span className="line-box"></span> */}
        <div className="d-flex justify-content-between align-items-center mt-3">
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
                  onChange={(newValue) => setFromDate(newValue.startOf("day"))}
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
                  onChange={(newValue) => setToDate(newValue.endOf("day"))}
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
                filename="PREVENTIVE MAINTENACE WORKSHEET OF CENTRAL COMPUER (MONTYLY) Monthly (1)"
                sheet="PREVENTIVE MAINTENACE WORKSHEET OF CENTRAL COMPUER (MONTYLY) Monthly (1)"
                currentTableRef={tableRef.current}
              >
                <button
                  className="btn"
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
        <div ref={targetRef}>
          {filteredData?.map((item, index) => {
            const value = item?.activities;
            return (
              <>
                <table ref={tableRef}>
                  <thead>
                    <tr>
                      <th className="text-start" colspan="2">
                        FREQUENCY: MONTHLY
                      </th>
                      <th className="text-start" colspan="1">
                        DATE: {item?.date}
                      </th>
                      <th className="text-start" colspan="3">
                        MONTH: {item?.month}{" "}
                      </th>
                      <th className="text-start" colspan="3">
                        DOCUMENT: O&M/AFC/OCC/SDC/CH01
                      </th>
                    </tr>
                    <tr>
                      <th colspan={2}></th>
                      <th colspan={4}></th>
                      <th colspan={3} className="text-start">
                        Ref:O&M/TELE-AFC/SOP/02
                      </th>
                    </tr>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Activity</th>
                      <th>DESCRIPTION OF WORK</th>
                      <th>Server Rack</th>
                      <th>Network Rack</th>
                      <th>CCHS Server & Network Rack</th>
                      <th>REMARKS/ DEFICIENCIES</th>
                      <th>ACTION TAKEN</th>
                      <th>WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td rowSpan={11}>Visual Inspection</td>
                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>

                      <td>{value?.[0]?.ServerRack}</td>
                      <td>{value?.[0]?.NetworkRack}</td>
                      <td>{value?.[0]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[0]?.remark}</td>
                      <td>{value?.[0]?.action}</td>
                      <td>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td className="text-start">
                        Checking of physical condition of all cable (specially
                        for Rodent cut)
                      </td>
                      <td>{value?.[1]?.ServerRack}</td>
                      <td>{value?.[1]?.NetworkRack}</td>
                      <td>{value?.[1]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td>{value?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">
                        Checking of any opening inside rack
                      </td>
                      <td>{value?.[2]?.ServerRack}</td>
                      <td>{value?.[2]?.NetworkRack}</td>
                      <td>{value?.[2]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start">
                        Checking of Fan status of Racks and Equipments
                      </td>
                      <td>{value?.[3]?.ServerRack}</td>
                      <td>{value?.[3]?.NetworkRack}</td>
                      <td>{value?.[3]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td>{value?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        Checking of power indication of Rack{" "}
                      </td>
                      <td>{value?.[4]?.ServerRack}</td>
                      <td>{value?.[4]?.NetworkRack}</td>
                      <td>{value?.[4]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start">
                        Checking of LED indication of all the 20 drive of Main
                        storage
                      </td>
                      <td>{value?.[5]?.ServerRack}</td>
                      <td>{value?.[5]?.NetworkRack}</td>
                      <td>{value?.[5]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start">
                        {" "}
                        Checking of LED indication of all the 10 drive of Backup
                        storage
                      </td>
                      <td>{value?.[6]?.ServerRack}</td>
                      <td>{value?.[6]?.NetworkRack}</td>
                      <td>{value?.[6]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[6]?.remark}</td>
                      <td>{value?.[6]?.action}</td>
                      <td>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start">
                        Checking of health Status of all the server inside Rack
                      </td>
                      <td>{value?.[7]?.ServerRack}</td>
                      <td>{value?.[7]?.NetworkRack}</td>
                      <td>{value?.[7]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="text-start">
                        Checking of health Status of all the Networking
                        equipment inside rack
                      </td>
                      <td>{value?.[8]?.ServerRack}</td>
                      <td>{value?.[8]?.NetworkRack}</td>
                      <td>{value?.[8]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[8]?.remark}</td>
                      <td>{value?.[8]?.action}</td>
                      <td>{value?.[8]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="text-start">
                        Checking of health Status of the Tape Library
                      </td>
                      <td>{value?.[9]?.ServerRack}</td>
                      <td>{value?.[9]?.NetworkRack}</td>
                      <td>{value?.[9]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[9]?.remark}</td>
                      <td>{value?.[9]?.action}</td>
                      <td>{value?.[9]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="text-start">
                        Checking and ensuring that no excessive heat accumulated
                        inside
                      </td>
                      <td>{value?.[10]?.ServerRack}</td>
                      <td>{value?.[10]?.NetworkRack}</td>
                      <td>{value?.[10]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td rowSpan={2}>Cleaning</td>
                      <td className="text-start">Cleaning of Rack</td>
                      <td>{value?.[11]?.ServerRack}</td>
                      <td>{value?.[11]?.NetworkRack}</td>
                      <td>{value?.[11]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[11]?.remark}</td>
                      <td>{value?.[11]?.action}</td>
                      <td>{value?.[11]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="text-start">
                        Exterior cleaning of equipments in the rack
                      </td>
                      <td>{value?.[12]?.ServerRack}</td>
                      <td>{value?.[12]?.NetworkRack}</td>
                      <td>{value?.[12]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[12]?.remark}</td>
                      <td>{value?.[12]?.action}</td>
                      <td>{value?.[12]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>14</td>
                      <td rowSpan={6}>Module Test (Maintenance Menu)</td>
                      <td className="text-start">
                        {" "}
                        Check voltage between neutral & earth in the rack
                      </td>
                      <td>{value?.[13]?.ServerRack}</td>
                      <td>{value?.[13]?.NetworkRack}</td>
                      <td>{value?.[13]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[13]?.remark}</td>
                      <td>{value?.[13]?.action}</td>
                      <td>{value?.[13]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="text-start">
                        Check patch updates of servers
                      </td>
                      <td>{value?.[14]?.ServerRack}</td>
                      <td>{value?.[14]?.NetworkRack}</td>
                      <td>{value?.[14]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[14]?.remark}</td>
                      <td>{value?.[14]?.action}</td>
                      <td>{value?.[14]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td className="text-start">
                        Check Firmware of Firewall.
                      </td>
                      <td>{value?.[15]?.ServerRack}</td>
                      <td>{value?.[15]?.NetworkRack}</td>
                      <td>{value?.[15]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[15]?.remark}</td>
                      <td>{value?.[15]?.action}</td>
                      <td>{value?.[15]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td className="text-start">
                        Check LAN status of all the equipments in the rack
                      </td>
                      <td>{value?.[16]?.ServerRack}</td>
                      <td>{value?.[16]?.NetworkRack}</td>
                      <td>{value?.[16]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[16]?.remark}</td>
                      <td>{value?.[16]?.action}</td>
                      <td>{value?.[16]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td className="text-start">
                        Checking of room temperature
                      </td>
                      <td>{value?.[17]?.ServerRack}</td>
                      <td>{value?.[17]?.NetworkRack}</td>
                      <td>{value?.[17]?.CCHSServerNetworkRack}</td>
                      <td>{value?.[17]?.remark}</td>
                      <td>{value?.[17]?.action}</td>
                      <td>{value?.[17]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td className="text-start">
                        Check all the services of the server
                      </td>
                      <td>{value?.[18]?.ServerRack}</td>
                      <td>{value?.[18]?.NetworkRack}</td>
                      <td>{value?.[18]?.CCHSServerNetworkRack}</td>

                      <td>{value?.[18]?.remark}</td>
                      <td>{value?.[18]?.action}</td>
                      <td>{value?.[18]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td rowSpan={4} colspan={2}>
                        Staff Details
                      </td>
                      <td className="text-start">Name</td>
                      <td className="text-start" colspan={3}>
                        Desg
                      </td>
                      <td className="text-start" colspan={2}>
                        Employee No.
                      </td>
                      <td className="text-start"> Sign</td>
                    </tr>
                    <tr>
                      <td>{item.staff1_name}</td>
                      <td colspan={3}>{item.staff1_desg}</td>
                      <td colSpan={2}>{item.staff1_employee}</td>
                      <td colSpan={1}>{item.staff1_name}</td>
                    </tr>
                    <tr>
                      <td>{item.staff2_name}</td>
                      <td colspan={3}>{item.staff2_desg}</td>
                      <td colSpan={2}>{item.staff2_employee}</td>
                      <td colSpan={1}>{item.staff2_name}</td>
                    </tr>
                    <tr>
                      <td>{item.staff3_name}</td>
                      <td colspan={3}>{item.staff3_desg}</td>
                      <td colSpan={2}>{item.staff3_employee}</td>
                      <td colSpan={1}>{item.staff3_name}</td>
                    </tr>
                  </tbody>
                </table>
                <td className="d-flex gap-3 mt-3 justify-content-end">
                  {item.status === "0" || user?.role == "Admin" ? (
                    <div className="d-flex ">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        className="btn btn-primary align-content-center mx-3"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-success"
                        onClick={
                          handleSave}
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

export default OperationStationDiaryList;
