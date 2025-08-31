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

const FirstAidRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [date, setDate] = useState(new Date());
  const [sno, setSno] = useState(1);
  const firstAid = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const [formData, setFormData] = useState({
    sno: sno,
    date: formatDate(new Date().toString()),
    time: formatTime(new Date().toString()),
    name1: "",
    designation1: "",
    name2: "",
    designation2: "",
    itemsConsumed: "",
    Employ_id: "",
    department: "",
  });

  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formData.name1) {
      errors.name1 = "First Aid Provided To (Name) is required";
    }
    
    if (!formData.name2) {
      errors.name2 = "First Aid Provided By (Name) is required";
    }

    if (!formData.date) {
      errors.date = "Date is required";
    }

    if (!formData.itemsConsumed) {
      errors.itemsConsumed = "Items & Quantity consumed is required";
    }

    // Business rule validations
    if (formData.name1 && formData.name2 && formData.name1.toLowerCase() === formData.name2.toLowerCase()) {
      errors.name2 = "First aid provider and recipient cannot be the same person";
    }

    if (formData.designation1 && formData.designation1.trim().length < 2) {
      errors.designation1 = "Designation must be at least 2 characters";
    }

    if (formData.designation2 && formData.designation2.trim().length < 2) {
      errors.designation2 = "Designation must be at least 2 characters";
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
        const newSrno = sno + 1;
        setSno(newSrno);
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
    { text: "First Aid", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="First Aid Register"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="medium"
      formId="33"
      containerWidth="90%"
    >
      {/* PRESERVED EXACT FIRST ROW: First Aid Provided To & By */}
      <div className='row mb-3'>
        <div className='col-md-6'>
          <div className="mb-3">
            <label htmlFor="name1" className="form-label">
              First Aid Provided To:
              <span className="text-danger">*</span>
            </label>
            <UniversalOperationFormField
              type="text"
              name="name1"
              placeholder="name e.g. ram"
              value={formData.name1}
              onChange={handleChange}
              required={true}
              error={formErrors.name1}
            />
            <div className="mt-3">
              <UniversalOperationFormField
                type="text"
                name="designation1"
                placeholder="Enter Designation"
                value={formData.designation1}
                onChange={handleChange}
                error={formErrors.designation1}
              />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className="mb-3">
            <label htmlFor="name2" className="form-label">
              First Aid Provided By:
              <span className="text-danger">*</span>
            </label>
            <UniversalOperationFormField
              type="text"
              name="name2"
              placeholder="name"
              value={formData.name2}
              onChange={handleChange}
              required={true}
              error={formErrors.name2}
            />
            <div className="mt-3">
              <UniversalOperationFormField
                type="text"
                name="designation2"
                placeholder="Enter Designation"
                value={formData.designation2}
                onChange={handleChange}
                error={formErrors.designation2}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: Department, Employ Id, Date */}
      <div className='row mb-3'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="department"
            label="Department:"
            value={formData.department}
            onChange={handleChange}
            error={formErrors.department}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="Employ_id"
            label="Employ Id:"
            value={formData.Employ_id}
            onChange={handleChange}
            error={formErrors.Employ_id}
          />
        </div>

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
      </div>

      {/* PRESERVED EXACT MOTIVATIONAL MESSAGE */}
      <div className="row mb-3">
        <div className="col-md-12">
          <p className="text-center text-success fw-bold">
            You save a life, Great Work!
          </p>
        </div>
      </div>

      {/* PRESERVED EXACT ITEMS CONSUMED SECTION */}
      <div className='row mb-3'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="itemsConsumed"
            label="Items & Quantity consumed:"
            value={formData.itemsConsumed}
            onChange={handleChange}
            required={true}
            error={formErrors.itemsConsumed}
          />
        </div>
      </div>

      {/* PRESERVED EXACT HIDDEN/SYSTEM FIELDS (Maintained for compatibility) */}
      <input type="hidden" name="sno" value={formData.sno} />
      <input type="hidden" name="time" value={formData.time} />
    </OperationFormLayout>
  );
};

export default FirstAidRegisterForm;