/**
 * AFC-Mainline Validation Schemas
 * Comprehensive validation rules for all AFC-Mainline department forms
 * Based on discovered field patterns and AFC operations requirements
 */

// Common field validation patterns
const commonValidationPatterns = {
  // Station name validation
  stationName: {
    required: true,
    type: 'string',
    minLength: 2,
    message: 'Please select a valid station name'
  },

  // Date field validation
  date: {
    required: true,
    type: 'date',
    message: 'Please enter a valid date'
  },

  // Employee signature validation
  employeeSignature: {
    required: true,
    type: 'string',
    minLength: 2,
    message: 'Employee signature is required'
  },

  // Remarks and technical details
  remarks: {
    required: false,
    type: 'string',
    maxLength: 500,
    message: 'Remarks cannot exceed 500 characters'
  },

  // Equipment status validation
  equipmentStatus: {
    required: true,
    type: 'string',
    options: ['OK', 'Fault', 'Maintenance', 'Out of Service'],
    message: 'Please select a valid equipment status'
  }
};

// FMTS Book validation schema (based on discovered form)
export const fmtsBookValidation = {
  // Report details
  rdate: {
    required: true,
    type: 'date',
    message: 'Report date is required'
  },
  hoby: {
    required: true,
    type: 'string',
    minLength: 2,
    message: 'HO by field is required'
  },
  pstatus: {
    required: true,
    type: 'string',
    options: ['New', 'In Progress', 'Pending Parts', 'Resolved', 'Closed'],
    message: 'Please select problem status'
  },
  ostatus: {
    required: true,
    type: 'string',
    options: ['Open', 'Closed', 'Under Review'],
    message: 'Please select overall status'
  },
  
  // Fault details
  doffault: {
    required: true,
    type: 'date',
    message: 'Date of fault is required'
  },
  dofrectification: {
    required: false,
    type: 'date',
    message: 'Please enter valid rectification date'
  },
  rdetail: {
    required: true,
    type: 'string',
    minLength: 10,
    maxLength: 1000,
    message: 'Rectification details are required (minimum 10 characters)'
  },
  remark: {
    ...commonValidationPatterns.remarks,
    required: true,
    message: 'Remarks are required for FMTS entries'
  },
  
  // Personnel details
  rectified_by: {
    required: false,
    type: 'string',
    minLength: 2,
    message: 'Please enter rectified by person name'
  },
  ho: {
    required: true,
    type: 'string',
    minLength: 2,
    message: 'HO field is required'
  },
  
  // Item details
  itemDetails: {
    required: true,
    type: 'string',
    minLength: 5,
    message: 'Item details are required'
  },
  oldOsisFmtsNo: {
    required: false,
    type: 'string',
    pattern: /^[A-Z0-9-]+$/,
    message: 'Invalid OSIS FMTS number format'
  },

  // Business Rules
  businessRules: {
    dateConsistency: (formData) => {
      if (formData.dofrectification && formData.doffault) {
        const faultDate = new Date(formData.doffault);
        const rectificationDate = new Date(formData.dofrectification);
        if (rectificationDate < faultDate) {
          return 'Rectification date cannot be before fault date';
        }
      }
      return null;
    },
    statusLogic: (formData) => {
      if (formData.pstatus === 'Resolved' && !formData.dofrectification) {
        return 'Rectification date is required when status is Resolved';
      }
      if (formData.pstatus === 'Resolved' && !formData.rectified_by) {
        return 'Rectified by person is required when status is Resolved';
      }
      return null;
    }
  }
};

