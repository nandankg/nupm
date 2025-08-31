import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { fetchData, saveData } from "../../reducer/rajiv/AFCMonthlyReducer";

const AFCMontylyList = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const addafcMonthly = useSelector((state) => state.afcMonthly);
  const dispatchData = useSelector((state) => state.afcMonthly);
  const [slug, setSlug] = useState("");
  const user = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    if (dispatchData) {
      setSlug(dispatchData.slug);
    }
  }, [dispatchData]);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "AFC Monthly.pdf" });
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const location = useLocation();
  const { id } = location.state;
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const itmm = dispatchData.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }

  const handleSave = (id) => {
    dispatch(saveData(id));
    
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 500)
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
            AFC Preventive Maintenance Checklist(Monthly)
            </Link>
            <Link underline="hover" color="inherit">
              View
            </Link>
          </Breadcrumbs>
        </div>
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
                filename="AFC Monthly_table"
                sheet="AFC Monthly_table"
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
            const value = item?.activities1;
            const value2 = item?.activities2;
            return (
              <>
                <table ref={tableRef}>
                  
                  <thead>
                    <tr><th colSpan="20">AFC Preventive Maintenance Checklist(Monthly)</th></tr>
                    <tr>
                      <th className="text-start" colspan="3">
                        STN. NAME: {item?.stn_name}{" "}
                      </th>
                      <th className="text-start" colspan="11">
                        DATE: {item?.date}
                      </th>
                      <th className="text-start" colspan="6">
                        MONTH: {item?.month}{" "}
                      </th>
                    </tr>
                    <tr>
                      <th rowspan="6">Equipment</th>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan="10">GATE</th>
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
                      <th>8</th>
                      <th>9</th>
                      <th>10</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        rowSpan={38}
                        style={{
                          writingMode: "vertical-lr",
                          textAlign: "center",
                        }}
                      >
                        GATE (Ref:O&M/TELE-AFC/SOP/01)
                      </td>
                      <td>1</td>
                      <td rowSpan={8}>Visual Inspection</td>
                      <td className="text-start">
                        Check Fixing & Alignment of all modules of Gates
                      </td>

                      <td>{value?.[0]?.G1}</td>
                      <td>{value?.[0]?.G2}</td>
                      <td>{value?.[0]?.G3}</td>
                      <td>{value?.[0]?.G4}</td>
                      <td>{value?.[0]?.G5}</td>
                      <td>{value?.[0]?.G6}</td>
                      <td>{value?.[0]?.G7}</td>
                      <td>{value?.[0]?.G8}</td>
                      <td>{value?.[0]?.G9}</td>
                      <td>{value?.[0]?.G10}</td>
                      <td>{value?.[0]?.remark}</td>
                      <td>{value?.[0]?.action}</td>
                      <td>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>
                      <td>{value?.[1]?.G1}</td>
                      <td>{value?.[1]?.G2}</td>
                      <td>{value?.[1]?.G3}</td>
                      <td>{value?.[1]?.G4}</td>
                      <td>{value?.[1]?.G5}</td>
                      <td>{value?.[1]?.G6}</td>
                      <td>{value?.[1]?.G7}</td>
                      <td>{value?.[1]?.G8}</td>
                      <td>{value?.[1]?.G9}</td>
                      <td>{value?.[1]?.G10}</td>
                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td>{value?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">
                        Checking Silicon sealing of Gate Cabinet
                      </td>
                      <td>{value?.[2]?.G1}</td>
                      <td>{value?.[2]?.G2}</td>
                      <td>{value?.[2]?.G3}</td>
                      <td>{value?.[2]?.G4}</td>
                      <td>{value?.[2]?.G5}</td>
                      <td>{value?.[2]?.G6}</td>
                      <td>{value?.[2]?.G7}</td>
                      <td>{value?.[2]?.G8}</td>
                      <td>{value?.[2]?.G9}</td>
                      <td>{value?.[2]?.G10}</td>
                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start">
                        Checking of any opening inside gate cabinet
                      </td>
                      <td>{value?.[3]?.G1}</td>
                      <td>{value?.[3]?.G2}</td>
                      <td>{value?.[3]?.G3}</td>
                      <td>{value?.[3]?.G4}</td>
                      <td>{value?.[3]?.G5}</td>
                      <td>{value?.[3]?.G6}</td>
                      <td>{value?.[3]?.G7}</td>
                      <td>{value?.[3]?.G8}</td>
                      <td>{value?.[3]?.G9}</td>
                      <td>{value?.[3]?.G10}</td>
                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td>{value?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        Checking of Power Supply and Battery
                      </td>
                      <td>{value?.[4]?.G1}</td>
                      <td>{value?.[4]?.G2}</td>
                      <td>{value?.[4]?.G3}</td>
                      <td>{value?.[4]?.G4}</td>
                      <td>{value?.[4]?.G5}</td>
                      <td>{value?.[4]?.G6}</td>
                      <td>{value?.[4]?.G7}</td>
                      <td>{value?.[4]?.G8}</td>
                      <td>{value?.[4]?.G9}</td>
                      <td>{value?.[4]?.G10}</td>
                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start">
                        Check whether leaked oil appears on the flap mechanism
                      </td>
                      <td>{value?.[5]?.G1}</td>
                      <td>{value?.[5]?.G2}</td>
                      <td>{value?.[5]?.G3}</td>
                      <td>{value?.[5]?.G4}</td>
                      <td>{value?.[5]?.G5}</td>
                      <td>{value?.[5]?.G6}</td>
                      <td>{value?.[5]?.G7}</td>
                      <td>{value?.[5]?.G8}</td>
                      <td>{value?.[5]?.G9}</td>
                      <td>{value?.[5]?.G10}</td>
                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start">Check Date and Time</td>
                      <td>{value?.[6]?.G1}</td>
                      <td>{value?.[6]?.G2}</td>
                      <td>{value?.[6]?.G3}</td>
                      <td>{value?.[6]?.G4}</td>
                      <td>{value?.[6]?.G5}</td>
                      <td>{value?.[6]?.G6}</td>
                      <td>{value?.[6]?.G7}</td>
                      <td>{value?.[6]?.G8}</td>
                      <td>{value?.[6]?.G9}</td>
                      <td>{value?.[6]?.G10}</td>
                      <td>{value?.[6]?.remark}</td>
                      <td>{value?.[6]?.action}</td>
                      <td>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start">
                        Check correct position of flap mechanism
                      </td>
                      <td>{value?.[7]?.G1}</td>
                      <td>{value?.[7]?.G2}</td>
                      <td>{value?.[7]?.G3}</td>
                      <td>{value?.[7]?.G4}</td>
                      <td>{value?.[7]?.G5}</td>
                      <td>{value?.[7]?.G6}</td>
                      <td>{value?.[7]?.G7}</td>
                      <td>{value?.[7]?.G8}</td>
                      <td>{value?.[7]?.G9}</td>
                      <td>{value?.[7]?.G10}</td>
                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td rowSpan={3}>Cleaning</td>
                      <td className="text-start">
                        Cleaning of all modules of AFC Gate and cabinet
                      </td>
                      <td>{value?.[8]?.G1}</td>
                      <td>{value?.[8]?.G2}</td>
                      <td>{value?.[8]?.G3}</td>
                      <td>{value?.[8]?.G4}</td>
                      <td>{value?.[8]?.G5}</td>
                      <td>{value?.[8]?.G6}</td>
                      <td>{value?.[8]?.G7}</td>
                      <td>{value?.[8]?.G8}</td>
                      <td>{value?.[8]?.G9}</td>
                      <td>{value?.[8]?.G10}</td>
                      <td>{value?.[8]?.remark}</td>
                      <td>{value?.[8]?.action}</td>
                      <td>{value?.[8]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="text-start">
                      Clean sensor of Limit PCB of flap mechanism
                      </td>
                      <td>{value?.[9]?.G1}</td>
                      <td>{value?.[9]?.G2}</td>
                      <td>{value?.[9]?.G3}</td>
                      <td>{value?.[9]?.G4}</td>
                      <td>{value?.[9]?.G5}</td>
                      <td>{value?.[9]?.G6}</td>
                      <td>{value?.[9]?.G7}</td>
                      <td>{value?.[9]?.G8}</td>
                      <td>{value?.[9]?.G9}</td>
                      <td>{value?.[9]?.G10}</td>
                      <td>{value?.[9]?.remark}</td>
                      <td>{value?.[9]?.action}</td>
                      <td>{value?.[9]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="text-start">
                        Clean plastic covers of sensors and transmitters in
                        corridor
                      </td>
                      <td>{value?.[10]?.G1}</td>
                      <td>{value?.[10]?.G2}</td>
                      <td>{value?.[10]?.G3}</td>
                      <td>{value?.[10]?.G4}</td>
                      <td>{value?.[10]?.G5}</td>
                      <td>{value?.[10]?.G6}</td>
                      <td>{value?.[10]?.G7}</td>
                      <td>{value?.[10]?.G8}</td>
                      <td>{value?.[10]?.G9}</td>
                      <td>{value?.[10]?.G10}</td>
                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td rowSpan={25}>Module Test (Maintenan ce Menu)</td>
                      <td className="text-start">
                        Check ping to station computer
                      </td>
                      <td>{value?.[11]?.G1}</td>
                      <td>{value?.[11]?.G2}</td>
                      <td>{value?.[11]?.G3}</td>
                      <td>{value?.[11]?.G4}</td>
                      <td>{value?.[11]?.G5}</td>
                      <td>{value?.[11]?.G6}</td>
                      <td>{value?.[11]?.G7}</td>
                      <td>{value?.[11]?.G8}</td>
                      <td>{value?.[11]?.G9}</td>
                      <td>{value?.[11]?.G10}</td>
                      <td>{value?.[11]?.remark}</td>
                      <td>{value?.[11]?.action}</td>
                      <td>{value?.[11]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="text-start">
                        Check whether Token Capture Unit (TCU) clearing
                        mechanism is normally closed
                      </td>
                      <td>{value?.[12]?.G1}</td>
                      <td>{value?.[12]?.G2}</td>
                      <td>{value?.[12]?.G3}</td>
                      <td>{value?.[12]?.G4}</td>
                      <td>{value?.[12]?.G5}</td>
                      <td>{value?.[12]?.G6}</td>
                      <td>{value?.[12]?.G7}</td>
                      <td>{value?.[12]?.G8}</td>
                      <td>{value?.[12]?.G9}</td>
                      <td>{value?.[12]?.G10}</td>
                      <td>{value?.[12]?.remark}</td>
                      <td>{value?.[12]?.action}</td>
                      <td>{value?.[12]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="text-start">Check lock functionality</td>
                      <td>{value?.[13]?.G1}</td>
                      <td>{value?.[13]?.G2}</td>
                      <td>{value?.[13]?.G3}</td>
                      <td>{value?.[13]?.G4}</td>
                      <td>{value?.[13]?.G5}</td>
                      <td>{value?.[13]?.G6}</td>
                      <td>{value?.[13]?.G7}</td>
                      <td>{value?.[13]?.G8}</td>
                      <td>{value?.[13]?.G9}</td>
                      <td>{value?.[13]?.G10}</td>
                      <td>{value?.[13]?.remark}</td>
                      <td>{value?.[13]?.action}</td>
                      <td>{value?.[13]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="text-start">Check battery backup</td>
                      <td>{value?.[14]?.G1}</td>
                      <td>{value?.[14]?.G2}</td>
                      <td>{value?.[14]?.G3}</td>
                      <td>{value?.[14]?.G4}</td>
                      <td>{value?.[14]?.G5}</td>
                      <td>{value?.[14]?.G6}</td>
                      <td>{value?.[14]?.G7}</td>
                      <td>{value?.[14]?.G8}</td>
                      <td>{value?.[14]?.G9}</td>
                      <td>{value?.[14]?.G10}</td>
                      <td>{value?.[14]?.remark}</td>
                      <td>{value?.[14]?.action}</td>
                      <td>{value?.[14]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td className="text-start">Audio Test</td>
                      <td>{value?.[15]?.G1}</td>
                      <td>{value?.[15]?.G2}</td>
                      <td>{value?.[15]?.G3}</td>
                      <td>{value?.[15]?.G4}</td>
                      <td>{value?.[15]?.G5}</td>
                      <td>{value?.[15]?.G6}</td>
                      <td>{value?.[15]?.G7}</td>
                      <td>{value?.[15]?.G8}</td>
                      <td>{value?.[15]?.G9}</td>
                      <td>{value?.[15]?.G10}</td>
                      <td>{value?.[15]?.remark}</td>
                      <td>{value?.[15]?.action}</td>
                      <td>{value?.[15]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td className="text-start">Concession Lamp test</td>
                      <td>{value?.[16]?.G1}</td>
                      <td>{value?.[16]?.G2}</td>
                      <td>{value?.[16]?.G3}</td>
                      <td>{value?.[16]?.G4}</td>
                      <td>{value?.[16]?.G5}</td>
                      <td>{value?.[16]?.G6}</td>
                      <td>{value?.[16]?.G7}</td>
                      <td>{value?.[16]?.G8}</td>
                      <td>{value?.[16]?.G9}</td>
                      <td>{value?.[16]?.G10}</td>
                      <td>{value?.[16]?.remark}</td>
                      <td>{value?.[16]?.action}</td>
                      <td>{value?.[16]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td className="text-start">
                        Gate Test (Sector Door Test)
                      </td>
                      <td>{value?.[17]?.G1}</td>
                      <td>{value?.[17]?.G2}</td>
                      <td>{value?.[17]?.G3}</td>
                      <td>{value?.[17]?.G4}</td>
                      <td>{value?.[17]?.G5}</td>
                      <td>{value?.[17]?.G6}</td>
                      <td>{value?.[17]?.G7}</td>
                      <td>{value?.[17]?.G8}</td>
                      <td>{value?.[17]?.G9}</td>
                      <td>{value?.[17]?.G10}</td>
                      <td>{value?.[17]?.remark}</td>
                      <td>{value?.[17]?.action}</td>
                      <td>{value?.[17]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td className="text-start">End Display Test</td>
                      <td>{value?.[18]?.G1}</td>
                      <td>{value?.[18]?.G2}</td>
                      <td>{value?.[18]?.G3}</td>
                      <td>{value?.[18]?.G4}</td>
                      <td>{value?.[18]?.G5}</td>
                      <td>{value?.[18]?.G6}</td>
                      <td>{value?.[18]?.G7}</td>
                      <td>{value?.[18]?.G8}</td>
                      <td>{value?.[18]?.G9}</td>
                      <td>{value?.[18]?.G10}</td>
                      <td>{value?.[18]?.remark}</td>
                      <td>{value?.[18]?.action}</td>
                      <td>{value?.[18]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td className="text-start">Sensor Test</td>
                      <td>{value?.[19]?.G1}</td>
                      <td>{value?.[19]?.G2}</td>
                      <td>{value?.[19]?.G3}</td>
                      <td>{value?.[19]?.G4}</td>
                      <td>{value?.[19]?.G5}</td>
                      <td>{value?.[19]?.G6}</td>
                      <td>{value?.[19]?.G7}</td>
                      <td>{value?.[19]?.G8}</td>
                      <td>{value?.[19]?.G9}</td>
                      <td>{value?.[19]?.G10}</td>
                      <td>{value?.[19]?.remark}</td>
                      <td>{value?.[19]?.action}</td>
                      <td>{value?.[19]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td className="text-start">
                        Token Slot Test - Bowl Test
                      </td>
                      <td>{value?.[20]?.G1}</td>
                      <td>{value?.[20]?.G2}</td>
                      <td>{value?.[20]?.G3}</td>
                      <td>{value?.[20]?.G4}</td>
                      <td>{value?.[20]?.G5}</td>
                      <td>{value?.[20]?.G6}</td>
                      <td>{value?.[20]?.G7}</td>
                      <td>{value?.[20]?.G8}</td>
                      <td>{value?.[20]?.G9}</td>
                      <td>{value?.[20]?.G10}</td>
                      <td>{value?.[20]?.remark}</td>
                      <td>{value?.[20]?.action}</td>
                      <td>{value?.[20]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>22</td>
                      <td className="text-start">
                        Token Slot Test - Left Containet Test
                      </td>
                      <td>{value?.[21]?.G1}</td>
                      <td>{value?.[21]?.G2}</td>
                      <td>{value?.[21]?.G3}</td>
                      <td>{value?.[21]?.G4}</td>
                      <td>{value?.[21]?.G5}</td>
                      <td>{value?.[21]?.G6}</td>
                      <td>{value?.[21]?.G7}</td>
                      <td>{value?.[21]?.G8}</td>
                      <td>{value?.[21]?.G9}</td>
                      <td>{value?.[21]?.G10}</td>
                      <td>{value?.[21]?.remark}</td>
                      <td>{value?.[21]?.action}</td>
                      <td>{value?.[21]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td className="text-start">
                        {" "}
                        Token Slot Test - Right Containet Test
                      </td>
                      <td>{value?.[22]?.G1}</td>
                      <td>{value?.[22]?.G2}</td>
                      <td>{value?.[22]?.G3}</td>
                      <td>{value?.[22]?.G4}</td>
                      <td>{value?.[22]?.G5}</td>
                      <td>{value?.[22]?.G6}</td>
                      <td>{value?.[22]?.G7}</td>
                      <td>{value?.[22]?.G8}</td>
                      <td>{value?.[22]?.G9}</td>
                      <td>{value?.[22]?.G10}</td>
                      <td>{value?.[22]?.remark}</td>
                      <td>{value?.[22]?.action}</td>
                      <td>{value?.[22]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td className="text-start">
                        Token Bowl Test - Light Test
                      </td>
                      <td>{value?.[23]?.G1}</td>
                      <td>{value?.[23]?.G2}</td>
                      <td>{value?.[23]?.G3}</td>
                      <td>{value?.[23]?.G4}</td>
                      <td>{value?.[23]?.G5}</td>
                      <td>{value?.[23]?.G6}</td>
                      <td>{value?.[23]?.G7}</td>
                      <td>{value?.[23]?.G8}</td>
                      <td>{value?.[23]?.G9}</td>
                      <td>{value?.[23]?.G10}</td>
                      <td>{value?.[23]?.remark}</td>
                      <td>{value?.[23]?.action}</td>
                      <td>{value?.[23]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td className="text-start">
                        Token Bowl Test - Door Test
                      </td>
                      <td>{value?.[24]?.G1}</td>
                      <td>{value?.[24]?.G2}</td>
                      <td>{value?.[24]?.G3}</td>
                      <td>{value?.[24]?.G4}</td>
                      <td>{value?.[24]?.G5}</td>
                      <td>{value?.[24]?.G6}</td>
                      <td>{value?.[24]?.G7}</td>
                      <td>{value?.[24]?.G8}</td>
                      <td>{value?.[24]?.G9}</td>
                      <td>{value?.[24]?.G10}</td>
                      <td>{value?.[24]?.remark}</td>
                      <td>{value?.[24]?.action}</td>
                      <td>{value?.[24]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>26</td>
                      <td className="text-start"> Front Door Test</td>
                      <td>{value?.[25]?.G1}</td>
                      <td>{value?.[25]?.G2}</td>
                      <td>{value?.[25]?.G3}</td>
                      <td>{value?.[25]?.G4}</td>
                      <td>{value?.[25]?.G5}</td>
                      <td>{value?.[25]?.G6}</td>
                      <td>{value?.[25]?.G7}</td>
                      <td>{value?.[25]?.G8}</td>
                      <td>{value?.[25]?.G9}</td>
                      <td>{value?.[25]?.G10}</td>
                      <td>{value?.[25]?.remark}</td>
                      <td>{value?.[25]?.action}</td>
                      <td>{value?.[25]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>27</td>
                      <td className="text-start">
                        Power Management Unit (PMU) Test
                      </td>
                      <td>{value?.[26]?.G1}</td>
                      <td>{value?.[26]?.G2}</td>
                      <td>{value?.[26]?.G3}</td>
                      <td>{value?.[26]?.G4}</td>
                      <td>{value?.[26]?.G5}</td>
                      <td>{value?.[26]?.G6}</td>
                      <td>{value?.[26]?.G7}</td>
                      <td>{value?.[26]?.G8}</td>
                      <td>{value?.[26]?.G9}</td>
                      <td>{value?.[26]?.G10}</td>
                      <td>{value?.[26]?.remark}</td>
                      <td>{value?.[26]?.action}</td>
                      <td>{value?.[26]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>28</td>
                      <td className="text-start">Card Reader Test</td>
                      <td>{value?.[27]?.G1}</td>
                      <td>{value?.[27]?.G2}</td>
                      <td>{value?.[27]?.G3}</td>
                      <td>{value?.[27]?.G4}</td>
                      <td>{value?.[27]?.G5}</td>
                      <td>{value?.[27]?.G6}</td>
                      <td>{value?.[27]?.G7}</td>
                      <td>{value?.[27]?.G8}</td>
                      <td>{value?.[27]?.G9}</td>
                      <td>{value?.[27]?.G10}</td>
                      <td>{value?.[27]?.remark}</td>
                      <td>{value?.[27]?.action}</td>
                      <td>{value?.[27]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>29</td>
                      <td className="text-start">Return Cup LED Test</td>
                      <td>{value?.[28]?.G1}</td>
                      <td>{value?.[28]?.G2}</td>
                      <td>{value?.[28]?.G3}</td>
                      <td>{value?.[28]?.G4}</td>
                      <td>{value?.[28]?.G5}</td>
                      <td>{value?.[28]?.G6}</td>
                      <td>{value?.[28]?.G7}</td>
                      <td>{value?.[28]?.G8}</td>
                      <td>{value?.[28]?.G9}</td>
                      <td>{value?.[28]?.G10}</td>
                      <td>{value?.[28]?.remark}</td>
                      <td>{value?.[28]?.action}</td>
                      <td>{value?.[28]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>30</td>
                      <td className="text-start"> Shutdown</td>
                      <td>{value?.[29]?.G1}</td>
                      <td>{value?.[29]?.G2}</td>
                      <td>{value?.[29]?.G3}</td>
                      <td>{value?.[29]?.G4}</td>
                      <td>{value?.[29]?.G5}</td>
                      <td>{value?.[29]?.G6}</td>
                      <td>{value?.[29]?.G7}</td>
                      <td>{value?.[29]?.G8}</td>
                      <td>{value?.[29]?.G9}</td>
                      <td>{value?.[29]?.G10}</td>
                      <td>{value?.[29]?.remark}</td>
                      <td>{value?.[29]?.action}</td>
                      <td>{value?.[29]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>31</td>
                      <td className="text-start">Reboot</td>
                      <td>{value?.[30]?.G1}</td>
                      <td>{value?.[30]?.G2}</td>
                      <td>{value?.[30]?.G3}</td>
                      <td>{value?.[30]?.G4}</td>
                      <td>{value?.[30]?.G5}</td>
                      <td>{value?.[30]?.G6}</td>
                      <td>{value?.[30]?.G7}</td>
                      <td>{value?.[30]?.G8}</td>
                      <td>{value?.[30]?.G9}</td>
                      <td>{value?.[30]?.G10}</td>
                      <td>{value?.[30]?.remark}</td>
                      <td>{value?.[30]?.action}</td>
                      <td>{value?.[30]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="text-start">32</td>
                      <td className="text-start">Operation Mode Test</td>
                      <td>{value?.[31]?.G1}</td>
                      <td>{value?.[31]?.G2}</td>
                      <td>{value?.[31]?.G3}</td>
                      <td>{value?.[31]?.G4}</td>
                      <td>{value?.[31]?.G5}</td>
                      <td>{value?.[31]?.G6}</td>
                      <td>{value?.[31]?.G7}</td>
                      <td>{value?.[31]?.G8}</td>
                      <td>{value?.[31]?.G9}</td>
                      <td>{value?.[31]?.G10}</td>
                      <td>{value?.[31]?.remark}</td>
                      <td>{value?.[31]?.action}</td>
                      <td>{value?.[31]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>33</td>
                      <td className="text-start">Special Mode test</td>
                      <td>{value?.[32]?.G1}</td>
                      <td>{value?.[32]?.G2}</td>
                      <td>{value?.[32]?.G3}</td>
                      <td>{value?.[32]?.G4}</td>
                      <td>{value?.[32]?.G5}</td>
                      <td>{value?.[32]?.G6}</td>
                      <td>{value?.[32]?.G7}</td>
                      <td>{value?.[32]?.G8}</td>
                      <td>{value?.[32]?.G9}</td>
                      <td>{value?.[32]?.G10}</td>
                      <td>{value?.[32]?.remark}</td>
                      <td>{value?.[32]?.action}</td>
                      <td>{value?.[32]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>34</td>
                      <td className="text-start">Token Container Test</td>
                      <td>{value?.[33]?.G1}</td>
                      <td>{value?.[33]?.G2}</td>
                      <td>{value?.[33]?.G3}</td>
                      <td>{value?.[33]?.G4}</td>
                      <td>{value?.[33]?.G5}</td>
                      <td>{value?.[33]?.G6}</td>
                      <td>{value?.[33]?.G7}</td>
                      <td>{value?.[33]?.G8}</td>
                      <td>{value?.[33]?.G9}</td>
                      <td>{value?.[33]?.G10}</td>
                      <td>{value?.[33]?.remark}</td>
                      <td>{value?.[33]?.action}</td>
                      <td>{value?.[33]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>35</td>
                      <td className="text-start">Gate Mode Test</td>
                      <td>{value?.[34]?.G1}</td>
                      <td>{value?.[34]?.G2}</td>
                      <td>{value?.[34]?.G3}</td>
                      <td>{value?.[34]?.G4}</td>
                      <td>{value?.[34]?.G5}</td>
                      <td>{value?.[34]?.G6}</td>
                      <td>{value?.[34]?.G7}</td>
                      <td>{value?.[34]?.G8}</td>
                      <td>{value?.[34]?.G9}</td>
                      <td>{value?.[34]?.G10}</td>
                      <td>{value?.[34]?.remark}</td>
                      <td>{value?.[34]?.action}</td>
                      <td>{value?.[34]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>36</td>
                      <td className="text-start">
                        Check operation and special mode for its default
                        position
                      </td>
                      <td>{value?.[35]?.G1}</td>
                      <td>{value?.[35]?.G2}</td>
                      <td>{value?.[35]?.G3}</td>
                      <td>{value?.[35]?.G4}</td>
                      <td>{value?.[35]?.G5}</td>
                      <td>{value?.[35]?.G6}</td>
                      <td>{value?.[35]?.G7}</td>
                      <td>{value?.[35]?.G8}</td>
                      <td>{value?.[35]?.G9}</td>
                      <td>{value?.[35]?.G10}</td>
                      <td>{value?.[35]?.remark}</td>
                      <td>{value?.[35]?.action}</td>
                      <td>{value?.[35]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>37</td>
                      <td rowSpan={2}>Emergency</td>
                      <td className="text-start"> Software - SC</td>
                      <td>{value?.[36]?.G1}</td>
                      <td>{value?.[36]?.G2}</td>
                      <td>{value?.[36]?.G3}</td>
                      <td>{value?.[36]?.G4}</td>
                      <td>{value?.[36]?.G5}</td>
                      <td>{value?.[36]?.G6}</td>
                      <td>{value?.[36]?.G7}</td>
                      <td>{value?.[36]?.G8}</td>
                      <td>{value?.[36]?.G9}</td>
                      <td>{value?.[36]?.G10}</td>
                      <td>{value?.[36]?.remark}</td>
                      <td>{value?.[36]?.action}</td>
                      <td>{value?.[36]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>38</td>
                      <td className="text-start">Master Push Button</td>
                      <td>{value?.[37]?.G1}</td>
                      <td>{value?.[37]?.G2}</td>
                      <td>{value?.[37]?.G3}</td>
                      <td>{value?.[37]?.G4}</td>
                      <td>{value?.[37]?.G5}</td>
                      <td>{value?.[37]?.G6}</td>
                      <td>{value?.[37]?.G7}</td>
                      <td>{value?.[37]?.G8}</td>
                      <td>{value?.[37]?.G9}</td>
                      <td>{value?.[37]?.G10}</td>
                      <td>{value?.[37]?.remark}</td>
                      <td>{value?.[37]?.action}</td>
                      <td>{value?.[37]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td colSpan={17}>
                        <div
                          style={{
                            width: "100%",
                            height: "5px",
                            backgroundColor: "#a5a5a5",
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Equipm ent</b>
                      </td>
                      <td>
                        <b>Sr. No.</b>
                      </td>
                      <td>
                        <b>Activity</b>
                      </td>
                      <td>
                        <b>DESCRIPTION OF WORK</b>
                      </td>
                      <td>
                        <b>SG</b>
                      </td>
                      <td>
                        <b>SG</b>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          writingMode: "vertical-lr",
                          textAlign: "center",
                          height: "120px",
                        }}
                      >
                        SWING BARRIER(Ref: O&M/TELE AFC/SOP/01)
                      </td>
                      <td>1</td>
                      <td>Visual Inspection</td>
                      <td className="text-start">
                        Check the serviceability and fitment
                      </td>
                      <td>{value2?.[0]?.SG1}</td>
                      <td>{value2?.[0]?.SG2}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{value2?.[0]?.remark}</td>
                      <td>{value2?.[0]?.action}</td>
                      <td>{value2?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td rowSpan={4} colspan={3}>
                        Staff on Duty
                      </td>
                      <td className="text-start">Name</td>
                      <td className="text-start" colspan={5}>
                        Desg
                      </td>
                      <td className="text-start" colSpan={5}>
                        {" "}
                        Sign
                      </td>
                    </tr>
                    <tr>
                      <td>{item.staff1_name}</td>
                      <td colspan={5}>{item.staff1_desg}</td>
                      <td colSpan={5}>{item.staff1_name}</td>
                    </tr>
                    <tr>
                      <td>{item.staff2_name}</td>
                      <td colspan={5}>{item.staff2_desg}</td>
                      <td colSpan={5}>{item.staff2_name}</td>
                    </tr>
                    <tr>
                      <td>{item.staff3_name}</td>
                      <td colspan={5}>{item.staff3_desg}</td>
                      <td colSpan={5}>{item.staff3_name}</td>
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

export default AFCMontylyList;
