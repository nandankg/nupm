import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import {
  addData,
  addChecklist,
} from "../../../reducer/chanchal/Pm_logbook_half_yearly_other_mainline_Reducer";
import { formatDate } from "../../../data/formatDate";
import stationData from "../../../station.json";

/**
 * Half Yearly Mainline Maintenance Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const HalfYearlyMainlineMaintenanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ChecklistList = useSelector((state) => state.checklist);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (ChecklistList) {
      setSlug(ChecklistList.slug);
    }
  }, [ChecklistList]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  // PRESERVED EXACT FIELD STRUCTURE - No changes from original form
  const initialFormState = {
    stn_name: "",
    date: formatDate(new Date().toString),
    month: new Date().getMonth(),
    activities1: Array(8).fill({
      SC1: "No",
      SC2: "No",
      SC3: "No",
      SC4: "No",
      SC5: "No",
      SC6: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    activities2: Array(9).fill({
      avm1: "No",
      avm2: "No",
      avm3: "No",
      avm4: "No",
      avm5: "No",
      avm6: "No",
      remarkavm: "",
      actionavm: "",
      deficiencyavm: "",
    }),
    activities3: Array(8).fill({
      swt1: "No",
      swt2: "No",
      swt3: "No",
      swt4: "No",
      swt5: "No",
      swt6: "No",
      remarkswt: "",
      actionswt: "",
      deficiencyswt: "",
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

  // Station Computer (SC) maintenance labels
  const labelsc = [
    "Check Fixing & Alignment of all modules of SC",
    "Checking of all Cable connection and dressing",
    "Check Date and Time",
    "Cleaning of SC Server (interior & exterior)",
    "Cleaning and checking of sub modules of SC ( Printer, Keyboard and Mouse etc)",
    "Cleaning of SC HDD and check their proper fitment",
    "Testing of SC backup and restore functionality",
    "Network connectivity and communication test",
  ];

  // AVM maintenance labels
  const labelavm = [
    "Visual inspection of all AVM components",
    "Display panel cleaning and calibration",
    "Audio system testing and volume adjustment",
    "Network connectivity verification",
    "Software update and maintenance check",
    "Hardware diagnostics and status verification",
    "Power supply and UPS functionality test",
    "Environmental sensor calibration",
    "Emergency alert system functionality test",
  ];

  // SWT (Switch) maintenance labels
  const labelswt = [
    "Physical inspection of all switch components",
    "Mechanical operation testing",
    "Electrical continuity verification",
    "Lubrication of moving parts",
    "Safety lock mechanism testing",
    "Position indication verification",
    "Control circuit functionality test",
    "Emergency operation procedure verification",
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

  // Handle SC input changes
  const handleInputChangesc = (workKeysc, indexsc, keysc, value = null) => {
    const updatedWorkArray = formValues[workKeysc].map((item, idsc) => {
      if (idsc === indexsc) {
        return {
          ...item,
          [keysc]: value !== null ? value : item[keysc] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeysc]: updatedWorkArray });
  };

  // Handle AVM input changes
  const handleInputChangesavm = (workKeyavm, indexavm, keyavm, value = null) => {
    const updatedWorkArray = formValues[workKeyavm].map((item, idavm) => {
      if (idavm === indexavm) {
        return {
          ...item,
          [keyavm]: value !== null ? value : item[keyavm] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyavm]: updatedWorkArray });
  };

  // Handle SWT input changes
  const handleInputChangesswt = (workKeyswt, indexswt, keyswt, value = null) => {
    const updatedWorkArray = formValues[workKeyswt].map((item, idswt) => {
      if (idswt === indexswt) {
        return {
          ...item,
          [keyswt]: value !== null ? value : item[keyswt] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyswt]: updatedWorkArray });
  };

  // Handle select all for SC
  const handleSelectAllChangesc = (workKeysc, indexsc, isChecked) => {
    const updatedWorkArray = formValues[workKeysc].map((item, idsc) => {
      if (idsc === indexsc) {
        const updatedItem = { ...item };
        for (let keysc in updatedItem) {
          if (keysc.startsWith("SC")) {
            updatedItem[keysc] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeysc]: updatedWorkArray });
  };

  // Handle select all for AVM
  const handleSelectAllChangesavm = (workKeyavm, indexavm, isChecked) => {
    const updatedWorkArray = formValues[workKeyavm].map((item, idavm) => {
      if (idavm === indexavm) {
        const updatedItem = { ...item };
        for (let keyavm in updatedItem) {
          if (keyavm.startsWith("avm")) {
            updatedItem[keyavm] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyavm]: updatedWorkArray });
  };

  // Handle select all for SWT
  const handleSelectAllChangesswt = (workKeyswt, indexswt, isChecked) => {
    const updatedWorkArray = formValues[workKeyswt].map((item, idswt) => {
      if (idswt === indexswt) {
        const updatedItem = { ...item };
        for (let keyswt in updatedItem) {
          if (keyswt.startsWith("swt")) {
            updatedItem[keyswt] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyswt]: updatedWorkArray });
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
    
    if (!formValues.stn_name) {
      errors.stn_name = "Station name is required";
    }

    // Validate at least some activities are completed
    const hasScActivities = formValues.activities1.some(item => 
      item.SC1 === "Yes" || item.SC2 === "Yes" || item.SC3 === "Yes" || 
      item.SC4 === "Yes" || item.SC5 === "Yes" || item.SC6 === "Yes"
    );
    const hasAvmActivities = formValues.activities2.some(item => 
      item.avm1 === "Yes" || item.avm2 === "Yes" || item.avm3 === "Yes"
    );
    const hasSwtActivities = formValues.activities3.some(item => 
      item.swt1 === "Yes" || item.swt2 === "Yes" || item.swt3 === "Yes"
    );

    if (!hasScActivities && !hasAvmActivities && !hasSwtActivities) {
      errors.activities = "At least some maintenance activities must be completed";
    }

    // Validate staff information
    if (!formValues.staff1_name || formValues.staff1_name === "--") {
      errors.staff1_name = "At least one staff member is required";
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
      const submissionData = {
        ...formValues,
        slug: slug || "half-yearly-mainline-maintenance"
      };

      dispatch(addData(submissionData));
      dispatch(addChecklist(submissionData));
      
      alert("Half Yearly Mainline Maintenance record saved successfully!");
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
      title="Half Yearly Mainline Maintenance Record"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Half Yearly Mainline", path: "/signalling/half-yearly-mainline" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="select"
              name="stn_name"
              label="Station Name"
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
              label="Maintenance Date"
              value={formValues.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              required={true}
            />
          </div>
        </div>

        {/* Station Computer (SC) Activities */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 text-primary">Station Computer (SC) Maintenance Activities</h5>
          </div>
          <div className="card-body">
            {labelsc.map((label, index) => (
              <MaintenanceActivitySection
                key={index}
                label={label}
                formValues={formValues}
                handleInputChange={handleInputChangesc}
                handleSelectAllChange={handleSelectAllChangesc}
                workKey="activities1"
                index={index}
                serialNumber={index + 1}
                checkboxPrefix="SC"
                checkboxCount={6}
                remarkField="remark"
                actionField="action"
                deficiencyField="deficiency"
              />
            ))}
          </div>
        </div>

        {/* AVM Activities */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 text-success">AVM System Maintenance Activities</h5>
          </div>
          <div className="card-body">
            {labelavm.map((label, index) => (
              <MaintenanceActivitySection
                key={index}
                label={label}
                formValues={formValues}
                handleInputChange={handleInputChangesavm}
                handleSelectAllChange={handleSelectAllChangesavm}
                workKey="activities2"
                index={index}
                serialNumber={index + 1}
                checkboxPrefix="avm"
                checkboxCount={6}
                remarkField="remarkavm"
                actionField="actionavm"
                deficiencyField="deficiencyavm"
              />
            ))}
          </div>
        </div>

        {/* SWT Activities */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 text-warning">Switch (SWT) Maintenance Activities</h5>
          </div>
          <div className="card-body">
            {labelswt.map((label, index) => (
              <MaintenanceActivitySection
                key={index}
                label={label}
                formValues={formValues}
                handleInputChange={handleInputChangesswt}
                handleSelectAllChange={handleSelectAllChangesswt}
                workKey="activities3"
                index={index}
                serialNumber={index + 1}
                checkboxPrefix="swt"
                checkboxCount={6}
                remarkField="remarkswt"
                actionField="actionswt"
                deficiencyField="deficiencyswt"
              />
            ))}
          </div>
        </div>

        {/* Staff Information */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Staff Information</h5>
            {formErrors.activities && (
              <small className="text-danger">{formErrors.activities}</small>
            )}
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
                  label="Signature"
                  value={formValues.staff1_sign === "--" ? "" : formValues.staff1_sign}
                  onChange={(e) => handleFieldChange("staff1_sign", e.target.value)}
                  placeholder="Staff signature"
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
                  label="Signature"
                  value={formValues.staff2_sign === "--" ? "" : formValues.staff2_sign}
                  onChange={(e) => handleFieldChange("staff2_sign", e.target.value)}
                  placeholder="Staff signature"
                />
              </div>
            </div>

            {/* Staff 3 */}
            <div className="row">
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
                  label="Signature"
                  value={formValues.staff3_sign === "--" ? "" : formValues.staff3_sign}
                  onChange={(e) => handleFieldChange("staff3_sign", e.target.value)}
                  placeholder="Staff signature"
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
                  "Save Half Yearly Maintenance Record"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

// Maintenance Activity Section Component
const MaintenanceActivitySection = ({
  label,
  formValues,
  handleInputChange,
  handleSelectAllChange,
  workKey,
  index,
  serialNumber,
  checkboxPrefix,
  checkboxCount,
  remarkField,
  actionField,
  deficiencyField,
}) => {
  const activity = formValues[workKey][index];
  const checkboxKeys = Array.from({ length: checkboxCount }, (_, i) => `${checkboxPrefix}${i + 1}`);
  const isAllSelected = checkboxKeys.every(key => activity[key] === "Yes");

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <h6 className="mb-3">
              <span className="badge bg-info me-2">{serialNumber}</span>
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
                onChange={(e) => handleSelectAllChange(workKey, index, e.target.checked)}
              />
              <label className="form-check-label" htmlFor={`${workKey}SelectAll${index}`}>
                {isAllSelected ? "Uncheck All" : "Check All"}
              </label>
            </div>
          </div>

          {/* Individual Checkboxes */}
          <div className="col-md-10">
            <div className="row">
              {checkboxKeys.map((key, checkIndex) => (
                <div key={key} className="col-md-2">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`${key}-${index}`}
                      checked={activity[key] === "Yes"}
                      onChange={() => handleInputChange(workKey, index, key)}
                    />
                    <label className="form-check-label" htmlFor={`${key}-${index}`}>
                      {key.toUpperCase()}
                    </label>
                  </div>
                </div>
              ))}
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
              value={activity[remarkField]}
              onChange={(e) => handleInputChange(workKey, index, remarkField, e.target.value)}
              placeholder="Enter remarks"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Action Taken</label>
            <input
              type="text"
              className="form-control"
              value={activity[actionField]}
              onChange={(e) => handleInputChange(workKey, index, actionField, e.target.value)}
              placeholder="Enter action taken"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Deficiency</label>
            <input
              type="text"
              className="form-control"
              value={activity[deficiencyField]}
              onChange={(e) => handleInputChange(workKey, index, deficiencyField, e.target.value)}
              placeholder="Enter deficiency details"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfYearlyMainlineMaintenanceForm;