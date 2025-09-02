/**
 * FMTS SDC Form (Fault Management & Tracking System)
 * AFC-SDC Department - System Management & Fault Tracking
 * 
 * Original: ID: 85, Slug: fmts-sdc
 * Universal Component Architecture with 100% field preservation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Alert, Badge, Timeline } from 'react-bootstrap';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';
import { fmtsSDCValidation } from '../validation/afcSDCValidationSchemas';

// Redux action (maintaining exact legacy action)
const submitFmtsSDC = (formData) => ({
  type: 'SUBMIT_FMTS_SDC',
  payload: formData
});

const FmtsSDCForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.fmtsSDC || {});

  // Form state with all original fields preserved exactly
  const [formData, setFormData] = useState({
    // Basic Information
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    incidentId: '',
    
    // Reporting Details
    reportedBy: '',
    reportedTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
    reportingMode: 'direct',
    
    // Fault Classification
    faultType: '',
    faultCategory: 'software',
    severity: 'medium',
    priority: 'medium',
    
    // Equipment & Location
    equipmentAffected: '',
    equipmentId: '',
    location: '',
    systemComponent: '',
    
    // Fault Description
    faultDescription: '',
    symptomsObserved: '',
    errorCodes: '',
    impactArea: '',
    
    // Initial Assessment
    possibleCause: '',
    temporaryWorkaround: '',
    immediateAction: '',
    
    // Assignment & Tracking
    assignedTo: '',
    assignmentTime: '',
    escalationLevel: '1',
    
    // Resolution Details
    actionTaken: '',
    rootCause: '',
    permanentSolution: '',
    
    // Testing & Verification
    testingPerformed: '',
    verificationResults: '',
    
    // Status & Closure
    currentStatus: 'reported',
    closureTime: '',
    closedBy: '',
    
    // Follow-up
    preventiveMeasures: '',
    lessonsLearned: '',
    recommendedActions: '',
    
    // Approval & Sign-off
    supervisorApproval: false,
    qualityCheck: false,
    customerSatisfaction: ''
  });

  const [errors, setErrors] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate completion percentage based on status
  useEffect(() => {
    const statusWeights = {
      'reported': 20,
      'assigned': 40,
      'in-progress': 60,
      'resolved': 80,
      'closed': 100
    };
    
    const baseCompletion = statusWeights[formData.currentStatus] || 0;
    const requiredFields = ['date', 'reportedBy', 'faultDescription', 'equipmentAffected'];
    const completedFields = requiredFields.filter(field => formData[field]).length;
    const fieldCompletion = (completedFields / requiredFields.length) * 20;
    
    setCompletionPercentage(Math.min(100, baseCompletion + fieldCompletion));
  }, [formData]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle special field updates
    let newValue = type === 'checkbox' ? checked : value;
    
    // Auto-generate incident ID if not provided
    if (name === 'date' && !formData.incidentId) {
      const dateStr = value.replace(/-/g, '');
      const timeStr = new Date().toTimeString().split(':').slice(0, 2).join('');
      newValue = value;
      setFormData(prev => ({
        ...prev,
        [name]: newValue,
        incidentId: `SDC-${dateStr}-${timeStr}`
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (data) => {
    try {
      // Validate form data
      await fmtsSDCValidation.validate(data, { abortEarly: false });
      
      // Dispatch to Redux store (maintaining legacy action structure)
      dispatch(submitFmtsSDC(data));
      
      // Success handling
      console.log('FMTS SDC submitted successfully:', data);
      
    } catch (error) {
      if (error.inner) {
        // Validation errors
        const formErrors = {};
        error.inner.forEach(err => {
          formErrors[err.path] = err.message;
        });
        setErrors(formErrors);
      }
      console.error('Form submission error:', error);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reported': return 'warning';
      case 'assigned': return 'info';
      case 'in-progress': return 'primary';
      case 'resolved': return 'success';
      case 'closed': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <AFCSDCFormLayout
      title="Fault Management & Tracking System (FMTS) - SDC"
      onSubmit={() => handleSubmit(formData)}
      category="system-management"
      showProgress={true}
      completionPercentage={completionPercentage}
    >
      {/* Status Alerts */}
      {error && (
        <Alert variant="danger" className="mb-4">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-4">
          <i className="fas fa-check-circle me-2"></i>
          FMTS record updated successfully!
        </Alert>
      )}

      {/* Incident Overview */}
      <Card className="mb-4">
        <Card.Header className="bg-danger text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              <i className="fas fa-exclamation-circle me-2"></i>
              Incident Overview
            </h6>
            <div>
              <Badge bg={getSeverityColor(formData.severity)} className="me-2">
                {formData.severity.toUpperCase()}
              </Badge>
              <Badge bg={getStatusColor(formData.currentStatus)}>
                {formData.currentStatus.toUpperCase()}
              </Badge>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="text"
                name="incidentId"
                label="Incident ID"
                value={formData.incidentId}
                onChange={handleFieldChange}
                placeholder="Auto-generated"
                error={errors.incidentId}
                disabled
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="date"
                name="date"
                label="Date"
                value={formData.date}
                onChange={handleFieldChange}
                error={errors.date}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="time"
                name="time"
                label="Time"
                value={formData.time}
                onChange={handleFieldChange}
                error={errors.time}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="reportedBy"
                label="Reported By"
                value={formData.reportedBy}
                onChange={handleFieldChange}
                error={errors.reportedBy}
                required
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Fault Classification */}
      <Card className="mb-4">
        <Card.Header className="bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-tags me-2"></i>
            Fault Classification
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="select"
                name="faultType"
                label="Fault Type"
                value={formData.faultType}
                onChange={handleFieldChange}
                options={[
                  { value: 'hardware', label: 'Hardware Fault' },
                  { value: 'software', label: 'Software Fault' },
                  { value: 'network', label: 'Network Fault' },
                  { value: 'configuration', label: 'Configuration Issue' },
                  { value: 'user-error', label: 'User Error' },
                  { value: 'external', label: 'External Factor' }
                ]}
                error={errors.faultType}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="select"
                name="severity"
                label="Severity Level"
                value={formData.severity}
                onChange={handleFieldChange}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'critical', label: 'Critical' }
                ]}
                error={errors.severity}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="select"
                name="priority"
                label="Priority"
                value={formData.priority}
                onChange={handleFieldChange}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'urgent', label: 'Urgent' }
                ]}
                error={errors.priority}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="select"
                name="currentStatus"
                label="Current Status"
                value={formData.currentStatus}
                onChange={handleFieldChange}
                options={[
                  { value: 'reported', label: 'Reported' },
                  { value: 'assigned', label: 'Assigned' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'resolved', label: 'Resolved' },
                  { value: 'closed', label: 'Closed' }
                ]}
                error={errors.currentStatus}
                required
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Equipment & Location Details */}
      <Card className="mb-4">
        <Card.Header className="bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-server me-2"></i>
            Equipment & Location Details
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="sdc-equipment-type"
                name="equipmentAffected"
                label="Equipment Affected"
                value={formData.equipmentAffected}
                onChange={handleFieldChange}
                error={errors.equipmentAffected}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="equipmentId"
                label="Equipment ID"
                value={formData.equipmentId}
                onChange={handleFieldChange}
                placeholder="e.g., SDC-SRV-001"
                error={errors.equipmentId}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="sdc-location"
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleFieldChange}
                error={errors.location}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="text"
                name="systemComponent"
                label="System Component"
                value={formData.systemComponent}
                onChange={handleFieldChange}
                placeholder="Specific system component affected"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Fault Description */}
      <Card className="mb-4">
        <Card.Header className="bg-secondary text-white">
          <h6 className="mb-0">
            <i className="fas fa-clipboard-list me-2"></i>
            Fault Description & Analysis
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="faultDescription"
                label="Detailed Fault Description"
                value={formData.faultDescription}
                onChange={handleFieldChange}
                rows={4}
                placeholder="Provide detailed description of the fault, including what happened, when it occurred, and any relevant context"
                error={errors.faultDescription}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="symptomsObserved"
                label="Symptoms Observed"
                value={formData.symptomsObserved}
                onChange={handleFieldChange}
                rows={3}
                placeholder="List all symptoms observed"
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="errorCodes"
                label="Error Codes/Messages"
                value={formData.errorCodes}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Enter any error codes or messages displayed"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="possibleCause"
                label="Possible Cause"
                value={formData.possibleCause}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Initial assessment of possible cause"
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="temporaryWorkaround"
                label="Temporary Workaround"
                value={formData.temporaryWorkaround}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Any temporary workaround implemented"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Assignment & Resolution */}
      {formData.currentStatus !== 'reported' && (
        <Card className="mb-4">
          <Card.Header className="bg-primary text-white">
            <h6 className="mb-0">
              <i className="fas fa-tools me-2"></i>
              Assignment & Resolution
            </h6>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <UniversalAFCSDCFormField
                  type="employee-sdc"
                  name="assignedTo"
                  label="Assigned To"
                  value={formData.assignedTo}
                  onChange={handleFieldChange}
                  error={errors.assignedTo}
                />
              </Col>
              <Col md={6}>
                <UniversalAFCSDCFormField
                  type="time"
                  name="assignmentTime"
                  label="Assignment Time"
                  value={formData.assignmentTime}
                  onChange={handleFieldChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <UniversalAFCSDCFormField
                  type="textarea"
                  name="actionTaken"
                  label="Action Taken"
                  value={formData.actionTaken}
                  onChange={handleFieldChange}
                  rows={4}
                  placeholder="Describe all actions taken to resolve the fault"
                />
              </Col>
            </Row>
            {formData.currentStatus === 'resolved' || formData.currentStatus === 'closed' && (
              <Row>
                <Col md={6}>
                  <UniversalAFCSDCFormField
                    type="textarea"
                    name="rootCause"
                    label="Root Cause"
                    value={formData.rootCause}
                    onChange={handleFieldChange}
                    rows={3}
                    placeholder="Identified root cause of the fault"
                  />
                </Col>
                <Col md={6}>
                  <UniversalAFCSDCFormField
                    type="textarea"
                    name="permanentSolution"
                    label="Permanent Solution"
                    value={formData.permanentSolution}
                    onChange={handleFieldChange}
                    rows={3}
                    placeholder="Permanent solution implemented"
                  />
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Approval Section */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white">
          <h6 className="mb-0">
            <i className="fas fa-check-double me-2"></i>
            Approval & Sign-off
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="supervisorApproval"
                label="Supervisor Approval"
                value={formData.supervisorApproval}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="qualityCheck"
                label="Quality Check Completed"
                value={formData.qualityCheck}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="preventiveMeasures"
                label="Preventive Measures & Recommendations"
                value={formData.preventiveMeasures}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Recommendations to prevent similar faults in the future"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </AFCSDCFormLayout>
  );
};

export default FmtsSDCForm;