import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/isha/SMPSSYSTEMMAINTENANCERECORDReducer";
import stationData from "../../station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const SMPSSYSTEMMAINTENANCERECORD = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const pm = useSelector((state) => state.smpss);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);

  const basicInitialValues = {
    station: "----",
    date: "",
    month: "",
    station: "",
    smps: "",
    st: "",
    et: "",
    o1: "",
    o2: "",
    o3: "",
    o4: "",
    o5: "",
    o6: "",
    o7: "",
    o8: "",
    o9: "",
    o10: "",
    o11: "",
    o12: "",
    o13: "",
    o14: "",
    o15: "",
    o16: "",
    o17: "",
    o18: "",
    o19: "",
    o20: "",
    o21: "",
    o22: "",
    o23: "",
    o24: "",
    i1: "",
    i2: "",
    i3: "",
    i4: "",
    i5: "",
    i6: "",
    i7: "",
    i8: "",
    i9: "",
    i10: "",
    i11: "",
    i12: "",
    i13: "",
    i14: "",
    i15: "",
    i16: "",
    i17: "",
    i18: "",
    i19: "",
    i20: "",
    i21: "",
    i22: "",
    i23: "",
    i24: "",
    a1: "",
    a2: "",
    a3: "",
    a4: "",
    a5: "",
    a6: "",
    a7: "",
    a8: "",
    a9: "",
    a10: "",
    a11: "",
    a12: "",
    a13: "",
    a14: "",
    a15: "",
    a16: "",
    a17: "",
    a18: "",
    a19: "",
    a20: "",
    a21: "",
    a22: "",
    a23: "",
    a24: "",
    F1: "",
    F2: "",
    F3: "",
    F4: "",
    F5: "",
    F6: "",
    a111: "",
    a112: "",
    a113: "",
    a114: "",
    a115: "",
    a116: "",
    sc: "",
    acv: "",
    uvc: "",
    lc: "",
    rs1: "",
    rs2: "",
    ss1: "",
    ss2: "",
    ss3: "",
    ss4: "",
    b: "",
    l: "",
    c: "",
    ea: "",
    remark: "",
    sj: "",
    em1: "",
    em2: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
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
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  {" "}
                  SMPS SYSTEM MAINTENANCE RECORD
                </h3>
                <span className="line-box" style={{ width: "600px" }}></span>
              </div>
              <table>
                <div className="row mb-3">
                  <div className="col-md 4" style={{ width: "900px" }}>
                    <label htmlFor="inputstation" className="form-label">
                      Station
                    </label>
                    <select
                      className="form-control"
                      id="station"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          station: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Station</option>
                      {stationData
                        .filter((station) => station["Station Name"]) // Exclude entries with null station names
                        .map((station) => (
                          <option
                            key={station["STATION Code"]}
                            value={station["Station Name"]}
                          >
                            {station["Station Name"]}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md 12">
                    <label for="inputName" className="form-label">
                      SMPS RATING:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          smps: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md 4">
                    <label for="inputName" className="form-label">
                      MONTH:
                    </label>
                    <input
                      type="month"
                      className="form-control"
                      id="inputName"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          month: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md 4">
                    <label for="inputName" className="form-label">
                      START TIME:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputName"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          st: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md 4">
                    <label for="inputName" className="form-label">
                      END TIME:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputName"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          et: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </table>
              <table>
                <tr>
                  <th style={{ width: "200px" }}>CELL NO</th>
                  <th style={{ width: "200px" }}>1</th>
                  <th style={{ width: "200px" }}>2</th>
                  <th style={{ width: "200px" }}>3</th>
                  <th style={{ width: "200px" }}>4</th>
                  <th style={{ width: "200px" }}>5</th>
                  <th style={{ width: "200px" }}>6</th>
                </tr>
                <tr>
                  <td>ON FLOAT</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      required
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o1: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o2: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o3: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o4: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o5: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o6: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>INITIAL READING</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i1: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i2: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i3: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i4: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i5: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i6: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>AFTER 1.5 Hrs</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a1: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a2: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a3: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a4: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a5: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a6: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>

                <tr>
                  <th style={{ width: "200px" }}>CELL NO</th>
                  <th style={{ width: "200px" }}>7</th>
                  <th style={{ width: "200px" }}>8</th>
                  <th style={{ width: "200px" }}>9</th>
                  <th style={{ width: "200px" }}>10</th>
                  <th style={{ width: "200px" }}>11</th>
                  <th style={{ width: "200px" }}>12</th>
                </tr>
                <tr>
                  <td>ON FLOAT</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o7: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o8: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o9: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o10: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o11: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o12: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>INITIAL READING</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i7: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i8: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i10: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i11: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i12: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i6: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>AFTER 1.5 Hrs</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a7: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a8: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a9: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a10: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a11: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a12: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>

                <tr>
                  <th style={{ width: "200px" }}>CELL NO</th>
                  <th style={{ width: "200px" }}>13</th>
                  <th style={{ width: "200px" }}>14</th>
                  <th style={{ width: "200px" }}>15</th>
                  <th style={{ width: "200px" }}>16</th>
                  <th style={{ width: "200px" }}>17</th>
                  <th style={{ width: "200px" }}>18</th>
                </tr>
                <tr>
                  <td>ON FLOAT</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o13: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o14: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o15: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o16: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o17: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o18: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>INITIAL READING</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i13: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i14: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i15: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i16: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i17: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i18: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>AFTER 1.5 Hrs</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a13: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a14: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a15: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a16: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a17: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a18: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>

                <tr>
                  <th style={{ width: "200px" }}>CELL NO</th>
                  <th style={{ width: "200px" }}>19</th>
                  <th style={{ width: "200px" }}>20</th>
                  <th style={{ width: "200px" }}>21</th>
                  <th style={{ width: "200px" }}>22</th>
                  <th style={{ width: "200px" }}>23</th>
                  <th style={{ width: "200px" }}>24</th>
                </tr>
                <tr>
                  <td>ON FLOAT</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o19: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o20: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o21: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o22: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o23: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          o24: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>INITIAL READING</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i19: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i20: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i21: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i22: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i23: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          i24: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>AFTER 1.5 Hrs</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a19: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a20: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a21: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a22: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a23: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a24: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>

                <tr>
                  <th style={{ width: "200px" }}> SPARE CELL NO</th>
                  <th style={{ width: "200px" }}>1</th>
                  <th style={{ width: "200px" }}>2</th>
                  <th style={{ width: "200px" }}>3</th>
                  <th style={{ width: "200px" }}>4</th>
                  <th style={{ width: "200px" }}>5</th>
                  <th style={{ width: "200px" }}>6</th>
                </tr>
                <tr>
                  <td>ON FLOAT</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          F1: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          F2: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          F3: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          F4: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          F5: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          F6: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>AFTER 1 Hrs</td>
                  <td>
                    {" "}
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a111: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a112: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a113: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a114: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a115: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="Text"
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          a116: e.target.value,
                        })
                      }
                    />{" "}
                  </td>
                </tr>
              </table>
              <div className=" row mb-3">
                <label
                  for="inputName"
                  className="form-label"
                  style={{ width: "400px" }}
                >
                  SPARE CELL CHARGER OUTPUT VOLTAGE:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      sc: e.target.value,
                    })
                  }
                />
                <label for="inputName" className="form-label">
                  ACV of BB1 after 1.5 Hrs.
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      acv: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <label for="inputName" className="form-label">
                  UNDER VOLTAGE CELLS
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      uvc: e.target.value,
                    })
                  }
                />
                <label for="inputName" className="form-label">
                  LEAKY CELLS
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      lc: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <label for="inputName" className="form-label">
                  REPLACEMENT STATUS
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      rs1: e.target.value,
                    })
                  }
                />
                <label for="inputName" className="form-label">
                  REPLACEMENT STATUS
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      rs2: e.target.value,
                    })
                  }
                />
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
                </label>
                <input
                  type="remarks"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      ss1: e.target.value,
                    })
                  }
                />
                <label
                  for="inputName"
                  className="form-label"
                  style={{ textAlign: "left" }}
                >
                  SMR2:
                </label>
                <input
                  type="remarks"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      ss2: e.target.value,
                    })
                  }
                />
                <label
                  for="inputName"
                  className="form-label"
                  style={{ textAlign: "left" }}
                >
                  SMR3:
                </label>
                <input
                  type="remarks"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      ss3: e.target.value,
                    })
                  }
                />
                <label
                  for="inputName"
                  className="form-label"
                  style={{ textAlign: "left" }}
                >
                  SMR4:
                </label>
                <input
                  type="remarks"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      ss4: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <label
                  for="inputName"
                  className="form-label"
                  style={{ textAlign: "left" }}
                >
                  Battery Terminals Cleaned
                </label>
                <input
                  type="remarks"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      b: e.target.value,
                    })
                  }
                />
                <label
                  for="inputName"
                  className="form-label"
                  style={{ textAlign: "left" }}
                >
                  Loose Connection Checked
                </label>
                <input
                  type="remarks"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      l: e.target.value,
                    })
                  }
                />
                <label
                  for="inputName"
                  className="form-label"
                  style={{ textAlign: "left" }}
                >
                  Cell Leakage Checked
                </label>
                <input
                  type="remarks"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      c: e.target.value,
                    })
                  }
                />
                <label
                  for="inputName"
                  className="form-label"
                  style={{ textAlign: "left" }}
                >
                  Earth Pit Status
                </label>
                <input
                  type="remarks"
                  className="form-control"
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      ea: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <div className="col-12">
                  <label
                    for="inputName"
                    className="form-label"
                    style={{ textAlign: "left" }}
                  >
                    REMARKS:
                  </label>
                  <input
                    type="remarks"
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remark: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary mt-3">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SMPSSYSTEMMAINTENANCERECORD;
