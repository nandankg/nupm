# 🗄️ Database Column Mapping Master Guide
## Universal Solution for "Unknown column" Errors

### 🚨 **CRITICAL PROBLEM SOLVED**

**Error Pattern**: `SQLSTATE[42S22]: Column not found: 1054 Unknown column 'FIELD_NAME' in 'INSERT INTO'`  
**Root Cause**: Frontend field names don't match database column names  
**Impact**: Form submission failures across all departments  
**Solution**: Systematic field mapping using this comprehensive guide

---

## 📋 **UNIVERSAL DIAGNOSTIC STEPS**

### **Step 1: Identify the Problematic Field**
When you get an error like: `Unknown column 'station' in 'INSERT INTO'`

1. **Error Field**: The field mentioned in the error (`station`)
2. **Form File**: The form that's causing the error
3. **Database Table**: Usually mentioned in the error or can be inferred from form type

### **Step 2: Find the Database Table Schema**
```sql
-- Check what columns actually exist in the database table
DESCRIBE table_name;

-- Common table naming patterns:
-- register_[form_type]_[department]
-- Example: register_asset_signalling, register_equipment_failure_signalling
```

### **Step 3: Common Field Mapping Issues**

| Frontend Field | Database Column | Common In |
|----------------|-----------------|-----------|
| `station` | `station_name` | Most signalling forms |
| `S_No` | AUTO-GENERATED | All forms (NEVER send) |
| `form_id` | AUTO-GENERATED | All forms (NEVER send) |
| `record_id` | AUTO-GENERATED | All forms (NEVER send) |
| `employeeName` | `employee_name` | All forms |
| `employeeID` | `employee_id` | All forms |
| `dateTime` | `date_time` | Most forms |
| `startTime` | `start_time` | Maintenance forms |
| `endTime` | `end_time` | Maintenance forms |
| `serialno` | `serial_number` | Equipment forms |

---

## 🛠️ **UNIVERSAL FIX PATTERNS**

### **Pattern A: Simple Field Rename**
For forms that directly map field names:

```javascript
// BEFORE (Causes error)
const submissionData = {
  ...formValues,
  status: isFinalSubmit ? "1" : "0"
};

// AFTER (Fixed)
const { station, employeeName, employeeID, ...otherValues } = formValues;
const submissionData = {
  ...otherValues,
  // Map frontend fields to database columns
  station_name: station,
  employee_name: employeeName, 
  employee_id: employeeID,
  status: isFinalSubmit ? "1" : "0"
};
```

### **Pattern B: Nested Values Structure**
For forms using `values` wrapper:

```javascript
// BEFORE (Causes error)
const submissionData = {
  formType: "form-name",
  values: {
    ...formValues,
    status: isFinalSubmit ? "1" : "0"
  }
};

// AFTER (Fixed)
const { station, employeeName, employeeID, ...otherValues } = formValues;
const submissionData = {
  formType: "form-name", 
  values: {
    ...otherValues,
    // Map frontend fields to database columns
    station_name: station,
    employee_name: employeeName,
    employee_id: employeeID,
    status: isFinalSubmit ? "1" : "0"
  }
};
```

### **Pattern C: Remove Auto-Generated Fields**
Always remove these fields from submission:

```javascript
// BEFORE (Causes error)
const basicInitialValues = {
  S_No: 1,           // ❌ Remove - auto-generated
  form_id: "",       // ❌ Remove - auto-generated  
  id: "",            // ❌ Remove - auto-generated
  record_id: "",     // ❌ Remove - auto-generated
  station: "",       // ✅ Keep but map to station_name
  // ... other fields
};

// AFTER (Fixed)
const basicInitialValues = {
  // FIXED: Removed auto-generated fields
  station: "",       // Will be mapped to station_name in submission
  // ... other fields
};
```

---

## 🔧 **AUTOMATED FIX SCRIPT**

### **JavaScript Helper Function**
Add this to any form that has field mapping issues:

