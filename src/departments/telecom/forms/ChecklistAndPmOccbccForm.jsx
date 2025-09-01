import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";
import { validateForm } from "../validation";
import { formatDate } from "../../../data/formatDate";
import { addData } from "../../../reducer/manshi/DailyTelecomReducer";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const ChecklistAndPmOccbccForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    systems: [
      {
        id: 1,
        name: "OCC Control Systems",
        activities: [
          {
            id: 1,
            label: "Check OCC workstation functionality",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify SCADA system operation",
            checked: "no",
          },
          {
            id: 3,
            label: "Check communication with all stations",
            checked: "no",
          },
          {
            id: 4,
            label: "Verify video wall display systems",
            checked: "no",
          },
          {
            id: 5,
            label: "Check backup control room readiness",
            checked: "no",
          },
        ],
      },
      {
        id: 2,
        name: "Communication Networks",
        activities: [
          {
            id: 1,
            label: "Check fiber optic network status",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify radio communication systems",
            checked: "no",
          },
          {
            id: 3,
            label: "Check telephone and intercom systems",
            checked: "no",
          },
          {
            id: 4,
            label: "Verify emergency communication channels",
            checked: "no",
          },
        ],
      },
      {
        id: 3,
        name: "Data Centers & Servers",
        activities: [
          {
            id: 1,
            label: "Check server room temperature and humidity",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify server operational status",
            checked: "no",
          },
          {
            id: 3,
            label: "Check storage system performance",
            checked: "no",
          },
          {
            id: 4,
            label: "Verify backup system functionality",
            checked: "no",
          },
          {
            id: 5,
            label: "Check network switch and router status",
            checked: "no",
          },
        ],
      },
      {
        id: 4,
        name: "Surveillance Systems",
        activities: [
          {
            id: 1,
            label: "Check CCTV central monitoring system",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify recording servers operation",
            checked: "no",
          },
          {
            id: 3,
            label: "Check camera feeds from all stations",
            checked: "no",
          },
          {
            id: 4,
            label: "Verify storage capacity and retention",
            checked: "no",
          },
        ],
      },
      {
        id: 5,
        name: "Power & UPS Systems",
        activities: [
          {
            id: 1,
            label: "Check main power supply status",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify UPS system operation",
            checked: "no",
          },
          {
            id: 3,
            label: "Check generator backup system",
            checked: "no",
          },
          {
            id: 4,
            label: "Verify power distribution status",
            checked: "no",
          },
          {
            id: 5,
            label: "Check battery backup systems",
            checked: "no",
          },
        ],
      },
      {
        id: 6,
        name: "Environmental Controls",
        activities: [
          {
            id: 1,
            label: "Check air conditioning systems",
            checked: "no",
          },
          {
            id: 2,
            label: "Monitor temperature in control rooms",
            checked: "no",
          },
          {
            id: 3,
            label: "Check ventilation systems",
            checked: "no",
          },
          {
            id: 4,
            label: "Verify fire suppression systems",
            checked: "no",
          },
        ],
      },
      {
        id: 7,
        name: "Security Systems",
        activities: [
          {
            id: 1,
            label: "Check access control systems",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify intrusion detection systems",
            checked: "no",
          },
          {
            id: 3,
            label: "Check perimeter security systems",
            checked: "no",
          },
          {
            id: 4,
            label: "Verify emergency response systems",
            checked: "no",
          },
        ],
      },
      {
        id: 8,
        name: "BCC Backup Systems",
        activities: [
          {
            id: 1,
            label: "Check BCC readiness status",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify data synchronization with OCC",
            checked: "no",
          },
          {
            id: 3,
            label: "Check backup communication links",
            checked: "no",
          },
          {
            id: 4,
            label: "Verify failover mechanisms",
            checked: "no",
          },
        ],
      },
    ],
    date: formatDate(new Date().toDateString()),
    location: "",
    shift: "",
    empName: "",
    empId: "",
    checkTime: "",
    occTemperature: "",
    bccTemperature: "",
    serverRoomTemp: "",
    systemAlarms: "",
    networkStatus: "",
    criticalIssues: "",
    actionsTaken: "",
    maintenanceRequired: "",
    nextCheckTime: "",
    remarks: "",
    verifiedBy: "",
    supervisorName: "",
    signature: "",
    employee_id: "",
    department: "s&t",
    unit: "Telecom",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const toggleCheckbox = (systemId, activityId) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              checked: activity.checked === "yes" ? "no" : "yes",
            };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const toggleAllCheckboxes = (systemId, checked) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => ({
          ...activity,
          checked: checked ? "yes" : "no",
        }));
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
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
      title="Daily Telecom Maintenance Checklist (OCC & BCC)"
      subtitle="Tele System Daily Check List Register (OCC & BCC)"
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
            Control Center Information
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
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
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="location-type"
                name="location"
                label="Location"
                value={formValues.location}
                onChange={handleChange}
                required
                error={errors.location}
              />
            </div>
            <div className="col-md-3">
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
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="time-only"
                name="checkTime"
                label="Check Time"
                value={formValues.checkTime}
                onChange={handleChange}
                required
                error={errors.checkTime}
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
                type="text"
                name="supervisorName"
                label="Supervisor Name"
                value={formValues.supervisorName}
                onChange={handleChange}
                error={errors.supervisorName}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Readings */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-thermometer-half me-2"></i>
            Environmental Readings
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="temperature-reading"
                name="occTemperature"
                label="OCC Temperature (°C)"
                value={formValues.occTemperature}
                onChange={handleChange}
                error={errors.occTemperature}
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="temperature-reading"
                name="bccTemperature"
                label="BCC Temperature (°C)"
                value={formValues.bccTemperature}
                onChange={handleChange}
                error={errors.bccTemperature}
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="temperature-reading"
                name="serverRoomTemp"
                label="Server Room Temperature (°C)"
                value={formValues.serverRoomTemp}
                onChange={handleChange}
                required
                error={errors.serverRoomTemp}
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="maintenance-status"
                name="networkStatus"
                label="Network Status"
                value={formValues.networkStatus}
                onChange={handleChange}
                required
                error={errors.networkStatus}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Systems Checklist */}
      {formValues.systems.map((system) => (
        <div key={system.id} className="card mb-4">
          <div className="card-header bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold text-primary">
                <i className="fas fa-server me-2"></i>
                {system.name}
              </h6>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={system.activities.every((a) => a.checked === "yes")}
                  onChange={(e) => toggleAllCheckboxes(system.id, e.target.checked)}
                  id={`selectAll${system.id}`}
                />
                <label className="form-check-label text-muted" htmlFor={`selectAll${system.id}`}>
                  Select All
                </label>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              {system.activities.map((activity, index) => (
                <div className="col-md-6" key={activity.id}>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={activity.checked === "yes"}
                      onChange={() => toggleCheckbox(system.id, activity.id)}
                      id={`activity${system.id}_${activity.id}`}
                    />
                    <label 
                      className="form-check-label" 
                      htmlFor={`activity${system.id}_${activity.id}`}
                    >
                      <strong>{index + 1}.</strong> {activity.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Status & Issues */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-exclamation-triangle me-2"></i>
            System Status & Issues
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="systemAlarms"
                label="System Alarms"
                value={formValues.systemAlarms}
                onChange={handleChange}
                placeholder="List any system alarms or warnings"
                error={errors.systemAlarms}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="criticalIssues"
                label="Critical Issues"
                value={formValues.criticalIssues}
                onChange={handleChange}
                placeholder="Report any critical issues requiring immediate attention"
                error={errors.criticalIssues}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="actionsTaken"
                label="Actions Taken"
                value={formValues.actionsTaken}
                onChange={handleChange}
                placeholder="Describe corrective actions taken during check"
                error={errors.actionsTaken}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="maintenanceRequired"
                label="Maintenance Required"
                value={formValues.maintenanceRequired}
                onChange={handleChange}
                placeholder="List any maintenance activities required"
                error={errors.maintenanceRequired}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Final Information */}
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="date-time"
            name="nextCheckTime"
            label="Next Check Time"
            value={formValues.nextCheckTime}
            onChange={handleChange}
            error={errors.nextCheckTime}
          />
        </div>
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
            placeholder="Any additional observations, recommendations, or remarks"
            error={errors.remarks}
          />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default ChecklistAndPmOccbccForm;