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

const EmergencyResponseRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    time: "",
    emergencyType: "",
    severity: "",
    location: "",
    section: "",
    reportedBy: "",
    reporterEmpId: "",
    reporterContact: "",
    incidentDescription: "",
    causativeFactors: "",
    immediateActions: [{
      time: "",
      actionTaken: "",
      takenBy: "",
      empId: "",
      effectiveness: "",
      remarks: ""
    }],
    emergencyTeam: [{
      role: "",
      personName: "",
      empId: "",
      contactNumber: "",
      arrivalTime: "",
      actionAssigned: "",
      status: ""
    }],
    resourcesDeployed: [{
      resourceType: "",
      quantity: "",
      deployedBy: "",
      location: "",
      effectiveness: "",
      returnTime: ""
    }],
    evacuationDetails: {
      evacuationRequired: "",
      evacuationTime: "",
      evacuationRoute: "",
      passengersEvacuated: "",
      evacuationCompletedBy: "",
      safetyZone: ""
    },
    communicationLog: [{
      time: "",
      communicationType: "",
      fromTo: "",
      message: "",
      responseReceived: "",
      actionRequired: ""
    }],
    externalAgencies: [{
      agencyName: "",
      contactPerson: "",
      contactNumber: "",
      timeInformed: "",
      responseTime: "",
      assistance: "",
      coordinatingOfficer: ""
    }],
    impactAssessment: {
      serviceDisruption: "",
      passengersAffected: "",
      propertyDamage: "",
      injuries: "",
      environmentalImpact: "",
      estimatedLoss: ""
    },
    mediaHandling: {
      mediaPresent: "",
      spokesperson: "",
      pressRelease: "",
      publicAnnouncements: "",
      socialMediaResponse: ""
    },
    recoveryActions: [{
      action: "",
      timeline: "",
      responsiblePerson: "",
      resources: "",
      status: "",
      completionTime: ""
    }],
    lessonsLearned: "",
    recommendedActions: "",
    preventiveMeasures: "",
    trainingRequirements: "",
    procedureUpdates: "",
    followUpActions: "",
    incidentCommander: "",
    commanderEmpId: "",
    emergencyClosed: "",
    closureTime: "",
    reportSubmittedBy: "",
    submitterEmpId: "",
    reviewedBy: "",
    reviewerEmpId: "",
    finalRemarks: ""
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
    if (!formData.time) {
      newErrors.time = "Time is required";
    }
    if (!formData.emergencyType) {
      newErrors.emergencyType = "Emergency type is required";
    }
    if (!formData.location) {
      newErrors.location = "Location is required";
    }
    if (!formData.reportedBy) {
      newErrors.reportedBy = "Reporter name is required";
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

  const emergencyTypeOptions = [
    { value: "", label: "Select Emergency Type" },
    { value: "Fire Emergency", label: "Fire Emergency" },
    { value: "Medical Emergency", label: "Medical Emergency" },
    { value: "Security Threat", label: "Security Threat" },
    { value: "Power Failure", label: "Power Failure" },
    { value: "Equipment Failure", label: "Equipment Failure" },
    { value: "Natural Disaster", label: "Natural Disaster" },
    { value: "Evacuation", label: "Evacuation" },
    { value: "Accident", label: "Accident" },
    { value: "Terrorist Activity", label: "Terrorist Activity" },
    { value: "Chemical Spill", label: "Chemical Spill" },
    { value: "Other", label: "Other" }
  ];

  const severityOptions = [
    { value: "", label: "Select Severity" },
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Critical", label: "Critical" }
  ];

  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "Incident Commander", label: "Incident Commander" },
    { value: "Safety Officer", label: "Safety Officer" },
    { value: "Medical Officer", label: "Medical Officer" },
    { value: "Fire Marshal", label: "Fire Marshal" },
    { value: "Security Head", label: "Security Head" },
    { value: "Technical Expert", label: "Technical Expert" },
    { value: "Communication Officer", label: "Communication Officer" }
  ];

  return (
    <OperationFormLayout 
      title="Emergency Response Register"
      description="Comprehensive emergency incident response and management log"
    >
      <Form onSubmit={handleSubmit}>
        {/* Emergency Details */}
        <div className="form-section">
          <h5 className="section-title">Emergency Details</h5>
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
                type="time"
                label="Time"
                value={formData.time}
                onChange={(value) => handleChange("time", value)}
                required
                error={errors.time}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="select"
                label="Emergency Type"
                value={formData.emergencyType}
                onChange={(value) => handleChange("emergencyType", value)}
                options={emergencyTypeOptions}
                required
                error={errors.emergencyType}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="select"
                label="Severity"
                value={formData.severity}
                onChange={(value) => handleChange("severity", value)}
                options={severityOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Location"
                value={formData.location}
                onChange={(value) => handleChange("location", value)}
                required
                error={errors.location}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Section"
                value={formData.section}
                onChange={(value) => handleChange("section", value)}
              />
            </Col>
          </Row>
        </div>

        {/* Reporter Information */}
        <div className="form-section">
          <h5 className="section-title">Reported By</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Reporter Name"
                value={formData.reportedBy}
                onChange={(value) => handleChange("reportedBy", value)}
                required
                error={errors.reportedBy}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="employee-id"
                label="Reporter Employee ID"
                value={formData.reporterEmpId}
                onChange={(value) => handleChange("reporterEmpId", value)}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Reporter Contact"
                value={formData.reporterContact}
                onChange={(value) => handleChange("reporterContact", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Incident Description"
            value={formData.incidentDescription}
            onChange={(value) => handleChange("incidentDescription", value)}
            rows={3}
            helpText="Detailed description of the emergency incident"
          />
        </div>

        {/* Immediate Actions */}
        <div className="form-section">
          <h5 className="section-title">Immediate Actions Taken</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Action Taken</th>
                  <th>Taken By</th>
                  <th>Emp ID</th>
                  <th>Effectiveness</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.immediateActions.map((action, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={action.time}
                        onChange={(e) => handleArrayChange("immediateActions", index, "time", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={action.actionTaken}
                        onChange={(e) => handleArrayChange("immediateActions", index, "actionTaken", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={action.takenBy}
                        onChange={(e) => handleArrayChange("immediateActions", index, "takenBy", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={action.empId}
                        onChange={(e) => handleArrayChange("immediateActions", index, "empId", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={action.effectiveness}
                        onChange={(e) => handleArrayChange("immediateActions", index, "effectiveness", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        <option value="">Select</option>
                        <option value="Effective">Effective</option>
                        <option value="Partially Effective">Partially Effective</option>
                        <option value="Not Effective">Not Effective</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={action.remarks}
                        onChange={(e) => handleArrayChange("immediateActions", index, "remarks", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("immediateActions", index)}
                        disabled={formData.immediateActions.length === 1}
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
            onClick={() => addArrayItem("immediateActions", {
              time: "",
              actionTaken: "",
              takenBy: "",
              empId: "",
              effectiveness: "",
              remarks: ""
            })}
          >
            Add Action
          </Button>
        </div>

        {/* Emergency Team */}
        <div className="form-section">
          <h5 className="section-title">Emergency Response Team</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Person Name</th>
                  <th>Emp ID</th>
                  <th>Contact</th>
                  <th>Arrival Time</th>
                  <th>Action Assigned</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.emergencyTeam.map((member, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={member.role}
                        onChange={(e) => handleArrayChange("emergencyTeam", index, "role", e.target.value)}
                        style={{ width: '150px' }}
                      >
                        {roleOptions.map(option => (
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
                        value={member.personName}
                        onChange={(e) => handleArrayChange("emergencyTeam", index, "personName", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={member.empId}
                        onChange={(e) => handleArrayChange("emergencyTeam", index, "empId", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={member.contactNumber}
                        onChange={(e) => handleArrayChange("emergencyTeam", index, "contactNumber", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={member.arrivalTime}
                        onChange={(e) => handleArrayChange("emergencyTeam", index, "arrivalTime", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={member.actionAssigned}
                        onChange={(e) => handleArrayChange("emergencyTeam", index, "actionAssigned", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={member.status}
                        onChange={(e) => handleArrayChange("emergencyTeam", index, "status", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        <option value="">Select</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Relieved">Relieved</option>
                      </select>
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("emergencyTeam", index)}
                        disabled={formData.emergencyTeam.length === 1}
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
            onClick={() => addArrayItem("emergencyTeam", {
              role: "",
              personName: "",
              empId: "",
              contactNumber: "",
              arrivalTime: "",
              actionAssigned: "",
              status: ""
            })}
          >
            Add Team Member
          </Button>
        </div>

        {/* Impact Assessment */}
        <div className="form-section">
          <h5 className="section-title">Impact Assessment</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Service Disruption"
                value={formData.impactAssessment.serviceDisruption}
                onChange={(value) => handleChange("impactAssessment", {
                  ...formData.impactAssessment,
                  serviceDisruption: value
                })}
                helpText="Duration and extent of service disruption"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="number"
                label="Passengers Affected"
                value={formData.impactAssessment.passengersAffected}
                onChange={(value) => handleChange("impactAssessment", {
                  ...formData.impactAssessment,
                  passengersAffected: value
                })}
                min="0"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Property Damage"
                value={formData.impactAssessment.propertyDamage}
                onChange={(value) => handleChange("impactAssessment", {
                  ...formData.impactAssessment,
                  propertyDamage: value
                })}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Injuries"
                value={formData.impactAssessment.injuries}
                onChange={(value) => handleChange("impactAssessment", {
                  ...formData.impactAssessment,
                  injuries: value
                })}
                min="0"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Estimated Loss"
                value={formData.impactAssessment.estimatedLoss}
                onChange={(value) => handleChange("impactAssessment", {
                  ...formData.impactAssessment,
                  estimatedLoss: value
                })}
                helpText="Financial impact estimate"
              />
            </Col>
          </Row>
        </div>

        {/* Lessons Learned & Recommendations */}
        <div className="form-section">
          <h5 className="section-title">Lessons Learned & Recommendations</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Lessons Learned"
            value={formData.lessonsLearned}
            onChange={(value) => handleChange("lessonsLearned", value)}
            rows={3}
            helpText="Key insights gained from the emergency response"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Recommended Actions"
            value={formData.recommendedActions}
            onChange={(value) => handleChange("recommendedActions", value)}
            rows={3}
            helpText="Actions recommended to prevent similar incidents"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Preventive Measures"
            value={formData.preventiveMeasures}
            onChange={(value) => handleChange("preventiveMeasures", value)}
            rows={2}
            helpText="Preventive measures to be implemented"
          />
        </div>

        {/* Closure & Review */}
        <div className="form-section">
          <h5 className="section-title">Emergency Closure & Review</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Incident Commander"
                value={formData.incidentCommander}
                onChange={(value) => handleChange("incidentCommander", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Commander Employee ID"
                value={formData.commanderEmpId}
                onChange={(value) => handleChange("commanderEmpId", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Emergency Closed"
                value={formData.emergencyClosed}
                onChange={(value) => handleChange("emergencyClosed", value)}
                options={[
                  { value: "", label: "Select Status" },
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" }
                ]}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="time"
                label="Closure Time"
                value={formData.closureTime}
                onChange={(value) => handleChange("closureTime", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Report Submitted By"
                value={formData.reportSubmittedBy}
                onChange={(value) => handleChange("reportSubmittedBy", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Reviewed By"
                value={formData.reviewedBy}
                onChange={(value) => handleChange("reviewedBy", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Final Remarks"
            value={formData.finalRemarks}
            onChange={(value) => handleChange("finalRemarks", value)}
            rows={3}
            helpText="Final observations and closing remarks"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Emergency Response Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default EmergencyResponseRegisterForm;