```javascript
/**
 * Universal Database Field Mapper
 * Maps frontend field names to database column names
 * @param {Object} formValues - The form data
 * @returns {Object} - Mapped data ready for database submission
 */
function mapFieldsToDatabase(formValues) {
  // Extract fields that need mapping
  const {
    // Auto-generated fields (NEVER send to database)
    S_No,
    form_id, 
    id,
    record_id,
    serialNumber,
    recordNumber,
    
    // Fields that need name mapping
    station,
    employeeName,
    employeeID, 
    dateTime,
    startTime,
    endTime,
    serialno,
    
    // Keep all other fields as-is
    ...otherValues
  } = formValues;

  // Return mapped data
  return {
    ...otherValues,
    // Map renamed fields only if they exist
    ...(station && { station_name: station }),
    ...(employeeName && { employee_name: employeeName }),
    ...(employeeID && { employee_id: employeeID }),
    ...(dateTime && { date_time: dateTime }),
    ...(startTime && { start_time: startTime }),
    ...(endTime && { end_time: endTime }),
    ...(serialno && { serial_number: serialno }),
  };
}

// Usage in form submission:
const submissionData = {
  formType: "your-form-type",
  values: {
    ...mapFieldsToDatabase(formValues),
    status: isFinalSubmit ? "1" : "0"
  }
};
```

---

## 📊 **DEPARTMENT-SPECIFIC MAPPING RULES**

### **Signalling Department**
```javascript
// Common field mappings for signalling forms
const signallingFieldMap = {
  station: 'station_name',
  gearID: 'gear_id',
  employeeName: 'employee_name',
  employeeID: 'employee_id',
  equipmentType: 'equipment_type',
  failureType: 'failure_type',
  dateTime: 'date_time'
};
```

### **Telecom Department**
```javascript
// Common field mappings for telecom forms  
const telecomFieldMap = {
  station: 'station_name',
  equipmentID: 'equipment_id',
  employeeName: 'employee_name', 
  employeeID: 'employee_id',
  checklistType: 'checklist_type',
  maintenanceType: 'maintenance_type'
};
```

### **Operation Department**
```javascript
// Common field mappings for operation forms
const operationFieldMap = {
  station: 'station_name',
  trainNumber: 'train_number',
  employeeName: 'employee_name',
  employeeID: 'employee_id', 
  incidentType: 'incident_type',
  reportTime: 'report_time'
};
```

---

## 🔍 **DIAGNOSTIC COMMANDS**

### **Find Forms with Potential Issues**
```bash
# Find forms sending problematic fields
grep -r "S_No\|form_id\|record_id" src/departments/ --include="*.jsx"

# Find forms with station field (might need station_name mapping)
grep -r "station.*:" src/departments/ --include="*.jsx"

# Find forms using ...formValues (need field mapping)  
grep -r "...formValues" src/departments/ --include="*.jsx"
```

### **Database Schema Check**
```sql
-- Check table structure
SHOW COLUMNS FROM table_name;

-- Find tables containing specific column
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS 
WHERE COLUMN_NAME = 'station_name' AND TABLE_SCHEMA = 'your_database';

-- Common signalling tables
DESCRIBE register_asset_signalling;
DESCRIBE register_equipment_failure_signalling; 
DESCRIBE register_hardware_failure_signalling;
```

---

## ⚡ **QUICK FIX CHECKLIST**

### **For ANY "Unknown column" Error:**

1. **✅ Identify the problematic field** from error message
2. **✅ Check database table structure** using `DESCRIBE table_name`  
3. **✅ Apply appropriate mapping pattern:**
   - `station` → `station_name`
   - `employeeName` → `employee_name`
   - `employeeID` → `employee_id`
   - Remove: `S_No`, `form_id`, `record_id`, `id`
4. **✅ Test both draft and final submission**
5. **✅ Verify form_id auto-generation works**

### **Universal Code Template:**
```javascript
// In any form's submission function:
try {
  // Map fields to database columns
  const { station, employeeName, employeeID, S_No, form_id, id, record_id, ...cleanValues } = formValues;
  
  const submissionData = {
    formType: "your-form-type",
    values: {
      ...cleanValues,
      // Map only if fields exist
      ...(station && { station_name: station }),
      ...(employeeName && { employee_name: employeeName }),
      ...(employeeID && { employee_id: employeeID }),
      // Required fields
      status: isFinalSubmit ? "1" : "0",
      department: "YourDepartment",
      employee_id: user.id,
      employee_name: user.name
    }
  };

  dispatch(addData(submissionData));
  
} catch (error) {
  console.error("Database submission error:", error);
  // Check error message for field mapping clues
}
```

---

