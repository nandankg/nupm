import React from 'react';

/**
 * Validated Form Field Component
 * 
 * A reusable form field component that provides consistent validation display
 * across all forms in the UPMRC application. This component eliminates the
 * inconsistency in error handling that currently exists across 226+ forms.
 * 
 * Features:
 * - Consistent error display
 * - Accessibility compliance (ARIA labels)
 * - Loading state support
 * - Multiple field type support
 * - Railway-specific styling
 */

const ValidatedFormField = ({
  // Field configuration
  type = 'text',
  name,
  label,
  placeholder,
  value = '',
  onChange,
  onBlur,
  
  // Validation props
  error,
  required = false,
  disabled = false,
  
  // Additional props
  options = [], // for select fields
  rows = 3, // for textarea
  className = '',
  helpText = '',
  
  // Accessibility props
  ariaLabel,
  ariaDescribedBy,
  ariaInvalid,
  
  // Railway-specific props
  stationData = [],
  employeeData = [],
  
  ...otherProps
}) => {
  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;
  
  // Generate ARIA described by
  const describedByIds = [
    error && errorId,
    helpText && helpId,
    ariaDescribedBy
  ].filter(Boolean).join(' ');

  /**
   * Render input field based on type
   */
  const renderField = () => {
    const commonProps = {
      id: fieldId,
      name,
      value,
      onChange,
      onBlur,
      disabled,
      required,
      className: `form-control ${error ? 'is-invalid' : ''} ${className}`,
      placeholder,
      'aria-label': ariaLabel || label,
      'aria-invalid': ariaInvalid || !!error,
      'aria-describedby': describedByIds || undefined,
      ...otherProps
    };

    switch (type) {
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option 
                key={option.value || index} 
                value={option.value || option}
              >
                {option.label || option}
              </option>
            ))}
          </select>
        );

      case 'station-select':
        return (
          <select {...commonProps}>
            <option value="">Select Station</option>
            {stationData
              .filter(station => station["Station Name"])
              .map((station) => (
                <option 
                  key={station["STATION Code"]} 
                  value={station["STATION Code"]}
                >
                  {station["Station Name"]} ({station["STATION Code"]})
                </option>
              ))}
          </select>
        );

      case 'employee-select':
        return (
          <select {...commonProps}>
            <option value="">Select Employee</option>
            {employeeData.map((employee) => (
              <option 
                key={employee.id} 
                value={employee.employeeId}
              >
                {employee.name} ({employee.employeeId})
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea 
            {...commonProps}
            rows={rows}
          />
        );

      case 'date':
        return (
          <input 
            {...commonProps}
            type="date"
            max={new Date().toISOString().split('T')[0]} // Prevent future dates
          />
        );

      case 'time':
        return (
          <input 
            {...commonProps}
            type="time"
            step="300" // 5-minute intervals
          />
        );

      case 'number':
        return (
          <input 
            {...commonProps}
            type="number"
            step="0.01"
          />
        );

      case 'tel':
        return (
          <input 
            {...commonProps}
            type="tel"
            pattern="[6-9][0-9]{9}"
            maxLength="10"
          />
        );

      case 'email':
        return (
          <input 
            {...commonProps}
            type="email"
          />
        );

      case 'railway-signal':
        return (
          <input 
            {...commonProps}
            type="text"
            pattern="[A-Z]{1,2}[0-9]{1,3}[A-Z]?"
            placeholder="e.g., S123, AB45C"
            style={{ textTransform: 'uppercase' }}
          />
        );

      case 'employee-id':
        return (
          <input 
            {...commonProps}
            type="text"
            pattern="[A-Z]{2,3}[0-9]{4,6}"
            placeholder="e.g., ABC1234"
            style={{ textTransform: 'uppercase' }}
            maxLength="9"
          />
        );

      case 'train-number':
        return (
          <input 
            {...commonProps}
            type="text"
            pattern="[0-9]{5}"
            placeholder="e.g., 12345"
            maxLength="5"
          />
        );

      case 'kilometrage':
        return (
          <input 
            {...commonProps}
            type="text"
            pattern="[0-9]{1,4}/[0-9]{1,4}"
            placeholder="e.g., 123/456"
          />
        );

      default:
        return (
          <input 
            {...commonProps}
            type={type}
          />
        );
    }
  };

  return (
    <div className="form-field-container mb-3">
      {/* Field Label */}
      <label 
        htmlFor={fieldId} 
        className={`form-label ${required ? 'required' : ''}`}
      >
        {label}
        {required && (
          <span 
            className="text-danger ms-1" 
            aria-label="required field"
          >
            *
          </span>
        )}
      </label>

      {/* Form Field */}
      {renderField()}

      {/* Help Text */}
      {helpText && (
        <div 
          id={helpId}
          className="form-text text-muted small"
        >
          {helpText}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div 
          id={errorId}
          className="invalid-feedback d-block"
          role="alert"
          aria-live="polite"
        >
          <i className="fas fa-exclamation-triangle me-1"></i>
          {error}
        </div>
      )}

      {/* Success State (when field was invalid but now valid) */}
      {!error && value && required && (
        <div className="valid-feedback">
          <i className="fas fa-check me-1"></i>
          Valid
        </div>
      )}
    </div>
  );
};

/**
 * Specialized components for common railway form patterns
 */

export const IncidentFormField = ({ type, ...props }) => {
  const incidentHelpTexts = {
    'incident-type': 'Select the most appropriate incident category',
    'severity': 'Choose severity based on operational impact and safety risk',
    'description': 'Provide detailed description for investigation and follow-up',
    'immediate-action': 'Describe actions taken at the time of incident'
  };

  return (
    <ValidatedFormField
      type={type}
      helpText={incidentHelpTexts[type] || props.helpText}
      {...props}
    />
  );
};

export const MaintenanceFormField = ({ type, ...props }) => {
  const maintenanceHelpTexts = {
    'equipment-id': 'Enter equipment identification number',
    'maintenance-type': 'Select scheduled or breakdown maintenance',
    'status': 'Current status of maintenance activity'
  };

  return (
    <ValidatedFormField
      type={type}
      helpText={maintenanceHelpTexts[type] || props.helpText}
      {...props}
    />
  );
};

export const EmployeeFormField = ({ type, ...props }) => {
  const employeeHelpTexts = {
    'employee-id': 'Format: 2-3 letters followed by 4-6 digits (e.g., ABC1234)',
    'designation': 'Official designation as per HR records',
    'department': 'Select your working department'
  };

  return (
    <ValidatedFormField
      type={type}
      helpText={employeeHelpTexts[type] || props.helpText}
      {...props}
    />
  );
};

export default React.memo(ValidatedFormField);