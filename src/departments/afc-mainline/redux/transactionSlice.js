import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { operationService } from '../../../shared/api';
import { showToastOnce } from '../../../component/toastUtils';
import { validateFieldMapping } from '../../../utils/databaseFieldMapper';

const getUserData = () => {
  const userData = localStorage.getItem('userdata');
  return userData ? JSON.parse(userData) : {};
};

export const fetchTransactionData = createAsyncThunk(
  'afcTransaction/fetchData',
  async (formType) => {
    return operationService.viewData(formType);
  }
);

export const addTransactionData = createAsyncThunk(
  'afcTransaction/addData',
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

export const editTransactionData = createAsyncThunk(
  'afcTransaction/editData',
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

export const saveTransactionData = createAsyncThunk(
  'afcTransaction/saveData',
  async ({ id, formType }) => {
    return operationService.editData({
      formType,
      status: '1',
      update_id: id,
    });
  }
);

export const fetchRevenueData = createAsyncThunk(
  'afcTransaction/fetchRevenueData',
  async () => {
    return operationService.viewData('afc-revenue-collection');
  }
);

export const addRevenueData = createAsyncThunk(
  'afcTransaction/addRevenueData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      station_name: values.station,
      collection_date: values.date,
      shift_time: values.shift,
      total_tokens: values.totalTokens,
      token_value: values.tokenValue,
      total_revenue: values.totalRevenue,
      cash_collected: values.cashCollected,
      card_transactions: values.cardTransactions,
      staff_name: values.staffName,
      staff_id: values.staffId,
      supervisor_name: values.supervisorName,
      supervisor_sign: values.supervisorSign,
      remarks: values.remarks,
      formType: 'afc-revenue-collection',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editRevenueData = createAsyncThunk(
  'afcTransaction/editRevenueData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      station_name: values.station,
      collection_date: values.date,
      shift_time: values.shift,
      total_tokens: values.totalTokens,
      token_value: values.tokenValue,
      total_revenue: values.totalRevenue,
      cash_collected: values.cashCollected,
      card_transactions: values.cardTransactions,
      staff_name: values.staffName,
      staff_id: values.staffId,
      supervisor_name: values.supervisorName,
      supervisor_sign: values.supervisorSign,
      remarks: values.remarks,
      formType: 'afc-revenue-collection',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

export const fetchTokenIssuanceData = createAsyncThunk(
  'afcTransaction/fetchTokenIssuanceData',
  async () => {
    return operationService.viewData('token-issuance-register');
  }
);

export const addTokenIssuanceData = createAsyncThunk(
  'afcTransaction/addTokenIssuanceData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      issue_date: values.issueDate,
      token_type: values.tokenType,
      quantity_issued: values.quantityIssued,
      unit_price: values.unitPrice,
      total_amount: values.totalAmount,
      issued_to: values.issuedTo,
      purpose: values.purpose,
      authorization_ref: values.authorizationRef,
      issued_by: values.issuedBy,
      received_by: values.receivedBy,
      station_code: values.stationCode,
      shift_details: values.shiftDetails,
      verification_sign: values.verificationSign,
      remarks: values.remarks,
      formType: 'token-issuance-register',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editTokenIssuanceData = createAsyncThunk(
  'afcTransaction/editTokenIssuanceData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      issue_date: values.issueDate,
      token_type: values.tokenType,
      quantity_issued: values.quantityIssued,
      unit_price: values.unitPrice,
      total_amount: values.totalAmount,
      issued_to: values.issuedTo,
      purpose: values.purpose,
      authorization_ref: values.authorizationRef,
      issued_by: values.issuedBy,
      received_by: values.receivedBy,
      station_code: values.stationCode,
      shift_details: values.shiftDetails,
      verification_sign: values.verificationSign,
      remarks: values.remarks,
      formType: 'token-issuance-register',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

export const fetchCashCountData = createAsyncThunk(
  'afcTransaction/fetchCashCountData',
  async () => {
    return operationService.viewData('cash-counting-register');
  }
);

export const addCashCountData = createAsyncThunk(
  'afcTransaction/addCashCountData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      count_date: values.countDate,
      shift_time: values.shiftTime,
      station_name: values.stationName,
      denomination_2000: values.denomination2000,
      denomination_500: values.denomination500,
      denomination_200: values.denomination200,
      denomination_100: values.denomination100,
      denomination_50: values.denomination50,
      denomination_20: values.denomination20,
      denomination_10: values.denomination10,
      denomination_5: values.denomination5,
      denomination_2: values.denomination2,
      denomination_1: values.denomination1,
      total_cash_counted: values.totalCashCounted,
      system_cash_balance: values.systemCashBalance,
      variance: values.variance,
      counted_by: values.countedBy,
      verified_by: values.verifiedBy,
      supervisor_sign: values.supervisorSign,
      discrepancy_reason: values.discrepancyReason,
      action_taken: values.actionTaken,
      formType: 'cash-counting-register',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editCashCountData = createAsyncThunk(
  'afcTransaction/editCashCountData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      count_date: values.countDate,
      shift_time: values.shiftTime,
      station_name: values.stationName,
      denomination_2000: values.denomination2000,
      denomination_500: values.denomination500,
      denomination_200: values.denomination200,
      denomination_100: values.denomination100,
      denomination_50: values.denomination50,
      denomination_20: values.denomination20,
      denomination_10: values.denomination10,
      denomination_5: values.denomination5,
      denomination_2: values.denomination2,
      denomination_1: values.denomination1,
      total_cash_counted: values.totalCashCounted,
      system_cash_balance: values.systemCashBalance,
      variance: values.variance,
      counted_by: values.countedBy,
      verified_by: values.verifiedBy,
      supervisor_sign: values.supervisorSign,
      discrepancy_reason: values.discrepancyReason,
      action_taken: values.actionTaken,
      formType: 'cash-counting-register',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

export const fetchRefundData = createAsyncThunk(
  'afcTransaction/fetchRefundData',
  async () => {
    return operationService.viewData('refund-transaction-register');
  }
);

export const addRefundData = createAsyncThunk(
  'afcTransaction/addRefundData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      refund_date: values.refundDate,
      ticket_number: values.ticketNumber,
      original_amount: values.originalAmount,
      refund_amount: values.refundAmount,
      refund_reason: values.refundReason,
      passenger_name: values.passengerName,
      passenger_mobile: values.passengerMobile,
      original_journey_date: values.originalJourneyDate,
      from_station: values.fromStation,
      to_station: values.toStation,
      processed_by: values.processedBy,
      authorized_by: values.authorizedBy,
      refund_mode: values.refundMode,
      bank_details: values.bankDetails,
      processing_fee: values.processingFee,
      net_refund: values.netRefund,
      status: values.status,
      remarks: values.remarks,
      formType: 'refund-transaction-register',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.saveData(mappedData);
  }
);

export const editRefundData = createAsyncThunk(
  'afcTransaction/editRefundData',
  async (values) => {
    const user = getUserData();
    const mappedData = validateFieldMapping({
      update_id: values.id,
      refund_date: values.refundDate,
      ticket_number: values.ticketNumber,
      original_amount: values.originalAmount,
      refund_amount: values.refundAmount,
      refund_reason: values.refundReason,
      passenger_name: values.passengerName,
      passenger_mobile: values.passengerMobile,
      original_journey_date: values.originalJourneyDate,
      from_station: values.fromStation,
      to_station: values.toStation,
      processed_by: values.processedBy,
      authorized_by: values.authorizedBy,
      refund_mode: values.refundMode,
      bank_details: values.bankDetails,
      processing_fee: values.processingFee,
      net_refund: values.netRefund,
      status: values.status,
      remarks: values.remarks,
      formType: 'refund-transaction-register',
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    });
    return operationService.editData(mappedData);
  }
);

const afcTransactionSlice = createSlice({
  name: 'afcTransaction',
  initialState: {
    transactionData: [],
    revenueData: [],
    tokenIssuanceData: [],
    cashCountData: [],
    refundData: [],
    loading: {
      fetch: false,
      add: false,
      edit: false,
      save: false,
      revenue: false,
      tokenIssuance: false,
      cashCount: false,
      refund: false,
    },
    error: {
      fetch: null,
      add: null,
      edit: null,
      save: null,
      revenue: null,
      tokenIssuance: null,
      cashCount: null,
      refund: null,
    },
    isSuccess: {
      add: null,
      edit: null,
      save: null,
      revenue: null,
      tokenIssuance: null,
      cashCount: null,
      refund: null,
    },
    analytics: {
      totalRevenue: 0,
      dailyTransactions: 0,
      tokensSold: 0,
      refundsProcessed: 0,
      cashVariances: 0,
      averageTransactionValue: 0,
    },
  },
  reducers: {
    clearTransactionState: (state) => {
      state.error = {
        fetch: null,
        add: null,
        edit: null,
        save: null,
        revenue: null,
        tokenIssuance: null,
        cashCount: null,
        refund: null,
      };
      state.isSuccess = {
        add: null,
        edit: null,
        save: null,
        revenue: null,
        tokenIssuance: null,
        cashCount: null,
        refund: null,
      };
    },
    updateTransactionAnalytics: (state) => {
      const totalRevenue = state.revenueData.reduce((sum, item) => sum + (parseFloat(item.total_revenue) || 0), 0);
      const totalTransactions = state.transactionData.length || 0;
      const totalTokens = state.tokenIssuanceData.reduce((sum, item) => sum + (parseInt(item.quantity_issued) || 0), 0);
      const totalRefunds = state.refundData.length || 0;
      const cashVariances = state.cashCountData.filter(item => Math.abs(parseFloat(item.variance) || 0) > 0).length || 0;
      
      state.analytics = {
        totalRevenue,
        dailyTransactions: totalTransactions,
        tokensSold: totalTokens,
        refundsProcessed: totalRefunds,
        cashVariances,
        averageTransactionValue: totalTransactions > 0 ? totalRevenue / totalTransactions : 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionData.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchTransactionData.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.transactionData = action.payload;
        state.error.fetch = null;
      })
      .addCase(fetchTransactionData.rejected, (state, action) => {
        state.loading.fetch = false;
        state.transactionData = [];
        state.error.fetch = action.error.message;
      })

      .addCase(addTransactionData.pending, (state) => {
        state.loading.add = true;
        state.error.add = null;
      })
      .addCase(addTransactionData.fulfilled, (state, action) => {
        state.loading.add = false;
        state.isSuccess.add = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addTransactionData.rejected, (state, action) => {
        state.loading.add = false;
        state.error.add = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editTransactionData.pending, (state) => {
        state.loading.edit = true;
        state.error.edit = null;
      })
      .addCase(editTransactionData.fulfilled, (state, action) => {
        state.loading.edit = false;
        state.isSuccess.edit = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editTransactionData.rejected, (state, action) => {
        state.loading.edit = false;
        state.error.edit = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(saveTransactionData.pending, (state) => {
        state.loading.save = true;
        state.error.save = null;
      })
      .addCase(saveTransactionData.fulfilled, (state, action) => {
        state.loading.save = false;
        state.isSuccess.save = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(saveTransactionData.rejected, (state, action) => {
        state.loading.save = false;
        state.error.save = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchRevenueData.pending, (state) => {
        state.loading.revenue = true;
        state.error.revenue = null;
      })
      .addCase(fetchRevenueData.fulfilled, (state, action) => {
        state.loading.revenue = false;
        state.revenueData = action.payload;
        state.error.revenue = null;
      })
      .addCase(fetchRevenueData.rejected, (state, action) => {
        state.loading.revenue = false;
        state.revenueData = [];
        state.error.revenue = action.error.message;
      })

      .addCase(addRevenueData.pending, (state) => {
        state.loading.revenue = true;
        state.error.revenue = null;
      })
      .addCase(addRevenueData.fulfilled, (state, action) => {
        state.loading.revenue = false;
        state.isSuccess.revenue = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addRevenueData.rejected, (state, action) => {
        state.loading.revenue = false;
        state.error.revenue = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editRevenueData.pending, (state) => {
        state.loading.revenue = true;
        state.error.revenue = null;
      })
      .addCase(editRevenueData.fulfilled, (state, action) => {
        state.loading.revenue = false;
        state.isSuccess.revenue = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editRevenueData.rejected, (state, action) => {
        state.loading.revenue = false;
        state.error.revenue = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchTokenIssuanceData.pending, (state) => {
        state.loading.tokenIssuance = true;
        state.error.tokenIssuance = null;
      })
      .addCase(fetchTokenIssuanceData.fulfilled, (state, action) => {
        state.loading.tokenIssuance = false;
        state.tokenIssuanceData = action.payload;
        state.error.tokenIssuance = null;
      })
      .addCase(fetchTokenIssuanceData.rejected, (state, action) => {
        state.loading.tokenIssuance = false;
        state.tokenIssuanceData = [];
        state.error.tokenIssuance = action.error.message;
      })

      .addCase(addTokenIssuanceData.pending, (state) => {
        state.loading.tokenIssuance = true;
        state.error.tokenIssuance = null;
      })
      .addCase(addTokenIssuanceData.fulfilled, (state, action) => {
        state.loading.tokenIssuance = false;
        state.isSuccess.tokenIssuance = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addTokenIssuanceData.rejected, (state, action) => {
        state.loading.tokenIssuance = false;
        state.error.tokenIssuance = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editTokenIssuanceData.pending, (state) => {
        state.loading.tokenIssuance = true;
        state.error.tokenIssuance = null;
      })
      .addCase(editTokenIssuanceData.fulfilled, (state, action) => {
        state.loading.tokenIssuance = false;
        state.isSuccess.tokenIssuance = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editTokenIssuanceData.rejected, (state, action) => {
        state.loading.tokenIssuance = false;
        state.error.tokenIssuance = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchCashCountData.pending, (state) => {
        state.loading.cashCount = true;
        state.error.cashCount = null;
      })
      .addCase(fetchCashCountData.fulfilled, (state, action) => {
        state.loading.cashCount = false;
        state.cashCountData = action.payload;
        state.error.cashCount = null;
      })
      .addCase(fetchCashCountData.rejected, (state, action) => {
        state.loading.cashCount = false;
        state.cashCountData = [];
        state.error.cashCount = action.error.message;
      })

      .addCase(addCashCountData.pending, (state) => {
        state.loading.cashCount = true;
        state.error.cashCount = null;
      })
      .addCase(addCashCountData.fulfilled, (state, action) => {
        state.loading.cashCount = false;
        state.isSuccess.cashCount = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addCashCountData.rejected, (state, action) => {
        state.loading.cashCount = false;
        state.error.cashCount = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editCashCountData.pending, (state) => {
        state.loading.cashCount = true;
        state.error.cashCount = null;
      })
      .addCase(editCashCountData.fulfilled, (state, action) => {
        state.loading.cashCount = false;
        state.isSuccess.cashCount = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editCashCountData.rejected, (state, action) => {
        state.loading.cashCount = false;
        state.error.cashCount = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(fetchRefundData.pending, (state) => {
        state.loading.refund = true;
        state.error.refund = null;
      })
      .addCase(fetchRefundData.fulfilled, (state, action) => {
        state.loading.refund = false;
        state.refundData = action.payload;
        state.error.refund = null;
      })
      .addCase(fetchRefundData.rejected, (state, action) => {
        state.loading.refund = false;
        state.refundData = [];
        state.error.refund = action.error.message;
      })

      .addCase(addRefundData.pending, (state) => {
        state.loading.refund = true;
        state.error.refund = null;
      })
      .addCase(addRefundData.fulfilled, (state, action) => {
        state.loading.refund = false;
        state.isSuccess.refund = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addRefundData.rejected, (state, action) => {
        state.loading.refund = false;
        state.error.refund = action.error.message;
        showToastOnce(action.error.message, 'error');
      })

      .addCase(editRefundData.pending, (state) => {
        state.loading.refund = true;
        state.error.refund = null;
      })
      .addCase(editRefundData.fulfilled, (state, action) => {
        state.loading.refund = false;
        state.isSuccess.refund = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(editRefundData.rejected, (state, action) => {
        state.loading.refund = false;
        state.error.refund = action.error.message;
        showToastOnce(action.error.message, 'error');
      });
  },
});

export const selectTransactionData = (state) => state.afcTransaction.transactionData;
export const selectRevenueData = (state) => state.afcTransaction.revenueData;
export const selectTokenIssuanceData = (state) => state.afcTransaction.tokenIssuanceData;
export const selectCashCountData = (state) => state.afcTransaction.cashCountData;
export const selectRefundData = (state) => state.afcTransaction.refundData;
export const selectTransactionLoading = (state) => state.afcTransaction.loading;
export const selectTransactionError = (state) => state.afcTransaction.error;
export const selectTransactionSuccess = (state) => state.afcTransaction.isSuccess;
export const selectTransactionAnalytics = (state) => state.afcTransaction.analytics;

export const selectFinancialSummary = createSelector(
  [selectRevenueData, selectTokenIssuanceData, selectRefundData, selectCashCountData],
  (revenueData, tokenData, refundData, cashData) => {
    const totalRevenue = revenueData.reduce((sum, item) => sum + (parseFloat(item.total_revenue) || 0), 0);
    const totalRefunds = refundData.reduce((sum, item) => sum + (parseFloat(item.refund_amount) || 0), 0);
    const totalTokensSold = tokenData.reduce((sum, item) => sum + (parseInt(item.quantity_issued) || 0), 0);
    const cashDiscrepancies = cashData.filter(item => Math.abs(parseFloat(item.variance) || 0) > 0);
    
    return {
      grossRevenue: totalRevenue,
      netRevenue: totalRevenue - totalRefunds,
      totalRefunds,
      tokensSold: totalTokensSold,
      cashDiscrepancies: cashDiscrepancies.length,
      totalCashVariance: cashDiscrepancies.reduce((sum, item) => sum + Math.abs(parseFloat(item.variance) || 0), 0),
      revenueGrowth: 0, // Can be calculated with historical data
      refundRate: totalRevenue > 0 ? (totalRefunds / totalRevenue * 100) : 0,
    };
  }
);

export const selectDailyTransactionSummary = createSelector(
  [selectRevenueData, selectTokenIssuanceData],
  (revenueData, tokenData) => {
    const today = new Date().toISOString().split('T')[0];
    const todayRevenue = revenueData.filter(item => item.collection_date === today);
    const todayTokens = tokenData.filter(item => item.issue_date === today);
    
    return {
      dailyRevenue: todayRevenue.reduce((sum, item) => sum + (parseFloat(item.total_revenue) || 0), 0),
      dailyTokensSold: todayTokens.reduce((sum, item) => sum + (parseInt(item.quantity_issued) || 0), 0),
      dailyTransactions: todayRevenue.length + todayTokens.length,
      averageTransactionValue: todayRevenue.length > 0 
        ? todayRevenue.reduce((sum, item) => sum + (parseFloat(item.total_revenue) || 0), 0) / todayRevenue.length 
        : 0,
    };
  }
);

export const { clearTransactionState, updateTransactionAnalytics } = afcTransactionSlice.actions;
export default afcTransactionSlice.reducer;