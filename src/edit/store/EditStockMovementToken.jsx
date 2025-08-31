import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
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
const EditStockMovementToken = () => {
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
  date: fd.date || "",
    station: fd.station || "",
    openingStockOK: fd.openingStockOK || "",
    openingStockDefective: fd.openingStockDefective || "",
    openingStockEmergency: fd.openingStockEmergency || "",
    tokenMovements:fd.tokenMovements || "",
    closingStockLocation:fd.closingStockLocation || "",
    netOpeningStockOK: fd.netOpeningStockOK || "",
    receivedFromGates: fd.receivedFromGates || "",
    receivedFromOtherStation:fd.receivedFromOtherStation || "",
    refundedCancelledTokens: fd.refundedCancelledTokens || "",
    looseTokens: fd.looseTokens || "",
    receivedFromRCC: fd.receivedFromRCC || "",
    tokenLeftInGates: fd.tokenLeftInGates || "",
    sentToOtherStation:fd.sentToOtherStation || "",
    totalTokenSale: fd.totalTokenSale || "",
    grossClosingStock: fd.grossClosingStock || "",
    okGrossClosingStock:fd.okGrossClosingStock || "",
    netOKGrossClosingStock:fd.netOKGrossClosingStock || "",
    closingStockNetOK: fd.closingStockNetOK || "",
    closingStockDefective:fd.closingStockDefective || "",
    closingStockEmergency: fd.closingStockEmergency || "",
       
    };
   const [formValues, setFormValues] = useState(basicInitialValues);
   const [formData, setFormData] = useState(basicInitialValues);
  
    useEffect(() => {
      if (fd) {
        setFormValues(basicInitialValues);
      }
    }, [fd]);


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

  const handleChange = (e, index, field) => {
    if (typeof index === "number") {
      const updatedMovements = [...formData.tokenMovements];
      updatedMovements[index] = {
        ...updatedMovements[index],
        [field]: e.target.value,
      };
      setFormData({ ...formData, tokenMovements: updatedMovements });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  const handleStockChange = (type, field, value) => {
    setFormData({ ...formData, [type]: { ...formData[type], [field]: value } });
  };

  const handleTransactionChange = (index, field, value) => {
    const updatedTransactions = [...formData.transactions];
    updatedTransactions[index] = { ...updatedTransactions[index], [field]: value };
    setFormData({ ...formData, transactions: updatedTransactions });
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
    <div className="container">
     <h2>Stock Movement Record - Token</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">

        <div className="col-md-4 mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" name="date" onChange={handleChange} required />
        </div>
        
        <div className=" col-md-4 mb-3">
          <label className="form-label">Station</label>
          <select  className="form-control" name="station" onChange={handleChange} required >
        
          <option value="">Select a Station</option>
          {station.map((stn, index) => (
            <option key={index} value={stn["Station Name"]}>
              {stn["Station Name"]}
            </option>
          ))}
          </select>
        </div>

        <div className=" col-md-4 mb-3">
          <label className="form-label">Net Opening Stock</label>
          <input type="number" className="form-control" name="netOpeningStockOK" onChange={handleChange} required />
        </div>
        </div>
        <h4>Token Movements</h4>
        {formData.tokenMovements.map((movement, index) => (
          <div key={index} className="mb-3 border p-2">
            <div className="row">
                <div className="col-md-2">
            <label className="form-label">Equipment/Cont No</label>
            <input type="text" className="form-control" onChange={(e) => handleChange(e, index, "equipmentNo")}  />
            </div>
            <div className="col-md-2">
            <label className="form-label">No of Tokens</label>
            <input type="number" className="form-control" onChange={(e) => handleChange(e, index, "noOfTokens")}  />
            </div>
            <div className="col-md-2">
            <label className="form-label">From</label>
            <input type="text" className="form-control" onChange={(e) => handleChange(e, index, "from")}  />
            </div>
            <div className="col-md-2">
            <label className="form-label">To</label>
            <input type="text" className="form-control" onChange={(e) => handleChange(e, index, "to")}  />
            </div>
            <div className="col-md-2">
            <label className="form-label">Time</label>
            <input type="time" className="form-control" onChange={(e) => handleChange(e, index, "time")}  />
            </div>
            <div className="col-md-2">
            <label className="form-label">Emp No</label>
            <input type="text" className="form-control" onChange={(e) => handleChange(e, index, "empNo")}  />
            </div>
          </div>
          </div>
        ))}
<div className="row">

        <div className="col-md-4 mb-3">
          <label className="form-label">Received from Gates in whole day		
</label>
          <input type="number" className="form-control" name="receivedFromGates" onChange={handleChange} required />
        </div>
        
        <div className=" col-md-4 mb-3">
          <label className="form-label">Received from other Station</label>
          <input type="number" className="form-control" name="receivedFromOtherStation" onChange={handleChange} required />
        </div>

        <div className=" col-md-4 mb-3">
          <label className="form-label">Refunded & Cancelled Tokens</label>
          <input type="number" className="form-control" name="refundedCancelledTokens" onChange={handleChange} required />
        </div>
        </div>
        <div className="row">

        <div className="col-md-4 mb-3">
          <label className="form-label">Loose Tokens</label>
          <input type="number" className="form-control" name="looseTokens" onChange={handleChange} required />
        </div>
        
        <div className=" col-md-4 mb-3">
          <label className="form-label">Received from RCC(Normal Stock)</label>
          <input type="number" className="form-control" name="receivedFromRCC" onChange={handleChange} required />
        </div>

        <div className=" col-md-4 mb-3">
          <label className="form-label">Token Left in Gates at Night</label>
          <input type="number" className="form-control" name="tokenLeftInGates" onChange={handleChange} required />
        </div>
        </div>
        <div className="row">

<div className="col-md-4 mb-3">
  <label className="form-label">Sent to other Station</label>
  <input type="number" className="form-control" name="sentToOtherStation" onChange={handleChange} required />
</div>

<div className=" col-md-4 mb-3">
  <label className="form-label">Total token sale for The Day</label>
  <input type="number" className="form-control" name="totalTokenSale" onChange={handleChange} required />
</div>

<div className=" col-md-4 mb-3">
  <label className="form-label">Gross Closing Stock</label>
  <input type="number" className="form-control" name="grossClosingStock" onChange={handleChange} required />
</div>
</div>
<div className="row mb-3">

<div className="col-md-6 ">
  <label className="form-label">OK Gross Closing Stock</label>
  <input type="number" className="form-control" name="okGrossClosingStock" onChange={handleChange} required />
</div>

<div className=" col-md-6">
  <label className="form-label">Net OK Gross Closing Stock</label>
  <input type="number" className="form-control" name="netOKGrossClosingStock" onChange={handleChange} required />
</div>


</div>
        <h4>Closing Stock</h4>
        <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Net OK</label>
          <input type="number" className="form-control" name="closingStock.netOK" onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Defective</label>
          <input type="number" className="form-control" name="closingStock.defective" onChange={handleChange} required />
        </div>
         <div className="col-md-4">
          <label className="form-label">Emergency</label>
          <input type="number" className="form-control" name="closingStock.emergency" onChange={handleChange} required />
        </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>  );
};

export default EditStockMovementToken;
