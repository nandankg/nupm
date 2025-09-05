#!/usr/bin/env node

/**
 * Automated Signalling Forms Reducer Migration Script
 * Migrates all signalling forms from legacy reducers to modern systemSlice
 * 
 * MIGRATION PATTERNS:
 * 1. Legacy Individual: ../../../reducer/[dev]/[Form]Reducer → ../redux/systemSlice
 * 2. Legacy Generic: ../../../reducer/redux/tableDataSlice → ../redux/systemSlice  
 * 3. Root Legacy: ../../../reducer/[Form]Reducer → ../redux/systemSlice
 * 
 * TRANSFORMS:
 * - Import: addData → addSystemData, selectSystemLoading, selectSystemError
 * - Dispatch: addData(data) → addSystemData({values, formType, apiEndpoint})
 * - Selectors: Local state → Redux selectors
 * 
 * Usage: node scripts/migrate-signalling-reducers.js
 */

const fs = require('fs');
const path = require('path');

const SIGNALLING_FORMS_DIR = path.join(__dirname, '../src/departments/signalling/forms');
const COMPLETED_FORMS = [
  'AssetRegisterForm.jsx' // Only AssetRegisterForm uses modern reducer
];

// Form type mappings for API endpoints
const FORM_TYPE_MAPPINGS = {
  'AssetRegisterForm.jsx': { formType: 'asset-register', apiEndpoint: 'operation' },
  'EquipmentFailureRegisterForm.jsx': { formType: 'equipment-failure-register', apiEndpoint: 'operation' },
  'ColorLightMaintenanceForm.jsx': { formType: 'color-light-maintenance', apiEndpoint: 'operation' },
  'GatePassForm.jsx': { formType: 'gate-pass', apiEndpoint: 'operation' },
  'StationDiarySignallingForm.jsx': { formType: 'station-diary-signalling', apiEndpoint: 'operation' },
  'IncidentRegisterSignallingForm.jsx': { formType: 'incident-register-signalling', apiEndpoint: 'operation' },
  'HardwareFailureRegisterForm.jsx': { formType: 'hardware-failure-register', apiEndpoint: 'operation' },
  'SignalFailureRegisterForm.jsx': { formType: 'signal-failure-register', apiEndpoint: 'operation' },
  'AtcExaminationRegisterForm.jsx': { formType: 'atc-examination-register', apiEndpoint: 'operation' },
  'SEREntryForm.jsx': { formType: 'ser-entry', apiEndpoint: 'operation' },
  'HardwareFailureForm.jsx': { formType: 'hardware-failure', apiEndpoint: 'operation' },
  'AtsCabinetMaintenanceForm.jsx': { formType: 'ats-cabinet-maintenance', apiEndpoint: 'operation' },
  'AxleCounterMaintenanceForm.jsx': { formType: 'axle-counter-maintenance', apiEndpoint: 'operation' },
  'UpsMaintenanceForm.jsx': { formType: 'ups-maintenance', apiEndpoint: 'operation' },
  'BoxCleaningOutdoorForm.jsx': { formType: 'box-cleaning-outdoor', apiEndpoint: 'operation' },
  'TomHalfYearlyMaintenanceForm.jsx': { formType: 'tom-half-yearly-maintenance', apiEndpoint: 'operation' },
  'AfcGateMaintenanceForm.jsx': { formType: 'afc-gate-maintenance', apiEndpoint: 'operation' },
  'OccBccHalfYearlyMaintenanceForm.jsx': { formType: 'occ-bcc-half-yearly-maintenance', apiEndpoint: 'operation' },
  'HalfYearlyMainlineMaintenanceForm.jsx': { formType: 'half-yearly-mainline-maintenance', apiEndpoint: 'operation' },
  'PmLogbookHalfYearlyOtherMainlineForm.jsx': { formType: 'pm-logbook-half-yearly-other-mainline', apiEndpoint: 'operation' },
  'PMPointMachineMaintenanceRecordForm.jsx': { formType: 'pm-point-machine-maintenance-record', apiEndpoint: 'operation' },
  'PMPointMachineMaintenanceRecordTDPForm.jsx': { formType: 'pm-point-machine-maintenance-record-tdp', apiEndpoint: 'operation' },
  'ShuntSignalMaintenanceRecordForm.jsx': { formType: 'shunt-signal-maintenance-record', apiEndpoint: 'operation' },
  'ManualPointOperationDrillForm.jsx': { formType: 'manual-point-operation-drill', apiEndpoint: 'operation' },
  'MeasurementVoltageMCBinPDCForm.jsx': { formType: 'measurement-voltage-mcb-in-pdc', apiEndpoint: 'operation' },
  'ContractualSpareTestingRegisterForm.jsx': { formType: 'contractual-spare-testing-register', apiEndpoint: 'operation' },
  'PreventiveMaintenanceWorksheetCentralComputerForm.jsx': { formType: 'preventive-maintenance-worksheet-central-computer', apiEndpoint: 'operation' },
  'LoanRegisterForm.jsx': { formType: 'loan-register', apiEndpoint: 'operation' },
  'RequisitionForm.jsx': { formType: 'requisition', apiEndpoint: 'operation' },
  'InspectionRegisterForm.jsx': { formType: 'inspection-register', apiEndpoint: 'operation' },
  'LedgerSignallingForm.jsx': { formType: 'ledger-signalling', apiEndpoint: 'operation' },
  'GrievanceRegisterForm.jsx': { formType: 'grievance-register', apiEndpoint: 'operation' },
  'ContractWorkDoneRegisterForm.jsx': { formType: 'contract-work-done-register', apiEndpoint: 'operation' },
  'DailyTransactionRegisterReceiptForm.jsx': { formType: 'daily-transaction-register-receipt', apiEndpoint: 'operation' },
  'DailyTransactionRegisterIssueForm.jsx': { formType: 'daily-transaction-register-issue', apiEndpoint: 'operation' },
  'DailyWorkDoneRegisterForm.jsx': { formType: 'daily-work-done-register', apiEndpoint: 'operation' },
  'HandoverTakingOverNoteForm.jsx': { formType: 'handover-taking-over-note', apiEndpoint: 'operation' },
  'PermanentLoanRegisterForm.jsx': { formType: 'permanent-loan-register', apiEndpoint: 'operation' },
  'ReplacementRegisterForm.jsx': { formType: 'replacement-register', apiEndpoint: 'operation' },
  'JobCardForm.jsx': { formType: 'job-card', apiEndpoint: 'operation' },
  'LabFaultyItemRegisterForm.jsx': { formType: 'lab-faulty-item-register', apiEndpoint: 'operation' },
  'AssuranceSystemForm.jsx': { formType: 'assurance-system', apiEndpoint: 'operation' },
  'QuarterlyTrainInspectionForm.jsx': { formType: 'quarterly-train-inspection', apiEndpoint: 'operation' },
  'PmFollowupSheetForm.jsx': { formType: 'pm-followup-sheet', apiEndpoint: 'operation' },
  'EktMaintenanceForm.jsx': { formType: 'ekt-maintenance', apiEndpoint: 'operation' }
};

