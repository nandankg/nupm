/**
 * Daily Transaction Issue Register Store Form
 * AFC-Store Department - Material Issuing & Inventory Management
 * Migration from: src/forms/store/DtrIssueStore.jsx
 * Form ID: 79 | Route: /form/daily-transaction-register-store-issue
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Spinner, Table, Badge, Button } from 'react-bootstrap';
import { AFCStoreFormLayout, UniversalAFCStoreFormField } from '../components';
import { fetchData, addData } from '../../../reducer/redux/tableDataSlice';

const DailyTransactionIssueStoreForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const DtrIssueStoreList = useSelector((state) => state.data);
  const { loading, error } = DtrIssueStoreList || {};

  // Form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    dtr_no: 'abc',
    material_desc: '',
    qty: '',
    ledger_no: '',
    challan_no: '',
    challan_date: '',
    issued_name: '',
    issued_designation: '',
    for_whatWork: '',
    received_name: '',
    received_designation: '',
    serial_no: '',
    material_id: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [items, setItems] = useState([]);
  const [formType, setFormType] = useState('daily-transaction-register-store-issue');

  // Handle field changes
  const handleFieldChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    if (!formData.material_desc.trim()) {
      newErrors.material_desc = 'Material description is required';
    }

    if (!formData.material_id.trim()) {
      newErrors.material_id = 'Material ID is required';
    }

    if (!formData.qty || formData.qty <= 0) {
      newErrors.qty = 'Valid quantity is required';
    }

    if (!formData.issued_name.trim()) {
      newErrors.issued_name = 'Issued by name is required';
    }

    if (!formData.issued_designation.trim()) {
      newErrors.issued_designation = 'Issued by designation is required';
    }

    if (!formData.received_name.trim()) {
      newErrors.received_name = 'Received by name is required';
    }

    if (!formData.received_designation.trim()) {
      newErrors.received_designation = 'Received by designation is required';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const dataPayload = {
        ...formData,
        form_type: formType,
        timestamp: new Date().toISOString()
      };

      await dispatch(addData({ 
        data: dataPayload, 
        formType: formType 
      }));
      
      setSubmitSuccess(true);
      
      // Reset form after success
      setFormData({
        date: new Date().toISOString().split('T')[0],
        dtr_no: 'abc',
        material_desc: '',
        qty: '',
        ledger_no: '',
        challan_no: '',
        challan_date: '',
        issued_name: '',
        issued_designation: '',
        for_whatWork: '',
        received_name: '',
        received_designation: '',
        serial_no: '',
        material_id: ''
      });

      // Refresh data
      dispatch(fetchData(formType));
    } catch (err) {
      setErrors({ submit: 'Failed to submit issue register. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AFCStoreFormLayout
      title="Daily Transaction Issue Register Store"
      subtitle="Material Issuing & Distribution Management"
      breadcrumbs={[
        { label: 'AFC-Store', href: '/department/afc-store' },
        { label: 'Transaction Management', href: '/department/afc-store/transactions' },
        { label: 'Issue Register', active: true }
      ]}
    >
      <Container fluid>
        {/* Success Alert */}
        {submitSuccess && (
          <Alert variant="success" className="mb-4">
            <Alert.Heading>✅ Success!</Alert.Heading>
            Material issue registered successfully!
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>❌ Error</Alert.Heading>
            {error}
          </Alert>
        )}

        {/* Form Section */}
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-warning text-dark">
                <h5 className="mb-0">
                  <i className="fas fa-minus-circle me-2"></i>
                  Add New Material Issue
                </h5>
              </Card.Header>

              <Card.Body className="p-4">
                <form onSubmit={handleSubmit} noValidate>
                  <Row>
                    {/* Date */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="date"
                        name="date"
                        label="Issue Date *"
                        value={formData.date}
                        onChange={(value) => handleFieldChange('date', value)}
                        error={errors.date}
                        required
                      />
                    </Col>

                    {/* DTR Number */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="dtr_no"
                        label="DTR Number"
                        value={formData.dtr_no}
                        onChange={(value) => handleFieldChange('dtr_no', value)}
                        placeholder="Daily transaction register number"
                      />
                    </Col>

                    {/* Material ID */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="material_id"
                        label="Material ID *"
                        value={formData.material_id}
                        onChange={(value) => handleFieldChange('material_id', value)}
                        placeholder="Enter material ID"
                        error={errors.material_id}
                        required
                      />
                    </Col>

                    {/* Material Description */}
                    <Col md={8} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="material_desc"
                        label="Material Description *"
                        value={formData.material_desc}
                        onChange={(value) => handleFieldChange('material_desc', value)}
                        placeholder="Enter detailed material description"
                        error={errors.material_desc}
                        required
                      />
                    </Col>

                    {/* Quantity */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="number"
                        name="qty"
                        label="Quantity *"
                        value={formData.qty}
                        onChange={(value) => handleFieldChange('qty', value)}
                        placeholder="Enter quantity"
                        error={errors.qty}
                        required
                        min="1"
                      />
                    </Col>

                    {/* Serial Number */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="serial_no"
                        label="Serial Number"
                        value={formData.serial_no}
                        onChange={(value) => handleFieldChange('serial_no', value)}
                        placeholder="Enter serial number"
                      />
                    </Col>

                    {/* Ledger Number */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="ledger_no"
                        label="Ledger Number"
                        value={formData.ledger_no}
                        onChange={(value) => handleFieldChange('ledger_no', value)}
                        placeholder="Enter ledger reference"
                      />
                    </Col>

                    {/* Challan Number */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="challan_no"
                        label="Challan Number"
                        value={formData.challan_no}
                        onChange={(value) => handleFieldChange('challan_no', value)}
                        placeholder="Enter challan number"
                      />
                    </Col>

                    {/* Challan Date */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="date"
                        name="challan_date"
                        label="Challan Date"
                        value={formData.challan_date}
                        onChange={(value) => handleFieldChange('challan_date', value)}
                      />
                    </Col>

                    {/* For What Work */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="for_whatWork"
                        label="For What Work"
                        value={formData.for_whatWork}
                        onChange={(value) => handleFieldChange('for_whatWork', value)}
                        placeholder="Purpose of material issue"
                      />
                    </Col>

                    {/* Issued By Section */}
                    <Col md={12} className="mb-3">
                      <hr />
                      <h6 className="text-primary">
                        <i className="fas fa-user-check me-2"></i>
                        Issued By Information
                      </h6>
                    </Col>

                    {/* Issued by Name */}
                    <Col md={6} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="issued_name"
                        label="Issued By (Name) *"
                        value={formData.issued_name}
                        onChange={(value) => handleFieldChange('issued_name', value)}
                        placeholder="Enter issuer name"
                        error={errors.issued_name}
                        required
                      />
                    </Col>

                    {/* Issued by Designation */}
                    <Col md={6} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="issued_designation"
                        label="Designation *"
                        value={formData.issued_designation}
                        onChange={(value) => handleFieldChange('issued_designation', value)}
                        placeholder="Enter issuer designation"
                        error={errors.issued_designation}
                        required
                      />
                    </Col>

                    {/* Received By Section */}
                    <Col md={12} className="mb-3">
                      <hr />
                      <h6 className="text-success">
                        <i className="fas fa-user-plus me-2"></i>
                        Received By Information
                      </h6>
                    </Col>

                    {/* Received by Name */}
                    <Col md={6} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="received_name"
                        label="Received By (Name) *"
                        value={formData.received_name}
                        onChange={(value) => handleFieldChange('received_name', value)}
                        placeholder="Enter receiver name"
                        error={errors.received_name}
                        required
                      />
                    </Col>

                    {/* Received by Designation */}
                    <Col md={6} className="mb-4">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="received_designation"
                        label="Designation *"
                        value={formData.received_designation}
                        onChange={(value) => handleFieldChange('received_designation', value)}
                        placeholder="Enter receiver designation"
                        error={errors.received_designation}
                        required
                      />
                    </Col>
                  </Row>

                  {/* Submit Error */}
                  {errors.submit && (
                    <Alert variant="danger" className="mb-3">
                      {errors.submit}
                    </Alert>
                  )}

                  {/* Form Actions */}
                  <div className="d-flex justify-content-end pt-3 border-top">
                    <button
                      type="submit"
                      className="btn btn-warning me-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            className="me-2"
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-minus me-1"></i>
                          Add Issue Entry
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Issue History Summary */}
        <Row>
          <Col lg={12}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-info text-white">
                <h5 className="mb-0">
                  <i className="fas fa-chart-line me-2"></i>
                  Issue Register Summary
                </h5>
              </Card.Header>

              <Card.Body className="p-4">
                <Row>
                  <Col md={3} className="text-center mb-3">
                    <div className="bg-warning bg-opacity-10 rounded p-3">
                      <i className="fas fa-minus-circle fa-2x text-warning mb-2"></i>
                      <h4 className="text-warning">0</h4>
                      <small className="text-muted">Today's Issues</small>
                    </div>
                  </Col>
                  
                  <Col md={3} className="text-center mb-3">
                    <div className="bg-info bg-opacity-10 rounded p-3">
                      <i className="fas fa-calendar-week fa-2x text-info mb-2"></i>
                      <h4 className="text-info">0</h4>
                      <small className="text-muted">This Week</small>
                    </div>
                  </Col>
                  
                  <Col md={3} className="text-center mb-3">
                    <div className="bg-primary bg-opacity-10 rounded p-3">
                      <i className="fas fa-calendar-alt fa-2x text-primary mb-2"></i>
                      <h4 className="text-primary">0</h4>
                      <small className="text-muted">This Month</small>
                    </div>
                  </Col>
                  
                  <Col md={3} className="text-center mb-3">
                    <div className="bg-success bg-opacity-10 rounded p-3">
                      <i className="fas fa-chart-bar fa-2x text-success mb-2"></i>
                      <h4 className="text-success">0</h4>
                      <small className="text-muted">Total Issues</small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AFCStoreFormLayout>
  );
};

export default DailyTransactionIssueStoreForm;