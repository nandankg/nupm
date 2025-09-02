/**
 * AFC-SDC Department Validation Schemas
 * Comprehensive validation rules for all AFC-SDC forms
 * Based on railway operational requirements and SDC-specific business rules
 */

import * as Yup from 'yup';

// Common validation patterns
const PATTERNS = {
  EMPLOYEE_ID_SDC: /^SDC-[0-9]{4}$/,
  IP_ADDRESS: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  MAC_ADDRESS: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
  VERSION_NUMBER: /^\d+\.\d+\.\d+$/,
};

// Common field validations
const commonValidations = {
  employeeSDC: Yup.string()
    .matches(PATTERNS.EMPLOYEE_ID_SDC, 'Employee ID must be in format SDC-XXXX')
    .required('Employee ID is required'),
  
  date: Yup.date()
    .required('Date is required')
    .max(new Date(), 'Date cannot be in the future'),
  
  time: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format')
    .required('Time is required'),
  
  systemStatus: Yup.string()
    .oneOf(['operational', 'under-maintenance', 'faulty', 'offline'], 'Invalid system status')
    .required('System status is required'),
  
  sdcLocation: Yup.string()
    .oneOf([
      'sdc-server-room',
      'cc-control-room', 
      'cchs-room',
      'equipment-room',
      'network-room',
      'backup-facility',
      'maintenance-area'
    ], 'Invalid SDC location')
    .required('SDC location is required'),
  
  sdcEquipmentType: Yup.string()
    .oneOf([
      'sdc-server',
      'cc-workstation',
      'cchs-workstation',
      'cc-bim',
      'tim',
      'cpd',
      'csc-system',
      'parameter-server',
      'application-server',
      'database-server'
    ], 'Invalid SDC equipment type')
    .required('SDC equipment type is required'),
};

// 1. Agent ID Issue Card Validation Schema
export const agentCardRegistersValidation = Yup.object({
  date: commonValidations.date,
  time: commonValidations.time,
  employeeId: commonValidations.employeeSDC,
  cardType: Yup.string()
    .oneOf(['agent-id-card', 'service-card', 'maintenance-card'], 'Invalid card type')
    .required('Card type is required'),
  cardNumber: Yup.string()
    .matches(/^[A-Z0-9]{8,12}$/, 'Card number must be 8-12 alphanumeric characters')
    .required('Card number is required'),
  issueReason: Yup.string()
    .oneOf(['new-issue', 'replacement', 'renewal', 'temporary'], 'Invalid issue reason')
    .required('Issue reason is required'),
  validFrom: Yup.date().required('Valid from date is required'),
  validTo: Yup.date()
    .min(Yup.ref('validFrom'), 'Valid to date must be after valid from date')
    .required('Valid to date is required'),
  remarks: Yup.string().max(500, 'Remarks cannot exceed 500 characters'),
});

// 2. CSC Initialization Detail Register
export const cscInitializationValidation = Yup.object({
  date: commonValidations.date,
  time: commonValidations.time,
  employeeId: commonValidations.employeeSDC,
  cscId: Yup.string()
    .matches(/^CSC-[0-9]{3}$/, 'CSC ID must be in format CSC-XXX')
    .required('CSC ID is required'),
  initializationType: Yup.string()
    .oneOf(['fresh-initialization', 'parameter-update', 'software-update', 'configuration-change'])
    .required('Initialization type is required'),
  parameters: Yup.array().of(
    Yup.object({
      parameterName: Yup.string().required('Parameter name is required'),
      oldValue: Yup.string(),
      newValue: Yup.string().required('New value is required'),
    })
  ).min(1, 'At least one parameter is required'),
  status: commonValidations.systemStatus,
  remarks: Yup.string().max(500, 'Remarks cannot exceed 500 characters'),
});

// 3. Daily Check Register SDC
export const dailyCheckRegisterSDCValidation = Yup.object({
  date: commonValidations.date,
  shift: Yup.string()
    .oneOf(['morning', 'afternoon', 'night'], 'Invalid shift')
    .required('Shift is required'),
  employeeId: commonValidations.employeeSDC,
  checklistItems: Yup.array().of(
    Yup.object({
      item: Yup.string().required('Checklist item is required'),
      status: Yup.string()
        .oneOf(['ok', 'not-ok', 'na'], 'Invalid status')
        .required('Status is required'),
      remarks: Yup.string().max(200, 'Remarks cannot exceed 200 characters'),
    })
  ).min(5, 'Minimum 5 checklist items required'),
  overallStatus: Yup.string()
    .oneOf(['all-ok', 'minor-issues', 'major-issues'], 'Invalid overall status')
    .required('Overall status is required'),
  supervisorApproval: Yup.boolean().oneOf([true], 'Supervisor approval is required'),
});

