import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { Form, Row, Col } from 'react-bootstrap';
import station from "../../data/station.json";

import {
  Box,
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
} from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import { dtrissue } from "../../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const StockMovementTokensEdit = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
console.log(loanregister)
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));
 

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);
  const itmm = loanregister.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  
  }
  
  // if (items.length > 0) {
  //   filteredData = items.filter((itm) => itm.id === id);
  // }
  const fd = filteredData && filteredData[0] ? filteredData[0] : {};
  const basicInitialValues = {
    
        id: fd.id || "",
        date: fd.data,
        station: fd.station,
        netOpeningStock: fd.netOpeningStock ? JSON.parse(JSON.stringify(fd.netOpeningStock)) : [],
        tokenMovement: fd.tokenMovement ? JSON.parse(JSON.stringify(fd.tokenMovement)) : [],
        closingStock: fd.closingStock ? JSON.parse(JSON.stringify(fd.closingStock)) : [],
        netOpeningStockOK: fd.netOpeningStockOK,
        receivedFromGates: fd.receivedFromGates,
        receivedFromOtherStation: fd.receivedFromOtherStation,
        refundedCancelledTokens: fd.refundedCancelledTokens,
        looseTokens: fd.looseTokens,
        receivedFromRCC: fd.receivedFromRCC,
        tokenLeftInGates: fd.tokenLeftInGates,
        sentToOtherStation: fd.sentToOtherStation,
        totalTokenSale: fd.totalTokenSale,
        grossClosingStock: fd.grossClosingStock,
        okGrossClosingStock: fd.okGrossClosingStock,
        netOKGrossClosingStock: fd.netOKGrossClosingStock,
        netClosingStock: fd.netClosingStock,
        netForTheDayStock: fd.netForTheDayStock,
    
     
    };
   const [formValues, setFormValues] = useState(basicInitialValues);
   const [formData, setFormData] = useState(basicInitialValues);
  
    useEffect(() => {
      if (fd) {
        setFormValues(basicInitialValues);
      }
    }, [fd]);

    const handleTokenMovementAdd = () => {
        setFormData(prev => ({
          ...prev,
          tokenMovement: [...prev.tokenMovement, { equipment: '', noOfTokens: '', from: '', to: '', time: '', empNo: '', containerNo: '' }]
        }));
      };
    
      const handleClosingStockAdd = () => {
        setFormData(prev => ({
          ...prev,
          closingStock: [...prev.closingStock, { ContNo: '', Qty: '', location: '' }]
        }));
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleTokenMovementChange = (index, field, value) => {
        const newMovement = [...formData.tokenMovement];
        newMovement[index][field] = value;
        setFormData(prev => ({ ...prev, tokenMovement: newMovement }));
      };
    
      const handleClosingStockChange = (index, field, value) => {
        const newClosing = [...formData.closingStock];
        newClosing[index][field] = value;
        setFormData(prev => ({ ...prev, closingStock: newClosing }));
      };
  // Initialize form values when data is loaded
  // useEffect(() => {
  //   if (loanregister?.data?.data) {
  //     id=parseInt(id)
  //     const filteredData = loanregister.data.data.find(
  //       (item) => item.id === id
  //     );
  //     if (filteredData) {
  //       setFormData(filteredData);
  //     }
  //   }
  // }, [loanregister, id]);
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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

 

  const handleStockChange = (type, field, value) => {
    setFormData({ ...formData, [type]: { ...formData[type], [field]: value } });
  };




  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData({ formType: slug, values: formData }));
    navigate(`/list/${slug}`);
  };

    const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <Typography variant="h5" gutterBottom>Stock Movement Record</Typography>
      <Row className="mb-3">
        <Col><TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} /></Col>
        <Col><TextField fullWidth label="Station" value={formData.station} onChange={e => setFormData({ ...formData, station: e.target.value })} /></Col>
      </Row>
      <Typography variant="h6">Net Opening Stock</Typography>
      <Row className="mb-3">
        <Col><TextField fullWidth label="OK Stock" type="number" value={formData.netOpeningStock.ok} onChange={e => setFormData({ ...formData, netOpeningStock: { ...formData.netOpeningStock, ok: +e.target.value } })} /></Col>
        <Col><TextField fullWidth label="Defective Stock" type="number" value={formData.netOpeningStock.defective} onChange={e => setFormData({ ...formData, netOpeningStock: { ...formData.netOpeningStock, defective: +e.target.value } })} /></Col>
        <Col><TextField fullWidth label="Emergency Stock" type="number" value={formData.netOpeningStock.emergency} onChange={e => setFormData({ ...formData, netOpeningStock: { ...formData.netOpeningStock, emergency: +e.target.value } })} /></Col>
      </Row>

      <Box className="mb-3">
        <Typography variant="h6">Token Movement for the Day</Typography>
        {formData.tokenMovement.map((movement, idx) => (
          <Row key={idx} className="mb-2">
            {Object.entries(movement).map(([field, val]) => (
              <Col key={field}><TextField fullWidth label={field} value={val} onChange={e => handleTokenMovementChange(idx, field, e.target.value)} /></Col>
            ))}
          </Row>
        ))}
        <Button variant="contained" onClick={handleTokenMovementAdd} startIcon={<AddIcon />}>Add Token Movement</Button>
      </Box>

      
      <Grid container>
      <Grid item xs={6}> 
      {["netOpeningStockOK", "receivedFromGates", "receivedFromOtherStation", "refundedCancelledTokens", "looseTokens", "receivedFromRCC", "tokenLeftInGates", "sentToOtherStation", "totalTokenSale", "grossClosingStock", "okGrossClosingStock", "netOKGrossClosingStock"].map((field, idx) => (
            <Grid item xs={12} sm={6} key={idx} className='mb-3'>
              <TextField
                fullWidth
                label={field.replace(/([A-Z])/g, ' $1')}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
          ))}
          </Grid>
          <Grid item xs={6}> 
          <Box className="mb-3">
        <Typography variant="h6">Location of Closing Stock</Typography>
        {formData.closingStock.map((stock, idx) => (
          <Row key={idx} className="mb-2">
            {Object.entries(stock).map(([field, val]) => (
              <Col key={field}><TextField fullWidth label={field} value={val} onChange={e => handleClosingStockChange(idx, field, e.target.value)} /></Col>
            ))}
          </Row>
        ))}
        <Button variant="contained" onClick={handleClosingStockAdd} startIcon={<AddIcon />}>Add Closing Stock</Button>
      </Box>

            </Grid>
          </Grid>
          <Typography variant="h6">For the Day</Typography>
      <Row className="mb-3">
        <Col><TextField fullWidth label="OK Stock" type="number" value={formData.netForTheDayStock.ok} onChange={e => setFormData({ ...formData, netForTheDayStock: { ...formData.netForTheDayStock, ok: +e.target.value } })} /></Col>
        <Col><TextField fullWidth label="Defective Stock" type="number" value={formData.netForTheDayStock.defective} onChange={e => setFormData({ ...formData, netForTheDayStock: { ...formData.netForTheDayStock, defective: +e.target.value } })} /></Col>
        <Col><TextField fullWidth label="Emergency Stock" type="number" value={formData.netForTheDayStock.emergency} onChange={e => setFormData({ ...formData, netForTheDayStock: { ...formData.netForTheDayStock, emergency: +e.target.value } })} /></Col>
      </Row>
      <Typography variant="h6">Closing Stock</Typography>
      <Row className="mb-3">
        <Col><TextField fullWidth label="OK Stock" type="number" value={formData.netClosingStock.ok} onChange={e => setFormData({ ...formData, netClosingStock: { ...formData.netClosingStock, ok: +e.target.value } })} /></Col>
        <Col><TextField fullWidth label="Defective Stock" type="number" value={formData.netClosingStock.defective} onChange={e => setFormData({ ...formData, netClosingStock: { ...formData.netClosingStock, defective: +e.target.value } })} /></Col>
        <Col><TextField fullWidth label="Emergency Stock" type="number" value={formData.netClosingStock.emergency} onChange={e => setFormData({ ...formData, netClosingStock: { ...formData.netClosingStock, emergency: +e.target.value } })} /></Col>
      </Row>
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </Form>  );
};

export default StockMovementTokensEdit;
