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
  Inventory as ConsumablesIcon,
  Storage as StockIcon,
  LocalShipping as SupplyIcon
} from '@mui/icons-material';

// Import universal components
import { 
  UniversalAFCMainlineFormField, 
  AFCMainlineFormLayout,
  validateForm,
  simpleAdministrativeValidation 
} from '../components';

// Import date formatting utilities
import { formatDate, formatTime } from '../../../data/formatDate';

/**
 * Consumables Register Mainline Form - Equipment Supplies & Inventory Management
 * 
 * Form ID: 64 | Slug: consumables-register-mainline
 * Complexity: MEDIUM - Handles inventory tracking, supplies management, consumption records
 * Features: Dynamic consumables entries, stock tracking, supplier management, usage analytics
 */
const ConsumablesRegisterMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState('consumables-register-mainline');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update time every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  // Initialize form with current date and defaults
  const [formValues, setFormValues] = useState({
    // Basic Information
    stn_name: '',                           // Station name
    date: formatDate(new Date()),           // Register date
    recordedBy: '',                         // Person recording entries
    supervisorName: '',                     // Supervising officer
    shift: '',                              // Shift during which recorded
    
    // Inventory Summary
    totalConsumables: 0,                    // Total consumable items tracked
    lowStockItems: 0,                       // Items below minimum stock
    outOfStockItems: 0,                     // Items out of stock
    criticalItems: 0,                       // Critical items needing attention
    totalValue: 0,                          // Total inventory value
    
    // Stock Categories
    electronicComponents: 0,                // Electronic components stock
    mechanicalParts: 0,                     // Mechanical parts stock
    cleaningSupplies: 0,                    // Cleaning materials stock
    maintenanceTools: 0,                    // Maintenance tools stock
    safetyEquipment: 0,                     // Safety equipment stock
    stationeryItems: 0,                     // Office supplies stock
    
    // Consumption Tracking
    dailyConsumption: 0,                    // Daily consumption value
    weeklyConsumption: 0,                   // Weekly consumption value
    monthlyConsumption: 0,                  // Monthly consumption value
    consumptionTrend: '',                   // Increasing/Decreasing/Stable
    
    // Consumables Entries Array
    consumableEntries: [],                  // Dynamic array of consumable items
    
    // Supplier Information
    primarySupplier: '',                    // Primary supplier name
    secondarySupplier: '',                  // Secondary supplier name
    emergencySupplier: '',                  // Emergency supplier contact
    lastDeliveryDate: '',                   // Last delivery received
    nextDeliveryDate: '',                   // Next expected delivery
    
    // Quality Control
    qualityCheckRequired: '',               // Quality check requirement
    qualityStandards: '',                   // Quality standards compliance
    rejectedItems: 0,                       // Rejected items count
    qualityIssues: '',                      // Quality-related issues
    
    // Storage Management
    storageLocation: '',                    // Primary storage location
    storageConditions: '',                  // Storage condition requirements
    temperatureControlled: '',              // Temperature control requirement
    securityLevel: '',                      // Storage security level
    accessControl: '',                      // Access control status
    
    // Usage Analytics
    highUsageItems: '',                     // Most frequently used items
    lowUsageItems: '',                      // Least used items
    seasonalVariations: '',                 // Seasonal usage patterns
    usageOptimization: '',                  // Usage optimization suggestions
    
    // Maintenance Schedule
    inventoryAuditDue: '',                  // Next inventory audit date
    stockRotationDue: '',                   // Stock rotation schedule
    expiryCheckDue: '',                     // Expiry check schedule
    reorderSchedule: '',                    // Reorder schedule status
    
    // Financial Management
    budgetAllocation: 0,                    // Budget allocated for consumables
    spentThisMonth: 0,                      // Amount spent this month
    remainingBudget: 0,                     // Remaining budget
    costOptimization: '',                   // Cost optimization measures
    
    // Requests & Orders
    pendingOrders: 0,                       // Pending order count
    urgentRequests: 0,                      // Urgent request count
    approvalsPending: 0,                    // Approvals pending count
    orderStatus: '',                        // Overall order status
    
    // Environmental Impact
    recyclableItems: 0,                     // Recyclable items count
    disposalRequired: 0,                    // Items requiring disposal
    environmentalCompliance: '',            // Environmental compliance status
    wasteManagement: '',                    // Waste management status
    
    // Alerts & Notifications
    reorderAlerts: 0,                       // Reorder alerts count
    expiryAlerts: 0,                        // Expiry alerts count
    qualityAlerts: 0,                       // Quality alerts count
    budgetAlerts: 0,                        // Budget alerts count
    
    // Documentation
    invoicesReceived: '',                   // Invoice documentation status
    warrantyDocuments: '',                  // Warranty documents status
    complianceCertificates: '',             // Compliance certificates status
    auditTrail: '',                         // Audit trail documentation
    
    // Recommendations
    procurementRecommendations: '',         // Procurement recommendations
    storageImprovements: '',                // Storage improvement suggestions
    costSavingOpportunities: '',            // Cost saving opportunities
    processOptimization: '',                // Process optimization suggestions
    
    // Verification
    verifiedBy: '',                         // Verified by senior officer
    approvedBy: '',                         // Final approval
    reviewComments: '',                     // Review comments
    
    // Summary
    overallStatus: '',                      // Overall inventory status
    remarks: '',                           // General remarks
    
    // Timestamps
    recordTime: formatTime(new Date()),     // Record creation time
    lastUpdated: formatTime(new Date()),    // Last update time
  });

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => {
      const updatedValues = { ...prev, [fieldName]: value };
      
      // Auto-calculate remaining budget
      if (fieldName === 'spentThisMonth' || fieldName === 'budgetAllocation') {
        updatedValues.remainingBudget = updatedValues.budgetAllocation - updatedValues.spentThisMonth;
      }
      
      // Calculate total alerts
      const alertFields = ['reorderAlerts', 'expiryAlerts', 'qualityAlerts', 'budgetAlerts'];
      if (alertFields.includes(fieldName)) {
        const totalAlerts = alertFields.reduce((sum, field) => sum + (updatedValues[field] || 0), 0);
        if (totalAlerts > 10) updatedValues.overallStatus = 'Critical';
        else if (totalAlerts > 5) updatedValues.overallStatus = 'Attention Required';
        else updatedValues.overallStatus = 'Good';
      }
      
      // Calculate total consumables from entries
      if (updatedValues.consumableEntries.length > 0) {
        updatedValues.totalConsumables = updatedValues.consumableEntries.length;
        updatedValues.lowStockItems = updatedValues.consumableEntries.filter(entry => 
          parseFloat(entry.currentStock || 0) <= parseFloat(entry.minimumStock || 0)).length;
        updatedValues.outOfStockItems = updatedValues.consumableEntries.filter(entry => 
          parseFloat(entry.currentStock || 0) === 0).length;
        updatedValues.totalValue = updatedValues.consumableEntries.reduce((sum, entry) => 
          sum + (parseFloat(entry.unitPrice || 0) * parseFloat(entry.currentStock || 0)), 0);
      }
      
      return updatedValues;
    });
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Add new consumable entry
  const addConsumableEntry = () => {
    setFormValues(prev => ({
      ...prev,
      consumableEntries: [
        ...prev.consumableEntries,
        {
          id: Date.now(),
          itemCode: `CONS-${Date.now().toString().slice(-6)}`,
          itemName: '',
          category: 'Electronic Components',
          description: '',
          unit: 'Pcs',
          currentStock: 0,
          minimumStock: 0,
          maximumStock: 0,
          unitPrice: 0,
          supplier: '',
          lastPurchaseDate: '',
          expiryDate: '',
          storageLocation: '',
          usageRate: 'Low',
          stockStatus: 'In Stock',
          qualityGrade: 'A',
          remarks: ''
        }
      ]
    }));
  };

  // Remove consumable entry
  const removeConsumableEntry = (id) => {
    setFormValues(prev => ({
      ...prev,
      consumableEntries: prev.consumableEntries.filter(entry => entry.id !== id)
    }));
  };

  // Update consumable entry
  const updateConsumableEntry = (id, field, value) => {
    setFormValues(prev => ({
      ...prev,
      consumableEntries: prev.consumableEntries.map(entry => {
        if (entry.id === id) {
          const updatedEntry = { ...entry, [field]: value };
          
          // Auto-determine stock status
          if (field === 'currentStock' || field === 'minimumStock') {
            const current = parseFloat(updatedEntry.currentStock || 0);
            const minimum = parseFloat(updatedEntry.minimumStock || 0);
            
            if (current === 0) updatedEntry.stockStatus = 'Out of Stock';
            else if (current <= minimum) updatedEntry.stockStatus = 'Low Stock';
            else if (current <= minimum * 1.5) updatedEntry.stockStatus = 'Reorder Soon';
            else updatedEntry.stockStatus = 'In Stock';
          }
          
          return updatedEntry;
        }
        return entry;
      })
    }));
  };

  // Get stock status color
  const getStockStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Reorder Soon': return 'warning';
      case 'Low Stock': return 'error';
      case 'Out of Stock': return 'error';
      default: return 'default';
    }
  };

  // Get overall status color
  const getOverallStatusColor = (status) => {
    switch (status) {
      case 'Good': return 'success';
      case 'Attention Required': return 'warning';
      case 'Critical': return 'error';
      default: return 'default';
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Final calculations and validations
    const submitData = {
      ...formValues,
      lastUpdated: formatTime(new Date()),
      submissionTime: new Date().toISOString(),
    };

    // Validate form
    const validation = validateForm(submitData, simpleAdministrativeValidation);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    try {
      // Prepare form data for dispatch
      const formData = {
        ...submitData,
        slug: 'consumables-register-mainline',
        formType: 'consumables-register-mainline',
        submittedAt: new Date().toISOString(),
      };

      // Redux dispatch (will be added when reducer is available)
      console.log('Consumables Register submitted:', formData);
      
      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/list/consumables-register-mainline');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save consumables register. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AFCMainlineFormLayout
      title="Consumables Register - Mainline"
      onSubmit={handleSubmit}
      loading={loading}
      error={errors.submit}
      success={success}
      successMessage="Consumables register saved successfully!"
    >
      <Box sx={{ width: '100%' }}>
        {/* Header Information */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <ConsumablesIcon sx={{ fontSize: 40 }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h5" gutterBottom>
                AFC-Mainline Consumables Register
              </Typography>
              <Typography variant="body1">
                Equipment Supplies & Inventory Management System
              </Typography>
            </Grid>
            <Grid item>
              <Chip 
                label={formValues.overallStatus || 'Pending Assessment'} 
                color={getOverallStatusColor(formValues.overallStatus)}
                size="large"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Success/Error Messages */}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Consumables register saved successfully! Redirecting to list view...
          </Alert>
        )}

        {errors.submit && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.submit}
          </Alert>
        )}

        {/* Basic Information Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
            <StockIcon sx={{ mr: 1 }} />
            Basic Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="station-name"
                name="stn_name"
                label="Station Name"
                value={formValues.stn_name}
                onChange={(value) => handleFieldChange('stn_name', value)}
                required
                error={errors.stn_name}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="date"
                name="date"
                label="Register Date"
                value={formValues.date}
                onChange={(value) => handleFieldChange('date', value)}
                required
                error={errors.date}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="employee-signature"
                name="recordedBy"
                label="Recorded By"
                value={formValues.recordedBy}
                onChange={(value) => handleFieldChange('recordedBy', value)}
                required
                error={errors.recordedBy}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="shift-type"
                name="shift"
                label="Shift"
                value={formValues.shift}
                onChange={(value) => handleFieldChange('shift', value)}
                error={errors.shift}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Inventory Summary Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
            <Inventory sx={{ mr: 1 }} />
            Inventory Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={2}>
              <UniversalAFCMainlineFormField
                type="number"
                name="totalConsumables"
                label="Total Items"
                value={formValues.totalConsumables}
                onChange={(value) => handleFieldChange('totalConsumables', value)}
                disabled
                InputProps={{ readOnly: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <UniversalAFCMainlineFormField
                type="number"
                name="lowStockItems"
                label="Low Stock"
                value={formValues.lowStockItems}
                onChange={(value) => handleFieldChange('lowStockItems', value)}
                disabled
                InputProps={{ readOnly: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <UniversalAFCMainlineFormField
                type="number"
                name="outOfStockItems"
                label="Out of Stock"
                value={formValues.outOfStockItems}
                onChange={(value) => handleFieldChange('outOfStockItems', value)}
                disabled
                InputProps={{ readOnly: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="currency"
                name="totalValue"
                label="Total Value (₹)"
                value={formValues.totalValue}
                onChange={(value) => handleFieldChange('totalValue', value)}
                disabled
                InputProps={{ readOnly: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="select"
                name="consumptionTrend"
                label="Consumption Trend"
                value={formValues.consumptionTrend}
                onChange={(value) => handleFieldChange('consumptionTrend', value)}
                options={[
                  { value: 'Increasing', label: 'Increasing' },
                  { value: 'Decreasing', label: 'Decreasing' },
                  { value: 'Stable', label: 'Stable' },
                  { value: 'Volatile', label: 'Volatile' }
                ]}
                error={errors.consumptionTrend}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Consumables Entries Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
              <SupplyIcon sx={{ mr: 1 }} />
              Consumables Entries ({formValues.consumableEntries.length})
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={addConsumableEntry}
            >
              Add Item
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {formValues.consumableEntries.length > 0 ? (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell><strong>Item Code</strong></TableCell>
                    <TableCell><strong>Item Name</strong></TableCell>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell><strong>Current Stock</strong></TableCell>
                    <TableCell><strong>Min Stock</strong></TableCell>
                    <TableCell><strong>Unit Price</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formValues.consumableEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="itemCode"
                          value={entry.itemCode}
                          onChange={(value) => updateConsumableEntry(entry.id, 'itemCode', value)}
                          size="small"
                          disabled
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="itemName"
                          value={entry.itemName}
                          onChange={(value) => updateConsumableEntry(entry.id, 'itemName', value)}
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="select"
                          name="category"
                          value={entry.category}
                          onChange={(value) => updateConsumableEntry(entry.id, 'category', value)}
                          options={[
                            { value: 'Electronic Components', label: 'Electronic Components' },
                            { value: 'Mechanical Parts', label: 'Mechanical Parts' },
                            { value: 'Cleaning Supplies', label: 'Cleaning Supplies' },
                            { value: 'Safety Equipment', label: 'Safety Equipment' },
                            { value: 'Stationery', label: 'Stationery' },
                            { value: 'Tools', label: 'Tools' }
                          ]}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="currentStock"
                          value={entry.currentStock}
                          onChange={(value) => updateConsumableEntry(entry.id, 'currentStock', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="minimumStock"
                          value={entry.minimumStock}
                          onChange={(value) => updateConsumableEntry(entry.id, 'minimumStock', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="currency"
                          name="unitPrice"
                          value={entry.unitPrice}
                          onChange={(value) => updateConsumableEntry(entry.id, 'unitPrice', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={entry.stockStatus} 
                          color={getStockStatusColor(entry.stockStatus)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => removeConsumableEntry(entry.id)}
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
              No consumable items added yet. Click "Add Item" to start tracking consumables.
            </Alert>
          )}
        </Paper>

        {/* Storage & Quality Management */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Storage & Quality Management
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="text"
                name="storageLocation"
                label="Primary Storage Location"
                value={formValues.storageLocation}
                onChange={(value) => handleFieldChange('storageLocation', value)}
                error={errors.storageLocation}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="yes-no"
                name="temperatureControlled"
                label="Temperature Controlled"
                value={formValues.temperatureControlled}
                onChange={(value) => handleFieldChange('temperatureControlled', value)}
                error={errors.temperatureControlled}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="security-level"
                name="securityLevel"
                label="Security Level"
                value={formValues.securityLevel}
                onChange={(value) => handleFieldChange('securityLevel', value)}
                error={errors.securityLevel}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="yes-no"
                name="qualityCheckRequired"
                label="Quality Check Required"
                value={formValues.qualityCheckRequired}
                onChange={(value) => handleFieldChange('qualityCheckRequired', value)}
                error={errors.qualityCheckRequired}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="number"
                name="rejectedItems"
                label="Rejected Items"
                value={formValues.rejectedItems}
                onChange={(value) => handleFieldChange('rejectedItems', value)}
                error={errors.rejectedItems}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="equipment-status"
                name="accessControl"
                label="Access Control Status"
                value={formValues.accessControl}
                onChange={(value) => handleFieldChange('accessControl', value)}
                error={errors.accessControl}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Financial Management */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Financial Management
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="currency"
                name="budgetAllocation"
                label="Budget Allocated (₹)"
                value={formValues.budgetAllocation}
                onChange={(value) => handleFieldChange('budgetAllocation', value)}
                error={errors.budgetAllocation}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="currency"
                name="spentThisMonth"
                label="Spent This Month (₹)"
                value={formValues.spentThisMonth}
                onChange={(value) => handleFieldChange('spentThisMonth', value)}
                error={errors.spentThisMonth}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="currency"
                name="remainingBudget"
                label="Remaining Budget (₹)"
                value={formValues.remainingBudget}
                onChange={(value) => handleFieldChange('remainingBudget', value)}
                disabled
                InputProps={{ readOnly: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="pendingOrders"
                label="Pending Orders"
                value={formValues.pendingOrders}
                onChange={(value) => handleFieldChange('pendingOrders', value)}
                error={errors.pendingOrders}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Summary & Verification */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Summary & Verification
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="procurementRecommendations"
                label="Procurement Recommendations"
                value={formValues.procurementRecommendations}
                onChange={(value) => handleFieldChange('procurementRecommendations', value)}
                multiline
                rows={3}
                error={errors.procurementRecommendations}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="remarks"
                label="General Remarks"
                value={formValues.remarks}
                onChange={(value) => handleFieldChange('remarks', value)}
                multiline
                rows={3}
                error={errors.remarks}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="employee-signature"
                name="verifiedBy"
                label="Verified By"
                value={formValues.verifiedBy}
                onChange={(value) => handleFieldChange('verifiedBy', value)}
                error={errors.verifiedBy}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="employee-signature"
                name="approvedBy"
                label="Approved By"
                value={formValues.approvedBy}
                onChange={(value) => handleFieldChange('approvedBy', value)}
                error={errors.approvedBy}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="time"
                name="recordTime"
                label="Record Time"
                value={formValues.recordTime}
                onChange={(value) => handleFieldChange('recordTime', value)}
                disabled
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </AFCMainlineFormLayout>
  );
};

export default ConsumablesRegisterMainlineForm;