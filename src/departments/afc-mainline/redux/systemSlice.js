import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { operationService } from '../../../shared/api';
import { showToastOnce } from '../../../component/toastUtils';
import { validateFieldMapping } from '../../../utils/databaseFieldMapper';

const getUserData = () => {
  const userData = localStorage.getItem('userdata');
  return userData ? JSON.parse(userData) : {};
};

export const fetchSystemData = createAsyncThunk(
  'afcSystem/fetchData',
  async (formType) => {
    return operationService.viewData(formType);
  }
);

export const addSystemData = createAsyncThunk(
  'afcSystem/addData',
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

export const editSystemData = createAsyncThunk(
  'afcSystem/editData',
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

export const saveSystemData = createAsyncThunk(
  'afcSystem/saveData',
  async ({ id, formType }) => {
    return operationService.editData({
      formType,
      status: '1',
      update_id: id,
    });
  }
);

export const fetchEquipmentStatusData = createAsyncThunk(
  'afcSystem/fetchEquipmentStatusData',
  async () => {
    return operationService.viewData('afc-equipment-status');
  }
);

export const addEquipmentStatusData = createAsyncThunk(
  'afcSystem/addEquipmentStatusData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      equipment_id: values.equipmentId,
      equipment_type: values.equipmentType,
      location: values.location,
      status: values.status,
      last_maintenance: values.lastMaintenance,
      next_maintenance: values.nextMaintenance,
      operating_hours: values.operatingHours,
      fault_history: values.faultHistory,
      firmware_version: values.firmwareVersion,
      installation_date: values.installationDate,
      warranty_expiry: values.warrantyExpiry,
      vendor: values.vendor,
      model_number: values.modelNumber,
      serial_number: values.serialNumber,
      configuration: values.configuration,
      performance_metrics: values.performanceMetrics,
      energy_consumption: values.energyConsumption,
      temperature_status: values.temperatureStatus,
      connectivity_status: values.connectivityStatus,
      error_logs: values.errorLogs,
      maintenance_notes: values.maintenanceNotes,
      technician_assigned: values.technicianAssigned,
      priority_level: values.priorityLevel,
      formType: 'afc-equipment-status',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editEquipmentStatusData = createAsyncThunk(
  'afcSystem/editEquipmentStatusData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      equipment_id: values.equipmentId,
      equipment_type: values.equipmentType,
      location: values.location,
      status: values.status,
      last_maintenance: values.lastMaintenance,
      next_maintenance: values.nextMaintenance,
      operating_hours: values.operatingHours,
      fault_history: values.faultHistory,
      firmware_version: values.firmwareVersion,
      installation_date: values.installationDate,
      warranty_expiry: values.warrantyExpiry,
      vendor: values.vendor,
      model_number: values.modelNumber,
      serial_number: values.serialNumber,
      configuration: values.configuration,
      performance_metrics: values.performanceMetrics,
      energy_consumption: values.energyConsumption,
      temperature_status: values.temperatureStatus,
      connectivity_status: values.connectivityStatus,
      error_logs: values.errorLogs,
      maintenance_notes: values.maintenanceNotes,
      technician_assigned: values.technicianAssigned,
      priority_level: values.priorityLevel,
      formType: 'afc-equipment-status',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

export const fetchSystemConfigData = createAsyncThunk(
  'afcSystem/fetchSystemConfigData',
  async () => {
    return operationService.viewData('afc-system-configuration');
  }
);

export const addSystemConfigData = createAsyncThunk(
  'afcSystem/addSystemConfigData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      config_name: values.configName,
      config_type: values.configType,
      config_value: values.configValue,
      description: values.description,
      last_updated: values.lastUpdated,
      updated_by: values.updatedBy,
      version: values.version,
      environment: values.environment,
      is_active: values.isActive,
      backup_config: values.backupConfig,
      rollback_available: values.rollbackAvailable,
      change_reason: values.changeReason,
      approval_status: values.approvalStatus,
      approved_by: values.approvedBy,
      implementation_date: values.implementationDate,
      testing_notes: values.testingNotes,
      impact_assessment: values.impactAssessment,
      dependencies: values.dependencies,
      validation_rules: values.validationRules,
      security_level: values.securityLevel,
      formType: 'afc-system-configuration',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editSystemConfigData = createAsyncThunk(
  'afcSystem/editSystemConfigData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      config_name: values.configName,
      config_type: values.configType,
      config_value: values.configValue,
      description: values.description,
      last_updated: values.lastUpdated,
      updated_by: values.updatedBy,
      version: values.version,
      environment: values.environment,
      is_active: values.isActive,
      backup_config: values.backupConfig,
      rollback_available: values.rollbackAvailable,
      change_reason: values.changeReason,
      approval_status: values.approvalStatus,
      approved_by: values.approvedBy,
      implementation_date: values.implementationDate,
      testing_notes: values.testingNotes,
      impact_assessment: values.impactAssessment,
      dependencies: values.dependencies,
      validation_rules: values.validationRules,
      security_level: values.securityLevel,
      formType: 'afc-system-configuration',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

export const fetchAlarmLogData = createAsyncThunk(
  'afcSystem/fetchAlarmLogData',
  async () => {
    return operationService.viewData('afc-alarm-log');
  }
);

export const addAlarmLogData = createAsyncThunk(
  'afcSystem/addAlarmLogData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      alarm_id: values.alarmId,
      alarm_type: values.alarmType,
      severity: values.severity,
      equipment_id: values.equipmentId,
      location: values.location,
      alarm_time: values.alarmTime,
      description: values.description,
      acknowledged_by: values.acknowledgedBy,
      acknowledgment_time: values.acknowledgmentTime,
      resolved_by: values.resolvedBy,
      resolution_time: values.resolutionTime,
      resolution_notes: values.resolutionNotes,
      status: values.status,
      escalation_level: values.escalationLevel,
      impact_level: values.impactLevel,
      root_cause: values.rootCause,
      preventive_action: values.preventiveAction,
      follow_up_required: values.followUpRequired,
      related_alarms: values.relatedAlarms,
      system_response: values.systemResponse,
      manual_intervention: values.manualIntervention,
      downtime_duration: values.downtimeDuration,
      service_affected: values.serviceAffected,
      formType: 'afc-alarm-log',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editAlarmLogData = createAsyncThunk(
  'afcSystem/editAlarmLogData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      alarm_id: values.alarmId,
      alarm_type: values.alarmType,
      severity: values.severity,
      equipment_id: values.equipmentId,
      location: values.location,
      alarm_time: values.alarmTime,
      description: values.description,
      acknowledged_by: values.acknowledgedBy,
      acknowledgment_time: values.acknowledgmentTime,
      resolved_by: values.resolvedBy,
      resolution_time: values.resolutionTime,
      resolution_notes: values.resolutionNotes,
      status: values.status,
      escalation_level: values.escalationLevel,
      impact_level: values.impactLevel,
      root_cause: values.rootCause,
      preventive_action: values.preventiveAction,
      follow_up_required: values.followUpRequired,
      related_alarms: values.relatedAlarms,
      system_response: values.systemResponse,
      manual_intervention: values.manualIntervention,
      downtime_duration: values.downtimeDuration,
      service_affected: values.serviceAffected,
      formType: 'afc-alarm-log',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

export const fetchPerformanceData = createAsyncThunk(
  'afcSystem/fetchPerformanceData',
  async () => {
    return operationService.viewData('afc-performance-monitoring');
  }
);

export const addPerformanceData = createAsyncThunk(
  'afcSystem/addPerformanceData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      monitoring_date: values.monitoringDate,
      system_component: values.systemComponent,
      performance_metric: values.performanceMetric,
      measured_value: values.measuredValue,
      threshold_value: values.thresholdValue,
      unit_of_measure: values.unitOfMeasure,
      status: values.status,
      trend_analysis: values.trendAnalysis,
      baseline_value: values.baselineValue,
      variance_percentage: values.variancePercentage,
      measurement_method: values.measurementMethod,
      sampling_interval: values.samplingInterval,
      data_quality: values.dataQuality,
      environmental_factors: values.environmentalFactors,
      load_conditions: values.loadConditions,
      configuration_impact: values.configurationImpact,
      optimization_suggestions: values.optimizationSuggestions,
      maintenance_correlation: values.maintenanceCorrelation,
      historical_comparison: values.historicalComparison,
      automated_response: values.automatedResponse,
      manual_adjustments: values.manualAdjustments,
      reporting_frequency: values.reportingFrequency,
      formType: 'afc-performance-monitoring',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editPerformanceData = createAsyncThunk(
  'afcSystem/editPerformanceData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      monitoring_date: values.monitoringDate,
      system_component: values.systemComponent,
      performance_metric: values.performanceMetric,
      measured_value: values.measuredValue,
      threshold_value: values.thresholdValue,
      unit_of_measure: values.unitOfMeasure,
      status: values.status,
      trend_analysis: values.trendAnalysis,
      baseline_value: values.baselineValue,
      variance_percentage: values.variancePercentage,
      measurement_method: values.measurementMethod,
      sampling_interval: values.samplingInterval,
      data_quality: values.dataQuality,
      environmental_factors: values.environmentalFactors,
      load_conditions: values.loadConditions,
      configuration_impact: values.configurationImpact,
      optimization_suggestions: values.optimizationSuggestions,
      maintenance_correlation: values.maintenanceCorrelation,
      historical_comparison: values.historicalComparison,
      automated_response: values.automatedResponse,
      manual_adjustments: values.manualAdjustments,
      reporting_frequency: values.reportingFrequency,
      formType: 'afc-performance-monitoring',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

const afcSystemSlice = createSlice({
  name: 'afcSystem',
  initialState: {
    systemData: [],
    equipmentStatusData: [],
    systemConfigData: [],
    alarmLogData: [],
    performanceData: [],
    loading: {
      fetch: false,
      add: false,
      edit: false,
      save: false,
      equipmentStatus: false,
      systemConfig: false,
      alarmLog: false,
      performance: false,
    },
    error: {
      fetch: null,
      add: null,
      edit: null,
      save: null,
      equipmentStatus: null,
      systemConfig: null,
      alarmLog: null,
      performance: null,
    },
    isSuccess: {
      add: null,
      edit: null,
      save: null,
      equipmentStatus: null,
      systemConfig: null,
      alarmLog: null,
      performance: null,
    },
    analytics: {
      totalEquipment: 0,
      activeAlarms: 0,
      systemUptime: 0,
      performanceScore: 0,
      maintenanceDue: 0,
      configChanges: 0,
    },
  },
  reducers: {
    clearSystemState: (state) => {
      state.error = {
        fetch: null,
        add: null,
        edit: null,
        save: null,
        equipmentStatus: null,
        systemConfig: null,
        alarmLog: null,
        performance: null,
      };
      state.isSuccess = {
        add: null,
        edit: null,
        save: null,
        equipmentStatus: null,
        systemConfig: null,
        alarmLog: null,
        performance: null,
      };
    },
    updateSystemAnalytics: (state) => {
      const totalEquipment = state.equipmentStatusData.length || 0;
      const activeAlarms = state.alarmLogData.filter(alarm => alarm.status === 'active').length || 0;
      const operationalEquipment = state.equipmentStatusData.filter(eq => eq.status === 'operational').length || 0;
      const maintenanceDue = state.equipmentStatusData.filter(eq => {
        const nextMaintenance = new Date(eq.next_maintenance);
        const today = new Date();
        return nextMaintenance <= today;
      }).length || 0;
      const configChanges = state.systemConfigData.filter(config => {
        const lastUpdated = new Date(config.last_updated);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return lastUpdated >= thirtyDaysAgo;
      }).length || 0;
      
      state.analytics = {
        totalEquipment,
        activeAlarms,
        systemUptime: totalEquipment > 0 ? (operationalEquipment / totalEquipment * 100) : 0,
        performanceScore: state.performanceData.length > 0 ? 
          state.performanceData.reduce((avg, perf) => avg + (parseFloat(perf.measured_value) || 0), 0) / state.performanceData.length : 0,
        maintenanceDue,
        configChanges,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemData.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchSystemData.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.systemData = action.payload;
        state.error.fetch = null;
      })
      .addCase(fetchSystemData.rejected, (state, action) => {
        state.loading.fetch = false;
        state.systemData = [];
        state.error.fetch = action.error.message;
      })

      .addCase(addSystemData.pending, (state) => {
        state.loading.add = true;
        state.error.add = null;
      })
      .addCase(addSystemData.fulfilled, (state, action) => {
        state.loading.add = false;
        state.isSuccess.add = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addSystemData.rejected, (state, action) => {
        state.loading.add = false;
        state.error.add = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editSystemData.pending, (state) => {
        state.loading.edit = true;
        state.error.edit = null;
      })
      .addCase(editSystemData.fulfilled, (state, action) => {
        state.loading.edit = false;
        state.isSuccess.edit = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editSystemData.rejected, (state, action) => {
        state.loading.edit = false;
        state.error.edit = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(saveSystemData.pending, (state) => {
        state.loading.save = true;
        state.error.save = null;
      })
      .addCase(saveSystemData.fulfilled, (state, action) => {
        state.loading.save = false;
        state.isSuccess.save = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(saveSystemData.rejected, (state, action) => {
        state.loading.save = false;
        state.error.save = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchEquipmentStatusData.pending, (state) => {
        state.loading.equipmentStatus = true;
        state.error.equipmentStatus = null;
      })
      .addCase(fetchEquipmentStatusData.fulfilled, (state, action) => {
        state.loading.equipmentStatus = false;
        state.equipmentStatusData = action.payload;
        state.error.equipmentStatus = null;
      })
      .addCase(fetchEquipmentStatusData.rejected, (state, action) => {
        state.loading.equipmentStatus = false;
        state.equipmentStatusData = [];
        state.error.equipmentStatus = action.error.message;
      })

      .addCase(addEquipmentStatusData.pending, (state) => {
        state.loading.equipmentStatus = true;
        state.error.equipmentStatus = null;
      })
      .addCase(addEquipmentStatusData.fulfilled, (state, action) => {
        state.loading.equipmentStatus = false;
        state.isSuccess.equipmentStatus = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addEquipmentStatusData.rejected, (state, action) => {
        state.loading.equipmentStatus = false;
        state.error.equipmentStatus = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editEquipmentStatusData.pending, (state) => {
        state.loading.equipmentStatus = true;
        state.error.equipmentStatus = null;
      })
      .addCase(editEquipmentStatusData.fulfilled, (state, action) => {
        state.loading.equipmentStatus = false;
        state.isSuccess.equipmentStatus = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editEquipmentStatusData.rejected, (state, action) => {
        state.loading.equipmentStatus = false;
        state.error.equipmentStatus = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchSystemConfigData.pending, (state) => {
        state.loading.systemConfig = true;
        state.error.systemConfig = null;
      })
      .addCase(fetchSystemConfigData.fulfilled, (state, action) => {
        state.loading.systemConfig = false;
        state.systemConfigData = action.payload;
        state.error.systemConfig = null;
      })
      .addCase(fetchSystemConfigData.rejected, (state, action) => {
        state.loading.systemConfig = false;
        state.systemConfigData = [];
        state.error.systemConfig = action.error.message;
      })

      .addCase(addSystemConfigData.pending, (state) => {
        state.loading.systemConfig = true;
        state.error.systemConfig = null;
      })
      .addCase(addSystemConfigData.fulfilled, (state, action) => {
        state.loading.systemConfig = false;
        state.isSuccess.systemConfig = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addSystemConfigData.rejected, (state, action) => {
        state.loading.systemConfig = false;
        state.error.systemConfig = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editSystemConfigData.pending, (state) => {
        state.loading.systemConfig = true;
        state.error.systemConfig = null;
      })
      .addCase(editSystemConfigData.fulfilled, (state, action) => {
        state.loading.systemConfig = false;
        state.isSuccess.systemConfig = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editSystemConfigData.rejected, (state, action) => {
        state.loading.systemConfig = false;
        state.error.systemConfig = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchAlarmLogData.pending, (state) => {
        state.loading.alarmLog = true;
        state.error.alarmLog = null;
      })
      .addCase(fetchAlarmLogData.fulfilled, (state, action) => {
        state.loading.alarmLog = false;
        state.alarmLogData = action.payload;
        state.error.alarmLog = null;
      })
      .addCase(fetchAlarmLogData.rejected, (state, action) => {
        state.loading.alarmLog = false;
        state.alarmLogData = [];
        state.error.alarmLog = action.error.message;
      })

      .addCase(addAlarmLogData.pending, (state) => {
        state.loading.alarmLog = true;
        state.error.alarmLog = null;
      })
      .addCase(addAlarmLogData.fulfilled, (state, action) => {
        state.loading.alarmLog = false;
        state.isSuccess.alarmLog = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addAlarmLogData.rejected, (state, action) => {
        state.loading.alarmLog = false;
        state.error.alarmLog = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editAlarmLogData.pending, (state) => {
        state.loading.alarmLog = true;
        state.error.alarmLog = null;
      })
      .addCase(editAlarmLogData.fulfilled, (state, action) => {
        state.loading.alarmLog = false;
        state.isSuccess.alarmLog = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editAlarmLogData.rejected, (state, action) => {
        state.loading.alarmLog = false;
        state.error.alarmLog = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchPerformanceData.pending, (state) => {
        state.loading.performance = true;
        state.error.performance = null;
      })
      .addCase(fetchPerformanceData.fulfilled, (state, action) => {
        state.loading.performance = false;
        state.performanceData = action.payload;
        state.error.performance = null;
      })
      .addCase(fetchPerformanceData.rejected, (state, action) => {
        state.loading.performance = false;
        state.performanceData = [];
        state.error.performance = action.error.message;
      })

      .addCase(addPerformanceData.pending, (state) => {
        state.loading.performance = true;
        state.error.performance = null;
      })
      .addCase(addPerformanceData.fulfilled, (state, action) => {
        state.loading.performance = false;
        state.isSuccess.performance = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addPerformanceData.rejected, (state, action) => {
        state.loading.performance = false;
        state.error.performance = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editPerformanceData.pending, (state) => {
        state.loading.performance = true;
        state.error.performance = null;
      })
      .addCase(editPerformanceData.fulfilled, (state, action) => {
        state.loading.performance = false;
        state.isSuccess.performance = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editPerformanceData.rejected, (state, action) => {
        state.loading.performance = false;
        state.error.performance = action.error.message;
        showToastOnce(action.error.message, 'error');
      });
  },
});

export const selectSystemData = (state) => state.afcSystem.systemData;
export const selectEquipmentStatusData = (state) => state.afcSystem.equipmentStatusData;
export const selectSystemConfigData = (state) => state.afcSystem.systemConfigData;
export const selectAlarmLogData = (state) => state.afcSystem.alarmLogData;
export const selectPerformanceData = (state) => state.afcSystem.performanceData;
export const selectSystemLoading = (state) => state.afcSystem.loading;
export const selectSystemError = (state) => state.afcSystem.error;
export const selectSystemSuccess = (state) => state.afcSystem.isSuccess;
export const selectSystemAnalytics = (state) => state.afcSystem.analytics;

export const selectSystemHealthSummary = createSelector(
  [selectEquipmentStatusData, selectAlarmLogData, selectPerformanceData],
  (equipmentData, alarmData, performanceData) => {
    const totalEquipment = equipmentData.length || 0;
    const operationalEquipment = equipmentData.filter(eq => eq.status === 'operational').length || 0;
    const criticalAlarms = alarmData.filter(alarm => alarm.severity === 'critical' && alarm.status === 'active').length || 0;
    const avgPerformance = performanceData.length > 0 ? 
      performanceData.reduce((avg, perf) => avg + (parseFloat(perf.measured_value) || 0), 0) / performanceData.length : 0;
    
    return {
      systemUptime: totalEquipment > 0 ? (operationalEquipment / totalEquipment * 100) : 0,
      equipmentOperational: operationalEquipment,
      totalEquipment,
      criticalAlarms,
      overallHealth: criticalAlarms === 0 && operationalEquipment === totalEquipment ? 'Excellent' :
                    criticalAlarms === 0 && operationalEquipment >= totalEquipment * 0.9 ? 'Good' :
                    criticalAlarms <= 2 && operationalEquipment >= totalEquipment * 0.8 ? 'Fair' : 'Poor',
      performanceScore: avgPerformance,
    };
  }
);

export const selectMaintenanceDashboard = createSelector(
  [selectEquipmentStatusData],
  (equipmentData) => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);
    
    const overdueMaintenance = equipmentData.filter(eq => {
      const nextMaintenance = new Date(eq.next_maintenance);
      return nextMaintenance < today;
    });
    
    const dueSoon = equipmentData.filter(eq => {
      const nextMaintenance = new Date(eq.next_maintenance);
      return nextMaintenance >= today && nextMaintenance <= nextWeek;
    });
    
    const dueThisMonth = equipmentData.filter(eq => {
      const nextMaintenance = new Date(eq.next_maintenance);
      return nextMaintenance >= nextWeek && nextMaintenance <= nextMonth;
    });
    
    return {
      overdueMaintenance: overdueMaintenance.length,
      dueSoon: dueSoon.length,
      dueThisMonth: dueThisMonth.length,
      overdueItems: overdueMaintenance,
      dueSoonItems: dueSoon,
      dueThisMonthItems: dueThisMonth,
    };
  }
);

export const { clearSystemState, updateSystemAnalytics } = afcSystemSlice.actions;
export default afcSystemSlice.reducer;