// PM Logbook Half Yearly validation schema (based on discovered form)
export const pmLogbookHalfYearlyValidation = {
  // Basic details
  stn_name: commonValidationPatterns.stationName,
  date: commonValidationPatterns.date,
  month: {
    required: true,
    type: 'number',
    min: 0,
    max: 11,
    message: 'Please select a valid month'
  },

  // Equipment check arrays validation
  activities1: {
    required: true,
    type: 'array',
    minLength: 1,
    itemValidation: {
      SC1: {
        required: true,
        type: 'string',
        options: ['Yes', 'No', 'OK', 'Fault'],
        message: 'SC1 status is required'
      },
      SC2: {
        required: true,
        type: 'string',
        options: ['Yes', 'No', 'OK', 'Fault'],
        message: 'SC2 status is required'
      },
      SC3: {
        required: true,
        type: 'string',
        options: ['Yes', 'No', 'OK', 'Fault'],
        message: 'SC3 status is required'
      },
      remark: commonValidationPatterns.remarks,
      action: {
        required: false,
        type: 'string',
        maxLength: 200,
        message: 'Action details cannot exceed 200 characters'
      },
      deficiency: {
        required: false,
        type: 'string',
        maxLength: 200,
        message: 'Deficiency details cannot exceed 200 characters'
      }
    },
    message: 'At least one activity check is required'
  },

  activities2: {
    required: true,
    type: 'array',
    minLength: 1,
    itemValidation: {
      avm1: {
        required: true,
        type: 'string',
        options: ['Yes', 'No', 'OK', 'Fault'],
        message: 'AVM1 status is required'
      },
      avm2: {
        required: true,
        type: 'string',
        options: ['Yes', 'No', 'OK', 'Fault'],
        message: 'AVM2 status is required'
      },
      remark: commonValidationPatterns.remarks,
      action: {
        required: false,
        type: 'string',
        maxLength: 200,
        message: 'Action details cannot exceed 200 characters'
      }
    },
    message: 'AVM activity checks are required'
  },

  // Business Rules for PM Logbook
  businessRules: {
    monthlyConsistency: (formData) => {
      const currentMonth = new Date().getMonth();
      if (Math.abs(formData.month - currentMonth) > 1) {
        return 'Selected month should be current or previous month for half-yearly maintenance';
      }
      return null;
    },
    equipmentChecksComplete: (formData) => {
      if (formData.activities1 && formData.activities1.length > 0) {
        const incompleteChecks = formData.activities1.filter(activity => 
          !activity.SC1 || !activity.SC2 || !activity.SC3
        );
        if (incompleteChecks.length > 0) {
          return 'All equipment status checks must be completed';
        }
      }
      return null;
    }
  }
};

// Daily Checklist validation schema
export const dailyChecklistMainlineValidation = {
  stn_name: commonValidationPatterns.stationName,
  date: commonValidationPatterns.date,
  shift: {
    required: true,
    type: 'string',
    options: ['Morning', 'Evening', 'Night'],
    message: 'Please select shift timing'
  },
  checkedBy: commonValidationPatterns.employeeSignature,
  verifiedBy: {
    required: true,
    type: 'string',
    minLength: 2,
    message: 'Verified by field is required'
  },
  
  // Equipment checklist items
  tvmStatus: commonValidationPatterns.equipmentStatus,
  tomStatus: commonValidationPatterns.equipmentStatus,
  gateStatus: commonValidationPatterns.equipmentStatus,
  avmStatus: commonValidationPatterns.equipmentStatus,
  
  // Overall remarks
  remarks: {
    ...commonValidationPatterns.remarks,
    required: true,
    message: 'Daily checklist remarks are required'
  }
};

// Daily Transaction Register validation schema
export const dailyTransactionRegisterValidation = {
  date: commonValidationPatterns.date,
  stn_name: commonValidationPatterns.stationName,
  shift: {
    required: true,
    type: 'string',
    options: ['Morning', 'Evening', 'Night'],
    message: 'Please select shift timing'
  },
  
  // Transaction details
  totalSales: {
    required: true,
    type: 'number',
    min: 0,
    message: 'Total sales amount must be zero or positive'
  },
  totalRefunds: {
    required: true,
    type: 'number',
    min: 0,
    message: 'Total refunds amount must be zero or positive'
  },
  cashCollection: {
    required: true,
    type: 'number',
    min: 0,
    message: 'Cash collection must be zero or positive'
  },
  
  // Operator details
  operatorName: commonValidationPatterns.employeeSignature,
  supervisorName: {
    required: true,
    type: 'string',
    minLength: 2,
    message: 'Supervisor name is required'
  },

  // Business Rules
  businessRules: {
    transactionBalance: (formData) => {
      const expectedCash = (formData.totalSales || 0) - (formData.totalRefunds || 0);
      if (Math.abs((formData.cashCollection || 0) - expectedCash) > 10) {
        return 'Cash collection does not match expected amount (sales - refunds)';
      }
      return null;
    }
  }
};

