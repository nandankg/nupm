import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addUpdatePMOccBcc,
  fetchData,
  saveData,
} from "../reducer/Update_Check_List_PM_occ_bcc_Red";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const Update_PM_Occ_Bcc_List = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "Tele System CheckList_Occ_Bcc.pdf",
  });
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [fromDate, setFromdate] = useState();
  const [toDate, setTodate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const add = useSelector((state) => state.updatepmoccbcc || []);

  const [items, setItems] = useState([]);
  console.log(add.data.data);

  console.log(slug);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const itmm = add.data.data;
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }

  useEffect(() => {
    if (add.data && add.data.data) {
      setItems(add.data.data);

      setFilteredItems(add.data.data);
    }
  }, [add]);
  //mmnnn
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };

  console.log(items);

  const action = [
    {
      system: "PAS-PIDS",
      Description: "1.Checking of OCC/BCC Controller HMI",
    },
    {
      system: "PAS-PIDS",
      Description: "2.Checking of PAS equipment in CER",
    },
    {
      system: "PAS-PIDS",
      Description: "3.Monitor of Alarms in NMS",
    },
    {
      system: "FOTS",
      Description: "1.Check for alarm indications in Core SW",
    },
    {
      system: "FOTS",
      Description: "2. Observe Working of Systems in NMS",
    },
    {
      system: "FOTS",
      Description: "3.Visual Inspection of LED Status of DSW & ASW",
    },
    {
      system: "FOTS",
      Description: "4.Monitor of Alarms in NMS",
    },
    {
      system: "CCTV",
      Description: "1.Check camera in operator clients",
    },
    {
      system: "CCTV",
      Description: "2.Check CLSTR,ENTZ,BVMS-1,BVMS-2 and its HDD LED status",
    },
    {
      system: "CCTV",
      Description: "3.Check and clear alarms in CCTV HMI",
    },
    {
      system: "CCTV",
      Description:
        "4.Monitoring of System Using Configuration Client Application",
    },
    {
      system: "Clock",
      Description: "1.Observe the Working of NMS system",
    },
    {
      system: "Clock",
      Description: "2. Visual Inspection of MCLK",
    },
    {
      system: "Clock",
      Description: "3.Monitor of Alarms in NMS",
    },
    {
      system: "Radio/CAD",
      Description:
        "1.Check working of RCP and HP in BCC Theatre by making test call",
    },
    {
      system: "Radio/CAD",
      Description: "2.Monitor RCW and check Status of Interface Icons",
    },
    {
      system: "Radio/CAD",
      Description: "3.Monitor of Alarms in NMS",
    },
    {
      system: "Radio/CAD",
      Description: "4.Check All equipmets in MSO Rack",
    },
    {
      system: "Radio/CAD",
      Description: "5.Check All equipmets in Radio-CAD Rack",
    },
    {
      system: "Radio/CAD",
      Description: "6.Check AVLS NMS",
    },
    {
      system: "Telephone",
      Description: "1. Check Internode and PRI Calls Functionality",
    },
    {
      system: "Telephone",
      Description: "2. Monitoring of Alarms in NMS",
    },
    {
      system: "Telephone",
      Description: "3. Observe the working of DLC of all OCC/BCC controller",
    },
    {
      system: "CDRS",
      Description: "1. Monitoring of Alarms in NMS",
    },
    {
      system: "CDRS",
      Description:
        "2. Check for availability of Recordings in PlayBack Station",
    },
    {
      system: "CDRS",
      Description: "3.Check the Status of CDRS Server(Telephone,Radio-PAS) ",
    },
    {
      system: "ACS",
      Description: "1.Check the Status of ACS Server ",
    },
    {
      system: "ACS",
      Description: "2.Monitoring of Alarms in NMS ",
    },
    {
      system: "IBS",
      Description: "1.Check the Status of IBS Server ",
    },
    {
      system: "IBS",
      Description: "2.Monitoring of Alarms in NMS ",
    },
    {
      system: "UPS & SMPS",
      Description: "1.Check the Status of UPS & SMPS Server",
    },
    {
      system: "UPS & SMPS",
      Description: "2.Monitoring of Alarms in NMS",
    },
    {
      system: "OAIT",
      Description: "1.Check the Status of OA/IT Server",
    },
    {
      system: "OAIT",
      Description: "2.Monitoring of Alarms in NMS",
    },
    {
      system: "AC Status",
      Description:
        "1.Check status of AC & Note CER and UPS(60KVA) Temperature (Maintained below 30°C)",
    },
  ];

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              Update PM List OCC & BCC
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> Update PM List OCC & BCC </h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between align-items-center">
          {/* <input
                        type="search"
                        name="search"
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search Here."
                    /> */}
          <div className="d-flex align-items-center gap-3 mt-3">
            <div className="d-flex gap-3">
              <Link to="">
                {/* <button className="btn btn-primary">
                                    <FaFilter />
                                </button> */}
              </Link>
              <DownloadTableExcel
                filename="Tele System CheckList_Occ_Bcc_table"
                sheet="Update_PM_Occ_Bcc_table"
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
        <div ref={targetRef}>
          {filteredData?.map((item, indexsc) => (
            <div ref={tableRef} key={indexsc}>
              <table>
                <thead>
                  <tr>
                    <th colSpan={6}>Location: BCC, OCC & CER</th>
                    <th colSpan={2}>DOC: Annexure-I, Version:1.0</th>
                  </tr>
                  <tr>
                    <th colSpan={8}>Daily Telecom Maintenance Checklist</th>
                  </tr>
                  <tr>
                    <th className="text-start" style={{ width: "5%" }}>
                      Sl. No
                    </th>
                    <th>System</th>
                    <th>Activity</th>
                    <th>Checkbox</th>
                    <th style={{ width: "10%" }}>Data</th>
                    <th style={{ width: "20%" }}>Remark</th>
                    <th>Emp_ID</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(item.systems)
                    ? item.systems.map((systems, index) => (
                        <React.Fragment key={`row-${index}`}>
                          <tr>
                            <td>{index + 1}</td>
                            {index === 0 ? <td rowSpan={3}>PAS-PIDS</td> : " "}
                            {index === 3 ? <td rowSpan={4}>FOTS</td> : ""}
                            {index === 7 ? <td rowSpan={4}>CCTV</td> : " "}
                            {index === 11 ? <td rowSpan={3}>Clock</td> : " "}
                            {index === 14 ? (
                              <td rowSpan={6}>Radio/CAD</td>
                            ) : (
                              " "
                            )}
                            {index === 20 ? (
                              <td rowSpan={3}>Telephone</td>
                            ) : (
                              " "
                            )}
                            {index === 23 ? <td rowSpan={3}>CDRS</td> : " "}
                            {index === 26 ? <td rowSpan={2}>ACS</td> : " "}
                            {index === 28 ? <td rowSpan={2}>IBS</td> : " "}
                            {index === 30 ? (
                              <td rowSpan={2}>UPS & SMPS</td>
                            ) : (
                              " "
                            )}
                            {index === 32 ? <td rowSpan={2}>OAIT</td> : " "}
                            {index === 34 ? (
                              <td rowSpan={2}>AC Status</td>
                            ) : (
                              " "
                            )}
                            <td className="text-start">
                              {" "}
                              {action[index] ? action[index].Description : ""}
                            </td>

                            <td>{systems.check}</td>
                            <td>{systems.date}</td>
                            <td>{systems.remark}</td>
                            <td>{systems.Emp_id}</td>
                          </tr>
                        </React.Fragment>
                      ))
                    : null}
                  <tr>
                    <th className=" text-start" colSpan={8}>
                      Name of SE/JE Verified : {item?.verifiedname}{" "}
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={8}>NOTES: </th>
                  </tr>

                  <tr>
                    <td colSpan={8}>{item?.notes}</td>
                  </tr>

                  <tr />
                  <tr>
                    <td colSpan={8} className=" ">
                      {item.status === "0" || user.role === "Admin" ? (
                        <div>
                          <Link
                            to={`/edit/${slug}`}
                            state={{ id: item.id }}
                            style={{
                              width: "120px",
                              padding: "14px",
                            }}
                            className="btn btn-primary align-content-center mx-3"
                          >
                            Edit
                          </Link>
                          <button
                            type="submit"
                            style={{
                              width: "120px",
                              padding: "14px",
                            }}
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
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Update_PM_Occ_Bcc_List;
