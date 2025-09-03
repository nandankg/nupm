/**
 * Universal Redux Selectors for UPMRC Application
 * Reusable selectors for consistent state access patterns
 */

import { createSelector } from '@reduxjs/toolkit';

/**
 * Creates standard selectors for a department slice
 * @param {string} sliceName - Name of the slice in the store
 */
export const createDepartmentSelectors = (sliceName) => {
  // Base selector to get the department slice
  const selectDepartmentSlice = (state) => state[sliceName] || {};

  // Basic data selectors
  const selectData = createSelector(
    [selectDepartmentSlice],
    (slice) => slice.data || []
  );

  const selectLoading = createSelector(
    [selectDepartmentSlice],
    (slice) => slice.loading || false
  );

  const selectError = createSelector(
    [selectDepartmentSlice],
    (slice) => slice.error || null
  );

  const selectCurrentItem = createSelector(
    [selectDepartmentSlice],
    (slice) => slice.currentItem || null
  );

  const selectFilters = createSelector(
    [selectDepartmentSlice],
    (slice) => slice.filters || {}
  );

  const selectPagination = createSelector(
    [selectDepartmentSlice],
    (slice) => slice.pagination || { page: 1, limit: 10, total: 0 }
  );

  const selectLastUpdated = createSelector(
    [selectDepartmentSlice],
    (slice) => slice.lastUpdated || null
  );

  // Computed selectors
  const selectDataCount = createSelector(
    [selectData],
    (data) => data.length
  );

  const selectHasData = createSelector(
    [selectData],
    (data) => data.length > 0
  );

  const selectIsEmpty = createSelector(
    [selectHasData, selectLoading],
    (hasData, loading) => !hasData && !loading
  );

  const selectFilteredData = createSelector(
    [selectData, selectFilters],
    (data, filters) => {
      if (!filters || Object.keys(filters).length === 0) {
        return data;
      }

      return data.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value) return true; // Skip empty filters
          
          const itemValue = item[key];
          if (typeof itemValue === 'string') {
            return itemValue.toLowerCase().includes(value.toLowerCase());
          }
          
          return itemValue === value;
        });
      });
    }
  );

  const selectPaginatedData = createSelector(
    [selectFilteredData, selectPagination],
    (data, pagination) => {
      const { page, limit } = pagination;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      return data.slice(startIndex, endIndex);
    }
  );

  const selectTotalPages = createSelector(
    [selectFilteredData, selectPagination],
    (data, pagination) => Math.ceil(data.length / pagination.limit)
  );

  // Status-based selectors
  const selectActiveItems = createSelector(
    [selectData],
    (data) => data.filter(item => item.status === 'active' || item.status === '1')
  );

  const selectInactiveItems = createSelector(
    [selectData],
    (data) => data.filter(item => item.status === 'inactive' || item.status === '0')
  );

  const selectPendingItems = createSelector(
    [selectData],
    (data) => data.filter(item => item.status === 'pending')
  );

  // Date-based selectors
  const selectRecentItems = createSelector(
    [selectData],
    (data) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      return data.filter(item => {
        const itemDate = new Date(item.created_at || item.date);
        return itemDate >= thirtyDaysAgo;
      });
    }
  );

  const selectItemsByMonth = createSelector(
    [selectData],
    (data) => {
      const itemsByMonth = {};
      
      data.forEach(item => {
        const date = new Date(item.created_at || item.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!itemsByMonth[monthKey]) {
          itemsByMonth[monthKey] = [];
        }
        itemsByMonth[monthKey].push(item);
      });
      
      return itemsByMonth;
    }
  );

  // Search selector
  const selectSearchResults = createSelector(
    [selectData, (state, searchTerm) => searchTerm],
    (data, searchTerm) => {
      if (!searchTerm || searchTerm.trim() === '') {
        return data;
      }

      const term = searchTerm.toLowerCase();
      return data.filter(item => {
        // Search across common text fields
        const searchableFields = ['name', 'title', 'description', 'remarks', 'employee_id'];
        
        return searchableFields.some(field => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(term);
          }
          return false;
        });
      });
    }
  );

  return {
    // Base selectors
    selectDepartmentSlice,
    selectData,
    selectLoading,
    selectError,
    selectCurrentItem,
    selectFilters,
    selectPagination,
    selectLastUpdated,

    // Computed selectors
    selectDataCount,
    selectHasData,
    selectIsEmpty,
    selectFilteredData,
    selectPaginatedData,
    selectTotalPages,

    // Status selectors
    selectActiveItems,
    selectInactiveItems,
    selectPendingItems,

    // Date selectors
    selectRecentItems,
    selectItemsByMonth,

    // Search selector
    selectSearchResults
  };
};

