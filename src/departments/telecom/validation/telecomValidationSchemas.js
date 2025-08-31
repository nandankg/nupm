// Telecom Department Validation Schemas
// Railway-specific validation rules for telecom forms

export const commonTelecomValidation = {
  // Employee validation
  validateEmployeeId: (employeeId) => {
    if (!employeeId || employeeId.trim() === '') {
      return 'Employee ID is required';
    }
    if (!/^[A-Za-z0-9]+$/.test(employeeId)) {
      return 'Employee ID can only contain letters and numbers';
    }
    if (employeeId.length < 3 || employeeId.length > 20) {
      return 'Employee ID must be between 3-20 characters';
    }
    return null;
  },

  // Equipment ID validation
  validateEquipmentId: (equipmentId) => {
    if (!equipmentId || equipmentId.trim() === '') {
      return 'Equipment ID is required';
    }
    if (equipmentId.length < 3 || equipmentId.length > 50) {
      return 'Equipment ID must be between 3-50 characters';
    }
    return null;
  },

  // Voltage reading validation
  validateVoltage: (voltage, min = 0, max = 1000) => {
    if (voltage === '' || voltage === null || voltage === undefined) {
      return 'Voltage reading is required';
    }
    const numVoltage = parseFloat(voltage);
    if (isNaN(numVoltage)) {
      return 'Voltage must be a valid number';
    }
    if (numVoltage < min || numVoltage > max) {
      return `Voltage must be between ${min}V and ${max}V`;
    }
    return null;
  },

  // Temperature validation
  validateTemperature: (temperature, min = -50, max = 100) => {
    if (temperature === '' || temperature === null || temperature === undefined) {
      return 'Temperature reading is required';
    }
    const numTemp = parseFloat(temperature);
    if (isNaN(numTemp)) {
      return 'Temperature must be a valid number';
    }
    if (numTemp < min || numTemp > max) {
      return `Temperature must be between ${min}°C and ${max}°C`;
    }
    return null;
  },

  // Date validation
  validateDate: (date) => {
    if (!date) {
      return 'Date is required';
    }
    const selectedDate = new Date(date);
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    if (selectedDate > today) {
      return 'Date cannot be in the future';
    }
    if (selectedDate < oneYearAgo) {
      return 'Date cannot be more than one year ago';
    }
    return null;
  },

  // Time validation
  validateTime: (time) => {
    if (!time) {
      return 'Time is required';
    }
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
      return 'Time must be in HH:MM format (24-hour)';
    }
    return null;
  },

  // System status validation
  validateSystemStatus: (status) => {
    const validStatuses = ['OK', 'Not OK', 'Under Maintenance', 'Requires Attention', 'N/A'];
    if (!status) {
      return 'System status is required';
    }
    if (!validStatuses.includes(status)) {
      return 'Please select a valid system status';
    }
    return null;
  },

  // Location validation
  validateLocation: (location) => {
    const validLocations = ['Depot', 'Station', 'OCC', 'BCC', 'OCC-BCC', 'TER-Room', 'UPS-Room', 'Officer-Colony'];
    if (!location) {
      return 'Location is required';
    }
    if (!validLocations.includes(location)) {
      return 'Please select a valid location';
    }
    return null;
  },

  // PM Frequency validation
  validatePmFrequency: (frequency) => {
    const validFrequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];
    if (!frequency) {
      return 'PM frequency is required';
    }
    if (!validFrequencies.includes(frequency)) {
      return 'Please select a valid PM frequency';
    }
    return null;
  },

  // Priority validation
  validatePriority: (priority) => {
    const validPriorities = ['Low', 'Medium', 'High', 'Critical', 'Emergency'];
    if (!priority) {
      return 'Priority level is required';
    }
    if (!validPriorities.includes(priority)) {
      return 'Please select a valid priority level';
    }
    return null;
  },

  // Remarks validation
  validateRemarks: (remarks, required = false, minLength = 10, maxLength = 500) => {
    if (required && (!remarks || remarks.trim() === '')) {
      return 'Remarks are required';
    }
    if (remarks && remarks.trim().length > 0) {
      if (remarks.trim().length < minLength) {
        return `Remarks must be at least ${minLength} characters`;
      }
      if (remarks.trim().length > maxLength) {
        return `Remarks cannot exceed ${maxLength} characters`;
      }
    }
    return null;
  }
};

