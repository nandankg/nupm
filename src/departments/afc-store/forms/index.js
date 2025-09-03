/**
 * AFC-Store Department Forms - Export Index
 * All forms for AFC Store Department - Material & Inventory Management
 * Complete set of 4 forms as per formlist.md
 */

// Core Store Management Forms
export { default as DailyTransactionReceiptStoreForm } from './DailyTransactionReceiptStoreForm';
export { default as DailyTransactionIssueStoreForm } from './DailyTransactionIssueStoreForm';
export { default as GatePassBookStoreForm } from './GatePassBookStoreForm';
export { default as LedgerStoreForm } from './LedgerStoreForm';

// Legacy/Additional Forms
export { default as InventoryManagementStoreForm } from './InventoryManagementStoreForm';

/**
 * Form Mapping for Route Configuration
 * Maps form IDs from formlist.md to components
 */
export const AFC_STORE_FORM_MAPPING = {
  // Core Store Forms (formlist.md)
  78: DailyTransactionReceiptStoreForm,   // daily-transaction-register-store-receipt
  79: DailyTransactionIssueStoreForm,     // daily-transaction-register-store-issue  
  80: GatePassBookStoreForm,              // gate-pass-book-store
  81: LedgerStoreForm,                    // ledger-store
  
  // Additional Forms
  'inventory-management': InventoryManagementStoreForm
};

/**
 * Form Categories for Navigation
 */
export const AFC_STORE_CATEGORIES = {
  'Transaction Management': [
    {
      id: 78,
      name: 'Daily Transaction Receipt Register Store',
      slug: 'daily-transaction-register-store-receipt',
      component: 'DailyTransactionReceiptStoreForm',
      description: 'Material receiving and inventory management'
    },
    {
      id: 79,
      name: 'Daily Transaction Issue Register Store', 
      slug: 'daily-transaction-register-store-issue',
      component: 'DailyTransactionIssueStoreForm',
      description: 'Material issuing and distribution management'
    }
  ],
  'Security & Access': [
    {
      id: 80,
      name: 'Gate Pass Book Store',
      slug: 'gate-pass-book-store', 
      component: 'GatePassBookStoreForm',
      description: 'Entry/exit authorization and material pass management'
    }
  ],
  'Financial Management': [
    {
      id: 81,
      name: 'Ledger Store',
      slug: 'ledger-store',
      component: 'LedgerStoreForm', 
      description: 'Financial ledger and inventory balance management'
    }
  ]
};

/**
 * Department Information
 */
export const AFC_STORE_INFO = {
  name: 'AFC-Store Department',
  totalForms: 4,
  completionStatus: '100%',
  description: 'Complete material management, inventory control, and store operations',
  categories: Object.keys(AFC_STORE_CATEGORIES).length,
  lastUpdated: new Date().toISOString()
};