import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const UpsRoomEntryForm = () => {
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
    upsSystemAccessed: "",
    batteryRoomAccess: "",
    safetyEquipment: "",
    workPermitNumber: "",
    supervisorApproval: "",
    emergencyContact: "",
    toolsCarried: "",
    workDescription: "",
    completionStatus: "",
    powerSystemStatus: "",
    batteryVoltageCheck: "",
    alarmStatus: "",
    temperatureReading: "",
    ventilationCheck: "",
    fireSuppressionCheck: "",
    accessCardUsed: "",
    accompaniedBy: "",
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

    if (formValues.purpose && !formValues.purpose.toLowerCase().includes("maintenance") && !formValues.purpose.toLowerCase().includes("inspection") && !formValues.purpose.toLowerCase().includes("authorized")) {
      errors.purpose = "Purpose should specify maintenance, inspection, or authorized work";
    }

    if (formValues.name && formValues.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (formValues.emp_id && formValues.emp_id.trim().length < 1) {
      errors.emp_id = "Employee ID cannot be empty";
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
    <TelecomFormLayout title="UPS Room Entry Register - Telecom Power Systems" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4 border-bottom pb-3">
        <h3 className="text-primary">UPS ROOM ENTRY REGISTER - TELECOM POWER SYSTEMS</h3>
        <h5 className="text-secondary">Power System Access Control & Safety Monitoring</h5>
        <p className="text-muted">Authorized Personnel Entry & UPS Facility Management</p>
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

      <h5 className="mt-4 text-primary border-bottom pb-2">Access & Entry Details</h5>
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
            name="accessCardUsed" 
            label="Access Card Used" 
            placeholder="Card Number" 
            value={formValues.accessCardUsed} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="accompaniedBy" 
            label="Accompanied By" 
            placeholder="Supervisor/Authorized Personnel" 
            value={formValues.accompaniedBy} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="text" 
            name="workPermitNumber" 
            label="Work Permit Number" 
            placeholder="Permit/Authorization No." 
            value={formValues.workPermitNumber} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="text" 
            name="safetyEquipment" 
            label="Safety Equipment Used" 
            placeholder="PPE, Safety gear used" 
            value={formValues.safetyEquipment} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">UPS System & Work Details</h5>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="text" 
            name="upsSystemAccessed" 
            label="UPS System Accessed" 
            placeholder="UPS1, UPS2, Battery Bank, etc." 
            value={formValues.upsSystemAccessed} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="checkbox" 
            name="batteryRoomAccess" 
            label="Battery Room Access Required" 
            value={formValues.batteryRoomAccess === "yes"} 
            onChange={(e) => setFormValues({...formValues, batteryRoomAccess: e.target.checked ? "yes" : "no"})} 
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="purpose" 
            label="Purpose of Visit" 
            placeholder="e.g., UPS Maintenance, Battery Inspection, Power monitoring" 
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
            placeholder="List of tools and test equipment" 
            value={formValues.toolsCarried} 
            onChange={handleChange} 
            rows={3}
          />
        </div>
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
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">System Status & Readings</h5>
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField 
            type="text" 
            name="powerSystemStatus" 
            label="Power System Status" 
            placeholder="Normal/Alarm/Fault" 
            value={formValues.powerSystemStatus} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField 
            type="voltage-reading" 
            name="batteryVoltageCheck" 
            label="Battery Voltage Check" 
            value={formValues.batteryVoltageCheck} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField 
            type="text" 
            name="alarmStatus" 
            label="Alarm Status" 
            placeholder="No Alarms/Active Alarms" 
            value={formValues.alarmStatus} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField 
            type="temperature-reading" 
            name="temperatureReading" 
            label="Room Temperature" 
            value={formValues.temperatureReading} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField 
            type="text" 
            name="ventilationCheck" 
            label="Ventilation Check" 
            placeholder="OK/Issue" 
            value={formValues.ventilationCheck} 
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField 
            type="text" 
            name="fireSuppressionCheck" 
            label="Fire Suppression Check" 
            placeholder="System Status" 
            value={formValues.fireSuppressionCheck} 
            onChange={handleChange} 
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

      <h5 className="mt-4 text-primary border-bottom pb-2">Additional Information</h5>
      <div className="row">
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
            placeholder="Observations, recommendations" 
            value={formValues.notes} 
            onChange={handleChange} 
            rows={4}
          />
        </div>
      </div>

      <div className="row mb-3 mt-4">
        <div className="col-md-12">
          <div className="alert alert-warning" role="alert">
            <strong>UPS Room Safety Notice:</strong> Authorized personnel only. Follow all electrical safety protocols. Maintain proper ventilation and ensure fire safety systems are operational. Report any anomalies immediately.
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

export default UpsRoomEntryForm;