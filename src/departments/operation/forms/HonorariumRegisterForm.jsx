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

const HonorariumRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    recipientName: "",
    employeeId: "",
    designation: "",
    department: "",
    trainingProgram: "",
    role: "",
    activityDate: "",
    duration: "",
    honorariumAmount: "",
    paymentMode: "",
    accountNumber: "",
    approvedBy: "",
    approverEmpId: "",
    paymentDate: "",
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
    
    if (!formData.recipientName) {
      newErrors.recipientName = "Recipient name is required";
    }
    if (!formData.employeeId) {
      newErrors.employeeId = "Employee ID is required";
    }
    if (!formData.trainingProgram) {
      newErrors.trainingProgram = "Training program is required";
    }
    if (!formData.role) {
      newErrors.role = "Role is required";
    }
    if (!formData.activityDate) {
      newErrors.activityDate = "Activity date is required";
    }
    if (!formData.honorariumAmount || parseFloat(formData.honorariumAmount) <= 0) {
      newErrors.honorariumAmount = "Valid honorarium amount is required";
    }
    if (!formData.approvedBy) {
      newErrors.approvedBy = "Approver name is required";
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

  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "Trainer/Faculty", label: "Trainer/Faculty" },
    { value: "Guest Speaker", label: "Guest Speaker" },
    { value: "Subject Matter Expert", label: "Subject Matter Expert" },
    { value: "External Consultant", label: "External Consultant" },
    { value: "Workshop Facilitator", label: "Workshop Facilitator" },
    { value: "Assessment Evaluator", label: "Assessment Evaluator" },
    { value: "Training Coordinator", label: "Training Coordinator" },
    { value: "Others", label: "Others" }
  ];

  const paymentModeOptions = [
    { value: "", label: "Select Payment Mode" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Cheque", label: "Cheque" },
    { value: "Cash", label: "Cash" },
    { value: "UPI", label: "UPI" },
    { value: "NEFT", label: "NEFT" },
    { value: "RTGS", label: "RTGS" }
  ];

  const departmentOptions = [
    { value: "", label: "Select Department" },
    { value: "Operations", label: "Operations" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Safety", label: "Safety" },
    { value: "Training (COET)", label: "Training (COET)" },
    { value: "Engineering", label: "Engineering" },
    { value: "Finance", label: "Finance" },
    { value: "Administration", label: "Administration" },
    { value: "External", label: "External" }
  ];

  return (
    <OperationFormLayout 
      title="COET - Honorarium Register"
      description="Track honorarium payments for training activities and guest lectures"
    >
      <Form onSubmit={handleSubmit}>
        {/* Recipient Information */}
        <div className="form-section">
          <h5 className="section-title">Recipient Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Recipient Name"
                value={formData.recipientName}
                onChange={(value) => handleChange("recipientName", value)}
                required
                error={errors.recipientName}
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
                helpText="Leave blank for external recipients"
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

        {/* Training Activity Details */}
        <div className="form-section">
          <h5 className="section-title">Training Activity Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Training Program"
                value={formData.trainingProgram}
                onChange={(value) => handleChange("trainingProgram", value)}
                required
                error={errors.trainingProgram}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Role/Capacity"
                value={formData.role}
                onChange={(value) => handleChange("role", value)}
                options={roleOptions}
                required
                error={errors.role}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="date"
                label="Activity Date"
                value={formData.activityDate}
                onChange={(value) => handleChange("activityDate", value)}
                max={today}
                required
                error={errors.activityDate}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="number"
                label="Duration (hours)"
                value={formData.duration}
                onChange={(value) => handleChange("duration", value)}
                min="0.5"
                step="0.5"
                helpText="Duration of training activity"
              />
            </Col>
          </Row>
        </div>

        {/* Payment Details */}
        <div className="form-section">
          <h5 className="section-title">Payment Details</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Honorarium Amount (₹)"
                value={formData.honorariumAmount}
                onChange={(value) => handleChange("honorariumAmount", value)}
                min="0"
                step="0.01"
                required
                error={errors.honorariumAmount}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Payment Mode"
                value={formData.paymentMode}
                onChange={(value) => handleChange("paymentMode", value)}
                options={paymentModeOptions}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Payment Date"
                value={formData.paymentDate}
                onChange={(value) => handleChange("paymentDate", value)}
                max={today}
                helpText="Actual payment date"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Account Number"
                value={formData.accountNumber}
                onChange={(value) => handleChange("accountNumber", value)}
                helpText="For bank transfers"
              />
            </Col>
          </Row>
        </div>

        {/* Approval Details */}
        <div className="form-section">
          <h5 className="section-title">Approval Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Approved By"
                value={formData.approvedBy}
                onChange={(value) => handleChange("approvedBy", value)}
                required
                error={errors.approvedBy}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Approver Employee ID"
                value={formData.approverEmpId}
                onChange={(value) => handleChange("approverEmpId", value)}
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
            helpText="Additional notes about the honorarium payment"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Honorarium Record
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default HonorariumRegisterForm;