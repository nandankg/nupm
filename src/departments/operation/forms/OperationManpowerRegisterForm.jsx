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

const OperationManpowerRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    shift: "",
    section: "",
    shiftIncharge: "",
    inchargeEmpId: "",
    totalManpowerRequired: "",
    totalManpowerAvailable: "",
    manpowerShortage: "",
    manpowerDetails: [{
      empId: "",
      empName: "",
      designation: "",
      category: "",
      section: "",
      shiftAssigned: "",
      actualShift: "",
      attendanceStatus: "",
      leaveType: "",
      replacement: "",
      workLocation: "",
      specialDuty: "",
      remarks: ""
    }],
    absenteeDetails: [{
      empId: "",
      empName: "",
      designation: "",
      leaveType: "",
      leaveFrom: "",
      leaveTo: "",
      replacement: "",
      approvedBy: "",
      impact: ""
    }],
    additionalDuties: [{
      empId: "",
      empName: "",
      normalDuty: "",
      additionalDuty: "",
      reason: "",
      authorizedBy: "",
      duration: "",
      overtime: ""
    }],
    trainingPersonnel: [{
      empId: "",
      empName: "",
      trainingType: "",
      trainer: "",
      duration: "",
      location: "",
      competencyLevel: "",
      certification: ""
    }],
    contractStaff: [{
      contractorName: "",
      personnelCount: "",
      workType: "",
      supervisor: "",
      location: "",
      shiftTiming: "",
      safetyBriefing: "",
      toolsIssued: ""
    }],
    manpowerUtilization: {
      platformDuty: "",
      trainOperations: "",
      maintenance: "",
      security: "",
      cleaning: "",
      supervision: "",
      emergency: "",
      training: ""
    },
    skillsMatrix: [{
      skillType: "",
      requiredPersonnel: "",
      availablePersonnel: "",
      shortage: "",
      trainingRequired: "",
      priority: ""
    }],
    shiftChangeover: {
      oncomingShiftStrength: "",
      outgoingShiftStrength: "",
      handoverIssues: "",
      briefingConducted: "",
      emergencyContacts: "",
      specialInstructions: ""
    },
    performanceMetrics: {
      punctualityRate: "",
      absenteeismRate: "",
      overtimeHours: "",
      productivityIndex: "",
      safetyIncidents: "",
      customerComplaints: ""
    },
    resourcePlanning: "",
    manpowerChallenges: "",
    recommendedActions: "",
    nextShiftRequirements: "",
    supervisorRemarks: "",
    hrCoordination: "",
    supervisorName: "",
    supervisorEmpId: "",
    hodApproval: "",
    hodEmpId: ""
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
      [arrayName]: [...prev[arrayName], defaultItem]
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
    if (!formData.shiftIncharge) {
      newErrors.shiftIncharge = "Shift in-charge is required";
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
    { value: "Morning (06:00-14:00)", label: "Morning (06:00-14:00)" },
    { value: "Evening (14:00-22:00)", label: "Evening (14:00-22:00)" },
    { value: "Night (22:00-06:00)", label: "Night (22:00-06:00)" }
  ];

  const sectionOptions = [
    { value: "", label: "Select Section" },
    { value: "Train Operations", label: "Train Operations" },
    { value: "Platform Operations", label: "Platform Operations" },
    { value: "Station Management", label: "Station Management" },
    { value: "Security", label: "Security" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Cleaning", label: "Cleaning" }
  ];

  const attendanceOptions = [
    { value: "", label: "Select Status" },
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
    { value: "Late", label: "Late" },
    { value: "Leave", label: "Leave" },
    { value: "Training", label: "Training" },
    { value: "Deputation", label: "Deputation" }
  ];

  const leaveTypeOptions = [
    { value: "", label: "Select Leave Type" },
    { value: "Casual Leave", label: "Casual Leave" },
    { value: "Medical Leave", label: "Medical Leave" },
    { value: "Earned Leave", label: "Earned Leave" },
    { value: "Emergency Leave", label: "Emergency Leave" },
    { value: "Maternity Leave", label: "Maternity Leave" },
    { value: "Study Leave", label: "Study Leave" }
  ];

  return (
    <OperationFormLayout 
      title="Operation Manpower Register"
      description="Comprehensive manpower planning and attendance management for operations"
    >
      <Form onSubmit={handleSubmit}>
        {/* Shift Information */}
        <div className="form-section">
          <h5 className="section-title">Shift Information</h5>
          <Row>
            <Col md={3}>
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
            <Col md={3}>
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
            <Col md={3}>
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
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Shift In-charge"
                value={formData.shiftIncharge}
                onChange={(value) => handleChange("shiftIncharge", value)}
                required
                error={errors.shiftIncharge}
              />
            </Col>
          </Row>
        </div>

        {/* Manpower Summary */}
        <div className="form-section">
          <h5 className="section-title">Manpower Summary</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Required"
                value={formData.totalManpowerRequired}
                onChange={(value) => handleChange("totalManpowerRequired", value)}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Available"
                value={formData.totalManpowerAvailable}
                onChange={(value) => handleChange("totalManpowerAvailable", value)}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Shortage"
                value={formData.manpowerShortage}
                onChange={(value) => handleChange("manpowerShortage", value)}
                min="0"
              />
            </Col>
          </Row>
        </div>

        {/* Manpower Details */}
        <div className="form-section">
          <h5 className="section-title">Staff Details</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Emp ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Category</th>
                  <th>Attendance</th>
                  <th>Work Location</th>
                  <th>Special Duty</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.manpowerDetails.map((staff, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={staff.empId}
                        onChange={(e) => handleArrayChange("manpowerDetails", index, "empId", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={staff.empName}
                        onChange={(e) => handleArrayChange("manpowerDetails", index, "empName", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={staff.designation}
                        onChange={(e) => handleArrayChange("manpowerDetails", index, "designation", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={staff.category}
                        onChange={(e) => handleArrayChange("manpowerDetails", index, "category", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={staff.attendanceStatus}
                        onChange={(e) => handleArrayChange("manpowerDetails", index, "attendanceStatus", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {attendanceOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={staff.workLocation}
                        onChange={(e) => handleArrayChange("manpowerDetails", index, "workLocation", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={staff.specialDuty}
                        onChange={(e) => handleArrayChange("manpowerDetails", index, "specialDuty", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={staff.remarks}
                        onChange={(e) => handleArrayChange("manpowerDetails", index, "remarks", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("manpowerDetails", index)}
                        disabled={formData.manpowerDetails.length === 1}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={() => addArrayItem("manpowerDetails", {
              empId: "",
              empName: "",
              designation: "",
              category: "",
              section: "",
              shiftAssigned: "",
              actualShift: "",
              attendanceStatus: "",
              leaveType: "",
              replacement: "",
              workLocation: "",
              specialDuty: "",
              remarks: ""
            })}
          >
            Add Staff Member
          </Button>
        </div>

        {/* Manpower Utilization */}
        <div className="form-section">
          <h5 className="section-title">Manpower Utilization</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Platform Duty"
                value={formData.manpowerUtilization.platformDuty}
                onChange={(value) => handleChange("manpowerUtilization", {
                  ...formData.manpowerUtilization,
                  platformDuty: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Train Operations"
                value={formData.manpowerUtilization.trainOperations}
                onChange={(value) => handleChange("manpowerUtilization", {
                  ...formData.manpowerUtilization,
                  trainOperations: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Maintenance"
                value={formData.manpowerUtilization.maintenance}
                onChange={(value) => handleChange("manpowerUtilization", {
                  ...formData.manpowerUtilization,
                  maintenance: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Security"
                value={formData.manpowerUtilization.security}
                onChange={(value) => handleChange("manpowerUtilization", {
                  ...formData.manpowerUtilization,
                  security: value
                })}
                min="0"
              />
            </Col>
          </Row>
        </div>

        {/* Performance Metrics */}
        <div className="form-section">
          <h5 className="section-title">Performance Metrics</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Punctuality Rate (%)"
                value={formData.performanceMetrics.punctualityRate}
                onChange={(value) => handleChange("performanceMetrics", {
                  ...formData.performanceMetrics,
                  punctualityRate: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Absenteeism Rate (%)"
                value={formData.performanceMetrics.absenteeismRate}
                onChange={(value) => handleChange("performanceMetrics", {
                  ...formData.performanceMetrics,
                  absenteeismRate: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Overtime Hours"
                value={formData.performanceMetrics.overtimeHours}
                onChange={(value) => handleChange("performanceMetrics", {
                  ...formData.performanceMetrics,
                  overtimeHours: value
                })}
                min="0"
              />
            </Col>
          </Row>
        </div>

        {/* Planning & Remarks */}
        <div className="form-section">
          <h5 className="section-title">Planning & Observations</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Resource Planning"
            value={formData.resourcePlanning}
            onChange={(value) => handleChange("resourcePlanning", value)}
            rows={2}
            helpText="Strategic manpower planning and allocation"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Manpower Challenges"
            value={formData.manpowerChallenges}
            onChange={(value) => handleChange("manpowerChallenges", value)}
            rows={2}
            helpText="Current challenges and issues"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Recommended Actions"
            value={formData.recommendedActions}
            onChange={(value) => handleChange("recommendedActions", value)}
            rows={2}
            helpText="Actions recommended for improvement"
          />
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Supervisor"
                value={formData.supervisorName}
                onChange={(value) => handleChange("supervisorName", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Supervisor Employee ID"
                value={formData.supervisorEmpId}
                onChange={(value) => handleChange("supervisorEmpId", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Supervisor Remarks"
            value={formData.supervisorRemarks}
            onChange={(value) => handleChange("supervisorRemarks", value)}
            rows={3}
            helpText="Overall assessment and recommendations"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Manpower Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default OperationManpowerRegisterForm;