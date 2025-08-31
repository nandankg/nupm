import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm, hardwareFailureValidation } from "../validation/signallingValidationSchemas";
import { formatDate, formatTime } from "../../../data/formatDate";

const HardwareFailureForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // PRESERVED EXACT INITIAL VALUES - No changes to field names
  const basicInitialValues = {
    failureDate: formatDate(new Date().toString()),
    failureTime: formatTime(new Date()),
    equipmentType: "",
    equipmentId: "",
    equipmentLocation: "",
    faultDescription: "",
    faultSymptoms: "",
    priorityLevel: "",
    affectedOperations: "",
    safetyImpact: "",
    workaroundImplemented: "",
    technicianAssigned: "",
    supervisorNotified: "",
    estimatedRepairTime: "",
    sparesRequired: "",
    vendorContactRequired: "",
    status: "reported",
    reportedBy: "",
    reporterDesignation: "",
    reporterContact: "",
    initialAssessment: "",
    remarks: ""
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Equipment type options (from validation schema)
  const equipmentTypeOptions = [
    { value: "color-light-signal", label: "Color Light Signal" },
    { value: "shunt-signal", label: "Shunt Signal" },
    { value: "point-machine", label: "Point Machine" },
    { value: "track-circuit", label: "Track Circuit" },
    { value: "axle-counter", label: "Axle Counter" },
    { value: "ats-cabinet", label: "ATS Cabinet" },
    { value: "dcs-tre", label: "DCS TRE" },
    { value: "esp-equipment", label: "ESP Equipment" },
    { value: "signal-lamp", label: "Signal Lamp" },
    { value: "battery-system", label: "Battery System" },
    { value: "relay", label: "Relay" },
    { value: "cable", label: "Cable" },
    { value: "junction-box", label: "Junction Box" },
    { value: "other", label: "Other Equipment" }
  ];

  // Priority level options (from validation schema)
  const priorityOptions = [
    { value: "critical", label: "Critical - Immediate action required" },
    { value: "high", label: "High - Action within 4 hours" },
    { value: "medium", label: "Medium - Action within 24 hours" },
    { value: "low", label: "Low - Next maintenance window" }
  ];

  // Status options
  const statusOptions = [
    { value: "reported", label: "Reported" },
    { value: "under-investigation", label: "Under Investigation" },
    { value: "repair-in-progress", label: "Repair in Progress" },
    { value: "parts-awaited", label: "Parts Awaited" },
    { value: "vendor-support-required", label: "Vendor Support Required" },
    { value: "testing", label: "Testing" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" }
  ];

  // Safety impact options
  const safetyImpactOptions = [
    { value: "none", label: "No Safety Impact" },
    { value: "minor", label: "Minor Safety Impact" },
    { value: "major", label: "Major Safety Impact" },
    { value: "critical", label: "Critical Safety Impact" }
  ];

  const handleFieldChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
    
    // Clear field error on change
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Validate form using signalling validation schema
      const errors = validateSignallingForm(formValues, hardwareFailureValidation);
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setIsLoading(false);
        return;
      }

      // Here you would normally dispatch to a reducer
      console.log("Hardware Failure Form Submission:", formValues);
      
      // Navigate on success
      navigate("/list/hardware-failure");
      
    } catch (error) {
      console.error("Error submitting Hardware Failure form:", error);
      setFormErrors({ submit: "An error occurred while submitting the form." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  // Determine if this is a critical failure
  const isCritical = formValues.priorityLevel === "critical" || 
                    formValues.safetyImpact === "critical";

  return (
    <SignallingFormLayout
      title="Hardware Failure Report - Signalling"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
      showSafetyAlert={isCritical}
      safetyMessage="Critical hardware failure - immediate attention required"
      emergencyEscalation={isCritical}
      equipmentContext={`${formValues.equipmentType} - ${formValues.equipmentId}`}
      complianceStatus={formValues.status === "closed" ? "compliant" : "pending"}
    >
      {/* Failure Information */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Failure Information
          </h5>
        </div>
        
        <div className="col-md-4">
          <UniversalSignallingFormField
            type="date"
            name="failureDate"
            label="Failure Date"
            value={formValues.failureDate}
            onChange={(e) => handleFieldChange("failureDate", e.target.value)}
            required
            error={formErrors.failureDate}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="time"
            name="failureTime"
            label="Failure Time"
            value={formValues.failureTime}
            onChange={(e) => handleFieldChange("failureTime", e.target.value)}
            required
            error={formErrors.failureTime}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="select"
            name="priorityLevel"
            label="Priority Level"
            value={formValues.priorityLevel}
            onChange={(e) => handleFieldChange("priorityLevel", e.target.value)}
            options={priorityOptions}
            required
            error={formErrors.priorityLevel}
          />
        </div>
      </div>

      {/* Equipment Details */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-cogs me-2"></i>
            Equipment Details
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="equipmentType"
            name="equipmentType"
            label="Equipment Type"
            value={formValues.equipmentType}
            onChange={(e) => handleFieldChange("equipmentType", e.target.value)}
            required
            error={formErrors.equipmentType}
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="text"
            name="equipmentId"
            label="Equipment ID"
            value={formValues.equipmentId}
            onChange={(e) => handleFieldChange("equipmentId", e.target.value)}
            required
            error={formErrors.equipmentId}
            placeholder="Enter equipment identifier"
          />
        </div>

        <div className="col-md-12">
          <UniversalSignallingFormField
            type="text"
            name="equipmentLocation"
            label="Equipment Location"
            value={formValues.equipmentLocation}
            onChange={(e) => handleFieldChange("equipmentLocation", e.target.value)}
            error={formErrors.equipmentLocation}
            placeholder="Specific location of the equipment"
          />
        </div>
      </div>

      {/* Fault Description */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-file-alt me-2"></i>
            Fault Description
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="faultDescription"
            label="Fault Description"
            value={formValues.faultDescription}
            onChange={(e) => handleFieldChange("faultDescription", e.target.value)}
            rows={4}
            required
            error={formErrors.faultDescription}
            placeholder="Detailed description of the fault..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="faultSymptoms"
            label="Fault Symptoms"
            value={formValues.faultSymptoms}
            onChange={(e) => handleFieldChange("faultSymptoms", e.target.value)}
            rows={4}
            error={formErrors.faultSymptoms}
            placeholder="Observable symptoms and behavior..."
          />
        </div>
      </div>

      {/* Impact Assessment */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-chart-line me-2"></i>
            Impact Assessment
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="select"
            name="safetyImpact"
            label="Safety Impact"
            value={formValues.safetyImpact}
            onChange={(e) => handleFieldChange("safetyImpact", e.target.value)}
            options={safetyImpactOptions}
            error={formErrors.safetyImpact}
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="affectedOperations"
            label="Affected Operations"
            value={formValues.affectedOperations}
            onChange={(e) => handleFieldChange("affectedOperations", e.target.value)}
            rows={3}
            error={formErrors.affectedOperations}
            placeholder="Operations affected by this failure..."
          />
        </div>
      </div>

      {/* Immediate Response */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-tools me-2"></i>
            Immediate Response
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="workaroundImplemented"
            label="Workaround Implemented"
            value={formValues.workaroundImplemented}
            onChange={(e) => handleFieldChange("workaroundImplemented", e.target.value)}
            rows={3}
            error={formErrors.workaroundImplemented}
            placeholder="Temporary solutions or workarounds implemented..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="initialAssessment"
            label="Initial Assessment"
            value={formValues.initialAssessment}
            onChange={(e) => handleFieldChange("initialAssessment", e.target.value)}
            rows={3}
            error={formErrors.initialAssessment}
            placeholder="Initial technical assessment of the failure..."
          />
        </div>
      </div>

      {/* Assignment and Resources */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-user-cog me-2"></i>
            Assignment & Resources
          </h5>
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="technicianId"
            name="technicianAssigned"
            label="Technician Assigned"
            value={formValues.technicianAssigned}
            onChange={(e) => handleFieldChange("technicianAssigned", e.target.value)}
            error={formErrors.technicianAssigned}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="supervisorNotified"
            label="Supervisor Notified"
            value={formValues.supervisorNotified}
            onChange={(e) => handleFieldChange("supervisorNotified", e.target.value)}
            error={formErrors.supervisorNotified}
            placeholder="Supervisor name and time"
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="number"
            name="estimatedRepairTime"
            label="Estimated Repair Time (hours)"
            value={formValues.estimatedRepairTime}
            onChange={(e) => handleFieldChange("estimatedRepairTime", e.target.value)}
            error={formErrors.estimatedRepairTime}
            placeholder="Hours required for repair"
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="sparesRequired"
            label="Spares Required"
            value={formValues.sparesRequired}
            onChange={(e) => handleFieldChange("sparesRequired", e.target.value)}
            rows={2}
            error={formErrors.sparesRequired}
            placeholder="List of spare parts or components needed..."
          />
        </div>

        <div className="col-md-6">
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="vendorContactRequired"
              checked={formValues.vendorContactRequired}
              onChange={(e) => handleFieldChange("vendorContactRequired", e.target.checked)}
            />
            <label className="form-check-label" htmlFor="vendorContactRequired">
              Vendor Contact Required
            </label>
          </div>
        </div>
      </div>

      {/* Status and Reporting */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-clipboard-check me-2"></i>
            Status & Reporting
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="select"
            name="status"
            label="Current Status"
            value={formValues.status}
            onChange={(e) => handleFieldChange("status", e.target.value)}
            options={statusOptions}
            error={formErrors.status}
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="text"
            name="reportedBy"
            label="Reported By"
            value={formValues.reportedBy}
            onChange={(e) => handleFieldChange("reportedBy", e.target.value)}
            error={formErrors.reportedBy}
            placeholder="Name of person reporting the failure"
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="text"
            name="reporterDesignation"
            label="Reporter Designation"
            value={formValues.reporterDesignation}
            onChange={(e) => handleFieldChange("reporterDesignation", e.target.value)}
            error={formErrors.reporterDesignation}
            placeholder="Designation of the reporter"
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="text"
            name="reporterContact"
            label="Reporter Contact"
            value={formValues.reporterContact}
            onChange={(e) => handleFieldChange("reporterContact", e.target.value)}
            error={formErrors.reporterContact}
            placeholder="Contact details of the reporter"
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

export default HardwareFailureForm;