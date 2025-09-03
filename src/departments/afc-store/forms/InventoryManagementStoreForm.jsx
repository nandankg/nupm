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
  Tab,
  Tabs,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Store as StoreIcon,
  Category as CategoryIcon,
  LocalShipping as ShippingIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  GetApp as ExportIcon
} from '@mui/icons-material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { AFCStoreFormLayout, UniversalAFCStoreFormField } from '../components';

const InventoryManagementStoreForm = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const itemCategories = [
    { value: 'TICKETS_CARDS', label: 'Tickets & Cards', icon: <InventoryIcon /> },
    { value: 'SPARE_PARTS', label: 'Spare Parts', icon: <CategoryIcon /> },
    { value: 'CONSUMABLES', label: 'Consumables', icon: <StoreIcon /> },
    { value: 'EQUIPMENT', label: 'Equipment', icon: <CategoryIcon /> },
    { value: 'STATIONERY', label: 'Stationery', icon: <StoreIcon /> },
    { value: 'TOOLS', label: 'Tools & Instruments', icon: <CategoryIcon /> },
    { value: 'CLEANING_SUPPLIES', label: 'Cleaning Supplies', icon: <StoreIcon /> },
    { value: 'SAFETY_EQUIPMENT', label: 'Safety Equipment', icon: <CategoryIcon /> }
  ];

  const stockLevels = [
    { value: 'OVERSTOCKED', label: 'Overstocked', color: 'info', threshold: 200 },
    { value: 'NORMAL', label: 'Normal Stock', color: 'success', threshold: 50 },
    { value: 'LOW', label: 'Low Stock', color: 'warning', threshold: 20 },
    { value: 'CRITICAL', label: 'Critical Stock', color: 'error', threshold: 5 },
    { value: 'OUT_OF_STOCK', label: 'Out of Stock', color: 'error', threshold: 0 }
  ];

  const validationSchema = Yup.object({
    itemName: Yup.string().min(2, 'Item name must be at least 2 characters').required('Item name is required'),
    itemCode: Yup.string().min(3, 'Item code must be at least 3 characters').required('Item code is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().min(10, 'Description must be at least 10 characters').required('Description is required'),
    currentStock: Yup.number().min(0, 'Stock cannot be negative').required('Current stock is required'),
    minimumStock: Yup.number().min(1, 'Minimum stock must be at least 1').required('Minimum stock is required'),
    maximumStock: Yup.number().min(
      Yup.ref('minimumStock'), 
      'Maximum stock must be greater than minimum stock'
    ).required('Maximum stock is required'),
    unitPrice: Yup.number().min(0, 'Unit price cannot be negative').required('Unit price is required'),
    unit: Yup.string().required('Unit of measurement is required'),
    storageLocation: Yup.string().required('Storage location is required'),
    supplier: Yup.string().required('Supplier information is required'),
    specifications: Yup.array().min(1, 'At least one specification is required')
  });

  const initialValues = {
    itemName: '',
    itemCode: '',
    category: '',
    description: '',
    currentStock: '',
    minimumStock: '',
    maximumStock: '',
    unitPrice: '',
    unit: '',
    storageLocation: '',
    supplier: '',
    barcodeQr: '',
    weight: '',
    dimensions: '',
    specifications: [
      { spec: 'Material', value: '' },
      { spec: 'Color', value: '' },
      { spec: 'Brand', value: '' }
    ],
    tags: [],
    reorderPoint: '',
    leadTime: '',
    lastRestocked: '',
    expiryDate: '',
    warrantyPeriod: '',
    remarks: ''
  };

  const handleSubmit = useCallback((values, { resetForm }) => {
    const stockStatus = getStockStatus(values.currentStock, values.minimumStock, values.maximumStock);
    
    const newItem = {
      id: Date.now(),
      ...values,
      createdDate: new Date().toISOString(),
      itemId: `INV-${values.category}-${String(inventoryItems.length + 1).padStart(4, '0')}`,
      stockStatus,
      totalValue: values.currentStock * values.unitPrice,
      stockTurnover: 0,
      lastMovement: new Date().toISOString(),
      movements: []
    };

    setInventoryItems(prev => [...prev, newItem]);
    resetForm();
  }, [inventoryItems.length]);

  const getStockStatus = useCallback((current, minimum, maximum) => {
    if (current === 0) return 'OUT_OF_STOCK';
    if (current < minimum * 0.25) return 'CRITICAL';
    if (current < minimum) return 'LOW';
    if (current > maximum * 1.5) return 'OVERSTOCKED';
    return 'NORMAL';
  }, []);

  const getStockColor = useCallback((status) => {
    const level = stockLevels.find(l => l.value === status);
    return level?.color || 'default';
  }, []);

  const handleEdit = useCallback((item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  }, []);

  const handleView = useCallback((item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  }, []);

  const handleDelete = useCallback((itemId) => {
    setInventoryItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const inventoryStats = useMemo(() => {
    const filteredItems = inventoryItems.filter(item => {
      const matchesSearch = !searchFilter || 
        item.itemName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.itemCode.toLowerCase().includes(searchFilter.toLowerCase());
      const matchesCategory = !categoryFilter || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    const stats = {
      totalItems: inventoryItems.length,
      filteredItems: filteredItems.length,
      outOfStock: inventoryItems.filter(item => item.stockStatus === 'OUT_OF_STOCK').length,
      lowStock: inventoryItems.filter(item => item.stockStatus === 'LOW').length,
      criticalStock: inventoryItems.filter(item => item.stockStatus === 'CRITICAL').length,
      normalStock: inventoryItems.filter(item => item.stockStatus === 'NORMAL').length,
      totalValue: inventoryItems.reduce((sum, item) => sum + (item.totalValue || 0), 0),
      categoriesCount: new Set(inventoryItems.map(item => item.category)).size
    };
    
    return { ...stats, filteredItems };
  }, [inventoryItems, searchFilter, categoryFilter]);

  const renderItemCard = useCallback((item) => {
    const stockPercentage = item.maximumStock > 0 ? (item.currentStock / item.maximumStock) * 100 : 0;
    const isLowStock = ['LOW', 'CRITICAL', 'OUT_OF_STOCK'].includes(item.stockStatus);
    
    return (
      <Card key={item.id} sx={{ 
        mb: 2, 
        border: isLowStock ? '2px solid #ff9800' : '1px solid #e0e0e0',
        borderRadius: 2
      }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                {itemCategories.find(c => c.value === item.category)?.icon}
                <Typography variant="h6" component="div">
                  {item.itemName}
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {item.itemId} | {item.itemCode}
              </Typography>
              <Box display="flex" gap={1} mb={2}>
                <Chip 
                  label={item.stockStatus.replace('_', ' ')} 
                  color={getStockColor(item.stockStatus)} 
                  size="small" 
                />
                <Chip 
                  label={itemCategories.find(c => c.value === item.category)?.label} 
                  variant="outlined"
                  size="small"
                />
                {isLowStock && (
                  <Chip 
                    label="REORDER NEEDED" 
                    color="error" 
                    size="small"
                    icon={<WarningIcon />}
                  />
                )}
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <Button size="small" onClick={() => handleView(item)} startIcon={<ViewIcon />}>
                View
              </Button>
              <Button size="small" onClick={() => handleEdit(item)} startIcon={<EditIcon />}>
                Edit
              </Button>
              <Button 
                size="small" 
                color="error" 
                onClick={() => handleDelete(item.id)} 
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">Current Stock</Typography>
              <Typography variant="h6" color={isLowStock ? 'error' : 'text.primary'}>
                {item.currentStock} {item.unit}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">Min / Max Stock</Typography>
              <Typography variant="body1">
                {item.minimumStock} / {item.maximumStock} {item.unit}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">Unit Price</Typography>
              <Typography variant="body1">₹{item.unitPrice}</Typography>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">Total Value</Typography>
              <Typography variant="h6" color="primary">
                ₹{(item.totalValue || 0).toLocaleString()}
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">Stock Level</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(stockPercentage, 100)}
                  sx={{ 
                    flexGrow: 1, 
                    height: 10, 
                    borderRadius: 5,
                    bgcolor: 'grey.200'
                  }}
                  color={
                    stockPercentage <= 25 ? 'error' :
                    stockPercentage <= 50 ? 'warning' :
                    stockPercentage <= 75 ? 'info' : 'success'
                  }
                />
                <Typography variant="body2">{Math.round(stockPercentage)}%</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">Storage Location</Typography>
              <Typography variant="body1">{item.storageLocation}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>{item.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }, [itemCategories, getStockColor, handleView, handleEdit, handleDelete]);

  const renderDetailModal = () => (
    <Dialog 
      open={viewModalOpen} 
      onClose={() => setViewModalOpen(false)}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        Inventory Item Details: {selectedItem?.itemName}
      </DialogTitle>
      <DialogContent>
        {selectedItem && (
          <Box sx={{ mt: 2 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="General Info" />
              <Tab label="Stock Details" />
              <Tab label="Specifications" />
              <Tab label="Movement History" />
            </Tabs>
            
            {activeTab === 0 && (
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Basic Information</Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon><InventoryIcon /></ListItemIcon>
                            <ListItemText 
                              primary="Item Name" 
                              secondary={selectedItem.itemName} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><CategoryIcon /></ListItemIcon>
                            <ListItemText 
                              primary="Category" 
                              secondary={itemCategories.find(c => c.value === selectedItem.category)?.label} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><StoreIcon /></ListItemIcon>
                            <ListItemText 
                              primary="Item Code" 
                              secondary={selectedItem.itemCode} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><ShippingIcon /></ListItemIcon>
                            <ListItemText 
                              primary="Supplier" 
                              secondary={selectedItem.supplier} 
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Physical Properties</Typography>
                        <List dense>
                          <ListItem>
                            <ListItemText 
                              primary="Weight" 
                              secondary={selectedItem.weight ? `${selectedItem.weight} kg` : 'Not specified'} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Dimensions" 
                              secondary={selectedItem.dimensions || 'Not specified'} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Barcode/QR" 
                              secondary={selectedItem.barcodeQr || 'Not assigned'} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Storage Location" 
                              secondary={selectedItem.storageLocation} 
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Description</Typography>
                        <Typography variant="body1">{selectedItem.description}</Typography>
                        
                        {selectedItem.tags && selectedItem.tags.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>Tags</Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                              {selectedItem.tags.map((tag, index) => (
                                <Chip key={index} label={tag} variant="outlined" size="small" />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {activeTab === 1 && (
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Stock Levels</Typography>
                        <Box sx={{ mb: 3 }}>
                          <Box display="flex" justifyContent="center" mb={2}>
                            <Chip 
                              label={selectedItem.stockStatus.replace('_', ' ')} 
                              color={getStockColor(selectedItem.stockStatus)} 
                              size="large"
                            />
                          </Box>
                          <Box textAlign="center">
                            <Typography variant="h3" color="primary">
                              {selectedItem.currentStock}
                            </Typography>
                            <Typography variant="body1">{selectedItem.unit}</Typography>
                          </Box>
                        </Box>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">Minimum Stock</Typography>
                            <Typography variant="h6">{selectedItem.minimumStock}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">Maximum Stock</Typography>
                            <Typography variant="h6">{selectedItem.maximumStock}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">Reorder Point</Typography>
                            <Typography variant="body1">{selectedItem.reorderPoint || 'Not set'}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">Lead Time</Typography>
                            <Typography variant="body1">{selectedItem.leadTime || 'Not set'}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Financial Details</Typography>
                        <List dense>
                          <ListItem>
                            <ListItemText 
                              primary="Unit Price" 
                              secondary={`₹${selectedItem.unitPrice}`} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Total Value" 
                              secondary={`₹${(selectedItem.totalValue || 0).toLocaleString()}`} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Last Restocked" 
                              secondary={selectedItem.lastRestocked ? new Date(selectedItem.lastRestocked).toLocaleDateString() : 'Not recorded'} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Expiry Date" 
                              secondary={selectedItem.expiryDate ? new Date(selectedItem.expiryDate).toLocaleDateString() : 'No expiry'} 
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {activeTab === 2 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Technical Specifications</Typography>
                {selectedItem.specifications && selectedItem.specifications.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Specification</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedItem.specifications.map((spec, index) => (
                          <TableRow key={index}>
                            <TableCell>{spec.spec}</TableCell>
                            <TableCell>{spec.value || 'Not specified'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="info">No specifications recorded for this item.</Alert>
                )}
              </Box>
            )}
            
            {activeTab === 3 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Stock Movement History</Typography>
                <Alert severity="info">
                  Stock movement tracking would be implemented here, showing all stock in/out transactions, 
                  transfers, adjustments, and related documentation.
                </Alert>
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
    <AFCStoreFormLayout title="Inventory Management">
      <Container maxWidth="xl">
        {/* Inventory Statistics Dashboard */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Inventory Overview</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">{inventoryStats.totalItems}</Typography>
                  <Typography variant="body2">Total Items</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">{inventoryStats.normalStock}</Typography>
                  <Typography variant="body2">Normal Stock</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">{inventoryStats.lowStock}</Typography>
                  <Typography variant="body2">Low Stock</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{inventoryStats.criticalStock}</Typography>
                  <Typography variant="body2">Critical</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{inventoryStats.outOfStock}</Typography>
                  <Typography variant="body2">Out of Stock</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary.main">
                    ₹{(inventoryStats.totalValue / 1000000).toFixed(1)}M
                  </Typography>
                  <Typography variant="body2">Total Value</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Add Inventory Item Form */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Add New Inventory Item</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <UniversalAFCStoreFormField
                      type="inventory-item"
                      name="itemName"
                      label="Item Name"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCStoreFormField
                      type="text"
                      name="itemCode"
                      label="Item Code"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCStoreFormField
                      type="item-category"
                      name="category"
                      label="Category"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCStoreFormField
                      type="unit-measurement"
                      name="unit"
                      label="Unit"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <UniversalAFCStoreFormField
                      type="storage-location"
                      name="storageLocation"
                      label="Storage Location"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <UniversalAFCStoreFormField
                      type="textarea"
                      name="description"
                      label="Description"
                      rows={3}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <UniversalAFCStoreFormField
                      type="quantity-field"
                      name="currentStock"
                      label="Current Stock"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <UniversalAFCStoreFormField
                      type="quantity-field"
                      name="minimumStock"
                      label="Minimum Stock"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <UniversalAFCStoreFormField
                      type="quantity-field"
                      name="maximumStock"
                      label="Maximum Stock"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <UniversalAFCStoreFormField
                      type="cost-amount"
                      name="unitPrice"
                      label="Unit Price"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCStoreFormField
                      type="supplier-info"
                      name="supplier"
                      label="Supplier"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCStoreFormField
                      type="barcode-qr"
                      name="barcodeQr"
                      label="Barcode/QR Code"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCStoreFormField
                      type="weight-measurement"
                      name="weight"
                      label="Weight"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <UniversalAFCStoreFormField
                      type="dimension-field"
                      name="dimensions"
                      label="Dimensions"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Item Specifications</Typography>
                    <FieldArray name="specifications">
                      {({ push, remove }) => (
                        <Box>
                          {values.specifications?.map((spec, index) => (
                            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={4}>
                                  <UniversalAFCStoreFormField
                                    type="text"
                                    name={`specifications.${index}.spec`}
                                    label="Specification"
                                  />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <UniversalAFCStoreFormField
                                    type="text"
                                    name={`specifications.${index}.value`}
                                    label="Value"
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
                              </Grid>
                            </Box>
                          ))}
                          <Button 
                            startIcon={<AddIcon />} 
                            onClick={() => push({ spec: '', value: '' })}
                          >
                            Add Specification
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <UniversalAFCStoreFormField
                      type="tags-field"
                      name="tags"
                      label="Tags"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <UniversalAFCStoreFormField
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
                    Add Inventory Item
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>

        {/* Search and Filter */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <UniversalAFCStoreFormField
                type="text"
                name="search"
                label="Search Items"
                placeholder="Search by name or code..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <UniversalAFCStoreFormField
                type="item-category"
                name="categoryFilter"
                label="Filter by Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button 
                variant="outlined" 
                startIcon={<FilterIcon />}
                fullWidth
              >
                Advanced Filter
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button 
                variant="outlined" 
                startIcon={<ExportIcon />}
                fullWidth
              >
                Export
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Typography variant="body2" color="textSecondary">
                {inventoryStats.filteredItems.length} items
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Inventory Items List */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Inventory Items ({inventoryStats.filteredItems.length})
          </Typography>
          
          {inventoryStats.filteredItems.length === 0 ? (
            <Alert severity="info">
              No inventory items found. Add your first item above.
            </Alert>
          ) : (
            <Box>
              {inventoryStats.filteredItems.map(renderItemCard)}
            </Box>
          )}
        </Paper>

        {renderDetailModal()}
      </Container>
    </AFCStoreFormLayout>
  );
};

export default InventoryManagementStoreForm;