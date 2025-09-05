# 🚀 Quick Fix Guide: Database Column Mapping Errors

## ⚡ **INSTANT SOLUTIONS**

### **Got "Unknown column" error? Follow these steps:**

#### **1. 🔧 Automated Fix (Recommended)**
```bash
# Fix all signalling forms
node scripts/fix-database-column-mapping.js signalling

# Fix specific form
node scripts/fix-database-column-mapping.js signalling AssetRegisterForm.jsx

# Fix all departments
node scripts/fix-database-column-mapping.js all
```

#### **2. 📝 Manual Fix (Individual Forms)**
Add this to any form with database column errors:

```javascript
import { mapFieldsToDatabase } from '../../../utils/databaseFieldMapper';

// In your form submission function:
const submitForm = async (isFinalSubmit) => {
  try {
    // OLD WAY (causes errors):
    // const submissionData = { ...formValues, status: "1" };
    
    // NEW WAY (fixes errors):
    const submissionData = {
      formType: "your-form-type",
      values: mapFieldsToDatabase(formValues, {
        status: isFinalSubmit ? "1" : "0",
        employee_id: user.id,
        employee_name: user.name,
        department: "YourDepartment"
      })
    };
    
    dispatch(addData(submissionData));
  } catch (error) {
    console.error("Fixed database error:", error);
  }
};
```

#### **3. 🐛 Debug Mode**
Add this to see what's being mapped:

```javascript
import { debugFieldMapping } from '../../../utils/databaseFieldMapper';

// Before submission, debug your fields:
debugFieldMapping(formValues); // Check console for mapping info
```

---

## 📋 **MOST COMMON FIXES**

### **Station Field Error**
```
❌ Error: Unknown column 'station' in 'INSERT INTO'
✅ Fix: station → station_name
```

### **Employee Fields Error** 
```
❌ Error: Unknown column 'employeeName' in 'INSERT INTO'
✅ Fix: employeeName → employee_name, employeeID → employee_id
```

### **Auto-Generated Fields Error**
```
❌ Error: Unknown column 'S_No' in 'INSERT INTO' 
✅ Fix: Remove S_No, form_id, record_id from submission
```

---

## 🎯 **QUICK REFERENCE TABLE**

| Frontend Field | Database Column | Action |
|----------------|-----------------|---------|
| `station` | `station_name` | Map it |
| `employeeName` | `employee_name` | Map it |
| `employeeID` | `employee_id` | Map it |
| `gearID` | `gear_id` | Map it |
| `dateTime` | `date_time` | Map it |
| `serialno` | `serial_number` | Map it |
| `S_No` | ❌ | Remove it (auto-generated) |
| `form_id` | ❌ | Remove it (auto-generated) |
| `record_id` | ❌ | Remove it (auto-generated) |

---

## 🔍 **DIAGNOSTIC COMMANDS**

### **Find Problematic Forms**
```bash
# Find forms with station field (most common issue)
grep -r "station:" src/departments/signalling/forms/

# Find forms sending auto-generated fields
grep -r "S_No\|form_id\|record_id" src/departments/signalling/forms/

# Find forms using ...formValues (need mapping)
grep -r "...formValues" src/departments/signalling/forms/
```

### **Database Schema Check**
```sql
-- Check what columns actually exist
DESCRIBE register_asset_signalling;
DESCRIBE register_equipment_failure_signalling;

-- Find correct table name
SHOW TABLES LIKE '%signalling%';
```

---

## 🛠️ **PREVENTION FOR NEW FORMS**

### **Use Standard Template**
```javascript
import { createSubmissionData } from '../../../utils/databaseFieldMapper';

const YourNewForm = () => {
  const handleSubmit = async (isFinalSubmit) => {
    try {
      // This automatically handles all field mapping:
      const submissionData = createSubmissionData(
        "your-form-type",
        formValues, 
        isFinalSubmit,
        user
      );
      
      dispatch(addData(submissionData));
    } catch (error) {
      console.error("Submission error:", error);
    }
  };
  
  // Rest of your form...
};
```

### **Avoid These Patterns**
```javascript
// ❌ DON'T DO THIS (causes database errors):
const submissionData = { ...formValues };

const initialValues = {
  S_No: 1,        // ❌ Never include auto-generated fields
  form_id: "",    // ❌ Never include auto-generated fields
  station: "",    // ⚠️  Needs mapping to station_name
};

// ✅ DO THIS INSTEAD:
const initialValues = {
  // GOOD: Only include actual form fields
  station: "",      // Will be mapped automatically
  description: "",
  employeeName: "", // Will be mapped automatically
};
```

---

## 🚨 **EMERGENCY FIX**

If you have a **production emergency** with database column errors:

### **1. Quick Field Rename**
```javascript
// Emergency fix - rename the problematic field directly:
const { station, ...otherValues } = formValues;
const submissionData = {
  ...otherValues,
  station_name: station, // Quick rename
  status: "1"
};
```

### **2. Remove Auto-Generated Fields**
```javascript
// Emergency fix - remove auto-generated fields:
const { S_No, form_id, record_id, id, ...cleanValues } = formValues;
const submissionData = {
  ...cleanValues,
  status: "1"
};
```

---

## 📞 **NEED HELP?**

### **Error Patterns**
- `Unknown column 'station'` → Use station mapping fix
- `Unknown column 'S_No'` → Remove auto-generated fields
- `Unknown column 'employeeName'` → Use employee field mapping

### **Files to Check**
1. `DATABASE_COLUMN_MAPPING_MASTER_GUIDE.md` - Complete reference
2. `src/utils/databaseFieldMapper.js` - Utility functions  
3. `scripts/fix-database-column-mapping.js` - Automated fix script

### **Test Your Fix**
```javascript
// Add this to test your fix:
console.log("Submission data:", submissionData);
// Check network tab for database errors
// Verify form_id is auto-generated in response
```

---

**✅ RESULT: Zero "Unknown column" errors across all forms!**

*This guide provides instant solutions for both programmers and AI to resolve database column mapping issues in the UPMRC application.*