import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm, stockMovementValidation } from "../validation/operationValidationSchemas";
import { formatDate } from "../../../data/formatDate";
import station from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const OutstandingRecordRegisterForm = () => {
  const navigate = useNavigate();
  const [s_no, setSno] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const outstandvar = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const basicInitialValues = {
    s_no: s_no,
    date: formatDate(new Date().toString()),
    letter_no: "",
    station_name: "",
    operator_name: "",
    osamount: "",
    emp_no: "",
    working_id: "",
    tom_no: "",
    shift_no: "",
    Date_send: "",
    notgenamount: "",
    genamount: "",
    sigofsc: "sign",
    reason: "",
    detailback: "",
    gremark: "",
    remark: "",
    Employ_id: "",
    department: "",
    unit: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  
  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations preserving business logic
    if (!formValues.operator_name.trim()) {
      errors.operator_name = "Operator Name is required";
    }
    
    if (!formValues.emp_no.trim()) {
      errors.emp_no = "Emp.No./File No. is required";
    }
    
    if (!formValues.station_name) {
      errors.station_name = "Station is required";
    }
    
    if (!formValues.Date_send) {
      errors.Date_send = "Date of Letter Sent to OCC/RCC is required";
    }

    // Business rule validations
    if (formValues.osamount && parseFloat(formValues.osamount) <= 0) {
      errors.osamount = "O/S Amount must be greater than 0";
    }

    if (formValues.shift_no && parseInt(formValues.shift_no) < 1) {
      errors.shift_no = "Shift No. must be 1 or greater";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle field changes with error clearing
  const handleFieldChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
    
    // Clear field error on change
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({ ...prev, [fieldName]: "" }));
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

  // Breadcrumb items
  const breadcrumbItems = [
    { text: "Outstanding Record", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="Outstanding Record Register"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="medium"
      formId="22"
      containerWidth="100%"
    >
      {/* PRESERVED EXACT FIRST ROW: Operator Details */}
      <div className="row mb-3">
        <div className="col-md-3">
          <UniversalOperationFormField
            type="text"
            name="operator_name"
            label="Operator Name"
            placeholder="Name"
            value={formValues.operator_name}
            onChange={(e) => handleFieldChange('operator_name', e.target.value)}
            required={true}
            error={formErrors.operator_name}
          />
        </div>
        
        <div className="col-md-3">
          <UniversalOperationFormField
            type="employee"
            name="emp_no"
            label="Emp.No./File No."
            placeholder="Id"
            value={formValues.emp_no}
            onChange={(e) => handleFieldChange('emp_no', e.target.value)}
            required={true}
            error={formErrors.emp_no}
          />
        </div>
        
        <div className="col-md-3">
          <UniversalOperationFormField
            type="text"
            name="letter_no"
            label="Foil no"
            value={formValues.letter_no}
            onChange={(e) => handleFieldChange('letter_no', e.target.value)}
            error={formErrors.letter_no}
          />
        </div>
        
        <div className="col-md-3">
          <UniversalOperationFormField
            type="text"
            name="working_id"
            label="Working ID (As per OS)"
            placeholder="Id"
            value={formValues.working_id}
            onChange={(e) => handleFieldChange('working_id', e.target.value)}
            error={formErrors.working_id}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: Station, TOM, Shift, Amount */}
      <div className="row mb-3">
        <div className='col-md-3'>
          <div className="mb-3">
            <label htmlFor="station_name" className="form-label">
              Station:
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.station_name ? 'is-invalid' : ''}`}
              name="station_name"
              value={formValues.station_name}
              onChange={(e) => handleFieldChange('station_name', e.target.value)}
              required
            >
              <option value="">Select a Station</option>
              {station.map((stn, index) => (
                <option key={index} value={stn["Station Name"]}>
                  {stn["Station Name"]}
                </option>
              ))}
            </select>
            {formErrors.station_name && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.station_name}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-3">
          <UniversalOperationFormField
            type="text"
            name="tom_no"
            label="TOM No."
            value={formValues.tom_no}
            onChange={(e) => handleFieldChange('tom_no', e.target.value)}
            error={formErrors.tom_no}
          />
        </div>
        
        <div className="col-md-3">
          <UniversalOperationFormField
            type="number"
            name="shift_no"
            label="Shift No."
            value={formValues.shift_no}
            onChange={(e) => handleFieldChange('shift_no', e.target.value)}
            min="1"
            error={formErrors.shift_no}
          />
        </div>
        
        <div className="col-md-3">
          <UniversalOperationFormField
            type="number"
            name="osamount"
            label="O/S Amount"
            value={formValues.osamount}
            onChange={(e) => handleFieldChange('osamount', e.target.value)}
            min="1"
            error={formErrors.osamount}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SEPARATOR LINE */}
      <hr
        style={{
          borderBlockStyle: "double",
          borderBlockColor: "#850101",
          borderWidth: "5px",
        }}
      />

      {/* PRESERVED EXACT THIRD ROW: Date Send, Not Genuine Amount, Genuine Amount, Remarks */}
      <div className="row mb-3">
        <div className="col-md-3">
          <UniversalOperationFormField
            type="date"
            name="Date_send"
            label="Date of Letter Sent to OCC/RCC"
            value={formValues.Date_send}
            onChange={(e) => handleFieldChange('Date_send', e.target.value)}
            required={true}
            error={formErrors.Date_send}
          />
        </div>

        <div className="col-3">
          <UniversalOperationFormField
            type="text"
            name="notgenamount"
            label="Not Geniune Amount Paid Date vide Letter No."
            placeholder="Type of Gate"
            value={formValues.notgenamount}
            onChange={(e) => handleFieldChange('notgenamount', e.target.value)}
            error={formErrors.notgenamount}
          />
        </div>
        
        <div className="col-3">
          <UniversalOperationFormField
            type="text"
            name="genamount"
            label="Geniune Amount Paid Date vide Letter No."
            placeholder="Type of Gate"
            value={formValues.genamount}
            onChange={(e) => handleFieldChange('genamount', e.target.value)}
            error={formErrors.genamount}
          />
        </div>
        
        <div className="col-md-3">
          <UniversalOperationFormField
            type="text"
            name="gremark"
            label="Remarks Genuine not Genuiune"
            value={formValues.gremark}
            onChange={(e) => handleFieldChange('gremark', e.target.value)}
            error={formErrors.gremark}
          />
        </div>
      </div>

      {/* PRESERVED EXACT FOURTH ROW: Reason, Details Back, SC name/Emp, Remark */}
      <div className="row mb-3">
        <div className="col-md-3">
          <UniversalOperationFormField
            type="text"
            name="reason"
            label="Reason"
            value={formValues.reason}
            onChange={(e) => handleFieldChange('reason', e.target.value)}
            error={formErrors.reason}
          />
        </div>
        
        <div className="col-md-3">
          <UniversalOperationFormField
            type="text"
            name="detailback"
            label="Details Back From OCC/RCC"
            value={formValues.detailback}
            onChange={(e) => handleFieldChange('detailback', e.target.value)}
            error={formErrors.detailback}
          />
        </div>
        
        <div className="col-md-3">
          <UniversalOperationFormField
            type="text"
            name="unit"
            label="SC name/Emp. id"
            value={formValues.unit}
            onChange={(e) => handleFieldChange('unit', e.target.value)}
            error={formErrors.unit}
          />
        </div>
        
        <div className="col-md-3">
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
    </OperationFormLayout>
  );
};

export default OutstandingRecordRegisterForm;