/**
 * Parameter Register SDC Form
 * AFC-SDC Department - System Management & Parameter Configuration
 * 
 * Original: ID: 87, Slug: parameter-register-sdc
 * Universal Component Architecture with 100% field preservation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Alert, Table, Badge, Modal } from 'react-bootstrap';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

// Redux action (maintaining exact legacy action)
const submitParameterRegisterSDC = (formData) => ({
  type: 'SUBMIT_PARAMETER_REGISTER_SDC',
  payload: formData
});

const ParameterRegisterSDCForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.parameterRegisterSDC || {});

  // Form state with all original fields preserved exactly
  const [formData, setFormData] = useState({
    // Basic Information
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    registrationNumber: '',
    
    // System Information
    systemId: '',
    systemName: '',
    systemType: 'sdc-server',
    location: '',
    operatingSystem: '',
    softwareVersion: '',
    
    // Parameter Entry Details
    entryType: 'new',
    changeReason: 'configuration-update',
    changeCategory: 'routine',
    priorityLevel: 'normal',
    
    // Parameter Changes
    parameterChanges: [
      {
        slNo: 1,
        parameterName: '',
        parameterPath: '',
        parameterType: 'system-parameter',
        currentValue: '',
        newValue: '',
        dataType: 'string',
        validationRule: '',
        defaultValue: '',
        description: '',
        impact: 'low',
        requiresRestart: false,
        affectedServices: []
      }
    ],
    
    // Change Impact Analysis
    impactAnalysis: {
      systemImpact: '',
      userImpact: '',
      securityImplications: '',
      performanceImpact: '',
      compatibilityIssues: '',
      rollbackComplexity: 'simple'
    },
    
    // Testing Information
    testingRequired: true,
    testingPlan: '',
    testEnvironment: 'staging',
    testResults: '',
    verificationCriteria: '',
    
    // Backup & Recovery
    backupTaken: false,
    backupLocation: '',
    backupTime: '',
    recoveryPlan: '',
    rollbackProcedure: '',
    
    // Scheduling
    implementationDate: '',
    implementationTime: '',
    scheduledDowntime: '',
    maintenanceWindow: '',
    notificationSent: false,
    
    // Authorization Chain
    requestedBy: '',
    reviewedBy: '',
    approvedBy: '',
    implementedBy: '',
    verifiedBy: '',
    
    // Change Status
    changeStatus: 'draft',
    implementationStatus: 'pending',
    
    // Documentation
    changeDocumentation: '',
    configurationNotes: '',
    troubleshootingNotes: '',
    
    // Affected Systems
    affectedSystems: [],
    dependencies: [],
    
    // Quality Assurance
    preChangeChecklist: [],
    postChangeVerification: [],
    
    // Follow-up
    followUpRequired: false,
    followUpDate: '',
    monitoringPeriod: '',
    
    // Compliance & Standards
    complianceCheck: false,
    standardsCompliance: '',
    auditTrail: [],
    
    // Additional Information
    remarks: '',
    lessonsLearned: '',
    recommendedImprovements: ''
  });

  const [errors, setErrors] = useState({});
  const [showImpactModal, setShowImpactModal] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate completion percentage
  useEffect(() => {
    const requiredSections = [
      formData.systemId ? 1 : 0,
      formData.parameterChanges.filter(p => p.parameterName && p.newValue).length > 0 ? 1 : 0,
      formData.requestedBy ? 1 : 0,
      formData.impactAnalysis.systemImpact ? 1 : 0,
      formData.backupTaken ? 1 : 0
    ];
    const completed = requiredSections.reduce((a, b) => a + b, 0);
    setCompletionPercentage((completed / 5) * 100);
  }, [formData]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested object updates for impact analysis
    if (name.includes('impactAnalysis.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        impactAnalysis: {
          ...prev.impactAnalysis,
          [field]: value
        }
      }));
    } else {
      // Auto-generate registration number
      if (name === 'date' && !formData.registrationNumber) {
        const dateStr = value.replace(/-/g, '');
        const regNumber = `PAR-SDC-${dateStr}`;
        setFormData(prev => ({
          ...prev,
          [name]: value,
          registrationNumber: regNumber
        }));
        return;
      }
      
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

  // Parameter Management
  const handleParameterChange = (index, field, value) => {
    const updatedParams = [...formData.parameterChanges];
    updatedParams[index] = { ...updatedParams[index], [field]: value };
    
    // Auto-update affected services for system parameters
    if (field === 'parameterType' && value === 'system-parameter') {
      updatedParams[index].affectedServices = ['System Core', 'Database Service'];
    }
    
    setFormData(prev => ({ ...prev, parameterChanges: updatedParams }));
  };

  const addParameter = () => {
    const newParam = {
      slNo: formData.parameterChanges.length + 1,
      parameterName: '',
      parameterPath: '',
      parameterType: 'system-parameter',
      currentValue: '',
      newValue: '',
      dataType: 'string',
      validationRule: '',
      defaultValue: '',
      description: '',
      impact: 'low',
      requiresRestart: false,
      affectedServices: []
    };
    setFormData(prev => ({
      ...prev,
      parameterChanges: [...prev.parameterChanges, newParam]
    }));
  };

  const removeParameter = (index) => {
    if (formData.parameterChanges.length > 1) {
      const updatedParams = formData.parameterChanges.filter((_, i) => i !== index);
      updatedParams.forEach((param, i) => {
        param.slNo = i + 1;
      });
      setFormData(prev => ({ ...prev, parameterChanges: updatedParams }));
    }
  };

  // Checklist Management
  const addChecklistItem = (listType) => {
    const newItem = `${listType === 'pre' ? 'Pre-change' : 'Post-change'} item ${formData[listType === 'pre' ? 'preChangeChecklist' : 'postChangeVerification'].length + 1}`;
    setFormData(prev => ({
      ...prev,
      [listType === 'pre' ? 'preChangeChecklist' : 'postChangeVerification']: [
        ...prev[listType === 'pre' ? 'preChangeChecklist' : 'postChangeVerification'],
        { item: newItem, completed: false, verifiedBy: '', timestamp: '' }
      ]
    }));
  };

  const updateChecklistItem = (listType, index, field, value) => {
    const listName = listType === 'pre' ? 'preChangeChecklist' : 'postChangeVerification';
    const updatedList = [...formData[listName]];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setFormData(prev => ({ ...prev, [listName]: updatedList }));
  };

  const handleSubmit = async (data) => {
    try {
      // Comprehensive validation
      const requiredFields = ['systemId', 'requestedBy', 'changeReason'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
      }
      
      // Validate parameter changes
      const invalidParams = data.parameterChanges.filter(param => !param.parameterName || !param.newValue);
      if (invalidParams.length > 0) {
        throw new Error('All parameter changes must have name and new value');
      }
      
      // Check backup requirement for high impact changes
      const highImpactParams = data.parameterChanges.filter(param => param.impact === 'high');
      if (highImpactParams.length > 0 && !data.backupTaken) {
        throw new Error('Backup is required for high impact parameter changes');
      }
      
      // Dispatch to Redux store (maintaining legacy action structure)
      dispatch(submitParameterRegisterSDC(data));
      
      // Success handling
      console.log('Parameter Register SDC submitted successfully:', data);
      
    } catch (error) {
      setErrors({ general: error.message });
      console.error('Form submission error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'pending': return 'warning';
      case 'approved': return 'info';
      case 'implemented': return 'success';
      case 'failed': return 'danger';
      case 'rolled-back': return 'dark';
      default: return 'secondary';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'critical': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <AFCSDCFormLayout
      title="Parameter Register - SDC"
      onSubmit={() => handleSubmit(formData)}
      category="system-management"
      showProgress={true}
      completionPercentage={Math.round(completionPercentage)}
    >
      {/* Status Alerts */}
      {errors.general && (
        <Alert variant="danger" className="mb-4">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errors.general}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-4">
          <i className="fas fa-check-circle me-2"></i>
          Parameter register updated successfully!
        </Alert>
      )}

      {/* Change Overview */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              <i className="fas fa-cogs me-2"></i>
              Parameter Change Overview
            </h6>
            <div>
              <Badge bg={getStatusColor(formData.changeStatus)} className="me-2">
                {formData.changeStatus.toUpperCase()}
              </Badge>
              <Badge bg={getImpactColor(formData.changeCategory)}>
                {formData.changeCategory.toUpperCase()}
              </Badge>
            </div>
          </div>
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
                type="text"
                name="registrationNumber"
                label="Registration Number"
                value={formData.registrationNumber}
                onChange={handleFieldChange}
                placeholder="Auto-generated"
                disabled
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="select"
                name="priorityLevel"
                label="Priority Level"
                value={formData.priorityLevel}
                onChange={handleFieldChange}
                options={[
                  { value: 'low', label: 'Low Priority' },
                  { value: 'normal', label: 'Normal Priority' },
                  { value: 'high', label: 'High Priority' },
                  { value: 'urgent', label: 'Urgent' },
                  { value: 'emergency', label: 'Emergency' }
                ]}
                required
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* System Information */}
      <Card className="mb-4">
        <Card.Header className="bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-server me-2"></i>
            Target System Information
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="systemId"
                label="System ID"
                value={formData.systemId}
                onChange={handleFieldChange}
                placeholder="e.g., SDC-SRV-001"
                error={errors.systemId}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="systemName"
                label="System Name"
                value={formData.systemName}
                onChange={handleFieldChange}
                placeholder="System descriptive name"
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="sdc-equipment-type"
                name="systemType"
                label="System Type"
                value={formData.systemType}
                onChange={handleFieldChange}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="sdc-location"
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleFieldChange}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="operatingSystem"
                label="Operating System"
                value={formData.operatingSystem}
                onChange={handleFieldChange}
                placeholder="e.g., Windows Server 2019"
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="softwareVersion"
                label="Software Version"
                value={formData.softwareVersion}
                onChange={handleFieldChange}
                placeholder="Current software version"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="select"
                name="changeReason"
                label="Change Reason"
                value={formData.changeReason}
                onChange={handleFieldChange}
                options={[
                  { value: 'configuration-update', label: 'Configuration Update' },
                  { value: 'performance-optimization', label: 'Performance Optimization' },
                  { value: 'security-enhancement', label: 'Security Enhancement' },
                  { value: 'bug-fix', label: 'Bug Fix' },
                  { value: 'feature-addition', label: 'Feature Addition' },
                  { value: 'compliance', label: 'Compliance Requirement' },
                  { value: 'maintenance', label: 'Routine Maintenance' }
                ]}
                required
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="select"
                name="changeCategory"
                label="Change Category"
                value={formData.changeCategory}
                onChange={handleFieldChange}
                options={[
                  { value: 'routine', label: 'Routine Change' },
                  { value: 'standard', label: 'Standard Change' },
                  { value: 'normal', label: 'Normal Change' },
                  { value: 'emergency', label: 'Emergency Change' }
                ]}
                required
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Parameter Changes */}
      <Card className="mb-4">
        <Card.Header className="bg-warning text-dark d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-sliders-h me-2"></i>
            Parameter Changes
          </h6>
          <Button variant="primary" size="sm" onClick={addParameter}>
            <i className="fas fa-plus me-1"></i>
            Add Parameter
          </Button>
        </Card.Header>
        <Card.Body>
          {formData.parameterChanges.map((param, index) => (
            <Card key={index} className="mb-3 border-start border-warning border-4">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="fw-bold me-3">Parameter #{param.slNo}</span>
                  <Badge bg={getImpactColor(param.impact)}>
                    {param.impact.toUpperCase()} IMPACT
                  </Badge>
                  {param.requiresRestart && (
                    <Badge bg="danger" className="ms-2">RESTART REQUIRED</Badge>
                  )}
                </div>
                {formData.parameterChanges.length > 1 && (
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeParameter(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                )}
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`parameterName-${index}`}
                      label="Parameter Name"
                      value={param.parameterName}
                      onChange={(e) => handleParameterChange(index, 'parameterName', e.target.value)}
                      placeholder="Parameter identifier"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`parameterPath-${index}`}
                      label="Parameter Path"
                      value={param.parameterPath}
                      onChange={(e) => handleParameterChange(index, 'parameterPath', e.target.value)}
                      placeholder="Configuration file path or registry location"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="parameter-management"
                      name={`parameterType-${index}`}
                      label="Parameter Type"
                      value={param.parameterType}
                      onChange={(e) => handleParameterChange(index, 'parameterType', e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`dataType-${index}`}
                      label="Data Type"
                      value={param.dataType}
                      onChange={(e) => handleParameterChange(index, 'dataType', e.target.value)}
                      options={[
                        { value: 'string', label: 'String' },
                        { value: 'integer', label: 'Integer' },
                        { value: 'boolean', label: 'Boolean' },
                        { value: 'float', label: 'Float' },
                        { value: 'array', label: 'Array' },
                        { value: 'object', label: 'Object' }
                      ]}
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`impact-${index}`}
                      label="Impact Level"
                      value={param.impact}
                      onChange={(e) => handleParameterChange(index, 'impact', e.target.value)}
                      options={[
                        { value: 'low', label: 'Low Impact' },
                        { value: 'medium', label: 'Medium Impact' },
                        { value: 'high', label: 'High Impact' },
                        { value: 'critical', label: 'Critical Impact' }
                      ]}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`currentValue-${index}`}
                      label="Current Value"
                      value={param.currentValue}
                      onChange={(e) => handleParameterChange(index, 'currentValue', e.target.value)}
                      placeholder="Existing value"
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`newValue-${index}`}
                      label="New Value"
                      value={param.newValue}
                      onChange={(e) => handleParameterChange(index, 'newValue', e.target.value)}
                      placeholder="New value to set"
                      required
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`defaultValue-${index}`}
                      label="Default Value"
                      value={param.defaultValue}
                      onChange={(e) => handleParameterChange(index, 'defaultValue', e.target.value)}
                      placeholder="System default value"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name={`description-${index}`}
                      label="Parameter Description"
                      value={param.description}
                      onChange={(e) => handleParameterChange(index, 'description', e.target.value)}
                      rows={2}
                      placeholder="Detailed description of parameter function and purpose"
                    />
                  </Col>
                  <Col md={4} className="d-flex align-items-center">
                    <UniversalAFCSDCFormField
                      type="checkbox"
                      name={`requiresRestart-${index}`}
                      label="Requires System Restart"
                      value={param.requiresRestart}
                      onChange={(e) => handleParameterChange(index, 'requiresRestart', e.target.checked)}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>

      {/* Impact Analysis */}
      <Card className="mb-4">
        <Card.Header className="bg-danger text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Impact Analysis & Risk Assessment
            </h6>
            <Button 
              variant="light" 
              size="sm" 
              onClick={() => setShowImpactModal(true)}
            >
              <i className="fas fa-search-plus me-1"></i>
              Detailed Analysis
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="impactAnalysis.systemImpact"
                label="System Impact"
                value={formData.impactAnalysis.systemImpact}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Impact on system performance, stability, and functionality"
                required
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="impactAnalysis.userImpact"
                label="User Impact"
                value={formData.impactAnalysis.userImpact}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Impact on end users and business operations"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="impactAnalysis.securityImplications"
                label="Security Implications"
                value={formData.impactAnalysis.securityImplications}
                onChange={handleFieldChange}
                rows={2}
                placeholder="Security considerations and potential vulnerabilities"
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="select"
                name="impactAnalysis.rollbackComplexity"
                label="Rollback Complexity"
                value={formData.impactAnalysis.rollbackComplexity}
                onChange={handleFieldChange}
                options={[
                  { value: 'simple', label: 'Simple - Quick reversal' },
                  { value: 'moderate', label: 'Moderate - Some effort required' },
                  { value: 'complex', label: 'Complex - Significant effort' },
                  { value: 'irreversible', label: 'Irreversible - Cannot be undone' }
                ]}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Authorization & Implementation */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white">
          <h6 className="mb-0">
            <i className="fas fa-shield-alt me-2"></i>
            Authorization & Implementation Details
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="requestedBy"
                label="Requested By"
                value={formData.requestedBy}
                onChange={handleFieldChange}
                error={errors.requestedBy}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="reviewedBy"
                label="Reviewed By"
                value={formData.reviewedBy}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="approvedBy"
                label="Approved By"
                value={formData.approvedBy}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="implementedBy"
                label="Implemented By"
                value={formData.implementedBy}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="date"
                name="implementationDate"
                label="Implementation Date"
                value={formData.implementationDate}
                onChange={handleFieldChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="time"
                name="implementationTime"
                label="Implementation Time"
                value={formData.implementationTime}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="scheduledDowntime"
                label="Scheduled Downtime"
                value={formData.scheduledDowntime}
                onChange={handleFieldChange}
                placeholder="e.g., 30 minutes"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="backupTaken"
                label="System Backup Completed"
                value={formData.backupTaken}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="testingRequired"
                label="Testing Required"
                value={formData.testingRequired}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="complianceCheck"
                label="Compliance Verified"
                value={formData.complianceCheck}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="remarks"
                label="Additional Remarks & Notes"
                value={formData.remarks}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Additional information, special considerations, or implementation notes"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Impact Analysis Modal */}
      <Modal show={showImpactModal} onHide={() => setShowImpactModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detailed Impact Analysis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="impactAnalysis.performanceImpact"
                label="Performance Impact"
                value={formData.impactAnalysis.performanceImpact}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Expected impact on system performance metrics"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="impactAnalysis.compatibilityIssues"
                label="Compatibility Issues"
                value={formData.impactAnalysis.compatibilityIssues}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Potential compatibility issues with other systems or components"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImpactModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </AFCSDCFormLayout>
  );
};

export default ParameterRegisterSDCForm;