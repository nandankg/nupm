import React, { useState, useEffect } from "react";
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

const CBTTrainingForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    emp_id: "",
    date: "",
    time_in: "",
    time_out: "",
    topic: "",
    Batch: "",
    remark: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = "Employee name is required";
    }
    if (!formData.emp_id) {
      newErrors.emp_id = "Employee ID is required";
    }
    if (!formData.date) {
      newErrors.date = "Training date is required";
    }
    if (!formData.topic) {
      newErrors.topic = "Training topic is required";
    }
    if (!formData.Batch) {
      newErrors.Batch = "Batch information is required";
    }
    if (formData.time_out && formData.time_in && formData.time_out <= formData.time_in) {
      newErrors.time_out = "Time Out must be later than Time In";
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

  const trainingTopicOptions = [
    { value: "", label: "Select Training Topic" },
    { value: "Safety Procedures", label: "Safety Procedures" },
    { value: "Equipment Operation", label: "Equipment Operation" },
    { value: "Emergency Response", label: "Emergency Response" },
    { value: "Signal & Communication", label: "Signal & Communication" },
    { value: "Train Operations", label: "Train Operations" },
    { value: "Maintenance Procedures", label: "Maintenance Procedures" },
    { value: "Customer Service", label: "Customer Service" },
    { value: "Quality Standards", label: "Quality Standards" },
    { value: "Regulatory Compliance", label: "Regulatory Compliance" },
    { value: "Technical Skills", label: "Technical Skills" },
    { value: "Soft Skills", label: "Soft Skills" },
    { value: "Leadership Development", label: "Leadership Development" },
    { value: "Others", label: "Others" }
  ];

  const batchTypeOptions = [
    { value: "", label: "Select Batch Type" },
    { value: "Morning Batch", label: "Morning Batch" },
    { value: "Afternoon Batch", label: "Afternoon Batch" },
    { value: "Evening Batch", label: "Evening Batch" },
    { value: "Night Batch", label: "Night Batch" },
    { value: "Weekend Batch", label: "Weekend Batch" },
    { value: "Special Batch", label: "Special Batch" },
    { value: "Refresher Batch", label: "Refresher Batch" },
    { value: "New Joinee Batch", label: "New Joinee Batch" }
  ];

  return (
    <OperationFormLayout 
      title="COET - CBT Training Register"
      description="Computer Based Training (CBT) attendance and completion tracking"
    >
      <Form onSubmit={handleSubmit}>
        {/* Trainee Information */}
        <div className="form-section">
          <h5 className="section-title">Trainee Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Employee Name"
                value={formData.name}
                onChange={(value) => handleChange("name", value)}
                required
                error={errors.name}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Employee ID"
                value={formData.emp_id}
                onChange={(value) => handleChange("emp_id", value)}
                required
                error={errors.emp_id}
              />
            </Col>
          </Row>
        </div>

        {/* Training Schedule */}
        <div className="form-section">
          <h5 className="section-title">Training Schedule</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Training Date"
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
                label="Time In"
                value={formData.time_in}
                onChange={(value) => handleChange("time_in", value)}
                helpText="Training start time"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="time"
                label="Time Out"
                value={formData.time_out}
                onChange={(value) => handleChange("time_out", value)}
                error={errors.time_out}
                helpText="Training end time"
              />
            </Col>
          </Row>
        </div>

        {/* Training Details */}
        <div className="form-section">
          <h5 className="section-title">Training Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Training Topic"
                value={formData.topic}
                onChange={(value) => handleChange("topic", value)}
                options={trainingTopicOptions}
                required
                error={errors.topic}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Batch"
                value={formData.Batch}
                onChange={(value) => handleChange("Batch", value)}
                options={batchTypeOptions}
                required
                error={errors.Batch}
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
            value={formData.remark}
            onChange={(value) => handleChange("remark", value)}
            rows={3}
            helpText="Add any additional notes about the training session"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save CBT Training Record
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default CBTTrainingForm;