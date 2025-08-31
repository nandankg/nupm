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

const PassengerServiceRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    shift: "",
    stationCode: "",
    stationName: "",
    serviceOfficer: "",
    serviceOfficerEmpId: "",
    passengerComplaints: [{
      time: "",
      complaintType: "",
      passengerName: "",
      contactNumber: "",
      description: "",
      actionTaken: "",
      resolvedBy: "",
      status: "",
      followUpRequired: ""
    }],
    suggestions: [{
      time: "",
      passengerName: "",
      contactNumber: "",
      suggestion: "",
      category: "",
      implementationStatus: "",
      remarks: ""
    }],
    lostAndFound: [{
      time: "",
      itemDescription: "",
      location: "",
      reportedBy: "",
      contactNumber: "",
      handedOverTo: "",
      claimedBy: "",
      claimDate: "",
      status: ""
    }],
    assistanceProvided: [{
      time: "",
      assistanceType: "",
      passengerDetails: "",
      staffInvolved: "",
      description: "",
      outcome: ""
    }],
    announcements: [{
      time: "",
      announcementType: "",
      content: "",
      language: "",
      announcedBy: "",
      reason: ""
    }],
    facilityIssues: [{
      time: "",
      facility: "",
      issueDescription: "",
      reportedBy: "",
      actionTaken: "",
      resolvedBy: "",
      status: ""
    }],
    passengerFlow: {
      peakHourMorning: "",
      peakHourEvening: "",
      averageDwellTime: "",
      crowdingLevel: "",
      platformUtilization: ""
    },
    serviceQuality: {
      punctuality: "",
      cleanliness: "",
      staffBehavior: "",
      facilitiesRating: "",
      overallRating: ""
    },
    emergencyEvents: [{
      time: "",
      eventType: "",
      location: "",
      description: "",
      responseTime: "",
      actionTaken: "",
      personsAffected: "",
      resolved: ""
    }],
    dailySummary: {
      totalPassengers: "",
      complaintsReceived: "",
      complaintsResolved: "",
      suggestionsReceived: "",
      assistanceProvided: "",
      emergencyEvents: ""
    },
    staffFeedback: "",
    improvementAreas: "",
    nextShiftInstructions: "",
    supervisorRemarks: "",
    supervisorName: "",
    supervisorEmpId: ""
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
    if (!formData.stationCode) {
      newErrors.stationCode = "Station code is required";
    }
    if (!formData.serviceOfficer) {
      newErrors.serviceOfficer = "Service officer is required";
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

  const complaintTypeOptions = [
    { value: "", label: "Select Complaint Type" },
    { value: "Train Delay", label: "Train Delay" },
    { value: "Cleanliness", label: "Cleanliness" },
    { value: "Staff Behavior", label: "Staff Behavior" },
    { value: "Facility Issue", label: "Facility Issue" },
    { value: "Ticketing", label: "Ticketing" },
    { value: "Overcrowding", label: "Overcrowding" },
    { value: "Safety Concern", label: "Safety Concern" },
    { value: "Other", label: "Other" }
  ];

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "Pending", label: "Pending" },
    { value: "In Progress", label: "In Progress" },
    { value: "Resolved", label: "Resolved" },
    { value: "Escalated", label: "Escalated" },
    { value: "Closed", label: "Closed" }
  ];

  const assistanceTypeOptions = [
    { value: "", label: "Select Assistance Type" },
    { value: "Wheelchair Assistance", label: "Wheelchair Assistance" },
    { value: "Senior Citizen Help", label: "Senior Citizen Help" },
    { value: "Medical Emergency", label: "Medical Emergency" },
    { value: "Lost Child", label: "Lost Child" },
    { value: "Directions/Information", label: "Directions/Information" },
    { value: "Language Translation", label: "Language Translation" },
    { value: "Other", label: "Other" }
  ];

  return (
    <OperationFormLayout 
      title="Passenger Service Register"
      description="Comprehensive passenger service quality and complaint management log"
    >
      <Form onSubmit={handleSubmit}>
        {/* Service Information */}
        <div className="form-section">
          <h5 className="section-title">Service Information</h5>
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
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Service Officer"
                value={formData.serviceOfficer}
                onChange={(value) => handleChange("serviceOfficer", value)}
                required
                error={errors.serviceOfficer}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Service Officer Employee ID"
                value={formData.serviceOfficerEmpId}
                onChange={(value) => handleChange("serviceOfficerEmpId", value)}
              />
            </Col>
          </Row>
        </div>

        {/* Passenger Complaints */}
        <div className="form-section">
          <h5 className="section-title">Passenger Complaints</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Passenger</th>
                  <th>Contact</th>
                  <th>Description</th>
                  <th>Action Taken</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.passengerComplaints.map((complaint, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={complaint.time}
                        onChange={(e) => handleArrayChange("passengerComplaints", index, "time", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={complaint.complaintType}
                        onChange={(e) => handleArrayChange("passengerComplaints", index, "complaintType", e.target.value)}
                        style={{ width: '120px' }}
                      >
                        {complaintTypeOptions.map(option => (
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
                        value={complaint.passengerName}
                        onChange={(e) => handleArrayChange("passengerComplaints", index, "passengerName", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={complaint.contactNumber}
                        onChange={(e) => handleArrayChange("passengerComplaints", index, "contactNumber", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={complaint.description}
                        onChange={(e) => handleArrayChange("passengerComplaints", index, "description", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={complaint.actionTaken}
                        onChange={(e) => handleArrayChange("passengerComplaints", index, "actionTaken", e.target.value)}
                        rows="2"
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={complaint.status}
                        onChange={(e) => handleArrayChange("passengerComplaints", index, "status", e.target.value)}
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
                        onClick={() => removeArrayItem("passengerComplaints", index)}
                        disabled={formData.passengerComplaints.length === 1}
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
            onClick={() => addArrayItem("passengerComplaints", {
              time: "",
              complaintType: "",
              passengerName: "",
              contactNumber: "",
              description: "",
              actionTaken: "",
              resolvedBy: "",
              status: "",
              followUpRequired: ""
            })}
          >
            Add Complaint
          </Button>
        </div>

        {/* Assistance Provided */}
        <div className="form-section">
          <h5 className="section-title">Assistance Provided</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Assistance Type</th>
                  <th>Passenger Details</th>
                  <th>Staff Involved</th>
                  <th>Description</th>
                  <th>Outcome</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.assistanceProvided.map((assistance, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        value={assistance.time}
                        onChange={(e) => handleArrayChange("assistanceProvided", index, "time", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={assistance.assistanceType}
                        onChange={(e) => handleArrayChange("assistanceProvided", index, "assistanceType", e.target.value)}
                        style={{ width: '150px' }}
                      >
                        {assistanceTypeOptions.map(option => (
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
                        value={assistance.passengerDetails}
                        onChange={(e) => handleArrayChange("assistanceProvided", index, "passengerDetails", e.target.value)}
                        style={{ width: '150px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={assistance.staffInvolved}
                        onChange={(e) => handleArrayChange("assistanceProvided", index, "staffInvolved", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control form-control-sm"
                        value={assistance.description}
                        onChange={(e) => handleArrayChange("assistanceProvided", index, "description", e.target.value)}
                        rows="2"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={assistance.outcome}
                        onChange={(e) => handleArrayChange("assistanceProvided", index, "outcome", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("assistanceProvided", index)}
                        disabled={formData.assistanceProvided.length === 1}
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
            onClick={() => addArrayItem("assistanceProvided", {
              time: "",
              assistanceType: "",
              passengerDetails: "",
              staffInvolved: "",
              description: "",
              outcome: ""
            })}
          >
            Add Assistance Record
          </Button>
        </div>

        {/* Passenger Flow Analysis */}
        <div className="form-section">
          <h5 className="section-title">Passenger Flow Analysis</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Peak Hour Morning"
                value={formData.passengerFlow.peakHourMorning}
                onChange={(value) => handleChange("passengerFlow", {
                  ...formData.passengerFlow,
                  peakHourMorning: value
                })}
                helpText="e.g., 08:00-09:00"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Peak Hour Evening"
                value={formData.passengerFlow.peakHourEvening}
                onChange={(value) => handleChange("passengerFlow", {
                  ...formData.passengerFlow,
                  peakHourEvening: value
                })}
                helpText="e.g., 18:00-19:00"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Average Dwell Time (sec)"
                value={formData.passengerFlow.averageDwellTime}
                onChange={(value) => handleChange("passengerFlow", {
                  ...formData.passengerFlow,
                  averageDwellTime: value
                })}
                min="0"
              />
            </Col>
          </Row>
        </div>

        {/* Daily Summary */}
        <div className="form-section">
          <h5 className="section-title">Daily Summary</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Total Passengers"
                value={formData.dailySummary.totalPassengers}
                onChange={(value) => handleChange("dailySummary", {
                  ...formData.dailySummary,
                  totalPassengers: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Complaints Received"
                value={formData.dailySummary.complaintsReceived}
                onChange={(value) => handleChange("dailySummary", {
                  ...formData.dailySummary,
                  complaintsReceived: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Complaints Resolved"
                value={formData.dailySummary.complaintsResolved}
                onChange={(value) => handleChange("dailySummary", {
                  ...formData.dailySummary,
                  complaintsResolved: value
                })}
                min="0"
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="number"
                label="Assistance Provided"
                value={formData.dailySummary.assistanceProvided}
                onChange={(value) => handleChange("dailySummary", {
                  ...formData.dailySummary,
                  assistanceProvided: value
                })}
                min="0"
              />
            </Col>
          </Row>
        </div>

        {/* Supervisor Review */}
        <div className="form-section">
          <h5 className="section-title">Supervisor Review</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Staff Feedback"
            value={formData.staffFeedback}
            onChange={(value) => handleChange("staffFeedback", value)}
            rows={2}
            helpText="Feedback from passenger service staff"
          />
          <UniversalOperationFormField
            type="textarea"
            label="Improvement Areas"
            value={formData.improvementAreas}
            onChange={(value) => handleChange("improvementAreas", value)}
            rows={2}
            helpText="Areas identified for service improvement"
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
            helpText="Supervisor's overall assessment and recommendations"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Passenger Service Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default PassengerServiceRegisterForm;