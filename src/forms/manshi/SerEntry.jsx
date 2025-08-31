import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/manshi/SerEntryReducer";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json";

const SerEntry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SerF = useSelector((state) => state.Ser);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (SerF) {
      setSlug(SerF.slug);
    }
  }, [SerF]);

  const basicInitialValues = {
    date: formatDate(new Date().toDateString()),
    Name: "",
    station: "",
EmpID:"",
    DesignationDepartment: "",
    EntryDate: "",
    EntryTime: "",
    PurposeOfVisit: "",
    ExitDate: "",
    ExitTime: "",
    VisitorsSign: "",
    SignOnDuty: "",
    Remark: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/">
            SER ENTRY
          </Link>
          <Link underline="hover" color="inherit" to="/">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">SER Entry Register</h3>
              <div className="heading-line"></div>
            </div>
            {/* First Row: Name, Station, Designation/Department */}
            <div className="row mb-3">
               <div className="col-md-6">
                <label htmlFor="station">Station</label>
                <select
                  name=""
                  id=""
                  className="me-3 form-control"
                  value={formValues.station}
                  onChange={(e) =>
                    setFormValues({ ...formValues, station: e.target.value })
                  }
                >
                  <option value="">Select Station</option>
                  {stationData
                    .filter((station) => station["Station Name"]) // Exclude entries with null station names
                    .map((station) => (
                      <option
                        key={station["STATION Code"]}
                        value={station["Station Name"]}
                      >
                        {station["Station Name"]}
                      </option>
                    ))}
                </select>
              </div>
              </div>
<div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={formValues.Name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
             
              <div className="col-md-4">
                <label htmlFor="DesignationDepartment">Desig./Department</label>
                <input
                  type="text"
                  id="DesignationDepartment"
                  name="DesignationDepartment"
                  value={formValues.DesignationDepartment}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
               <div className="col-md-4">
                <label htmlFor="DesignationDepartment">EMP Id</label>
                <input
                  type="text"
                  id="DesignationDepartment"
                  name="EmpID"
                  value={formValues.EmpID}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Second Row: Entry Date, Entry Time, Purpose of Visit */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="EntryDate">Entry Date</label>
                <input
                  type="date"
                  id="EntryDate"
                  name="EntryDate"
                  value={formValues.EntryDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="EntryTime">Entry Time</label>
                <input
                  type="time"
                  id="EntryTime"
                  name="EntryTime"
                  value={formValues.EntryTime}
                  onChange={handleChange}
                  className="form-control"
                  step="1"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="PurposeOfVisit">Purpose of Visit</label>
                <input
                  type="text"
                  id="PurposeOfVisit"
                  name="PurposeOfVisit"
                  value={formValues.PurposeOfVisit}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Third Row: Exit Date, Exit Time */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="ExitDate">Exit Date</label>
                <input
                  type="date"
                  id="ExitDate"
                  name="ExitDate"
                  value={formValues.ExitDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="ExitTime">Exit Time</label>
                <input
                  type="time"
                  id="ExitTime"
                  name="ExitTime"
                  value={formValues.ExitTime}
                  onChange={handleChange}
                  className="form-control"
                  step="1"
                />
              </div>
            </div>

            {/* Fourth Row: Visitor's Name, Sign On Duty, Remark */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="VisitorsSign">Visitor's Name</label>
                <input
                  type="text"
                  id="VisitorsSign"
                  name="VisitorsSign"
                  value={formValues.VisitorsSign}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="SignOnDuty">Visitor ID</label>
                <input
                  type="text"
                  id="SignOnDuty"
                  name="SignOnDuty"
                  value={formValues.SignOnDuty}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="Remark">Remark</label>
                <input
                  type="text"
                  id="Remark"
                  name="Remark"
                  value={formValues.Remark}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-12 text-center pt-3">
              <button type="submit" className="btn btn-primary px-3">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SerEntry;