// PM Sheet specific validation
export const pmSheetValidation = {
  validatePmActivity: (activity) => {
    if (!activity || activity.trim() === '') {
      return 'PM activity description is required';
    }
    if (activity.length < 5 || activity.length > 200) {
      return 'PM activity must be between 5-200 characters';
    }
    return null;
  },

  validatePmResult: (result) => {
    const validResults = ['Satisfactory', 'Unsatisfactory', 'Requires Action', 'Completed', 'Pending', 'N/A'];
    if (!result) {
      return 'PM result is required';
    }
    if (!validResults.includes(result)) {
      return 'Please select a valid PM result';
    }
    return null;
  },

  validateNextDueDate: (nextDue, frequency) => {
    if (!nextDue) {
      return 'Next due date is required';
    }
    
    const nextDueDate = new Date(nextDue);
    const today = new Date();
    
    if (nextDueDate <= today) {
      return 'Next due date must be in the future';
    }
    
    // Validate based on frequency
    const maxDaysAhead = {
      'Daily': 7,
      'Weekly': 14,
      'Monthly': 45,
      'Quarterly': 120,
      'Half-Yearly': 200,
      'Yearly': 400
    };
    
    const daysDiff = Math.ceil((nextDueDate - today) / (1000 * 60 * 60 * 24));
    const maxDays = maxDaysAhead[frequency] || 400;
    
    if (daysDiff > maxDays) {
      return `Next due date is too far ahead for ${frequency} frequency`;
    }
    
    return null;
  }
};

// Log book specific validation  
export const logBookValidation = {
  validateShift: (shift) => {
    const validShifts = ['Day', 'Evening', 'Night', 'General'];
    if (!shift) {
      return 'Shift is required';
    }
    if (!validShifts.includes(shift)) {
      return 'Please select a valid shift';
    }
    return null;
  },

  validateLogEntry: (entry) => {
    if (!entry || entry.trim() === '') {
      return 'Log entry is required';
    }
    if (entry.length < 10 || entry.length > 1000) {
      return 'Log entry must be between 10-1000 characters';
    }
    return null;
  },

  validateHandoverTime: (handoverTime) => {
    if (!handoverTime) {
      return 'Handover time is required';
    }
    return commonTelecomValidation.validateTime(handoverTime);
  }
};

// Asset register specific validation
export const assetValidation = {
  validateAssetNumber: (assetNumber) => {
    if (!assetNumber || assetNumber.trim() === '') {
      return 'Asset number is required';
    }
    if (!/^[A-Za-z0-9-_]+$/.test(assetNumber)) {
      return 'Asset number can only contain letters, numbers, hyphens, and underscores';
    }
    if (assetNumber.length < 3 || assetNumber.length > 50) {
      return 'Asset number must be between 3-50 characters';
    }
    return null;
  },

  validateAssetCondition: (condition) => {
    const validConditions = ['Excellent', 'Good', 'Fair', 'Poor', 'Critical', 'Out of Service'];
    if (!condition) {
      return 'Asset condition is required';
    }
    if (!validConditions.includes(condition)) {
      return 'Please select a valid asset condition';
    }
    return null;
  },

  validatePurchaseDate: (purchaseDate) => {
    if (!purchaseDate) {
      return 'Purchase date is required';
    }
    
    const pDate = new Date(purchaseDate);
    const today = new Date();
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    
    if (pDate > today) {
      return 'Purchase date cannot be in the future';
    }
    if (pDate < tenYearsAgo) {
      return 'Purchase date cannot be more than 10 years ago';
    }
    return null;
  }
};

