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

const VehicleMovementRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    shift: "",
    section: "",
    controllerName: "",
    controllerEmpId: "",
    vehicleMovements: [{
      time: "",
      vehicleNumber: "",
      vehicleType: "",
      driver: "",
      driverLicense: "",
      purpose: "",
      origin: "",
      destination: "",
      route: "",
      authorizedBy: "",
      passengerCount: "",
      mileageOut: "",
      mileageIn: "",
      fuelLevel: "",
      condition: "",
      returnTime: "",
      remarks: ""
    }],
    emergencyVehicles: [{
      time: "",
      vehicleType: "",
      emergencyType: "",
      responseTime: "",
      crew: "",
      incidentLocation: "",
      actionTaken: "",
      returnTime: "",
      reportNumber: ""
    }],
    maintenanceVehicles: [{
      time: "",
      vehicleNumber: "",
      maintenanceType: "",
      workLocation: "",
      supervisor: "",
      crew: "",
      equipmentCarried: "",
      workCompleted: "",
      nextSchedule: ""
    }],
    fuelConsumption: [{
      vehicleNumber: "",
      fuelType: "",
      quantityFilled: "",
      mileage: "",
      fuelStation: "",
      cost: "",
      driverSignature: "",
      attendantName: ""
    }],
    vehicleInspection: [{
      vehicleNumber: "",
      inspectionType: "",
      inspector: "",
      inspectorEmpId: "",
      defectsFound: "",
      actionTaken: "",
      nextInspectionDue: "",
      certificateValid: ""
    }],
    trafficViolations: [{
      time: "",
      vehicleNumber: "",
      violationType: "",
      location: "",
      penaltyAmount: "",
      driverName: "",
      actionTaken: "",
      reportNumber: ""
    }],
    accidents: [{
      time: "",
      vehicleNumber: "",
      accidentType: "",
      location: "",
      injuries: "",
      damage: "",
      policeReport: "",
      insuranceClaim: "",
      driverName: "",
      witnessDetails: ""
    }],
    dailySummary: {
      totalVehiclesDeployed: "",
      totalKilometers: "",
      fuelConsumed: "",
      maintenanceIssues: "",
      accidentsReported: "",
      trafficViolations: "",
      emergencyResponses: ""
    },
    vehicleAvailability: {
      totalFleet: "",
      operationalVehicles: "",
      underMaintenance: "",
      outOfService: "",
      utilisationPercentage: ""
    },
    driverManagement: {
      totalDrivers: "",
      driversOnDuty: "",
      driversOnLeave: "",
      trainingRequired: "",
      licenseRenewalsDue: ""
    },
    routeAnalysis: "",
    fuelEfficiency: "",
    maintenanceSchedule: "",
    safetyObservations: "",
    recommendations: "",
    nextShiftInstructions: "",
    supervisorName: "",
    supervisorEmpId: "",
    transportManagerApproval: "",
    transportManagerEmpId: ""
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
    if (!formData.controllerName) {
      newErrors.controllerName = "Controller name is required";
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

  const vehicleTypeOptions = [
    { value: "", label: "Select Vehicle Type" },
    { value: "Staff Bus", label: "Staff Bus" },
    { value: "Emergency Vehicle", label: "Emergency Vehicle" },
    { value: "Maintenance Van", label: "Maintenance Van" },
    { value: "Official Car", label: "Official Car" },
    { value: "Fire Vehicle", label: "Fire Vehicle" },
    { value: "Ambulance", label: "Ambulance" },
    { value: "Security Vehicle", label: "Security Vehicle" },
    { value: "Crane", label: "Crane" },
    { value: "Other", label: "Other" }
  ];

  const emergencyTypeOptions = [
    { value: "", label: "Select Emergency Type" },
    { value: "Fire Emergency", label: "Fire Emergency" },
    { value: "Medical Emergency", label: "Medical Emergency" },
    { value: "Security Alert", label: "Security Alert" },
    { value: "Technical Emergency", label: "Technical Emergency" },
    { value: "Evacuation", label: "Evacuation" },
    { value: "Accident Response", label: "Accident Response" }
  ];

  const conditionOptions = [
    { value: "", label: "Select Condition" },
    { value: "Excellent", label: "Excellent" },
    { value: "Good", label: "Good" },
    { value: "Fair", label: "Fair" },
    { value: "Needs Attention", label: "Needs Attention" },
    { value: "Out of Service", label: "Out of Service" }
  ];

  return (
    <OperationFormLayout 
      title="Vehicle Movement Register"
      description="Comprehensive vehicle fleet management and movement tracking"
    >
      <Form onSubmit={handleSubmit}>
        {/* Control Information */}
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
                label="Transport Controller"
                value={formData.controllerName}
                onChange={(value) => handleChange("controllerName", value)}
                required
                error={errors.controllerName}
              />
            </Col>
          </Row>
        </div>

        {/* Vehicle Movements */}
        <div className="form-section">
          <h5 className="section-title">Vehicle Movements</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Vehicle No.</th>
                  <th>Type</th>
                  <th>Driver</th>
                  <th>Purpose</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Condition</th>
                  <th>Return Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.vehicleMovements.map((vehicle, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={vehicle.time}
                        onChange={(e) => handleArrayChange("vehicleMovements", index, "time", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={vehicle.vehicleNumber}
                        onChange={(e) => handleArrayChange("vehicleMovements", index, "vehicleNumber", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={vehicle.vehicleType}
                        onChange={(e) => handleArrayChange("vehicleMovements", index, "vehicleType", e.target.value)}
                        style={{ width: '120px' }}
                      >
                        {vehicleTypeOptions.map(option => (
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
                        value={vehicle.driver}
                        onChange={(e) => handleArrayChange("vehicleMovements", index, "driver", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={vehicle.purpose}
                        onChange={(e) => handleArrayChange("vehicleMovements", index, "purpose", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={vehicle.origin}
                        onChange={(e) => handleArrayChange("vehicleMovements", index, "origin", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={vehicle.destination}
                        onChange={(e) => handleArrayChange("vehicleMovements", index, "destination", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={vehicle.condition}
                        onChange={(e) => handleArrayChange("vehicleMovements", index, "condition", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {conditionOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={vehicle.returnTime}
                        onChange={(e) => handleArrayChange("vehicleMovements", index, "returnTime", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("vehicleMovements", index)}
                        disabled={formData.vehicleMovements.length === 1}
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
            onClick={() => addArrayItem("vehicleMovements", {
              time: "",
              vehicleNumber: "",
              vehicleType: "",
              driver: "",
              driverLicense: "",
              purpose: "",
              origin: "",
              destination: "",
              route: "",
              authorizedBy: "",
              passengerCount: "",
              mileageOut: "",
              mileageIn: "",
              fuelLevel: "",
              condition: "",
              returnTime: "",
              remarks: ""
            })}
          >
            Add Vehicle Movement
          </Button>
        </div>

        {/* Emergency Vehicles */}
        <div className="form-section">
          <h5 className="section-title">Emergency Vehicle Responses</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Vehicle Type</th>
                  <th>Emergency Type</th>
                  <th>Response Time</th>
                  <th>Crew</th>
                  <th>Location</th>
                  <th>Action Taken</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.emergencyVehicles.map((emergency, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={emergency.time}
                        onChange={(e) => handleArrayChange("emergencyVehicles", index, "time", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={emergency.vehicleType}
                        onChange={(e) => handleArrayChange("emergencyVehicles", index, "vehicleType", e.target.value)}
                        style={{ width: '120px' }}
                      >
                        {vehicleTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={emergency.emergencyType}
                        onChange={(e) => handleArrayChange("emergencyVehicles", index, "emergencyType", e.target.value)}
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
                        type="number"
                        className="form-control form-control-sm"
                        value={emergency.responseTime}
                        onChange={(e) => handleArrayChange("emergencyVehicles", index, "responseTime", e.target.value)}
                        style={{ width: '80px' }}
                        placeholder="mins"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={emergency.crew}
                        onChange={(e) => handleArrayChange("emergencyVehicles", index, "crew", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={emergency.incidentLocation}
                        onChange={(e) => handleArrayChange("emergencyVehicles", index, "incidentLocation", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={emergency.actionTaken}
                        onChange={(e) => handleArrayChange("emergencyVehicles", index, "actionTaken", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("emergencyVehicles", index)}
                        disabled={formData.emergencyVehicles.length === 1}
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
            onClick={() => addArrayItem("emergencyVehicles", {
              time: "",
              vehicleType: "",
              emergencyType: "",
              responseTime: "",
              crew: "",
              incidentLocation: "",
              actionTaken: "",
              returnTime: "",
              reportNumber: ""
            })}
          >
            Add Emergency Response
          </Button>
        </div>

        {/* Fleet Summary */}
        <div className="form-section">
          <h5 className="section-title">Daily Fleet Summary</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Vehicles Deployed"
                value={formData.dailySummary.totalVehiclesDeployed}
                onChange={(value) => handleChange("dailySummary", {
                  ...formData.dailySummary,
                  totalVehiclesDeployed: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Kilometers"
                value={formData.dailySummary.totalKilometers}
                onChange={(value) => handleChange("dailySummary", {
                  ...formData.dailySummary,
                  totalKilometers: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Fuel Consumed (L)"
                value={formData.dailySummary.fuelConsumed}
                onChange={(value) => handleChange("dailySummary", {
                  ...formData.dailySummary,
                  fuelConsumed: value
                })}
                min="0"
                step="0.1"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Emergency Responses"
                value={formData.dailySummary.emergencyResponses}
                onChange={(value) => handleChange("dailySummary", {
                  ...formData.dailySummary,
                  emergencyResponses: value
                })}
                min="0"
              />
            </Col>
          </Row>
        </div>

        {/* Vehicle Availability */}
        <div className="form-section">
          <h5 className="section-title">Fleet Availability</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Fleet Size"
                value={formData.vehicleAvailability.totalFleet}
                onChange={(value) => handleChange("vehicleAvailability", {
                  ...formData.vehicleAvailability,
                  totalFleet: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Operational Vehicles"
                value={formData.vehicleAvailability.operationalVehicles}
                onChange={(value) => handleChange("vehicleAvailability", {
                  ...formData.vehicleAvailability,
                  operationalVehicles: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Under Maintenance"
                value={formData.vehicleAvailability.underMaintenance}
                onChange={(value) => handleChange("vehicleAvailability", {
                  ...formData.vehicleAvailability,
                  underMaintenance: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Utilisation %"
                value={formData.vehicleAvailability.utilisationPercentage}
                onChange={(value) => handleChange("vehicleAvailability", {
                  ...formData.vehicleAvailability,
                  utilisationPercentage: value
                })}
                min="0"
                max="100"
                step="0.1"
              />
            </Col>
          </Row>
        </div>

        {/* Analysis & Recommendations */}
        <div className="form-section">
          <h5 className="section-title">Analysis & Recommendations</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Route Analysis"
            value={formData.routeAnalysis}
            onChange={(value) => handleChange("routeAnalysis", value)}
            rows={2}
            helpText="Analysis of route efficiency and optimization"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Safety Observations"
            value={formData.safetyObservations}
            onChange={(value) => handleChange("safetyObservations", value)}
            rows={2}
            helpText="Safety-related observations and concerns"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Recommendations"
            value={formData.recommendations}
            onChange={(value) => handleChange("recommendations", value)}
            rows={2}
            helpText="Recommendations for fleet improvement"
          />
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Transport Manager"
                value={formData.transportManagerApproval}
                onChange={(value) => handleChange("transportManagerApproval", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Manager Employee ID"
                value={formData.transportManagerEmpId}
                onChange={(value) => handleChange("transportManagerEmpId", value)}
              />
            </Col>
          </Row>
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Vehicle Movement Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default VehicleMovementRegisterForm;