import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";
import { validateForm } from "../validation";
import { formatDate } from "../../../data/formatDate";
import { addData } from "../../../reducer/manshi/DailyTelecomReducer"; // Will create specific reducer later
import stationData from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const InstructionShiftLogBookForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: formatDate(new Date().toDateString()),
    station: "",
    shift: "",
    empName: "",
    empId: "",
    startTime: "",
    endTime: "",
    instructionReceived: [
      {
        id: 1,
        time: "",
        from: "",
        instruction: "",
        priority: "Medium",
        acknowledged: false,
        completionStatus: "Pending"
      }
    ],
    instructionIssued: [
      {
        id: 1,
        time: "",
        to: "",
        instruction: "",
        priority: "Medium",
        acknowledged: false,
        completionStatus: "Pending"
      }
    ],
    operationalUpdates: "",
    systemStatus: "",
    equipmentIssues: "",
    safetyInstructions: "",
    emergencyActions: "",
    handoverNotes: "",
    nextShiftInstructions: "",
    remarks: "",
    verifiedBy: "",
    supervisorApproval: "",
    signature: "",
    employee_id: "",
    department: "s&t",
    unit: "Telecom",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleInstructionChange = (type, index, field, value) => {
    const updatedInstructions = [...formValues[type]];
    updatedInstructions[index] = { ...updatedInstructions[index], [field]: value };
    setFormValues({ ...formValues, [type]: updatedInstructions });
  };

  const addInstruction = (type) => {
    const newInstruction = {
      id: formValues[type].length + 1,
      time: "",
      [type === 'instructionReceived' ? 'from' : 'to']: "",
      instruction: "",
      priority: "Medium",
      acknowledged: false,
      completionStatus: "Pending"
    };
    setFormValues({
      ...formValues,
      [type]: [...formValues[type], newInstruction]
    });
  };

  const removeInstruction = (type, index) => {
    if (formValues[type].length > 1) {
      const updatedInstructions = formValues[type].filter((_, i) => i !== index);
      setFormValues({ ...formValues, [type]: updatedInstructions });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // Validate form
      const formErrors = validateForm('logBook', formValues);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        setLoading(false);
        return;
      }
      
      await dispatch(addData(formValues));
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error('Error saving form:', error);
      setErrors({ submit: 'Error saving form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout 
      title="Instruction Shift Log Book"
      subtitle="Telecom Department - Instruction & Communication Log"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {errors.submit && (
        <div className="alert alert-danger mb-3">
          {errors.submit}
        </div>
      )}
      
      {/* Basic Information */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h6 className="mb-0">
            <i className="fas fa-info-circle me-2"></i>
            Shift Information
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="date"
                name="date"
                label="Date"
                value={formValues.date}
                onChange={handleChange}
                required
                error={errors.date}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="custom-select"
                name="station"
                label="Station/Location"
                value={formValues.station}
                onChange={handleChange}
                options={[
                  { value: "OCC", label: "OCC" },
                  { value: "BCC", label: "BCC" },
                  { value: "Depot", label: "Depot" },
                  ...stationData
                    .filter((station) => station["Station Name"])
                    .map((station) => ({
                      value: station["Station Name"],
                      label: station["Station Name"]
                    }))
                ]}
                required
                error={errors.station}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="shift-type"
                name="shift"
                label="Shift"
                value={formValues.shift}
                onChange={handleChange}
                required
                error={errors.shift}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="empName"
                label="Employee Name"
                value={formValues.empName}
                onChange={handleChange}
                required
                error={errors.empName}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="employee-id"
                name="empId"
                label="Employee ID"
                value={formValues.empId}
                onChange={handleChange}
                required
                error={errors.empId}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="time-only"
                name="startTime"
                label="Shift Start Time"
                value={formValues.startTime}
                onChange={handleChange}
                required
                error={errors.startTime}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Received */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-download me-2"></i>
            Instructions Received
          </h6>
          <button 
            type="button" 
            className="btn btn-light btn-sm"
            onClick={() => addInstruction('instructionReceived')}
          >
            <i className="fas fa-plus me-1"></i>
            Add Instruction
          </button>
        </div>
        <div className="card-body">
          {formValues.instructionReceived.map((instruction, index) => (
            <div key={instruction.id} className="row mb-3 pb-3 border-bottom">
              <div className="col-md-2">
                <UniversalTelecomFormField
                  type="time-only"
                  name={`receivedTime${index}`}
                  label="Time"
                  value={instruction.time}
                  onChange={(e) => handleInstructionChange('instructionReceived', index, 'time', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                <UniversalTelecomFormField
                  type="text"
                  name={`from${index}`}
                  label="From"
                  value={instruction.from}
                  onChange={(e) => handleInstructionChange('instructionReceived', index, 'from', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <UniversalTelecomFormField
                  type="textarea"
                  name={`receivedInstruction${index}`}
                  label="Instruction Details"
                  value={instruction.instruction}
                  onChange={(e) => handleInstructionChange('instructionReceived', index, 'instruction', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                <UniversalTelecomFormField
                  type="priority-level"
                  name={`receivedPriority${index}`}
                  label="Priority"
                  value={instruction.priority}
                  onChange={(e) => handleInstructionChange('instructionReceived', index, 'priority', e.target.value)}
                />
              </div>
              <div className="col-md-1">
                <label className="form-label">Status</label>
                <select 
                  className="form-select"
                  value={instruction.completionStatus}
                  onChange={(e) => handleInstructionChange('instructionReceived', index, 'completionStatus', e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Escalated">Escalated</option>
                </select>
              </div>
              <div className="col-md-1">
                {formValues.instructionReceived.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-danger btn-sm mt-4"
                    onClick={() => removeInstruction('instructionReceived', index)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions Issued */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-upload me-2"></i>
            Instructions Issued
          </h6>
          <button 
            type="button" 
            className="btn btn-light btn-sm"
            onClick={() => addInstruction('instructionIssued')}
          >
            <i className="fas fa-plus me-1"></i>
            Add Instruction
          </button>
        </div>
        <div className="card-body">
          {formValues.instructionIssued.map((instruction, index) => (
            <div key={instruction.id} className="row mb-3 pb-3 border-bottom">
              <div className="col-md-2">
                <UniversalTelecomFormField
                  type="time-only"
                  name={`issuedTime${index}`}
                  label="Time"
                  value={instruction.time}
                  onChange={(e) => handleInstructionChange('instructionIssued', index, 'time', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                <UniversalTelecomFormField
                  type="text"
                  name={`to${index}`}
                  label="To"
                  value={instruction.to}
                  onChange={(e) => handleInstructionChange('instructionIssued', index, 'to', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <UniversalTelecomFormField
                  type="textarea"
                  name={`issuedInstruction${index}`}
                  label="Instruction Details"
                  value={instruction.instruction}
                  onChange={(e) => handleInstructionChange('instructionIssued', index, 'instruction', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                <UniversalTelecomFormField
                  type="priority-level"
                  name={`issuedPriority${index}`}
                  label="Priority"
                  value={instruction.priority}
                  onChange={(e) => handleInstructionChange('instructionIssued', index, 'priority', e.target.value)}
                />
              </div>
              <div className="col-md-1">
                <label className="form-label">Status</label>
                <select 
                  className="form-select"
                  value={instruction.completionStatus}
                  onChange={(e) => handleInstructionChange('instructionIssued', index, 'completionStatus', e.target.value)}
                >
                  <option value="Issued">Issued</option>
                  <option value="Acknowledged">Acknowledged</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Follow-up Required">Follow-up Required</option>
                </select>
              </div>
              <div className="col-md-1">
                {formValues.instructionIssued.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-danger btn-sm mt-4"
                    onClick={() => removeInstruction('instructionIssued', index)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Information */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-clipboard-list me-2"></i>
            Operational Information
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="operationalUpdates"
                label="Operational Updates"
                value={formValues.operationalUpdates}
                onChange={handleChange}
                placeholder="Important operational updates and status changes"
                error={errors.operationalUpdates}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="systemStatus"
                label="System Status"
                value={formValues.systemStatus}
                onChange={handleChange}
                placeholder="Current status of all systems and equipment"
                error={errors.systemStatus}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="equipmentIssues"
                label="Equipment Issues"
                value={formValues.equipmentIssues}
                onChange={handleChange}
                placeholder="Any equipment issues or maintenance requirements"
                error={errors.equipmentIssues}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="safetyInstructions"
                label="Safety Instructions"
                value={formValues.safetyInstructions}
                onChange={handleChange}
                placeholder="Safety-related instructions and precautions"
                error={errors.safetyInstructions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Handover Information */}
      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">
          <h6 className="mb-0">
            <i className="fas fa-handshake me-2"></i>
            Shift Handover
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="time-only"
                name="endTime"
                label="Shift End Time"
                value={formValues.endTime}
                onChange={handleChange}
                required
                error={errors.endTime}
              />
            </div>
            <div className="col-md-8">
              <UniversalTelecomFormField
                type="textarea"
                name="emergencyActions"
                label="Emergency Actions (if any)"
                value={formValues.emergencyActions}
                onChange={handleChange}
                placeholder="Any emergency actions taken during the shift"
                error={errors.emergencyActions}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="handoverNotes"
                label="Handover Notes"
                value={formValues.handoverNotes}
                onChange={handleChange}
                placeholder="Important notes for the next shift"
                error={errors.handoverNotes}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="nextShiftInstructions"
                label="Instructions for Next Shift"
                value={formValues.nextShiftInstructions}
                onChange={handleChange}
                placeholder="Specific instructions and follow-ups for next shift"
                error={errors.nextShiftInstructions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Final Information */}
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="text"
            name="verifiedBy"
            label="Verified By"
            value={formValues.verifiedBy}
            onChange={handleChange}
            error={errors.verifiedBy}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="text"
            name="supervisorApproval"
            label="Supervisor Approval"
            value={formValues.supervisorApproval}
            onChange={handleChange}
            error={errors.supervisorApproval}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="text"
            name="signature"
            label="Signature"
            value={formValues.signature}
            onChange={handleChange}
            placeholder="Digital signature or initials"
            error={errors.signature}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <UniversalTelecomFormField
            type="textarea"
            name="remarks"
            label="General Remarks"
            value={formValues.remarks}
            onChange={handleChange}
            placeholder="Any additional remarks or observations"
            error={errors.remarks}
          />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default InstructionShiftLogBookForm;