/**
 * API Helper Functions for UPMRC Application
 * Centralized API utilities for consistent error handling and request formatting
 */

import { toast } from 'react-toastify';

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://tprosysit.com/upmrc/public/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // 1 second
};

/**
 * Get authentication headers for API requests
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
};

/**
 * Get current user context for API requests
 */
export const getUserContext = () => {
  try {
    const user = JSON.parse(localStorage.getItem('userdata') || '{}');
    return {
      employee_id: user.profileid,
      department: user.department,
      unit: user.department,
    };
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return {};
  }
};

/**
 * Sleep function for retry delays
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Enhanced API call function with retry logic and error handling
 * @param {string} endpoint - API endpoint relative to base URL
 * @param {Object} options - Request options
 * @param {Object} body - Request body
 * @param {number} retryCount - Current retry attempt
 */
export const apiCall = async (endpoint, body = {}, options = {}, retryCount = 0) => {
  const {
    method = 'POST',
    headers = {},
    timeout = API_CONFIG.TIMEOUT,
    skipAuth = false
  } = options;

  // Prepare headers
  const requestHeaders = skipAuth ? 
    { 'Content-Type': 'application/json', ...headers } :
    { ...getAuthHeaders(), ...headers };

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/${endpoint}`, {
      method,
      headers: requestHeaders,
      body: method === 'GET' ? undefined : JSON.stringify(body),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Handle different response status codes
    if (response.status === 401) {
      // Unauthorized - redirect to login
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }

    if (response.status === 403) {
      throw new Error('Access denied. You do not have permission to perform this action.');
    }

    if (response.status === 429) {
      // Rate limited - wait and retry
      if (retryCount < API_CONFIG.RETRY_ATTEMPTS) {
        await sleep(API_CONFIG.RETRY_DELAY * (retryCount + 1));
        return apiCall(endpoint, body, options, retryCount + 1);
      }
      throw new Error('Too many requests. Please try again later.');
    }

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    clearTimeout(timeoutId);

    // Handle network errors with retry
    if ((error.name === 'TypeError' || error.name === 'AbortError') && 
        retryCount < API_CONFIG.RETRY_ATTEMPTS) {
      await sleep(API_CONFIG.RETRY_DELAY * (retryCount + 1));
      return apiCall(endpoint, body, options, retryCount + 1);
    }

    // Handle specific error types
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Please check your connection and try again.');
    }

    throw error;
  }
};

/**
 * Department-specific API endpoints configuration
 */
export const DEPARTMENT_ENDPOINTS = {
  signalling: {
    base: 'register/signalling',
    maintenance: 'register/signalling/maintenance',
    safety: 'register/signalling/safety',
    system: 'register/signalling/system',
    inspection: 'register/signalling/inspection'
  },
  telecom: {
    base: 'register/telecom',
    system: 'register/telecom/system',
    maintenance: 'register/telecom/maintenance',
    administrative: 'register/telecom/admin',
    network: 'register/telecom/network'
  },
  operation: {
    base: 'register/operation',
    station: 'register/operation/station',
    traffic: 'register/operation/traffic',
    safety: 'register/operation/safety',
    personnel: 'register/operation/personnel'
  },
  finance: {
    base: 'register/finance',
    budget: 'register/finance/budget',
    transaction: 'register/finance/transaction',
    audit: 'register/finance/audit',
    report: 'register/finance/report'
  },
  'afc-mainline': {
    base: 'register/afc_mainline',
    gate: 'register/afc_mainline/gate',
    preventive: 'register/afc_mainline/preventive',
    system: 'register/afc_mainline/system'
  },
  'afc-sdc': {
    base: 'register/afc_sdc',
    system: 'register/afc_sdc/system',
    card: 'register/afc_sdc/card',
    parameter: 'register/afc_sdc/parameter',
    maintenance: 'register/afc_sdc/maintenance'
  },
  'afc-store': {
    base: 'register/afc_store',
    inventory: 'register/afc_store/inventory',
    transaction: 'register/afc_store/transaction',
    asset: 'register/afc_store/asset'
  }
};

/**
 * Create department-specific API caller
 * @param {string} department - Department name
 */
export const createDepartmentAPI = (department) => {
  const endpoints = DEPARTMENT_ENDPOINTS[department];
  
  if (!endpoints) {
    throw new Error(`Unknown department: ${department}`);
  }

  return {
    // Generic CRUD operations
    fetch: (subEndpoint = 'base', body = {}) => 
      apiCall(`${endpoints[subEndpoint] || endpoints.base}/viewData`, body),
    
    add: (subEndpoint = 'base', data) => 
      apiCall(`${endpoints[subEndpoint] || endpoints.base}/save`, {
        ...data,
        ...getUserContext()
      }),
    
    edit: (subEndpoint = 'base', data) => 
      apiCall(`${endpoints[subEndpoint] || endpoints.base}/edit`, {
        ...data,
        ...getUserContext()
      }),
    
    delete: (subEndpoint = 'base', id) => 
      apiCall(`${endpoints[subEndpoint] || endpoints.base}/delete`, {
        update_id: id
      }),
    
    save: (subEndpoint = 'base', id, status = '1') => 
      apiCall(`${endpoints[subEndpoint] || endpoints.base}/edit`, {
        update_id: id,
        status
      }),

    // Custom endpoint caller
    call: (subEndpoint, action, body = {}) => 
      apiCall(`${endpoints[subEndpoint] || endpoints.base}/${action}`, body)
  };
};

/**
 * Batch API operations for multiple requests
 * @param {Array} requests - Array of {endpoint, body, options} objects
 */
export const batchApiCall = async (requests) => {
  const promises = requests.map(({ endpoint, body, options }) => 
    apiCall(endpoint, body, options).catch(error => ({ error: error.message }))
  );
  
  return Promise.all(promises);
};

/**
 * Error handler for API responses
 * @param {Object} response - API response
 * @param {string} operation - Operation type (add, edit, delete, etc.)
 */
export const handleApiResponse = (response, operation = 'operation') => {
  if (response.success) {
    const messages = {
      add: 'Data added successfully!',
      edit: 'Data updated successfully!',
      delete: 'Data deleted successfully!',
      save: 'Data saved successfully!',
      fetch: 'Data loaded successfully!'
    };
    
    toast.success(messages[operation] || 'Operation completed successfully!');
    return true;
  } else {
    const errorMessage = response.message || `Failed to ${operation} data`;
    toast.error(errorMessage);
    console.error(`API ${operation} error:`, response);
    return false;
  }
};

/**
 * File upload helper for forms with file attachments
 * @param {string} endpoint - Upload endpoint
 * @param {FormData} formData - Form data with files
 */
export const uploadFile = async (endpoint, formData) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export default {
  apiCall,
  createDepartmentAPI,
  batchApiCall,
  handleApiResponse,
  uploadFile,
  getAuthHeaders,
  getUserContext,
  DEPARTMENT_ENDPOINTS
};