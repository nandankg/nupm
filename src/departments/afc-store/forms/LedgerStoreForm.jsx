/**
 * Ledger Store Form
 * AFC-Store Department - Financial Ledger & Inventory Tracking
 * Migration from: src/forms/store/LedgerForm.jsx
 * Form ID: 81 | Route: /form/ledger-store
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Spinner, Table, Badge, Button } from 'react-bootstrap';
import { AFCStoreFormLayout, UniversalAFCStoreFormField } from '../components';
import { addData } from '../../../reducer/store/DtrIssueStoreReducer';
import { formatDate } from '../../../data/formatDate';

const LedgerStoreForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const DtrIssueStoreList = useSelector((state) => state.dtrissue);
  const { loading, error } = DtrIssueStoreList || {};

  // Form state - Multiple entries for ledger
  const [formData, setFormData] = useState([
    {
      date: formatDate(new Date().toDateString()),
      fromWhomReceivedOrIssued: '',
      refOfReceiptOrIssueNote: '',
      receiptQty: '',
      issuedQty: '',
      balanceQty: '',
      signOfIssuer: '',
      signOfControllingOfficer: '',
      remarks: ''
    }
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes for specific row and field
  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);

    // Auto-calculate balance for quantity fields
    if (field === 'receiptQty' || field === 'issuedQty') {
      const receiptQty = parseFloat(newFormData[index].receiptQty) || 0;
      const issuedQty = parseFloat(newFormData[index].issuedQty) || 0;
      const previousBalance = index > 0 ? parseFloat(formData[index - 1].balanceQty) || 0 : 0;
      
      newFormData[index].balanceQty = (previousBalance + receiptQty - issuedQty).toString();
      setFormData(newFormData);
    }

    // Clear errors for this row
    if (errors[index] && errors[index][field]) {
      const newErrors = { ...errors };
      delete newErrors[index][field];
      setErrors(newErrors);
    }
  };

  // Add new ledger row
  const handleAddRow = () => {
    const lastBalance = formData.length > 0 ? parseFloat(formData[formData.length - 1].balanceQty) || 0 : 0;
    
    setFormData([
      ...formData,
      {
        date: formatDate(new Date().toDateString()),
        fromWhomReceivedOrIssued: '',
        refOfReceiptOrIssueNote: '',
        receiptQty: '',
        issuedQty: '',
        balanceQty: lastBalance.toString(),
        signOfIssuer: '',
        signOfControllingOfficer: '',
        remarks: ''
      }
    ]);
  };

  // Remove ledger row
  const handleRemoveRow = (index) => {
    if (formData.length > 1) {
      const newFormData = formData.filter((_, i) => i !== index);
      setFormData(newFormData);
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    formData.forEach((entry, index) => {
      const rowErrors = {};

      if (!entry.date.trim()) {
        rowErrors.date = 'Date is required';
      }

      if (!entry.fromWhomReceivedOrIssued.trim()) {
        rowErrors.fromWhomReceivedOrIssued = 'From/To information is required';
      }

      if (!entry.refOfReceiptOrIssueNote.trim()) {
        rowErrors.refOfReceiptOrIssueNote = 'Reference is required';
      }

      // At least one quantity should be specified
      if (!entry.receiptQty && !entry.issuedQty) {
        rowErrors.quantity = 'Either receipt or issue quantity must be specified';
      }

      if (Object.keys(rowErrors).length > 0) {
        newErrors[index] = rowErrors;
      }
    });

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
      const ledgerData = {
        entries: formData,
        timestamp: new Date().toISOString(),
        totalEntries: formData.length
      };

      await dispatch(addData(ledgerData));
      setSubmitSuccess(true);
      
      // Reset form after success
      setFormData([
        {
          date: formatDate(new Date().toDateString()),
          fromWhomReceivedOrIssued: '',
          refOfReceiptOrIssueNote: '',
          receiptQty: '',
          issuedQty: '',
          balanceQty: '',
          signOfIssuer: '',
          signOfControllingOfficer: '',
          remarks: ''
        }
      ]);

    } catch (err) {
      setErrors({ submit: 'Failed to submit ledger entries. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    const totalReceipts = formData.reduce((sum, entry) => sum + (parseFloat(entry.receiptQty) || 0), 0);
    const totalIssues = formData.reduce((sum, entry) => sum + (parseFloat(entry.issuedQty) || 0), 0);
    const finalBalance = formData.length > 0 ? parseFloat(formData[formData.length - 1].balanceQty) || 0 : 0;

    return { totalReceipts, totalIssues, finalBalance };
  };

  const { totalReceipts, totalIssues, finalBalance } = calculateTotals();

  return (
    <AFCStoreFormLayout
      title="Ledger Store"
      subtitle="Financial Ledger & Inventory Balance Management"
      breadcrumbs={[
        { label: 'AFC-Store', href: '/department/afc-store' },
        { label: 'Financial Management', href: '/department/afc-store/financial' },
        { label: 'Ledger', active: true }
      ]}
    >
      <Container fluid>
        {/* Success Alert */}
        {submitSuccess && (
          <Alert variant="success" className="mb-4">
            <Alert.Heading>✅ Success!</Alert.Heading>
            Ledger entries submitted successfully! Total entries: <strong>{formData.length}</strong>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>❌ Error</Alert.Heading>
            {error}
          </Alert>
        )}

        {/* Information Alert */}
        <Alert variant="info" className="mb-4">
          <Alert.Heading>
            <i className="fas fa-info-circle me-2"></i>
            Ledger Information
          </Alert.Heading>
          <p className="mb-0">
            <strong>Note:</strong> Ledger data is primarily populated through DTR Receipt and DTR Issue forms. 
            This form allows manual entries for special transactions or corrections.
          </p>
        </Alert>

        {/* Summary Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center bg-success bg-opacity-10">
              <Card.Body>
                <h4 className="text-success">{totalReceipts}</h4>
                <small className="text-muted">Total Receipts</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center bg-warning bg-opacity-10">
              <Card.Body>
                <h4 className="text-warning">{totalIssues}</h4>
                <small className="text-muted">Total Issues</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center bg-info bg-opacity-10">
              <Card.Body>
                <h4 className="text-info">{finalBalance}</h4>
                <small className="text-muted">Current Balance</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center bg-primary bg-opacity-10">
              <Card.Body>
                <h4 className="text-primary">{formData.length}</h4>
                <small className="text-muted">Total Entries</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Ledger Form */}
        <Row>
          <Col lg={12}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="fas fa-book me-2"></i>
                  Store Ledger Entries
                </h5>
                <Button 
                  variant="light" 
                  size="sm" 
                  onClick={handleAddRow}
                  disabled={isSubmitting}
                >
                  <i className="fas fa-plus me-1"></i>
                  Add Entry
                </Button>
              </Card.Header>

              <Card.Body className="p-0">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="table-responsive">
                    <Table className="mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th style={{ width: '100px' }}>Date *</th>
                          <th style={{ width: '150px' }}>From/To *</th>
                          <th style={{ width: '120px' }}>Reference *</th>
                          <th style={{ width: '80px' }}>Receipt Qty</th>
                          <th style={{ width: '80px' }}>Issue Qty</th>
                          <th style={{ width: '80px' }}>Balance</th>
                          <th style={{ width: '120px' }}>Issuer Sign</th>
                          <th style={{ width: '120px' }}>Officer Sign</th>
                          <th style={{ width: '100px' }}>Remarks</th>
                          <th style={{ width: '60px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.map((entry, index) => (
                          <tr key={index} className={errors[index] ? 'table-danger' : ''}>
                            <td>
                              <UniversalAFCStoreFormField
                                type="date"
                                name={`date_${index}`}
                                value={entry.date}
                                onChange={(value) => handleInputChange(index, 'date', value)}
                                error={errors[index]?.date}
                                size="sm"
                              />
                            </td>
                            <td>
                              <UniversalAFCStoreFormField
                                type="text"
                                name={`fromWhom_${index}`}
                                value={entry.fromWhomReceivedOrIssued}
                                onChange={(value) => handleInputChange(index, 'fromWhomReceivedOrIssued', value)}
                                placeholder="From/To person"
                                error={errors[index]?.fromWhomReceivedOrIssued}
                                size="sm"
                              />
                            </td>
                            <td>
                              <UniversalAFCStoreFormField
                                type="text"
                                name={`ref_${index}`}
                                value={entry.refOfReceiptOrIssueNote}
                                onChange={(value) => handleInputChange(index, 'refOfReceiptOrIssueNote', value)}
                                placeholder="Ref. number"
                                error={errors[index]?.refOfReceiptOrIssueNote}
                                size="sm"
                              />
                            </td>
                            <td>
                              <UniversalAFCStoreFormField
                                type="number"
                                name={`receiptQty_${index}`}
                                value={entry.receiptQty}
                                onChange={(value) => handleInputChange(index, 'receiptQty', value)}
                                placeholder="0"
                                min="0"
                                step="0.01"
                                size="sm"
                              />
                            </td>
                            <td>
                              <UniversalAFCStoreFormField
                                type="number"
                                name={`issuedQty_${index}`}
                                value={entry.issuedQty}
                                onChange={(value) => handleInputChange(index, 'issuedQty', value)}
                                placeholder="0"
                                min="0"
                                step="0.01"
                                size="sm"
                              />
                            </td>
                            <td>
                              <UniversalAFCStoreFormField
                                type="number"
                                name={`balanceQty_${index}`}
                                value={entry.balanceQty}
                                onChange={(value) => handleInputChange(index, 'balanceQty', value)}
                                placeholder="0"
                                step="0.01"
                                disabled={true}
                                size="sm"
                              />
                            </td>
                            <td>
                              <UniversalAFCStoreFormField
                                type="text"
                                name={`issuerSign_${index}`}
                                value={entry.signOfIssuer}
                                onChange={(value) => handleInputChange(index, 'signOfIssuer', value)}
                                placeholder="Issuer name"
                                size="sm"
                              />
                            </td>
                            <td>
                              <UniversalAFCStoreFormField
                                type="text"
                                name={`officerSign_${index}`}
                                value={entry.signOfControllingOfficer}
                                onChange={(value) => handleInputChange(index, 'signOfControllingOfficer', value)}
                                placeholder="Officer name"
                                size="sm"
                              />
                            </td>
                            <td>
                              <UniversalAFCStoreFormField
                                type="textarea"
                                name={`remarks_${index}`}
                                value={entry.remarks}
                                onChange={(value) => handleInputChange(index, 'remarks', value)}
                                placeholder="Remarks"
                                rows={1}
                                size="sm"
                              />
                            </td>
                            <td>
                              {formData.length > 1 && (
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleRemoveRow(index)}
                                  disabled={isSubmitting}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="table-light">
                        <tr>
                          <td colSpan="3"><strong>Totals:</strong></td>
                          <td><Badge bg="success">{totalReceipts}</Badge></td>
                          <td><Badge bg="warning">{totalIssues}</Badge></td>
                          <td><Badge bg="info">{finalBalance}</Badge></td>
                          <td colSpan="4"></td>
                        </tr>
                      </tfoot>
                    </Table>
                  </div>

                  {/* Validation Errors */}
                  {Object.keys(errors).length > 0 && errors.submit && (
                    <Alert variant="danger" className="m-3">
                      {errors.submit}
                    </Alert>
                  )}

                  {Object.keys(errors).some(key => !isNaN(key) && errors[key].quantity) && (
                    <Alert variant="warning" className="m-3">
                      <strong>Validation Error:</strong> Please ensure each entry has either receipt or issue quantity specified.
                    </Alert>
                  )}

                  {/* Form Actions */}
                  <div className="p-3 border-top bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted">
                        <small>
                          <i className="fas fa-info-circle me-1"></i>
                          Balance is auto-calculated based on previous balance + receipts - issues
                        </small>
                      </div>
                      
                      <div>
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
                              Submitting...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save me-1"></i>
                              Submit Ledger Entries ({formData.length})
                            </>
                          )}
                        </button>
                      </div>
                    </div>
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

export default LedgerStoreForm;