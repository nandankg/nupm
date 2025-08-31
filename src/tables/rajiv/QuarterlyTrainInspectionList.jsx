import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  fetchData,
  saveData,
} from "../../reducer/rajiv/QuarterlyTrainInspection";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SignLanguageRounded } from "@mui/icons-material";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function QuarterlyTrainInspectionList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const list = useSelector((state) => state.TrainInspection);
  const user = JSON.parse(localStorage.getItem("userdata"));

  const quarterlyActivities1 = [
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity:
        "Genreal Condition of Metallic Support for fixing Dampers with Train Body",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity:
        "TTightness of all screws and fixing of Metallic Support with train body",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity: "Physical Condition of Dampers",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity:
        "Tightness of all screws & fixing of Dampers with the Metallic support (Torque 19Nm) ",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity: "Screws lengths inside the dampers (must be <5mm)",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity:
        "Tightness of all screws & Fixing of dampers with Lateral plates (Torque 19Nm)",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity:
        "Fixing of STF-DL Antenna with the lateral plates & tightness of all screws (Torque 21Nm)",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity:
        "Locking of the screws  & availability  of lock washers : “Nord-",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity: "Physical Condition of STF-DL Antenna",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity:
        "Fixing of grounding braid to the conductor point on the support",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity: "Tightness of SAIB connector (STF-DL Antenna side)",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity: "Tightness of SAIB connector (Car Body Side)",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity: "Clamping of jumper cable",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity:
        "STF-DL Antenna height from Rail Level Nominal=180 mm [105mm<Expected<225mm]",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity: "Lateral Gap[Less than +/- 60 mm]",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity: "Status of Tilting,Pitching & Yawning ",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity: "Object Free Zone around antenna [Dmin< 50mm]",
    },
    {
      category: "I) Underframe STF-DL Antenna Inspection",
      activity:
        "General Condition of STF-DL inter car jumper connector & jumper Cable (DMC-TC)",
    },
  ];
  const quarterlyActivities2 = [
    {
      category: "II) Underframe Odometer Inspection",
      activity: "Physical Condition of Odometer",
    },
    {
      category: "II) Underframe Odometer Inspection",
      activity: "Physical Condition of Odometer Cable",
    },
    {
      category: "II) Underframe Odometer Inspection",
      activity: "Fixing & tightness all Allen screws of odometer (Torque32",
    },
    {
      category: "II) Underframe Odometer Inspection",
      activity:
        "General Condition of odometer inter car jumper connector & jumper Cable (DMC-TC)",
    },
  ];
  const range = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "Quarterly Train Inspection.pdf",
  });
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const [slug, setSlug] = useState(getLastParameter().trim());
  useEffect(() => {
    if (list.data && list.data.data) {
      setItems(list.data.data);

      setFilteredItems(list.data.data);
    }
  }, [list]);

  const itmm = list.data.data;
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
  console.log(items);

  return (
    <div className="container" style={{ maxWidth: "98%" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Quarterly On-board ATC Underframe Inspection{" "}
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
                // value={fromDate}
                // onChange={(newValue) => setFromDate(newValue.startOf("day"))}
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
                // value={toDate}
                // onChange={(newValue) => setToDate(newValue.endOf("day"))}
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
              filename="Quarterly On-board_table"
              sheet="Quarterly On-board_table"
              currentTableRef={tableRef.current}
            >
              <button className="btn" style={{ border: "1px solid #0baa9a " }}>
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
      <div>
        <div ref={targetRef}>
          {filteredData?.map((data) => {
            return (
              <>
                <table className="table" ref={tableRef}>
                  <thead>
                    <tr>
                      <th colSpan={9} className="text-start">
                        Revision - 00
                      </th>
                      <th>O&M/SIGNAL/ATC/PM/LOGBOOK/20</th>
                    </tr>
                    <tr>
                      <th colSpan={10}>
                        Quarterly On-board ATC Underframe Inspection{" "}
                      </th>
                    </tr>
                    <tr>
                      <th rowSpan={3}>Train Set</th>
                      <th rowSpan={3} className="text-start">
                        {data?.trainSet}
                      </th>
                      <th colSpan={2}>JAN-MAR</th>
                      <th colSpan={2}>APR-JUN</th>
                      <th colSpan={2}>JUL-SEP</th>
                      <th colSpan={2}>OCT-DEC</th>
                    </tr>
                    <tr>
                      <th colSpan={2}>
                        Date -{" "}
                        {data?.quarterly1[0].range == "Jan-Mar"
                          ? data?.date
                          : ""}
                      </th>
                      <th colSpan={2}>
                        Date -{" "}
                        {data?.quarterly1[0].range == "Apr-Jun"
                          ? data?.date
                          : ""}
                      </th>
                      <th colSpan={2}>
                        Date -{" "}
                        {data?.quarterly1[0].range == "Jul-Sep"
                          ? data?.date
                          : ""}
                      </th>
                      <th colSpan={2}>
                        Date -{" "}
                        {data?.quarterly1[0].range == "Oct-Dec"
                          ? data?.date
                          : ""}
                      </th>
                    </tr>
                    <tr>
                      <th>CC1</th>
                      <th>CC2</th>
                      <th>CC1</th>
                      <th>CC2</th>
                      <th>CC1</th>
                      <th>CC2</th>
                      <th>CC1</th>
                      <th>CC2</th>
                    </tr>

                    <tr>
                      <th>Sr.No</th>
                      <th>Activity: ATC On-board Inspection-Underframe</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* activity 1  */}
                    <tr>
                      <td className="text-start" colSpan={2}>
                        <b> I) Underframe STF-DL Antenna Inspection </b>{" "}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    {quarterlyActivities1?.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td className="text-start"> {item.activity}</td>
                          {range?.map((range) => (
                            <>
                              {data?.quarterly1[index]?.range == range ? (
                                <>
                                  <td>{data.quarterly1[index].CC1}</td>
                                  <td>{data.quarterly1[index].CC2}</td>
                                </>
                              ) : (
                                <>
                                  <td></td>
                                  <td></td>
                                </>
                              )}
                            </>
                          ))}
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan={2} className="text-start">
                        Remarks , if any : {data?.qActivity1Remarks}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    {/* activity 2  */}
                    <tr>
                      <td className="text-start" colSpan={2}>
                        <b>II) Underframe Odometer Inspection</b>{" "}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    {quarterlyActivities2?.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td className="text-start"> {item.activity}</td>
                          {range?.map((range) => (
                            <>
                              {data?.quarterly2[index]?.range == range ? (
                                <>
                                  <td>{data.quarterly2[index].CC1}</td>
                                  <td>{data.quarterly2[index].CC2}</td>
                                </>
                              ) : (
                                <>
                                  <td></td>
                                  <td></td>
                                </>
                              )}
                            </>
                          ))}
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan={2} className="text-start">
                        Remarks , if any : {data?.qActivity2Remarks}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    {/* <tr>
                      <td colSpan={2} className="text-start">
                        Signature : {data?.signature}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr> */}
                    <tr>
                      <td colSpan={2} className="text-start">
                        Name to Supervisor : {data?.name}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-start">
                        Designation : {data?.designation}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-start">
                        Emp ID : {data?.employee_id}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-start">
                        Counter Signature : {data?.csign}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <td className="d-flex gap-3 mt-3 justify-content-end">
                  {data.status === "0" || user?.role == "Admin" ? (
                    <div className="d-flex ">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: data.id }}
                        className="btn btn-primary align-content-center mx-3"
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(data.id);
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
    </div>
  );
}

export default QuarterlyTrainInspectionList;
