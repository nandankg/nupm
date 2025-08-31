import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm } from "../validation/signallingValidationSchemas";
import { addData, addLabFaulty } from "../../../reducer/manshi/LabFaultyReducer";
import { formatDate } from "../../../data/formatDate";

/**
 * Lab Faulty Item Register Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const LabFaultyItemRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LabF = useSelector((state) => state.Lab);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (LabF) {
      setSlug(LabF.slug);
    }
  }, [LabF]);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const basicInitialValues = {
    date: formatDate(new Date().toDateString()),
    ReceivedFrom: "",
    Description: "",
    EFRNo: "",
    DateOfReplacement: "",
    ItemSerialNumber: "",
    TestingLocation: "",
    DateTestingFrom: "",
    DateTestingTo: "",
    FinalStatus: "",
    TestingStaff: "",
    Remark: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Testing status options
  const testingStatusOptions = [
    { value: "", label: "Select Status" },
    { value: "pass", label: "Pass" },
    { value: "fail", label: "Fail" },
    { value: "conditional-pass", label: "Conditional Pass" },
    { value: "needs-repair", label: "Needs Repair" },
    { value: "scrapped", label: "Scrapped" },
    { value: "pending", label: "Pending" },
    { value: "under-testing", label: "Under Testing" }
  ];

  // Testing location options
  const testingLocationOptions = [
    { value: "", label: "Select Location" },
    { value: "lab-main", label: "Main Lab" },
    { value: "lab-signal", label: "Signal Lab" },
    { value: "lab-telecom", label: "Telecom Lab" },
    { value: "field-testing", label: "Field Testing" },
    { value: "vendor-lab", label: "Vendor Lab" },
    { value: "external-lab", label: "External Lab" }
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
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formValues.date) {
      errors.date = "Date is required";
    }
    
    if (!formValues.ReceivedFrom) {
      errors.ReceivedFrom = "Received from information is required";
    }
    
    if (!formValues.Description) {
      errors.Description = "Description is required";
    }
    
    if (!formValues.ItemSerialNumber) {
      errors.ItemSerialNumber = "Item serial number is required";
    }
    
    if (!formValues.TestingLocation) {
      errors.TestingLocation = "Testing location is required";
    }
    
    if (!formValues.TestingStaff) {
      errors.TestingStaff = "Testing staff name is required";
    }

    // Date validation - testing start should be after receipt
    if (formValues.DateTestingFrom && formValues.date) {
      if (new Date(formValues.DateTestingFrom) < new Date(formValues.date)) {
        errors.DateTestingFrom = "Testing start date cannot be before receipt date";
      }
    }

    // Testing end should be after testing start
    if (formValues.DateTestingTo && formValues.DateTestingFrom) {
      if (new Date(formValues.DateTestingTo) < new Date(formValues.DateTestingFrom)) {
        errors.DateTestingTo = "Testing end date cannot be before start date";
      }
    }

    // Replacement date should be after testing (if applicable)
    if (formValues.DateOfReplacement && formValues.DateTestingTo) {
      if (new Date(formValues.DateOfReplacement) < new Date(formValues.DateTestingTo)) {
        errors.DateOfReplacement = "Replacement date should be after testing completion";
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
        slug: slug || "lab-faulty-item-register"
      };

      dispatch(addData(submissionData));
      dispatch(addLabFaulty(submissionData));
      
      // Success feedback
      alert("Lab Faulty Item Register saved successfully!");
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
      title="Lab Faulty Item Register"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Lab Faulty Item Register", path: "/signalling/lab-faulty-item-register" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
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
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="EFRNo"
              label="EFR Number"
              value={formValues.EFRNo}
              onChange={(e) => handleFieldChange("EFRNo", e.target.value)}
              placeholder="Equipment Failure Report number"
              error={formErrors.EFRNo}
            />
          </div>
        </div>

        {/* Item Information */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="text"
              name="ReceivedFrom"
              label="Received From (With Gear ID)"
              value={formValues.ReceivedFrom}
              onChange={(e) => handleFieldChange("ReceivedFrom", e.target.value)}
              placeholder="Source location and gear ID of the faulty item"
              required={true}
              error={formErrors.ReceivedFrom}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="Description"
              label="Description"
              value={formValues.Description}
              onChange={(e) => handleFieldChange("Description", e.target.value)}
              placeholder="Detailed description of the faulty item and observed issues"
              required={true}
              rows={3}
              error={formErrors.Description}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="ItemSerialNumber"
              label="Item Serial Number"
              value={formValues.ItemSerialNumber}
              onChange={(e) => handleFieldChange("ItemSerialNumber", e.target.value)}
              placeholder="Serial number of the faulty item"
              required={true}
              error={formErrors.ItemSerialNumber}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="date"
              name="DateOfReplacement"
              label="Date of Replacement"
              value={formValues.DateOfReplacement}
              onChange={(e) => handleFieldChange("DateOfReplacement", e.target.value)}
              error={formErrors.DateOfReplacement}
            />
          </div>
        </div>

        {/* Testing Information */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Testing Details</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="select"
                  name="TestingLocation"
                  label="Testing Location"
                  value={formValues.TestingLocation}
                  onChange={(e) => handleFieldChange("TestingLocation", e.target.value)}
                  options={testingLocationOptions}
                  required={true}
                  error={formErrors.TestingLocation}
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="TestingStaff"
                  label="Testing Staff"
                  value={formValues.TestingStaff}
                  onChange={(e) => handleFieldChange("TestingStaff", e.target.value)}
                  placeholder="Name of testing staff/technician"
                  required={true}
                  error={formErrors.TestingStaff}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="date"
                  name="DateTestingFrom"
                  label="Testing Start Date"
                  value={formValues.DateTestingFrom}
                  onChange={(e) => handleFieldChange("DateTestingFrom", e.target.value)}
                  error={formErrors.DateTestingFrom}
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="date"
                  name="DateTestingTo"
                  label="Testing End Date"
                  value={formValues.DateTestingTo}
                  onChange={(e) => handleFieldChange("DateTestingTo", e.target.value)}
                  error={formErrors.DateTestingTo}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <UniversalSignallingFormField
                  type="select"
                  name="FinalStatus"
                  label="Final Status"
                  value={formValues.FinalStatus}
                  onChange={(e) => handleFieldChange("FinalStatus", e.target.value)}
                  options={testingStatusOptions}
                  error={formErrors.FinalStatus}
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
              name="Remark"
              label="Remarks"
              value={formValues.Remark}
              onChange={(e) => handleFieldChange("Remark", e.target.value)}
              placeholder="Additional remarks about testing process, findings, or recommendations"
              rows={4}
              error={formErrors.Remark}
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
                  "Save Lab Faulty Item Register"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default LabFaultyItemRegisterForm;