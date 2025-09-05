import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm, pmPointMaintenanceValidation } from "../validation/signallingValidationSchemas";
import { addData } from "../../../reducer/isha/AxleCounterReducer";
import stationData from "../../../station.json";

/**
 * Axle Counter Maintenance Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const AxleCounterMaintenanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axle = useSelector((state) => state.addAxleCounter);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (axle) {
      setSlug(axle.slug);
    }
  }, [axle]);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const basicInitialValues = {
    date: "",
    dateofmaintenance: "",
    maintenanceschedule: "",
    checklist1: "",
    checklist2: "",
    checklist3: "",
    checklist4: "",
    checklist5: "",
    checklist6: "",
    checklist7: "",
    checklist8: "",
    checklist9: "",
    checklist10: "",
    checklist11: "",
    checklist12: "",
    checklist13: "",
    checklist14: "",
    checklist15: "",
    checklist16: "",
    checklist17: "",
    blank1: "",
    blank2: "",
    blank3: "",
    blank4: "",
    blank5: "",
    blank6: "",
    blank7: "",
    blank8: "",
    blank9: "",
    blank10: "",
    blank11: "",
    blank12: "",
    blank13: "",
    blank14: "",
    blank15: "",
    blank16: "",
    blank17: "",
    remarks: "",
    counterno: "",
    technician_name: "",
    technician_id: "",
    supervisor_name: "",
    supervisor_id: "",
    maintenance_type: "",
    next_due_date: "",
    defects_found: "",
    corrective_action: "",
    spare_parts_used: "",
    test_results: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Checklist items for axle counter maintenance
  const checklistItems = [
    { key: "checklist1", label: "Visual inspection of wheel sensor", blank: "blank1" },
    { key: "checklist2", label: "Check sensor mounting and alignment", blank: "blank2" },
    { key: "checklist3", label: "Verify cable connections", blank: "blank3" },
    { key: "checklist4", label: "Test detection functionality", blank: "blank4" },
    { key: "checklist5", label: "Check power supply voltage", blank: "blank5" },
    { key: "checklist6", label: "Inspect outdoor equipment box", blank: "blank6" },
    { key: "checklist7", label: "Clean sensor heads", blank: "blank7" },
    { key: "checklist8", label: "Check LED indications", blank: "blank8" },
    { key: "checklist9", label: "Test counting accuracy", blank: "blank9" },
    { key: "checklist10", label: "Verify reset functionality", blank: "blank10" },
    { key: "checklist11", label: "Check track circuit isolation", blank: "blank11" },
    { key: "checklist12", label: "Test fail-safe operation", blank: "blank12" },
    { key: "checklist13", label: "Inspect weather protection", blank: "blank13" },
    { key: "checklist14", label: "Check earthing connections", blank: "blank14" },
    { key: "checklist15", label: "Verify signal interlocking", blank: "blank15" },
    { key: "checklist16", label: "Test communication with interlocking", blank: "blank16" },
    { key: "checklist17", label: "Overall system performance test", blank: "blank17" },
  ];

  // Maintenance schedule options
  const maintenanceScheduleOptions = [
    { value: "", label: "Select Schedule" },
    { value: "daily", label: "Daily Inspection" },
    { value: "weekly", label: "Weekly Check" },
    { value: "monthly", label: "Monthly PM" },
    { value: "quarterly", label: "Quarterly PM" },
    { value: "half-yearly", label: "Half Yearly PM" },
    { value: "yearly", label: "Yearly PM" },
  ];

  // Test result options
  const testResultOptions = [
    { value: "", label: "Select Result" },
    { value: "satisfactory", label: "Satisfactory" },
    { value: "unsatisfactory", label: "Unsatisfactory" },
    { value: "needs-attention", label: "Needs Attention" },
    { value: "not-applicable", label: "Not Applicable" },
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

    // Auto-calculate next due date based on maintenance schedule and date
    if ((fieldName === "dateofmaintenance" || fieldName === "maintenanceschedule") && 
        formValues.dateofmaintenance && formValues.maintenanceschedule) {
      
      const maintenanceDate = new Date(fieldName === "dateofmaintenance" ? value : formValues.dateofmaintenance);
      const schedule = fieldName === "maintenanceschedule" ? value : formValues.maintenanceschedule;
      
      if (maintenanceDate && schedule) {
        let nextDate = new Date(maintenanceDate);
        
        switch (schedule) {
          case "daily":
            nextDate.setDate(nextDate.getDate() + 1);
            break;
          case "weekly":
            nextDate.setDate(nextDate.getDate() + 7);
            break;
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
        }
        
        setFormValues(prev => ({
          ...prev,
          [fieldName]: value,
          next_due_date: nextDate.toISOString().split('T')[0]
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
    
    if (!formValues.dateofmaintenance) {
      errors.dateofmaintenance = "Maintenance date is required";
    }
    
    if (!formValues.maintenanceschedule) {
      errors.maintenanceschedule = "Maintenance schedule is required";
    }
    
    if (!formValues.counterno) {
      errors.counterno = "Counter number is required";
    }
    
    if (!formValues.technician_name) {
      errors.technician_name = "Technician name is required";
    }
    
    if (!formValues.technician_id) {
      errors.technician_id = "Technician ID is required";
    }

    // At least 5 checklist items should be completed
    const completedChecklist = checklistItems.filter(item => 
      formValues[item.key] && formValues[item.key] !== ""
    );
    
    if (completedChecklist.length < 5) {
      errors.general = "At least 5 checklist items must be completed";
    }

    // Date validation - maintenance date should not be in future
    if (formValues.dateofmaintenance) {
      const maintenanceDate = new Date(formValues.dateofmaintenance);
      const today = new Date();
      if (maintenanceDate > today) {
        errors.dateofmaintenance = "Maintenance date cannot be in the future";
      }
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
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
        slug: slug || "axle-counter-maintenance"
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("Axle Counter Maintenance Record saved successfully!");
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
    setFormValues(basicInitialValues);
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="Axle Counter Maintenance"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Axle Counter Maintenance", path: "/signalling/axle-counter-maintenance" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="date"
              label="Report Date"
              value={formValues.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              required={true}
              error={formErrors.date}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="dateofmaintenance"
              label="Maintenance Date"
              value={formValues.dateofmaintenance}
              onChange={(e) => handleFieldChange("dateofmaintenance", e.target.value)}
              required={true}
              error={formErrors.dateofmaintenance}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="select"
              name="maintenanceschedule"
              label="Maintenance Schedule"
              value={formValues.maintenanceschedule}
              onChange={(e) => handleFieldChange("maintenanceschedule", e.target.value)}
              options={maintenanceScheduleOptions}
              required={true}
              error={formErrors.maintenanceschedule}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="counterno"
              label="Counter Number"
              value={formValues.counterno}
              onChange={(e) => handleFieldChange("counterno", e.target.value)}
              placeholder="Enter axle counter number"
              required={true}
              error={formErrors.counterno}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="next_due_date"
              label="Next Due Date"
              value={formValues.next_due_date}
              onChange={(e) => handleFieldChange("next_due_date", e.target.value)}
              readOnly={true}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="select"
              name="test_results"
              label="Overall Test Result"
              value={formValues.test_results}
              onChange={(e) => handleFieldChange("test_results", e.target.value)}
              options={testResultOptions}
            />
          </div>
        </div>

        {formErrors.general && (
          <div className="alert alert-danger" role="alert">
            {formErrors.general}
          </div>
        )}

        {/* Maintenance Checklist */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Maintenance Checklist</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Maintenance Activity</th>
                    <th>Status</th>
                    <th>Observations/Values</th>
                  </tr>
                </thead>
                <tbody>
                  {checklistItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.label}</td>
                      <td style={{ width: "150px" }}>
                        <UniversalSignallingFormField
                          type="select"
                          name={item.key}
                          value={formValues[item.key]}
                          onChange={(e) => handleFieldChange(item.key, e.target.value)}
                          options={testResultOptions}
                          className="form-control-sm"
                        />
                      </td>
                      <td style={{ width: "200px" }}>
                        <UniversalSignallingFormField
                          type="text"
                          name={item.blank}
                          value={formValues[item.blank]}
                          onChange={(e) => handleFieldChange(item.blank, e.target.value)}
                          placeholder="Enter observations"
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

        {/* Technician and Supervisor Information */}
        <div className="row">
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="technician_name"
              label="Technician Name"
              value={formValues.technician_name}
              onChange={(e) => handleFieldChange("technician_name", e.target.value)}
              placeholder="Enter technician name"
              required={true}
              error={formErrors.technician_name}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="technician_id"
              label="Technician ID"
              value={formValues.technician_id}
              onChange={(e) => handleFieldChange("technician_id", e.target.value)}
              placeholder="Enter technician ID"
              required={true}
              error={formErrors.technician_id}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="supervisor_name"
              label="Supervisor Name"
              value={formValues.supervisor_name}
              onChange={(e) => handleFieldChange("supervisor_name", e.target.value)}
              placeholder="Enter supervisor name"
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="supervisor_id"
              label="Supervisor ID"
              value={formValues.supervisor_id}
              onChange={(e) => handleFieldChange("supervisor_id", e.target.value)}
              placeholder="Enter supervisor ID"
            />
          </div>
        </div>

        {/* Detailed Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="defects_found"
              label="Defects Found"
              value={formValues.defects_found}
              onChange={(e) => handleFieldChange("defects_found", e.target.value)}
              placeholder="Describe any defects or issues found"
              rows={4}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="corrective_action"
              label="Corrective Action Taken"
              value={formValues.corrective_action}
              onChange={(e) => handleFieldChange("corrective_action", e.target.value)}
              placeholder="Describe corrective actions taken"
              rows={4}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="spare_parts_used"
              label="Spare Parts Used"
              value={formValues.spare_parts_used}
              onChange={(e) => handleFieldChange("spare_parts_used", e.target.value)}
              placeholder="List any spare parts used during maintenance"
              rows={3}
            />
          </div>
          <div className="col-md-6">
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
                  "Save Axle Counter Maintenance"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default AxleCounterMaintenanceForm;