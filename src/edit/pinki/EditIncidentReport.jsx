import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { editData, fetchData } from "../../reducer/pinki/IncidentAccidentReportReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditIncidentReport = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const incidentreport = useSelector((state) => state.incidentaccidentreport);
  console.log(incidentreport.data.data);
  const [items, setItems] = useState([]);
    const [slug, setSlug] = useState(getLastParameter().trim());
  const itmm = incidentreport.data.data;
  console.log(id)
  console.log(itmm)
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
    dispatch(fetchData());
    setItems(incidentreport.data.data);
  }, [dispatch]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const fd = filteredData[0];

  useEffect(() => {
    if (fd) {
      setFormValues(fd);
    }
  }, [fd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleArrayChange = (index, value, field) => {
    const updatedArray = [...formValues[field]];
    updatedArray[index] = value;
    setFormValues({ ...formValues, [field]: updatedArray });
  };
  const ResponsibleDepartment =["Rolling Stock",
    "Signalling",
    "Telecom",
    "AFC",
    "Civil",
    "Track",
    "Traction-PSI",
    "Traction-OHE",
    "E&M",
    "Operations",
    "Security",
    "Rolling Stock/Signalling",
    "Rolling Stock/Track",
    "Telecom/Signalling",
    "E&M/Civil",
    "Rolling Stock/Operations",
    "Rolling Stock/Traction-OHE",
    "Traction-Telecom",
    "Traction- SCADA",
    "Rolling Stock/Signalling/Operations",
    "Telecom-SCADA",
    "Signalling/Traction-SCADA",
    "Rolling Stock/Telecom",
    "E&M / Telecom",
    "Civil / Telecom",
    "Signalling/P-Way",
    "Others"
    
    ]
  const addArrayField = (field) => {
    setFormValues({ ...formValues, [field]: [...formValues[field], ""] });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
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
            <div className="col-md-6">
                <label htmlFor="inputdetails" className="form-label">
                  Train Details:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdetails"
                    name="tdetails"
                  value={formValues.tdetails}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputname" className="form-label">
                  Name of SCTO:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputname"
                    name="name_of_scto"
                  value={formValues.name_of_scto}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputempid" className="form-label">
                  Emp Id of SCTO:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputempid"
                   name="empid_of_scto"
                  value={formValues.empid_of_scto}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputreason" className="form-label">
                  Reason
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputreason"
                    name="reason"
                  value={formValues.reason}
                  onChange={handleChange}
                />
              </div>
              
            <div className="col-md-12">
              <label>Brief:</label>
              {formValues.brief.map((item, index) => (
                <div key={index} className="mb-2">
                  <textarea className="form-control" value={item} onChange={(e) => handleArrayChange(index, e.target.value, "brief")} />
                </div>
              ))}
              <button type="button" className="btn btn-success" onClick={() => addArrayField("brief")}>+</button>
            </div>
            <div className="col-md-12">
              <label>Repercussion:</label>
              {formValues.repercussion.map((item, index) => (
                <div key={index} className="mb-2">
                  <textarea className="form-control" value={item} onChange={(e) => handleArrayChange(index, e.target.value, "repercussion")} />
                </div>
              ))}
              <button type="button" className="btn btn-success" onClick={() => addArrayField("repercussion")}>+</button>
            </div>
            <div className="col-md-12">
                <label htmlFor="inputresdep" className="form-label">
                  Responsible Department:
                </label>
                <select
                  
                  className="form-control"
                  id="inputresdep"
                    name="responsible_depart"
                  value={formValues.responsible_depart}
                  onChange={handleChange}
                >
                  <option value="">Please Select</option>
                  {ResponsibleDepartment.map((rd,idx)=>(
                    <option value={rd}>{rd}</option>
                  ))}
                  </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputsign" className="form-label">
                Name of TC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputsign"
                  name="sign_of_tc_acc"
                  value={formValues.sign_of_tc_acc}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputsign" className="form-label">
                EMP ID of TC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputsign"
                  name="unit"
                  value={formValues.unit}
                  onChange={handleChange}
                />
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

export default EditIncidentReport;
