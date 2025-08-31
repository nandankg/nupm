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

const CompetencyValidityForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    designation: "",
    department: "",
    competencyType: "",
    competencyLevel: "",
    issueDate: "",
    validFrom: "",
    validUpto: "",
    assessedBy: "",
    assessorId: "",
    assessmentScore: "",
    renewalRequired: "",
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
    
    if (!formData.employeeName) {
      newErrors.employeeName = "Employee name is required";
    }
    if (!formData.employeeId) {
      newErrors.employeeId = "Employee ID is required";
    }
    if (!formData.competencyType) {
      newErrors.competencyType = "Competency type is required";
    }
    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }
    if (!formData.validFrom) {
      newErrors.validFrom = "Valid from date is required";
    }
    if (!formData.validUpto) {
      newErrors.validUpto = "Valid up to date is required";
    }
    if (formData.validUpto && formData.validFrom && formData.validUpto <= formData.validFrom) {
      newErrors.validUpto = "Valid up to date must be after valid from date";
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

  const competencyTypeOptions = [
    { value: "", label: "Select Competency Type" },
    { value: "Train Operation", label: "Train Operation" },
    { value: "Signal Operation", label: "Signal Operation" },
    { value: "Safety Management", label: "Safety Management" },
    { value: "Equipment Maintenance", label: "Equipment Maintenance" },
    { value: "Emergency Response", label: "Emergency Response" },
    { value: "Customer Service", label: "Customer Service" },
    { value: "Technical Skills", label: "Technical Skills" },
    { value: "Leadership", label: "Leadership" },
    { value: "Quality Control", label: "Quality Control" },
    { value: "Others", label: "Others" }
  ];

  const competencyLevelOptions = [
    { value: "", label: "Select Competency Level" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Expert", label: "Expert" },
    { value: "Master", label: "Master" }
  ];

  const departmentOptions = [
    { value: "", label: "Select Department" },
    { value: "Operations", label: "Operations" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Safety", label: "Safety" },
    { value: "Training", label: "Training" },
    { value: "Engineering", label: "Engineering" },
    { value: "Finance", label: "Finance" },
    { value: "Administration", label: "Administration" }
  ];

  const renewalOptions = [
    { value: "", label: "Select Renewal Status" },
    { value: "Not Required", label: "Not Required" },
    { value: "Required", label: "Required" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Overdue", label: "Overdue" }
  ];

  return (
    <OperationFormLayout 
      title="Competency Validity Register"
      description="Track employee competency certifications and validity periods"
    >
      <Form onSubmit={handleSubmit}>
        {/* Employee Information */}
        <div className="form-section">
          <h5 className="section-title">Employee Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Employee Name"
                value={formData.employeeName}
                onChange={(value) => handleChange("employeeName", value)}
                required
                error={errors.employeeName}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Employee ID"
                value={formData.employeeId}
                onChange={(value) => handleChange("employeeId", value)}
                required
                error={errors.employeeId}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Designation"
                value={formData.designation}
                onChange={(value) => handleChange("designation", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Department"
                value={formData.department}
                onChange={(value) => handleChange("department", value)}
                options={departmentOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Competency Details */}
        <div className="form-section">
          <h5 className="section-title">Competency Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Competency Type"
                value={formData.competencyType}
                onChange={(value) => handleChange("competencyType", value)}
                options={competencyTypeOptions}
                required
                error={errors.competencyType}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Competency Level"
                value={formData.competencyLevel}
                onChange={(value) => handleChange("competencyLevel", value)}
                options={competencyLevelOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Assessment Score (%)"
                value={formData.assessmentScore}
                onChange={(value) => handleChange("assessmentScore", value)}
                min="0"
                max="100"
                helpText="Score obtained in competency assessment"
              />
            </Col>
          </Row>
        </div>

        {/* Validity Period */}
        <div className="form-section">
          <h5 className="section-title">Validity Period</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Issue Date"
                value={formData.issueDate}
                onChange={(value) => handleChange("issueDate", value)}
                max={today}
                required
                error={errors.issueDate}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Valid From"
                value={formData.validFrom}
                onChange={(value) => handleChange("validFrom", value)}
                min={formData.issueDate}
                required
                error={errors.validFrom}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Valid Up To"
                value={formData.validUpto}
                onChange={(value) => handleChange("validUpto", value)}
                min={formData.validFrom}
                required
                error={errors.validUpto}
              />
            </Col>
          </Row>
        </div>

        {/* Assessment Details */}
        <div className="form-section">
          <h5 className="section-title">Assessment Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Assessed By"
                value={formData.assessedBy}
                onChange={(value) => handleChange("assessedBy", value)}
                helpText="Name of the assessor/trainer"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Assessor ID"
                value={formData.assessorId}
                onChange={(value) => handleChange("assessorId", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Renewal Required"
                value={formData.renewalRequired}
                onChange={(value) => handleChange("renewalRequired", value)}
                options={renewalOptions}
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
            helpText="Additional notes about the competency certification"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Competency Record
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default CompetencyValidityForm;