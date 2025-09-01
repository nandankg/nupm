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
  TimelineConnector,
  timelineItemClasses
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Schedule as ShiftIcon,
  Assignment as LogIcon,
  Person as PersonIcon,
  EventNote as EventIcon
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
 * Shift Log Book Mainline Form - Operational Shift Documentation & Handover
 * 
 * Form ID: 75 | Slug: shift-log-book-mainline
 * Complexity: MEDIUM - Handles shift operations, handover documentation, event logging
 * Features: Shift timeline, event logging, handover checklist, operational status
 */
const ShiftLogBookMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState('shift-log-book-mainline');
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
    date: formatDate(new Date()),           // Shift date
    shift: '',                              // Shift timing
    shiftIncharge: '',                      // Shift in-charge
    previousShiftIncharge: '',              // Previous shift in-charge
    nextShiftIncharge: '',                  // Next shift in-charge
    
    // Shift Timing
    shiftStartTime: '',                     // Actual shift start time
    shiftEndTime: '',                       // Actual shift end time
    handoverTime: '',                       // Handover completion time
    
    // Staff Details
    totalStaff: 0,                          // Total staff on duty
    presentStaff: 0,                        // Staff present
    absentStaff: 0,                         // Staff absent
    leaveStaff: 0,                          // Staff on leave
    
    // Equipment Handover Status
    tvmHandoverStatus: '',                  // TVM handover status
    tomHandoverStatus: '',                  // TOM handover status  
    gateHandoverStatus: '',                 // Gate handover status
    avmHandoverStatus: '',                  // AVM handover status
    cashHandoverStatus: '',                 // Cash handover status
    keyHandoverStatus: '',                  // Keys handover status
    
    // Operational Status
    stationOperationalStatus: '',           // Overall station status
    equipmentOperationalStatus: '',         // Equipment operational status
    safetySystemStatus: '',                // Safety systems status
    cleanlinessStatus: '',                  // Station cleanliness status
    securityStatus: '',                     // Security systems status
    
    // Issues & Events
    pendingIssues: '',                      // Issues pending from previous shift
    newIssuesReported: '',                  // New issues reported this shift
    issuesResolved: '',                     // Issues resolved this shift
    issuesToHandover: '',                   // Issues to handover to next shift
    
    // Shift Events Array
    shiftEvents: [],                        // Dynamic array of shift events
    
    // Cash & Inventory
    openingCashBalance: 0,                  // Opening cash balance
    closingCashBalance: 0,                  // Closing cash balance
    cardInventoryReceived: 0,               // Card inventory received
    cardInventoryIssued: 0,                 // Card inventory issued
    cardInventoryBalance: 0,                // Card inventory balance
    
    // Passenger Information
    totalPassengers: 0,                     // Total passengers handled
    peakHourPassengers: 0,                  // Peak hour passenger count
    complaintsReceived: 0,                  // Customer complaints received
    complaintsResolved: 0,                  // Complaints resolved
    
    // Safety & Security
    safetyIncidents: '',                    // Safety incidents (if any)
    securityIncidents: '',                  // Security incidents (if any)
    emergencyDrills: '',                    // Emergency drills conducted
    visitorEntries: '',                     // Official visitor entries
    
    // Maintenance Activities
    scheduledMaintenance: '',               // Scheduled maintenance activities
    unscheduledMaintenance: '',            // Unscheduled maintenance
    maintenanceCompleted: '',              // Maintenance work completed
    maintenancePending: '',                // Maintenance work pending
    
    // Handover Checklist
    documentsHandedOver: '',               // Documents status
    cashVerified: '',                      // Cash verification status
    equipmentChecked: '',                  // Equipment check status
    keysTransferred: '',                   // Keys transfer status
    briefingCompleted: '',                 // Briefing completion status
    
    // Special Instructions
    specialInstructions: '',               // Special instructions for next shift
    priorityTasks: '',                     // Priority tasks for next shift
    followUpRequired: '',                  // Follow-up requirements
    
    // Summary & Remarks
    shiftSummary: '',                      // Overall shift summary
    handoverNotes: '',                     // Handover notes
    remarks: '',                           // General remarks
    
    // Verification
    handoverVerifiedBy: '',                // Handover verified by
    receivedBy: '',                        // Received by next shift
    supervisorReview: '',                  // Supervisor review
    
    // Timestamps
    logTime: formatTime(new Date()),       // Log completion time
    handoverCompletedTime: '',             // Handover completion timestamp
  });

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => {
      const updatedValues = { ...prev, [fieldName]: value };
      
      // Auto-calculate staff totals
      if (['presentStaff', 'absentStaff', 'leaveStaff'].includes(fieldName)) {
        updatedValues.totalStaff = (updatedValues.presentStaff || 0) + 
                                  (updatedValues.absentStaff || 0) + 
                                  (updatedValues.leaveStaff || 0);
      }
      
      // Calculate card inventory balance
      if (['cardInventoryReceived', 'cardInventoryIssued'].includes(fieldName)) {
        updatedValues.cardInventoryBalance = (updatedValues.cardInventoryReceived || 0) - 
                                            (updatedValues.cardInventoryIssued || 0);
      }
      
      return updatedValues;
    });
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Add new shift event
  const addShiftEvent = () => {
    setFormValues(prev => ({
      ...prev,
      shiftEvents: [
        ...prev.shiftEvents,
        {
          id: Date.now(),
          eventTime: formatTime(new Date()),
          eventType: '',
          description: '',
          actionTaken: '',
          reportedBy: '',
          priority: 'Medium',
          status: 'Open',
          followUpRequired: false
        }
      ]
    }));
  };

  // Remove shift event
  const removeShiftEvent = (id) => {
    setFormValues(prev => ({
      ...prev,
      shiftEvents: prev.shiftEvents.filter(event => event.id !== id)
    }));
  };

  // Update shift event
  const updateShiftEvent = (id, field, value) => {
    setFormValues(prev => ({
      ...prev,
      shiftEvents: prev.shiftEvents.map(event => 
        event.id === id ? { ...event, [field]: value } : event
      )
    }));
  };

  // Get event type color
  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Incident': return 'error';
      case 'Maintenance': return 'warning';
      case 'Equipment': return 'info';
      case 'Passenger': return 'success';
      case 'Administrative': return 'default';
      default: return 'primary';
    }
  };

  // Get handover completion percentage
  const getHandoverCompletionPercentage = () => {
    const handoverFields = [
      'documentsHandedOver', 'cashVerified', 'equipmentChecked', 
      'keysTransferred', 'briefingCompleted'
    ];
    const completedCount = handoverFields.filter(field => 
      formValues[field] === 'Complete' || formValues[field] === 'Yes'
    ).length;
    return Math.round((completedCount / handoverFields.length) * 100);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Final calculations and validations
    const submitData = {
      ...formValues,
      handoverCompletedTime: formatTime(new Date()),
      submissionTime: new Date().toISOString(),
      handoverCompletionPercentage: getHandoverCompletionPercentage(),
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
        slug: 'shift-log-book-mainline',
        formType: 'shift-log-book-mainline',
        submittedAt: new Date().toISOString(),
      };

      // Redux dispatch (will be added when reducer is available)
      console.log('Shift Log Book submitted:', formData);
      
      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/list/shift-log-book-mainline');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save shift log book. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handoverCompletion = getHandoverCompletionPercentage();

  return (
    <AFCMainlineFormLayout
      title="Shift Log Book - Mainline"
      onSubmit={handleSubmit}
      loading={loading}
      error={errors.submit}
      success={success}
      formId="AFC-ML-SLB-001"
    >
      <Grid container spacing={3}>
        {/* Header with Shift Status */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <ShiftIcon sx={{ fontSize: 32, color: '#1976d2' }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    Operational Shift Documentation & Handover Log
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comprehensive shift operations tracking and handover management
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">
                  Log Time: {formatTime(time)}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Chip label={`Staff: ${formValues.presentStaff}/${formValues.totalStaff}`} size="small" color="primary" />
                  <Chip label={`Handover: ${handoverCompletion}%`} size="small" color="success" />
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
            label="Shift Date"
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

        {/* Shift Personnel */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Shift Personnel
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="shiftIncharge"
            label="Shift In-charge"
            value={formValues.shiftIncharge}
            onChange={handleFieldChange}
            error={errors.shiftIncharge}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="text"
            name="previousShiftIncharge"
            label="Previous Shift In-charge"
            value={formValues.previousShiftIncharge}
            onChange={handleFieldChange}
            error={errors.previousShiftIncharge}
            placeholder="Previous shift handover from"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="text"
            name="nextShiftIncharge"
            label="Next Shift In-charge"
            value={formValues.nextShiftIncharge}
            onChange={handleFieldChange}
            error={errors.nextShiftIncharge}
            placeholder="Next shift handover to"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="presentStaff"
            label="Present Staff"
            value={formValues.presentStaff}
            onChange={handleFieldChange}
            error={errors.presentStaff}
            required
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="absentStaff"
            label="Absent Staff"
            value={formValues.absentStaff}
            onChange={handleFieldChange}
            error={errors.absentStaff}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="number"
            name="leaveStaff"
            label="Staff on Leave"
            value={formValues.leaveStaff}
            onChange={handleFieldChange}
            error={errors.leaveStaff}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f0f8ff' }}>
            <Typography variant="body2" color="text.secondary">
              Total Staff
            </Typography>
            <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              {formValues.totalStaff}
            </Typography>
          </Paper>
        </Grid>

        {/* Operational Status */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Operational Status
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="stationOperationalStatus"
            label="Station Operational Status"
            value={formValues.stationOperationalStatus}
            onChange={handleFieldChange}
            error={errors.stationOperationalStatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="equipmentOperationalStatus"
            label="Equipment Status"
            value={formValues.equipmentOperationalStatus}
            onChange={handleFieldChange}
            error={errors.equipmentOperationalStatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="equipment-status"
            name="safetySystemStatus"
            label="Safety Systems Status"
            value={formValues.safetySystemStatus}
            onChange={handleFieldChange}
            error={errors.safetySystemStatus}
            required
          />
        </Grid>

        {/* Equipment Handover Status */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Equipment Handover Status
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="tvmHandoverStatus"
            label="TVM Handover"
            value={formValues.tvmHandoverStatus}
            onChange={handleFieldChange}
            error={errors.tvmHandoverStatus}
            options={['Complete', 'Incomplete', 'Issues Found', 'N/A']}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="tomHandoverStatus"
            label="TOM Handover"
            value={formValues.tomHandoverStatus}
            onChange={handleFieldChange}
            error={errors.tomHandoverStatus}
            options={['Complete', 'Incomplete', 'Issues Found', 'N/A']}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="select"
            name="cashHandoverStatus"
            label="Cash Handover"
            value={formValues.cashHandoverStatus}
            onChange={handleFieldChange}
            error={errors.cashHandoverStatus}
            options={['Complete', 'Incomplete', 'Discrepancy Found', 'Pending']}
            required
          />
        </Grid>

        {/* Cash & Inventory */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Cash & Inventory Status
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="openingCashBalance"
            label="Opening Cash Balance (₹)"
            value={formValues.openingCashBalance}
            onChange={handleFieldChange}
            error={errors.openingCashBalance}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="closingCashBalance"
            label="Closing Cash Balance (₹)"
            value={formValues.closingCashBalance}
            onChange={handleFieldChange}
            error={errors.closingCashBalance}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="number"
            name="cardInventoryBalance"
            label="Card Inventory Balance"
            value={formValues.cardInventoryBalance}
            onChange={handleFieldChange}
            error={errors.cardInventoryBalance}
          />
        </Grid>

        {/* Shift Events Timeline */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              <EventIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Shift Events & Timeline
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addShiftEvent}
              size="small"
            >
              Add Event
            </Button>
          </Box>

          {formValues.shiftEvents.length > 0 ? (
            <Paper sx={{ p: 2 }}>
              <Timeline
                sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                }}
              >
                {formValues.shiftEvents.map((event, index) => (
                  <TimelineItem key={event.id}>
                    <TimelineSeparator>
                      <TimelineDot color={getEventTypeColor(event.eventType)} />
                      {index < formValues.shiftEvents.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper sx={{ p: 2, mb: 1 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={2}>
                            <UniversalAFCMainlineFormField
                              type="time"
                              name="eventTime"
                              label="Time"
                              value={event.eventTime}
                              onChange={(field, value) => updateShiftEvent(event.id, 'eventTime', value)}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <UniversalAFCMainlineFormField
                              type="select"
                              name="eventType"
                              label="Type"
                              value={event.eventType}
                              onChange={(field, value) => updateShiftEvent(event.id, 'eventType', value)}
                              options={['Incident', 'Maintenance', 'Equipment', 'Passenger', 'Administrative', 'Emergency']}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <UniversalAFCMainlineFormField
                              type="textarea"
                              name="description"
                              label="Description"
                              value={event.description}
                              onChange={(field, value) => updateShiftEvent(event.id, 'description', value)}
                              placeholder="Event description..."
                              rows={2}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <UniversalAFCMainlineFormField
                              type="textarea"
                              name="actionTaken"
                              label="Action Taken"
                              value={event.actionTaken}
                              onChange={(field, value) => updateShiftEvent(event.id, 'actionTaken', value)}
                              placeholder="Action taken..."
                              rows={2}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} md={1}>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => removeShiftEvent(event.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Paper>
          ) : (
            <Alert severity="info">
              No shift events logged yet. Click "Add Event" to document shift activities and incidents.
            </Alert>
          )}
        </Grid>

        {/* Issues & Handover */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Issues & Handover Notes
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="pendingIssues"
            label="Pending Issues from Previous Shift"
            value={formValues.pendingIssues}
            onChange={handleFieldChange}
            error={errors.pendingIssues}
            placeholder="Issues pending from previous shift..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="issuesToHandover"
            label="Issues to Handover to Next Shift"
            value={formValues.issuesToHandover}
            onChange={handleFieldChange}
            error={errors.issuesToHandover}
            placeholder="Issues to be handed over to next shift..."
          />
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="specialInstructions"
            label="Special Instructions for Next Shift"
            value={formValues.specialInstructions}
            onChange={handleFieldChange}
            error={errors.specialInstructions}
            placeholder="Special instructions and priority tasks for the next shift..."
          />
        </Grid>

        {/* Handover Verification */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Handover Verification & Summary
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              Handover Completion: {handoverCompletion}%
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2.4}>
                <UniversalAFCMainlineFormField
                  type="select"
                  name="documentsHandedOver"
                  label="Documents"
                  value={formValues.documentsHandedOver}
                  onChange={handleFieldChange}
                  options={['Complete', 'Incomplete', 'N/A']}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={2.4}>
                <UniversalAFCMainlineFormField
                  type="select"
                  name="cashVerified"
                  label="Cash Verified"
                  value={formValues.cashVerified}
                  onChange={handleFieldChange}
                  options={['Yes', 'No', 'Discrepancy']}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={2.4}>
                <UniversalAFCMainlineFormField
                  type="select"
                  name="equipmentChecked"
                  label="Equipment Checked"
                  value={formValues.equipmentChecked}
                  onChange={handleFieldChange}
                  options={['Complete', 'Incomplete', 'Issues Found']}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={2.4}>
                <UniversalAFCMainlineFormField
                  type="select"
                  name="keysTransferred"
                  label="Keys Transferred"
                  value={formValues.keysTransferred}
                  onChange={handleFieldChange}
                  options={['Complete', 'Incomplete', 'Missing Keys']}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={2.4}>
                <UniversalAFCMainlineFormField
                  type="select"
                  name="briefingCompleted"
                  label="Briefing Complete"
                  value={formValues.briefingCompleted}
                  onChange={handleFieldChange}
                  options={['Complete', 'Incomplete', 'Partial']}
                  size="small"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="shiftSummary"
            label="Shift Summary"
            value={formValues.shiftSummary}
            onChange={handleFieldChange}
            error={errors.shiftSummary}
            required
            placeholder="Comprehensive summary of shift operations, events, and status..."
          />
        </Grid>

        {/* Verification & Sign-off */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Verification & Sign-off
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="handoverVerifiedBy"
            label="Handover Verified By"
            value={formValues.handoverVerifiedBy}
            onChange={handleFieldChange}
            error={errors.handoverVerifiedBy}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="receivedBy"
            label="Received By (Next Shift)"
            value={formValues.receivedBy}
            onChange={handleFieldChange}
            error={errors.receivedBy}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="supervisorReview"
            label="Supervisor Review"
            value={formValues.supervisorReview}
            onChange={handleFieldChange}
            error={errors.supervisorReview}
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

export default ShiftLogBookMainlineForm;