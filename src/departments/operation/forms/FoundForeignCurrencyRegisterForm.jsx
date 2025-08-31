import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { Form, Button, Row, Col } from "react-bootstrap";
import { OperationFormLayout } from "../components/OperationFormLayout";
import { UniversalOperationFormField } from "../components/UniversalOperationFormField";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const FoundForeignCurrencyRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    referenceNumber: "",
    foundDate: "",
    foundTime: "",
    foundLocation: "",
    foundBy: "",
    finderEmpId: "",
    finderContact: "",
    currencyType: "",
    amount: "",
    denomination: "",
    exchangeRate: "",
    inrValue: "",
    containedIn: "",
    containerDescription: "",
    condition: "",
    receivedBy: "",
    receivedByEmpId: "",
    witnessName: "",
    witnessEmpId: "",
    depositionLocation: "",
    bankDepositDate: "",
    bankDepositRef: "",
    returnDate: "",
    returnedTo: "",
    returnedToContact: "",
    identificationProof: "",
    status: "",
    remarks: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Auto-calculate INR value when amount or exchange rate changes
  React.useEffect(() => {
    if (formData.amount && formData.exchangeRate) {
      const inrValue = (parseFloat(formData.amount) * parseFloat(formData.exchangeRate)).toFixed(2);
      setFormData(prev => ({
        ...prev,
        inrValue: inrValue
      }));
    }
  }, [formData.amount, formData.exchangeRate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.foundDate) {
      newErrors.foundDate = "Found date is required";
    }
    if (!formData.foundLocation) {
      newErrors.foundLocation = "Found location is required";
    }
    if (!formData.foundBy) {
      newErrors.foundBy = "Finder name is required";
    }
    if (!formData.currencyType) {
      newErrors.currencyType = "Currency type is required";
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Valid amount is required";
    }
    if (!formData.receivedBy) {
      newErrors.receivedBy = "Received by is required";
    }
    if (!formData.witnessName) {
      newErrors.witnessName = "Witness name is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(addData({ formType: slug, values: formData })).unwrap();
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  const currencyTypeOptions = [
    { value: "", label: "Select Currency" },
    { value: "USD", label: "US Dollars (USD)" },
    { value: "EUR", label: "Euros (EUR)" },
    { value: "GBP", label: "British Pounds (GBP)" },
    { value: "JPY", label: "Japanese Yen (JPY)" },
    { value: "CAD", label: "Canadian Dollars (CAD)" },
    { value: "AUD", label: "Australian Dollars (AUD)" },
    { value: "CHF", label: "Swiss Francs (CHF)" },
    { value: "CNY", label: "Chinese Yuan (CNY)" },
    { value: "SGD", label: "Singapore Dollars (SGD)" },
    { value: "AED", label: "UAE Dirhams (AED)" },
    { value: "SAR", label: "Saudi Riyal (SAR)" },
    { value: "THB", label: "Thai Baht (THB)" },
    { value: "MYR", label: "Malaysian Ringgit (MYR)" },
    { value: "Others", label: "Others" }
  ];

  const containedInOptions = [
    { value: "", label: "Select Container" },
    { value: "Wallet", label: "Wallet" },
    { value: "Purse", label: "Purse" },
    { value: "Envelope", label: "Envelope" },
    { value: "Travel Pouch", label: "Travel Pouch" },
    { value: "Currency Bag", label: "Currency Bag" },
    { value: "Passport Holder", label: "Passport Holder" },
    { value: "Loose", label: "Loose Currency" },
    { value: "Others", label: "Others" }
  ];

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "In Custody", label: "In Custody" },
    { value: "Bank Deposited", label: "Bank Deposited" },
    { value: "RBI Deposited", label: "RBI Deposited" },
    { value: "Claimed", label: "Claimed" },
    { value: "Returned", label: "Returned" },
    { value: "Government Deposited", label: "Government Deposited" }
  ];

  // Auto-generate reference number
  React.useEffect(() => {
    if (!formData.referenceNumber) {
      const timestamp = new Date().getTime().toString().slice(-6);
      const refNum = `FFC${timestamp}`;
      setFormData(prev => ({
        ...prev,
        referenceNumber: refNum
      }));
    }
  }, []);

  return (
    <OperationFormLayout 
      title="Details Related to Found/Received Foreign Currency"
      description="Register and track found foreign currency with exchange rate conversion"
    >
      <Form onSubmit={handleSubmit}>
        {/* Registration Details */}
        <div className="form-section">
          <h5 className="section-title">Registration Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Reference Number"
                value={formData.referenceNumber}
                onChange={(value) => handleChange("referenceNumber", value)}
                readOnly
                helpText="Auto-generated unique reference"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Status"
                value={formData.status}
                onChange={(value) => handleChange("status", value)}
                options={statusOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Found Details */}
        <div className="form-section">
          <h5 className="section-title">Found Details</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Found Date"
                value={formData.foundDate}
                onChange={(value) => handleChange("foundDate", value)}
                max={today}
                required
                error={errors.foundDate}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="time"
                label="Found Time"
                value={formData.foundTime}
                onChange={(value) => handleChange("foundTime", value)}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Found Location"
                value={formData.foundLocation}
                onChange={(value) => handleChange("foundLocation", value)}
                required
                error={errors.foundLocation}
                helpText="Station, platform, specific location"
              />
            </Col>
          </Row>
        </div>

        {/* Finder Information */}
        <div className="form-section">
          <h5 className="section-title">Finder Information</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Found By"
                value={formData.foundBy}
                onChange={(value) => handleChange("foundBy", value)}
                required
                error={errors.foundBy}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="employee-id"
                label="Finder Employee ID"
                value={formData.finderEmpId}
                onChange={(value) => handleChange("finderEmpId", value)}
                helpText="Leave blank for passengers"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="tel"
                label="Finder Contact"
                value={formData.finderContact}
                onChange={(value) => handleChange("finderContact", value)}
                pattern="[0-9]{10}"
              />
            </Col>
          </Row>
        </div>

        {/* Currency Details */}
        <div className="form-section">
          <h5 className="section-title">Currency Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Currency Type"
                value={formData.currencyType}
                onChange={(value) => handleChange("currencyType", value)}
                options={currencyTypeOptions}
                required
                error={errors.currencyType}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="number"
                label="Amount"
                value={formData.amount}
                onChange={(value) => handleChange("amount", value)}
                min="0"
                step="0.01"
                required
                error={errors.amount}
                helpText="Amount in foreign currency"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Denomination"
                value={formData.denomination}
                onChange={(value) => handleChange("denomination", value)}
                helpText="Notes and coins breakdown"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Exchange Rate (₹)"
                value={formData.exchangeRate}
                onChange={(value) => handleChange("exchangeRate", value)}
                min="0"
                step="0.01"
                helpText="Rate on the found date"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="INR Equivalent"
                value={formData.inrValue}
                onChange={(value) => handleChange("inrValue", value)}
                readOnly
                helpText="Auto-calculated INR value"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Contained In"
                value={formData.containedIn}
                onChange={(value) => handleChange("containedIn", value)}
                options={containedInOptions}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Container Description"
                value={formData.containerDescription}
                onChange={(value) => handleChange("containerDescription", value)}
                helpText="Description of wallet/purse/container"
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="text"
            label="Condition"
            value={formData.condition}
            onChange={(value) => handleChange("condition", value)}
            helpText="Condition of currency and container"
          />
        </div>

        {/* Custody Information */}
        <div className="form-section">
          <h5 className="section-title">Custody Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Received By"
                value={formData.receivedBy}
                onChange={(value) => handleChange("receivedBy", value)}
                required
                error={errors.receivedBy}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Received By Employee ID"
                value={formData.receivedByEmpId}
                onChange={(value) => handleChange("receivedByEmpId", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Witness Name"
                value={formData.witnessName}
                onChange={(value) => handleChange("witnessName", value)}
                required
                error={errors.witnessName}
                helpText="Required for foreign currency handling"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Witness Employee ID"
                value={formData.witnessEmpId}
                onChange={(value) => handleChange("witnessEmpId", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="text"
            label="Deposition Location"
            value={formData.depositionLocation}
            onChange={(value) => handleChange("depositionLocation", value)}
            helpText="Safe/vault where currency is stored"
          />
        </div>

        {/* Bank/RBI Deposit Information */}
        <div className="form-section">
          <h5 className="section-title">Bank/RBI Deposit Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="date"
                label="Deposit Date"
                value={formData.bankDepositDate}
                onChange={(value) => handleChange("bankDepositDate", value)}
                min={formData.foundDate}
                max={today}
                helpText="Date deposited to authorized dealer bank"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Deposit Reference"
                value={formData.bankDepositRef}
                onChange={(value) => handleChange("bankDepositRef", value)}
                helpText="Bank/RBI receipt reference number"
              />
            </Col>
          </Row>
        </div>

        {/* Return Information */}
        <div className="form-section">
          <h5 className="section-title">Return Information (if applicable)</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="date"
                label="Return Date"
                value={formData.returnDate}
                onChange={(value) => handleChange("returnDate", value)}
                min={formData.foundDate}
                max={today}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Returned To"
                value={formData.returnedTo}
                onChange={(value) => handleChange("returnedTo", value)}
                helpText="Name of person who claimed the currency"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="tel"
                label="Claimer Contact"
                value={formData.returnedToContact}
                onChange={(value) => handleChange("returnedToContact", value)}
                pattern="[0-9]{10}"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Identification Proof"
                value={formData.identificationProof}
                onChange={(value) => handleChange("identificationProof", value)}
                helpText="Passport/visa/ID proof provided"
              />
            </Col>
          </Row>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h5 className="section-title">Additional Information</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Remarks"
            value={formData.remarks}
            onChange={(value) => handleChange("remarks", value)}
            rows={3}
            helpText="RBI guidelines followed, special procedures, exchange rate source"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Foreign Currency Record
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default FoundForeignCurrencyRegisterForm;