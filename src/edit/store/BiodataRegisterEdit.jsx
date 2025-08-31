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
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const BiodataRegisterEdit = () => {
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
    <div className="container">
      <h2 className="text-center my-4">Bio Data Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Employee ID</label>
            <input type="text" className="form-control" name="empId" value={formValues.empId} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formValues.name} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="row">
        <div className="col-md-6 mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" name="dob" value={formValues.dob} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Gender</label>
            <select className="form-select" name="gender" value={formValues.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="row">
         
          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Joining (UPMRC)</label>
            <input type="date" className="form-control" name="dojUpmrc" value={formValues.dojUpmrc} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Joining (COET)</label>
            <input type="date" className="form-control" name="dojCoet" value={formValues.dojCoet} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
         
          <div className="col-md-6 mb-3">
            <label className="form-label">Project</label>
            <input type="text" className="form-control" name="project" value={formValues.project} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Department </label>
            <input type="text" className="form-control" name="department" value={formValues.department} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
         
          <div className="col-md-6 mb-3">
            <label className="form-label">Designation</label>
            <input type="text" className="form-control" name="designation" value={formValues.designation} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">From </label>
            <input type="text" className="form-control" name="from" value={formValues.from} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Working Project </label>
            <input type="text" className="form-control" name="workingProject" value={formValues.workingProject} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Working location</label>
            <input type="text" className="form-control" name="workingLocation" value={formValues.workingLocation} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Working Department </label>
            <input type="text" className="form-control" name="workingDepartment" value={formValues.workingDepartment} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Working Wing</label>
            <input type="text" className="form-control" name="workingWing" value={formValues.workingWing} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Working Post </label>
            <input type="text" className="form-control" name="workingPost" value={formValues.workingPost} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Working Posting Effective date</label>
            <input type="date" className="form-control" name="workingPostingDate" value={formValues.workingPostingDate} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Vacancy No. </label>
            <input type="text" className="form-control" name="vacancyNo" value={formValues.vacancyNo} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Father Name (Name Only)</label>
            <input type="text" className="form-control" name="fatherName" value={formValues.fatherName} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Vacancy No. </label>
            <input type="text" className="form-control" name="vacancyNo" value={formValues.vacancyNo} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Father Name (Name Only)</label>
            <input type="text" className="form-control" name="fatherName" value={formValues.fatherName} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Mother Name (Name Only) </label>
            <input type="text" className="form-control" name="motherName" value={formValues.motherName} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Blood Group</label>
            <input type="text" className="form-control" name="bloodGroup" value={formValues.bloodGroup} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Contact Number </label>
            <input type="text" className="form-control" name="contactNumber" value={formValues.contactNumber} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Emergency Contact No.</label>
            <input type="text" className="form-control" name="emergencyContact" value={formValues.emergencyContact} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Aadhar No </label>
            <input type="text" className="form-control" name="aadharNo" value={formValues.aadharNo} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Pan Card No.</label>
            <input type="text" className="form-control" name="panCardNo" value={formValues.panCardNo} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Email Id </label>
            <input type="email" className="form-control" name="email" value={formValues.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Permanent Address</label>
            <input type="text" className="form-control" name="permanentAddress" value={formValues.permanentAddress} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="form-label">Current Address  </label>
            <input type="text" className="form-control" name="currentAddress" value={formValues.currentAddress} onChange={handleChange} required />
          </div>
          
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Medical Type  </label>
            <input type="text" className="form-control" name="medicalType" value={formValues.medicalType} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Medical Date</label>
            <input type="date" className="form-control" name="medicalDate" value={formValues.medicalDate} onChange={handleChange} required />
          </div>
        </div>
        {/* Additional fields go here following the same pattern */}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>  );
};

export default BiodataRegisterEdit;
