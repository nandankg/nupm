import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import {
  adddeportform,
  fetchData,
  saveData,
} from "../reducer/DepotyearlyReducer";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const DeployFormList = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const dispatch = useDispatch();
  const deportyearly = useSelector((state) => state.deportstate || []);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "Deport Yearly.pdf",
  });
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);
  const location = useLocation();
  const { id } = location.state;

  console.log(deportyearly);
  console.log(deportyearly.data.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const itmm = deportyearly.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }

  useEffect(() => {
    if (deportyearly.data && deportyearly.data.data) {
      setItems(deportyearly.data.data);

      setFilteredItems(deportyearly.data.data);
    }
  }, [deportyearly]);

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  console.log(items);

  const actionone = [
    {
      system: "PAS",
      activity: "1.Check emergency message priority sequence.",
    },
    {
      system: "PAS",
      activity: "a. Announcement from PSB overrides SCR HMI Emergency messages",
    },
    {
      system: "PAS",
      activity:
        "b. DCC HMI emergency announcement overrides OCC emergency messages",
    },
    {
      system: "PAS",
      activity:
        "2. Perform the Internal cleaning of amplifiers with shutting down of necessary equipments ",
    },
    {
      system: "PAS",
      activity: "3. Take the backup of NCO and QSC",
    },
    {
      system: "CCTV",
      activity: "1. Perform the Internal Cleaning of CCTV HMI & SECURITY HMI.",
    },
    {
      system: "CCTV",
      activity: "2.Check the station level ring verification",
    },
    {
      system: "CCTV",
      activity: "3. Perform the Internal Cleaning of NVR",
    },
    {
      system: "CCTV",
      activity: "4.Take Backup all Access Switch ",
    },
    {
      system: "FOTS",
      activity:
        "1.Checking of fiber continuity and fiber loss for dark fibers, using OTDR/Power- Source Meter. Record the values in Fiber loss sheet.",
    },
    {
      system: "FOTS",
      activity: "2.Take the backup of All DSW and ASW",
    },
    {
      system: "TELEPHONE",
      activity:
        "1.Internal cleaning of EPABX cabinet by shutting down completely",
    },
    {
      system: "TELEPHONE",
      activity: "2. Internal cleaning of IPBX server",
    },
    {
      system: "TELEPHONE",
      activity: "3.Take the backup of IPBX and Media Gateway",
    },
    {
      system: "ACDB",
      activity: "1.Check for Correctness/ tightness of MCBs.",
    },
    {
      system: "ACDB",
      activity:
        "2.Measure the Output Voltages and observe for any Abnormalities.",
    },
    {
      system: "UPS",
      activity:
        "1.Internal cleaning of Cubical of UPS System(ATS,UPS-1,UPS2,SCVS,ACDB)",
    },
    {
      system: "UPS",
      activity: "2.Check parameters of UPS from Display Panel",
    },
    {
      system: "SMPS",
      activity: "1.Internal cleaning all Module of SMPS",
    },
    {
      system: "SMPS",
      activity: "2.Check parameters of SMPS from Display Panel",
    },
    {
      system: "VIDEOWALL",
      activity: "1.Internal cleaning all Module of videowall",
    },
    {
      system: "VIDEOWALL",
      activity: "2.Take the backup of controllers",
    },
    {
      system: "VIDEOWALL",
      activity: "3.Check the redundancy functional status",
    },
    {
      system: "EARTHING",
      activity: "1.Measurement of clean earth resistance",
    },
    {
      system: "EARTHING",
      activity:
        "2.Checking of Earthing continuity and Maintenance of earth pits",
    },
    {
      system: "IBS",
      activity: "1.Visual Inspection of MU & RU",
    },
    {
      system: "IBS",
      activity: "2. RF Power measurment",
    },
    {
      system: "IBS",
      activity: "3.Check the redundancy paths functional status",
    },
    {
      system: "RADIO",
      activity: "1.Base Radio RF test",
    },
  ];
  const actiontwo = [
    {
      system: " RADIO",
      activity: "a.Tx Frequency (Mhz) ",
    },
    {
      system: " RADIO",
      activity: "b.Rx Frequency (Mhz)",
    },
    {
      system: " RADIO",
      activity: "c. Forward power",
    },
    {
      system: " RADIO",
      activity: "d.Reflected power",
    },
    {
      system: " RADIO",
      activity: "e.VSWR",
    },
  ];
  const actionthree = [
    {
      system: "RADIO",
      activity: "2.Take the backup of MTS-4",
    },
    {
      system: "QAIT",
      activity: "1.Take the backup of OAIT Switch",
    },
  ];

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              Deport Maintenance (yearly)
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> Deport Maintenance (Yearly) Schedule </h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* <input
            type="search"
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Here."
          /> */}
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-3">
              <Link to="">
                {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
              </Link>
              <DownloadTableExcel
                filename="DeportYearly_table"
                sheet="DeportYearly_table"
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
          {filteredData?.map((item, indexsc) => (
            <div ref={tableRef} key={indexsc}>
              <table>
                <thead>
                  <tr>
                    <th className="text-start" colspan="4">
                      STATION : {item?.station}
                    </th>
                    <th className="text-end ml-5" colspan={5}>
                      DOC: Annexure-V, Version:1.0
                    </th>
                  </tr>
                  <tr>
                    <th className="text-start" colspan="4">
                      YEARLY MAINTENANCE SCHEDULE
                    </th>
                    <th className="text-end ml-5" colspan={5}>
                      DOCUMENT:O&M/Tele/CH04
                    </th>
                  </tr>
                  <tr>
                    <th>System</th>
                    <th colspan={2}>Activity</th>
                    <th colspan={2}>Checkbox</th>
                    <th colspan={3}>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {item.activities1.map((activities, index) => (
                    <tr key={`row1-${index}`}>
                      {index === 0 ? <td rowSpan={5}>PAS</td> : " "}
                      {index === 5 ? <td rowSpan={4}>CCTV</td> : " "}
                      {index === 9 ? <td rowSpan={2}>FOTS</td> : " "}
                      {index === 11 ? <td rowSpan={3}>TELEPHONE</td> : " "}
                      {index === 14 ? <td rowSpan={2}>ACDB</td> : " "}
                      {index === 16 ? <td rowSpan={2}>UPS</td> : " "}
                      {index === 18 ? <td rowSpan={2}>SMPS</td> : " "}
                      {index === 20 ? <td rowSpan={3}>VIDEOWALL</td> : " "}
                      {index === 23 ? <td rowSpan={2}>EARTHING</td> : " "}
                      {index === 25 ? <td rowSpan={3}>IBS</td> : " "}
                      {index === 28 ? <td>RADIO</td> : " "}
                      <td colspan={2} className="text-start">
                        {actionone[index].activity}
                      </td>
                      <td colSpan={2}>{activities.ch1}</td>
                      <td colspan={3}>{activities.remark}</td>

                      {index === 29 ? <td>RADIO</td> : " "}
                    </tr>
                  ))}

                  <tr>
                    <td rowSpan={6}>RADIO</td>
                    <th colspan={2}>Equipment</th>
                    <th>BR1</th>
                    <th>BR2</th>
                    <th colspan={3}>Remark</th>
                  </tr>
                  {item.activities2.map((activities, index) => (
                    <tr key={`row1-${index}`}>
                      <td className="text-start" colspan={2}>
                        {actiontwo[index].activity}
                      </td>
                      <td>{activities.BR1}</td>
                      <td>{activities.BR2}</td>
                      <td colspan={3}>{activities.remark2}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <th colspan={2}>Activity</th>
                    <th colspan={2}>Checkbox</th>
                    <th colspan={3}>Remark</th>
                  </tr>
                  {item.activities3.map((activities, index) => (
                    <tr key={`row1-${index}`}>
                      <>
                        {index === 0 ? <td>RADIO</td> : " "}

                        {index === 1 ? <td>OAIT</td> : " "}
                        <td colspan={2} className="text-start">
                          {actionthree[index].activity}
                        </td>
                        <td colspan={2}>{activities.ch3}</td>
                        <td colspan={3}>{activities.remark3}</td>
                      </>
                    </tr>
                  ))}

                  <tr>
                    <th colspan={8}>NOTES</th>
                  </tr>
                  <tr>
                    <td colspan={8}> {item?.notes}</td>
                  </tr>
                  <tr>
                    <th>Supervisor Name:- </th>
                    <td style={{ width: "250px" }}>{item?.SName}</td>
                    {/* <th style={{ width: "250px" }}>Signature:- </th>
                    <td style={{ width: "250px" }}>{item?.Ssignature}</td> */}
                    <th style={{ width: "250px" }}>Emp ID:- </th>
                    <td style={{ width: "250px" }}>{item?.SempId}</td>
                    <th style={{ width: "150px" }}>Date and Time:-</th>
                    <td style={{ width: "150px" }}>{item?.SdateTime}</td>
                  </tr>
                  <tr>
                    <th>Maintainer Name:- </th>
                    <td>{item?.MName}</td>
                    {/* <th>Signature:- </th>
                    <td>{item?.Msignature}</td> */}
                    <th>Emp ID:- </th>
                    <td>{item?.MempId}</td>
                    <th>Date and Time:-</th>
                    <td>{item?.MdateTime}</td>
                  </tr>
                </tbody>
                <tr>
                  <td className=" " colSpan={13}>
                    {item.status === "0" || user.role === "Admin" ? (
                      <div>
                        <Link
                          to={`/edit/${slug}`}
                          state={{ id: item.id }}
                          style={{ width: "120px", padding: "10px" }}
                          className="btn btn-primary align-content-center mx-3"
                        >
                          Edit
                        </Link>
                        <button
                          type="submit"
                          onClick={() => {
                            handleSave(item.id);
                          }}
                          style={{ width: "120px", padding: "10px" }}
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DeployFormList;
