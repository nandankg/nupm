import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { addData, addPmlog6 } from "../../../reducer/manshi/Pmlog6Reducer";
import stationData from "../../../data/station.json";

/**
 * TOM Half Yearly Maintenance Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const TomHalfYearlyMaintenanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Pmlog6h = useSelector((state) => state.Pmlog6);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (Pmlog6h) {
      setSlug(Pmlog6h.slug);
    }
  }, [Pmlog6h]);

  // PRESERVED EXACT FIELD STRUCTURE - No changes from original form
  const initialFormState = {
    stn_name: "",
    date: "",
    month: new Date().getMonth(),
    work1: Array(15).fill({
      TOM1: "No",
      TOM2: "No",
      EFO: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    staff1_name: "--",
    staff1_desg: "--",
    staff1_sign: "--",
    staff2_name: "--",
    staff2_desg: "--",
    staff2_sign: "--",
    staff3_name: "--",
    staff3_desg: "--",
    staff3_sign: "--",
  };

  const [formValues, setFormValues] = useState(initialFormState);

  // TOM maintenance labels - preserved exactly from original
  const labels = [
    "Fixing & Alignment of all modules of TOM",
    "Checking of all Cable connection and dressing",
    "Check Date and Time",
    "Check Lubrication of all locks with silicone oil",
    "Cleaning of all modules of TOM",
    "Cleaning of Opto sensor, Antenna, Token tray, Reject ",
    "CRW Test",
    "PRINTER Test",
    "TDM Test",
    "PDU Test",
    "Touch Screen Test",
    "Counter Communication System Test",
    "Keyboard, Mouse Test",
    "Check LAN Status",
    "Check Power strip",
  ];

  // Station options
  const stationOptions = [
    { value: "", label: "Select Station" },
    ...stationData
      .filter((station) => station["Station Name"])
      .map((station) => ({
        value: station["Station Name"],
        label: station["Station Name"]
      }))
  ];

  // Handle input changes for work items
  const handleInputChange = (workKey, index, key, value = null) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [key]: value !== null ? value : item[key] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });

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
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item };
        for (let key in updatedItem) {
          if (key.startsWith("T") || key === "EFO") {
            updatedItem[key] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
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
    if (!formValues.stn_name) {
      errors.stn_name = "Station is required";
    }
    
    if (!formValues.date) {
      errors.date = "Maintenance date is required";
    }

    // Validate at least some activities are completed
    const hasCompletedActivities = formValues.work1.some(item => 
      item.TOM1 === "Yes" || item.TOM2 === "Yes" || item.EFO === "Yes"
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
        ...formValues,
        slug: slug || "tom-half-yearly-maintenance"
      };

      dispatch(addData(submissionData));
      dispatch(addPmlog6(submissionData));
      
      // Success feedback
      alert("TOM Half Yearly Maintenance record saved successfully!");
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
      title="Preventive Maintenance Worksheet of TOM (Half Yearly)"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "PM Log", path: "/signalling/pm-log-tom-half-yearly" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="select"
              name="stn_name"
              label="Station"
              value={formValues.stn_name}
              onChange={(e) => handleFieldChange("stn_name", e.target.value)}
              options={stationOptions}
              required={true}
              error={formErrors.stn_name}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="date"
              name="date"
              label="Date"
              value={formValues.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              required={true}
              error={formErrors.date}
            />
          </div>
        </div>

        {/* Maintenance Activities */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">TOM Maintenance Activities</h5>
            {formErrors.activities && (
              <small className="text-danger">{formErrors.activities}</small>
            )}
          </div>
          <div className="card-body">
            {labels.map((label, index) => (
              <TomMaintenanceSection
                key={index}
                label={label}
                formValues={formValues}
                handleInputChange={handleInputChange}
                handleSelectAllChange={handleSelectAllChange}
                workKey="work1"
                index={index}
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
              <div className="col-md-4">
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
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="staff1_desg"
                  label="Designation"
                  value={formValues.staff1_desg === "--" ? "" : formValues.staff1_desg}
                  onChange={(e) => handleFieldChange("staff1_desg", e.target.value)}
                  placeholder="Enter designation"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="staff1_sign"
                  label="Employee No."
                  value={formValues.staff1_sign === "--" ? "" : formValues.staff1_sign}
                  onChange={(e) => handleFieldChange("staff1_sign", e.target.value)}
                  placeholder="Enter employee number"
                />
              </div>
            </div>

            {/* Staff 2 */}
            <div className="row mb-3">
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="staff2_name"
                  label="Staff Name"
                  value={formValues.staff2_name === "--" ? "" : formValues.staff2_name}
                  onChange={(e) => handleFieldChange("staff2_name", e.target.value)}
                  placeholder="Enter staff name"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="staff2_desg"
                  label="Designation"
                  value={formValues.staff2_desg === "--" ? "" : formValues.staff2_desg}
                  onChange={(e) => handleFieldChange("staff2_desg", e.target.value)}
                  placeholder="Enter designation"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="staff2_sign"
                  label="Employee No."
                  value={formValues.staff2_sign === "--" ? "" : formValues.staff2_sign}
                  onChange={(e) => handleFieldChange("staff2_sign", e.target.value)}
                  placeholder="Enter employee number"
                />
              </div>
            </div>

            {/* Staff 3 */}
            <div className="row mb-3">
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="staff3_name"
                  label="Staff Name"
                  value={formValues.staff3_name === "--" ? "" : formValues.staff3_name}
                  onChange={(e) => handleFieldChange("staff3_name", e.target.value)}
                  placeholder="Enter staff name"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="staff3_desg"
                  label="Designation"
                  value={formValues.staff3_desg === "--" ? "" : formValues.staff3_desg}
                  onChange={(e) => handleFieldChange("staff3_desg", e.target.value)}
                  placeholder="Enter designation"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="staff3_sign"
                  label="Employee No."
                  value={formValues.staff3_sign === "--" ? "" : formValues.staff3_sign}
                  onChange={(e) => handleFieldChange("staff3_sign", e.target.value)}
                  placeholder="Enter employee number"
                />
              </div>
            </div>
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
                  "Save TOM Maintenance Record"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

// TOM Maintenance Section Component
const TomMaintenanceSection = ({
  label,
  formValues,
  handleInputChange,
  handleSelectAllChange,
  workKey,
  index,
}) => {
  const isAllSelected = ["TOM1", "TOM2", "EFO"].every(
    (g) => formValues[workKey][index][g] === "Yes"
  );

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          {/* Activity Label */}
          <div className="col-md-12">
            <h6 className="mb-3">{label}</h6>
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

          {/* TOM Checkboxes */}
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`TOM1-${index}`}
                    checked={formValues[workKey][index].TOM1 === "Yes"}
                    onChange={() => handleInputChange(workKey, index, "TOM1")}
                  />
                  <label className="form-check-label" htmlFor={`TOM1-${index}`}>
                    TPNR TOM
                  </label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`TOM2-${index}`}
                    checked={formValues[workKey][index].TOM2 === "Yes"}
                    onChange={() => handleInputChange(workKey, index, "TOM2")}
                  />
                  <label className="form-check-label" htmlFor={`TOM2-${index}`}>
                    MWYA TOM
                  </label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`EFO-${index}`}
                    checked={formValues[workKey][index].EFO === "Yes"}
                    onChange={() => handleInputChange(workKey, index, "EFO")}
                  />
                  <label className="form-check-label" htmlFor={`EFO-${index}`}>
                    TPNR EFO
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="row mt-3">
          <div className="col-md-4">
            <label className="form-label">Remarks/Deficiencies</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].remark}
              onChange={(e) =>
                handleInputChange(workKey, index, "remark", e.target.value)
              }
              placeholder="Enter remarks or deficiencies"
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
            <label className="form-label">Why Deficiency Could Not Be Rectified</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].deficiency}
              onChange={(e) =>
                handleInputChange(workKey, index, "deficiency", e.target.value)
              }
              placeholder="Enter reason if deficiency not rectified"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TomHalfYearlyMaintenanceForm;