/**
 * Gate Pass Book Store Form
 * AFC-Store Department - Entry/Exit Authorization Management
 * Migration from: src/forms/GatePass.jsx (Store adaptation)
 * Form ID: 80 | Route: /form/gate-pass-book-store
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Spinner, Table, Badge, Button } from 'react-bootstrap';
import { AFCStoreFormLayout, UniversalAFCStoreFormField } from '../components';
import { addData } from '../../../reducer/GatePassReducer';
import { formatDate, formatTime } from '../../../data/formatDate';

const GatePassBookStoreForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const gatepass = useSelector((state) => state.gatepassstore || {});
  const { loading, error } = gatepass;

  // Form state
  const [formData, setFormData] = useState({
    date: formatDate(new Date().toDateString()),
    time: formatTime(new Date()),
    passType: 'Material Pass',
    visitorName: '',
    visitorCompany: '',
    visitorId: '',
    contactNumber: '',
    purpose: '',
    validFrom: '',
    validTo: '',
    authorizedBy: '',
    authorizedDesignation: '',
    securityRemarks: '',
    gatePassNo: `GP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
  });

  // Items state for material tracking
  const [items, setItems] = useState([
    {
      itmdespt: '',
      partno: '',
      serialno: '',
      location: '',
      qty: '',
      dftsrv: '',
      remark: ''
    }
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  // Handle item changes
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  // Add new item row
  const handleAddRow = () => {
    setItems([...items, {
      itmdespt: '',
      partno: '',
      serialno: '',
      location: '',
      qty: '',
      dftsrv: '',
      remark: ''
    }]);
  };

  // Remove item row
  const handleRemoveRow = (index) => {
    if (items.length > 1) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    if (!formData.passType.trim()) {
      newErrors.passType = 'Pass type is required';
    }

    if (!formData.visitorName.trim()) {
      newErrors.visitorName = 'Visitor name is required';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }

    if (!formData.authorizedBy.trim()) {
      newErrors.authorizedBy = 'Authorization is required';
    }

    // Validate items if material pass
    if (formData.passType === 'Material Pass') {
      const hasValidItems = items.some(item => 
        item.itmdespt.trim() || item.partno.trim() || item.qty.trim()
      );
      
      if (!hasValidItems) {
        newErrors.items = 'At least one item must be specified for material pass';
      }
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
      const gatePassData = {
        ...formData,
        items: items.filter(item => 
          item.itmdespt.trim() || item.partno.trim() || item.qty.trim()
        ),
        timestamp: new Date().toISOString(),
        status: 'Active'
      };

      await dispatch(addData(gatePassData));
      setSubmitSuccess(true);
      
      // Reset form after success
      setFormData({
        date: formatDate(new Date().toDateString()),
        time: formatTime(new Date()),
        passType: 'Material Pass',
        visitorName: '',
        visitorCompany: '',
        visitorId: '',
        contactNumber: '',
        purpose: '',
        validFrom: '',
        validTo: '',
        authorizedBy: '',
        authorizedDesignation: '',
        securityRemarks: '',
        gatePassNo: `GP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
      });

      setItems([{
        itmdespt: '',
        partno: '',
        serialno: '',
        location: '',
        qty: '',
        dftsrv: '',
        remark: ''
      }]);

    } catch (err) {
      setErrors({ submit: 'Failed to submit gate pass. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AFCStoreFormLayout
      title="Gate Pass Book Store"
      subtitle="Entry/Exit Authorization & Material Pass Management"
      breadcrumbs={[
        { label: 'AFC-Store', href: '/department/afc-store' },
        { label: 'Security & Access', href: '/department/afc-store/security' },
        { label: 'Gate Pass Book', active: true }
      ]}
    >
      <Container fluid>
        {/* Success Alert */}
        {submitSuccess && (
          <Alert variant="success" className="mb-4">
            <Alert.Heading>✅ Success!</Alert.Heading>
            Gate pass created successfully! Pass No: <strong>{formData.gatePassNo}</strong>
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
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-id-card me-2"></i>
                  Create New Gate Pass
                </h5>
              </Card.Header>

              <Card.Body className="p-4">
                <form onSubmit={handleSubmit} noValidate>
                  <Row>
                    {/* Gate Pass Details */}
                    <Col md={12} className="mb-3">
                      <h6 className="text-primary border-bottom pb-2">
                        <i className="fas fa-info-circle me-2"></i>
                        Gate Pass Information
                      </h6>
                    </Col>

                    {/* Gate Pass Number */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="gatePassNo"
                        label="Gate Pass Number"
                        value={formData.gatePassNo}
                        onChange={(value) => handleFieldChange('gatePassNo', value)}
                        disabled={true}
                      />
                    </Col>

                    {/* Date */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="date"
                        name="date"
                        label="Date *"
                        value={formData.date}
                        onChange={(value) => handleFieldChange('date', value)}
                        error={errors.date}
                        required
                      />
                    </Col>

                    {/* Time */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="time"
                        name="time"
                        label="Time *"
                        value={formData.time}
                        onChange={(value) => handleFieldChange('time', value)}
                        required
                      />
                    </Col>

                    {/* Pass Type */}
                    <Col md={6} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="select"
                        name="passType"
                        label="Pass Type *"
                        value={formData.passType}
                        onChange={(value) => handleFieldChange('passType', value)}
                        error={errors.passType}
                        required
                        options={[
                          { value: 'Material Pass', label: 'Material Pass' },
                          { value: 'Visitor Pass', label: 'Visitor Pass' },
                          { value: 'Contractor Pass', label: 'Contractor Pass' },
                          { value: 'Emergency Pass', label: 'Emergency Pass' }
                        ]}
                      />
                    </Col>

                    {/* Purpose */}
                    <Col md={6} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="purpose"
                        label="Purpose *"
                        value={formData.purpose}
                        onChange={(value) => handleFieldChange('purpose', value)}
                        placeholder="Enter purpose of visit/material movement"
                        error={errors.purpose}
                        required
                      />
                    </Col>

                    {/* Visitor Details */}
                    <Col md={12} className="mb-3">
                      <h6 className="text-success border-bottom pb-2">
                        <i className="fas fa-user me-2"></i>
                        Visitor/Person Details
                      </h6>
                    </Col>

                    {/* Visitor Name */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="visitorName"
                        label="Visitor Name *"
                        value={formData.visitorName}
                        onChange={(value) => handleFieldChange('visitorName', value)}
                        placeholder="Enter visitor/person name"
                        error={errors.visitorName}
                        required
                      />
                    </Col>

                    {/* Visitor Company */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="visitorCompany"
                        label="Company/Department"
                        value={formData.visitorCompany}
                        onChange={(value) => handleFieldChange('visitorCompany', value)}
                        placeholder="Enter company or department"
                      />
                    </Col>

                    {/* Visitor ID */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="visitorId"
                        label="ID Number"
                        value={formData.visitorId}
                        onChange={(value) => handleFieldChange('visitorId', value)}
                        placeholder="Employee ID or visitor ID"
                      />
                    </Col>

                    {/* Contact Number */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="tel"
                        name="contactNumber"
                        label="Contact Number"
                        value={formData.contactNumber}
                        onChange={(value) => handleFieldChange('contactNumber', value)}
                        placeholder="Enter contact number"
                      />
                    </Col>

                    {/* Valid From */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="datetime-local"
                        name="validFrom"
                        label="Valid From"
                        value={formData.validFrom}
                        onChange={(value) => handleFieldChange('validFrom', value)}
                      />
                    </Col>

                    {/* Valid To */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="datetime-local"
                        name="validTo"
                        label="Valid To"
                        value={formData.validTo}
                        onChange={(value) => handleFieldChange('validTo', value)}
                      />
                    </Col>

                    {/* Material/Items Section (if Material Pass) */}
                    {formData.passType === 'Material Pass' && (
                      <>
                        <Col md={12} className="mb-3">
                          <h6 className="text-warning border-bottom pb-2">
                            <i className="fas fa-boxes me-2"></i>
                            Material/Items Details
                            <Button 
                              variant="outline-success" 
                              size="sm" 
                              onClick={handleAddRow}
                              className="float-end"
                            >
                              <i className="fas fa-plus me-1"></i>
                              Add Item
                            </Button>
                          </h6>
                        </Col>

                        {items.map((item, index) => (
                          <Col md={12} key={index} className="mb-3">
                            <Card className="bg-light">
                              <Card.Body className="p-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <h6 className="mb-0">Item {index + 1}</h6>
                                  {items.length > 1 && (
                                    <Button 
                                      variant="outline-danger" 
                                      size="sm"
                                      onClick={() => handleRemoveRow(index)}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </Button>
                                  )}
                                </div>
                                <Row>
                                  <Col md={6} className="mb-2">
                                    <UniversalAFCStoreFormField
                                      type="text"
                                      name={`itmdespt_${index}`}
                                      label="Item Description"
                                      value={item.itmdespt}
                                      onChange={(value) => handleItemChange(index, 'itmdespt', value)}
                                      placeholder="Enter item description"
                                    />
                                  </Col>
                                  <Col md={3} className="mb-2">
                                    <UniversalAFCStoreFormField
                                      type="text"
                                      name={`partno_${index}`}
                                      label="Part Number"
                                      value={item.partno}
                                      onChange={(value) => handleItemChange(index, 'partno', value)}
                                      placeholder="Part number"
                                    />
                                  </Col>
                                  <Col md={3} className="mb-2">
                                    <UniversalAFCStoreFormField
                                      type="number"
                                      name={`qty_${index}`}
                                      label="Quantity"
                                      value={item.qty}
                                      onChange={(value) => handleItemChange(index, 'qty', value)}
                                      placeholder="Qty"
                                      min="1"
                                    />
                                  </Col>
                                  <Col md={6} className="mb-2">
                                    <UniversalAFCStoreFormField
                                      type="text"
                                      name={`serialno_${index}`}
                                      label="Serial Number"
                                      value={item.serialno}
                                      onChange={(value) => handleItemChange(index, 'serialno', value)}
                                      placeholder="Serial number"
                                    />
                                  </Col>
                                  <Col md={6} className="mb-2">
                                    <UniversalAFCStoreFormField
                                      type="text"
                                      name={`location_${index}`}
                                      label="Location"
                                      value={item.location}
                                      onChange={(value) => handleItemChange(index, 'location', value)}
                                      placeholder="Item location"
                                    />
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}

                        {errors.items && (
                          <Col md={12} className="mb-3">
                            <Alert variant="danger">
                              {errors.items}
                            </Alert>
                          </Col>
                        )}
                      </>
                    )}

                    {/* Authorization */}
                    <Col md={12} className="mb-3">
                      <h6 className="text-info border-bottom pb-2">
                        <i className="fas fa-user-shield me-2"></i>
                        Authorization Details
                      </h6>
                    </Col>

                    {/* Authorized By */}
                    <Col md={6} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="authorizedBy"
                        label="Authorized By *"
                        value={formData.authorizedBy}
                        onChange={(value) => handleFieldChange('authorizedBy', value)}
                        placeholder="Enter authorizing person name"
                        error={errors.authorizedBy}
                        required
                      />
                    </Col>

                    {/* Authorized Designation */}
                    <Col md={6} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="authorizedDesignation"
                        label="Designation"
                        value={formData.authorizedDesignation}
                        onChange={(value) => handleFieldChange('authorizedDesignation', value)}
                        placeholder="Enter designation"
                      />
                    </Col>

                    {/* Security Remarks */}
                    <Col md={12} className="mb-4">
                      <UniversalAFCStoreFormField
                        type="textarea"
                        name="securityRemarks"
                        label="Security Remarks"
                        value={formData.securityRemarks}
                        onChange={(value) => handleFieldChange('securityRemarks', value)}
                        placeholder="Enter any security instructions or remarks..."
                        rows={3}
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
                      className="btn btn-primary"
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
                          Creating Gate Pass...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-id-card me-1"></i>
                          Create Gate Pass
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AFCStoreFormLayout>
  );
};

export default GatePassBookStoreForm;