import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/redux/tableDataSlice";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const BioDataRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const PMsheetMonthlyList = useSelector((state) => state.data);
  const [formData, setFormData] = useState({
    empId: "",
    photo: "",
    name: "",
    gender: "",
    dob: "",
    dojUpmrc: "",
    dojCoet: "",
    project: "",
    department: "",
    designation: "",
    from: "",
    workingProject: "",
    workingLocation: "",
    workingDepartment: "",
    workingWing: "",
    workingPost: "",
    workingPostingDate: "",
    vacancyNo: "",
    fatherName: "",
    motherName: "",
    bloodGroup: "",
    contactNumber: "",
    emergencyContact: "",
    aadharNo: "",
    panCardNo: "",
    email: "",
    permanentAddress: "",
    currentAddress: "",
    medicalType: "",
    medicalDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(addData({formType:slug,values:formData}));
       console.log("Form Data Submitted:", formData);
       navigate(`/list/${slug}`);
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Bio Data Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Employee ID</label>
            <input type="text" className="form-control" name="empId" value={formData.empId} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="row">
        <div className="col-md-6 mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Gender</label>
            <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
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
            <input type="date" className="form-control" name="dojUpmrc" value={formData.dojUpmrc} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Joining (COET)</label>
            <input type="date" className="form-control" name="dojCoet" value={formData.dojCoet} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
         
          <div className="col-md-6 mb-3">
            <label className="form-label">Project</label>
            <input type="text" className="form-control" name="project" value={formData.project} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Department </label>
            <input type="text" className="form-control" name="department" value={formData.department} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
         
          <div className="col-md-6 mb-3">
            <label className="form-label">Designation</label>
            <input type="text" className="form-control" name="designation" value={formData.designation} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">From </label>
            <input type="text" className="form-control" name="from" value={formData.from} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Working Project </label>
            <input type="text" className="form-control" name="workingProject" value={formData.workingProject} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Working location</label>
            <input type="text" className="form-control" name="workingLocation" value={formData.workingLocation} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Working Department </label>
            <input type="text" className="form-control" name="workingDepartment" value={formData.workingDepartment} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Working Wing</label>
            <input type="text" className="form-control" name="workingWing" value={formData.workingWing} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Working Post </label>
            <input type="text" className="form-control" name="workingPost" value={formData.workingPost} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Working Posting Effective date</label>
            <input type="date" className="form-control" name="workingPostingDate" value={formData.workingPostingDate} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Vacancy No. </label>
            <input type="text" className="form-control" name="vacancyNo" value={formData.vacancyNo} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Father Name (Name Only)</label>
            <input type="text" className="form-control" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
          </div>
        </div>
       
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Mother Name (Name Only) </label>
            <input type="text" className="form-control" name="motherName" value={formData.motherName} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Blood Group</label>
            <input type="text" className="form-control" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Contact Number </label>
            <input type="text" className="form-control" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Emergency Contact No.</label>
            <input type="text" className="form-control" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Aadhar No </label>
            <input type="text" className="form-control" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Pan Card No.</label>
            <input type="text" className="form-control" name="panCardNo" value={formData.panCardNo} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Email Id </label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Permanent Address</label>
            <input type="text" className="form-control" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="form-label">Current Address  </label>
            <input type="text" className="form-control" name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />
          </div>
          
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Medical Type  </label>
            <input type="text" className="form-control" name="medicalType" value={formData.medicalType} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Medical Date</label>
            <input type="date" className="form-control" name="medicalDate" value={formData.medicalDate} onChange={handleChange} required />
          </div>
        </div>
        {/* Additional fields go here following the same pattern */}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default BioDataRegister;
