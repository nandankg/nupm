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
  Divider,
  LinearProgress,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails
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
  CalendarToday as CalendarIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  ExpandMore as ExpandMoreIcon,
  Print as PrintIcon,
  GetApp as DownloadIcon
} from '@mui/icons-material';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

const PmLogBookMonthlySDCForm = () => {
  const [pmLogs, setPmLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));

  const pmCategories = [
    { value: 'TVM_PM', label: 'TVM Preventive Maintenance', frequency: 'Weekly' },
    { value: 'TOM_PM', label: 'TOM Preventive Maintenance', frequency: 'Weekly' },
    { value: 'AGC_PM', label: 'AGC Preventive Maintenance', frequency: 'Bi-weekly' },
    { value: 'CCS_PM', label: 'CCS Preventive Maintenance', frequency: 'Monthly' },
    { value: 'NETWORK_PM', label: 'Network Infrastructure PM', frequency: 'Monthly' },
    { value: 'DATABASE_PM', label: 'Database Maintenance', frequency: 'Weekly' },
    { value: 'BACKUP_PM', label: 'Backup System PM', frequency: 'Daily' },
    { value: 'UPS_PM', label: 'UPS System PM', frequency: 'Monthly' },
    { value: 'COOLING_PM', label: 'Cooling System PM', frequency: 'Monthly' },
    { value: 'SECURITY_PM', label: 'Security System PM', frequency: 'Monthly' }
  ];

  const priorityLevels = [
    { value: 'LOW', label: 'Low Priority', color: 'success' },
    { value: 'MEDIUM', label: 'Medium Priority', color: 'warning' },
    { value: 'HIGH', label: 'High Priority', color: 'error' },
    { value: 'CRITICAL', label: 'Critical Priority', color: 'error' }
  ];

  const pmStatus = [
    { value: 'SCHEDULED', label: 'Scheduled', color: 'info' },
    { value: 'IN_PROGRESS', label: 'In Progress', color: 'warning' },
    { value: 'COMPLETED', label: 'Completed', color: 'success' },
    { value: 'DELAYED', label: 'Delayed', color: 'error' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'secondary' }
  ];

  const equipmentList = [
    'TVM-01', 'TVM-02', 'TVM-03', 'TVM-04', 'TVM-05',
    'TOM-01', 'TOM-02', 'TOM-03', 'TOM-04',
    'AGC-01', 'AGC-02', 'AGC-03', 'AGC-04', 'AGC-05', 'AGC-06',
    'CCS-MAIN', 'CCS-BACKUP',
    'SW-01', 'SW-02', 'SW-03', 'SW-04',
    'UPS-01', 'UPS-02', 'UPS-03',
    'HVAC-01', 'HVAC-02'
  ];

  const validationSchema = Yup.object({
    pmCategory: Yup.string().required('PM category is required'),
    equipmentId: Yup.string().required('Equipment ID is required'),
    scheduledDate: Yup.date().required('Scheduled date is required'),
    scheduledTime: Yup.string().required('Scheduled time is required'),
    priority: Yup.string().required('Priority level is required'),
    assignedTechnician: Yup.string().required('Assigned technician is required'),
    estimatedDuration: Yup.number().min(15, 'Duration must be at least 15 minutes').required('Estimated duration is required'),
    pmChecklist: Yup.array().min(1, 'At least one checklist item is required'),
    actualStartTime: Yup.string().when('status', {
      is: (val) => val && ['IN_PROGRESS', 'COMPLETED'].includes(val),
      then: (schema) => schema.required('Actual start time is required'),
      otherwise: (schema) => schema
    }),
    actualEndTime: Yup.string().when('status', {
      is: 'COMPLETED',
      then: (schema) => schema.required('Actual end time is required'),
      otherwise: (schema) => schema
    }),
    completedBy: Yup.string().when('status', {
      is: 'COMPLETED',
      then: (schema) => schema.required('Completed by is required'),
      otherwise: (schema) => schema
    })
  });

  const initialValues = {
    pmCategory: '',
    equipmentId: '',
    scheduledDate: '',
    scheduledTime: '',
    priority: 'MEDIUM',
    assignedTechnician: '',
    estimatedDuration: 60,
    status: 'SCHEDULED',
    pmChecklist: [
      { item: 'Visual inspection', completed: false, remarks: '' },
      { item: 'Clean equipment exterior', completed: false, remarks: '' },
      { item: 'Check all connections', completed: false, remarks: '' },
      { item: 'Test functionality', completed: false, remarks: '' },
      { item: 'Update maintenance log', completed: false, remarks: '' }
    ],
    actualStartTime: '',
    actualEndTime: '',
    completedBy: '',
    issuesFound: [],
    partsReplaced: [],
    nextPmDate: '',
    remarks: '',
    approvedBy: ''
  };

  const handleSubmit = useCallback((values, { resetForm }) => {
    const newLog = {
      id: Date.now(),
      ...values,
      createdDate: new Date().toISOString(),
      logNumber: `PM-${currentMonth}-${String(pmLogs.length + 1).padStart(3, '0')}`,
      month: currentMonth
    };

    setPmLogs(prev => [...prev, newLog]);
    resetForm();
  }, [pmLogs.length, currentMonth]);

  const handleEdit = useCallback((log) => {
    setSelectedLog(log);
    setViewModalOpen(true);
  }, []);

  const handleView = useCallback((log) => {
    setSelectedLog(log);
    setViewModalOpen(true);
  }, []);

  const handleDelete = useCallback((logId) => {
    setPmLogs(prev => prev.filter(log => log.id !== logId));
  }, []);

  const getStatusColor = useCallback((status) => {
    const statusObj = pmStatus.find(s => s.value === status);
    return statusObj?.color || 'default';
  }, []);

  const getPriorityColor = useCallback((priority) => {
    const priorityObj = priorityLevels.find(p => p.value === priority);
    return priorityObj?.color || 'default';
  }, []);

  const monthlyStats = useMemo(() => {
    const currentMonthLogs = pmLogs.filter(log => log.month === currentMonth);
    
    const stats = {
      total: currentMonthLogs.length,
      completed: currentMonthLogs.filter(log => log.status === 'COMPLETED').length,
      inProgress: currentMonthLogs.filter(log => log.status === 'IN_PROGRESS').length,
      delayed: currentMonthLogs.filter(log => log.status === 'DELAYED').length,
      scheduled: currentMonthLogs.filter(log => log.status === 'SCHEDULED').length
    };

    stats.completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
    
    return stats;
  }, [pmLogs, currentMonth]);

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
                label={log.status.replace('_', ' ')} 
                color={getStatusColor(log.status)} 
                size="small" 
              />
              <Chip 
                label={log.priority} 
                color={getPriorityColor(log.priority)} 
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
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary">PM Category</Typography>
            <Typography variant="body1">
              {pmCategories.find(c => c.value === log.pmCategory)?.label}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary">Equipment ID</Typography>
            <Typography variant="body1">{log.equipmentId}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary">Assigned Technician</Typography>
            <Typography variant="body1">{log.assignedTechnician}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">Scheduled Date & Time</Typography>
            <Typography variant="body1">
              {new Date(log.scheduledDate).toLocaleDateString()} at {log.scheduledTime}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">Estimated Duration</Typography>
            <Typography variant="body1">{log.estimatedDuration} minutes</Typography>
          </Grid>
          {log.status === 'COMPLETED' && (
            <>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="textSecondary">Actual Duration</Typography>
                <Typography variant="body1">
                  {log.actualStartTime && log.actualEndTime ? 
                    `${log.actualStartTime} - ${log.actualEndTime}` : 
                    'Not recorded'
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="textSecondary">Completion Rate</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <LinearProgress 
                    variant="determinate" 
                    value={log.pmChecklist ? (log.pmChecklist.filter(item => item.completed).length / log.pmChecklist.length) * 100 : 0}
                    sx={{ flexGrow: 1 }}
                  />
                  <Typography variant="body2">
                    {log.pmChecklist ? Math.round((log.pmChecklist.filter(item => item.completed).length / log.pmChecklist.length) * 100) : 0}%
                  </Typography>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  ), [pmCategories, getStatusColor, getPriorityColor, handleView, handleEdit, handleDelete]);

  const renderDetailModal = () => (
    <Dialog 
      open={viewModalOpen} 
      onClose={() => setViewModalOpen(false)}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        PM Log Details: {selectedLog?.logNumber}
      </DialogTitle>
      <DialogContent>
        {selectedLog && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Basic Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="PM Category" 
                      secondary={pmCategories.find(c => c.value === selectedLog.pmCategory)?.label} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Equipment ID" 
                      secondary={selectedLog.equipmentId} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Priority" 
                      secondary={
                        <Chip 
                          label={selectedLog.priority} 
                          color={getPriorityColor(selectedLog.priority)} 
                          size="small"
                        />
                      } 
                    />
                  </ListItem>
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
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Schedule Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Scheduled Date" 
                      secondary={new Date(selectedLog.scheduledDate).toLocaleDateString()} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Scheduled Time" 
                      secondary={selectedLog.scheduledTime} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Assigned Technician" 
                      secondary={selectedLog.assignedTechnician} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Estimated Duration" 
                      secondary={`${selectedLog.estimatedDuration} minutes`} 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              {selectedLog.pmChecklist && selectedLog.pmChecklist.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>PM Checklist</Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Checklist Item</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedLog.pmChecklist.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.item}</TableCell>
                            <TableCell>
                              <Chip 
                                label={item.completed ? 'Completed' : 'Pending'} 
                                color={item.completed ? 'success' : 'warning'} 
                                size="small"
                                icon={item.completed ? <CheckCircleIcon /> : <ScheduleIcon />}
                              />
                            </TableCell>
                            <TableCell>{item.remarks || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
              
              {selectedLog.issuesFound && selectedLog.issuesFound.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Issues Found</Typography>
                  <List dense>
                    {selectedLog.issuesFound.map((issue, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <WarningIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={issue.description} 
                          secondary={`Severity: ${issue.severity} | Action: ${issue.action}`} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )}
              
              {selectedLog.partsReplaced && selectedLog.partsReplaced.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Parts Replaced</Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Part Name</TableCell>
                          <TableCell>Part Number</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Cost</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedLog.partsReplaced.map((part, index) => (
                          <TableRow key={index}>
                            <TableCell>{part.name}</TableCell>
                            <TableCell>{part.partNumber}</TableCell>
                            <TableCell>{part.quantity}</TableCell>
                            <TableCell>₹{part.cost}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
        <Button startIcon={<PrintIcon />}>Print</Button>
        <Button startIcon={<DownloadIcon />}>Export</Button>
        <Button onClick={() => setViewModalOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <AFCSDCFormLayout title="PM Log Book - Monthly">
      <Container maxWidth="xl">
        {/* Monthly Statistics Dashboard */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Monthly PM Statistics</Typography>
            <UniversalAFCSDCFormField
              type="month"
              name="currentMonth"
              label="Select Month"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(e.target.value)}
            />
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">{monthlyStats.total}</Typography>
                  <Typography variant="body2">Total PM</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">{monthlyStats.completed}</Typography>
                  <Typography variant="body2">Completed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">{monthlyStats.inProgress}</Typography>
                  <Typography variant="body2">In Progress</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{monthlyStats.delayed}</Typography>
                  <Typography variant="body2">Delayed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">{monthlyStats.scheduled}</Typography>
                  <Typography variant="body2">Scheduled</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary.main">
                    {Math.round(monthlyStats.completionRate)}%
                  </Typography>
                  <Typography variant="body2">Completion Rate</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>Overall Progress</Typography>
            <LinearProgress 
              variant="determinate" 
              value={monthlyStats.completionRate} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        </Paper>

        {/* PM Entry Form */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Schedule New PM Activity</Typography>
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
                      type="select"
                      name="pmCategory"
                      label="PM Category"
                      options={pmCategories}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="equipmentId"
                      label="Equipment ID"
                      options={equipmentList.map(eq => ({ value: eq, label: eq }))}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name="scheduledDate"
                      label="Scheduled Date"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="time"
                      name="scheduledTime"
                      label="Scheduled Time"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="priority"
                      label="Priority"
                      options={priorityLevels}
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
                      type="number"
                      name="estimatedDuration"
                      label="Estimated Duration (minutes)"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="status"
                      label="Current Status"
                      options={pmStatus}
                    />
                  </Grid>
                  
                  {values.status !== 'SCHEDULED' && (
                    <>
                      <Grid item xs={12} md={3}>
                        <UniversalAFCSDCFormField
                          type="time"
                          name="actualStartTime"
                          label="Actual Start Time"
                          required
                        />
                      </Grid>
                      
                      {values.status === 'COMPLETED' && (
                        <>
                          <Grid item xs={12} md={3}>
                            <UniversalAFCSDCFormField
                              type="time"
                              name="actualEndTime"
                              label="Actual End Time"
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
                    </>
                  )}
                  
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">PM Checklist Items</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FieldArray name="pmChecklist">
                          {({ push, remove }) => (
                            <Box>
                              {values.pmChecklist?.map((item, index) => (
                                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                      <UniversalAFCSDCFormField
                                        type="text"
                                        name={`pmChecklist.${index}.item`}
                                        label="Checklist Item"
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                      <UniversalAFCSDCFormField
                                        type="checkbox"
                                        name={`pmChecklist.${index}.completed`}
                                        label="Completed"
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                      <Button 
                                        color="error" 
                                        onClick={() => remove(index)}
                                        startIcon={<DeleteIcon />}
                                      >
                                        Remove
                                      </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <UniversalAFCSDCFormField
                                        type="text"
                                        name={`pmChecklist.${index}.remarks`}
                                        label="Remarks"
                                      />
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))}
                              <Button 
                                startIcon={<AddIcon />} 
                                onClick={() => push({ item: '', completed: false, remarks: '' })}
                              >
                                Add Checklist Item
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
                    Add PM Log Entry
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>

        {/* PM Logs List */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            PM Log Entries for {new Date(currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} ({pmLogs.filter(log => log.month === currentMonth).length})
          </Typography>
          
          {pmLogs.filter(log => log.month === currentMonth).length === 0 ? (
            <Alert severity="info">
              No PM activities scheduled for this month. Add your first PM log entry above.
            </Alert>
          ) : (
            <Box>
              {pmLogs.filter(log => log.month === currentMonth).map(renderLogCard)}
            </Box>
          )}
        </Paper>

        {renderDetailModal()}
      </Container>
    </AFCSDCFormLayout>
  );
};

export default PmLogBookMonthlySDCForm;