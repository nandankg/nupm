import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";
import { validateForm } from "../validation";
import { formatDate } from "../../../data/formatDate";
import { addData } from "../../../reducer/manshi/DailyTelecomReducer";
import stationData from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const ChecklistAndPmStationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    systems: [
      {
        id: 1,
        name: "PAS-PIDS (Station)",
        activities: [
          {
            id: 1,
            label: "Check PAS announcements clarity at platform",
            checked: "no",
          },
          {
            id: 2,
            label: "Visual inspection of PIDS displays on platform",
            checked: "no",
          },
          {
            id: 3,
            label: "Check platform speaker functionality",
            checked: "no",
          },
          {
            id: 4,
            label: "Verify PIDS train information accuracy",
            checked: "no",
          },
        ],
      },
      {
        id: 2,
        name: "CCTV (Station)",
        activities: [
          {
            id: 1,
            label: "Check platform camera coverage",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify concourse area camera functionality",
            checked: "no",
          },
          {
            id: 3,
            label: "Check entry/exit point cameras",
            checked: "no",
          },
          {
            id: 4,
            label: "Monitor recording status on station displays",
            checked: "no",
          },
        ],
      },
      {
        id: 3,
        name: "Access Control System",
        activities: [
          {
            id: 1,
            label: "Check AFC gate functionality",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify emergency gate operation",
            checked: "no",
          },
          {
            id: 3,
            label: "Test station controller communication",
            checked: "no",
          },
          {
            id: 4,
            label: "Check platform door indicators",
            checked: "no",
          },
        ],
      },
      {
        id: 4,
        name: "Communication Systems",
        activities: [
          {
            id: 1,
            label: "Check station telephone system",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify intercom functionality",
            checked: "no",
          },
          {
            id: 3,
            label: "Test emergency communication points",
            checked: "no",
          },
          {
            id: 4,
            label: "Check radio communication with OCC",
            checked: "no",
          },
        ],
      },
      {
        id: 5,
        name: "Fire Detection System",
        activities: [
          {
            id: 1,
            label: "Check fire alarm panel status",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify smoke detector functionality",
            checked: "no",
          },
          {
            id: 3,
            label: "Test emergency announcement system",
            checked: "no",
          },
          {
            id: 4,
            label: "Check fire extinguisher locations",
            checked: "no",
          },
        ],
      },
      {
        id: 6,
        name: "Power & UPS Systems",
        activities: [
          {
            id: 1,
            label: "Check main power supply status",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify UPS operation and battery backup",
            checked: "no",
          },
          {
            id: 3,
            label: "Check emergency lighting system",
            checked: "no",
          },
          {
            id: 4,
            label: "Monitor power distribution panel",
            checked: "no",
          },
        ],
      },
      {
        id: 7,
        name: "Environmental Systems",
        activities: [
          {
            id: 1,
            label: "Check air conditioning system",
            checked: "no",
          },
          {
            id: 2,
            label: "Monitor station temperature",
            checked: "no",
          },
          {
            id: 3,
            label: "Check ventilation system operation",
            checked: "no",
          },
          {
            id: 4,
            label: "Verify lighting system functionality",
            checked: "no",
          },
        ],
      },
      {
        id: 8,
        name: "Network & Data Systems",
        activities: [
          {
            id: 1,
            label: "Check station network connectivity",
            checked: "no",
          },
          {
            id: 2,
            label: "Verify data transmission to OCC",
            checked: "no",
          },
          {
            id: 3,
            label: "Check switch and router status",
            checked: "no",
          },
          {
            id: 4,
            label: "Monitor network performance",
            checked: "no",
          },
        ],
      },
    ],
    date: formatDate(new Date().toDateString()),
    station: "",
    shift: "",
    empName: "",
    empId: "",
    checkTime: "",
    temperature: "",
    humidity: "",
    remarks: "",
    issues: "",
    actionsTaken: "",
    nextCheckDue: "",
    verifiedBy: "",
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
      title="Daily Telecom Maintenance Checklist (Station)"
      subtitle="Tele System Daily Check List Register (Station)"
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
            Station Information
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
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="shift-type"
                name="shift"
                label="Shift"
                value={formValues.shift}
                onChange={handleChange}
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
                type="temperature-reading"
                name="temperature"
                label="Station Temperature (°C)"
                value={formValues.temperature}
                onChange={handleChange}
                error={errors.temperature}
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
                <i className="fas fa-cog me-2"></i>
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

      {/* Issues and Actions */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Issues & Actions
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="issues"
                label="Issues Identified"
                value={formValues.issues}
                onChange={handleChange}
                placeholder="List any issues or abnormalities found during check"
                error={errors.issues}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="actionsTaken"
                label="Actions Taken"
                value={formValues.actionsTaken}
                onChange={handleChange}
                placeholder="Describe corrective actions taken"
                error={errors.actionsTaken}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="remarks"
                label="General Remarks"
                value={formValues.remarks}
                onChange={handleChange}
                placeholder="Any additional observations or remarks"
                error={errors.remarks}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="date-time"
                name="nextCheckDue"
                label="Next Check Due"
                value={formValues.nextCheckDue}
                onChange={handleChange}
                error={errors.nextCheckDue}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Verification */}
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="text"
            name="verifiedBy"
            label="Verified By"
            value={formValues.verifiedBy}
            onChange={handleChange}
            error={errors.verifiedBy}
          />
        </div>
        <div className="col-md-6">
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

export default ChecklistAndPmStationForm;