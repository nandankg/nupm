/**
 * Signalling Maintenance Slice
 * Consolidates 25+ PM and maintenance-related reducers into a single, efficient slice
 * 
 * Replaces reducers from:
 * - PMLogBook3Reducer, PMLogBookMainLine3Reducer, PMsheetMonthlyDepotReducer
 * - PMLogBookTVMReducer, PMMainlineReducer, MonthlyCabinetRecordReducer
 * - PmloogbookReducer, PmsheetReducer, Pmlog6Reducer, PmlogMaintainReducer
 * - And many more PM-related reducers across different developers
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUniversalSlice } from '../../shared/redux/createUniversalSlice';
import { createDepartmentAPI } from '../../shared/redux/apiHelpers';

// Department API instance
const signallingAPI = createDepartmentAPI('signalling');

// Maintenance-specific async thunks
const maintenanceThunks = {
  // PM Log Book operations
  fetchPMLogBooks: createAsyncThunk(
    'signallingMaintenance/fetchPMLogBooks',
    async (filters = {}) => {
      return await signallingAPI.fetch('maintenance', {
        formType: 'pm-logbook',
        ...filters
      });
    }
  ),

  addPMLogEntry: createAsyncThunk(
    'signallingMaintenance/addPMLogEntry',
    async (logData) => {
      return await signallingAPI.add('maintenance', {
        ...logData,
        formType: 'pm-logbook'
      });
    }
  ),

  // PM Sheet operations
  fetchPMSheets: createAsyncThunk(
    'signallingMaintenance/fetchPMSheets',
    async (filters = {}) => {
      return await signallingAPI.fetch('maintenance', {
        formType: 'pm-sheet',
        ...filters
      });
    }
  ),

  addPMSheet: createAsyncThunk(
    'signallingMaintenance/addPMSheet',
    async (sheetData) => {
      return await signallingAPI.add('maintenance', {
        ...sheetData,
        formType: 'pm-sheet'
      });
    }
  ),

  // Equipment maintenance operations
  fetchEquipmentMaintenance: createAsyncThunk(
    'signallingMaintenance/fetchEquipmentMaintenance',
    async (filters = {}) => {
      return await signallingAPI.fetch('maintenance', {
        formType: 'equipment-maintenance',
        ...filters
      });
    }
  ),

  updateEquipmentStatus: createAsyncThunk(
    'signallingMaintenance/updateEquipmentStatus',
    async ({ equipmentId, status, remarks }) => {
      return await signallingAPI.edit('maintenance', {
        equipment_id: equipmentId,
        status,
        remarks,
        formType: 'equipment-status'
      });
    }
  ),

  // Schedule management
  fetchMaintenanceSchedule: createAsyncThunk(
    'signallingMaintenance/fetchMaintenanceSchedule',
    async (period = 'monthly') => {
      return await signallingAPI.fetch('maintenance', {
        formType: 'maintenance-schedule',
        period
      });
    }
  ),

  // Cleaning records (Box cleaning, cabinet cleaning, etc.)
  fetchCleaningRecords: createAsyncThunk(
    'signallingMaintenance/fetchCleaningRecords',
    async (filters = {}) => {
      return await signallingAPI.fetch('maintenance', {
        formType: 'cleaning-record',
        ...filters
      });
    }
  )
};

// Maintenance-specific reducers
const maintenanceReducers = {
  // PM Log Book specific actions
  setPMLogFilter: (state, action) => {
    state.pmLogFilter = { ...state.pmLogFilter, ...action.payload };
  },

  clearPMLogFilter: (state) => {
    state.pmLogFilter = {};
  },

  // PM Sheet specific actions
  setPMSheetFilter: (state, action) => {
    state.pmSheetFilter = { ...state.pmSheetFilter, ...action.payload };
  },

  updateMaintenanceStatus: (state, action) => {
    const { itemId, status, type } = action.payload;
    const targetArray = type === 'pmlog' ? state.pmLogs : 
                       type === 'pmsheet' ? state.pmSheets : state.data;
    
    const index = targetArray.findIndex(item => item.id === itemId);
    if (index !== -1) {
      targetArray[index].status = status;
      targetArray[index].updated_at = new Date().toISOString();
    }
  },

  // Equipment status tracking
  updateEquipmentHealth: (state, action) => {
    const { equipmentId, health } = action.payload;
    if (!state.equipmentHealth) {
      state.equipmentHealth = {};
    }
    state.equipmentHealth[equipmentId] = {
      ...state.equipmentHealth[equipmentId],
      ...health,
      lastUpdated: new Date().toISOString()
    };
  },

  // Maintenance analytics
  calculateMaintenanceMetrics: (state) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    // Calculate completion rates
    const thisMonthData = state.data.filter(item => {
      const itemDate = new Date(item.date || item.created_at);
      return itemDate.getMonth() === thisMonth && itemDate.getFullYear() === thisYear;
    });

    const completedCount = thisMonthData.filter(item => item.status === 'completed' || item.status === '1').length;
    const totalCount = thisMonthData.length;

    state.analytics = {
      ...state.analytics,
      thisMonth: {
        total: totalCount,
        completed: completedCount,
        completionRate: totalCount > 0 ? (completedCount / totalCount) * 100 : 0,
        pending: totalCount - completedCount
      },
      lastUpdated: new Date().toISOString()
    };
  }
};

// Extended initial state for maintenance-specific data
const maintenanceInitialState = {
  // Separate arrays for different maintenance types
  pmLogs: [],
  pmSheets: [],
  equipmentMaintenance: [],
  cleaningRecords: [],
  maintenanceSchedule: [],

  // Filters for different maintenance types
  pmLogFilter: {},
  pmSheetFilter: {},
  equipmentFilter: {},

  // Equipment health tracking
  equipmentHealth: {},

  // Maintenance analytics
  analytics: {
    thisMonth: { total: 0, completed: 0, completionRate: 0, pending: 0 },
    lastMonth: { total: 0, completed: 0, completionRate: 0, pending: 0 }
  },

  // Active maintenance sessions
  activeSessions: []
};

// Create the maintenance slice using universal factory
const signallingMaintenanceSlice = createUniversalSlice(
  'signallingMaintenance',
  'register/signalling/maintenance',
  'signalling-maintenance',
  maintenanceReducers,
  maintenanceThunks
);

// Extend the initial state
signallingMaintenanceSlice.slice.initialState = {
  ...signallingMaintenanceSlice.slice.initialState,
  ...maintenanceInitialState
};

// Add extra reducers for maintenance-specific thunks
signallingMaintenanceSlice.slice.caseReducers = {
  ...signallingMaintenanceSlice.slice.caseReducers,

  // PM Log Book cases
  [maintenanceThunks.fetchPMLogBooks.fulfilled]: (state, action) => {
    if (action.payload.success) {
      state.pmLogs = action.payload.data || [];
    }
  },

  [maintenanceThunks.addPMLogEntry.fulfilled]: (state, action) => {
    if (action.payload.success && action.payload.data) {
      state.pmLogs.unshift(action.payload.data);
    }
  },

  // PM Sheet cases
  [maintenanceThunks.fetchPMSheets.fulfilled]: (state, action) => {
    if (action.payload.success) {
      state.pmSheets = action.payload.data || [];
    }
  },

  [maintenanceThunks.addPMSheet.fulfilled]: (state, action) => {
    if (action.payload.success && action.payload.data) {
      state.pmSheets.unshift(action.payload.data);
    }
  },

  // Equipment maintenance cases
  [maintenanceThunks.fetchEquipmentMaintenance.fulfilled]: (state, action) => {
    if (action.payload.success) {
      state.equipmentMaintenance = action.payload.data || [];
    }
  },

  [maintenanceThunks.updateEquipmentStatus.fulfilled]: (state, action) => {
    if (action.payload.success) {
      const { equipment_id, status } = action.payload.data;
      const index = state.equipmentMaintenance.findIndex(item => item.equipment_id === equipment_id);
      if (index !== -1) {
        state.equipmentMaintenance[index] = { ...state.equipmentMaintenance[index], ...action.payload.data };
      }
    }
  },

  // Schedule cases
  [maintenanceThunks.fetchMaintenanceSchedule.fulfilled]: (state, action) => {
    if (action.payload.success) {
      state.maintenanceSchedule = action.payload.data || [];
    }
  },

  // Cleaning records cases
  [maintenanceThunks.fetchCleaningRecords.fulfilled]: (state, action) => {
    if (action.payload.success) {
      state.cleaningRecords = action.payload.data || [];
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

  // Maintenance-specific actions
  setPMLogFilter,
  clearPMLogFilter,
  setPMSheetFilter,
  updateMaintenanceStatus,
  updateEquipmentHealth,
  calculateMaintenanceMetrics
} = signallingMaintenanceSlice.actions;

// Export async thunks
export const {
  // Universal thunks
  fetchData: fetchMaintenanceData,
  addData: addMaintenanceData,
  editData: editMaintenanceData,
  deleteData: deleteMaintenanceData,
  saveData: saveMaintenanceData
} = signallingMaintenanceSlice.asyncThunks;

// Export maintenance-specific thunks
export const {
  fetchPMLogBooks,
  addPMLogEntry,
  fetchPMSheets,
  addPMSheet,
  fetchEquipmentMaintenance,
  updateEquipmentStatus,
  fetchMaintenanceSchedule,
  fetchCleaningRecords
} = maintenanceThunks;

// Export selectors (can be created using createDepartmentSelectors)
export const selectMaintenanceState = (state) => state.signallingMaintenance || {};
export const selectPMLogBooks = (state) => state.signallingMaintenance?.pmLogs || [];
export const selectPMSheets = (state) => state.signallingMaintenance?.pmSheets || [];
export const selectEquipmentMaintenance = (state) => state.signallingMaintenance?.equipmentMaintenance || [];
export const selectMaintenanceAnalytics = (state) => state.signallingMaintenance?.analytics || {};
export const selectEquipmentHealth = (state) => state.signallingMaintenance?.equipmentHealth || {};

// Export reducer
export default signallingMaintenanceSlice.reducer;