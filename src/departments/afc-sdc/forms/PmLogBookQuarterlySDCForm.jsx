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
  StepLabel,
  StepContent
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
  TrendingUp as TrendingUpIcon,
  Analytics as AnalyticsIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

const PmLogBookQuarterlySDCForm = () => {
  const [quarterlyLogs, setQuarterlyLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState(getCurrentQuarter());

  const quarterlyCategories = [
    { value: 'COMPREHENSIVE_AUDIT', label: 'Comprehensive System Audit', priority: 'CRITICAL' },
    { value: 'MAJOR_UPGRADES', label: 'Major Hardware/Software Upgrades', priority: 'HIGH' },
    { value: 'DEEP_MAINTENANCE', label: 'Deep System Maintenance', priority: 'HIGH' },
    { value: 'PERFORMANCE_REVIEW', label: 'Performance & Capacity Review', priority: 'MEDIUM' },
    { value: 'SECURITY_ASSESSMENT', label: 'Security Assessment & Hardening', priority: 'CRITICAL' },
    { value: 'DISASTER_RECOVERY', label: 'Disaster Recovery Testing', priority: 'CRITICAL' },
    { value: 'COMPLIANCE_REVIEW', label: 'Compliance & Standards Review', priority: 'HIGH' },
    { value: 'TRAINING_CERTIFICATION', label: 'Staff Training & Certification', priority: 'MEDIUM' }
  ];

  const quarterPhases = [
    { value: 'PLANNING', label: 'Planning & Preparation', duration: '2 weeks' },
    { value: 'EXECUTION', label: 'Execution & Implementation', duration: '8 weeks' },
    { value: 'VALIDATION', label: 'Validation & Testing', duration: '2 weeks' },
    { value: 'DOCUMENTATION', label: 'Documentation & Reporting', duration: '1 week' }
  ];

  const majorSystems = [
    {
      name: 'Central Control Systems',
      components: ['CCS-PRIMARY', 'CCS-BACKUP', 'DATABASE-CLUSTER', 'MONITORING-SYSTEM'],
      quarterlyTasks: [
        'Complete system architecture review',
        'Database performance optimization and cleanup',
        'Failover and recovery testing',
        'Security vulnerability assessment',
        'Capacity planning and forecast analysis',
        'Documentation and procedure updates'
      ]
    },
    {
      name: 'Ticketing Infrastructure',
      components: ['TVM-FLEET', 'TOM-NETWORK', 'PAYMENT-GATEWAY', 'CARD-MANAGEMENT'],
      quarterlyTasks: [
        'Fleet-wide hardware diagnostics',
        'Payment system security audit',
        'Card lifecycle management review',
        'Revenue reconciliation system check',
        'Customer interface usability assessment',
        'Fraud detection system validation'
      ]
    },
    {
      name: 'Access Control Systems',
      components: ['AGC-NETWORK', 'FARE-GATES', 'EMERGENCY-SYSTEMS', 'PASSENGER-FLOW'],
      quarterlyTasks: [
        'Gate mechanism comprehensive service',
        'Emergency response system testing',
        'Passenger flow optimization analysis',
        'Anti-tailgating system calibration',
        'Integration testing with central systems',
        'Accessibility compliance verification'
      ]
    },
    {
      name: 'Network & Communications',
      components: ['CORE-NETWORK', 'WIRELESS-INFRASTRUCTURE', 'CCTV-SYSTEM', 'PA-SYSTEM'],
      quarterlyTasks: [
        'Network topology review and optimization',
        'Wireless coverage analysis and improvement',
        'CCTV system maintenance and upgrade',
        'Public address system testing',
        'Cybersecurity assessment and hardening',
        'Disaster recovery communication testing'
      ]
    }
  ];

  function getCurrentQuarter() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const quarter = Math.floor(month / 3) + 1;
    return `${year}-Q${quarter}`;
  }

  const validationSchema = Yup.object({
    quarterPeriod: Yup.string().required('Quarter period is required'),
    category: Yup.string().required('Quarterly maintenance category is required'),
    majorSystem: Yup.string().required('Major system is required'),
    projectManager: Yup.string().required('Project manager is required'),
    teamLead: Yup.string().required('Team lead is required'),
    plannedStartDate: Yup.date().required('Planned start date is required'),
    plannedEndDate: Yup.date().required('Planned end date is required').min(
      Yup.ref('plannedStartDate'), 'End date must be after start date'
    ),
    budget: Yup.number().min(0, 'Budget must be non-negative').required('Budget is required'),
    quarterlyMilestones: Yup.array().min(1, 'At least one milestone must be defined'),
    riskAssessment: Yup.array().min(1, 'Risk assessment is required'),
    actualStartDate: Yup.date().when('status', {
      is: (val) => val && ['IN_PROGRESS', 'COMPLETED'].includes(val),
      then: (schema) => schema.required('Actual start date is required'),
      otherwise: (schema) => schema
    }),
    actualEndDate: Yup.date().when('status', {
      is: 'COMPLETED',
      then: (schema) => schema.required('Actual end date is required'),
      otherwise: (schema) => schema
    })
  });

  const initialValues = {
    quarterPeriod: selectedQuarter,
    category: '',
    majorSystem: '',
    projectManager: '',
    teamLead: '',
    assignedTeam: [],
    plannedStartDate: '',
    plannedEndDate: '',
    actualStartDate: '',
    actualEndDate: '',
    budget: '',
    actualCost: '',
    status: 'PLANNING',
    currentPhase: 'PLANNING',
    quarterlyMilestones: [],
    riskAssessment: [],
    complianceChecklist: [],
    performanceMetrics: [],
    lessonsLearned: [],
    nextQuarterRecommendations: [],
    executiveSummary: '',
    detailedReport: '',
    approvedBy: ''
  };

  const handleSubmit = useCallback((values, { resetForm }) => {
    const newLog = {
      id: Date.now(),
      ...values,
      createdDate: new Date().toISOString(),
      logNumber: `QUARTERLY-${values.quarterPeriod}-${values.category}`,
      completionRate: calculateQuarterlyCompletion(values.quarterlyMilestones),
      overallHealth: assessSystemHealth(values.performanceMetrics)
    };

    setQuarterlyLogs(prev => [...prev, newLog]);
    resetForm();
  }, []);

  const calculateQuarterlyCompletion = useCallback((milestones) => {
    if (!milestones || milestones.length === 0) return 0;
    const completedMilestones = milestones.filter(milestone => milestone.completed).length;
    return (completedMilestones / milestones.length) * 100;
  }, []);

  const assessSystemHealth = useCallback((metrics) => {
    if (!metrics || metrics.length === 0) return 'UNKNOWN';
    const avgScore = metrics.reduce((sum, metric) => sum + (metric.score || 0), 0) / metrics.length;
    if (avgScore >= 90) return 'EXCELLENT';
    if (avgScore >= 80) return 'GOOD';
    if (avgScore >= 70) return 'FAIR';
    if (avgScore >= 60) return 'POOR';
    return 'CRITICAL';
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
    setQuarterlyLogs(prev => prev.filter(log => log.id !== logId));
  }, []);

  const getStatusColor = useCallback((status) => {
    const colors = {
      PLANNING: 'info',
      IN_PROGRESS: 'warning',
      COMPLETED: 'success',
      DELAYED: 'error',
      ON_HOLD: 'secondary'
    };
    return colors[status] || 'default';
  }, []);

  const getPriorityColor = useCallback((priority) => {
    const colors = {
      CRITICAL: 'error',
      HIGH: 'warning',
      MEDIUM: 'info',
      LOW: 'success'
    };
    return colors[priority] || 'default';
  }, []);

  const getHealthColor = useCallback((health) => {
    const colors = {
      EXCELLENT: 'success',
      GOOD: 'success',
      FAIR: 'warning',
      POOR: 'error',
      CRITICAL: 'error',
      UNKNOWN: 'secondary'
    };
    return colors[health] || 'default';
  }, []);

  const quarterlyStats = useMemo(() => {
    const currentQuarterLogs = quarterlyLogs.filter(log => log.quarterPeriod === selectedQuarter);
    
    const stats = {
      totalProjects: currentQuarterLogs.length,
      completedProjects: currentQuarterLogs.filter(log => log.status === 'COMPLETED').length,
      inProgressProjects: currentQuarterLogs.filter(log => log.status === 'IN_PROGRESS').length,
      delayedProjects: currentQuarterLogs.filter(log => log.status === 'DELAYED').length,
      totalBudget: currentQuarterLogs.reduce((sum, log) => sum + (log.budget || 0), 0),
      totalSpent: currentQuarterLogs.reduce((sum, log) => sum + (log.actualCost || 0), 0),
      avgCompletionRate: currentQuarterLogs.length > 0 ? 
        currentQuarterLogs.reduce((sum, log) => sum + log.completionRate, 0) / currentQuarterLogs.length : 0,
      systemsAssessed: new Set(currentQuarterLogs.map(log => log.majorSystem)).size
    };
    
    stats.budgetUtilization = stats.totalBudget > 0 ? (stats.totalSpent / stats.totalBudget) * 100 : 0;
    
    return stats;
  }, [quarterlyLogs, selectedQuarter]);

  const renderLogCard = useCallback((log) => (
    <Card key={log.id} sx={{ mb: 3, border: '2px solid #e0e0e0', borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h5" component="div" gutterBottom>
              {log.quarterPeriod} - {log.logNumber}
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <Chip 
                label={log.status.replace('_', ' ')} 
                color={getStatusColor(log.status)} 
                size="medium" 
              />
              <Chip 
                label={quarterlyCategories.find(c => c.value === log.category)?.priority || 'MEDIUM'} 
                color={getPriorityColor(quarterlyCategories.find(c => c.value === log.category)?.priority)} 
                size="medium"
              />
              <Chip 
                label={`Health: ${log.overallHealth}`} 
                color={getHealthColor(log.overallHealth)} 
                size="medium"
                icon={<AnalyticsIcon />}
              />
            </Box>
          </Box>
          <Box display="flex" gap={1}>
            <Button size="large" onClick={() => handleView(log)} startIcon={<ViewIcon />}>
              View Details
            </Button>
            <Button size="large" onClick={() => handleEdit(log)} startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button 
              size="large" 
              color="error" 
              onClick={() => handleDelete(log.id)} 
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary" gutterBottom>Project Category</Typography>
            <Typography variant="h6" gutterBottom>
              {quarterlyCategories.find(c => c.value === log.category)?.label}
            </Typography>
            
            <Typography variant="body2" color="textSecondary" gutterBottom>Major System</Typography>
            <Typography variant="body1">{log.majorSystem}</Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary" gutterBottom>Project Timeline</Typography>
            <Typography variant="body1">
              {log.plannedStartDate ? new Date(log.plannedStartDate).toLocaleDateString() : 'Not set'} - 
              {log.plannedEndDate ? new Date(log.plannedEndDate).toLocaleDateString() : 'Not set'}
            </Typography>
            
            <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mt: 1 }}>Project Team</Typography>
            <Typography variant="body1">
              PM: {log.projectManager} | Lead: {log.teamLead} | Team: {log.assignedTeam?.length || 0} members
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary" gutterBottom>Budget Status</Typography>
            <Typography variant="h6" color="primary">₹{log.budget?.toLocaleString()}</Typography>
            {log.actualCost && (
              <Typography variant="body2" color={log.actualCost > log.budget ? 'error' : 'success'}>
                Spent: ₹{log.actualCost.toLocaleString()} 
                ({log.budget > 0 ? Math.round((log.actualCost / log.budget) * 100) : 0}%)
              </Typography>
            )}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary" gutterBottom>Current Phase</Typography>
            <Chip 
              label={quarterPhases.find(p => p.value === log.currentPhase)?.label || log.currentPhase} 
              color="info" 
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary" gutterBottom>Milestones</Typography>
            <Typography variant="body1">
              {log.quarterlyMilestones?.filter(m => m.completed).length || 0} / {log.quarterlyMilestones?.length || 0} completed
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>Project Progress</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <LinearProgress 
                variant="determinate" 
                value={log.completionRate}
                sx={{ flexGrow: 1, height: 12, borderRadius: 6 }}
              />
              <Typography variant="h6" color="primary">{Math.round(log.completionRate)}%</Typography>
            </Box>
          </Grid>
          
          {log.riskAssessment && log.riskAssessment.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" gutterBottom>Risk Status</Typography>
              <Box display="flex" gap={1}>
                <Badge badgeContent={log.riskAssessment.filter(r => r.level === 'HIGH').length} color="error">
                  <WarningIcon color="error" />
                </Badge>
                <Badge badgeContent={log.riskAssessment.filter(r => r.level === 'MEDIUM').length} color="warning">
                  <WarningIcon color="warning" />
                </Badge>
                <Badge badgeContent={log.riskAssessment.filter(r => r.level === 'LOW').length} color="info">
                  <WarningIcon color="info" />
                </Badge>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {log.riskAssessment.length} risk(s) identified
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  ), [quarterlyCategories, quarterPhases, getStatusColor, getPriorityColor, getHealthColor, handleView, handleEdit, handleDelete]);

  const renderDetailModal = () => (
    <Dialog 
      open={viewModalOpen} 
      onClose={() => setViewModalOpen(false)}
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h5">Quarterly Project Details: {selectedLog?.logNumber}</Typography>
      </DialogTitle>
      <DialogContent>
        {selectedLog && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>Project Overview</Typography>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <List dense>
                          <ListItem>
                            <ListItemIcon><DateRangeIcon /></ListItemIcon>
                            <ListItemText 
                              primary="Quarter Period" 
                              secondary={selectedLog.quarterPeriod} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><AssessmentIcon /></ListItemIcon>
                            <ListItemText 
                              primary="Category" 
                              secondary={quarterlyCategories.find(c => c.value === selectedLog.category)?.label} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><ComputerIcon /></ListItemIcon>
                            <ListItemText 
                              primary="Major System" 
                              secondary={selectedLog.majorSystem} 
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <List dense>
                          <ListItem>
                            <ListItemIcon><Person /></ListItemIcon>
                            <ListItemText 
                              primary="Project Manager" 
                              secondary={selectedLog.projectManager} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><Person /></ListItemIcon>
                            <ListItemText 
                              primary="Team Lead" 
                              secondary={selectedLog.teamLead} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><Person /></ListItemIcon>
                            <ListItemText 
                              primary="Team Size" 
                              secondary={`${selectedLog.assignedTeam?.length || 0} members`} 
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                
                {/* Project Phases Stepper */}
                <Typography variant="h6" gutterBottom>Project Phases</Typography>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Stepper orientation="horizontal" activeStep={quarterPhases.findIndex(p => p.value === selectedLog.currentPhase)}>
                      {quarterPhases.map((phase, index) => (
                        <Step key={phase.value}>
                          <StepLabel>
                            <Typography variant="subtitle2">{phase.label}</Typography>
                            <Typography variant="caption" color="textSecondary">{phase.duration}</Typography>
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </CardContent>
                </Card>
                
                {/* Milestones */}
                {selectedLog.quarterlyMilestones && selectedLog.quarterlyMilestones.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom>Project Milestones</Typography>
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Milestone</TableCell>
                                <TableCell>Target Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Completion %</TableCell>
                                <TableCell>Owner</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedLog.quarterlyMilestones.map((milestone, index) => (
                                <TableRow key={index}>
                                  <TableCell>{milestone.title}</TableCell>
                                  <TableCell>{milestone.targetDate ? new Date(milestone.targetDate).toLocaleDateString() : 'N/A'}</TableCell>
                                  <TableCell>
                                    <Chip 
                                      label={milestone.completed ? 'Completed' : 'In Progress'} 
                                      color={milestone.completed ? 'success' : 'warning'} 
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={milestone.completion || 0}
                                      sx={{ width: 100 }}
                                    />
                                  </TableCell>
                                  <TableCell>{milestone.owner || 'N/A'}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </>
                )}
                
                {/* Risk Assessment */}
                {selectedLog.riskAssessment && selectedLog.riskAssessment.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom>Risk Assessment</Typography>
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <List dense>
                          {selectedLog.riskAssessment.map((risk, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <WarningIcon color={
                                  risk.level === 'HIGH' ? 'error' : 
                                  risk.level === 'MEDIUM' ? 'warning' : 'info'
                                } />
                              </ListItemIcon>
                              <ListItemText 
                                primary={risk.description} 
                                secondary={
                                  <Box>
                                    <Typography variant="body2">
                                      Level: <Chip label={risk.level} size="small" color={
                                        risk.level === 'HIGH' ? 'error' : 
                                        risk.level === 'MEDIUM' ? 'warning' : 'info'
                                      } />
                                    </Typography>
                                    <Typography variant="body2">Mitigation: {risk.mitigation}</Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </>
                )}
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>Project Status</Typography>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Box textAlign="center" mb={2}>
                      <Chip 
                        label={selectedLog.status.replace('_', ' ')} 
                        color={getStatusColor(selectedLog.status)} 
                        size="large"
                      />
                    </Box>
                    <Box textAlign="center" mb={2}>
                      <Typography variant="h4" color="primary">
                        {Math.round(selectedLog.completionRate)}%
                      </Typography>
                      <Typography variant="body2">Overall Progress</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={selectedLog.completionRate}
                        sx={{ mt: 1, height: 10, borderRadius: 5 }}
                      />
                    </Box>
                    <Box textAlign="center">
                      <Chip 
                        label={`System Health: ${selectedLog.overallHealth}`} 
                        color={getHealthColor(selectedLog.overallHealth)} 
                        icon={<AnalyticsIcon />}
                      />
                    </Box>
                  </CardContent>
                </Card>
                
                <Typography variant="h6" gutterBottom>Budget Analysis</Typography>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Planned Budget" 
                          secondary={`₹${selectedLog.budget?.toLocaleString()}`} 
                        />
                      </ListItem>
                      {selectedLog.actualCost && (
                        <ListItem>
                          <ListItemText 
                            primary="Actual Cost" 
                            secondary={`₹${selectedLog.actualCost.toLocaleString()}`} 
                          />
                        </ListItem>
                      )}
                      {selectedLog.budget && selectedLog.actualCost && (
                        <ListItem>
                          <ListItemText 
                            primary="Budget Utilization" 
                            secondary={
                              <Box>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={Math.min((selectedLog.actualCost / selectedLog.budget) * 100, 100)}
                                  color={selectedLog.actualCost > selectedLog.budget ? 'error' : 'primary'}
                                  sx={{ mb: 1 }}
                                />
                                <Typography variant="body2">
                                  {Math.round((selectedLog.actualCost / selectedLog.budget) * 100)}%
                                  {selectedLog.actualCost > selectedLog.budget && ' (Over Budget)'}
                                </Typography>
                              </Box>
                            } 
                          />
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>
                
                {selectedLog.performanceMetrics && selectedLog.performanceMetrics.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
                    <Card>
                      <CardContent>
                        <List dense>
                          {selectedLog.performanceMetrics.map((metric, index) => (
                            <ListItem key={index}>
                              <ListItemText 
                                primary={metric.name} 
                                secondary={
                                  <Box>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={metric.score || 0}
                                      color={
                                        (metric.score || 0) >= 80 ? 'success' :
                                        (metric.score || 0) >= 60 ? 'warning' : 'error'
                                      }
                                      sx={{ mb: 0.5 }}
                                    />
                                    <Typography variant="body2">{metric.score || 0}% - {metric.notes}</Typography>
                                  </Box>
                                } 
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </>
                )}
              </Grid>
              
              {selectedLog.executiveSummary && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Executive Summary</Typography>
                  <Paper sx={{ p: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                    <Typography variant="body1">{selectedLog.executiveSummary}</Typography>
                  </Paper>
                </Grid>
              )}
              
              {selectedLog.lessonsLearned && selectedLog.lessonsLearned.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Lessons Learned</Typography>
                  <Card>
                    <CardContent>
                      <List>
                        {selectedLog.lessonsLearned.map((lesson, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <TrendingUpIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={lesson.lesson} 
                              secondary={`Impact: ${lesson.impact} | Recommendation: ${lesson.recommendation}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
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
    <AFCSDCFormLayout title="PM Log Book - Quarterly">
      <Container maxWidth="xl">
        {/* Quarterly Statistics Dashboard */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Quarterly PM Dashboard</Typography>
            <UniversalAFCSDCFormField
              type="select"
              name="selectedQuarter"
              label="Select Quarter"
              value={selectedQuarter}
              options={[
                { value: '2024-Q1', label: '2024 Q1' },
                { value: '2024-Q2', label: '2024 Q2' },
                { value: '2024-Q3', label: '2024 Q3' },
                { value: '2024-Q4', label: '2024 Q4' },
                { value: '2025-Q1', label: '2025 Q1' }
              ]}
              onChange={(e) => setSelectedQuarter(e.target.value)}
            />
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={6} md={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary">{quarterlyStats.totalProjects}</Typography>
                  <Typography variant="body2">Total Projects</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="success.main">{quarterlyStats.completedProjects}</Typography>
                  <Typography variant="body2">Completed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="warning.main">{quarterlyStats.inProgressProjects}</Typography>
                  <Typography variant="body2">In Progress</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="error.main">{quarterlyStats.delayedProjects}</Typography>
                  <Typography variant="body2">Delayed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="info.main">₹{(quarterlyStats.totalBudget / 1000000).toFixed(1)}M</Typography>
                  <Typography variant="body2">Total Budget</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="secondary.main">
                    {Math.round(quarterlyStats.avgCompletionRate)}%
                  </Typography>
                  <Typography variant="body2">Avg Progress</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" gutterBottom>Overall Quarterly Progress</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={quarterlyStats.avgCompletionRate} 
                  sx={{ height: 15, borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" gutterBottom>Budget Utilization</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={quarterlyStats.budgetUtilization} 
                  sx={{ height: 15, borderRadius: 8 }}
                  color={quarterlyStats.budgetUtilization > 100 ? 'error' : 'primary'}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Quarterly Project Form */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>Create Quarterly PM Project</Typography>
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
                      type="text"
                      name="quarterPeriod"
                      label="Quarter Period (e.g., 2024-Q1)"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="category"
                      label="Project Category"
                      options={quarterlyCategories}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="majorSystem"
                      label="Major System"
                      options={majorSystems.map(system => ({ value: system.name, label: system.name }))}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="projectManager"
                      label="Project Manager"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="teamLead"
                      label="Team Lead"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name="plannedStartDate"
                      label="Planned Start Date"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name="plannedEndDate"
                      label="Planned End Date"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="number"
                      name="budget"
                      label="Budget (₹)"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="status"
                      label="Project Status"
                      options={[
                        { value: 'PLANNING', label: 'Planning' },
                        { value: 'IN_PROGRESS', label: 'In Progress' },
                        { value: 'COMPLETED', label: 'Completed' },
                        { value: 'DELAYED', label: 'Delayed' },
                        { value: 'ON_HOLD', label: 'On Hold' }
                      ]}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="currentPhase"
                      label="Current Phase"
                      options={quarterPhases}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name="executiveSummary"
                      label="Executive Summary"
                      rows={4}
                      placeholder="Brief overview of the quarterly project objectives, scope, and expected outcomes..."
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    size="large"
                    startIcon={<AddIcon />}
                  >
                    Create Quarterly Project
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>

        {/* Quarterly Projects List */}
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Quarterly PM Projects for {selectedQuarter} ({quarterlyLogs.filter(log => log.quarterPeriod === selectedQuarter).length})
          </Typography>
          
          {quarterlyLogs.filter(log => log.quarterPeriod === selectedQuarter).length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              No quarterly projects initiated for this quarter. Create your first quarterly project above.
            </Alert>
          ) : (
            <Box sx={{ mt: 3 }}>
              {quarterlyLogs.filter(log => log.quarterPeriod === selectedQuarter).map(renderLogCard)}
            </Box>
          )}
        </Paper>

        {renderDetailModal()}
      </Container>
    </AFCSDCFormLayout>
  );
};

export default PmLogBookQuarterlySDCForm;