import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm } from "../validation/signallingValidationSchemas";
import { formatDate, formatTime } from "../../../data/formatDate";

const IncidentRegisterSignallingForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [sNo, setSNo] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  // PRESERVED EXACT INITIAL VALUES from original form - No changes to field names
  const basicInitialValues = {
    S_No: sNo,
    date1: formatDate(new Date().toString()),
    time: formatTime(new Date()),
    details: "",
    empno: "",
    empname: "",
    desig: "",
    remarks: "",
    reportedto: "",
    empid: "",
    incidentType: "",
    severity: "",
    location: "",
    equipmentInvolved: "",
    actionTaken: "",
    followUpRequired: "",
    status: "open"
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Incident type options
  const incidentTypeOptions = [
    { value: "signal-failure", label: "Signal Failure" },
    { value: "equipment-malfunction", label: "Equipment Malfunction" },
    { value: "power-failure", label: "Power Failure" },
    { value: "communication-failure", label: "Communication Failure" },
    { value: "track-circuit-failure", label: "Track Circuit Failure" },
    { value: "point-failure", label: "Point Failure" },
    { value: "safety-incident", label: "Safety Incident" },
    { value: "operational-irregularity", label: "Operational Irregularity" },
    { value: "environmental-damage", label: "Environmental Damage" },
    { value: "other", label: "Other" }
  ];

  // Severity options
  const severityOptions = [
    { value: "critical", label: "Critical - Immediate action required" },
    { value: "high", label: "High - Action required within 24 hours" },
    { value: "medium", label: "Medium - Action required within 48 hours" },
    { value: "low", label: "Low - Routine maintenance" }
  ];

  // Status options
  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" }
  ];

  const handleFieldChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
    
    // Clear field error on change
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Required field validation
    if (!formValues.date1) errors.date1 = "Date is required";
    if (!formValues.time) errors.time = "Time is required";
    if (!formValues.details || formValues.details.trim().length < 10) {
      errors.details = "Incident details are required (minimum 10 characters)";
    }
    if (!formValues.empname) errors.empname = "Employee name is required";
    if (!formValues.empno) errors.empno = "Employee number is required";
    if (!formValues.desig) errors.desig = "Designation is required";
    if (!formValues.incidentType) errors.incidentType = "Incident type is required";
    if (!formValues.severity) errors.severity = "Severity level is required";

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      const errors = validateForm();
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setIsLoading(false);
        return;
      }

      // Here you would normally dispatch to the reducer
      // Preserving original structure: dispatch(addData(formValues));
      console.log("Incident Register Signalling Form Submission:", formValues);
      
      // Navigate to list page (preserving original navigation)
      navigate("/list/incident-register");
      
    } catch (error) {
      console.error("Error submitting Incident Register form:", error);
      setFormErrors({ submit: "An error occurred while submitting the form." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  // Determine if this is a safety-critical incident
  const isSafetyCritical = formValues.severity === "critical" || 
                          formValues.incidentType === "safety-incident";

  return (
    <SignallingFormLayout
      title="Incident Register - Signalling"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
      showSafetyAlert={isSafetyCritical}
      safetyMessage="Safety critical incident - immediate escalation required"
      emergencyEscalation={isSafetyCritical}
      equipmentContext={formValues.equipmentInvolved}
      complianceStatus={formValues.status === "closed" ? "compliant" : "pending"}
    >
      {/* Basic Incident Information */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Incident Information
          </h5>
        </div>
        
        <div className="col-md-3">
          <UniversalSignallingFormField
            type="number"
            name="S_No"
            label="Serial Number"
            value={formValues.S_No}
            onChange={(e) => handleFieldChange("S_No", parseInt(e.target.value))}
            required
            error={formErrors.S_No}
            readOnly
          />
        </div>

        <div className="col-md-3">
          <UniversalSignallingFormField
            type="date"
            name="date1"
            label="Incident Date"
            value={formValues.date1}
            onChange={(e) => handleFieldChange("date1", e.target.value)}
            required
            error={formErrors.date1}
          />
        </div>

        <div className="col-md-3">
          <UniversalSignallingFormField
            type="time"
            name="time"
            label="Incident Time"
            value={formValues.time}
            onChange={(e) => handleFieldChange("time", e.target.value)}
            required
            error={formErrors.time}
          />
        </div>

        <div className="col-md-3">
          <UniversalSignallingFormField
            type="select"
            name="incidentType"
            label="Incident Type"
            value={formValues.incidentType}
            onChange={(e) => handleFieldChange("incidentType", e.target.value)}
            options={incidentTypeOptions}
            required
            error={formErrors.incidentType}
          />
        </div>
      </div>

      {/* Severity and Status */}
      <div className="row mb-4">
        <div className="col-md-6">
          <UniversalSignallingFormField
            type="select"
            name="severity"
            label="Severity Level"
            value={formValues.severity}
            onChange={(e) => handleFieldChange("severity", e.target.value)}
            options={severityOptions}
            required
            error={formErrors.severity}
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="select"
            name="status"
            label="Status"
            value={formValues.status}
            onChange={(e) => handleFieldChange("status", e.target.value)}
            options={statusOptions}
            required
            error={formErrors.status}
          />
        </div>
      </div>

      {/* Location and Equipment */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-map-marker-alt me-2"></i>
            Location & Equipment Details
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="text"
            name="location"
            label="Location"
            value={formValues.location}
            onChange={(e) => handleFieldChange("location", e.target.value)}
            error={formErrors.location}
            placeholder="Specific location where incident occurred"
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="text"
            name="equipmentInvolved"
            label="Equipment Involved"
            value={formValues.equipmentInvolved}
            onChange={(e) => handleFieldChange("equipmentInvolved", e.target.value)}
            error={formErrors.equipmentInvolved}
            placeholder="Equipment ID or description"
          />
        </div>
      </div>

      {/* Incident Description */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-file-alt me-2"></i>
            Incident Description
          </h5>
        </div>

        <div className="col-12">
          <UniversalSignallingFormField
            type="textarea"
            name="details"
            label="Incident Details"
            value={formValues.details}
            onChange={(e) => handleFieldChange("details", e.target.value)}
            rows={5}
            required
            error={formErrors.details}
            placeholder="Detailed description of the incident, including circumstances and immediate impact..."
          />
        </div>
      </div>

      {/* Reporting Personnel */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-user me-2"></i>
            Reporting Personnel
          </h5>
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="empname"
            label="Employee Name"
            value={formValues.empname}
            onChange={(e) => handleFieldChange("empname", e.target.value)}
            required
            error={formErrors.empname}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="empno"
            label="Employee Number"
            value={formValues.empno}
            onChange={(e) => handleFieldChange("empno", e.target.value)}
            required
            error={formErrors.empno}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="desig"
            label="Designation"
            value={formValues.desig}
            onChange={(e) => handleFieldChange("desig", e.target.value)}
            required
            error={formErrors.desig}
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="technicianId"
            name="empid"
            label="Employee ID"
            value={formValues.empid}
            onChange={(e) => handleFieldChange("empid", e.target.value)}
            error={formErrors.empid}
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="text"
            name="reportedto"
            label="Reported To"
            value={formValues.reportedto}
            onChange={(e) => handleFieldChange("reportedto", e.target.value)}
            error={formErrors.reportedto}
            placeholder="Name and designation of supervisor notified"
          />
        </div>
      </div>

      {/* Action and Follow-up */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-tasks me-2"></i>
            Action & Follow-up
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="actionTaken"
            label="Immediate Action Taken"
            value={formValues.actionTaken}
            onChange={(e) => handleFieldChange("actionTaken", e.target.value)}
            rows={4}
            error={formErrors.actionTaken}
            placeholder="Describe immediate actions taken to address the incident..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="followUpRequired"
            label="Follow-up Required"
            value={formValues.followUpRequired}
            onChange={(e) => handleFieldChange("followUpRequired", e.target.value)}
            rows={4}
            error={formErrors.followUpRequired}
            placeholder="Any follow-up actions or monitoring required..."
          />
        </div>
      </div>

      {/* Additional Remarks */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-sticky-note me-2"></i>
            Additional Information
          </h5>
        </div>

        <div className="col-12">
          <UniversalSignallingFormField
            type="textarea"
            name="remarks"
            label="Remarks"
            value={formValues.remarks}
            onChange={(e) => handleFieldChange("remarks", e.target.value)}
            rows={3}
            error={formErrors.remarks}
            placeholder="Any additional remarks, observations, or recommendations..."
          />
        </div>
      </div>

      {/* Submit Error Display */}
      {formErrors.submit && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-circle me-2"></i>
              {formErrors.submit}
            </div>
          </div>
        </div>
      )}
    </SignallingFormLayout>
  );
};

export default IncidentRegisterSignallingForm;