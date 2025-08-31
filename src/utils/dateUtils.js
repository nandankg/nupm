/**
 * Indian Date Formatting Utilities
 * Converts dates to dd-mm-yyyy format suitable for Indian users
 */

/**
 * Formats a date to Indian format (dd-mm-yyyy)
 * @param {Date|string} date - Date to format
 * @param {boolean} includeTime - Whether to include time (HH:MM)
 * @returns {string} Formatted date string
 */
export const formatToIndianDate = (date, includeTime = false) => {
  if (!date) return '';
  
  const d = new Date(date);
  
  // Check if date is valid
  if (isNaN(d.getTime())) {
    console.warn('Invalid date provided:', date);
    return '';
  }
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  if (includeTime) {
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
  
  return `${day}-${month}-${year}`;
};

/**
 * Formats a date to Indian format with full time (dd-mm-yyyy HH:MM:SS)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date-time string
 */
export const formatToIndianDateTime = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    console.warn('Invalid date provided:', date);
    return '';
  }
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

/**
 * Formats date for display in tables and lists
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string (dd-mm-yyyy)
 */
export const formatDateForDisplay = (date) => {
  return formatToIndianDate(date, false);
};

/**
 * Formats date for form inputs (yyyy-mm-dd format required by HTML date inputs)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string for HTML input
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    console.warn('Invalid date provided:', date);
    return '';
  }
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return `${year}-${month}-${day}`;
};

/**
 * Converts dd-mm-yyyy format back to Date object
 * @param {string} indianDate - Date in dd-mm-yyyy format
 * @returns {Date|null} Date object or null if invalid
 */
export const parseIndianDate = (indianDate) => {
  if (!indianDate || typeof indianDate !== 'string') return null;
  
  const parts = indianDate.split('-');
  if (parts.length !== 3) return null;
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
  const year = parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  
  // Validate the date
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }
  
  return date;
};

/**
 * Gets current date and time in Indian format
 * @param {boolean} includeTime - Whether to include time
 * @returns {string} Current date in Indian format
 */
export const getCurrentIndianDate = (includeTime = true) => {
  return formatToIndianDate(new Date(), includeTime);
};

/**
 * Formats date range for display
 * @param {Date|string} fromDate - Start date
 * @param {Date|string} toDate - End date
 * @returns {string} Formatted date range
 */
export const formatDateRange = (fromDate, toDate) => {
  const from = formatToIndianDate(fromDate);
  const to = formatToIndianDate(toDate);
  
  if (from && to) {
    return `${from} to ${to}`;
  } else if (from) {
    return `From ${from}`;
  } else if (to) {
    return `Until ${to}`;
  }
  
  return '';
};

/**
 * Checks if a date string is in Indian format (dd-mm-yyyy)
 * @param {string} dateString - Date string to check
 * @returns {boolean} True if in Indian format
 */
export const isIndianDateFormat = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return false;
  
  // Check pattern: dd-mm-yyyy
  const pattern = /^\d{2}-\d{2}-\d{4}$/;
  return pattern.test(dateString);
};

/**
 * Converts various date formats to Indian format
 * Handles: ISO strings, US format (mm/dd/yyyy), European format (dd/mm/yyyy), etc.
 * @param {string|Date} date - Date in any format
 * @returns {string} Date in Indian format (dd-mm-yyyy)
 */
export const convertToIndianFormat = (date) => {
  if (!date) return '';
  
  // If already in Indian format, return as-is
  if (typeof date === 'string' && isIndianDateFormat(date)) {
    return date;
  }
  
  // Try to parse and convert
  return formatToIndianDate(date);
};