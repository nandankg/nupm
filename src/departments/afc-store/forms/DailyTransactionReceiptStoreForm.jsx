/**
 * Daily Transaction Receipt Register Store Form
 * AFC-Store Department - Material Receipt Management
 * Migration from: src/forms/store/DtrReceiptStore.jsx
 * Form ID: 78 | Route: /form/daily-transaction-register-store-receipt
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Spinner, Table, Badge, Button } from 'react-bootstrap';
import { AFCStoreFormLayout, UniversalAFCStoreFormField } from '../components';
import { addData, fetchData } from '../../../reducer/store/DtrReceiptStoreReducer';
import { formatDate, formatTime } from '../../../data/formatDate';

const DailyTransactionReceiptStoreForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const dtrreceipt = useSelector(state => state.dtrreceipt);
  const { data, loading, error } = dtrreceipt || {};

  // Form state
  const [formData, setFormData] = useState({
    date: formatDate(new Date().toDateString()),
    material_desc: '',
    material_id: '',
    serial_no: '',
    qty: '',
    challan_no: '',
    for_whatWork: '',
    challan_date: '',
    received_name: '',
    received_designation: '',
    ledger_no: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [items, setItems] = useState([]);

  // Fetch existing data
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (dtrreceipt.data?.data) {
      setItems(dtrreceipt.data.data);
    }
  }, [dtrreceipt]);

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

    if (!formData.challan_no.trim()) {
      newErrors.challan_no = 'Challan number is required';
    }

    if (!formData.challan_date.trim()) {
      newErrors.challan_date = 'Challan date is required';
    }

    if (!formData.received_name.trim()) {
      newErrors.received_name = 'Receiver name is required';
    }

    if (!formData.received_designation.trim()) {
      newErrors.received_designation = 'Receiver designation is required';
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
      await dispatch(addData(formData));
      setSubmitSuccess(true);
      
      // Reset form after success
      setFormData({
        date: formatDate(new Date().toDateString()),
        material_desc: '',
        material_id: '',
        serial_no: '',
        qty: '',
        challan_no: '',
        for_whatWork: '',
        challan_date: '',
        received_name: '',
        received_designation: '',
        ledger_no: ''
      });

      // Refresh data
      dispatch(fetchData());
    } catch (err) {
      setErrors({ submit: 'Failed to submit receipt register. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AFCStoreFormLayout
      title="Daily Transaction Receipt Register Store"
      subtitle="Material Receiving & Inventory Management"
      breadcrumbs={[
        { label: 'AFC-Store', href: '/department/afc-store' },
        { label: 'Transaction Management', href: '/department/afc-store/transactions' },
        { label: 'Receipt Register', active: true }
      ]}
    >
      <Container fluid>
        {/* Success Alert */}
        {submitSuccess && (
          <Alert variant="success" className="mb-4">
            <Alert.Heading>✅ Success!</Alert.Heading>
            Material receipt registered successfully!
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
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                  <i className="fas fa-plus-circle me-2"></i>
                  Add New Material Receipt
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
                        label="Receipt Date *"
                        value={formData.date}
                        onChange={(value) => handleFieldChange('date', value)}
                        error={errors.date}
                        required
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

                    {/* Challan Number */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="challan_no"
                        label="Challan Number *"
                        value={formData.challan_no}
                        onChange={(value) => handleFieldChange('challan_no', value)}
                        placeholder="Enter challan number"
                        error={errors.challan_no}
                        required
                      />
                    </Col>

                    {/* Challan Date */}
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="date"
                        name="challan_date"
                        label="Challan Date *"
                        value={formData.challan_date}
                        onChange={(value) => handleFieldChange('challan_date', value)}
                        error={errors.challan_date}
                        required
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
                        placeholder="Purpose of material"
                      />
                    </Col>

                    {/* Received by Name */}
                    <Col md={4} className="mb-3">
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
                    <Col md={4} className="mb-3">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="received_designation"
                        label="Designation *"
                        value={formData.received_designation}
                        onChange={(value) => handleFieldChange('received_designation', value)}
                        placeholder="Enter designation"
                        error={errors.received_designation}
                        required
                      />
                    </Col>

                    {/* Ledger Number */}
                    <Col md={12} className="mb-4">
                      <UniversalAFCStoreFormField
                        type="text"
                        name="ledger_no"
                        label="Ledger Number"
                        value={formData.ledger_no}
                        onChange={(value) => handleFieldChange('ledger_no', value)}
                        placeholder="Enter ledger reference number"
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
                      className="btn btn-success me-2"
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
                          <i className="fas fa-plus me-1"></i>
                          Add Receipt Entry
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Receipt History */}
        <Row>
          <Col lg={12}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="fas fa-history me-2"></i>
                  Recent Receipt Entries
                </h5>
                <Badge bg="light" text="dark">
                  {items.length} entries
                </Badge>
              </Card.Header>

              <Card.Body className="p-0">
                {loading ? (
                  <div className="text-center p-4">
                    <Spinner animation="border" variant="primary" />
                    <div className="mt-2">Loading receipt history...</div>
                  </div>
                ) : items.length > 0 ? (
                  <div className="table-responsive">
                    <Table striped hover className="mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th>Date</th>
                          <th>Material ID</th>
                          <th>Description</th>
                          <th>Qty</th>
                          <th>Challan No.</th>
                          <th>Received By</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.slice(0, 10).map((item, index) => (
                          <tr key={index}>
                            <td>{item.date}</td>
                            <td>
                              <code>{item.material_id}</code>
                            </td>
                            <td>
                              <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                {item.material_desc}
                              </div>
                            </td>
                            <td>
                              <Badge bg="primary">{item.qty}</Badge>
                            </td>
                            <td>{item.challan_no}</td>
                            <td>
                              <div>
                                <strong>{item.received_name}</strong>
                                <br />
                                <small className="text-muted">{item.received_designation}</small>
                              </div>
                            </td>
                            <td>
                              <Badge bg="success">Received</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center p-4 text-muted">
                    <i className="fas fa-inbox fa-2x mb-2"></i>
                    <div>No receipt entries found</div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AFCStoreFormLayout>
  );
};

export default DailyTransactionReceiptStoreForm;