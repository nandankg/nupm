import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { OperationFormLayout } from "../components/OperationFormLayout";
import { UniversalOperationFormField } from "../components/UniversalOperationFormField";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const CSSShiftLogBookForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    shift: "",
    section: "",
    specialInstructions: "",
    cssStaff: [{ no: 1, name: "", designation: "", empId: "" }],
    sectionStaff: [{ no: 1, name: "", designation: "", section: "", empId: "" }],
    failureRecords: [{
      no: 1,
      location: "",
      failureDetails: "",
      failureTime: "",
      rectificationTime: "",
      attendedBy: "",
      remarks: ""
    }],
    trainOperations: {
      totalTrainsScheduled: "",
      trainsRun: "",
      trainsCancelled: "",
      trainsDelayed: "",
      averageDelay: ""
    },
    shiftActivities: "",
    handedOverBy: "",
    handedOverEmpId: "",
    takenOverBy: "",
    takenOverEmpId: "",
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

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { ...defaultItem, no: prev[arrayName].length + 1 }]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.shift) {
      newErrors.shift = "Shift is required";
    }
    if (!formData.section) {
      newErrors.section = "Section is required";
    }
    if (!formData.handedOverBy) {
      newErrors.handedOverBy = "Handed over by is required";
    }
    if (!formData.takenOverBy) {
      newErrors.takenOverBy = "Taken over by is required";
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

  const shiftOptions = [
    { value: "", label: "Select Shift" },
    { value: "Day Shift (06:00-14:00)", label: "Day Shift (06:00-14:00)" },
    { value: "Evening Shift (14:00-22:00)", label: "Evening Shift (14:00-22:00)" },
    { value: "Night Shift (22:00-06:00)", label: "Night Shift (22:00-06:00)" }
  ];

  const sectionOptions = [
    { value: "", label: "Select Section" },
    { value: "Platform 1", label: "Platform 1" },
    { value: "Platform 2", label: "Platform 2" },
    { value: "Mainline", label: "Mainline" },
    { value: "Yard", label: "Yard" },
    { value: "Station Control", label: "Station Control" },
    { value: "Central Control", label: "Central Control" }
  ];

  return (
    <OperationFormLayout 
      title="CSS Shift Log Book"
      description="Control Station Supervisor shift handover and operational log"
    >
      <Form onSubmit={handleSubmit}>
        {/* Shift Details */}
        <div className="form-section">
          <h5 className="section-title">Shift Information</h5>
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
                type="select"
                label="Shift"
                value={formData.shift}
                onChange={(value) => handleChange("shift", value)}
                options={shiftOptions}
                required
                error={errors.shift}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Section"
                value={formData.section}
                onChange={(value) => handleChange("section", value)}
                options={sectionOptions}
                required
                error={errors.section}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Special Instructions"
            value={formData.specialInstructions}
            onChange={(value) => handleChange("specialInstructions", value)}
            rows={2}
            helpText="Any special instructions for the shift"
          />
        </div>

        {/* CSS Staff */}
        <div className="form-section">
          <h5 className="section-title">CSS Staff on Duty</h5>
          <Table striped bordered size="sm">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Designation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.cssStaff.map((staff, index) => (
                <tr key={index}>
                  <td>{staff.no}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={staff.name}
                      onChange={(e) => handleArrayChange("cssStaff", index, "name", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={staff.empId}
                      onChange={(e) => handleArrayChange("cssStaff", index, "empId", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={staff.designation}
                      onChange={(e) => handleArrayChange("cssStaff", index, "designation", e.target.value)}
                    />
                  </td>
                  <td>
                    <Button 
                      size="sm" 
                      variant="danger" 
                      onClick={() => removeArrayItem("cssStaff", index)}
                      disabled={formData.cssStaff.length === 1}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={() => addArrayItem("cssStaff", { no: 1, name: "", designation: "", empId: "" })}
          >
            Add Staff
          </Button>
        </div>

        {/* Train Operations Summary */}
        <div className="form-section">
          <h5 className="section-title">Train Operations Summary</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Trains Scheduled"
                value={formData.trainOperations.totalTrainsScheduled}
                onChange={(value) => handleChange("trainOperations", {
                  ...formData.trainOperations,
                  totalTrainsScheduled: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Trains Run"
                value={formData.trainOperations.trainsRun}
                onChange={(value) => handleChange("trainOperations", {
                  ...formData.trainOperations,
                  trainsRun: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Trains Cancelled"
                value={formData.trainOperations.trainsCancelled}
                onChange={(value) => handleChange("trainOperations", {
                  ...formData.trainOperations,
                  trainsCancelled: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Average Delay (minutes)"
                value={formData.trainOperations.averageDelay}
                onChange={(value) => handleChange("trainOperations", {
                  ...formData.trainOperations,
                  averageDelay: value
                })}
                min="0"
              />
            </Col>
          </Row>
        </div>

        {/* Shift Activities */}
        <div className="form-section">
          <h5 className="section-title">Shift Activities & Observations</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Major Activities & Events"
            value={formData.shiftActivities}
            onChange={(value) => handleChange("shiftActivities", value)}
            rows={4}
            helpText="Record all major activities, events, and observations during the shift"
          />
        </div>

        {/* Handover Information */}
        <div className="form-section">
          <h5 className="section-title">Shift Handover</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Handed Over By"
                value={formData.handedOverBy}
                onChange={(value) => handleChange("handedOverBy", value)}
                required
                error={errors.handedOverBy}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Handed Over By Employee ID"
                value={formData.handedOverEmpId}
                onChange={(value) => handleChange("handedOverEmpId", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Taken Over By"
                value={formData.takenOverBy}
                onChange={(value) => handleChange("takenOverBy", value)}
                required
                error={errors.takenOverBy}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Taken Over By Employee ID"
                value={formData.takenOverEmpId}
                onChange={(value) => handleChange("takenOverEmpId", value)}
              />
            </Col>
          </Row>
        </div>

        {/* Additional Remarks */}
        <div className="form-section">
          <h5 className="section-title">Additional Information</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Remarks"
            value={formData.remarks}
            onChange={(value) => handleChange("remarks", value)}
            rows={3}
            helpText="Any additional remarks or pending issues for next shift"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save CSS Shift Log
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default CSSShiftLogBookForm;