import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import { dtrissue } from "../../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import station from "../../data/station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditFoundForeignCurrency = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [formValues, setFormValues] = useState({});

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);

  // Initialize form values when data is loaded
  useEffect(() => {
    if (loanregister?.data?.data) {
      const filteredData = loanregister.data.data.find(
        (item) => item.id === id
      );
      if (filteredData) {
        setFormValues(filteredData);
      }
    }
  }, [loanregister, id]);
  console.log(formValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData({ formType: slug, values: formValues }));
    navigate(`/list/${slug}`);
  };

    const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <div className="container mt-4">
    <h2>Found/Received Foreign Currency Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="row">
      <div className="col-md-6">
        <label className="form-label">Station</label>
        <select
        
        id="station"
        name="station"
        className="form-control"
        value={formValues.station}
        onChange={handleChange}
        required
      >
               <option value="">Select a Station</option>
        {station.map((stn, index) => (
          <option key={index} value={stn["Station Name"]}>
            {stn["Station Name"]}
          </option>
        ))}
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Date & Time</label>
        <input type="datetime-local" className="form-control" name="date" value={formValues.date} onChange={handleChange} required />
      </div>
     
      <div className="col-md-6">
        <label className="form-label">Handed Over By</label>
        <input type="text" className="form-control" name="handedOverByName" value={formValues.handedOverByName}placeholder="Name" onChange={handleChange} required />
      
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Package/Purse</label>
        <input type="text" className="form-control" name="packageOrPurse" value={formValues.packageOrPurse}onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Currency No</label>
        <input type="text" className="form-control" name="currencyNo" value={formValues.currencyNo}onChange={handleChange} required />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Country Name</label>
        <input type="text" className="form-control" name="countryName" value={formValues.countryName}onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Value Mention</label>
        <input type="text" className="form-control" name="valueInNumber" value={formValues.valueInNumber}onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Currency Name</label>
        <input type="text" className="form-control" name="currencyName" value={formValues.currencyName}onChange={handleChange} required />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Unique Identification Mark</label>
        <input type="text" className="form-control" name="identificationMark" value={formValues.identificationMark}onChange={handleChange} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Place Currency Found</label>
        <input type="text" className="form-control" name="placeFound"value={formValues.placeFound} onChange={handleChange} required />
      </div>
      <div className="col-md-12">
        <label className="form-label">Remark</label>
        <input type="text" className="form-control" name="remarks" value={formValues.remarks}onChange={handleChange}  />
      </div>
      <div className="col-md-12">
        <label className="form-label">Received By</label>
        <div className="row">
        <input type="text" className="form-control col-md-6 me-3" name="receivedByEmp" value={formValues.receivedByEmp}placeholder="EMP ID" onChange={handleChange} required />
        <input type="text" className="form-control col-md-6" name="receivedByName"value={formValues.receivedByName} placeholder="Name" onChange={handleChange} required />
        </div>
      </div>
      <div className="col-md-12">
        <label className="form-label">Received By</label>
        <div className="row">
        <input type="date" className="form-control col-md-2 me-3" name="sentToLostAndFoundDate"value={formValues.sentToLostAndFoundDate} placeholder="Date" onChange={handleChange}  />
        <input type="time" className="form-control col-md-2 me-3" name="sentToLostAndFoundTime" value={formValues.sentToLostAndFoundTime}placeholder="Time" onChange={handleChange}  />
        <input type="text" className="form-control col-md-2 me-3" name="sentToLostAndFoundFoilNo" value={formValues.sentToLostAndFoundFoilNo}placeholder="Folio No" onChange={handleChange}  />
        <input type="text" className="form-control col-md-3 me-3" name="sentToLostAndFoundByEmp" value={formValues.sentToLostAndFoundByEmp}placeholder="EMP ID" onChange={handleChange}  />
        <input type="text" className="form-control col-md-3 me-3" name="sentToLostAndFoundByName" value={formValues.sentToLostAndFoundByName}placeholder="Name" onChange={handleChange}  />
        
        </div>
      </div>
      <div className="col-md-12">
        <label className="form-label">If Claimed Then S.No. of Then</label>
        <div className="row">
        <input type="text" className="form-control col-md-6 me-3" name="claimSNo" value={formValues.claimSNo} placeholder="CDR" onChange={handleChange} required />
        <input type="text" className="form-control col-md-6" name="declarationForm" value={formValues.declarationForm}placeholder="Declaration Form" onChange={handleChange} required />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>);
};

export default EditFoundForeignCurrency;
