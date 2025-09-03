/**
 * Daily Checklist Register SDC Form
 * AFC-SDC Department - Daily Operations & System Health Monitoring
 * 
 * Original: ID: 84, Slug: daily-checklist-register-sdc
 * Universal Component Architecture with 100% field preservation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Alert, Table, ProgressBar } from 'react-bootstrap';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';
import { dailyChecklistValidation } from '../validation/afcSDCValidationSchemas';

// Redux action (maintaining exact legacy action)
const submitDailyChecklistRegisterSDC = (formData) => ({
  type: 'SUBMIT_DAILY_CHECKLIST_REGISTER_SDC',
  payload: formData
});

const DailyChecklistRegisterSDCForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.dailyChecklistRegisterSDC || {});

  // Form state with all original fields preserved exactly
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    shift: 'morning',
    
    // Basic Information
    employeeId: '',
    supervisorId: '',
    weatherCondition: '',
    
    // System Health Checklist Items
    checklistItems: [
      {
        category: 'Server Systems',
        item: 'SDC Main Server Status',
        expectedValue: 'Operational',
        actualValue: '',
        status: 'pending',
        remarks: '',
        priority: 'high'
      },
      {
        category: 'Server Systems', 
        item: 'Database Server Connectivity',
        expectedValue: 'Connected',
        actualValue: '',
        status: 'pending',
        remarks: '',
        priority: 'high'
      },
      {
        category: 'Network Systems',
        item: 'Network Connectivity',
        expectedValue: 'All Links Active',
        actualValue: '',
        status: 'pending',
        remarks: '',
        priority: 'high'
      },
      {
        category: 'Network Systems',
        item: 'Firewall Status',
        expectedValue: 'Active & Updated',
        actualValue: '',
        status: 'pending',
        remarks: '',
        priority: 'medium'
      },
      {
        category: 'Workstations',
        item: 'CC Workstations',
        expectedValue: 'All Functional',
        actualValue: '',
        status: 'pending',
        remarks: '',
        priority: 'high'
      },
      {
        category: 'Workstations',
        item: 'CCHS Workstations',
        expectedValue: 'All Functional',
        actualValue: '',
        status: 'pending',
        remarks: '',
        priority: 'medium'
      },
      {
        category: 'Security Systems',
        item: 'Access Control System',
        expectedValue: 'Operational',
        actualValue: '',
        status: 'pending',
        remarks: '',
        priority: 'high'
      },
      {
        category: 'Security Systems',
        item: 'CCTV Monitoring',
        expectedValue: 'All Cameras Active',
        actualValue: '',
        status: 'pending',
        remarks: '',
        priority: 'medium'
      },
      {
        category: 'Environmental',
        item: 'Air Conditioning',
        expectedValue: '22-24°C',
        actualValue: '',
        status: 'pending',
        remarks: '',
        priority: 'medium'
      },
      {
        category: 'Environmental',
        item: 'UPS Status',
        expectedValue: 'On Mains, Battery OK',
        actualValue: '',
        status: 'pending',
        remarks: '',
        priority: 'high'
      }
    ],
    
    // Overall Assessment
    overallStatus: '',
    criticalIssues: [],
    actionItems: [],
    
    // Supervisor Review
    supervisorComments: '',
    supervisorApproval: false,
    nextShiftHandover: ''
  });

  const [errors, setErrors] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate completion percentage based on checklist items
  useEffect(() => {
    const totalItems = formData.checklistItems.length;
    const completedItems = formData.checklistItems.filter(item => item.status !== 'pending').length;
    const basicFieldsCompleted = [formData.date, formData.time, formData.employeeId].filter(Boolean).length;
    
    const overallCompletion = ((completedItems / totalItems) * 80) + ((basicFieldsCompleted / 3) * 20);
    setCompletionPercentage(Math.round(overallCompletion));
  }, [formData]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleChecklistItemChange = (index, field, value) => {
    const updatedItems = [...formData.checklistItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Auto-determine status based on actual vs expected value
    if (field === 'actualValue' && value) {
      const expectedValue = updatedItems[index].expectedValue.toLowerCase();
      const actualValue = value.toLowerCase();
      
      if (actualValue.includes('ok') || actualValue.includes('operational') || 
          actualValue.includes('active') || actualValue.includes('functional')) {
        updatedItems[index].status = 'ok';
      } else if (actualValue.includes('not') || actualValue.includes('down') || 
                 actualValue.includes('failed') || actualValue.includes('error')) {
        updatedItems[index].status = 'not-ok';
      } else {
        updatedItems[index].status = 'na';
      }
    }
    
    setFormData(prev => ({ ...prev, checklistItems: updatedItems }));
    
    // Update overall status
    updateOverallStatus(updatedItems);
  };

  const updateOverallStatus = (items) => {
    const criticalIssues = items.filter(item => 
      item.priority === 'high' && item.status === 'not-ok'
    );
    
    const minorIssues = items.filter(item => 
      item.priority === 'medium' && item.status === 'not-ok'
    );
    
    let overallStatus = 'all-ok';
    if (criticalIssues.length > 0) {
      overallStatus = 'major-issues';
    } else if (minorIssues.length > 0) {
      overallStatus = 'minor-issues';
    }
    
    setFormData(prev => ({ 
      ...prev, 
      overallStatus,
      criticalIssues: criticalIssues.map(item => item.item)
    }));
  };

  const addActionItem = () => {
    const newItem = `Action item ${formData.actionItems.length + 1}`;
    setFormData(prev => ({
      ...prev,
      actionItems: [...prev.actionItems, newItem]
    }));
  };

  const removeActionItem = (index) => {
    const updatedItems = formData.actionItems.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, actionItems: updatedItems }));
  };

  const handleActionItemChange = (index, value) => {
    const updatedItems = [...formData.actionItems];
    updatedItems[index] = value;
    setFormData(prev => ({ ...prev, actionItems: updatedItems }));
  };

  const handleSubmit = async (data) => {
    try {
      // Validate form data
      // Simple validation using custom validation logic
      const validationErrors = {};
      if (!data.date) validationErrors.date = 'Date is required';
      if (!data.time) validationErrors.time = 'Time is required'; 
      if (!data.employeeId) validationErrors.employeeId = 'Employee ID is required';
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      
      // Dispatch to Redux store (maintaining legacy action structure)
      dispatch(submitDailyChecklistRegisterSDC(data));
      
      // Success handling
      console.log('Daily Checklist Register SDC submitted successfully:', data);
      
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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'ok': return 'success';
      case 'not-ok': return 'danger';
      case 'na': return 'secondary';
      default: return 'warning';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <AFCSDCFormLayout
      title="Daily Checklist Register - SDC"
      onSubmit={() => handleSubmit(formData)}
      category="network-operations"
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
          Daily checklist completed successfully!
        </Alert>
      )}

      {/* Basic Information Section */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h6 className="mb-0">
            <i className="fas fa-info-circle me-2"></i>
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
                type="select"
                name="shift"
                label="Shift"
                value={formData.shift}
                onChange={handleFieldChange}
                options={[
                  { value: 'morning', label: 'Morning Shift (06:00-14:00)' },
                  { value: 'afternoon', label: 'Afternoon Shift (14:00-22:00)' },
                  { value: 'night', label: 'Night Shift (22:00-06:00)' }
                ]}
                error={errors.shift}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="select"
                name="weatherCondition"
                label="Weather Condition"
                value={formData.weatherCondition}
                onChange={handleFieldChange}
                options={[
                  { value: 'clear', label: 'Clear' },
                  { value: 'cloudy', label: 'Cloudy' },
                  { value: 'rainy', label: 'Rainy' },
                  { value: 'stormy', label: 'Stormy' }
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="employeeId"
                label="Employee ID"
                value={formData.employeeId}
                onChange={handleFieldChange}
                error={errors.employeeId}
                required
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="supervisorId"
                label="Supervisor ID"
                value={formData.supervisorId}
                onChange={handleFieldChange}
                error={errors.supervisorId}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Progress Overview */}
      <Card className="mb-4">
        <Card.Header className="bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-chart-line me-2"></i>
            Checklist Progress Overview
          </h6>
        </Card.Header>
        <Card.Body>
          <Row className="text-center">
            <Col md={3}>
              <div className="h4 text-success">
                {formData.checklistItems.filter(item => item.status === 'ok').length}
              </div>
              <div className="text-muted">Items OK</div>
            </Col>
            <Col md={3}>
              <div className="h4 text-danger">
                {formData.checklistItems.filter(item => item.status === 'not-ok').length}
              </div>
              <div className="text-muted">Issues Found</div>
            </Col>
            <Col md={3}>
              <div className="h4 text-warning">
                {formData.checklistItems.filter(item => item.status === 'pending').length}
              </div>
              <div className="text-muted">Pending</div>
            </Col>
            <Col md={3}>
              <div className="h4 text-primary">
                {Math.round(completionPercentage)}%
              </div>
              <div className="text-muted">Complete</div>
            </Col>
          </Row>
          <div className="mt-3">
            <ProgressBar 
              now={completionPercentage} 
              variant={completionPercentage === 100 ? 'success' : 'info'}
              style={{ height: '8px' }}
            />
          </div>
        </Card.Body>
      </Card>

      {/* System Health Checklist */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white">
          <h6 className="mb-0">
            <i className="fas fa-tasks me-2"></i>
            System Health Checklist
          </h6>
        </Card.Header>
        <Card.Body>
          <Table responsive className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Category</th>
                <th>Check Item</th>
                <th>Expected</th>
                <th>Actual Status</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {formData.checklistItems.map((item, index) => (
                <tr key={index} className={item.priority === 'high' ? 'table-warning' : ''}>
                  <td>
                    <span className={`badge bg-${getPriorityColor(item.priority)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td>
                    <strong>{item.item}</strong>
                  </td>
                  <td>
                    <span className="text-muted">{item.expectedValue}</span>
                  </td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`actualValue-${index}`}
                      value={item.actualValue}
                      onChange={(e) => handleChecklistItemChange(index, 'actualValue', e.target.value)}
                      placeholder="Enter actual status"
                      className="mb-0"
                    />
                  </td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`status-${index}`}
                      value={item.status}
                      onChange={(e) => handleChecklistItemChange(index, 'status', e.target.value)}
                      options={[
                        { value: 'pending', label: 'Pending' },
                        { value: 'ok', label: 'OK' },
                        { value: 'not-ok', label: 'Not OK' },
                        { value: 'na', label: 'N/A' }
                      ]}
                      className="mb-0"
                    />
                  </td>
                  <td>
                    <span className={`badge bg-${getPriorityColor(item.priority)}`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name={`remarks-${index}`}
                      value={item.remarks}
                      onChange={(e) => handleChecklistItemChange(index, 'remarks', e.target.value)}
                      rows={1}
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

      {/* Summary and Actions */}
      <Card className="mb-4">
        <Card.Header className="bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-clipboard-check me-2"></i>
            Summary & Actions
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="select"
                name="overallStatus"
                label="Overall System Status"
                value={formData.overallStatus}
                onChange={handleFieldChange}
                options={[
                  { value: 'all-ok', label: 'All Systems OK' },
                  { value: 'minor-issues', label: 'Minor Issues Found' },
                  { value: 'major-issues', label: 'Major Issues Found' }
                ]}
                required
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="supervisorApproval"
                label="Supervisor Approval"
                value={formData.supervisorApproval}
                onChange={handleFieldChange}
                error={errors.supervisorApproval}
              />
            </Col>
          </Row>
          
          {/* Action Items Section */}
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Action Items</h6>
              <Button variant="outline-primary" size="sm" onClick={addActionItem}>
                <i className="fas fa-plus me-1"></i>
                Add Action Item
              </Button>
            </div>
            {formData.actionItems.map((item, index) => (
              <Row key={index} className="mb-2">
                <Col md={10}>
                  <UniversalAFCSDCFormField
                    type="text"
                    name={`actionItem-${index}`}
                    value={item}
                    onChange={(e) => handleActionItemChange(index, e.target.value)}
                    placeholder="Enter action item description"
                    className="mb-0"
                  />
                </Col>
                <Col md={2}>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeActionItem(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
          
          <Row className="mt-4">
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="supervisorComments"
                label="Supervisor Comments"
                value={formData.supervisorComments}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Additional comments from supervisor"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </AFCSDCFormLayout>
  );
};

export default DailyChecklistRegisterSDCForm;