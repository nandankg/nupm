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

const StationDiaryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    stationCode: "",
    stationName: "",
    shift: "",
    weather: "",
    temperature: "",
    visibility: "",
    trainMovements: [{
      trainNumber: "",
      scheduledTime: "",
      actualTime: "",
      delay: "",
      platform: "",
      remarks: ""
    }],
    incidents: [{
      time: "",
      location: "",
      description: "",
      actionTaken: "",
      reportedBy: ""
    }],
    maintenance: [{
      equipment: "",
      workDescription: "",
      startTime: "",
      endTime: "",
      performedBy: "",
      status: ""
    }],
    passengerServices: {
      totalPassengers: "",
      peakHourCrowd: "",
      complaints: "",
      announcements: ""
    },
    emergencyEvents: "",
    powerFailures: "",
    communicationIssues: "",
    specialInstructions: "",
    stationManager: "",
    stationManagerId: "",
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
    if (!formData.stationCode) {
      newErrors.stationCode = "Station code is required";
    }
    if (!formData.stationName) {
      newErrors.stationName = "Station name is required";
    }
    if (!formData.shift) {
      newErrors.shift = "Shift is required";
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

  const weatherOptions = [
    { value: "", label: "Select Weather" },
    { value: "Clear", label: "Clear" },
    { value: "Cloudy", label: "Cloudy" },
    { value: "Rainy", label: "Rainy" },
    { value: "Foggy", label: "Foggy" },
    { value: "Stormy", label: "Stormy" }
  ];

  const visibilityOptions = [
    { value: "", label: "Select Visibility" },
    { value: "Good", label: "Good" },
    { value: "Fair", label: "Fair" },
    { value: "Poor", label: "Poor" },
    { value: "Very Poor", label: "Very Poor" }
  ];

  return (
    <OperationFormLayout 
      title="Station Diary"
      description="Daily station operations record and log book"
    >
      <Form onSubmit={handleSubmit}>
        {/* Station Information */}
        <div className="form-section">
          <h5 className="section-title">Station Information</h5>
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
                type="text"
                label="Station Code"
                value={formData.stationCode}
                onChange={(value) => handleChange("stationCode", value)}
                required
                error={errors.stationCode}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Station Name"
                value={formData.stationName}
                onChange={(value) => handleChange("stationName", value)}
                required
                error={errors.stationName}
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
          </Row>
        </div>

        {/* Weather Information */}
        <div className="form-section">
          <h5 className="section-title">Weather Conditions</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Weather"
                value={formData.weather}
                onChange={(value) => handleChange("weather", value)}
                options={weatherOptions}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Temperature (°C)"
                value={formData.temperature}
                onChange={(value) => handleChange("temperature", value)}
                min="-10"
                max="50"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Visibility"
                value={formData.visibility}
                onChange={(value) => handleChange("visibility", value)}
                options={visibilityOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Train Movements */}
        <div className="form-section">
          <h5 className="section-title">Train Movements</h5>
          <Table striped bordered size="sm">
            <thead>
              <tr>
                <th>Train Number</th>
                <th>Scheduled Time</th>
                <th>Actual Time</th>
                <th>Delay (min)</th>
                <th>Platform</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.trainMovements.map((train, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={train.trainNumber}
                      onChange={(e) => handleArrayChange("trainMovements", index, "trainNumber", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control form-control-sm"
                      value={train.scheduledTime}
                      onChange={(e) => handleArrayChange("trainMovements", index, "scheduledTime", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control form-control-sm"
                      value={train.actualTime}
                      onChange={(e) => handleArrayChange("trainMovements", index, "actualTime", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={train.delay}
                      onChange={(e) => handleArrayChange("trainMovements", index, "delay", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={train.platform}
                      onChange={(e) => handleArrayChange("trainMovements", index, "platform", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={train.remarks}
                      onChange={(e) => handleArrayChange("trainMovements", index, "remarks", e.target.value)}
                    />
                  </td>
                  <td>
                    <Button 
                      size="sm" 
                      variant="danger" 
                      onClick={() => removeArrayItem("trainMovements", index)}
                      disabled={formData.trainMovements.length === 1}
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
            onClick={() => addArrayItem("trainMovements", {
              trainNumber: "",
              scheduledTime: "",
              actualTime: "",
              delay: "",
              platform: "",
              remarks: ""
            })}
          >
            Add Train Movement
          </Button>
        </div>

        {/* Passenger Services */}
        <div className="form-section">
          <h5 className="section-title">Passenger Services</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Passengers"
                value={formData.passengerServices.totalPassengers}
                onChange={(value) => handleChange("passengerServices", {
                  ...formData.passengerServices,
                  totalPassengers: value
                })}
                min="0"
                helpText="Estimated passenger count"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Peak Hour Crowd"
                value={formData.passengerServices.peakHourCrowd}
                onChange={(value) => handleChange("passengerServices", {
                  ...formData.passengerServices,
                  peakHourCrowd: value
                })}
                helpText="e.g., 08:00-09:00"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Complaints"
                value={formData.passengerServices.complaints}
                onChange={(value) => handleChange("passengerServices", {
                  ...formData.passengerServices,
                  complaints: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Announcements"
                value={formData.passengerServices.announcements}
                onChange={(value) => handleChange("passengerServices", {
                  ...formData.passengerServices,
                  announcements: value
                })}
                min="0"
              />
            </Col>
          </Row>
        </div>

        {/* Emergency Events */}
        <div className="form-section">
          <h5 className="section-title">Events & Issues</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Emergency Events"
            value={formData.emergencyEvents}
            onChange={(value) => handleChange("emergencyEvents", value)}
            rows={2}
            helpText="Any emergency situations or evacuation procedures"
          />
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Power Failures"
                value={formData.powerFailures}
                onChange={(value) => handleChange("powerFailures", value)}
                rows={2}
                helpText="Power outages and backup system status"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="textarea"
                label="Communication Issues"
                value={formData.communicationIssues}
                onChange={(value) => handleChange("communicationIssues", value)}
                rows={2}
                helpText="Radio, telephone, or PA system issues"
              />
            </Col>
          </Row>
        </div>

        {/* Station Manager */}
        <div className="form-section">
          <h5 className="section-title">Station Manager Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Station Manager"
                value={formData.stationManager}
                onChange={(value) => handleChange("stationManager", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Station Manager ID"
                value={formData.stationManagerId}
                onChange={(value) => handleChange("stationManagerId", value)}
              />
            </Col>
          </Row>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h5 className="section-title">Additional Information</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Special Instructions"
            value={formData.specialInstructions}
            onChange={(value) => handleChange("specialInstructions", value)}
            rows={2}
            helpText="Special instructions for operations"
          />
          <UniversalOperationFormField
            type="textarea"
            label="General Remarks"
            value={formData.remarks}
            onChange={(value) => handleChange("remarks", value)}
            rows={3}
            helpText="Any other observations or notes"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Station Diary
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default StationDiaryForm;