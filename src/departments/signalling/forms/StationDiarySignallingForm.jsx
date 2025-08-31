import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm, stationDiarySignallingValidation } from "../validation/signallingValidationSchemas";
import { formatDate, formatTime } from "../../../data/formatDate";

const StationDiarySignallingForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // PRESERVED EXACT INITIAL VALUES - No changes to field names
  const basicInitialValues = {
    date: formatDate(new Date().toString()),
    shift: "",
    stationName: "",
    signalmanName: "",
    signalmanId: "",
    weatherConditions: "",
    visibility: "",
    trainOperations: "",
    signallingIssues: "",
    maintenanceWork: "",
    incidentReported: false,
    incidentDetails: "",
    passengerFlow: "",
    equipmentStatus: "",
    communicationStatus: "",
    powerSupplyStatus: "",
    emergencyProcedures: "",
    reportedTo: "",
    supervisorName: "",
    supervisorId: "",
    remarks: "",
    nextShiftInstructions: ""
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Shift options
  const shiftOptions = [
    { value: "morning", label: "Morning (06:00 - 14:00)" },
    { value: "afternoon", label: "Afternoon (14:00 - 22:00)" },
    { value: "night", label: "Night (22:00 - 06:00)" }
  ];

  // Weather condition options
  const weatherOptions = [
    { value: "clear", label: "Clear" },
    { value: "cloudy", label: "Cloudy" },
    { value: "rainy", label: "Rainy" },
    { value: "foggy", label: "Foggy" },
    { value: "windy", label: "Windy" },
    { value: "stormy", label: "Stormy" }
  ];

  // Visibility options
  const visibilityOptions = [
    { value: "excellent", label: "Excellent (>10 km)" },
    { value: "good", label: "Good (5-10 km)" },
    { value: "moderate", label: "Moderate (2-5 km)" },
    { value: "poor", label: "Poor (1-2 km)" },
    { value: "very-poor", label: "Very Poor (<1 km)" }
  ];

  // Status options
  const statusOptions = [
    { value: "normal", label: "Normal" },
    { value: "minor-issues", label: "Minor Issues" },
    { value: "major-issues", label: "Major Issues" },
    { value: "under-maintenance", label: "Under Maintenance" },
    { value: "out-of-order", label: "Out of Order" }
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
      // Validate form
      const errors = validateSignallingForm(formValues, stationDiarySignallingValidation);
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setIsLoading(false);
        return;
      }

      // Here you would normally dispatch to a reducer
      // For now, we'll use console.log to show the preserved data structure
      console.log("Station Diary Signalling Form Submission:", formValues);
      
      // Navigate on success
      navigate("/list/station-diary-signalling");
      
    } catch (error) {
      console.error("Error submitting Station Diary Signalling form:", error);
      setFormErrors({ submit: "An error occurred while submitting the form." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <SignallingFormLayout
      title="Station Diary - Signalling"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
      showSafetyAlert={formValues.incidentReported}
      safetyMessage="Incident reported - ensure proper documentation and escalation"
      equipmentContext={formValues.stationName}
      complianceStatus="compliant"
    >
      {/* Basic Information Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-calendar-day me-2"></i>
            Basic Information
          </h5>
        </div>
        
        <div className="col-md-4">
          <UniversalSignallingFormField
            type="date"
            name="date"
            label="Date"
            value={formValues.date}
            onChange={(e) => handleFieldChange("date", e.target.value)}
            required
            error={formErrors.date}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="select"
            name="shift"
            label="Shift"
            value={formValues.shift}
            onChange={(e) => handleFieldChange("shift", e.target.value)}
            options={shiftOptions}
            required
            error={formErrors.shift}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="station"
            name="stationName"
            label="Station Name"
            value={formValues.stationName}
            onChange={(e) => handleFieldChange("stationName", e.target.value)}
            required
            error={formErrors.stationName}
          />
        </div>
      </div>

      {/* Personnel Information */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-user-tie me-2"></i>
            Personnel Information
          </h5>
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="signalmanName"
            label="Signalman Name"
            value={formValues.signalmanName}
            onChange={(e) => handleFieldChange("signalmanName", e.target.value)}
            required
            error={formErrors.signalmanName}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="technicianId"
            name="signalmanId"
            label="Signalman ID"
            value={formValues.signalmanId}
            onChange={(e) => handleFieldChange("signalmanId", e.target.value)}
            required
            error={formErrors.signalmanId}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="text"
            name="supervisorName"
            label="Supervisor Name"
            value={formValues.supervisorName}
            onChange={(e) => handleFieldChange("supervisorName", e.target.value)}
            error={formErrors.supervisorName}
          />
        </div>
      </div>

      {/* Environmental Conditions */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-cloud-sun me-2"></i>
            Environmental Conditions
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="select"
            name="weatherConditions"
            label="Weather Conditions"
            value={formValues.weatherConditions}
            onChange={(e) => handleFieldChange("weatherConditions", e.target.value)}
            options={weatherOptions}
            error={formErrors.weatherConditions}
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="select"
            name="visibility"
            label="Visibility"
            value={formValues.visibility}
            onChange={(e) => handleFieldChange("visibility", e.target.value)}
            options={visibilityOptions}
            error={formErrors.visibility}
          />
        </div>
      </div>

      {/* Operations Status */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-cogs me-2"></i>
            Operations Status
          </h5>
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="select"
            name="equipmentStatus"
            label="Equipment Status"
            value={formValues.equipmentStatus}
            onChange={(e) => handleFieldChange("equipmentStatus", e.target.value)}
            options={statusOptions}
            error={formErrors.equipmentStatus}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="select"
            name="communicationStatus"
            label="Communication Status"
            value={formValues.communicationStatus}
            onChange={(e) => handleFieldChange("communicationStatus", e.target.value)}
            options={statusOptions}
            error={formErrors.communicationStatus}
          />
        </div>

        <div className="col-md-4">
          <UniversalSignallingFormField
            type="select"
            name="powerSupplyStatus"
            label="Power Supply Status"
            value={formValues.powerSupplyStatus}
            onChange={(e) => handleFieldChange("powerSupplyStatus", e.target.value)}
            options={statusOptions}
            error={formErrors.powerSupplyStatus}
          />
        </div>
      </div>

      {/* Operational Details */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-clipboard-list me-2"></i>
            Operational Details
          </h5>
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="trainOperations"
            label="Train Operations Summary"
            value={formValues.trainOperations}
            onChange={(e) => handleFieldChange("trainOperations", e.target.value)}
            rows={4}
            error={formErrors.trainOperations}
            placeholder="Summary of train operations during shift..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="signallingIssues"
            label="Signalling Issues"
            value={formValues.signallingIssues}
            onChange={(e) => handleFieldChange("signallingIssues", e.target.value)}
            rows={4}
            error={formErrors.signallingIssues}
            placeholder="Any signalling issues encountered..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="maintenanceWork"
            label="Maintenance Work"
            value={formValues.maintenanceWork}
            onChange={(e) => handleFieldChange("maintenanceWork", e.target.value)}
            rows={4}
            error={formErrors.maintenanceWork}
            placeholder="Maintenance work performed or scheduled..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="passengerFlow"
            label="Passenger Flow"
            value={formValues.passengerFlow}
            onChange={(e) => handleFieldChange("passengerFlow", e.target.value)}
            rows={4}
            error={formErrors.passengerFlow}
            placeholder="Passenger flow observations..."
          />
        </div>
      </div>

      {/* Incident Reporting */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="border-bottom pb-2 mb-3">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Incident Reporting
          </h5>
        </div>

        <div className="col-md-4">
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="incidentReported"
              checked={formValues.incidentReported}
              onChange={(e) => handleFieldChange("incidentReported", e.target.checked)}
            />
            <label className="form-check-label" htmlFor="incidentReported">
              Incident Reported
            </label>
          </div>
        </div>

        {formValues.incidentReported && (
          <>
            <div className="col-md-8">
              <UniversalSignallingFormField
                type="textarea"
                name="incidentDetails"
                label="Incident Details"
                value={formValues.incidentDetails}
                onChange={(e) => handleFieldChange("incidentDetails", e.target.value)}
                rows={3}
                required
                error={formErrors.incidentDetails}
                placeholder="Detailed description of the incident..."
              />
            </div>

            <div className="col-md-6">
              <UniversalSignallingFormField
                type="text"
                name="reportedTo"
                label="Reported To"
                value={formValues.reportedTo}
                onChange={(e) => handleFieldChange("reportedTo", e.target.value)}
                error={formErrors.reportedTo}
                placeholder="Name and designation of person reported to..."
              />
            </div>
          </>
        )}
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
            name="emergencyProcedures"
            label="Emergency Procedures"
            value={formValues.emergencyProcedures}
            onChange={(e) => handleFieldChange("emergencyProcedures", e.target.value)}
            rows={3}
            error={formErrors.emergencyProcedures}
            placeholder="Emergency procedures implemented if any..."
          />
        </div>

        <div className="col-md-6">
          <UniversalSignallingFormField
            type="textarea"
            name="nextShiftInstructions"
            label="Next Shift Instructions"
            value={formValues.nextShiftInstructions}
            onChange={(e) => handleFieldChange("nextShiftInstructions", e.target.value)}
            rows={3}
            error={formErrors.nextShiftInstructions}
            placeholder="Instructions for the next shift..."
          />
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
            placeholder="Any additional remarks or observations..."
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

export default StationDiarySignallingForm;