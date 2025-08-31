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

const IncidentInvestigationRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    incidentNumber: "",
    incidentDate: "",
    incidentTime: "",
    reportedDate: "",
    reportedBy: "",
    reporterEmpId: "",
    incidentType: "",
    severity: "",
    location: "",
    section: "",
    description: "",
    immediateActions: "",
    investigationTeam: [{
      role: "",
      memberName: "",
      empId: "",
      department: "",
      expertise: "",
      contactNumber: "",
      assigned: "",
      responsibility: ""
    }],
    witnessStatements: [{
      witnessName: "",
      empId: "",
      department: "",
      contactNumber: "",
      statement: "",
      recordedBy: "",
      recordedDate: "",
      signature: ""
    }],
    evidenceCollection: [{
      evidenceType: "",
      description: "",
      collectedBy: "",
      collectedDate: "",
      storageLocation: "",
      condition: "",
      relevance: "",
      photographed: ""
    }],
    technicalAnalysis: {
      equipmentInvolved: "",
      equipmentCondition: "",
      maintenanceHistory: "",
      operatingParameters: "",
      systemLogs: "",
      failureModes: "",
      technicalFindings: "",
      expertConsulted: ""
    },
    humanFactorsAnalysis: {
      personnelInvolved: "",
      trainingStatus: "",
      competencyLevel: "",
      proceduresFollowed: "",
      communicationIssues: "",
      workload: "",
      fatigueFactors: "",
      behavioralFactors: ""
    },
    environmentalFactors: {
      weatherConditions: "",
      visibility: "",
      lighting: "",
      noiseLevel: "",
      workspaceConditions: "",
      hazardousSubstances: "",
      emergencyEquipment: "",
      safetyBarriers: ""
    },
    rootCauseAnalysis: [{
      causeCategory: "",
      primaryCause: "",
      contributingFactors: "",
      analysis: "",
      evidenceSupporting: "",
      likelihood: "",
      impact: "",
      preventability: ""
    }],
    timeline: [{
      time: "",
      event: "",
      source: "",
      verifiedBy: "",
      significance: "",
      accuracy: ""
    }],
    regulatoryCompliance: {
      applicableRegulations: "",
      complianceStatus: "",
      violations: "",
      reportingRequirements: "",
      authoritiesNotified: "",
      inspectionRequired: "",
      penalties: "",
      auditFindings: ""
    },
    correctiveActions: [{
      actionType: "",
      actionDescription: "",
      responsiblePerson: "",
      targetDate: "",
      status: "",
      effectiveness: "",
      verificationMethod: "",
      resources: ""
    }],
    preventiveActions: [{
      actionType: "",
      actionDescription: "",
      responsiblePerson: "",
      implementationDate: "",
      monitoringPlan: "",
      success: "",
      systemicImprovement: "",
      costBenefit: ""
    }],
    riskAssessment: {
      riskMatrix: "",
      probabilityRating: "",
      consequenceRating: "",
      riskLevel: "",
      tolerability: "",
      mitigationRequired: "",
      residualRisk: "",
      acceptanceCriteria: ""
    },
    communicationPlan: {
      internalCommunication: "",
      externalCommunication: "",
      mediaStrategy: "",
      stakeholderNotification: "",
      publicStatement: "",
      regulatoryReporting: "",
      lessonsSharing: "",
      trainingUpdates: ""
    },
    investigationFindings: "",
    conclusions: "",
    recommendations: "",
    lessonsLearned: "",
    systemicImprovements: "",
    followUpActions: "",
    investigationLeader: "",
    investigationLeaderEmpId: "",
    approvedBy: "",
    approverEmpId: "",
    investigationStatus: "",
    completionDate: "",
    reportDistribution: "",
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
    if (!formData.incidentNumber) {
      newErrors.incidentNumber = "Incident number is required";
    }
    if (!formData.incidentType) {
      newErrors.incidentType = "Incident type is required";
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

  const incidentTypeOptions = [
    { value: "", label: "Select Incident Type" },
    { value: "Safety Incident", label: "Safety Incident" },
    { value: "Security Breach", label: "Security Breach" },
    { value: "Equipment Failure", label: "Equipment Failure" },
    { value: "Signal Failure", label: "Signal Failure" },
    { value: "Train Accident", label: "Train Accident" },
    { value: "Platform Incident", label: "Platform Incident" },
    { value: "Fire Incident", label: "Fire Incident" },
    { value: "Medical Emergency", label: "Medical Emergency" },
    { value: "Natural Disaster", label: "Natural Disaster" },
    { value: "Human Error", label: "Human Error" },
    { value: "Other", label: "Other" }
  ];

  const severityOptions = [
    { value: "", label: "Select Severity" },
    { value: "Critical", label: "Critical" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
    { value: "Minor", label: "Minor" }
  ];

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "Investigation Started", label: "Investigation Started" },
    { value: "Evidence Collection", label: "Evidence Collection" },
    { value: "Analysis in Progress", label: "Analysis in Progress" },
    { value: "Report Preparation", label: "Report Preparation" },
    { value: "Review Stage", label: "Review Stage" },
    { value: "Completed", label: "Completed" },
    { value: "Closed", label: "Closed" }
  ];

  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "Lead Investigator", label: "Lead Investigator" },
    { value: "Technical Expert", label: "Technical Expert" },
    { value: "Safety Officer", label: "Safety Officer" },
    { value: "Operations Expert", label: "Operations Expert" },
    { value: "Maintenance Expert", label: "Maintenance Expert" },
    { value: "Human Factors Expert", label: "Human Factors Expert" },
    { value: "Legal Advisor", label: "Legal Advisor" },
    { value: "Documentation Specialist", label: "Documentation Specialist" }
  ];

  return (
    <OperationFormLayout 
      title="Incident Investigation Register"
      description="Comprehensive incident investigation and root cause analysis documentation"
    >
      <Form onSubmit={handleSubmit}>
        {/* Incident Information */}
        <div className="form-section">
          <h5 className="section-title">Incident Information</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Incident Number"
                value={formData.incidentNumber}
                onChange={(value) => handleChange("incidentNumber", value)}
                required
                error={errors.incidentNumber}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="date"
                label="Incident Date"
                value={formData.incidentDate}
                onChange={(value) => handleChange("incidentDate", value)}
                max={today}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="time"
                label="Incident Time"
                value={formData.incidentTime}
                onChange={(value) => handleChange("incidentTime", value)}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="date"
                label="Report Date"
                value={formData.date}
                onChange={(value) => handleChange("date", value)}
                max={today}
                required
                error={errors.date}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Incident Type"
                value={formData.incidentType}
                onChange={(value) => handleChange("incidentType", value)}
                options={incidentTypeOptions}
                required
                error={errors.incidentType}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Severity"
                value={formData.severity}
                onChange={(value) => handleChange("severity", value)}
                options={severityOptions}
              />
            </Col>
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
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Incident Description"
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
            rows={3}
            helpText="Detailed description of the incident"
          />
        </div>

        {/* Investigation Team */}
        <div className="form-section">
          <h5 className="section-title">Investigation Team</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Name</th>
                  <th>Emp ID</th>
                  <th>Department</th>
                  <th>Expertise</th>
                  <th>Contact</th>
                  <th>Responsibility</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.investigationTeam.map((member, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={member.role}
                        onChange={(e) => handleArrayChange("investigationTeam", index, "role", e.target.value)}
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
                        value={member.memberName}
                        onChange={(e) => handleArrayChange("investigationTeam", index, "memberName", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={member.empId}
                        onChange={(e) => handleArrayChange("investigationTeam", index, "empId", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={member.department}
                        onChange={(e) => handleArrayChange("investigationTeam", index, "department", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={member.expertise}
                        onChange={(e) => handleArrayChange("investigationTeam", index, "expertise", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={member.contactNumber}
                        onChange={(e) => handleArrayChange("investigationTeam", index, "contactNumber", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={member.responsibility}
                        onChange={(e) => handleArrayChange("investigationTeam", index, "responsibility", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("investigationTeam", index)}
                        disabled={formData.investigationTeam.length === 1}
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
            onClick={() => addArrayItem("investigationTeam", {
              role: "",
              memberName: "",
              empId: "",
              department: "",
              expertise: "",
              contactNumber: "",
              assigned: "",
              responsibility: ""
            })}
          >
            Add Team Member
          </Button>
        </div>

        {/* Technical Analysis */}
        <div className="form-section">
          <h5 className="section-title">Technical Analysis</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Equipment Involved"
                value={formData.technicalAnalysis.equipmentInvolved}
                onChange={(value) => handleChange("technicalAnalysis", {
                  ...formData.technicalAnalysis,
                  equipmentInvolved: value
                })}
                rows={2}
                helpText="Equipment and systems involved in the incident"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Equipment Condition"
                value={formData.technicalAnalysis.equipmentCondition}
                onChange={(value) => handleChange("technicalAnalysis", {
                  ...formData.technicalAnalysis,
                  equipmentCondition: value
                })}
                rows={2}
                helpText="Condition of equipment at time of incident"
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Technical Findings"
            value={formData.technicalAnalysis.technicalFindings}
            onChange={(value) => handleChange("technicalAnalysis", {
              ...formData.technicalAnalysis,
              technicalFindings: value
            })}
            rows={3}
            helpText="Key technical findings from analysis"
          />
        </div>

        {/* Root Cause Analysis */}
        <div className="form-section">
          <h5 className="section-title">Root Cause Analysis</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Cause Category</th>
                  <th>Primary Cause</th>
                  <th>Contributing Factors</th>
                  <th>Analysis</th>
                  <th>Likelihood</th>
                  <th>Impact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.rootCauseAnalysis.map((cause, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={cause.causeCategory}
                        onChange={(e) => handleArrayChange("rootCauseAnalysis", index, "causeCategory", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={cause.primaryCause}
                        onChange={(e) => handleArrayChange("rootCauseAnalysis", index, "primaryCause", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={cause.contributingFactors}
                        onChange={(e) => handleArrayChange("rootCauseAnalysis", index, "contributingFactors", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={cause.analysis}
                        onChange={(e) => handleArrayChange("rootCauseAnalysis", index, "analysis", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={cause.likelihood}
                        onChange={(e) => handleArrayChange("rootCauseAnalysis", index, "likelihood", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        <option value="">Select</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={cause.impact}
                        onChange={(e) => handleArrayChange("rootCauseAnalysis", index, "impact", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        <option value="">Select</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("rootCauseAnalysis", index)}
                        disabled={formData.rootCauseAnalysis.length === 1}
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
            onClick={() => addArrayItem("rootCauseAnalysis", {
              causeCategory: "",
              primaryCause: "",
              contributingFactors: "",
              analysis: "",
              evidenceSupporting: "",
              likelihood: "",
              impact: "",
              preventability: ""
            })}
          >
            Add Root Cause
          </Button>
        </div>

        {/* Investigation Status */}
        <div className="form-section">
          <h5 className="section-title">Investigation Status</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Investigation Status"
                value={formData.investigationStatus}
                onChange={(value) => handleChange("investigationStatus", value)}
                options={statusOptions}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Completion Date"
                value={formData.completionDate}
                onChange={(value) => handleChange("completionDate", value)}
                max={today}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Investigation Leader"
                value={formData.investigationLeader}
                onChange={(value) => handleChange("investigationLeader", value)}
              />
            </Col>
          </Row>
        </div>

        {/* Findings & Conclusions */}
        <div className="form-section">
          <h5 className="section-title">Investigation Findings & Conclusions</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Investigation Findings"
            value={formData.investigationFindings}
            onChange={(value) => handleChange("investigationFindings", value)}
            rows={4}
            helpText="Key findings from the investigation"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Conclusions"
            value={formData.conclusions}
            onChange={(value) => handleChange("conclusions", value)}
            rows={3}
            helpText="Final conclusions drawn from the investigation"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Recommendations"
            value={formData.recommendations}
            onChange={(value) => handleChange("recommendations", value)}
            rows={3}
            helpText="Recommendations to prevent similar incidents"
          />
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Approved By"
                value={formData.approvedBy}
                onChange={(value) => handleChange("approvedBy", value)}
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
          <UniversalOperationFormField
            type="textarea"
            label="Final Remarks"
            value={formData.finalRemarks}
            onChange={(value) => handleChange("finalRemarks", value)}
            rows={3}
            helpText="Final remarks and closing statements"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Investigation Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default IncidentInvestigationRegisterForm;