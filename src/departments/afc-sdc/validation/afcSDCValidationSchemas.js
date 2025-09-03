/**
 * AFC-SDC Department Validation Schemas
 * Comprehensive validation rules for all AFC-SDC forms
 * Based on railway operational requirements and SDC-specific business rules
 */

// Common validation patterns
export const PATTERNS = {
  EMPLOYEE_ID_SDC: /^SDC-[0-9]{4}$/,
  IP_ADDRESS: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  MAC_ADDRESS: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
  VERSION_NUMBER: /^\d+\.\d+\.\d+$/,
};

// Common field validations
export const commonValidations = {
  employeeSDC: {
    required: true,
    pattern: PATTERNS.EMPLOYEE_ID_SDC,
    message: 'Employee ID must be in format SDC-XXXX'
  },
  
  date: {
    required: true,
    message: 'Date is required'
  },
  
  time: {
    required: true,
    message: 'Time is required'
  },
  
  description: {
    required: true,
    minLength: 10,
    message: 'Description must be at least 10 characters'
  },
  
  version: {
    required: true,
    pattern: PATTERNS.VERSION_NUMBER,
    message: 'Version must be in format X.X.X'
  },
  
  ipAddress: {
    pattern: PATTERNS.IP_ADDRESS,
    message: 'Please enter a valid IP address'
  },
  
  macAddress: {
    pattern: PATTERNS.MAC_ADDRESS,
    message: 'Please enter a valid MAC address'
  }
};

// Form-specific validation schemas
export const agentCardValidation = {
  cardType: {
    required: true,
    message: 'Card type is required'
  },
  
  cardNumber: {
    required: true,
    message: 'Card number is required'
  },
  
  issuedBy: commonValidations.employeeSDC,
  
  issueDate: commonValidations.date,
  
  validUntil: commonValidations.date,
  
  remarks: {
    maxLength: 500,
    message: 'Remarks cannot exceed 500 characters'
  }
};

export const dailyChecklistValidation = {
  checkDate: commonValidations.date,
  
  checkTime: commonValidations.time,
  
  checkedBy: commonValidations.employeeSDC,
  
  systemStatus: {
    required: true,
    message: 'System status is required'
  },
  
  issues: {
    maxLength: 1000,
    message: 'Issues description cannot exceed 1000 characters'
  }
};

export const fmtsValidation = {
  incidentId: {
    required: true,
    message: 'Incident ID is required'
  },
  
  reportedDate: commonValidations.date,
  
  reportedBy: commonValidations.employeeSDC,
  
  faultType: {
    required: true,
    message: 'Fault type is required'
  },
  
  severity: {
    required: true,
    message: 'Severity level is required'
  },
  
  description: commonValidations.description,
  
  resolution: {
    minLength: 10,
    message: 'Resolution description must be at least 10 characters'
  }
};

export const parameterRegisterValidation = {
  parameterName: {
    required: true,
    message: 'Parameter name is required'
  },
  
  parameterValue: {
    required: true,
    message: 'Parameter value is required'
  },
  
  configuredBy: commonValidations.employeeSDC,
  
  configDate: commonValidations.date,
  
  version: commonValidations.version,
  
  description: commonValidations.description
};

export const pmLogBookValidation = {
  logDate: commonValidations.date,
  
  performedBy: commonValidations.employeeSDC,
  
  equipmentId: {
    required: true,
    message: 'Equipment ID is required'
  },
  
  maintenanceType: {
    required: true,
    message: 'Maintenance type is required'
  },
  
  activities: {
    required: true,
    minLength: 20,
    message: 'Activities description must be at least 20 characters'
  },
  
  findings: {
    maxLength: 1000,
    message: 'Findings cannot exceed 1000 characters'
  },
  
  nextDueDate: commonValidations.date
};

// Validation helper function
export const validateField = (value, validation) => {
  if (!validation) return '';
  
  // Required validation
  if (validation.required && (!value || value.trim() === '')) {
    return validation.message || 'This field is required';
  }
  
  // Skip other validations if field is empty and not required
  if (!value || value.trim() === '') return '';
  
  // Pattern validation
  if (validation.pattern && !validation.pattern.test(value)) {
    return validation.message || 'Invalid format';
  }
  
  // Min length validation
  if (validation.minLength && value.length < validation.minLength) {
    return validation.message || `Minimum length is ${validation.minLength} characters`;
  }
  
  // Max length validation
  if (validation.maxLength && value.length > validation.maxLength) {
    return validation.message || `Maximum length is ${validation.maxLength} characters`;
  }
  
  return '';
};

// Validate entire form
export const validateForm = (formData, validationSchema) => {
  const errors = {};
  
  Object.keys(validationSchema).forEach(field => {
    const error = validateField(formData[field], validationSchema[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};

// Export all validation schemas
export const afcSDCValidationSchema = {
  agentCard: agentCardValidation,
  dailyChecklist: dailyChecklistValidation,
  fmts: fmtsValidation,
  parameterRegister: parameterRegisterValidation,
  pmLogBook: pmLogBookValidation
};