/**
 * Finance Budget Slice
 * Consolidates all budget-related reducers into a single, efficient slice
 * 
 * Replaces reducers:
 * - BudgetAllotmentReducer.jsx (3 copies across manshi, pinki, store)
 * - BudgetRegisterPaymentReducer.jsx
 * - HonorariumRegReducer.jsx, ListHonorariumReducer.jsx, HonorariumReducer.jsx
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUniversalSlice } from '../../shared/redux/createUniversalSlice';
import { createDepartmentAPI } from '../../shared/redux/apiHelpers';

// Department API instance
const financeAPI = createDepartmentAPI('finance');

// Budget-specific async thunks
const budgetThunks = {
  // Budget Allotment operations
  fetchBudgetAllotments: createAsyncThunk(
    'financeBudget/fetchBudgetAllotments',
    async (filters = {}) => {
      return await financeAPI.fetch('budget', {
        formType: 'budget-allotment',
        ...filters
      });
    }
  ),

  addBudgetAllotment: createAsyncThunk(
    'financeBudget/addBudgetAllotment',
    async (allotmentData) => {
      // Validate budget allotment business rules
      const { budgetType, amount, balanceAmount } = allotmentData;
      
      if (budgetType === 'revised' && parseFloat(amount) > parseFloat(balanceAmount)) {
        throw new Error(`Amount cannot exceed balance amount: ${balanceAmount}`);
      }

      return await financeAPI.add('budget', {
        ...allotmentData,
        formType: 'budget-allotment'
      });
    }
  ),

  // Budget Payment operations
  fetchBudgetPayments: createAsyncThunk(
    'financeBudget/fetchBudgetPayments',
    async (filters = {}) => {
      return await financeAPI.fetch('budget', {
        formType: 'budget-payment',
        ...filters
      });
    }
  ),

  addBudgetPayment: createAsyncThunk(
    'financeBudget/addBudgetPayment',
    async (paymentData) => {
      // Validate payment business rules
      const { paymentAmount, loaAmount, balanceAmount } = paymentData;
      
      if (parseFloat(paymentAmount) > parseFloat(loaAmount)) {
        throw new Error(`Payment amount cannot be greater than LOA amount: ${loaAmount}`);
      }
      
      if (parseFloat(paymentAmount) > parseFloat(balanceAmount)) {
        throw new Error('Payment amount cannot be greater than balance amount');
      }

      return await financeAPI.add('budget', {
        ...paymentData,
        formType: 'budget-payment'
      });
    }
  ),

  // Honorarium operations
  fetchHonorarium: createAsyncThunk(
    'financeBudget/fetchHonorarium',
    async (filters = {}) => {
      return await financeAPI.fetch('budget', {
        formType: 'honorarium',
        ...filters
      });
    }
  ),

  addHonorariumEntry: createAsyncThunk(
    'financeBudget/addHonorariumEntry',
    async (honorariumData) => {
      return await financeAPI.add('budget', {
        ...honorariumData,
        formType: 'honorarium'
      });
    }
  ),

  // Budget analysis and reporting
  fetchBudgetAnalysis: createAsyncThunk(
    'financeBudget/fetchBudgetAnalysis',
    async (period = 'current-year') => {
      return await financeAPI.fetch('budget', {
        formType: 'budget-analysis',
        period
      });
    }
  ),

  // Department-wise budget summary
  fetchDepartmentBudgetSummary: createAsyncThunk(
    'financeBudget/fetchDepartmentBudgetSummary',
    async (department) => {
      return await financeAPI.fetch('budget', {
        formType: 'department-budget-summary',
        department
      });
    }
  )
};

// Budget-specific reducers
const budgetReducers = {
  // Budget filters and views
  setBudgetFilter: (state, action) => {
    state.budgetFilter = { ...state.budgetFilter, ...action.payload };
  },

  clearBudgetFilter: (state) => {
    state.budgetFilter = {};
  },

  setPaymentFilter: (state, action) => {
    state.paymentFilter = { ...state.paymentFilter, ...action.payload };
  },

  // Budget validation helpers
  validateBudgetAllotment: (state, action) => {
    const { budgetType, amount, balanceAmount } = action.payload;
    const errors = [];

    if (budgetType === 'revised' && parseFloat(amount) > parseFloat(balanceAmount)) {
      errors.push(`Amount cannot exceed balance amount: ${balanceAmount}`);
    }

    if (budgetType === 'original' && balanceAmount <= 0) {
      errors.push(`Budget allotment exhausted. Balance amount: ${balanceAmount}`);
    }

    state.validationErrors = errors;
  },

  validateBudgetPayment: (state, action) => {
    const { paymentAmount, loaAmount, balanceAmount } = action.payload;
    const errors = [];

    if (parseFloat(paymentAmount) > parseFloat(loaAmount)) {
      errors.push(`Payment amount cannot be greater than LOA amount: ${loaAmount}`);
    }

    if (parseFloat(paymentAmount) > parseFloat(balanceAmount)) {
      errors.push('Payment amount cannot be greater than balance amount');
    }

    state.validationErrors = errors;
  },

  // Budget analytics
  calculateBudgetMetrics: (state) => {
    const { budgetAllotments, budgetPayments } = state;

    // Calculate total allotted amount
    const totalAllotted = budgetAllotments.reduce((sum, item) => 
      sum + parseFloat(item.amount || 0), 0
    );

    // Calculate total paid amount
    const totalPaid = budgetPayments.reduce((sum, item) => 
      sum + parseFloat(item.paymentAmt || 0), 0
    );

    // Calculate balance
    const balance = totalAllotted - totalPaid;

    // Calculate department-wise breakdown
    const departmentBreakdown = {};
    budgetAllotments.forEach(item => {
      const dept = item.department || 'unknown';
      if (!departmentBreakdown[dept]) {
        departmentBreakdown[dept] = { allotted: 0, paid: 0 };
      }
      departmentBreakdown[dept].allotted += parseFloat(item.amount || 0);
    });

    budgetPayments.forEach(item => {
      const dept = item.department || 'unknown';
      if (departmentBreakdown[dept]) {
        departmentBreakdown[dept].paid += parseFloat(item.paymentAmt || 0);
      }
    });

    state.analytics = {
      ...state.analytics,
      totalAllotted,
      totalPaid,
      balance,
      utilizationRate: totalAllotted > 0 ? (totalPaid / totalAllotted) * 100 : 0,
      departmentBreakdown,
      lastUpdated: new Date().toISOString()
    };
  },

  // Update budget status
  updateBudgetStatus: (state, action) => {
    const { id, status, type } = action.payload;
    const targetArray = type === 'allotment' ? state.budgetAllotments : 
                       type === 'payment' ? state.budgetPayments : 
                       state.honorarium;

    const index = targetArray.findIndex(item => item.id === id);
    if (index !== -1) {
      targetArray[index].status = status;
      targetArray[index].updated_at = new Date().toISOString();
    }
  }
};

// Extended initial state for budget-specific data
const budgetInitialState = {
  // Separate arrays for different budget types
  budgetAllotments: [],
  budgetPayments: [],
  honorarium: [],
  
  // Filters for different budget views
  budgetFilter: {},
  paymentFilter: {},
  honorariumFilter: {},

  // Validation errors
  validationErrors: [],

  // Budget analytics
  analytics: {
    totalAllotted: 0,
    totalPaid: 0,
    balance: 0,
    utilizationRate: 0,
    departmentBreakdown: {}
  },

  // Budget periods and fiscal year data
  currentFiscalYear: new Date().getFullYear(),
  budgetPeriods: []
};

// Create the budget slice using universal factory
const financeBudgetSlice = createUniversalSlice(
  'financeBudget',
  'register/finance/budget',
  'finance-budget',
  budgetReducers,
  budgetThunks
);

// Extend the initial state
financeBudgetSlice.slice.initialState = {
  ...financeBudgetSlice.slice.initialState,
  ...budgetInitialState
};

// Add extra reducers for budget-specific thunks
financeBudgetSlice.slice.caseReducers = {
  ...financeBudgetSlice.slice.caseReducers,

  // Budget Allotment cases
  [budgetThunks.fetchBudgetAllotments.fulfilled]: (state, action) => {
    if (action.payload.success) {
      state.budgetAllotments = action.payload.data || [];
    }
  },

  [budgetThunks.addBudgetAllotment.fulfilled]: (state, action) => {
    if (action.payload.success && action.payload.data) {
      state.budgetAllotments.unshift(action.payload.data);
      // Recalculate metrics after adding new allotment
      budgetReducers.calculateBudgetMetrics(state);
    }
  },

  [budgetThunks.addBudgetAllotment.rejected]: (state, action) => {
    state.error = action.error.message;
  },

  // Budget Payment cases
  [budgetThunks.fetchBudgetPayments.fulfilled]: (state, action) => {
    if (action.payload.success) {
      state.budgetPayments = action.payload.data || [];
    }
  },

  [budgetThunks.addBudgetPayment.fulfilled]: (state, action) => {
    if (action.payload.success && action.payload.data) {
      state.budgetPayments.unshift(action.payload.data);
      // Recalculate metrics after adding new payment
      budgetReducers.calculateBudgetMetrics(state);
    }
  },

  [budgetThunks.addBudgetPayment.rejected]: (state, action) => {
    state.error = action.error.message;
  },

  // Honorarium cases
  [budgetThunks.fetchHonorarium.fulfilled]: (state, action) => {
    if (action.payload.success) {
      state.honorarium = action.payload.data || [];
    }
  },

  [budgetThunks.addHonorariumEntry.fulfilled]: (state, action) => {
    if (action.payload.success && action.payload.data) {
      state.honorarium.unshift(action.payload.data);
    }
  },

  // Analysis cases
  [budgetThunks.fetchBudgetAnalysis.fulfilled]: (state, action) => {
    if (action.payload.success) {
      state.analytics = { ...state.analytics, ...action.payload.data };
    }
  },

  [budgetThunks.fetchDepartmentBudgetSummary.fulfilled]: (state, action) => {
    if (action.payload.success) {
      const department = action.meta.arg;
      if (!state.analytics.departmentBreakdown) {
        state.analytics.departmentBreakdown = {};
      }
      state.analytics.departmentBreakdown[department] = action.payload.data;
    }
  }
};

// Export actions
export const {
  // Universal actions
  setCurrentItem,
  clearCurrentItem,
  clearError,
  setFilters,
  clearFilters,
  setPagination,
  setLoading,

  // Budget-specific actions
  setBudgetFilter,
  clearBudgetFilter,
  setPaymentFilter,
  validateBudgetAllotment,
  validateBudgetPayment,
  calculateBudgetMetrics,
  updateBudgetStatus
} = financeBudgetSlice.actions;

// Export async thunks
export const {
  // Universal thunks
  fetchData: fetchBudgetData,
  addData: addBudgetData,
  editData: editBudgetData,
  deleteData: deleteBudgetData,
  saveData: saveBudgetData
} = financeBudgetSlice.asyncThunks;

// Export budget-specific thunks
export const {
  fetchBudgetAllotments,
  addBudgetAllotment,
  fetchBudgetPayments,
  addBudgetPayment,
  fetchHonorarium,
  addHonorariumEntry,
  fetchBudgetAnalysis,
  fetchDepartmentBudgetSummary
} = budgetThunks;

// Export selectors
export const selectBudgetState = (state) => state.financeBudget || {};
export const selectBudgetAllotments = (state) => state.financeBudget?.budgetAllotments || [];
export const selectBudgetPayments = (state) => state.financeBudget?.budgetPayments || [];
export const selectHonorarium = (state) => state.financeBudget?.honorarium || [];
export const selectBudgetAnalytics = (state) => state.financeBudget?.analytics || {};
export const selectValidationErrors = (state) => state.financeBudget?.validationErrors || [];

// Computed selectors
export const selectBudgetUtilization = (state) => {
  const analytics = selectBudgetAnalytics(state);
  return {
    totalAllotted: analytics.totalAllotted || 0,
    totalPaid: analytics.totalPaid || 0,
    balance: analytics.balance || 0,
    utilizationPercentage: analytics.utilizationRate || 0
  };
};

export const selectDepartmentWiseBudget = (state) => {
  const analytics = selectBudgetAnalytics(state);
  return analytics.departmentBreakdown || {};
};

// Export reducer
export default financeBudgetSlice.reducer;