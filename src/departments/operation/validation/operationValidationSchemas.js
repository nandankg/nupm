/**
 * Operation Department Form Validation Schemas
 * 
 * Railway-specific validation rules for all Operation department forms
 * while preserving the exact field names and business logic from existing forms.
 */

// Common field validations for Operation forms
export const commonOperationValidation = {
  // Date/Time validations
  date: {
    required: true,
    type: "date",
    message: "Date is required",
    maxDate: () => new Date(), // Cannot be future date for most operations
  },
  
  time: {
    required: false,
    type: "time",
    pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    message: "Time must be in HH:MM format"
  },
  
  // Employee validations
  employeeId: {
    required: true,
    type: "string",
    pattern: /^[A-Z0-9]{6,10}$/,
    message: "Employee ID must be 6-10 alphanumeric characters"
  },
  
  employeeName: {
    required: true,
    type: "string",
    minLength: 2,
    maxLength: 100,
    message: "Employee name is required (2-100 characters)"
  },
  
  // Equipment validations
  equipmentId: {
    required: false,
    type: "string",
    pattern: /^[A-Z0-9-]{3,15}$/,
    message: "Equipment ID format: 3-15 alphanumeric characters with hyphens"
  },
  
  // Train operations
  trainNumber: {
    required: false,
    type: "string",
    pattern: /^[0-9]{4,5}$/,
    message: "Train number must be 4-5 digits"
  },
  
  // Location validations
  station: {
    required: false,
    type: "string",
    message: "Station is required"
  },
  
  location: {
    required: false,
    type: "string",
    minLength: 3,
    maxLength: 200,
    message: "Location description required (3-200 characters)"
  },
  
  // Status and priority
  status: {
    required: false,
    type: "string",
    options: ["Active", "Completed", "Pending", "In Progress", "Cancelled", "On Hold"],
    message: "Status is required"
  },
  
  priority: {
    required: false,
    type: "string",
    options: ["Low", "Medium", "High", "Critical", "Emergency"],
    message: "Priority level is required"
  },
  
  // Description fields
  description: {
    required: false,
    type: "string",
    minLength: 10,
    maxLength: 1000,
    message: "Description must be 10-1000 characters"
  },
  
  remarks: {
    required: false,
    type: "string",
    maxLength: 500,
    message: "Remarks cannot exceed 500 characters"
  }
};

// Equipment Failure Register validation
export const equipmentFailureValidation = {
  date: {
    ...commonOperationValidation.date,
    required: true,
  },
  
  time: {
    ...commonOperationValidation.time,
    required: true,
  },
  
  equipmentId: {
    ...commonOperationValidation.equipmentId,
    required: true,
    message: "Equipment ID is required for failure reporting"
  },
  
  equipmentType: {
    required: true,
    type: "string",
    message: "Equipment type is required"
  },
  
  failureType: {
    required: true,
    type: "string",
    options: ["Mechanical", "Electrical", "Software", "Structural", "Other"],
    message: "Failure type must be specified"
  },
  
  priority: {
    ...commonOperationValidation.priority,
    required: true,
  },
  
  reportedBy: {
    ...commonOperationValidation.employeeId,
    required: true,
    message: "Reporter Employee ID is required"
  },
  
  location: {
    ...commonOperationValidation.location,
    required: true,
  },
  
  description: {
    ...commonOperationValidation.description,
    required: true,
    message: "Failure description is mandatory for equipment failures"
  },

  // Business rules
  businessRules: {
    priorityValidation: (priority, failureType) => {
      if (failureType === "Safety" && !["High", "Critical", "Emergency"].includes(priority)) {
        return "Safety-related failures must have High, Critical, or Emergency priority";
      }
      return null;
    },
    
    timeValidation: (date, time) => {
      const reportTime = new Date(`${date}T${time}`);
      const now = new Date();
      if (reportTime > now) {
        return "Failure time cannot be in the future";
      }
      return null;
    }
  }
};

