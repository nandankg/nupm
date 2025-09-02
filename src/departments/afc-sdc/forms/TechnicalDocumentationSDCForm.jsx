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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Tab,
  Tabs,
  TabPanel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  Today as TodayIcon,
  Person as PersonIcon,
  Computer as ComputerIcon,
  ExpandMore as ExpandMoreIcon,
  CloudUpload as UploadIcon,
  GetApp as DownloadIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  VideoFile as VideoIcon
} from '@mui/icons-material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { AFCSDCFormLayout, UniversalAFCSDCFormField } from '../components';

const TechnicalDocumentationSDCForm = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const documentCategories = [
    { 
      value: 'TECHNICAL_MANUAL', 
      label: 'Technical Manuals',
      description: 'Equipment operation and maintenance manuals',
      icon: <DescriptionIcon />
    },
    { 
      value: 'PROCEDURE_DOCUMENT', 
      label: 'Procedure Documents',
      description: 'Standard operating procedures and workflows',
      icon: <AssignmentIcon />
    },
    { 
      value: 'SYSTEM_DIAGRAM', 
      label: 'System Diagrams',
      description: 'Network diagrams, schematics, and architectural drawings',
      icon: <ComputerIcon />
    },
    { 
      value: 'TROUBLESHOOTING_GUIDE', 
      label: 'Troubleshooting Guides',
      description: 'Problem resolution and diagnostic procedures',
      icon: <AssignmentIcon />
    },
    { 
      value: 'TRAINING_MATERIAL', 
      label: 'Training Materials',
      description: 'Educational content and certification materials',
      icon: <DescriptionIcon />
    },
    { 
      value: 'COMPLIANCE_DOCUMENT', 
      label: 'Compliance Documents',
      description: 'Regulatory requirements and compliance records',
      icon: <AssignmentIcon />
    },
    { 
      value: 'CHANGE_LOG', 
      label: 'Change Logs',
      description: 'System modifications and update records',
      icon: <DescriptionIcon />
    },
    { 
      value: 'EMERGENCY_PROCEDURE', 
      label: 'Emergency Procedures',
      description: 'Crisis response and emergency protocols',
      icon: <AssignmentIcon />
    }
  ];

  const documentTypes = [
    { value: 'PDF', label: 'PDF Document', icon: <PdfIcon /> },
    { value: 'DOC', label: 'Word Document', icon: <FileIcon /> },
    { value: 'XLS', label: 'Excel Spreadsheet', icon: <FileIcon /> },
    { value: 'PPT', label: 'PowerPoint Presentation', icon: <FileIcon /> },
    { value: 'IMG', label: 'Image File', icon: <ImageIcon /> },
    { value: 'VIDEO', label: 'Video File', icon: <VideoIcon /> },
    { value: 'ZIP', label: 'Archive File', icon: <FolderIcon /> }
  ];

  const accessLevels = [
    { value: 'PUBLIC', label: 'Public Access', color: 'success' },
    { value: 'INTERNAL', label: 'Internal Access', color: 'info' },
    { value: 'RESTRICTED', label: 'Restricted Access', color: 'warning' },
    { value: 'CONFIDENTIAL', label: 'Confidential', color: 'error' }
  ];

  const documentStatus = [
    { value: 'DRAFT', label: 'Draft', color: 'warning' },
    { value: 'UNDER_REVIEW', label: 'Under Review', color: 'info' },
    { value: 'APPROVED', label: 'Approved', color: 'success' },
    { value: 'ARCHIVED', label: 'Archived', color: 'secondary' },
    { value: 'OBSOLETE', label: 'Obsolete', color: 'error' }
  ];

  const validationSchema = Yup.object({
    title: Yup.string().min(5, 'Title must be at least 5 characters').required('Document title is required'),
    category: Yup.string().required('Document category is required'),
    documentType: Yup.string().required('Document type is required'),
    version: Yup.string().required('Version is required'),
    author: Yup.string().required('Author is required'),
    description: Yup.string().min(10, 'Description must be at least 10 characters').required('Description is required'),
    accessLevel: Yup.string().required('Access level is required'),
    relatedSystems: Yup.array().min(1, 'At least one related system must be specified'),
    tags: Yup.array().min(1, 'At least one tag is required'),
    reviewDate: Yup.date().min(new Date(), 'Review date must be in the future').required('Review date is required'),
    approvedBy: Yup.string().when('status', {
      is: 'APPROVED',
      then: (schema) => schema.required('Approver is required for approved documents'),
      otherwise: (schema) => schema
    })
  });

  const initialValues = {
    title: '',
    category: '',
    documentType: '',
    version: '1.0',
    author: '',
    description: '',
    accessLevel: 'INTERNAL',
    status: 'DRAFT',
    relatedSystems: [],
    tags: [],
    keywords: '',
    reviewDate: '',
    approvedBy: '',
    approvalDate: '',
    changeHistory: [],
    attachments: [],
    relatedDocuments: [],
    comments: [],
    downloadCount: 0,
    lastAccessed: '',
    location: '',
    fileSize: '',
    checksum: ''
  };

  const handleSubmit = useCallback((values, { resetForm }) => {
    const newDocument = {
      id: Date.now(),
      ...values,
      createdDate: new Date().toISOString(),
      documentNumber: `DOC-${values.category}-${String(documents.length + 1).padStart(4, '0')}`,
      lastModified: new Date().toISOString(),
      createdBy: values.author,
      downloadCount: 0,
      viewCount: 0,
      isLatestVersion: true
    };

    setDocuments(prev => [...prev, newDocument]);
    resetForm();
  }, [documents.length]);

  const handleEdit = useCallback((document) => {
    setSelectedDocument(document);
    setViewModalOpen(true);
  }, []);

  const handleView = useCallback((document) => {
    setSelectedDocument(document);
    setViewModalOpen(true);
    
    // Increment view count
    setDocuments(prev => prev.map(doc => 
      doc.id === document.id ? { ...doc, viewCount: (doc.viewCount || 0) + 1 } : doc
    ));
  }, []);

  const handleDelete = useCallback((documentId) => {
    setDocuments(prev => prev.filter(document => document.id !== documentId));
  }, []);

  const handleDownload = useCallback((document) => {
    // Simulate download
    setDocuments(prev => prev.map(doc => 
      doc.id === document.id ? { ...doc, downloadCount: (doc.downloadCount || 0) + 1 } : doc
    ));
  }, []);

  const getStatusColor = useCallback((status) => {
    const statusObj = documentStatus.find(s => s.value === status);
    return statusObj?.color || 'default';
  }, []);

  const getAccessLevelColor = useCallback((level) => {
    const levelObj = accessLevels.find(l => l.value === level);
    return levelObj?.color || 'default';
  }, []);

  const documentStats = useMemo(() => {
    const stats = {
      totalDocuments: documents.length,
      draftDocuments: documents.filter(d => d.status === 'DRAFT').length,
      approvedDocuments: documents.filter(d => d.status === 'APPROVED').length,
      underReview: documents.filter(d => d.status === 'UNDER_REVIEW').length,
      needsReview: documents.filter(d => {
        const reviewDate = new Date(d.reviewDate);
        const today = new Date();
        return reviewDate <= today && d.status === 'APPROVED';
      }).length,
      totalDownloads: documents.reduce((sum, d) => sum + (d.downloadCount || 0), 0),
      totalViews: documents.reduce((sum, d) => sum + (d.viewCount || 0), 0),
      categoriesCount: new Set(documents.map(d => d.category)).size
    };
    
    return stats;
  }, [documents]);

  const renderDocumentCard = useCallback((document) => {
    const needsReview = new Date(document.reviewDate) <= new Date() && document.status === 'APPROVED';
    
    return (
      <Card key={document.id} sx={{ 
        mb: 2, 
        border: needsReview ? '2px solid #ff9800' : '1px solid #e0e0e0',
        borderRadius: 2
      }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                {documentCategories.find(c => c.value === document.category)?.icon}
                <Typography variant="h6" component="div">
                  {document.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {document.documentNumber} | v{document.version}
              </Typography>
              <Box display="flex" gap={1} mb={2}>
                <Chip 
                  label={document.status.replace('_', ' ')} 
                  color={getStatusColor(document.status)} 
                  size="small" 
                />
                <Chip 
                  label={document.accessLevel} 
                  color={getAccessLevelColor(document.accessLevel)} 
                  size="small"
                />
                <Chip 
                  label={documentTypes.find(t => t.value === document.documentType)?.label} 
                  variant="outlined"
                  size="small"
                />
                {needsReview && (
                  <Chip 
                    label="NEEDS REVIEW" 
                    color="warning" 
                    size="small"
                  />
                )}
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <Button size="small" onClick={() => handleDownload(document)} startIcon={<DownloadIcon />}>
                Download
              </Button>
              <Button size="small" onClick={() => handleView(document)} startIcon={<ViewIcon />}>
                View
              </Button>
              <Button size="small" onClick={() => handleEdit(document)} startIcon={<EditIcon />}>
                Edit
              </Button>
              <Button 
                size="small" 
                color="error" 
                onClick={() => handleDelete(document.id)} 
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="body2" color="textSecondary">Description</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>{document.description}</Typography>
              
              {document.tags && document.tags.length > 0 && (
                <Box>
                  <Typography variant="body2" color="textSecondary" gutterBottom>Tags</Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.5}>
                    {document.tags.map((tag, index) => (
                      <Chip key={index} label={tag} variant="outlined" size="small" />
                    ))}
                  </Box>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="textSecondary">Author</Typography>
              <Typography variant="body1">{document.author}</Typography>
              
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Created</Typography>
              <Typography variant="body1">{new Date(document.createdDate).toLocaleDateString()}</Typography>
              
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Review Due</Typography>
              <Typography variant="body1" color={needsReview ? 'warning.main' : 'text.primary'}>
                {new Date(document.reviewDate).toLocaleDateString()}
              </Typography>
              
              <Box display="flex" gap={2} mt={1}>
                <Typography variant="body2" color="textSecondary">
                  Views: {document.viewCount || 0}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Downloads: {document.downloadCount || 0}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }, [documentCategories, documentTypes, getStatusColor, getAccessLevelColor, handleDownload, handleView, handleEdit, handleDelete]);

  const renderDetailModal = () => (
    <Dialog 
      open={viewModalOpen} 
      onClose={() => setViewModalOpen(false)}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        Document Details: {selectedDocument?.title}
      </DialogTitle>
      <DialogContent>
        {selectedDocument && (
          <Box sx={{ mt: 2 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Overview" />
              <Tab label="Content" />
              <Tab label="History" />
              <Tab label="Access" />
            </Tabs>
            
            {activeTab === 0 && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>Document Information</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><DescriptionIcon /></ListItemIcon>
                        <ListItemText 
                          primary="Document Number" 
                          secondary={selectedDocument.documentNumber} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText 
                          primary="Category" 
                          secondary={documentCategories.find(c => c.value === selectedDocument.category)?.label} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><FileIcon /></ListItemIcon>
                        <ListItemText 
                          primary="Type" 
                          secondary={documentTypes.find(t => t.value === selectedDocument.documentType)?.label} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText 
                          primary="Author" 
                          secondary={selectedDocument.author} 
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>Status & Access</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Status" 
                          secondary={
                            <Chip 
                              label={selectedDocument.status.replace('_', ' ')} 
                              color={getStatusColor(selectedDocument.status)} 
                              size="small"
                            />
                          } 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Access Level" 
                          secondary={
                            <Chip 
                              label={selectedDocument.accessLevel} 
                              color={getAccessLevelColor(selectedDocument.accessLevel)} 
                              size="small"
                            />
                          } 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Version" 
                          secondary={`v${selectedDocument.version}`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Review Due" 
                          secondary={new Date(selectedDocument.reviewDate).toLocaleDateString()} 
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>Description</Typography>
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body2">{selectedDocument.description}</Typography>
                    </Paper>
                  </Grid>
                  
                  {selectedDocument.relatedSystems && selectedDocument.relatedSystems.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Related Systems</Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {selectedDocument.relatedSystems.map((system, index) => (
                          <Chip key={index} label={system} variant="outlined" size="small" icon={<ComputerIcon />} />
                        ))}
                      </Box>
                    </Grid>
                  )}
                  
                  {selectedDocument.tags && selectedDocument.tags.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Tags</Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {selectedDocument.tags.map((tag, index) => (
                          <Chip key={index} label={tag} variant="outlined" size="small" />
                        ))}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
            
            {activeTab === 1 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>Document Content</Typography>
                <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
                  <Typography variant="body1" paragraph>
                    {selectedDocument.description}
                  </Typography>
                  
                  {selectedDocument.attachments && selectedDocument.attachments.length > 0 && (
                    <>
                      <Typography variant="subtitle2" gutterBottom>Attachments</Typography>
                      <List dense>
                        {selectedDocument.attachments.map((attachment, index) => (
                          <ListItem key={index}>
                            <ListItemIcon><FileIcon /></ListItemIcon>
                            <ListItemText 
                              primary={attachment.name} 
                              secondary={`${attachment.type} - ${attachment.size}`} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Paper>
              </Box>
            )}
            
            {activeTab === 2 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>Change History</Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Version</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Changes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{selectedDocument.version}</TableCell>
                        <TableCell>{new Date(selectedDocument.createdDate).toLocaleDateString()}</TableCell>
                        <TableCell>{selectedDocument.author}</TableCell>
                        <TableCell>Initial version</TableCell>
                      </TableRow>
                      {selectedDocument.changeHistory && selectedDocument.changeHistory.map((change, index) => (
                        <TableRow key={index}>
                          <TableCell>{change.version}</TableCell>
                          <TableCell>{new Date(change.date).toLocaleDateString()}</TableCell>
                          <TableCell>{change.author}</TableCell>
                          <TableCell>{change.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            
            {activeTab === 3 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>Access & Usage Statistics</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">{selectedDocument.viewCount || 0}</Typography>
                        <Typography variant="body2">Total Views</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="secondary">{selectedDocument.downloadCount || 0}</Typography>
                        <Typography variant="body2">Downloads</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="info.main">
                          {selectedDocument.accessLevel}
                        </Typography>
                        <Typography variant="body2">Access Level</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">
                          {selectedDocument.fileSize || 'N/A'}
                        </Typography>
                        <Typography variant="body2">File Size</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button startIcon={<DownloadIcon />} onClick={() => handleDownload(selectedDocument)}>
          Download
        </Button>
        <Button onClick={() => setViewModalOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <AFCSDCFormLayout title="Technical Documentation Management">
      <Container maxWidth="xl">
        {/* Statistics Dashboard */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Documentation Overview</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">{documentStats.totalDocuments}</Typography>
                  <Typography variant="body2">Total Documents</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">{documentStats.approvedDocuments}</Typography>
                  <Typography variant="body2">Approved</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">{documentStats.draftDocuments}</Typography>
                  <Typography variant="body2">Draft</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{documentStats.needsReview}</Typography>
                  <Typography variant="body2">Needs Review</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">{documentStats.totalViews}</Typography>
                  <Typography variant="body2">Total Views</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary.main">{documentStats.totalDownloads}</Typography>
                  <Typography variant="body2">Downloads</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Document Upload Form */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Add New Document</Typography>
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
                      name="title"
                      label="Document Title"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="version"
                      label="Version"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="category"
                      label="Category"
                      options={documentCategories}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="documentType"
                      label="Document Type"
                      options={documentTypes}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="accessLevel"
                      label="Access Level"
                      options={accessLevels}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="author"
                      label="Author"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="date"
                      name="reviewDate"
                      label="Review Date"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <UniversalAFCSDCFormField
                      type="textarea"
                      name="description"
                      label="Description"
                      rows={4}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCSDCFormField
                      type="select"
                      name="status"
                      label="Status"
                      options={documentStatus}
                    />
                  </Grid>
                  
                  {values.status === 'APPROVED' && (
                    <Grid item xs={12} md={6}>
                      <UniversalAFCSDCFormField
                        type="text"
                        name="approvedBy"
                        label="Approved By"
                        required
                      />
                    </Grid>
                  )}
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Related Systems</Typography>
                    <FieldArray name="relatedSystems">
                      {({ push, remove }) => (
                        <Box>
                          {values.relatedSystems?.map((system, index) => (
                            <Box key={index} display="flex" gap={1} mb={1} alignItems="center">
                              <UniversalAFCSDCFormField
                                type="text"
                                name={`relatedSystems.${index}`}
                                label={`System ${index + 1}`}
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
                            Add Related System
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Tags</Typography>
                    <FieldArray name="tags">
                      {({ push, remove }) => (
                        <Box>
                          {values.tags?.map((tag, index) => (
                            <Box key={index} display="flex" gap={1} mb={1} alignItems="center">
                              <UniversalAFCSDCFormField
                                type="text"
                                name={`tags.${index}`}
                                label={`Tag ${index + 1}`}
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
                            Add Tag
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <UniversalAFCSDCFormField
                      type="text"
                      name="keywords"
                      label="Keywords (comma-separated)"
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
                    Add Document
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<UploadIcon />}
                  >
                    Upload File
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>

        {/* Documents List */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Document Library ({documents.length})
          </Typography>
          
          {documents.length === 0 ? (
            <Alert severity="info">
              No documents uploaded yet. Add your first document above.
            </Alert>
          ) : (
            <Box>
              {documents.map(renderDocumentCard)}
            </Box>
          )}
        </Paper>

        {renderDetailModal()}
      </Container>
    </AFCSDCFormLayout>
  );
};

export default TechnicalDocumentationSDCForm;