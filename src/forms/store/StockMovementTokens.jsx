import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Form, Row, Col } from 'react-bootstrap';
import { fetchData, addData } from "../../reducer/redux/tableDataSlice";
;function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const StockMovementTokens = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());

  const [formData, setFormData] = useState({
    date: '',
    station: '',
    netOpeningStock: { ok: 0, defective: 0, emergency: 0 },
    tokenMovement: [],
    closingStock: [],
    netOpeningStockOK: '',
    receivedFromGates: '',
    receivedFromOtherStation: '',
    refundedCancelledTokens: '',
    looseTokens: '',
    receivedFromRCC: '',
    tokenLeftInGates: '',
    sentToOtherStation: '',
    totalTokenSale: '',
    grossClosingStock: '',
    okGrossClosingStock: '',
    netOKGrossClosingStock: '',
    netClosingStock: { ok: 0, defective: 0, emergency: 0 },
    netForTheDayStock: { ok: 0, defective: 0, emergency: 0 },
  });
  const stations=[
    "ABST",
"ABST-CHBG",
"ABST-DGPI",
"ABST-MWYA",
"ALL STATIONS",
"ALMB",
"ALMB-ABST",
"ALMB-CHBG",
"ALMB-DGPI",
"ALMB-IDNM",
"ALMB-MWYA",
"ALMB-SGNG",
"AMSM",
"AMSM-CCAP",
"AMSM-TPNR",
"ASNS-KDSS",
"BSNM",
"BSNM-ITC",
"BTNT",
"BTNT-IDNM",
"CCAP",
"CCAP-AMSM",
"CCAP-NEUTRAL SECTION",
"CHBG",
"CHBG-HSGJ",
"DCC",
"Depot Entry Line",
"Depot Exit Line",
"DGPI",
"DGPI-CHBG",
"HSGJ",
"HSGJ-MSPA",
"HSGJ-SHVA",
"HZNJ",
"HZNJ-CHBG",
"HZNJ-KDSS",
"HZNJ-NEUTRAL SECTION",
"IDNM",
"ITC",
"ITC-BSNM",
"KDSS",
"KDSS-VSVM",
"KRNM",
"KRNM-ABST",
"KRNM-ALMB",
"KRNM-CHBG",
"KRNM-DGPI",
"KRNM-MWYA",
"KRNM-SGNG",
"LHMT",
"LHMT-BSNM",
"MSPA",
"MSPA RSS",
"MSPA-IDNM",
"MWYA",
"MWYA-ABST",
"MWYA-CHBG",
"MWYA-DGPI",
"NEUTRAL SECTION TO MSPA",
"OCC",
"SGNG",
"SGNG TO ABST",
"SGNG,SHVA,MWYA,KDSS,LHMT",
"SGNG-ABST",
"SGNG-ALMB",
"SGNG-CHBG",
"SGNG-DGPI",
"SGNG-MWYA",
"SHVA",
"SHVA-HZNJ",
"TEST TRACK",
"TPNR",
"TPNR Depot Entry",
"TPNR Depot Exit",
"TPNR-ABST",
"TPNR-ALMB",
"TPNR-AMSM",
"TPNR-CHBG",
"TPNR-DGPI",
"TPNR-KRNM",
"TPNR-MWYA",
"TPNR-SGNG",
"VSVM",
"VSVM-ITC",
"VSVM-KDSS",

]
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

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(addData({formType:slug,values:formData}));
       console.log("Form Data Submitted:", formData);
    navigate(`/list/${slug}`);
  };


  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <Typography variant="h5" gutterBottom>Stock Movement Record</Typography>
      <Row className="mb-3">
        <Col><TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} /></Col>
        <Col><Form.Group>
                                
                                <Form.Select name="station" onChange={e => setFormData({ ...formData, station: e.target.value })} required>
                                   
                                    <option value="">Select a Station</option>
                                       
                                    {stations.map((stn, index) => (
                            <option key={index} value={stn}>
                              {stn}
                            </option>
                          ))}
                        
                                </Form.Select>
                            </Form.Group></Col>
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
    </Form>
  );
};

export default StockMovementTokens;
