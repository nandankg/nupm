/**
 * Software Update Register SDC Form
 * AFC-SDC Department - System Management & Software Updates
 * 
 * Original: ID: 93, Slug: sw-update-register-sdc
 * Universal Component Architecture with 100% field preservation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Alert, Table, Badge, ProgressBar, Modal } from 'react-bootstrap';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

// Redux action (maintaining exact legacy action)
const submitSwUpdateRegisterSDC = (formData) => ({
  type: 'SUBMIT_SW_UPDATE_REGISTER_SDC',
  payload: formData
});

const SwUpdateRegisterSDCForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.swUpdateRegisterSDC || {});

  // Form state with all original fields preserved exactly
  const [formData, setFormData] = useState({
    // Basic Information
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    updateId: '',
    
    // Target System Information
    targetSystem: '',
    systemLocation: '',
    equipmentId: '',
    currentOsVersion: '',
    targetOsVersion: '',
    
    // Software Update Details
    updateType: 'device-application',
    updateCategory: 'routine',
    updatePriority: 'normal',
    updateScope: 'single-system',
    
    // Software Package Information
    softwarePackages: [
      {
        slNo: 1,
        packageName: '',
        packageType: 'application',
        currentVersion: '',
        targetVersion: '',
        packageSize: '',
        installLocation: '',
        dependencies: [],
        criticality: 'normal',
        vendor: '',
        licenseType: 'commercial',
        supportStatus: 'supported'
      }
    ],
    
    // Update Planning
    planningPhase: {
      updateReason: '',
      businessJustification: '',
      technicalRequirements: '',
      compatibilityCheck: false,
      riskAssessment: '',
      rollbackPlan: '',
      testingPlan: '',
      communicationPlan: ''
    },
    
    // Pre-Update Preparation
    preparation: {
      backupCompleted: false,
      backupLocation: '',
      backupVerified: false,
      systemHealthCheck: false,
      dependencyAnalysis: '',
      resourceRequirements: '',
      downtime: '',
      maintenanceWindow: ''
    },
    
    // Installation Process
    installation: {
      installationDate: '',
      installationTime: '',
      installedBy: '',
      installationMethod: 'manual',
      installationDuration: '',
      installationStatus: 'not-started',
      installationNotes: '',
      issuesEncountered: []
    },
    
    // Testing & Verification
    testing: {
      functionalTesting: false,
      performanceTesting: false,
      securityTesting: false,
      integrationTesting: false,
      testResults: '',
      testingCompletedBy: '',
      testingDate: '',
      acceptanceCriteria: '',
      testingNotes: ''
    },
    
    // Post-Update Status
    postUpdate: {
      systemStability: 'stable',
      performanceImpact: 'no-impact',
      userImpact: 'minimal',
      monitoringPeriod: '7',
      monitoringResults: '',
      optimizationRequired: false,
      followUpActions: []
    },
    
    // Rollback Information
    rollback: {
      rollbackRequired: false,
      rollbackReason: '',
      rollbackDate: '',
      rollbackTime: '',
      rollbackCompletedBy: '',
      rollbackSuccess: false,
      lessonsLearned: ''
    },
    
    // Authorization Chain
    requestedBy: '',
    reviewedBy: '',
    approvedBy: '',
    implementedBy: '',
    verifiedBy: '',
    
    // Documentation
    updateDocumentation: '',
    configurationChanges: '',
    userManualUpdated: false,
    trainingRequired: false,
    
    // Compliance & Standards
    complianceVerified: false,
    securityApproved: false,
    changeManagementFollowed: true,
    
    // Overall Status
    overallStatus: 'planned',
    completionPercentage: 0,
    
    // Additional Information
    remarks: '',
    lessonsLearned: '',
    improvementSuggestions: '',
    
    // Audit Trail
    auditLog: []
  });

  const [errors, setErrors] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('planning');
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate completion percentage based on completed phases
  useEffect(() => {
    const phases = [
      formData.planningPhase.updateReason ? 20 : 0,
      formData.preparation.backupCompleted ? 20 : 0,
      formData.installation.installationStatus !== 'not-started' ? 30 : 0,
      formData.testing.functionalTesting ? 20 : 0,
      formData.postUpdate.systemStability === 'stable' ? 10 : 0
    ];
    const totalCompletion = phases.reduce((a, b) => a + b, 0);
    setCompletionPercentage(totalCompletion);
    
    // Update form completion percentage
    setFormData(prev => ({ ...prev, completionPercentage: totalCompletion }));
  }, [formData]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested object updates
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      // Auto-generate update ID
      if (name === 'date' && !formData.updateId) {
        const dateStr = value.replace(/-/g, '');
        const updateId = `SW-UPD-${dateStr}`;
        setFormData(prev => ({
          ...prev,
          [name]: value,
          updateId: updateId
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

  // Software Package Management
  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...formData.softwarePackages];
    updatedPackages[index] = { ...updatedPackages[index], [field]: value };
    setFormData(prev => ({ ...prev, softwarePackages: updatedPackages }));
  };

  const addPackage = () => {
    const newPackage = {
      slNo: formData.softwarePackages.length + 1,
      packageName: '',
      packageType: 'application',
      currentVersion: '',
      targetVersion: '',
      packageSize: '',
      installLocation: '',
      dependencies: [],
      criticality: 'normal',
      vendor: '',
      licenseType: 'commercial',
      supportStatus: 'supported'
    };
    setFormData(prev => ({
      ...prev,
      softwarePackages: [...prev.softwarePackages, newPackage]
    }));
  };

  const removePackage = (index) => {
    if (formData.softwarePackages.length > 1) {
      const updatedPackages = formData.softwarePackages.filter((_, i) => i !== index);
      updatedPackages.forEach((pkg, i) => {
        pkg.slNo = i + 1;
      });
      setFormData(prev => ({ ...prev, softwarePackages: updatedPackages }));
    }
  };

  // Issue Management for Installation
  const addIssue = () => {
    const newIssue = `Issue ${formData.installation.issuesEncountered.length + 1}`;
    setFormData(prev => ({
      ...prev,
      installation: {
        ...prev.installation,
        issuesEncountered: [...prev.installation.issuesEncountered, {
          issue: newIssue,
          severity: 'medium',
          resolution: '',
          resolvedBy: '',
          resolutionTime: ''
        }]
      }
    }));
  };

  const updateIssue = (index, field, value) => {
    const updatedIssues = [...formData.installation.issuesEncountered];
    updatedIssues[index] = { ...updatedIssues[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      installation: {
        ...prev.installation,
        issuesEncountered: updatedIssues
      }
    }));
  };

  const handleSubmit = async (data) => {
    try {
      // Comprehensive validation
      const requiredFields = ['targetSystem', 'updateType', 'requestedBy'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
      }
      
      // Validate software packages
      const invalidPackages = data.softwarePackages.filter(pkg => !pkg.packageName || !pkg.targetVersion);
      if (invalidPackages.length > 0) {
        throw new Error('All software packages must have name and target version');
      }
      
      // Check backup requirement for critical updates
      const criticalPackages = data.softwarePackages.filter(pkg => pkg.criticality === 'critical');
      if (criticalPackages.length > 0 && !data.preparation.backupCompleted) {
        throw new Error('Backup is required for critical software updates');
      }
      
      // Dispatch to Redux store (maintaining legacy action structure)
      dispatch(submitSwUpdateRegisterSDC(data));
      
      // Success handling
      console.log('Software Update Register SDC submitted successfully:', data);
      
    } catch (error) {
      setErrors({ general: error.message });
      console.error('Form submission error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planned': return 'info';
      case 'in-progress': return 'warning';
      case 'completed': return 'success';
      case 'failed': return 'danger';
      case 'rolled-back': return 'dark';
      case 'on-hold': return 'secondary';
      default: return 'secondary';
    }
  };

  const getCriticalityColor = (criticality) => {
    switch (criticality) {
      case 'critical': return 'danger';
      case 'high': return 'warning';
      case 'normal': return 'info';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const renderModalContent = () => {
    switch (activeModalTab) {
      case 'planning':
        return (
          <div>
            <h6>Planning Phase Details</h6>
            <Row>
              <Col md={12}>
                <UniversalAFCSDCFormField
                  type="textarea"
                  name="planningPhase.updateReason"
                  label="Update Reason"
                  value={formData.planningPhase.updateReason}
                  onChange={handleFieldChange}
                  rows={3}
                  placeholder="Detailed reason for this software update"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <UniversalAFCSDCFormField
                  type="textarea"
                  name="planningPhase.businessJustification"
                  label="Business Justification"
                  value={formData.planningPhase.businessJustification}
                  onChange={handleFieldChange}
                  rows={3}
                />
              </Col>
              <Col md={6}>
                <UniversalAFCSDCFormField
                  type="textarea"
                  name="planningPhase.riskAssessment"
                  label="Risk Assessment"
                  value={formData.planningPhase.riskAssessment}
                  onChange={handleFieldChange}
                  rows={3}
                />
              </Col>
            </Row>
          </div>
        );
      case 'preparation':
        return (
          <div>
            <h6>Pre-Update Preparation</h6>
            <Row>
              <Col md={4}>
                <UniversalAFCSDCFormField
                  type="checkbox"
                  name="preparation.backupCompleted"
                  label="Backup Completed"
                  value={formData.preparation.backupCompleted}
                  onChange={handleFieldChange}
                />
              </Col>
              <Col md={4}>
                <UniversalAFCSDCFormField
                  type="checkbox"
                  name="preparation.backupVerified"
                  label="Backup Verified"
                  value={formData.preparation.backupVerified}
                  onChange={handleFieldChange}
                />
              </Col>
              <Col md={4}>
                <UniversalAFCSDCFormField
                  type="checkbox"
                  name="preparation.systemHealthCheck"
                  label="System Health Check"
                  value={formData.preparation.systemHealthCheck}
                  onChange={handleFieldChange}
                />
              </Col>
            </Row>
          </div>
        );
      case 'testing':
        return (
          <div>
            <h6>Testing & Verification</h6>
            <Row>
              <Col md={3}>
                <UniversalAFCSDCFormField
                  type="checkbox"
                  name="testing.functionalTesting"
                  label="Functional Testing"
                  value={formData.testing.functionalTesting}
                  onChange={handleFieldChange}
                />
              </Col>
              <Col md={3}>
                <UniversalAFCSDCFormField
                  type="checkbox"
                  name="testing.performanceTesting"
                  label="Performance Testing"
                  value={formData.testing.performanceTesting}
                  onChange={handleFieldChange}
                />
              </Col>
              <Col md={3}>
                <UniversalAFCSDCFormField
                  type="checkbox"
                  name="testing.securityTesting"
                  label="Security Testing"
                  value={formData.testing.securityTesting}
                  onChange={handleFieldChange}
                />
              </Col>
              <Col md={3}>
                <UniversalAFCSDCFormField
                  type="checkbox"
                  name="testing.integrationTesting"
                  label="Integration Testing"
                  value={formData.testing.integrationTesting}
                  onChange={handleFieldChange}
                />
              </Col>
            </Row>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AFCSDCFormLayout
      title="Software Update Register - SDC"
      onSubmit={() => handleSubmit(formData)}
      category="system-management"
      showProgress={true}
      completionPercentage={completionPercentage}
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
          Software update register updated successfully!
        </Alert>
      )}

      {/* Update Overview */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              <i className="fas fa-download me-2"></i>
              Software Update Overview
            </h6>
            <div>
              <Badge bg={getStatusColor(formData.overallStatus)} className="me-2">
                {formData.overallStatus.toUpperCase()}
              </Badge>
              <Badge bg="info">
                {completionPercentage}% COMPLETE
              </Badge>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <ProgressBar 
              now={completionPercentage} 
              variant={completionPercentage === 100 ? 'success' : 'info'}
              style={{ height: '10px' }}
              label={`${completionPercentage}%`}
            />
          </div>
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
                name="updateId"
                label="Update ID"
                value={formData.updateId}
                onChange={handleFieldChange}
                placeholder="Auto-generated"
                disabled
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="select"
                name="updatePriority"
                label="Priority"
                value={formData.updatePriority}
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

      {/* Target System Information */}
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
                type="sdc-equipment-type"
                name="targetSystem"
                label="Target System"
                value={formData.targetSystem}
                onChange={handleFieldChange}
                error={errors.targetSystem}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="sdc-location"
                name="systemLocation"
                label="System Location"
                value={formData.systemLocation}
                onChange={handleFieldChange}
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
                placeholder="System identifier"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="software-update"
                name="updateType"
                label="Update Type"
                value={formData.updateType}
                onChange={handleFieldChange}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="select"
                name="updateCategory"
                label="Update Category"
                value={formData.updateCategory}
                onChange={handleFieldChange}
                options={[
                  { value: 'routine', label: 'Routine Update' },
                  { value: 'security', label: 'Security Update' },
                  { value: 'critical', label: 'Critical Update' },
                  { value: 'feature', label: 'Feature Update' },
                  { value: 'bugfix', label: 'Bug Fix Update' }
                ]}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="select"
                name="updateScope"
                label="Update Scope"
                value={formData.updateScope}
                onChange={handleFieldChange}
                options={[
                  { value: 'single-system', label: 'Single System' },
                  { value: 'multiple-systems', label: 'Multiple Systems' },
                  { value: 'department-wide', label: 'Department Wide' },
                  { value: 'organization-wide', label: 'Organization Wide' }
                ]}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Software Packages */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-box me-2"></i>
            Software Packages
          </h6>
          <div>
            <Button 
              variant="light" 
              size="sm" 
              className="me-2"
              onClick={() => setShowDetailsModal(true)}
            >
              <i className="fas fa-info-circle me-1"></i>
              Details
            </Button>
            <Button variant="light" size="sm" onClick={addPackage}>
              <i className="fas fa-plus me-1"></i>
              Add Package
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {formData.softwarePackages.map((pkg, index) => (
            <Card key={index} className="mb-3 border-start border-success border-4">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="fw-bold me-3">Package #{pkg.slNo}</span>
                  <Badge bg={getCriticalityColor(pkg.criticality)}>
                    {pkg.criticality.toUpperCase()}
                  </Badge>
                  <Badge bg="info" className="ms-2">
                    {pkg.packageType.toUpperCase()}
                  </Badge>
                </div>
                {formData.softwarePackages.length > 1 && (
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removePackage(index)}
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
                      name={`packageName-${index}`}
                      label="Package Name"
                      value={pkg.packageName}
                      onChange={(e) => handlePackageChange(index, 'packageName', e.target.value)}
                      placeholder="Software package name"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`packageType-${index}`}
                      label="Package Type"
                      value={pkg.packageType}
                      onChange={(e) => handlePackageChange(index, 'packageType', e.target.value)}
                      options={[
                        { value: 'application', label: 'Application' },
                        { value: 'system', label: 'System Software' },
                        { value: 'driver', label: 'Driver' },
                        { value: 'firmware', label: 'Firmware' },
                        { value: 'os-update', label: 'OS Update' },
                        { value: 'security-patch', label: 'Security Patch' }
                      ]}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`currentVersion-${index}`}
                      label="Current Version"
                      value={pkg.currentVersion}
                      onChange={(e) => handlePackageChange(index, 'currentVersion', e.target.value)}
                      placeholder="e.g., 1.0.0"
                    />
                  </Col>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`targetVersion-${index}`}
                      label="Target Version"
                      value={pkg.targetVersion}
                      onChange={(e) => handlePackageChange(index, 'targetVersion', e.target.value)}
                      placeholder="e.g., 2.0.0"
                      required
                    />
                  </Col>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`packageSize-${index}`}
                      label="Package Size"
                      value={pkg.packageSize}
                      onChange={(e) => handlePackageChange(index, 'packageSize', e.target.value)}
                      placeholder="e.g., 150 MB"
                    />
                  </Col>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`criticality-${index}`}
                      label="Criticality"
                      value={pkg.criticality}
                      onChange={(e) => handlePackageChange(index, 'criticality', e.target.value)}
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'normal', label: 'Normal' },
                        { value: 'high', label: 'High' },
                        { value: 'critical', label: 'Critical' }
                      ]}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`vendor-${index}`}
                      label="Vendor"
                      value={pkg.vendor}
                      onChange={(e) => handlePackageChange(index, 'vendor', e.target.value)}
                      placeholder="Software vendor"
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`licenseType-${index}`}
                      label="License Type"
                      value={pkg.licenseType}
                      onChange={(e) => handlePackageChange(index, 'licenseType', e.target.value)}
                      options={[
                        { value: 'commercial', label: 'Commercial' },
                        { value: 'open-source', label: 'Open Source' },
                        { value: 'proprietary', label: 'Proprietary' },
                        { value: 'freeware', label: 'Freeware' }
                      ]}
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`supportStatus-${index}`}
                      label="Support Status"
                      value={pkg.supportStatus}
                      onChange={(e) => handlePackageChange(index, 'supportStatus', e.target.value)}
                      options={[
                        { value: 'supported', label: 'Supported' },
                        { value: 'extended-support', label: 'Extended Support' },
                        { value: 'end-of-life', label: 'End of Life' },
                        { value: 'deprecated', label: 'Deprecated' }
                      ]}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>

      {/* Installation Status */}
      <Card className="mb-4">
        <Card.Header className="bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-cog me-2"></i>
            Installation & Implementation Status
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="date"
                name="installation.installationDate"
                label="Installation Date"
                value={formData.installation.installationDate}
                onChange={handleFieldChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="time"
                name="installation.installationTime"
                label="Installation Time"
                value={formData.installation.installationTime}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="select"
                name="installation.installationStatus"
                label="Installation Status"
                value={formData.installation.installationStatus}
                onChange={handleFieldChange}
                options={[
                  { value: 'not-started', label: 'Not Started' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'failed', label: 'Failed' },
                  { value: 'on-hold', label: 'On Hold' }
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="installation.installedBy"
                label="Installed By"
                value={formData.installation.installedBy}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="select"
                name="installation.installationMethod"
                label="Installation Method"
                value={formData.installation.installationMethod}
                onChange={handleFieldChange}
                options={[
                  { value: 'manual', label: 'Manual Installation' },
                  { value: 'automated', label: 'Automated Installation' },
                  { value: 'remote', label: 'Remote Installation' },
                  { value: 'batch', label: 'Batch Installation' }
                ]}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="installation.installationDuration"
                label="Installation Duration"
                value={formData.installation.installationDuration}
                onChange={handleFieldChange}
                placeholder="e.g., 2 hours"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Authorization & Final Status */}
      <Card className="mb-4">
        <Card.Header className="bg-secondary text-white">
          <h6 className="mb-0">
            <i className="fas fa-shield-alt me-2"></i>
            Authorization & Final Status
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
                name="verifiedBy"
                label="Verified By"
                value={formData.verifiedBy}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="complianceVerified"
                label="Compliance Verified"
                value={formData.complianceVerified}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="securityApproved"
                label="Security Approved"
                value={formData.securityApproved}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="userManualUpdated"
                label="User Manual Updated"
                value={formData.userManualUpdated}
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

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Software Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <Button 
              variant={activeModalTab === 'planning' ? 'primary' : 'outline-primary'}
              size="sm"
              className="me-2"
              onClick={() => setActiveModalTab('planning')}
            >
              Planning
            </Button>
            <Button 
              variant={activeModalTab === 'preparation' ? 'primary' : 'outline-primary'}
              size="sm"
              className="me-2"
              onClick={() => setActiveModalTab('preparation')}
            >
              Preparation
            </Button>
            <Button 
              variant={activeModalTab === 'testing' ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setActiveModalTab('testing')}
            >
              Testing
            </Button>
          </div>
          {renderModalContent()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </AFCSDCFormLayout>
  );
};

export default SwUpdateRegisterSDCForm;