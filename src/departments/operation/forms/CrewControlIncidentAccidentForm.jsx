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

const CrewControlIncidentAccidentForm = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const incident = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const basicInitialValues = {
    sno: 1,
    date: formatDate(new Date().toString),
    location: "",
    repotime: "",
    train: "",
    trainset: "",
    opname: "",
    emp_id: "",
    rectime: "",
    detension: "",
    sigofcc: "sign",
    detailincident: "",
    remark: "",
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
    
    if (!formValues.opname.trim()) {
      errors.opname = "Name of Train Operator is required";
    }
    
    if (!formValues.emp_id.trim()) {
      errors.emp_id = "Emp ID of TO is required";
    }
    
    if (!formValues.location) {
      errors.location = "Location is required";
    }
    
    if (!formValues.detailincident.trim()) {
      errors.detailincident = "Detail of Incident is required";
    }

    // Business rule validations
    if (formValues.rectime && formValues.repotime) {
      const reportTime = new Date(`1970-01-01T${formValues.repotime}`);
      const rectifyTime = new Date(`1970-01-01T${formValues.rectime}`);
      if (rectifyTime < reportTime) {
        errors.rectime = "Rectified time cannot be before report time";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    
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
    { text: "Incident/accident", to: "#" },
    { text: "List", to: "#" }
  ];

  // PRESERVED EXACT LOCATION OPTIONS - All station options preserved exactly
  const locationOptions = [
    { group: "Blue Line", color: "blue", options: [
      { value: "select", label: "Select" },
      { value: "ccsairport", label: "CCS Airport" },
      { value: "Amausi", label: "Amausi" },
      { value: "Transport Nagar", label: "Transport Nagar" },
      { value: "Krishna Nagar", label: "Krishna Nagar" },
      { value: "Singar Nagar", label: "Singar Nagar" },
      { value: "Alambagh", label: "Alambagh" },
      { value: "Alambagh ISBT", label: "Alambagh ISBT" },
      { value: "Mawaiya", label: "Mawaiya" },
      { value: "Durgapuri", label: "Durgapuri" },
      { value: "Lucknow Charbagh Railway Stn", label: "Lucknow Charbagh Railway Stn" },
    ]},
    { group: "orange Line", color: "orange", options: [
      { value: "Gautam Buddha Marg", label: "Gautam Buddha Marg" },
      { value: "Aminabad", label: "Aminabad" },
      { value: "Pandeyganj", label: "Pandeyganj" },
      { value: "Lucknow CityRly Stn", label: "Lucknow CityRly Stn" },
      { value: "Medical CollegeCrossing", label: "Medical CollegeCrossing" },
      { value: "Nawajganj", label: "Nawajganj" },
      { value: "thakurganj", label: "thakurganj" },
      { value: "Balaganj", label: "Balaganj" },
      { value: "Sarfarazganj", label: "Sarfarazganj" },
      { value: "Musabagh", label: "Musabagh" },
      { value: "VasantKunj", label: "VasantKunj" },
    ]},
    { group: "Red Line", color: "red", options: [
      { value: "Hussain Ganj", label: "Hussain Ganj" },
      { value: "Secretariat", label: "Secretariat" },
      { value: "Hazratganj", label: "Hazratganj" },
      { value: "KD Singh Stadium", label: "KD Singh Stadium" },
      { value: "Lucknow University", label: "Lucknow University" },
      { value: "IT College Jn", label: "IT College Jn" },
      { value: "BadshahNagar", label: "BadshahNagar" },
      { value: "Lekhraj", label: "Lekhraj" },
      { value: "Mahanagar", label: "Mahanagar" },
      { value: "RS MishraNagar", label: "RS MishraNagar" },
      { value: "Indira Nagar", label: "Indira Nagar" },
      { value: "Munshipulia", label: "Munshipulia" },
    ]}
  ];

  return (
    <OperationFormLayout
      title="Incident/Accident Register"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="critical"
      formId="27"
      containerWidth="95%"
    >
      {/* PRESERVED EXACT FIRST ROW: Train Operator Details */}
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="opname"
            label="Name of Train Operator"
            placeholder="Name"
            value={formValues.opname}
            onChange={(e) => handleFieldChange('opname', e.target.value)}
            required={true}
            error={formErrors.opname}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="employee"
            name="emp_id"
            label="Emp ID of TO"
            placeholder="Id"
            value={formValues.emp_id}
            onChange={(e) => handleFieldChange('emp_id', e.target.value)}
            required={true}
            error={formErrors.emp_id}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="number"
            name="trainset"
            label="Train Set"
            value={formValues.trainset}
            onChange={(e) => handleFieldChange('trainset', e.target.value)}
            min="1"
            error={formErrors.trainset}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: Train & Time Details */}
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalOperationFormField
            type="train"
            name="train"
            label="Train No."
            value={formValues.train}
            onChange={(e) => handleFieldChange('train', e.target.value)}
            error={formErrors.train}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="time"
            name="rectime"
            label="Rectified Time"
            value={formValues.rectime}
            onChange={(e) => handleFieldChange('rectime', e.target.value)}
            error={formErrors.rectime}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="time"
            name="repotime"
            label="Repot Time"
            value={formValues.repotime}
            onChange={(e) => handleFieldChange('repotime', e.target.value)}
            error={formErrors.repotime}
          />
        </div>
      </div>

      {/* PRESERVED EXACT LOCATION DROPDOWN WITH ALL OPTIONS */}
      <div className="row mb-3">
        <div className="col-md-12" style={{ marginTop: "30px" }}>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.location ? 'is-invalid' : ''}`}
              id="location"
              onChange={(e) => handleFieldChange('location', e.target.value)}
              required
              value={formValues.location}
              style={{ color: formValues.location === 'select' ? 'gray' : 'black' }}
            >
              {locationOptions.map((group, groupIndex) => (
                <optgroup key={groupIndex} label={group.group} style={{ color: group.color }}>
                  {group.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {formErrors.location && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT DETENTION, DATE, AND INCIDENT DETAILS */}
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="detension"
            label="Detention"
            value={formValues.detension}
            onChange={(e) => handleFieldChange('detension', e.target.value)}
            error={formErrors.detension}
          />
        </div>
        
        <div className="col-md-4">
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
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="detailincident"
            label="Detail of Incident"
            value={formValues.detailincident}
            onChange={(e) => handleFieldChange('detailincident', e.target.value)}
            required={true}
            error={formErrors.detailincident}
          />
        </div>
      </div>

      {/* PRESERVED EXACT REMARKS SECTION */}
      <div className="row mb-3">
        <div className="col-md-12">
          <UniversalOperationFormField
            type="text"
            name="remark"
            label="Remark by CC/CDI"
            value={formValues.remark}
            onChange={(e) => handleFieldChange('remark', e.target.value)}
            error={formErrors.remark}
          />
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default CrewControlIncidentAccidentForm;