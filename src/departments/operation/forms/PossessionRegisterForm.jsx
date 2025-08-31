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

const PossessionRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const possessionr = useSelector((state) => state.data);

  // PRESERVED EXACT DEPARTMENT AND LOCATION ARRAYS
  const Department = [
    "Rolling Stock",
    "Signalling",
    "Telecom",
    "AFC",
    "Civil",
    "Track",
    "Traction-PSI",
    "Traction-OHE",
    "E&M",
    "Operations",
    "Security",
    "Rolling Stock/Signalling",
    "Rolling Stock/Track",
    "Telecom/Signalling",
    "E&M/Civil",
    "Rolling Stock/Operations",
    "Rolling Stock/Traction-OHE",
    "Traction-Telecom",
    "Traction- SCADA",
    "Rolling Stock/Signalling/Operations",
    "Telecom-SCADA",
    "Signalling/Traction-SCADA",
    "Rolling Stock/Telecom",
    "E&M / Telecom",
    "Civil / Telecom",
    "Signalling/P-Way",
    "Others"
  ];

  const location = [
    'CCAP',
    'AMSM',
    'TPNR',
    'KRNM',
    'SGNG',
    'ALMB',
    'ABST',
    'MWYA',
    'DGPI',
    'CHBG',
    'HSGJ',
    'SHVA',
    'HZNJ',
    'KDSS',
    'VSVM',
    'ITC',
    'BSNM',
    'LHMT',
    'BTNT',
    'IDNM',
    'MSPA',
    'OCC',
    'depot entry line',
    'depot exit line'
  ];

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const [formData, setFormData] = useState({
    date: "",
    station: "",
    locationFrom: "",
    locationTo: "",
    line: "",
    possessionGranted: "",
    empno: "",
    nameofepic: "",
    designation: "",
    noofpersons: "",
    natureOfWork: "",
    entryPoint: "",
    exitPoint: "",
    oheDead: "",
    granted: "",
    permittedUpto: "",
    cancellation: "",
    cancellation_date: "",
    oheCharged: "",
    ptwIssued: "",
    ptwCancellation: "",
    ptwCancellation_date: "",
    department: "",
    privateImposedOcc: "",
    privateImposedStation: "",
    privateCancellationOcc: "",
    privateCancellationStation: "",
    remark: "",
    sign_of_tc_acc: "",
    unit: ""
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
    
    if (!formData.possessionGranted) {
      errors.possessionGranted = "Possession Granted is required";
    }

    if (!formData.line) {
      errors.line = "Line is required";
    }

    // Business rule validations
    if (formData.empno && formData.empno < 1) {
      errors.empno = "Employee number must be positive";
    }

    if (formData.noofpersons && formData.noofpersons < 1) {
      errors.noofpersons = "Number of persons must be positive";
    }

    // Time validations
    if (formData.oheDead && formData.granted) {
      const oheTime = new Date(`1970-01-01T${formData.oheDead}`);
      const grantedTime = new Date(`1970-01-01T${formData.granted}`);
      if (grantedTime < oheTime) {
        errors.granted = "Granted time cannot be before OHE Dead time";
      }
    }

    if (formData.granted && formData.permittedUpto) {
      const grantedTime = new Date(`1970-01-01T${formData.granted}`);
      const permittedTime = new Date(`1970-01-01T${formData.permittedUpto}`);
      if (permittedTime < grantedTime) {
        errors.permittedUpto = "Permitted time cannot be before granted time";
      }
    }

    if (formData.cancellation && formData.oheCharged) {
      const cancelTime = new Date(`1970-01-01T${formData.cancellation}`);
      const chargedTime = new Date(`1970-01-01T${formData.oheCharged}`);
      if (chargedTime < cancelTime) {
        errors.oheCharged = "OHE Charged time cannot be before cancellation time";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT CHANGE HANDLER
  const handleChange = (event) => {
    const { name, value } = event.target;
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
    { text: "Possession Register", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="Possession Register"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="high"
      formId="28"
      containerWidth="95%"
    >
      {/* PRESERVED EXACT FIRST ROW: Date */}
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
      </div>

      {/* PRESERVED EXACT SECOND ROW: Possession Granted, Emp No, Line */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <div className="mb-3">
            <label htmlFor="possessionGranted" className="form-label">
              Possession Granted:
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.possessionGranted ? 'is-invalid' : ''}`}
              name="possessionGranted"
              value={formData.possessionGranted}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Department --</option>
              {Department.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {formErrors.possessionGranted && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.possessionGranted}
              </div>
            )}
          </div>
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="number"
            name="empno"
            label="Emp. No.:"
            value={formData.empno}
            onChange={handleChange}
            min="1"
            error={formErrors.empno}
          />
        </div>

        <div className='col-md-4'>
          <div className="mb-3">
            <label htmlFor="line" className="form-label">
              Line:
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.line ? 'is-invalid' : ''}`}
              name="line"
              value={formData.line}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Line --</option>
              <option value="UP">UP</option>
              <option value="DOWN">DOWN</option>
              <option value="BOTH">BOTH</option>
            </select>
            {formErrors.line && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.line}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT THIRD ROW: Name of EPIC, Designation, No. of Persons */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="nameofepic"
            label="Name of Person/ EPIC:"
            value={formData.nameofepic}
            onChange={handleChange}
            error={formErrors.nameofepic}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="designation"
            label="Designation:"
            value={formData.designation}
            onChange={handleChange}
            error={formErrors.designation}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="number"
            name="noofpersons"
            label="No. of person along with EPIC:"
            value={formData.noofpersons}
            onChange={handleChange}
            min="1"
            error={formErrors.noofpersons}
          />
        </div>
      </div>

      {/* PRESERVED EXACT FOURTH ROW: Nature of Work, Entry Point, Exit Point */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="natureOfWork"
            label="Nature of Work:"
            value={formData.natureOfWork}
            onChange={handleChange}
            error={formErrors.natureOfWork}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="entryPoint"
            label="Entry Point:"
            value={formData.entryPoint}
            onChange={handleChange}
            error={formErrors.entryPoint}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="exitPoint"
            label="Exit Point:"
            value={formData.exitPoint}
            onChange={handleChange}
            error={formErrors.exitPoint}
          />
        </div>
      </div>

      {/* PRESERVED EXACT LOCATION SECTION */}
      <div className='row mb-2'>
        <div className='col-md-12'>
          <label className="form-label">Location</label>
          <div className="row">
            <div className='col-md-4'>
              <div className="mb-3">
                <label htmlFor="locationFrom" className="form-label">Location From:</label>
                <select
                  className={`form-control ${formErrors.locationFrom ? 'is-invalid' : ''}`}
                  name="locationFrom"
                  value={formData.locationFrom}
                  onChange={handleChange}
                >
                  <option value="">--From --</option>
                  {location.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {formErrors.locationFrom && (
                  <div className="text-danger small mt-1" role="alert">
                    {formErrors.locationFrom}
                  </div>
                )}
              </div>
            </div>

            <div className='col-md-4'>
              <div className="mb-3">
                <label htmlFor="locationTo" className="form-label">Location to:</label>
                <select
                  className={`form-control ${formErrors.locationTo ? 'is-invalid' : ''}`}
                  name="locationTo"
                  value={formData.locationTo}
                  onChange={handleChange}
                >
                  <option value="">--To --</option>
                  {location.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {formErrors.locationTo && (
                  <div className="text-danger small mt-1" role="alert">
                    {formErrors.locationTo}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT TIME SECTION */}
      <div className='row mb-2'>
        <h5>Time</h5>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="time"
            name="oheDead"
            label="OHE Dead:"
            value={formData.oheDead}
            onChange={handleChange}
            error={formErrors.oheDead}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="time"
            name="granted"
            label="Granted:"
            value={formData.granted}
            onChange={handleChange}
            error={formErrors.granted}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="time"
            name="permittedUpto"
            label="Permitted Upto:"
            value={formData.permittedUpto}
            onChange={handleChange}
            error={formErrors.permittedUpto}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="time"
            name="cancellation"
            label="Cancellation:"
            value={formData.cancellation}
            onChange={handleChange}
            error={formErrors.cancellation}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="time"
            name="oheCharged"
            label="OHE Charged:"
            value={formData.oheCharged}
            onChange={handleChange}
            error={formErrors.oheCharged}
          />
        </div>
      </div>

      {/* PRESERVED EXACT PTW SECTION */}
      <div className='row mb-2'>
        <h5>PTW S. No.</h5>
        <div className='col-md-4'>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Location of PTW:</label>
            <select
              className={`form-control ${formErrors.department ? 'is-invalid' : ''}`}
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">--PTW --</option>
              {location.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            {formErrors.department && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.department}
              </div>
            )}
          </div>
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="number"
            name="ptwIssued"
            label="PTW Issued:"
            value={formData.ptwIssued}
            onChange={handleChange}
            min="1"
            error={formErrors.ptwIssued}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="number"
            name="ptwCancellation"
            label="PTW Cancellation:"
            value={formData.ptwCancellation}
            onChange={handleChange}
            min="1"
            error={formErrors.ptwCancellation}
          />
        </div>
      </div>

      {/* PRESERVED EXACT PRIVATE NUMBER EXCHANGE SECTION */}
      <div className='row mb-2'>
        <h5>Private Number Exchange</h5>
        <div className='col-md-6' style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", margin: "5px" }}>
          <h6>Imposed</h6>
          <div className="row mb-3">
            <div className='col-md-6'>
              <UniversalOperationFormField
                type="number"
                name="privateImposedOcc"
                label="OCC:"
                value={formData.privateImposedOcc}
                onChange={handleChange}
                min="0"
                error={formErrors.privateImposedOcc}
              />
            </div>

            <div className='col-md-6'>
              <UniversalOperationFormField
                type="number"
                name="privateImposedStation"
                label="Station:"
                value={formData.privateImposedStation}
                onChange={handleChange}
                min="0"
                error={formErrors.privateImposedStation}
              />
            </div>
          </div>
        </div>

        <div className='col-md-6' style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", margin: "5px" }}>
          <h6>Cancellation</h6>
          <div className="row mb-3">
            <div className='col-md-6'>
              <UniversalOperationFormField
                type="number"
                name="privateCancellationOcc"
                label="OCC:"
                value={formData.privateCancellationOcc}
                onChange={handleChange}
                min="0"
                error={formErrors.privateCancellationOcc}
              />
            </div>

            <div className='col-md-6'>
              <UniversalOperationFormField
                type="number"
                name="privateCancellationStation"
                label="Station:"
                value={formData.privateCancellationStation}
                onChange={handleChange}
                min="0"
                error={formErrors.privateCancellationStation}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT REMARK AND TC DETAILS */}
      <div className='row mb-2'>
        <div className='col-md-6'>
          <UniversalOperationFormField
            type="text"
            name="remark"
            label="Remark:"
            value={formData.remark}
            onChange={handleChange}
            error={formErrors.remark}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-6'>
          <UniversalOperationFormField
            type="text"
            name="sign_of_tc_acc"
            label="Name of TC:"
            value={formData.sign_of_tc_acc}
            onChange={handleChange}
            error={formErrors.sign_of_tc_acc}
          />
        </div>

        <div className='col-md-6'>
          <UniversalOperationFormField
            type="text"
            name="unit"
            label="EMP ID of TC:"
            value={formData.unit}
            onChange={handleChange}
            error={formErrors.unit}
          />
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default PossessionRegisterForm;