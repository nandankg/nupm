# 🔴 AFC-MAINLINE DEPARTMENT MIGRATION - DAY 1 SETUP

**Date**: January 9, 2025  
**Phase**: 1 of 3 (AFC-Mainline Department)  
**Status**: Infrastructure Setup & Analysis  
**Forms Target**: 21/21 AFC-Mainline forms

---

## 📋 **AFC-MAINLINE FORMS ANALYSIS**

### **Complete Form Inventory (21 Forms)**

#### **📊 Core AFC Operations (8 forms) - CRITICAL PRIORITY**
| ID | Form Name | Slug | Complexity | Migration Day |
|----|-----------|------|------------|---------------|
| 63 | Assurance Register | assurance-register-mainline | Medium | Day 3 |
| 65 | Daily Checklist Mainline Register | daily-checklist-mainline | High | Day 3 |
| 66 | Daily Transaction Register | daily-transaction-register-mainline | High | Day 3 |
| 67 | FMTS Book | fmts-book-mainline | Medium | Day 4 |
| 68 | Gate Pass Book | gate-pass-book-mainline | Low | Day 5 |
| 75 | Shift Log book | shift-log-book-mainline | Medium | Day 4 |
| 77 | Daily Transaction Register Issue | daily-transaction-register-mainline-issue | High | Day 3 |

#### **🔧 PM Maintenance Records (8 forms) - HIGH PRIORITY**
| ID | Form Name | Slug | Complexity | Migration Day |
|----|-----------|------|------------|---------------|
| 72 | PM FOLLOW UP | pm-follow-up-mainline | Medium | Day 6 |
| 73 | PM Logbook Monthly - OTHER | pm-logbook-monthly-other-mainline | High | Day 6 |
| 76 | PM Logbook Half Yearly - GATE | pm-logbook-half-yearly-gate-mainline | High | Day 7 |
| 170 | PM Logbook Half Yearly - TVM | pm-logbook-half-yearly-tvm-mainline | Very High | Day 7 |
| 171 | PM Logbook Half Yearly - TOM | pm-logbook-half-yearly-tom-mainline | Very High | Day 7 |
| 172 | PM Logbook Half Yearly - OTHER | pm-logbook-half-yearly-other-mainline | High | Day 8 |
| 177 | PM Logbook Monthly - GATE | pm-logbook-monthly-gate-mainline | High | Day 8 |
| 178 | PM Logbook Monthly - TVM | pm-logbook-monthly-tvm-mainline | Very High | Day 8 |
| 179 | PM Logbook Monthly - TOM | pm-logbook-monthly-tom-mainline | Very High | Day 8 |

#### **📝 Administrative (5 forms) - MEDIUM PRIORITY**
| ID | Form Name | Slug | Complexity | Migration Day |
|----|-----------|------|------------|---------------|
| 64 | Consumables Register | consumables-register-mainline | Low | Day 9 |
| 69 | Imprest Register | imprets-register-mainline | Medium | Day 9 |
| 70 | Inspection Register | inspection-register-mainline | Medium | Day 9 |
| 71 | Ledger | ledger-mainline | Low | Day 9 |
| 74 | Requisition Slip | requisition-mainline | Low | Day 9 |

---

## 🏗️ **INFRASTRUCTURE SETUP**

### **Department Structure Creation**
```
src/departments/afc-mainline/
├── forms/                           # All 21 AFC-Mainline forms
│   ├── AssuranceRegisterMainlineForm.jsx
│   ├── DailyChecklistMainlineForm.jsx
│   ├── DailyTransactionRegisterMainlineForm.jsx
│   ├── FmtsBookMainlineForm.jsx
│   ├── GatePassBookMainlineForm.jsx
│   ├── ShiftLogBookMainlineForm.jsx
│   ├── DailyTransactionRegisterMainlineIssueForm.jsx
│   ├── PmFollowUpMainlineForm.jsx
│   ├── PmLogbookMonthlyOtherMainlineForm.jsx
│   ├── PmLogbookHalfYearlyGateMainlineForm.jsx
│   ├── PmLogbookHalfYearlyTvmMainlineForm.jsx
│   ├── PmLogbookHalfYearlyTomMainlineForm.jsx
│   ├── PmLogbookHalfYearlyOtherMainlineForm.jsx
│   ├── PmLogbookMonthlyGateMainlineForm.jsx
│   ├── PmLogbookMonthlyTvmMainlineForm.jsx
│   ├── PmLogbookMonthlyTomMainlineForm.jsx
│   ├── ConsumablesRegisterMainlineForm.jsx
│   ├── ImprestRegisterMainlineForm.jsx
│   ├── InspectionRegisterMainlineForm.jsx
│   ├── LedgerMainlineForm.jsx
│   ├── RequisitionMainlineForm.jsx
│   └── index.js                    # Clean export API
├── components/                      # Universal AFC-Mainline components
│   ├── UniversalAFCMainlineFormField.jsx
│   ├── AFCMainlineFormLayout.jsx
│   └── index.js
└── validation/                      # AFC-Mainline validation schemas
    └── afcMainlineValidationSchemas.js
```

