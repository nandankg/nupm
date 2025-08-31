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

const TerEntryRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [date, setDate] = useState(new Date());
  const [s_no, setSno] = useState(1);
  const terEntry = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const [formData, setFormData] = useState({
    s_no: s_no,
    date: "",
    name: "",
    emp_id: "",
    desg: "",
    e_time: "",
    purpose: "",
    ex_time: "",
    V_sign: "",
    D_sign: "",
    remark: "",
    employee_id: "",
    department: "",
    unit: "",
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
    
    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.emp_id) {
      errors.emp_id = "Employee ID is required";
    }

    // Business rule validations
    if (formData.e_time && formData.ex_time) {
      const entryTime = new Date(`1970-01-01T${formData.e_time}`);
      const exitTime = new Date(`1970-01-01T${formData.ex_time}`);
      if (exitTime <= entryTime) {
        errors.ex_time = "Exit time must be after entry time";
      }
    }

    // Name validation
    if (formData.name && formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Employee ID validation
    if (formData.emp_id && formData.emp_id.trim().length < 1) {
      errors.emp_id = "Employee ID cannot be empty";
    }

    // Purpose validation
    if (formData.purpose && formData.purpose.trim().length < 3) {
      errors.purpose = "Purpose must be at least 3 characters";
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
        const newsrno = s_no + 1;
        setSno(newsrno);
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
    { text: "TER Entry Register", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="TER Entry Register"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="medium"
      formId="34"
      containerWidth="90%"
    >
      {/* PRESERVED EXACT FIRST ROW: Date */}
      <div className='row mb-3'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="date"
            name="date"
            label="Date:"
            placeholder="Enter Date"
            value={formData.date}
            onChange={handleChange}
            required={true}
            error={formErrors.date}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: Name, Emp ID, Designation, Entry Time */}
      <div className='row mb-3'>
        <div className='col-md-3'>
          <UniversalOperationFormField
            type="text"
            name="name"
            label="Name:"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required={true}
            error={formErrors.name}
          />
        </div>

        <div className='col-md-3'>
          <UniversalOperationFormField
            type="text"
            name="emp_id"
            label="Emp.No./ID No.:"
            placeholder="Enter ID"
            value={formData.emp_id}
            onChange={handleChange}
            required={true}
            error={formErrors.emp_id}
          />
        </div>

        <div className='col-md-3'>
          <UniversalOperationFormField
            type="text"
            name="desg"
            label="Designation/ Department:"
            placeholder="Enter Designation"
            value={formData.desg}
            onChange={handleChange}
            error={formErrors.desg}
          />
        </div>

        <div className='col-md-3'>
          <UniversalOperationFormField
            type="time"
            name="e_time"
            label="Entry Time:"
            value={formData.e_time}
            onChange={handleChange}
            error={formErrors.e_time}
          />
        </div>
      </div>

      {/* PRESERVED EXACT THIRD ROW: Purpose, Exit Time, Visitor's Name, Name on Duty */}
      <div className='row mb-3'>
        <div className='col-md-3'>
          <UniversalOperationFormField
            type="text"
            name="purpose"
            label="Purpose of Visit:"
            value={formData.purpose}
            onChange={handleChange}
            error={formErrors.purpose}
          />
        </div>

        <div className='col-md-3'>
          <UniversalOperationFormField
            type="time"
            name="ex_time"
            label="Exit Time:"
            value={formData.ex_time}
            onChange={handleChange}
            error={formErrors.ex_time}
          />
        </div>

        <div className='col-md-3'>
          <UniversalOperationFormField
            type="text"
            name="V_sign"
            label="Visitor's Name:"
            value={formData.V_sign}
            onChange={handleChange}
            error={formErrors.V_sign}
          />
        </div>

        <div className='col-md-3'>
          <UniversalOperationFormField
            type="text"
            name="D_sign"
            label="Name on Duty:"
            value={formData.D_sign}
            onChange={handleChange}
            error={formErrors.D_sign}
          />
        </div>
      </div>

      {/* PRESERVED EXACT FOURTH ROW: Remark */}
      <div className='row mb-3'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="remark"
            label="Remark:"
            placeholder="Remark"
            value={formData.remark}
            onChange={handleChange}
            error={formErrors.remark}
          />
        </div>
      </div>

      {/* PRESERVED EXACT HIDDEN/SYSTEM FIELDS (Maintained for compatibility) */}
      <input type="hidden" name="s_no" value={formData.s_no} />
      <input type="hidden" name="employee_id" value={formData.employee_id} />
      <input type="hidden" name="department" value={formData.department} />
      <input type="hidden" name="unit" value={formData.unit} />
    </OperationFormLayout>
  );
};

export default TerEntryRegisterForm;