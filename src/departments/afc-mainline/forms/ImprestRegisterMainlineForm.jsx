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
  Chip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon,
  Save as SaveIcon,
  Receipt as ImprestIcon,
  Calculate as CalculateIcon
} from '@mui/icons-material';

// Import universal components
import { 
  UniversalAFCMainlineFormField, 
  AFCMainlineFormLayout 
} from "../components";
import { validateForm } from "../validation/afcMainlineValidationSchemas";
import { 
  addTransactionData,
  selectTransactionData,
  selectTransactionLoading
} from "../redux/transactionSlice";

const ImprestRegisterMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Field preservation: Exact field structure from legacy form
  const initialBillDetail = {
    billNo: "",
    item_name: "",
    name_Address: "",
    qty: 0,
    rate: 0,
    amount: 0,
    gst: 0,
    totalAmount: 0,
  };

  // Initialize form data (preserve legacy structure exactly)
  const [formData, setFormData] = useState({
    date: "",
    imprest_no: "",
    billdetail: [initialBillDetail],
  });

  // Handle basic field changes
  const handleBasicFieldChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    
    // Clear field error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle bill detail changes with calculations (preserve legacy logic exactly)
  const handleBillChange = (index, field, value) => {
    let gst = 0;
    const newBillDetails = [...formData.billdetail];
    
    // Preserve legacy field processing logic
    newBillDetails[index][field] = field.includes("qty") || field.includes("rate") || field.includes("gst")
      ? parseFloat(value) || 0
      : value;
    
    // Preserve legacy calculation logic exactly
    newBillDetails[index].amount = newBillDetails[index].qty * newBillDetails[index].rate;
    gst = newBillDetails[index].amount * newBillDetails[index].gst / 100;
    newBillDetails[index].totalAmount = newBillDetails[index].amount + gst;

    setFormData({ ...formData, billdetail: newBillDetails });
    
    // Clear field-specific error
    if (errors[`${field}_${index}`]) {
      setErrors(prev => ({ ...prev, [`${field}_${index}`]: "" }));
    }
  };

  // Add new bill detail (preserve legacy functionality exactly)
  const addBillDetail = () => {
    setFormData({
      ...formData,
      billdetail: [
        ...formData.billdetail,
        { ...initialBillDetail }
      ],
    });
  };

  // Remove bill detail
  const removeBillDetail = (index) => {
    if (formData.billdetail.length > 1) {
      const newBillDetails = formData.billdetail.filter((_, i) => i !== index);
      setFormData({ ...formData, billdetail: newBillDetails });
    }
  };

  // Calculate totals
  const getTotalAmount = () => {
    return formData.billdetail.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0);
  };

  const getTotalGST = () => {
    return formData.billdetail.reduce((sum, bill) => {
      const gst = (bill.amount * bill.gst / 100) || 0;
      return sum + gst;
    }, 0);
  };

  const getGrandTotal = () => {
    return formData.billdetail.reduce((sum, bill) => sum + (bill.amount || 0), 0);
  };

  // Form validation
  const validateImprestForm = () => {
    const newErrors = {};
    
    // Basic field validation
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.imprest_no.trim()) {
      newErrors.imprest_no = "Imprest number is required";
    }

    // Bill detail validation
    formData.billdetail.forEach((bill, index) => {
      if (!bill.billNo.trim()) {
        newErrors[`billNo_${index}`] = "Bill number is required";
      }
      if (!bill.item_name.trim()) {
        newErrors[`item_name_${index}`] = "Item name is required";
      }
      if (!bill.name_Address.trim()) {
        newErrors[`name_Address_${index}`] = "Name & Address is required";
      }
      if (bill.qty <= 0) {
        newErrors[`qty_${index}`] = "Quantity must be greater than 0";
      }
      if (bill.rate <= 0) {
        newErrors[`rate_${index}`] = "Rate must be greater than 0";
      }
      if (bill.gst < 0) {
        newErrors[`gst_${index}`] = "GST cannot be negative";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission (preserve legacy Redux action exactly)
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateImprestForm()) {
      return;
    }

    setLoading(true);
    try {
      // Use exact same Redux action as legacy form
      await dispatch(addTransactionData({ 
        values: formData,
        formType: 'imprest-register-mainline' 
      }));
      navigate("/list");
    } catch (error) {
      setErrors({ submit: 'Error saving imprest data.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AFCMainlineFormLayout 
      title="Imprest Register Mainline" 
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Grid container spacing={3}>
        {/* Header Information */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center">
              <ImprestIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                <strong>Imprest Register:</strong> Record and manage imprest fund disbursements with automatic calculations.
              </Typography>
            </Box>
          </Alert>
        </Grid>

        {/* Basic Information */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <UniversalAFCMainlineFormField
                  type="text"
                  name="imprest_no"
                  label="Imprest No."
                  value={formData.imprest_no}
                  onChange={handleBasicFieldChange}
                  error={errors.imprest_no}
                  placeholder="Enter imprest number"
                  required
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12}>
          <Box display="flex" gap={2} mb={2}>
            <Chip 
              icon={<CalculateIcon />}
              label={`Total Bills: ${formData.billdetail.length}`}
              color="primary"
              variant="outlined"
            />
            <Chip 
              icon={<CalculateIcon />}
              label={`Base Amount: ₹${getGrandTotal().toFixed(2)}`}
              color="success"
              variant="outlined"
            />
            <Chip 
              icon={<CalculateIcon />}
              label={`Total GST: ₹${getTotalGST().toFixed(2)}`}
              color="warning"
              variant="outlined"
            />
            <Chip 
              icon={<CalculateIcon />}
              label={`Grand Total: ₹${getTotalAmount().toFixed(2)}`}
              color="error"
              variant="filled"
            />
          </Box>
        </Grid>

        {/* Bill Details */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Bill Details</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addBillDetail}
                variant="contained"
                size="small"
              >
                Add Bill Detail
              </Button>
            </Box>

            <TableContainer>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Bill No</strong></TableCell>
                    <TableCell><strong>Item Name</strong></TableCell>
                    <TableCell><strong>Name & Address</strong></TableCell>
                    <TableCell><strong>Qty</strong></TableCell>
                    <TableCell><strong>Rate</strong></TableCell>
                    <TableCell><strong>Amount</strong></TableCell>
                    <TableCell><strong>GST %</strong></TableCell>
                    <TableCell><strong>Total Amount</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.billdetail.map((bill, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="billNo"
                          value={bill.billNo}
                          onChange={(name, value) => handleBillChange(index, name, value)}
                          error={errors[`billNo_${index}`]}
                          placeholder="Bill No"
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="item_name"
                          value={bill.item_name}
                          onChange={(name, value) => handleBillChange(index, name, value)}
                          error={errors[`item_name_${index}`]}
                          placeholder="Item Name"
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="name_Address"
                          value={bill.name_Address}
                          onChange={(name, value) => handleBillChange(index, name, value)}
                          error={errors[`name_Address_${index}`]}
                          placeholder="Name & Address"
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="qty"
                          value={bill.qty}
                          onChange={(name, value) => handleBillChange(index, name, value)}
                          error={errors[`qty_${index}`]}
                          placeholder="0"
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="rate"
                          value={bill.rate}
                          onChange={(name, value) => handleBillChange(index, name, value)}
                          error={errors[`rate_${index}`]}
                          placeholder="0.00"
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="primary.main">
                          ₹{(bill.amount || 0).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="gst"
                          value={bill.gst}
                          onChange={(name, value) => handleBillChange(index, name, value)}
                          error={errors[`gst_${index}`]}
                          placeholder="0"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold" color="success.main">
                          ₹{(bill.totalAmount || 0).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => removeBillDetail(index)}
                          disabled={formData.billdetail.length === 1}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Totals Summary */}
            <Box mt={2} p={2} bgcolor="grey.50" borderRadius={1}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total Bill Details: {formData.billdetail.length}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="flex-end" gap={3}>
                    <Typography variant="body2">
                      <strong>Base: ₹{getGrandTotal().toFixed(2)}</strong>
                    </Typography>
                    <Typography variant="body2">
                      <strong>GST: ₹{getTotalGST().toFixed(2)}</strong>
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      <strong>Total: ₹{getTotalAmount().toFixed(2)}</strong>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
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
              {loading ? 'Saving...' : 'Submit Imprest Register'}
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

export default ImprestRegisterMainlineForm;