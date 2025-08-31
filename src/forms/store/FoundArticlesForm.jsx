import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchData,
  addData
} from "../../reducer/redux/tableDataSlice";
import { Form, Button, Row, Col } from "react-bootstrap";
import station from "../../data/station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const FoundformDatasForm = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const [slug, setSlug] = useState(getLastParameter().trim());
    const loanregister = useSelector((state) => state.data);
    
  const [formData, setFormData] = useState({
   
      date: '',
      time: '',
      station: '',
      handedOverByName: '',
      handedOverByType: '',
      description: '',
      foundPlace: '',
      identifiableDetails: '',
      receivedByName: '',
      receivedByEmp: '',
      remarks: '',
      claimedSNo: '',
      cdrForm: '',
      sentToLostAndFoundDate: '',
      sentToLostAndFoundTime: '',
      sentToLostAndFoundByEmp: '',
      sentToLostAndFoundByName: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = (e) => {
        e.preventDefault();
       dispatch(addData({formType:slug,values:formData}));
           console.log("Form Data Submitted:", formData);
         navigate(`/list/${slug}`);
      };
  // const handleChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const updatedformDatas = [...formData.formDatas];
  //   updatedformDatas[index][name] = value;
  //   setFormData({ ...formData, formDatas: updatedformDatas });
  // };

 

  return (
    <div className="container mt-4">
    <h2>Found Received Article Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="row">
      <div className="col-md-4 ">
        <label className="form-label">Date</label>
        <input type="date" className="form-control" name="date" onChange={handleChange} required />
      </div>
      
      <div className="col-md-4 mb-3">
        <label className="form-label">Time</label>
        <input type="time" className="form-control" name="time" onChange={handleChange}  />
      </div>

      <div className=" col-md-4 mb-3">
       <label htmlFor="station">Station:</label>
                              <select  className="form-control" name="station"     onChange={handleChange}
                           required >
                                                 
                                                   <option value="">Select a Station</option>
                                                   {station.map((stn, index) => (
                                                     <option key={index} value={stn["Station Name"]}>
                                                       {stn["Station Name"]}
                                                     </option>
                                                   ))}
                                                   </select>
      
      </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Handed Over By (Name & Type)</label>
        <div className="row">
        <div className=" col-md-6">
        <input type="text" className="form-control" name="handedOverBy.name" placeholder="Name" onChange={handleChange}  />
        </div>
        <div className=" col-md-6">
        <input type="text" className="form-control mt-2" name="handedOverBy.type" placeholder="Type" onChange={handleChange}  />
        </div>
      </div>
</div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" name="description" onChange={handleChange} ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Place Found</label>
        <input type="text" className="form-control" name="foundPlace" onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Identifiable/Unique Details</label>
        <textarea className="form-control" name="identifiableDetails" onChange={handleChange}></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Received By (Emp & Name)</label>
        <div className="row">
          <div className="col-md-6">
        <input type="text" className="form-control" name="receivedByEmp" placeholder="Emp ID" onChange={handleChange}  />
        </div>
        <div className="col-md-6">
        <input type="text" className="form-control mt-2" name="receivedByName" placeholder="Name" onChange={handleChange} />
        </div>
      </div>
      </div>
      <div className="mb-3">
        <label className="form-label">If Claimed Then S.No. of Then</label>
        <div className="row">
          <div className="col-md-6">
        <input type="text" className="form-control" name="cdrForm" placeholder="CDR" onChange={handleChange}  />
        </div>
        <div className="col-md-6">
        <input type="text" className="form-control mt-2" name="claimedSNo" placeholder="Declaration Form" onChange={handleChange}  />
        </div>
      </div>
      </div>
      
      <div className="mb-3">
        <label className="form-label">If Sent to Lost & Found office</label>
        <div className="row">
          <div className="col-md-3">
        <input type="text" className="form-control" name="sentToLostAndFoundDate" placeholder="Date" onChange={handleChange}  />
        </div>
        <div className="col-md-3">
        <input type="text" className="form-control mt-2" name="sentToLostAndFoundTime" placeholder="Time" onChange={handleChange}  />
        </div>
        <div className="col-md-3">
        <input type="text" className="form-control" name="sentToLostAndFoundByEmp" placeholder="Foil No" onChange={handleChange}  />
        </div>
        <div className="col-md-3">
        <input type="text" className="form-control mt-2" name="sentToLostAndFoundByName" placeholder="Sent By Emp and Name" onChange={handleChange}  />
        </div>
      </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Remarks</label>
        <textarea className="form-control" name="remarks" onChange={handleChange}></textarea>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>

  );
};

export default FoundformDatasForm;