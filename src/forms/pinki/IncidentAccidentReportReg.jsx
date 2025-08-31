import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/pinki/IncidentAccidentReportReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const IncidentAccidentReportReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const incidentaccidentreport = useSelector(
    (state) => state.incidentaccidentreport
  );
  const [slug, setSlug] = useState("");

  // Set slug from Redux state
  useEffect(() => {
    if (incidentaccidentreport?.slug) {
      setSlug(incidentaccidentreport.slug);
    }
  }, [incidentaccidentreport]);

  const basicInitialValues = {
    incident: "",
    date_incident: formatDate(new Date().toDateString()),
    time_incident: new Date().toLocaleTimeString([], { hour12: false }),
    place_of_incident: "",
    tdetails: "",
    name_of_scto: "",
    empid_of_scto: "",
    reason: "",
    brief: [],
    repercussion: [],
    responsible_depart: "",
    sign_of_tc_acc: "",
    unit: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Add a new brief input
  const addEventInput = () => {
    setFormValues((prev) => ({
      ...prev,
      brief: [...prev.brief, ""],
    }));
  };

  // Add a new repercussion input
  const addRepInput = () => {
    setFormValues((prev) => ({
      ...prev,
      repercussion: [...prev.repercussion, ""],
    }));
  };

  // Update brief at specific index
  const addBriefs = (index, value) => {
    setFormValues((prev) => ({
      ...prev,
      brief: prev.brief.map((item, i) => (i === index ? value : item)),
    }));
  };

  // Update repercussion at specific index
  const addRepercussions = (index, value) => {
    setFormValues((prev) => ({
      ...prev,
      repercussion: prev.repercussion.map((item, i) => (i === index ? value : item)),
    }));
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", formValues); // Debugging point
    try {
      await dispatch(addData(formValues)).unwrap();
      alert("Incident report saved successfully");
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save incident report. Please try again.");
    }
  };

  const ResponsibleDepartment = [
    "Rolling Stock",
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
    "Others",
  ];

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Incident Accident Report
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
              <h3 className="form-heading">Incident Accident Report Register</h3>
              <div className="heading-line"></div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputincident" className="form-label">
                Incident:
              </label>
              <input
                type="text"
                className="form-control"
                name="incident"
                id="inputincident"
                required
                value={formValues.incident}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputdate" className="form-label">
                Date of Incident
              </label>
              <input
                type="date"
                className="form-control"
                id="inputdate"
                name="date_incident"
                value={formValues.date_incident}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputtime" className="form-label">
                Time of Incident:
              </label>
              <input
                type="time"
                className="form-control"
                id="inputtime"
                name="time_incident"
                value={formValues.time_incident}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputplace" className="form-label">
                Location of incident:
              </label>
              <input
                type="text"
                className="form-control"
                id="inputplace"
                name="place_of_incident"
                value={formValues.place_of_incident}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputdetails" className="form-label">
                Train Details:
              </label>
              <input
                type="text"
                className="form-control"
                id="inputdetails"
                name="tdetails"
                value={formValues.tdetails}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputname" className="form-label">
                Name of SCTO:
              </label>
              <input
                type="text"
                className="form-control"
                id="inputname"
                name="name_of_scto"
                value={formValues.name_of_scto}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputempid" className="form-label">
                Emp Id of SCTO:
              </label>
              <input
                type="number"
                className="form-control"
                id="inputempid"
                name="empid_of_scto"
                value={formValues.empid_of_scto}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputreason" className="form-label">
                Reason
              </label>
              <input
                type="text"
                className="form-control"
                id="inputreason"
                name="reason"
                value={formValues.reason}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputbrief" className="form-label">
                Brief:
              </label>
              {formValues.brief.map((brief, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <textarea
                    style={{ height: 100 }}
                    placeholder={`Brief ${index + 1}`}
                    value={brief}
                    onChange={(e) => addBriefs(index, e.target.value)}
                    className="form-control"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addEventInput}
                className="btn btn-success"
              >
                +
              </button>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputrepercussion" className="form-label">
                Repercussion:
              </label>
              {formValues.repercussion.map((repercussion, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <textarea
                    style={{ height: 100 }}
                    placeholder={`Repercussion ${index + 1}`}
                    value={repercussion}
                    onChange={(e) => addRepercussions(index, e.target.value)}
                    className="form-control"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addRepInput}
                className="btn btn-success"
              >
                +
              </button>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputresdep" className="form-label">
                Responsible Department:
              </label>
              <select
                className="form-control"
                id="inputresdep"
                name="responsible_depart"
                value={formValues.responsible_depart}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {ResponsibleDepartment.map((rd, idx) => (
                  <option key={idx} value={rd}>
                    {rd}
                  </option>
                ))}
              </select>
            </div>
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
              <label htmlFor="inputunit" className="form-label">
                EMP ID of TC
              </label>
              <input
                type="text"
                className="form-control"
                id="inputunit"
                name="unit"
                value={formValues.unit}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 text-center">
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

export default IncidentAccidentReportReg;