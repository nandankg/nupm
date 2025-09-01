import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const TerEntryRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    s_no: 1,
    date: "",
    name: "",
    emp_id: "",
    desg: "",
    e_time: "",
    purpose: "",
    ex_time: "",
    V_sign: "",
    D_sign: "",
    remark: "",
    employee_id: "",
    department: "Telecom",
    unit: "",
    station: "",
    telecomSystem: "",
    accessLevel: "",
    equipmentAccessed: "",
    safetyProtocol: "",
    workPermitNumber: "",
    supervisorApproval: "",
    emergencyContact: "",
    toolsCarried: "",
    workDescription: "",
    completionStatus: "",
    notes: ""
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formValues.date) {
      errors.date = "Date is required";
    }
    
    if (!formValues.name) {
      errors.name = "Name is required";
    }

    if (!formValues.emp_id) {
      errors.emp_id = "Employee ID is required";
    }

    if (formValues.e_time && formValues.ex_time) {
      const entryTime = new Date(`1970-01-01T${formValues.e_time}`);
      const exitTime = new Date(`1970-01-01T${formValues.ex_time}`);
      if (exitTime <= entryTime) {
        errors.ex_time = "Exit time must be after entry time";
      }
    }

    if (formValues.name && formValues.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (formValues.emp_id && formValues.emp_id.trim().length < 1) {
      errors.emp_id = "Employee ID cannot be empty";
    }

    if (formValues.purpose && formValues.purpose.trim().length < 3) {
      errors.purpose = "Purpose must be at least 3 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      navigate("/list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout title="TER Entry Register - Telecom Systems" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4 border-bottom pb-3">
        <h3 className="text-primary">TER ENTRY REGISTER - TELECOM SYSTEMS</h3>
        <h5 className="text-secondary">Technical Equipment Room Access Control</h5>
        <p className="text-muted">Authorized Personnel Entry & Activity Tracking</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="date" 
            name="date" 
            label="Date" 
            value={formValues.date} 
            onChange={handleChange} 
            required 
            error={formErrors.date}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="location-type" 
            name="station" 
            label="Station/Location" 
            value={formValues.station} 
            onChange={handleChange} 
            required 
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Personnel Information</h5>
      <div className="row">
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="name" 
            label="Name" 
            placeholder="Enter Name" 
            value={formValues.name} 
            onChange={handleChange} 
            required 
            error={formErrors.name}
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="employee-id" 
            name="emp_id" 
            label="Emp.No./ID No." 
            placeholder="Enter ID" 
            value={formValues.emp_id} 
            onChange={handleChange} 
            required 
            error={formErrors.emp_id}
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="desg" 
            label="Designation/ Department" 
            placeholder="Enter Designation" 
            value={formValues.desg} 
            onChange={handleChange} 
            error={formErrors.desg}
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="emergencyContact" 
            label="Emergency Contact" 
            placeholder="Contact Number" 
            value={formValues.emergencyContact} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Access Details</h5>
      <div className="row">
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="time" 
            name="e_time" 
            label="Entry Time" 
            value={formValues.e_time} 
            onChange={handleChange} 
            error={formErrors.e_time}
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="time" 
            name="ex_time" 
            label="Exit Time" 
            value={formValues.ex_time} 
            onChange={handleChange} 
            error={formErrors.ex_time}
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="accessLevel" 
            label="Access Level" 
            placeholder="e.g., Level 1, Level 2, Restricted" 
            value={formValues.accessLevel} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="workPermitNumber" 
            label="Work Permit Number" 
            placeholder="Permit/Authorization No." 
            value={formValues.workPermitNumber} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Work & System Details</h5>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="telecom-system" 
            name="telecomSystem" 
            label="Telecom System Accessed" 
            value={formValues.telecomSystem} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="text" 
            name="equipmentAccessed" 
            label="Specific Equipment Accessed" 
            placeholder="Equipment details" 
            value={formValues.equipmentAccessed} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="purpose" 
            label="Purpose of Visit" 
            placeholder="Detailed work description" 
            value={formValues.purpose} 
            onChange={handleChange} 
            error={formErrors.purpose}
            rows={3}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="workDescription" 
            label="Work Description" 
            placeholder="Detailed work performed" 
            value={formValues.workDescription} 
            onChange={handleChange} 
            rows={3}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="toolsCarried" 
            label="Tools & Equipment Carried" 
            placeholder="List of tools and equipment" 
            value={formValues.toolsCarried} 
            onChange={handleChange} 
            rows={3}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="safetyProtocol" 
            label="Safety Protocol Followed" 
            placeholder="Safety measures taken" 
            value={formValues.safetyProtocol} 
            onChange={handleChange} 
            rows={3}
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Authorization & Supervision</h5>
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField 
            type="text" 
            name="V_sign" 
            label="Visitor's Name" 
            value={formValues.V_sign} 
            onChange={handleChange} 
            error={formErrors.V_sign}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField 
            type="text" 
            name="D_sign" 
            label="Name on Duty" 
            value={formValues.D_sign} 
            onChange={handleChange} 
            error={formErrors.D_sign}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField 
            type="text" 
            name="supervisorApproval" 
            label="Supervisor Approval" 
            placeholder="Supervisor signature/approval" 
            value={formValues.supervisorApproval} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Work Status & Completion</h5>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="text" 
            name="completionStatus" 
            label="Work Completion Status" 
            placeholder="e.g., Completed, Partial, Pending" 
            value={formValues.completionStatus} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-6">
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="remark" 
            label="Remarks" 
            placeholder="Additional remarks" 
            value={formValues.remark} 
            onChange={handleChange} 
            error={formErrors.remark}
            rows={4}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="notes" 
            label="Additional Notes" 
            placeholder="Any additional observations" 
            value={formValues.notes} 
            onChange={handleChange} 
            rows={4}
          />
        </div>
      </div>

      <div className="row mb-3 mt-4">
        <div className="col-md-12">
          <div className="alert alert-info" role="alert">
            <strong>TER Safety Notice:</strong> All personnel entering Technical Equipment Room must follow authorized safety protocols and maintain equipment security standards.
          </div>
        </div>
      </div>

      <input type="hidden" name="s_no" value={formValues.s_no} />
      <input type="hidden" name="employee_id" value={formValues.employee_id} />
      <input type="hidden" name="department" value={formValues.department} />
      <input type="hidden" name="unit" value={formValues.unit} />
    </TelecomFormLayout>
  );
};

export default TerEntryRegisterForm;