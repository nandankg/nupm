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

const MaintenanceCoordinationRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    shift: "",
    section: "",
    coordinator: "",
    coordinatorEmpId: "",
    contactNumber: "",
    scheduledMaintenance: [{
      workOrderNumber: "",
      equipmentId: "",
      equipmentType: "",
      maintenanceType: "",
      priority: "",
      scheduledDate: "",
      scheduledTime: "",
      estimatedDuration: "",
      assignedTeam: "",
      supervisor: "",
      status: "",
      location: "",
      workDescription: "",
      resourcesRequired: "",
      safetyPrecautions: "",
      remarks: ""
    }],
    unscheduledMaintenance: [{
      workOrderNumber: "",
      reportedTime: "",
      equipmentId: "",
      faultDescription: "",
      reportedBy: "",
      urgency: "",
      assignedTeam: "",
      responseTime: "",
      diagnosis: "",
      repairAction: "",
      completionTime: "",
      testResults: "",
      status: ""
    }],
    resourceManagement: [{
      resourceType: "",
      description: "",
      quantityRequired: "",
      quantityAllocated: "",
      supplier: "",
      deliveryDate: "",
      costEstimate: "",
      approvedBy: "",
      received: "",
      quality: ""
    }],
    maintenanceTeams: [{
      teamId: "",
      teamLeader: "",
      teamMembers: "",
      specialization: "",
      currentAssignment: "",
      availability: "",
      location: "",
      contactNumber: "",
      toolsIssued: "",
      safetyEquipment: ""
    }],
    safetyCompliance: [{
      workLocation: "",
      hazardIdentification: "",
      riskAssessment: "",
      safetyMeasures: "",
      ppeRequired: "",
      trafficImpact: "",
      emergencyProcedures: "",
      permitRequired: "",
      supervisorApproval: "",
      complianceStatus: ""
    }],
    equipmentStatus: [{
      equipmentId: "",
      equipmentType: "",
      operationalStatus: "",
      lastMaintenanceDate: "",
      nextMaintenanceDate: "",
      reliability: "",
      condition: "",
      criticalIssues: "",
      sparePartsStock: "",
      maintenanceHistory: ""
    }],
    workCoordination: {
      totalWorkOrders: "",
      scheduledWork: "",
      unscheduledWork: "",
      completedWork: "",
      pendingWork: "",
      delayedWork: "",
      resourceConstraints: "",
      teamUtilization: ""
    },
    operationalImpact: {
      serviceDruption: "",
      affectedSystems: "",
      passengerImpact: "",
      alternativeArrangements: "",
      communicationPlan: "",
      recoveryTime: "",
      businessContinuity: "",
      revenueImpact: ""
    },
    qualityAssurance: [{
      workOrderNumber: "",
      inspectionDate: "",
      inspector: "",
      inspectorEmpId: "",
      qualityChecks: "",
      defectsFound: "",
      correctiveActions: "",
      reinspectionRequired: "",
      approvalStatus: "",
      certification: ""
    }],
    costManagement: {
      budgetAllocated: "",
      actualSpending: "",
      laborCost: "",
      materialCost: "",
      equipmentCost: "",
      contractorCost: "",
      varianceAnalysis: "",
      costOptimization: ""
    },
    performanceMetrics: {
      meanTimeToRepair: "",
      meanTimeBetweenFailures: "",
      maintenanceEfficiency: "",
      equipmentAvailability: "",
      complianceRate: "",
      customerSatisfaction: "",
      safetyPerformance: "",
      budgetVariance: ""
    },
    contractorCoordination: [{
      contractorName: "",
      workScope: "",
      contractValue: "",
      supervisor: "",
      startDate: "",
      endDate: "",
      performanceRating: "",
      complianceStatus: "",
      paymentStatus: "",
      issues: ""
    }],
    environmentalCompliance: {
      wasteGenerated: "",
      disposalMethod: "",
      environmentalImpact: "",
      complianceChecks: "",
      certifications: "",
      monitoringRequired: "",
      remedialActions: "",
      reportingStatus: ""
    },
    documentationStatus: "",
    coordinationChallenges: "",
    improvementSuggestions: "",
    nextShiftHandover: "",
    managerRemarks: "",
    approvedBy: "",
    approverEmpId: "",
    completionSummary: ""
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
    if (!formData.coordinator) {
      newErrors.coordinator = "Coordinator name is required";
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

  const maintenanceTypeOptions = [
    { value: "", label: "Select Type" },
    { value: "Preventive", label: "Preventive" },
    { value: "Corrective", label: "Corrective" },
    { value: "Predictive", label: "Predictive" },
    { value: "Emergency", label: "Emergency" },
    { value: "Routine", label: "Routine" },
    { value: "Overhaul", label: "Overhaul" }
  ];

  const priorityOptions = [
    { value: "", label: "Select Priority" },
    { value: "Critical", label: "Critical" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" }
  ];

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "Scheduled", label: "Scheduled" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Delayed", label: "Delayed" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "On Hold", label: "On Hold" }
  ];

  const urgencyOptions = [
    { value: "", label: "Select Urgency" },
    { value: "Immediate", label: "Immediate" },
    { value: "Urgent", label: "Urgent" },
    { value: "Normal", label: "Normal" },
    { value: "Low", label: "Low" }
  ];

  return (
    <OperationFormLayout 
      title="Maintenance Coordination Register"
      description="Comprehensive maintenance planning, coordination and resource management"
    >
      <Form onSubmit={handleSubmit}>
        {/* Coordination Information */}
        <div className="form-section">
          <h5 className="section-title">Coordination Information</h5>
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
                label="Maintenance Coordinator"
                value={formData.coordinator}
                onChange={(value) => handleChange("coordinator", value)}
                required
                error={errors.coordinator}
              />
            </Col>
          </Row>
        </div>

        {/* Scheduled Maintenance */}
        <div className="form-section">
          <h5 className="section-title">Scheduled Maintenance Activities</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Work Order</th>
                  <th>Equipment ID</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Scheduled Date</th>
                  <th>Duration</th>
                  <th>Assigned Team</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.scheduledMaintenance.map((work, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={work.workOrderNumber}
                        onChange={(e) => handleArrayChange("scheduledMaintenance", index, "workOrderNumber", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={work.equipmentId}
                        onChange={(e) => handleArrayChange("scheduledMaintenance", index, "equipmentId", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={work.maintenanceType}
                        onChange={(e) => handleArrayChange("scheduledMaintenance", index, "maintenanceType", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {maintenanceTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={work.priority}
                        onChange={(e) => handleArrayChange("scheduledMaintenance", index, "priority", e.target.value)}
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
                        type="date"
                        className="form-control form-control-sm"
                        value={work.scheduledDate}
                        onChange={(e) => handleArrayChange("scheduledMaintenance", index, "scheduledDate", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={work.estimatedDuration}
                        onChange={(e) => handleArrayChange("scheduledMaintenance", index, "estimatedDuration", e.target.value)}
                        style={{ width: '70px' }}
                        placeholder="hrs"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={work.assignedTeam}
                        onChange={(e) => handleArrayChange("scheduledMaintenance", index, "assignedTeam", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={work.status}
                        onChange={(e) => handleArrayChange("scheduledMaintenance", index, "status", e.target.value)}
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
                        onClick={() => removeArrayItem("scheduledMaintenance", index)}
                        disabled={formData.scheduledMaintenance.length === 1}
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
            onClick={() => addArrayItem("scheduledMaintenance", {
              workOrderNumber: "",
              equipmentId: "",
              equipmentType: "",
              maintenanceType: "",
              priority: "",
              scheduledDate: "",
              scheduledTime: "",
              estimatedDuration: "",
              assignedTeam: "",
              supervisor: "",
              status: "",
              location: "",
              workDescription: "",
              resourcesRequired: "",
              safetyPrecautions: "",
              remarks: ""
            })}
          >
            Add Scheduled Work
          </Button>
        </div>

        {/* Unscheduled Maintenance */}
        <div className="form-section">
          <h5 className="section-title">Unscheduled/Emergency Maintenance</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Work Order</th>
                  <th>Reported Time</th>
                  <th>Equipment ID</th>
                  <th>Fault Description</th>
                  <th>Urgency</th>
                  <th>Assigned Team</th>
                  <th>Response Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.unscheduledMaintenance.map((work, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={work.workOrderNumber}
                        onChange={(e) => handleArrayChange("unscheduledMaintenance", index, "workOrderNumber", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={work.reportedTime}
                        onChange={(e) => handleArrayChange("unscheduledMaintenance", index, "reportedTime", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={work.equipmentId}
                        onChange={(e) => handleArrayChange("unscheduledMaintenance", index, "equipmentId", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={work.faultDescription}
                        onChange={(e) => handleArrayChange("unscheduledMaintenance", index, "faultDescription", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={work.urgency}
                        onChange={(e) => handleArrayChange("unscheduledMaintenance", index, "urgency", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {urgencyOptions.map(option => (
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
                        value={work.assignedTeam}
                        onChange={(e) => handleArrayChange("unscheduledMaintenance", index, "assignedTeam", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={work.responseTime}
                        onChange={(e) => handleArrayChange("unscheduledMaintenance", index, "responseTime", e.target.value)}
                        style={{ width: '70px' }}
                        placeholder="min"
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={work.status}
                        onChange={(e) => handleArrayChange("unscheduledMaintenance", index, "status", e.target.value)}
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
                        onClick={() => removeArrayItem("unscheduledMaintenance", index)}
                        disabled={formData.unscheduledMaintenance.length === 1}
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
            onClick={() => addArrayItem("unscheduledMaintenance", {
              workOrderNumber: "",
              reportedTime: "",
              equipmentId: "",
              faultDescription: "",
              reportedBy: "",
              urgency: "",
              assignedTeam: "",
              responseTime: "",
              diagnosis: "",
              repairAction: "",
              completionTime: "",
              testResults: "",
              status: ""
            })}
          >
            Add Unscheduled Work
          </Button>
        </div>

        {/* Work Coordination Summary */}
        <div className="form-section">
          <h5 className="section-title">Work Coordination Summary</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Work Orders"
                value={formData.workCoordination.totalWorkOrders}
                onChange={(value) => handleChange("workCoordination", {
                  ...formData.workCoordination,
                  totalWorkOrders: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Completed Work"
                value={formData.workCoordination.completedWork}
                onChange={(value) => handleChange("workCoordination", {
                  ...formData.workCoordination,
                  completedWork: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Pending Work"
                value={formData.workCoordination.pendingWork}
                onChange={(value) => handleChange("workCoordination", {
                  ...formData.workCoordination,
                  pendingWork: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Delayed Work"
                value={formData.workCoordination.delayedWork}
                onChange={(value) => handleChange("workCoordination", {
                  ...formData.workCoordination,
                  delayedWork: value
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
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Mean Time to Repair (hrs)"
                value={formData.performanceMetrics.meanTimeToRepair}
                onChange={(value) => handleChange("performanceMetrics", {
                  ...formData.performanceMetrics,
                  meanTimeToRepair: value
                })}
                min="0"
                step="0.1"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Equipment Availability (%)"
                value={formData.performanceMetrics.equipmentAvailability}
                onChange={(value) => handleChange("performanceMetrics", {
                  ...formData.performanceMetrics,
                  equipmentAvailability: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Maintenance Efficiency (%)"
                value={formData.performanceMetrics.maintenanceEfficiency}
                onChange={(value) => handleChange("performanceMetrics", {
                  ...formData.performanceMetrics,
                  maintenanceEfficiency: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Compliance Rate (%)"
                value={formData.performanceMetrics.complianceRate}
                onChange={(value) => handleChange("performanceMetrics", {
                  ...formData.performanceMetrics,
                  complianceRate: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
          </Row>
        </div>

        {/* Coordination Summary */}
        <div className="form-section">
          <h5 className="section-title">Coordination Summary & Handover</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Coordination Challenges"
            value={formData.coordinationChallenges}
            onChange={(value) => handleChange("coordinationChallenges", value)}
            rows={2}
            helpText="Major challenges faced during coordination"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Improvement Suggestions"
            value={formData.improvementSuggestions}
            onChange={(value) => handleChange("improvementSuggestions", value)}
            rows={2}
            helpText="Suggestions for improving maintenance coordination"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Next Shift Handover"
            value={formData.nextShiftHandover}
            onChange={(value) => handleChange("nextShiftHandover", value)}
            rows={3}
            helpText="Important information for next shift coordination"
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
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Maintenance Coordination Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default MaintenanceCoordinationRegisterForm;