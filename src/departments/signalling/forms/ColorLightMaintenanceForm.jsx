import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm, pmPointMaintenanceValidation } from "../validation/signallingValidationSchemas";
import { addData } from "../../../reducer/ColorLightSignalMainlineReducer";

/**
 * Color Light Signal Maintenance Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const ColorLightMaintenanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colorLightSignal = useSelector((state) => state.colorLightSignal);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (colorLightSignal) {
      setSlug(colorLightSignal.slug);
    }
  }, [colorLightSignal]);

  // Quarterly activities data (preserved from original)
  const quarterlyActivities = [
    { category: "SIGNAL & LED UNIT", Sno: "1", activity: "Cleaning of Aspect Housing & LED Unit." },
    { category: "SIGNAL & LED UNIT", Sno: "2", activity: "LED Functioning." },
    { category: "SIGNAL & LED UNIT", Sno: "3", activity: "Earthing Verification." },
    { category: "SIGNAL & LED UNIT", Sno: "4", activity: "Cleaning of MSB" },
    { category: "SIGNAL & LED UNIT", Sno: "5", activity: "Tightening of all terminations inside MSB & Signal Unit" },
    { category: "SIGNAL & LED UNIT", Sno: "6", activity: "Proper illumination of LED" },
    { category: "SIGNAL & LED UNIT", Sno: "7", activity: "Tightening of all Nuts & Bolts including Ladder" },
    { category: "SIGNAL & LED UNIT", Sno: "8", activity: "Healthiness of all Supports, Brackets & Foundation etc." },
    { category: "SIGNAL & LED UNIT", Sno: "9", activity: "Corrosion Observed/Painting Needed" }
  ];

  const quarterlyActivitiesTwo = [
    { Sno: "10", activity: "Voltage Check in LED Unit Red Aspect" },
    { Sno: "11", activity: "Current Check in LED Unit Red Aspect" },
    { Sno: "12", activity: "Voltage Check in LED Unit Violet Aspect" },
    { Sno: "13", activity: "Current Check in LED Unit Violet Aspect" },
    { Sno: "14", activity: "Voltage Check in LED Unit Green Aspect" },
    { Sno: "15", activity: "Current Check in LED Unit Green Aspect" }
  ];

  const quarterlyActivitiesThree = [
    { category: "ROUTE INDICATOR", Sno: "16", activity: "Cleaning of Route Indicator Housing." },
    { category: "ROUTE INDICATOR", Sno: "17", activity: "Voltage in M-Aspect" },
    { category: "ROUTE INDICATOR", Sno: "18", activity: "Current in M-Aspect" },
    { category: "ROUTE INDICATOR", Sno: "19", activity: "LED Functioning" },
    { category: "ROUTE INDICATOR", Sno: "20", activity: "Earthing Verification" }
  ];

  // PRESERVED EXACT FIELD STRUCTURE - Based on original form patterns
  const [formValues, setFormValues] = useState({
    date: "",
    signalId: "",
    signalLocation: "",
    maintenanceType: "",
    technicianName: "",
    technicianId: "",
    supervisorName: "",
    supervisorId: "",
    
    // Activities status (preserved pattern)
    activity1: "",
    activity2: "",
    activity3: "",
    activity4: "",
    activity5: "",
    activity6: "",
    activity7: "",
    activity8: "",
    activity9: "",
    activity10: "",
    activity11: "",
    activity12: "",
    activity13: "",
    activity14: "",
    activity15: "",
    activity16: "",
    activity17: "",
    activity18: "",
    activity19: "",
    activity20: "",
    
    // Voltage readings
    redVoltage: "",
    redCurrent: "",
    violetVoltage: "",
    violetCurrent: "",
    greenVoltage: "",
    greenCurrent: "",
    routeVoltage: "",
    routeCurrent: "",
    
    // Additional fields
    earthingStatus: "",
    overallCondition: "",
    defectsFound: "",
    correctiveAction: "",
    nextDueDate: "",
    remarks: "",
    completionTime: "",
    testResults: ""
  });

  // Maintenance type options
  const maintenanceTypeOptions = [
    { value: "", label: "Select Maintenance Type" },
    { value: "monthly", label: "Monthly PM" },
    { value: "quarterly", label: "Quarterly PM" },
    { value: "half-yearly", label: "Half Yearly PM" },
    { value: "yearly", label: "Yearly PM" },
    { value: "corrective", label: "Corrective Maintenance" },
    { value: "emergency", label: "Emergency Repair" }
  ];

  // Activity status options
  const activityStatusOptions = [
    { value: "", label: "Not Done" },
    { value: "satisfactory", label: "Satisfactory" },
    { value: "needs-attention", label: "Needs Attention" },
    { value: "completed", label: "Completed" },
    { value: "not-applicable", label: "Not Applicable" },
    { value: "pending", label: "Pending" }
  ];

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear field error when user starts typing
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({
        ...prev,
        [fieldName]: ""
      }));
    }

    // Auto-calculate next due date based on maintenance type
    if (fieldName === "maintenanceType" && formValues.date) {
      const maintenanceDate = new Date(formValues.date);
      let nextDate = new Date(maintenanceDate);
      
      switch (value) {
        case "monthly":
          nextDate.setMonth(nextDate.getMonth() + 1);
          break;
        case "quarterly":
          nextDate.setMonth(nextDate.getMonth() + 3);
          break;
        case "half-yearly":
          nextDate.setMonth(nextDate.getMonth() + 6);
          break;
        case "yearly":
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          break;
        default:
          nextDate = null;
      }
      
      if (nextDate) {
        setFormValues(prev => ({
          ...prev,
          [fieldName]: value,
          nextDueDate: nextDate.toISOString().split('T')[0]
        }));
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formValues.date) {
      errors.date = "Date is required";
    }
    
    if (!formValues.signalId) {
      errors.signalId = "Signal ID is required";
    }
    
    if (!formValues.signalLocation) {
      errors.signalLocation = "Signal location is required";
    }
    
    if (!formValues.maintenanceType) {
      errors.maintenanceType = "Maintenance type is required";
    }
    
    if (!formValues.technicianName) {
      errors.technicianName = "Technician name is required";
    }
    
    if (!formValues.technicianId) {
      errors.technicianId = "Technician ID is required";
    }

    // Voltage validation (if provided)
    const voltageFields = ['redVoltage', 'violetVoltage', 'greenVoltage', 'routeVoltage'];
    voltageFields.forEach(field => {
      if (formValues[field] && (isNaN(formValues[field]) || Number(formValues[field]) < 0 || Number(formValues[field]) > 300)) {
        errors[field] = "Voltage should be between 0-300V";
      }
    });

    // Current validation (if provided)
    const currentFields = ['redCurrent', 'violetCurrent', 'greenCurrent', 'routeCurrent'];
    currentFields.forEach(field => {
      if (formValues[field] && (isNaN(formValues[field]) || Number(formValues[field]) < 0)) {
        errors[field] = "Current should be a positive number";
      }
    });

    // At least 5 activities should be completed
    const completedActivities = Object.keys(formValues)
      .filter(key => key.startsWith('activity') && formValues[key] && formValues[key] !== "")
      .length;
    
    if (completedActivities < 5) {
      errors.general = "At least 5 maintenance activities must be completed";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Preserve exact field structure for API compatibility
      const submissionData = {
        ...formValues,
        slug: slug || "color-light-signal-maintenance"
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("Color Light Signal Maintenance Record saved successfully!");
      navigate("/admin/AllDeptFormList");
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormValues({
      date: "",
      signalId: "",
      signalLocation: "",
      maintenanceType: "",
      technicianName: "",
      technicianId: "",
      supervisorName: "",
      supervisorId: "",
      activity1: "", activity2: "", activity3: "", activity4: "", activity5: "",
      activity6: "", activity7: "", activity8: "", activity9: "", activity10: "",
      activity11: "", activity12: "", activity13: "", activity14: "", activity15: "",
      activity16: "", activity17: "", activity18: "", activity19: "", activity20: "",
      redVoltage: "", redCurrent: "", violetVoltage: "", violetCurrent: "",
      greenVoltage: "", greenCurrent: "", routeVoltage: "", routeCurrent: "",
      earthingStatus: "", overallCondition: "", defectsFound: "", correctiveAction: "",
      nextDueDate: "", remarks: "", completionTime: "", testResults: ""
    });
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="Color Light Signal Maintenance"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Color Light Signal Maintenance", path: "/signalling/color-light-maintenance" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="date"
              label="Maintenance Date"
              value={formValues.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              required={true}
              error={formErrors.date}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="signalId"
              name="signalId"
              label="Signal ID"
              value={formValues.signalId}
              onChange={(e) => handleFieldChange("signalId", e.target.value)}
              required={true}
              error={formErrors.signalId}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="maintenanceType"
              name="maintenanceType"
              label="Maintenance Type"
              value={formValues.maintenanceType}
              onChange={(e) => handleFieldChange("maintenanceType", e.target.value)}
              required={true}
              error={formErrors.maintenanceType}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <UniversalSignallingFormField
              type="text"
              name="signalLocation"
              label="Signal Location"
              value={formValues.signalLocation}
              onChange={(e) => handleFieldChange("signalLocation", e.target.value)}
              placeholder="Detailed location description"
              required={true}
              error={formErrors.signalLocation}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="nextDueDate"
              label="Next Due Date"
              value={formValues.nextDueDate}
              onChange={(e) => handleFieldChange("nextDueDate", e.target.value)}
              readOnly={true}
            />
          </div>
        </div>

        {formErrors.general && (
          <div className="alert alert-danger" role="alert">
            {formErrors.general}
          </div>
        )}

        {/* Signal & LED Unit Activities */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Signal & LED Unit Maintenance Activities</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>S.No.</th>
                    <th style={{ width: "60%" }}>Activity</th>
                    <th style={{ width: "30%" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyActivities.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.Sno}</td>
                      <td>{activity.activity}</td>
                      <td>
                        <UniversalSignallingFormField
                          type="select"
                          name={`activity${index + 1}`}
                          value={formValues[`activity${index + 1}`]}
                          onChange={(e) => handleFieldChange(`activity${index + 1}`, e.target.value)}
                          options={activityStatusOptions}
                          className="form-control-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Voltage and Current Measurements */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">LED Unit Voltage & Current Checks</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Aspect</th>
                        <th>Voltage (V)</th>
                        <th>Current (A)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Red</td>
                        <td>
                          <UniversalSignallingFormField
                            type="voltageReading"
                            name="redVoltage"
                            value={formValues.redVoltage}
                            onChange={(e) => handleFieldChange("redVoltage", e.target.value)}
                            className="form-control-sm"
                            error={formErrors.redVoltage}
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="number"
                            name="redCurrent"
                            value={formValues.redCurrent}
                            onChange={(e) => handleFieldChange("redCurrent", e.target.value)}
                            className="form-control-sm"
                            step="0.01"
                            error={formErrors.redCurrent}
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="select"
                            name="activity10"
                            value={formValues.activity10}
                            onChange={(e) => handleFieldChange("activity10", e.target.value)}
                            options={activityStatusOptions}
                            className="form-control-sm"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Violet</td>
                        <td>
                          <UniversalSignallingFormField
                            type="voltageReading"
                            name="violetVoltage"
                            value={formValues.violetVoltage}
                            onChange={(e) => handleFieldChange("violetVoltage", e.target.value)}
                            className="form-control-sm"
                            error={formErrors.violetVoltage}
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="number"
                            name="violetCurrent"
                            value={formValues.violetCurrent}
                            onChange={(e) => handleFieldChange("violetCurrent", e.target.value)}
                            className="form-control-sm"
                            step="0.01"
                            error={formErrors.violetCurrent}
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="select"
                            name="activity12"
                            value={formValues.activity12}
                            onChange={(e) => handleFieldChange("activity12", e.target.value)}
                            options={activityStatusOptions}
                            className="form-control-sm"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Green</td>
                        <td>
                          <UniversalSignallingFormField
                            type="voltageReading"
                            name="greenVoltage"
                            value={formValues.greenVoltage}
                            onChange={(e) => handleFieldChange("greenVoltage", e.target.value)}
                            className="form-control-sm"
                            error={formErrors.greenVoltage}
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="number"
                            name="greenCurrent"
                            value={formValues.greenCurrent}
                            onChange={(e) => handleFieldChange("greenCurrent", e.target.value)}
                            className="form-control-sm"
                            step="0.01"
                            error={formErrors.greenCurrent}
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="select"
                            name="activity14"
                            value={formValues.activity14}
                            onChange={(e) => handleFieldChange("activity14", e.target.value)}
                            options={activityStatusOptions}
                            className="form-control-sm"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-6">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Route Indicator</th>
                        <th>Voltage (V)</th>
                        <th>Current (A)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>M-Aspect</td>
                        <td>
                          <UniversalSignallingFormField
                            type="voltageReading"
                            name="routeVoltage"
                            value={formValues.routeVoltage}
                            onChange={(e) => handleFieldChange("routeVoltage", e.target.value)}
                            className="form-control-sm"
                            error={formErrors.routeVoltage}
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="number"
                            name="routeCurrent"
                            value={formValues.routeCurrent}
                            onChange={(e) => handleFieldChange("routeCurrent", e.target.value)}
                            className="form-control-sm"
                            step="0.01"
                            error={formErrors.routeCurrent}
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="select"
                            name="activity17"
                            value={formValues.activity17}
                            onChange={(e) => handleFieldChange("activity17", e.target.value)}
                            options={activityStatusOptions}
                            className="form-control-sm"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personnel Information */}
        <div className="row">
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="technicianName"
              label="Technician Name"
              value={formValues.technicianName}
              onChange={(e) => handleFieldChange("technicianName", e.target.value)}
              placeholder="Enter technician name"
              required={true}
              error={formErrors.technicianName}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="technicianId"
              name="technicianId"
              label="Technician ID"
              value={formValues.technicianId}
              onChange={(e) => handleFieldChange("technicianId", e.target.value)}
              required={true}
              error={formErrors.technicianId}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="supervisorName"
              label="Supervisor Name"
              value={formValues.supervisorName}
              onChange={(e) => handleFieldChange("supervisorName", e.target.value)}
              placeholder="Enter supervisor name"
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="supervisorId"
              label="Supervisor ID"
              value={formValues.supervisorId}
              onChange={(e) => handleFieldChange("supervisorId", e.target.value)}
              placeholder="Enter supervisor ID"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="testResult"
              name="testResults"
              label="Overall Test Results"
              value={formValues.testResults}
              onChange={(e) => handleFieldChange("testResults", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="time"
              name="completionTime"
              label="Completion Time"
              value={formValues.completionTime}
              onChange={(e) => handleFieldChange("completionTime", e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="defectsFound"
              label="Defects Found"
              value={formValues.defectsFound}
              onChange={(e) => handleFieldChange("defectsFound", e.target.value)}
              placeholder="List any defects or issues found during maintenance"
              rows={3}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="correctiveAction"
              label="Corrective Action Taken"
              value={formValues.correctiveAction}
              onChange={(e) => handleFieldChange("correctiveAction", e.target.value)}
              placeholder="Describe corrective actions taken"
              rows={3}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="remarks"
              label="Remarks"
              value={formValues.remarks}
              onChange={(e) => handleFieldChange("remarks", e.target.value)}
              placeholder="Additional remarks or observations"
              rows={3}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </span>
                ) : (
                  "Save Color Light Signal Maintenance"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default ColorLightMaintenanceForm;