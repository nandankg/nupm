import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm, incidentAccidentValidation } from "../validation/operationValidationSchemas";
import { formatDate } from "../../../data/formatDate";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const OCCIncidentAccidentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const incidentaccidentreport = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
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
  
  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add a new brief input - PRESERVED EXACT FUNCTION
  const addEventInput = () => {
    setFormValues((prev) => ({
      ...prev,
      brief: [...prev.brief, ""],
    }));
  };

  // Add a new repercussion input - PRESERVED EXACT FUNCTION
  const addRepInput = () => {
    setFormValues((prev) => ({
      ...prev,
      repercussion: [...prev.repercussion, ""],
    }));
  };

  // Update brief at specific index - PRESERVED EXACT FUNCTION
  const addBriefs = (index, value) => {
    setFormValues((prev) => ({
      ...prev,
      brief: prev.brief.map((item, i) => (i === index ? value : item)),
    }));
  };

  // Update repercussion at specific index - PRESERVED EXACT FUNCTION
  const addRepercussions = (index, value) => {
    setFormValues((prev) => ({
      ...prev,
      repercussion: prev.repercussion.map((item, i) => (i === index ? value : item)),
    }));
  };

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations preserving business logic
    if (!formValues.incident.trim()) {
      errors.incident = "Incident description is required";
    }
    
    if (!formValues.date_incident) {
      errors.date_incident = "Date of Incident is required";
    }
    
    if (!formValues.time_incident) {
      errors.time_incident = "Time of Incident is required";
    }
    
    if (!formValues.place_of_incident.trim()) {
      errors.place_of_incident = "Location of incident is required";
    }
    
    if (!formValues.responsible_depart) {
      errors.responsible_depart = "Responsible Department is required";
    }

    // Business rule validations
    const incidentDateTime = new Date(`${formValues.date_incident}T${formValues.time_incident}`);
    const now = new Date();
    if (incidentDateTime > now) {
      errors.time_incident = "Incident time cannot be in the future";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes - PRESERVED EXACT FUNCTION
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission - PRESERVED EXACT LOGIC
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    console.log("Form submitted:", formValues);
    
    try {
      await dispatch(addData({ formType: slug, values: formValues }));
      console.log("Incident report saved successfully");
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save incident report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // PRESERVED EXACT RESPONSIBLE DEPARTMENT OPTIONS
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

  // Breadcrumb items
  const breadcrumbItems = [
    { text: "Incident Accident Report", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="Incident Accident Report Register"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="critical"
      formId="31"
      containerWidth="95%"
    >
      {/* PRESERVED EXACT FIRST ROW: Incident & Date */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="incident"
            label="Incident:"
            value={formValues.incident}
            onChange={handleChange}
            required={true}
            error={formErrors.incident}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="date"
            name="date_incident"
            label="Date of Incident"
            value={formValues.date_incident}
            onChange={handleChange}
            required={true}
            error={formErrors.date_incident}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: Time & Location */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="time"
            name="time_incident"
            label="Time of Incident:"
            value={formValues.time_incident}
            onChange={handleChange}
            required={true}
            error={formErrors.time_incident}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="place_of_incident"
            label="Location of incident:"
            value={formValues.place_of_incident}
            onChange={handleChange}
            required={true}
            error={formErrors.place_of_incident}
          />
        </div>
      </div>

      {/* PRESERVED EXACT TRAIN DETAILS */}
      <div className="row mb-3">
        <div className="col-md-12">
          <UniversalOperationFormField
            type="text"
            name="tdetails"
            label="Train Details:"
            value={formValues.tdetails}
            onChange={handleChange}
            error={formErrors.tdetails}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SCTO DETAILS */}
      <div className="row mb-3">
        <div className="col-md-12">
          <UniversalOperationFormField
            type="text"
            name="name_of_scto"
            label="Name of SCTO:"
            value={formValues.name_of_scto}
            onChange={handleChange}
            error={formErrors.name_of_scto}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <UniversalOperationFormField
            type="number"
            name="empid_of_scto"
            label="Emp Id of SCTO:"
            value={formValues.empid_of_scto}
            onChange={handleChange}
            error={formErrors.empid_of_scto}
          />
        </div>
      </div>

      {/* PRESERVED EXACT REASON SECTION */}
      <div className="row mb-3">
        <div className="col-md-12">
          <UniversalOperationFormField
            type="text"
            name="reason"
            label="Reason"
            value={formValues.reason}
            onChange={handleChange}
            error={formErrors.reason}
          />
        </div>
      </div>

      {/* PRESERVED EXACT DYNAMIC BRIEF SECTION */}
      <div className="row mb-3">
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
      </div>

      {/* PRESERVED EXACT DYNAMIC REPERCUSSION SECTION */}
      <div className="row mb-3">
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
      </div>

      {/* PRESERVED EXACT RESPONSIBLE DEPARTMENT DROPDOWN */}
      <div className="row mb-3">
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="responsible_depart" className="form-label">
              Responsible Department:
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.responsible_depart ? 'is-invalid' : ''}`}
              id="responsible_depart"
              name="responsible_depart"
              value={formValues.responsible_depart}
              onChange={handleChange}
              required
            >
              <option value="">Please Select</option>
              {ResponsibleDepartment.map((rd, idx) => (
                <option key={idx} value={rd}>
                  {rd}
                </option>
              ))}
            </select>
            {formErrors.responsible_depart && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.responsible_depart}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT TC DETAILS */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="sign_of_tc_acc"
            label="Name of TC"
            value={formValues.sign_of_tc_acc}
            onChange={handleChange}
            error={formErrors.sign_of_tc_acc}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="employee"
            name="unit"
            label="EMP ID of TC"
            value={formValues.unit}
            onChange={handleChange}
            error={formErrors.unit}
          />
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default OCCIncidentAccidentForm;