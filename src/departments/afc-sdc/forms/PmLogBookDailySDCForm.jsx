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
  Badge
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
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Computer as ComputerIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

const PmLogBookDailySDCForm = () => {
  const [dailyLogs, setDailyLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const shiftTypes = [
    { value: 'MORNING', label: 'Morning Shift (06:00 - 14:00)', color: 'success' },
    { value: 'EVENING', label: 'Evening Shift (14:00 - 22:00)', color: 'warning' },
    { value: 'NIGHT', label: 'Night Shift (22:00 - 06:00)', color: 'info' }
  ];

  const systemCategories = [
    { value: 'TVM', label: 'Ticket Vending Machines', icon: <ComputerIcon /> },
    { value: 'TOM', label: 'Ticket Office Machines', icon: <ComputerIcon /> },
    { value: 'AGC', label: 'Automatic Gate Controllers', icon: <ComputerIcon /> },
    { value: 'CCS', label: 'Central Computer System', icon: <ComputerIcon /> },
    { value: 'NETWORK', label: 'Network Infrastructure', icon: <ComputerIcon /> },
    { value: 'UPS', label: 'UPS Systems', icon: <ComputerIcon /> },
    { value: 'HVAC', label: 'HVAC Systems', icon: <ComputerIcon /> },
    { value: 'DATABASE', label: 'Database Systems', icon: <ComputerIcon /> }
  ];

  const dailyTasks = [
    { category: 'TVM', tasks: [
      'Visual inspection of all TVM units',
      'Check power status and connections',
      'Test touchscreen responsiveness',
      'Verify ticket dispensing mechanism',
      'Check cash acceptance and change dispensing',
      'Review error logs',
      'Clean exterior surfaces'
    ]},
    { category: 'TOM', tasks: [
      'Check all TOM workstations',
      'Test card reader functionality',
      'Verify receipt printer operation',
      'Check network connectivity',
      'Review transaction logs',
      'Test emergency procedures'
    ]},
    { category: 'AGC', tasks: [
      'Test gate opening/closing mechanisms',
      'Check sensor functionality',
      'Verify card reader operation',
      'Test alarm systems',
      'Check LED status indicators',
      'Review passage logs'
    ]},
    { category: 'CCS', tasks: [
      'Monitor system performance',
      'Check server health status',
      'Review system logs for errors',
      'Verify backup processes',
      'Check database connections',
      'Monitor network traffic'
    ]},
    { category: 'NETWORK', tasks: [
      'Check switch status indicators',
      'Test network connectivity',
      'Monitor bandwidth usage',
      'Verify firewall status',
      'Check wireless access points',
      'Review security logs'
    ]},
    { category: 'UPS', tasks: [
      'Check battery status',
      'Verify input/output voltages',
      'Test alarm systems',
      'Check cooling fans',
      'Review load capacity',
      'Test bypass functionality'
    ]},
    { category: 'HVAC', tasks: [
      'Check temperature and humidity levels',
      'Verify air circulation',
      'Check filter status',
      'Test alarm systems',
      'Monitor power consumption',
      'Check condensate drainage'
    ]},
    { category: 'DATABASE', tasks: [
      'Check database server status',
      'Verify backup completion',
      'Monitor disk space usage',
      'Review transaction logs',
      'Check data integrity',
      'Test recovery procedures'
    ]}
  ];

  const validationSchema = Yup.object({
    logDate: Yup.date().required('Log date is required'),
    shiftType: Yup.string().required('Shift type is required'),
    technician: Yup.string().required('Technician name is required'),
    startTime: Yup.string().required('Start time is required'),
    endTime: Yup.string().required('End time is required'),
    systemsChecked: Yup.array().min(1, 'At least one system must be checked'),
    dailyChecklist: Yup.array().min(1, 'Daily checklist must have at least one item'),
    issuesReported: Yup.array(),
    remarks: Yup.string()
  });

  const initialValues = {
    logDate: selectedDate,
    shiftType: '',
    technician: '',
    startTime: '',
    endTime: '',
    systemsChecked: [],
    dailyChecklist: [],
    issuesReported: [],
    maintenancePerformed: [],
    consumablesUsed: [],
    remarks: '',
    nextShiftNotes: '',
    approvedBy: ''
  };

  const handleSubmit = useCallback((values, { resetForm }) => {
    const newLog = {
      id: Date.now(),
      ...values,
      createdDate: new Date().toISOString(),
      logNumber: `DAILY-${values.logDate}-${values.shiftType}`,
      completionRate: calculateCompletionRate(values.dailyChecklist)
    };

    setDailyLogs(prev => [...prev, newLog]);
    resetForm();
  }, []);

  const calculateCompletionRate = useCallback((checklist) => {
    if (!checklist || checklist.length === 0) return 0;
    const completedItems = checklist.filter(item => item.completed).length;
    return (completedItems / checklist.length) * 100;
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
    setDailyLogs(prev => prev.filter(log => log.id !== logId));
  }, []);

  const getShiftColor = useCallback((shift) => {
    const shiftObj = shiftTypes.find(s => s.value === shift);
    return shiftObj?.color || 'default';
  }, []);

  const dailyStats = useMemo(() => {
    const selectedDateLogs = dailyLogs.filter(log => log.logDate === selectedDate);
    
    const stats = {
      totalLogs: selectedDateLogs.length,
      avgCompletionRate: selectedDateLogs.length > 0 ? 
        selectedDateLogs.reduce((sum, log) => sum + log.completionRate, 0) / selectedDateLogs.length : 0,
      totalIssues: selectedDateLogs.reduce((sum, log) => sum + (log.issuesReported?.length || 0), 0),
      shiftsCompleted: selectedDateLogs.length,
      systemsMonitored: new Set(selectedDateLogs.flatMap(log => log.systemsChecked || [])).size
    };
    
    return stats;
  }, [dailyLogs, selectedDate]);

  const renderLogCard = useCallback((log) => (
    <Card key={log.id} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {log.logNumber}
            </Typography>
            <Box display="flex" gap={1} mb={1}>
              <Chip 
                label={log.shiftType.replace('_', ' ')} 
                color={getShiftColor(log.shiftType)} 
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
          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="textSecondary">Date</Typography>
            <Typography variant="body1">{new Date(log.logDate).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="textSecondary">Technician</Typography>
            <Typography variant="body1">{log.technician}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="textSecondary">Shift Duration</Typography>
            <Typography variant="body1">{log.startTime} - {log.endTime}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="textSecondary">Systems Checked</Typography>
            <Typography variant="body1">{log.systemsChecked?.length || 0}</Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">Completion Progress</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <LinearProgress 
                variant="determinate" 
                value={log.completionRate}
                sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2">{Math.round(log.completionRate)}%</Typography>
            </Box>
          </Grid>
          
          {log.issuesReported && log.issuesReported.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">Issues Reported</Typography>
              <Badge badgeContent={log.issuesReported.length} color="error">
                <WarningIcon color="warning" />
              </Badge>
              <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                {log.issuesReported.length} issue(s) need attention
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  ), [getShiftColor, handleView, handleEdit, handleDelete]);

  const renderDetailModal = () => (
    <Dialog 
      open={viewModalOpen} 
      onClose={() => setViewModalOpen(false)}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        Daily PM Log Details: {selectedLog?.logNumber}
      </DialogTitle>
      <DialogContent>
        {selectedLog && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Shift Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><TodayIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Log Date" 
                      secondary={new Date(selectedLog.logDate).toLocaleDateString()} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><ScheduleIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Shift Type" 
                      secondary={
                        <Chip 
                          label={selectedLog.shiftType} 
                          color={getShiftColor(selectedLog.shiftType)} 
                          size="small"
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Technician" 
                      secondary={selectedLog.technician} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><TimeIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Duration" 
                      secondary={`${selectedLog.startTime} - ${selectedLog.endTime}`} 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Performance Metrics</Typography>
                <List dense>
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
                      primary="Systems Checked" 
                      secondary={selectedLog.systemsChecked?.length || 0} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Issues Reported" 
                      secondary={selectedLog.issuesReported?.length || 0} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Maintenance Activities" 
                      secondary={selectedLog.maintenancePerformed?.length || 0} 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              {selectedLog.systemsChecked && selectedLog.systemsChecked.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Systems Checked</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {selectedLog.systemsChecked.map((system, index) => (
                      <Chip 
                        key={index} 
                        label={systemCategories.find(cat => cat.value === system)?.label || system} 
                        variant="outlined" 
                        size="small"
                        icon={systemCategories.find(cat => cat.value === system)?.icon}
                      />
                    ))}
                  </Box>
                </Grid>
              )}
              
              {selectedLog.dailyChecklist && selectedLog.dailyChecklist.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Daily Checklist</Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Task</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Notes</TableCell>
                          <TableCell>Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedLog.dailyChecklist.map((task, index) => (
                          <TableRow key={index}>
                            <TableCell>{task.task}</TableCell>
                            <TableCell>
                              <Chip 
                                label={task.completed ? 'Completed' : 'Pending'} 
                                color={task.completed ? 'success' : 'warning'} 
                                size="small"
                                icon={task.completed ? <CheckCircleIcon /> : <ScheduleIcon />}
                              />
                            </TableCell>
                            <TableCell>{task.notes || 'N/A'}</TableCell>
                            <TableCell>{task.completedTime || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
              
              {selectedLog.issuesReported && selectedLog.issuesReported.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Issues Reported</Typography>
                  <List dense>
                    {selectedLog.issuesReported.map((issue, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <WarningIcon color={issue.severity === 'HIGH' ? 'error' : 'warning'} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={issue.description} 
                          secondary={`System: ${issue.system} | Severity: ${issue.severity} | Action Required: ${issue.actionRequired}`} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )}
              
              {selectedLog.nextShiftNotes && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Notes for Next Shift</Typography>
                  <Paper sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                    <Typography variant="body2">{selectedLog.nextShiftNotes}</Typography>
                  </Paper>
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
    <AFCSDCFormLayout title="PM Log Book - Daily">
      <Container maxWidth="xl">
        {/* Daily Statistics Dashboard */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Daily PM Statistics</Typography>
            <UniversalAFCSDCFormField
              type="date"
              name="selectedDate"
              label="Select Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">{dailyStats.totalLogs}</Typography>
                  <Typography variant="body2">Total Logs</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">{dailyStats.shiftsCompleted}</Typography>
                  <Typography variant="body2">Shifts</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">{dailyStats.systemsMonitored}</Typography>
                  <Typography variant="body2">Systems</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{dailyStats.totalIssues}</Typography>
                  <Typography variant="body2">Issues</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary.main">
                    {Math.round(dailyStats.avgCompletionRate)}%
                  </Typography>
                  <Typography variant="body2">Avg Completion Rate</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={dailyStats.avgCompletionRate} 
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Daily Log Entry Form */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Create Daily PM Log</Typography>
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
                      type="date"
                      name="logDate"
                      label="Log Date"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="shiftType"
                      label="Shift Type"
                      options={shiftTypes}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="technician"
                      label="Technician Name"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="time"
                      name="startTime"
                      label="Shift Start Time"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="time"
                      name="endTime"
                      label="Shift End Time"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Systems to Check</Typography>
                    <Grid container spacing={1}>
                      {systemCategories.map((category) => (
                        <Grid item xs={6} md={3} key={category.value}>
                          <UniversalAFCSDCFormField
                            type="checkbox"
                            name="systemsChecked"
                            value={category.value}
                            label={category.label}
                            multiple
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Daily Checklist Tasks</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FieldArray name="dailyChecklist">
                          {({ push, remove }) => (
                            <Box>
                              {values.dailyChecklist?.map((task, index) => (
                                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                  <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={6}>
                                      <UniversalAFCSDCFormField
                                        type="text"
                                        name={`dailyChecklist.${index}.task`}
                                        label="Task Description"
                                      />
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                      <UniversalAFCSDCFormField
                                        type="checkbox"
                                        name={`dailyChecklist.${index}.completed`}
                                        label="Completed"
                                      />
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                      <UniversalAFCSDCFormField
                                        type="time"
                                        name={`dailyChecklist.${index}.completedTime`}
                                        label="Time"
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
                                        name={`dailyChecklist.${index}.notes`}
                                        label="Notes"
                                      />
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))}
                              <Button 
                                startIcon={<AddIcon />} 
                                onClick={() => push({ task: '', completed: false, notes: '', completedTime: '' })}
                              >
                                Add Checklist Task
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
                      name="nextShiftNotes"
                      label="Notes for Next Shift"
                      rows={2}
                    />
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
                    Create Daily Log
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>

        {/* Daily Logs List */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Daily Logs for {new Date(selectedDate).toLocaleDateString()} ({dailyLogs.filter(log => log.logDate === selectedDate).length})
          </Typography>
          
          {dailyLogs.filter(log => log.logDate === selectedDate).length === 0 ? (
            <Alert severity="info">
              No daily PM logs recorded for this date. Create your first daily log above.
            </Alert>
          ) : (
            <Box>
              {dailyLogs.filter(log => log.logDate === selectedDate).map(renderLogCard)}
            </Box>
          )}
        </Paper>

        {renderDetailModal()}
      </Container>
    </AFCSDCFormLayout>
  );
};

export default PmLogBookDailySDCForm;