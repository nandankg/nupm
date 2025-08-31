import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/redux/tableDataSlice";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const PossessionRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const [slug, setSlug] = useState(getLastParameter().trim());
  const possesionr = useSelector((state) => state.data);

  const Department =["Rolling Stock",
    "Signalling",
    "Telecom",
    "AFC",
    "Civil",
    "Track",
    "Traction-PSI",
    "Traction-OHE",
    "E&M",
    "Operations",
    "Security",
    "Rolling Stock/Signalling",
    "Rolling Stock/Track",
    "Telecom/Signalling",
    "E&M/Civil",
    "Rolling Stock/Operations",
    "Rolling Stock/Traction-OHE",
    "Traction-Telecom",
    "Traction- SCADA",
    "Rolling Stock/Signalling/Operations",
    "Telecom-SCADA",
    "Signalling/Traction-SCADA",
    "Rolling Stock/Telecom",
    "E&M / Telecom",
    "Civil / Telecom",
    "Signalling/P-Way",
    "Others"
    ]
  console.log(slug);

  const basicInitialValues = {
    date: "",
    station:"",
    locationFrom: "",
    locationTo: "",
    line:"",
    possessionGranted: "",
    empno: "",
    nameofepic: "",
    designation: "",
    noofpersons: "",
    natureOfWork: "",
    locationFrom: "",
    locationTo: "",
    entryPoint: "",
    exitPoint: "",
    oheDead: "",
    granted: "",
    permittedUpto: "",
    cancellation: "",
    cancellation_date:"",
    oheCharged: "",
    ptwIssued: "",
    ptwCancellation: "",
    ptwCancellation_date: "",
    department:"",
    privateImposedOcc: "",
    privateImposedStation: "",
    privateCancellationOcc: "",
    privateCancellationStation: "",
    remark: "",
  };
  const location  = [
    'CCAP',
    'AMSM',
    'TPNR',
    'KRNM',
    'SGNG',
    'ALMB',
    'ABST',
    'MWYA',
    'DGPI',
    'CHBG',
    'HSGJ',
    'SHVA',
    'HZNJ',
    'KDSS',
    'VSVM',
    'ITC',
    'BSNM',
    'LHMT',
    'BTNT',
    'IDNM',
    'MSPA',
    'OCC',
    'depot entry line',
    'depot exit line'
  ];

  const [formValues, setFormValues] = useState(basicInitialValues);
 const handleSubmit = (e) => {
       e.preventDefault();
      dispatch(addData({formType:slug,values:formValues}));
          console.log("Form Data Submitted:", formValues);
        navigate(`/list/${slug}`);
     };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Possession Register
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading"> Possession Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
               
                <div className="col-md-4">
                <label htmlFor="location">Date</label>
                  <input
                    type="date"
                    id="location"
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                </div>
              <div className="row mb-3">
               
                
                <div className="col-md-4">
                  <label htmlFor="possessionGranted">Possession Granted</label>
                  <select
                    id="possessionGranted"
                    name="possessionGranted"
                    value={formValues.possessionGranted}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">-- Select Department --</option>
                    {Department.map((stn, index) => (
                    <option key={index} value={stn}>
                      {stn}
                    </option>
                  ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="empno">Emp. No.</label>
                  <input
                    type="number"
                    id="empno"
                    name="empno"
                    value={formValues.empno}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="empno">Line</label>
                  <select
                    type="text"
                    id="empno"
                    name="line"
                    value={formValues.line}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="UP">UP</option>
                    <option value="DOWN">DOWN</option>
                    <option value="BOTH">BOTH</option>
                    </select>
                </div>
              </div>
              {/* Name of EPIC, Designation, No. of Persons */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="nameofepic">Name of Person/ EPIC</label>
                  <input
                    type="text"
                    id="nameofepic"
                    name="nameofepic"
                    value={formValues.nameofepic}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="designation">Designation</label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formValues.designation}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="noofpersons">No. of person along with EPIC’ </label>
                  <input
                    type="number"
                    id="noofpersons"
                    name="noofpersons"
                    value={formValues.noofpersons}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              {/* Nature of Work, Entry Point, Exit Point */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="natureOfWork">Nature of Work</label>
                  <input
                    type="text"
                    id="natureOfWork"
                    name="natureOfWork"
                    value={formValues.natureOfWork}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="entryPoint">Entry Point</label>
                  <input
                    type="text"
                    id="entryPoint"
                    name="entryPoint"
                    value={formValues.entryPoint}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="exitPoint">Exit Point</label>
                  <input
                    type="text"
                    id="exitPoint"
                    name="exitPoint"
                    value={formValues.exitPoint}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              {/* Location From, Location To */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <label>Location</label>
                  <div className="row">
                  <div className="col-md-4">
                  <label htmlFor="location">Location From</label>
                  <select
                    id="possessionGranted"
                    name="locationFrom"
                    value={formValues.locationFrom}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">--From --</option>
                    {location.map((stn, index) => (
                    <option key={index} value={stn}>
                      {stn}
                    </option>
                  ))}
                  </select>
              
                </div>
                <div className="col-md-4">
                  <label htmlFor="location">Location to</label>
                  <select
                    id="possessionGranted"
                    name="locationTo"
                    value={formValues.locationTo}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">--To --</option>
                    {location.map((stn, index) => (
                    <option key={index} value={stn}>
                      {stn}
                    </option>
                  ))}
                  </select>
                </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <h3>Time</h3>
                <div className="col-md-4">
                  <label htmlFor="oheDead">OHE Dead</label>
                  <input
                    type="time"
                    id="oheDead"
                    name="oheDead"
                    value={formValues.oheDead}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="granted">Granted</label>
                  <input
                    type="time"
                    id="granted"
                    name="granted"
                    value={formValues.granted}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="permittedUpto">Permitted Upto</label>
                  <input
                    type="time"
                    id="permittedUpto"
                    name="permittedUpto"
                    value={formValues.permittedUpto}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="cancellation">Cancellation</label>
                  <input
                    type="time"
                    id="cancellation"
                    name="cancellation"
                    value={formValues.cancellation}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="oheCharged">OHE Charged</label>
                  <input
                    type="time"
                    id="oheCharged"
                    name="oheCharged"
                    value={formValues.oheCharged}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mb-4">
                <h3>PTW S. No.</h3>
                <div className="col-md-4">
                  <label htmlFor="ptwIssued">Location of PTW</label>
                  <select
                   
                    id="ptwIssued"
                    name="department"
                    value={formValues.department}
                    onChange={handleChange}
                    className="form-control"
                  >
                   <option value="">--PTW --</option>
                   {location.map((stn, index) => (
                    <option key={index} value={stn}>
                      {stn}
                    </option>
                  ))}
                    </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="ptwIssued">PTW Issued</label>
                  <input
                    type="number"
                    id="ptwIssued"
                    name="ptwIssued"
                    value={formValues.ptwIssued}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="ptwCancellation">PTW Cancellation</label>
                  <input
                    type="number"
                    id="ptwCancellation"
                    name="ptwCancellation"
                    value={formValues.ptwCancellation}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Private Number Exchange */}
              <div className="row mb-4">
                <h3>Private Number Exchange</h3>
                <div
                  className="col-md-6"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    gap: "5px",
                  }}
                >
                  <h4>Imposed</h4>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="privateImposedOcc">OCC</label>
                      <input
                        type="number"
                        id="privateImposedOcc"
                        name="privateImposedOcc"
                        value={formValues.privateImposedOcc}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="privateImposedStation">Station</label>
                      <input
                        type="number"
                        id="privateImposedStation"
                        name="privateImposedStation"
                        value={formValues.privateImposedStation}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    gap: "5px",
                  }}
                >
                  <h4>Cancellation</h4>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="privateCancellationOcc">OCC</label>
                      <input
                        type="number"
                        id="privateCancellationOcc"
                        name="privateCancellationOcc"
                        value={formValues.privateCancellationOcc}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="privateCancellationStation">
                        Station
                      </label>
                      <input
                        type="number"
                        id="privateCancellationStation"
                        name="privateCancellationStation"
                        value={formValues.privateCancellationStation}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3 cont">
                <div className="col-md-6">
                  <label htmlFor="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    name="remark"
                    value={formValues.remark}
                    onChange={handleChange}
                    aria-label="Remark"
                  />
                </div>
              </div>
              <div className="row mb-3 cont">
              <div className="col-md-6">
                <label htmlFor="inputsign" className="form-label">
                Name of TC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputsign"
                  name="sign_of_tc_acc"
                  value={formValues.sign_of_tc_acc}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputsign" className="form-label">
                EMP ID of TC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputsign"
                  name="unit"
                  value={formValues.unit}
                  onChange={handleChange}
                />
              </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn-primary px-3">
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

export default PossessionRegister;
