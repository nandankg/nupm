# Technical Infrastructure Setup Guide
**For Remaining Departments Migration**

---

## 🏗️ **DEPARTMENT FOLDER STRUCTURE TEMPLATE**

### **Standard Structure (Apply to each department)**
```
src/departments/{department}/
├── forms/                           # All form components
│   ├── {FormName}Form.jsx          # Individual forms
│   ├── index.js                    # Clean exports
├── components/                      # Universal components
│   ├── Universal{Department}FormField.jsx
│   ├── {Department}FormLayout.jsx
│   ├── index.js                    # Component exports
├── validation/                      # Validation schemas
│   ├── {department}ValidationSchemas.js
│   └── index.js
├── redux/                          # Redux slices
│   ├── {formName}Slice.js
│   └── index.js
└── utils/                          # Department utilities
    ├── {department}Utils.js
    └── index.js
```

---

## 📋 **SETUP COMMANDS BY DEPARTMENT**

### **1. Telecom Department Setup**
```bash
# Create folder structure
mkdir -p src/departments/telecom/{forms,components,validation,redux,utils}

# Create index files
touch src/departments/telecom/forms/index.js
touch src/departments/telecom/components/index.js
touch src/departments/telecom/validation/index.js
touch src/departments/telecom/redux/index.js
touch src/departments/telecom/utils/index.js
```

### **2. AFC-Mainline Department Setup**
```bash
# Create folder structure  
mkdir -p src/departments/afc-mainline/{forms,components,validation,redux,utils}

# Create index files
touch src/departments/afc-mainline/forms/index.js
touch src/departments/afc-mainline/components/index.js
touch src/departments/afc-mainline/validation/index.js
touch src/departments/afc-mainline/redux/index.js
touch src/departments/afc-mainline/utils/index.js
```

### **3. AFC-SDC Department Setup**
```bash
# Create folder structure
mkdir -p src/departments/afc-sdc/{forms,components,validation,redux,utils}

# Create index files
touch src/departments/afc-sdc/forms/index.js
touch src/departments/afc-sdc/components/index.js
touch src/departments/afc-sdc/validation/index.js
touch src/departments/afc-sdc/redux/index.js
touch src/departments/afc-sdc/utils/index.js
```

### **4. AFC-Store Department Setup**
```bash
# Create folder structure
mkdir -p src/departments/afc-store/{forms,components,validation,redux,utils}

# Create index files
touch src/departments/afc-store/forms/index.js
touch src/departments/afc-store/components/index.js
touch src/departments/afc-store/validation/index.js
touch src/departments/afc-store/redux/index.js
touch src/departments/afc-store/utils/index.js
```

---

## 🔧 **UNIVERSAL COMPONENT TEMPLATES**

### **Telecom Universal Components**

#### **UniversalTelecomFormField.jsx Template**:
```javascript
import React from 'react';

const UniversalTelecomFormField = ({ 
  type = "text", 
  name, 
  value, 
  onChange, 
  label, 
  required = false,
  options = [],
  error,
  className = "",
  ...props 
}) => {
  // Telecom-specific field types
  const renderTelecomField = () => {
    switch (type) {
      case 'system-type':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select System</option>
            <option value="TER">TER System</option>
            <option value="UPS">UPS System</option>
            <option value="SMPS">SMPS System</option>
            <option value="CSS">CSS System</option>
            <option value="Colony">Officer Colony</option>
          </select>
        );
      
      case 'pm-frequency':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Yearly">Yearly</option>
          </select>
        );
      
      case 'location-type':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Location</option>
            <option value="Depot">Depot</option>
            <option value="Station">Station</option>
            <option value="OCC">OCC</option>
            <option value="BCC">BCC</option>
            <option value="OCC-BCC">OCC & BCC</option>
          </select>
        );
      
      case 'technical-parameter':
        return (
          <input 
            type="number" 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            step="0.01"
            placeholder="Enter technical parameter"
            {...props}
          />
        );
      
      default:
        return (
          <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            {...props}
          />
        );
    }
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      {renderTelecomField()}
      {error && <div className="text-danger small">{error}</div>}
    </div>
  );
};

export default UniversalTelecomFormField;
```

#### **TelecomFormLayout.jsx Template**:
```javascript
import React from 'react';

const TelecomFormLayout = ({ 
  title, 
  children, 
  onSubmit, 
  loading = false,
  className = "" 
}) => {
  return (
    <div className={`telecom-form-container ${className}`}>
      <div className="card">
        <div className="card-header bg-info text-white">
          <h4 className="mb-0">
            <i className="fas fa-broadcast-tower me-2"></i>
            Telecom - {title}
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            {children}
            
            <div className="form-actions mt-4">
              <button 
                type="submit" 
                className="btn btn-primary me-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  'Save Form'
                )}
              </button>
              <button type="reset" className="btn btn-secondary">
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TelecomFormLayout;
```

### **AFC Universal Components**

