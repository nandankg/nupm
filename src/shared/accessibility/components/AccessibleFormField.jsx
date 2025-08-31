import React from 'react';

const AccessibleFormField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  required = false,
  error = null,
  helpText = null,
  placeholder = '',
  options = [],
  className = '',
  disabled = false,
  'aria-describedby': ariaDescribedBy,
  ...otherProps
}) => {
  const fieldId = id || name;
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;
  
  const describedBy = [
    ariaDescribedBy,
    error ? errorId : null,
    helpText ? helpId : null,
  ].filter(Boolean).join(' ') || undefined;

  const commonProps = {
    id: fieldId,
    name,
    value,
    onChange,
    onBlur,
    required,
    disabled,
    placeholder,
    className: `form-control ${error ? 'is-invalid' : ''} ${className}`.trim(),
    'aria-describedby': describedBy,
    'aria-invalid': error ? 'true' : 'false',
    ...otherProps,
  };

  const renderField = () => {
    switch (type) {
      case 'select':
        return (
          <select {...commonProps}>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option, index) => (
              <option key={option.value || index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return <textarea {...commonProps} rows={4} />;
      
      case 'radio':
        return (
          <div role="radiogroup" aria-labelledby={`${fieldId}-label`}>
            {options.map((option, index) => {
              const optionId = `${fieldId}-${index}`;
              return (
                <div key={optionId} className="form-check">
                  <input
                    type="radio"
                    id={optionId}
                    name={name}
                    value={option.value || option}
                    checked={value === (option.value || option)}
                    onChange={onChange}
                    className="form-check-input"
                    disabled={disabled}
                    aria-describedby={describedBy}
                  />
                  <label htmlFor={optionId} className="form-check-label">
                    {option.label || option}
                  </label>
                </div>
              );
            })}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="form-check">
            <input
              {...commonProps}
              type="checkbox"
              checked={value || false}
              className={`form-check-input ${error ? 'is-invalid' : ''} ${className}`.trim()}
            />
            <label htmlFor={fieldId} className="form-check-label">
              {label}
            </label>
          </div>
        );
      
      default:
        return <input {...commonProps} type={type} />;
    }
  };

  return (
    <div className={`mb-3 ${type === 'checkbox' ? '' : 'form-group'}`}>
      {type !== 'checkbox' && label && (
        <label 
          htmlFor={fieldId} 
          className={`form-label ${required ? 'required' : ''}`}
          id={`${fieldId}-label`}
        >
          {label}
          {required && <span className="text-danger ms-1" aria-label="required">*</span>}
        </label>
      )}
      
      {renderField()}
      
      {helpText && (
        <div id={helpId} className="form-text text-muted">
          {helpText}
        </div>
      )}
      
      {error && (
        <div 
          id={errorId} 
          className="invalid-feedback d-block" 
          role="alert"
          aria-live="polite"
        >
          {error.message || error}
        </div>
      )}
    </div>
  );
};

export default AccessibleFormField;