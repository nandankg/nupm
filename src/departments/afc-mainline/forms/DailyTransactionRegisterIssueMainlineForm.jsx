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
  LinearProgress
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  BugReport as IssueIcon,
  CheckCircle as ResolvedIcon,
  Warning as PendingIcon,
  Error as CriticalIcon
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
 * Daily Transaction Register Issue Mainline Form - Issue Tracking for Transaction Problems
 * 
 * Form ID: 77 | Slug: daily-transaction-register-mainline-issue
 * Complexity: HIGH - Handles transaction issues, error tracking, resolution workflow
 * Features: Dynamic issue tracking, priority management, resolution status, escalation workflow
 */
const DailyTransactionRegisterIssueMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState('daily-transaction-register-mainline-issue');
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
    date: formatDate(new Date()),           // Issue date
    shift: '',                              // Shift timing
    reportedBy: '',                         // Person who reported issue
    supervisorName: '',                     // Supervising officer
    
    // Issue Summary
    totalIssues: 0,                         // Total issues reported
    criticalIssues: 0,                      // Critical priority issues
    resolvedIssues: 0,                      // Issues resolved
    pendingIssues: 0,                       // Issues still pending
    
    // Issue Categories Count
    transactionIssues: 0,                   // Transaction processing issues
    equipmentIssues: 0,                     // Equipment failure issues  
    networkIssues: 0,                       // Network connectivity issues
    cashIssues: 0,                          // Cash handling issues
    cardIssues: 0,                          // Card reading/processing issues
    systemIssues: 0,                        // System software issues
    
    // Issue Details Array
    issues: [],                             // Dynamic array of issue entries
    
    // Overall Assessment
    impactLevel: '',                        // Overall impact level
    businessImpact: '',                     // Business impact description
    customerImpact: '',                     // Customer experience impact
    
    // Resolution Summary
    resolutionRate: 0,                      // Percentage of resolved issues
    avgResolutionTime: 0,                   // Average time to resolve (minutes)
    escalatedIssues: 0,                     // Issues escalated to next level
    
    // Follow-up Actions
    preventiveActions: '',                  // Actions to prevent recurrence
    trainingNeeded: '',                     // Training requirements identified
    systemUpdates: '',                      // System updates recommended
    
    // Verification
    reviewedBy: '',                         // Reviewed by senior officer
    reviewComments: '',                     // Review comments
    
    // Summary Report
    shiftSummary: '',                       // Overall shift issue summary
    recommendations: '',                    // Recommendations for improvement
    remarks: '',                            // General remarks
    
    // Timestamps
    reportTime: formatTime(new Date()),     // Report generation time
    reviewTime: '',                         // Review completion time
  });

  // Handle field changes with validation and auto-calculations
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => {
      const updatedValues = { ...prev, [fieldName]: value };
      
      // Auto-calculate totals when issue counts change
      if (fieldName.includes('Issues')) {
        updatedValues.totalIssues = (updatedValues.transactionIssues || 0) +
                                   (updatedValues.equipmentIssues || 0) +
                                   (updatedValues.networkIssues || 0) +
                                   (updatedValues.cashIssues || 0) +
                                   (updatedValues.cardIssues || 0) +
                                   (updatedValues.systemIssues || 0);
      }
      
      // Calculate resolution rate
      if (updatedValues.totalIssues > 0) {
        updatedValues.resolutionRate = Math.round((updatedValues.resolvedIssues / updatedValues.totalIssues) * 100);
      }
      
      return updatedValues;
    });
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Add new issue entry
  const addIssue = () => {
    setFormValues(prev => ({
      ...prev,
      issues: [
        ...prev.issues,
        {
          id: Date.now(),
          issueId: `ISS-${Date.now().toString().slice(-6)}`,
          category: '',
          priority: 'Medium',
          description: '',
          equipment: '',
          reportTime: formatTime(new Date()),
          status: 'New',
          assignedTo: '',
          resolutionTime: '',
          resolutionDetails: '',
          rootCause: '',
          preventiveAction: '',
          customerAffected: 0,
          financialImpact: 0
        }
      ]
    }));
  };

  // Remove issue entry
  const removeIssue = (id) => {
    setFormValues(prev => ({
      ...prev,
      issues: prev.issues.filter(issue => issue.id !== id)
    }));
  };

  // Update issue entry
  const updateIssue = (id, field, value) => {
    setFormValues(prev => ({
      ...prev,
      issues: prev.issues.map(issue => 
        issue.id === id ? { ...issue, [field]: value } : issue
      )
    }));
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

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolved': return <ResolvedIcon sx={{ color: '#2e7d32' }} />;
      case 'In Progress': return <PendingIcon sx={{ color: '#ed6c02' }} />;
      case 'Critical': return <CriticalIcon sx={{ color: '#d32f2f' }} />;
      default: return <IssueIcon sx={{ color: '#1976d2' }} />;
    }
  };

  // Calculate issue statistics
  const getIssueStats = () => {
    const total = formValues.issues.length;
    const resolved = formValues.issues.filter(issue => issue.status === 'Resolved').length;
    const inProgress = formValues.issues.filter(issue => issue.status === 'In Progress').length;
    const critical = formValues.issues.filter(issue => issue.priority === 'Critical').length;
    
    return { total, resolved, inProgress, critical };
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Calculate final statistics
    const stats = getIssueStats();
    const submitData = {
      ...formValues,
      totalIssues: stats.total,
      resolvedIssues: stats.resolved,
      pendingIssues: stats.inProgress,
      criticalIssues: stats.critical,
      reviewTime: formatTime(new Date()),
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
        slug: 'daily-transaction-register-mainline-issue',
        formType: 'daily-transaction-register-mainline-issue',
        submittedAt: new Date().toISOString(),
      };

      // Redux dispatch (will be added when reducer is available)
      console.log('Transaction Issue Register submitted:', formData);
      
      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/list/daily-transaction-register-mainline-issue');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save issue register. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const issueStats = getIssueStats();

  return (
    <AFCMainlineFormLayout
      title="Daily Transaction Register - Issue Tracking"
      onSubmit={handleSubmit}
      loading={loading}
      error={errors.submit}
      success={success}
      formId="AFC-ML-DTI-001"
    >
      <Grid container spacing={3}>
        {/* Header with Issue Statistics */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IssueIcon sx={{ fontSize: 32, color: '#f57c00' }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                    Transaction Issue Tracking & Resolution Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monitor and track all transaction-related issues with resolution workflow
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">
                  Current Time: {formatTime(time)}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Chip label={`Total: ${issueStats.total}`} size="small" color="primary" />
                  <Chip label={`Resolved: ${issueStats.resolved}`} size="small" color="success" />
                  <Chip label={`Critical: ${issueStats.critical}`} size="small" color="error" />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Resolution Progress Bar */}
        {issueStats.total > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="body2" gutterBottom>
                Resolution Progress: {issueStats.resolved}/{issueStats.total} issues resolved ({Math.round((issueStats.resolved/issueStats.total)*100)}%)
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(issueStats.resolved/issueStats.total)*100} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Paper>
          </Grid>
        )}

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
            label="Issue Date"
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
            name="reportedBy"
            label="Reported By"
            value={formValues.reportedBy}
            onChange={handleFieldChange}
            error={errors.reportedBy}
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

        {/* Issue Category Counts */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Issue Categories Summary
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="transactionIssues"
            label="Transaction Processing Issues"
            value={formValues.transactionIssues}
            onChange={handleFieldChange}
            error={errors.transactionIssues}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="equipmentIssues"
            label="Equipment Failure Issues"
            value={formValues.equipmentIssues}
            onChange={handleFieldChange}
            error={errors.equipmentIssues}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="networkIssues"
            label="Network Connectivity Issues"
            value={formValues.networkIssues}
            onChange={handleFieldChange}
            error={errors.networkIssues}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="cashIssues"
            label="Cash Handling Issues"
            value={formValues.cashIssues}
            onChange={handleFieldChange}
            error={errors.cashIssues}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="cardIssues"
            label="Card Processing Issues"
            value={formValues.cardIssues}
            onChange={handleFieldChange}
            error={errors.cardIssues}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="systemIssues"
            label="System Software Issues"
            value={formValues.systemIssues}
            onChange={handleFieldChange}
            error={errors.systemIssues}
          />
        </Grid>

        {/* Overall Impact Assessment */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Impact Assessment
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="select"
            name="impactLevel"
            label="Overall Impact Level"
            value={formValues.impactLevel}
            onChange={handleFieldChange}
            error={errors.impactLevel}
            options={['Low', 'Medium', 'High', 'Critical']}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="number"
            name="avgResolutionTime"
            label="Average Resolution Time (minutes)"
            value={formValues.avgResolutionTime}
            onChange={handleFieldChange}
            error={errors.avgResolutionTime}
          />
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="businessImpact"
            label="Business Impact Description"
            value={formValues.businessImpact}
            onChange={handleFieldChange}
            error={errors.businessImpact}
            placeholder="Describe the impact on business operations..."
          />
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="customerImpact"
            label="Customer Impact Description"
            value={formValues.customerImpact}
            onChange={handleFieldChange}
            error={errors.customerImpact}
            placeholder="Describe the impact on customer experience..."
          />
        </Grid>

        {/* Issue Details Table */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Detailed Issue Entries
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addIssue}
              size="small"
            >
              Add Issue
            </Button>
          </Box>

          {formValues.issues.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Issue ID</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Resolution</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formValues.issues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <Chip label={issue.issueId} size="small" />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="select"
                          name="category"
                          value={issue.category}
                          onChange={(field, value) => updateIssue(issue.id, 'category', value)}
                          options={['Transaction', 'Equipment', 'Network', 'Cash', 'Card', 'System']}
                          size="small"
                          fullWidth={false}
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="select"
                          name="priority"
                          value={issue.priority}
                          onChange={(field, value) => updateIssue(issue.id, 'priority', value)}
                          options={['Low', 'Medium', 'High', 'Critical']}
                          size="small"
                          fullWidth={false}
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 200 }}>
                        <UniversalAFCMainlineFormField
                          type="textarea"
                          name="description"
                          value={issue.description}
                          onChange={(field, value) => updateIssue(issue.id, 'description', value)}
                          placeholder="Issue description..."
                          rows={2}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(issue.status)}
                          <UniversalAFCMainlineFormField
                            type="select"
                            name="status"
                            value={issue.status}
                            onChange={(field, value) => updateIssue(issue.id, 'status', value)}
                            options={['New', 'In Progress', 'Resolved', 'Escalated', 'Closed']}
                            size="small"
                            fullWidth={false}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="assignedTo"
                          value={issue.assignedTo}
                          onChange={(field, value) => updateIssue(issue.id, 'assignedTo', value)}
                          placeholder="Employee name"
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 150 }}>
                        <UniversalAFCMainlineFormField
                          type="textarea"
                          name="resolutionDetails"
                          value={issue.resolutionDetails}
                          onChange={(field, value) => updateIssue(issue.id, 'resolutionDetails', value)}
                          placeholder="Resolution details..."
                          rows={1}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => removeIssue(issue.id)}
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
              No issues added yet. Click "Add Issue" to start tracking transaction issues.
            </Alert>
          )}
        </Grid>

        {/* Follow-up Actions */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Follow-up Actions & Recommendations
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="preventiveActions"
            label="Preventive Actions"
            value={formValues.preventiveActions}
            onChange={handleFieldChange}
            error={errors.preventiveActions}
            placeholder="Actions to prevent similar issues in the future..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="textarea"
            name="trainingNeeded"
            label="Training Requirements"
            value={formValues.trainingNeeded}
            onChange={handleFieldChange}
            error={errors.trainingNeeded}
            rows={3}
            placeholder="Staff training needs identified..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="textarea"
            name="systemUpdates"
            label="System Updates Recommended"
            value={formValues.systemUpdates}
            onChange={handleFieldChange}
            error={errors.systemUpdates}
            rows={3}
            placeholder="System improvements recommended..."
          />
        </Grid>

        {/* Summary & Review */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Summary & Review
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="shiftSummary"
            label="Shift Issue Summary"
            value={formValues.shiftSummary}
            onChange={handleFieldChange}
            error={errors.shiftSummary}
            required
            placeholder="Comprehensive summary of all issues encountered during the shift..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="reviewedBy"
            label="Reviewed By"
            value={formValues.reviewedBy}
            onChange={handleFieldChange}
            error={errors.reviewedBy}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="textarea"
            name="reviewComments"
            label="Review Comments"
            value={formValues.reviewComments}
            onChange={handleFieldChange}
            error={errors.reviewComments}
            rows={3}
            placeholder="Supervisor review comments..."
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
            placeholder="Additional observations and general remarks..."
          />
        </Grid>
      </Grid>
    </AFCMainlineFormLayout>
  );
};

export default DailyTransactionRegisterIssueMainlineForm;