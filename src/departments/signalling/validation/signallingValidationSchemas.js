/**
 * Signalling Department Validation Schemas
 * 
 * Comprehensive validation rules for railway signalling operations
 * Includes technical specifications, safety compliance, and regulatory requirements
 */

// Common validation patterns for signalling
export const signallingPatterns = {
  signalId: /^[A-Z0-9-]+$/,
  equipmentId: /^[A-Z0-9-_]+$/i,
  voltageReading: /^\d+(\.\d{1,2})?$/,
  technicianId: /^[A-Z0-9]+$/i,
  timePattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
};

// Voltage range validation
export const voltageRanges = {
  signal: { min: 0, max: 300 },
  battery: { min: 0, max: 150 },
  general: { min: 0, max: 1000 }
};

// Station Diary Signalling validation
export const stationDiarySignallingValidation = {
  date: {
    required: true,
    type: "date",
    message: "Date is required"
  },
  shift: {
    required: true,
    type: "string",
    options: ["morning", "afternoon", "night"],
    message: "Valid shift must be selected"
  },
  stationName: {
    required: true,
    type: "string",
    minLength: 2,
    message: "Station name is required"
  },
  signalmanName: {
    required: true,
    type: "string",
    minLength: 2,
    message: "Signalman name is required"
  },
  weatherConditions: {
    required: false,
    type: "string",
    maxLength: 200,
    message: "Weather conditions should not exceed 200 characters"
  },
  incidentReported: {
    required: false,
    type: "boolean",
    message: "Incident status must be specified"
  },
  remarks: {
    required: false,
    type: "string",
    maxLength: 500,
    message: "Remarks should not exceed 500 characters"
  }
};

// Hardware Failure validation
export const hardwareFailureValidation = {
  failureDate: {
    required: true,
    type: "date",
    message: "Failure date is required"
  },
  failureTime: {
    required: true,
    type: "time",
    pattern: signallingPatterns.timePattern,
    message: "Valid failure time is required"
  },
  equipmentType: {
    required: true,
    type: "string",
    options: ["color-light-signal", "shunt-signal", "point-machine", "track-circuit", "axle-counter", "ats-cabinet"],
    message: "Valid equipment type must be selected"
  },
  equipmentId: {
    required: true,
    type: "string",
    pattern: signallingPatterns.equipmentId,
    message: "Valid equipment ID is required"
  },
  faultDescription: {
    required: true,
    type: "string",
    minLength: 10,
    maxLength: 1000,
    message: "Fault description is required (10-1000 characters)"
  },
  priorityLevel: {
    required: true,
    type: "string",
    options: ["critical", "high", "medium", "low"],
    message: "Priority level must be selected"
  },
  technicianAssigned: {
    required: false,
    type: "string",
    pattern: signallingPatterns.technicianId,
    message: "Valid technician ID required"
  },
  estimatedRepairTime: {
    required: false,
    type: "number",
    min: 0,
    max: 72,
    message: "Estimated repair time should be between 0-72 hours"
  }
};

// Signal Failure validation
export const signalFailureValidation = {
  signalId: {
    required: true,
    type: "string",
    pattern: signallingPatterns.signalId,
    message: "Valid signal ID is required (e.g., SIG001, UP-12)"
  },
  signalType: {
    required: true,
    type: "string",
    options: ["main-signal", "distant-signal", "shunt-signal", "repeater-signal"],
    message: "Signal type must be selected"
  },
  failureType: {
    required: true,
    type: "string",
    options: ["lamp-failure", "aspect-failure", "complete-failure", "intermittent"],
    message: "Failure type must be selected"
  },
  affectedAspects: {
    required: false,
    type: "array",
    options: ["red", "yellow", "green", "double-yellow"],
    message: "Select affected signal aspects"
  },
  trafficImpact: {
    required: true,
    type: "string",
    options: ["none", "minor", "major", "complete-stoppage"],
    message: "Traffic impact must be assessed"
  },
  alternativeArrangement: {
    required: false,
    type: "string",
    maxLength: 300,
    message: "Alternative arrangement description should not exceed 300 characters"
  }
};

// PM Point Maintenance validation
export const pmPointMaintenanceValidation = {
  maintenanceDate: {
    required: true,
    type: "date",
    message: "Maintenance date is required"
  },
  pointNumber: {
    required: true,
    type: "string",
    pattern: /^[0-9]+[A-Z]?$/,
    message: "Valid point number is required (e.g., 12, 15A)"
  },
  maintenanceType: {
    required: true,
    type: "string",
    options: ["daily", "weekly", "monthly", "quarterly", "half-yearly", "yearly"],
    message: "Maintenance type must be selected"
  },
  lubrication: {
    required: true,
    type: "string",
    options: ["completed", "not-required", "pending"],
    message: "Lubrication status must be specified"
  },
  mechanicalCheck: {
    required: true,
    type: "string",
    options: ["pass", "fail", "pending"],
    message: "Mechanical check result is required"
  },
  electricalCheck: {
    required: true,
    type: "string",
    options: ["pass", "fail", "pending"],
    message: "Electrical check result is required"
  },
  detectionWorking: {
    required: true,
    type: "string",
    options: ["normal", "faulty", "not-applicable"],
    message: "Detection working status is required"
  },
  lockingWorking: {
    required: true,
    type: "string",
    options: ["normal", "faulty", "not-applicable"],
    message: "Locking working status is required"
  },
  defectsFound: {
    required: false,
    type: "string",
    maxLength: 500,
    message: "Defects description should not exceed 500 characters"
  },
  actionTaken: {
    required: false,
    type: "string",
    maxLength: 500,
    message: "Action taken description should not exceed 500 characters"
  }
};

