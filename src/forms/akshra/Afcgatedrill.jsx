import React, { useState, useEffect } from "react";
import { addData } from "../../reducer/redux/tableDataSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const Afcgatedrill = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [errors, setErrors] = useState({});

  const basicInitialValues = {
    date: new Date().toISOString().split("T")[0], // Default to today
    serviceid: "",
    trainset: "",
    entrymode: "",
    traininductedfrom: "",
    maininlineinduction: "",
    scheduledeparture: "",
    actualdeparture: "",
    depotarrival: "",
    initialkm: "",
    finalkm: "",
    runningkms: "",
    finalstablinglocation: "",
    nameoftc: "",
    empidoftc: "",
    remark: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Calculate runningkms whenever initialkm or finalkm changes
  useEffect(() => {
    const initial = parseInt(formValues.initialkm) || 0;
    const final = parseInt(formValues.finalkm) || 0;
    const runningkms = final - initial;
    setFormValues((prev) => ({
      ...prev,
      runningkms: runningkms >= 0 ? runningkms.toString() : "",
    }));
  }, [formValues.initialkm, formValues.finalkm]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form on submit
  const validateForm = () => {
    const newErrors = {};
    if (!formValues.initialkm) {
      newErrors.initialkm = "Initial KM is required";
    }
    if (!formValues.finalkm) {
      newErrors.finalkm = "Final KM is required";
    }
    if (parseInt(formValues.finalkm) < parseInt(formValues.initialkm)) {
      newErrors.runningkms = "Final KM cannot be less than Initial KM";
    }
    if (!formValues.serviceid) {
      newErrors.serviceid = "Train ID/Service ID is required";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      console.log("Form Data Submitted:", formValues);
      await dispatch(addData({ formType: slug, values: formValues })).unwrap();
      alert("Train induction data saved successfully");
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            TRAIN INDUCTION Reg
          </Link>
          <Link underline="hover" color="inherit">
            REGISTER
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div
          className="col-md-8 form-container"
          style={{ marginLeft: "0", marginRight: "0", maxWidth: "75%" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">Train Induction Register</h3>
              <div className="heading-line"></div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputServiceid" className="form-label">
                  Train ID/Service ID
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.serviceid ? "is-invalid" : ""}`}
                  id="inputServiceid"
                  name="serviceid"
                  value={formValues.serviceid}
                  onChange={handleChange}
                  required
                />
                {errors.serviceid && (
                  <div className="invalid-feedback">{errors.serviceid}</div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputDate"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]} // Prevent future dates
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputTrainset" className="form-label">
                  Train Set
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputTrainset"
                  name="trainset"
                  value={formValues.trainset}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputTrainInductedFrom" className="form-label">
                  Train Inducted From
                </label>
                <select
                  className="form-control"
                  id="inputTrainInductedFrom"
                  name="traininductedfrom"
                  value={formValues.traininductedfrom}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Depot">Depot</option>
                  <option value="MSPA platform">MSPA platform</option>
                  <option value="MSPA Siding">MSPA Siding</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputMode" className="form-label">
                  MODE ATO/ATP/ROS/RM/SCS (Train Entered into Mainline)
                </label>
                <select
                  className="form-control"
                  id="inputMode"
                  name="entrymode"
                  value={formValues.entrymode}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="ATO">ATO</option>
                  <option value="ATP">ATP</option>
                  <option value="ROS">ROS</option>
                  <option value="RM">RM</option>
                  <option value="SCS">SCS</option>
                </select>
              </div>
            </div>
            <b>TIME</b>
            <div className="row mb-3">
              <div className="col-6">
                <label htmlFor="inputMainlineInduction" className="form-label">
                  MAINLINE INDUCTION (From M/L Entry Signal)
                </label>
                <input
                  type="time"
                  className="form-control"
                  name="maininlineinduction"
                  value={formValues.maininlineinduction}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputScheduleDeparture" className="form-label">
                  SCHEDULE DEPARTURE
                </label>
                <input
                  type="time"
                  className="form-control"
                  name="scheduledeparture"
                  value={formValues.scheduledeparture}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputActualDeparture" className="form-label">
                  ACTUAL DEPARTURE
                </label>
                <input
                  type="time"
                  className="form-control"
                  name="actualdeparture"
                  value={formValues.actualdeparture}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputDepotArrival" className="form-label">
                  Date of Depot Arrival/Stabling
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="depotarrival"
                  value={formValues.depotarrival}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]} // Prevent future dates
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="inputInitialKm" className="form-label">
                  INITIAL KMS
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.initialkm ? "is-invalid" : ""}`}
                  id="inputInitialKm"
                  name="initialkm"
                  value={formValues.initialkm}
                  onChange={handleChange}
                  min="0"
                  required
                />
                {errors.initialkm && (
                  <div className="invalid-feedback">{errors.initialkm}</div>
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="inputFinalKm" className="form-label">
                  FINAL KMS
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.finalkm ? "is-invalid" : ""}`}
                  id="inputFinalKm"
                  name="finalkm"
                  value={formValues.finalkm}
                  onChange={handleChange}
                  min="0"
                  required
                />
                {errors.finalkm && (
                  <div className="invalid-feedback">{errors.finalkm}</div>
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="inputRunningKms" className="form-label">
                  RUNNING KMS
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.runningkms ? "is-invalid" : ""}`}
                  id="inputRunningKms"
                  name="runningkms"
                  value={formValues.runningkms}
                  readOnly // Prevent manual editing
                />
                {errors.runningkms && (
                  <div className="invalid-feedback">{errors.runningkms}</div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputFinalStabling" className="form-label">
                  Final Stabling Location
                </label>
                <select
                  className="form-control"
                  id="inputFinalStabling"
                  name="finalstablinglocation"
                  value={formValues.finalstablinglocation}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Depot">Depot</option>
                  <option value="MSPA platform">MSPA platform</option>
                  <option value="MSPA Siding">MSPA Siding</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputRemark" className="form-label">
                  Remarks
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputRemark"
                  name="remark"
                  value={formValues.remark}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputNameOfTc" className="form-label">
                  Name of TC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputNameOfTc"
                  name="nameoftc"
                  value={formValues.nameoftc}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmpIdOfTc" className="form-label">
                  EMP ID of TC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmpIdOfTc"
                  name="empidoftc"
                  value={formValues.empidoftc}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Afcgatedrill;