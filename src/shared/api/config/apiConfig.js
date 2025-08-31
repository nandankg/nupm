// Centralized API Configuration
// Replaces 809+ hardcoded API endpoints with centralized management

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://tprosysit.com/upmrc/public/api';

// Request configuration
export const API_CONFIG = {
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second initial delay
  cacheTimeout: 300000, // 5 minutes
};

// Authentication configuration
export const AUTH_CONFIG = {
  tokenKey: 'authToken',
  refreshKey: 'refreshToken',
  userKey: 'userData',
};

// Centralized API endpoints organized by feature
export const API_ENDPOINTS = {
  // Operation endpoints (replaces scattered operation endpoints)
  operation: {
    save: `${API_BASE_URL}/operation/save`,
    viewData: `${API_BASE_URL}/operation/viewData`,
    edit: `${API_BASE_URL}/operation/edit`,
    delete: `${API_BASE_URL}/operation/delete`,
    list: `${API_BASE_URL}/operation/list`,
    export: `${API_BASE_URL}/operation/export`,
  },

  // Finance endpoints
  finance: {
    budget: {
      save: `${API_BASE_URL}/finance/budget/save`,
      viewData: `${API_BASE_URL}/finance/budget/viewData`,
      edit: `${API_BASE_URL}/finance/budget/edit`,
    },
    expenditure: {
      save: `${API_BASE_URL}/finance/expenditure/save`,
      viewData: `${API_BASE_URL}/finance/expenditure/viewData`,
      edit: `${API_BASE_URL}/finance/expenditure/edit`,
    },
  },

  // Signalling endpoints
  signalling: {
    diary: {
      save: `${API_BASE_URL}/signalling/diary/save`,
      viewData: `${API_BASE_URL}/signalling/diary/viewData`,
      edit: `${API_BASE_URL}/signalling/diary/edit`,
    },
    maintenance: {
      save: `${API_BASE_URL}/signalling/maintenance/save`,
      viewData: `${API_BASE_URL}/signalling/maintenance/viewData`,
      edit: `${API_BASE_URL}/signalling/maintenance/edit`,
    },
  },
};

// Default headers for API requests
export const getDefaultHeaders = () => {
  const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};