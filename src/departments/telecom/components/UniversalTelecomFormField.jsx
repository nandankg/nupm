import React from 'react';

const UniversalTelecomFormField = ({ 
  type = "text", 
  name, 
  value, 
  onChange, 
  label, 
  required = false,
  options = [],
  error,
  className = "",
  placeholder = "",
  ...props 
}) => {
  
  const renderTelecomField = () => {
    switch (type) {
      case 'telecom-system':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select System</option>
            <option value="TER">TER System</option>
            <option value="UPS">UPS System</option>
            <option value="SMPS">SMPS System</option>
            <option value="CSS">CSS System</option>
            <option value="Colony">Officer Colony</option>
            <option value="PA">PA System</option>
            <option value="CCTV">CCTV System</option>
            <option value="Fire">Fire Detection System</option>
            <option value="BMS">Building Management System</option>
          </select>
        );
      
      case 'pm-frequency':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Yearly">Yearly</option>
          </select>
        );
      
      case 'location-type':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Location</option>
            <option value="Depot">Depot</option>
            <option value="Station">Station</option>
            <option value="OCC">OCC</option>
            <option value="BCC">BCC</option>
            <option value="OCC-BCC">OCC & BCC</option>
            <option value="TER-Room">TER Room</option>
            <option value="UPS-Room">UPS Room</option>
            <option value="Officer-Colony">Officer Colony</option>
          </select>
        );
      
      case 'maintenance-status':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Status</option>
            <option value="OK">OK</option>
            <option value="Not OK">Not OK</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Requires Attention">Requires Attention</option>
            <option value="N/A">N/A</option>
          </select>
        );
      
      case 'shift-type':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Shift</option>
            <option value="Day">Day Shift</option>
            <option value="Evening">Evening Shift</option>
            <option value="Night">Night Shift</option>
            <option value="General">General Shift</option>
          </select>
        );
      
      case 'priority-level':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
            <option value="Emergency">Emergency</option>
          </select>
        );
      
      case 'technical-parameter':
        return (
          <input 
            type="number" 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            step="0.01"
            placeholder={placeholder || "Enter technical parameter"}
            {...props}
          />
        );
      
      case 'voltage-reading':
        return (
          <input 
            type="number" 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            step="0.1"
            min="0"
            max="1000"
            placeholder={placeholder || "Enter voltage (V)"}
            {...props}
          />
        );
      
      case 'temperature-reading':
        return (
          <input 
            type="number" 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            step="0.1"
            min="-50"
            max="100"
            placeholder={placeholder || "Enter temperature (°C)"}
            {...props}
          />
        );
      
      case 'employee-id':
        return (
          <input 
            type="text" 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            pattern="[A-Za-z0-9]+"
            placeholder={placeholder || "Enter Employee ID"}
            {...props}
          />
        );
      
      case 'equipment-id':
        return (
          <input 
            type="text" 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            placeholder={placeholder || "Enter Equipment ID"}
            {...props}
          />
        );
      
      case 'date-time':
        return (
          <input 
            type="datetime-local" 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            {...props}
          />
        );
      
      case 'time-only':
        return (
          <input 
            type="time" 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            {...props}
          />
        );
      
      case 'custom-select':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Option</option>
            {options.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            rows="3"
            placeholder={placeholder}
            {...props}
          />
        );
      
      case 'checkbox':
        return (
          <div className="form-check">
            <input 
              type="checkbox" 
              name={name} 
              checked={value} 
              onChange={onChange} 
              className="form-check-input" 
              required={required}
              {...props}
            />
            <label className="form-check-label">
              {label}
            </label>
          </div>
        );
      
      default:
        return (
          <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            placeholder={placeholder}
            {...props}
          />
        );
    }
  };

  if (type === 'checkbox') {
    return (
      <div className={`mb-3 ${className}`}>
        {renderTelecomField()}
        {error && <div className="text-danger small">{error}</div>}
      </div>
    );
  }

  return (
    <div className={`mb-3 ${className}`}>
      {label && type !== 'checkbox' && (
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      {renderTelecomField()}
      {error && <div className="text-danger small">{error}</div>}
    </div>
  );
};

export default UniversalTelecomFormField;