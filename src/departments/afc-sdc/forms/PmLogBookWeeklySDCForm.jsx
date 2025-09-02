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
  Stepper,
  Step,
  StepLabel
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
  Assessment as AssessmentIcon,
  DateRange as DateRangeIcon,
  Person as PersonIcon,
  Computer as ComputerIcon,
  ExpandMore as ExpandMoreIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

const PmLogBookWeeklySDCForm = () => {
  const [weeklyLogs, setWeeklyLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(new Date().toISOString().split('T')[0]);

  const weeklyCategories = [
    { value: 'DEEP_CLEANING', label: 'Deep Cleaning & Maintenance', priority: 'HIGH' },
    { value: 'SOFTWARE_UPDATES', label: 'Software Updates & Patches', priority: 'HIGH' },
    { value: 'HARDWARE_INSPECTION', label: 'Hardware Deep Inspection', priority: 'MEDIUM' },
    { value: 'NETWORK_OPTIMIZATION', label: 'Network Performance Optimization', priority: 'MEDIUM' },
    { value: 'SECURITY_AUDIT', label: 'Security Systems Audit', priority: 'HIGH' },
    { value: 'BACKUP_VERIFICATION', label: 'Backup Systems Verification', priority: 'HIGH' },
    { value: 'PERFORMANCE_ANALYSIS', label: 'Performance Analysis & Tuning', priority: 'MEDIUM' },
    { value: 'DOCUMENTATION_UPDATE', label: 'Documentation & Records Update', priority: 'LOW' }
  ];

  const systemGroups = [
    {
      name: 'Ticketing Systems',
      systems: ['TVM-01', 'TVM-02', 'TVM-03', 'TVM-04', 'TOM-01', 'TOM-02'],
      weeklyTasks: [
        'Deep clean all external and internal components',
        'Calibrate touchscreens and sensors',
        'Update software and security patches',
        'Test all payment methods thoroughly',
        'Inspect and clean cash handling mechanisms',
        'Verify receipt printer alignment and quality'
      ]
    },
    {
      name: 'Access Control',
      systems: ['AGC-01', 'AGC-02', 'AGC-03', 'AGC-04', 'AGC-05', 'AGC-06'],
      weeklyTasks: [
        'Lubricate gate mechanisms',
        'Deep clean sensors and readers',
        'Test emergency release procedures',
        'Calibrate sensor detection zones',
        'Inspect and tighten all connections',
        'Test alarm and notification systems'
      ]
    },
    {
      name: 'Central Systems',
      systems: ['CCS-MAIN', 'CCS-BACKUP', 'DB-PRIMARY', 'DB-SECONDARY'],
      weeklyTasks: [
        'Perform database optimization',
        'Verify backup integrity and restore procedures',
        'Update system documentation',
        'Monitor and analyze performance metrics',
        'Clean server room and check environmental conditions',
        'Test failover and recovery procedures'
      ]
    },
    {
      name: 'Infrastructure',
      systems: ['UPS-01', 'UPS-02', 'HVAC-01', 'HVAC-02', 'SW-01', 'SW-02'],
      weeklyTasks: [
        'Test UPS battery backup duration',
        'Deep clean HVAC filters and coils',
        'Inspect all network cabling',
        'Check power consumption and efficiency',
        'Test emergency power procedures',
        'Monitor environmental parameters'
      ]
    }
  ];

  const validationSchema = Yup.object({
    weekStartDate: Yup.date().required('Week start date is required'),
    weekEndDate: Yup.date().required('Week end date is required').min(
      Yup.ref('weekStartDate'), 'End date must be after start date'
    ),
    category: Yup.string().required('Weekly maintenance category is required'),
    systemGroup: Yup.string().required('System group is required'),
    assignedTeam: Yup.array().min(1, 'At least one team member must be assigned'),
    weeklyTasks: Yup.array().min(1, 'Weekly tasks must be defined'),
    estimatedHours: Yup.number().min(1, 'Estimated hours must be at least 1').required('Estimated hours is required'),
    actualHours: Yup.number().when('status', {
      is: 'COMPLETED',
      then: (schema) => schema.required('Actual hours is required for completed tasks'),
      otherwise: (schema) => schema
    }),
    completedBy: Yup.string().when('status', {
      is: 'COMPLETED',
      then: (schema) => schema.required('Completed by is required'),
      otherwise: (schema) => schema
    })
  });

  const initialValues = {
    weekStartDate: selectedWeek,
    weekEndDate: '',
    category: '',
    systemGroup: '',
    assignedTeam: [],
    weeklyTasks: [],
    estimatedHours: 8,
    actualHours: '',
    status: 'PLANNED',
    completedBy: '',
    findings: [],
    recommendations: [],
    partsUsed: [],
    nextWeekActions: [],
    remarks: '',
    approvedBy: ''
  };

  const handleSubmit = useCallback((values, { resetForm }) => {
    const newLog = {
      id: Date.now(),
      ...values,
      createdDate: new Date().toISOString(),
      logNumber: `WEEKLY-${values.weekStartDate}-${values.category}`,
      completionRate: calculateWeeklyCompletion(values.weeklyTasks),
      weekNumber: getWeekNumber(new Date(values.weekStartDate))
    };

    setWeeklyLogs(prev => [...prev, newLog]);
    resetForm();
  }, []);

  const calculateWeeklyCompletion = useCallback((tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  }, []);

  const getWeekNumber = useCallback((date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }, []);

  const handleEdit = useCallback((log) => {
    setSelectedLog(log);
    setViewModalOpen(true);
  }, []);

  const handleView = useCallback((log) => {
    setSelectedLog(log);
    setViewModalOpen(true);
  }, []);

  const handleDelete = useCallback((logId) => {
    setWeeklyLogs(prev => prev.filter(log => log.id !== logId));
  }, []);

  const getStatusColor = useCallback((status) => {
    const colors = {
      PLANNED: 'info',
      IN_PROGRESS: 'warning',
      COMPLETED: 'success',
      DELAYED: 'error',
      CANCELLED: 'secondary'
    };
    return colors[status] || 'default';
  }, []);

  const getPriorityColor = useCallback((priority) => {
    const colors = {
      HIGH: 'error',
      MEDIUM: 'warning',
      LOW: 'success'
    };
    return colors[priority] || 'default';
  }, []);

  const weeklyStats = useMemo(() => {
    const currentWeekLogs = weeklyLogs.filter(log => {
      const logWeek = getWeekNumber(new Date(log.weekStartDate));
      const selectedWeekNum = getWeekNumber(new Date(selectedWeek));
      return logWeek === selectedWeekNum;
    });
    
    const stats = {
      totalLogs: currentWeekLogs.length,
      completedLogs: currentWeekLogs.filter(log => log.status === 'COMPLETED').length,
      inProgressLogs: currentWeekLogs.filter(log => log.status === 'IN_PROGRESS').length,
      delayedLogs: currentWeekLogs.filter(log => log.status === 'DELAYED').length,
      avgCompletionRate: currentWeekLogs.length > 0 ? 
        currentWeekLogs.reduce((sum, log) => sum + log.completionRate, 0) / currentWeekLogs.length : 0,
      totalHours: currentWeekLogs.reduce((sum, log) => sum + (log.actualHours || log.estimatedHours || 0), 0),
      systemGroupsCovered: new Set(currentWeekLogs.map(log => log.systemGroup)).size
    };
    
    return stats;
  }, [weeklyLogs, selectedWeek, getWeekNumber]);

  const renderLogCard = useCallback((log) => (
    <Card key={log.id} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              Week {log.weekNumber} - {log.logNumber}
            </Typography>
            <Box display="flex" gap={1} mb={1}>
              <Chip 
                label={log.status.replace('_', ' ')} 
                color={getStatusColor(log.status)} 
                size="small" 
              />
              <Chip 
                label={weeklyCategories.find(c => c.value === log.category)?.priority || 'MEDIUM'} 
                color={getPriorityColor(weeklyCategories.find(c => c.value === log.category)?.priority)} 
                size="small"
              />
              <Chip 
                label={`${Math.round(log.completionRate)}% Complete`} 
                color={log.completionRate >= 80 ? 'success' : log.completionRate >= 60 ? 'warning' : 'error'} 
                size="small"
              />
            </Box>
          </Box>
          <Box display="flex" gap={1}>
            <Button size="small" onClick={() => handleView(log)} startIcon={<ViewIcon />}>
              View
            </Button>
            <Button size="small" onClick={() => handleEdit(log)} startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button 
              size="small" 
              color="error" 
              onClick={() => handleDelete(log.id)} 
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">Category</Typography>
            <Typography variant="body1">
              {weeklyCategories.find(c => c.value === log.category)?.label}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">System Group</Typography>
            <Typography variant="body1">{log.systemGroup}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary">Week Period</Typography>
            <Typography variant="body1">
              {new Date(log.weekStartDate).toLocaleDateString()} - {new Date(log.weekEndDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary">Team Size</Typography>
            <Typography variant="body1">{log.assignedTeam?.length || 0} member(s)</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary">Hours</Typography>
            <Typography variant="body1">
              {log.actualHours || log.estimatedHours} hours {log.actualHours ? '(Actual)' : '(Estimated)'}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">Progress</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <LinearProgress 
                variant="determinate" 
                value={log.completionRate}
                sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2">{Math.round(log.completionRate)}%</Typography>
            </Box>
          </Grid>
          
          {log.findings && log.findings.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">Findings</Typography>
              <Badge badgeContent={log.findings.length} color="info">
                <AssessmentIcon color="primary" />
              </Badge>
              <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                {log.findings.length} finding(s) documented
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  ), [weeklyCategories, getStatusColor, getPriorityColor, handleView, handleEdit, handleDelete]);

  const renderDetailModal = () => (
    <Dialog 
      open={viewModalOpen} 
      onClose={() => setViewModalOpen(false)}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        Weekly PM Log Details: {selectedLog?.logNumber}
      </DialogTitle>
      <DialogContent>
        {selectedLog && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Basic Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><DateRangeIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Week Period" 
                      secondary={`${new Date(selectedLog.weekStartDate).toLocaleDateString()} - ${new Date(selectedLog.weekEndDate).toLocaleDateString()}`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><AssessmentIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Category" 
                      secondary={weeklyCategories.find(c => c.value === selectedLog.category)?.label} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><ComputerIcon /></ListItemIcon>
                    <ListItemText 
                      primary="System Group" 
                      secondary={selectedLog.systemGroup} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Team Size" 
                      secondary={`${selectedLog.assignedTeam?.length || 0} member(s)`} 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Status & Progress</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Status" 
                      secondary={
                        <Chip 
                          label={selectedLog.status.replace('_', ' ')} 
                          color={getStatusColor(selectedLog.status)} 
                          size="small"
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Completion Rate" 
                      secondary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <LinearProgress 
                            variant="determinate" 
                            value={selectedLog.completionRate}
                            sx={{ flexGrow: 1 }}
                          />
                          <Typography variant="body2">
                            {Math.round(selectedLog.completionRate)}%
                          </Typography>
                        </Box>
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Hours" 
                      secondary={`${selectedLog.actualHours || selectedLog.estimatedHours} ${selectedLog.actualHours ? '(Actual)' : '(Estimated)'}`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Week Number" 
                      secondary={`Week ${selectedLog.weekNumber}`} 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              {selectedLog.assignedTeam && selectedLog.assignedTeam.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Assigned Team</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {selectedLog.assignedTeam.map((member, index) => (
                      <Chip 
                        key={index} 
                        label={member} 
                        variant="outlined" 
                        size="small"
                        icon={<PersonIcon />}
                      />
                    ))}
                  </Box>
                </Grid>
              )}
              
              {selectedLog.weeklyTasks && selectedLog.weeklyTasks.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Weekly Tasks Progress</Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Task</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Assigned To</TableCell>
                          <TableCell>Notes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedLog.weeklyTasks.map((task, index) => (
                          <TableRow key={index}>
                            <TableCell>{task.task}</TableCell>
                            <TableCell>
                              <Chip 
                                label={task.completed ? 'Completed' : 'In Progress'} 
                                color={task.completed ? 'success' : 'warning'} 
                                size="small"
                                icon={task.completed ? <CheckCircleIcon /> : <Schedule />}
                              />
                            </TableCell>
                            <TableCell>{task.assignedTo || 'N/A'}</TableCell>
                            <TableCell>{task.notes || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
              
              {selectedLog.findings && selectedLog.findings.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Weekly Findings</Typography>
                  <List dense>
                    {selectedLog.findings.map((finding, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <AssessmentIcon color={finding.severity === 'HIGH' ? 'error' : 'info'} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={finding.description} 
                          secondary={`System: ${finding.system} | Severity: ${finding.severity} | Action: ${finding.recommendedAction}`} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )}
              
              {selectedLog.recommendations && selectedLog.recommendations.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Recommendations</Typography>
                  <List dense>
                    {selectedLog.recommendations.map((rec, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <TrendingUpIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={rec.recommendation} 
                          secondary={`Priority: ${rec.priority} | Timeline: ${rec.timeline}`} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )}
              
              {selectedLog.remarks && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Remarks</Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2">{selectedLog.remarks}</Typography>
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
    <AFCSDCFormLayout title="PM Log Book - Weekly">
      <Container maxWidth="xl">
        {/* Weekly Statistics Dashboard */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Weekly PM Statistics</Typography>
            <UniversalAFCSDCFormField
              type="week"
              name="selectedWeek"
              label="Select Week"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
            />
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">{weeklyStats.totalLogs}</Typography>
                  <Typography variant="body2">Total Tasks</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">{weeklyStats.completedLogs}</Typography>
                  <Typography variant="body2">Completed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">{weeklyStats.inProgressLogs}</Typography>
                  <Typography variant="body2">In Progress</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{weeklyStats.delayedLogs}</Typography>
                  <Typography variant="body2">Delayed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">{weeklyStats.totalHours}</Typography>
                  <Typography variant="body2">Total Hours</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary.main">
                    {Math.round(weeklyStats.avgCompletionRate)}%
                  </Typography>
                  <Typography variant="body2">Avg Completion</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>Weekly Progress</Typography>
            <LinearProgress 
              variant="determinate" 
              value={weeklyStats.avgCompletionRate} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        </Paper>

        {/* Weekly Log Entry Form */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Create Weekly PM Task</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name="weekStartDate"
                      label="Week Start Date"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name="weekEndDate"
                      label="Week End Date"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="category"
                      label="Maintenance Category"
                      options={weeklyCategories}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="systemGroup"
                      label="System Group"
                      options={systemGroups.map(group => ({ value: group.name, label: group.name }))}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="number"
                      name="estimatedHours"
                      label="Estimated Hours"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="status"
                      label="Current Status"
                      options={[
                        { value: 'PLANNED', label: 'Planned' },
                        { value: 'IN_PROGRESS', label: 'In Progress' },
                        { value: 'COMPLETED', label: 'Completed' },
                        { value: 'DELAYED', label: 'Delayed' },
                        { value: 'CANCELLED', label: 'Cancelled' }
                      ]}
                    />
                  </Grid>
                  
                  {values.status === 'COMPLETED' && (
                    <>
                      <Grid item xs={12} md={6}>
                        <UniversalAFCSDCFormField
                          type="number"
                          name="actualHours"
                          label="Actual Hours"
                          required
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <UniversalAFCSDCFormField
                          type="text"
                          name="completedBy"
                          label="Completed By"
                          required
                        />
                      </Grid>
                    </>
                  )}
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Assigned Team Members</Typography>
                    <FieldArray name="assignedTeam">
                      {({ push, remove }) => (
                        <Box>
                          {values.assignedTeam?.map((member, index) => (
                            <Box key={index} display="flex" gap={1} mb={1} alignItems="center">
                              <UniversalAFCSDCFormField
                                type="text"
                                name={`assignedTeam.${index}`}
                                label={`Team Member ${index + 1}`}
                              />
                              <Button 
                                color="error" 
                                onClick={() => remove(index)}
                                startIcon={<DeleteIcon />}
                              >
                                Remove
                              </Button>
                            </Box>
                          ))}
                          <Button 
                            startIcon={<AddIcon />} 
                            onClick={() => push('')}
                          >
                            Add Team Member
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Weekly Tasks Checklist</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FieldArray name="weeklyTasks">
                          {({ push, remove }) => (
                            <Box>
                              {values.weeklyTasks?.map((task, index) => (
                                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                  <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={5}>
                                      <UniversalAFCSDCFormField
                                        type="text"
                                        name={`weeklyTasks.${index}.task`}
                                        label="Task Description"
                                      />
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                      <UniversalAFCSDCFormField
                                        type="checkbox"
                                        name={`weeklyTasks.${index}.completed`}
                                        label="Completed"
                                      />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                      <UniversalAFCSDCFormField
                                        type="text"
                                        name={`weeklyTasks.${index}.assignedTo`}
                                        label="Assigned To"
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                      <Button 
                                        color="error" 
                                        onClick={() => remove(index)}
                                        startIcon={<DeleteIcon />}
                                        fullWidth
                                      >
                                        Remove
                                      </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <UniversalAFCSDCFormField
                                        type="text"
                                        name={`weeklyTasks.${index}.notes`}
                                        label="Task Notes"
                                      />
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))}
                              <Button 
                                startIcon={<AddIcon />} 
                                onClick={() => push({ task: '', completed: false, assignedTo: '', notes: '' })}
                              >
                                Add Weekly Task
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
                      label="Weekly Remarks & Observations"
                      rows={4}
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
                    Create Weekly Log
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>

        {/* Weekly Logs List */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Weekly PM Logs ({weeklyLogs.length})
          </Typography>
          
          {weeklyLogs.length === 0 ? (
            <Alert severity="info">
              No weekly PM tasks scheduled yet. Create your first weekly log above.
            </Alert>
          ) : (
            <Box>
              {weeklyLogs.map(renderLogCard)}
            </Box>
          )}
        </Paper>

        {renderDetailModal()}
      </Container>
    </AFCSDCFormLayout>
  );
};

export default PmLogBookWeeklySDCForm;