import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm } from "../validation/operationValidationSchemas";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const TrainIdChangeRecordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const trainIdRegister = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    train_set: "",
    previousid: "",
    newid: "",
    purpose: "",
    name_of_tc: "",
    id_of_tc: "",
    name_of_acc: "",
    id_of_acc: "",
  });

  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formData.date) {
      errors.date = "Date is required";
    }
    
    if (!formData.train_set) {
      errors.train_set = "Train Set is required";
    }

    if (!formData.previousid) {
      errors.previousid = "Previous Associated ID is required";
    }

    if (!formData.newid) {
      errors.newid = "New Associated ID is required";
    }

    // Business rule validations
    if (formData.previousid && formData.newid && formData.previousid === formData.newid) {
      errors.newid = "New ID must be different from Previous ID";
    }

    if (formData.id_of_tc && formData.id_of_tc < 1) {
      errors.id_of_tc = "EID must be a positive number";
    }

    if (formData.id_of_acc && formData.id_of_acc < 1) {
      errors.id_of_acc = "ID must be a positive number";
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
  };

  // PRESERVED EXACT SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    
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
    { text: "Train Id Change Record", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="TRAIN ID CHANGE RECORD REGISTER"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="high"
      formId="27"
      containerWidth="90%"
    >
      {/* PRESERVED EXACT FIRST ROW: Date, Time, Train Set */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="date"
            name="date"
            label="Date:"
            value={formData.date}
            onChange={handleChange}
            required={true}
            error={formErrors.date}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="time"
            name="time"
            label="Time:"
            value={formData.time}
            onChange={handleChange}
            error={formErrors.time}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="number"
            name="train_set"
            label="Train Set:"
            value={formData.train_set}
            onChange={handleChange}
            min="1"
            required={true}
            error={formErrors.train_set}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: Previous and New Associated ID */}
      <div className='row mb-2'>
        <div className='col-md-6'>
          <UniversalOperationFormField
            type="number"
            name="previousid"
            label="PREVIOUS ASSOCIATED ID:"
            value={formData.previousid}
            onChange={handleChange}
            min="1"
            required={true}
            error={formErrors.previousid}
          />
        </div>

        <div className='col-md-6'>
          <UniversalOperationFormField
            type="number"
            name="newid"
            label="NEW ASSOCIATED ID:"
            value={formData.newid}
            onChange={handleChange}
            min="1"
            required={true}
            error={formErrors.newid}
          />
        </div>
      </div>

      {/* PRESERVED EXACT THIRD ROW: Purpose and Action */}
      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="purpose"
            label="PURPOSE AND ACTION:"
            value={formData.purpose}
            onChange={handleChange}
            error={formErrors.purpose}
          />
        </div>
      </div>

      {/* PRESERVED EXACT FOURTH ROW: TC Details */}
      <div className='row mb-2'>
        <div className='col-md-6'>
          <UniversalOperationFormField
            type="text"
            name="name_of_tc"
            label="NAME OF TC:"
            value={formData.name_of_tc}
            onChange={handleChange}
            error={formErrors.name_of_tc}
          />
        </div>

        <div className='col-md-6'>
          <UniversalOperationFormField
            type="number"
            name="id_of_tc"
            label="EID OF TC:"
            value={formData.id_of_tc}
            onChange={handleChange}
            min="1"
            error={formErrors.id_of_tc}
          />
        </div>
      </div>

      {/* PRESERVED EXACT FIFTH ROW: ACC Details */}
      <div className='row mb-2'>
        <div className='col-md-6'>
          <UniversalOperationFormField
            type="text"
            name="name_of_acc"
            label="NAME OF APPROVING ACC:"
            value={formData.name_of_acc}
            onChange={handleChange}
            error={formErrors.name_of_acc}
          />
        </div>

        <div className='col-md-6'>
          <UniversalOperationFormField
            type="number"
            name="id_of_acc"
            label="ID OF APPROVING ACC:"
            value={formData.id_of_acc}
            onChange={handleChange}
            min="1"
            error={formErrors.id_of_acc}
          />
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default TrainIdChangeRecordForm;