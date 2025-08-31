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

const SafetyBriefingRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    briefingType: "",
    department: "",
    briefingBy: "",
    briefingByEmpId: "",
    briefingVenue: "",
    briefingTime: "",
    duration: "",
    safetyTopics: [{
      topicNo: 1,
      topicName: "",
      description: "",
      keyPoints: "",
      riskLevel: "",
      preventiveMeasures: ""
    }],
    attendees: [{
      empId: "",
      empName: "",
      designation: "",
      department: "",
      signature: "",
      feedback: "",
      testScore: ""
    }],
    safetyIncidents: [{
      incidentType: "",
      location: "",
      description: "",
      lessonsLearned: "",
      preventiveActions: ""
    }],
    emergencyProcedures: [{
      emergencyType: "",
      procedure: "",
      responsiblePerson: "",
      contactInfo: "",
      equipmentRequired: ""
    }],
    toolboxTalk: {
      jobDescription: "",
      hazardIdentified: "",
      controlMeasures: "",
      ppeRequired: "",
      emergencyContact: ""
    },
    briefingMaterials: "",
    visualAids: "",
    practicalDemonstration: "",
    questionsRaised: "",
    clarificationsGiven: "",
    followUpActions: "",
    nextBriefingDate: "",
    briefingSummary: "",
    supervisorRemarks: "",
    supervisorName: "",
    supervisorEmpId: "",
    complianceStatus: ""
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
    if (!formData.briefingType) {
      newErrors.briefingType = "Briefing type is required";
    }
    if (!formData.briefingBy) {
      newErrors.briefingBy = "Briefing conductor is required";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
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

  const briefingTypeOptions = [
    { value: "", label: "Select Briefing Type" },
    { value: "Daily Safety Briefing", label: "Daily Safety Briefing" },
    { value: "Weekly Safety Meeting", label: "Weekly Safety Meeting" },
    { value: "Monthly Safety Review", label: "Monthly Safety Review" },
    { value: "Emergency Procedure Training", label: "Emergency Procedure Training" },
    { value: "Toolbox Talk", label: "Toolbox Talk" },
    { value: "Incident Analysis", label: "Incident Analysis" },
    { value: "New Employee Safety Orientation", label: "New Employee Safety Orientation" }
  ];

  const departmentOptions = [
    { value: "", label: "Select Department" },
    { value: "Operations", label: "Operations" },
    { value: "Rolling Stock", label: "Rolling Stock" },
    { value: "Signalling", label: "Signalling" },
    { value: "Traction", label: "Traction" },
    { value: "Civil", label: "Civil" },
    { value: "Telecom", label: "Telecom" },
    { value: "E&M", label: "E&M" },
    { value: "Security", label: "Security" }
  ];

  const riskLevelOptions = [
    { value: "", label: "Select Risk Level" },
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Critical", label: "Critical" }
  ];

  return (
    <OperationFormLayout 
      title="Safety Briefing Register"
      description="Comprehensive safety briefing and training documentation"
    >
      <Form onSubmit={handleSubmit}>
        {/* Briefing Details */}
        <div className="form-section">
          <h5 className="section-title">Briefing Information</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="date"
                label="Briefing Date"
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
                label="Briefing Type"
                value={formData.briefingType}
                onChange={(value) => handleChange("briefingType", value)}
                options={briefingTypeOptions}
                required
                error={errors.briefingType}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="select"
                label="Department"
                value={formData.department}
                onChange={(value) => handleChange("department", value)}
                options={departmentOptions}
                required
                error={errors.department}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Venue"
                value={formData.briefingVenue}
                onChange={(value) => handleChange("briefingVenue", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Briefing Conducted By"
                value={formData.briefingBy}
                onChange={(value) => handleChange("briefingBy", value)}
                required
                error={errors.briefingBy}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="employee-id"
                label="Conductor Employee ID"
                value={formData.briefingByEmpId}
                onChange={(value) => handleChange("briefingByEmpId", value)}
              />
            </Col>
            <Col md={2}>
              <UniversalOperationFormField
                type="time"
                label="Start Time"
                value={formData.briefingTime}
                onChange={(value) => handleChange("briefingTime", value)}
              />
            </Col>
            <Col md={2}>
              <UniversalOperationFormField
                type="number"
                label="Duration (min)"
                value={formData.duration}
                onChange={(value) => handleChange("duration", value)}
                min="0"
              />
            </Col>
          </Row>
        </div>

        {/* Safety Topics */}
        <div className="form-section">
          <h5 className="section-title">Safety Topics Covered</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Topic Name</th>
                  <th>Description</th>
                  <th>Key Points</th>
                  <th>Risk Level</th>
                  <th>Preventive Measures</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.safetyTopics.map((topic, index) => (
                  <tr key={index}>
                    <td>{topic.topicNo}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={topic.topicName}
                        onChange={(e) => handleArrayChange("safetyTopics", index, "topicName", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={topic.description}
                        onChange={(e) => handleArrayChange("safetyTopics", index, "description", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={topic.keyPoints}
                        onChange={(e) => handleArrayChange("safetyTopics", index, "keyPoints", e.target.value)}
                        rows="2"
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={topic.riskLevel}
                        onChange={(e) => handleArrayChange("safetyTopics", index, "riskLevel", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {riskLevelOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={topic.preventiveMeasures}
                        onChange={(e) => handleArrayChange("safetyTopics", index, "preventiveMeasures", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("safetyTopics", index)}
                        disabled={formData.safetyTopics.length === 1}
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
            onClick={() => addArrayItem("safetyTopics", {
              topicNo: formData.safetyTopics.length + 1,
              topicName: "",
              description: "",
              keyPoints: "",
              riskLevel: "",
              preventiveMeasures: ""
            })}
          >
            Add Safety Topic
          </Button>
        </div>

        {/* Attendees */}
        <div className="form-section">
          <h5 className="section-title">Attendee List</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Emp ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Test Score</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.attendees.map((attendee, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={attendee.empId}
                        onChange={(e) => handleArrayChange("attendees", index, "empId", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={attendee.empName}
                        onChange={(e) => handleArrayChange("attendees", index, "empName", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={attendee.designation}
                        onChange={(e) => handleArrayChange("attendees", index, "designation", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={attendee.department}
                        onChange={(e) => handleArrayChange("attendees", index, "department", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {departmentOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={attendee.testScore}
                        onChange={(e) => handleArrayChange("attendees", index, "testScore", e.target.value)}
                        style={{ width: '70px' }}
                        min="0"
                        max="100"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={attendee.feedback}
                        onChange={(e) => handleArrayChange("attendees", index, "feedback", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("attendees", index)}
                        disabled={formData.attendees.length === 1}
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
            onClick={() => addArrayItem("attendees", {
              empId: "",
              empName: "",
              designation: "",
              department: "",
              signature: "",
              feedback: "",
              testScore: ""
            })}
          >
            Add Attendee
          </Button>
        </div>

        {/* Toolbox Talk */}
        <div className="form-section">
          <h5 className="section-title">Toolbox Talk Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Job Description"
                value={formData.toolboxTalk.jobDescription}
                onChange={(value) => handleChange("toolboxTalk", {
                  ...formData.toolboxTalk,
                  jobDescription: value
                })}
                rows={2}
                helpText="Description of the work to be performed"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Hazards Identified"
                value={formData.toolboxTalk.hazardIdentified}
                onChange={(value) => handleChange("toolboxTalk", {
                  ...formData.toolboxTalk,
                  hazardIdentified: value
                })}
                rows={2}
                helpText="Potential hazards and risks"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Control Measures"
                value={formData.toolboxTalk.controlMeasures}
                onChange={(value) => handleChange("toolboxTalk", {
                  ...formData.toolboxTalk,
                  controlMeasures: value
                })}
                rows={2}
                helpText="Safety measures and controls"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="PPE Required"
                value={formData.toolboxTalk.ppeRequired}
                onChange={(value) => handleChange("toolboxTalk", {
                  ...formData.toolboxTalk,
                  ppeRequired: value
                })}
                helpText="Personal protective equipment needed"
              />
            </Col>
          </Row>
        </div>

        {/* Briefing Summary */}
        <div className="form-section">
          <h5 className="section-title">Briefing Summary</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Questions Raised"
            value={formData.questionsRaised}
            onChange={(value) => handleChange("questionsRaised", value)}
            rows={2}
            helpText="Questions asked by attendees"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Clarifications Given"
            value={formData.clarificationsGiven}
            onChange={(value) => handleChange("clarificationsGiven", value)}
            rows={2}
            helpText="Responses and clarifications provided"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Follow-up Actions"
            value={formData.followUpActions}
            onChange={(value) => handleChange("followUpActions", value)}
            rows={2}
            helpText="Actions to be taken after the briefing"
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
            helpText="Supervisor's observations and recommendations"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Safety Briefing Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default SafetyBriefingRegisterForm;