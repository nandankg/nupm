/**
 * Date Helper Utilities
 * 
 * Common date formatting and manipulation functions for forms
 */

/**
 * Format date to DD/MM/YYYY format
 * @param {Date|string} date 
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Format date to YYYY-MM-DD format for input fields
 * @param {Date|string} date 
 * @returns {string}
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format time to HH:MM format
 * @param {Date|string} time 
 * @returns {string}
 */
export const formatTime = (time) => {
  if (!time) return '';
  const d = new Date(time);
  if (isNaN(d.getTime())) return '';
  
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Get current date in DD/MM/YYYY format
 * @returns {string}
 */
export const getCurrentDate = () => {
  return formatDate(new Date());
};

/**
 * Get current time in HH:MM format
 * @returns {string}
 */
export const getCurrentTime = () => {
  return formatTime(new Date());
};

/**
 * Get current date for input field
 * @returns {string}
 */
export const getCurrentDateForInput = () => {
  return formatDateForInput(new Date());
};

/**
 * Parse date string and validate
 * @param {string} dateStr 
 * @returns {Date|null}
 */
export const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Check if date is valid
 * @param {string|Date} date 
 * @returns {boolean}
 */
export const isValidDate = (date) => {
  if (!date) return false;
  const d = new Date(date);
  return !isNaN(d.getTime());
};

/**
 * Get date difference in days
 * @param {Date|string} date1 
 * @param {Date|string} date2 
 * @returns {number}
 */
export const getDateDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
  
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default {
  formatDate,
  formatDateForInput,
  formatTime,
  getCurrentDate,
  getCurrentTime,
  getCurrentDateForInput,
  parseDate,
  isValidDate,
  getDateDifference
};