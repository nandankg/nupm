import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm } from "../validation/operationValidationSchemas";
import { formatDate, formatTime } from "../../../data/formatDate";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const CrewControlCcapForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const crewControl = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const [formData, setFormData] = useState({
    date: formatDate(new Date().toDateString()),
    department: "",
    purposeofreq: "",
    time: formatTime(new Date().toString()),
    toprovided: "",
    reason: "",
    nameofcc: "",
    signofcc: "",
    remark: "",
    empid: "",
  });

  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formData.department) {
      errors.department = "Department is required";
    }
    
    if (!formData.purposeofreq) {
      errors.purposeofreq = "Purpose of Request is required";
    }

    if (!formData.toprovided) {
      errors.toprovided = "Please select whether TO was provided or not";
    }

    if (!formData.nameofcc) {
      errors.nameofcc = "Name of CC is required";
    }

    if (!formData.remark) {
      errors.remark = "Remark is required";
    }

    // Business rule validations
    if (formData.toprovided === "No" && !formData.reason) {
      errors.reason = "Reason is required when TO is not provided";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Clear reason error if TO is provided
    if (name === "toprovided" && value === "Yes" && formErrors.reason) {
      setFormErrors(prev => ({ ...prev, reason: "" }));
    }
  };

  // PRESERVED EXACT SUBMIT FUNCTION
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    dispatch(addData({ formType: slug, values: formData }))
      .then(() => {
        console.log("Form Data Submitted:", formData);
        navigate(`/list/${slug}`);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { text: "CREW CONTROL CCAP", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="UNPLANNED TRAIN OPERATOR DEMAND RECORD"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="high"
      formId="32"
      containerWidth="90%"
    >
      {/* PRESERVED EXACT FIRST ROW: Department, Purpose of Request */}
      <div className='row mb-2'>
        <div className='col-md-6'>
          <UniversalOperationFormField
            type="text"
            name="department"
            label="Department:"
            value={formData.department}
            onChange={handleChange}
            required={true}
            error={formErrors.department}
          />
        </div>

        <div className='col-md-6'>
          <UniversalOperationFormField
            type="text"
            name="purposeofreq"
            label="Purpose of Request:"
            value={formData.purposeofreq}
            onChange={handleChange}
            required={true}
            error={formErrors.purposeofreq}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: TO Provided Radio, Reason */}
      <div className='row mb-2'>
        <div className='col-md-6'>
          <div className="mb-3">
            <label htmlFor="toprovided" className="form-label">
              Whether TO was provided or not:
              <span className="text-danger">*</span>
            </label>
            <div className="mt-2">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="toprovided"
                  id="toProvidedYes"
                  value="Yes"
                  checked={formData.toprovided === "Yes"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="toProvidedYes">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="toprovided"
                  id="toProvidedNo"
                  value="No"
                  checked={formData.toprovided === "No"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="toProvidedNo">
                  No
                </label>
              </div>
            </div>
            {formErrors.toprovided && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.toprovided}
              </div>
            )}
          </div>
        </div>

        <div className='col-md-6'>
          <UniversalOperationFormField
            type="text"
            name="reason"
            label="Reason, if TO not provided:"
            value={formData.reason}
            onChange={handleChange}
            required={formData.toprovided === "No"}
            error={formErrors.reason}
            disabled={formData.toprovided === "Yes"}
          />
        </div>
      </div>

      {/* PRESERVED EXACT THIRD ROW: Name of CC, Remark */}
      <div className='row mb-2'>
        <div className='col-md-6'>
          <UniversalOperationFormField
            type="text"
            name="nameofcc"
            label="Name of CC:"
            value={formData.nameofcc}
            onChange={handleChange}
            required={true}
            error={formErrors.nameofcc}
          />
        </div>

        <div className='col-md-6'>
          <UniversalOperationFormField
            type="text"
            name="remark"
            label="Remark:"
            value={formData.remark}
            onChange={handleChange}
            required={true}
            error={formErrors.remark}
          />
        </div>
      </div>

      {/* PRESERVED EXACT HIDDEN/SYSTEM FIELDS (Maintained for compatibility) */}
      <input type="hidden" name="date" value={formData.date} />
      <input type="hidden" name="time" value={formData.time} />
      <input type="hidden" name="signofcc" value={formData.signofcc} />
      <input type="hidden" name="empid" value={formData.empid} />
    </OperationFormLayout>
  );
};

export default CrewControlCcapForm;