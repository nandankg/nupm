import React from 'react';
import UniversalSignallingFormField from './UniversalSignallingFormField';
import SignallingFormLayout from './SignallingFormLayout';

/**
 * Universal Signalling Components Collection
 * 
 * Centralized export for all signalling department components
 * Provides consistent interface for form building and maintenance
 */

// Container components
export const FormContainer = ({ children, className = "", ...props }) => (
  <div className={`form-container ${className}`} {...props}>
    {children}
  </div>
);

export const FormSection = ({ children, title, className = "", ...props }) => (
  <div className={`form-section ${className}`} {...props}>
    {title && <h3 className="section-title">{title}</h3>}
    {children}
  </div>
);

export const SectionHeader = ({ children, className = "", ...props }) => (
  <h4 className={`section-header ${className}`} {...props}>
    {children}
  </h4>
);

// Layout components
export const FormRow = ({ children, className = "", ...props }) => (
  <div className={`row ${className}`} {...props}>
    {children}
  </div>
);

// Field components
export const FormField = ({ label, required, children, className = "", error, ...props }) => (
  <div className={`col-md-6 mb-3 ${className}`} {...props}>
    {label && (
      <label className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
    )}
    {children}
    {error && <div className="text-danger small">{error}</div>}
  </div>
);

export const DateField = ({ name, value, onChange, required, className = "", error, label, ...props }) => (
  <FormField label={label} required={required} error={error}>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      className={`form-control ${className}`}
      required={required}
      {...props}
    />
  </FormField>
);

export const SelectField = ({ name, value, onChange, options = [], required, className = "", error, label, ...props }) => (
  <FormField label={label} required={required} error={error}>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`form-control ${className}`}
      required={required}
      {...props}
    >
      <option value="">Select...</option>
      {options.map((option, index) => (
        <option key={index} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  </FormField>
);

export const TextAreaField = ({ name, value, onChange, required, className = "", error, label, rows = 3, ...props }) => (
  <FormField label={label} required={required} error={error}>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`form-control ${className}`}
      required={required}
      rows={rows}
      {...props}
    />
  </FormField>
);

export const TextInput = ({ name, value, onChange, required, className = "", error, label, type = "text", ...props }) => (
  <FormField label={label} required={required} error={error}>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`form-control ${className}`}
      required={required}
      {...props}
    />
  </FormField>
);

export const MonthField = ({ name, value, onChange, required, className = "", error, label, ...props }) => (
  <FormField label={label} required={required} error={error}>
    <input
      type="month"
      name={name}
      value={value}
      onChange={onChange}
      className={`form-control ${className}`}
      required={required}
      {...props}
    />
  </FormField>
);

export const CheckboxGroup = ({ name, value, onChange, options = [], className = "", error, label, ...props }) => (
  <FormField label={label} error={error} className={className}>
    {options.map((option, index) => (
      <div key={index} className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={`${name}-${index}`}
          name={name}
          value={option.value || option}
          checked={Array.isArray(value) ? value.includes(option.value || option) : false}
          onChange={onChange}
          {...props}
        />
        <label className="form-check-label" htmlFor={`${name}-${index}`}>
          {option.label || option}
        </label>
      </div>
    ))}
  </FormField>
);

// Specialized field components
export const RemarkField = ({ name, value, onChange, className = "", error, label = "Remarks", ...props }) => (
  <TextAreaField
    name={name}
    value={value}
    onChange={onChange}
    label={label}
    error={error}
    className={className}
    rows={2}
    {...props}
  />
);

export const ActionField = ({ name, value, onChange, className = "", error, label = "Action Taken", ...props }) => (
  <TextAreaField
    name={name}
    value={value}
    onChange={onChange}
    label={label}
    error={error}
    className={className}
    rows={2}
    {...props}
  />
);

export const DeficiencyField = ({ name, value, onChange, className = "", error, label = "Deficiency", ...props }) => (
  <TextAreaField
    name={name}
    value={value}
    onChange={onChange}
    label={label}
    error={error}
    className={className}
    rows={2}
    {...props}
  />
);

export const SignatureSection = ({ children, className = "", ...props }) => (
  <div className={`signature-section mt-4 ${className}`} {...props}>
    <h5>Signatures</h5>
    <div className="row">
      {children}
    </div>
  </div>
);

// Re-export individual components
export { UniversalSignallingFormField };
export { SignallingFormLayout };

// Export default collection
const UniversalSignallingComponents = {
  FormField: UniversalSignallingFormField,
  FormLayout: SignallingFormLayout,
  FormContainer,
  FormSection,
  FormRow,
  DateField,
  SelectField,
  TextAreaField,
  TextInput,
  MonthField,
  CheckboxGroup,
  RemarkField,
  ActionField,
  DeficiencyField,
  SectionHeader,
  SignatureSection
};

export default UniversalSignallingComponents;