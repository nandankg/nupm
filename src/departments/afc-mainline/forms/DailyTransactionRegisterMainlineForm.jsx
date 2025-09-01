import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Chip, 
  Alert, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  AccountBalance as CashIcon,
  Receipt as TransactionIcon,
  Assessment as ReportIcon
} from '@mui/icons-material';

// Import universal components
import { 
  UniversalAFCMainlineFormField, 
  AFCMainlineFormLayout,
  validateForm,
  dailyTransactionRegisterValidation 
} from '../components';

// Import date formatting utilities
import { formatDate, formatTime } from '../../../data/formatDate';

/**
 * Daily Transaction Register Mainline Form - High Complexity AFC Transaction Processing
 * 
 * Form ID: 66 | Slug: daily-transaction-register-mainline
 * Complexity: HIGH - Handles financial transactions, cash reconciliation, multiple transaction types
 * Features: Dynamic transaction entries, real-time calculations, cash balance validation
 */
const DailyTransactionRegisterMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState('daily-transaction-register-mainline');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update time every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  // Initialize form with current date and defaults
  const [formValues, setFormValues] = useState({
    // Basic Information
    stn_name: '',                           // Station name
    date: formatDate(new Date()),           // Transaction date
    shift: '',                              // Shift timing (Morning/Evening/Night)
    operatorName: '',                       // Operator name
    supervisorName: '',                     // Supervisor name
    
    // Opening Balance
    openingCash: 0,                         // Opening cash balance
    openingCards: 0,                        // Opening card inventory
    openingTokens: 0,                       // Opening token inventory
    
    // Transaction Summary
    totalSales: 0,                          // Total sales amount
    totalRefunds: 0,                        // Total refunds amount
    totalPenalties: 0,                      // Total penalty collections
    totalAddValue: 0,                       // Total add-value transactions
    
    // Payment Method Breakdown
    cashSales: 0,                           // Cash payment sales
    cardSales: 0,                           // Card payment sales
    upiSales: 0,                            // UPI payment sales
    onlineSales: 0,                         // Online payment sales
    
    // Transaction Counts
    salesCount: 0,                          // Number of sale transactions
    refundCount: 0,                         // Number of refund transactions
    addValueCount: 0,                       // Number of add-value transactions
    penaltyCount: 0,                        // Number of penalty transactions
    
    // Equipment-wise Breakdown
    tvmTransactions: [],                    // TVM transaction details
    tomTransactions: [],                    // TOM transaction details
    avmTransactions: [],                    // AVM transaction details
    
    // Closing Balance
    closingCash: 0,                         // Closing cash balance
    closingCards: 0,                        // Closing card inventory
    closingTokens: 0,                       // Closing token inventory
    
    // Cash Reconciliation
    expectedCash: 0,                        // Expected cash (calculated)
    actualCash: 0,                          // Actual cash counted
    cashVariance: 0,                        // Difference (actual - expected)
    varianceReason: '',                     // Reason for variance if any
    
    // Equipment Status
    tvmStatus: '',                          // TVM operational status
    tomStatus: '',                          // TOM operational status
    avmStatus: '',                          // AVM operational status
    gateStatus: '',                         // Gate operational status
    
    // Issues and Remarks
    technicalIssues: '',                    // Technical issues faced
    operationalIssues: '',                  // Operational issues
    remarks: '',                            // General remarks
    
    // Verification
    verifiedBy: '',                         // Verified by supervisor
    verificationTime: '',                   // Verification timestamp
    
    // Timestamps
    shiftStartTime: '',                     // Shift start time
    shiftEndTime: formatTime(new Date()),   // Current time as default end
  });

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => {
      const updatedValues = { ...prev, [fieldName]: value };
      
      // Auto-calculate derived fields
      if (fieldName === 'cashSales' || fieldName === 'cardSales' || fieldName === 'upiSales' || fieldName === 'onlineSales') {
        updatedValues.totalSales = (updatedValues.cashSales || 0) + 
                                  (updatedValues.cardSales || 0) + 
                                  (updatedValues.upiSales || 0) + 
                                  (updatedValues.onlineSales || 0);
      }
      
      // Calculate expected cash
      if (fieldName.includes('Cash') || fieldName.includes('Refund') || fieldName.includes('opening')) {
        updatedValues.expectedCash = (updatedValues.openingCash || 0) + 
                                    (updatedValues.cashSales || 0) - 
                                    (updatedValues.totalRefunds || 0);
      }
      
      // Calculate cash variance
      if (fieldName === 'actualCash' || fieldName === 'expectedCash') {
        updatedValues.cashVariance = (updatedValues.actualCash || 0) - (updatedValues.expectedCash || 0);
      }
      
      return updatedValues;
    });
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Add new TVM transaction
  const addTvmTransaction = () => {
    setFormValues(prev => ({
      ...prev,
      tvmTransactions: [
        ...prev.tvmTransactions,
        {
          id: Date.now(),
          tvmNumber: '',
          startReading: 0,
          endReading: 0,
          salesAmount: 0,
          refundAmount: 0,
          transactionCount: 0,
          status: 'OK'
        }
      ]
    }));
  };

  // Remove TVM transaction
  const removeTvmTransaction = (id) => {
    setFormValues(prev => ({
      ...prev,
      tvmTransactions: prev.tvmTransactions.filter(t => t.id !== id)
    }));
  };

  // Update TVM transaction
  const updateTvmTransaction = (id, field, value) => {
    setFormValues(prev => ({
      ...prev,
      tvmTransactions: prev.tvmTransactions.map(t => 
        t.id === id ? { ...t, [field]: value } : t
      )
    }));
  };

  // Get cash balance status
  const getCashBalanceStatus = () => {
    const variance = Math.abs(formValues.cashVariance);
    if (variance === 0) return { status: 'Perfect', color: 'success', icon: '✅' };
    if (variance <= 10) return { status: 'Minor Variance', color: 'warning', icon: '⚠️' };
    return { status: 'Significant Variance', color: 'error', icon: '❌' };
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Final calculations
    const submitData = {
      ...formValues,
      shiftEndTime: formatTime(new Date()),
      submissionTime: new Date().toISOString(),
    };

    // Validate form
    const validation = validateForm(submitData, dailyTransactionRegisterValidation);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    try {
      // Prepare form data for dispatch
      const formData = {
        ...submitData,
        slug: 'daily-transaction-register-mainline',
        formType: 'daily-transaction-register-mainline',
        submittedAt: new Date().toISOString(),
      };

      // Redux dispatch (will be added when reducer is available)
      console.log('Daily Transaction Register submitted:', formData);
      
      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/list/daily-transaction-register-mainline');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save transaction register. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const balanceStatus = getCashBalanceStatus();

  return (
    <AFCMainlineFormLayout
      title="Daily Transaction Register - Mainline"
      onSubmit={handleSubmit}
      loading={loading}
      error={errors.submit}
      success={success}
      formId="AFC-ML-DTR-001"
    >
      <Grid container spacing={3}>
        {/* Header with Live Status */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: '#e8f5e8' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TransactionIcon sx={{ fontSize: 32, color: '#2e7d32' }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    Daily Transaction Processing & Cash Reconciliation
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Real-time transaction monitoring with automatic calculations
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">
                  Current Time: {formatTime(time)}
                </Typography>
                <Chip 
                  label={`Balance: ${balanceStatus.status} ${balanceStatus.icon}`}
                  color={balanceStatus.color}
                  size="small"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Basic Information */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Basic Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="station-name"
            name="stn_name"
            label="Station Name"
            value={formValues.stn_name}
            onChange={handleFieldChange}
            error={errors.stn_name}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="date"
            name="date"
            label="Transaction Date"
            value={formValues.date}
            onChange={handleFieldChange}
            error={errors.date}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="shift"
            label="Shift"
            value={formValues.shift}
            onChange={handleFieldChange}
            error={errors.shift}
            options={['Morning (6:00-14:00)', 'Evening (14:00-22:00)', 'Night (22:00-6:00)']}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="operatorName"
            label="Operator Name"
            value={formValues.operatorName}
            onChange={handleFieldChange}
            error={errors.operatorName}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="supervisorName"
            label="Supervisor Name"
            value={formValues.supervisorName}
            onChange={handleFieldChange}
            error={errors.supervisorName}
            required
          />
        </Grid>

        {/* Opening Balance */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            <CashIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Opening Balance
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="openingCash"
            label="Opening Cash Balance (₹)"
            value={formValues.openingCash}
            onChange={handleFieldChange}
            error={errors.openingCash}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="openingCards"
            label="Opening Card Inventory"
            value={formValues.openingCards}
            onChange={handleFieldChange}
            error={errors.openingCards}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="openingTokens"
            label="Opening Token Inventory"
            value={formValues.openingTokens}
            onChange={handleFieldChange}
            error={errors.openingTokens}
          />
        </Grid>

        {/* Transaction Summary */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            <ReportIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Transaction Summary
          </Typography>
        </Grid>

        {/* Payment Method Breakdown */}
        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="cashSales"
            label="Cash Sales (₹)"
            value={formValues.cashSales}
            onChange={handleFieldChange}
            error={errors.cashSales}
            required
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="cardSales"
            label="Card Sales (₹)"
            value={formValues.cardSales}
            onChange={handleFieldChange}
            error={errors.cardSales}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="upiSales"
            label="UPI Sales (₹)"
            value={formValues.upiSales}
            onChange={handleFieldChange}
            error={errors.upiSales}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="onlineSales"
            label="Online Sales (₹)"
            value={formValues.onlineSales}
            onChange={handleFieldChange}
            error={errors.onlineSales}
          />
        </Grid>

        {/* Auto-calculated totals */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: '#f0f8ff' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1565c0' }}>
              Calculated Totals
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body2" color="text.secondary">Total Sales</Typography>
                <Typography variant="h6" sx={{ color: '#2e7d32' }}>
                  ₹{formValues.totalSales.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="text.secondary">Expected Cash</Typography>
                <Typography variant="h6" sx={{ color: '#ed6c02' }}>
                  ₹{formValues.expectedCash.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="text.secondary">Cash Variance</Typography>
                <Typography variant="h6" sx={{ color: formValues.cashVariance >= 0 ? '#2e7d32' : '#d32f2f' }}>
                  ₹{formValues.cashVariance.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="text.secondary">Balance Status</Typography>
                <Chip 
                  label={balanceStatus.status}
                  color={balanceStatus.color}
                  size="small"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* TVM Transactions Table */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              TVM Transaction Details
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addTvmTransaction}
              size="small"
            >
              Add TVM
            </Button>
          </Box>
          
          {formValues.tvmTransactions.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>TVM #</TableCell>
                    <TableCell>Start Reading</TableCell>
                    <TableCell>End Reading</TableCell>
                    <TableCell>Sales (₹)</TableCell>
                    <TableCell>Refunds (₹)</TableCell>
                    <TableCell>Transactions</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formValues.tvmTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="tvmNumber"
                          value={transaction.tvmNumber}
                          onChange={(field, value) => updateTvmTransaction(transaction.id, 'tvmNumber', value)}
                          size="small"
                          placeholder="TVM-01"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="startReading"
                          value={transaction.startReading}
                          onChange={(field, value) => updateTvmTransaction(transaction.id, 'startReading', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="endReading"
                          value={transaction.endReading}
                          onChange={(field, value) => updateTvmTransaction(transaction.id, 'endReading', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="salesAmount"
                          value={transaction.salesAmount}
                          onChange={(field, value) => updateTvmTransaction(transaction.id, 'salesAmount', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="refundAmount"
                          value={transaction.refundAmount}
                          onChange={(field, value) => updateTvmTransaction(transaction.id, 'refundAmount', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="transactionCount"
                          value={transaction.transactionCount}
                          onChange={(field, value) => updateTvmTransaction(transaction.id, 'transactionCount', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="equipment-status"
                          name="status"
                          value={transaction.status}
                          onChange={(field, value) => updateTvmTransaction(transaction.id, 'status', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => removeTvmTransaction(transaction.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="info">
              No TVM transactions added yet. Click "Add TVM" to start adding transaction details.
            </Alert>
          )}
        </Grid>

        {/* Cash Reconciliation */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Cash Reconciliation
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="number"
            name="actualCash"
            label="Actual Cash Counted (₹)"
            value={formValues.actualCash}
            onChange={handleFieldChange}
            error={errors.actualCash}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="varianceReason"
            label="Variance Reason (if any)"
            value={formValues.varianceReason}
            onChange={handleFieldChange}
            error={errors.varianceReason}
            placeholder="Explain reason for cash variance..."
          />
        </Grid>

        {/* Equipment Status */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Equipment Status
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="tvmStatus"
            label="TVM Status"
            value={formValues.tvmStatus}
            onChange={handleFieldChange}
            error={errors.tvmStatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="tomStatus"
            label="TOM Status"
            value={formValues.tomStatus}
            onChange={handleFieldChange}
            error={errors.tomStatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="avmStatus"
            label="AVM Status"
            value={formValues.avmStatus}
            onChange={handleFieldChange}
            error={errors.avmStatus}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="gateStatus"
            label="Gate Status"
            value={formValues.gateStatus}
            onChange={handleFieldChange}
            error={errors.gateStatus}
            required
          />
        </Grid>

        {/* Issues and Remarks */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Issues & Remarks
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="technicalIssues"
            label="Technical Issues"
            value={formValues.technicalIssues}
            onChange={handleFieldChange}
            error={errors.technicalIssues}
            placeholder="Describe any technical issues encountered during the shift..."
          />
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="textarea"
            name="remarks"
            label="General Remarks"
            value={formValues.remarks}
            onChange={handleFieldChange}
            error={errors.remarks}
            required
            rows={3}
            placeholder="Additional observations and remarks..."
          />
        </Grid>

        {/* Verification */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Verification
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="verifiedBy"
            label="Verified By"
            value={formValues.verifiedBy}
            onChange={handleFieldChange}
            error={errors.verifiedBy}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="time"
            name="verificationTime"
            label="Verification Time"
            value={formValues.verificationTime}
            onChange={handleFieldChange}
            error={errors.verificationTime}
          />
        </Grid>

        {/* Show business rule errors */}
        {errors.transactionBalance && (
          <Grid item xs={12}>
            <Alert severity="error">
              <Typography variant="body2">
                <strong>Cash Balance Error:</strong> {errors.transactionBalance}
              </Typography>
            </Alert>
          </Grid>
        )}
      </Grid>
    </AFCMainlineFormLayout>
  );
};

export default DailyTransactionRegisterMainlineForm;