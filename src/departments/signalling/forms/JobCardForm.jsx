import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm } from "../validation/signallingValidationSchemas";
import { addData, addJobCard } from "../../../reducer/rajiv/jobCardReducer";
import { formatDate } from "../../../data/formatDate";

/**
 * Job Card Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const JobCardForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jobCardList = useSelector((state) => state.jobCard);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (jobCardList) {
      setSlug(jobCardList.slug);
    }
  }, [jobCardList]);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const initialFormValues = {
    jcNo: "",
    date: formatDate(new Date().toString()),
    ptwNo: "",
    trainNumber: "",
    carNo: "",
    expectedCompletionTime: "",
    jobType: "",
    jobDescription: "",
    workDetails: "",
    work: "",
    contractorName: "",
    roofAccessRequired: "",
    powerBlockRequired: "",
    powerBlockSupervisor: "NA",
    lmrcStaffName: "",
    lmrcStaffDesignation: "",
    failureHistory: "",
    sgcName: "",
    sgcDate: "",
    completionDetails: "",
    condition1: "",
    condition2: "",
    followUpDetails: "",
    atpStatus: false,
    atoStatus: false,
    powerBlockRequestCancelled: "",
    oldSrNoDetails: "",
    newSrNoDetails: "",
    conclusion: "",
    workPending: "",
    auxStatus: false,
    trainEnergized: false,
    trainEnergizedReason: "",
    contractorStaffName: "",
    contractorStaffSign: "",
    contractorStaffDate: "",
    contractorStaffTime: "",
    signalingStaffName: "",
    signalingStaffSign: "",
    signalingStaffDate: "",
    signalingStaffTime: "",
    sgcSignName: "",
    sgcSign: "",
    sgcSignDate: "",
    sgcSignTime: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  // Job type options
  const jobTypeOptions = [
    { value: "", label: "Select Job Type" },
    { value: "preventive-maintenance", label: "Preventive Maintenance" },
    { value: "corrective-maintenance", label: "Corrective Maintenance" },
    { value: "emergency-repair", label: "Emergency Repair" },
    { value: "inspection", label: "Inspection" },
    { value: "testing", label: "Testing" },
    { value: "installation", label: "Installation" },
    { value: "replacement", label: "Replacement" },
    { value: "calibration", label: "Calibration" },
    { value: "upgrade", label: "Upgrade" },
    { value: "other", label: "Other" }
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

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleFieldChange(name, checked);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formValues.jcNo) {
      errors.jcNo = "Job Card Number is required";
    }
    
    if (!formValues.date) {
      errors.date = "Date is required";
    }
    
    if (!formValues.jobType) {
      errors.jobType = "Job type is required";
    }
    
    if (!formValues.jobDescription) {
      errors.jobDescription = "Job description is required";
    }
    
    if (!formValues.contractorName) {
      errors.contractorName = "Contractor name is required";
    }
    
    if (!formValues.lmrcStaffName) {
      errors.lmrcStaffName = "LMRC staff name is required";
    }
    
    if (!formValues.lmrcStaffDesignation) {
      errors.lmrcStaffDesignation = "LMRC staff designation is required";
    }

    // Time validation
    if (formValues.expectedCompletionTime && formValues.contractorStaffTime) {
      const expected = new Date(`${formValues.date} ${formValues.expectedCompletionTime}`);
      const actual = new Date(`${formValues.contractorStaffDate || formValues.date} ${formValues.contractorStaffTime}`);
      
      if (actual > expected) {
        errors.contractorStaffTime = "Completion time exceeds expected time";
      }
    }

    // Date validations
    if (formValues.sgcDate && formValues.date) {
      if (new Date(formValues.sgcDate) < new Date(formValues.date)) {
        errors.sgcDate = "SGC date cannot be before job card date";
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
        slug: slug || "job-card"
      };

      dispatch(addData(submissionData));
      dispatch(addJobCard(submissionData));
      
      // Success feedback
      alert("Job Card saved successfully!");
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
    setFormValues(initialFormValues);
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="Job Card"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Job Card", path: "/signalling/job-card" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="jcNo"
              label="Job Card Number"
              value={formValues.jcNo}
              onChange={(e) => handleFieldChange("jcNo", e.target.value)}
              placeholder="Enter job card number"
              required={true}
              error={formErrors.jcNo}
            />
          </div>
          <div className="col-md-4">
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
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="ptwNo"
              label="PTW Number"
              value={formValues.ptwNo}
              onChange={(e) => handleFieldChange("ptwNo", e.target.value)}
              placeholder="Permit to Work number"
              error={formErrors.ptwNo}
            />
          </div>
        </div>

        {/* Train Information */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="trainNumber"
              label="Train Number"
              value={formValues.trainNumber}
              onChange={(e) => handleFieldChange("trainNumber", e.target.value)}
              placeholder="Enter train number"
              error={formErrors.trainNumber}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="carNo"
              label="Car Number"
              value={formValues.carNo}
              onChange={(e) => handleFieldChange("carNo", e.target.value)}
              placeholder="Enter car number"
              error={formErrors.carNo}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="time"
              name="expectedCompletionTime"
              label="Expected Completion Time"
              value={formValues.expectedCompletionTime}
              onChange={(e) => handleFieldChange("expectedCompletionTime", e.target.value)}
              error={formErrors.expectedCompletionTime}
            />
          </div>
        </div>

        {/* Job Details */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="select"
              name="jobType"
              label="Job Type"
              value={formValues.jobType}
              onChange={(e) => handleFieldChange("jobType", e.target.value)}
              options={jobTypeOptions}
              required={true}
              error={formErrors.jobType}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="contractorName"
              label="Contractor Name"
              value={formValues.contractorName}
              onChange={(e) => handleFieldChange("contractorName", e.target.value)}
              placeholder="Enter contractor name"
              required={true}
              error={formErrors.contractorName}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="jobDescription"
              label="Job Description"
              value={formValues.jobDescription}
              onChange={(e) => handleFieldChange("jobDescription", e.target.value)}
              placeholder="Detailed description of the job to be performed"
              required={true}
              rows={3}
              error={formErrors.jobDescription}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="workDetails"
              label="Work Details"
              value={formValues.workDetails}
              onChange={(e) => handleFieldChange("workDetails", e.target.value)}
              placeholder="Specific work details and procedures"
              rows={3}
              error={formErrors.workDetails}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="work"
              label="Work Performed"
              value={formValues.work}
              onChange={(e) => handleFieldChange("work", e.target.value)}
              placeholder="Description of actual work performed"
              rows={3}
              error={formErrors.work}
            />
          </div>
        </div>

        {/* Safety Requirements */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Safety Requirements</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="select"
                  name="roofAccessRequired"
                  label="Roof Access Required"
                  value={formValues.roofAccessRequired}
                  onChange={(e) => handleFieldChange("roofAccessRequired", e.target.value)}
                  options={[
                    { value: "", label: "Select" },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" }
                  ]}
                  error={formErrors.roofAccessRequired}
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="select"
                  name="powerBlockRequired"
                  label="Power Block Required"
                  value={formValues.powerBlockRequired}
                  onChange={(e) => handleFieldChange("powerBlockRequired", e.target.value)}
                  options={[
                    { value: "", label: "Select" },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" }
                  ]}
                  error={formErrors.powerBlockRequired}
                />
              </div>
            </div>
            
            {formValues.powerBlockRequired === "yes" && (
              <div className="row">
                <div className="col-md-12">
                  <UniversalSignallingFormField
                    type="text"
                    name="powerBlockSupervisor"
                    label="Power Block Supervisor"
                    value={formValues.powerBlockSupervisor}
                    onChange={(e) => handleFieldChange("powerBlockSupervisor", e.target.value)}
                    placeholder="Name of power block supervisor"
                    error={formErrors.powerBlockSupervisor}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LMRC Staff Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="lmrcStaffName"
              label="LMRC Staff Name"
              value={formValues.lmrcStaffName}
              onChange={(e) => handleFieldChange("lmrcStaffName", e.target.value)}
              placeholder="LMRC supervising staff name"
              required={true}
              error={formErrors.lmrcStaffName}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="lmrcStaffDesignation"
              label="LMRC Staff Designation"
              value={formValues.lmrcStaffDesignation}
              onChange={(e) => handleFieldChange("lmrcStaffDesignation", e.target.value)}
              placeholder="Staff designation"
              required={true}
              error={formErrors.lmrcStaffDesignation}
            />
          </div>
        </div>

        {/* Failure History and SGC Details */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="failureHistory"
              label="Failure History"
              value={formValues.failureHistory}
              onChange={(e) => handleFieldChange("failureHistory", e.target.value)}
              placeholder="Previous failure history if any"
              rows={3}
              error={formErrors.failureHistory}
            />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <UniversalSignallingFormField
                  type="text"
                  name="sgcName"
                  label="SGC Name"
                  value={formValues.sgcName}
                  onChange={(e) => handleFieldChange("sgcName", e.target.value)}
                  placeholder="SGC officer name"
                  error={formErrors.sgcName}
                />
              </div>
              <div className="col-md-12">
                <UniversalSignallingFormField
                  type="date"
                  name="sgcDate"
                  label="SGC Date"
                  value={formValues.sgcDate}
                  onChange={(e) => handleFieldChange("sgcDate", e.target.value)}
                  error={formErrors.sgcDate}
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Status Checkboxes */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">System Status</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="atpStatus"
                    name="atpStatus"
                    checked={formValues.atpStatus}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="atpStatus">
                    ATP Status
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="atoStatus"
                    name="atoStatus"
                    checked={formValues.atoStatus}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="atoStatus">
                    ATO Status
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="auxStatus"
                    name="auxStatus"
                    checked={formValues.auxStatus}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="auxStatus">
                    AUX Status
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="trainEnergized"
                    name="trainEnergized"
                    checked={formValues.trainEnergized}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="trainEnergized">
                    Train Energized
                  </label>
                </div>
              </div>
            </div>
            
            {formValues.trainEnergized && (
              <div className="row">
                <div className="col-md-12">
                  <UniversalSignallingFormField
                    type="textarea"
                    name="trainEnergizedReason"
                    label="Train Energized Reason"
                    value={formValues.trainEnergizedReason}
                    onChange={(e) => handleFieldChange("trainEnergizedReason", e.target.value)}
                    placeholder="Reason for train being energized"
                    rows={2}
                    error={formErrors.trainEnergizedReason}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Completion Details */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="completionDetails"
              label="Completion Details"
              value={formValues.completionDetails}
              onChange={(e) => handleFieldChange("completionDetails", e.target.value)}
              placeholder="Details of work completion"
              rows={3}
              error={formErrors.completionDetails}
            />
          </div>
        </div>

        {/* Signatures Section */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Signatures</h5>
          </div>
          <div className="card-body">
            {/* Contractor Staff */}
            <div className="row">
              <div className="col-md-12"><h6>Contractor Staff</h6></div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="contractorStaffName"
                  label="Name"
                  value={formValues.contractorStaffName}
                  onChange={(e) => handleFieldChange("contractorStaffName", e.target.value)}
                  placeholder="Contractor staff name"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="contractorStaffSign"
                  label="Signature"
                  value={formValues.contractorStaffSign}
                  onChange={(e) => handleFieldChange("contractorStaffSign", e.target.value)}
                  placeholder="Signature/Initial"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="date"
                  name="contractorStaffDate"
                  label="Date"
                  value={formValues.contractorStaffDate}
                  onChange={(e) => handleFieldChange("contractorStaffDate", e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="time"
                  name="contractorStaffTime"
                  label="Time"
                  value={formValues.contractorStaffTime}
                  onChange={(e) => handleFieldChange("contractorStaffTime", e.target.value)}
                  error={formErrors.contractorStaffTime}
                />
              </div>
            </div>

            {/* Signaling Staff */}
            <div className="row">
              <div className="col-md-12"><h6>Signaling Staff</h6></div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="signalingStaffName"
                  label="Name"
                  value={formValues.signalingStaffName}
                  onChange={(e) => handleFieldChange("signalingStaffName", e.target.value)}
                  placeholder="Signaling staff name"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="signalingStaffSign"
                  label="Signature"
                  value={formValues.signalingStaffSign}
                  onChange={(e) => handleFieldChange("signalingStaffSign", e.target.value)}
                  placeholder="Signature/Initial"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="date"
                  name="signalingStaffDate"
                  label="Date"
                  value={formValues.signalingStaffDate}
                  onChange={(e) => handleFieldChange("signalingStaffDate", e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="time"
                  name="signalingStaffTime"
                  label="Time"
                  value={formValues.signalingStaffTime}
                  onChange={(e) => handleFieldChange("signalingStaffTime", e.target.value)}
                />
              </div>
            </div>

            {/* SGC Sign */}
            <div className="row">
              <div className="col-md-12"><h6>SGC Sign</h6></div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="sgcSignName"
                  label="Name"
                  value={formValues.sgcSignName}
                  onChange={(e) => handleFieldChange("sgcSignName", e.target.value)}
                  placeholder="SGC name"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="sgcSign"
                  label="Signature"
                  value={formValues.sgcSign}
                  onChange={(e) => handleFieldChange("sgcSign", e.target.value)}
                  placeholder="Signature/Initial"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="date"
                  name="sgcSignDate"
                  label="Date"
                  value={formValues.sgcSignDate}
                  onChange={(e) => handleFieldChange("sgcSignDate", e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="time"
                  name="sgcSignTime"
                  label="Time"
                  value={formValues.sgcSignTime}
                  onChange={(e) => handleFieldChange("sgcSignTime", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="conclusion"
              label="Conclusion"
              value={formValues.conclusion}
              onChange={(e) => handleFieldChange("conclusion", e.target.value)}
              placeholder="Overall conclusion of the work"
              rows={3}
              error={formErrors.conclusion}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="workPending"
              label="Work Pending"
              value={formValues.workPending}
              onChange={(e) => handleFieldChange("workPending", e.target.value)}
              placeholder="Any pending work or follow-up required"
              rows={3}
              error={formErrors.workPending}
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
                  "Save Job Card"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default JobCardForm;