## 🚀 **PREVENTION STRATEGIES**

### **1. Standard Form Template**
Create a standard form template that includes proper field mapping:

```javascript
// templates/UniversalFormSubmission.js
export const createSubmissionData = (formValues, formType, isFinalSubmit, user) => {
  // Remove auto-generated fields and map common fields
  const {
    S_No, form_id, id, record_id,        // Remove auto-generated
    station, employeeName, employeeID,   // Map these fields
    ...cleanValues
  } = formValues;

  return {
    formType,
    values: {
      ...cleanValues,
      station_name: station,
      employee_name: employeeName,  
      employee_id: employeeID,
      status: isFinalSubmit ? "1" : "0",
      department: user.department,
      submitted_by: user.name,
      submitted_at: new Date().toISOString()
    }
  };
};
```

### **2. Database Schema Documentation**
Maintain updated schema documentation for each department:

```markdown
# Department Database Schemas

## Signalling Department Tables
- register_asset_signalling: station_name, gear_id, employee_name
- register_equipment_failure_signalling: station_name, equipment_type
- register_hardware_failure_signalling: station_name, failure_type

## Telecom Department Tables  
- register_checklist_telecom: station_name, checklist_type
- register_maintenance_telecom: station_name, maintenance_type
```

### **3. Automated Testing**
```javascript
// Test field mapping before submission
function validateFieldMapping(submissionData, expectedSchema) {
  const missingFields = expectedSchema.filter(field => !submissionData.values.hasOwnProperty(field));
  const extraFields = Object.keys(submissionData.values).filter(field => !expectedSchema.includes(field));
  
  if (missingFields.length > 0) {
    console.warn('Missing required fields:', missingFields);
  }
  if (extraFields.length > 0) {
    console.warn('Unexpected fields (might cause database errors):', extraFields);
  }
}
```

---

## 📚 **COMPLETE REFERENCE**

### **All Known Field Mappings**
```javascript
const UNIVERSAL_FIELD_MAPPINGS = {
  // Station and Location
  station: 'station_name',
  location: 'location_name',
  depot: 'depot_name',
  
  // Employee Information  
  employeeName: 'employee_name',
  employeeID: 'employee_id',
  empName: 'employee_name',
  empID: 'employee_id',
  
  // Equipment and System
  gearID: 'gear_id',
  equipmentID: 'equipment_id', 
  systemType: 'system_type',
  equipmentType: 'equipment_type',
  
  // Time and Date
  dateTime: 'date_time',
  startTime: 'start_time', 
  endTime: 'end_time',
  reportTime: 'report_time',
  
  // Serial and Identification
  serialno: 'serial_number',
  serialNumber: 'serial_number',
  
  // Types and Categories
  failureType: 'failure_type',
  incidentType: 'incident_type',
  maintenanceType: 'maintenance_type',
  checklistType: 'checklist_type',
  
  // NEVER SEND (Auto-generated)
  S_No: null,
  form_id: null,
  id: null,
  record_id: null,
  serialNumber: null, // When used as display counter
  recordNumber: null
};
```

---

## 🎯 **SUCCESS METRICS**

After applying these fixes:
- ✅ **Zero "Unknown column" errors** across all departments
- ✅ **Proper database field mapping** for all forms
- ✅ **Consistent submission patterns** across all departments  
- ✅ **Auto-generated fields working** properly (form_id, timestamps)
- ✅ **100% form submission success rate**

---

## 🆘 **TROUBLESHOOTING GUIDE**

### **Still Getting Column Errors?**

1. **Check the exact error message** - it tells you the problematic field
2. **Verify database table structure** using SQL DESCRIBE
3. **Check if field is auto-generated** - never send S_No, form_id, etc.
4. **Look for camelCase vs snake_case** differences
5. **Verify the correct table is being used** for the form type

### **Common Troubleshooting Commands**
```bash
# Find all forms in a department
find src/departments/signalling/forms -name "*.jsx" -type f

# Check for specific error-causing patterns
grep -r "S_No.*:" src/departments/signalling/forms/

# Find forms still using old patterns  
grep -r "formId\|recordId\|serialNumber.*:" src/departments/
```

---

This master guide provides a systematic approach to resolve ANY database column mapping issue across ALL departments in the UPMRC application. Use this as your primary reference for both fixing existing issues and preventing future ones.