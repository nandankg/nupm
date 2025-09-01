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
  Divider,
  Calendar,
  LinearProgress
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Build as MaintenanceIcon,
  EventNote as LogbookIcon,
  Settings as EquipmentIcon,
  CheckCircle as CompletedIcon
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
 * PM Logbook Monthly Other Mainline Form - Monthly Preventive Maintenance for Other Equipment
 * 
 * Form ID: 73 | Slug: pm-logbook-monthly-other-mainline
 * Complexity: HIGH - Handles comprehensive monthly PM for various other equipment types
 * Features: Dynamic PM entries, maintenance scheduling, equipment tracking, performance metrics
 */
const PmLogbookMonthlyOtherMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState('pm-logbook-monthly-other-mainline');
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
    date: formatDate(new Date()),           // PM logbook date
    month: '',                              // PM month
    year: new Date().getFullYear(),         // PM year
    pmEngineer: '',                         // PM engineer name
    supervisorName: '',                     // Supervising officer
    shift: '',                              // Shift timing
    
    // PM Summary
    totalEquipmentCount: 0,                 // Total equipment for PM
    completedPmCount: 0,                    // Completed PM count
    pendingPmCount: 0,                      // Pending PM count
    overdueAcount: 0,                       // Overdue PM count
    pmCompletionRate: 0,                    // PM completion rate percentage
    
    // Equipment Categories
    cctvEquipment: 0,                       // CCTV equipment count
    paSystemEquipment: 0,                   // PA system equipment count
    lightingEquipment: 0,                   // Lighting equipment count
    hvacEquipment: 0,                       // HVAC equipment count
    fireSystemEquipment: 0,                 // Fire safety system equipment
    accessControlEquipment: 0,              // Access control equipment
    networkEquipment: 0,                    // Network/IT equipment
    backupSystemEquipment: 0,               // Backup system equipment
    
    // PM Activities Status
    visualInspectionComplete: 0,            // Visual inspection completed
    functionalTestingComplete: 0,           // Functional testing completed
    cleaningMaintenanceComplete: 0,         // Cleaning & maintenance completed
    calibrationComplete: 0,                 // Calibration completed
    softwareUpdateComplete: 0,              // Software updates completed
    documentationComplete: 0,               // Documentation completed
    
    // Performance Metrics
    averageRepairTime: 0,                   // Average repair time (hours)
    firstTimeFixRate: 0,                    // First time fix rate (%)
    repeatFailureRate: 0,                   // Repeat failure rate (%)
    equipmentAvailability: 0,               // Equipment availability (%)
    mttr: 0,                               // Mean Time To Repair (hours)
    mtbf: 0,                               // Mean Time Between Failures (hours)
    
    // PM Entries Array
    pmEntries: [],                          // Dynamic array of PM records
    
    // Resource Utilization
    manHoursSpent: 0,                       // Total man-hours spent
    sparePartsUsed: 0,                      // Number of spare parts used
    toolsRequired: 0,                       // Special tools required count
    contractorSupport: 0,                   // Contractor support hours
    budgetUtilized: 0,                      // Budget utilized amount
    
    // Quality Metrics
    pmQualityScore: 0,                      // PM quality score (1-10)
    customerSatisfaction: 0,                // Customer satisfaction score (1-10)
    safetyIncidents: 0,                     // Safety incidents count
    environmentalCompliance: '',            // Environmental compliance status
    
    // Issues & Findings
    criticalIssuesFound: 0,                 // Critical issues identified
    majorIssuesFound: 0,                    // Major issues identified
    minorIssuesFound: 0,                    // Minor issues identified
    issuesResolved: 0,                      // Issues resolved during PM
    
    // Corrective Actions
    immediateActionsRequired: '',           // Immediate actions required
    scheduledMaintenanceActions: '',        // Scheduled maintenance actions
    preventiveActions: '',                  // Preventive actions recommended
    followUpActions: '',                    // Follow-up actions required
    
    // Equipment Condition Assessment
    excellentCondition: 0,                  // Equipment in excellent condition
    goodCondition: 0,                       // Equipment in good condition
    fairCondition: 0,                       // Equipment in fair condition
    poorCondition: 0,                       // Equipment in poor condition
    replacementRequired: 0,                 // Equipment requiring replacement
    
    // Compliance & Certification
    regulatoryCompliance: '',               // Regulatory compliance status
    certificationStatus: '',                // Equipment certification status
    warrantyStatus: '',                     // Warranty status verification
    insuranceCompliance: '',                // Insurance compliance status
    
    // Training & Competency
    pmTrainingCompleted: '',                // PM training completion status
    competencyVerification: '',             // Technician competency verified
    safetyTrainingUpToDate: '',             // Safety training status
    newProceduresImplemented: '',           // New procedures implemented
    
    // Environmental & Safety
    wasteMgmtCompliance: '',                // Waste management compliance
    energyEfficiencyCheck: '',              // Energy efficiency assessment
    safetyProtocolAdherence: '',            // Safety protocol adherence
    emergencyProceduresTest: '',            // Emergency procedures testing
    
    // Technology & Innovation
    technologyUpgrades: '',                 // Technology upgrades identified
    automationOpportunities: '',            // Automation opportunities
    digitalTransformation: '',              // Digital transformation initiatives
    iotIntegration: '',                     // IoT integration possibilities
    
    // Cost Management
    pmCostBudget: 0,                        // PM cost budget allocated
    actualCostIncurred: 0,                  // Actual cost incurred
    costVariance: 0,                        // Cost variance (budget vs actual)
    costSavingOpportunities: '',            // Cost saving opportunities
    
    // Vendor Management
    vendorPerformanceRating: 0,             // Vendor performance rating (1-10)
    contractComplianceStatus: '',           // Contract compliance status
    slaAdherence: 0,                        // SLA adherence percentage
    vendorRecommendations: '',              // Vendor recommendations
    
    // Risk Management
    operationalRisks: '',                   // Operational risks identified
    safetyRisks: '',                        // Safety risks identified
    complianceRisks: '',                    // Compliance risks identified
    mitigationStrategies: '',               // Risk mitigation strategies
    
    // Continuous Improvement
    processOptimizations: '',               // Process optimization suggestions
    bestPracticesIdentified: '',            // Best practices identified
    knowledgeSharing: '',                   // Knowledge sharing initiatives
    innovationProposals: '',                // Innovation proposals
    
    // Next Month Planning
    nextMonthPriorities: '',                // Next month priorities
    resourceRequirements: '',               // Resource requirements
    trainingNeeds: '',                      // Training needs identified
    budgetProjections: '',                  // Budget projections
    
    // Documentation & Reporting
    pmRecordsUpdated: '',                   // PM records update status
    reportingCompliance: '',                // Reporting compliance status
    auditTrailMaintenance: '',              // Audit trail maintenance
    dataBackupStatus: '',                   // Data backup status
    
    // Review & Approval
    reviewedBy: '',                         // Reviewed by senior officer
    reviewComments: '',                     // Review comments
    approvedBy: '',                         // Final approval
    approvalDate: '',                       // Approval date
    
    // Summary
    overallAssessment: '',                  // Overall PM assessment
    monthlyConclusion: '',                  // Monthly conclusion
    remarks: '',                           // General remarks
    
    // Timestamps
    pmStartDate: '',                        // PM start date
    pmCompletionDate: '',                   // PM completion date
    recordTime: formatTime(new Date()),     // Record creation time
    lastUpdated: formatTime(new Date()),    // Last update time
  });

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => {
      const updatedValues = { ...prev, [fieldName]: value };
      
      // Auto-calculate PM completion rate
      if (fieldName === 'completedPmCount' || fieldName === 'totalEquipmentCount') {
        if (updatedValues.totalEquipmentCount > 0) {
          updatedValues.pmCompletionRate = Math.round((updatedValues.completedPmCount / updatedValues.totalEquipmentCount) * 100);
        }
      }
      
      // Calculate cost variance
      if (fieldName === 'pmCostBudget' || fieldName === 'actualCostIncurred') {
        updatedValues.costVariance = updatedValues.actualCostIncurred - updatedValues.pmCostBudget;
      }
      
      // Auto-calculate totals from PM entries
      if (updatedValues.pmEntries.length > 0) {
        updatedValues.totalEquipmentCount = updatedValues.pmEntries.length;
        updatedValues.completedPmCount = updatedValues.pmEntries.filter(entry => entry.status === 'Completed').length;
        updatedValues.pendingPmCount = updatedValues.pmEntries.filter(entry => entry.status === 'Pending').length;
        updatedValues.overdueCount = updatedValues.pmEntries.filter(entry => entry.status === 'Overdue').length;
        
        // Calculate condition distribution
        updatedValues.excellentCondition = updatedValues.pmEntries.filter(entry => entry.condition === 'Excellent').length;
        updatedValues.goodCondition = updatedValues.pmEntries.filter(entry => entry.condition === 'Good').length;
        updatedValues.fairCondition = updatedValues.pmEntries.filter(entry => entry.condition === 'Fair').length;
        updatedValues.poorCondition = updatedValues.pmEntries.filter(entry => entry.condition === 'Poor').length;
        
        // Calculate total hours and costs
        updatedValues.manHoursSpent = updatedValues.pmEntries.reduce((sum, entry) => sum + (parseFloat(entry.hoursSpent) || 0), 0);
        updatedValues.actualCostIncurred = updatedValues.pmEntries.reduce((sum, entry) => sum + (parseFloat(entry.costIncurred) || 0), 0);
      }
      
      // Determine overall assessment based on completion rate
      if (updatedValues.pmCompletionRate >= 95) updatedValues.overallAssessment = 'Excellent';
      else if (updatedValues.pmCompletionRate >= 85) updatedValues.overallAssessment = 'Good';
      else if (updatedValues.pmCompletionRate >= 70) updatedValues.overallAssessment = 'Satisfactory';
      else updatedValues.overallAssessment = 'Needs Improvement';
      
      return updatedValues;
    });
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Add new PM entry
  const addPmEntry = () => {
    setFormValues(prev => ({
      ...prev,
      pmEntries: [
        ...prev.pmEntries,
        {
          id: Date.now(),
          pmId: `PM-${Date.now().toString().slice(-6)}`,
          equipmentType: 'CCTV',
          equipmentId: '',
          equipmentLocation: '',
          pmType: 'Monthly',
          scheduledDate: '',
          completionDate: '',
          status: 'Pending',
          condition: 'Good',
          technician: '',
          hoursSpent: 0,
          activitiesPerformed: '',
          sparePartsUsed: '',
          issuesFound: '',
          correctiveActions: '',
          nextPmDue: '',
          costIncurred: 0,
          qualityRating: 8,
          safetyCompliance: 'Yes',
          environmentalImpact: 'None',
          customerImpact: 'None',
          remarks: '',
          createdTime: formatTime(new Date()),
          lastUpdated: formatTime(new Date())
        }
      ]
    }));
  };

  // Remove PM entry
  const removePmEntry = (id) => {
    setFormValues(prev => ({
      ...prev,
      pmEntries: prev.pmEntries.filter(entry => entry.id !== id)
    }));
  };

  // Update PM entry
  const updatePmEntry = (id, field, value) => {
    setFormValues(prev => ({
      ...prev,
      pmEntries: prev.pmEntries.map(entry => {
        if (entry.id === id) {
          const updatedEntry = { ...entry, [field]: value, lastUpdated: formatTime(new Date()) };
          
          // Auto-determine status based on completion
          if (field === 'completionDate') {
            updatedEntry.status = value ? 'Completed' : 'Pending';
          }
          
          // Calculate next PM due date (30 days from completion)
          if (field === 'completionDate' && value) {
            const nextDue = new Date(value);
            nextDue.setDate(nextDue.getDate() + 30);
            updatedEntry.nextPmDue = formatDate(nextDue);
          }
          
          return updatedEntry;
        }
        return entry;
      })
    }));
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Pending': return 'warning';
      case 'Overdue': return 'error';
      default: return 'default';
    }
  };

  // Get condition color
  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'success';
      case 'Good': return 'info';
      case 'Fair': return 'warning';
      case 'Poor': return 'error';
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
      pmCompletionDate: formatDate(new Date()),
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
        slug: 'pm-logbook-monthly-other-mainline',
        formType: 'pm-logbook-monthly-other-mainline',
        submittedAt: new Date().toISOString(),
      };

      // Redux dispatch (will be added when reducer is available)
      console.log('PM Logbook Monthly Other submitted:', formData);
      
      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/list/pm-logbook-monthly-other-mainline');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save PM logbook. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AFCMainlineFormLayout
      title="PM Logbook Monthly - Other Equipment"
      onSubmit={handleSubmit}
      loading={loading}
      error={errors.submit}
      success={success}
      successMessage="PM logbook saved successfully!"
    >
      <Box sx={{ width: '100%' }}>
        {/* Header Information */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'success.main', color: 'white' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <MaintenanceIcon sx={{ fontSize: 40 }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h5" gutterBottom>
                AFC-Mainline Monthly PM Logbook - Other Equipment
              </Typography>
              <Typography variant="body1">
                Monthly Preventive Maintenance for CCTV, PA, Lighting & Other Systems
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">PM Completion</Typography>
                <Chip 
                  label={`${formValues.pmCompletionRate}%`} 
                  color={formValues.pmCompletionRate >= 90 ? 'success' : formValues.pmCompletionRate >= 70 ? 'warning' : 'error'}
                  size="large"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Success/Error Messages */}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            PM logbook saved successfully! Redirecting to list view...
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
            <LogbookIcon sx={{ mr: 1 }} />
            PM Logbook Information
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
                type="select"
                name="month"
                label="PM Month"
                value={formValues.month}
                onChange={(value) => handleFieldChange('month', value)}
                options={[
                  { value: 'January', label: 'January' },
                  { value: 'February', label: 'February' },
                  { value: 'March', label: 'March' },
                  { value: 'April', label: 'April' },
                  { value: 'May', label: 'May' },
                  { value: 'June', label: 'June' },
                  { value: 'July', label: 'July' },
                  { value: 'August', label: 'August' },
                  { value: 'September', label: 'September' },
                  { value: 'October', label: 'October' },
                  { value: 'November', label: 'November' },
                  { value: 'December', label: 'December' }
                ]}
                required
                error={errors.month}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="year"
                label="Year"
                value={formValues.year}
                onChange={(value) => handleFieldChange('year', value)}
                required
                error={errors.year}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="employee-signature"
                name="pmEngineer"
                label="PM Engineer"
                value={formValues.pmEngineer}
                onChange={(value) => handleFieldChange('pmEngineer', value)}
                required
                error={errors.pmEngineer}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* PM Performance Dashboard */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            PM Performance Dashboard
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="h4" color="primary.main">
                  {formValues.totalEquipmentCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Equipment
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'success.main', borderRadius: 1 }}>
                <Typography variant="h4" color="success.main">
                  {formValues.completedPmCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'warning.main', borderRadius: 1 }}>
                <Typography variant="h4" color="warning.main">
                  {formValues.pendingPmCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'error.main', borderRadius: 1 }}>
                <Typography variant="h4" color="error.main">
                  {formValues.overdueCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Overdue
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'info.main', borderRadius: 1 }}>
                <Typography variant="h4" color="info.main">
                  {formValues.manHoursSpent}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hours Spent
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="h4" color="primary.main">
                  ₹{formValues.actualCostIncurred}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cost Incurred
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          {/* Progress Bar */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Monthly PM Progress: {formValues.pmCompletionRate}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={formValues.pmCompletionRate} 
              color={formValues.pmCompletionRate >= 90 ? 'success' : formValues.pmCompletionRate >= 70 ? 'warning' : 'error'}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        </Paper>

        {/* Equipment Categories */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
            <EquipmentIcon sx={{ mr: 1 }} />
            Equipment Categories
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="cctvEquipment"
                label="CCTV Equipment"
                value={formValues.cctvEquipment}
                onChange={(value) => handleFieldChange('cctvEquipment', value)}
                error={errors.cctvEquipment}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="paSystemEquipment"
                label="PA System Equipment"
                value={formValues.paSystemEquipment}
                onChange={(value) => handleFieldChange('paSystemEquipment', value)}
                error={errors.paSystemEquipment}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="lightingEquipment"
                label="Lighting Equipment"
                value={formValues.lightingEquipment}
                onChange={(value) => handleFieldChange('lightingEquipment', value)}
                error={errors.lightingEquipment}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="hvacEquipment"
                label="HVAC Equipment"
                value={formValues.hvacEquipment}
                onChange={(value) => handleFieldChange('hvacEquipment', value)}
                error={errors.hvacEquipment}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="fireSystemEquipment"
                label="Fire Safety Equipment"
                value={formValues.fireSystemEquipment}
                onChange={(value) => handleFieldChange('fireSystemEquipment', value)}
                error={errors.fireSystemEquipment}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="accessControlEquipment"
                label="Access Control Equipment"
                value={formValues.accessControlEquipment}
                onChange={(value) => handleFieldChange('accessControlEquipment', value)}
                error={errors.accessControlEquipment}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="networkEquipment"
                label="Network Equipment"
                value={formValues.networkEquipment}
                onChange={(value) => handleFieldChange('networkEquipment', value)}
                error={errors.networkEquipment}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="backupSystemEquipment"
                label="Backup System Equipment"
                value={formValues.backupSystemEquipment}
                onChange={(value) => handleFieldChange('backupSystemEquipment', value)}
                error={errors.backupSystemEquipment}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* PM Entries Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
              <CompletedIcon sx={{ mr: 1 }} />
              PM Activities ({formValues.pmEntries.length})
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={addPmEntry}
            >
              Add PM Activity
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {formValues.pmEntries.length > 0 ? (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell><strong>PM ID</strong></TableCell>
                    <TableCell><strong>Equipment Type</strong></TableCell>
                    <TableCell><strong>Equipment ID</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Condition</strong></TableCell>
                    <TableCell><strong>Hours Spent</strong></TableCell>
                    <TableCell><strong>Cost (₹)</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formValues.pmEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="pmId"
                          value={entry.pmId}
                          onChange={(value) => updatePmEntry(entry.id, 'pmId', value)}
                          size="small"
                          disabled
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="select"
                          name="equipmentType"
                          value={entry.equipmentType}
                          onChange={(value) => updatePmEntry(entry.id, 'equipmentType', value)}
                          options={[
                            { value: 'CCTV', label: 'CCTV' },
                            { value: 'PA System', label: 'PA System' },
                            { value: 'Lighting', label: 'Lighting' },
                            { value: 'HVAC', label: 'HVAC' },
                            { value: 'Fire Safety', label: 'Fire Safety' },
                            { value: 'Access Control', label: 'Access Control' },
                            { value: 'Network', label: 'Network' },
                            { value: 'Backup System', label: 'Backup System' }
                          ]}
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="equipmentId"
                          value={entry.equipmentId}
                          onChange={(value) => updatePmEntry(entry.id, 'equipmentId', value)}
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={entry.status} 
                          color={getStatusColor(entry.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={entry.condition} 
                          color={getConditionColor(entry.condition)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="hoursSpent"
                          value={entry.hoursSpent}
                          onChange={(value) => updatePmEntry(entry.id, 'hoursSpent', value)}
                          size="small"
                          inputProps={{ min: 0, step: 0.5 }}
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="currency"
                          name="costIncurred"
                          value={entry.costIncurred}
                          onChange={(value) => updatePmEntry(entry.id, 'costIncurred', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => removePmEntry(entry.id)}
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
              No PM activities recorded yet. Click "Add PM Activity" to start logging maintenance activities.
            </Alert>
          )}
        </Paper>

        {/* Summary & Analysis */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Monthly Summary & Analysis
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="immediateActionsRequired"
                label="Immediate Actions Required"
                value={formValues.immediateActionsRequired}
                onChange={(value) => handleFieldChange('immediateActionsRequired', value)}
                multiline
                rows={3}
                error={errors.immediateActionsRequired}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="nextMonthPriorities"
                label="Next Month Priorities"
                value={formValues.nextMonthPriorities}
                onChange={(value) => handleFieldChange('nextMonthPriorities', value)}
                multiline
                rows={3}
                error={errors.nextMonthPriorities}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="processOptimizations"
                label="Process Optimization Suggestions"
                value={formValues.processOptimizations}
                onChange={(value) => handleFieldChange('processOptimizations', value)}
                multiline
                rows={3}
                error={errors.processOptimizations}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="remarks"
                label="Monthly Remarks"
                value={formValues.remarks}
                onChange={(value) => handleFieldChange('remarks', value)}
                multiline
                rows={3}
                error={errors.remarks}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Verification */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Verification & Approval
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="employee-signature"
                name="reviewedBy"
                label="Reviewed By"
                value={formValues.reviewedBy}
                onChange={(value) => handleFieldChange('reviewedBy', value)}
                error={errors.reviewedBy}
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

export default PmLogbookMonthlyOtherMainlineForm;