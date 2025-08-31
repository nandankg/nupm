import React from "react";
import { TextField, MenuItem } from "@mui/material";
import stations from "../../../data/station.json";

/**
 * Universal Operation Form Field Component
 * 
 * Specialized for Operation department forms with railway-specific field types
 * Reduces code duplication while preserving exact field behavior
 */
const UniversalOperationFormField = ({
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
  rows = 4,
  className = "",
  disabled = false,
  ...props
}) => {
  // Handle error state
  const hasError = !!error;
  const displayHelperText = error || helperText;

  // Railway-specific station selector
  if (type === "station") {
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
          {stations.map((station, index) =>
            station["Station Name"] && (
              <option key={index} value={station["STATION Code"]}>
                {station["Station Name"]} ({station["STATION Code"]})
              </option>
            )
          )}
        </select>
        {displayHelperText && (
          <div className={`small mt-1 ${hasError ? 'text-danger' : 'text-muted'}`} role={hasError ? 'alert' : undefined}>
            {displayHelperText}
          </div>
        )}
      </div>
    );
  }

  // Employee ID field with validation pattern
  if (type === "employee") {
    return (
      <div className="mb-3">
        <label htmlFor={name} className={`form-label ${className}`}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Enter Employee ID"}
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          pattern="[A-Z0-9]{6,10}"
          title="Employee ID format: 6-10 alphanumeric characters"
          {...props}
        />
        {displayHelperText && (
          <div className={`small mt-1 ${hasError ? 'text-danger' : 'text-muted'}`} role={hasError ? 'alert' : undefined}>
            {displayHelperText}
          </div>
        )}
      </div>
    );
  }

  // Equipment ID field with validation
  if (type === "equipment") {
    return (
      <div className="mb-3">
        <label htmlFor={name} className={`form-label ${className}`}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Enter Equipment ID"}
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          pattern="[A-Z0-9-]{3,15}"
          title="Equipment ID format: 3-15 alphanumeric characters with hyphens"
          {...props}
        />
        {displayHelperText && (
          <div className={`small mt-1 ${hasError ? 'text-danger' : 'text-muted'}`} role={hasError ? 'alert' : undefined}>
            {displayHelperText}
          </div>
        )}
      </div>
    );
  }

  // Train number field
  if (type === "train") {
    return (
      <div className="mb-3">
        <label htmlFor={name} className={`form-label ${className}`}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Enter Train Number"}
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          pattern="[0-9]{4,5}"
          title="Train number: 4-5 digit number"
          {...props}
        />
        {displayHelperText && (
          <div className={`small mt-1 ${hasError ? 'text-danger' : 'text-muted'}`} role={hasError ? 'alert' : undefined}>
            {displayHelperText}
          </div>
        )}
      </div>
    );
  }

  // Status selector with common operation statuses
  if (type === "status") {
    const statusOptions = options.length > 0 ? options : [
      "Active", "Completed", "Pending", "In Progress", "Cancelled", "On Hold"
    ];
    
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
          {statusOptions.map((status, index) => (
            <option key={index} value={status}>
              {status}
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

  // Priority level selector
  if (type === "priority") {
    const priorityOptions = options.length > 0 ? options : [
      "Low", "Medium", "High", "Critical", "Emergency"
    ];
    
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
          {priorityOptions.map((priority, index) => (
            <option key={index} value={priority}>
              {priority}
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

  // Time field with railway-specific format
  if (type === "time") {
    return (
      <div className="mb-3">
        <label htmlFor={name} className={`form-label ${className}`}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <input
          type="time"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
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
  }

  // Large description/textarea field
  if (type === "description" || multiline) {
    return (
      <div className="mb-3">
        <label htmlFor={name} className={`form-label ${className}`}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          rows={rows}
          {...props}
        />
        {displayHelperText && (
          <div className={`small mt-1 ${hasError ? 'text-danger' : 'text-muted'}`} role={hasError ? 'alert' : undefined}>
            {displayHelperText}
          </div>
        )}
      </div>
    );
  }

  // Standard dropdown/select field
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
          (type === "date" || type === "datetime-local") ? { shrink: true } : undefined
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

  // Standard HTML input field (default)
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

export { UniversalOperationFormField };
export default UniversalOperationFormField;