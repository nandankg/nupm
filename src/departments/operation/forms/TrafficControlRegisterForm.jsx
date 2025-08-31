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

const TrafficControlRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    shift: "",
    controller: "",
    controllerEmpId: "",
    section: "",
    weatherConditions: "",
    visibility: "",
    trafficMovements: [{
      time: "",
      trainNumber: "",
      direction: "",
      platform: "",
      scheduledTime: "",
      actualTime: "",
      delay: "",
      delayReason: "",
      passengerLoad: "",
      remarks: ""
    }],
    signalOperations: [{
      time: "",
      signalNumber: "",
      aspectShown: "",
      operationType: "",
      authorizedBy: "",
      remarks: ""
    }],
    pointOperations: [{
      time: "",
      pointNumber: "",
      position: "",
      operationType: "",
      authorizedBy: "",
      defectsNoted: ""
    }],
    emergencyEvents: [{
      time: "",
      type: "",
      location: "",
      description: "",
      actionTaken: "",
      authoritiesInformed: "",
      resolved: ""
    }],
    communicationLog: [{
      time: "",
      communicationType: "",
      fromTo: "",
      subject: "",
      actionRequired: "",
      status: ""
    }],
    powerSupplyStatus: {
      overhead: "",
      thirdRail: "",
      stationPower: "",
      emergencyPower: "",
      powerFailures: ""
    },
    passengerServices: {
      announcementsMade: "",
      crowdControl: "",
      assistanceProvided: "",
      complaintsReceived: ""
    },
    equipmentStatus: "",
    maintenanceActivities: "",
    specialInstructions: "",
    shiftSummary: "",
    handoverNotes: "",
    relievingController: "",
    relievingEmpId: ""
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
    if (!formData.controller) {
      newErrors.controller = "Controller name is required";
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

  const sectionOptions = [
    { value: "", label: "Select Section" },
    { value: "Main Line", label: "Main Line" },
    { value: "Branch Line", label: "Branch Line" },
    { value: "Depot Line", label: "Depot Line" },
    { value: "Platform Section", label: "Platform Section" },
    { value: "Yard Section", label: "Yard Section" }
  ];

  const directionOptions = [
    { value: "", label: "Select Direction" },
    { value: "UP", label: "UP" },
    { value: "DOWN", label: "DOWN" }
  ];

  const aspectOptions = [
    { value: "", label: "Select Aspect" },
    { value: "Green", label: "Green" },
    { value: "Yellow", label: "Yellow" },
    { value: "Red", label: "Red" },
    { value: "Double Yellow", label: "Double Yellow" },
    { value: "Lunar White", label: "Lunar White" }
  ];

  return (
    <OperationFormLayout 
      title="Traffic Control Register"
      description="Comprehensive traffic control operations and signal management log"
    >
      <Form onSubmit={handleSubmit}>
        {/* Shift Information */}
        <div className="form-section">
          <h5 className="section-title">Control Information</h5>
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
                label="Traffic Controller"
                value={formData.controller}
                onChange={(value) => handleChange("controller", value)}
                required
                error={errors.controller}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="employee-id"
                label="Controller Employee ID"
                value={formData.controllerEmpId}
                onChange={(value) => handleChange("controllerEmpId", value)}
              />
            </Col>
          </Row>
          <Row>
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
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Weather Conditions"
                value={formData.weatherConditions}
                onChange={(value) => handleChange("weatherConditions", value)}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Visibility"
                value={formData.visibility}
                onChange={(value) => handleChange("visibility", value)}
              />
            </Col>
          </Row>
        </div>

        {/* Traffic Movements */}
        <div className="form-section">
          <h5 className="section-title">Traffic Movements</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Train No.</th>
                  <th>Direction</th>
                  <th>Platform</th>
                  <th>Scheduled</th>
                  <th>Actual</th>
                  <th>Delay</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.trafficMovements.map((movement, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={movement.time}
                        onChange={(e) => handleArrayChange("trafficMovements", index, "time", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={movement.trainNumber}
                        onChange={(e) => handleArrayChange("trafficMovements", index, "trainNumber", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={movement.direction}
                        onChange={(e) => handleArrayChange("trafficMovements", index, "direction", e.target.value)}
                        style={{ width: '70px' }}
                      >
                        {directionOptions.map(option => (
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
                        value={movement.platform}
                        onChange={(e) => handleArrayChange("trafficMovements", index, "platform", e.target.value)}
                        style={{ width: '60px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={movement.scheduledTime}
                        onChange={(e) => handleArrayChange("trafficMovements", index, "scheduledTime", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={movement.actualTime}
                        onChange={(e) => handleArrayChange("trafficMovements", index, "actualTime", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={movement.delay}
                        onChange={(e) => handleArrayChange("trafficMovements", index, "delay", e.target.value)}
                        style={{ width: '60px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={movement.delayReason}
                        onChange={(e) => handleArrayChange("trafficMovements", index, "delayReason", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("trafficMovements", index)}
                        disabled={formData.trafficMovements.length === 1}
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
            onClick={() => addArrayItem("trafficMovements", {
              time: "",
              trainNumber: "",
              direction: "",
              platform: "",
              scheduledTime: "",
              actualTime: "",
              delay: "",
              delayReason: "",
              passengerLoad: "",
              remarks: ""
            })}
          >
            Add Traffic Movement
          </Button>
        </div>

        {/* Signal Operations */}
        <div className="form-section">
          <h5 className="section-title">Signal Operations</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Signal No.</th>
                  <th>Aspect</th>
                  <th>Operation</th>
                  <th>Authorized By</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.signalOperations.map((signal, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={signal.time}
                        onChange={(e) => handleArrayChange("signalOperations", index, "time", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={signal.signalNumber}
                        onChange={(e) => handleArrayChange("signalOperations", index, "signalNumber", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={signal.aspectShown}
                        onChange={(e) => handleArrayChange("signalOperations", index, "aspectShown", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {aspectOptions.map(option => (
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
                        value={signal.operationType}
                        onChange={(e) => handleArrayChange("signalOperations", index, "operationType", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={signal.authorizedBy}
                        onChange={(e) => handleArrayChange("signalOperations", index, "authorizedBy", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={signal.remarks}
                        onChange={(e) => handleArrayChange("signalOperations", index, "remarks", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("signalOperations", index)}
                        disabled={formData.signalOperations.length === 1}
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
            onClick={() => addArrayItem("signalOperations", {
              time: "",
              signalNumber: "",
              aspectShown: "",
              operationType: "",
              authorizedBy: "",
              remarks: ""
            })}
          >
            Add Signal Operation
          </Button>
        </div>

        {/* Power Supply Status */}
        <div className="form-section">
          <h5 className="section-title">Power Supply Status</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Overhead Line"
                value={formData.powerSupplyStatus.overhead}
                onChange={(value) => handleChange("powerSupplyStatus", {
                  ...formData.powerSupplyStatus,
                  overhead: value
                })}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Third Rail"
                value={formData.powerSupplyStatus.thirdRail}
                onChange={(value) => handleChange("powerSupplyStatus", {
                  ...formData.powerSupplyStatus,
                  thirdRail: value
                })}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Station Power"
                value={formData.powerSupplyStatus.stationPower}
                onChange={(value) => handleChange("powerSupplyStatus", {
                  ...formData.powerSupplyStatus,
                  stationPower: value
                })}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Emergency Power"
                value={formData.powerSupplyStatus.emergencyPower}
                onChange={(value) => handleChange("powerSupplyStatus", {
                  ...formData.powerSupplyStatus,
                  emergencyPower: value
                })}
              />
            </Col>
          </Row>
        </div>

        {/* Shift Summary */}
        <div className="form-section">
          <h5 className="section-title">Shift Summary</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Equipment Status"
            value={formData.equipmentStatus}
            onChange={(value) => handleChange("equipmentStatus", value)}
            rows={2}
            helpText="Overall status of signalling and control equipment"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Shift Summary"
            value={formData.shiftSummary}
            onChange={(value) => handleChange("shiftSummary", value)}
            rows={3}
            helpText="Summary of major events and activities during shift"
          />
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Relieving Controller"
                value={formData.relievingController}
                onChange={(value) => handleChange("relievingController", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Relieving Controller Emp ID"
                value={formData.relievingEmpId}
                onChange={(value) => handleChange("relievingEmpId", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Handover Notes"
            value={formData.handoverNotes}
            onChange={(value) => handleChange("handoverNotes", value)}
            rows={2}
            helpText="Important information for next shift"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Traffic Control Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default TrafficControlRegisterForm;