// Transaction register validation
export const transactionValidation = {
  validateAmount: (amount) => {
    if (amount === '' || amount === null || amount === undefined) {
      return 'Amount is required';
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      return 'Amount must be a valid number';
    }
    if (numAmount < 0) {
      return 'Amount cannot be negative';
    }
    if (numAmount > 10000000) { // 1 crore limit
      return 'Amount cannot exceed ₹1,00,00,000';
    }
    return null;
  },

  validateTransactionType: (type) => {
    const validTypes = ['Receipt', 'Issue', 'Transfer', 'Return', 'Adjustment', 'Write-off'];
    if (!type) {
      return 'Transaction type is required';
    }
    if (!validTypes.includes(type)) {
      return 'Please select a valid transaction type';
    }
    return null;
  },

  validateVoucherNumber: (voucherNumber) => {
    if (!voucherNumber || voucherNumber.trim() === '') {
      return 'Voucher number is required';
    }
    if (!/^[A-Za-z0-9/-]+$/.test(voucherNumber)) {
      return 'Voucher number can only contain letters, numbers, hyphens, and forward slashes';
    }
    return null;
  }
};

// Form-specific validation schemas
export const validationSchemas = {
  assetRegister: (data) => {
    const errors = {};
    
    const assetNumberError = assetValidation.validateAssetNumber(data.assetNumber);
    if (assetNumberError) errors.assetNumber = assetNumberError;
    
    const conditionError = assetValidation.validateAssetCondition(data.condition);
    if (conditionError) errors.condition = conditionError;
    
    const employeeIdError = commonTelecomValidation.validateEmployeeId(data.employeeId);
    if (employeeIdError) errors.employeeId = employeeIdError;
    
    const locationError = commonTelecomValidation.validateLocation(data.location);
    if (locationError) errors.location = locationError;
    
    return errors;
  },

  pmSheet: (data) => {
    const errors = {};
    
    const frequencyError = commonTelecomValidation.validatePmFrequency(data.frequency);
    if (frequencyError) errors.frequency = frequencyError;
    
    const locationError = commonTelecomValidation.validateLocation(data.location);
    if (locationError) errors.location = locationError;
    
    const employeeIdError = commonTelecomValidation.validateEmployeeId(data.employeeId);
    if (employeeIdError) errors.employeeId = employeeIdError;
    
    return errors;
  },

  logBook: (data) => {
    const errors = {};
    
    const shiftError = logBookValidation.validateShift(data.shift);
    if (shiftError) errors.shift = shiftError;
    
    const employeeIdError = commonTelecomValidation.validateEmployeeId(data.employeeId);
    if (employeeIdError) errors.employeeId = employeeIdError;
    
    const dateError = commonTelecomValidation.validateDate(data.date);
    if (dateError) errors.date = dateError;
    
    return errors;
  },

  transactionRegister: (data) => {
    const errors = {};
    
    const amountError = transactionValidation.validateAmount(data.amount);
    if (amountError) errors.amount = amountError;
    
    const typeError = transactionValidation.validateTransactionType(data.transactionType);
    if (typeError) errors.transactionType = typeError;
    
    const employeeIdError = commonTelecomValidation.validateEmployeeId(data.employeeId);
    if (employeeIdError) errors.employeeId = employeeIdError;
    
    return errors;
  }
};

// Utility function to validate entire form
export const validateForm = (formType, formData) => {
  if (!validationSchemas[formType]) {
    console.warn(`No validation schema found for form type: ${formType}`);
    return {};
  }
  
  return validationSchemas[formType](formData);
};

export default {
  commonTelecomValidation,
  pmSheetValidation,
  logBookValidation,
  assetValidation,
  transactionValidation,
  validationSchemas,
  validateForm
};