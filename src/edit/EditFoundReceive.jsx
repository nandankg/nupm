import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../reducer/redux/tableDataSlice";
import { dtrissue } from "../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditFoundReceive = () => {
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
    <h2>Found Received Article Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="row">
      <div className="col-md-4 ">
        <label className="form-label">Date</label>
        <input type="date" className="form-control"
        value={formValues.date} 
        name="date" onChange={handleChange} required />
      </div>
      
      <div className="col-md-4 mb-3">
        <label className="form-label">Time</label>
        <input type="time" className="form-control" name="time" value={formValues.time} onChange={handleChange} required />
      </div>

      <div className=" col-md-4 mb-3">
        <label className="form-label">Station</label>
        <input type="text" className="form-control" name="station" value={formValues.station} onChange={handleChange} required />
      </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Handed Over By (Name & Type)</label>
        <div className="row">
        <div className=" col-md-6">
        <input type="text" className="form-control" name="handedOverByName" value={formValues.handedOverByName} placeholder="Name" onChange={handleChange} required />
        </div>
        <div className=" col-md-6">
        <input type="text" className="form-control mt-2" name="handedOverByType" value={formValues.handedOverByType} placeholder="Type" onChange={handleChange} required />
        </div>
      </div>
</div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" name="description" value={formValues.description} onChange={handleChange} required></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Place Found</label>
        <input type="text" className="form-control" name="foundPlace" value={formValues.foundPlace} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Identifiable/Unique Details</label>
        <textarea className="form-control" name="identifiableDetails" value={formValues.identifiableDetails} onChange={handleChange} required></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Received By (Emp & Name)</label>
        <div className="row">
          <div className="col-md-6">
        <input type="text" className="form-control" name="receivedByEmp" value={formValues.receivedByEmp} placeholder="Emp ID" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
        <input type="text" className="form-control mt-2" name="receivedByName" value={formValues.receivedByName} placeholder="Name" onChange={handleChange} required />
        </div>
      </div>
      </div>
      <div className="mb-3">
        <label className="form-label">If Claimed Then S.No. of Then</label>
        <div className="row">
          <div className="col-md-6">
        <input type="text" className="form-control" name="cdrForm" placeholder="CDR" value={formValues.cdrForm} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
        <input type="text" className="form-control mt-2" name="claimedSNo" value={formValues.claimedSNo} placeholder="Declaration Form" onChange={handleChange} required />
        </div>
      </div>
      </div>
      
      <div className="mb-3">
        <label className="form-label">If Sent to Lost & Found office</label>
        <div className="row">
          <div className="col-md-3">
        <input type="text" className="form-control" name="sentToLostAndFoundDate"value={formValues.sentToLostAndFoundDate}  placeholder="Date" onChange={handleChange} required />
        </div>
        <div className="col-md-3">
        <input type="text" className="form-control mt-2" name="sentToLostAndFoundTime"value={formValues.sentToLostAndFoundTime}  placeholder="Time" onChange={handleChange} required />
        </div>
        <div className="col-md-3">
        <input type="text" className="form-control" name="sentToLostAndFoundByEmp"value={formValues.sentToLostAndFoundByEmp}  placeholder="Foil No" onChange={handleChange} required />
        </div>
        <div className="col-md-3">
        <input type="text" className="form-control mt-2" name="sentToLostAndFoundByName" value={formValues.sentToLostAndFoundByName} placeholder="Sent By Emp and Name" onChange={handleChange} required />
        </div>
      </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Remarks</label>
        <textarea className="form-control" name="remarks" value={formValues.remarks} onChange={handleChange}></textarea>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  );
};

export default EditFoundReceive;
