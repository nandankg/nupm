import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  fetchData,
  saveData,
} from "../../reducer/monika/PmLogBookMainlineReducer";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useLocation, useNavigate } from "react-router-dom";

import { RiFileExcel2Fill } from "react-icons/ri";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const PmLogBookMainlineList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "PmLogBookMainlineList.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const PmLogBookMainlineList = useSelector((state) => state.PMbookMainline);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const itmm = PmLogBookMainlineList.data.data;

  console.log(PmLogBookMainlineList);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (PmLogBookMainlineList.data && PmLogBookMainlineList.data.data) {
      setItems(PmLogBookMainlineList.data.data);
      setSlug(PmLogBookMainlineList.slug);
      setFilteredItems(PmLogBookMainlineList.data.data);
    }
  }, [PmLogBookMainlineList]);

  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const station = row.station ? row.station.toLowerCase() : "";
      const esc_no = row.esc_no ? row.esc_no.toLowerCase() : "";
      const nameOfSc = row.name_of_sc ? row.name_of_sc.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;
      return (
        (station.includes(searchValue.toLowerCase()) ||
          esc_no.includes(searchValue.toLowerCase()) ||
          nameOfSc.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  // useEffect(() => {
  //   // Sync local storage with Redux store
  //   console.log("Updating local storage:", PmLogBookMainlineList);
  //   if (PmLogBookMainlineList?.length > 0) {
  //     localStorage.setItem(
  //       "PmLogBookMainlineList",
  //       JSON.stringify(PmLogBookMainlineList)
  //     );
  //   }
  // }, [PmLogBookMainlineList]);

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PM LogBook Mainline
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        {/* <h3>PM LogBook Mainline-4 List</h3>
        <span className="line-box"></span> */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-3">
              <Link to="">
                {/* <button className="btn btn-primary">
              <FaFilter />
            </button> */}
              </Link>
              <DownloadTableExcel
                filename="PmLogBooMainlinekList_table"
                sheet="PmLogBooMainlinekList_table"
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
                style={{
                  border: "1px solid #0baa9a",
                }}
              >
                <MdPictureAsPdf size={"25px"} color="#850d04" />
              </button>
            </div>
          </div>
        </div>

        {filteredData.map((item, index) => {
          const value = item?.activities;
          return (
            <>
              <div ref={targetRef}>
                <table ref={tableRef}>
                  <thead>
                    <tr>
                      <th className="text-start" colspan="3">
                        STN. NAME: {item?.stn_name}
                      </th>
                      <th className="text-start" colspan="2">
                        FREQUENCY: MONTHLY: {item?.frequency}
                      </th>
                      <th className="text-start" colspan="1">
                        Date: {item?.date}
                      </th>
                      <th className="text-start" colspan="6">
                        MONTH: {item?.month}
                      </th>
                    </tr>
                    <tr>
                      <th rowspan="6">Equipment</th>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan="5">TVM</th>
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
                        TVM(Ref:O&M/TELE-AFC/SOP/01)
                      </td>
                      <td>1</td>
                      <td rowSpan={9}>Visual Inspection</td>
                      <td className="text-start">
                        Check Fixing & Alignment of all modules of TVM
                      </td>

                      <td>{value?.[0]?.T1}</td>
                      <td>{value?.[0]?.T2}</td>
                      <td>{value?.[0]?.T3}</td>
                      <td>{value?.[0]?.T4}</td>
                      <td>{value?.[0]?.T5}</td>

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

                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td>{value?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">
                        Checking Silicon sealing of TVM Cabinet
                      </td>
                      <td>{value?.[2]?.T1}</td>
                      <td>{value?.[2]?.T2}</td>
                      <td>{value?.[2]?.T3}</td>
                      <td>{value?.[2]?.T4}</td>
                      <td>{value?.[2]?.T5}</td>

                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start">
                        Checking of any opening inside TVM cabinet
                      </td>
                      <td>{value?.[3]?.T1}</td>
                      <td>{value?.[3]?.T2}</td>
                      <td>{value?.[3]?.T3}</td>
                      <td>{value?.[3]?.T4}</td>
                      <td>{value?.[3]?.T5}</td>

                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td>{value?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        Checking of Power Supply and Battery
                      </td>
                      <td>{value?.[4]?.T1}</td>
                      <td>{value?.[4]?.T2}</td>
                      <td>{value?.[4]?.T3}</td>
                      <td>{value?.[4]?.T4}</td>
                      <td>{value?.[4]?.T5}</td>

                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start">Check Station ID</td>
                      <td>{value?.[5]?.T1}</td>
                      <td>{value?.[5]?.T2}</td>
                      <td>{value?.[5]?.T3}</td>
                      <td>{value?.[5]?.T4}</td>
                      <td>{value?.[5]?.T5}</td>

                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start">Check Device ID</td>
                      <td>{value?.[6]?.T1}</td>
                      <td>{value?.[6]?.T2}</td>
                      <td>{value?.[6]?.T3}</td>
                      <td>{value?.[6]?.T4}</td>
                      <td>{value?.[6]?.T5}</td>

                      <td>{value?.[6]?.remark}</td>
                      <td>{value?.[6]?.action}</td>
                      <td>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start">Check Date and Time</td>
                      <td>{value?.[7]?.T1}</td>
                      <td>{value?.[7]?.T2}</td>
                      <td>{value?.[7]?.T3}</td>
                      <td>{value?.[7]?.T4}</td>
                      <td>{value?.[7]?.T5}</td>

                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="text-start">
                        Check Passenger Information Display (PID)
                      </td>
                      <td>{value?.[7]?.T1}</td>
                      <td>{value?.[7]?.T2}</td>
                      <td>{value?.[7]?.T3}</td>
                      <td>{value?.[7]?.T4}</td>
                      <td>{value?.[7]?.T5}</td>
                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td rowSpan={7}>Cleaning</td>
                      <td className="text-start">
                        Cleaning of all modules of TVM
                      </td>
                      <td>{value?.[8]?.T1}</td>
                      <td>{value?.[8]?.T2}</td>
                      <td>{value?.[8]?.T3}</td>
                      <td>{value?.[8]?.T4}</td>
                      <td>{value?.[8]?.T5}</td>

                      <td>{value?.[8]?.remark}</td>
                      <td>{value?.[8]?.action}</td>
                      <td>{value?.[8]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="text-start">
                        Cleaning of lexan covering board of display
                      </td>
                      <td>{value?.[9]?.T1}</td>
                      <td>{value?.[9]?.T2}</td>
                      <td>{value?.[9]?.T3}</td>
                      <td>{value?.[9]?.T4}</td>
                      <td>{value?.[9]?.T5}</td>
                      <td>{value?.[9]?.remark}</td>
                      <td>{value?.[9]?.action}</td>
                      <td>{value?.[9]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="text-start">
                        Cleaning of Coin hopper opto sensor
                      </td>
                      <td>{value?.[10]?.T1}</td>
                      <td>{value?.[10]?.T2}</td>
                      <td>{value?.[10]?.T3}</td>
                      <td>{value?.[10]?.T4}</td>
                      <td>{value?.[10]?.T5}</td>
                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="text-start">Cleaning of Cooling fans</td>
                      <td>{value?.[10]?.T1}</td>
                      <td>{value?.[10]?.T2}</td>
                      <td>{value?.[10]?.T3}</td>
                      <td>{value?.[10]?.T4}</td>
                      <td>{value?.[10]?.T5}</td>
                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="text-start">
                        Checking and Cleaning of Cooling fan filter
                      </td>
                      <td>{value?.[10]?.T1}</td>
                      <td>{value?.[10]?.T2}</td>
                      <td>{value?.[10]?.T3}</td>
                      <td>{value?.[10]?.T4}</td>
                      <td>{value?.[10]?.T5}</td>
                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="text-start">Cleaning of BNR</td>
                      <td>{value?.[10]?.T1}</td>
                      <td>{value?.[10]?.T2}</td>
                      <td>{value?.[10]?.T3}</td>
                      <td>{value?.[10]?.T4}</td>
                      <td>{value?.[10]?.T5}</td>
                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td className="text-start">
                        Cleaning of Bank card reader
                      </td>
                      <td>{value?.[10]?.T1}</td>
                      <td>{value?.[10]?.T2}</td>
                      <td>{value?.[10]?.T3}</td>
                      <td>{value?.[10]?.T4}</td>

                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td rowSpan={11}>Module Test (Maintenance Menu)</td>
                      <td className="text-start">
                        Check LAN Status (Ping Server)
                      </td>
                      <td>{value?.[11]?.T1}</td>
                      <td>{value?.[11]?.T2}</td>
                      <td>{value?.[11]?.T3}</td>
                      <td>{value?.[11]?.T4}</td>
                      <td>{value?.[11]?.T5}</td>

                      <td>{value?.[11]?.remark}</td>
                      <td>{value?.[11]?.action}</td>
                      <td>{value?.[11]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td className="text-start">Component Status</td>
                      <td>{value?.[12]?.T1}</td>
                      <td>{value?.[12]?.T2}</td>
                      <td>{value?.[12]?.T3}</td>
                      <td>{value?.[12]?.T4}</td>
                      <td>{value?.[12]?.T5}</td>

                      <td>{value?.[12]?.remark}</td>
                      <td>{value?.[12]?.action}</td>
                      <td>{value?.[12]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td className="text-start">Token Dispenser Test</td>
                      <td>{value?.[13]?.T1}</td>
                      <td>{value?.[13]?.T2}</td>
                      <td>{value?.[13]?.T3}</td>
                      <td>{value?.[13]?.T4}</td>
                      <td>{value?.[13]?.T5}</td>

                      <td>{value?.[13]?.remark}</td>
                      <td>{value?.[13]?.action}</td>
                      <td>{value?.[13]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td className="text-start">Bank Note system Test</td>
                      <td>{value?.[14]?.T1}</td>
                      <td>{value?.[14]?.T2}</td>
                      <td>{value?.[14]?.T3}</td>
                      <td>{value?.[14]?.T4}</td>
                      <td>{value?.[14]?.T5}</td>

                      <td>{value?.[14]?.remark}</td>
                      <td>{value?.[14]?.action}</td>
                      <td>{value?.[14]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td className="text-start">Payment Terminal Test</td>
                      <td>{value?.[15]?.T1}</td>
                      <td>{value?.[15]?.T2}</td>
                      <td>{value?.[15]?.T3}</td>
                      <td>{value?.[15]?.T4}</td>
                      <td>{value?.[15]?.T5}</td>

                      <td>{value?.[15]?.remark}</td>
                      <td>{value?.[15]?.action}</td>
                      <td>{value?.[15]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>22</td>
                      <td className="text-start">Printer Test</td>
                      <td>{value?.[16]?.T1}</td>
                      <td>{value?.[16]?.T2}</td>
                      <td>{value?.[16]?.T3}</td>
                      <td>{value?.[16]?.T4}</td>
                      <td>{value?.[16]?.T5}</td>

                      <td>{value?.[16]?.remark}</td>
                      <td>{value?.[16]?.action}</td>
                      <td>{value?.[16]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td className="text-start">Audio Test</td>
                      <td>{value?.[17]?.T1}</td>
                      <td>{value?.[17]?.T2}</td>
                      <td>{value?.[17]?.T3}</td>
                      <td>{value?.[17]?.T4}</td>
                      <td>{value?.[17]?.T5}</td>

                      <td>{value?.[17]?.remark}</td>
                      <td>{value?.[17]?.action}</td>
                      <td>{value?.[17]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td className="text-start">Bowl LED Test</td>
                      <td>{value?.[18]?.T1}</td>
                      <td>{value?.[18]?.T2}</td>
                      <td>{value?.[18]?.T3}</td>
                      <td>{value?.[18]?.T4}</td>
                      <td>{value?.[18]?.T5}</td>

                      <td>{value?.[18]?.remark}</td>
                      <td>{value?.[18]?.action}</td>
                      <td>{value?.[18]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td className="text-start">Alarm Test</td>
                      <td>{value?.[19]?.T1}</td>
                      <td>{value?.[19]?.T2}</td>
                      <td>{value?.[19]?.T3}</td>
                      <td>{value?.[19]?.T4}</td>
                      <td>{value?.[19]?.T5}</td>

                      <td>{value?.[19]?.remark}</td>
                      <td>{value?.[19]?.action}</td>
                      <td>{value?.[19]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>26</td>
                      <td className="text-start">Alarm Test</td>
                      <td>{value?.[20]?.T1}</td>
                      <td>{value?.[20]?.T2}</td>
                      <td>{value?.[20]?.T3}</td>
                      <td>{value?.[20]?.T4}</td>
                      <td>{value?.[20]?.T5}</td>

                      <td>{value?.[20]?.remark}</td>
                      <td>{value?.[20]?.action}</td>
                      <td>{value?.[20]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>27</td>
                      <td className="text-start">Card Reader Test</td>
                      <td>{value?.[21]?.T1}</td>
                      <td>{value?.[21]?.T2}</td>
                      <td>{value?.[21]?.T3}</td>
                      <td>{value?.[21]?.T4}</td>
                      <td>{value?.[21]?.T5}</td>

                      <td>{value?.[21]?.remark}</td>
                      <td>{value?.[21]?.action}</td>
                      <td>{value?.[21]?.deficiency}</td>
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
                      <td rowSpan={4} colspan={2}>
                        Staff on Duty
                      </td>
                      <td className="text-start">Name</td>
                      <td className="text-start" colspan={3}>
                        Desg
                      </td>
                      {/* <td className="text-start" colSpan={2}>
                        Sign
                      </td> */}
                    </tr>
                    <tr>
                      <td className="text-start">{item.staff1_name}</td>
                      <td className="text-start" colspan={3}>
                        {item.staff1_desg}
                      </td>
                      {/* <td className="text-start" colSpan={2}>
                        {item.staff1_sign}
                      </td> */}
                    </tr>
                    <tr>
                      <td className="text-start">{item.staff2_name}</td>
                      <td className="text-start" colspan={3}>
                        {item.staff2_desg}
                      </td>
                      {/* <td className="text-start" colSpan={2}>
                        {item.staff2_sign}
                      </td> */}
                    </tr>
                    <tr>
                      <td className="text-start">{item.staff3_name}</td>
                      <td className="text-start" colspan={3}>
                        {item.staff3_desg}
                      </td>
                      {/* <td className="text-start" colSpan={2}>
                        {item.staff3_sign}
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
              <td className=" ">
                {item.status === "0" || user?.role == "Admin" ? (
                  <div className="d-flex gap-2">
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

export default PmLogBookMainlineList;
