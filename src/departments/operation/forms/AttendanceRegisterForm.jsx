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

const AttendanceRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().toISOString().substring(0, 7);

  const [formData, setFormData] = useState({
    S_No: 1,
    month: "",
    date: "",
    attendance_Register: "",
    employeeName: "",
    employeeID: "",
    attendance: "",
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
    
    if (!formData.employeeName) {
      newErrors.employeeName = "Employee name is required";
    }
    if (!formData.employeeID) {
      newErrors.employeeID = "Employee ID is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.month) {
      newErrors.month = "Month is required";
    }
    if (!formData.attendance_Register) {
      newErrors.attendance_Register = "Attendance register type is required";
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

  const attendanceOptions = [
    { value: "", label: "Select Attendance Status" },
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
    { value: "Late", label: "Late" },
    { value: "Half Day", label: "Half Day" },
    { value: "On Leave", label: "On Leave" },
    { value: "Sick Leave", label: "Sick Leave" },
    { value: "Casual Leave", label: "Casual Leave" },
    { value: "Earned Leave", label: "Earned Leave" },
    { value: "Medical Leave", label: "Medical Leave" },
    { value: "Emergency Leave", label: "Emergency Leave" }
  ];

  const attendanceRegisterOptions = [
    { value: "", label: "Select Register Type" },
    { value: "Daily Attendance", label: "Daily Attendance" },
    { value: "Shift Attendance", label: "Shift Attendance" },
    { value: "Crew Attendance", label: "Crew Attendance" },
    { value: "Operations Staff", label: "Operations Staff" },
    { value: "Maintenance Staff", label: "Maintenance Staff" },
    { value: "Safety Staff", label: "Safety Staff" }
  ];

  return (
    <OperationFormLayout 
      title="Crew Control - Attendance Register"
      description="Record daily attendance for operation department staff"
    >
      <Form onSubmit={handleSubmit}>
        {/* Register Information */}
        <div className="form-section">
          <h5 className="section-title">Register Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Attendance Register Type"
                value={formData.attendance_Register}
                onChange={(value) => handleChange("attendance_Register", value)}
                options={attendanceRegisterOptions}
                required
                error={errors.attendance_Register}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="month"
                label="Month"
                value={formData.month}
                onChange={(value) => handleChange("month", value)}
                max={currentMonth}
                required
                error={errors.month}
              />
            </Col>
          </Row>
        </div>

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
                type="date"
                label="Date"
                value={formData.date}
                onChange={(value) => handleChange("date", value)}
                max={today}
                required
                error={errors.date}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Employee ID"
                value={formData.employeeID}
                onChange={(value) => handleChange("employeeID", value)}
                required
                error={errors.employeeID}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Attendance Status"
                value={formData.attendance}
                onChange={(value) => handleChange("attendance", value)}
                options={attendanceOptions}
                helpText="Select the attendance status for the employee"
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
            helpText="Add any additional notes about the attendance"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Attendance Record
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default AttendanceRegisterForm;