import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchData,
  addData
} from "../../reducer/redux/tableDataSlice";
import station from "../../data/station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const ForeignCurrencyForm = () => {
  const navigate = useNavigate();
 
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    station: '',
    handedOverByName: '',
    
    packageOrPurse: '',
    currencyNo: '',
    countryName: '',
    valueInNumber: '',
    currencyName: '', // e.g., Dollar, Euro, Pound
    identificationMark: '',
    otherCurrency: '', // If "Any other" is selected
    placeFound: '',
    remarks: '',
    receivedByEmp: '',
    receivedByName: '',
    sentToLostAndFoundDate: '',
    sentToLostAndFoundTime: '',
    sentToLostAndFoundFoilNo: '',
    sentToLostAndFoundByEmp: '',
    sentToLostAndFoundByName: '',
    claimSNo: '', // If claimed
    declarationForm: '', // If claimed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
          e.preventDefault();
          console.log(formData)
         dispatch(addData({formType:slug,values:formData}));
             console.log("Form Data Submitted:", formData);
          navigate(`/list/${slug}`);
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
          value={formData.station}
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
          <input type="datetime-local" className="form-control" name="date" onChange={handleChange} required />
        </div>
       
        <div className="col-md-6">
          <label className="form-label">Handed Over By</label>
          <input type="text" className="form-control" name="handedOverByName" placeholder="Name" onChange={handleChange} required />
        
        </div>
        
        <div className="col-md-6">
          <label className="form-label">Package/Purse</label>
          <input type="text" className="form-control" name="packageOrPurse" onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Currency No</label>
          <input type="text" className="form-control" name="currencyNo" onChange={handleChange} required />
        </div>
        
        <div className="col-md-6">
          <label className="form-label">Country Name</label>
          <input type="text" className="form-control" name="countryName" onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Value Mention</label>
          <input type="text" className="form-control" name="valueInNumber" onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Currency Name</label>
          <input type="text" className="form-control" name="currencyName" onChange={handleChange} required />
        </div>
        
        <div className="col-md-6">
          <label className="form-label">Unique Identification Mark</label>
          <input type="text" className="form-control" name="identificationMark" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Place Currency Found</label>
          <input type="text" className="form-control" name="placeFound" onChange={handleChange} required />
        </div>
        <div className="col-md-12">
          <label className="form-label">Remark</label>
          <input type="text" className="form-control" name="remarks" onChange={handleChange}  />
        </div>
        <div className="col-md-12">
          <label className="form-label">Received By</label>
          <div className="row">
          <input type="text" className="form-control col-md-6 me-3" name="receivedByEmp" placeholder="EMP ID" onChange={handleChange} required />
          <input type="text" className="form-control col-md-6" name="receivedByName" placeholder="Name" onChange={handleChange} required />
          </div>
        </div>
        <div className="col-md-12">
          <label className="form-label">If Sent to Lost & Found office</label>
          <div className="row">
          <input type="date" className="form-control col-md-2 me-3" name="sentToLostAndFoundDate" placeholder="Date" onChange={handleChange}  />
          <input type="time" className="form-control col-md-2 me-3" name="sentToLostAndFoundTime" placeholder="Time" onChange={handleChange}  />
          <input type="text" className="form-control col-md-2 me-3" name="sentToLostAndFoundFoilNo" placeholder="Folio No" onChange={handleChange}  />
          <input type="text" className="form-control col-md-3 me-3" name="sentToLostAndFoundByEmp" placeholder="EMP ID" onChange={handleChange}  />
          <input type="text" className="form-control col-md-3 me-3" name="sentToLostAndFoundByName" placeholder="Name" onChange={handleChange}  />
          
          </div>
        </div>
        <div className="col-md-12">
          <label className="form-label">If Claimed Then S.No. of Then</label>
          <div className="row">
          <input type="text" className="form-control col-md-6 me-3" name="claimSNo" placeholder="CDR" onChange={handleChange} required />
          <input type="text" className="form-control col-md-6" name="declarationForm" placeholder="Declaration Form" onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ForeignCurrencyForm;