#### **UniversalAFCFormField.jsx Template**:
```javascript
import React from 'react';

const UniversalAFCFormField = ({ 
  type = "text", 
  name, 
  value, 
  onChange, 
  label, 
  required = false,
  error,
  className = "",
  ...props 
}) => {
  const renderAFCField = () => {
    switch (type) {
      case 'afc-equipment':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Equipment</option>
            <option value="TVM">Ticket Vending Machine (TVM)</option>
            <option value="TOM">Ticket Office Machine (TOM)</option>
            <option value="Gate">AFC Gate</option>
            <option value="SDC">Station Data Concentrator (SDC)</option>
            <option value="RCTM">Revenue Collection & Ticket Machine (RCTM)</option>
            <option value="AVM">Add Value Machine (AVM)</option>
          </select>
        );
      
      case 'afc-card-type':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Card Type</option>
            <option value="CSC">Customer Service Card (CSC)</option>
            <option value="Agent">Agent Card</option>
            <option value="URC">Unrestricted Card</option>
            <option value="OS">Officer/Staff Card</option>
          </select>
        );
      
      case 'afc-maintenance-type':
        return (
          <select name={name} value={value} onChange={onChange} className="form-control" required={required}>
            <option value="">Select Maintenance</option>
            <option value="Daily">Daily Check</option>
            <option value="Monthly">Monthly PM</option>
            <option value="Half-Yearly-TVM">Half-Yearly TVM</option>
            <option value="Half-Yearly-TOM">Half-Yearly TOM</option>
            <option value="Half-Yearly-Gate">Half-Yearly Gate</option>
            <option value="Yearly">Yearly Maintenance</option>
          </select>
        );
      
      default:
        return (
          <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="form-control" 
            required={required}
            {...props}
          />
        );
    }
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      {renderAFCField()}
      {error && <div className="text-danger small">{error}</div>}
    </div>
  );
};

export default UniversalAFCFormField;
```

---

## 📊 **REDUX SLICE TEMPLATE**

### **Standard Redux Slice Structure**:
```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("userdata")) || {};
const token = localStorage.getItem("accessToken");

// Standard async thunks for each department
export const saveData = createAsyncThunk(
  "{department}/{formName}/saveData",
  async (formData) => {
    const response = await fetch(
      "https://tprosysit.com/upmrc/public/api/register/{department}/create",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formType: "{form-slug}",
          ...formData,
          employee_id: user.profileid,
          unit: user.department,
          department: user.department,
        }),
      }
    );
    return response.json();
  }
);

export const fetchData = createAsyncThunk(
  "{department}/{formName}/fetchData",
  async () => {
    const response = await fetch(
      "https://tprosysit.com/upmrc/public/api/register/{department}/viewData",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formType: "{form-slug}",
          employee_id: user.profileid,
          unit: user.department,
          department: user.department,
        }),
      }
    );
    return response.json();
  }
);

export const editData = createAsyncThunk(
  "{department}/{formName}/editData",
  async (formData) => {
    const response = await fetch(
      "https://tprosysit.com/upmrc/public/api/register/{department}/update",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formType: "{form-slug}",
          ...formData,
          employee_id: user.profileid,
          unit: user.department,
          department: user.department,
        }),
      }
    );
    return response.json();
  }
);

// Aliases for compatibility
export const updateData = editData;
export const addData = saveData;

export const removeData = createAsyncThunk(
  "{department}/{formName}/removeData",
  async (id) => {
    const response = await fetch(
      "https://tprosysit.com/upmrc/public/api/register/{department}/delete",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formType: "{form-slug}",
          id: id,
          employee_id: user.profileid,
          unit: user.department,
          department: user.department,
        }),
      }
    );
    return response.json();
  }
);

const {formName}Slice = createSlice({
  name: "{formName}",
  initialState: {
    data: [],
    loading: false,
    error: null,
    isSuccess: null,
  },
  reducers: {
    clearState: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.isSuccess = null;
    },
  },
  extraReducers: (builder) => {
    // Save data cases
    builder.addCase(saveData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
    });
    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch data cases
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data || [];
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Edit data cases
    builder.addCase(editData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
    });
    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Remove data cases
    builder.addCase(removeData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
    });
    builder.addCase(removeData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearState } = {formName}Slice.actions;
export default {formName}Slice.reducer;
```

---

## 🔍 **FORM DISCOVERY COMMANDS**

### **Search Patterns for Each Department**:

#### **Telecom Department**:
```bash
# Search for telecom-related forms
find src/forms -iname "*telecom*" -o -iname "*tele*" -o -iname "*pm*" -o -iname "*css*" -o -iname "*ups*" -o -iname "*smps*"
grep -r "checklist.*depot\|checklist.*station\|pm.*sheet" src/forms/
grep -r "tele.*system\|shift.*log" src/forms/
```

#### **AFC Department**:
```bash
# Search for AFC-related forms  
find src/forms -iname "*afc*" -o -iname "*tvm*" -o -iname "*tom*" -o -iname "*gate*" -o -iname "*sdc*"
grep -r "mainline\|agent.*card\|csc\|logbook.*half" src/forms/
grep -r "pm.*log\|daily.*transaction\|requisition" src/forms/
```

---

## ✅ **SETUP VERIFICATION CHECKLIST**

### **For Each Department**:
- [ ] Folder structure created correctly
- [ ] All index.js files created
- [ ] Universal components template ready
- [ ] Redux slice template prepared  
- [ ] Form discovery commands executed
- [ ] Existing forms located and documented
- [ ] API endpoints identified
- [ ] Validation requirements analyzed

### **Quality Gates**:
- [ ] Universal components compile without errors
- [ ] Redux slices pass syntax validation
- [ ] Import/export structure works correctly
- [ ] Field preservation methodology ready
- [ ] Documentation templates prepared

---

## 🚀 **NEXT STEPS AFTER INFRASTRUCTURE SETUP**

1. **Begin Form Discovery**: Use search commands to locate existing forms
2. **Field Analysis**: Document exact field structures from found forms  
3. **Component Customization**: Adapt universal components to specific needs
4. **Migration Execution**: Start with highest priority forms
5. **Quality Verification**: Ensure 100% field preservation
6. **User Acceptance**: Get department approval before marking complete

---

**Infrastructure Setup Status**: READY ✅  
**Template Quality**: PRODUCTION-READY ✅  
**Methodology**: PROVEN (3 departments successful) ✅  
**Scalability**: OPTIMIZED for reuse ✅