// Voltage Measurement validation
export const voltageMeasurementValidation = {
  measurementDate: {
    required: true,
    type: "date",
    message: "Measurement date is required"
  },
  equipmentId: {
    required: true,
    type: "string",
    pattern: signallingPatterns.equipmentId,
    message: "Valid equipment ID is required"
  },
  voltageType: {
    required: true,
    type: "string",
    options: ["signal", "battery", "supply", "earth"],
    message: "Voltage type must be selected"
  },
  measuredVoltage: {
    required: true,
    type: "number",
    pattern: signallingPatterns.voltageReading,
    message: "Valid voltage reading is required"
  },
  expectedVoltage: {
    required: true,
    type: "number",
    pattern: signallingPatterns.voltageReading,
    message: "Expected voltage value is required"
  },
  tolerance: {
    required: false,
    type: "number",
    min: 0,
    max: 50,
    message: "Tolerance percentage should be between 0-50%"
  },
  testResult: {
    required: true,
    type: "string",
    options: ["pass", "fail", "marginal"],
    message: "Test result must be specified"
  }
};

// Generic form validation helper
export const validateSignallingForm = (formData, validationSchema) => {
  const errors = {};
  
  Object.keys(validationSchema).forEach(fieldName => {
    const rules = validationSchema[fieldName];
    const value = formData[fieldName];
    
    // Required field validation
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[fieldName] = rules.message || `${fieldName} is required`;
      return;
    }
    
    // Skip further validation if field is empty and not required
    if (!rules.required && (!value || value === '')) {
      return;
    }
    
    // Type validation
    if (rules.type === 'date' && value && !isValidDate(value)) {
      errors[fieldName] = 'Please enter a valid date';
      return;
    }
    
    if (rules.type === 'time' && value && !isValidTime(value)) {
      errors[fieldName] = 'Please enter a valid time (HH:MM format)';
      return;
    }
    
    if (rules.type === 'number' && value !== '' && isNaN(Number(value))) {
      errors[fieldName] = 'Please enter a valid number';
      return;
    }
    
    // Pattern validation
    if (rules.pattern && value && !rules.pattern.test(value)) {
      errors[fieldName] = rules.message || `${fieldName} format is invalid`;
      return;
    }
    
    // Length validation
    if (rules.minLength && value && value.length < rules.minLength) {
      errors[fieldName] = `${fieldName} must be at least ${rules.minLength} characters long`;
      return;
    }
    
    if (rules.maxLength && value && value.length > rules.maxLength) {
      errors[fieldName] = `${fieldName} must not exceed ${rules.maxLength} characters`;
      return;
    }
    
    // Range validation for numbers
    if (rules.min !== undefined && value !== '' && Number(value) < rules.min) {
      errors[fieldName] = `${fieldName} must be at least ${rules.min}`;
      return;
    }
    
    if (rules.max !== undefined && value !== '' && Number(value) > rules.max) {
      errors[fieldName] = `${fieldName} must not exceed ${rules.max}`;
      return;
    }
    
    // Options validation
    if (rules.options && value && !rules.options.includes(value)) {
      errors[fieldName] = `Please select a valid ${fieldName}`;
      return;
    }
  });
  
  return errors;
};

// Voltage range validation helper
export const validateVoltageRange = (voltage, equipmentType) => {
  const range = voltageRanges[equipmentType] || voltageRanges.general;
  const numVoltage = Number(voltage);
  
  if (isNaN(numVoltage)) {
    return "Please enter a valid voltage value";
  }
  
  if (numVoltage < range.min || numVoltage > range.max) {
    return `Voltage must be between ${range.min}V and ${range.max}V for ${equipmentType} equipment`;
  }
  
  return null;
};

// Business logic validation
export const validateMaintenanceSchedule = (lastMaintenanceDate, maintenanceType) => {
  if (!lastMaintenanceDate) return null;
  
  const today = new Date();
  const lastDate = new Date(lastMaintenanceDate);
  const daysDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
  
  const scheduleIntervals = {
    'daily': 1,
    'weekly': 7,
    'monthly': 30,
    'quarterly': 90,
    'half-yearly': 180,
    'yearly': 365
  };
  
  const expectedInterval = scheduleIntervals[maintenanceType];
  if (expectedInterval && daysDiff > expectedInterval) {
    return `Maintenance is overdue by ${daysDiff - expectedInterval} days`;
  }
  
  return null;
};

// Helper functions
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

const isValidTime = (timeString) => {
  return signallingPatterns.timePattern.test(timeString);
};