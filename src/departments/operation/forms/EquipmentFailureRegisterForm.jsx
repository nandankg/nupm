import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm, equipmentFailureValidation } from "../validation/operationValidationSchemas";
import stations from "../../../data/station.json";
import { formatDate, formatTime } from "../../../data/formatDate";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const EquipmentFailureRegisterForm = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const basicInitialValues = {
    failureDateTime: "",
    station: "",
    location: "",
    department: "",
    equipmentType: "",
    equipmentNo: "",
    failureDetails: "",
    reportedTo: "",
    reportedDateTime: "",
    scEmpNo: "",
    scName: "",
    actionTaken: "",
    actionDateTime: "",
    actionEmpNo: "",
    actionName: "",
    status1: "",
    closeDateTime: "",
    closeEmpNo: "",
    closeName: "",
    remarks: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  
  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations preserving business logic
    if (!formValues.failureDateTime) {
      errors.failureDateTime = "Failure Date is required";
    }
    
    if (!formValues.department) {
      errors.department = "Department is required";
    }
    
    if (!formValues.station) {
      errors.station = "Station is required";
    }
    
    if (!formValues.equipmentType.trim()) {
      errors.equipmentType = "Equipment Type is required";
    }
    
    if (!formValues.equipmentNo) {
      errors.equipmentNo = "Equipment No is required";
    }
    
    if (!formValues.failureDetails.trim()) {
      errors.failureDetails = "Nature & Details of Failure is required";
    }

    // Business rule validations
    if (formValues.closeDateTime && formValues.failureDateTime) {
      const failureDate = new Date(formValues.failureDateTime);
      const closeDate = new Date(formValues.closeDateTime);
      if (closeDate < failureDate) {
        errors.closeDateTime = "Close date cannot be before failure date";
      }
    }

    if (formValues.actionDateTime && formValues.failureDateTime) {
      const failureDate = new Date(formValues.failureDateTime);
      const actionDate = new Date(formValues.actionDateTime);
      if (actionDate < failureDate) {
        errors.actionDateTime = "Action date cannot be before failure date";
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
    { text: "Equipment Failure", to: "#" },
    { text: "Register", to: "#" }
  ];

  // Department options - PRESERVED EXACTLY
  const departmentOptions = [
    "operation",
    "operation", // Note: Original had duplicate "operation" entry for Telecom - preserving exactly
  ];
  const departmentLabels = ["Operation", "Telecom"]; // For display

  return (
    <OperationFormLayout
      title="Equipment Failure Station Register"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="high"
      formId="3"
      containerWidth="95%"
    >
      {/* PRESERVED EXACT FIRST ROW: Failure Date, Department, Station */}
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalOperationFormField
            type="date"
            name="failureDateTime"
            label="Failure Date"
            value={formValues.failureDateTime}
            onChange={(e) => handleFieldChange('failureDateTime', e.target.value)}
            required={true}
            error={formErrors.failureDateTime}
          />
        </div>
        
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.department ? 'is-invalid' : ''}`}
              id="department"
              onChange={(e) => handleFieldChange('department', e.target.value)}
              required
              value={formValues.department}
            >
              <option value="">Please Select</option>
              <option value="operation">Operation</option>
              <option value="operation">Telecom</option>
            </select>
            {formErrors.department && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.department}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="station" className="form-label">
              Station
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.station ? 'is-invalid' : ''}`}
              id="station"
              onChange={(e) => handleFieldChange('station', e.target.value)}
              required
              value={formValues.station}
            >
              <option value="">Please Select</option>
              {stations.map((station, index) =>
                station["Station Name"] && (
                  <option key={index} value={station["STATION Code"]}>
                    {station["Station Name"]}
                  </option>
                )
              )}
            </select>
            {formErrors.station && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.station}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: Location, Equipment Type, Equipment No */}
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="location"
            label="Location"
            value={formValues.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            error={formErrors.location}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="equipmentType"
            label="Equipment Type"
            value={formValues.equipmentType}
            onChange={(e) => handleFieldChange('equipmentType', e.target.value)}
            required={true}
            error={formErrors.equipmentType}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="number"
            name="equipmentNo"
            label="Equipment No."
            value={formValues.equipmentNo}
            onChange={(e) => handleFieldChange('equipmentNo', e.target.value)}
            min="1"
            required={true}
            error={formErrors.equipmentNo}
          />
        </div>
      </div>

      {/* PRESERVED EXACT THIRD ROW: Failure Details, Reported To, Reported Time */}
      <div className="row mb-3">
        <div className="col-md-12">
          <UniversalOperationFormField
            type="text"
            name="failureDetails"
            label="Nature & Details of Failure"
            value={formValues.failureDetails}
            onChange={(e) => handleFieldChange('failureDetails', e.target.value)}
            required={true}
            error={formErrors.failureDetails}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="reportedTo"
            label="Reported To"
            value={formValues.reportedTo}
            onChange={(e) => handleFieldChange('reportedTo', e.target.value)}
            error={formErrors.reportedTo}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="time"
            name="reportedDateTime"
            label="Reported Time"
            value={formValues.reportedDateTime}
            onChange={(e) => handleFieldChange('reportedDateTime', e.target.value)}
            error={formErrors.reportedDateTime}
          />
        </div>
      </div>

      {/* PRESERVED EXACT FOURTH ROW: SC Employee Details */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="employee"
            name="scEmpNo"
            label="SC Emp. No"
            value={formValues.scEmpNo}
            onChange={(e) => handleFieldChange('scEmpNo', e.target.value)}
            error={formErrors.scEmpNo}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="scName"
            label="SC Name"
            value={formValues.scName}
            onChange={(e) => handleFieldChange('scName', e.target.value)}
            error={formErrors.scName}
          />
        </div>
      </div>

      {/* PRESERVED EXACT ACTION TAKEN SECTION */}
      <div className="row mb-3">
        <h4>Action Taken:</h4>
        <div className="col-md-6">
          <UniversalOperationFormField
            type="date"
            name="actionDateTime"
            label="Date"
            value={formValues.actionDateTime}
            onChange={(e) => handleFieldChange('actionDateTime', e.target.value)}
            error={formErrors.actionDateTime}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="actionName"
            label="Concern Employee Name"
            value={formValues.actionName}
            onChange={(e) => handleFieldChange('actionName', e.target.value)}
            error={formErrors.actionName}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="employee"
            name="actionEmpNo"
            label="Concern Employee Id"
            value={formValues.actionEmpNo}
            onChange={(e) => handleFieldChange('actionEmpNo', e.target.value)}
            error={formErrors.actionEmpNo}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="status1"
            label="Status"
            value={formValues.status1}
            onChange={(e) => handleFieldChange('status1', e.target.value)}
            error={formErrors.status1}
          />
        </div>
      </div>

      {/* PRESERVED EXACT CLOSE SECTION */}
      <div className="row mb-3">
        <h4>Close</h4>
        <div className="col-md-4">
          <UniversalOperationFormField
            type="date"
            name="closeDateTime"
            label="Date"
            value={formValues.closeDateTime}
            onChange={(e) => handleFieldChange('closeDateTime', e.target.value)}
            error={formErrors.closeDateTime}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="closeName"
            label="Employee Name"
            value={formValues.closeName}
            onChange={(e) => handleFieldChange('closeName', e.target.value)}
            error={formErrors.closeName}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="employee"
            name="closeEmpNo"
            label="Employee ID"
            value={formValues.closeEmpNo}
            onChange={(e) => handleFieldChange('closeEmpNo', e.target.value)}
            error={formErrors.closeEmpNo}
          />
        </div>
      </div>

      {/* PRESERVED EXACT REMARKS SECTION */}
      <div className="row mb-3">
        <div className="col-md-12">
          <UniversalOperationFormField
            type="text"
            name="remarks"
            label="Remarks"
            value={formValues.remarks}
            onChange={(e) => handleFieldChange('remarks', e.target.value)}
            error={formErrors.remarks}
          />
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default EquipmentFailureRegisterForm;