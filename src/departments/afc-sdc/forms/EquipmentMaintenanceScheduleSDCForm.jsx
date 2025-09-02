import React, { useState, useCallback, useMemo } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Calendar,
  Timeline
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
  Build as BuildIcon,
  Assignment as AssignmentIcon,
  Today as TodayIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Computer as ComputerIcon,
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

const EquipmentMaintenanceScheduleSDCForm = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [calendarView, setCalendarView] = useState(false);

  const equipmentCategories = [
    { 
      value: 'TVM', 
      label: 'Ticket Vending Machines',
      units: ['TVM-01', 'TVM-02', 'TVM-03', 'TVM-04', 'TVM-05'],
      maintenanceTypes: ['Daily Cleaning', 'Weekly Service', 'Monthly Calibration', 'Quarterly Overhaul']
    },
    { 
      value: 'TOM', 
      label: 'Ticket Office Machines',
      units: ['TOM-01', 'TOM-02', 'TOM-03', 'TOM-04'],
      maintenanceTypes: ['Daily Check', 'Weekly Maintenance', 'Monthly Service', 'Quarterly Review']
    },
    { 
      value: 'AGC', 
      label: 'Automatic Gate Controllers',
      units: ['AGC-01', 'AGC-02', 'AGC-03', 'AGC-04', 'AGC-05', 'AGC-06'],
      maintenanceTypes: ['Daily Inspection', 'Weekly Lubrication', 'Monthly Calibration', 'Quarterly Service']
    },
    { 
      value: 'CCS', 
      label: 'Central Computer Systems',
      units: ['CCS-PRIMARY', 'CCS-BACKUP', 'CCS-MONITORING'],
      maintenanceTypes: ['Daily Health Check', 'Weekly Backup', 'Monthly Performance Review', 'Quarterly Upgrade']
    },
    { 
      value: 'NETWORK', 
      label: 'Network Equipment',
      units: ['SW-01', 'SW-02', 'SW-03', 'RTR-01', 'AP-01', 'AP-02'],
      maintenanceTypes: ['Daily Monitoring', 'Weekly Configuration', 'Monthly Optimization', 'Quarterly Security Audit']
    },
    { 
      value: 'UPS', 
      label: 'UPS Systems',
      units: ['UPS-01', 'UPS-02', 'UPS-03'],
      maintenanceTypes: ['Daily Status Check', 'Weekly Battery Test', 'Monthly Load Test', 'Quarterly Service']
    },
    { 
      value: 'HVAC', 
      label: 'HVAC Systems',
      units: ['HVAC-01', 'HVAC-02'],
      maintenanceTypes: ['Daily Temperature Check', 'Weekly Filter Check', 'Monthly Service', 'Quarterly Overhaul']
    }
  ];

  const maintenanceFrequencies = [
    { value: 'DAILY', label: 'Daily', color: 'success' },
    { value: 'WEEKLY', label: 'Weekly', color: 'info' },
    { value: 'BIWEEKLY', label: 'Bi-weekly', color: 'warning' },
    { value: 'MONTHLY', label: 'Monthly', color: 'primary' },
    { value: 'QUARTERLY', label: 'Quarterly', color: 'secondary' },
    { value: 'ANNUALLY', label: 'Annually', color: 'error' }
  ];

  const priorityLevels = [
    { value: 'CRITICAL', label: 'Critical', color: 'error' },
    { value: 'HIGH', label: 'High', color: 'warning' },
    { value: 'MEDIUM', label: 'Medium', color: 'info' },
    { value: 'LOW', label: 'Low', color: 'success' }
  ];

  const scheduleStatus = [
    { value: 'ACTIVE', label: 'Active', color: 'success' },
    { value: 'PAUSED', label: 'Paused', color: 'warning' },
    { value: 'COMPLETED', label: 'Completed', color: 'info' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'error' }
  ];

  const validationSchema = Yup.object({
    equipmentCategory: Yup.string().required('Equipment category is required'),
    equipmentUnit: Yup.string().required('Equipment unit is required'),
    maintenanceType: Yup.string().required('Maintenance type is required'),
    frequency: Yup.string().required('Frequency is required'),
    priority: Yup.string().required('Priority level is required'),
    startDate: Yup.date().required('Start date is required'),
    estimatedDuration: Yup.number().min(15, 'Duration must be at least 15 minutes').required('Estimated duration is required'),
    assignedTechnician: Yup.string().required('Assigned technician is required'),
    maintenanceSteps: Yup.array().min(1, 'At least one maintenance step is required'),
    requiredTools: Yup.array(),
    spareParts: Yup.array(),
    safetyPrecautions: Yup.array()
  });

  const initialValues = {
    equipmentCategory: '',
    equipmentUnit: '',
    maintenanceType: '',
    frequency: '',
    priority: 'MEDIUM',
    startDate: '',
    estimatedDuration: 60,
    assignedTechnician: '',
    backupTechnician: '',
    maintenanceSteps: [
      { step: 'Pre-maintenance inspection', estimated: 10, completed: false },
      { step: 'Execute maintenance procedure', estimated: 40, completed: false },
      { step: 'Post-maintenance testing', estimated: 10, completed: false }
    ],
    requiredTools: [],
    spareParts: [],
    safetyPrecautions: [],
    status: 'ACTIVE',
    nextDueDate: '',
    completionNotes: '',
    remarks: ''
  };

  const handleSubmit = useCallback((values, { resetForm }) => {
    const nextDueDate = calculateNextDueDate(values.startDate, values.frequency);
    
    const newSchedule = {
      id: Date.now(),
      ...values,
      nextDueDate,
      createdDate: new Date().toISOString(),
      scheduleNumber: `MAINT-${values.equipmentCategory}-${String(schedules.length + 1).padStart(3, '0')}`,
      totalExecutions: 0,
      lastExecuted: null,
      averageDuration: values.estimatedDuration,
      effectivenessScore: 100
    };

    setSchedules(prev => [...prev, newSchedule]);
    resetForm();
  }, [schedules.length]);

  const calculateNextDueDate = useCallback((startDate, frequency) => {
    const start = new Date(startDate);
    const next = new Date(start);
    
    switch (frequency) {
      case 'DAILY':
        next.setDate(start.getDate() + 1);
        break;
      case 'WEEKLY':
        next.setDate(start.getDate() + 7);
        break;
      case 'BIWEEKLY':
        next.setDate(start.getDate() + 14);
        break;
      case 'MONTHLY':
        next.setMonth(start.getMonth() + 1);
        break;
      case 'QUARTERLY':
        next.setMonth(start.getMonth() + 3);
        break;
      case 'ANNUALLY':
        next.setFullYear(start.getFullYear() + 1);
        break;
      default:
        next.setDate(start.getDate() + 7);
    }
    
    return next.toISOString().split('T')[0];
  }, []);

  const handleEdit = useCallback((schedule) => {
    setSelectedSchedule(schedule);
    setViewModalOpen(true);
  }, []);

  const handleView = useCallback((schedule) => {
    setSelectedSchedule(schedule);
    setViewModalOpen(true);
  }, []);

  const handleDelete = useCallback((scheduleId) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
  }, []);

  const getStatusColor = useCallback((status) => {
    const statusObj = scheduleStatus.find(s => s.value === status);
    return statusObj?.color || 'default';
  }, []);

  const getFrequencyColor = useCallback((frequency) => {
    const freqObj = maintenanceFrequencies.find(f => f.value === frequency);
    return freqObj?.color || 'default';
  }, []);

  const getPriorityColor = useCallback((priority) => {
    const priorityObj = priorityLevels.find(p => p.value === priority);
    return priorityObj?.color || 'default';
  }, []);

  const getDaysUntilDue = useCallback((dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, []);

  const scheduleStats = useMemo(() => {
    const stats = {
      totalSchedules: schedules.length,
      activeSchedules: schedules.filter(s => s.status === 'ACTIVE').length,
      pausedSchedules: schedules.filter(s => s.status === 'PAUSED').length,
      overdue: schedules.filter(s => {
        const daysUntilDue = getDaysUntilDue(s.nextDueDate);
        return daysUntilDue < 0 && s.status === 'ACTIVE';
      }).length,
      dueThisWeek: schedules.filter(s => {
        const daysUntilDue = getDaysUntilDue(s.nextDueDate);
        return daysUntilDue >= 0 && daysUntilDue <= 7 && s.status === 'ACTIVE';
      }).length,
      criticalPriority: schedules.filter(s => s.priority === 'CRITICAL' && s.status === 'ACTIVE').length,
      avgEffectiveness: schedules.length > 0 ? 
        schedules.reduce((sum, s) => sum + (s.effectivenessScore || 100), 0) / schedules.length : 100
    };
    
    return stats;
  }, [schedules, getDaysUntilDue]);

  const renderScheduleCard = useCallback((schedule) => {
    const daysUntilDue = getDaysUntilDue(schedule.nextDueDate);
    const isOverdue = daysUntilDue < 0;
    const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 7;
    
    return (
      <Card key={schedule.id} sx={{ 
        mb: 2, 
        border: isOverdue ? '2px solid #f44336' : isDueSoon ? '2px solid #ff9800' : '1px solid #e0e0e0',
        borderRadius: 2
      }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box>
              <Typography variant="h6" component="div" gutterBottom>
                {schedule.scheduleNumber}
              </Typography>
              <Box display="flex" gap={1} mb={1}>
                <Chip 
                  label={schedule.status} 
                  color={getStatusColor(schedule.status)} 
                  size="small" 
                />
                <Chip 
                  label={schedule.frequency} 
                  color={getFrequencyColor(schedule.frequency)} 
                  size="small"
                />
                <Chip 
                  label={schedule.priority} 
                  color={getPriorityColor(schedule.priority)} 
                  size="small"
                />
                {isOverdue && (
                  <Chip 
                    label="OVERDUE" 
                    color="error" 
                    size="small"
                    icon={<WarningIcon />}
                  />
                )}
                {isDueSoon && !isOverdue && (
                  <Chip 
                    label="DUE SOON" 
                    color="warning" 
                    size="small"
                    icon={<ScheduleIcon />}
                  />
                )}
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <Button size="small" onClick={() => handleView(schedule)} startIcon={<ViewIcon />}>
                View
              </Button>
              <Button size="small" onClick={() => handleEdit(schedule)} startIcon={<EditIcon />}>
                Edit
              </Button>
              <Button 
                size="small" 
                color="error" 
                onClick={() => handleDelete(schedule.id)} 
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Equipment</Typography>
              <Typography variant="body1">
                {equipmentCategories.find(c => c.value === schedule.equipmentCategory)?.label}
              </Typography>
              <Typography variant="body2">{schedule.equipmentUnit}</Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Maintenance Type</Typography>
              <Typography variant="body1">{schedule.maintenanceType}</Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Assigned Technician</Typography>
              <Typography variant="body1">{schedule.assignedTechnician}</Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Next Due Date</Typography>
              <Typography variant="body1" color={isOverdue ? 'error' : isDueSoon ? 'warning.main' : 'text.primary'}>
                {new Date(schedule.nextDueDate).toLocaleDateString()}
                {isOverdue && ` (${Math.abs(daysUntilDue)} days overdue)`}
                {isDueSoon && !isOverdue && ` (in ${daysUntilDue} days)`}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Duration</Typography>
              <Typography variant="body1">{schedule.estimatedDuration} minutes</Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Executions</Typography>
              <Typography variant="body1">{schedule.totalExecutions} times</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">Effectiveness Score</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <LinearProgress 
                  variant="determinate" 
                  value={schedule.effectivenessScore || 100}
                  sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                  color={
                    (schedule.effectivenessScore || 100) >= 80 ? 'success' :
                    (schedule.effectivenessScore || 100) >= 60 ? 'warning' : 'error'
                  }
                />
                <Typography variant="body2">{Math.round(schedule.effectivenessScore || 100)}%</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }, [equipmentCategories, getStatusColor, getFrequencyColor, getPriorityColor, getDaysUntilDue, handleView, handleEdit, handleDelete]);

  const renderDetailModal = () => (
    <Dialog 
      open={viewModalOpen} 
      onClose={() => setViewModalOpen(false)}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        Maintenance Schedule Details: {selectedSchedule?.scheduleNumber}
      </DialogTitle>
      <DialogContent>
        {selectedSchedule && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Basic Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><ComputerIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Equipment" 
                      secondary={`${equipmentCategories.find(c => c.value === selectedSchedule.equipmentCategory)?.label} - ${selectedSchedule.equipmentUnit}`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><BuildIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Maintenance Type" 
                      secondary={selectedSchedule.maintenanceType} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><RefreshIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Frequency" 
                      secondary={
                        <Chip 
                          label={selectedSchedule.frequency} 
                          color={getFrequencyColor(selectedSchedule.frequency)} 
                          size="small"
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><WarningIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Priority" 
                      secondary={
                        <Chip 
                          label={selectedSchedule.priority} 
                          color={getPriorityColor(selectedSchedule.priority)} 
                          size="small"
                        />
                      } 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Schedule Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><EventIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Next Due Date" 
                      secondary={new Date(selectedSchedule.nextDueDate).toLocaleDateString()} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><ScheduleIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Estimated Duration" 
                      secondary={`${selectedSchedule.estimatedDuration} minutes`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Assigned Technician" 
                      secondary={selectedSchedule.assignedTechnician} 
                    />
                  </ListItem>
                  {selectedSchedule.backupTechnician && (
                    <ListItem>
                      <ListItemIcon><PersonIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Backup Technician" 
                        secondary={selectedSchedule.backupTechnician} 
                      />
                    </ListItem>
                  )}
                </List>
              </Grid>
              
              {selectedSchedule.maintenanceSteps && selectedSchedule.maintenanceSteps.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Maintenance Steps</Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Step</TableCell>
                          <TableCell>Estimated Time (min)</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedSchedule.maintenanceSteps.map((step, index) => (
                          <TableRow key={index}>
                            <TableCell>{step.step}</TableCell>
                            <TableCell>{step.estimated}</TableCell>
                            <TableCell>
                              <Chip 
                                label={step.completed ? 'Completed' : 'Pending'} 
                                color={step.completed ? 'success' : 'default'} 
                                size="small"
                                icon={step.completed ? <CheckCircleIcon /> : <ScheduleIcon />}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
              
              {selectedSchedule.requiredTools && selectedSchedule.requiredTools.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>Required Tools</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {selectedSchedule.requiredTools.map((tool, index) => (
                      <Chip key={index} label={tool} variant="outlined" size="small" icon={<BuildIcon />} />
                    ))}
                  </Box>
                </Grid>
              )}
              
              {selectedSchedule.spareParts && selectedSchedule.spareParts.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>Spare Parts</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {selectedSchedule.spareParts.map((part, index) => (
                      <Chip key={index} label={part} variant="outlined" size="small" icon={<SettingsIcon />} />
                    ))}
                  </Box>
                </Grid>
              )}
              
              {selectedSchedule.safetyPrecautions && selectedSchedule.safetyPrecautions.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Safety Precautions</Typography>
                  <List dense>
                    {selectedSchedule.safetyPrecautions.map((precaution, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <WarningIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primary={precaution} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Performance Metrics</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">{selectedSchedule.totalExecutions}</Typography>
                        <Typography variant="body2">Total Executions</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="info.main">{selectedSchedule.averageDuration}min</Typography>
                        <Typography variant="body2">Avg Duration</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="success.main">{Math.round(selectedSchedule.effectivenessScore || 100)}%</Typography>
                        <Typography variant="body2">Effectiveness</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="secondary.main">
                          {selectedSchedule.lastExecuted ? 
                            new Date(selectedSchedule.lastExecuted).toLocaleDateString() : 'Never'
                          }
                        </Typography>
                        <Typography variant="body2">Last Executed</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              
              {selectedSchedule.remarks && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Remarks</Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2">{selectedSchedule.remarks}</Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setViewModalOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <AFCSDCFormLayout title="Equipment Maintenance Schedule">
      <Container maxWidth="xl">
        {/* Statistics Dashboard */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Maintenance Schedule Overview</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">{scheduleStats.totalSchedules}</Typography>
                  <Typography variant="body2">Total Schedules</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">{scheduleStats.activeSchedules}</Typography>
                  <Typography variant="body2">Active</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{scheduleStats.overdue}</Typography>
                  <Typography variant="body2">Overdue</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">{scheduleStats.dueThisWeek}</Typography>
                  <Typography variant="body2">Due This Week</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{scheduleStats.criticalPriority}</Typography>
                  <Typography variant="body2">Critical Priority</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary.main">{Math.round(scheduleStats.avgEffectiveness)}%</Typography>
                  <Typography variant="body2">Avg Effectiveness</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Schedule Form */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Create Maintenance Schedule</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="equipmentCategory"
                      label="Equipment Category"
                      options={equipmentCategories}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="equipmentUnit"
                      label="Equipment Unit"
                      options={
                        values.equipmentCategory ? 
                        equipmentCategories.find(c => c.value === values.equipmentCategory)?.units.map(unit => ({ value: unit, label: unit })) || [] 
                        : []
                      }
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="maintenanceType"
                      label="Maintenance Type"
                      options={
                        values.equipmentCategory ? 
                        equipmentCategories.find(c => c.value === values.equipmentCategory)?.maintenanceTypes.map(type => ({ value: type, label: type })) || [] 
                        : []
                      }
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="frequency"
                      label="Frequency"
                      options={maintenanceFrequencies}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="priority"
                      label="Priority"
                      options={priorityLevels}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name="startDate"
                      label="Start Date"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <UniversalAFCSDCFormField
                      type="number"
                      name="estimatedDuration"
                      label="Estimated Duration (minutes)"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="assignedTechnician"
                      label="Assigned Technician"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="backupTechnician"
                      label="Backup Technician"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Maintenance Steps</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FieldArray name="maintenanceSteps">
                          {({ push, remove }) => (
                            <Box>
                              {values.maintenanceSteps?.map((step, index) => (
                                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                  <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={6}>
                                      <UniversalAFCSDCFormField
                                        type="text"
                                        name={`maintenanceSteps.${index}.step`}
                                        label="Step Description"
                                      />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                      <UniversalAFCSDCFormField
                                        type="number"
                                        name={`maintenanceSteps.${index}.estimated`}
                                        label="Est. Time (min)"
                                      />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                      <Button 
                                        color="error" 
                                        onClick={() => remove(index)}
                                        startIcon={<DeleteIcon />}
                                        fullWidth
                                      >
                                        Remove
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))}
                              <Button 
                                startIcon={<AddIcon />} 
                                onClick={() => push({ step: '', estimated: 10, completed: false })}
                              >
                                Add Maintenance Step
                              </Button>
                            </Box>
                          )}
                        </FieldArray>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name="remarks"
                      label="Additional Remarks"
                      rows={3}
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Create Schedule
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>

        {/* Schedules List */}
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Maintenance Schedules ({schedules.length})
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<TimelineIcon />}
              onClick={() => setCalendarView(!calendarView)}
            >
              {calendarView ? 'List View' : 'Calendar View'}
            </Button>
          </Box>
          
          {schedules.length === 0 ? (
            <Alert severity="info">
              No maintenance schedules created yet. Create your first schedule above.
            </Alert>
          ) : (
            <Box>
              {schedules.map(renderScheduleCard)}
            </Box>
          )}
        </Paper>

        {renderDetailModal()}
      </Container>
    </AFCSDCFormLayout>
  );
};

export default EquipmentMaintenanceScheduleSDCForm;