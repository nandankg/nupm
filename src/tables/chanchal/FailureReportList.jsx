import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addFailureReport,
  fetchData,
  saveData,
} from "../../reducer/chanchal/FailureReportReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaFilePdf } from "react-icons/fa6";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import PDFExportComponent from "../../component/PDFExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const FailureReportList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "FailureReportList.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const FailureReportList = useSelector((state) => state.failureReport);
  const [slug, setSlug] = useState(getLastParameter().trim());
  // const user = { role: "Admin" }; // Mock user object

  const itmm = FailureReportList.data.data;

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
    navigate(`list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/form/efr-register">
              EQUIPMENT FAILURE REPORT
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> EQUIPMENT FAILURE REPORT </h3>
        <span className="line-box"></span>

        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="FailureReport_table"
            sheet="FailureReport_table"
            currentTableRef={tableRef.current}
          >
            <button className="btn " style={{ border: "1px solid #0baa9a " }}>
              <RiFileExcel2Fill color="#0baa9a " size={25} />
            </button>
          </DownloadTableExcel>
          <PDFExportComponent
            contentId="section-to-export"
            filename="EQUIPMENTFAILURE.pdf"
          />
        </div>

        {filteredItems?.toReversed().map((item, index) => {
          const value = item?.work1;
          return (
            <>
              <div ref={targetRef} id="section-to-export">
                <table className="table" ref={tableRef}>
                  <thead>
                    <tr>
                      <th colSpan={7}>EQUIPMENT FAILURE REPORT</th>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold" rowSpan="1">
                        Serial Number of Faulty LRU
                      </td>
                      <td colSpan={6}>{item?.Faulty} </td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold" rowSpan="1">
                        Serial Number of newly installed LRU
                      </td>
                      <td colSpan={6}>{item?.Newly} </td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold" rowSpan="1">
                        Description of LRU(Make, Model & Part No.)
                      </td>
                      <td colSpan={6}>
                        {item?.Description}
                        {""}{" "}
                      </td>
                    </tr>
                    <tr className="text-start fw-bold">
                      <td rowSpan={2}>
                        Defect Detection Phase Tick one choice{" "}
                      </td>
                      <td colSpan="2">Failure Found During DLP</td>
                      <td colSpan="2">
                        Failure Found During Preventive Maintenance
                      </td>
                      <td colSpan="2">
                        Failure Found During Corrective Maintenance
                      </td>
					 
                    </tr>
					 <tr><td colSpan={2}>{item?.defect_detection==="Failure Found During DLP"?"True":"False"} </td>
                      <td colSpan={2}>{item?.defect_detection==="Failure Found During Preventive Maintenance"?"True":"False"} </td>
                      <td colSpan={2}>{item?.defect_detection==="Failure Found During Corrective Maintenance"?"True":"False"} </td></tr>
                  </thead>
                  <tbody>
                    <tr className="text-start fw-bold">
                      <td className="text-start" rowSpan={2}>
                        Sub System Tick one choice
                      </td>
                      <td colSpan="1">ATC CC </td>
                      <td colSpan="1">ATC T/S</td>
                      <td colSpan="1">IXL & PDU</td>
                      <td colSpan="1">ATS </td>
                      <td colSpan="1">DCS </td>
                      <td colSpan="1">MSS </td>
                    </tr>
                    <tr>
                      <td colSpan={1}>{item?.Cc} </td>
                      <td colSpan={1}>{item?.Ts} </td>
                      <td colSpan={1}>{item?.Ixl} </td>
                      <td colSpan={1}>{item?.Ats} </td>
                      <td colSpan={1}>{item?.Dcs} </td>
                      <td colSpan={1}>{item?.Mss} </td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold"> Station </td>
                      <td colSpan="2">{item?.station} </td>
                      <td className="text-start fw-bold"> Section </td>
                      <td colSpan="4">{item?.Section} </td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold"> Train Number </td>
                      <td colSpan="2">{item?.Train_no} </td>
                      <td className="text-start fw-bold">Cab Number </td>
                      <td colSpan="4">{item?.Cab_no} </td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold"> Incident Date </td>
                      <td colSpan="2">{item?.IncidentDate} </td>
                      <td className="text-start fw-bold"> Incident Time </td>
                      <td colSpan="4">{item?.IncidentTime} </td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold" colSpan={7}>
                        Description of fault mentioning complete gear id
                        details:
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start " colSpan={7}>
                        {item?.Details}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold" colSpan={7}>
                        Lab Remarks:
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={7}>
                        {item?.LabRemark}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold" colSpan={7}>
                        Store Remarks:
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start" colSpan={7}>
                        {item?.StoreRemark}{" "}
                      </td>
                    </tr>
                    <tr className="text-start fw-bold">
                      <td colSpan={3}>Returning Engineer </td>
                      <td colSpan={4}>Store-in-Charge </td>
                    </tr>
                    {/* <tr>
                    <td className="text-start fw-bold" colSpan={1}>
                      Signature:
                    </td>
                    <td colSpan={2}>{item.ReturnSign}</td>
                    <td className="text-start fw-bold" colSpan={1}>
                      Signature:
                    </td>
                    <td colSpan={3}>{item.StoreSign}</td>
                  </tr> */}
                    <tr>
                      <td className="text-start fw-bold" colSpan={1}>
                        Name:
                      </td>
                      <td colSpan={2}>{item.ReturnName}</td>
                      <td className="text-start fw-bold" colSpan={1}>
                        Name:
                      </td>
                      <td colSpan={3}>{item.StoreName}</td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold" colSpan={1}>
                        Designation:
                      </td>
                      <td colSpan={2}>{item.ReturnDesign}</td>
                      <td className="text-start fw-bold" colSpan={1}>
                        Designation:
                      </td>
                      <td colSpan={3}>{item.StoreDesign}</td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold" colSpan={1}>
                        Emp id:
                      </td>
                      <td colSpan={2}>{item.ReturnEmpId}</td>
                      <td className="text-start fw-bold" colSpan={1}>
                        Emp id:
                      </td>
                      <td colSpan={3}>{item.StoreEmpId}</td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold" colSpan={1}>
                        Date of Replacement:
                      </td>
                      <td colSpan={2}>{item.ReplacementDate}</td>
                      <td className="text-start fw-bold" colSpan={1}>
                        Date of Collection:
                      </td>
                      <td colSpan={3}>{item.CollectionDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
    </>
  );
};

export default FailureReportList;
