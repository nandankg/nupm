import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
   
    addData,
  } from "../../reducer/redux/tableDataSlice"; // Import your Redux slice action
import station from "../../data/station.json";
function getLastParameter() {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments[pathSegments.length - 1];
  }
const PettyRepairForm = () => {
     const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const [formData, setFormData] = useState({
    dateAndTime: '',
    station: '',
    location: '',
    scEmp: '',
    scName: '',
    natureOfComplaint: '',
    pertainsTo: '',
    reportedTo: '',
    actionTakenDate: '',
    attendedBy: '',
    actionDetails: '',
    workDoneDetails: '',
    remarks: '',
    rectifiedDateAndTime: '',
    scNameEmpNo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleSubmit = (e) => {
       e.preventDefault();
      dispatch(addData({formType:slug,values:formData}));
          console.log("Form Data Submitted:", formData);
         navigate(`/list/${slug}`);
     };
  

  return (
    <>
    <form onSubmit={handleSubmit}>
      {/* Form Fields - similar structure for all fields */}
      <div className='container'>
        <h5>PETTY REPAIR REGISTER</h5>
    <div className='row mb-2'>
        <div className='col-md-4'>
        <label htmlFor="dateAndTime">Date & Time:</label>
        <input
          type="datetime-local" // Use appropriate input type
          id="dateAndTime"
          name="dateAndTime"
          className="form-control"
          value={formData.dateAndTime}
          onChange={handleChange}
          required // Add required attribute where necessary
        />
      </div>
      <div className='col-md-4'>

      <label htmlFor="station">Station:</label>
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
            
      <div className='col-md-4'>
      <label htmlFor="station">Location</label>
        <input
          type='text'
          id="station"
          name="location"
          className="form-control"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-4'>
        <label htmlFor="dateAndTime">sc Emp</label>
        <input
          type="text" // Use appropriate input type
          id="dateAndTime"
          name="scEmp"
          className="form-control"
          value={formData.scEmp}
          onChange={handleChange}
          required // Add required attribute where necessary
        />
      </div>
      <div className='col-md-4'>

      <label htmlFor="dateAndTime">sc Name</label>
        <input
          type="text" // Use appropriate input type
          id="dateAndTime"
          name="scName"
          className="form-control"
          value={formData.scName}
          onChange={handleChange}
          // Add required attribute where necessary
        />      </div>
            
      <div className='col-md-4'>
      <label htmlFor="station">NATURE & DETAILS OF COMPLAINT</label>
        <input
          type='text'
          id="station"
          name="natureOfComplaint"
          className="form-control"
          value={formData.natureOfComplaint}
          onChange={handleChange}
          
        />
      </div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-6'>
        <label htmlFor="dateAndTime">PERTAINS TO</label>
        <input
          type="text" // Use appropriate input type
          id="dateAndTime"
          name="pertainsTo"
          className="form-control"
          value={formData.pertainsTo}
          onChange={handleChange}
          // Add required attribute where necessary
        />
      </div>
      <div className='col-md-6'>

      <label htmlFor="dateAndTime">REPORTED TO</label>
        <input
          type="text" // Use appropriate input type
          id="dateAndTime"
          name="reportedTo"
          className="form-control"
          value={formData.reportedTo}
          onChange={handleChange}
           // Add required attribute where necessary
        />      </div>
            
      </div>
      <div className='row mb-2'>
        <h5>ACTION TAKEN</h5>
        <div className='col-md-4'>
        <label htmlFor="dateAndTime"> ACTION DATE</label>
        <input
          type="date" // Use appropriate input type
          id="dateAndTime"
          name="actionTakenDate"
          className="form-control"
          value={formData.actionTakenDate}
          onChange={handleChange}
          // Add required attribute where necessary
        />
      </div>
      <div className='col-md-4'>

      <label htmlFor="dateAndTime">ATTENDED BY</label>
        <input
          type="text" // Use appropriate input type
          id="dateAndTime"
          name="attendedBy"
          className="form-control"
          value={formData.attendedBy}
          onChange={handleChange}
         // Add required attribute where necessary
        />      </div>
            
      <div className='col-md-4'>
      <label htmlFor="station">DETAILS OF WORK DONE</label>
        <input
          type='text'
          id="station"
          name="actionDetails"
          className="form-control"
          value={formData.actionDetails}
          onChange={handleChange}
          
        />
      </div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-12'>
        <label htmlFor="dateAndTime">REMARKS OF SSE/SE/JE</label>
        <input
          type="text" // Use appropriate input type
          id="dateAndTime"
          name="remarks"
          className="form-control"
          value={formData.remarks}
          onChange={handleChange}
        // Add required attribute where necessary
        />
      </div>
      </div>
         
      {/* ... (Other form fields: location, SC Emp, SC Name, etc.) */}

      <div className='row mb-2'>
        <div className='col-md-6'>
        <label htmlFor="dateAndTime">Rectified Date & Time</label>
        <input
          type="datetime-local" // Use appropriate input type
          id="dateAndTime"
          name="rectifiedDateAndTime"
          className="form-control"
          value={formData.rectifiedDateAndTime}
          onChange={handleChange}
           // Add required attribute where necessary
        />
      </div>
      <div className='col-md-6'>

      <label htmlFor="dateAndTime">SC Name & Emp No.</label>
        <input
          type="text" // Use appropriate input type
          id="dateAndTime"
          name="scNameEmpNo"
          className="form-control"
          value={formData.scNameEmpNo}
          onChange={handleChange}
           // Add required attribute where necessary
        />      </div>
            
      </div>

      <button type="submit">Submit</button>
      </div>
    </form>
    </>
  );
};

export default PettyRepairForm;