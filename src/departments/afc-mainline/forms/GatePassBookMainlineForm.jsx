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
  ExitToApp as GatePassIcon,
  Security as SecurityIcon,
  Assignment as DocumentIcon,
  Person as VisitorIcon
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
 * Gate Pass Book Mainline Form - Visitor & Material Entry/Exit Documentation
 * 
 * Form ID: 68 | Slug: gate-pass-book-mainline
 * Complexity: LOW-MEDIUM - Handles visitor passes, material movement, security documentation
 * Features: Dynamic gate pass entries, visitor tracking, material movement, security verification
 */
const GatePassBookMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState('gate-pass-book-mainline');
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
    date: formatDate(new Date()),           // Gate pass date
    shift: '',                              // Shift timing
    securityOfficer: '',                    // Security officer on duty
    supervisorName: '',                     // Supervising officer
    
    // Gate Pass Summary
    totalGatePasses: 0,                     // Total gate passes issued
    visitorPasses: 0,                       // Visitor gate passes
    materialPasses: 0,                      // Material movement passes
    contractorPasses: 0,                    // Contractor passes
    officialPasses: 0,                      // Official visitor passes
    
    // Pass Status Summary
    activeePasses: 0,                       // Currently active passes
    expiredPasses: 0,                       // Expired passes
    returnedPasses: 0,                      // Returned passes
    pendingPasses: 0,                       // Pending return passes
    
    // Security Status
    securityStatus: '',                     // Overall security status
    accessControlStatus: '',               // Access control system status
    visitorManagementStatus: '',           // Visitor management status
    materialCheckStatus: '',               // Material checking status
    
    // Gate Pass Entries Array
    gatePasses: [],                         // Dynamic array of gate pass entries
    
    // Material Movement Summary
    inwardMaterial: '',                     // Inward material description
    outwardMaterial: '',                    // Outward material description
    materialVerified: '',                   // Material verification status
    materialAuthorized: '',                 // Material authorization status
    
    // Visitor Summary
    totalVisitors: 0,                       // Total visitors
    pendingVisitors: 0,                     // Visitors still inside
    escortedVisitors: 0,                    // Visitors with escort
    unescortedVisitors: 0,                  // Visitors without escort
    
    // Security Incidents
    securityIncidents: '',                  // Security incidents (if any)
    unauthorizedAttempts: '',               // Unauthorized access attempts
    alertsTriggered: '',                    // Security alerts triggered
    
    // Verification & Compliance
    idVerificationStatus: '',               // ID verification status
    backgroundCheckStatus: '',              // Background check status
    complianceStatus: '',                   // Overall compliance status
    auditReadiness: '',                     // Audit readiness status
    
    // Special Cases
    afterHoursAccess: '',                   // After hours access requests
    emergencyAccess: '',                    // Emergency access granted
    vipVisitors: '',                        // VIP visitor handling
    contractorWork: '',                     // Contractor work details
    
    // Documentation
    documentsCollected: '',                 // Documents collected status
    returnsVerified: '',                    // Returns verification status
    recordsUpdated: '',                     // Records update status
    
    // Summary & Review
    dailySummary: '',                       // Daily security summary
    recommendations: '',                    // Security recommendations
    remarks: '',                            // General remarks
    
    // Verification
    verifiedBy: '',                         // Verified by senior officer
    reviewedBy: '',                         // Reviewed by supervisor
    
    // Timestamps
    logTime: formatTime(new Date()),        // Log completion time
    reviewTime: '',                         // Review completion time
  });

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => {
      const updatedValues = { ...prev, [fieldName]: value };
      
      // Auto-calculate gate pass totals
      if (['visitorPasses', 'materialPasses', 'contractorPasses', 'officialPasses'].includes(fieldName)) {
        updatedValues.totalGatePasses = (updatedValues.visitorPasses || 0) + 
                                       (updatedValues.materialPasses || 0) + 
                                       (updatedValues.contractorPasses || 0) + 
                                       (updatedValues.officialPasses || 0);
      }
      
      // Calculate visitor totals from gate passes
      if (updatedValues.gatePasses.length > 0) {
        const visitors = updatedValues.gatePasses.filter(pass => pass.passType === 'Visitor');
        updatedValues.totalVisitors = visitors.length;
        updatedValues.pendingVisitors = visitors.filter(pass => pass.status === 'Active').length;
        updatedValues.escortedVisitors = visitors.filter(pass => pass.escortRequired === 'Yes').length;
        updatedValues.unescortedVisitors = visitors.filter(pass => pass.escortRequired === 'No').length;
      }
      
      return updatedValues;
    });
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Add new gate pass entry
  const addGatePass = () => {
    setFormValues(prev => ({
      ...prev,
      gatePasses: [
        ...prev.gatePasses,
        {
          id: Date.now(),
          passNumber: `GP-${Date.now().toString().slice(-6)}`,
          passType: '',
          visitorName: '',
          organization: '',
          purpose: '',
          contactPerson: '',
          department: '',
          idType: '',
          idNumber: '',
          entryTime: formatTime(new Date()),
          exitTime: '',
          duration: '',
          escortRequired: 'No',
          escortName: '',
          materialDescription: '',
          authorization: '',
          status: 'Active',
          verifiedBy: '',
          remarks: ''
        }
      ]
    }));
  };

  // Remove gate pass entry
  const removeGatePass = (id) => {
    setFormValues(prev => ({
      ...prev,
      gatePasses: prev.gatePasses.filter(pass => pass.id !== id)
    }));
  };

  // Update gate pass entry
  const updateGatePass = (id, field, value) => {
    setFormValues(prev => ({
      ...prev,
      gatePasses: prev.gatePasses.map(pass => 
        pass.id === id ? { ...pass, [field]: value } : pass
      )
    }));
  };

  // Get pass type color
  const getPassTypeColor = (type) => {
    switch (type) {
      case 'Visitor': return 'primary';
      case 'Material': return 'secondary';
      case 'Contractor': return 'warning';
      case 'Official': return 'success';
      case 'Emergency': return 'error';
      default: return 'default';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Expired': return 'error';
      case 'Returned': return 'info';
      case 'Cancelled': return 'default';
      default: return 'default';
    }
  };

  // Get security status indicator
  const getSecurityStatusIndicator = () => {
    const unauthorized = formValues.unauthorizedAttempts;
    const incidents = formValues.securityIncidents;
    
    if (unauthorized || incidents) {
      return { status: 'Alert', color: 'error', icon: '🚨' };
    }
    return { status: 'Secure', color: 'success', icon: '🔒' };
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Calculate final statistics
    const submitData = {
      ...formValues,
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
        slug: 'gate-pass-book-mainline',
        formType: 'gate-pass-book-mainline',
        submittedAt: new Date().toISOString(),
      };

      // Redux dispatch (will be added when reducer is available)
      console.log('Gate Pass Book submitted:', formData);
      
      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/list/gate-pass-book-mainline');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save gate pass book. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const securityIndicator = getSecurityStatusIndicator();

  return (
    <AFCMainlineFormLayout
      title="Gate Pass Book - Mainline"
      onSubmit={handleSubmit}
      loading={loading}
      error={errors.submit}
      success={success}
      formId="AFC-ML-GPB-001"
    >
      <Grid container spacing={3}>
        {/* Header with Security Status */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: '#f3e5f5' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <GatePassIcon sx={{ fontSize: 32, color: '#7b1fa2' }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>
                    Visitor & Material Entry/Exit Documentation
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comprehensive security gate pass management and visitor tracking
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">
                  Log Time: {formatTime(time)}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Chip label={`Passes: ${formValues.totalGatePasses}`} size="small" color="primary" />
                  <Chip label={`Security: ${securityIndicator.status} ${securityIndicator.icon}`} size="small" color={securityIndicator.color} />
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
            label="Date"
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
            name="securityOfficer"
            label="Security Officer"
            value={formValues.securityOfficer}
            onChange={handleFieldChange}
            error={errors.securityOfficer}
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

        {/* Gate Pass Summary */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            <DocumentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Gate Pass Summary
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="visitorPasses"
            label="Visitor Passes"
            value={formValues.visitorPasses}
            onChange={handleFieldChange}
            error={errors.visitorPasses}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="materialPasses"
            label="Material Passes"
            value={formValues.materialPasses}
            onChange={handleFieldChange}
            error={errors.materialPasses}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="contractorPasses"
            label="Contractor Passes"
            value={formValues.contractorPasses}
            onChange={handleFieldChange}
            error={errors.contractorPasses}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f0f8ff' }}>
            <Typography variant="body2" color="text.secondary">
              Total Passes
            </Typography>
            <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              {formValues.totalGatePasses}
            </Typography>
          </Paper>
        </Grid>

        {/* Security Status */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Security Status
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="securityStatus"
            label="Overall Security Status"
            value={formValues.securityStatus}
            onChange={handleFieldChange}
            error={errors.securityStatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="accessControlStatus"
            label="Access Control Status"
            value={formValues.accessControlStatus}
            onChange={handleFieldChange}
            error={errors.accessControlStatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="idVerificationStatus"
            label="ID Verification Status"
            value={formValues.idVerificationStatus}
            onChange={handleFieldChange}
            error={errors.idVerificationStatus}
            options={['All Verified', 'Partial Verification', 'Issues Found', 'System Down']}
            required
          />
        </Grid>

        {/* Gate Pass Entries Table */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              <VisitorIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Gate Pass Entries
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addGatePass}
              size="small"
            >
              Add Gate Pass
            </Button>
          </Box>

          {formValues.gatePasses.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Pass #</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Visitor Name</TableCell>
                    <TableCell>Organization</TableCell>
                    <TableCell>Purpose</TableCell>
                    <TableCell>ID Details</TableCell>
                    <TableCell>Entry Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formValues.gatePasses.map((pass) => (
                    <TableRow key={pass.id}>
                      <TableCell>
                        <Chip 
                          label={pass.passNumber} 
                          size="small" 
                          color={getPassTypeColor(pass.passType)}
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="select"
                          name="passType"
                          value={pass.passType}
                          onChange={(field, value) => updateGatePass(pass.id, 'passType', value)}
                          options={['Visitor', 'Material', 'Contractor', 'Official', 'Emergency']}
                          size="small"
                          fullWidth={false}
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 150 }}>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="visitorName"
                          value={pass.visitorName}
                          onChange={(field, value) => updateGatePass(pass.id, 'visitorName', value)}
                          placeholder="Full name"
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 120 }}>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="organization"
                          value={pass.organization}
                          onChange={(field, value) => updateGatePass(pass.id, 'organization', value)}
                          placeholder="Organization"
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 150 }}>
                        <UniversalAFCMainlineFormField
                          type="textarea"
                          name="purpose"
                          value={pass.purpose}
                          onChange={(field, value) => updateGatePass(pass.id, 'purpose', value)}
                          placeholder="Visit purpose"
                          rows={1}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 120 }}>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="idNumber"
                          value={pass.idNumber}
                          onChange={(field, value) => updateGatePass(pass.id, 'idNumber', value)}
                          placeholder="ID number"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="time"
                          name="entryTime"
                          value={pass.entryTime}
                          onChange={(field, value) => updateGatePass(pass.id, 'entryTime', value)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={pass.status} 
                          size="small" 
                          color={getStatusColor(pass.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => removeGatePass(pass.id)}
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
              No gate passes added yet. Click "Add Gate Pass" to start documenting visitor and material entries.
            </Alert>
          )}
        </Grid>

        {/* Material Movement */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Material Movement
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="inwardMaterial"
            label="Inward Material"
            value={formValues.inwardMaterial}
            onChange={handleFieldChange}
            error={errors.inwardMaterial}
            placeholder="Description of incoming material and equipment..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="outwardMaterial"
            label="Outward Material"
            value={formValues.outwardMaterial}
            onChange={handleFieldChange}
            error={errors.outwardMaterial}
            placeholder="Description of outgoing material and equipment..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="select"
            name="materialVerified"
            label="Material Verification Status"
            value={formValues.materialVerified}
            onChange={handleFieldChange}
            error={errors.materialVerified}
            options={['All Verified', 'Partial Verification', 'Pending Verification', 'Issues Found']}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="select"
            name="materialAuthorized"
            label="Material Authorization Status"
            value={formValues.materialAuthorized}
            onChange={handleFieldChange}
            error={errors.materialAuthorized}
            options={['Authorized', 'Pending Authorization', 'Rejected', 'Under Review']}
          />
        </Grid>

        {/* Security Incidents & Special Cases */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Security Incidents & Special Cases
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="securityIncidents"
            label="Security Incidents (if any)"
            value={formValues.securityIncidents}
            onChange={handleFieldChange}
            error={errors.securityIncidents}
            placeholder="Describe any security incidents that occurred..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="textarea"
            name="vipVisitors"
            label="VIP Visitors"
            value={formValues.vipVisitors}
            onChange={handleFieldChange}
            error={errors.vipVisitors}
            rows={3}
            placeholder="VIP visitor details and special arrangements..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="textarea"
            name="emergencyAccess"
            label="Emergency Access"
            value={formValues.emergencyAccess}
            onChange={handleFieldChange}
            error={errors.emergencyAccess}
            rows={3}
            placeholder="Emergency access granted and circumstances..."
          />
        </Grid>

        {/* Compliance & Verification */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Compliance & Verification
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="complianceStatus"
            label="Compliance Status"
            value={formValues.complianceStatus}
            onChange={handleFieldChange}
            error={errors.complianceStatus}
            options={['Fully Compliant', 'Minor Issues', 'Major Issues', 'Non-compliant']}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="documentsCollected"
            label="Documents Collected"
            value={formValues.documentsCollected}
            onChange={handleFieldChange}
            error={errors.documentsCollected}
            options={['All Collected', 'Partial Collection', 'Missing Documents', 'N/A']}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="returnsVerified"
            label="Returns Verified"
            value={formValues.returnsVerified}
            onChange={handleFieldChange}
            error={errors.returnsVerified}
            options={['All Verified', 'Partial Verification', 'Pending Returns', 'Issues Found']}
          />
        </Grid>

        {/* Summary & Recommendations */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Summary & Recommendations
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="dailySummary"
            label="Daily Security Summary"
            value={formValues.dailySummary}
            onChange={handleFieldChange}
            error={errors.dailySummary}
            required
            placeholder="Comprehensive summary of security activities, visitor management, and material movement..."
          />
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="textarea"
            name="recommendations"
            label="Security Recommendations"
            value={formValues.recommendations}
            onChange={handleFieldChange}
            error={errors.recommendations}
            rows={3}
            placeholder="Recommendations for improving security and access control..."
          />
        </Grid>

        {/* Verification & Sign-off */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Verification & Sign-off
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
            type="employee-signature"
            name="reviewedBy"
            label="Reviewed By"
            value={formValues.reviewedBy}
            onChange={handleFieldChange}
            error={errors.reviewedBy}
            required
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

export default GatePassBookMainlineForm;