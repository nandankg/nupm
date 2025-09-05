import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm } from "../validation/signallingValidationSchemas";
import { addData } from "../../../reducer/isha/ContractualSpareTestingReducer";

/**
 * Contractual Spare Testing Register Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const ContractualSpareTestingRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const test = useSelector((state) => state.ContractualSpare);
  
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (test) {
      setSlug(test.slug);
    }
  }, [test]);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const basicInitialValues = {
    sn: sNo,
    item_description: "",
    testing_detail: "",
    item_serialName: "",
    testingLocation: "",
    testedFrom: "",
    testedTo: "",
    dateFrom: "",
    dateTo: "",
    FinalStatus: "",
    remark: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Testing status options
  const finalStatusOptions = [
    { value: "", label: "Select Status" },
    { value: "pass", label: "Pass" },
    { value: "fail", label: "Fail" },
    { value: "conditional-pass", label: "Conditional Pass" },
    { value: "needs-calibration", label: "Needs Calibration" },
    { value: "requires-modification", label: "Requires Modification" },
    { value: "scrapped", label: "Scrapped" },
    { value: "pending-approval", label: "Pending Approval" },
    { value: "under-testing", label: "Under Testing" }
  ];

  // Testing location options
  const testingLocationOptions = [
    { value: "", label: "Select Location" },
    { value: "contractor-lab", label: "Contractor Lab" },
    { value: "lmrc-lab", label: "LMRC Lab" },
    { value: "vendor-facility", label: "Vendor Facility" },
    { value: "site-testing", label: "Site Testing" },
    { value: "third-party-lab", label: "Third Party Lab" },
    { value: "manufacturer-facility", label: "Manufacturer Facility" }
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
    if (!formValues.item_description) {
      errors.item_description = "Item description is required";
    }
    
    if (!formValues.testing_detail) {
      errors.testing_detail = "Testing detail is required";
    }
    
    if (!formValues.item_serialName) {
      errors.item_serialName = "Item serial number/name is required";
    }
    
    if (!formValues.testingLocation) {
      errors.testingLocation = "Testing location is required";
    }
    
    if (!formValues.testedFrom) {
      errors.testedFrom = "Tested by (from) is required";
    }

    // Date validation - testing end should be after testing start
    if (formValues.dateTo && formValues.dateFrom) {
      if (new Date(formValues.dateTo) < new Date(formValues.dateFrom)) {
        errors.dateTo = "Testing end date cannot be before start date";
      }
    }

    // Testing duration validation (optional but logical)
    if (formValues.dateFrom && formValues.dateTo) {
      const startDate = new Date(formValues.dateFrom);
      const endDate = new Date(formValues.dateTo);
      const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
      
      if (diffInDays > 365) {
        errors.dateTo = "Testing duration exceeds 1 year. Please verify dates.";
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
        slug: slug || "contractual-spare-testing-register"
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("Contractual Spare Testing Register saved successfully!");
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
      title="Contractual Spare Testing Register"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Contractual Spare Testing Register", path: "/signalling/contractual-spare-testing" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="sn"
              label="Serial Number"
              value={formValues.sn}
              readOnly={true}
            />
          </div>
        </div>

        {/* Item Information */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="item_description"
              label="Item Description"
              value={formValues.item_description}
              onChange={(e) => handleFieldChange("item_description", e.target.value)}
              placeholder="Detailed description of the spare item being tested"
              required={true}
              rows={3}
              error={formErrors.item_description}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="item_serialName"
              label="Item Serial Number/Name"
              value={formValues.item_serialName}
              onChange={(e) => handleFieldChange("item_serialName", e.target.value)}
              placeholder="Serial number or identification name of the item"
              required={true}
              error={formErrors.item_serialName}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="select"
              name="testingLocation"
              label="Testing Location"
              value={formValues.testingLocation}
              onChange={(e) => handleFieldChange("testingLocation", e.target.value)}
              options={testingLocationOptions}
              required={true}
              error={formErrors.testingLocation}
            />
          </div>
        </div>

        {/* Testing Details */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="testing_detail"
              label="Testing Detail"
              value={formValues.testing_detail}
              onChange={(e) => handleFieldChange("testing_detail", e.target.value)}
              placeholder="Detailed description of testing procedures, parameters, and methodology"
              required={true}
              rows={4}
              error={formErrors.testing_detail}
            />
          </div>
        </div>

        {/* Testing Personnel and Timeline */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="testedFrom"
              label="Tested By (From)"
              value={formValues.testedFrom}
              onChange={(e) => handleFieldChange("testedFrom", e.target.value)}
              placeholder="Name/designation of person who conducted the test"
              required={true}
              error={formErrors.testedFrom}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="testedTo"
              label="Tested To (Recipient)"
              value={formValues.testedTo}
              onChange={(e) => handleFieldChange("testedTo", e.target.value)}
              placeholder="Name/designation of person receiving test results"
              error={formErrors.testedTo}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="date"
              name="dateFrom"
              label="Testing Start Date"
              value={formValues.dateFrom}
              onChange={(e) => handleFieldChange("dateFrom", e.target.value)}
              error={formErrors.dateFrom}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="date"
              name="dateTo"
              label="Testing End Date"
              value={formValues.dateTo}
              onChange={(e) => handleFieldChange("dateTo", e.target.value)}
              error={formErrors.dateTo}
            />
          </div>
        </div>

        {/* Final Status */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="select"
              name="FinalStatus"
              label="Final Status"
              value={formValues.FinalStatus}
              onChange={(e) => handleFieldChange("FinalStatus", e.target.value)}
              options={finalStatusOptions}
              error={formErrors.FinalStatus}
            />
          </div>
        </div>

        {/* Remarks */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="remark"
              label="Remarks"
              value={formValues.remark}
              onChange={(e) => handleFieldChange("remark", e.target.value)}
              placeholder="Additional remarks about testing results, observations, or recommendations"
              rows={4}
              error={formErrors.remark}
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
                  "Save Contractual Spare Testing Register"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default ContractualSpareTestingRegisterForm;