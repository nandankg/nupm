// StockTransactionForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import station from "../../data/station.json";
import { Form } from "react-bootstrap";
import {
  
  Container,
  Typography,
  Grid,
  TextField,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Select, MenuItem
} from '@mui/material';
import { fetchData, addData } from "../../reducer/redux/tableDataSlice";
;function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const StockMovementCards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const [formData, setFormData] = useState({
    date: '',
    station: '',
    scEmp: '',
    scName: '',
    craEmp: '',
    craName: '',
    shiftTiming: '',
    openingStock: [
      { TYPE:'Fresh',SV: '', SSC: '', BL: '', T1: '', T3: '' },
      { TYPE:'Deface',SV: '', SSC: '', BL: '', T1: '', T3: '' },
      { TYPE:'Defectives',SV: '', SSC: '', BL: '', T1: '', T3: '' },
    ],
    transactions: Array(5).fill({
      issueCardId: '',
      cardType: '',
      sold: false,
      status: '',
      cscId: '',
      afcAmt: '',
      actual: '',
      diff: '',
    }),
    closingStock: [
      {TYPE:'Fresh', SV: '', SSC: '', BL: '', T1: '', T3: '' },
      {TYPE:'Deface', SV: '', SSC: '', BL: '', T1: '', T3: '' },
      {TYPE:'Defectives', SV: '', SSC: '', BL: '', T1: '', T3: '' },
    ],
  });

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpeningStockChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedOpeningStock = [...prev.openingStock];
      updatedOpeningStock[index] = { ...updatedOpeningStock[index], [field]: value };
      return { ...prev, openingStock: updatedOpeningStock };
    });
  };

  const handleTransactionChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedTransactions = [...prev.transactions];
      if (field === 'sold') {
        updatedTransactions[index] = { ...updatedTransactions[index], [field]: value };
      } else {
        updatedTransactions[index] = { ...updatedTransactions[index], [field]: value };
      }
      return { ...prev, transactions: updatedTransactions };
    });
  };

  const handleClosingStockChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedClosingStock = [...prev.closingStock];
      updatedClosingStock[index] = { ...updatedClosingStock[index], [field]: value };
      return { ...prev, closingStock: updatedClosingStock };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData({formType:slug,values:formData}));
    console.log('Form Data Submitted:', formData);
    // Add API call or Redux dispatch here
    alert('Data submitted successfully');
  };

  return (
    <Container sx={{ mt: 4, p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Stock Transaction Form
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleBasicInfoChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Form.Group>
           
                      <select  className="form-control" name="station" onChange={handleBasicInfoChange} required >
                    
                      <option value="">Select a Station</option>
                      {station.map((stn, index) => (
                        <option key={index} value={stn["Station Name"]}>
                          {stn["Station Name"]}
                        </option>
                      ))}
                      </select>
          </Form.Group>
        
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="SC Employee ID"
            name="scEmp"
            value={formData.scEmp}
            onChange={handleBasicInfoChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="SC Name"
            name="scName"
            value={formData.scName}
            onChange={handleBasicInfoChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="CRA Employee ID"
            name="craEmp"
            value={formData.craEmp}
            onChange={handleBasicInfoChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="CRA Name"
            name="craName"
            value={formData.craName}
            onChange={handleBasicInfoChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Shift Timing"
            name="shiftTiming"
            value={formData.shiftTiming}
            onChange={handleBasicInfoChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Opening Stock
      </Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell></TableCell>
              <TableCell>SV</TableCell>
              <TableCell>SSC</TableCell>
              <TableCell>BL</TableCell>
              <TableCell>T1</TableCell>
              <TableCell>T3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.openingStock.map((stock, index) => (
              <TableRow key={index}>
                <TableCell>{stock.TYPE}</TableCell>
                <TableCell>
                  <TextField
                    value={stock.SV}
                    onChange={(e) => handleOpeningStockChange(index, 'SV', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={stock.SSC}
                    onChange={(e) => handleOpeningStockChange(index, 'SSC', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={stock.BL}
                    onChange={(e) => handleOpeningStockChange(index, 'BL', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={stock.T1}
                    onChange={(e) => handleOpeningStockChange(index, 'T1', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={stock.T3}
                    onChange={(e) => handleOpeningStockChange(index, 'T3', e.target.value)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Transactions
      </Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Issue Card ID</TableCell>
              <TableCell>Card Type</TableCell>
              <TableCell>Sold</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>CSC ID</TableCell>
              <TableCell>AFC Amount</TableCell>
              <TableCell>Actual</TableCell>
              <TableCell>Difference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={transaction.issueCardId}
                    onChange={(e) => handleTransactionChange(index, 'issueCardId', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={transaction.cardType}
                    onChange={(e) => handleTransactionChange(index, 'cardType', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={transaction.sold}
                    onChange={(e) => handleTransactionChange(index, 'sold', e.target.checked)}
                  />
                </TableCell>
                <TableCell>
                <Select
  value={transaction.status}
  onChange={(e) => handleTransactionChange(index, 'status', e.target.value)}
  size="small"
>

  <MenuItem value="Fresh">Fresh</MenuItem>
  <MenuItem value="Defective">Defective</MenuItem>
</Select>
                </TableCell>
                <TableCell>
                  <TextField
                    value={transaction.cscId}
                    onChange={(e) => handleTransactionChange(index, 'cscId', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={transaction.afcAmt}
                    onChange={(e) => handleTransactionChange(index, 'afcAmt', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={transaction.actual}
                    onChange={(e) => handleTransactionChange(index, 'actual', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={transaction.diff}
                    onChange={(e) => handleTransactionChange(index, 'diff', e.target.value)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Closing Stock
      </Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell></TableCell>
              <TableCell>SV</TableCell>
              <TableCell>SSC</TableCell>
              <TableCell>BL</TableCell>
              <TableCell>T1</TableCell>
              <TableCell>T3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.closingStock.map((stock, index) => (
              <TableRow key={index}>
                <TableCell>{stock.TYPE}</TableCell>
                <TableCell>
                  <TextField
                    value={stock.SV}
                    onChange={(e) => handleClosingStockChange(index, 'SV', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={stock.SSC}
                    onChange={(e) => handleClosingStockChange(index, 'SSC', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={stock.BL}
                    onChange={(e) => handleClosingStockChange(index, 'BL', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={stock.T1}
                    onChange={(e) => handleClosingStockChange(index, 'T1', e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={stock.T3}
                    onChange={(e) => handleClosingStockChange(index, 'T3', e.target.value)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default StockMovementCards;