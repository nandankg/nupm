/**
 * Finance Department Form Validation Schemas
 * 
 * These schemas define validation rules for all Finance department forms
 * while preserving the exact field names and business logic from existing forms.
 */

export const budgetAllotmentValidation = {
  // Required field validations
  budgetHead: {
    required: true,
    message: "Budget Head is required"
  },
  
  financialYear: {
    required: true,
    message: "Financial Year is required"
  },
  
  department: {
    required: true,
    message: "Department is required",
    options: ["signalling", "telecom", "Operation", "sdc", "Finance", "Mainline"]
  },
  
  budgetSubhead: {
    required: true,
    message: "Sub Head is required"
  },
  
  budgetType: {
    required: true,
    options: ["original", "revised"],
    message: "Budget Type is required"
  },
  
  amount: {
    required: true,
    type: "number",
    min: 0.01,
    message: "Amount must be a valid positive number"
  },

  // Business rule validations
  businessRules: {
    revisedBudgetAmount: (amount, balanceAmount) => {
      if (parseFloat(amount) > parseFloat(balanceAmount)) {
        return `Amount cannot exceed balance amount: ${balanceAmount}`;
      }
      return null;
    },
    
    originalBudgetValidation: (budgetType, existingAmount, balanceAmount) => {
      if (budgetType === "original" && existingAmount > 0 && balanceAmount <= 0) {
        return `Budget Allotment Exhausted Balance Amount: ${balanceAmount}`;
      }
      return null;
    }
  }
};

export const budgetPaymentValidation = {
  // Required field validations
  budgetHead: {
    required: true,
    message: "Budget Head is required"
  },
  
  budgetSubhead: {
    required: true,
    message: "Budget Subhead is required"
  },
  
  department: {
    required: true,
    message: "Department is required"
  },
  
  partyName: {
    required: true,
    message: "Party Name is required"
  },
  
  loaAmount: {
    required: true,
    message: "LOA Amount is required"
  },
  
  voucherNo: {
    required: true,
    type: "string",
    minLength: 1,
    message: "Voucher No is required"
  },
  
  paymentAmt: {
    required: true,
    type: "number",
    min: 0.01,
    message: "Payment Amount must be a valid positive number"
  },
  
  paymentDate: {
    required: true,
    type: "date",
    message: "Payment Date is required"
  },

  // Business rule validations
  businessRules: {
    paymentAmountValidation: (paymentAmount, loaAmount) => {
      if (parseFloat(paymentAmount) > parseFloat(loaAmount)) {
        return `The Payment Amount cannot be greater than LOA Amount: ${loaAmount}`;
      }
      return null;
    },
    
    balanceValidation: (paymentAmount, balanceAmount) => {
      if (parseFloat(paymentAmount) > parseFloat(balanceAmount)) {
        return "Payment Amount cannot be greater than Balance Amount";
      }
      return null;
    }
  }
};

export const simpleBudgetPaymentValidation = {
  // Required field validations  
  paymentAmount: {
    required: true,
    type: "number",
    min: 0.01,
    message: "Payment Amount must be a valid positive number"
  },
  
  voucherno: {
    required: true,
    type: "string",
    minLength: 1,
    message: "Voucher No is required"
  }
};

// Station Earning validation (if exists in Finance department)
export const stationEarningValidation = {
  date: {
    required: true,
    type: "date",
    message: "Date is required"
  },
  
  amount: {
    required: true,
    type: "number",
    min: 0,
    message: "Amount must be a valid positive number"
  },
  
  description: {
    required: false,
    type: "string",
    maxLength: 500,
    message: "Description cannot exceed 500 characters"
  }
};

/**
 * Generic validation function for Finance forms
 * @param {Object} formData - The form data to validate
 * @param {Object} validationSchema - The validation schema to use
 * @param {Object} businessRuleData - Additional data needed for business rule validation
 * @returns {Object} - Object containing isValid boolean and errors object
 */
export const validateFinanceForm = (formData, validationSchema, businessRuleData = {}) => {
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
    
    // Type validations
    if (value && rule.type) {
      switch (rule.type) {
        case 'number':
          if (isNaN(value) || parseFloat(value) < (rule.min || 0)) {
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
          break;
          
        case 'date':
          if (!value || isNaN(new Date(value).getTime())) {
            errors[fieldName] = rule.message;
          }
          break;
      }
    }
    
    // Options validation
    if (value && rule.options && !rule.options.includes(value)) {
      errors[fieldName] = `Invalid option selected. Must be one of: ${rule.options.join(', ')}`;
    }
  });
  
  // Business rule validations
  if (validationSchema.businessRules) {
    Object.keys(validationSchema.businessRules).forEach(ruleName => {
      const ruleFunction = validationSchema.businessRules[ruleName];
      const ruleError = ruleFunction(...Object.values(businessRuleData));
      
      if (ruleError) {
        // Assign error to appropriate field based on rule type
        if (ruleName.includes('amount') || ruleName.includes('Amount')) {
          errors.amount = ruleError;
        } else if (ruleName.includes('payment') || ruleName.includes('Payment')) {
          errors.paymentAmt = ruleError;
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
export const validateField = (fieldName, value, validationSchema) => {
  const rule = validationSchema[fieldName];
  if (!rule) return null;
  
  // Required field check
  if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return rule.message;
  }
  
  // Type validations
  if (value && rule.type) {
    switch (rule.type) {
      case 'number':
        if (isNaN(value) || parseFloat(value) < (rule.min || 0)) {
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
        break;
        
      case 'date':
        if (!value || isNaN(new Date(value).getTime())) {
          return rule.message;
        }
        break;
    }
  }
  
  // Options validation
  if (value && rule.options && !rule.options.includes(value)) {
    return `Invalid option selected. Must be one of: ${rule.options.join(', ')}`;
  }
  
  return null;
};