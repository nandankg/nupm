import dayjs from "dayjs";
import { formatToIndianDate } from "./dateUtils";

/**
 * Enhanced table filtering utilities with improved date handling and search logic
 * Addresses common filter issues reported by clients
 */

/**
 * Safely parses date string to dayjs object
 * @param {string|Date|dayjs.Dayjs} dateInput - Date input to parse
 * @returns {dayjs.Dayjs|null} Parsed date or null if invalid
 */
const parseDate = (dateInput) => {
  if (!dateInput) return null;
  
  // If already a dayjs object
  if (dayjs.isDayjs(dateInput)) return dateInput;
  
  // Try to parse various date formats
  const date = dayjs(dateInput);
  return date.isValid() ? date : null;
};

/**
 * Gets date value from item for filtering
 * Tries multiple date field names commonly used in the application
 * @param {Object} item - Data item
 * @returns {dayjs.Dayjs|null} Date for filtering
 */
const getItemDate = (item) => {
  // Common date field names in the application
  const dateFields = ['date', 'created_at', 'updated_at', 'submission_date', 'entry_date'];
  
  for (const field of dateFields) {
    if (item[field]) {
      const date = parseDate(item[field]);
      if (date) return date;
    }
  }
  
  return null;
};

/**
 * Enhanced search functionality
 * Searches across all searchable fields with better matching
 * @param {Object} item - Data item
 * @param {string} searchValue - Search term
 * @param {Array} columns - Column definitions
 * @returns {boolean} Whether item matches search
 */
const matchesSearch = (item, searchValue, columns) => {
  if (!searchValue || searchValue.trim() === '') return true;
  
  const searchTerm = searchValue.toLowerCase().trim();
  
  return columns.some(({ field, isDate, isSearchable = true }) => {
    if (isDate || !isSearchable) return false;
    
    const value = item[field];
    if (value === null || value === undefined) return false;
    
    const stringValue = String(value).toLowerCase();
    
    // Exact match or partial match
    return stringValue.includes(searchTerm) || stringValue === searchTerm;
  });
};

/**
 * Enhanced date range filtering
 * @param {Object} item - Data item
 * @param {dayjs.Dayjs|string|null} fromDate - Start date
 * @param {dayjs.Dayjs|string|null} toDate - End date
 * @returns {boolean} Whether item is within date range
 */
const matchesDateRange = (item, fromDate, toDate) => {
  // If no date filters provided, include all items
  if (!fromDate && !toDate) return true;
  
  const itemDate = getItemDate(item);
  if (!itemDate) return true; // Include items without dates
  
  const from = parseDate(fromDate);
  const to = parseDate(toDate);
  
  // If only from date is provided
  if (from && !to) {
    return itemDate.isSameOrAfter(from, 'day');
  }
  
  // If only to date is provided
  if (!from && to) {
    return itemDate.isSameOrBefore(to, 'day');
  }
  
  // If both dates are provided
  if (from && to) {
    return itemDate.isSameOrAfter(from, 'day') && itemDate.isSameOrBefore(to, 'day');
  }
  
  return true;
};

/**
 * Enhanced table data filtering function
 * Addresses filter issues reported in observations
 * @param {Array} items - Table data to be filtered
 * @param {string} searchValue - Search term for filtering
 * @param {dayjs.Dayjs|string|null} fromDate - Start date for filtering
 * @param {dayjs.Dayjs|string|null} toDate - End date for filtering
 * @param {Array} columns - Column definitions with field names and properties
 * @returns {Array} Filtered data
 */
export const filterTableData = (items, searchValue, fromDate, toDate, columns) => {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }
  
  if (!Array.isArray(columns) || columns.length === 0) {
    console.warn('No columns provided for filtering');
    return items;
  }
  
  try {
    return items.filter((item) => {
      const searchMatch = matchesSearch(item, searchValue, columns);
      const dateMatch = matchesDateRange(item, fromDate, toDate);
      
      return searchMatch && dateMatch;
    });
  } catch (error) {
    console.error('Error filtering table data:', error);
    return items; // Return original data if filtering fails
  }
};

/**
 * Filters data by station (commonly needed feature)
 * @param {Array} items - Table data
 * @param {string} stationName - Station to filter by
 * @returns {Array} Filtered data
 */
export const filterByStation = (items, stationName) => {
  if (!stationName || stationName === '') return items;
  
  return items.filter(item => 
    item.station === stationName || 
    item.station_name === stationName ||
    item.stationName === stationName
  );
};

/**
 * Filters data by employee ID (for user-specific data)
 * @param {Array} items - Table data
 * @param {string} employeeId - Employee ID to filter by
 * @returns {Array} Filtered data
 */
export const filterByEmployee = (items, employeeId) => {
  if (!employeeId || employeeId === '') return items;
  
  return items.filter(item => 
    item.employee_id === employeeId || 
    item.employeeid === employeeId ||
    item.emp_id === employeeId
  );
};

/**
 * Sorts table data by specified column
 * @param {Array} items - Table data to sort
 * @param {string} field - Field name to sort by
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array} Sorted data
 */
export const sortTableData = (items, field, direction = 'asc') => {
  if (!Array.isArray(items) || items.length === 0) return items;
  
  return [...items].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    
    // Handle null/undefined values
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return direction === 'asc' ? -1 : 1;
    if (bVal == null) return direction === 'asc' ? 1 : -1;
    
    // Handle different data types
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    // String comparison (case insensitive)
    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    
    if (direction === 'asc') {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });
};

/**
 * Paginates table data
 * @param {Array} items - Data to paginate
 * @param {number} currentPage - Current page number (1-based)
 * @param {number} itemsPerPage - Items per page
 * @returns {Object} Paginated data with metadata
 */
export const paginateTableData = (items, currentPage = 1, itemsPerPage = 10) => {
  if (!Array.isArray(items)) {
    return {
      items: [],
      totalPages: 0,
      totalItems: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false
    };
  }
  
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    totalPages,
    totalItems,
    currentPage: validCurrentPage,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1,
    startIndex: startIndex + 1,
    endIndex
  };
};

/**
 * Gets unique values for a field (useful for filter dropdowns)
 * @param {Array} items - Table data
 * @param {string} field - Field name
 * @returns {Array} Array of unique values
 */
export const getUniqueFieldValues = (items, field) => {
  if (!Array.isArray(items) || items.length === 0) return [];
  
  const values = items
    .map(item => item[field])
    .filter(value => value !== null && value !== undefined && value !== '')
    .map(value => String(value).trim());
    
  return [...new Set(values)].sort();
};

/**
 * Advanced search with multiple criteria
 * @param {Array} items - Table data
 * @param {Object} criteria - Search criteria object
 * @returns {Array} Filtered results
 */
export const advancedSearch = (items, criteria) => {
  if (!Array.isArray(items) || !criteria || Object.keys(criteria).length === 0) {
    return items;
  }
  
  return items.filter(item => {
    return Object.entries(criteria).every(([field, searchValue]) => {
      if (!searchValue || searchValue === '') return true;
      
      const itemValue = item[field];
      if (itemValue === null || itemValue === undefined) return false;
      
      const searchStr = String(searchValue).toLowerCase().trim();
      const itemStr = String(itemValue).toLowerCase().trim();
      
      return itemStr.includes(searchStr);
    });
  });
};