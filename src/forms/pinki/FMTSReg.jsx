import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import { addData, addFMTS } from "../../reducer/pinki/FMTSReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import stations from "../../station.json";

const FMTSReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fmts = useSelector((state) => state.fmtsbook || []);
  const [slug, setSlug] = useState("");

  console.log(slug);
  useEffect(() => {
    if (fmts) {
      setSlug(fmts.slug);
    }
  }, [fmts]);
  const [formValues, setFormValues] = useState({
    rdate: "",
    hoby: "",
    pstatus: "",
    ostatus: "",
    doffault: "",
    dofrectification: "",
    rdetail: "",
    remark: "",
    daterectified: "",
    ho: "",
    hodate: "",
    tobysign: "sign",
    hobysign: "sign",
    rectified_by: "",
    isNewItem: null,
    isRepairedItem: null,
    oldOsisFmtsNo: "",
    itemDetails: "",

    //  failure details to be filled by section staff      Added
    book_foil_no: "",
    station: "",
    eqpt_no: "",
    failure_date: "",
    failure_time: "",
    item_name: "",
    item_sl_no: "",
    detail_of_failure: "",
    remarks_deficiency: "",
    attended_by: "",
    received_by: "",
    name: "",
    sign: "",
    company: "",
    received_date: "",
    sign_of_je_sse: "",
    detail_of_default: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value === "true",
    });
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              FMTS
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading"> FMTS Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputfoilNo" className="form-label">
                  Book foil Sr.No.
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputfoilNo"
                  name="book_foil_no"
                   min="1"
                  value={formValues.book_foil_no}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h2>
                  <u>Failure Details </u>(To be filled by section staff)
                </h2>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="inputstation" className="form-label">
                    Station
                  </label>
                  <select
                    className="form-control"
                    id="inputstation"
                    name="station"
                    value={formValues.station}
                    onChange={handleChange}
                  >
                    <option value="">Select Station</option>
                    {stations.map((station, index) => (
                      <option key={index} value={station["STATION Code"]}>
                        {station["Station Name"] || station["STATION Code"]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputeqptNo" className="form-label">
                  Equipment No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                     
                    id="inputeqptNo"
                    name="eqpt_no"
                    value={formValues.eqpt_no}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    name="failure_date"
                    value={formValues.failure_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="inputtime" className="form-label">
                      Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputtime"
                      name="failure_time"
                      value={formValues.failure_time}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputItemName" className="form-label">
                      Item Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputItemName"
                      name="item_name"
                      value={formValues.item_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputitemslno" className="form-label">
                      Item Sl.No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputitemslno"
                   
                      name="item_sl_no"
                      value={formValues.item_sl_no}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="inputfailuredetail" className="form-label">
                      Details of Failure
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputfailuredetail"
                      name="detail_of_failure"
                      value={formValues.detail_of_failure}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="inputremarksDeficiency"
                      className="form-label"
                    >
                      Remarks/Deficiency
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputremarksDeficiency"
                      name="remarks_deficiency"
                      value={formValues.remarks_deficiency}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputattendedby" className="form-label">
                      Attended by
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputattendedby"
                      name="attended_by"
                      value={formValues.attended_by}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <h5> Received By</h5>
                <div className="row">
                 
                  <div className="col-md-6">
                    <label htmlFor="inputreceivedby" className="form-label">
                    Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputreceivedby"
                      name="received_by"
                      value={formValues.received_by}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputcompany" className="form-label">
                    Company
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputcompany"
                      name="company"
                      value={formValues.company}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="col-md-4">
                      <label htmlFor="inputsign" className="form-label">
                      Sign
                      </label>
                      <input
                      type="text"
                      className="form-control"
                      id="sign"
                      name="sign"
                      value={formValues.sign}
                      onChange={handleChange}
                      />
                      </div> */}
                </div>
                <div className="row">
                 
                  <div className="col-md-6">
                    <label htmlFor="inputsingOfJE_SSE" className="form-label">
                    Designation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputsingOfJE_SSE"
                      name="sign_of_je_sse"
                      value={formValues.sign_of_je_sse}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputreceivingdate" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputreceivingdate"
                      name="received_date"
                      value={formValues.received_date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <hr style={{ height: "8px", backgroundColor: "black" }} />
              <div>
                <h2>
                  <u>Repair Details</u>(To be filled by receiver/repair staff)
                </h2>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputrdate" className="form-label">
                  Receiving Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputrdate"
                  name="rdate"
                  value={formValues.rdate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputho" className="form-label">
                  H/O by:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputho"
                  name="hoby"
                  value={formValues.hoby}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputpstatus" className="form-label">
                  Physical Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputpstatus"
                  name="pstatus"
                  value={formValues.pstatus}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputostatus" className="form-label">
                  Operational Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputostatus"
                  name="ostatus"
                  value={formValues.ostatus}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputdoffault" className="form-label">
                  Details of Fault
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdoffault"
                  name="detail_of_default"
                  value={formValues.detail_of_default}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label htmlFor="inputrdetail" className="form-label">
                  Replacement Details
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputrdetail"
                  name="rdetail"
                  value={formValues.rdetail}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputrectification" className="form-label">
                  Details of rectification
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputrectification"
                  name="dofrectification"
                  value={formValues.dofrectification}
                  onChange={handleChange}
                />
              </div>
              <hr style={{ height: "8px", backgroundColor: "black" }} />
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  name="remark"
                  value={formValues.remark}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputdaterectified" className="form-label">
                  Date Rectified
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputdaterectified"
                  name="daterectified"
                  value={formValues.daterectified}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputrectifiedby" className="form-label">
                  Rectified By (Name & Emp code)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputrectifiedby"
                  name="rectified_by" // Ensure this matches the key in formValues
                  value={formValues.rectified_by}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputhodate" className="form-label">
                  H/O to & Date:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputhodate"
                  name="ho"
                  value={formValues.ho}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  className="form-control"
                  id="inputhodate"
                  name="hodate"
                  value={formValues.hodate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <hr style={{ height: "8px", backgroundColor: "black" }} />
                <h2>
                  If different item given in lieu of this (to be filled by
                  repair staff)
                </h2>
                <p>
                  Is it new item:&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="isNewItem"
                    value="true"
                    checked={formValues.isNewItem === true}
                    onChange={handleRadioChange}
                  />
                  &nbsp;Yes&nbsp;
                  <input
                    type="radio"
                    name="isNewItem"
                    value="false"
                    checked={formValues.isNewItem === false}
                    onChange={handleRadioChange}
                  />
                  &nbsp;No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Is it
                  repaired item:&nbsp;
                  <input
                    type="radio"
                    name="isRepairedItem"
                    value="true"
                    checked={formValues.isRepairedItem === true}
                    onChange={handleRadioChange}
                  />
                  &nbsp;Yes&nbsp;
                  <input
                    type="radio"
                    name="isRepairedItem"
                    value="false"
                    checked={formValues.isRepairedItem === false}
                    onChange={handleRadioChange}
                  />
                  &nbsp;No&nbsp;
                  <br />
                  {formValues.isRepairedItem === true && (
                    <>
                      If repaired item: Old OSIS/FMTS no.&nbsp;
                      <input
                        type="number"
                        name="oldOsisFmtsNo"
                        min="1"
                        value={formValues.oldOsisFmtsNo}
                        onChange={handleChange}
                      />
                    </>
                  )}
                  <br />
                  <div>
                    <textarea
                      className="col-9"
                      style={{ marginLeft: "120px" }} // Adjust margin as needed
                      placeholder="New item S.No./Repaired item detail"
                      name="itemDetails"
                      value={formValues.itemDetails}
                      onChange={handleChange}
                    />
                  </div>
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="f-btn btn btn-primary">
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

export default FMTSReg;
