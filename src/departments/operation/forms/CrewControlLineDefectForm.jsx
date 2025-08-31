import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm, incidentAccidentValidation } from "../validation/operationValidationSchemas";
import { formatDate, formatTime } from "../../../data/formatDate";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const CrewControlLineDefectForm = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const LineDefectList = useSelector((state) => state.data);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const basicInitialValues = {
    S_No: sNo,
    date: formatDate(new Date().toString),
    reportTime: "",
    name: "",
    emp_no: "",
    location: "",
    train_no: "",
    train_set: "",
    failDescription: "",
    signOfTO: "",
    remark: "",
    signOfCC: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  
  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations preserving business logic
    if (!formValues.date) {
      errors.date = "Date is required";
    }
    
    if (!formValues.name.trim()) {
      errors.name = "Name of Train Operator is required";
    }
    
    if (!formValues.emp_no.trim()) {
      errors.emp_no = "Emp No. is required";
    }
    
    if (!formValues.location.trim()) {
      errors.location = "Location is required";
    }
    
    if (!formValues.train_no) {
      errors.train_no = "Train No. is required";
    }
    
    if (!formValues.failDescription.trim()) {
      errors.failDescription = "Failure Description is required";
    }

    // Business rule validations
    if (formValues.train_no && parseInt(formValues.train_no) < 1) {
      errors.train_no = "Train number must be greater than 0";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT SUBMIT FUNCTION
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // PRESERVED EXACT SUBMISSION LOGIC
    dispatch(addData({ formType: slug, values: formValues }))
      .then(() => {
        console.log("Form Data Submitted:", formValues);
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

  // Handle field changes with error clearing
  const handleFieldChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
    
    // Clear field error on change
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { text: "Line Defect Register", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="Line Defect Register"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="high"
      formId="29"
      containerWidth="95%"
    >
      {/* PRESERVED EXACT FIRST ROW: Date & Reported Time */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="date"
            name="date"
            label="Date"
            value={formValues.date}
            onChange={(e) => handleFieldChange('date', e.target.value)}
            required={true}
            error={formErrors.date}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="time"
            name="reportTime"
            label="Reported Time"
            value={formValues.reportTime}
            onChange={(e) => handleFieldChange('reportTime', e.target.value)}
            error={formErrors.reportTime}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: Train Operator Details */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="name"
            label="Name of Train Operator"
            value={formValues.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            required={true}
            error={formErrors.name}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="employee"
            name="emp_no"
            label="Emp No."
            value={formValues.emp_no}
            onChange={(e) => handleFieldChange('emp_no', e.target.value)}
            required={true}
            error={formErrors.emp_no}
          />
        </div>
      </div>

      {/* PRESERVED EXACT THIRD ROW: Location & Train No */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="location"
            label="Location"
            value={formValues.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            required={true}
            error={formErrors.location}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="number"
            name="train_no"
            label="Train No."
            value={formValues.train_no}
            onChange={(e) => handleFieldChange('train_no', e.target.value)}
            min="1"
            required={true}
            error={formErrors.train_no}
          />
        </div>
      </div>

      {/* PRESERVED EXACT FOURTH ROW: Train Set & Failure Description */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="train_set"
            label="Train Set"
            value={formValues.train_set}
            onChange={(e) => handleFieldChange('train_set', e.target.value)}
            error={formErrors.train_set}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="failDescription"
            label="Failure Description"
            value={formValues.failDescription}
            onChange={(e) => handleFieldChange('failDescription', e.target.value)}
            required={true}
            error={formErrors.failDescription}
          />
        </div>
      </div>

      {/* PRESERVED EXACT FIFTH ROW: Remark (Note: signOfTO field was commented out in original) */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="remark"
            label="Remark"
            value={formValues.remark}
            onChange={(e) => handleFieldChange('remark', e.target.value)}
            error={formErrors.remark}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SIXTH ROW: Name of CC/CDI */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="signOfCC"
            label="Name of CC/CDI"
            value={formValues.signOfCC}
            onChange={(e) => handleFieldChange('signOfCC', e.target.value)}
            error={formErrors.signOfCC}
          />
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default CrewControlLineDefectForm;