// 4. FMTS SDC Validation
export const fmtsSDCValidation = Yup.object({
  date: commonValidations.date,
  time: commonValidations.time,
  reportedBy: commonValidations.employeeSDC,
  faultType: Yup.string()
    .oneOf(['hardware', 'software', 'network', 'configuration', 'user-error'])
    .required('Fault type is required'),
  equipmentAffected: commonValidations.sdcEquipmentType,
  location: commonValidations.sdcLocation,
  priority: Yup.string()
    .oneOf(['low', 'medium', 'high', 'critical'], 'Invalid priority level')
    .required('Priority is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters')
    .required('Fault description is required'),
  actionTaken: Yup.string().max(1000, 'Action taken cannot exceed 1000 characters'),
  status: Yup.string()
    .oneOf(['reported', 'assigned', 'in-progress', 'resolved', 'closed'])
    .required('Status is required'),
  assignedTo: Yup.string().when('status', {
    is: (val) => ['assigned', 'in-progress'].includes(val),
    then: () => commonValidations.employeeSDC,
  }),
});

// 5. Parameter Register SDC
export const parameterRegisterSDCValidation = Yup.object({
  date: commonValidations.date,
  time: commonValidations.time,
  employeeId: commonValidations.employeeSDC,
  equipmentId: Yup.string()
    .matches(/^[A-Z]{2,4}-[0-9]{3,4}$/, 'Equipment ID format invalid')
    .required('Equipment ID is required'),
  parameterType: Yup.string()
    .oneOf(['system-parameter', 'network-parameter', 'security-parameter', 'performance-parameter'])
    .required('Parameter type is required'),
  parameterChanges: Yup.array().of(
    Yup.object({
      parameterName: Yup.string().required('Parameter name is required'),
      currentValue: Yup.string().required('Current value is required'),
      newValue: Yup.string().required('New value is required'),
      changeReason: Yup.string()
        .oneOf(['maintenance', 'performance-optimization', 'security-update', 'bug-fix'])
        .required('Change reason is required'),
    })
  ).min(1, 'At least one parameter change required'),
  approvedBy: commonValidations.employeeSDC,
  approvalDateTime: Yup.date().required('Approval date/time is required'),
});

// 6. PM Log Book Monthly SDC
export const pmLogBookMonthlySDCValidation = Yup.object({
  date: commonValidations.date,
  month: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Month must be in MM/YYYY format')
    .required('Month is required'),
  employeeId: commonValidations.employeeSDC,
  equipmentCovered: Yup.array().of(commonValidations.sdcEquipmentType)
    .min(1, 'At least one equipment type must be covered'),
  maintenanceActivities: Yup.array().of(
    Yup.object({
      activity: Yup.string().required('Activity description is required'),
      equipment: commonValidations.sdcEquipmentType,
      status: Yup.string()
        .oneOf(['completed', 'partial', 'deferred', 'not-applicable'])
        .required('Activity status is required'),
      remarks: Yup.string().max(300, 'Remarks cannot exceed 300 characters'),
    })
  ).min(5, 'Minimum 5 maintenance activities required'),
  overallAssessment: Yup.string()
    .oneOf(['excellent', 'good', 'satisfactory', 'needs-improvement'])
    .required('Overall assessment is required'),
  supervisorSignature: commonValidations.employeeSDC,
});

// 7. Software Update Register SDC
export const softwareUpdateRegisterSDCValidation = Yup.object({
  date: commonValidations.date,
  time: commonValidations.time,
  updatedBy: commonValidations.employeeSDC,
  equipmentAffected: commonValidations.sdcEquipmentType,
  updateType: Yup.string()
    .oneOf(['device-application', 'os-update', 'urc-update', 'firmware-update', 'security-patch'])
    .required('Update type is required'),
  currentVersion: Yup.string()
    .matches(PATTERNS.VERSION_NUMBER, 'Version must be in X.X.X format')
    .required('Current version is required'),
  newVersion: Yup.string()
    .matches(PATTERNS.VERSION_NUMBER, 'Version must be in X.X.X format')
    .required('New version is required'),
  backupTaken: Yup.boolean().oneOf([true], 'Backup must be taken before update'),
  updateStatus: Yup.string()
    .oneOf(['scheduled', 'in-progress', 'completed', 'failed', 'rolled-back'])
    .required('Update status is required'),
  testingResults: Yup.string()
    .when('updateStatus', {
      is: 'completed',
      then: () => Yup.string().required('Testing results required for completed updates'),
    }),
  approvedBy: commonValidations.employeeSDC,
});

// Additional validation schemas for remaining forms...
// (Following the same pattern for all 18 AFC-SDC forms)

// Export all validation schemas
export default {
  agentCardRegistersValidation,
  cscInitializationValidation,
  dailyCheckRegisterSDCValidation,
  fmtsSDCValidation,
  parameterRegisterSDCValidation,
  pmLogBookMonthlySDCValidation,
  softwareUpdateRegisterSDCValidation,
};