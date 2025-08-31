import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  fetchData,
  saveData,
} from "../../reducer/isha/SMPSSYSTEMMAINTENANCERECORDReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const SMPSSYSTEMMAINTENANCERECORDTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "smps_sys_mntc_Table.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [slug, setSlug] = useState(getLastParameter().trim());
  const dispatch = useDispatch();

  const pm2 = useSelector((state) => state.smpssystem);

  const itmm = pm2.data.data;

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
    navigate(`list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              SMPS SYSTEM MAINTENANCE RECORD (ANNEXURE-G)
            </Link>
            <Link underline="hover" color="inherit">
              Table
            </Link>
          </Breadcrumbs>
        </div>
        <div className="left-container" style={{ maxWidth: "95%" }}>
          <h3>SMPS SYSTEM MAINTENANCE RECORD (ANNEXURE-G)</h3>
          <span className="line-box" style={{ width: "710px" }}></span>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex gap-3">
                <Link to="">
                  {/*button className="btn btn-primary">
                                        <FaFilter />
                                             </button> */}
                </Link>
                <DownloadTableExcel
                  filename="smps_sys_mntc_Table"
                  sheet="smps_sys_mntc_Table"
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
                  style={{ border: "1px solid #0baa9a" }}
                >
                  <MdPictureAsPdf size={"25px"} color="#850d04" />
                </button>
              </div>
            </div>
          </div>

          <div ref={targetRef}>
            <table className="table" ref={tableRef}>
              {filteredData?.map((item, indexsc) => (
                <div ref={tableRef} key={indexsc}>
                  <div>
                    <div>
                      <thead>
                        <tr>
                          <th style={{ width: "700px", textAlign: "left" }}>
                            MONTH:
                            <span>{item.month}</span>
                          </th>
                          <th style={{ width: "900px", textAlign: "right" }}>
                            Ref:O&M/TELE-AFC/SOP/03
                          </th>
                          <th></th>
                        </tr>
                        <tr>
                          <th style={{ width: "600px", textAlign: "left" }}>
                            FREQUENCY:MONTHLY
                          </th>
                          <th style={{ width: "900px", textAlign: "right" }}>
                            DOCUMENT:O&M/tele/CH03
                          </th>
                          <th></th>
                        </tr>
                        <tr>
                          <th style={{ width: "500px" }}>
                            STATION:
                            <span>{item.station}</span>
                          </th>
                          <th style={{ width: "500px" }}>
                            DATE:
                            <span>{item.date}</span>
                          </th>
                          <th style={{ width: "500px" }}>
                            START TIME:
                            <span>{item.st}</span>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: "500px" }}>
                            SMPS RATING:
                            <span>{item.smps}</span>
                          </th>
                          <th style={{ width: "500px" }}>
                            BATTERT CAPACITY:AH
                          </th>
                          <th style={{ width: "500px" }}>
                            END TIME:
                            <span>{item.et}</span>
                          </th>
                        </tr>
                        <tr>
                          <th>BATTERY BANK-1</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                    </div>
                    <tr>
                      <th style={{ width: "300px" }}>CELL NO</th>
                      <th style={{ width: "100px" }}>1</th>
                      <th style={{ width: "100px" }}>2</th>
                      <th style={{ width: "100px" }}>3</th>
                      <th style={{ width: "100px" }}>4</th>
                      <th style={{ width: "100px" }}>5</th>
                      <th style={{ width: "100px" }}>6</th>
                      <th style={{ width: "100px" }}>7</th>
                      <th style={{ width: "100px" }}>8</th>
                      <th style={{ width: "100px" }}>9</th>
                      <th style={{ width: "100px" }}>10</th>
                      <th style={{ width: "100px" }}>11</th>
                      <th style={{ width: "100px" }}>12</th>
                    </tr>
                    <tr>
                      <td>ON FLOAT</td>
                      <td>
                        <span>{item.o1}</span>
                      </td>
                      <td>
                        <span>{item.o2}</span>
                      </td>
                      <td>
                        <span>{item.o3}</span>
                      </td>
                      <td>
                        <span>{item.o4}</span>
                      </td>
                      <td>
                        <span>{item.o5}</span>
                      </td>
                      <td>
                        <span>{item.o6}</span>
                      </td>
                      <td>
                        <span>{item.o7}</span>
                      </td>
                      <td>
                        <span>{item.o8}</span>
                      </td>
                      <td>
                        <span>{item.o9}</span>
                      </td>
                      <td>
                        <span>{item.o10}</span>
                      </td>
                      <td>
                        <span>{item.o11}</span>
                      </td>
                      <td>
                        <span>{item.o12}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>INITIAL READING</td>
                      <td>
                        <span>{item.i1}</span>
                      </td>
                      <td>
                        <span>{item.i2}</span>
                      </td>
                      <td>
                        <span>{item.i3}</span>
                      </td>
                      <td>
                        <span>{item.i4}</span>
                      </td>
                      <td>
                        <span>{item.i5}</span>
                      </td>
                      <td>
                        <span>{item.i6}</span>
                      </td>
                      <td>
                        <span>{item.i7}</span>
                      </td>
                      <td>
                        <span>{item.i8}</span>
                      </td>
                      <td>
                        <span>{item.i9}</span>
                      </td>
                      <td>
                        <span>{item.i10}</span>
                      </td>
                      <td>
                        <span>{item.i11}</span>
                      </td>
                      <td>
                        <span>{item.i12}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>AFTER 1.5 Hrs</td>
                      <td>
                        <span>{item.a1}</span>
                      </td>
                      <td>
                        <span>{item.a2}</span>
                      </td>
                      <td>
                        <span>{item.a3}</span>
                      </td>
                      <td>
                        <span>{item.a4}</span>
                      </td>
                      <td>
                        <span>{item.a5}</span>
                      </td>
                      <td>
                        <span>{item.a6}</span>
                      </td>
                      <td>
                        <span>{item.a7}</span>
                      </td>
                      <td>
                        <span>{item.a8}</span>
                      </td>
                      <td>
                        <span>{item.a9}</span>
                      </td>
                      <td>
                        <span>{item.a10}</span>
                      </td>
                      <td>
                        <span>{item.a11}</span>
                      </td>
                      <td>
                        <span>{item.a12}</span>
                      </td>
                    </tr>
                    <tr>
                      <th style={{ width: "300px" }}>CELL NO</th>
                      <th style={{ width: "100px" }}>13</th>
                      <th style={{ width: "100px" }}>14</th>
                      <th style={{ width: "100px" }}>15</th>
                      <th style={{ width: "100px" }}>16</th>
                      <th style={{ width: "100px" }}>17</th>
                      <th style={{ width: "100px" }}>18</th>
                      <th style={{ width: "100px" }}>19</th>
                      <th style={{ width: "100px" }}>20</th>
                      <th style={{ width: "100px" }}>21</th>
                      <th style={{ width: "100px" }}>22</th>
                      <th style={{ width: "100px" }}>23</th>
                      <th style={{ width: "100px" }}>24</th>
                    </tr>
                    <tr>
                      <td>ON FLOAT</td>
                      <td>
                        <span>{item.o13}</span>
                      </td>
                      <td>
                        <span>{item.o14}</span>
                      </td>
                      <td>
                        <span>{item.o15}</span>
                      </td>
                      <td>
                        <span>{item.o16}</span>
                      </td>
                      <td>
                        <span>{item.o17}</span>
                      </td>
                      <td>
                        <span>{item.o18}</span>
                      </td>
                      <td>
                        <span>{item.o19}</span>
                      </td>
                      <td>
                        <span>{item.o20}</span>
                      </td>
                      <td>
                        <span>{item.o21}</span>
                      </td>
                      <td>
                        <span>{item.o22}</span>
                      </td>
                      <td>
                        <span>{item.o23}</span>
                      </td>
                      <td>
                        <span>{item.o24}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>INITIAL READING</td>
                      <td>
                        <span>{item.i13}</span>
                      </td>
                      <td>
                        <span>{item.i14}</span>
                      </td>
                      <td>
                        <span>{item.i15}</span>
                      </td>
                      <td>
                        <span>{item.i16}</span>
                      </td>
                      <td>
                        <span>{item.i17}</span>
                      </td>
                      <td>
                        <span>{item.i18}</span>
                      </td>
                      <td>
                        <span>{item.i19}</span>
                      </td>
                      <td>
                        <span>{item.i20}</span>
                      </td>
                      <td>
                        <span>{item.i21}</span>
                      </td>
                      <td>
                        <span>{item.i22}</span>
                      </td>
                      <td>
                        <span>{item.i23}</span>
                      </td>
                      <td>
                        <span>{item.i24}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>AFTER 1.5 Hrs</td>
                      <td>
                        <span>{item.a13}</span>
                      </td>
                      <td>
                        <span>{item.a14}</span>
                      </td>
                      <td>
                        <span>{item.a15}</span>
                      </td>
                      <td>
                        <span>{item.a16}</span>
                      </td>
                      <td>
                        <span>{item.a17}</span>
                      </td>
                      <td>
                        <span>{item.a18}</span>
                      </td>
                      <td>
                        <span>{item.a19}</span>
                      </td>
                      <td>
                        <span>{item.a20}</span>
                      </td>
                      <td>
                        <span>{item.a21}</span>
                      </td>
                      <td>
                        <span>{item.a22}</span>
                      </td>
                      <td>
                        <span>{item.a23}</span>
                      </td>
                      <td>
                        <span>{item.a24}</span>
                      </td>
                    </tr>
                    <tr>
                      <th style={{ width: "300px" }}>SPARE CELL NO</th>
                      <th style={{ width: "100px" }}>1</th>
                      <th style={{ width: "100px" }}>2</th>
                      <th style={{ width: "100px" }}>3</th>
                      <th style={{ width: "100px" }}>4</th>
                      <th style={{ width: "100px" }}>5</th>
                      <th style={{ width: "100px" }}>6</th>
                    </tr>
                    <tr>
                      <td>ON FLOAT</td>
                      <td>
                        <span>{item.F1}</span>
                      </td>
                      <td>
                        <span>{item.F2}</span>
                      </td>
                      <td>
                        <span>{item.F3}</span>
                      </td>
                      <td>
                        <span>{item.F4}</span>
                      </td>
                      <td>
                        <span>{item.F5}</span>
                      </td>
                      <td>
                        <span>{item.F6}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>AFTER 1 Hrs</td>
                      <td>
                        <span>{item.a111}</span>
                      </td>
                      <td>
                        <span>{item.a112}</span>
                      </td>
                      <td>
                        <span>{item.a113}</span>
                      </td>
                      <td>
                        <span>{item.a114}</span>
                      </td>
                      <td>
                        <span>{item.a115}</span>
                      </td>
                      <td>
                        <span>{item.a116}</span>
                      </td>
                    </tr>

                    <div className="row">
                      <label for="inputName" className="form-label">
                        SPARE CELL CHARGER OUTPUT VOLTAGE:
                        <span>{item.sc}</span>
                      </label>
                      <label for="inputName" className="form-label">
                        ACV of BB1 after 1.5 Hrs.:
                        <span>{item.acv}</span>
                      </label>
                      <label for="inputName" className="form-label">
                        REPLACEMENT STATUS:
                        <span>{item.rs1}</span>
                      </label>
                    </div>
                    <div className="row">
                      <label for="inputName" className="form-label">
                        UNDER VOLTAGE CELLS:
                        <span>{item.uvc}</span>
                      </label>

                      <label for="inputName" className="form-label">
                        LEAKY CELLS:
                        <span>{item.lc}</span>
                      </label>
                      <label for="inputName" className="form-label">
                        REPLACEMENT STATUS:
                        <span>{item.rs2}</span>
                      </label>
                    </div>
                    <div className="row">
                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        SMR STATUS:
                      </label>
                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        SMR1:
                        <span>{item.ss1}</span>
                      </label>

                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        SMR2:
                        <span>{item.ss2}</span>
                      </label>

                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        SMR3:
                        <span>{item.ss3}</span>
                      </label>

                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        SMR4:
                      </label>
                      <span>{item.ss4}</span>
                    </div>
                    <div className="row">
                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        Battery Terminals Cleaned:
                        <span>{item.b}</span>
                      </label>

                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        Loose Connection Checked:
                        <span>{item.l}</span>
                      </label>

                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        Cell Leakage Checked:
                        <span>{item.c}</span>
                      </label>

                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        Earth Pit Status:
                        <span>{item.ea}</span>
                      </label>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <label
                          for="inputName"
                          className="form-label"
                          style={{ textAlign: "left" }}
                        >
                          REMARKS:
                          <span>{item.remark}</span>
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        SS/JE:
                        <span>{item.sj}</span>
                      </label>

                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        EM:
                        <span>{item.em1}</span>
                      </label>

                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        EM:
                        <span>{item.em2}</span>
                      </label>
                    </div>
                    <div className="row">
                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        Employee Name:
                        <span>{item.employee_name}</span>
                      </label>

                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        Employee id : 

                        <span>{item.user_id}</span>
                      </label>

                      <label
                        for="inputName"
                        className="form-label"
                        style={{ textAlign: "left" }}
                      >
                        Designation:
                        <span>{}</span>
                      </label>
                    </div>
                    <tr>
                      <td className=" " colSpan={5}>
                        {item.status === "0" || user.role === "Admin" ? (
                          <div className="d-flex gap-2 align-items-center">
                            <Link
                              to="/edit/smps_sys_mntc_register"
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
                </div>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SMPSSYSTEMMAINTENANCERECORDTable;
