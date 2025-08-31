import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm, stockMovementValidation } from "../validation/operationValidationSchemas";
import { formatDate } from "../../../data/formatDate";
import stations from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const StockMovementRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [slug, setSlug] = useState(getLastParameter().trim());
  const stockmovement = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const basicInitialValues = {
    date: "",
    idofcscissued: "",
    type: "",
    soldtick: false,
    freshtick: false,
    defectivetick: false,
    cscid: "",
    afcamt: "",
    actual: "",
    diff: "",
    remark: "",
    action: "",
    station: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  
  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations preserving business logic
    if (!formValues.station) {
      errors.station = "Station is required";
    }
    
    if (!formValues.date) {
      errors.date = "Date is required";
    }

    // Business rule validations
    if (formValues.afcamt && parseFloat(formValues.afcamt) < 0) {
      errors.afcamt = "AFC Amount cannot be negative";
    }

    if (formValues.actual && parseFloat(formValues.actual) < 0) {
      errors.actual = "Actual amount cannot be negative";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
    
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
    { text: "Stock Movement", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="Stock Movement Register"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="medium"
      formId="24"
      containerWidth="95%"
    >
      {/* PRESERVED EXACT FIRST ROW: Station, Date, ID of CSC Issued */}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="station" className="form-label">
              Station
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.station ? 'is-invalid' : ''}`}
              id="station"
              name="station"
              required
              value={formValues.station}
              onChange={handleChange}
            >
              <option value="">Select Station</option>
              {stations.map((station, index) => (
                <option key={index} value={station["STATION Code"]}>
                  {station["Station Name"] || station["STATION Code"]}
                </option>
              ))}
            </select>
            {formErrors.station && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.station}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="date"
            name="date"
            label="Date"
            value={formValues.date}
            onChange={handleChange}
            required={true}
            error={formErrors.date}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="idofcscissued"
            label="ID of CSC Issued"
            value={formValues.idofcscissued}
            onChange={handleChange}
            error={formErrors.idofcscissued}
          />
        </div>
      </div>

      {/* PRESERVED EXACT TYPE SECTION */}
      <div className="row mb-3">
        <div className="col-md-12">
          <UniversalOperationFormField
            type="text"
            name="type"
            label="Type SV-2/SV-6"
            value={formValues.type}
            onChange={handleChange}
            error={formErrors.type}
          />
        </div>
      </div>

      {/* PRESERVED EXACT CHECKBOX SECTION */}
      <div className="check-boxx col-md-12 mb-3">
        <div className="check-one" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="soldtick" className="form-label" style={{ marginRight: '8px', marginBottom: 0 }}>
              Tick if sold
            </label>
            <input
              type="checkbox"
              className="form-check-input"
              id="soldtick"
              name="soldtick"
              checked={formValues.soldtick}
              onChange={handleChange}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="freshtick" className="form-label" style={{ marginRight: '8px', marginBottom: 0 }}>
              Fresh (Tick only)
            </label>
            <input
              type="checkbox"
              className="form-check-input"
              id="freshtick"
              name="freshtick"
              checked={formValues.freshtick}
              onChange={handleChange}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="defectivetick" className="form-label" style={{ marginRight: '8px', marginBottom: 0 }}>
              Defective (Tick only)
            </label>
            <input
              type="checkbox"
              className="form-check-input"
              id="defectivetick"
              name="defectivetick"
              checked={formValues.defectivetick}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT AMOUNTS ROW: CSC ID, AFC Amt */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="cscid"
            label="CSC ID"
            value={formValues.cscid}
            onChange={handleChange}
            error={formErrors.cscid}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="number"
            name="afcamt"
            label="AFC Amt"
            value={formValues.afcamt}
            onChange={handleChange}
            step="0.01"
            min="0"
            error={formErrors.afcamt}
          />
        </div>
      </div>

      {/* PRESERVED EXACT AMOUNTS ROW: Actual, Diff */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="number"
            name="actual"
            label="Actual"
            value={formValues.actual}
            onChange={handleChange}
            step="0.01"
            min="0"
            error={formErrors.actual}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="diff"
            label="Diff(if any)"
            value={formValues.diff}
            onChange={handleChange}
            error={formErrors.diff}
          />
        </div>
      </div>

      {/* PRESERVED EXACT REMARK SECTION */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="remark"
            label="Remark"
            value={formValues.remark}
            onChange={handleChange}
            error={formErrors.remark}
          />
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default StockMovementRegisterForm;