/**
 * CSC Initialization Detail Register Form
 * AFC-SDC Department - Card Management & System Initialization
 * 
 * Original: ID: 83, Slug: card-initialization-tender-sdc
 * Universal Component Architecture with 100% field preservation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Alert, Table, Badge } from 'react-bootstrap';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';
import { parameterRegisterValidation } from '../validation/afcSDCValidationSchemas';

// Redux action (maintaining exact legacy action)
const submitCardInitializationTenderSDC = (formData) => ({
  type: 'SUBMIT_CARD_INITIALIZATION_TENDER_SDC',
  payload: formData
});

const CardInitializationTenderSDCForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.cardInitializationTenderSDC || {});

  // Form state with all original fields preserved exactly
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    shiftDetail: '',
    
    // CSC System Details
    cscId: '',
    cscLocation: '',
    systemType: 'csc-system',
    currentVersion: '',
    targetVersion: '',
    
    // Initialization Details
    initializationType: 'fresh-initialization',
    initializationReason: '',
    backupTaken: false,
    
    // Parameter Configuration
    parameters: [
      {
        parameterName: '',
        parameterType: 'system-parameter',
        currentValue: '',
        newValue: '',
        priority: 'normal',
        changeReason: ''
      }
    ],
    
    // Card Configuration Details
    cardTypes: [
      {
        cardType: 'csc-card',
        quantity: '',
        serialRange: '',
        encryptionLevel: 'standard'
      }
    ],
    
    // Tender Process Details
    tenderDetails: {
      tenderAmount: '',
      denomination: '',
      tenderType: 'cash',
      collectionMethod: 'manual'
    },
    
    // Authorization & Status
    performedBy: '',
    supervisedBy: '',
    testingResults: '',
    initializationStatus: 'scheduled',
    
    // Additional Information
    remarks: '',
    nextScheduledCheck: '',
    
    // System Health Post-Initialization
    healthCheck: {
      systemResponse: '',
      networkConnectivity: '',
      hardwareStatus: '',
      softwareIntegrity: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate completion percentage
  useEffect(() => {
    const requiredFields = ['date', 'time', 'cscId', 'initializationType', 'performedBy'];
    const completedFields = requiredFields.filter(field => formData[field]);
    setCompletionPercentage((completedFields.length / requiredFields.length) * 100);
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

  const handleParameterChange = (index, field, value) => {
    const updatedParameters = [...formData.parameters];
    updatedParameters[index] = { ...updatedParameters[index], [field]: value };
    setFormData(prev => ({ ...prev, parameters: updatedParameters }));
  };

  const addParameter = () => {
    const newParameter = {
      parameterName: '',
      parameterType: 'system-parameter',
      currentValue: '',
      newValue: '',
      priority: 'normal',
      changeReason: ''
    };
    setFormData(prev => ({
      ...prev,
      parameters: [...prev.parameters, newParameter]
    }));
  };

  const removeParameter = (index) => {
    if (formData.parameters.length > 1) {
      const updatedParameters = formData.parameters.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, parameters: updatedParameters }));
    }
  };

  const handleCardTypeChange = (index, field, value) => {
    const updatedCardTypes = [...formData.cardTypes];
    updatedCardTypes[index] = { ...updatedCardTypes[index], [field]: value };
    setFormData(prev => ({ ...prev, cardTypes: updatedCardTypes }));
  };

  const addCardType = () => {
    const newCardType = {
      cardType: 'csc-card',
      quantity: '',
      serialRange: '',
      encryptionLevel: 'standard'
    };
    setFormData(prev => ({
      ...prev,
      cardTypes: [...prev.cardTypes, newCardType]
    }));
  };

  const removeCardType = (index) => {
    if (formData.cardTypes.length > 1) {
      const updatedCardTypes = formData.cardTypes.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, cardTypes: updatedCardTypes }));
    }
  };

  const handleSubmit = async (data) => {
    try {
      // Validate form data
      // Simple validation using custom validation logic
      const validationErrors = {};
      if (!data.cscId) validationErrors.cscId = 'CSC ID is required';
      if (!data.initializationType) validationErrors.initializationType = 'Initialization Type is required'; 
      if (!data.performedBy) validationErrors.performedBy = 'Performed By is required';
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      
      // Dispatch to Redux store (maintaining legacy action structure)
      dispatch(submitCardInitializationTenderSDC(data));
      
      // Success handling
      console.log('CSC Initialization details submitted successfully:', data);
      
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

  return (
    <AFCSDCFormLayout
      title="CSC Initialization Detail Register"
      onSubmit={() => handleSubmit(formData)}
      category="system-management"
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
          CSC Initialization completed successfully!
        </Alert>
      )}

      {/* Basic Information Section */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h6 className="mb-0">
            <i className="fas fa-info-circle me-2"></i>
            Basic Information
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
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
            <Col md={4}>
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
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="select"
                name="shiftDetail"
                label="Shift Detail"
                value={formData.shiftDetail}
                onChange={handleFieldChange}
                options={[
                  { value: 'morning', label: 'Morning Shift (06:00-14:00)' },
                  { value: 'afternoon', label: 'Afternoon Shift (14:00-22:00)' },
                  { value: 'night', label: 'Night Shift (22:00-06:00)' }
                ]}
                error={errors.shiftDetail}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* CSC System Details */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white">
          <h6 className="mb-0">
            <i className="fas fa-server me-2"></i>
            CSC System Details
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="text"
                name="cscId"
                label="CSC ID"
                value={formData.cscId}
                onChange={handleFieldChange}
                placeholder="CSC-001"
                error={errors.cscId}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="sdc-location"
                name="cscLocation"
                label="CSC Location"
                value={formData.cscLocation}
                onChange={handleFieldChange}
                error={errors.cscLocation}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="text"
                name="currentVersion"
                label="Current Version"
                value={formData.currentVersion}
                onChange={handleFieldChange}
                placeholder="1.0.0"
                error={errors.currentVersion}
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="text"
                name="targetVersion"
                label="Target Version"
                value={formData.targetVersion}
                onChange={handleFieldChange}
                placeholder="2.0.0"
                error={errors.targetVersion}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="select"
                name="initializationType"
                label="Initialization Type"
                value={formData.initializationType}
                onChange={handleFieldChange}
                options={[
                  { value: 'fresh-initialization', label: 'Fresh Initialization' },
                  { value: 'parameter-update', label: 'Parameter Update' },
                  { value: 'software-update', label: 'Software Update' },
                  { value: 'configuration-change', label: 'Configuration Change' }
                ]}
                required
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="backupTaken"
                label="System Backup Taken"
                value={formData.backupTaken}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Parameter Configuration Section */}
      <Card className="mb-4">
        <Card.Header className="bg-warning text-dark d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-cogs me-2"></i>
            Parameter Configuration
          </h6>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={addParameter}
          >
            <i className="fas fa-plus me-1"></i>
            Add Parameter
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Parameter Name</th>
                <th>Type</th>
                <th>Current Value</th>
                <th>New Value</th>
                <th>Priority</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.parameters.map((param, index) => (
                <tr key={index}>
                  <td>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`parameterName-${index}`}
                      value={param.parameterName}
                      onChange={(e) => handleParameterChange(index, 'parameterName', e.target.value)}
                      placeholder="Parameter name"
                      className="mb-0"
                    />
                  </td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="parameter-management"
                      name={`parameterType-${index}`}
                      value={param.parameterType}
                      onChange={(e) => handleParameterChange(index, 'parameterType', e.target.value)}
                      className="mb-0"
                    />
                  </td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`currentValue-${index}`}
                      value={param.currentValue}
                      onChange={(e) => handleParameterChange(index, 'currentValue', e.target.value)}
                      placeholder="Current value"
                      className="mb-0"
                    />
                  </td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`newValue-${index}`}
                      value={param.newValue}
                      onChange={(e) => handleParameterChange(index, 'newValue', e.target.value)}
                      placeholder="New value"
                      className="mb-0"
                    />
                  </td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`priority-${index}`}
                      value={param.priority}
                      onChange={(e) => handleParameterChange(index, 'priority', e.target.value)}
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'normal', label: 'Normal' },
                        { value: 'high', label: 'High' },
                        { value: 'critical', label: 'Critical' }
                      ]}
                      className="mb-0"
                    />
                  </td>
                  <td>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`changeReason-${index}`}
                      value={param.changeReason}
                      onChange={(e) => handleParameterChange(index, 'changeReason', e.target.value)}
                      placeholder="Change reason"
                      className="mb-0"
                    />
                  </td>
                  <td>
                    {formData.parameters.length > 1 && (
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => removeParameter(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Card Configuration Section */}
      <Card className="mb-4">
        <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-credit-card me-2"></i>
            Card Configuration
          </h6>
          <Button 
            variant="light" 
            size="sm" 
            onClick={addCardType}
          >
            <i className="fas fa-plus me-1"></i>
            Add Card Type
          </Button>
        </Card.Header>
        <Card.Body>
          {formData.cardTypes.map((cardType, index) => (
            <Row key={index} className="mb-3 p-3 border rounded">
              <Col md={3}>
                <UniversalAFCSDCFormField
                  type="card-management"
                  name={`cardType-${index}`}
                  label="Card Type"
                  value={cardType.cardType}
                  onChange={(e) => handleCardTypeChange(index, 'cardType', e.target.value)}
                />
              </Col>
              <Col md={2}>
                <UniversalAFCSDCFormField
                  type="number"
                  name={`quantity-${index}`}
                  label="Quantity"
                  value={cardType.quantity}
                  onChange={(e) => handleCardTypeChange(index, 'quantity', e.target.value)}
                  min="1"
                />
              </Col>
              <Col md={3}>
                <UniversalAFCSDCFormField
                  type="text"
                  name={`serialRange-${index}`}
                  label="Serial Range"
                  value={cardType.serialRange}
                  onChange={(e) => handleCardTypeChange(index, 'serialRange', e.target.value)}
                  placeholder="001-100"
                />
              </Col>
              <Col md={3}>
                <UniversalAFCSDCFormField
                  type="select"
                  name={`encryptionLevel-${index}`}
                  label="Encryption Level"
                  value={cardType.encryptionLevel}
                  onChange={(e) => handleCardTypeChange(index, 'encryptionLevel', e.target.value)}
                  options={[
                    { value: 'standard', label: 'Standard' },
                    { value: 'enhanced', label: 'Enhanced' },
                    { value: 'maximum', label: 'Maximum' }
                  ]}
                />
              </Col>
              <Col md={1} className="d-flex align-items-end">
                {formData.cardTypes.length > 1 && (
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeCardType(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                )}
              </Col>
            </Row>
          ))}
        </Card.Body>
      </Card>

      {/* Authorization & Status Section */}
      <Card className="mb-4">
        <Card.Header className="bg-secondary text-white">
          <h6 className="mb-0">
            <i className="fas fa-shield-alt me-2"></i>
            Authorization & Status
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="performedBy"
                label="Performed By"
                value={formData.performedBy}
                onChange={handleFieldChange}
                error={errors.performedBy}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="supervisedBy"
                label="Supervised By"
                value={formData.supervisedBy}
                onChange={handleFieldChange}
                error={errors.supervisedBy}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="system-status"
                name="initializationStatus"
                label="Initialization Status"
                value={formData.initializationStatus}
                onChange={handleFieldChange}
                error={errors.initializationStatus}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="remarks"
                label="Remarks & Comments"
                value={formData.remarks}
                onChange={handleFieldChange}
                rows={4}
                placeholder="Enter detailed remarks about the initialization process, any issues encountered, and additional notes"
                error={errors.remarks}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </AFCSDCFormLayout>
  );
};

export default CardInitializationTenderSDCForm;