/**
 * Common selectors that work across departments
 */

// Authentication selectors
export const selectAuth = (state) => state.auth || {};
export const selectCurrentUser = (state) => state.auth?.currentUser;
export const selectIsAuthenticated = (state) => !!state.auth?.currentUser;
export const selectUserDepartment = (state) => state.auth?.currentUser?.department;

// UI selectors
export const selectUI = (state) => state.ui || {};
export const selectModals = (state) => state.ui?.modals || {};
export const selectAlerts = (state) => state.ui?.alerts || [];
export const selectIsModalOpen = (state, modalName) => state.ui?.modals?.[modalName]?.open || false;

// Table data selectors (for the existing tableDataSlice)
export const selectTableData = (state) => state.data || {};
export const selectTableLoading = (state) => state.data?.loading || false;
export const selectTableError = (state) => state.data?.error || null;

/**
 * Department-specific selector factories
 */

// Signalling department selectors
export const signallingSelectors = createDepartmentSelectors('signalling');

// Telecom department selectors  
export const telecomSelectors = createDepartmentSelectors('telecom');

// Operation department selectors
export const operationSelectors = createDepartmentSelectors('operation');

// Finance department selectors
export const financeSelectors = createDepartmentSelectors('finance');

// AFC department selectors
export const afcMainlineSelectors = createDepartmentSelectors('afcMainline');
export const afcSdcSelectors = createDepartmentSelectors('afcSdc');
export const afcStoreSelectors = createDepartmentSelectors('afcStore');

/**
 * Cross-department selectors
 */

// Get all pending items across departments
export const selectAllPendingItems = createSelector(
  [
    (state) => signallingSelectors.selectPendingItems(state),
    (state) => telecomSelectors.selectPendingItems(state),
    (state) => operationSelectors.selectPendingItems(state),
    (state) => financeSelectors.selectPendingItems(state),
  ],
  (...allPendingArrays) => {
    return allPendingArrays.flat().map(item => ({
      ...item,
      department: item.department || 'unknown'
    }));
  }
);

// Get recent activity across all departments
export const selectRecentActivity = createSelector(
  [
    (state) => signallingSelectors.selectRecentItems(state),
    (state) => telecomSelectors.selectRecentItems(state),
    (state) => operationSelectors.selectRecentItems(state),
    (state) => financeSelectors.selectRecentItems(state),
  ],
  (...allRecentArrays) => {
    return allRecentArrays
      .flat()
      .sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date))
      .slice(0, 10); // Get 10 most recent
  }
);

// Department loading states
export const selectAnyLoading = createSelector(
  [
    (state) => signallingSelectors.selectLoading(state),
    (state) => telecomSelectors.selectLoading(state),
    (state) => operationSelectors.selectLoading(state),
    (state) => financeSelectors.selectLoading(state),
  ],
  (...loadingStates) => loadingStates.some(loading => loading)
);

export default {
  createDepartmentSelectors,
  selectAuth,
  selectCurrentUser,
  selectIsAuthenticated,
  selectUserDepartment,
  selectUI,
  selectModals,
  selectAlerts,
  selectIsModalOpen,
  selectTableData,
  selectTableLoading,
  selectTableError,
  signallingSelectors,
  telecomSelectors,
  operationSelectors,
  financeSelectors,
  afcMainlineSelectors,
  afcSdcSelectors,
  afcStoreSelectors,
  selectAllPendingItems,
  selectRecentActivity,
  selectAnyLoading
};