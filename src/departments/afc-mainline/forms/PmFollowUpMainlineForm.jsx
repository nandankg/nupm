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
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  PlaylistAddCheck as FollowUpIcon,
  Schedule as ScheduleIcon,
  CheckCircleOutline as CompletedIcon,
  PendingActions as PendingIcon
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
 * PM Follow Up Mainline Form - Preventive Maintenance Follow-up & Action Tracking
 * 
 * Form ID: 72 | Slug: pm-follow-up-mainline
 * Complexity: MEDIUM-HIGH - Handles PM action tracking, escalation, completion verification
 * Features: Dynamic follow-up entries, status tracking, escalation management, completion verification
 */
const PmFollowUpMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState('pm-follow-up-mainline');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update time every 25 seconds
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 25000);
    return () => clearInterval(interval);
  }, []);

  // Initialize form with current date and defaults
  const [formValues, setFormValues] = useState({
    // Basic Information
    stn_name: '',                           // Station name
    date: formatDate(new Date()),           // Follow-up date
    followUpOfficer: '',                    // Follow-up officer name
    supervisorName: '',                     // Supervising officer
    shift: '',                              // Shift timing
    
    // PM Summary
    totalPmActivities: 0,                   // Total PM activities tracked
    completedActivities: 0,                 // Completed activities
    pendingActivities: 0,                   // Pending activities
    overdueActivities: 0,                   // Overdue activities
    escalatedActivities: 0,                 // Escalated activities
    
    // Follow-up Categories
    dailyPmFollowUp: 0,                     // Daily PM follow-ups
    weeklyPmFollowUp: 0,                    // Weekly PM follow-ups
    monthlyPmFollowUp: 0,                   // Monthly PM follow-ups
    quarterlyPmFollowUp: 0,                 // Quarterly PM follow-ups
    annualPmFollowUp: 0,                    // Annual PM follow-ups
    
    // Equipment Categories
    tvmPmFollowUp: 0,                       // TVM PM follow-ups
    tomPmFollowUp: 0,                       // TOM PM follow-ups
    gatePmFollowUp: 0,                      // Gate PM follow-ups
    avmPmFollowUp: 0,                       // AVM PM follow-ups
    bomPmFollowUp: 0,                       // BOM PM follow-ups
    cctvPmFollowUp: 0,                      // CCTV PM follow-ups
    
    // Priority Levels
    criticalPriority: 0,                    // Critical priority follow-ups
    highPriority: 0,                        // High priority follow-ups
    mediumPriority: 0,                      // Medium priority follow-ups
    lowPriority: 0,                         // Low priority follow-ups
    
    // Follow-up Entries Array
    followUpEntries: [],                    // Dynamic array of follow-up records
    
    // Performance Metrics
    completionRate: 0,                      // Completion rate percentage
    onTimeCompletion: 0,                    // On-time completion percentage
    averageResolutionTime: 0,               // Average resolution time (hours)
    escalationRate: 0,                      // Escalation rate percentage
    
    // Resource Management
    techniciansAssigned: 0,                 // Number of technicians assigned
    contractorsInvolved: 0,                 // External contractors involved
    sparePartsRequired: 0,                  // Spare parts requirements pending
    budgetUtilization: 0,                   // Budget utilization percentage
    
    // Quality Assurance
    qualityChecksCompleted: 0,              // Quality checks completed
    reworkRequired: 0,                      // Activities requiring rework
    customerComplaints: 0,                  // Related customer complaints
    performanceImpacts: 0,                  // Performance impact incidents
    
    // Escalation Management
    levelOneEscalations: 0,                 // Level 1 escalations
    levelTwoEscalations: 0,                 // Level 2 escalations
    levelThreeEscalations: 0,               // Level 3 escalations
    managementEscalations: 0,               // Management escalations
    
    // Documentation Status
    pmRecordsUpdated: '',                   // PM records update status
    complianceDocuments: '',                // Compliance documents status
    warrantyDocuments: '',                  // Warranty documents status
    certificationStatus: '',                // Equipment certification status
    
    // Training & Competency
    trainingRequired: '',                   // Additional training required
    competencyGaps: '',                     // Identified competency gaps
    skillDevelopment: '',                   // Skill development needs
    knowledgeTransfer: '',                  // Knowledge transfer requirements
    
    // Risk Management
    safetyRisks: '',                        // Safety risks identified
    operationalRisks: '',                   // Operational risks identified
    complianceRisks: '',                    // Compliance risks identified
    mitigationActions: '',                  // Risk mitigation actions
    
    // Vendor Management
    vendorPerformance: '',                  // Vendor performance assessment
    contractCompliance: '',                 // Contract compliance status
    slaAdherence: '',                       // SLA adherence status
    vendorIssues: '',                       // Vendor-related issues
    
    // Continuous Improvement
    processImprovements: '',                // Process improvement suggestions
    technologyUpgrades: '',                 // Technology upgrade recommendations
    efficiencyEnhancements: '',             // Efficiency enhancement ideas
    costOptimizations: '',                  // Cost optimization opportunities
    
    // Communication & Coordination
    teamCommunication: '',                  // Team communication status
    interdepartmentalCoordination: '',      // Cross-department coordination
    managementReporting: '',                // Management reporting status
    stakeholderUpdates: '',                 // Stakeholder update status
    
    // Next Actions
    immediatePriorities: '',                // Immediate priority actions
    shortTermPlanning: '',                  // Short-term planning requirements
    longTermStrategy: '',                   // Long-term strategy considerations
    resourceRequirements: '',               // Future resource requirements
    
    // Review & Approval
    reviewedBy: '',                         // Reviewed by senior officer
    reviewComments: '',                     // Review comments
    approvedBy: '',                         // Final approval
    approvalDate: '',                       // Approval date
    
    // Summary
    overallStatus: '',                      // Overall follow-up status
    actionPlan: '',                         // Action plan for pending items
    remarks: '',                           // General remarks
    
    // Timestamps
    followUpStartTime: '',                  // Follow-up start time
    followUpEndTime: '',                    // Follow-up completion time
    recordTime: formatTime(new Date()),     // Record creation time
    lastUpdated: formatTime(new Date()),    // Last update time
  });

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => {
      const updatedValues = { ...prev, [fieldName]: value };
      
      // Auto-calculate totals from follow-up entries
      if (updatedValues.followUpEntries.length > 0) {
        updatedValues.totalPmActivities = updatedValues.followUpEntries.length;
        updatedValues.completedActivities = updatedValues.followUpEntries.filter(entry => entry.status === 'Completed').length;
        updatedValues.pendingActivities = updatedValues.followUpEntries.filter(entry => entry.status === 'Pending').length;
        updatedValues.overdueActivities = updatedValues.followUpEntries.filter(entry => entry.status === 'Overdue').length;
        updatedValues.escalatedActivities = updatedValues.followUpEntries.filter(entry => entry.escalated === 'Yes').length;
        
        // Calculate priority distribution
        updatedValues.criticalPriority = updatedValues.followUpEntries.filter(entry => entry.priority === 'Critical').length;
        updatedValues.highPriority = updatedValues.followUpEntries.filter(entry => entry.priority === 'High').length;
        updatedValues.mediumPriority = updatedValues.followUpEntries.filter(entry => entry.priority === 'Medium').length;
        updatedValues.lowPriority = updatedValues.followUpEntries.filter(entry => entry.priority === 'Low').length;
      }
      
      // Calculate performance metrics
      if (updatedValues.totalPmActivities > 0) {
        updatedValues.completionRate = Math.round((updatedValues.completedActivities / updatedValues.totalPmActivities) * 100);
        updatedValues.escalationRate = Math.round((updatedValues.escalatedActivities / updatedValues.totalPmActivities) * 100);
      }
      
      // Determine overall status
      if (updatedValues.completionRate >= 95) updatedValues.overallStatus = 'Excellent';
      else if (updatedValues.completionRate >= 85) updatedValues.overallStatus = 'Good';
      else if (updatedValues.completionRate >= 70) updatedValues.overallStatus = 'Satisfactory';
      else updatedValues.overallStatus = 'Needs Attention';
      
      return updatedValues;
    });
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Add new follow-up entry
  const addFollowUpEntry = () => {
    setFormValues(prev => ({
      ...prev,
      followUpEntries: [
        ...prev.followUpEntries,
        {
          id: Date.now(),
          followUpId: `FU-${Date.now().toString().slice(-6)}`,
          pmActivity: '',
          equipmentType: '',
          equipmentId: '',
          scheduledDate: '',
          dueDate: '',
          assignedTo: '',
          priority: 'Medium',
          status: 'Pending',
          completionDate: '',
          completionPercentage: 0,
          delayReason: '',
          escalated: 'No',
          escalationLevel: '',
          escalationDate: '',
          actionTaken: '',
          nextAction: '',
          resourcesUsed: '',
          costIncurred: 0,
          qualityCheck: 'Pending',
          customerImpact: 'None',
          remarks: '',
          createdTime: formatTime(new Date()),
          lastUpdated: formatTime(new Date())
        }
      ]
    }));
  };

  // Remove follow-up entry
  const removeFollowUpEntry = (id) => {
    setFormValues(prev => ({
      ...prev,
      followUpEntries: prev.followUpEntries.filter(entry => entry.id !== id)
    }));
  };

  // Update follow-up entry
  const updateFollowUpEntry = (id, field, value) => {
    setFormValues(prev => ({
      ...prev,
      followUpEntries: prev.followUpEntries.map(entry => {
        if (entry.id === id) {
          const updatedEntry = { ...entry, [field]: value, lastUpdated: formatTime(new Date()) };
          
          // Auto-determine status based on completion percentage and dates
          if (field === 'completionPercentage') {
            if (value >= 100) updatedEntry.status = 'Completed';
            else if (value > 0) updatedEntry.status = 'In Progress';
            else updatedEntry.status = 'Pending';
          }
          
          // Check if overdue
          if (field === 'dueDate' && new Date(value) < new Date() && updatedEntry.status !== 'Completed') {
            updatedEntry.status = 'Overdue';
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

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
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
      followUpEndTime: formatTime(new Date()),
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
        slug: 'pm-follow-up-mainline',
        formType: 'pm-follow-up-mainline',
        submittedAt: new Date().toISOString(),
      };

      // Redux dispatch (will be added when reducer is available)
      console.log('PM Follow Up submitted:', formData);
      
      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/list/pm-follow-up-mainline');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save PM follow-up register. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AFCMainlineFormLayout
      title="PM Follow Up - Mainline"
      onSubmit={handleSubmit}
      loading={loading}
      error={errors.submit}
      success={success}
      successMessage="PM follow-up register saved successfully!"
    >
      <Box sx={{ width: '100%' }}>
        {/* Header Information */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'warning.main', color: 'white' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FollowUpIcon sx={{ fontSize: 40 }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h5" gutterBottom>
                AFC-Mainline PM Follow Up Register
              </Typography>
              <Typography variant="body1">
                Preventive Maintenance Follow-up & Action Tracking System
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">Completion Rate:</Typography>
                <Chip 
                  label={`${formValues.completionRate}%`} 
                  color={formValues.completionRate >= 85 ? 'success' : formValues.completionRate >= 70 ? 'warning' : 'error'}
                  size="large"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Success/Error Messages */}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            PM follow-up register saved successfully! Redirecting to list view...
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
            <ScheduleIcon sx={{ mr: 1 }} />
            Follow-up Information
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
                label="Follow-up Date"
                value={formValues.date}
                onChange={(value) => handleFieldChange('date', value)}
                required
                error={errors.date}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="employee-signature"
                name="followUpOfficer"
                label="Follow-up Officer"
                value={formValues.followUpOfficer}
                onChange={(value) => handleFieldChange('followUpOfficer', value)}
                required
                error={errors.followUpOfficer}
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

        {/* Performance Dashboard */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Performance Dashboard
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="h4" color="primary.main">
                  {formValues.totalPmActivities}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Activities
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'success.main', borderRadius: 1 }}>
                <Typography variant="h4" color="success.main">
                  {formValues.completedActivities}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'warning.main', borderRadius: 1 }}>
                <Typography variant="h4" color="warning.main">
                  {formValues.pendingActivities}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'error.main', borderRadius: 1 }}>
                <Typography variant="h4" color="error.main">
                  {formValues.overdueActivities}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Overdue
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'info.main', borderRadius: 1 }}>
                <Typography variant="h4" color="info.main">
                  {formValues.escalatedActivities}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Escalated
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="h4" color="primary.main">
                  {formValues.completionRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completion Rate
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Follow-up Entries Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
              <PendingIcon sx={{ mr: 1 }} />
              PM Follow-up Activities ({formValues.followUpEntries.length})
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={addFollowUpEntry}
            >
              Add Follow-up
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {formValues.followUpEntries.length > 0 ? (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell><strong>Follow-up ID</strong></TableCell>
                    <TableCell><strong>PM Activity</strong></TableCell>
                    <TableCell><strong>Equipment</strong></TableCell>
                    <TableCell><strong>Due Date</strong></TableCell>
                    <TableCell><strong>Priority</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Progress</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formValues.followUpEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="followUpId"
                          value={entry.followUpId}
                          onChange={(value) => updateFollowUpEntry(entry.id, 'followUpId', value)}
                          size="small"
                          disabled
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="pmActivity"
                          value={entry.pmActivity}
                          onChange={(value) => updateFollowUpEntry(entry.id, 'pmActivity', value)}
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="afc-equipment"
                          name="equipmentType"
                          value={entry.equipmentType}
                          onChange={(value) => updateFollowUpEntry(entry.id, 'equipmentType', value)}
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="date"
                          name="dueDate"
                          value={entry.dueDate}
                          onChange={(value) => updateFollowUpEntry(entry.id, 'dueDate', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={entry.priority} 
                          color={getPriorityColor(entry.priority)}
                          size="small"
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
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="completionPercentage"
                          value={entry.completionPercentage}
                          onChange={(value) => updateFollowUpEntry(entry.id, 'completionPercentage', value)}
                          size="small"
                          inputProps={{ min: 0, max: 100 }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => removeFollowUpEntry(entry.id)}
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
              No follow-up activities recorded yet. Click "Add Follow-up" to start tracking PM activities.
            </Alert>
          )}
        </Paper>

        {/* Resource Management */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Resource Management
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="techniciansAssigned"
                label="Technicians Assigned"
                value={formValues.techniciansAssigned}
                onChange={(value) => handleFieldChange('techniciansAssigned', value)}
                error={errors.techniciansAssigned}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="contractorsInvolved"
                label="Contractors Involved"
                value={formValues.contractorsInvolved}
                onChange={(value) => handleFieldChange('contractorsInvolved', value)}
                error={errors.contractorsInvolved}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="sparePartsRequired"
                label="Spare Parts Pending"
                value={formValues.sparePartsRequired}
                onChange={(value) => handleFieldChange('sparePartsRequired', value)}
                error={errors.sparePartsRequired}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="budgetUtilization"
                label="Budget Utilization (%)"
                value={formValues.budgetUtilization}
                onChange={(value) => handleFieldChange('budgetUtilization', value)}
                inputProps={{ min: 0, max: 100 }}
                error={errors.budgetUtilization}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Action Plan & Summary */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
            <CompletedIcon sx={{ mr: 1 }} />
            Action Plan & Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="immediatePriorities"
                label="Immediate Priority Actions"
                value={formValues.immediatePriorities}
                onChange={(value) => handleFieldChange('immediatePriorities', value)}
                multiline
                rows={3}
                error={errors.immediatePriorities}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="actionPlan"
                label="Action Plan for Pending Items"
                value={formValues.actionPlan}
                onChange={(value) => handleFieldChange('actionPlan', value)}
                multiline
                rows={3}
                error={errors.actionPlan}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="processImprovements"
                label="Process Improvements"
                value={formValues.processImprovements}
                onChange={(value) => handleFieldChange('processImprovements', value)}
                multiline
                rows={3}
                error={errors.processImprovements}
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

export default PmFollowUpMainlineForm;