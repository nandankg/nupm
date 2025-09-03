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
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Computer as ComputerIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  AccountTree as SystemIcon
} from '@mui/icons-material';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

const UrcOsEntryRegisterSDCForm = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const entryTypes = [
    { value: 'URC_UPDATE', label: 'URC Parameter Update', icon: <ComputerIcon /> },
    { value: 'OS_UPDATE', label: 'OS Configuration Update', icon: <StorageIcon /> },
    { value: 'SECURITY_PATCH', label: 'Security Patch Installation', icon: <SecurityIcon /> },
    { value: 'PERFORMANCE_TUNING', label: 'Performance Optimization', icon: <SpeedIcon /> },
    { value: 'MEMORY_CONFIGURATION', label: 'Memory Configuration', icon: <MemoryIcon /> },
    { value: 'SYSTEM_MAINTENANCE', label: 'System Maintenance', icon: <SystemIcon /> }
  ];

  const impactLevels = [
    { value: 'LOW', label: 'Low Impact', color: 'success' },
    { value: 'MEDIUM', label: 'Medium Impact', color: 'warning' },
    { value: 'HIGH', label: 'High Impact', color: 'error' },
    { value: 'CRITICAL', label: 'Critical Impact', color: 'error' }
  ];

  const systemComponents = [
    'Ticket Vending Machine (TVM)',
    'Ticket Office Machine (TOM)', 
    'Automatic Gate Controller (AGC)',
    'Central Computer System (CCS)',
    'Station Controller (SC)',
    'Portable Validator Machine (PVM)',
    'Card Security Module (CSM)',
    'Network Infrastructure',
    'Database Server',
    'Backup Systems'
  ];

  const validationSchema = Yup.object({
    entryType: Yup.string().required('Entry type is required'),
    systemComponent: Yup.string().required('System component is required'),
    changeDescription: Yup.string().min(10, 'Description must be at least 10 characters').required('Change description is required'),
    impactLevel: Yup.string().required('Impact level is required'),
    plannedDate: Yup.date().required('Planned date is required'),
    implementedDate: Yup.date().when('status', {
      is: (val) => val && val !== 'PLANNED',
      then: (schema) => schema.required('Implementation date is required when status is not planned'),
      otherwise: (schema) => schema
    }),
    implementedBy: Yup.string().when('status', {
      is: (val) => val && val !== 'PLANNED', 
      then: (schema) => schema.required('Implementer name is required'),
      otherwise: (schema) => schema
    }),
    verifiedBy: Yup.string().when('status', {
      is: 'COMPLETED',
      then: (schema) => schema.required('Verifier name is required for completed entries'),
      otherwise: (schema) => schema
    }),
    rollbackPlan: Yup.string().when('impactLevel', {
      is: (val) => val && ['HIGH', 'CRITICAL'].includes(val),
      then: (schema) => schema.min(20, 'Rollback plan must be detailed for high/critical impact changes').required('Rollback plan is required for high/critical impact changes'),
      otherwise: (schema) => schema
    }),
    testResults: Yup.array().when('status', {
      is: 'COMPLETED',
      then: (schema) => schema.min(1, 'At least one test result is required for completed entries'),
      otherwise: (schema) => schema
    }),
    affectedSystems: Yup.array().min(1, 'At least one affected system must be specified')
  });

  const initialValues = {
    entryType: '',
    systemComponent: '',
    changeDescription: '',
    impactLevel: '',
    plannedDate: '',
    implementedDate: '',
    implementedBy: '',
    verifiedBy: '',
    approvedBy: '',
    rollbackPlan: '',
    preChangeChecklist: [],
    postChangeChecklist: [],
    testResults: [],
    affectedSystems: [],
    downtime: '',
    backupTaken: false,
    communicationSent: false,
    status: 'PLANNED',
    remarks: ''
  };

  const handleSubmit = useCallback((values, { resetForm }) => {
    const newEntry = {
      id: Date.now(),
      ...values,
      createdDate: new Date().toISOString(),
      entryNumber: `URC-OS-${String(entries.length + 1).padStart(4, '0')}`
    };

    setEntries(prev => [...prev, newEntry]);
    resetForm();
  }, [entries.length]);

  const handleEdit = useCallback((entry) => {
    setSelectedEntry(entry);
    setEditMode(true);
    setViewModalOpen(true);
  }, []);

  const handleView = useCallback((entry) => {
    setSelectedEntry(entry);
    setEditMode(false);
    setViewModalOpen(true);
  }, []);

  const handleDelete = useCallback((entryId) => {
    setEntries(prev => prev.filter(entry => entry.id !== entryId));
  }, []);

  const getStatusColor = useCallback((status) => {
    const colors = {
      PLANNED: 'info',
      IN_PROGRESS: 'warning', 
      COMPLETED: 'success',
      FAILED: 'error',
      ROLLED_BACK: 'secondary'
    };
    return colors[status] || 'default';
  }, []);

  const getImpactIcon = useCallback((impact) => {
    switch (impact) {
      case 'LOW': return <InfoIcon color="success" />;
      case 'MEDIUM': return <WarningIcon color="warning" />;
      case 'HIGH': return <WarningIcon color="error" />;
      case 'CRITICAL': return <WarningIcon sx={{ color: 'red' }} />;
      default: return <InfoIcon />;
    }
  }, []);

  const entryStats = useMemo(() => {
    const stats = entries.reduce((acc, entry) => {
      acc[entry.status] = (acc[entry.status] || 0) + 1;
      acc[entry.impactLevel] = (acc[entry.impactLevel] || 0) + 1;
      return acc;
    }, {});
    return stats;
  }, [entries]);

  const renderEntryCard = useCallback((entry) => (
    <Card key={entry.id} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {entry.entryNumber}
            </Typography>
            <Box display="flex" gap={1} mb={1}>
              <Chip 
                label={entry.status.replace('_', ' ')} 
                color={getStatusColor(entry.status)} 
                size="small" 
              />
              <Chip 
                label={entry.impactLevel} 
                color={impactLevels.find(l => l.value === entry.impactLevel)?.color || 'default'} 
                size="small"
                icon={getImpactIcon(entry.impactLevel)}
              />
            </Box>
          </Box>
          <Box display="flex" gap={1}>
            <Button size="small" onClick={() => handleView(entry)} startIcon={<ViewIcon />}>
              View
            </Button>
            <Button size="small" onClick={() => handleEdit(entry)} startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button 
              size="small" 
              color="error" 
              onClick={() => handleDelete(entry.id)} 
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">Entry Type</Typography>
            <Typography variant="body1">{entryTypes.find(t => t.value === entry.entryType)?.label}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">System Component</Typography>
            <Typography variant="body1">{entry.systemComponent}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">Change Description</Typography>
            <Typography variant="body1">{entry.changeDescription}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary">Planned Date</Typography>
            <Typography variant="body1">{new Date(entry.plannedDate).toLocaleDateString()}</Typography>
          </Grid>
          {entry.implementedDate && (
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Implemented Date</Typography>
              <Typography variant="body1">{new Date(entry.implementedDate).toLocaleDateString()}</Typography>
            </Grid>
          )}
          {entry.implementedBy && (
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Implemented By</Typography>
              <Typography variant="body1">{entry.implementedBy}</Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  ), [entryTypes, impactLevels, getStatusColor, getImpactIcon, handleView, handleEdit, handleDelete]);

  const renderDetailModal = () => (
    <Dialog 
      open={viewModalOpen} 
      onClose={() => setViewModalOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Entry Details: {selectedEntry?.entryNumber}
      </DialogTitle>
      <DialogContent>
        {selectedEntry && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Entry Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Entry Type" 
                      secondary={entryTypes.find(t => t.value === selectedEntry.entryType)?.label} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="System Component" 
                      secondary={selectedEntry.systemComponent} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Impact Level" 
                      secondary={
                        <Chip 
                          label={selectedEntry.impactLevel} 
                          color={impactLevels.find(l => l.value === selectedEntry.impactLevel)?.color} 
                          size="small"
                          icon={getImpactIcon(selectedEntry.impactLevel)}
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Status" 
                      secondary={
                        <Chip 
                          label={selectedEntry.status.replace('_', ' ')} 
                          color={getStatusColor(selectedEntry.status)} 
                          size="small"
                        />
                      } 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Timeline</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Planned Date" 
                      secondary={new Date(selectedEntry.plannedDate).toLocaleDateString()} 
                    />
                  </ListItem>
                  {selectedEntry.implementedDate && (
                    <ListItem>
                      <ListItemText 
                        primary="Implemented Date" 
                        secondary={new Date(selectedEntry.implementedDate).toLocaleDateString()} 
                      />
                    </ListItem>
                  )}
                  <ListItem>
                    <ListItemText 
                      primary="Created Date" 
                      secondary={new Date(selectedEntry.createdDate).toLocaleDateString()} 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Change Description</Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="body2">{selectedEntry.changeDescription}</Typography>
                </Paper>
              </Grid>
              
              {selectedEntry.rollbackPlan && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Rollback Plan</Typography>
                  <Paper sx={{ p: 2, bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                    <Typography variant="body2">{selectedEntry.rollbackPlan}</Typography>
                  </Paper>
                </Grid>
              )}
              
              {selectedEntry.affectedSystems?.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Affected Systems</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {selectedEntry.affectedSystems.map((system, index) => (
                      <Chip key={index} label={system} variant="outlined" size="small" />
                    ))}
                  </Box>
                </Grid>
              )}
              
              {selectedEntry.testResults?.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Test Results</Typography>
                  <List dense>
                    {selectedEntry.testResults.map((result, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon color={result.passed ? 'success' : 'error'} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={result.testName} 
                          secondary={result.result} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )}
              
              {selectedEntry.remarks && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Remarks</Typography>
                  <Paper sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                    <Typography variant="body2">{selectedEntry.remarks}</Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setViewModalOpen(false)}>Close</Button>
        {editMode && (
          <Button variant="contained" onClick={() => setViewModalOpen(false)}>
            Save Changes
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  return (
    <AFCSDCFormLayout title="URC & OS Entry Register">
      <Container maxWidth="xl">
        {/* Statistics Dashboard */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Entry Statistics</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">{entries.length}</Typography>
                  <Typography variant="body2">Total Entries</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">{entryStats.IN_PROGRESS || 0}</Typography>
                  <Typography variant="body2">In Progress</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">{entryStats.COMPLETED || 0}</Typography>
                  <Typography variant="body2">Completed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{entryStats.CRITICAL || 0}</Typography>
                  <Typography variant="body2">Critical Impact</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Entry Form */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Add New Entry</Typography>
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
                      name="entryType"
                      label="Entry Type"
                      options={entryTypes}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="systemComponent"
                      label="System Component"
                      options={systemComponents.map(comp => ({ value: comp, label: comp }))}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name="changeDescription"
                      label="Change Description"
                      rows={4}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="impactLevel"
                      label="Impact Level"
                      options={impactLevels}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name="plannedDate"
                      label="Planned Date"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="status"
                      label="Status"
                      options={[
                        { value: 'PLANNED', label: 'Planned' },
                        { value: 'IN_PROGRESS', label: 'In Progress' },
                        { value: 'COMPLETED', label: 'Completed' },
                        { value: 'FAILED', label: 'Failed' },
                        { value: 'ROLLED_BACK', label: 'Rolled Back' }
                      ]}
                    />
                  </Grid>
                  
                  {values.status !== 'PLANNED' && (
                    <>
                      <Grid item xs={12} md={6}>
                        <UniversalAFCSDCFormField
                          type="date"
                          name="implementedDate"
                          label="Implementation Date"
                          required
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <UniversalAFCSDCFormField
                          type="text"
                          name="implementedBy"
                          label="Implemented By"
                          required
                        />
                      </Grid>
                    </>
                  )}
                  
                  {values.status === 'COMPLETED' && (
                    <Grid item xs={12} md={6}>
                      <UniversalAFCSDCFormField
                        type="text"
                        name="verifiedBy"
                        label="Verified By"
                        required
                      />
                    </Grid>
                  )}
                  
                  {['HIGH', 'CRITICAL'].includes(values.impactLevel) && (
                    <Grid item xs={12}>
                      <UniversalAFCSDCFormField
                        type="textarea"
                        name="rollbackPlan"
                        label="Rollback Plan"
                        rows={3}
                        required
                      />
                    </Grid>
                  )}
                  
                  <Grid item xs={12}>
                    <FieldArray name="affectedSystems">
                      {({ push, remove }) => (
                        <Box>
                          <Typography variant="subtitle1" gutterBottom>
                            Affected Systems
                          </Typography>
                          {values.affectedSystems?.map((system, index) => (
                            <Box key={index} display="flex" gap={1} mb={1}>
                              <UniversalAFCSDCFormField
                                type="select"
                                name={`affectedSystems.${index}`}
                                label={`System ${index + 1}`}
                                options={systemComponents.map(comp => ({ value: comp, label: comp }))}
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
                            Add System
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name="remarks"
                      label="Additional Remarks"
                      rows={2}
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
                    Add Entry
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>

        {/* Entries List */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Entry Records ({entries.length})
          </Typography>
          
          {entries.length === 0 ? (
            <Alert severity="info">
              No entries recorded yet. Add your first URC/OS entry above.
            </Alert>
          ) : (
            <Box>
              {entries.map(renderEntryCard)}
            </Box>
          )}
        </Paper>

        {renderDetailModal()}
      </Container>
    </AFCSDCFormLayout>
  );
};

export default UrcOsEntryRegisterSDCForm;