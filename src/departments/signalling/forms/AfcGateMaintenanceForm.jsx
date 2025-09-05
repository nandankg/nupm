import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { addData, addPmLogBook } from "../../../reducer/monika/PmLogBookReducer";
import stationData from "../../../data/station.json";

/**
 * AFC Gate Maintenance Form (PM Log Book 5) - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const AfcGateMaintenanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PmLogBook5List = useSelector((state) => state.PmLogBook);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (PmLogBook5List) {
      setSlug(PmLogBook5List.slug);
    }
  }, [PmLogBook5List]);

  // PRESERVED EXACT FIELD STRUCTURE - No changes from original form
  const initialFormState = {
    frequency: "",
    date: "",
    activities: Array(40).fill({
      G1: "No",
      G2: "No",
      G3: "No",
      G4: "No",
      G5: "No",
      remark: "",
      action: "",
      deficiency: ""
      }),
    staff1_name: "--",
    staff1_desg: "--",
    staff1_employee: "",
    staff1_sign: "--",
    staff2_name: "--",
    staff2_employee: "",
    staff2_desg: "--",
    staff2_sign: "--",
    staff3_name: "--",
    staff3_desg: "--",
    staff3_employee: "",
    staff3_sign: "--",
    employee_department: "s&t",
    unit: "AFC-SDC"
      };

  const [formValues, setFormValues] = useState(initialFormState);

  // AFC Gate maintenance labels - preserved exactly from original
  const labels = [
    "Check Fixing & Alignment of all modules of Gates",
    "Checking of all Cable connection and dressing",
    "Checking Silicon sealing of Gate Cabinet",
    "Checking of any opening inside gate cabinet",
    "Checking of Power Supply and Battery",
    "Check whether leaked oil appears on the flap mechanism",
    "Check AG cabinet case for corrosion",
    "Check the covering glass of the validator",
    "Check power source fan filter",
    "Check Lubrication of all locks with silicone oil",
    "Check Date and Time",
    "Check correct position of flap mechanism",
    "Cleaning of all modules of AFC Gate and cabinet",
    "Clean opto sensors of flap mechanism",
    "Clean plastic covers of sensors and transmitters in corridor",
    "Check ping to station computer",
    "Check whether Token Capture Unit (TCU) clearing mechanism is Normally closed",
    "Check lock functionality",
    "Check battery backup",
    "Audio Test",
    "Concession Lamp test",
    "Sector Door Test",
    "End Display Test",
    "Sensor Test",
    "Token Slot Test",
    "Token Bowl Test",
    "Token Passage Test",
    "Front Door Test",
    " PMU Test",
    "Card Reader Test",
    "Return Cup LED Test",
    "Shutdown",
    "Reboot",
    "Operation Mode Test",
    "Special Mode test",
    "Token Container Test",
    "Gate Mode Test",
    "Check operation and special mode for its default position",
    "Software - SC",
    "Master Push Button",
  ];

  // Frequency options
  const frequencyOptions = [
    { value: "", label: "Select Frequency" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "half-yearly", label: "Half Yearly" },
    { value: "yearly", label: "Yearly" }
  ];

  // Handle input changes for activities
  const handleInputChange = (workKey, index, key, value = null) => {
    setFormValues((prevFormValues) => {
      const updatedWorkArray = [...prevFormValues[workKey]];
      const updatedItem = { ...updatedWorkArray[index] };
      updatedItem[key] =
        value !== null ? value : updatedItem[key] === "No" ? "Yes" : "No";
      updatedWorkArray[index] = updatedItem;

      return { ...prevFormValues, [workKey]: updatedWorkArray };
    });

    // Clear field error
    const errorKey = `${workKey}_${index}_${key}`;
    if (formErrors[errorKey]) {
      setFormErrors(prev => ({
        ...prev,
        [errorKey]: ""
      }));
    }
  };

  // Handle select all changes
  const handleSelectAllChange = (workKey, index, isChecked) => {
    setFormValues((prevFormValues) => {
      const updatedWorkArray = [...prevFormValues[workKey]];
      const updatedItem = { ...updatedWorkArray[index] };

      for (let key in updatedItem) {
        if (key.startsWith("G")) {
          updatedItem[key] = isChecked ? "Yes" : "No";
        }
      }
      updatedWorkArray[index] = updatedItem;

      return { ...prevFormValues, [workKey]: updatedWorkArray };
    });
  };

  // Handle basic field changes
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear field error
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
    if (!formValues.frequency) {
      errors.frequency = "Maintenance frequency is required";
    }
    
    if (!formValues.date) {
      errors.date = "Maintenance date is required";
    }

    // Validate at least some activities are completed
    const hasCompletedActivities = formValues.activities.some(item => 
      item.G1 === "Yes" || item.G2 === "Yes" || item.G3 === "Yes" || 
      item.G4 === "Yes" || item.G5 === "Yes"
    );
    if (!hasCompletedActivities) {
      errors.activities = "At least some maintenance activities must be completed";
    }

    // Validate staff information
    if (!formValues.staff1_name || formValues.staff1_name === "--") {
      errors.staff1_name = "At least one staff member is required";
    }

    // Date validation
    if (formValues.date) {
      const today = new Date();
      const maintenanceDate = new Date(formValues.date);
      if (maintenanceDate > today) {
        errors.date = "Maintenance date cannot be in the future";
      }
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
        // FIXED: Remove client-side IDs - form_id is auto-generated by database
        ...formValues,
        slug: slug || "afc-gate-maintenance"
      };

      dispatch(addData(submissionData));
      dispatch(addPmLogBook(submissionData));
      
      // Success feedback
      alert("AFC Gate Maintenance record saved successfully!");
      navigate(`/list/${slug}`);
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving maintenance record. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormValues(initialFormState);
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="PM Log Book-5: AFC Gate Maintenance"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "PM Log Book-5", path: "/signalling/pm-log-book-5" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="select"
              name="frequency"
              label="Maintenance Frequency"
              value={formValues.frequency}
              onChange={(e) => handleFieldChange("frequency", e.target.value)}
              options={frequencyOptions}
              required={true}
              error={formErrors.frequency}
            />
          </div>
          <div className="col-md-6">
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
        </div>

        {/* AFC Gate Maintenance Activities */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">AFC Gate Maintenance Activities (40 Items)</h5>
            {formErrors.activities && (
              <small className="text-danger">{formErrors.activities}</small>
            )}
          </div>
          <div className="card-body">
            {labels.map((label, index) => (
              <AfcGateMaintenanceSection
                key={index}
                label={label}
                formValues={formValues}
                handleInputChange={handleInputChange}
                handleSelectAllChange={handleSelectAllChange}
                workKey="activities"
                index={index}
                serialNumber={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Staff Information */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Staff Information</h5>
          </div>
          <div className="card-body">
            {/* Staff 1 */}
            <div className="row mb-3">
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff1_name"
                  label="Staff Name"
                  value={formValues.staff1_name === "--" ? "" : formValues.staff1_name}
                  onChange={(e) => handleFieldChange("staff1_name", e.target.value)}
                  placeholder="Enter staff name"
                  required={true}
                  error={formErrors.staff1_name}
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff1_desg"
                  label="Designation"
                  value={formValues.staff1_desg === "--" ? "" : formValues.staff1_desg}
                  onChange={(e) => handleFieldChange("staff1_desg", e.target.value)}
                  placeholder="Enter designation"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff1_employee"
                  label="Employee ID"
                  value={formValues.staff1_employee}
                  onChange={(e) => handleFieldChange("staff1_employee", e.target.value)}
                  placeholder="Enter employee ID"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff1_sign"
                  label="Signature"
                  value={formValues.staff1_sign === "--" ? "" : formValues.staff1_sign}
                  onChange={(e) => handleFieldChange("staff1_sign", e.target.value)}
                  placeholder="Staff signature"
                />
              </div>
            </div>

            {/* Staff 2 */}
            <div className="row mb-3">
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff2_name"
                  label="Staff Name"
                  value={formValues.staff2_name === "--" ? "" : formValues.staff2_name}
                  onChange={(e) => handleFieldChange("staff2_name", e.target.value)}
                  placeholder="Enter staff name"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff2_desg"
                  label="Designation"
                  value={formValues.staff2_desg === "--" ? "" : formValues.staff2_desg}
                  onChange={(e) => handleFieldChange("staff2_desg", e.target.value)}
                  placeholder="Enter designation"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff2_employee"
                  label="Employee ID"
                  value={formValues.staff2_employee}
                  onChange={(e) => handleFieldChange("staff2_employee", e.target.value)}
                  placeholder="Enter employee ID"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff2_sign"
                  label="Signature"
                  value={formValues.staff2_sign === "--" ? "" : formValues.staff2_sign}
                  onChange={(e) => handleFieldChange("staff2_sign", e.target.value)}
                  placeholder="Staff signature"
                />
              </div>
            </div>

            {/* Staff 3 */}
            <div className="row mb-3">
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff3_name"
                  label="Staff Name"
                  value={formValues.staff3_name === "--" ? "" : formValues.staff3_name}
                  onChange={(e) => handleFieldChange("staff3_name", e.target.value)}
                  placeholder="Enter staff name"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff3_desg"
                  label="Designation"
                  value={formValues.staff3_desg === "--" ? "" : formValues.staff3_desg}
                  onChange={(e) => handleFieldChange("staff3_desg", e.target.value)}
                  placeholder="Enter designation"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff3_employee"
                  label="Employee ID"
                  value={formValues.staff3_employee}
                  onChange={(e) => handleFieldChange("staff3_employee", e.target.value)}
                  placeholder="Enter employee ID"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="staff3_sign"
                  label="Signature"
                  value={formValues.staff3_sign === "--" ? "" : formValues.staff3_sign}
                  onChange={(e) => handleFieldChange("staff3_sign", e.target.value)}
                  placeholder="Staff signature"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Department Information */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="department"
              label="Department"
              value={formValues.department}
              onChange={(e) => handleFieldChange("department", e.target.value)}
              placeholder="Department"
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="unit"
              label="Unit"
              value={formValues.unit}
              onChange={(e) => handleFieldChange("unit", e.target.value)}
              placeholder="Unit/Section"
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="employee_id"
              label="Employee ID"
              value={formValues.employee_id}
              onChange={(e) => handleFieldChange("employee_id", e.target.value)}
              placeholder="Employee ID"
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
                  "Save AFC Gate Maintenance Record"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

// AFC Gate Maintenance Section Component
const AfcGateMaintenanceSection = ({
  label,
  formValues,
  handleInputChange,
  handleSelectAllChange,
  workKey,
  index,
  serialNumber
      }) => {
  const isAllSelected = ["G1", "G2", "G3", "G4", "G5"].every(
    (g) => formValues[workKey][index][g] === "Yes"
  );

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          {/* Serial Number & Activity Label */}
          <div className="col-md-12">
            <h6 className="mb-3">
              <span className="badge bg-primary me-2">{serialNumber}</span>
              {label}
            </h6>
          </div>
        </div>

        <div className="row">
          {/* Select All Checkbox */}
          <div className="col-md-2">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`${workKey}SelectAll${index}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChange(workKey, index, e.target.checked)
                }
              />
              <label
                className="form-check-label"
                htmlFor={`${workKey}SelectAll${index}`}
              >
                {isAllSelected ? "Uncheck All" : "Check All"}
              </label>
            </div>
          </div>

          {/* Gate Checkboxes */}
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`G1-${index}`}
                    checked={formValues[workKey][index].G1 === "Yes"}
                    onChange={() => handleInputChange(workKey, index, "G1")}
                  />
                  <label className="form-check-label" htmlFor={`G1-${index}`}>
                    Gate 1
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`G2-${index}`}
                    checked={formValues[workKey][index].G2 === "Yes"}
                    onChange={() => handleInputChange(workKey, index, "G2")}
                  />
                  <label className="form-check-label" htmlFor={`G2-${index}`}>
                    Gate 2
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`G3-${index}`}
                    checked={formValues[workKey][index].G3 === "Yes"}
                    onChange={() => handleInputChange(workKey, index, "G3")}
                  />
                  <label className="form-check-label" htmlFor={`G3-${index}`}>
                    Gate 3
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`G4-${index}`}
                    checked={formValues[workKey][index].G4 === "Yes"}
                    onChange={() => handleInputChange(workKey, index, "G4")}
                  />
                  <label className="form-check-label" htmlFor={`G4-${index}`}>
                    Gate 4
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`G5-${index}`}
                    checked={formValues[workKey][index].G5 === "Yes"}
                    onChange={() => handleInputChange(workKey, index, "G5")}
                  />
                  <label className="form-check-label" htmlFor={`G5-${index}`}>
                    Gate 5
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="row mt-3">
          <div className="col-md-4">
            <label className="form-label">Remarks</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].remark}
              onChange={(e) =>
                handleInputChange(workKey, index, "remark", e.target.value)
              }
              placeholder="Enter remarks"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Action Taken</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].action}
              onChange={(e) =>
                handleInputChange(workKey, index, "action", e.target.value)
              }
              placeholder="Enter action taken"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Deficiency</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].deficiency}
              onChange={(e) =>
                handleInputChange(workKey, index, "deficiency", e.target.value)
              }
              placeholder="Enter deficiency details"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfcGateMaintenanceForm;