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

const DailyTrainOperationRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    section: "",
    controllerName: "",
    controllerEmpId: "",
    trainOperations: [{
      trainNumber: "",
      trainSet: "",
      origin: "",
      destination: "",
      scheduledDeparture: "",
      actualDeparture: "",
      scheduledArrival: "",
      actualArrival: "",
      delay: "",
      delayReason: "",
      operatorName: "",
      operatorEmpId: "",
      status: ""
    }],
    operationalSummary: {
      totalTrainsScheduled: "",
      trainsOperated: "",
      trainsCancelled: "",
      averageDelay: "",
      onTimePerformance: ""
    },
    disruptions: [{
      time: "",
      location: "",
      description: "",
      impact: "",
      duration: "",
      resolution: ""
    }],
    maintenance: [{
      time: "",
      equipment: "",
      location: "",
      workType: "",
      impact: "",
      duration: "",
      performedBy: ""
    }],
    energyConsumption: "",
    passengerLoad: "",
    weatherImpact: "",
    communicationLog: "",
    specialObservations: "",
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
    if (!formData.section) {
      newErrors.section = "Section is required";
    }
    if (!formData.controllerName) {
      newErrors.controllerName = "Controller name is required";
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

  const sectionOptions = [
    { value: "", label: "Select Section" },
    { value: "Mainline Section A", label: "Mainline Section A" },
    { value: "Mainline Section B", label: "Mainline Section B" },
    { value: "Depot Line", label: "Depot Line" },
    { value: "Branch Line", label: "Branch Line" },
    { value: "Express Line", label: "Express Line" }
  ];

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "On Time", label: "On Time" },
    { value: "Delayed", label: "Delayed" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Rescheduled", label: "Rescheduled" },
    { value: "Partial Operation", label: "Partial Operation" }
  ];

  const impactOptions = [
    { value: "", label: "Select Impact" },
    { value: "No Impact", label: "No Impact" },
    { value: "Minor Delay", label: "Minor Delay" },
    { value: "Major Delay", label: "Major Delay" },
    { value: "Service Disruption", label: "Service Disruption" },
    { value: "Full Suspension", label: "Full Suspension" }
  ];

  return (
    <OperationFormLayout 
      title="Daily Train Operation Register"
      description="Comprehensive daily log of train operations and performance"
    >
      <Form onSubmit={handleSubmit}>
        {/* Header Information */}
        <div className="form-section">
          <h5 className="section-title">Operation Details</h5>
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
                label="Section"
                value={formData.section}
                onChange={(value) => handleChange("section", value)}
                options={sectionOptions}
                required
                error={errors.section}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Operation Controller"
                value={formData.controllerName}
                onChange={(value) => handleChange("controllerName", value)}
                required
                error={errors.controllerName}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Controller Employee ID"
                value={formData.controllerEmpId}
                onChange={(value) => handleChange("controllerEmpId", value)}
              />
            </Col>
          </Row>
        </div>

        {/* Train Operations */}
        <div className="form-section">
          <h5 className="section-title">Train Operations</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Train No.</th>
                  <th>Train Set</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Sch. Dep.</th>
                  <th>Act. Dep.</th>
                  <th>Delay</th>
                  <th>Operator</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.trainOperations.map((train, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={train.trainNumber}
                        onChange={(e) => handleArrayChange("trainOperations", index, "trainNumber", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={train.trainSet}
                        onChange={(e) => handleArrayChange("trainOperations", index, "trainSet", e.target.value)}
                        style={{ width: '60px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={train.origin}
                        onChange={(e) => handleArrayChange("trainOperations", index, "origin", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={train.destination}
                        onChange={(e) => handleArrayChange("trainOperations", index, "destination", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={train.scheduledDeparture}
                        onChange={(e) => handleArrayChange("trainOperations", index, "scheduledDeparture", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={train.actualDeparture}
                        onChange={(e) => handleArrayChange("trainOperations", index, "actualDeparture", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={train.delay}
                        onChange={(e) => handleArrayChange("trainOperations", index, "delay", e.target.value)}
                        style={{ width: '60px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={train.operatorName}
                        onChange={(e) => handleArrayChange("trainOperations", index, "operatorName", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={train.status}
                        onChange={(e) => handleArrayChange("trainOperations", index, "status", e.target.value)}
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
                        onClick={() => removeArrayItem("trainOperations", index)}
                        disabled={formData.trainOperations.length === 1}
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
            onClick={() => addArrayItem("trainOperations", {
              trainNumber: "",
              trainSet: "",
              origin: "",
              destination: "",
              scheduledDeparture: "",
              actualDeparture: "",
              scheduledArrival: "",
              actualArrival: "",
              delay: "",
              delayReason: "",
              operatorName: "",
              operatorEmpId: "",
              status: ""
            })}
          >
            Add Train Operation
          </Button>
        </div>

        {/* Operational Summary */}
        <div className="form-section">
          <h5 className="section-title">Daily Operational Summary</h5>
          <Row>
            <Col md={2}>
              <UniversalOperationFormField
                type="number"
                label="Total Scheduled"
                value={formData.operationalSummary.totalTrainsScheduled}
                onChange={(value) => handleChange("operationalSummary", {
                  ...formData.operationalSummary,
                  totalTrainsScheduled: value
                })}
                min="0"
              />
            </Col>
            <Col md={2}>
              <UniversalOperationFormField
                type="number"
                label="Trains Operated"
                value={formData.operationalSummary.trainsOperated}
                onChange={(value) => handleChange("operationalSummary", {
                  ...formData.operationalSummary,
                  trainsOperated: value
                })}
                min="0"
              />
            </Col>
            <Col md={2}>
              <UniversalOperationFormField
                type="number"
                label="Trains Cancelled"
                value={formData.operationalSummary.trainsCancelled}
                onChange={(value) => handleChange("operationalSummary", {
                  ...formData.operationalSummary,
                  trainsCancelled: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Avg Delay (min)"
                value={formData.operationalSummary.averageDelay}
                onChange={(value) => handleChange("operationalSummary", {
                  ...formData.operationalSummary,
                  averageDelay: value
                })}
                min="0"
                step="0.1"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="On Time Performance (%)"
                value={formData.operationalSummary.onTimePerformance}
                onChange={(value) => handleChange("operationalSummary", {
                  ...formData.operationalSummary,
                  onTimePerformance: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
          </Row>
        </div>

        {/* Observations & Issues */}
        <div className="form-section">
          <h5 className="section-title">Observations & Issues</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Energy Consumption"
                value={formData.energyConsumption}
                onChange={(value) => handleChange("energyConsumption", value)}
                rows={2}
                helpText="Energy consumption patterns and efficiency"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Passenger Load"
                value={formData.passengerLoad}
                onChange={(value) => handleChange("passengerLoad", value)}
                rows={2}
                helpText="Peak hour loads and crowding patterns"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Weather Impact"
                value={formData.weatherImpact}
                onChange={(value) => handleChange("weatherImpact", value)}
                rows={2}
                helpText="Weather conditions affecting operations"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Communication Log"
                value={formData.communicationLog}
                onChange={(value) => handleChange("communicationLog", value)}
                rows={2}
                helpText="Important communications and instructions"
              />
            </Col>
          </Row>
        </div>

        {/* Special Observations */}
        <div className="form-section">
          <h5 className="section-title">Special Observations & Remarks</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Special Observations"
            value={formData.specialObservations}
            onChange={(value) => handleChange("specialObservations", value)}
            rows={3}
            helpText="Any special events, VIP movements, or unusual occurrences"
          />
          <UniversalOperationFormField
            type="textarea"
            label="General Remarks"
            value={formData.remarks}
            onChange={(value) => handleChange("remarks", value)}
            rows={3}
            helpText="Additional remarks and recommendations"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Daily Operation Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default DailyTrainOperationRegisterForm;