// Pattern replacements for reducer migration
const migrationPatterns = {
  // 1. Update import statements - Legacy Individual Reducers
  legacyIndividualImport: {
    pattern: /import { ([^}]*) } from "\.\.\/\.\.\/\.\.\/reducer\/[^"]+Reducer";?/g,
    replacement: 'import { addSystemData, selectSystemLoading, selectSystemError } from "../redux/systemSlice";'
  },

  // 2. Update import statements - Legacy Generic Reducers  
  legacyGenericImport: {
    pattern: /import { ([^}]*) } from "\.\.\/\.\.\/\.\.\/reducer\/redux\/tableDataSlice";?/g,
    replacement: 'import { addSystemData, selectSystemLoading, selectSystemError } from "../redux/systemSlice";'
  },

  // 3. Update import statements - Root Legacy Reducers
  rootLegacyImport: {
    pattern: /import { ([^}]*) } from "\.\.\/\.\.\/\.\.\/reducer\/[^"\/]+";?/g,
    replacement: 'import { addSystemData, selectSystemLoading, selectSystemError } from "../redux/systemSlice";'
  },

  // 4. Add Redux selectors (if not present)
  addReduxSelectors: {
    pattern: /(const dispatch = useDispatch\(\);)/g,
    replacement: `$1
  
  // Redux state
  const loading = useSelector(selectSystemLoading);
  const error = useSelector(selectSystemError);`
  },

  // 5. Update dispatch calls - Standard pattern
  standardDispatchUpdate: {
    pattern: /dispatch\(addData\(([^)]+)\)\)/g,
    replacement: 'dispatch(addSystemData({ values: $1, formType: FORM_TYPE_PLACEHOLDER, apiEndpoint: API_ENDPOINT_PLACEHOLDER }))'
  },

  // 6. Update dispatch calls - Async pattern
  asyncDispatchUpdate: {
    pattern: /const resultAction = await dispatch\(addData\(([^)]+)\)\);/g,
    replacement: 'const resultAction = await dispatch(addSystemData({ values: $1, formType: FORM_TYPE_PLACEHOLDER, apiEndpoint: API_ENDPOINT_PLACEHOLDER })).unwrap();'
  },

  // 7. Replace loading state variables
  loadingStateUpdate: {
    pattern: /const \[isSubmitting, setIsSubmitting\] = useState\(false\);/g,
    replacement: '// Loading state now handled by Redux selector'
  },

  // 8. Update loading state usage in submission logic
  loadingUsageUpdate: {
    pattern: /setIsSubmitting\(true\);/g,
    replacement: '// Loading state managed by Redux'
  },

  loadingUsageUpdateEnd: {
    pattern: /setIsSubmitting\(false\);/g,
    replacement: '// Loading state managed by Redux'
  }
};

