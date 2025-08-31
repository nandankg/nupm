# App.js Routing Update Plan for Universal Form Components

## Required Import Statements to Add

Add these imports after the existing form imports (around line 100-200):

```javascript
// Universal Form Components
const UniversalOperationForm = lazy(() => import("./features/operation/components/UniversalOperationForm"));
const UniversalFinanceForm = lazy(() => import("./features/finance/components/UniversalFinanceForm"));
const UniversalSignallingForm = lazy(() => import("./features/signalling/components/UniversalSignallingForm"));
const UniversalTelecomForm = lazy(() => import("./features/telecom/components/UniversalTelecomForm"));
const UniversalAfcSdcForm = lazy(() => import("./features/afc-sdc/components/UniversalAfcSdcForm"));
const UniversalAfcMainlineForm = lazy(() => import("./features/afc-mainline/components/UniversalAfcMainlineForm"));
const UniversalAfcStoreForm = lazy(() => import("./features/afc-store/components/UniversalAfcStoreForm"));
```

## Route Updates Required

### Operation Department Forms (24 forms)
Replace existing routes with universal component routes:

```javascript
// Operation Department Forms - Use UniversalOperationForm
<Route path="/form/equipment-failure-register" element={<UniversalOperationForm formType="equipment_failure_register" />} />
<Route path="/form/claim-registration-register" element={<UniversalOperationForm formType="claim-registration-register" />} />
<Route path="/form/bio-data-register" element={<UniversalOperationForm formType="bio-data-register" />} />
<Route path="/form/petty-repair-register" element={<UniversalOperationForm formType="petty-repair-register" />} />
<Route path="/form/outstanding-record-register" element={<UniversalOperationForm formType="outstanding-record-register" />} />
<Route path="/form/stock-movement-register-cards" element={<UniversalOperationForm formType="stock-movement-register-cards" />} />
<Route path="/form/stock-movement-register-tokens" element={<UniversalOperationForm formType="stock-movement-register-tokens" />} />
// ... (17 more routes)
```

### Finance Department Forms (4 forms)
```javascript
// Finance Department Forms - Use UniversalFinanceForm
<Route path="/form/expenditure-budget-register" element={<UniversalFinanceForm formType="expenditure-budget-register" />} />
<Route path="/form/estimate-and-loa-budget-register" element={<UniversalFinanceForm formType="estimate-and-loa-budget-register" />} />
<Route path="/form/budget-payments-register" element={<UniversalFinanceForm formType="budget-payments-register" />} />
<Route path="/form/station-earning-register" element={<UniversalFinanceForm formType="station-earning-register" />} />
```

### Signalling Department Forms (42+ forms)
```javascript
// Signalling Department Forms - Use UniversalSignallingForm
<Route path="/form/asset-register" element={<UniversalSignallingForm formType="asset-register" />} />
<Route path="/form/assurance-register" element={<UniversalSignallingForm formType="assurance-register" />} />
<Route path="/form/atc-examination" element={<UniversalSignallingForm formType="atc-examination" />} />
<Route path="/form/contract-work-done-register" element={<UniversalSignallingForm formType="contract-work-done-register" />} />
<Route path="/form/signal-failure" element={<UniversalSignallingForm formType="signal-failure" />} />
<Route path="/form/requisition" element={<UniversalSignallingForm formType="requisition" />} />
// ... (36+ more routes)
```

### Telecom Department Forms (30+ forms)
```javascript
// Telecom Department Forms - Use UniversalTelecomForm
<Route path="/form/asset_register" element={<UniversalTelecomForm formType="asset_register" />} />
<Route path="/form/assurance-register-telecom" element={<UniversalTelecomForm formType="assurance-register-telecom" />} />
<Route path="/form/css-shift-logbook" element={<UniversalTelecomForm formType="css-shift-logbook" />} />
<Route path="/form/fmts" element={<UniversalTelecomForm formType="fmts" />} />
<Route path="/form/gate-pass-book" element={<UniversalTelecomForm formType="gate-pass-book" />} />
<Route path="/form/ledger" element={<UniversalTelecomForm formType="ledger" />} />
// ... (24+ more routes)
```

### AFC-SDC Department Forms (20+ forms)
```javascript
// AFC-SDC Department Forms - Use UniversalAfcSdcForm
<Route path="/form/pm-logbook-tom-half-yearly-sdc" element={<UniversalAfcSdcForm formType="pm-logbook-tom-half-yearly-sdc" />} />
<Route path="/form/pm-logbook-tvm-half-yearly-sdc" element={<UniversalAfcSdcForm formType="pm-logbook-tvm-half-yearly-sdc" />} />
<Route path="/form/pm-logbook-sdc-half-yearly-sdc" element={<UniversalAfcSdcForm formType="pm-logbook-sdc-half-yearly-sdc" />} />
// ... (17+ more routes)
```

### AFC-Mainline Department Forms (15+ forms)
```javascript
// AFC-Mainline Department Forms - Use UniversalAfcMainlineForm
<Route path="/form/pm-logbook-half-yearly-tvm-mainline" element={<UniversalAfcMainlineForm formType="pm-logbook-half-yearly-tvm-mainline" />} />
<Route path="/form/pm-logbook-half-yearly-tom-mainline" element={<UniversalAfcMainlineForm formType="pm-logbook-half-yearly-tom-mainline" />} />
<Route path="/form/ledger-mainline" element={<UniversalAfcMainlineForm formType="ledger-mainline" />} />
// ... (12+ more routes)
```

### AFC-Store Department Forms (5+ forms)
```javascript
// AFC-Store Department Forms - Use UniversalAfcStoreForm
<Route path="/form/daily-transaction-register-store-receipt" element={<UniversalAfcStoreForm formType="daily-transaction-register-store-receipt" />} />
<Route path="/form/daily-transaction-register-store-issue" element={<UniversalAfcStoreForm formType="daily-transaction-register-store-issue" />} />
<Route path="/form/gate-pass-book-store" element={<UniversalAfcStoreForm formType="gate-pass-book-store" />} />
<Route path="/form/ledger-store" element={<UniversalAfcStoreForm formType="ledger-store" />} />
<Route path="/form/store-inventory-summary" element={<UniversalAfcStoreForm formType="store-inventory-summary" />} />
```

## Implementation Notes

1. **Gradual Migration**: Update routes department by department to minimize risk
2. **Testing**: Test each department's routes after updating
3. **Cleanup**: Remove old component imports after successful migration
4. **Backup**: Keep backup of original App.js before making changes

## Current Route Status Found in App.js

### Already Found Routes:
- `/form/expenditure-budget-register` (line 848) - Finance Dept
- `/form/claim-registration-register` (line 2155) - Operation Dept  
- `/form/bio-data-register` (line 3137) - Operation Dept
- `/form/css-shift-logbook` (line 3287) - Telecom Dept
- `/form/ledger-mainline` (line 3388) - AFC-Mainline Dept
- `/form/ledger-store` (line 3394) - AFC-Store Dept
- `/form/ledger` (line 3396) - Telecom Dept
- `/form/requisition` (line 3204) - Signalling Dept
- `/form/assurance-register` (line 1996) - Signalling Dept
- `/form/fmts` (line 2265) - Telecom Dept
- `/form/gate-pass-book` (line 1222) - Telecom Dept
- `/form/gate-pass-book-store` (line 1189) - AFC-Store Dept

These routes need to be updated to use the universal components with proper formType props.