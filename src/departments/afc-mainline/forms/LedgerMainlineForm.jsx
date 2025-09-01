import React, { useState, useEffect } from 'react';
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
  Book as LedgerIcon,
  AccountBalance as BalanceIcon
} from '@mui/icons-material';

// Import universal components
import { 
  UniversalAFCMainlineFormField, 
  AFCMainlineFormLayout 
} from "../components";
import { validateForm } from "../validation";
import { addData } from "../../../reducer/store/DtrIssueStoreReducer";

const LedgerMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Field preservation: Exact field structure from legacy form
  const initialRowData = {
    date: "",
    fromWhomReceivedOrIssued: "",
    refOfReceiptOrIssueNote: "",
    receiptQty: "",
    issuedQty: "",
    balanceQty: "",
    signOfIssuer: "",
    signOfControllingOfficer: "",
    remarks: "",
  };

  // Initialize with one row (same as legacy)
  const [formData, setFormData] = useState([initialRowData]);

  // Handle field changes for specific row and field
  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    
    // Auto-calculate balance quantity when receipt or issued quantity changes
    if (field === 'receiptQty' || field === 'issuedQty') {
      const receiptQty = parseFloat(newFormData[index]['receiptQty']) || 0;
      const issuedQty = parseFloat(newFormData[index]['issuedQty']) || 0;
      newFormData[index]['balanceQty'] = (receiptQty - issuedQty).toString();
    }
    
    setFormData(newFormData);
    
    // Clear field-specific error
    if (errors[`${field}_${index}`]) {
      setErrors(prev => ({ ...prev, [`${field}_${index}`]: "" }));
    }
  };

  // Add new row (preserve legacy functionality)
  const handleAddRow = () => {
    setFormData([...formData, { ...initialRowData }]);
  };

  // Remove row
  const handleRemoveRow = (index) => {
    if (formData.length > 1) {
      const newFormData = formData.filter((_, i) => i !== index);
      setFormData(newFormData);
    }
  };

  // Calculate totals
  const getTotalReceipt = () => {
    return formData.reduce((sum, row) => sum + (parseFloat(row.receiptQty) || 0), 0);
  };

  const getTotalIssued = () => {
    return formData.reduce((sum, row) => sum + (parseFloat(row.issuedQty) || 0), 0);
  };

  const getTotalBalance = () => {
    return formData.reduce((sum, row) => sum + (parseFloat(row.balanceQty) || 0), 0);
  };

  // Form validation
  const validateLedgerForm = () => {
    const newErrors = {};
    
    formData.forEach((row, index) => {
      if (!row.date) {
        newErrors[`date_${index}`] = "Date is required";
      }
      if (!row.fromWhomReceivedOrIssued.trim()) {
        newErrors[`fromWhomReceivedOrIssued_${index}`] = "From/To field is required";
      }
      if (!row.refOfReceiptOrIssueNote.trim()) {
        newErrors[`refOfReceiptOrIssueNote_${index}`] = "Reference is required";
      }
      
      // Validate quantities
      const receiptQty = parseFloat(row.receiptQty);
      const issuedQty = parseFloat(row.issuedQty);
      
      if (receiptQty < 0) {
        newErrors[`receiptQty_${index}`] = "Receipt quantity cannot be negative";
      }
      if (issuedQty < 0) {
        newErrors[`issuedQty_${index}`] = "Issued quantity cannot be negative";
      }
      if (!row.receiptQty && !row.issuedQty) {
        newErrors[`receiptQty_${index}`] = "Either receipt or issued quantity is required";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission (preserve legacy Redux action)
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateLedgerForm()) {
      return;
    }

    setLoading(true);
    try {
      // Use same Redux action as legacy form
      await dispatch(addData(formData));
      navigate("/list");
    } catch (error) {
      setErrors({ submit: 'Error saving ledger data.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AFCMainlineFormLayout 
      title="Ledger Mainline" 
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Grid container spacing={3}>
        {/* Header Information */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center">
              <LedgerIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                <strong>Notice:</strong> Ledger Data is primarily entered through DTR Receipt and DTR Issue forms. 
                This form is for manual entries and adjustments.
              </Typography>
            </Box>
          </Alert>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12}>
          <Box display="flex" gap={2} mb={2}>
            <Chip 
              icon={<BalanceIcon />}
              label={`Total Receipt: ${getTotalReceipt()}`}
              color="success"
              variant="outlined"
            />
            <Chip 
              icon={<BalanceIcon />}
              label={`Total Issued: ${getTotalIssued()}`}
              color="warning"
              variant="outlined"
            />
            <Chip 
              icon={<BalanceIcon />}
              label={`Total Balance: ${getTotalBalance()}`}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Grid>

        {/* Ledger Entry Table */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Ledger Entries</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddRow}
                variant="contained"
                size="small"
              >
                Add Row
              </Button>
            </Box>

            <TableContainer>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>From/To</strong></TableCell>
                    <TableCell><strong>Reference</strong></TableCell>
                    <TableCell><strong>Receipt Qty</strong></TableCell>
                    <TableCell><strong>Issued Qty</strong></TableCell>
                    <TableCell><strong>Balance Qty</strong></TableCell>
                    <TableCell><strong>Issuer Sign</strong></TableCell>
                    <TableCell><strong>Controller Sign</strong></TableCell>
                    <TableCell><strong>Remarks</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="date"
                          name="date"
                          value={row.date}
                          onChange={(name, value) => handleInputChange(index, name, value)}
                          error={errors[`date_${index}`]}
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="fromWhomReceivedOrIssued"
                          value={row.fromWhomReceivedOrIssued}
                          onChange={(name, value) => handleInputChange(index, name, value)}
                          error={errors[`fromWhomReceivedOrIssued_${index}`]}
                          placeholder="From/To"
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="refOfReceiptOrIssueNote"
                          value={row.refOfReceiptOrIssueNote}
                          onChange={(name, value) => handleInputChange(index, name, value)}
                          error={errors[`refOfReceiptOrIssueNote_${index}`]}
                          placeholder="Reference No."
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="receiptQty"
                          value={row.receiptQty}
                          onChange={(name, value) => handleInputChange(index, name, value)}
                          error={errors[`receiptQty_${index}`]}
                          placeholder="0"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="issuedQty"
                          value={row.issuedQty}
                          onChange={(name, value) => handleInputChange(index, name, value)}
                          error={errors[`issuedQty_${index}`]}
                          placeholder="0"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="number"
                          name="balanceQty"
                          value={row.balanceQty}
                          onChange={(name, value) => handleInputChange(index, name, value)}
                          disabled
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="signOfIssuer"
                          value={row.signOfIssuer}
                          onChange={(name, value) => handleInputChange(index, name, value)}
                          placeholder="Issuer"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="signOfControllingOfficer"
                          value={row.signOfControllingOfficer}
                          onChange={(name, value) => handleInputChange(index, name, value)}
                          placeholder="Controller"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <UniversalAFCMainlineFormField
                          type="text"
                          name="remarks"
                          value={row.remarks}
                          onChange={(name, value) => handleInputChange(index, name, value)}
                          placeholder="Remarks"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleRemoveRow(index)}
                          disabled={formData.length === 1}
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

            {/* Total Row */}
            <Box mt={2} p={2} bgcolor="grey.50" borderRadius={1}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total Entries: {formData.length}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Typography variant="body2">
                      <strong>Receipt: {getTotalReceipt()}</strong>
                    </Typography>
                    <Typography variant="body2">
                      <strong>Issued: {getTotalIssued()}</strong>
                    </Typography>
                    <Typography variant="body2" color="primary.main">
                      <strong>Balance: {getTotalBalance()}</strong>
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
              {loading ? 'Saving...' : 'Save Ledger Data'}
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

export default LedgerMainlineForm;