// Incident/Accident validation (Safety Critical)
export const incidentAccidentValidation = {
  date: {
    ...commonOperationValidation.date,
    required: true,
    message: "Incident date is mandatory for safety compliance"
  },
  
  time: {
    ...commonOperationValidation.time,
    required: true,
    message: "Incident time is mandatory for safety compliance"
  },
  
  incidentType: {
    required: true,
    type: "string",
    options: ["Accident", "Near Miss", "Safety Violation", "Equipment Failure", "Personnel Injury", "Other"],
    message: "Incident type is required for safety classification"
  },
  
  severity: {
    required: true,
    type: "string",
    options: ["Minor", "Moderate", "Major", "Critical", "Catastrophic"],
    message: "Severity level is required for risk assessment"
  },
  
  location: {
    ...commonOperationValidation.location,
    required: true,
    message: "Incident location is mandatory for safety records"
  },
  
  reportedBy: {
    ...commonOperationValidation.employeeId,
    required: true,
    message: "Reporter identification is mandatory"
  },
  
  witnessCount: {
    required: false,
    type: "number",
    min: 0,
    max: 50,
    message: "Witness count must be between 0-50"
  },
  
  description: {
    ...commonOperationValidation.description,
    required: true,
    minLength: 20,
    message: "Detailed incident description is mandatory (minimum 20 characters)"
  },
  
  immediateAction: {
    required: true,
    type: "string",
    minLength: 10,
    maxLength: 500,
    message: "Immediate action taken must be documented (10-500 characters)"
  },

  // Business rules for safety compliance
  businessRules: {
    criticalIncidentValidation: (severity, immediateAction) => {
      if (["Major", "Critical", "Catastrophic"].includes(severity) && immediateAction.length < 20) {
        return "Critical incidents require detailed immediate action documentation";
      }
      return null;
    },
    
    timelinessValidation: (date, time) => {
      const incidentTime = new Date(`${date}T${time}`);
      const now = new Date();
      const hoursDiff = (now - incidentTime) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        return "Incidents should be reported within 24 hours for safety compliance";
      }
      return null;
    }
  }
};

// Train Operations validation
export const trainOperationValidation = {
  date: {
    ...commonOperationValidation.date,
    required: true,
  },
  
  trainNumber: {
    ...commonOperationValidation.trainNumber,
    required: true,
    message: "Train number is required for operations tracking"
  },
  
  fromStation: {
    required: true,
    type: "string",
    message: "Origin station is required"
  },
  
  toStation: {
    required: true,
    type: "string",
    message: "Destination station is required"
  },
  
  departureTime: {
    ...commonOperationValidation.time,
    required: true,
    message: "Departure time is required"
  },
  
  arrivalTime: {
    ...commonOperationValidation.time,
    required: false,
  },
  
  delay: {
    required: false,
    type: "number",
    min: 0,
    max: 1440, // 24 hours in minutes
    message: "Delay must be in minutes (0-1440)"
  },
  
  operatorId: {
    ...commonOperationValidation.employeeId,
    required: true,
    message: "Train operator ID is required"
  },

  // Business rules
  businessRules: {
    routeValidation: (fromStation, toStation) => {
      if (fromStation === toStation) {
        return "Origin and destination stations cannot be the same";
      }
      return null;
    },
    
    timeSequenceValidation: (departureTime, arrivalTime) => {
      if (arrivalTime && departureTime && arrivalTime <= departureTime) {
        return "Arrival time must be after departure time";
      }
      return null;
    }
  }
};

// Stock Movement validation
export const stockMovementValidation = {
  date: {
    ...commonOperationValidation.date,
    required: true,
  },
  
  itemType: {
    required: true,
    type: "string",
    options: ["Cards", "Tokens", "Tickets", "Equipment", "Materials", "Other"],
    message: "Item type is required"
  },
  
  itemCode: {
    required: true,
    type: "string",
    pattern: /^[A-Z0-9-]{3,20}$/,
    message: "Item code format: 3-20 alphanumeric characters with hyphens"
  },
  
  quantity: {
    required: true,
    type: "number",
    min: 1,
    max: 999999,
    message: "Quantity must be between 1-999999"
  },
  
  movementType: {
    required: true,
    type: "string",
    options: ["Issue", "Receipt", "Transfer", "Return", "Damage", "Lost"],
    message: "Movement type is required"
  },
  
  fromLocation: {
    required: true,
    type: "string",
    message: "Source location is required"
  },
  
  toLocation: {
    required: true,
    type: "string",
    message: "Destination location is required"
  },
  
  handledBy: {
    ...commonOperationValidation.employeeId,
    required: true,
    message: "Handler employee ID is required"
  },

  // Business rules
  businessRules: {
    locationValidation: (fromLocation, toLocation, movementType) => {
      if (movementType === "Transfer" && fromLocation === toLocation) {
        return "Transfer source and destination cannot be the same";
      }
      return null;
    },
    
    quantityValidation: (quantity, movementType) => {
      if (["Issue", "Transfer"].includes(movementType) && quantity <= 0) {
        return "Issue/Transfer quantity must be positive";
      }
      return null;
    }
  }
};

// Crew Attendance validation
export const crewAttendanceValidation = {
  date: {
    ...commonOperationValidation.date,
    required: true,
  },
  
  employeeId: {
    ...commonOperationValidation.employeeId,
    required: true,
  },
  
  employeeName: {
    ...commonOperationValidation.employeeName,
    required: true,
  },
  
  shift: {
    required: true,
    type: "string",
    options: ["Morning", "Afternoon", "Evening", "Night", "Rotating"],
    message: "Shift type is required"
  },
  
  checkInTime: {
    ...commonOperationValidation.time,
    required: true,
    message: "Check-in time is mandatory"
  },
  
  checkOutTime: {
    ...commonOperationValidation.time,
    required: false,
  },
  
  attendanceStatus: {
    required: true,
    type: "string",
    options: ["Present", "Absent", "Late", "Half Day", "Leave", "Holiday"],
    message: "Attendance status is required"
  },

  // Business rules
  businessRules: {
    workingHoursValidation: (checkInTime, checkOutTime) => {
      if (checkInTime && checkOutTime) {
        const checkIn = new Date(`1970-01-01T${checkInTime}`);
        const checkOut = new Date(`1970-01-01T${checkOutTime}`);
        const hoursWorked = (checkOut - checkIn) / (1000 * 60 * 60);
        
        if (hoursWorked < 0) {
          return "Check-out time cannot be before check-in time";
        }
        if (hoursWorked > 12) {
          return "Working hours cannot exceed 12 hours per shift";
        }
      }
      return null;
    }
  }
};

