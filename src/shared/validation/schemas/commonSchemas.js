/**
 * Common Validation Schemas for UPMRC Application
 * 
 * This module provides reusable validation schemas for common form fields
 * across all railway management forms. These schemas ensure consistent
 * data validation throughout the application.
 * 
 * Usage:
 * import { dateSchema, timeSchema, employeeSchema } from 'shared/validation/schemas/commonSchemas';
 */

// Basic data type validations
export const dateSchema = {
  required: {
    value: true,
    message: 'Date is required'
  },
  validate: {
    notFuture: (value) => {
      const today = new Date();
      const inputDate = new Date(value);
      return inputDate <= today || 'Date cannot be in the future';
    },
    validFormat: (value) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateRegex.test(value) || 'Date must be in YYYY-MM-DD format';
    }
  }
};

export const timeSchema = {
  required: {
    value: true,
    message: 'Time is required'
  },
  pattern: {
    value: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    message: 'Time must be in HH:MM format (24-hour)'
  }
};

export const employeeIdSchema = {
  required: {
    value: true,
    message: 'Employee ID is required'
  },
  pattern: {
    value: /^[A-Z]{2,3}\d{4,6}$/,
    message: 'Employee ID must be in format: ABC1234 (2-3 letters followed by 4-6 digits)'
  }
};

export const employeeNameSchema = {
  required: {
    value: true,
    message: 'Employee name is required'
  },
  minLength: {
    value: 2,
    message: 'Name must be at least 2 characters'
  },
  maxLength: {
    value: 50,
    message: 'Name cannot exceed 50 characters'
  },
  pattern: {
    value: /^[A-Za-z\s.'-]+$/,
    message: 'Name can only contain letters, spaces, periods, hyphens, and apostrophes'
  }
};

export const stationCodeSchema = {
  required: {
    value: true,
    message: 'Station code is required'
  },
  pattern: {
    value: /^[A-Z]{3,4}$/,
    message: 'Station code must be 3-4 uppercase letters'
  }
};

export const descriptionSchema = {
  required: {
    value: true,
    message: 'Description is required'
  },
  minLength: {
    value: 10,
    message: 'Description must be at least 10 characters'
  },
  maxLength: {
    value: 500,
    message: 'Description cannot exceed 500 characters'
  }
};

export const remarksSchema = {
  maxLength: {
    value: 200,
    message: 'Remarks cannot exceed 200 characters'
  }
};

// Railway-specific validations
export const trainNumberSchema = {
  pattern: {
    value: /^\d{5}$/,
    message: 'Train number must be exactly 5 digits'
  }
};

export const signalNumberSchema = {
  required: {
    value: true,
    message: 'Signal number is required'
  },
  pattern: {
    value: /^[A-Z]{1,2}\d{1,3}[A-Z]?$/,
    message: 'Invalid signal number format'
  }
};

// Equipment-related validations
export const equipmentIdSchema = {
  required: {
    value: true,
    message: 'Equipment ID is required'
  },
  pattern: {
    value: /^[A-Z]{2,3}-\d{4,6}$/,
    message: 'Equipment ID must be in format: ABC-1234'
  }
};

// Location-related validations
export const kilometrageSchema = {
  pattern: {
    value: /^\d{1,4}\/\d{1,4}$/,
    message: 'Kilometrage must be in format: 123/456'
  }
};

// Status and priority validations
export const prioritySchema = {
  required: {
    value: true,
    message: 'Priority is required'
  },
  validate: {
    validPriority: (value) => {
      const validPriorities = ['low', 'medium', 'high', 'critical'];
      return validPriorities.includes(value.toLowerCase()) || 'Invalid priority level';
    }
  }
};

export const statusSchema = {
  required: {
    value: true,
    message: 'Status is required'
  },
  validate: {
    validStatus: (value) => {
      const validStatuses = ['pending', 'in-progress', 'completed', 'cancelled'];
      return validStatuses.includes(value.toLowerCase()) || 'Invalid status';
    }
  }
};

// Financial validations
export const amountSchema = {
  required: {
    value: true,
    message: 'Amount is required'
  },
  min: {
    value: 0,
    message: 'Amount cannot be negative'
  },
  max: {
    value: 10000000,
    message: 'Amount cannot exceed ₹1 Crore'
  },
  pattern: {
    value: /^\d+(\.\d{1,2})?$/,
    message: 'Amount must be a valid number with up to 2 decimal places'
  }
};

// Contact information validations
export const phoneSchema = {
  pattern: {
    value: /^[6-9]\d{9}$/,
    message: 'Mobile number must be 10 digits starting with 6-9'
  }
};

export const emailSchema = {
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address'
  }
};

// Composite schemas for common form sections
export const basicEmployeeInfoSchema = {
  employeeId: employeeIdSchema,
  employeeName: employeeNameSchema,
  designation: {
    required: {
      value: true,
      message: 'Designation is required'
    }
  }
};

export const incidentBasicSchema = {
  date: dateSchema,
  time: timeSchema,
  station: stationCodeSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  reportedBy: employeeIdSchema
};

export const maintenanceBasicSchema = {
  date: dateSchema,
  time: timeSchema,
  equipmentId: equipmentIdSchema,
  station: stationCodeSchema,
  maintenanceType: {
    required: {
      value: true,
      message: 'Maintenance type is required'
    }
  },
  status: statusSchema
};

// Custom validation functions
export const customValidators = {
  isWorkingHours: (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const startTime = 6 * 60; // 6:00 AM
    const endTime = 22 * 60; // 10:00 PM
    return (timeInMinutes >= startTime && timeInMinutes <= endTime) || 
           'Incident reporting time should be within working hours (6:00 AM - 10:00 PM)';
  },
  
  isValidRailwayDate: (date) => {
    const inputDate = new Date(date);
    const minDate = new Date('2020-01-01'); // Railway system start date
    const maxDate = new Date();
    
    return (inputDate >= minDate && inputDate <= maxDate) || 
           'Date must be between January 1, 2020 and today';
  },
  
  isUniqueSerialNumber: async (serialNo, existingData = []) => {
    const exists = existingData.some(item => item.serialNo === serialNo);
    return !exists || 'Serial number already exists';
  }
};

export default {
  dateSchema,
  timeSchema,
  employeeIdSchema,
  employeeNameSchema,
  stationCodeSchema,
  descriptionSchema,
  remarksSchema,
  trainNumberSchema,
  signalNumberSchema,
  equipmentIdSchema,
  kilometrageSchema,
  prioritySchema,
  statusSchema,
  amountSchema,
  phoneSchema,
  emailSchema,
  basicEmployeeInfoSchema,
  incidentBasicSchema,
  maintenanceBasicSchema,
  customValidators
};