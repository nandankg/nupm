import React from "react";
import { TextField, MenuItem } from "@mui/material";

/**
 * Universal Finance Form Field Component
 * 
 * Reduces code duplication across Finance forms while preserving exact field behavior
 */
const UniversalFinanceFormField = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  options = [],
  required = false,
  readOnly = false,
  error = null,
  helperText = null,
  placeholder = "",
  multiline = false,
  rows = 1,
  className = "",
  disabled = false,
  ...props
}) => {
  // Handle error state
  const hasError = !!error;
  const displayHelperText = error || helperText;

  // Standard HTML input for simple text fields (preserving original behavior)
  if (type === "select" && !options.length) {
    return (
      <div className="mb-3">
        <label htmlFor={name} className={`form-label ${className}`}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          required={required}
          disabled={disabled}
          {...props}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
        </select>
        {displayHelperText && (
          <div className={`small mt-1 ${hasError ? 'text-danger' : 'text-muted'}`} role={hasError ? 'alert' : undefined}>
            {displayHelperText}
          </div>
        )}
      </div>
    );
  }

  // Select dropdown with options
  if (type === "select") {
    return (
      <div className="mb-3">
        <label htmlFor={name} className={`form-label ${className}`}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          required={required}
          disabled={disabled}
          {...props}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
        {displayHelperText && (
          <div className={`small mt-1 ${hasError ? 'text-danger' : 'text-muted'}`} role={hasError ? 'alert' : undefined}>
            {displayHelperText}
          </div>
        )}
      </div>
    );
  }

  // Material-UI TextField for enhanced inputs
  if (type === "mui-text" || type === "mui-select") {
    return (
      <TextField
        fullWidth
        select={type === "mui-select"}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        variant="outlined"
        size="small"
        type={type === "mui-text" ? "text" : undefined}
        required={required}
        disabled={disabled || readOnly}
        error={hasError}
        helperText={displayHelperText}
        multiline={multiline}
        rows={rows}
        InputProps={{
          readOnly: readOnly,
        }}
        InputLabelProps={
          type === "date" ? { shrink: true } : undefined
        }
        className={className}
        {...props}
      >
        {type === "mui-select" && (
          <>
            <MenuItem value="">{placeholder || `Select ${label}`}</MenuItem>
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value || option}>
                {option.label || option}
              </MenuItem>
            ))}
          </>
        )}
      </TextField>
    );
  }

  // Standard HTML input (preserving original Bootstrap form behavior)
  return (
    <div className="mb-3">
      <label htmlFor={name} className={`form-label ${className}`}>
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        {...props}
      />
      {displayHelperText && (
        <div className={`small mt-1 ${hasError ? 'text-danger' : 'text-muted'}`} role={hasError ? 'alert' : undefined}>
          {displayHelperText}
        </div>
      )}
    </div>
  );
};

export default UniversalFinanceFormField;