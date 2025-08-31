import React from "react";
import { TextField, MenuItem } from "@mui/material";
import stations from "../../../data/station.json";

/**
 * Universal Signalling Form Field Component
 * 
 * Specialized for Signalling department forms with railway signalling-specific field types
 * Handles technical equipment, maintenance, and safety-critical operations
 * Reduces code duplication while preserving exact field behavior
 */
const UniversalSignallingFormField = ({
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

  // Railway signalling equipment types
  const signallingEquipmentTypes = [
    { value: "", label: "Select Equipment Type" },
    { value: "color-light-signal", label: "Color Light Signal" },
    { value: "shunt-signal", label: "Shunt Signal" },
    { value: "point-machine", label: "Point Machine" },
    { value: "track-circuit", label: "Track Circuit" },
    { value: "axle-counter", label: "Axle Counter" },
    { value: "ats-cabinet", label: "ATS Cabinet" },
    { value: "dcs-tre", label: "DCS TRE" },
    { value: "esp-equipment", label: "ESP Equipment" },
    { value: "signal-lamp", label: "Signal Lamp" },
    { value: "battery-system", label: "Battery System" }
  ];

  // Maintenance types for PM schedules
  const maintenanceTypes = [
    { value: "", label: "Select Maintenance Type" },
    { value: "daily", label: "Daily Inspection" },
    { value: "weekly", label: "Weekly Check" },
    { value: "monthly", label: "Monthly PM" },
    { value: "quarterly", label: "Quarterly PM" },
    { value: "half-yearly", label: "Half Yearly PM" },
    { value: "yearly", label: "Yearly PM" },
    { value: "corrective", label: "Corrective Maintenance" },
    { value: "emergency", label: "Emergency Repair" }
  ];

  // Test result options
  const testResults = [
    { value: "", label: "Select Result" },
    { value: "pass", label: "Pass" },
    { value: "fail", label: "Fail" },
    { value: "pending", label: "Pending" },
    { value: "na", label: "Not Applicable" }
  ];

  // Emergency/Priority codes
  const emergencyCodes = [
    { value: "", label: "Select Priority" },
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
    { value: "routine", label: "Routine" }
  ];

  // Railway station selector (reused from operations)
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
          <option value="">Select Station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.stationName}>
              {station.stationName}
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

  // Signal ID input with validation pattern
  if (type === "signalId") {
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
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          placeholder={placeholder || "e.g., SIG001, UP-12, DN-05"}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          pattern="^[A-Z0-9-]+$"
          title="Signal ID should contain only uppercase letters, numbers, and hyphens"
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

  // Equipment type selector
  if (type === "equipmentType") {
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
          {signallingEquipmentTypes.map((eq) => (
            <option key={eq.value} value={eq.value}>
              {eq.label}
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

  // Maintenance type selector
  if (type === "maintenanceType") {
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
          {maintenanceTypes.map((mt) => (
            <option key={mt.value} value={mt.value}>
              {mt.label}
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

  // Technician ID input
  if (type === "technicianId") {
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
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          placeholder={placeholder || "Enter Technician ID"}
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

  // Voltage reading input with validation
  if (type === "voltageReading") {
    return (
      <div className="mb-3">
        <label htmlFor={name} className={`form-label ${className}`}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <div className="input-group">
          <input
            type="number"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`form-control ${hasError ? 'is-invalid' : ''}`}
            placeholder={placeholder || "0.00"}
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            step="0.01"
            min="0"
            max="1000"
            {...props}
          />
          <span className="input-group-text">V</span>
        </div>
        {displayHelperText && (
          <div className={`small mt-1 ${hasError ? 'text-danger' : 'text-muted'}`} role={hasError ? 'alert' : undefined}>
            {displayHelperText}
          </div>
        )}
      </div>
    );
  }

  // Test result selector
  if (type === "testResult") {
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
          {testResults.map((result) => (
            <option key={result.value} value={result.value}>
              {result.label}
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

  // Emergency/Priority code selector
  if (type === "emergencyCode") {
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
          {emergencyCodes.map((code) => (
            <option key={code.value} value={code.value}>
              {code.label}
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

  // Custom select with provided options
  if (type === "select" && options.length > 0) {
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
          <option value="">Select {label}</option>
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

  // Date input
  if (type === "date") {
    return (
      <div className="mb-3">
        <label htmlFor={name} className={`form-label ${className}`}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <input
          type="date"
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

  // Time input
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

  // Textarea for descriptions
  if (multiline || type === "textarea" || type === "description") {
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
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          placeholder={placeholder}
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

  // Default text input
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
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        placeholder={placeholder}
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

export { UniversalSignallingFormField };
export default UniversalSignallingFormField;