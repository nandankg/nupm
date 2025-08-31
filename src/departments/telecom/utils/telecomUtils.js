// Telecom Department Utility Functions
// Common utilities and helpers for telecom forms

import { format, addDays, addWeeks, addMonths, addYears } from 'date-fns';

// Date formatting utilities
export const formatDate = (date) => {
  if (!date) return '';
  try {
    return format(new Date(date), 'dd/MM/yyyy');
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

export const formatDateTime = (dateTime) => {
  if (!dateTime) return '';
  try {
    return format(new Date(dateTime), 'dd/MM/yyyy HH:mm');
  } catch (error) {
    console.error('DateTime formatting error:', error);
    return '';
  }
};

export const formatTime = (time) => {
  if (!time) return '';
  try {
    const timeObj = new Date(`2000-01-01T${time}`);
    return format(timeObj, 'HH:mm');
  } catch (error) {
    console.error('Time formatting error:', error);
    return time;
  }
};

// PM Schedule calculators
export const calculateNextPmDate = (currentDate, frequency) => {
  if (!currentDate) return '';
  
  const date = new Date(currentDate);
  
  switch (frequency) {
    case 'Daily':
      return format(addDays(date, 1), 'yyyy-MM-dd');
    case 'Weekly':
      return format(addWeeks(date, 1), 'yyyy-MM-dd');
    case 'Monthly':
      return format(addMonths(date, 1), 'yyyy-MM-dd');
    case 'Quarterly':
      return format(addMonths(date, 3), 'yyyy-MM-dd');
    case 'Half-Yearly':
      return format(addMonths(date, 6), 'yyyy-MM-dd');
    case 'Yearly':
      return format(addYears(date, 1), 'yyyy-MM-dd');
    default:
      return '';
  }
};

export const isPmDue = (dueDate) => {
  if (!dueDate) return false;
  
  const due = new Date(dueDate);
  const today = new Date();
  
  return due <= today;
};

export const getPmStatus = (dueDate) => {
  if (!dueDate) return 'Unknown';
  
  const due = new Date(dueDate);
  const today = new Date();
  const daysDiff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  
  if (daysDiff < 0) {
    return 'Overdue';
  } else if (daysDiff === 0) {
    return 'Due Today';
  } else if (daysDiff <= 3) {
    return 'Due Soon';
  } else if (daysDiff <= 7) {
    return 'Upcoming';
  } else {
    return 'Scheduled';
  }
};

// System-specific utilities
export const getSystemTypeIcon = (systemType) => {
  const iconMap = {
    'TER': 'fas fa-server',
    'UPS': 'fas fa-battery-three-quarters',
    'SMPS': 'fas fa-plug',
    'CSS': 'fas fa-headset',
    'Colony': 'fas fa-home',
    'PA': 'fas fa-volume-up',
    'CCTV': 'fas fa-video',
    'Fire': 'fas fa-fire-extinguisher',
    'BMS': 'fas fa-building'
  };
  
  return iconMap[systemType] || 'fas fa-cog';
};

export const getSystemTypeColor = (systemType) => {
  const colorMap = {
    'TER': 'primary',
    'UPS': 'warning',
    'SMPS': 'success',
    'CSS': 'info',
    'Colony': 'secondary',
    'PA': 'dark',
    'CCTV': 'danger',
    'Fire': 'danger',
    'BMS': 'primary'
  };
  
  return colorMap[systemType] || 'secondary';
};

export const getStatusColor = (status) => {
  const colorMap = {
    'OK': 'success',
    'Not OK': 'danger',
    'Under Maintenance': 'warning',
    'Requires Attention': 'warning',
    'N/A': 'secondary',
    'Satisfactory': 'success',
    'Unsatisfactory': 'danger',
    'Completed': 'success',
    'Pending': 'warning',
    'Overdue': 'danger',
    'Due Today': 'warning',
    'Due Soon': 'info',
    'Upcoming': 'primary',
    'Scheduled': 'secondary'
  };
  
  return colorMap[status] || 'secondary';
};

// Location utilities
export const getLocationFullName = (locationCode) => {
  const locationMap = {
    'Depot': 'Depot Location',
    'Station': 'Station Location',
    'OCC': 'Operations Control Center',
    'BCC': 'Backup Control Center',
    'OCC-BCC': 'OCC & BCC Combined',
    'TER-Room': 'Terminal Equipment Room',
    'UPS-Room': 'UPS Equipment Room',
    'Officer-Colony': 'Officer Colony Area'
  };
  
  return locationMap[locationCode] || locationCode;
};

// Priority utilities
export const getPriorityOrder = (priority) => {
  const priorityOrder = {
    'Emergency': 5,
    'Critical': 4,
    'High': 3,
    'Medium': 2,
    'Low': 1
  };
  
  return priorityOrder[priority] || 0;
};

export const sortByPriority = (items, priorityField = 'priority') => {
  return [...items].sort((a, b) => 
    getPriorityOrder(b[priorityField]) - getPriorityOrder(a[priorityField])
  );
};

// Form data utilities
export const generateFormId = (prefix = 'TEL') => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}-${timestamp}-${random}`;
};

export const sanitizeFormData = (data) => {
  const sanitized = {};
  
  Object.keys(data).forEach(key => {
    const value = data[key];
    
    if (typeof value === 'string') {
      // Trim whitespace and remove extra spaces
      sanitized[key] = value.trim().replace(/\s+/g, ' ');
    } else if (typeof value === 'number' && !isNaN(value)) {
      // Keep valid numbers
      sanitized[key] = value;
    } else if (value instanceof Date) {
      // Convert dates to ISO strings
      sanitized[key] = value.toISOString();
    } else if (value !== null && value !== undefined && value !== '') {
      // Keep other valid values
      sanitized[key] = value;
    }
  });
  
  return sanitized;
};

export const validateRequiredFields = (data, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
    }
  });
  
  return errors;
};

// Export utilities
export const exportToCSV = (data, filename = 'telecom-data.csv') => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error('No data to export');
    return;
  }
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || '';
        // Escape commas and quotes in CSV
        return typeof value === 'string' && (value.includes(',') || value.includes('"'))
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Print utilities
export const printForm = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found`);
    return;
  }
  
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Telecom Form Print</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
          @media print {
            .no-print { display: none !important; }
            .print-page-break { page-break-after: always; }
            body { font-size: 12px; }
            .table { font-size: 11px; }
          }
          .header { 
            text-align: center; 
            margin-bottom: 20px; 
            border-bottom: 2px solid #333; 
            padding-bottom: 10px; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h3>UPMRC - Telecom Department</h3>
          <p>Printed on: ${new Date().toLocaleString()}</p>
        </div>
        ${element.outerHTML}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

// Default export with all utilities
export default {
  formatDate,
  formatDateTime,
  formatTime,
  calculateNextPmDate,
  isPmDue,
  getPmStatus,
  getSystemTypeIcon,
  getSystemTypeColor,
  getStatusColor,
  getLocationFullName,
  getPriorityOrder,
  sortByPriority,
  generateFormId,
  sanitizeFormData,
  validateRequiredFields,
  exportToCSV,
  printForm
};