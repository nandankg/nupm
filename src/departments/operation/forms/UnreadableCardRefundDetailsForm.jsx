import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm, stockMovementValidation } from "../validation/operationValidationSchemas";
import { formatDate, formatTime } from "../../../data/formatDate";
import station from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const UnreadableCardRefundDetailsForm = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const [formData, setFormData] = useState({
    srNo: '',
    station: '',
    dateOfReceipt: '',
    receiptMemoNo: '',
    cscEngraveID: '',
    physicalCondition: '',
    passengerName: '',
    contactNo: '',
    scEmpName: '',
    sentDetailsDate: '',
    sentToRCC: '',
    scEmpSentToRCC: '',
    receivedDetailsDate: '',
    receivedFromRCC: '',
    scEmpReceivedFromRCC: '',
    typeOfSecurity: '',
    refundable: '',
    balance: '',
    totalAmount: '',
    refundMemoNo: '',
    refundedOnDate: '',
    amountRefunded: '',
  });

  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formData.station) {
      errors.station = "Station is required";
    }
    
    if (!formData.srNo) {
      errors.srNo = "Sr. No. is required";
    }

    // Business rule validations
    if (formData.contactNo && !/^\d{10}$/.test(formData.contactNo)) {
      errors.contactNo = "Contact number must be 10 digits";
    }

    if (formData.balance && parseFloat(formData.balance) < 0) {
      errors.balance = "Balance cannot be negative";
    }

    if (formData.totalAmount && parseFloat(formData.totalAmount) < 0) {
      errors.totalAmount = "Total amount cannot be negative";
    }

    if (formData.amountRefunded && parseFloat(formData.amountRefunded) < 0) {
      errors.amountRefunded = "Amount refunded cannot be negative";
    }

    // Date validations
    if (formData.refundedOnDate && formData.dateOfReceipt) {
      const receiptDate = new Date(formData.dateOfReceipt);
      const refundDate = new Date(formData.refundedOnDate);
      if (refundDate < receiptDate) {
        errors.refundedOnDate = "Refund date cannot be before receipt date";
      }
    }

    if (formData.receivedDetailsDate && formData.sentDetailsDate) {
      const sentDate = new Date(formData.sentDetailsDate);
      const receivedDate = new Date(formData.receivedDetailsDate);
      if (receivedDate < sentDate) {
        errors.receivedDetailsDate = "Received date cannot be before sent date";
      }
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
    { text: "Unreadable Card Refund", to: "#" },
    { text: "Details", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="UnreadableCardRefundForm"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="medium"
      formId="26"
      containerWidth="95%"
    >
      {/* PRESERVED EXACT FIRST ROW: Sr. No., Station, Date of Receipt */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="number"
            name="srNo"
            label="Sr. No.:"
            value={formData.srNo}
            onChange={handleChange}
            min="1"
            required={true}
            error={formErrors.srNo}
          />
        </div>

        <div className='col-md-4'>
          <div className="mb-3">
            <label htmlFor="station" className="form-label">
              Station:
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.station ? 'is-invalid' : ''}`}
              name="station"
              onChange={handleChange}
              required
              value={formData.station}
            >
              <option value="">Select a Station</option>
              {station.map((stn, index) => (
                <option key={index} value={stn["Station Name"]}>
                  {stn["Station Name"]}
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

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="date"
            name="dateOfReceipt"
            label="Date of Receipt:"
            value={formData.dateOfReceipt}
            onChange={handleChange}
            error={formErrors.dateOfReceipt}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: URC receipt no, CSC Engrave ID, Physical Condition */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="receiptMemoNo"
            label="URC receipt no:"
            value={formData.receiptMemoNo}
            onChange={handleChange}
            error={formErrors.receiptMemoNo}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="cscEngraveID"
            label="CSC Engrave ID:"
            value={formData.cscEngraveID}
            onChange={handleChange}
            error={formErrors.cscEngraveID}
          />
        </div>

        <div className='col-md-4'>
          <div className="mb-3">
            <label htmlFor="physicalCondition" className="form-label">Physical Condition:</label>
            <select
              className={`form-control ${formErrors.physicalCondition ? 'is-invalid' : ''}`}
              name="physicalCondition"
              value={formData.physicalCondition}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Damage">Damage</option>
              <option value="Ok">Ok</option>
            </select>
            {formErrors.physicalCondition && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.physicalCondition}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT THIRD ROW: Passenger Name, Contact No., SC Emp Name */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="passengerName"
            label="Passenger Name:"
            value={formData.passengerName}
            onChange={handleChange}
            error={formErrors.passengerName}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="contactNo"
            label="Contact No.:"
            value={formData.contactNo}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength="10"
            error={formErrors.contactNo}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="scEmpName"
            label="SC Emp Name:"
            value={formData.scEmpName}
            onChange={handleChange}
            error={formErrors.scEmpName}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SEND DETAIL SECTION */}
      <h5>SEND DETAIL</h5>
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="date"
            name="sentDetailsDate"
            label="Sent Details Date:"
            value={formData.sentDetailsDate}
            onChange={handleChange}
            error={formErrors.sentDetailsDate}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="sentToRCC"
            label="Sent to RCC:"
            value={formData.sentToRCC}
            onChange={handleChange}
            error={formErrors.sentToRCC}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="scEmpSentToRCC"
            label="SC Emp Sent to RCC:"
            value={formData.scEmpSentToRCC}
            onChange={handleChange}
            error={formErrors.scEmpSentToRCC}
          />
        </div>
      </div>

      {/* PRESERVED EXACT RECEIVED DETAIL SECTION */}
      <h5>Received DETAIL</h5>
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="date"
            name="receivedDetailsDate"
            label="Received Details Date:"
            value={formData.receivedDetailsDate}
            onChange={handleChange}
            error={formErrors.receivedDetailsDate}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="receivedFromRCC"
            label="Received from RCC:"
            value={formData.receivedFromRCC}
            onChange={handleChange}
            error={formErrors.receivedFromRCC}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="scEmpReceivedFromRCC"
            label="SC Emp Received from RCC:"
            value={formData.scEmpReceivedFromRCC}
            onChange={handleChange}
            error={formErrors.scEmpReceivedFromRCC}
          />
        </div>
      </div>

      {/* PRESERVED EXACT FINANCIAL DETAILS ROW */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="typeOfSecurity"
            label="Type of card:"
            value={formData.typeOfSecurity}
            onChange={handleChange}
            error={formErrors.typeOfSecurity}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="refundable"
            label="Refundable security :"
            value={formData.refundable}
            onChange={handleChange}
            error={formErrors.refundable}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="number"
            name="balance"
            label="Balance:"
            value={formData.balance}
            onChange={handleChange}
            min="0"
            step="0.01"
            error={formErrors.balance}
          />
        </div>
      </div>

      {/* PRESERVED EXACT REFUND DETAILS ROW */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="number"
            name="totalAmount"
            label="Total Amount:"
            value={formData.totalAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
            error={formErrors.totalAmount}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="refundMemoNo"
            label="Refund Memo No.:"
            value={formData.refundMemoNo}
            onChange={handleChange}
            error={formErrors.refundMemoNo}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="date"
            name="refundedOnDate"
            label="Refunded On Date:"
            value={formData.refundedOnDate}
            onChange={handleChange}
            error={formErrors.refundedOnDate}
          />
        </div>
      </div>

      {/* PRESERVED EXACT AMOUNT REFUNDED ROW */}
      <div className='row mb-2'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="number"
            name="amountRefunded"
            label="Amount Refunded:"
            value={formData.amountRefunded}
            onChange={handleChange}
            min="0"
            step="0.01"
            error={formErrors.amountRefunded}
          />
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default UnreadableCardRefundDetailsForm;