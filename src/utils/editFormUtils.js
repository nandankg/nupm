/**
 * Edit Form Utilities
 * Common utilities for handling edit form functionality across the application
 */

/**
 * Safely initializes form values from edit data
 * Prevents field disappearing issues by providing default values
 * @param {Object} editData - Data to edit
 * @param {Object} fieldMapping - Mapping of form fields to data properties
 * @param {Object} defaultValues - Default values for fields
 * @returns {Object} Initialized form values
 */
export const initializeEditFormValues = (editData, fieldMapping, defaultValues = {}) => {
  const formValues = {};
  
  Object.keys(fieldMapping).forEach(formField => {
    const dataField = fieldMapping[formField];
    formValues[formField] = editData?.[dataField] || defaultValues[formField] || "";
  });
  
  return formValues;
};

/**
 * Safely gets nested property value with fallback
 * @param {Object} obj - Object to get value from
 * @param {string} path - Dot notation path (e.g., 'user.profile.name')
 * @param {*} defaultValue - Default value if path doesn't exist
 * @returns {*} Property value or default
 */
export const safeGet = (obj, path, defaultValue = "") => {
  try {
    return path.split('.').reduce((current, key) => current?.[key], obj) ?? defaultValue;
  } catch (error) {
    console.warn(`Error accessing path ${path}:`, error);
    return defaultValue;
  }
};

/**
 * Creates a safe form state initializer that prevents crashes
 * @param {Array} dataArray - Array of data items
 * @param {string|number} id - ID to find
 * @param {string} idField - Field name for ID (default: 'id')
 * @returns {Object} Found item or empty object
 */
export const findEditDataSafely = (dataArray, id, idField = 'id') => {
  if (!Array.isArray(dataArray) || !id) {
    return {};
  }
  
  const found = dataArray.find(item => item?.[idField] === id);
  return found || {};
};

/**
 * Common edit form field validator
 * @param {Object} formValues - Current form values
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} Validation result { isValid: boolean, errors: Array }
 */
export const validateEditForm = (formValues, requiredFields = []) => {
  const errors = [];
  
  requiredFields.forEach(field => {
    if (!formValues[field] || formValues[field].toString().trim() === '') {
      errors.push(`${field} is required`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Handles edit form submission with error handling
 * @param {Function} submitAction - Redux action to dispatch
 * @param {Object} formValues - Form values to submit
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} navigate - React Router navigate function
 * @param {string} redirectPath - Path to redirect after success
 * @param {Function} onSuccess - Optional success callback
 * @param {Function} onError - Optional error callback
 */
export const handleEditFormSubmit = async (
  submitAction,
  formValues,
  dispatch,
  navigate,
  redirectPath,
  onSuccess,
  onError
) => {
  try {
    const result = await dispatch(submitAction(formValues));
    
    if (result.type.endsWith('/fulfilled')) {
      if (onSuccess) {
        onSuccess(result);
      }
      if (redirectPath) {
        navigate(redirectPath);
      }
    } else {
      throw new Error(result.error?.message || 'Submit failed');
    }
  } catch (error) {
    console.error('Edit form submission error:', error);
    if (onError) {
      onError(error);
    } else {
      alert(`Error updating record: ${error.message}`);
    }
  }
};

/**
 * Creates a safe useEffect for initializing edit forms
 * @param {Function} setFormValues - State setter for form values
 * @param {Object} editData - Edit data
 * @param {Object} fieldDefaults - Default field values
 * @param {Array} dependencies - Additional dependencies for useEffect
 */
export const useSafeEditFormInitialization = (setFormValues, editData, fieldDefaults, dependencies = []) => {
  const React = require('react');
  
  React.useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      const safeValues = {};
      
      Object.keys(fieldDefaults).forEach(field => {
        safeValues[field] = editData[field] ?? fieldDefaults[field];
      });
      
      setFormValues(safeValues);
    }
  }, [editData, setFormValues, ...dependencies]);
};

/**
 * Common date field handler for edit forms
 * Ensures proper date formatting and prevents empty date issues
 * @param {string|Date} dateValue - Date value to format
 * @param {string} format - Format type ('input' for HTML input, 'display' for showing)
 * @returns {string} Formatted date string
 */
export const handleEditDateField = (dateValue, format = 'input') => {
  if (!dateValue) return '';
  
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return '';
  
  if (format === 'input') {
    // Format for HTML date input (yyyy-mm-dd)
    return date.toISOString().split('T')[0];
  } else if (format === 'display') {
    // Format for display (dd-mm-yyyy)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  return dateValue;
};

/**
 * Creates consistent loading state for edit forms
 * @param {boolean} isLoading - Loading state
 * @param {string} message - Loading message
 * @returns {JSX.Element|null} Loading component or null
 */
export const EditFormLoader = ({ isLoading, message = "Loading form data..." }) => {
  const React = require('react');
  
  if (!isLoading) return null;
  
  return React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '50px',
      fontSize: '16px',
      color: '#666'
    }
  }, message);
};

/**
 * Role-based edit access checker
 * @param {Object} user - Current user object
 * @param {Array} allowedRoles - Array of roles that can edit
 * @param {string} ownerId - ID of the record owner (optional)
 * @returns {boolean} Whether user can edit
 */
export const canUserEdit = (user, allowedRoles = ['admin', 'user'], ownerId = null) => {
  if (!user) return false;
  
  // Check if user has admin role
  if (allowedRoles.includes('admin') && (user.role === 'admin' || user.isAdmin)) {
    return true;
  }
  
  // Check if user has required role
  if (allowedRoles.includes(user.role)) {
    return true;
  }
  
  // Check if user owns the record
  if (ownerId && (user.id === ownerId || user.profileid === ownerId || user.employeeid === ownerId)) {
    return true;
  }
  
  return false;
};

/**
 * Generic field change handler for edit forms
 * @param {Function} setFormValues - Form values setter
 * @param {Object} currentValues - Current form values
 * @returns {Function} Change handler function
 */
export const createFieldChangeHandler = (setFormValues, currentValues) => {
  return (event) => {
    const { name, value, type, checked } = event.target;
    
    setFormValues({
      ...currentValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };
};