#!/usr/bin/env node

/**
 * Automated FormActionButtons Implementation Script
 * Updates all signalling forms to use the new FormActionButtons component
 * 
 * Usage: node scripts/update-signalling-forms.js
 */

const fs = require('fs');
const path = require('path');

const SIGNALLING_FORMS_DIR = path.join(__dirname, '../src/departments/signalling/forms');
const COMPLETED_FORMS = [
  'AssetRegisterForm.jsx',
  'EquipmentFailureRegisterForm.jsx', 
  'ColorLightMaintenanceForm.jsx',
  'GatePassForm.jsx',
  'StationDiarySignallingForm.jsx'
];

// Pattern replacements for different form architectures
const patterns = {
  // Update import statement
  importUpdate: {
    from: /import { UniversalSignallingFormField, SignallingFormLayout } from "\.\.\/components";/g,
    to: 'import { UniversalSignallingFormField, SignallingFormLayout, FormActionButtons } from "../components";'
  },
  
  // For forms using standard submission pattern
  standardSubmissionUpdate: {
    from: /(\/\/ Handle form submission[\s\S]*?finally\s*{\s*setIsSubmitting\(false\);\s*}\s*};)/g,
    to: `// Handle form submission (Save & Submit - Final submission)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    await submitForm(true); // true = final submission
  };

  // Handle draft save
  const handleSaveDraft = async () => {
    await submitForm(false); // false = draft save
  };

  // Common submission logic
  const submitForm = async (isFinalSubmit) => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Preserve exact field structure for API compatibility
      const submissionData = {
        ...formValues,
        // Add status based on action type
        status: isFinalSubmit ? "1" : "0", // 1 = submitted, 0 = draft
      };

      dispatch(addData(submissionData)); // Update with correct action

      // Success feedback based on action type
      const message = isFinalSubmit 
        ? "Form submitted successfully!" 
        : "Form saved as draft!";
      alert(message);
      
      if (isFinalSubmit) {
        navigate("/admin/AllDeptFormList"); // Update with correct navigation
      }
      // For draft save, stay on form for continued editing
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };`
  },

  // Replace Form Actions section
  formActionsUpdate: {
    from: /{\s*\/\* Form Actions \*\/\s*}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g,
    to: `{/* Form Actions */}
        <FormActionButtons
          loading={isSubmitting}
          onReset={resetForm}
          onSaveDraft={handleSaveDraft}
          onSubmit={handleSubmit}
          formName="FORM_NAME_PLACEHOLDER"
        />`
  }
};

/**
 * Updates a single form file with FormActionButtons
 */
function updateFormFile(filePath, fileName) {
  console.log(`\\nUpdating ${fileName}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Extract form name from filename
    const formName = fileName.replace('Form.jsx', '').replace(/([A-Z])/g, ' $1').trim();

    // 1. Update import statement
    if (patterns.importUpdate.from.test(content)) {
      content = content.replace(patterns.importUpdate.from, patterns.importUpdate.to);
      modified = true;
      console.log(`  ✅ Updated import statement`);
    }

    // 2. Look for different submission patterns and update accordingly
    
    // Check if it's a SignallingFormLayout with props pattern (like StationDiary)
    if (content.includes('onSubmit={handleSubmit}') && content.includes('SignallingFormLayout')) {
      console.log(`  📝 Form uses SignallingFormLayout with props - manual update required`);
      console.log(`  💡 Apply the pattern shown in StationDiarySignallingForm.jsx`);
    }
    
    // Check if it has standard Form Actions section
    else if (content.includes('{/* Form Actions */}')) {
      // Update Form Actions section
      content = content.replace(patterns.formActionsUpdate.from, 
        patterns.formActionsUpdate.to.replace('FORM_NAME_PLACEHOLDER', formName));
      modified = true;
      console.log(`  ✅ Updated Form Actions section`);
    }

    // 3. Check for standard submission pattern and update
    if (content.includes('// Handle form submission') && !content.includes('submitForm(true)')) {
      // This requires more complex pattern matching - flag for manual update
      console.log(`  📝 Custom submission logic detected - manual update recommended`);
      console.log(`  💡 Apply the 3-step pattern: import → submission logic → form actions`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ ${fileName} updated successfully`);
      return true;
    } else {
      console.log(`  ⚠️  No automatic updates applied - manual review needed`);
      return false;
    }

  } catch (error) {
    console.error(`  ❌ Error updating ${fileName}:`, error.message);
    return false;
  }
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 Starting FormActionButtons batch update...');
  console.log('📁 Target directory:', SIGNALLING_FORMS_DIR);

  if (!fs.existsSync(SIGNALLING_FORMS_DIR)) {
    console.error('❌ Signalling forms directory not found!');
    process.exit(1);
  }

  const allFiles = fs.readdirSync(SIGNALLING_FORMS_DIR)
    .filter(file => file.endsWith('.jsx'))
    .filter(file => !COMPLETED_FORMS.includes(file));

  console.log(`📋 Found ${allFiles.length} forms to update`);
  console.log(`✅ ${COMPLETED_FORMS.length} forms already completed`);

  let updateCount = 0;
  let manualCount = 0;

  allFiles.forEach(fileName => {
    const filePath = path.join(SIGNALLING_FORMS_DIR, fileName);
    const updated = updateFormFile(filePath, fileName);
    
    if (updated) {
      updateCount++;
    } else {
      manualCount++;
    }
  });

  console.log('\\n📊 BATCH UPDATE SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successfully updated: ${updateCount} forms`);
  console.log(`📝 Manual update needed: ${manualCount} forms`);
  console.log(`✅ Previously completed: ${COMPLETED_FORMS.length} forms`);
  console.log(`📈 Total progress: ${updateCount + COMPLETED_FORMS.length}/${allFiles.length + COMPLETED_FORMS.length} forms`);

  if (manualCount > 0) {
    console.log('\\n💡 MANUAL UPDATE GUIDE');
    console.log('For forms requiring manual updates, apply this 3-step pattern:');
    console.log('1. Add FormActionButtons to import');
    console.log('2. Update submission logic with draft/submit functions');
    console.log('3. Replace Form Actions section with FormActionButtons component');
    console.log('\\nSee completed forms for reference patterns.');
  }

  console.log('\\n🎉 Batch update completed!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { updateFormFile, patterns };