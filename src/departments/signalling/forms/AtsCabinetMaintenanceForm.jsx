import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { addData } from "../../../reducer/satya/MonthlyCabinetRecordReducer";
import stationData from "../../../station.json";

/**
 * ATS Cabinet Maintenance Record Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const AtsCabinetMaintenanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cabinetrecord = useSelector((state) => state.monthlyrecord);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (cabinetrecord) {
      setSlug(cabinetrecord.slug);
    }
  }, [cabinetrecord]);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const basicInitialValues = {
    cabinet: "",
    date: "",
    station: "",
    year: "",
    month: "",
    done1: "",
    done2: "",
    done3: "",
    done4: "",
    done5: "",
    done6: "",
    done7: "",
    remarks: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Cabinet type options
  const cabinetOptions = [
    { value: "", label: "--select--" },
    { value: "N/A", label: "N/A" },
    { value: "RC", label: "RC" },
    { value: "BTN", label: "BTN" },
    { value: "CLC", label: "CLC" },
    { value: "ZC", label: "ZC" },
    { value: "LC", label: "LC" },
    { value: "ATS", label: "ATS" },
    { value: "SMIO", label: "SMIO" },
    { value: "PDU", label: "PDU" },
    { value: "ACC", label: "ACC" },
    { value: "OTHER", label: "OTHER" }
  ];

  // Month options
  const monthOptions = [
    { value: "", label: "--select--" },
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" }
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

  // Status options for maintenance activities
  const statusOptions = [
    { value: "", label: "--select--" },
    { value: "N/A", label: "N/A" },
    { value: "Done", label: "Done" },
    { value: "Checked OKAY", label: "Checked OKAY" },
    { value: "Checked NOT OKAY", label: "Checked NOT OKAY" }
  ];

  // Maintenance activities data
  const maintenanceActivities = [
    { field: "done1", label: "Visual Inspection" },
    { field: "done2", label: "Dust Cleaning" },
    { field: "done3", label: "Electrical Connection" },
    { field: "done4", label: "Fan" },
    { field: "done5", label: "Earthing Connection" },
  ];

  const postMaintenanceChecks = [
    { field: "done6", label: "Verify system status from system view. It should be same as before the maintenance" },
    { field: "done7", label: "Check ping status of central router, server, central work stations" },
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
    if (!formValues.cabinet) {
      errors.cabinet = "Cabinet type is required";
    }
    
    if (!formValues.date) {
      errors.date = "Maintenance date is required";
    }
    
    if (!formValues.station) {
      errors.station = "Station is required";
    }
    
    if (!formValues.year) {
      errors.year = "Year is required";
    }
    
    if (!formValues.month) {
      errors.month = "Month is required";
    }

    // Validate year range
    if (formValues.year) {
      const year = parseInt(formValues.year);
      if (year < 2000 || year > 3000) {
        errors.year = "Year must be between 2000 and 3000";
      }
    }

    // Validate maintenance activities
    const activities = ['done1', 'done2', 'done3', 'done4', 'done5', 'done6', 'done7'];
    const incompleteActivities = activities.filter(activity => !formValues[activity]);
    if (incompleteActivities.length > 0) {
      errors.activities = "All maintenance activities must be completed";
    }

    // Date validation - maintenance date should not be in future
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
        slug: slug || "ats-cabinet-maintenance-record"
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("ATS Cabinet Maintenance Record saved successfully!");
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
    setFormValues(basicInitialValues);
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="ATS Cabinet Maintenance Records"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "ATS Cabinet Record", path: "/signalling/ats-cabinet-record" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Cabinet Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
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

            <div className="row">
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="select"
                  name="cabinet"
                  label="Cabinet"
                  value={formValues.cabinet}
                  onChange={(e) => handleFieldChange("cabinet", e.target.value)}
                  options={cabinetOptions}
                  required={true}
                  error={formErrors.cabinet}
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="number"
                  name="year"
                  label="Year"
                  value={formValues.year}
                  onChange={(e) => handleFieldChange("year", e.target.value)}
                  min={2000}
                  max={3000}
                  step={1}
                  required={true}
                  error={formErrors.year}
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="select"
                  name="month"
                  label="Month"
                  value={formValues.month}
                  onChange={(e) => handleFieldChange("month", e.target.value)}
                  options={monthOptions}
                  required={true}
                  error={formErrors.month}
                />
              </div>
              <div className="col-md-3">
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
          </div>
        </div>

        {/* Maintenance Activities */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Maintenance Activities</h5>
            {formErrors.activities && (
              <small className="text-danger">{formErrors.activities}</small>
            )}
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" className="col-8">Maintenance Activity</th>
                    <th scope="col" className="col-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceActivities.map((activity, index) => (
                    <tr key={activity.field}>
                      <td>{activity.label}</td>
                      <td>
                        <select
                          className="form-control"
                          value={formValues[activity.field]}
                          onChange={(e) => handleFieldChange(activity.field, e.target.value)}
                          required
                        >
                          {statusOptions.map((option, optIndex) => (
                            <option key={optIndex} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Checks After Maintenance */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Checks After Maintenance</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" className="col-8">Check Activity</th>
                    <th scope="col" className="col-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {postMaintenanceChecks.map((check, index) => (
                    <tr key={check.field}>
                      <td>{check.label}</td>
                      <td>
                        <select
                          className="form-control"
                          value={formValues[check.field]}
                          onChange={(e) => handleFieldChange(check.field, e.target.value)}
                          required
                        >
                          {statusOptions.map((option, optIndex) => (
                            <option key={optIndex} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              placeholder="Additional remarks about maintenance activities and findings"
              rows={4}
              required={true}
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
                style={{ width: "100px", height: "50px" }}
              >
                {isSubmitting ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default AtsCabinetMaintenanceForm;