// Generic validation for simple administrative forms
export const simpleAdministrativeValidation = {
  date: commonValidationPatterns.date,
  stn_name: commonValidationPatterns.stationName,
  entryBy: commonValidationPatterns.employeeSignature,
  verifiedBy: {
    required: true,
    type: 'string',
    minLength: 2,
    message: 'Verified by field is required'
  },
  remarks: commonValidationPatterns.remarks
};

// Validation helper functions
export const validateField = (fieldName, value, schema) => {
  const fieldSchema = schema[fieldName];
  if (!fieldSchema) return null;

  // Required field validation
  if (fieldSchema.required && (!value || value.toString().trim() === '')) {
    return fieldSchema.message || `${fieldName} is required`;
  }

  // Type validation
  if (value && fieldSchema.type) {
    switch (fieldSchema.type) {
      case 'string':
        if (typeof value !== 'string') {
          return fieldSchema.message || `${fieldName} must be text`;
        }
        if (fieldSchema.minLength && value.length < fieldSchema.minLength) {
          return fieldSchema.message || `${fieldName} must be at least ${fieldSchema.minLength} characters`;
        }
        if (fieldSchema.maxLength && value.length > fieldSchema.maxLength) {
          return fieldSchema.message || `${fieldName} cannot exceed ${fieldSchema.maxLength} characters`;
        }
        if (fieldSchema.pattern && !fieldSchema.pattern.test(value)) {
          return fieldSchema.message || `${fieldName} format is invalid`;
        }
        break;

      case 'number':
        const numValue = Number(value);
        if (isNaN(numValue)) {
          return fieldSchema.message || `${fieldName} must be a number`;
        }
        if (fieldSchema.min !== undefined && numValue < fieldSchema.min) {
          return fieldSchema.message || `${fieldName} must be at least ${fieldSchema.min}`;
        }
        if (fieldSchema.max !== undefined && numValue > fieldSchema.max) {
          return fieldSchema.message || `${fieldName} cannot exceed ${fieldSchema.max}`;
        }
        break;

      case 'date':
        if (!(value instanceof Date) && isNaN(new Date(value))) {
          return fieldSchema.message || `${fieldName} must be a valid date`;
        }
        break;
    }
  }

  // Options validation
  if (fieldSchema.options && value && !fieldSchema.options.includes(value)) {
    return fieldSchema.message || `${fieldName} must be one of: ${fieldSchema.options.join(', ')}`;
  }

  return null;
};

// Validate entire form
export const validateForm = (formData, schema) => {
  const errors = {};

  // Validate individual fields
  Object.keys(schema).forEach(fieldName => {
    if (fieldName === 'businessRules') return;
    
    const error = validateField(fieldName, formData[fieldName], schema);
    if (error) {
      errors[fieldName] = error;
    }
  });

  // Validate business rules
  if (schema.businessRules) {
    Object.keys(schema.businessRules).forEach(ruleName => {
      const error = schema.businessRules[ruleName](formData);
      if (error) {
        errors[ruleName] = error;
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Export all validation schemas
export default {
  fmtsBook: fmtsBookValidation,
  pmLogbookHalfYearly: pmLogbookHalfYearlyValidation,
  dailyChecklistMainline: dailyChecklistMainlineValidation,
  dailyTransactionRegister: dailyTransactionRegisterValidation,
  simpleAdministrative: simpleAdministrativeValidation,
  validateField,
  validateForm
};