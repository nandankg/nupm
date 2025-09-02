/**
 * AFC-SDC Form Layout Component
 * Universal layout wrapper for all AFC-SDC department forms
 * Provides consistent branding, navigation, and structure
 * Based on proven AFC-Mainline architecture with SDC-specific customizations
 */

import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { FaServer, FaCreditCard, FaCogs, FaNetworkWired } from 'react-icons/fa';
import './AFCSDCFormLayout.css';

const AFCSDCFormLayout = ({ 
  title, 
  children, 
  onSubmit, 
  formData = {},
  category = 'default',
  showProgress = false,
  completionPercentage = 0
}) => {
  // Category icons for different AFC-SDC form types
  const categoryIcons = {
    'card-management': <FaCreditCard className="me-2 text-primary" />,
    'system-management': <FaServer className="me-2 text-success" />,
    'pm-maintenance': <FaCogs className="me-2 text-warning" />,
    'network-operations': <FaNetworkWired className="me-2 text-info" />,
    'default': <FaServer className="me-2 text-secondary" />
  };

  // Category colors for visual distinction
  const categoryColors = {
    'card-management': 'border-primary',
    'system-management': 'border-success', 
    'pm-maintenance': 'border-warning',
    'network-operations': 'border-info',
    'default': 'border-secondary'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Container fluid className="afc-sdc-form-container py-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <Card className={`shadow-sm ${categoryColors[category] || categoryColors.default}`}>
            <Card.Header className="bg-light">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  {categoryIcons[category] || categoryIcons.default}
                  <div>
                    <h4 className="mb-0">{title}</h4>
                    <small className="text-muted">AFC-SDC Department | UPMRC Form Management</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-info me-2">AFC-SDC</span>
                  {showProgress && (
                    <span className="badge bg-success">{completionPercentage}% Complete</span>
                  )}
                </div>
              </div>
            </Card.Header>
          </Card>
        </Col>
      </Row>

      {/* Navigation Breadcrumb */}
      <Row className="mb-3">
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-light p-2 rounded">
              <li className="breadcrumb-item">
                <a href="/dashboard" className="text-decoration-none">Dashboard</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/afc-sdc" className="text-decoration-none">AFC-SDC</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
        </Col>
      </Row>

      {/* Main Form Section */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit} className="afc-sdc-form">
                {/* Form Title with Icon */}
                <div className="form-header mb-4 pb-3 border-bottom">
                  <div className="d-flex align-items-center">
                    {categoryIcons[category] || categoryIcons.default}
                    <div>
                      <h5 className="mb-1">{title}</h5>
                      <p className="text-muted small mb-0">
                        System Development Center (SDC) Operations Form
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar for Multi-step Forms */}
                {showProgress && (
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="small text-muted">Form Progress</span>
                      <span className="small text-muted">{completionPercentage}% Complete</span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: `${completionPercentage}%` }}
                        aria-valuenow={completionPercentage} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                )}

                {/* Form Content */}
                <div className="form-content">
                  {children}
                </div>

                {/* Form Actions */}
                <div className="form-actions mt-4 pt-3 border-top">
                  <Row>
                    <Col md={6}>
                      <div className="d-flex gap-2">
                        <button
                          type="submit"
                          className="btn btn-primary px-4"
                        >
                          <i className="fas fa-save me-2"></i>
                          Submit Form
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary px-4"
                          onClick={() => window.history.back()}
                        >
                          <i className="fas fa-arrow-left me-2"></i>
                          Back
                        </button>
                      </div>
                    </Col>
                    <Col md={6} className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-info px-3"
                          onClick={() => window.print()}
                        >
                          <i className="fas fa-print me-2"></i>
                          Print
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-success px-3"
                        >
                          <i className="fas fa-download me-2"></i>
                          Export
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer Information */}
      <Row className="mt-4">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body className="p-2">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  AFC-SDC: System Development Center Operations
                </small>
                <small className="text-muted">
                  UPMRC © 2025 | Powered by Modern React Architecture
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AFCSDCFormLayout;