import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm } from "../validation/operationValidationSchemas";
import { formatDate } from "../../../data/formatDate";
import station from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const OperationLiftRescueForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [date, setDate] = useState(new Date());
  const liftRescue = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const [formData, setFormData] = useState({
    date: formatDate(date.toString()),
    station: "",
    lift_no: "",
    from_time: "",
    to_time: "",
    timeTaken: "",
    remarks: "",
    Employ_id: "1",
    name_of_sc: "up",
    Station_name: "up",
    department: "s&t",
    TCEmploy_id: "1",
    name_of_tc: "up",
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
    
    if (!formData.lift_no) {
      errors.lift_no = "Lift No. is required";
    }

    if (!formData.name_of_sc) {
      errors.name_of_sc = "Name of SC is required";
    }

    // Time validations
    if (formData.from_time && formData.to_time) {
      const fromTime = new Date(`1970-01-01T${formData.from_time}`);
      const toTime = new Date(`1970-01-01T${formData.to_time}`);
      if (toTime <= fromTime) {
        errors.to_time = "To time must be after From time";
      }
    }

    // Business rule validations
    if (formData.TCEmploy_id && formData.TCEmploy_id < 1) {
      errors.TCEmploy_id = "Employee ID must be positive";
    }

    if (formData.Employ_id && formData.Employ_id < 1) {
      errors.Employ_id = "Employee ID must be positive";
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
    { text: "Lift Rescue Drill Register", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="LIFT RESCUE DRILL REGISTER"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="medium"
      formId="30"
      containerWidth="90%"
    >
      {/* PRESERVED EXACT FIRST ROW: Date, Name of SC, Lift No. */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="date"
            name="date"
            label="Date:"
            value={formData.date}
            onChange={handleChange}
            required={true}
            disabled={true}
            error={formErrors.date}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="name_of_sc"
            label="Name Of SC:"
            value={formData.name_of_sc}
            onChange={handleChange}
            required={true}
            error={formErrors.name_of_sc}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="lift_no"
            label="Lift No.:"
            value={formData.lift_no}
            onChange={handleChange}
            required={true}
            error={formErrors.lift_no}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: Time From, Time To */}
      <div className='row mb-2'>
        <div className='col-md-6'>
          <UniversalOperationFormField
            type="time"
            name="from_time"
            label="Time (From):"
            value={formData.from_time}
            onChange={handleChange}
            error={formErrors.from_time}
          />
        </div>

        <div className='col-md-6'>
          <UniversalOperationFormField
            type="time"
            name="to_time"
            label="Time (To):"
            value={formData.to_time}
            onChange={handleChange}
            error={formErrors.to_time}
          />
        </div>
      </div>

      {/* PRESERVED EXACT THIRD ROW: Total Time Taken, Name of TC, Emp.Id of TC, Remarks */}
      <div className='row mb-2'>
        <div className='col-md-3'>
          <UniversalOperationFormField
            type="text"
            name="timeTaken"
            label="Total Time Taken:"
            value={formData.timeTaken}
            onChange={handleChange}
            error={formErrors.timeTaken}
          />
        </div>

        <div className='col-md-3'>
          <UniversalOperationFormField
            type="text"
            name="name_of_tc"
            label="Name Of TC:"
            value={formData.name_of_tc}
            onChange={handleChange}
            error={formErrors.name_of_tc}
          />
        </div>

        <div className='col-md-3'>
          <UniversalOperationFormField
            type="text"
            name="TCEmploy_id"
            label="Emp.Id Of TC:"
            value={formData.TCEmploy_id}
            onChange={handleChange}
            error={formErrors.TCEmploy_id}
          />
        </div>

        <div className='col-md-3'>
          <UniversalOperationFormField
            type="text"
            name="remarks"
            label="Remarks:"
            value={formData.remarks}
            onChange={handleChange}
            error={formErrors.remarks}
          />
        </div>
      </div>

      {/* PRESERVED EXACT HIDDEN/SYSTEM FIELDS (Maintained for compatibility) */}
      <input type="hidden" name="Employ_id" value={formData.Employ_id} />
      <input type="hidden" name="Station_name" value={formData.Station_name} />
      <input type="hidden" name="department" value={formData.department} />
    </OperationFormLayout>
  );
};

export default OperationLiftRescueForm;