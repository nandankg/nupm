/**
 * Loan Register SDC Form
 * AFC-SDC Department - Administrative Core & Asset Management
 * 
 * Original: ID: 86, Slug: loan-register-sdc
 * Universal Component Architecture with 100% field preservation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Alert, Table, Badge } from 'react-bootstrap';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

// Redux action (maintaining exact legacy action)
const submitLoanRegisterSDC = (formData) => ({
  type: 'SUBMIT_LOAN_REGISTER_SDC',
  payload: formData
});

const LoanRegisterSDCForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.loanRegisterSDC || {});

  // Form state with all original fields preserved exactly
  const [formData, setFormData] = useState({
    // Basic Information
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    registerNumber: '',
    
    // Loan Entry Details
    entryNumber: '',
    loanType: 'equipment',
    
    // Borrower Information
    borrowerEmployeeId: '',
    borrowerName: '',
    borrowerDepartment: '',
    borrowerDesignation: '',
    contactNumber: '',
    
    // Equipment/Item Details
    itemDetails: [
      {
        slNo: 1,
        itemName: '',
        itemCode: '',
        itemType: 'equipment',
        description: '',
        quantity: 1,
        unitPrice: '',
        totalValue: '',
        condition: 'good',
        serialNumber: '',
        manufacturer: '',
        model: ''
      }
    ],
    
    // Loan Terms
    loanStartDate: '',
    expectedReturnDate: '',
    loanDuration: '',
    loanPurpose: '',
    projectReference: '',
    
    // Authorization Details
    requestedBy: '',
    approvedBy: '',
    issuedBy: '',
    witnessedBy: '',
    
    // Security & Conditions
    securityDeposit: '',
    securityType: 'none',
    loanConditions: '',
    specialInstructions: '',
    
    // Return Details (for tracking)
    actualReturnDate: '',
    returnedBy: '',
    returnCondition: '',
    returnRemarks: '',
    
    // Financial Information
    estimatedValue: '',
    insurance: false,
    insuranceAmount: '',
    insuranceProvider: '',
    
    // Status Tracking
    loanStatus: 'active',
    remarks: '',
    followUpRequired: false,
    nextFollowUpDate: '',
    
    // Document References
    supportingDocuments: [],
    photographicEvidence: false,
    
    // Approval Chain
    departmentHeadApproval: false,
    financeApproval: false,
    managementApproval: false
  });

  const [errors, setErrors] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate completion percentage
  useEffect(() => {
    const requiredFields = [
      'date', 'borrowerEmployeeId', 'borrowerName', 
      'loanStartDate', 'expectedReturnDate', 'loanPurpose',
      'requestedBy', 'approvedBy'
    ];
    const completedFields = requiredFields.filter(field => formData[field]).length;
    const itemsCompleted = formData.itemDetails.filter(item => item.itemName && item.quantity).length;
    
    const basicCompletion = (completedFields / requiredFields.length) * 70;
    const itemsCompletion = (itemsCompleted / formData.itemDetails.length) * 30;
    
    setCompletionPercentage(Math.round(basicCompletion + itemsCompletion));
  }, [formData]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-generate register number if not provided
    if (name === 'date' && !formData.registerNumber) {
      const dateStr = value.replace(/-/g, '');
      const registerNumber = `LR-SDC-${dateStr}`;
      setFormData(prev => ({
        ...prev,
        [name]: value,
        registerNumber: registerNumber
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

  // Item Management Functions
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.itemDetails];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Auto-calculate total value
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : parseFloat(updatedItems[index].quantity) || 0;
      const unitPrice = field === 'unitPrice' ? parseFloat(value) || 0 : parseFloat(updatedItems[index].unitPrice) || 0;
      updatedItems[index].totalValue = (quantity * unitPrice).toFixed(2);
    }
    
    setFormData(prev => ({ ...prev, itemDetails: updatedItems }));
    
    // Update estimated total value
    updateEstimatedValue(updatedItems);
  };

  const addItem = () => {
    const newItem = {
      slNo: formData.itemDetails.length + 1,
      itemName: '',
      itemCode: '',
      itemType: 'equipment',
      description: '',
      quantity: 1,
      unitPrice: '',
      totalValue: '',
      condition: 'good',
      serialNumber: '',
      manufacturer: '',
      model: ''
    };
    setFormData(prev => ({
      ...prev,
      itemDetails: [...prev.itemDetails, newItem]
    }));
  };

  const removeItem = (index) => {
    if (formData.itemDetails.length > 1) {
      const updatedItems = formData.itemDetails.filter((_, i) => i !== index);
      // Renumber items
      updatedItems.forEach((item, i) => {
        item.slNo = i + 1;
      });
      setFormData(prev => ({ ...prev, itemDetails: updatedItems }));
      updateEstimatedValue(updatedItems);
    }
  };

  const updateEstimatedValue = (items) => {
    const total = items.reduce((sum, item) => sum + (parseFloat(item.totalValue) || 0), 0);
    setFormData(prev => ({ ...prev, estimatedValue: total.toFixed(2) }));
  };

  // Document Management
  const addDocument = () => {
    const newDoc = `Document ${formData.supportingDocuments.length + 1}`;
    setFormData(prev => ({
      ...prev,
      supportingDocuments: [...prev.supportingDocuments, newDoc]
    }));
  };

  const removeDocument = (index) => {
    const updatedDocs = formData.supportingDocuments.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, supportingDocuments: updatedDocs }));
  };

  const handleDocumentChange = (index, value) => {
    const updatedDocs = [...formData.supportingDocuments];
    updatedDocs[index] = value;
    setFormData(prev => ({ ...prev, supportingDocuments: updatedDocs }));
  };

  const handleSubmit = async (data) => {
    try {
      // Basic validation
      const requiredFields = ['borrowerEmployeeId', 'borrowerName', 'loanStartDate', 'expectedReturnDate'];
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
      dispatch(submitLoanRegisterSDC(data));
      
      // Success handling
      console.log('Loan Register SDC submitted successfully:', data);
      
    } catch (error) {
      setErrors({ general: error.message });
      console.error('Form submission error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'returned': return 'secondary';
      case 'overdue': return 'danger';
      case 'extended': return 'warning';
      default: return 'secondary';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent': return 'success';
      case 'good': return 'info';
      case 'fair': return 'warning';
      case 'poor': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <AFCSDCFormLayout
      title="Loan Register - SDC"
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
          Loan register updated successfully!
        </Alert>
      )}

      {/* Basic Information */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              <i className="fas fa-info-circle me-2"></i>
              Loan Registration Details
            </h6>
            <Badge bg={getStatusColor(formData.loanStatus)}>
              {formData.loanStatus.toUpperCase()}
            </Badge>
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
                name="registerNumber"
                label="Register Number"
                value={formData.registerNumber}
                onChange={handleFieldChange}
                placeholder="Auto-generated"
                disabled
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="text"
                name="entryNumber"
                label="Entry Number"
                value={formData.entryNumber}
                onChange={handleFieldChange}
                placeholder="Sequential entry number"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="select"
                name="loanType"
                label="Loan Type"
                value={formData.loanType}
                onChange={handleFieldChange}
                options={[
                  { value: 'equipment', label: 'Equipment Loan' },
                  { value: 'tools', label: 'Tools & Instruments' },
                  { value: 'documents', label: 'Documents & Manuals' },
                  { value: 'consumables', label: 'Consumables' },
                  { value: 'others', label: 'Others' }
                ]}
                required
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="select"
                name="loanStatus"
                label="Loan Status"
                value={formData.loanStatus}
                onChange={handleFieldChange}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'returned', label: 'Returned' },
                  { value: 'overdue', label: 'Overdue' },
                  { value: 'extended', label: 'Extended' },
                  { value: 'cancelled', label: 'Cancelled' }
                ]}
                required
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Borrower Information */}
      <Card className="mb-4">
        <Card.Header className="bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-user me-2"></i>
            Borrower Information
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="borrowerEmployeeId"
                label="Employee ID"
                value={formData.borrowerEmployeeId}
                onChange={handleFieldChange}
                error={errors.borrowerEmployeeId}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="text"
                name="borrowerName"
                label="Full Name"
                value={formData.borrowerName}
                onChange={handleFieldChange}
                error={errors.borrowerName}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="text"
                name="borrowerDepartment"
                label="Department"
                value={formData.borrowerDepartment}
                onChange={handleFieldChange}
                placeholder="e.g., AFC-SDC"
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="text"
                name="borrowerDesignation"
                label="Designation"
                value={formData.borrowerDesignation}
                onChange={handleFieldChange}
                placeholder="Job designation"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="tel"
                name="contactNumber"
                label="Contact Number"
                value={formData.contactNumber}
                onChange={handleFieldChange}
                placeholder="Mobile/Extension number"
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="loanPurpose"
                label="Loan Purpose"
                value={formData.loanPurpose}
                onChange={handleFieldChange}
                rows={2}
                placeholder="Detailed purpose for the loan"
                error={errors.loanPurpose}
                required
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Item Details */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-boxes me-2"></i>
            Item/Equipment Details
          </h6>
          <Button variant="light" size="sm" onClick={addItem}>
            <i className="fas fa-plus me-1"></i>
            Add Item
          </Button>
        </Card.Header>
        <Card.Body>
          {formData.itemDetails.map((item, index) => (
            <Card key={index} className="mb-3 border-start border-success border-4">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <span className="fw-bold">Item #{item.slNo}</span>
                {formData.itemDetails.length > 1 && (
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeItem(index)}
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
                      name={`itemName-${index}`}
                      label="Item Name"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      placeholder="Equipment/Item name"
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
                      placeholder="Asset/Item code"
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`itemType-${index}`}
                      label="Item Type"
                      value={item.itemType}
                      onChange={(e) => handleItemChange(index, 'itemType', e.target.value)}
                      options={[
                        { value: 'equipment', label: 'Equipment' },
                        { value: 'tools', label: 'Tools' },
                        { value: 'instruments', label: 'Instruments' },
                        { value: 'consumables', label: 'Consumables' },
                        { value: 'documents', label: 'Documents' },
                        { value: 'software', label: 'Software' }
                      ]}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name={`description-${index}`}
                      label="Description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      rows={2}
                      placeholder="Detailed item description, specifications, model, etc."
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
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="number"
                      name={`unitPrice-${index}`}
                      label="Unit Price (₹)"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </Col>
                  <Col md={3}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`totalValue-${index}`}
                      label="Total Value (₹)"
                      value={item.totalValue}
                      disabled
                      placeholder="Auto-calculated"
                    />
                  </Col>
                  <Col md={2}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name={`condition-${index}`}
                      label="Condition"
                      value={item.condition}
                      onChange={(e) => handleItemChange(index, 'condition', e.target.value)}
                      options={[
                        { value: 'excellent', label: 'Excellent' },
                        { value: 'good', label: 'Good' },
                        { value: 'fair', label: 'Fair' },
                        { value: 'poor', label: 'Poor' }
                      ]}
                    />
                  </Col>
                  <Col md={2}>
                    <Badge bg={getConditionColor(item.condition)} className="mt-4">
                      {item.condition.toUpperCase()}
                    </Badge>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`serialNumber-${index}`}
                      label="Serial Number"
                      value={item.serialNumber}
                      onChange={(e) => handleItemChange(index, 'serialNumber', e.target.value)}
                      placeholder="Equipment serial number"
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`manufacturer-${index}`}
                      label="Manufacturer"
                      value={item.manufacturer}
                      onChange={(e) => handleItemChange(index, 'manufacturer', e.target.value)}
                      placeholder="Manufacturer name"
                    />
                  </Col>
                  <Col md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name={`model-${index}`}
                      label="Model"
                      value={item.model}
                      onChange={(e) => handleItemChange(index, 'model', e.target.value)}
                      placeholder="Model number/name"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          
          {/* Total Value Summary */}
          <Card className="bg-light">
            <Card.Body className="text-center">
              <h5 className="text-primary">
                Total Estimated Value: ₹{formData.estimatedValue || '0.00'}
              </h5>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>

      {/* Loan Terms & Conditions */}
      <Card className="mb-4">
        <Card.Header className="bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-calendar-check me-2"></i>
            Loan Terms & Conditions
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="date"
                name="loanStartDate"
                label="Loan Start Date"
                value={formData.loanStartDate}
                onChange={handleFieldChange}
                error={errors.loanStartDate}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="date"
                name="expectedReturnDate"
                label="Expected Return Date"
                value={formData.expectedReturnDate}
                onChange={handleFieldChange}
                error={errors.expectedReturnDate}
                required
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="text"
                name="loanDuration"
                label="Loan Duration"
                value={formData.loanDuration}
                onChange={handleFieldChange}
                placeholder="e.g., 30 days, 3 months"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="text"
                name="projectReference"
                label="Project Reference"
                value={formData.projectReference}
                onChange={handleFieldChange}
                placeholder="Project/Work order reference"
              />
            </Col>
            <Col md={6}>
              <UniversalAFCSDCFormField
                type="select"
                name="securityType"
                label="Security Type"
                value={formData.securityType}
                onChange={handleFieldChange}
                options={[
                  { value: 'none', label: 'No Security Required' },
                  { value: 'deposit', label: 'Security Deposit' },
                  { value: 'guarantee', label: 'Personal Guarantee' },
                  { value: 'bond', label: 'Bond/Undertaking' }
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="loanConditions"
                label="Loan Conditions & Terms"
                value={formData.loanConditions}
                onChange={handleFieldChange}
                rows={4}
                placeholder="Detailed terms and conditions for the loan, care instructions, usage restrictions, etc."
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Authorization & Approval */}
      <Card className="mb-4">
        <Card.Header className="bg-secondary text-white">
          <h6 className="mb-0">
            <i className="fas fa-shield-alt me-2"></i>
            Authorization & Approval
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
                name="approvedBy"
                label="Approved By"
                value={formData.approvedBy}
                onChange={handleFieldChange}
                error={errors.approvedBy}
                required
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="issuedBy"
                label="Issued By"
                value={formData.issuedBy}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={3}>
              <UniversalAFCSDCFormField
                type="employee-sdc"
                name="witnessedBy"
                label="Witnessed By"
                value={formData.witnessedBy}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="departmentHeadApproval"
                label="Department Head Approval"
                value={formData.departmentHeadApproval}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="financeApproval"
                label="Finance Approval (if required)"
                value={formData.financeApproval}
                onChange={handleFieldChange}
              />
            </Col>
            <Col md={4}>
              <UniversalAFCSDCFormField
                type="checkbox"
                name="managementApproval"
                label="Management Approval"
                value={formData.managementApproval}
                onChange={handleFieldChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <UniversalAFCSDCFormField
                type="textarea"
                name="remarks"
                label="Additional Remarks & Instructions"
                value={formData.remarks}
                onChange={handleFieldChange}
                rows={3}
                placeholder="Any additional notes, special handling instructions, or remarks"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </AFCSDCFormLayout>
  );
};

export default LoanRegisterSDCForm;