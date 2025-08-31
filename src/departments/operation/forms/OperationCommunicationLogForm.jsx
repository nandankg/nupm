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

const OperationCommunicationLogForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    shift: "",
    section: "",
    operatorName: "",
    operatorEmpId: "",
    contactNumber: "",
    emergencyContacts: "",
    internalCommunications: [{
      time: "",
      fromStation: "",
      toStation: "",
      communicationType: "",
      operatorFrom: "",
      operatorTo: "",
      messageContent: "",
      priority: "",
      acknowledgment: "",
      actionRequired: "",
      followUp: "",
      status: ""
    }],
    externalCommunications: [{
      time: "",
      externalParty: "",
      contactPerson: "",
      communicationType: "",
      subject: "",
      messageContent: "",
      importance: "",
      responseRequired: "",
      responseReceived: "",
      followUpAction: "",
      documentReference: ""
    }],
    emergencyCommunications: [{
      time: "",
      emergencyType: "",
      location: "",
      personsInvolved: "",
      authoritiesNotified: "",
      notificationTime: "",
      responseTime: "",
      communicationChannel: "",
      escalationLevel: "",
      statusUpdates: "",
      resolution: ""
    }],
    technicalCommunications: [{
      time: "",
      equipmentSystem: "",
      faultDescription: "",
      reportedTo: "",
      acknowledgedBy: "",
      diagnosticsShared: "",
      expertConsulted: "",
      solutionProvided: "",
      implementationStatus: "",
      effectiveness: ""
    }],
    operationalInstructions: [{
      time: "",
      instructionFrom: "",
      instructionTo: "",
      instructionType: "",
      content: "",
      validity: "",
      compliance: "",
      acknowledgment: "",
      implementation: "",
      feedback: ""
    }],
    safetyAlerts: [{
      time: "",
      alertType: "",
      severity: "",
      location: "",
      description: "",
      precautions: "",
      disseminatedTo: "",
      acknowledgmentReceived: "",
      actionTaken: "",
      clearanceTime: ""
    }],
    publicAnnouncements: [{
      time: "",
      announcementType: "",
      platform: "",
      language: "",
      content: "",
      reason: "",
      duration: "",
      announcedBy: "",
      frequency: "",
      effectiveness: ""
    }],
    mediaRelations: [{
      time: "",
      mediaOutlet: "",
      journalist: "",
      subject: "",
      statementProvided: "",
      approvedBy: "",
      publicationStatus: "",
      followUpRequired: "",
      impactAssessment: ""
    }],
    systemAlerts: [{
      time: "",
      systemType: "",
      alertLevel: "",
      alertDescription: "",
      affectedOperations: "",
      technicalTeamNotified: "",
      workaroundProvided: "",
      estimatedResolution: "",
      actualResolution: "",
      rootCause: ""
    }],
    coordinationMeetings: [{
      time: "",
      meetingType: "",
      participants: "",
      agenda: "",
      keyDecisions: "",
      actionItems: "",
      responsible: "",
      deadline: "",
      followUpMeeting: "",
      documentation: ""
    }],
    communicationMetrics: {
      totalInternalMessages: "",
      totalExternalMessages: "",
      emergencyAlerts: "",
      responseTimeAverage: "",
      acknowled²mentRate: "",
      escalationsRequired: "",
      communicationFailures: "",
      systemUptime: ""
    },
    equipmentStatus: {
      radioSystems: "",
      telephoneSystems: "",
      paSystem: "",
      dataNetworks: "",
      backupSystems: "",
      maintenanceRequired: "",
      upgradesNeeded: "",
      reliabilityIndex: ""
    },
    trainingRequirements: [{
      personnelName: "",
      empId: "",
      skillGap: "",
      trainingRequired: "",
      priority: "",
      plannedDate: "",
      trainer: "",
      competencyLevel: ""
    }],
    incidentReporting: [{
      time: "",
      incidentType: "",
      communicationBreakdown: "",
      impactLevel: "",
      rootCause: "",
      correctiveAction: "",
      preventiveAction: "",
      responsiblePerson: "",
      completionStatus: ""
    }],
    qualityAssurance: {
      messageAccuracy: "",
      timeliness: "",
      completeness: "",
      professionalismRating: "",
      customerFeedback: "",
      improvementAreas: "",
      bestPractices: "",
      complianceLevel: ""
    },
    shiftHandover: {
      pendingCommunications: "",
      ongoingIssues: "",
      specialInstructions: "",
      emergencyProcedures: "",
      keyContacts: "",
      equipmentIssues: "",
      nextShiftPriorities: "",
      briefingNotes: ""
    },
    regulatoryCompliance: {
      recordKeepingCompliance: "",
      reportingRequirements: "",
      auditReadiness: "",
      documentationStatus: "",
      privacyCompliance: "",
      dataProtection: "",
      retentionPolicy: "",
      complianceGaps: ""
    },
    technologyUpgrades: "",
    communicationChallenges: "",
    improvementSuggestions: "",
    lessonsLearned: "",
    bestPracticesIdentified: "",
    systemEnhancements: "",
    operatorFeedback: "",
    managementRemarks: "",
    supervisorName: "",
    supervisorEmpId: "",
    approvalStatus: "",
    nextReviewDate: ""
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
    if (!formData.operatorName) {
      newErrors.operatorName = "Operator name is required";
    }
    if (!formData.section) {
      newErrors.section = "Section is required";
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

  const communicationTypeOptions = [
    { value: "", label: "Select Type" },
    { value: "Radio", label: "Radio" },
    { value: "Telephone", label: "Telephone" },
    { value: "Email", label: "Email" },
    { value: "SMS", label: "SMS" },
    { value: "Video Call", label: "Video Call" },
    { value: "Data Link", label: "Data Link" },
    { value: "Written Message", label: "Written Message" }
  ];

  const priorityOptions = [
    { value: "", label: "Select Priority" },
    { value: "Urgent", label: "Urgent" },
    { value: "High", label: "High" },
    { value: "Normal", label: "Normal" },
    { value: "Low", label: "Low" },
    { value: "Information", label: "Information" }
  ];

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "Sent", label: "Sent" },
    { value: "Delivered", label: "Delivered" },
    { value: "Acknowledged", label: "Acknowledged" },
    { value: "Action Taken", label: "Action Taken" },
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" }
  ];

  const emergencyTypeOptions = [
    { value: "", label: "Select Emergency Type" },
    { value: "Fire Emergency", label: "Fire Emergency" },
    { value: "Medical Emergency", label: "Medical Emergency" },
    { value: "Security Alert", label: "Security Alert" },
    { value: "Technical Failure", label: "Technical Failure" },
    { value: "Natural Disaster", label: "Natural Disaster" },
    { value: "Evacuation", label: "Evacuation" },
    { value: "Accident", label: "Accident" }
  ];

  return (
    <OperationFormLayout 
      title="Operation Communication Log"
      description="Comprehensive communication tracking and coordination system"
    >
      <Form onSubmit={handleSubmit}>
        {/* Operator Information */}
        <div className="form-section">
          <h5 className="section-title">Communication Control Information</h5>
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
                type="text"
                label="Section"
                value={formData.section}
                onChange={(value) => handleChange("section", value)}
                required
                error={errors.section}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Communication Operator"
                value={formData.operatorName}
                onChange={(value) => handleChange("operatorName", value)}
                required
                error={errors.operatorName}
              />
            </Col>
          </Row>
        </div>

        {/* Internal Communications */}
        <div className="form-section">
          <h5 className="section-title">Internal Communications</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>From Station</th>
                  <th>To Station</th>
                  <th>Type</th>
                  <th>Message Content</th>
                  <th>Priority</th>
                  <th>Acknowledgment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.internalCommunications.map((comm, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={comm.time}
                        onChange={(e) => handleArrayChange("internalCommunications", index, "time", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={comm.fromStation}
                        onChange={(e) => handleArrayChange("internalCommunications", index, "fromStation", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={comm.toStation}
                        onChange={(e) => handleArrayChange("internalCommunications", index, "toStation", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={comm.communicationType}
                        onChange={(e) => handleArrayChange("internalCommunications", index, "communicationType", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {communicationTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={comm.messageContent}
                        onChange={(e) => handleArrayChange("internalCommunications", index, "messageContent", e.target.value)}
                        rows="2"
                        style={{ width: '250px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={comm.priority}
                        onChange={(e) => handleArrayChange("internalCommunications", index, "priority", e.target.value)}
                        style={{ width: '80px' }}
                      >
                        {priorityOptions.map(option => (
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
                        value={comm.acknowledgment}
                        onChange={(e) => handleArrayChange("internalCommunications", index, "acknowledgment", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={comm.status}
                        onChange={(e) => handleArrayChange("internalCommunications", index, "status", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("internalCommunications", index)}
                        disabled={formData.internalCommunications.length === 1}
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
            onClick={() => addArrayItem("internalCommunications", {
              time: "",
              fromStation: "",
              toStation: "",
              communicationType: "",
              operatorFrom: "",
              operatorTo: "",
              messageContent: "",
              priority: "",
              acknowledgment: "",
              actionRequired: "",
              followUp: "",
              status: ""
            })}
          >
            Add Internal Communication
          </Button>
        </div>

        {/* Emergency Communications */}
        <div className="form-section">
          <h5 className="section-title">Emergency Communications</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Emergency Type</th>
                  <th>Location</th>
                  <th>Authorities Notified</th>
                  <th>Response Time</th>
                  <th>Communication Channel</th>
                  <th>Status Updates</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.emergencyCommunications.map((emergency, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={emergency.time}
                        onChange={(e) => handleArrayChange("emergencyCommunications", index, "time", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={emergency.emergencyType}
                        onChange={(e) => handleArrayChange("emergencyCommunications", index, "emergencyType", e.target.value)}
                        style={{ width: '140px' }}
                      >
                        {emergencyTypeOptions.map(option => (
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
                        value={emergency.location}
                        onChange={(e) => handleArrayChange("emergencyCommunications", index, "location", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={emergency.authoritiesNotified}
                        onChange={(e) => handleArrayChange("emergencyCommunications", index, "authoritiesNotified", e.target.value)}
                        rows="2"
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={emergency.responseTime}
                        onChange={(e) => handleArrayChange("emergencyCommunications", index, "responseTime", e.target.value)}
                        style={{ width: '80px' }}
                        placeholder="min"
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={emergency.communicationChannel}
                        onChange={(e) => handleArrayChange("emergencyCommunications", index, "communicationChannel", e.target.value)}
                        style={{ width: '120px' }}
                      >
                        {communicationTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={emergency.statusUpdates}
                        onChange={(e) => handleArrayChange("emergencyCommunications", index, "statusUpdates", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("emergencyCommunications", index)}
                        disabled={formData.emergencyCommunications.length === 1}
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
            onClick={() => addArrayItem("emergencyCommunications", {
              time: "",
              emergencyType: "",
              location: "",
              personsInvolved: "",
              authoritiesNotified: "",
              notificationTime: "",
              responseTime: "",
              communicationChannel: "",
              escalationLevel: "",
              statusUpdates: "",
              resolution: ""
            })}
          >
            Add Emergency Communication
          </Button>
        </div>

        {/* Communication Metrics */}
        <div className="form-section">
          <h5 className="section-title">Communication Performance Metrics</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Internal Messages"
                value={formData.communicationMetrics.totalInternalMessages}
                onChange={(value) => handleChange("communicationMetrics", {
                  ...formData.communicationMetrics,
                  totalInternalMessages: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Emergency Alerts"
                value={formData.communicationMetrics.emergencyAlerts}
                onChange={(value) => handleChange("communicationMetrics", {
                  ...formData.communicationMetrics,
                  emergencyAlerts: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Avg Response Time (min)"
                value={formData.communicationMetrics.responseTimeAverage}
                onChange={(value) => handleChange("communicationMetrics", {
                  ...formData.communicationMetrics,
                  responseTimeAverage: value
                })}
                min="0"
                step="0.1"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Acknowledgment Rate (%)"
                value={formData.communicationMetrics.acknowledgmentRate}
                onChange={(value) => handleChange("communicationMetrics", {
                  ...formData.communicationMetrics,
                  acknowledgmentRate: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
          </Row>
        </div>

        {/* Equipment Status */}
        <div className="form-section">
          <h5 className="section-title">Communication Equipment Status</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Radio Systems"
                value={formData.equipmentStatus.radioSystems}
                onChange={(value) => handleChange("equipmentStatus", {
                  ...formData.equipmentStatus,
                  radioSystems: value
                })}
                rows={2}
                helpText="Status and performance of radio communication systems"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Telephone Systems"
                value={formData.equipmentStatus.telephoneSystems}
                onChange={(value) => handleChange("equipmentStatus", {
                  ...formData.equipmentStatus,
                  telephoneSystems: value
                })}
                rows={2}
                helpText="Status of telephone and intercom systems"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="PA System"
                value={formData.equipmentStatus.paSystem}
                onChange={(value) => handleChange("equipmentStatus", {
                  ...formData.equipmentStatus,
                  paSystem: value
                })}
                rows={2}
                helpText="Public address system status and functionality"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Data Networks"
                value={formData.equipmentStatus.dataNetworks}
                onChange={(value) => handleChange("equipmentStatus", {
                  ...formData.equipmentStatus,
                  dataNetworks: value
                })}
                rows={2}
                helpText="Data communication network performance"
              />
            </Col>
          </Row>
        </div>

        {/* Shift Summary */}
        <div className="form-section">
          <h5 className="section-title">Communication Summary & Analysis</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Communication Challenges"
            value={formData.communicationChallenges}
            onChange={(value) => handleChange("communicationChallenges", value)}
            rows={3}
            helpText="Major communication challenges and issues encountered"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Improvement Suggestions"
            value={formData.improvementSuggestions}
            onChange={(value) => handleChange("improvementSuggestions", value)}
            rows={3}
            helpText="Suggestions for improving communication efficiency"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Operator Feedback"
            value={formData.operatorFeedback}
            onChange={(value) => handleChange("operatorFeedback", value)}
            rows={2}
            helpText="Communication operator's feedback and observations"
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
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Communication Log
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default OperationCommunicationLogForm;