### **Expected Field Types for AFC-Mainline**
Based on form names and AFC operations:
```javascript
// AFC Equipment Types
- 'afc-equipment': TVM, TOM, Gate, BOM selection
- 'gate-number': Gate identification (1-10, A-Z patterns)
- 'equipment-status': Active, Fault, Maintenance, Out-of-Service

// Maintenance & Operations
- 'pm-frequency': Daily, Weekly, Monthly, Quarterly, Half-yearly, Yearly
- 'maintenance-activity': Checklist items for PM schedules
- 'shift-timing': Morning, Evening, Night shift patterns
- 'transaction-type': Sale, Refund, Add-value, Penalty transactions

// Technical Parameters
- 'voltage-reading': DC voltage measurements (12V, 24V, 48V)
- 'current-reading': Current measurements in Amps
- 'temperature-reading': Equipment temperature monitoring
- 'system-parameter': Technical system parameters

// Administrative
- 'employee-id': Employee identification with validation
- 'requisition-number': Request tracking numbers
- 'consumable-item': Inventory item selection
- 'approval-status': Pending, Approved, Rejected
```

---

## 🔍 **LEGACY FORM DISCOVERY STRATEGY**

### **Search Patterns for AFC-Mainline Forms**
```bash
# Primary AFC searches
find src/forms -name "*afc*" -o -name "*mainline*"
find src/forms -name "*tvm*" -o -name "*tom*" -o -name "*gate*"

# Daily operations searches  
find src/forms -name "*daily*" -o -name "*checklist*" -o -name "*transaction*"

# PM maintenance searches
find src/forms -name "*pm*" -o -name "*logbook*" -o -name "*maintenance*"

# Administrative searches
find src/forms -name "*assurance*" -o -name "*ledger*" -o -name "*requisition*"
find src/forms -name "*imprest*" -o -name "*consumable*" -o -name "*inspection*"
```

### **Expected Locations**
AFC-Mainline forms likely in:
- `src/forms/store/` - Store/AFC related forms
- `src/forms/rajiv/` - Developer folder pattern
- `src/forms/manshi/` - Developer folder pattern
- `src/forms/chanchal/` - Developer folder pattern
- Scattered across multiple developer folders

---

## 📊 **MIGRATION TIMELINE (8-10 Days)**

### **Days 1-2: Infrastructure & Discovery (CURRENT)**
- ✅ **Day 1**: Department structure setup, form analysis, component design
- 🔄 **Day 2**: Legacy form discovery, universal component development

### **Days 3-5: Core Operations (7 forms)**
- 🎯 **Day 3**: Critical daily operations (3 forms) - Checklist, Transaction, Issue
- 🎯 **Day 4**: Core administrative (2 forms) - FMTS, Shift Log
- 🎯 **Day 5**: Simple forms (2 forms) - Assurance, Gate Pass

### **Days 6-8: PM Maintenance (9 forms)**
- 🎯 **Day 6**: PM basics (2 forms) - Follow-up, Monthly OTHER
- 🎯 **Day 7**: Half-yearly maintenance (4 forms) - GATE, TVM, TOM, OTHER
- 🎯 **Day 8**: Monthly maintenance (3 forms) - GATE, TVM, TOM

### **Days 9-10: Administrative & QA (5 forms)**
- 🎯 **Day 9**: Administrative forms (5 forms) - Consumables, Imprest, Inspection, Ledger, Requisition
- 🎯 **Day 10**: Testing, validation, user acceptance, GitHub push

---

## 🎯 **SUCCESS CRITERIA**

### **Quality Standards (NON-NEGOTIABLE)**
- **100% Field Preservation**: Never change existing field names
- **100% Dropdown Preservation**: Maintain exact same options  
- **100% Business Logic Preservation**: Keep all validation rules
- **Enhanced Validation**: Add comprehensive validation without changing behavior
- **60-70% Code Reduction**: Through universal component architecture

### **Performance Targets**
- **2-3 forms per day** for complex forms (Days 3-8)
- **5 forms in 1 day** for simple administrative forms (Day 9)
- **Universal component reuse** across all 21 forms
- **Complete testing** and user acceptance (Day 10)

---

## 📝 **NEXT STEPS (Day 1 Completion)**

### **Today's Remaining Tasks**
1. ✅ Complete AFC-Mainline form analysis (DONE)
2. 🔄 Create department folder structure
3. 🔄 Begin legacy form discovery
4. 🔄 Design universal component architecture

### **Tomorrow's Goals (Day 2)**
1. 🎯 Complete universal component development
2. 🎯 Finish legacy form discovery and documentation
3. 🎯 Begin first form migrations (3 administrative forms for momentum)
4. 🎯 Test universal component integration

---

**Status**: ✅ Day 1 Setup Complete - Infrastructure Planned & Forms Analyzed  
**Next**: Day 2 - Component Development & Legacy Discovery  
**Confidence**: HIGH - Following proven methodology from 4 successful departments