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

const ClaimRegistrationRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    claimNumber: "",
    claimantName: "",
    contactNumber: "",
    emailAddress: "",
    address: "",
    claimType: "",
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    description: "",
    witnessName: "",
    witnessContact: "",
    claimedAmount: "",
    supportingDocuments: "",
    receivedBy: "",
    receivedByEmpId: "",
    registrationDate: "",
    status: "",
    investigatingOfficer: "",
    investigationDate: "",
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.claimantName) {
      newErrors.claimantName = "Claimant name is required";
    }
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    }
    if (!formData.claimType) {
      newErrors.claimType = "Claim type is required";
    }
    if (!formData.incidentDate) {
      newErrors.incidentDate = "Incident date is required";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    if (!formData.registrationDate) {
      newErrors.registrationDate = "Registration date is required";
    }
    if (formData.claimedAmount && parseFloat(formData.claimedAmount) < 0) {
      newErrors.claimedAmount = "Claimed amount cannot be negative";
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

  const claimTypeOptions = [
    { value: "", label: "Select Claim Type" },
    { value: "Lost Property", label: "Lost Property" },
    { value: "Damaged Property", label: "Damaged Property" },
    { value: "Personal Injury", label: "Personal Injury" },
    { value: "Medical Expenses", label: "Medical Expenses" },
    { value: "Service Compensation", label: "Service Compensation" },
    { value: "Refund Request", label: "Refund Request" },
    { value: "Third Party Damage", label: "Third Party Damage" },
    { value: "Others", label: "Others" }
  ];

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "Registered", label: "Registered" },
    { value: "Under Investigation", label: "Under Investigation" },
    { value: "Pending Documentation", label: "Pending Documentation" },
    { value: "Under Review", label: "Under Review" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "Settled", label: "Settled" },
    { value: "Closed", label: "Closed" }
  ];

  // Auto-generate claim number
  React.useEffect(() => {
    if (!formData.claimNumber) {
      const timestamp = new Date().getTime().toString().slice(-6);
      const claimNum = `CLM${timestamp}`;
      setFormData(prev => ({
        ...prev,
        claimNumber: claimNum
      }));
    }
  }, []);

  return (
    <OperationFormLayout 
      title="Claim Registration Register"
      description="Register and track passenger and third-party claims"
    >
      <Form onSubmit={handleSubmit}>
        {/* Claim Registration */}
        <div className="form-section">
          <h5 className="section-title">Claim Registration</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Claim Number"
                value={formData.claimNumber}
                onChange={(value) => handleChange("claimNumber", value)}
                readOnly
                helpText="Auto-generated unique claim number"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Claim Type"
                value={formData.claimType}
                onChange={(value) => handleChange("claimType", value)}
                options={claimTypeOptions}
                required
                error={errors.claimType}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Registration Date"
                value={formData.registrationDate}
                onChange={(value) => handleChange("registrationDate", value)}
                max={today}
                required
                error={errors.registrationDate}
              />
            </Col>
          </Row>
        </div>

        {/* Claimant Information */}
        <div className="form-section">
          <h5 className="section-title">Claimant Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Claimant Name"
                value={formData.claimantName}
                onChange={(value) => handleChange("claimantName", value)}
                required
                error={errors.claimantName}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="tel"
                label="Contact Number"
                value={formData.contactNumber}
                onChange={(value) => handleChange("contactNumber", value)}
                required
                error={errors.contactNumber}
                pattern="[0-9]{10}"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="email"
                label="Email Address"
                value={formData.emailAddress}
                onChange={(value) => handleChange("emailAddress", value)}
                helpText="For correspondence"
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Address"
            value={formData.address}
            onChange={(value) => handleChange("address", value)}
            rows={2}
            helpText="Complete postal address of claimant"
          />
        </div>

        {/* Incident Details */}
        <div className="form-section">
          <h5 className="section-title">Incident Details</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Incident Date"
                value={formData.incidentDate}
                onChange={(value) => handleChange("incidentDate", value)}
                max={today}
                required
                error={errors.incidentDate}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="time"
                label="Incident Time"
                value={formData.incidentTime}
                onChange={(value) => handleChange("incidentTime", value)}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Location"
                value={formData.incidentLocation}
                onChange={(value) => handleChange("incidentLocation", value)}
                helpText="Station or specific location"
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Incident Description"
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
            rows={4}
            required
            error={errors.description}
            helpText="Detailed description of the incident"
          />
        </div>

        {/* Witness Information */}
        <div className="form-section">
          <h5 className="section-title">Witness Information (if applicable)</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Witness Name"
                value={formData.witnessName}
                onChange={(value) => handleChange("witnessName", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="tel"
                label="Witness Contact"
                value={formData.witnessContact}
                onChange={(value) => handleChange("witnessContact", value)}
                pattern="[0-9]{10}"
              />
            </Col>
          </Row>
        </div>

        {/* Claim Details */}
        <div className="form-section">
          <h5 className="section-title">Claim Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="number"
                label="Claimed Amount (₹)"
                value={formData.claimedAmount}
                onChange={(value) => handleChange("claimedAmount", value)}
                min="0"
                step="0.01"
                error={errors.claimedAmount}
                helpText="Total compensation amount claimed"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Supporting Documents"
                value={formData.supportingDocuments}
                onChange={(value) => handleChange("supportingDocuments", value)}
                helpText="List of documents submitted"
              />
            </Col>
          </Row>
        </div>

        {/* Processing Information */}
        <div className="form-section">
          <h5 className="section-title">Processing Information</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Received By"
                value={formData.receivedBy}
                onChange={(value) => handleChange("receivedBy", value)}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="employee-id"
                label="Received By Employee ID"
                value={formData.receivedByEmpId}
                onChange={(value) => handleChange("receivedByEmpId", value)}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Status"
                value={formData.status}
                onChange={(value) => handleChange("status", value)}
                options={statusOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Investigating Officer"
                value={formData.investigatingOfficer}
                onChange={(value) => handleChange("investigatingOfficer", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="date"
                label="Investigation Date"
                value={formData.investigationDate}
                onChange={(value) => handleChange("investigationDate", value)}
                min={formData.registrationDate}
                max={today}
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
            helpText="Additional notes or observations"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Register Claim
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default ClaimRegistrationRegisterForm;