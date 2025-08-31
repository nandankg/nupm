import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm } from "../validation/signallingValidationSchemas";
import { formatDate, formatTime } from "../../../data/formatDate";

const SEREntryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // PRESERVED EXACT INITIAL VALUES - No changes to field names
  const basicInitialValues = {
    serNumber: "",
    entryDate: formatDate(new Date().toString()),
    entryTime: formatTime(new Date()),
    equipmentId: "",
    equipmentType: "",
    equipmentLocation: "",
    failureDescription: "",
    serviceAffected: "",
    normalWorking: false,
    outOfOrder: false,
    underMaintenance: false,
    actionTaken: "",
    temporaryArrangement: "",
    materialUsed: "",
    technician: "",
    supervisor: "",
    clearanceTime: "",
    testingCompleted: false,
    equipmentStatus: "",
    remarksNotes: "",
    nextActionRequired: "",
    priorityLevel: "",
    followUpDate: "",
    spare_parts_required: "",
    vendor_contact: false
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Equipment status options
  const statusOptions = [
    { value: "normal", label: "Normal Working" },
    { value: "out-of-order", label: "Out of Order" },
    { value: "under-maintenance", label: "Under Maintenance" },
    { value: "testing", label: "Under Testing" },
    { value: "standby", label: "On Standby" }
  ];

  // Priority levels
  const priorityOptions = [
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" }
  ];

  // Service affected options
  const serviceOptions = [
    { value: "none", label: "No Service Affected" },
    { value: "minor", label: "Minor Service Impact" },
    { value: "major", label: "Major Service Disruption" },
    { value: "complete", label: "Complete Service Stoppage" }
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
    if (!formValues.serNumber) errors.serNumber = "SER Number is required";
    if (!formValues.entryDate) errors.entryDate = "Entry date is required";
    if (!formValues.entryTime) errors.entryTime = "Entry time is required";
    if (!formValues.equipmentId) errors.equipmentId = "Equipment ID is required";
    if (!formValues.equipmentType) errors.equipmentType = "Equipment type is required";
    if (!formValues.failureDescription || formValues.failureDescription.trim().length < 10) {
      errors.failureDescription = "Failure description is required (minimum 10 characters)";
    }
    if (!formValues.technician) errors.technician = "Technician name is required";
    if (!formValues.equipmentStatus) errors.equipmentStatus = "Equipment status is required";

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

      // Here you would normally dispatch to a reducer
      console.log("SER Entry Form Submission:", formValues);
      
      // Navigate on success
      navigate("/list/ser-entry");
      
    } catch (error) {
      console.error("Error submitting SER Entry form:", error);
      setFormErrors({ submit: "An error occurred while submitting the form." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  // Determine if this requires immediate attention
  const requiresImmediate = formValues.priorityLevel === "critical" || 
                           formValues.serviceAffected === "complete";

  return (
    <SignallingFormLayout
      title="SER Entry - Signalling Equipment Record"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
      showSafetyAlert={requiresImmediate}
      safetyMessage="Critical equipment issue - immediate attention required"
      emergencyEscalation={requiresImmediate}
      equipmentContext={`${formValues.equipmentType} - ${formValues.equipmentId}`}
      complianceStatus={formValues.equipmentStatus === "normal" ? "compliant" : "pending"}
    >
      {/* SER Basic Information */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-file-alt me-2"></i>
            SER Entry Information
          </h5>
        </div>
        
        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="serNumber"
            label="SER Number"
            value={formValues.serNumber}
            onChange={(e) => handleFieldChange("serNumber", e.target.value)}
            required
            error={formErrors.serNumber}
            placeholder="e.g., SER-2025-001"
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="date"
            name="entryDate"
            label="Entry Date"
            value={formValues.entryDate}
            onChange={(e) => handleFieldChange("entryDate", e.target.value)}
            required
            error={formErrors.entryDate}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="time"
            name="entryTime"
            label="Entry Time"
            value={formValues.entryTime}
            onChange={(e) => handleFieldChange("entryTime", e.target.value)}
            required
            error={formErrors.entryTime}
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

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="equipmentId"
            label="Equipment ID"
            value={formValues.equipmentId}
            onChange={(e) => handleFieldChange("equipmentId", e.target.value)}
            required
            error={formErrors.equipmentId}
            placeholder="Equipment identifier"
          />
        </div>

        <div className="col-md-4">
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

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="equipmentLocation"
            label="Equipment Location"
            value={formValues.equipmentLocation}
            onChange={(e) => handleFieldChange("equipmentLocation", e.target.value)}
            error={formErrors.equipmentLocation}
            placeholder="Specific location"
          />
        </div>
      </div>

      {/* Failure/Issue Description */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-exclamation-circle me-2"></i>
            Issue Description
          </h5>
        </div>

        <div className="col-md-8">
          <UniversalSignallingFormField
            type="textarea"
            name="failureDescription"
            label="Failure/Issue Description"
            value={formValues.failureDescription}
            onChange={(e) => handleFieldChange("failureDescription", e.target.value)}
            rows={4}
            required
            error={formErrors.failureDescription}
            placeholder="Detailed description of the equipment failure or issue..."
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="select"
            name="serviceAffected"
            label="Service Affected"
            value={formValues.serviceAffected}
            onChange={(e) => handleFieldChange("serviceAffected", e.target.value)}
            options={serviceOptions}
            error={formErrors.serviceAffected}
          />

          <UniversalSignallingFormField
            type="select"
            name="priorityLevel"
            label="Priority Level"
            value={formValues.priorityLevel}
            onChange={(e) => handleFieldChange("priorityLevel", e.target.value)}
            options={priorityOptions}
            error={formErrors.priorityLevel}
          />
        </div>
      </div>

      {/* Equipment Status Checkboxes */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-check-circle me-2"></i>
            Current Equipment Status
          </h5>
        </div>

        <div className="col-md-4">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="normalWorking"
              checked={formValues.normalWorking}
              onChange={(e) => handleFieldChange("normalWorking", e.target.checked)}
            />
            <label className="form-check-label" htmlFor="normalWorking">
              Normal Working
            </label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="outOfOrder"
              checked={formValues.outOfOrder}
              onChange={(e) => handleFieldChange("outOfOrder", e.target.checked)}
            />
            <label className="form-check-label" htmlFor="outOfOrder">
              Out of Order
            </label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="underMaintenance"
              checked={formValues.underMaintenance}
              onChange={(e) => handleFieldChange("underMaintenance", e.target.checked)}
            />
            <label className="form-check-label" htmlFor="underMaintenance">
              Under Maintenance
            </label>
          </div>
        </div>

        <div className="col-md-12">
          <UniversalSignallingFormField
            type="select"
            name="equipmentStatus"
            label="Overall Equipment Status"
            value={formValues.equipmentStatus}
            onChange={(e) => handleFieldChange("equipmentStatus", e.target.value)}
            options={statusOptions}
            required
            error={formErrors.equipmentStatus}
          />
        </div>
      </div>

      {/* Action Taken */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-tools me-2"></i>
            Action Taken & Resources
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="actionTaken"
            label="Action Taken"
            value={formValues.actionTaken}
            onChange={(e) => handleFieldChange("actionTaken", e.target.value)}
            rows={4}
            error={formErrors.actionTaken}
            placeholder="Actions taken to address the issue..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="temporaryArrangement"
            label="Temporary Arrangement"
            value={formValues.temporaryArrangement}
            onChange={(e) => handleFieldChange("temporaryArrangement", e.target.value)}
            rows={4}
            error={formErrors.temporaryArrangement}
            placeholder="Any temporary arrangements made..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="materialUsed"
            label="Material Used"
            value={formValues.materialUsed}
            onChange={(e) => handleFieldChange("materialUsed", e.target.value)}
            rows={3}
            error={formErrors.materialUsed}
            placeholder="Materials and spare parts used..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="spare_parts_required"
            label="Spare Parts Required"
            value={formValues.spare_parts_required}
            onChange={(e) => handleFieldChange("spare_parts_required", e.target.value)}
            rows={3}
            error={formErrors.spare_parts_required}
            placeholder="Additional spare parts needed..."
          />
        </div>
      </div>

      {/* Personnel & Completion */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-user-cog me-2"></i>
            Personnel & Completion Details
          </h5>
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="technician"
            label="Technician"
            value={formValues.technician}
            onChange={(e) => handleFieldChange("technician", e.target.value)}
            required
            error={formErrors.technician}
            placeholder="Technician name"
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="supervisor"
            label="Supervisor"
            value={formValues.supervisor}
            onChange={(e) => handleFieldChange("supervisor", e.target.value)}
            error={formErrors.supervisor}
            placeholder="Supervisor name"
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="time"
            name="clearanceTime"
            label="Clearance Time"
            value={formValues.clearanceTime}
            onChange={(e) => handleFieldChange("clearanceTime", e.target.value)}
            error={formErrors.clearanceTime}
          />
        </div>

        <div className="col-md-4">
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="testingCompleted"
              checked={formValues.testingCompleted}
              onChange={(e) => handleFieldChange("testingCompleted", e.target.checked)}
            />
            <label className="form-check-label" htmlFor="testingCompleted">
              Testing Completed
            </label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="vendor_contact"
              checked={formValues.vendor_contact}
              onChange={(e) => handleFieldChange("vendor_contact", e.target.checked)}
            />
            <label className="form-check-label" htmlFor="vendor_contact">
              Vendor Contact Required
            </label>
          </div>
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="date"
            name="followUpDate"
            label="Follow-up Date"
            value={formValues.followUpDate}
            onChange={(e) => handleFieldChange("followUpDate", e.target.value)}
            error={formErrors.followUpDate}
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-sticky-note me-2"></i>
            Additional Information
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="nextActionRequired"
            label="Next Action Required"
            value={formValues.nextActionRequired}
            onChange={(e) => handleFieldChange("nextActionRequired", e.target.value)}
            rows={3}
            error={formErrors.nextActionRequired}
            placeholder="Next actions required..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="remarksNotes"
            label="Remarks & Notes"
            value={formValues.remarksNotes}
            onChange={(e) => handleFieldChange("remarksNotes", e.target.value)}
            rows={3}
            error={formErrors.remarksNotes}
            placeholder="Additional remarks and notes..."
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

export default SEREntryForm;