/**
 * Detects which reducer pattern a form is using
 */
function detectReducerPattern(content) {
  if (content.includes('from "../redux/systemSlice"')) {
    return 'modern'; // Already using modern system
  } else if (content.match(/from "\.\.\/\.\.\/\.\.\/reducer\/[^"\/]+\/[^"]+Reducer"/)) {
    return 'legacy-individual'; // Individual developer reducers
  } else if (content.includes('from "../../../reducer/redux/tableDataSlice"')) {
    return 'legacy-generic'; // Generic table data slice
  } else if (content.match(/from "\.\.\/\.\.\/\.\.\/reducer\/[^"\/]+"/)) {
    return 'legacy-root'; // Root level reducers
  }
  return 'unknown';
}

/**
 * Migrates a single form file to modern reducer system
 */
function migrateFormReducer(filePath, fileName) {
  console.log(`\\n🔄 Migrating ${fileName}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const pattern = detectReducerPattern(content);

    console.log(`  📋 Detected pattern: ${pattern}`);

    if (pattern === 'modern') {
      console.log(`  ✅ Already using modern reducer - skipping`);
      return { updated: false, pattern: 'modern' };
    }

    if (pattern === 'unknown') {
      console.log(`  ⚠️  Unknown reducer pattern - manual review needed`);
      return { updated: false, pattern: 'unknown' };
    }

    // Get form type mapping
    const formMapping = FORM_TYPE_MAPPINGS[fileName];
    if (!formMapping) {
      console.log(`  ⚠️  No form type mapping found - manual configuration needed`);
      return { updated: false, pattern: 'no-mapping' };
    }

    // 1. Update import statements based on detected pattern
    let importPattern;
    switch (pattern) {
      case 'legacy-individual':
        importPattern = migrationPatterns.legacyIndividualImport;
        break;
      case 'legacy-generic':
        importPattern = migrationPatterns.legacyGenericImport;
        break;
      case 'legacy-root':
        importPattern = migrationPatterns.rootLegacyImport;
        break;
    }

    if (importPattern && importPattern.pattern.test(content)) {
      content = content.replace(importPattern.pattern, importPattern.replacement);
      modified = true;
      console.log(`  ✅ Updated import statement`);
    }

    // 2. Add Redux selectors if not present
    if (!content.includes('selectSystemLoading') && content.includes('const dispatch = useDispatch()')) {
      content = content.replace(migrationPatterns.addReduxSelectors.pattern, migrationPatterns.addReduxSelectors.replacement);
      modified = true;
      console.log(`  ✅ Added Redux selectors`);
    }

    // 3. Update dispatch calls
    const standardDispatchPattern = new RegExp(migrationPatterns.standardDispatchUpdate.pattern.source, 'g');
    if (standardDispatchPattern.test(content)) {
      content = content.replace(standardDispatchPattern, 
        migrationPatterns.standardDispatchUpdate.replacement
          .replace('FORM_TYPE_PLACEHOLDER', `'${formMapping.formType}'`)
          .replace('API_ENDPOINT_PLACEHOLDER', `'${formMapping.apiEndpoint}'`)
      );
      modified = true;
      console.log(`  ✅ Updated standard dispatch calls`);
    }

    // 4. Update async dispatch calls  
    const asyncDispatchPattern = new RegExp(migrationPatterns.asyncDispatchUpdate.pattern.source, 'g');
    if (asyncDispatchPattern.test(content)) {
      content = content.replace(asyncDispatchPattern,
        migrationPatterns.asyncDispatchUpdate.replacement
          .replace('FORM_TYPE_PLACEHOLDER', `'${formMapping.formType}'`)
          .replace('API_ENDPOINT_PLACEHOLDER', `'${formMapping.apiEndpoint}'`)
      );
      modified = true;
      console.log(`  ✅ Updated async dispatch calls`);
    }

    // 5. Update loading state management
    if (migrationPatterns.loadingStateUpdate.pattern.test(content)) {
      content = content.replace(migrationPatterns.loadingStateUpdate.pattern, migrationPatterns.loadingStateUpdate.replacement);
      modified = true;
      console.log(`  ✅ Updated loading state declaration`);
    }

    if (migrationPatterns.loadingUsageUpdate.pattern.test(content)) {
      content = content.replace(migrationPatterns.loadingUsageUpdate.pattern, migrationPatterns.loadingUsageUpdate.replacement);
      modified = true;
      console.log(`  ✅ Updated loading state usage (start)`);
    }

    if (migrationPatterns.loadingUsageUpdateEnd.pattern.test(content)) {
      content = content.replace(migrationPatterns.loadingUsageUpdateEnd.pattern, migrationPatterns.loadingUsageUpdateEnd.replacement);
      modified = true;
      console.log(`  ✅ Updated loading state usage (end)`);
    }

    // 6. Update variable references from isSubmitting to loading
    if (content.includes('isSubmitting') && !content.includes('setIsSubmitting')) {
      content = content.replace(/isSubmitting/g, 'loading');
      modified = true;
      console.log(`  ✅ Updated loading variable references`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ ${fileName} migrated successfully`);
      return { updated: true, pattern: pattern };
    } else {
      console.log(`  ⚠️  No automatic changes applied - manual review needed`);
      return { updated: false, pattern: pattern };
    }

  } catch (error) {
    console.error(`  ❌ Error migrating ${fileName}:`, error.message);
    return { updated: false, pattern: 'error', error: error.message };
  }
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 Starting Signalling Forms Reducer Migration...');
  console.log('📁 Target directory:', SIGNALLING_FORMS_DIR);

  if (!fs.existsSync(SIGNALLING_FORMS_DIR)) {
    console.error('❌ Signalling forms directory not found!');
    process.exit(1);
  }

  const allFiles = fs.readdirSync(SIGNALLING_FORMS_DIR)
    .filter(file => file.endsWith('.jsx'))
    .sort();

  console.log(`📋 Found ${allFiles.length} signalling forms to analyze`);

  const results = {
    modern: 0,
    migrated: 0,
    manualReview: 0,
    errors: 0,
    patterns: {}
  };

  allFiles.forEach(fileName => {
    const filePath = path.join(SIGNALLING_FORMS_DIR, fileName);
    const result = migrateFormReducer(filePath, fileName);
    
    if (result.pattern === 'modern') {
      results.modern++;
    } else if (result.updated) {
      results.migrated++;
    } else if (result.pattern === 'error') {
      results.errors++;
    } else {
      results.manualReview++;
    }

    if (!results.patterns[result.pattern]) {
      results.patterns[result.pattern] = 0;
    }
    results.patterns[result.pattern]++;
  });

  console.log('\\n📊 MIGRATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Already modern: ${results.modern} forms`);
  console.log(`🔄 Successfully migrated: ${results.migrated} forms`);
  console.log(`📝 Manual review needed: ${results.manualReview} forms`);
  console.log(`❌ Errors encountered: ${results.errors} forms`);
  
  console.log('\\n📈 PATTERN BREAKDOWN');
  console.log('-'.repeat(30));
  Object.entries(results.patterns).forEach(([pattern, count]) => {
    console.log(`${pattern}: ${count} forms`);
  });

  const totalProcessed = results.modern + results.migrated;
  const completionPercentage = Math.round((totalProcessed / allFiles.length) * 100);
  
  console.log(`\\n🎯 OVERALL PROGRESS: ${totalProcessed}/${allFiles.length} forms (${completionPercentage}%)`);

  if (results.manualReview > 0) {
    console.log('\\n💡 MANUAL MIGRATION GUIDE');
    console.log('For forms requiring manual updates:');
    console.log('1. Update import: ../../../reducer/... → ../redux/systemSlice');
    console.log('2. Add Redux selectors: selectSystemLoading, selectSystemError');
    console.log('3. Update dispatch: addData(data) → addSystemData({values, formType, apiEndpoint})');
    console.log('4. Replace local loading state with Redux selectors');
    console.log('\\nSee AssetRegisterForm.jsx for reference implementation.');
  }

  console.log('\\n🎉 Reducer migration completed!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { migrateFormReducer, detectReducerPattern, FORM_TYPE_MAPPINGS };