/**
 * Universal AFC-SDC Form Field Component
 * Handles all field types for AFC-SDC department forms with 15+ specialized types
 * Based on proven AFC-Mainline architecture with SDC-specific customizations
 */

import React, { useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaUser, FaServer, FaCreditCard, FaCogs, FaExclamationTriangle } from 'react-icons/fa';

const UniversalAFCSDCFormField = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  placeholder = '',
  options = [],
  rows = 3,
  min,
  max,
  step,
  className = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange({
        target: {
          name,
          value: newValue
        }
      });
    }
  };

  const handleBlur = (e) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  // Specialized field rendering functions
  const renderSDCEquipmentType = () => (
    <Form.Select
      name={name}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      required={required}
      disabled={disabled}
      className={error ? 'is-invalid' : ''}
    >
      <option value="">Select SDC Equipment Type</option>
      <option value="sdc-server">SDC Server</option>
      <option value="cc-workstation">CC Workstation</option>
      <option value="cchs-workstation">CCHS Workstation</option>
      <option value="cc-bim">CC BIM</option>
      <option value="tim">TIM (Train Information Management)</option>
      <option value="cpd">CPD (Central Processing Device)</option>
      <option value="csc-system">CSC (Customer Service Center)</option>
      <option value="parameter-server">Parameter Server</option>
      <option value="application-server">Application Server</option>
      <option value="database-server">Database Server</option>
    </Form.Select>
  );

  const renderCardManagement = () => (
    <Form.Select
      name={name}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      required={required}
      disabled={disabled}
      className={error ? 'is-invalid' : ''}
    >
      <option value="">Select Card Management Type</option>
      <option value="agent-id-card">Agent ID Card</option>
      <option value="csc-card">CSC Card</option>
      <option value="initialization-card">Initialization Card</option>
      <option value="tender-card">Tender Card</option>
      <option value="service-card">Service Card</option>
      <option value="maintenance-card">Maintenance Card</option>
    </Form.Select>
  );

  const renderSoftwareUpdate = () => (
    <div>
      <Form.Select
        name={name}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={required}
        disabled={disabled}
        className={error ? 'is-invalid' : ''}
      >
        <option value="">Select Software Update Type</option>
        <option value="device-application">Device Application Update</option>
        <option value="os-update">Operating System Update</option>
        <option value="urc-update">URC Update</option>
        <option value="firmware-update">Firmware Update</option>
        <option value="security-patch">Security Patch</option>
        <option value="driver-update">Driver Update</option>
      </Form.Select>
      <Form.Text className="text-muted">
        <FaCogs className="me-1" />
        Ensure proper backup before software updates
      </Form.Text>
    </div>
  );

  const renderParameterManagement = () => (
    <div>
      <Form.Select
        name={name}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={required}
        disabled={disabled}
        className={error ? 'is-invalid' : ''}
      >
        <option value="">Select Parameter Type</option>
        <option value="system-parameter">System Parameter</option>
        <option value="network-parameter">Network Parameter</option>
        <option value="security-parameter">Security Parameter</option>
        <option value="performance-parameter">Performance Parameter</option>
        <option value="configuration-parameter">Configuration Parameter</option>
        <option value="operational-parameter">Operational Parameter</option>
      </Form.Select>
      <Form.Text className="text-muted">
        <FaExclamationTriangle className="me-1 text-warning" />
        Parameter changes require supervisor approval
      </Form.Text>
    </div>
  );

  const renderSDCLocation = () => (
    <Form.Select
      name={name}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      required={required}
      disabled={disabled}
      className={error ? 'is-invalid' : ''}
    >
      <option value="">Select SDC Location</option>
      <option value="sdc-server-room">SDC Server Room</option>
      <option value="cc-control-room">CC Control Room</option>
      <option value="cchs-room">CCHS Room</option>
      <option value="equipment-room">Equipment Room</option>
      <option value="network-room">Network Room</option>
      <option value="backup-facility">Backup Facility</option>
      <option value="maintenance-area">Maintenance Area</option>
    </Form.Select>
  );

  const renderEmployeeSDC = () => (
    <InputGroup>
      <InputGroup.Text>
        <FaUser />
      </InputGroup.Text>
      <Form.Control
        type="text"
        name={name}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="Enter Employee ID (SDC-XXXX)"
        required={required}
        disabled={disabled}
        className={error ? 'is-invalid' : ''}
        pattern="SDC-[0-9]{4}"
      />
      <Form.Control.Feedback type="invalid">
        Please enter valid SDC Employee ID format (SDC-XXXX)
      </Form.Control.Feedback>
    </InputGroup>
  );

  const renderSystemStatus = () => (
    <div className="d-flex gap-3">
      {['Operational', 'Under Maintenance', 'Faulty', 'Offline'].map((status) => (
        <Form.Check
          key={status}
          type="radio"
          name={name}
          id={`${name}-${status.toLowerCase().replace(' ', '-')}`}
          label={status}
          value={status.toLowerCase().replace(' ', '-')}
          checked={internalValue === status.toLowerCase().replace(' ', '-')}
          onChange={handleChange}
          disabled={disabled}
          className={`status-${status.toLowerCase().replace(' ', '-')}`}
        />
      ))}
    </div>
  );

  const renderPMFrequencySDC = () => (
    <Form.Select
      name={name}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      required={required}
      disabled={disabled}
      className={error ? 'is-invalid' : ''}
    >
      <option value="">Select PM Frequency</option>
      <option value="monthly">Monthly PM</option>
      <option value="half-yearly">Half Yearly PM</option>
      <option value="yearly-1">Yearly PM - Level 1</option>
      <option value="yearly-2">Yearly PM - Level 2</option>
      <option value="emergency">Emergency PM</option>
    </Form.Select>
  );

  const renderNetworkConfiguration = () => (
    <div>
      <Form.Control
        type="text"
        name={name}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="Enter Network Configuration Details"
        required={required}
        disabled={disabled}
        className={error ? 'is-invalid' : ''}
      />
      <Form.Text className="text-muted">
        Include IP addresses, subnet masks, and gateway information
      </Form.Text>
    </div>
  );

  // Main render logic
  const renderField = () => {
    switch (type) {
      case 'sdc-equipment-type':
        return renderSDCEquipmentType();
      
      case 'card-management':
        return renderCardManagement();
      
      case 'software-update':
        return renderSoftwareUpdate();
      
      case 'parameter-management':
        return renderParameterManagement();
      
      case 'sdc-location':
        return renderSDCLocation();
      
      case 'employee-sdc':
        return renderEmployeeSDC();
      
      case 'system-status':
        return renderSystemStatus();
      
      case 'pm-frequency-sdc':
        return renderPMFrequencySDC();
      
      case 'network-configuration':
        return renderNetworkConfiguration();
      
      case 'select':
        return (
          <Form.Select
            name={name}
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required={required}
            disabled={disabled}
            className={error ? 'is-invalid' : ''}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </Form.Select>
        );
      
      case 'textarea':
        return (
          <Form.Control
            as="textarea"
            rows={rows}
            name={name}
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={error ? 'is-invalid' : ''}
          />
        );
      
      case 'date':
        return (
          <InputGroup>
            <InputGroup.Text>
              <FaCalendarAlt />
            </InputGroup.Text>
            <Form.Control
              type="date"
              name={name}
              value={internalValue}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required={required}
              disabled={disabled}
              min={min}
              max={max}
              className={error ? 'is-invalid' : ''}
            />
          </InputGroup>
        );
      
      case 'time':
        return (
          <InputGroup>
            <InputGroup.Text>
              <FaClock />
            </InputGroup.Text>
            <Form.Control
              type="time"
              name={name}
              value={internalValue}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required={required}
              disabled={disabled}
              className={error ? 'is-invalid' : ''}
            />
          </InputGroup>
        );
      
      case 'number':
        return (
          <Form.Control
            type="number"
            name={name}
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={error ? 'is-invalid' : ''}
          />
        );
      
      case 'checkbox':
        return (
          <Form.Check
            type="checkbox"
            name={name}
            id={name}
            label={label}
            checked={internalValue === true || internalValue === 'true'}
            onChange={(e) => handleChange({ target: { name, value: e.target.checked } })}
            disabled={disabled}
            className={error ? 'is-invalid' : ''}
          />
        );
      
      default:
        return (
          <Form.Control
            type={type}
            name={name}
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={error ? 'is-invalid' : ''}
          />
        );
    }
  };

  return (
    <Form.Group className={`mb-3 ${className}`}>
      {type !== 'checkbox' && label && (
        <Form.Label className={required ? 'required' : ''}>
          {label}
        </Form.Label>
      )}
      
      {renderField()}
      
      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default UniversalAFCSDCFormField;