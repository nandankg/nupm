import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Paper, Chip, Alert } from '@mui/material';
import { CheckCircle, Warning, Error as ErrorIcon } from '@mui/icons-material';

// Import universal components
import { 
  UniversalAFCMainlineFormField, 
  AFCMainlineFormLayout,
  validateForm,
  dailyChecklistMainlineValidation 
} from '../components';

// Import date formatting utilities (preserve existing patterns)
import { formatDate, formatTime } from '../../../data/formatDate';

/**
 * Daily Checklist Mainline Form - Built with Universal Component Architecture
 * 
 * Form ID: 65 | Slug: daily-checklist-mainline
 * Created from formlist.md specification using universal components
 */
const DailyChecklistMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState('daily-checklist-mainline');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update time every 15 seconds (optimized from original 1 second)
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  // Initialize form with current date and defaults
  const [formValues, setFormValues] = useState({
    // Basic Information
    stn_name: '',                 // Station name
    date: formatDate(new Date()), // Current date
    shift: '',                    // Shift timing
    checkedBy: '',               // Checked by person
    verifiedBy: '',              // Verified by person
    
    // Equipment Status Checks
    tvmStatus: '',               // TVM equipment status
    tomStatus: '',               // TOM equipment status  
    gateStatus: '',              // Gate equipment status
    avmStatus: '',               // AVM equipment status
    bomStatus: '',               // BOM equipment status
    cctvStatus: '',              // CCTV system status
    paSystemStatus: '',          // PA System status
    scadaStatus: '',             // SCADA System status
    
    // Equipment Count & Details
    tvmCount: 0,                 // Number of TVM units
    tomCount: 0,                 // Number of TOM units
    gateCount: 0,                // Number of gates
    avmCount: 0,                 // Number of AVM units
    
    // Operational Checks
    cleanlinessCheck: '',        // Station cleanliness
    lightingCheck: '',           // Lighting systems
    announcementCheck: '',       // Announcement systems
    emergencyCheck: '',          // Emergency systems
    securityCheck: '',           // Security systems
    
    // Issues and Actions
    issuesFound: '',             // Issues identified
    actionsToken: '',            // Actions taken
    pendingItems: '',            // Pending items
    
    // Overall Assessment
    overallStatus: '',           // Overall station status
    remarks: '',                 // General remarks
    
    // Timestamps
    checkStartTime: formatTime(new Date()),
    checkEndTime: '',
  });

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Calculate overall status based on equipment checks
  const calculateOverallStatus = () => {
    const equipmentStatuses = [
      formValues.tvmStatus,
      formValues.tomStatus,
      formValues.gateStatus,
      formValues.avmStatus,
      formValues.bomStatus,
      formValues.cctvStatus,
      formValues.paSystemStatus,
      formValues.scadaStatus
    ].filter(status => status !== '');

    const faultCount = equipmentStatuses.filter(status => status === 'Fault').length;
    const maintenanceCount = equipmentStatuses.filter(status => status === 'Maintenance').length;
    
    if (faultCount > 0) return 'Critical Issues';
    if (maintenanceCount > 2) return 'Multiple Maintenance';
    if (maintenanceCount > 0) return 'Minor Issues';
    if (equipmentStatuses.length > 0 && equipmentStatuses.every(status => status === 'OK')) return 'All Systems OK';
    return 'Incomplete';
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Set end time
    const submitData = {
      ...formValues,
      checkEndTime: formatTime(new Date()),
      overallStatus: calculateOverallStatus(),
    };

    // Validate form
    const validation = validateForm(submitData, dailyChecklistMainlineValidation);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    try {
      // Prepare form data for dispatch
      const formData = {
        ...submitData,
        slug: 'daily-checklist-mainline',
        formType: 'daily-checklist-mainline',
        submittedAt: new Date().toISOString(),
        overallStatus: calculateOverallStatus(),
      };

      // Note: Redux dispatch will be added once reducer is available
      // dispatch(addDailyChecklist(formData));
      console.log('Form submitted:', formData);
      
      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/list/daily-checklist-mainline');
      }, 2000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save checklist. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Get status color for visual indicators
  const getStatusColor = (status) => {
    switch (status) {
      case 'OK': return 'success';
      case 'Fault': return 'error';
      case 'Maintenance': return 'warning';
      case 'Out of Service': return 'default';
      default: return 'default';
    }
  };

  return (
    <AFCMainlineFormLayout
      title="Daily Checklist - Mainline"
      onSubmit={handleSubmit}
      loading={loading}
      error={errors.submit}
      success={success}
      formId="AFC-ML-DAILY-001"
    >
      <Grid container spacing={3}>
        {/* Header Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#1976d2' }}>
                Daily Equipment & System Checklist
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Current Time: {formatTime(time)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Basic Information */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Basic Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
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

        <Grid item xs={12} md={6}>
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
            options={['Morning (6:00-14:00)', 'Evening (14:00-22:00)', 'Night (22:00-6:00)']}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="checkedBy"
            label="Checked By"
            value={formValues.checkedBy}
            onChange={handleFieldChange}
            error={errors.checkedBy}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
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

        {/* Equipment Status Checks */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mt: 2 }}>
            Equipment Status Checks
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="tvmStatus"
            label="TVM (Ticket Vending Machine)"
            value={formValues.tvmStatus}
            onChange={handleFieldChange}
            error={errors.tvmStatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="tomStatus"
            label="TOM (Ticket Office Machine)"
            value={formValues.tomStatus}
            onChange={handleFieldChange}
            error={errors.tomStatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="gateStatus"
            label="Entry/Exit Gates"
            value={formValues.gateStatus}
            onChange={handleFieldChange}
            error={errors.gateStatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="avmStatus"
            label="AVM (Add Value Machine)"
            value={formValues.avmStatus}
            onChange={handleFieldChange}
            error={errors.avmStatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="bomStatus"
            label="BOM (Booking Office Machine)"
            value={formValues.bomStatus}
            onChange={handleFieldChange}
            error={errors.bomStatus}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="cctvStatus"
            label="CCTV System"
            value={formValues.cctvStatus}
            onChange={handleFieldChange}
            error={errors.cctvStatus}
          />
        </Grid>

        {/* System Checks */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mt: 2 }}>
            System Operational Checks
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="yes-no"
            name="cleanlinessCheck"
            label="Station Cleanliness"
            value={formValues.cleanlinessCheck}
            onChange={handleFieldChange}
            error={errors.cleanlinessCheck}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="yes-no"
            name="lightingCheck"
            label="Lighting Systems"
            value={formValues.lightingCheck}
            onChange={handleFieldChange}
            error={errors.lightingCheck}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="yes-no"
            name="announcementCheck"
            label="Announcement Systems"
            value={formValues.announcementCheck}
            onChange={handleFieldChange}
            error={errors.announcementCheck}
          />
        </Grid>

        {/* Issues and Actions */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mt: 2 }}>
            Issues & Actions
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="issuesFound"
            label="Issues Found"
            value={formValues.issuesFound}
            onChange={handleFieldChange}
            error={errors.issuesFound}
            placeholder="Describe any issues or problems identified during the checklist..."
          />
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="actionsToken"
            label="Actions Taken"
            value={formValues.actionsToken}
            onChange={handleFieldChange}
            error={errors.actionsToken}
            placeholder="Describe actions taken to resolve identified issues..."
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

        {/* Status Summary */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              Status Summary
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {Object.entries(formValues).map(([key, value]) => {
                if (key.includes('Status') && value) {
                  return (
                    <Chip
                      key={key}
                      label={`${key.replace('Status', '')}: ${value}`}
                      color={getStatusColor(value)}
                      size="small"
                      icon={
                        value === 'OK' ? <CheckCircle /> :
                        value === 'Fault' ? <ErrorIcon /> :
                        value === 'Maintenance' ? <Warning /> : undefined
                      }
                    />
                  );
                }
                return null;
              })}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: getStatusColor(calculateOverallStatus()) === 'error' ? 'error.main' : 'success.main' }}>
              Overall Status: {calculateOverallStatus()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </AFCMainlineFormLayout>
  );
};

export default DailyChecklistMainlineForm;