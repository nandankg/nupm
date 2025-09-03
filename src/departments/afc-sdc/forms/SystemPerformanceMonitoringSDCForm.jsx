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
  Gauge,
  Tabs,
  Tab,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  NetworkCheck as NetworkIcon,
  Computer as ComputerIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Timeline as TimelineIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

const SystemPerformanceMonitoringSDCForm = () => {
  const [performanceReports, setPerformanceReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [realTimeMode, setRealTimeMode] = useState(false);

  const systemCategories = [
    { 
      value: 'TVM_SYSTEM', 
      label: 'TVM Systems',
      metrics: ['Uptime', 'Transaction Volume', 'Response Time', 'Error Rate', 'Cash Accuracy', 'Card Read Success']
    },
    { 
      value: 'TOM_SYSTEM', 
      label: 'TOM Systems',
      metrics: ['Uptime', 'Transaction Speed', 'Print Quality', 'Network Latency', 'User Sessions', 'Error Count']
    },
    { 
      value: 'AGC_SYSTEM', 
      label: 'AGC Systems',
      metrics: ['Gate Operations/Hour', 'Sensor Accuracy', 'Response Time', 'Fault Rate', 'Passenger Flow', 'Security Alerts']
    },
    { 
      value: 'CCS_SYSTEM', 
      label: 'Central Computer Systems',
      metrics: ['CPU Usage', 'Memory Usage', 'Disk Usage', 'Network Throughput', 'Database Performance', 'Backup Status']
    },
    { 
      value: 'NETWORK_SYSTEM', 
      label: 'Network Infrastructure',
      metrics: ['Bandwidth Usage', 'Packet Loss', 'Latency', 'Switch Performance', 'Wireless Coverage', 'Security Events']
    },
    { 
      value: 'UPS_SYSTEM', 
      label: 'UPS Systems',
      metrics: ['Load Percentage', 'Battery Health', 'Input Voltage', 'Output Voltage', 'Temperature', 'Runtime']
    }
  ];

  const performanceThresholds = {
    EXCELLENT: { min: 95, color: 'success', icon: <CheckCircleIcon /> },
    GOOD: { min: 85, color: 'info', icon: <InfoIcon /> },
    WARNING: { min: 70, color: 'warning', icon: <WarningIcon /> },
    CRITICAL: { min: 0, color: 'error', icon: <ErrorIcon /> }
  };

  const reportTypes = [
    { value: 'REALTIME', label: 'Real-time Monitoring', interval: '1min' },
    { value: 'HOURLY', label: 'Hourly Report', interval: '1hour' },
    { value: 'DAILY', label: 'Daily Report', interval: '1day' },
    { value: 'WEEKLY', label: 'Weekly Report', interval: '1week' },
    { value: 'MONTHLY', label: 'Monthly Report', interval: '1month' }
  ];

  const validationSchema = Yup.object({
    systemCategory: Yup.string().required('System category is required'),
    reportType: Yup.string().required('Report type is required'),
    monitoringPeriod: Yup.string().required('Monitoring period is required'),
    performanceMetrics: Yup.array().min(1, 'At least one performance metric is required'),
    alertThresholds: Yup.array().min(1, 'At least one alert threshold must be set'),
    reportTitle: Yup.string().required('Report title is required'),
    generatedBy: Yup.string().required('Generator name is required')
  });

  const initialValues = {
    reportTitle: '',
    systemCategory: '',
    reportType: 'DAILY',
    monitoringPeriod: '',
    performanceMetrics: [],
    alertThresholds: [],
    dataPoints: [],
    summary: '',
    recommendations: [],
    issues: [],
    generatedBy: '',
    scheduledReports: false,
    alertsEnabled: true,
    autoGenerate: false
  };

  const generateMockData = useCallback((systemCategory, metrics) => {
    return metrics.map(metric => ({
      name: metric,
      current: Math.round(Math.random() * 100),
      average: Math.round(Math.random() * 100),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      status: getPerformanceStatus(Math.round(Math.random() * 100)),
      history: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
        value: Math.round(Math.random() * 100)
      }))
    }));
  }, []);

  const getPerformanceStatus = useCallback((value) => {
    if (value >= performanceThresholds.EXCELLENT.min) return 'EXCELLENT';
    if (value >= performanceThresholds.GOOD.min) return 'GOOD';
    if (value >= performanceThresholds.WARNING.min) return 'WARNING';
    return 'CRITICAL';
  }, []);

  const handleSubmit = useCallback((values, { resetForm }) => {
    const systemMetrics = systemCategories.find(c => c.value === values.systemCategory)?.metrics || [];
    const mockData = generateMockData(values.systemCategory, systemMetrics);
    
    const newReport = {
      id: Date.now(),
      ...values,
      createdDate: new Date().toISOString(),
      reportNumber: `PERF-${values.systemCategory}-${String(performanceReports.length + 1).padStart(4, '0')}`,
      performanceData: mockData,
      overallScore: Math.round(mockData.reduce((sum, m) => sum + m.current, 0) / mockData.length),
      status: 'ACTIVE',
      nextScheduled: values.scheduledReports ? new Date(Date.now() + 24 * 3600000).toISOString() : null
    };

    setPerformanceReports(prev => [...prev, newReport]);
    resetForm();
  }, [performanceReports.length, systemCategories, generateMockData]);

  const handleEdit = useCallback((report) => {
    setSelectedReport(report);
    setViewModalOpen(true);
  }, []);

  const handleView = useCallback((report) => {
    setSelectedReport(report);
    setViewModalOpen(true);
  }, []);

  const handleDelete = useCallback((reportId) => {
    setPerformanceReports(prev => prev.filter(report => report.id !== reportId));
  }, []);

  const getStatusColor = useCallback((status) => {
    return performanceThresholds[status]?.color || 'default';
  }, []);

  const getStatusIcon = useCallback((status) => {
    return performanceThresholds[status]?.icon || <InfoIcon />;
  }, []);

  const reportStats = useMemo(() => {
    const stats = {
      totalReports: performanceReports.length,
      activeReports: performanceReports.filter(r => r.status === 'ACTIVE').length,
      criticalAlerts: performanceReports.reduce((sum, r) => 
        sum + (r.performanceData?.filter(m => m.status === 'CRITICAL').length || 0), 0),
      avgOverallScore: performanceReports.length > 0 ? 
        performanceReports.reduce((sum, r) => sum + (r.overallScore || 0), 0) / performanceReports.length : 0,
      systemsMonitored: new Set(performanceReports.map(r => r.systemCategory)).size,
      scheduledReports: performanceReports.filter(r => r.scheduledReports).length
    };
    
    return stats;
  }, [performanceReports]);

  const renderPerformanceCard = useCallback((report) => {
    const criticalMetrics = report.performanceData?.filter(m => m.status === 'CRITICAL').length || 0;
    const warningMetrics = report.performanceData?.filter(m => m.status === 'WARNING').length || 0;
    
    return (
      <Card key={report.id} sx={{ 
        mb: 2, 
        border: criticalMetrics > 0 ? '2px solid #f44336' : warningMetrics > 0 ? '2px solid #ff9800' : '1px solid #e0e0e0',
        borderRadius: 2
      }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box>
              <Typography variant="h6" component="div" gutterBottom>
                {report.reportTitle}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {report.reportNumber}
              </Typography>
              <Box display="flex" gap={1} mb={1}>
                <Chip 
                  label={report.reportType} 
                  color="primary" 
                  size="small" 
                />
                <Chip 
                  label={`Overall: ${Math.round(report.overallScore || 0)}%`} 
                  color={getStatusColor(getPerformanceStatus(report.overallScore || 0))} 
                  size="small"
                  icon={getStatusIcon(getPerformanceStatus(report.overallScore || 0))}
                />
                {criticalMetrics > 0 && (
                  <Chip 
                    label={`${criticalMetrics} Critical`} 
                    color="error" 
                    size="small"
                    icon={<ErrorIcon />}
                  />
                )}
                {warningMetrics > 0 && (
                  <Chip 
                    label={`${warningMetrics} Warning`} 
                    color="warning" 
                    size="small"
                    icon={<WarningIcon />}
                  />
                )}
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <Button size="small" onClick={() => handleView(report)} startIcon={<ViewIcon />}>
                View
              </Button>
              <Button size="small" onClick={() => handleEdit(report)} startIcon={<EditIcon />}>
                Edit
              </Button>
              <Button 
                size="small" 
                color="error" 
                onClick={() => handleDelete(report.id)} 
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">System Category</Typography>
              <Typography variant="body1">
                {systemCategories.find(c => c.value === report.systemCategory)?.label}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Monitoring Period</Typography>
              <Typography variant="body1">{report.monitoringPeriod}</Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Generated By</Typography>
              <Typography variant="body1">{report.generatedBy}</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">Performance Overview</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <LinearProgress 
                  variant="determinate" 
                  value={report.overallScore || 0}
                  sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
                  color={
                    (report.overallScore || 0) >= 95 ? 'success' :
                    (report.overallScore || 0) >= 85 ? 'info' :
                    (report.overallScore || 0) >= 70 ? 'warning' : 'error'
                  }
                />
                <Typography variant="body2">{Math.round(report.overallScore || 0)}%</Typography>
              </Box>
            </Grid>
            
            {report.performanceData && report.performanceData.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" gutterBottom>Key Metrics</Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {report.performanceData.slice(0, 4).map((metric, index) => (
                    <Card key={index} sx={{ minWidth: 100, p: 1 }}>
                      <Typography variant="caption" color="textSecondary">{metric.name}</Typography>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Typography variant="h6" color={getStatusColor(metric.status)}>
                          {metric.current}%
                        </Typography>
                        {metric.trend === 'up' ? 
                          <TrendingUpIcon color="success" fontSize="small" /> : 
                          <TrendingDownIcon color="error" fontSize="small" />
                        }
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">Report Created</Typography>
              <Typography variant="body2">
                {new Date(report.createdDate).toLocaleString()}
                {report.scheduledReports && report.nextScheduled && (
                  <span style={{ marginLeft: 16 }}>
                    Next: {new Date(report.nextScheduled).toLocaleString()}
                  </span>
                )}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }, [systemCategories, getStatusColor, getStatusIcon, getPerformanceStatus, handleView, handleEdit, handleDelete]);

  const renderDetailModal = () => (
    <Dialog 
      open={viewModalOpen} 
      onClose={() => setViewModalOpen(false)}
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle>
        Performance Report: {selectedReport?.reportTitle}
      </DialogTitle>
      <DialogContent>
        {selectedReport && (
          <Box sx={{ mt: 2 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Overview" icon={<DashboardIcon />} />
              <Tab label="Metrics" icon={<AnalyticsIcon />} />
              <Tab label="Trends" icon={<TimelineIcon />} />
              <Tab label="Alerts" icon={<WarningIcon />} />
            </Tabs>
            
            {activeTab === 0 && (
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>System Performance Overview</Typography>
                        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                          <Box position="relative" display="inline-flex">
                            <LinearProgress
                              variant="determinate"
                              value={selectedReport.overallScore || 0}
                              sx={{ width: 200, height: 10, borderRadius: 5 }}
                              color={
                                (selectedReport.overallScore || 0) >= 95 ? 'success' :
                                (selectedReport.overallScore || 0) >= 85 ? 'info' :
                                (selectedReport.overallScore || 0) >= 70 ? 'warning' : 'error'
                              }
                            />
                            <Box position="absolute" top={-30} left="50%" sx={{ transform: 'translateX(-50%)' }}>
                              <Typography variant="h4" color="primary">
                                {Math.round(selectedReport.overallScore || 0)}%
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={3}>
                            <Card>
                              <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" color="success.main">
                                  {selectedReport.performanceData?.filter(m => m.status === 'EXCELLENT').length || 0}
                                </Typography>
                                <Typography variant="body2">Excellent</Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Card>
                              <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" color="info.main">
                                  {selectedReport.performanceData?.filter(m => m.status === 'GOOD').length || 0}
                                </Typography>
                                <Typography variant="body2">Good</Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Card>
                              <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" color="warning.main">
                                  {selectedReport.performanceData?.filter(m => m.status === 'WARNING').length || 0}
                                </Typography>
                                <Typography variant="body2">Warning</Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Card>
                              <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" color="error.main">
                                  {selectedReport.performanceData?.filter(m => m.status === 'CRITICAL').length || 0}
                                </Typography>
                                <Typography variant="body2">Critical</Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Report Information</Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon><ComputerIcon /></ListItemIcon>
                            <ListItemText 
                              primary="System Category" 
                              secondary={systemCategories.find(c => c.value === selectedReport.systemCategory)?.label} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><TimelineIcon /></ListItemIcon>
                            <ListItemText 
                              primary="Report Type" 
                              secondary={selectedReport.reportType} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText 
                              primary="Monitoring Period" 
                              secondary={selectedReport.monitoringPeriod} 
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {activeTab === 1 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
                {selectedReport.performanceData && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Metric</TableCell>
                          <TableCell>Current</TableCell>
                          <TableCell>Average</TableCell>
                          <TableCell>Trend</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Performance</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedReport.performanceData.map((metric, index) => (
                          <TableRow key={index}>
                            <TableCell>{metric.name}</TableCell>
                            <TableCell>{metric.current}%</TableCell>
                            <TableCell>{metric.average}%</TableCell>
                            <TableCell>
                              {metric.trend === 'up' ? 
                                <TrendingUpIcon color="success" /> : 
                                <TrendingDownIcon color="error" />
                              }
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={metric.status} 
                                color={getStatusColor(metric.status)} 
                                size="small"
                                icon={getStatusIcon(metric.status)}
                              />
                            </TableCell>
                            <TableCell>
                              <LinearProgress 
                                variant="determinate" 
                                value={metric.current}
                                color={
                                  metric.current >= 95 ? 'success' :
                                  metric.current >= 85 ? 'info' :
                                  metric.current >= 70 ? 'warning' : 'error'
                                }
                                sx={{ width: 100 }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}
            
            {activeTab === 2 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Performance Trends</Typography>
                <Alert severity="info">
                  Trend analysis charts would be displayed here in a production environment.
                  This would include historical data visualization, performance correlations, and predictive analytics.
                </Alert>
              </Box>
            )}
            
            {activeTab === 3 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Active Alerts</Typography>
                {selectedReport.issues && selectedReport.issues.length > 0 ? (
                  <List>
                    {selectedReport.issues.map((issue, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <WarningIcon color={issue.severity === 'HIGH' ? 'error' : 'warning'} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={issue.description} 
                          secondary={`Severity: ${issue.severity} | Component: ${issue.component}`} 
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Alert severity="success">
                    No active alerts. All systems are performing within normal parameters.
                  </Alert>
                )}
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setViewModalOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <AFCSDCFormLayout title="System Performance Monitoring">
      <Container maxWidth="xl">
        {/* Real-time Dashboard */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: realTimeMode ? 'primary.light' : 'background.paper' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Performance Dashboard</Typography>
            <FormControlLabel
              control={
                <Switch 
                  checked={realTimeMode} 
                  onChange={(e) => setRealTimeMode(e.target.checked)}
                  color="primary"
                />
              }
              label="Real-time Mode"
            />
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">{reportStats.totalReports}</Typography>
                  <Typography variant="body2">Total Reports</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">{reportStats.activeReports}</Typography>
                  <Typography variant="body2">Active</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{reportStats.criticalAlerts}</Typography>
                  <Typography variant="body2">Critical Alerts</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">{reportStats.systemsMonitored}</Typography>
                  <Typography variant="body2">Systems</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary.main">{reportStats.scheduledReports}</Typography>
                  <Typography variant="body2">Scheduled</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {Math.round(reportStats.avgOverallScore)}%
                  </Typography>
                  <Typography variant="body2">Avg Performance</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Performance Report Form */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Generate Performance Report</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="reportTitle"
                      label="Report Title"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="reportType"
                      label="Report Type"
                      options={reportTypes}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="systemCategory"
                      label="System Category"
                      options={systemCategories}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="monitoringPeriod"
                      label="Monitoring Period"
                      placeholder="e.g., Last 24 hours, This week"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="generatedBy"
                      label="Generated By"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={values.scheduledReports} 
                            onChange={(e) => setFieldValue('scheduledReports', e.target.checked)}
                          />
                        }
                        label="Enable Scheduled Reports"
                      />
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={values.alertsEnabled} 
                            onChange={(e) => setFieldValue('alertsEnabled', e.target.checked)}
                          />
                        }
                        label="Enable Alerts"
                        sx={{ ml: 2 }}
                      />
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={values.autoGenerate} 
                            onChange={(e) => setFieldValue('autoGenerate', e.target.checked)}
                          />
                        }
                        label="Auto Generate"
                        sx={{ ml: 2 }}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name="summary"
                      label="Report Summary"
                      rows={3}
                      placeholder="Brief overview of system performance and key findings..."
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
                    Generate Report
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<SpeedIcon />}
                  >
                    Run Real-time Scan
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>

        {/* Performance Reports List */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Performance Reports ({performanceReports.length})
          </Typography>
          
          {performanceReports.length === 0 ? (
            <Alert severity="info">
              No performance reports generated yet. Create your first report above.
            </Alert>
          ) : (
            <Box>
              {performanceReports.map(renderPerformanceCard)}
            </Box>
          )}
        </Paper>

        {renderDetailModal()}
      </Container>
    </AFCSDCFormLayout>
  );
};

export default SystemPerformanceMonitoringSDCForm;