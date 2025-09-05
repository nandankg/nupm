import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout, FormActionButtons } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import stations from "../../../data/station.json";

/**
 * Equipment Failure Register Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const EquipmentFailureRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loanregister = useSelector((state) => state.data);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Extract slug from URL path
    const getLastParameter = () => {
      const pathname = window.location.pathname;
      const pathSegments = pathname.split("/").filter(Boolean);
      return pathSegments[pathSegments.length - 1];
    };
    setSlug(getLastParameter().trim());
  }, []);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const basicInitialValues = {
    failureDateTime: "",
    station: "",
    location: "",
    department: "",
    equipmentType: "",
    equipmentNo: "",
    failureDetails: "",
    reportedTo: "",
    reportedDateTime: "",
    scEmpNo: "",
    scName: "",
    actionTaken: "",
    actionDateTime: "",
    actionEmpNo: "",
    actionName: "",
    status1: "",
    closeDateTime: "",
    closeEmpNo: "",
    closeName: "",
    remarks: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Station options for dropdown
  const stationOptions = [
    { value: "", label: "Please Select" },
    ...stations
      .filter((station) => station["Station Name"])
      .map((station) => ({
        value: station["STATION Code"],
        label: station["Station Name"]
      }))
  ];

  // Department options
  const departmentOptions = [
    { value: "", label: "Please Select" },
    { value: "operation", label: "Operation" },
    { value: "signalling", label: "Signalling" },
    { value: "telecom", label: "Telecom" },
    { value: "afc", label: "AFC" },
    { value: "maintenance", label: "Maintenance" }
  ];

  // Status options
  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" },
    { value: "escalated", label: "Escalated" }
  ];

  // Equipment type options for signalling
  const equipmentTypeOptions = [
    { value: "", label: "Select Equipment Type" },
    { value: "signal", label: "Signal" },
    { value: "point-machine", label: "Point Machine" },
    { value: "relay", label: "Relay" },
    { value: "cable", label: "Cable" },
    { value: "track-circuit", label: "Track Circuit" },
    { value: "axle-counter", label: "Axle Counter" },
    { value: "led-signal", label: "LED Signal" },
    { value: "ups", label: "UPS" },
    { value: "battery", label: "Battery" },
    { value: "control-panel", label: "Control Panel" },
    { value: "other", label: "Other" }
  ];

  // Handle field changes
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
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formValues.failureDateTime) {
      errors.failureDateTime = "Failure date is required";
    }
    
    if (!formValues.station) {
      errors.station = "Station is required";
    }
    
    if (!formValues.department) {
      errors.department = "Department is required";
    }
    
    if (!formValues.equipmentType) {
      errors.equipmentType = "Equipment type is required";
    }
    
    if (!formValues.failureDetails) {
      errors.failureDetails = "Failure details are required";
    }

    // Validate equipment number is numeric if provided
    if (formValues.equipmentNo && isNaN(formValues.equipmentNo)) {
      errors.equipmentNo = "Equipment number must be numeric";
    }

    // Validate date relationships
    if (formValues.actionDateTime && formValues.failureDateTime) {
      if (new Date(formValues.actionDateTime) < new Date(formValues.failureDateTime)) {
        errors.actionDateTime = "Action date cannot be before failure date";
      }
    }

    if (formValues.closeDateTime && formValues.actionDateTime) {
      if (new Date(formValues.closeDateTime) < new Date(formValues.actionDateTime)) {
        errors.closeDateTime = "Close date cannot be before action date";
      }
    }

    return errors;
  };

  // Handle form submission (Save & Submit - Final submission)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    await submitForm(true); // true = final submission
  };

  // Handle draft save
  const handleSaveDraft = async () => {
    await submitForm(false); // false = draft save
  };

  // Common submission logic
  const submitForm = async (isFinalSubmit) => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Preserve exact field structure for API compatibility
      // FIXED: Map station field to station_name for database compatibility
      const { station, ...otherValues } = formValues;
      const submissionData = {
        formType: slug || "equipment-failure-register",
        values: {
          ...otherValues,
          station_name: station, // Map station to station_name for database
          // Add status based on action type
          status: isFinalSubmit ? "1" : "0", // 1 = submitted, 0 = draft
        }
      };

      dispatch(addData(submissionData));
      
      // Success feedback based on action type
      const message = isFinalSubmit 
        ? "Equipment Failure Register submitted successfully!" 
        : "Equipment Failure Register saved as draft!";
      alert(message);
      
      if (isFinalSubmit) {
        navigate(`/list/${slug}`);
      }
      // For draft save, stay on form for continued editing
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving equipment failure register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormValues(basicInitialValues);
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="Equipment Failure Station Register"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Equipment Failure", path: "/signalling/equipment-failure" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Failure Information */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Failure Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="date"
                  name="failureDateTime"
                  label="Failure Date"
                  value={formValues.failureDateTime}
                  onChange={(e) => handleFieldChange("failureDateTime", e.target.value)}
                  required={true}
                  error={formErrors.failureDateTime}
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="select"
                  name="department"
                  label="Department"
                  value={formValues.department}
                  onChange={(e) => handleFieldChange("department", e.target.value)}
                  options={departmentOptions}
                  required={true}
                  error={formErrors.department}
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="select"
                  name="station"
                  label="Station"
                  value={formValues.station}
                  onChange={(e) => handleFieldChange("station", e.target.value)}
                  options={stationOptions}
                  required={true}
                  error={formErrors.station}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="location"
                  label="Location"
                  value={formValues.location}
                  onChange={(e) => handleFieldChange("location", e.target.value)}
                  placeholder="Specific location of equipment"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="select"
                  name="equipmentType"
                  label="Equipment Type"
                  value={formValues.equipmentType}
                  onChange={(e) => handleFieldChange("equipmentType", e.target.value)}
                  options={equipmentTypeOptions}
                  required={true}
                  error={formErrors.equipmentType}
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="number"
                  name="equipmentNo"
                  label="Equipment No."
                  value={formValues.equipmentNo}
                  onChange={(e) => handleFieldChange("equipmentNo", e.target.value)}
                  placeholder="Equipment identification number"
                  min="1"
                  error={formErrors.equipmentNo}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <UniversalSignallingFormField
                  type="textarea"
                  name="failureDetails"
                  label="Nature & Details of Failure"
                  value={formValues.failureDetails}
                  onChange={(e) => handleFieldChange("failureDetails", e.target.value)}
                  placeholder="Detailed description of the equipment failure"
                  required={true}
                  rows={3}
                  error={formErrors.failureDetails}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reporting Information */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Reporting Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="reportedTo"
                  label="Reported To"
                  value={formValues.reportedTo}
                  onChange={(e) => handleFieldChange("reportedTo", e.target.value)}
                  placeholder="Person/department reported to"
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="time"
                  name="reportedDateTime"
                  label="Reported Time"
                  value={formValues.reportedDateTime}
                  onChange={(e) => handleFieldChange("reportedDateTime", e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="scEmpNo"
                  label="SC Emp. No"
                  value={formValues.scEmpNo}
                  onChange={(e) => handleFieldChange("scEmpNo", e.target.value)}
                  placeholder="Signal Controller employee number"
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="scName"
                  label="SC Name"
                  value={formValues.scName}
                  onChange={(e) => handleFieldChange("scName", e.target.value)}
                  placeholder="Signal Controller name"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Taken */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Action Taken</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="date"
                  name="actionDateTime"
                  label="Date"
                  value={formValues.actionDateTime}
                  onChange={(e) => handleFieldChange("actionDateTime", e.target.value)}
                  error={formErrors.actionDateTime}
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="actionName"
                  label="Concern Employee Name"
                  value={formValues.actionName}
                  onChange={(e) => handleFieldChange("actionName", e.target.value)}
                  placeholder="Name of employee who took action"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="actionEmpNo"
                  label="Concern Employee Id"
                  value={formValues.actionEmpNo}
                  onChange={(e) => handleFieldChange("actionEmpNo", e.target.value)}
                  placeholder="Employee ID who took action"
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="select"
                  name="status1"
                  label="Status"
                  value={formValues.status1}
                  onChange={(e) => handleFieldChange("status1", e.target.value)}
                  options={statusOptions}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Close Information */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Close Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="date"
                  name="closeDateTime"
                  label="Date"
                  value={formValues.closeDateTime}
                  onChange={(e) => handleFieldChange("closeDateTime", e.target.value)}
                  error={formErrors.closeDateTime}
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="closeName"
                  label="Employee Name"
                  value={formValues.closeName}
                  onChange={(e) => handleFieldChange("closeName", e.target.value)}
                  placeholder="Name of closing employee"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="closeEmpNo"
                  label="Employee ID"
                  value={formValues.closeEmpNo}
                  onChange={(e) => handleFieldChange("closeEmpNo", e.target.value)}
                  placeholder="Employee ID who closed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Remarks */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="remarks"
              label="Remarks"
              value={formValues.remarks}
              onChange={(e) => handleFieldChange("remarks", e.target.value)}
              placeholder="Additional remarks or observations"
              rows={4}
            />
          </div>
        </div>

        {/* Form Actions */}
        <FormActionButtons
          loading={isSubmitting}
          onReset={resetForm}
          onSaveDraft={handleSaveDraft}
          onSubmit={handleSubmit}
          formName="Equipment Failure Register"
        />
      </form>
    </SignallingFormLayout>
  );
};

export default EquipmentFailureRegisterForm;