/**
 * Generic validation function for Operation forms
 * @param {Object} formData - The form data to validate
 * @param {Object} validationSchema - The validation schema to use
 * @param {Object} businessRuleData - Additional data needed for business rule validation
 * @returns {Object} - Object containing isValid boolean and errors object
 */
export const validateOperationForm = (formData, validationSchema, businessRuleData = {}) => {
  const errors = {};
  
  // Basic field validations
  Object.keys(validationSchema).forEach(fieldName => {
    if (fieldName === 'businessRules') return;
    
    const rule = validationSchema[fieldName];
    const value = formData[fieldName];
    
    // Required field check
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors[fieldName] = rule.message;
      return;
    }
    
    // Skip further validation if field is empty and not required
    if (!value) return;
    
    // Type validations
    if (rule.type) {
      switch (rule.type) {
        case 'number':
          if (isNaN(value) || parseFloat(value) < (rule.min || 0) || parseFloat(value) > (rule.max || Infinity)) {
            errors[fieldName] = rule.message;
          }
          break;
          
        case 'string':
          if (rule.minLength && value.length < rule.minLength) {
            errors[fieldName] = rule.message;
          }
          if (rule.maxLength && value.length > rule.maxLength) {
            errors[fieldName] = rule.message;
          }
          if (rule.pattern && !rule.pattern.test(value)) {
            errors[fieldName] = rule.message;
          }
          break;
          
        case 'date':
          const dateValue = new Date(value);
          if (isNaN(dateValue.getTime())) {
            errors[fieldName] = rule.message;
          } else if (rule.maxDate && dateValue > rule.maxDate()) {
            errors[fieldName] = "Date cannot be in the future";
          }
          break;
          
        case 'time':
          if (rule.pattern && !rule.pattern.test(value)) {
            errors[fieldName] = rule.message;
          }
          break;
      }
    }
    
    // Options validation
    if (rule.options && !rule.options.includes(value)) {
      errors[fieldName] = `Invalid option. Must be one of: ${rule.options.join(', ')}`;
    }
  });
  
  // Business rule validations
  if (validationSchema.businessRules) {
    Object.keys(validationSchema.businessRules).forEach(ruleName => {
      const ruleFunction = validationSchema.businessRules[ruleName];
      const ruleError = ruleFunction(...Object.values(businessRuleData));
      
      if (ruleError) {
        // Assign error to appropriate field based on rule type
        if (ruleName.includes('time') || ruleName.includes('Time')) {
          errors.time = ruleError;
        } else if (ruleName.includes('priority') || ruleName.includes('Priority')) {
          errors.priority = ruleError;
        } else if (ruleName.includes('location') || ruleName.includes('Location')) {
          errors.location = ruleError;
        } else {
          errors.general = ruleError;
        }
      }
    });
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validation helper for real-time field validation
 * @param {string} fieldName - The field name to validate
 * @param {any} value - The field value
 * @param {Object} validationSchema - The validation schema
 * @returns {string|null} - Error message or null if valid
 */
export const validateOperationField = (fieldName, value, validationSchema) => {
  const rule = validationSchema[fieldName];
  if (!rule) return null;
  
  // Required field check
  if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return rule.message;
  }
  
  // Skip further validation if field is empty and not required
  if (!value) return null;
  
  // Type validations
  if (rule.type) {
    switch (rule.type) {
      case 'number':
        if (isNaN(value) || parseFloat(value) < (rule.min || 0) || parseFloat(value) > (rule.max || Infinity)) {
          return rule.message;
        }
        break;
        
      case 'string':
        if (rule.minLength && value.length < rule.minLength) {
          return rule.message;
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          return rule.message;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          return rule.message;
        }
        break;
        
      case 'date':
        const dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
          return rule.message;
        } else if (rule.maxDate && dateValue > rule.maxDate()) {
          return "Date cannot be in the future";
        }
        break;
        
      case 'time':
        if (rule.pattern && !rule.pattern.test(value)) {
          return rule.message;
        }
        break;
    }
  }
  
  // Options validation
  if (rule.options && !rule.options.includes(value)) {
    return `Invalid option. Must be one of: ${rule.options.join(', ')}`;
  }
  
  return null;
};