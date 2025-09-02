/**
 * Agent Card Registers SDC Form
 * AFC-SDC Department - Card Management & Initialization
 * 
 * Original: ID: 82, Slug: agent-card-registers-sdc
 * Universal Component Architecture with 100% field preservation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';
import { agentCardRegistersValidation } from '../validation/afcSDCValidationSchemas';

// Redux action (maintaining exact legacy action)
const submitAgentCardRegistersSDC = (formData) => ({
  type: 'SUBMIT_AGENT_CARD_REGISTERS_SDC',
  payload: formData
});

const AgentCardRegistersSDCForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.agentCardRegistersSDC || {});

  // Form state with all original fields preserved exactly
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    shiftDetail: '',
    
    // Agent Card Issue Details (Core Fields)
    slNo: '',
    agentId: '',
    agentName: '',
    cardNumber: '',
    cardType: 'agent-id-card',
    issueDate: '',
    validFrom: '',
    validTo: '',
    issueReason: '',
    
    // Additional Card Information
    previousCardNumber: '',
    returnedCardCondition: '',
    securityDeposit: '',
    
    // Authorization Details
    issuedBy: '',
    authorizedBy: '',
    supervisorApproval: false,
    
    // Operational Details
    remarks: '',
    status: 'active',
    
    // Multiple Card Entries Support
    cardEntries: [
      {
        slNo: 1,
        agentId: '',
        agentName: '',
        cardNumber: '',
        cardType: 'agent-id-card',
        issueDate: '',
        validFrom: '',
        validTo: '',
        issueReason: 'new-issue',
        issuedBy: '',
        remarks: ''
      }
    ]
  });

  const [errors, setErrors] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate completion percentage
  useEffect(() => {
    const requiredFields = ['date', 'time', 'agentId', 'cardNumber', 'issueDate', 'issuedBy'];
    const completedFields = requiredFields.filter(field => formData[field]);
    setCompletionPercentage((completedFields.length / requiredFields.length) * 100);
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

  const handleCardEntryChange = (index, field, value) => {
    const updatedEntries = [...formData.cardEntries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setFormData(prev => ({ ...prev, cardEntries: updatedEntries }));
  };

  const addCardEntry = () => {
    const newEntry = {
      slNo: formData.cardEntries.length + 1,
      agentId: '',
      agentName: '',
      cardNumber: '',
      cardType: 'agent-id-card',
      issueDate: '',
      validFrom: '',
      validTo: '',
      issueReason: 'new-issue',
      issuedBy: '',
      remarks: ''
    };
    setFormData(prev => ({
      ...prev,
      cardEntries: [...prev.cardEntries, newEntry]
    }));
  };

  const removeCardEntry = (index) => {
    if (formData.cardEntries.length > 1) {
      const updatedEntries = formData.cardEntries.filter((_, i) => i !== index);
      // Renumber the remaining entries
      updatedEntries.forEach((entry, i) => {
        entry.slNo = i + 1;
      });
      setFormData(prev => ({ ...prev, cardEntries: updatedEntries }));
    }
  };

  const handleSubmit = async (data) => {
    try {
      // Validate form data
      await agentCardRegistersValidation.validate(data, { abortEarly: false });
      
      // Dispatch to Redux store (maintaining legacy action structure)
      dispatch(submitAgentCardRegistersSDC(data));
      
      // Success handling
      console.log('Agent Card Registers SDC submitted successfully:', data);
      
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
      title="Agent Card Registers SDC"
      onSubmit={() => handleSubmit(formData)}
      category="card-management"
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
          Agent Card Registers updated successfully!
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

      {/* Card Entry Management Section */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-credit-card me-2"></i>
            Agent Card Issue Details
          </h6>
          <Button 
            variant="light" 
            size="sm" 
            onClick={addCardEntry}
            className="text-success"
          >
            <i className="fas fa-plus me-1"></i>
            Add Card Entry
          </Button>
        </Card.Header>
        <Card.Body>
          {formData.cardEntries.map((entry, index) => (
            <Card key={index} className="mb-3 border-start border-success border-4">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <span className="fw-bold">Card Entry #{entry.slNo}</span>
                {formData.cardEntries.length > 1 && (
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeCardEntry(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                )}
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`agentId-${index}`}
                      label="Agent ID"
                      value={entry.agentId}
                      onChange={(e) => handleCardEntryChange(index, 'agentId', e.target.value)}
                      placeholder="Enter Agent ID"
                      required
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`agentName-${index}`}
                      label="Agent Name"
                      value={entry.agentName}
                      onChange={(e) => handleCardEntryChange(index, 'agentName', e.target.value)}
                      placeholder="Enter Agent Full Name"
                      required
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`cardNumber-${index}`}
                      label="Card Number"
                      value={entry.cardNumber}
                      onChange={(e) => handleCardEntryChange(index, 'cardNumber', e.target.value)}
                      placeholder="Enter Card Number"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="card-management"
                      name={`cardType-${index}`}
                      label="Card Type"
                      value={entry.cardType}
                      onChange={(e) => handleCardEntryChange(index, 'cardType', e.target.value)}
                      required
                    />
                  </Col>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name={`issueDate-${index}`}
                      label="Issue Date"
                      value={entry.issueDate}
                      onChange={(e) => handleCardEntryChange(index, 'issueDate', e.target.value)}
                      required
                    />
                  </Col>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name={`validFrom-${index}`}
                      label="Valid From"
                      value={entry.validFrom}
                      onChange={(e) => handleCardEntryChange(index, 'validFrom', e.target.value)}
                      required
                    />
                  </Col>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name={`validTo-${index}`}
                      label="Valid To"
                      value={entry.validTo}
                      onChange={(e) => handleCardEntryChange(index, 'validTo', e.target.value)}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`issueReason-${index}`}
                      label="Issue Reason"
                      value={entry.issueReason}
                      onChange={(e) => handleCardEntryChange(index, 'issueReason', e.target.value)}
                      options={[
                        { value: 'new-issue', label: 'New Issue' },
                        { value: 'replacement', label: 'Replacement' },
                        { value: 'renewal', label: 'Renewal' },
                        { value: 'temporary', label: 'Temporary Issue' }
                      ]}
                      required
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="employee-sdc"
                      name={`issuedBy-${index}`}
                      label="Issued By"
                      value={entry.issuedBy}
                      onChange={(e) => handleCardEntryChange(index, 'issuedBy', e.target.value)}
                      required
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name={`remarks-${index}`}
                      label="Remarks"
                      value={entry.remarks}
                      onChange={(e) => handleCardEntryChange(index, 'remarks', e.target.value)}
                      rows={2}
                      placeholder="Additional notes or comments"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>

      {/* Authorization Section */}
      <Card className="mb-4">
        <Card.Header className="bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-shield-alt me-2"></i>
            Authorization & Approval
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="authorizedBy"
                label="Authorized By"
                value={formData.authorizedBy}
                onChange={handleFieldChange}
                error={errors.authorizedBy}
                required
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="supervisorApproval"
                label="Supervisor Approval Required"
                value={formData.supervisorApproval}
                onChange={handleFieldChange}
                error={errors.supervisorApproval}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="remarks"
                label="General Remarks"
                value={formData.remarks}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Enter any additional remarks or special instructions"
                error={errors.remarks}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </AFCSDCFormLayout>
  );
};

export default AgentCardRegistersSDCForm;