import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { operationService } from '../../../shared/api';
import { showToastOnce } from '../../../component/toastUtils';
import { validateFieldMapping } from '../../../utils/databaseFieldMapper';

const getUserData = () => {
  const userData = localStorage.getItem('userdata');
  return userData ? JSON.parse(userData) : {};
};

export const fetchAfcGateData = createAsyncThunk(
  'afcGate/fetchData',
  async (formType) => {
    return operationService.viewData(formType);
  }
);

export const addAfcGateData = createAsyncThunk(
  'afcGate/addData',
  async ({ values, formType }) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      ...values,
      formType,
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editAfcGateData = createAsyncThunk(
  'afcGate/editData',
  async ({ values, formType }) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      ...values,
      formType,
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

export const saveAfcGateData = createAsyncThunk(
  'afcGate/saveData',
  async ({ id, formType }) => {
    return operationService.editData({
      formType,
      status: '1',
      update_id: id,
    });
  }
);

export const fetchAfcGateMaintenanceData = createAsyncThunk(
  'afcGate/fetchMaintenanceData',
  async () => {
    return operationService.viewData('afc-gate-maintenance');
  }
);

export const addAfcGateMaintenanceData = createAsyncThunk(
  'afcGate/addMaintenanceData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      ...values,
      formType: 'afc-gate-maintenance',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editAfcGateMaintenanceData = createAsyncThunk(
  'afcGate/editMaintenanceData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      ...values,
      formType: 'afc-gate-maintenance',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

export const fetchAfcMonthlyData = createAsyncThunk(
  'afcGate/fetchMonthlyData',
  async () => {
    return operationService.viewData('pm-logbook-monthly-gate-mainline');
  }
);

export const addAfcMonthlyData = createAsyncThunk(
  'afcGate/addMonthlyData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      stn_name: values.station,
      date: values.date,
      month: values.month,
      activities1: values.activities1,
      activities2: values.activities2,
      staff1_name: values.staff1_name,
      staff1_desg: values.staff1_desg,
      staff1_sign: values.staff1_sign,
      staff2_name: values.staff2_name,
      staff2_desg: values.staff2_desg,
      staff2_sign: values.staff2_sign,
      staff3_name: values.staff3_name,
      staff3_desg: values.staff3_desg,
      staff3_sign: values.staff3_sign,
      formType: 'pm-logbook-monthly-gate-mainline',
      employee_id: user.profileid,
      department: user.department,
      unit: user.department,
    });
    return operationService.saveData(mappedData);
  }
);

export const editAfcMonthlyData = createAsyncThunk(
  'afcGate/editMonthlyData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      formType: 'pm-logbook-monthly-gate-mainline',
      stn_name: values.station,
      date: values.date,
      month: values.month,
      activities1: values.activities1,
      activities2: values.activities2,
      staff1_name: values.staff1_name,
      staff1_desg: values.staff1_desg,
      staff1_sign: values.staff1_sign,
      staff2_name: values.staff2_name,
      staff2_desg: values.staff2_desg,
      staff2_sign: values.staff2_sign,
      staff3_name: values.staff3_name,
      staff3_desg: values.staff3_desg,
      staff3_sign: values.staff3_sign,
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

export const fetchAfcPreventiveData = createAsyncThunk(
  'afcGate/fetchPreventiveData',
  async () => {
    return operationService.viewData('pm-logbook-monthly-other-mainline');
  }
);

export const addAfcPreventiveData = createAsyncThunk(
  'afcGate/addPreventiveData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      station: values.stn_name,
      date: values.date,
      month: values.month,
      activities1: values.activities1,
      activities2: values.activities2,
      activities3: values.activities3,
      staff1_name: values.staff1_name,
      staff1_desg: values.staff1_desg,
      staff1_sign: values.staff1_sign,
      staff2_name: values.staff2_name,
      staff2_desg: values.staff2_desg,
      staff2_sign: values.staff2_sign,
      staff3_name: values.staff3_name,
      staff3_desg: values.staff3_desg,
      staff3_sign: values.staff3_sign,
      formType: 'pm-logbook-monthly-other-mainline',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editAfcPreventiveData = createAsyncThunk(
  'afcGate/editPreventiveData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      formType: 'pm-logbook-monthly-other-mainline',
      station: values.stn_name,
      date: values.date,
      month: values.month,
      activities1: values.activities1,
      activities2: values.activities2,
      activities3: values.activities3,
      staff1_name: values.staff1_name,
      staff1_desg: values.staff1_desg,
      staff1_sign: values.staff1_sign,
      staff2_name: values.staff2_name,
      staff2_desg: values.staff2_desg,
      staff2_sign: values.staff2_sign,
      staff3_name: values.staff3_name,
      staff3_desg: values.staff3_desg,
      staff3_sign: values.staff3_sign,
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

const afcGateSlice = createSlice({
  name: 'afcGate',
  initialState: {
    gateData: [],
    maintenanceData: [],
    monthlyData: [],
    preventiveData: [],
    loading: {
      fetch: false,
      add: false,
      edit: false,
      save: false,
      maintenance: false,
      monthly: false,
      preventive: false,
    },
    error: {
      fetch: null,
      add: null,
      edit: null,
      save: null,
      maintenance: null,
      monthly: null,
      preventive: null,
    },
    isSuccess: {
      add: null,
      edit: null,
      save: null,
      maintenance: null,
      monthly: null,
      preventive: null,
    },
    analytics: {
      totalGates: 0,
      activeMaintenanceJobs: 0,
      monthlyCompletionRate: 0,
      preventiveTasksCompleted: 0,
    },
  },
  reducers: {
    clearAfcGateState: (state) => {
      state.error = {
        fetch: null,
        add: null,
        edit: null,
        save: null,
        maintenance: null,
        monthly: null,
        preventive: null,
      };
      state.isSuccess = {
        add: null,
        edit: null,
        save: null,
        maintenance: null,
        monthly: null,
        preventive: null,
      };
    },
    updateAfcGateAnalytics: (state) => {
      state.analytics.totalGates = state.gateData.length || 0;
      state.analytics.activeMaintenanceJobs = state.maintenanceData.filter(
        item => item.status !== 'completed'
      ).length || 0;
      state.analytics.monthlyCompletionRate = state.monthlyData.length > 0 
        ? (state.monthlyData.filter(item => item.completion_status === 'completed').length / state.monthlyData.length * 100) 
        : 0;
      state.analytics.preventiveTasksCompleted = state.preventiveData.filter(
        item => item.task_status === 'completed'
      ).length || 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAfcGateData.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchAfcGateData.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.gateData = action.payload;
        state.error.fetch = null;
      })
      .addCase(fetchAfcGateData.rejected, (state, action) => {
        state.loading.fetch = false;
        state.gateData = [];
        state.error.fetch = action.error.message;
      })

      .addCase(addAfcGateData.pending, (state) => {
        state.loading.add = true;
        state.error.add = null;
      })
      .addCase(addAfcGateData.fulfilled, (state, action) => {
        state.loading.add = false;
        state.isSuccess.add = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addAfcGateData.rejected, (state, action) => {
        state.loading.add = false;
        state.error.add = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editAfcGateData.pending, (state) => {
        state.loading.edit = true;
        state.error.edit = null;
      })
      .addCase(editAfcGateData.fulfilled, (state, action) => {
        state.loading.edit = false;
        state.isSuccess.edit = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editAfcGateData.rejected, (state, action) => {
        state.loading.edit = false;
        state.error.edit = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(saveAfcGateData.pending, (state) => {
        state.loading.save = true;
        state.error.save = null;
      })
      .addCase(saveAfcGateData.fulfilled, (state, action) => {
        state.loading.save = false;
        state.isSuccess.save = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(saveAfcGateData.rejected, (state, action) => {
        state.loading.save = false;
        state.error.save = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchAfcGateMaintenanceData.pending, (state) => {
        state.loading.maintenance = true;
        state.error.maintenance = null;
      })
      .addCase(fetchAfcGateMaintenanceData.fulfilled, (state, action) => {
        state.loading.maintenance = false;
        state.maintenanceData = action.payload;
        state.error.maintenance = null;
      })
      .addCase(fetchAfcGateMaintenanceData.rejected, (state, action) => {
        state.loading.maintenance = false;
        state.maintenanceData = [];
        state.error.maintenance = action.error.message;
      })

      .addCase(addAfcGateMaintenanceData.pending, (state) => {
        state.loading.maintenance = true;
        state.error.maintenance = null;
      })
      .addCase(addAfcGateMaintenanceData.fulfilled, (state, action) => {
        state.loading.maintenance = false;
        state.isSuccess.maintenance = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addAfcGateMaintenanceData.rejected, (state, action) => {
        state.loading.maintenance = false;
        state.error.maintenance = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editAfcGateMaintenanceData.pending, (state) => {
        state.loading.maintenance = true;
        state.error.maintenance = null;
      })
      .addCase(editAfcGateMaintenanceData.fulfilled, (state, action) => {
        state.loading.maintenance = false;
        state.isSuccess.maintenance = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editAfcGateMaintenanceData.rejected, (state, action) => {
        state.loading.maintenance = false;
        state.error.maintenance = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchAfcMonthlyData.pending, (state) => {
        state.loading.monthly = true;
        state.error.monthly = null;
      })
      .addCase(fetchAfcMonthlyData.fulfilled, (state, action) => {
        state.loading.monthly = false;
        state.monthlyData = action.payload;
        state.error.monthly = null;
      })
      .addCase(fetchAfcMonthlyData.rejected, (state, action) => {
        state.loading.monthly = false;
        state.monthlyData = [];
        state.error.monthly = action.error.message;
      })

      .addCase(addAfcMonthlyData.pending, (state) => {
        state.loading.monthly = true;
        state.error.monthly = null;
      })
      .addCase(addAfcMonthlyData.fulfilled, (state, action) => {
        state.loading.monthly = false;
        state.isSuccess.monthly = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addAfcMonthlyData.rejected, (state, action) => {
        state.loading.monthly = false;
        state.error.monthly = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editAfcMonthlyData.pending, (state) => {
        state.loading.monthly = true;
        state.error.monthly = null;
      })
      .addCase(editAfcMonthlyData.fulfilled, (state, action) => {
        state.loading.monthly = false;
        state.isSuccess.monthly = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editAfcMonthlyData.rejected, (state, action) => {
        state.loading.monthly = false;
        state.error.monthly = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchAfcPreventiveData.pending, (state) => {
        state.loading.preventive = true;
        state.error.preventive = null;
      })
      .addCase(fetchAfcPreventiveData.fulfilled, (state, action) => {
        state.loading.preventive = false;
        state.preventiveData = action.payload;
        state.error.preventive = null;
      })
      .addCase(fetchAfcPreventiveData.rejected, (state, action) => {
        state.loading.preventive = false;
        state.preventiveData = [];
        state.error.preventive = action.error.message;
      })

      .addCase(addAfcPreventiveData.pending, (state) => {
        state.loading.preventive = true;
        state.error.preventive = null;
      })
      .addCase(addAfcPreventiveData.fulfilled, (state, action) => {
        state.loading.preventive = false;
        state.isSuccess.preventive = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addAfcPreventiveData.rejected, (state, action) => {
        state.loading.preventive = false;
        state.error.preventive = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editAfcPreventiveData.pending, (state) => {
        state.loading.preventive = true;
        state.error.preventive = null;
      })
      .addCase(editAfcPreventiveData.fulfilled, (state, action) => {
        state.loading.preventive = false;
        state.isSuccess.preventive = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editAfcPreventiveData.rejected, (state, action) => {
        state.loading.preventive = false;
        state.error.preventive = action.error.message;
        showToastOnce(action.error.message, 'error');
      });
  },
});

export const selectAfcGateData = (state) => state.afcGate.gateData;
export const selectAfcMaintenanceData = (state) => state.afcGate.maintenanceData;
export const selectAfcMonthlyData = (state) => state.afcGate.monthlyData;
export const selectAfcPreventiveData = (state) => state.afcGate.preventiveData;
export const selectAfcGateLoading = (state) => state.afcGate.loading;
export const selectAfcGateError = (state) => state.afcGate.error;
export const selectAfcGateSuccess = (state) => state.afcGate.isSuccess;
export const selectAfcGateAnalytics = (state) => state.afcGate.analytics;

export const selectAfcGateStats = createSelector(
  [selectAfcGateData, selectAfcMaintenanceData, selectAfcMonthlyData, selectAfcPreventiveData],
  (gateData, maintenanceData, monthlyData, preventiveData) => ({
    totalGates: gateData.length || 0,
    activeMaintenanceJobs: maintenanceData.filter(item => item.status !== 'completed').length || 0,
    monthlyTasksCompleted: monthlyData.filter(item => item.completion_status === 'completed').length || 0,
    preventiveTasksPending: preventiveData.filter(item => item.task_status === 'pending').length || 0,
    overallCompletionRate: ((monthlyData.filter(item => item.completion_status === 'completed').length + 
                             preventiveData.filter(item => item.task_status === 'completed').length) / 
                            (monthlyData.length + preventiveData.length) * 100) || 0,
  })
);

export const { clearAfcGateState, updateAfcGateAnalytics } = afcGateSlice.actions;
export default afcGateSlice.reducer;