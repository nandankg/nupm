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

const UnplannedTORecordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    trainNumber: "",
    location: "",
    reason: "",
    initiatedBy: "",
    initiatedByEmpId: "",
    authorizedBy: "",
    authorizedByEmpId: "",
    duration: "",
    impactOnService: "",
    correctiveAction: "",
    followUpRequired: "",
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
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.time) {
      newErrors.time = "Time is required";
    }
    if (!formData.trainNumber) {
      newErrors.trainNumber = "Train number is required";
    }
    if (!formData.location) {
      newErrors.location = "Location is required";
    }
    if (!formData.reason) {
      newErrors.reason = "Reason is required";
    }
    if (!formData.initiatedBy) {
      newErrors.initiatedBy = "Initiated by is required";
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

  const reasonOptions = [
    { value: "", label: "Select Reason" },
    { value: "Equipment Failure", label: "Equipment Failure" },
    { value: "Signal Problem", label: "Signal Problem" },
    { value: "Track Issue", label: "Track Issue" },
    { value: "Weather Conditions", label: "Weather Conditions" },
    { value: "Power Failure", label: "Power Failure" },
    { value: "Emergency Situation", label: "Emergency Situation" },
    { value: "Passenger Related", label: "Passenger Related" },
    { value: "Security Issue", label: "Security Issue" },
    { value: "Others", label: "Others" }
  ];

  const impactOptions = [
    { value: "", label: "Select Impact Level" },
    { value: "Minimal", label: "Minimal (< 5 minutes delay)" },
    { value: "Low", label: "Low (5-15 minutes delay)" },
    { value: "Medium", label: "Medium (15-30 minutes delay)" },
    { value: "High", label: "High (30-60 minutes delay)" },
    { value: "Critical", label: "Critical (> 1 hour delay)" }
  ];

  return (
    <OperationFormLayout 
      title="Crew Control - Unplanned TO Record"
      description="Record unplanned train operations and service disruptions"
    >
      <Form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h5 className="section-title">Incident Details</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Date"
                value={formData.date}
                onChange={(value) => handleChange("date", value)}
                max={today}
                required
                error={errors.date}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="time"
                label="Time"
                value={formData.time}
                onChange={(value) => handleChange("time", value)}
                required
                error={errors.time}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="train-id"
                label="Train Number"
                value={formData.trainNumber}
                onChange={(value) => handleChange("trainNumber", value)}
                required
                error={errors.trainNumber}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Location"
                value={formData.location}
                onChange={(value) => handleChange("location", value)}
                required
                error={errors.location}
                helpText="Station or kilometer post"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Reason for Unplanned TO"
                value={formData.reason}
                onChange={(value) => handleChange("reason", value)}
                options={reasonOptions}
                required
                error={errors.reason}
              />
            </Col>
          </Row>
        </div>

        {/* Personnel Information */}
        <div className="form-section">
          <h5 className="section-title">Personnel Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Initiated By"
                value={formData.initiatedBy}
                onChange={(value) => handleChange("initiatedBy", value)}
                required
                error={errors.initiatedBy}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Initiated By Employee ID"
                value={formData.initiatedByEmpId}
                onChange={(value) => handleChange("initiatedByEmpId", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Authorized By"
                value={formData.authorizedBy}
                onChange={(value) => handleChange("authorizedBy", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Authorized By Employee ID"
                value={formData.authorizedByEmpId}
                onChange={(value) => handleChange("authorizedByEmpId", value)}
              />
            </Col>
          </Row>
        </div>

        {/* Impact Assessment */}
        <div className="form-section">
          <h5 className="section-title">Impact Assessment</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="number"
                label="Duration (minutes)"
                value={formData.duration}
                onChange={(value) => handleChange("duration", value)}
                min="0"
                helpText="Total duration of the unplanned operation"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Impact on Service"
                value={formData.impactOnService}
                onChange={(value) => handleChange("impactOnService", value)}
                options={impactOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Action Taken */}
        <div className="form-section">
          <h5 className="section-title">Actions and Follow-up</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Corrective Action Taken"
            value={formData.correctiveAction}
            onChange={(value) => handleChange("correctiveAction", value)}
            rows={3}
          />
          <UniversalOperationFormField
            type="textarea"
            label="Follow-up Required"
            value={formData.followUpRequired}
            onChange={(value) => handleChange("followUpRequired", value)}
            rows={2}
          />
          <UniversalOperationFormField
            type="textarea"
            label="Remarks"
            value={formData.remarks}
            onChange={(value) => handleChange("remarks", value)}
            rows={3}
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Unplanned TO Record
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default UnplannedTORecordForm;