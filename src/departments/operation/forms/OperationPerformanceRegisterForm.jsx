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

const OperationPerformanceRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    reportingPeriod: "",
    section: "",
    preparedBy: "",
    preparedByEmpId: "",
    reviewedBy: "",
    reviewedByEmpId: "",
    trainPerformance: [{
      trainNumber: "",
      scheduledTrips: "",
      actualTrips: "",
      cancelledTrips: "",
      delayedTrips: "",
      onTimeTrips: "",
      averageDelay: "",
      punctualityPercent: "",
      reliability: "",
      passengerLoad: "",
      remarks: ""
    }],
    stationPerformance: [{
      stationCode: "",
      stationName: "",
      totalTrains: "",
      onTimeArrivals: "",
      onTimeDepartures: "",
      averageDwellTime: "",
      passengerFootfall: "",
      facilityRating: "",
      cleanlinessScore: "",
      staffEfficiency: "",
      issues: ""
    }],
    operationalMetrics: {
      totalTrainsScheduled: "",
      totalTrainsOperated: "",
      systemReliability: "",
      overallPunctuality: "",
      systemAvailability: "",
      meanTimeBetweenFailures: "",
      passengerKilometers: "",
      energyEfficiency: "",
      operatingRatio: ""
    },
    safetyMetrics: {
      safetyIncidents: "",
      accidentFreeHours: "",
      nearMissReports: "",
      safetyAuditsCompleted: "",
      safetyTrainingHours: "",
      complianceRate: "",
      firstAidCases: "",
      emergencyDrills: ""
    },
    customerServiceMetrics: {
      customerComplaints: "",
      complaintResolutionTime: "",
      customerSatisfactionScore: "",
      feedbackReceived: "",
      serviceQualityRating: "",
      accessibilityCompliance: "",
      informationAccuracy: "",
      staffCourtesy: ""
    },
    maintenanceMetrics: {
      scheduledMaintenanceCompliance: "",
      unscheduledMaintenanceCases: "",
      meanTimeToRepair: "",
      equipmentAvailability: "",
      sparesUtilization: "",
      maintenanceCost: "",
      predictiveMaintenanceActions: "",
      equipmentAge: ""
    },
    financialMetrics: {
      operatingRevenue: "",
      operatingExpenses: "",
      costPerKilometer: "",
      revenuePerPassenger: "",
      energyCost: "",
      maintenanceCost: "",
      staffCost: "",
      profitabilityRatio: ""
    },
    environmentalMetrics: {
      energyConsumption: "",
      carbonFootprint: "",
      wasteGeneration: "",
      waterConsumption: "",
      recyclingRate: "",
      noiseLevel: "",
      airQualityIndex: "",
      greenInitiatives: ""
    },
    performanceAnalysis: {
      keyAchievements: "",
      majorChallenges: "",
      rootCauseAnalysis: "",
      bestPractices: "",
      benchmarkingResults: "",
      trendAnalysis: "",
      seasonalVariations: "",
      competitivePosition: ""
    },
    kpiDashboard: [{
      kpiName: "",
      targetValue: "",
      actualValue: "",
      variance: "",
      status: "",
      trend: "",
      actionRequired: "",
      owner: ""
    }],
    actionPlans: [{
      issueIdentified: "",
      priority: "",
      actionRequired: "",
      responsiblePerson: "",
      targetDate: "",
      status: "",
      progress: "",
      expectedOutcome: ""
    }],
    improvementInitiatives: "",
    lessonLearned: "",
    nextPeriodTargets: "",
    stakeholderFeedback: "",
    regulatoryCompliance: "",
    technologyUpgrades: "",
    capacityUtilization: "",
    futureProjections: "",
    executiveSummary: "",
    recommendations: ""
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
    if (!formData.reportingPeriod) {
      newErrors.reportingPeriod = "Reporting period is required";
    }
    if (!formData.preparedBy) {
      newErrors.preparedBy = "Prepared by is required";
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

  const reportingPeriodOptions = [
    { value: "", label: "Select Period" },
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Quarterly", label: "Quarterly" },
    { value: "Half-Yearly", label: "Half-Yearly" },
    { value: "Annual", label: "Annual" }
  ];

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "Excellent", label: "Excellent" },
    { value: "Good", label: "Good" },
    { value: "Average", label: "Average" },
    { value: "Below Average", label: "Below Average" },
    { value: "Poor", label: "Poor" }
  ];

  const priorityOptions = [
    { value: "", label: "Select Priority" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" }
  ];

  const trendOptions = [
    { value: "", label: "Select Trend" },
    { value: "Improving", label: "Improving" },
    { value: "Stable", label: "Stable" },
    { value: "Declining", label: "Declining" }
  ];

  return (
    <OperationFormLayout 
      title="Operation Performance Register"
      description="Comprehensive operational performance monitoring and KPI tracking"
    >
      <Form onSubmit={handleSubmit}>
        {/* Report Header */}
        <div className="form-section">
          <h5 className="section-title">Report Information</h5>
          <Row>
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
            <Col md={3}>
              <UniversalOperationFormField
                type="select"
                label="Reporting Period"
                value={formData.reportingPeriod}
                onChange={(value) => handleChange("reportingPeriod", value)}
                options={reportingPeriodOptions}
                required
                error={errors.reportingPeriod}
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
                label="Prepared By"
                value={formData.preparedBy}
                onChange={(value) => handleChange("preparedBy", value)}
                required
                error={errors.preparedBy}
              />
            </Col>
          </Row>
        </div>

        {/* Operational Metrics */}
        <div className="form-section">
          <h5 className="section-title">Key Operational Metrics</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Trains Scheduled"
                value={formData.operationalMetrics.totalTrainsScheduled}
                onChange={(value) => handleChange("operationalMetrics", {
                  ...formData.operationalMetrics,
                  totalTrainsScheduled: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Trains Operated"
                value={formData.operationalMetrics.totalTrainsOperated}
                onChange={(value) => handleChange("operationalMetrics", {
                  ...formData.operationalMetrics,
                  totalTrainsOperated: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="System Reliability (%)"
                value={formData.operationalMetrics.systemReliability}
                onChange={(value) => handleChange("operationalMetrics", {
                  ...formData.operationalMetrics,
                  systemReliability: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Overall Punctuality (%)"
                value={formData.operationalMetrics.overallPunctuality}
                onChange={(value) => handleChange("operationalMetrics", {
                  ...formData.operationalMetrics,
                  overallPunctuality: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
          </Row>
        </div>

        {/* Train Performance */}
        <div className="form-section">
          <h5 className="section-title">Train Performance Details</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Train No.</th>
                  <th>Scheduled Trips</th>
                  <th>Actual Trips</th>
                  <th>Cancelled</th>
                  <th>On Time</th>
                  <th>Avg Delay</th>
                  <th>Punctuality %</th>
                  <th>Reliability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.trainPerformance.map((train, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={train.trainNumber}
                        onChange={(e) => handleArrayChange("trainPerformance", index, "trainNumber", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={train.scheduledTrips}
                        onChange={(e) => handleArrayChange("trainPerformance", index, "scheduledTrips", e.target.value)}
                        style={{ width: '70px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={train.actualTrips}
                        onChange={(e) => handleArrayChange("trainPerformance", index, "actualTrips", e.target.value)}
                        style={{ width: '70px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={train.cancelledTrips}
                        onChange={(e) => handleArrayChange("trainPerformance", index, "cancelledTrips", e.target.value)}
                        style={{ width: '70px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={train.onTimeTrips}
                        onChange={(e) => handleArrayChange("trainPerformance", index, "onTimeTrips", e.target.value)}
                        style={{ width: '70px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={train.averageDelay}
                        onChange={(e) => handleArrayChange("trainPerformance", index, "averageDelay", e.target.value)}
                        style={{ width: '70px' }}
                        placeholder="min"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={train.punctualityPercent}
                        onChange={(e) => handleArrayChange("trainPerformance", index, "punctualityPercent", e.target.value)}
                        style={{ width: '80px' }}
                        max="100"
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={train.reliability}
                        onChange={(e) => handleArrayChange("trainPerformance", index, "reliability", e.target.value)}
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
                        onClick={() => removeArrayItem("trainPerformance", index)}
                        disabled={formData.trainPerformance.length === 1}
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
            onClick={() => addArrayItem("trainPerformance", {
              trainNumber: "",
              scheduledTrips: "",
              actualTrips: "",
              cancelledTrips: "",
              delayedTrips: "",
              onTimeTrips: "",
              averageDelay: "",
              punctualityPercent: "",
              reliability: "",
              passengerLoad: "",
              remarks: ""
            })}
          >
            Add Train Performance
          </Button>
        </div>

        {/* Safety Metrics */}
        <div className="form-section">
          <h5 className="section-title">Safety Performance Metrics</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Safety Incidents"
                value={formData.safetyMetrics.safetyIncidents}
                onChange={(value) => handleChange("safetyMetrics", {
                  ...formData.safetyMetrics,
                  safetyIncidents: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Accident Free Hours"
                value={formData.safetyMetrics.accidentFreeHours}
                onChange={(value) => handleChange("safetyMetrics", {
                  ...formData.safetyMetrics,
                  accidentFreeHours: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Near Miss Reports"
                value={formData.safetyMetrics.nearMissReports}
                onChange={(value) => handleChange("safetyMetrics", {
                  ...formData.safetyMetrics,
                  nearMissReports: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Compliance Rate (%)"
                value={formData.safetyMetrics.complianceRate}
                onChange={(value) => handleChange("safetyMetrics", {
                  ...formData.safetyMetrics,
                  complianceRate: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
          </Row>
        </div>

        {/* KPI Dashboard */}
        <div className="form-section">
          <h5 className="section-title">KPI Dashboard</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>KPI Name</th>
                  <th>Target</th>
                  <th>Actual</th>
                  <th>Variance</th>
                  <th>Status</th>
                  <th>Trend</th>
                  <th>Owner</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.kpiDashboard.map((kpi, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={kpi.kpiName}
                        onChange={(e) => handleArrayChange("kpiDashboard", index, "kpiName", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={kpi.targetValue}
                        onChange={(e) => handleArrayChange("kpiDashboard", index, "targetValue", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={kpi.actualValue}
                        onChange={(e) => handleArrayChange("kpiDashboard", index, "actualValue", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={kpi.variance}
                        onChange={(e) => handleArrayChange("kpiDashboard", index, "variance", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={kpi.status}
                        onChange={(e) => handleArrayChange("kpiDashboard", index, "status", e.target.value)}
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
                      <select
                        className="form-control form-control-sm"
                        value={kpi.trend}
                        onChange={(e) => handleArrayChange("kpiDashboard", index, "trend", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {trendOptions.map(option => (
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
                        value={kpi.owner}
                        onChange={(e) => handleArrayChange("kpiDashboard", index, "owner", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("kpiDashboard", index)}
                        disabled={formData.kpiDashboard.length === 1}
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
            onClick={() => addArrayItem("kpiDashboard", {
              kpiName: "",
              targetValue: "",
              actualValue: "",
              variance: "",
              status: "",
              trend: "",
              actionRequired: "",
              owner: ""
            })}
          >
            Add KPI
          </Button>
        </div>

        {/* Performance Analysis */}
        <div className="form-section">
          <h5 className="section-title">Performance Analysis</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Key Achievements"
            value={formData.performanceAnalysis.keyAchievements}
            onChange={(value) => handleChange("performanceAnalysis", {
              ...formData.performanceAnalysis,
              keyAchievements: value
            })}
            rows={3}
            helpText="Major achievements during the reporting period"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Major Challenges"
            value={formData.performanceAnalysis.majorChallenges}
            onChange={(value) => handleChange("performanceAnalysis", {
              ...formData.performanceAnalysis,
              majorChallenges: value
            })}
            rows={3}
            helpText="Key challenges faced and their impact"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Root Cause Analysis"
            value={formData.performanceAnalysis.rootCauseAnalysis}
            onChange={(value) => handleChange("performanceAnalysis", {
              ...formData.performanceAnalysis,
              rootCauseAnalysis: value
            })}
            rows={3}
            helpText="Analysis of underlying causes for performance issues"
          />
        </div>

        {/* Executive Summary & Recommendations */}
        <div className="form-section">
          <h5 className="section-title">Executive Summary & Recommendations</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Executive Summary"
            value={formData.executiveSummary}
            onChange={(value) => handleChange("executiveSummary", value)}
            rows={4}
            helpText="High-level summary for executive review"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Recommendations"
            value={formData.recommendations}
            onChange={(value) => handleChange("recommendations", value)}
            rows={4}
            helpText="Strategic recommendations for performance improvement"
          />
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Reviewed By"
                value={formData.reviewedBy}
                onChange={(value) => handleChange("reviewedBy", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Reviewer Employee ID"
                value={formData.reviewedByEmpId}
                onChange={(value) => handleChange("reviewedByEmpId", value)}
              />
            </Col>
          </Row>
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Performance Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default OperationPerformanceRegisterForm;