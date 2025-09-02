/**
 * Shift Log Book SDC Form
 * AFC-SDC Department - Daily Operations & Shift Management
 * 
 * Original: ID: 92, Slug: shift-log-book-sdc
 * Universal Component Architecture with 100% field preservation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Alert, Table, Badge, Accordion } from 'react-bootstrap';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

// Redux action (maintaining exact legacy action)
const submitShiftLogBookSDC = (formData) => ({
  type: 'SUBMIT_SHIFT_LOG_BOOK_SDC',
  payload: formData
});

const ShiftLogBookSDCForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.shiftLogBookSDC || {});

  // Form state with all original fields preserved exactly
  const [formData, setFormData] = useState({
    // Shift Information
    date: new Date().toISOString().split('T')[0],
    shift: 'morning',
    shiftStartTime: '',
    shiftEndTime: '',
    
    // Personnel Details
    shiftIncharge: '',
    operatorOnDuty: '',
    supervisorOnDuty: '',
    
    // Previous Shift Handover
    previousShiftReports: '',
    pendingIssues: '',
    handoverNotes: '',
    
    // System Status at Shift Start
    systemStatusAtStart: [
      {
        system: 'SDC Main Server',
        status: 'operational',
        remarks: '',
        lastChecked: ''
      },
      {
        system: 'Database Server',
        status: 'operational',
        remarks: '',
        lastChecked: ''
      },
      {
        system: 'Network Infrastructure',
        status: 'operational',
        remarks: '',
        lastChecked: ''
      },
      {
        system: 'CC Workstations',
        status: 'operational',
        remarks: '',
        lastChecked: ''
      },
      {
        system: 'CCHS Workstations',
        status: 'operational',
        remarks: '',
        lastChecked: ''
      }
    ],
    
    // Shift Activities Log
    activities: [
      {
        time: '',
        activity: '',
        type: 'routine',
        performedBy: '',
        remarks: '',
        priority: 'normal'
      }
    ],
    
    // Incidents & Issues
    incidents: [
      {
        time: '',
        description: '',
        severity: 'low',
        actionTaken: '',
        status: 'reported',
        assignedTo: ''
      }
    ],
    
    // Maintenance Activities
    maintenanceActivities: [
      {
        equipmentId: '',
        maintenanceType: 'preventive',
        description: '',
        startTime: '',
        endTime: '',
        status: 'completed',
        performedBy: ''
      }
    ],
    
    // System Performance Monitoring
    performanceMetrics: {
      serverCpuUsage: '',
      serverMemoryUsage: '',
      networkLatency: '',
      databaseResponseTime: '',
      systemUptime: '',
      activeConnections: ''
    },
    
    // Visitor Log
    visitors: [
      {
        visitorName: '',
        organization: '',
        purpose: '',
        timeIn: '',
        timeOut: '',
        escortedBy: '',
        accessAreas: ''
      }
    ],
    
    // End of Shift Summary
    shiftSummary: '',
    issuesForNextShift: '',
    recommendedActions: '',
    
    // Next Shift Handover
    nextShiftIncharge: '',
    handoverTime: '',
    handoverCompletedBy: '',
    
    // Approvals
    supervisorApproval: false,
    managementReview: false
  });

  const [errors, setErrors] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate completion percentage
  useEffect(() => {
    const requiredSections = [
      formData.date,
      formData.shiftIncharge,
      formData.shiftSummary,
      formData.activities.length > 0 && formData.activities[0].activity,
      formData.systemStatusAtStart.filter(s => s.status).length >= 3
    ];
    const completedSections = requiredSections.filter(Boolean).length;
    setCompletionPercentage((completedSections / requiredSections.length) * 100);
  }, [formData]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested object updates for performance metrics
    if (name.includes('performanceMetrics.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        performanceMetrics: {
          ...prev.performanceMetrics,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // System Status Management
  const handleSystemStatusChange = (index, field, value) => {
    const updatedStatus = [...formData.systemStatusAtStart];
    updatedStatus[index] = { ...updatedStatus[index], [field]: value };
    setFormData(prev => ({ ...prev, systemStatusAtStart: updatedStatus }));
  };

  // Activities Management
  const handleActivityChange = (index, field, value) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[index] = { ...updatedActivities[index], [field]: value };
    setFormData(prev => ({ ...prev, activities: updatedActivities }));
  };

  const addActivity = () => {
    const newActivity = {
      time: new Date().toTimeString().split(' ')[0].slice(0, 5),
      activity: '',
      type: 'routine',
      performedBy: '',
      remarks: '',
      priority: 'normal'
    };
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, newActivity]
    }));
  };

  const removeActivity = (index) => {
    if (formData.activities.length > 1) {
      const updatedActivities = formData.activities.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, activities: updatedActivities }));
    }
  };

  // Incidents Management
  const handleIncidentChange = (index, field, value) => {
    const updatedIncidents = [...formData.incidents];
    updatedIncidents[index] = { ...updatedIncidents[index], [field]: value };
    setFormData(prev => ({ ...prev, incidents: updatedIncidents }));
  };

  const addIncident = () => {
    const newIncident = {
      time: new Date().toTimeString().split(' ')[0].slice(0, 5),
      description: '',
      severity: 'low',
      actionTaken: '',
      status: 'reported',
      assignedTo: ''
    };
    setFormData(prev => ({
      ...prev,
      incidents: [...prev.incidents, newIncident]
    }));
  };

  const removeIncident = (index) => {
    const updatedIncidents = formData.incidents.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, incidents: updatedIncidents }));
  };

  // Visitor Management
  const handleVisitorChange = (index, field, value) => {
    const updatedVisitors = [...formData.visitors];
    updatedVisitors[index] = { ...updatedVisitors[index], [field]: value };
    setFormData(prev => ({ ...prev, visitors: updatedVisitors }));
  };

  const addVisitor = () => {
    const newVisitor = {
      visitorName: '',
      organization: '',
      purpose: '',
      timeIn: '',
      timeOut: '',
      escortedBy: '',
      accessAreas: ''
    };
    setFormData(prev => ({
      ...prev,
      visitors: [...prev.visitors, newVisitor]
    }));
  };

  const removeVisitor = (index) => {
    const updatedVisitors = formData.visitors.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, visitors: updatedVisitors }));
  };

  const handleSubmit = async (data) => {
    try {
      // Basic validation
      if (!data.date || !data.shiftIncharge) {
        throw new Error('Required fields are missing');
      }
      
      // Dispatch to Redux store (maintaining legacy action structure)
      dispatch(submitShiftLogBookSDC(data));
      
      // Success handling
      console.log('Shift Log Book SDC submitted successfully:', data);
      
    } catch (error) {
      setErrors({ general: error.message });
      console.error('Form submission error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'success';
      case 'maintenance': return 'warning';
      case 'faulty': return 'danger';
      case 'offline': return 'secondary';
      default: return 'secondary';
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

  return (
    <AFCSDCFormLayout
      title="Shift Log Book - SDC"
      onSubmit={() => handleSubmit(formData)}
      category="network-operations"
      showProgress={true}
      completionPercentage={Math.round(completionPercentage)}
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
          Shift log updated successfully!
        </Alert>
      )}

      {/* Shift Information */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h6 className="mb-0">
            <i className="fas fa-clock me-2"></i>
            Shift Information
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
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
                type="select"
                name="shift"
                label="Shift"
                value={formData.shift}
                onChange={handleFieldChange}
                options={[
                  { value: 'morning', label: 'Morning (06:00-14:00)' },
                  { value: 'afternoon', label: 'Afternoon (14:00-22:00)' },
                  { value: 'night', label: 'Night (22:00-06:00)' }
                ]}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="time"
                name="shiftStartTime"
                label="Shift Start Time"
                value={formData.shiftStartTime}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="time"
                name="shiftEndTime"
                label="Shift End Time"
                value={formData.shiftEndTime}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="shiftIncharge"
                label="Shift In-charge"
                value={formData.shiftIncharge}
                onChange={handleFieldChange}
                error={errors.shiftIncharge}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="operatorOnDuty"
                label="Operator on Duty"
                value={formData.operatorOnDuty}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="supervisorOnDuty"
                label="Supervisor on Duty"
                value={formData.supervisorOnDuty}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Previous Shift Handover */}
      <Card className="mb-4">
        <Card.Header className="bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-hand-paper me-2"></i>
            Previous Shift Handover
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="previousShiftReports"
                label="Previous Shift Reports"
                value={formData.previousShiftReports}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Key information from previous shift"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="pendingIssues"
                label="Pending Issues"
                value={formData.pendingIssues}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Issues requiring attention"
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="handoverNotes"
                label="Handover Notes"
                value={formData.handoverNotes}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Special instructions or notes"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* System Status */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white">
          <h6 className="mb-0">
            <i className="fas fa-server me-2"></i>
            System Status at Shift Start
          </h6>
        </Card.Header>
        <Card.Body>
          <Table responsive>
            <thead className="table-light">
              <tr>
                <th>System</th>
                <th>Status</th>
                <th>Last Checked</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {formData.systemStatusAtStart.map((system, index) => (
                <tr key={index}>
                  <td className="fw-bold">{system.system}</td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="system-status"
                      name={`systemStatus-${index}`}
                      value={system.status}
                      onChange={(e) => handleSystemStatusChange(index, 'status', e.target.value)}
                      className="mb-0"
                    />
                  </td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="time"
                      name={`lastChecked-${index}`}
                      value={system.lastChecked}
                      onChange={(e) => handleSystemStatusChange(index, 'lastChecked', e.target.value)}
                      className="mb-0"
                    />
                  </td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`remarks-${index}`}
                      value={system.remarks}
                      onChange={(e) => handleSystemStatusChange(index, 'remarks', e.target.value)}
                      placeholder="Notes"
                      className="mb-0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Activities Log */}
      <Card className="mb-4">
        <Card.Header className="bg-warning text-dark d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-list-ul me-2"></i>
            Shift Activities Log
          </h6>
          <Button variant="primary" size="sm" onClick={addActivity}>
            <i className="fas fa-plus me-1"></i>
            Add Activity
          </Button>
        </Card.Header>
        <Card.Body>
          {formData.activities.map((activity, index) => (
            <Card key={index} className="mb-3 border-start border-warning border-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg="warning" className="text-dark">Activity #{index + 1}</Badge>
                  {formData.activities.length > 1 && (
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => removeActivity(index)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  )}
                </div>
                <Row>
                  <Col md={2}>
                    <UniversalAFCSDCFormField
                      type="time"
                      name={`activityTime-${index}`}
                      label="Time"
                      value={activity.time}
                      onChange={(e) => handleActivityChange(index, 'time', e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name={`activity-${index}`}
                      label="Activity Description"
                      value={activity.activity}
                      onChange={(e) => handleActivityChange(index, 'activity', e.target.value)}
                      rows={2}
                      placeholder="Describe the activity"
                    />
                  </Col>
                  <Col md={2}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`activityType-${index}`}
                      label="Type"
                      value={activity.type}
                      onChange={(e) => handleActivityChange(index, 'type', e.target.value)}
                      options={[
                        { value: 'routine', label: 'Routine' },
                        { value: 'maintenance', label: 'Maintenance' },
                        { value: 'emergency', label: 'Emergency' },
                        { value: 'inspection', label: 'Inspection' }
                      ]}
                    />
                  </Col>
                  <Col md={2}>
                    <UniversalAFCSDCFormField
                      type="employee-sdc"
                      name={`performedBy-${index}`}
                      label="Performed By"
                      value={activity.performedBy}
                      onChange={(e) => handleActivityChange(index, 'performedBy', e.target.value)}
                    />
                  </Col>
                  <Col md={2}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`activityPriority-${index}`}
                      label="Priority"
                      value={activity.priority}
                      onChange={(e) => handleActivityChange(index, 'priority', e.target.value)}
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'normal', label: 'Normal' },
                        { value: 'high', label: 'High' },
                        { value: 'urgent', label: 'Urgent' }
                      ]}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>

      {/* Performance Metrics */}
      <Card className="mb-4">
        <Card.Header className="bg-secondary text-white">
          <h6 className="mb-0">
            <i className="fas fa-chart-line me-2"></i>
            System Performance Metrics
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="number"
                name="performanceMetrics.serverCpuUsage"
                label="Server CPU Usage (%)"
                value={formData.performanceMetrics.serverCpuUsage}
                onChange={handleFieldChange}
                min="0"
                max="100"
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="number"
                name="performanceMetrics.serverMemoryUsage"
                label="Server Memory Usage (%)"
                value={formData.performanceMetrics.serverMemoryUsage}
                onChange={handleFieldChange}
                min="0"
                max="100"
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="performanceMetrics.networkLatency"
                label="Network Latency (ms)"
                value={formData.performanceMetrics.networkLatency}
                onChange={handleFieldChange}
                placeholder="e.g., 10ms"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="performanceMetrics.databaseResponseTime"
                label="Database Response Time (ms)"
                value={formData.performanceMetrics.databaseResponseTime}
                onChange={handleFieldChange}
                placeholder="e.g., 50ms"
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="performanceMetrics.systemUptime"
                label="System Uptime"
                value={formData.performanceMetrics.systemUptime}
                onChange={handleFieldChange}
                placeholder="e.g., 99.9%"
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="number"
                name="performanceMetrics.activeConnections"
                label="Active Connections"
                value={formData.performanceMetrics.activeConnections}
                onChange={handleFieldChange}
                min="0"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Shift Summary */}
      <Card className="mb-4">
        <Card.Header className="bg-dark text-white">
          <h6 className="mb-0">
            <i className="fas fa-clipboard-check me-2"></i>
            End of Shift Summary
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="shiftSummary"
                label="Shift Summary"
                value={formData.shiftSummary}
                onChange={handleFieldChange}
                rows={4}
                placeholder="Comprehensive summary of shift activities, system status, and any significant events"
                error={errors.shiftSummary}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="issuesForNextShift"
                label="Issues for Next Shift"
                value={formData.issuesForNextShift}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Important issues to be handled by next shift"
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="recommendedActions"
                label="Recommended Actions"
                value={formData.recommendedActions}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Recommendations for system improvements or actions"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="nextShiftIncharge"
                label="Next Shift In-charge"
                value={formData.nextShiftIncharge}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="time"
                name="handoverTime"
                label="Handover Time"
                value={formData.handoverTime}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
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
                name="managementReview"
                label="Management Review Required"
                value={formData.managementReview}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </AFCSDCFormLayout>
  );
};

export default ShiftLogBookSDCForm;