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
  FindInPage as InspectionIcon,
  CheckCircle as ApprovalIcon,
  Warning as IssueIcon
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
 * Inspection Register Mainline Form - Equipment Inspection & Compliance Tracking
 * 
 * Form ID: 70 | Slug: inspection-register-mainline
 * Complexity: MEDIUM-HIGH - Handles equipment inspections, compliance checks, audit trails
 * Features: Dynamic inspection entries, compliance scoring, issue tracking, corrective actions
 */
const InspectionRegisterMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState('inspection-register-mainline');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update time every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 20000);
    return () => clearInterval(interval);
  }, []);

  // Initialize form with current date and defaults
  const [formValues, setFormValues] = useState({
    // Basic Information
    stn_name: '',                           // Station name
    date: formatDate(new Date()),           // Inspection date
    inspectionType: '',                     // Daily/Weekly/Monthly/Quarterly/Annual
    inspector: '',                          // Inspector name
    supervisorName: '',                     // Supervising officer
    shift: '',                              // Shift timing
    
    // Inspection Summary
    totalInspections: 0,                    // Total inspections conducted
    passedInspections: 0,                   // Inspections passed
    failedInspections: 0,                   // Inspections failed
    pendingInspections: 0,                  // Inspections pending review
    complianceScore: 0,                     // Overall compliance score (%)
    
    // Equipment Categories
    tvmInspections: 0,                      // TVM equipment inspections
    tomInspections: 0,                      // TOM equipment inspections
    gateInspections: 0,                     // Gate equipment inspections
    avmInspections: 0,                      // AVM equipment inspections
    bomInspections: 0,                      // BOM equipment inspections
    cctvInspections: 0,                     // CCTV equipment inspections
    
    // Safety Inspections
    fireSafetyCheck: '',                    // Fire safety compliance
    emergencyExitCheck: '',                 // Emergency exit accessibility
    firstAidCheck: '',                      // First aid equipment status
    safetySignageCheck: '',                 // Safety signage visibility
    lightingCheck: '',                      // Emergency lighting status
    accessibilityCheck: '',                 // Accessibility compliance
    
    // Environmental Checks
    cleanlinessStandard: '',                // Cleanliness standards check
    ventilationCheck: '',                   // Ventilation system status
    temperatureControl: '',                 // Temperature control check
    noiseLevel: '',                         // Noise level compliance
    wasteMgmtCheck: '',                     // Waste management compliance
    
    // Technical Inspections
    electricalSafetyCheck: '',              // Electrical safety compliance
    groundingCheck: '',                     // Equipment grounding check
    voltageStabilityCheck: '',              // Voltage stability check
    networkConnectivityCheck: '',           // Network connectivity status
    backupSystemsCheck: '',                 // Backup systems functionality
    
    // Inspection Entries Array
    inspectionEntries: [],                  // Dynamic array of inspection records
    
    // Issues & Non-compliance
    criticalIssues: 0,                      // Critical issues count
    majorIssues: 0,                         // Major issues count
    minorIssues: 0,                         // Minor issues count
    issuesResolved: 0,                      // Issues resolved during inspection
    
    // Compliance Areas
    operationalCompliance: 0,               // Operational compliance score
    safetyCompliance: 0,                    // Safety compliance score
    technicalCompliance: 0,                 // Technical compliance score
    environmentalCompliance: 0,             // Environmental compliance score
    
    // Corrective Actions
    immediateActions: '',                   // Actions taken immediately
    scheduledActions: '',                   // Actions scheduled for later
    preventiveActions: '',                  // Preventive measures recommended
    followUpRequired: '',                   // Follow-up inspections required
    
    // Quality Metrics
    inspectionEfficiency: 0,                // Inspection efficiency score
    issueDetectionRate: 0,                  // Issue detection rate (%)
    resolutionRate: 0,                      // Issue resolution rate (%)
    repeatIssueRate: 0,                     // Repeat issue rate (%)
    
    // Documentation
    photosTaken: 0,                         // Number of photos taken
    reportsGenerated: 0,                    // Reports generated count
    certificationsChecked: '',              // Certifications verification status
    warrantyDocuments: '',                  // Warranty documents verification
    
    // Training & Competency
    inspectorCertification: '',             // Inspector certification status
    trainingUpToDate: '',                   // Training status verification
    competencyVerified: '',                 // Competency verification
    
    // Previous Inspection
    lastInspectionDate: '',                 // Last inspection date
    previousIssues: '',                     // Issues from previous inspection
    improvementsSince: '',                  // Improvements since last inspection
    repeatIssues: '',                       // Repeat issues identified
    
    // Regulatory Compliance
    regulatoryStandards: '',                // Regulatory standards compliance
    certificationStatus: '',               // Equipment certification status
    auditRequirements: '',                  // Audit requirements compliance
    complianceGaps: '',                     // Identified compliance gaps
    
    // Recommendations
    maintenanceRecommendations: '',         // Maintenance recommendations
    upgradeRecommendations: '',             // Equipment upgrade suggestions
    trainingRecommendations: '',            // Staff training recommendations
    processImprovements: '',                // Process improvement suggestions
    
    // Risk Assessment
    riskLevel: '',                          // Overall risk level
    highRiskAreas: '',                      // High risk areas identified
    riskMitigationPlan: '',                 // Risk mitigation plan
    contingencyPlan: '',                    // Contingency plan requirements
    
    // Next Inspection
    nextInspectionDue: '',                  // Next inspection due date
    inspectionFrequency: '',                // Recommended inspection frequency
    specialInspectionsRequired: '',         // Special inspections required
    
    // Verification
    verifiedBy: '',                         // Verified by senior officer
    reviewComments: '',                     // Review comments
    approvedBy: '',                         // Final approval
    approvalDate: '',                       // Approval date
    
    // Summary
    overallAssessment: '',                  // Overall assessment
    inspectionConclusion: '',               // Inspection conclusion
    remarks: '',                           // General remarks
    
    // Timestamps
    inspectionStartTime: '',                // Inspection start time
    inspectionEndTime: '',                  // Inspection end time
    recordTime: formatTime(new Date()),     // Record creation time
  });

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => {
      const updatedValues = { ...prev, [fieldName]: value };
      
      // Auto-calculate compliance scores
      const complianceFields = [
        'fireSafetyCheck', 'emergencyExitCheck', 'firstAidCheck', 'safetySignageCheck',
        'cleanlinessStandard', 'electricalSafetyCheck', 'groundingCheck'
      ];
      
      if (complianceFields.includes(fieldName)) {
        const passCount = complianceFields.filter(field => updatedValues[field] === 'Pass').length;
        updatedValues.complianceScore = Math.round((passCount / complianceFields.length) * 100);
        
        // Calculate individual compliance scores
        const safetyFields = ['fireSafetyCheck', 'emergencyExitCheck', 'firstAidCheck', 'safetySignageCheck'];
        const safetyPassCount = safetyFields.filter(field => updatedValues[field] === 'Pass').length;
        updatedValues.safetyCompliance = Math.round((safetyPassCount / safetyFields.length) * 100);
        
        const technicalFields = ['electricalSafetyCheck', 'groundingCheck'];
        const technicalPassCount = technicalFields.filter(field => updatedValues[field] === 'Pass').length;
        updatedValues.technicalCompliance = Math.round((technicalPassCount / technicalFields.length) * 100);
      }
      
      // Calculate totals from inspection entries
      if (updatedValues.inspectionEntries.length > 0) {
        updatedValues.totalInspections = updatedValues.inspectionEntries.length;
        updatedValues.passedInspections = updatedValues.inspectionEntries.filter(entry => entry.result === 'Pass').length;
        updatedValues.failedInspections = updatedValues.inspectionEntries.filter(entry => entry.result === 'Fail').length;
        updatedValues.pendingInspections = updatedValues.inspectionEntries.filter(entry => entry.result === 'Pending').length;
        
        // Count issues by severity
        updatedValues.criticalIssues = updatedValues.inspectionEntries.filter(entry => entry.issueSeverity === 'Critical').length;
        updatedValues.majorIssues = updatedValues.inspectionEntries.filter(entry => entry.issueSeverity === 'Major').length;
        updatedValues.minorIssues = updatedValues.inspectionEntries.filter(entry => entry.issueSeverity === 'Minor').length;
      }
      
      // Calculate quality metrics
      if (updatedValues.totalInspections > 0) {
        updatedValues.resolutionRate = Math.round((updatedValues.issuesResolved / (updatedValues.criticalIssues + updatedValues.majorIssues + updatedValues.minorIssues)) * 100) || 0;
      }
      
      return updatedValues;
    });
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Add new inspection entry
  const addInspectionEntry = () => {
    setFormValues(prev => ({
      ...prev,
      inspectionEntries: [
        ...prev.inspectionEntries,
        {
          id: Date.now(),
          inspectionId: `INS-${Date.now().toString().slice(-6)}`,
          equipmentType: '',
          equipmentId: '',
          inspectionArea: '',
          checkpoints: '',
          result: 'Pending',
          findings: '',
          issueSeverity: 'None',
          issueDescription: '',
          correctiveAction: '',
          actionBy: '',
          actionDate: '',
          followUpRequired: 'No',
          inspectedBy: '',
          inspectionTime: formatTime(new Date()),
          complianceStatus: 'Compliant',
          remarks: ''
        }
      ]
    }));
  };

  // Remove inspection entry
  const removeInspectionEntry = (id) => {
    setFormValues(prev => ({
      ...prev,
      inspectionEntries: prev.inspectionEntries.filter(entry => entry.id !== id)
    }));
  };

  // Update inspection entry
  const updateInspectionEntry = (id, field, value) => {
    setFormValues(prev => ({
      ...prev,
      inspectionEntries: prev.inspectionEntries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    }));
  };

  // Get inspection result color
  const getResultColor = (result) => {
    switch (result) {
      case 'Pass': return 'success';
      case 'Fail': return 'error';
      case 'Conditional Pass': return 'warning';
      case 'Pending': return 'info';
      default: return 'default';
    }
  };

  // Get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'error';
      case 'Major': return 'warning';
      case 'Minor': return 'info';
      case 'None': return 'success';
      default: return 'default';
    }
  };

  // Get overall risk color
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'success';
      case 'Medium': return 'warning';
      case 'High': return 'error';
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
      inspectionEndTime: formatTime(new Date()),
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
        slug: 'inspection-register-mainline',
        formType: 'inspection-register-mainline',
        submittedAt: new Date().toISOString(),
      };

      // Redux dispatch (will be added when reducer is available)
      console.log('Inspection Register submitted:', formData);
      
      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/list/inspection-register-mainline');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save inspection register. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AFCMainlineFormLayout
      title="Inspection Register - Mainline"
      onSubmit={handleSubmit}
      loading={loading}
      error={errors.submit}
      success={success}
      successMessage="Inspection register saved successfully!"
    >
      <Box sx={{ width: '100%' }}>
        {/* Header Information */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'info.main', color: 'white' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <InspectionIcon sx={{ fontSize: 40 }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h5" gutterBottom>
                AFC-Mainline Inspection Register
              </Typography>
              <Typography variant="body1">
                Equipment Inspection & Compliance Tracking System
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">Compliance Score:</Typography>
                <Chip 
                  label={`${formValues.complianceScore}%`} 
                  color={formValues.complianceScore >= 90 ? 'success' : formValues.complianceScore >= 70 ? 'warning' : 'error'}
                  size="large"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Success/Error Messages */}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Inspection register saved successfully! Redirecting to list view...
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
            <InspectionIcon sx={{ mr: 1 }} />
            Inspection Information
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
                label="Inspection Date"
                value={formValues.date}
                onChange={(value) => handleFieldChange('date', value)}
                required
                error={errors.date}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="select"
                name="inspectionType"
                label="Inspection Type"
                value={formValues.inspectionType}
                onChange={(value) => handleFieldChange('inspectionType', value)}
                options={[
                  { value: 'Daily', label: 'Daily Inspection' },
                  { value: 'Weekly', label: 'Weekly Inspection' },
                  { value: 'Monthly', label: 'Monthly Inspection' },
                  { value: 'Quarterly', label: 'Quarterly Inspection' },
                  { value: 'Annual', label: 'Annual Inspection' },
                  { value: 'Special', label: 'Special Inspection' }
                ]}
                required
                error={errors.inspectionType}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="employee-signature"
                name="inspector"
                label="Inspector"
                value={formValues.inspector}
                onChange={(value) => handleFieldChange('inspector', value)}
                required
                error={errors.inspector}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Compliance Overview */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Compliance Overview
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">Overall Compliance</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={formValues.complianceScore} 
                      color={formValues.complianceScore >= 90 ? 'success' : formValues.complianceScore >= 70 ? 'warning' : 'error'}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {formValues.complianceScore}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="totalInspections"
                label="Total Inspections"
                value={formValues.totalInspections}
                onChange={(value) => handleFieldChange('totalInspections', value)}
                disabled
                InputProps={{ readOnly: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="number"
                name="criticalIssues"
                label="Critical Issues"
                value={formValues.criticalIssues}
                onChange={(value) => handleFieldChange('criticalIssues', value)}
                disabled
                InputProps={{ readOnly: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <UniversalAFCMainlineFormField
                type="select"
                name="riskLevel"
                label="Overall Risk Level"
                value={formValues.riskLevel}
                onChange={(value) => handleFieldChange('riskLevel', value)}
                options={[
                  { value: 'Low', label: 'Low Risk' },
                  { value: 'Medium', label: 'Medium Risk' },
                  { value: 'High', label: 'High Risk' },
                  { value: 'Critical', label: 'Critical Risk' }
                ]}
                error={errors.riskLevel}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Safety & Compliance Checks */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
            <CheckCircle sx={{ mr: 1 }} />
            Safety & Compliance Checks
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="quality-status"
                name="fireSafetyCheck"
                label="Fire Safety Check"
                value={formValues.fireSafetyCheck}
                onChange={(value) => handleFieldChange('fireSafetyCheck', value)}
                error={errors.fireSafetyCheck}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="quality-status"
                name="emergencyExitCheck"
                label="Emergency Exit Check"
                value={formValues.emergencyExitCheck}
                onChange={(value) => handleFieldChange('emergencyExitCheck', value)}
                error={errors.emergencyExitCheck}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="quality-status"
                name="firstAidCheck"
                label="First Aid Equipment"
                value={formValues.firstAidCheck}
                onChange={(value) => handleFieldChange('firstAidCheck', value)}
                error={errors.firstAidCheck}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="quality-status"
                name="cleanlinessStandard"
                label="Cleanliness Standard"
                value={formValues.cleanlinessStandard}
                onChange={(value) => handleFieldChange('cleanlinessStandard', value)}
                error={errors.cleanlinessStandard}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="quality-status"
                name="electricalSafetyCheck"
                label="Electrical Safety"
                value={formValues.electricalSafetyCheck}
                onChange={(value) => handleFieldChange('electricalSafetyCheck', value)}
                error={errors.electricalSafetyCheck}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="quality-status"
                name="accessibilityCheck"
                label="Accessibility Check"
                value={formValues.accessibilityCheck}
                onChange={(value) => handleFieldChange('accessibilityCheck', value)}
                error={errors.accessibilityCheck}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Inspection Entries Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
              <IssueIcon sx={{ mr: 1 }} />
              Detailed Inspections ({formValues.inspectionEntries.length})
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={addInspectionEntry}
            >
              Add Inspection
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {formValues.inspectionEntries.length > 0 ? (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell><strong>Inspection ID</strong></TableCell>
                    <TableCell><strong>Equipment</strong></TableCell>
                    <TableCell><strong>Area</strong></TableCell>
                    <TableCell><strong>Result</strong></TableCell>
                    <TableCell><strong>Issue Severity</strong></TableCell>
                    <TableCell><strong>Action Required</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formValues.inspectionEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="inspectionId"
                          value={entry.inspectionId}
                          onChange={(value) => updateInspectionEntry(entry.id, 'inspectionId', value)}
                          size="small"
                          disabled
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="afc-equipment"
                          name="equipmentType"
                          value={entry.equipmentType}
                          onChange={(value) => updateInspectionEntry(entry.id, 'equipmentType', value)}
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="inspectionArea"
                          value={entry.inspectionArea}
                          onChange={(value) => updateInspectionEntry(entry.id, 'inspectionArea', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={entry.result} 
                          color={getResultColor(entry.result)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={entry.issueSeverity} 
                          color={getSeverityColor(entry.issueSeverity)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="yes-no"
                          name="followUpRequired"
                          value={entry.followUpRequired}
                          onChange={(value) => updateInspectionEntry(entry.id, 'followUpRequired', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => removeInspectionEntry(entry.id)}
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
              No inspections recorded yet. Click "Add Inspection" to start recording inspection details.
            </Alert>
          )}
        </Paper>

        {/* Corrective Actions & Follow-up */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
            <ApprovalIcon sx={{ mr: 1 }} />
            Corrective Actions & Follow-up
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="immediateActions"
                label="Immediate Actions Taken"
                value={formValues.immediateActions}
                onChange={(value) => handleFieldChange('immediateActions', value)}
                multiline
                rows={3}
                error={errors.immediateActions}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <UniversalAFCMainlineFormField
                type="textarea"
                name="preventiveActions"
                label="Preventive Actions Recommended"
                value={formValues.preventiveActions}
                onChange={(value) => handleFieldChange('preventiveActions', value)}
                multiline
                rows={3}
                error={errors.preventiveActions}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="date"
                name="nextInspectionDue"
                label="Next Inspection Due"
                value={formValues.nextInspectionDue}
                onChange={(value) => handleFieldChange('nextInspectionDue', value)}
                error={errors.nextInspectionDue}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="select"
                name="inspectionFrequency"
                label="Recommended Frequency"
                value={formValues.inspectionFrequency}
                onChange={(value) => handleFieldChange('inspectionFrequency', value)}
                options={[
                  { value: 'Daily', label: 'Daily' },
                  { value: 'Weekly', label: 'Weekly' },
                  { value: 'Monthly', label: 'Monthly' },
                  { value: 'Quarterly', label: 'Quarterly' }
                ]}
                error={errors.inspectionFrequency}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UniversalAFCMainlineFormField
                type="yes-no"
                name="followUpRequired"
                label="Follow-up Required"
                value={formValues.followUpRequired}
                onChange={(value) => handleFieldChange('followUpRequired', value)}
                error={errors.followUpRequired}
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
                name="overallAssessment"
                label="Overall Assessment"
                value={formValues.overallAssessment}
                onChange={(value) => handleFieldChange('overallAssessment', value)}
                multiline
                rows={3}
                error={errors.overallAssessment}
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

export default InspectionRegisterMainlineForm;