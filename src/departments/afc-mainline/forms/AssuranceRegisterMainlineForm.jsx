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
  VerifiedUser as AssuranceIcon,
  Security as SecurityIcon,
  Assignment as DocumentIcon
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
 * Assurance Register Mainline Form - Quality Assurance & Compliance Documentation
 * 
 * Form ID: 63 | Slug: assurance-register-mainline
 * Complexity: MEDIUM - Handles quality assurance records, compliance tracking, audit documentation
 * Features: Dynamic assurance entries, compliance status, audit trail, quality metrics
 */
const AssuranceRegisterMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState('assurance-register-mainline');
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
    date: formatDate(new Date()),           // Assurance date
    shift: '',                              // Shift timing
    assuranceOfficer: '',                   // Quality assurance officer
    supervisorName: '',                     // Supervising officer
    
    // Assurance Summary
    totalChecks: 0,                         // Total assurance checks performed
    passedChecks: 0,                        // Checks that passed
    failedChecks: 0,                        // Checks that failed
    pendingChecks: 0,                       // Checks pending review
    
    // Compliance Categories
    safetyCompliance: '',                   // Safety compliance status
    operationalCompliance: '',              // Operational compliance status
    qualityCompliance: '',                  // Quality standards compliance
    documentationCompliance: '',            // Documentation compliance status
    equipmentCompliance: '',                // Equipment compliance status
    
    // Assurance Areas
    customerServiceAssurance: '',           // Customer service quality
    transactionAccuracyAssurance: '',       // Transaction processing accuracy
    equipmentFunctionalityAssurance: '',    // Equipment functionality check
    safetyProtocolAssurance: '',           // Safety protocol adherence
    cleanlinessStandardAssurance: '',       // Cleanliness standards check
    staffCompetencyAssurance: '',           // Staff competency verification
    
    // Quality Metrics
    customerSatisfactionScore: 0,           // Customer satisfaction rating (1-10)
    serviceQualityScore: 0,                 // Service quality rating (1-10)
    complianceScore: 0,                     // Overall compliance score (%)
    efficiencyScore: 0,                     // Operational efficiency score (%)
    
    // Assurance Entries Array
    assuranceEntries: [],                   // Dynamic array of assurance checks
    
    // Issues & Non-compliance
    nonComplianceIssues: '',                // Non-compliance issues identified
    correctiveActions: '',                  // Corrective actions taken
    preventiveActions: '',                  // Preventive measures implemented
    followUpRequired: '',                   // Follow-up actions required
    
    // Audit Trail
    previousAuditDate: '',                  // Previous audit date
    auditFindings: '',                      // Audit findings from previous review
    improvementsSince: '',                  // Improvements since last audit
    
    // Certifications & Approvals
    certificationsValid: '',               // Certifications validity status
    approvalsReceived: '',                  // Required approvals received
    complianceDocuments: '',               // Compliance documents status
    
    // Recommendations
    recommendations: '',                    // Quality improvement recommendations
    trainingRecommendations: '',           // Training recommendations
    systemImprovements: '',                // System improvement suggestions
    
    // Verification
    reviewedBy: '',                         // Reviewed by senior officer
    reviewComments: '',                     // Review comments
    approvedBy: '',                         // Final approval
    
    // Summary
    overallAssessment: '',                  // Overall quality assessment
    remarks: '',                           // General remarks
    
    // Timestamps
    assessmentTime: formatTime(new Date()), // Assessment completion time
    approvalTime: '',                       // Approval timestamp
  });

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => {
      const updatedValues = { ...prev, [fieldName]: value };
      
      // Auto-calculate compliance score based on assurance areas
      const assuranceFields = [
        'customerServiceAssurance',
        'transactionAccuracyAssurance', 
        'equipmentFunctionalityAssurance',
        'safetyProtocolAssurance',
        'cleanlinessStandardAssurance',
        'staffCompetencyAssurance'
      ];
      
      if (assuranceFields.includes(fieldName)) {
        const passCount = assuranceFields.filter(field => updatedValues[field] === 'Pass').length;
        updatedValues.complianceScore = Math.round((passCount / assuranceFields.length) * 100);
      }
      
      // Calculate check totals from entries
      if (updatedValues.assuranceEntries.length > 0) {
        updatedValues.totalChecks = updatedValues.assuranceEntries.length;
        updatedValues.passedChecks = updatedValues.assuranceEntries.filter(entry => entry.status === 'Pass').length;
        updatedValues.failedChecks = updatedValues.assuranceEntries.filter(entry => entry.status === 'Fail').length;
        updatedValues.pendingChecks = updatedValues.assuranceEntries.filter(entry => entry.status === 'Pending').length;
      }
      
      return updatedValues;
    });
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Add new assurance entry
  const addAssuranceEntry = () => {
    setFormValues(prev => ({
      ...prev,
      assuranceEntries: [
        ...prev.assuranceEntries,
        {
          id: Date.now(),
          checkId: `QA-${Date.now().toString().slice(-6)}`,
          category: '',
          description: '',
          standard: '',
          checkBy: '',
          checkTime: formatTime(new Date()),
          status: 'Pending',
          findings: '',
          actionRequired: '',
          completionDate: '',
          verifiedBy: '',
          complianceLevel: 'Full'
        }
      ]
    }));
  };

  // Remove assurance entry
  const removeAssuranceEntry = (id) => {
    setFormValues(prev => ({
      ...prev,
      assuranceEntries: prev.assuranceEntries.filter(entry => entry.id !== id)
    }));
  };

  // Update assurance entry
  const updateAssuranceEntry = (id, field, value) => {
    setFormValues(prev => ({
      ...prev,
      assuranceEntries: prev.assuranceEntries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    }));
  };

  // Get compliance color
  const getComplianceColor = (status) => {
    switch (status) {
      case 'Pass':
      case 'Compliant': return 'success';
      case 'Fail':
      case 'Non-compliant': return 'error';
      case 'Partial': return 'warning';
      case 'Pending': return 'info';
      default: return 'default';
    }
  };

  // Get overall compliance status
  const getOverallStatus = () => {
    const score = formValues.complianceScore;
    if (score >= 95) return { status: 'Excellent', color: 'success' };
    if (score >= 85) return { status: 'Good', color: 'info' };
    if (score >= 70) return { status: 'Satisfactory', color: 'warning' };
    return { status: 'Needs Improvement', color: 'error' };
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Final calculations and validations
    const submitData = {
      ...formValues,
      approvalTime: formatTime(new Date()),
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
        slug: 'assurance-register-mainline',
        formType: 'assurance-register-mainline',
        submittedAt: new Date().toISOString(),
      };

      // Redux dispatch (will be added when reducer is available)
      console.log('Assurance Register submitted:', formData);
      
      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/list/assurance-register-mainline');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save assurance register. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const overallStatus = getOverallStatus();

  return (
    <AFCMainlineFormLayout
      title="Assurance Register - Mainline"
      onSubmit={handleSubmit}
      loading={loading}
      error={errors.submit}
      success={success}
      formId="AFC-ML-ASR-001"
    >
      <Grid container spacing={3}>
        {/* Header with Compliance Status */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: '#e8f5e8' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AssuranceIcon sx={{ fontSize: 32, color: '#2e7d32' }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    Quality Assurance & Compliance Register
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comprehensive quality monitoring and compliance documentation
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">
                  Assessment Time: {formatTime(time)}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Chip 
                    label={`Compliance: ${formValues.complianceScore}%`} 
                    color={getComplianceColor(formValues.complianceScore >= 85 ? 'Pass' : 'Fail')}
                    size="small"
                  />
                  <Chip 
                    label={overallStatus.status}
                    color={overallStatus.color}
                    size="small"
                  />
                </Box>
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
            label="Assurance Date"
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
            options={['Morning (6:00-14:00)', 'Evening (14:00-22:00)', 'Night (22:00-6:00)', 'Full Day']}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="assuranceOfficer"
            label="Quality Assurance Officer"
            value={formValues.assuranceOfficer}
            onChange={handleFieldChange}
            error={errors.assuranceOfficer}
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

        {/* Compliance Status */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Compliance Status
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="safetyCompliance"
            label="Safety Compliance"
            value={formValues.safetyCompliance}
            onChange={handleFieldChange}
            error={errors.safetyCompliance}
            options={['Compliant', 'Non-compliant', 'Partial', 'Under Review']}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="operationalCompliance"
            label="Operational Compliance"
            value={formValues.operationalCompliance}
            onChange={handleFieldChange}
            error={errors.operationalCompliance}
            options={['Compliant', 'Non-compliant', 'Partial', 'Under Review']}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="qualityCompliance"
            label="Quality Standards Compliance"
            value={formValues.qualityCompliance}
            onChange={handleFieldChange}
            error={errors.qualityCompliance}
            options={['Compliant', 'Non-compliant', 'Partial', 'Under Review']}
            required
          />
        </Grid>

        {/* Assurance Areas Checklist */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Quality Assurance Areas
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="select"
            name="customerServiceAssurance"
            label="Customer Service Quality"
            value={formValues.customerServiceAssurance}
            onChange={handleFieldChange}
            error={errors.customerServiceAssurance}
            options={['Pass', 'Fail', 'Needs Improvement', 'Excellent']}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="select"
            name="transactionAccuracyAssurance"
            label="Transaction Processing Accuracy"
            value={formValues.transactionAccuracyAssurance}
            onChange={handleFieldChange}
            error={errors.transactionAccuracyAssurance}
            options={['Pass', 'Fail', 'Needs Improvement', 'Excellent']}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="select"
            name="equipmentFunctionalityAssurance"
            label="Equipment Functionality Check"
            value={formValues.equipmentFunctionalityAssurance}
            onChange={handleFieldChange}
            error={errors.equipmentFunctionalityAssurance}
            options={['Pass', 'Fail', 'Needs Improvement', 'Excellent']}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="select"
            name="safetyProtocolAssurance"
            label="Safety Protocol Adherence"
            value={formValues.safetyProtocolAssurance}
            onChange={handleFieldChange}
            error={errors.safetyProtocolAssurance}
            options={['Pass', 'Fail', 'Needs Improvement', 'Excellent']}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="select"
            name="cleanlinessStandardAssurance"
            label="Cleanliness Standards Check"
            value={formValues.cleanlinessStandardAssurance}
            onChange={handleFieldChange}
            error={errors.cleanlinessStandardAssurance}
            options={['Pass', 'Fail', 'Needs Improvement', 'Excellent']}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="select"
            name="staffCompetencyAssurance"
            label="Staff Competency Verification"
            value={formValues.staffCompetencyAssurance}
            onChange={handleFieldChange}
            error={errors.staffCompetencyAssurance}
            options={['Pass', 'Fail', 'Needs Improvement', 'Excellent']}
          />
        </Grid>

        {/* Quality Metrics */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Quality Metrics & Scores
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="customerSatisfactionScore"
            label="Customer Satisfaction (1-10)"
            value={formValues.customerSatisfactionScore}
            onChange={handleFieldChange}
            error={errors.customerSatisfactionScore}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="serviceQualityScore"
            label="Service Quality (1-10)"
            value={formValues.serviceQualityScore}
            onChange={handleFieldChange}
            error={errors.serviceQualityScore}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="efficiencyScore"
            label="Operational Efficiency (%)"
            value={formValues.efficiencyScore}
            onChange={handleFieldChange}
            error={errors.efficiencyScore}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f0f8ff' }}>
            <Typography variant="body2" color="text.secondary">
              Compliance Score
            </Typography>
            <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              {formValues.complianceScore}%
            </Typography>
          </Paper>
        </Grid>

        {/* Detailed Assurance Entries */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              <DocumentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Detailed Assurance Checks
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addAssuranceEntry}
              size="small"
            >
              Add Check
            </Button>
          </Box>

          {formValues.assuranceEntries.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Check ID</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Standard</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Findings</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formValues.assuranceEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <Chip label={entry.checkId} size="small" />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="select"
                          name="category"
                          value={entry.category}
                          onChange={(field, value) => updateAssuranceEntry(entry.id, 'category', value)}
                          options={['Safety', 'Quality', 'Compliance', 'Operational', 'Documentation']}
                          size="small"
                          fullWidth={false}
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 200 }}>
                        <UniversalAFCMainlineFormField
                          type="textarea"
                          name="description"
                          value={entry.description}
                          onChange={(field, value) => updateAssuranceEntry(entry.id, 'description', value)}
                          placeholder="Check description..."
                          rows={1}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="standard"
                          value={entry.standard}
                          onChange={(field, value) => updateAssuranceEntry(entry.id, 'standard', value)}
                          placeholder="Standard/Benchmark"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="select"
                          name="status"
                          value={entry.status}
                          onChange={(field, value) => updateAssuranceEntry(entry.id, 'status', value)}
                          options={['Pass', 'Fail', 'Pending', 'N/A']}
                          size="small"
                          fullWidth={false}
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 150 }}>
                        <UniversalAFCMainlineFormField
                          type="textarea"
                          name="findings"
                          value={entry.findings}
                          onChange={(field, value) => updateAssuranceEntry(entry.id, 'findings', value)}
                          placeholder="Findings..."
                          rows={1}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => removeAssuranceEntry(entry.id)}
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
              No assurance checks added yet. Click "Add Check" to start documenting quality assurance activities.
            </Alert>
          )}
        </Grid>

        {/* Issues & Actions */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Issues & Corrective Actions
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="nonComplianceIssues"
            label="Non-compliance Issues Identified"
            value={formValues.nonComplianceIssues}
            onChange={handleFieldChange}
            error={errors.nonComplianceIssues}
            placeholder="Describe any non-compliance issues identified during the assessment..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="correctiveActions"
            label="Corrective Actions Taken"
            value={formValues.correctiveActions}
            onChange={handleFieldChange}
            error={errors.correctiveActions}
            placeholder="Actions taken to address issues..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="preventiveActions"
            label="Preventive Actions Implemented"
            value={formValues.preventiveActions}
            onChange={handleFieldChange}
            error={errors.preventiveActions}
            placeholder="Preventive measures to avoid future issues..."
          />
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Recommendations & Improvements
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="recommendations"
            label="Quality Improvement Recommendations"
            value={formValues.recommendations}
            onChange={handleFieldChange}
            error={errors.recommendations}
            placeholder="Recommendations for improving quality and compliance..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="textarea"
            name="trainingRecommendations"
            label="Training Recommendations"
            value={formValues.trainingRecommendations}
            onChange={handleFieldChange}
            error={errors.trainingRecommendations}
            rows={3}
            placeholder="Staff training needs and recommendations..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="textarea"
            name="systemImprovements"
            label="System Improvement Suggestions"
            value={formValues.systemImprovements}
            onChange={handleFieldChange}
            error={errors.systemImprovements}
            rows={3}
            placeholder="System and process improvement suggestions..."
          />
        </Grid>

        {/* Verification & Approval */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Verification & Approval
          </Typography>
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
            type="employee-signature"
            name="approvedBy"
            label="Approved By"
            value={formValues.approvedBy}
            onChange={handleFieldChange}
            error={errors.approvedBy}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="overallAssessment"
            label="Overall Quality Assessment"
            value={formValues.overallAssessment}
            onChange={handleFieldChange}
            error={errors.overallAssessment}
            required
            placeholder="Comprehensive assessment of quality and compliance status..."
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

export default AssuranceRegisterMainlineForm;