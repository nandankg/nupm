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

const FoundArticlesRegisterForm = () => {
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
    articleType: "",
    articleDescription: "",
    brand: "",
    model: "",
    color: "",
    condition: "",
    estimatedValue: "",
    receivedBy: "",
    receivedByEmpId: "",
    storageLocation: "",
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
    if (!formData.articleType) {
      newErrors.articleType = "Article type is required";
    }
    if (!formData.articleDescription) {
      newErrors.articleDescription = "Article description is required";
    }
    if (!formData.receivedBy) {
      newErrors.receivedBy = "Received by is required";
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

  const articleTypeOptions = [
    { value: "", label: "Select Article Type" },
    { value: "Mobile Phone", label: "Mobile Phone" },
    { value: "Wallet/Purse", label: "Wallet/Purse" },
    { value: "Bag/Luggage", label: "Bag/Luggage" },
    { value: "Documents", label: "Documents" },
    { value: "Keys", label: "Keys" },
    { value: "Jewelry", label: "Jewelry" },
    { value: "Electronics", label: "Electronics" },
    { value: "Clothing", label: "Clothing" },
    { value: "Books/Stationery", label: "Books/Stationery" },
    { value: "Umbrella", label: "Umbrella" },
    { value: "Glasses/Spectacles", label: "Glasses/Spectacles" },
    { value: "Others", label: "Others" }
  ];

  const conditionOptions = [
    { value: "", label: "Select Condition" },
    { value: "Excellent", label: "Excellent" },
    { value: "Good", label: "Good" },
    { value: "Fair", label: "Fair" },
    { value: "Poor", label: "Poor" },
    { value: "Damaged", label: "Damaged" }
  ];

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "In Custody", label: "In Custody" },
    { value: "Claimed", label: "Claimed" },
    { value: "Returned", label: "Returned" },
    { value: "Disposed", label: "Disposed" },
    { value: "Donated", label: "Donated" }
  ];

  // Auto-generate reference number
  React.useEffect(() => {
    if (!formData.referenceNumber) {
      const timestamp = new Date().getTime().toString().slice(-6);
      const refNum = `FA${timestamp}`;
      setFormData(prev => ({
        ...prev,
        referenceNumber: refNum
      }));
    }
  }, []);

  return (
    <OperationFormLayout 
      title="Details Related to Found/Received Articles"
      description="Register and track found articles in metro system"
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
                helpText="Station, platform, coach number etc."
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
                helpText="Contact number if passenger"
              />
            </Col>
          </Row>
        </div>

        {/* Article Details */}
        <div className="form-section">
          <h5 className="section-title">Article Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Article Type"
                value={formData.articleType}
                onChange={(value) => handleChange("articleType", value)}
                options={articleTypeOptions}
                required
                error={errors.articleType}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Condition"
                value={formData.condition}
                onChange={(value) => handleChange("condition", value)}
                options={conditionOptions}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Detailed Description"
            value={formData.articleDescription}
            onChange={(value) => handleChange("articleDescription", value)}
            rows={3}
            required
            error={errors.articleDescription}
            helpText="Detailed description including size, color, distinctive features"
          />
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Brand"
                value={formData.brand}
                onChange={(value) => handleChange("brand", value)}
                helpText="Brand name if applicable"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Model"
                value={formData.model}
                onChange={(value) => handleChange("model", value)}
                helpText="Model number/name if applicable"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Color"
                value={formData.color}
                onChange={(value) => handleChange("color", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="number"
                label="Estimated Value (₹)"
                value={formData.estimatedValue}
                onChange={(value) => handleChange("estimatedValue", value)}
                min="0"
                step="0.01"
                helpText="Approximate value for insurance purposes"
              />
            </Col>
          </Row>
        </div>

        {/* Custody Information */}
        <div className="form-section">
          <h5 className="section-title">Custody Information</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Received By"
                value={formData.receivedBy}
                onChange={(value) => handleChange("receivedBy", value)}
                required
                error={errors.receivedBy}
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
                type="text"
                label="Storage Location"
                value={formData.storageLocation}
                onChange={(value) => handleChange("storageLocation", value)}
                helpText="Where the article is stored"
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
                helpText="Name of person who claimed the article"
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
                helpText="ID proof provided by claimer"
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
            helpText="Any additional observations or notes"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Found Article Record
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default FoundArticlesRegisterForm;