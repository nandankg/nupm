import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Button, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Divider,
  Chip,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon,
  Save as SaveIcon,
  Assignment as RequisitionIcon,
  People as PeopleIcon,
  LocationOn as LocationIcon,
  ListAlt as ItemsIcon
} from '@mui/icons-material';

// Import universal components
import { 
  UniversalAFCMainlineFormField, 
  AFCMainlineFormLayout 
} from "../components";
import { validateForm } from "../validation/afcMainlineValidationSchemas";
import { addData } from "../../../reducer/store/RequisitionReducer";
import stationData from "../../../station.json";

const RequisitionMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Field preservation: Exact field structure from legacy form
  const initialItemData = {
    description: "",
    demandedQuantity: "",
    issuedQuantity: "",
    dtrPageNo: "",
    remarks: "",
  };

  // Initialize form data (preserve legacy structure exactly)
  const [formData, setFormData] = useState({
    book_no: "",
    date: "",
    from: "",
    store_type: "",
    name: "",
    designation: "",
    empId: "",
    issued_name: "",
    issued_designation: "",
    issued_empID: "",
    receiver_name: "",
    receiver_designation: "",
    receiver_empID: "",
    employee_name: "",
    department: "",
    employee_id: "",
    station: "",
    maintenace_installation: "",
    items: Array(18).fill(initialItemData), // Preserve legacy 18-item structure
    approved_by: "",
    approverDesignation: "",
    approverEmpId: "",
    section_incharge: "",
    section_incharge_designation: "",
    section_incharge_Id: "",
    issuerSign: "",
    receiverSign: "",
  });

  // Additional items array for dynamic expansion (preserve legacy add row functionality)
  const [item, setItem] = useState([initialItemData]);

  // Handle basic field changes
  const handleBasicFieldChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    
    // Clear field error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle item changes (preserve legacy logic)
  const handleItemChange = (index, field, value) => {
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData(prevData => ({
      ...prevData,
      items: updatedItems,
    }));
    
    // Clear field-specific error
    if (errors[`${field}_${index}`]) {
      setErrors(prev => ({ ...prev, [`${field}_${index}`]: "" }));
    }
  };

  // Add row functionality (preserve legacy behavior)
  const handleAddRow = () => {
    setItem([...item, initialItemData]);
    // Extend the items array in formData as well
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, initialItemData]
    }));
  };

  // Remove row functionality
  const handleRemoveRow = (index) => {
    if (index >= 18) { // Only allow removal of items beyond the initial 18
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
      
      const newItemState = item.filter((_, i) => i !== (index - 18));
      setItem(newItemState);
    }
  };

  // Calculate summary statistics
  const getTotalDemanded = () => {
    return formData.items.reduce((sum, item) => sum + (parseFloat(item.demandedQuantity) || 0), 0);
  };

  const getTotalIssued = () => {
    return formData.items.reduce((sum, item) => sum + (parseFloat(item.issuedQuantity) || 0), 0);
  };

  const getActiveItems = () => {
    return formData.items.filter(item => 
      item.description.trim() || 
      item.demandedQuantity || 
      item.issuedQuantity
    ).length;
  };

  // Form validation
  const validateRequisitionForm = () => {
    const newErrors = {};
    
    // Basic field validation
    if (!formData.book_no.trim()) {
      newErrors.book_no = "Requisition slip number is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }
    if (!formData.station) {
      newErrors.station = "Station selection is required";
    }

    // Personnel validation
    if (!formData.issued_name.trim()) {
      newErrors.issued_name = "Issuer name is required";
    }
    if (!formData.receiver_name.trim()) {
      newErrors.receiver_name = "Receiver name is required";
    }
    if (!formData.section_incharge.trim()) {
      newErrors.section_incharge = "Section incharge name is required";
    }

    // Items validation - at least one item should have content
    const hasActiveItems = formData.items.some(item => 
      item.description.trim() && item.demandedQuantity
    );
    if (!hasActiveItems) {
      newErrors.items_general = "At least one item with description and quantity is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission (preserve legacy Redux action exactly)
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateRequisitionForm()) {
      return;
    }

    setLoading(true);
    try {
      // Use exact same Redux action as legacy form
      await dispatch(addData(formData));
      navigate("/list");
    } catch (error) {
      setErrors({ submit: 'Error saving requisition data.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AFCMainlineFormLayout 
      title="Requisition Slip Mainline" 
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Grid container spacing={3}>
        {/* Header Information */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center">
              <RequisitionIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                <strong>UTTAR PRADESH METRO RAIL CORPORATION LIMITED</strong> - Material Requisition Slip
              </Typography>
            </Box>
          </Alert>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12}>
          <Box display="flex" gap={2} mb={2}>
            <Chip 
              icon={<ItemsIcon />}
              label={`Active Items: ${getActiveItems()}`}
              color="primary"
              variant="outlined"
            />
            <Chip 
              icon={<LocationIcon />}
              label={`Station: ${formData.station || 'Not Selected'}`}
              color="secondary"
              variant="outlined"
            />
            <Chip 
              label={`Total Demanded: ${getTotalDemanded()}`}
              color="success"
              variant="outlined"
            />
            <Chip 
              label={`Total Issued: ${getTotalIssued()}`}
              color="warning"
              variant="outlined"
            />
          </Box>
        </Grid>

        {/* Basic Information */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <UniversalAFCMainlineFormField
                  type="text"
                  name="book_no"
                  label="Requisition Slip Number"
                  value={formData.book_no}
                  onChange={handleBasicFieldChange}
                  error={errors.book_no}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UniversalAFCMainlineFormField
                  type="date"
                  name="date"
                  label="Date"
                  value={formData.date}
                  onChange={handleBasicFieldChange}
                  error={errors.date}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UniversalAFCMainlineFormField
                  type="text"
                  name="department"
                  label="Department"
                  value={formData.department}
                  onChange={handleBasicFieldChange}
                  error={errors.department}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UniversalAFCMainlineFormField
                  type="custom-select"
                  name="station"
                  label="Station"
                  value={formData.station}
                  onChange={handleBasicFieldChange}
                  error={errors.station}
                  options={stationData
                    .filter((station) => station["Station Name"])
                    .map((station) => ({
                      value: station["Station Name"],
                      label: station["Station Name"]
                    }))}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UniversalAFCMainlineFormField
                  type="text"
                  name="maintenace_installation"
                  label="Maintenance/Installation Purpose"
                  value={formData.maintenace_installation}
                  onChange={handleBasicFieldChange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Personnel Details */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* Issuer Details */}
            <Grid item xs={12} md={4}>
              <Card elevation={2}>
                <CardHeader 
                  title="Issuer Details" 
                  titleTypographyProps={{ variant: 'h6', fontSize: '1rem' }}
                  avatar={<PeopleIcon color="primary" />}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <UniversalAFCMainlineFormField
                        type="text"
                        name="issued_name"
                        label="Name"
                        value={formData.issued_name}
                        onChange={handleBasicFieldChange}
                        error={errors.issued_name}
                        size="small"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <UniversalAFCMainlineFormField
                        type="text"
                        name="issued_designation"
                        label="Designation"
                        value={formData.issued_designation}
                        onChange={handleBasicFieldChange}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <UniversalAFCMainlineFormField
                        type="text"
                        name="issued_empID"
                        label="Employee ID"
                        value={formData.issued_empID}
                        onChange={handleBasicFieldChange}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Receiver Details */}
            <Grid item xs={12} md={4}>
              <Card elevation={2}>
                <CardHeader 
                  title="Receiver Details" 
                  titleTypographyProps={{ variant: 'h6', fontSize: '1rem' }}
                  avatar={<PeopleIcon color="secondary" />}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <UniversalAFCMainlineFormField
                        type="text"
                        name="receiver_name"
                        label="Name"
                        value={formData.receiver_name}
                        onChange={handleBasicFieldChange}
                        error={errors.receiver_name}
                        size="small"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <UniversalAFCMainlineFormField
                        type="text"
                        name="receiver_designation"
                        label="Designation"
                        value={formData.receiver_designation}
                        onChange={handleBasicFieldChange}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <UniversalAFCMainlineFormField
                        type="text"
                        name="receiver_empID"
                        label="Employee ID"
                        value={formData.receiver_empID}
                        onChange={handleBasicFieldChange}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Section Incharge Details */}
            <Grid item xs={12} md={4}>
              <Card elevation={2}>
                <CardHeader 
                  title="Section Incharge Details" 
                  titleTypographyProps={{ variant: 'h6', fontSize: '1rem' }}
                  avatar={<PeopleIcon color="success" />}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <UniversalAFCMainlineFormField
                        type="text"
                        name="section_incharge"
                        label="Name"
                        value={formData.section_incharge}
                        onChange={handleBasicFieldChange}
                        error={errors.section_incharge}
                        size="small"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <UniversalAFCMainlineFormField
                        type="text"
                        name="section_incharge_designation"
                        label="Designation"
                        value={formData.section_incharge_designation}
                        onChange={handleBasicFieldChange}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <UniversalAFCMainlineFormField
                        type="text"
                        name="section_incharge_Id"
                        label="Employee ID"
                        value={formData.section_incharge_Id}
                        onChange={handleBasicFieldChange}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Items Table */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Material Items</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddRow}
                variant="contained"
                size="small"
              >
                Add Row
              </Button>
            </Box>

            {errors.items_general && (
              <Alert severity="error" sx={{ mb: 2 }}>{errors.items_general}</Alert>
            )}

            <TableContainer sx={{ maxHeight: 400 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Sl No.</strong></TableCell>
                    <TableCell><strong>Description of Material</strong></TableCell>
                    <TableCell><strong>Demanded Qty</strong></TableCell>
                    <TableCell><strong>Issued Qty</strong></TableCell>
                    <TableCell><strong>DTR Page No. & Date</strong></TableCell>
                    <TableCell><strong>Remarks</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="description"
                          value={item.description}
                          onChange={(name, value) => handleItemChange(index, name, value)}
                          placeholder="Material description"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="demandedQuantity"
                          value={item.demandedQuantity}
                          onChange={(name, value) => handleItemChange(index, name, value)}
                          placeholder="0"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="issuedQuantity"
                          value={item.issuedQuantity}
                          onChange={(name, value) => handleItemChange(index, name, value)}
                          placeholder="0"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="dtrPageNo"
                          value={item.dtrPageNo}
                          onChange={(name, value) => handleItemChange(index, name, value)}
                          placeholder="Page No. & Date"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="remarks"
                          value={item.remarks}
                          onChange={(name, value) => handleItemChange(index, name, value)}
                          placeholder="Remarks"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {index >= 18 && (
                          <IconButton
                            onClick={() => handleRemoveRow(index)}
                            size="small"
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Approval Section */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Approval Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <UniversalAFCMainlineFormField
                  type="text"
                  name="approved_by"
                  label="Approved By"
                  value={formData.approved_by}
                  onChange={handleBasicFieldChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UniversalAFCMainlineFormField
                  type="text"
                  name="approverDesignation"
                  label="Approver Designation"
                  value={formData.approverDesignation}
                  onChange={handleBasicFieldChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UniversalAFCMainlineFormField
                  type="text"
                  name="approverEmpId"
                  label="Approver Employee ID"
                  value={formData.approverEmpId}
                  onChange={handleBasicFieldChange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Requisition Slip'}
            </Button>
          </Box>
        </Grid>

        {/* Form Errors */}
        {errors.submit && (
          <Grid item xs={12}>
            <Alert severity="error">{errors.submit}</Alert>
          </Grid>
        )}
      </Grid>
    </AFCMainlineFormLayout>
  );
};

export default RequisitionMainlineForm;