import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateData, fetchIncidentById } from "../../reducer/pinki/IncidentAccidentReportReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const EditIncidentAccidentReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const incidentData = useSelector((state) => state.incidentaccidentreport.incidents.find(incident => incident.id === id));
  
  const [formValues, setFormValues] = useState({
    incident: "",
    date_incident: "",
    time_incident: "",
    place_of_incident: "",
    tdetails: "",
    name_of_scto: "",
    empid_of_scto: "",
    reason: "",
    brief: [],
    repercussion: [],
    responsible_depart: "",
    sign_of_tc_acc: "",
    unit: ""
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchIncidentById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (incidentData) {
      setFormValues(incidentData);
    }
  }, [incidentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateData({ id, ...formValues }));
    navigate(`/list/${id}`);
  };

  return (
    <div className="container">
      <div role="presentation" className="breadcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Incident Accident Report</Link>
          <Link to="/list">Edit</Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form className="row g-3" onSubmit={handleSubmit}>
            <h3 className="form-heading">Edit Incident Accident Report</h3>
            <div className="col-md-6">
              <label>Incident:</label>
              <input type="text" className="form-control" name="incident" value={formValues.incident} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label>Date of Incident:</label>
              <input type="date" className="form-control" name="date_incident" value={formValues.date_incident} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label>Time of Incident:</label>
              <input type="time" className="form-control" name="time_incident" value={formValues.time_incident} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label>Location:</label>
              <input type="text" className="form-control" name="place_of_incident" value={formValues.place_of_incident} onChange={handleChange} required />
            </div>
            <div className="col-md-12 text-center">
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditIncidentAccidentReport;
