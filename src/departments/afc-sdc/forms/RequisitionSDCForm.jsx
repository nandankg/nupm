/**
 * Requisition SDC Form
 * AFC-SDC Department - Administrative Core & Resource Management
 * 
 * Original: ID: 90, Slug: requisition-sdc
 * Universal Component Architecture with 100% field preservation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Alert, Table, Badge, ProgressBar } from 'react-bootstrap';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

// Redux action (maintaining exact legacy action)
const submitRequisitionSDC = (formData) => ({
  type: 'SUBMIT_REQUISITION_SDC',
  payload: formData
});

const RequisitionSDCForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.requisitionSDC || {});

  // Form state with all original fields preserved exactly
  const [formData, setFormData] = useState({
    // Basic Information
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    requisitionNumber: '',
    
    // Requesting Department Details
    requestingDepartment: 'AFC-SDC',
    requestingSection: '',
    requestedBy: '',
    requestedByDesignation: '',
    contactNumber: '',
    emailId: '',
    
    // Requisition Details
    requisitionType: 'equipment',
    priority: 'normal',
    urgencyLevel: 'normal',
    requisitionPurpose: '',
    projectReference: '',
    budgetCode: '',
    
    // Delivery Information
    deliveryLocation: '',
    deliveryDate: '',
    deliveryInstructions: '',
    
    // Item Details
    itemDetails: [
      {
        slNo: 1,
        itemName: '',
        itemCode: '',
        itemCategory: 'equipment',
        description: '',
        specification: '',
        quantity: 1,
        unit: 'nos',
        estimatedPrice: '',
        totalEstimate: '',
        supplier: '',
        model: '',
        brand: '',
        urgency: 'normal'
      }
    ],
    
    // Technical Specifications
    technicalSpecs: '',
    qualityRequirements: '',
    complianceRequirements: '',
    
    // Justification
    businessJustification: '',
    technicalJustification: '',
    alternatives: '',
    
    // Budget Information
    budgetAllocated: '',
    estimatedTotal: '',
    currencyType: 'INR',
    taxImplications: '',
    
    // Vendor Information
    preferredVendors: [],
    vendorRequirements: '',
    
    // Approval Workflow
    requestApprovalLevel: 'department',
    approvalChain: [
      { level: 'supervisor', approvedBy: '', status: 'pending', date: '', remarks: '' },
      { level: 'department_head', approvedBy: '', status: 'pending', date: '', remarks: '' },
      { level: 'finance', approvedBy: '', status: 'pending', date: '', remarks: '' }
    ],
    
    // Status Tracking
    requisitionStatus: 'draft',
    currentStage: 'preparation',
    
    // Supporting Documents
    supportingDocuments: [],
    attachments: [],
    
    // Follow-up Information
    expectedApprovalDate: '',
    followUpRequired: false,
    followUpDate: '',
    
    // Comments & Remarks
    remarks: '',
    internalNotes: '',
    
    // Quality Control
    qualityCheck: false,
    standardCompliance: false,
    safetyRequirements: '',
    
    // Additional Information
    alternativeOptions: '',
    futureRequirements: '',
    maintenanceRequirements: ''
  });

  const [errors, setErrors] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate completion percentage
  useEffect(() => {
    const requiredSections = [
      formData.requestedBy ? 1 : 0,
      formData.requisitionPurpose ? 1 : 0,
      formData.itemDetails.filter(item => item.itemName && item.quantity).length > 0 ? 1 : 0,
      formData.businessJustification ? 1 : 0,
      formData.deliveryLocation ? 1 : 0
    ];
    const completed = requiredSections.reduce((a, b) => a + b, 0);
    setCompletionPercentage((completed / 5) * 100);
  }, [formData]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-generate requisition number
    if (name === 'date' && !formData.requisitionNumber) {
      const dateStr = value.replace(/-/g, '');
      const reqNumber = `REQ-SDC-${dateStr}`;
      setFormData(prev => ({
        ...prev,
        [name]: value,
        requisitionNumber: reqNumber
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Item Management
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.itemDetails];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Auto-calculate total estimate
    if (field === 'quantity' || field === 'estimatedPrice') {
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : parseFloat(updatedItems[index].quantity) || 0;
      const price = field === 'estimatedPrice' ? parseFloat(value) || 0 : parseFloat(updatedItems[index].estimatedPrice) || 0;
      updatedItems[index].totalEstimate = (quantity * price).toFixed(2);
    }
    
    setFormData(prev => ({ ...prev, itemDetails: updatedItems }));
    updateTotalEstimate(updatedItems);
  };

  const addItem = () => {
    const newItem = {
      slNo: formData.itemDetails.length + 1,
      itemName: '',
      itemCode: '',
      itemCategory: 'equipment',
      description: '',
      specification: '',
      quantity: 1,
      unit: 'nos',
      estimatedPrice: '',
      totalEstimate: '',
      supplier: '',
      model: '',
      brand: '',
      urgency: 'normal'
    };
    setFormData(prev => ({
      ...prev,
      itemDetails: [...prev.itemDetails, newItem]
    }));
  };

  const removeItem = (index) => {
    if (formData.itemDetails.length > 1) {
      const updatedItems = formData.itemDetails.filter((_, i) => i !== index);
      updatedItems.forEach((item, i) => {
        item.slNo = i + 1;
      });
      setFormData(prev => ({ ...prev, itemDetails: updatedItems }));
      updateTotalEstimate(updatedItems);
    }
  };

  const updateTotalEstimate = (items) => {
    const total = items.reduce((sum, item) => sum + (parseFloat(item.totalEstimate) || 0), 0);
    setFormData(prev => ({ ...prev, estimatedTotal: total.toFixed(2) }));
  };

  // Vendor Management
  const addVendor = () => {
    const newVendor = `Vendor ${formData.preferredVendors.length + 1}`;
    setFormData(prev => ({
      ...prev,
      preferredVendors: [...prev.preferredVendors, newVendor]
    }));
  };

  const removeVendor = (index) => {
    const updatedVendors = formData.preferredVendors.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, preferredVendors: updatedVendors }));
  };

  const handleVendorChange = (index, value) => {
    const updatedVendors = [...formData.preferredVendors];
    updatedVendors[index] = value;
    setFormData(prev => ({ ...prev, preferredVendors: updatedVendors }));
  };

  const handleSubmit = async (data) => {
    try {
      // Basic validation
      const requiredFields = ['requestedBy', 'requisitionPurpose', 'deliveryLocation'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
      }
      
      // Validate items
      const invalidItems = data.itemDetails.filter(item => !item.itemName || !item.quantity);
      if (invalidItems.length > 0) {
        throw new Error('All items must have name and quantity');
      }
      
      // Dispatch to Redux store (maintaining legacy action structure)
      dispatch(submitRequisitionSDC(data));
      
      // Success handling
      console.log('Requisition SDC submitted successfully:', data);
      
    } catch (error) {
      setErrors({ general: error.message });
      console.error('Form submission error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'submitted': return 'info';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      case 'on-hold': return 'warning';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'danger';
      case 'high': return 'warning';
      case 'normal': return 'info';
      case 'low': return 'secondary';
      default: return 'info';
    }
  };

  return (
    <AFCSDCFormLayout
      title="Requisition Form - SDC"
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
          Requisition submitted successfully!
        </Alert>
      )}

      {/* Progress Overview */}
      <Card className="mb-4">
        <Card.Header className="bg-info text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              <i className="fas fa-tasks me-2"></i>
              Requisition Progress
            </h6>
            <div>
              <Badge bg={getPriorityColor(formData.priority)} className="me-2">
                {formData.priority.toUpperCase()}
              </Badge>
              <Badge bg={getStatusColor(formData.requisitionStatus)}>
                {formData.requisitionStatus.toUpperCase()}
              </Badge>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="small text-muted">Completion Progress</span>
              <span className="small text-muted">{Math.round(completionPercentage)}% Complete</span>
            </div>
            <ProgressBar 
              now={completionPercentage} 
              variant={completionPercentage === 100 ? 'success' : 'info'}
              style={{ height: '8px' }}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Basic Information */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h6 className="mb-0">
            <i className="fas fa-info-circle me-2"></i>
            Requisition Details
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
                type="text"
                name="requisitionNumber"
                label="Requisition Number"
                value={formData.requisitionNumber}
                onChange={handleFieldChange}
                placeholder="Auto-generated"
                disabled
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
                  { value: 'low', label: 'Low Priority' },
                  { value: 'normal', label: 'Normal Priority' },
                  { value: 'high', label: 'High Priority' },
                  { value: 'urgent', label: 'Urgent' }
                ]}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="select"
                name="requisitionType"
                label="Requisition Type"
                value={formData.requisitionType}
                onChange={handleFieldChange}
                options={[
                  { value: 'equipment', label: 'Equipment Purchase' },
                  { value: 'consumables', label: 'Consumables' },
                  { value: 'services', label: 'Services' },
                  { value: 'software', label: 'Software License' },
                  { value: 'maintenance', label: 'Maintenance Contract' },
                  { value: 'others', label: 'Others' }
                ]}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="select"
                name="currentStage"
                label="Current Stage"
                value={formData.currentStage}
                onChange={handleFieldChange}
                options={[
                  { value: 'preparation', label: 'Preparation' },
                  { value: 'review', label: 'Under Review' },
                  { value: 'approval', label: 'Awaiting Approval' },
                  { value: 'procurement', label: 'Procurement' },
                  { value: 'delivery', label: 'Delivery' },
                  { value: 'completed', label: 'Completed' }
                ]}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="budgetCode"
                label="Budget Code"
                value={formData.budgetCode}
                onChange={handleFieldChange}
                placeholder="Budget allocation code"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Requesting Department Information */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white">
          <h6 className="mb-0">
            <i className="fas fa-building me-2"></i>
            Requesting Department Details
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="requestingDepartment"
                label="Department"
                value={formData.requestingDepartment}
                onChange={handleFieldChange}
                placeholder="Department name"
                disabled
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="requestingSection"
                label="Section"
                value={formData.requestingSection}
                onChange={handleFieldChange}
                placeholder="Section/Unit within department"
              />
            </Col>
            <Col md={4}>
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
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="requestedByDesignation"
                label="Designation"
                value={formData.requestedByDesignation}
                onChange={handleFieldChange}
                placeholder="Job designation"
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="tel"
                name="contactNumber"
                label="Contact Number"
                value={formData.contactNumber}
                onChange={handleFieldChange}
                placeholder="Mobile/Extension"
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="email"
                name="emailId"
                label="Email ID"
                value={formData.emailId}
                onChange={handleFieldChange}
                placeholder="official@upmrc.com"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="requisitionPurpose"
                label="Requisition Purpose"
                value={formData.requisitionPurpose}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Detailed explanation of why this requisition is needed"
                error={errors.requisitionPurpose}
                required
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Item Details */}
      <Card className="mb-4">
        <Card.Header className="bg-warning text-dark d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-list-ul me-2"></i>
            Item/Service Details
          </h6>
          <Button variant="primary" size="sm" onClick={addItem}>
            <i className="fas fa-plus me-1"></i>
            Add Item
          </Button>
        </Card.Header>
        <Card.Body>
          {formData.itemDetails.map((item, index) => (
            <Card key={index} className="mb-3 border-start border-warning border-4">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <span className="fw-bold">Item #{item.slNo}</span>
                <div className="d-flex align-items-center gap-2">
                  <Badge bg={getPriorityColor(item.urgency)}>
                    {item.urgency.toUpperCase()}
                  </Badge>
                  {formData.itemDetails.length > 1 && (
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => removeItem(index)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`itemName-${index}`}
                      label="Item/Service Name"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      placeholder="Name of item or service"
                      required
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`itemCode-${index}`}
                      label="Item Code"
                      value={item.itemCode}
                      onChange={(e) => handleItemChange(index, 'itemCode', e.target.value)}
                      placeholder="Product/Service code"
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`itemCategory-${index}`}
                      label="Category"
                      value={item.itemCategory}
                      onChange={(e) => handleItemChange(index, 'itemCategory', e.target.value)}
                      options={[
                        { value: 'equipment', label: 'Equipment' },
                        { value: 'consumables', label: 'Consumables' },
                        { value: 'software', label: 'Software' },
                        { value: 'services', label: 'Services' },
                        { value: 'maintenance', label: 'Maintenance' },
                        { value: 'others', label: 'Others' }
                      ]}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name={`description-${index}`}
                      label="Detailed Description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      rows={2}
                      placeholder="Detailed description including features, specifications, requirements"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <UniversalAFCSDCFormField
                      type="number"
                      name={`quantity-${index}`}
                      label="Quantity"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      min="1"
                      required
                    />
                  </Col>
                  <Col md={2}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`unit-${index}`}
                      label="Unit"
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                      placeholder="nos/pcs/set"
                    />
                  </Col>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="number"
                      name={`estimatedPrice-${index}`}
                      label="Est. Unit Price (₹)"
                      value={item.estimatedPrice}
                      onChange={(e) => handleItemChange(index, 'estimatedPrice', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </Col>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`totalEstimate-${index}`}
                      label="Total Estimate (₹)"
                      value={item.totalEstimate}
                      disabled
                      placeholder="Auto-calculated"
                    />
                  </Col>
                  <Col md={2}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`urgency-${index}`}
                      label="Urgency"
                      value={item.urgency}
                      onChange={(e) => handleItemChange(index, 'urgency', e.target.value)}
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'normal', label: 'Normal' },
                        { value: 'high', label: 'High' },
                        { value: 'urgent', label: 'Urgent' }
                      ]}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`supplier-${index}`}
                      label="Preferred Supplier"
                      value={item.supplier}
                      onChange={(e) => handleItemChange(index, 'supplier', e.target.value)}
                      placeholder="Preferred vendor"
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`brand-${index}`}
                      label="Brand/Make"
                      value={item.brand}
                      onChange={(e) => handleItemChange(index, 'brand', e.target.value)}
                      placeholder="Preferred brand"
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`model-${index}`}
                      label="Model/Version"
                      value={item.model}
                      onChange={(e) => handleItemChange(index, 'model', e.target.value)}
                      placeholder="Model number/version"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          
          {/* Total Budget Summary */}
          <Card className="bg-light">
            <Card.Body className="text-center">
              <h5 className="text-success mb-0">
                Total Estimated Budget: ₹{formData.estimatedTotal || '0.00'}
              </h5>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>

      {/* Delivery & Timeline */}
      <Card className="mb-4">
        <Card.Header className="bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-truck me-2"></i>
            Delivery & Timeline Information
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="sdc-location"
                name="deliveryLocation"
                label="Delivery Location"
                value={formData.deliveryLocation}
                onChange={handleFieldChange}
                error={errors.deliveryLocation}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="date"
                name="deliveryDate"
                label="Required By Date"
                value={formData.deliveryDate}
                onChange={handleFieldChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="date"
                name="expectedApprovalDate"
                label="Expected Approval Date"
                value={formData.expectedApprovalDate}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="deliveryInstructions"
                label="Delivery Instructions"
                value={formData.deliveryInstructions}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Special delivery instructions, contact person, timing preferences, etc."
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Justification */}
      <Card className="mb-4">
        <Card.Header className="bg-secondary text-white">
          <h6 className="mb-0">
            <i className="fas fa-clipboard-list me-2"></i>
            Justification & Business Case
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="businessJustification"
                label="Business Justification"
                value={formData.businessJustification}
                onChange={handleFieldChange}
                rows={4}
                placeholder="Explain the business need, impact on operations, ROI, cost-benefit analysis"
                error={errors.businessJustification}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="technicalJustification"
                label="Technical Justification"
                value={formData.technicalJustification}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Technical requirements, compatibility, integration needs"
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="alternatives"
                label="Alternatives Considered"
                value={formData.alternatives}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Other options evaluated and reasons for rejection"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Final Approvals */}
      <Card className="mb-4">
        <Card.Header className="bg-dark text-white">
          <h6 className="mb-0">
            <i className="fas fa-stamp me-2"></i>
            Final Review & Submission
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="qualityCheck"
                label="Quality Requirements Verified"
                value={formData.qualityCheck}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="standardCompliance"
                label="Standard Compliance Checked"
                value={formData.standardCompliance}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="followUpRequired"
                label="Follow-up Required"
                value={formData.followUpRequired}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="remarks"
                label="Additional Remarks & Comments"
                value={formData.remarks}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Any additional information, special considerations, or remarks"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </AFCSDCFormLayout>
  );
};

export default RequisitionSDCForm;