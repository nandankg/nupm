import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { fetchData, saveData } from "../../reducer/isha/AxleCounterReducer";

const AxleCounterTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "Axel Counter (ACS-2000) MAINTENANCE RECORD_Table.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const dispatch = useDispatch();
  const axleCounterList = useSelector((state) => state.addAxleCounter);
  const [slug, setSlug] = useState("");

  const itmm = axleCounterList.data.data;
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
    }, 500)
  };

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Axle Counter (ACS-2000) MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit">
            Table
          </Link>
        </Breadcrumbs>
      </div>
      <div className="mb-3 form-heading-container">
        <h3 className="form-heading">
          {" "}
          Axle Counter (ACS-2000) MAINTENANCE RECORD
        </h3>
        <span className="line-box" style={{ width: "700px" }}></span>
      </div>

      <div className="d-flex justify-content-between align-datas-center mt-3">
        <div className="d-flex gap-3">
          <Link to="">
            {/*button className="btn btn-primary">
                <FaFilter />
              </button> */}
          </Link>
          <DownloadTableExcel
            filename="Axel Counter (ACS-2000) MAINTENANCE RECORD_Table"
            sheet="Axel Counter (ACS-2000) MAINTENANCE RECORD_Table"
            currentTableRef={tableRef.current}
          >
            <button className="btn" style={{ border: "1px solid #0baa9a " }}>
              <RiFileExcel2Fill color="#0baa9a " size={25} />
            </button>
          </DownloadTableExcel>
          <button
            className="btn"
            onClick={() => toPDF()}
            style={{ border: "1px solid #0baa9a" }}
          >
            <MdPictureAsPdf size={"25px"} color="#850d04" />
          </button>
        </div>
      </div>

      <div ref={targetRef}>
        <table className="table" ref={tableRef}>
          {filteredData?.map((item, data) => (
            <div key={data.id}>
              <thead>
                <tr>
                  <th>Date: {item.date}</th>
                  <th>Station: {item.station}</th>
                  <th>Schedule: {item.maintenanceschedule}</th>
                  <th colSpan={2}> Axel Counter No: {item.counterno}</th>
                </tr>

                <tr>
                  <th>sno</th>
                  <th>Details of Maintenance Activity</th>
                  <th style={{ width: "150px" }}>Status</th>
                  <th style={{ width: "150px" }}>Remark,if any</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="text-start">
                    {" "}
                    Visual and mechnical checks on the wheel sensor RSR180 and
                    connecting cables
                  </td>
                  <td>{item.checklist1}</td>
                  <td>{item.blank1}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="text-start">
                    {" "}
                    Checks the condition for clamping bolt (any rust or damage )
                  </td>
                  <td>{item.checklist2}</td>
                  <td>{item.blank2}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="text-start">
                    Measure Dimension A(40 mm - 45 mm)
                  </td>
                  <td>{item.checklist3}</td>
                  <td>{item.blank3}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="text-start">
                    {" "}
                    Measure Dimension B(0 mm - 8 mm){" "}
                  </td>
                  <td>{item.checklist4}</td>
                  <td>{item.blank4}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="text-start">
                    Check the condition of Track Lead Junction Box
                  </td>
                  <td>{item.checklist5}</td>
                  <td>{item.blank5}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="text-start">
                    {" "}
                    Measure the power supply to the wheel sensor
                  </td>
                  <td>{item.checklist6}</td>
                  <td>{item.blank6}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="text-start">
                    Check the occupancy detection capability of the wheel sensor
                    by means of the testing plate PB200
                  </td>
                  <td>{item.checklist7}</td>
                  <td>{item.blank7}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="text-start">
                    Reset the concerned tested axle counter ( if requied){" "}
                  </td>
                  <td>{item.checklist8}</td>
                  <td>{item.blank8}</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td className="text-start">
                    Cleaning of TLJB and Cable dressing
                  </td>
                  <td>{item.checklist9}</td>
                  <td>{item.blank9}</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td className="text-start">
                    {" "}
                    Verification of terminal condition and Earthing of Box
                  </td>
                  <td>{item.checklist10}</td>
                  <td>{item.blank10}</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td className="text-start">
                    All the connection are tightened properly
                  </td>
                  <td>{item.checklist11}</td>
                  <td>{item.blank11}</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td className="text-start">
                    {" "}
                    Visual inspection of cubicle boards for dust, if needed
                    clean the dust using a brush or a soft dry cloth{" "}
                  </td>
                  <td>{item.checklist12}</td>
                  <td>{item.blank12}</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td className="text-start">
                    {" "}
                    Check all LEDs are glowing in right condition
                  </td>
                  <td>{item.checklist13}</td>
                  <td>{item.blank13}</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td className="text-start"> Measure Voltage In SER</td>
                  <td>{item.checklist14}</td>
                  <td>{item.blank14}</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td className="text-start">
                    Measure Sys 1 Voltage (280mV -500mV)
                  </td>
                  <td>{item.checklist15}</td>
                  <td>{item.blank15}</td>
                </tr>
                <tr>
                  <td>16</td>
                  <td className="text-start">
                    Measure Sys 2 Voltage (280mV -500mV){" "}
                  </td>
                  <td>{item.checklist16}</td>
                  <td>{item.blank16}</td>
                </tr>
                <tr>
                  <td>17</td>
                  <td className="text-start">
                    {" "}
                    Difference of Voltage B/W Sys1 & Sys2
                  </td>
                  <td>{item.checklist17}</td>
                  <td>{item.blank17}</td>
                </tr>
                <tr>
                  <td>
                    <b>Remarks :</b>
                  </td>
                  <td colspan={20}>{item?.remarks} </td>
                </tr>
                <tr>
                  <td className="text-start">
                    <b>Name: Designation: Emp.No.:</b>
                  </td>
                  <td colspan={20}>
                    {item?.employee_name} {item?.empno} {item?.empno}
                  </td>
                </tr>
              </tbody>
              <tr>
                <td className=" " colSpan={4}>
                  {item.status === "0" || user.role === "Admin" ? (
                    <div className="d-flex gap-2 align-items-center">
                      <Link
                        to={`/edit/axel-counter-maintenance`}
                        state={{ id: item.id }}
                        className="btn align-content-center"
                        style={{
                          width: "100px",
                          height: "50px",
                          textAlign: "center",
                          backgroundColor: "#f4d03f",
                          color: "black",
                          fontSize: "20px",
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(item.id);
                        }}
                        className="btn btn-primary"
                        style={{
                          width: "100px",
                          height: "50px",
                          textAlign: "center",
                          fontSize: "18px",
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
            </div>
          ))}
        </table>
      </div>
    </div>
  );
};
export default AxleCounterTable;
