import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

const CssShiftLogBookForm = () => {
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
    handoverTime: "",
    handoverReceived: "",
    systemStatus: {
      css: "OK",
      communications: "OK", 
      telephone: "OK",
      dataNetwork: "OK",
      alarms: "OK",
      powerSupply: "OK"
    },
    incidentsLogged: "",
    actionsTaken: "",
    equipmentIssues: "",
    maintenanceRequired: "",
    nextShiftInstructions: "",
    handoverNotes: "",
    remarks: "",
    verifiedBy: "",
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

  const handleSystemStatusChange = (systemName, status) => {
    setFormValues({
      ...formValues,
      systemStatus: {
        ...formValues.systemStatus,
        [systemName]: status
      }
    });
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
      title="CSS Shift Log Book"
      subtitle="Communication System Supervisor - Shift Log Book"
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
                label="Station"
                value={formValues.station}
                onChange={handleChange}
                options={stationData
                  .filter((station) => station["Station Name"])
                  .map((station) => ({
                    value: station["Station Name"],
                    label: station["Station Name"]
                  }))}
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

      {/* System Status */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-desktop me-2"></i>
            System Status Check
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            {Object.entries(formValues.systemStatus).map(([systemName, status]) => (
              <div key={systemName} className="col-md-6 col-lg-4 mb-3">
                <label className="form-label text-capitalize">
                  {systemName.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => handleSystemStatusChange(systemName, e.target.value)}
                >
                  <option value="OK">OK</option>
                  <option value="Not OK">Not OK</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                  <option value="Requires Attention">Requires Attention</option>
                  <option value="N/A">N/A</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Activities */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-clipboard-list me-2"></i>
            Operational Activities
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="incidentsLogged"
                label="Incidents Logged"
                value={formValues.incidentsLogged}
                onChange={handleChange}
                placeholder="Describe any incidents logged during shift"
                error={errors.incidentsLogged}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="actionsTaken"
                label="Actions Taken"
                value={formValues.actionsTaken}
                onChange={handleChange}
                placeholder="Describe actions taken during shift"
                error={errors.actionsTaken}
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
                placeholder="Report any equipment issues observed"
                error={errors.equipmentIssues}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="maintenanceRequired"
                label="Maintenance Required"
                value={formValues.maintenanceRequired}
                onChange={handleChange}
                placeholder="List any maintenance requirements"
                error={errors.maintenanceRequired}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Handover Information */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
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
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="time-only"
                name="handoverTime"
                label="Handover Time"
                value={formValues.handoverTime}
                onChange={handleChange}
                required
                error={errors.handoverTime}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="handoverReceived"
                label="Handover Received By"
                value={formValues.handoverReceived}
                onChange={handleChange}
                required
                error={errors.handoverReceived}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="nextShiftInstructions"
                label="Instructions for Next Shift"
                value={formValues.nextShiftInstructions}
                onChange={handleChange}
                placeholder="Instructions and important notes for next shift"
                error={errors.nextShiftInstructions}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="handoverNotes"
                label="Handover Notes"
                value={formValues.handoverNotes}
                onChange={handleChange}
                placeholder="Additional handover notes and observations"
                error={errors.handoverNotes}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Final Information */}
      <div className="row">
        <div className="col-md-6">
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
        <div className="col-md-3">
          <UniversalTelecomFormField
            type="text"
            name="verifiedBy"
            label="Verified By"
            value={formValues.verifiedBy}
            onChange={handleChange}
            error={errors.verifiedBy}
          />
        </div>
        <div className="col-md-3">
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
    </TelecomFormLayout>
  );
};

export default CssShiftLogBookForm;