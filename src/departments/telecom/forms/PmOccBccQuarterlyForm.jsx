import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const PmOccBccQuarterlyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    location: "",
    systems: [
      {
        id: 1,
        name: "Control Room Systems - Quarterly Assessment",
        activities: [
          {
            id: 1,
            label: "Comprehensive HMI functionality testing and performance evaluation",
            checked: "no",
            remark: "",
            readings: {
              response_time: "",
              cpu_usage: "",
              memory_usage: ""
            }
          },
          {
            id: 2,
            label: "Network infrastructure performance testing and optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Backup system testing and disaster recovery procedures verification",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Power system redundancy testing and UPS load verification",
            checked: "no",
            remark: "",
            readings: {
              ups_load: "",
              battery_backup_time: ""
            }
          }
        ]
      },
      {
        id: 2,
        name: "Communication Systems",
        activities: [
          {
            id: 1,
            label: "Inter-control center communication links testing",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Emergency communication protocols verification",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Radio system coverage and quality assessment",
            checked: "no",
            remark: "",
            readings: {
              coverage_percentage: "",
              signal_quality: ""
            }
          }
        ]
      },
      {
        id: 3,
        name: "Monitoring & Surveillance",
        activities: [
          {
            id: 1,
            label: "CCTV system comprehensive health check and optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Video wall display calibration and performance testing",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Recording and storage system integrity verification",
            checked: "no",
            remark: "",
            readings: {
              storage_utilization: "",
              recording_quality: ""
            }
          }
        ]
      }
    ],
    notes: "",
    supervisorName: "",
    supervisorId: "",
    supervisorDateTime: "",
    maintainerName: "",
    maintainerId: "",
    maintainerDateTime: "",
    employee_id: "",
    department: "Telecom"
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleActivityCheck = (systemId, activityId, checked) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return { ...activity, checked: checked ? "yes" : "no" };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const handleActivityRemark = (systemId, activityId, remark) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return { ...activity, remark };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const handleReadingChange = (systemId, activityId, field, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId && activity.readings) {
            return { 
              ...activity, 
              readings: { ...activity.readings, [field]: value } 
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

  const handleSystemSelectAll = (systemId, checked) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => ({
          ...activity,
          checked: checked ? "yes" : "no"
        }));
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      navigate("/list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout title="PM OCC/BCC Quarterly Maintenance Schedule" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4">
        <h4>QUARTERLY PM MAINTENANCE SCHEDULE - OCC/BCC</h4>
        <p className="text-muted">Control Center Systems Quarterly Assessment</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="date" name="date" label="Date" value={formValues.date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="custom-select" 
            name="location" 
            label="Control Center" 
            value={formValues.location} 
            onChange={handleChange}
            options={[
              { value: "OCC", label: "Operations Control Center (OCC)" },
              { value: "BCC", label: "Backup Control Center (BCC)" },
              { value: "Both", label: "Both OCC & BCC" }
            ]}
            required 
          />
        </div>
      </div>

      {formValues.systems.map((system) => (
        <div key={system.id} className="system-section mb-4 border rounded p-3 shadow-sm">
          <div className="d-flex align-items-center mb-3 bg-warning text-dark p-2 rounded">
            <h5 className="mb-0 me-3">{system.name}</h5>
            <UniversalTelecomFormField 
              type="checkbox" 
              name={`system_${system.id}_all`} 
              label="Complete All" 
              value={system.activities.every(a => a.checked === "yes")} 
              onChange={(e) => handleSystemSelectAll(system.id, e.target.checked)} 
            />
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th width="60%">Activity</th>
                  <th width="10%">Status</th>
                  <th width="30%">Remarks & Readings</th>
                </tr>
              </thead>
              <tbody>
                {system.activities.map((activity, index) => (
                  <tr key={activity.id}>
                    <td>
                      <span className="fw-bold me-2">{index + 1}.</span>
                      {activity.label}
                    </td>
                    <td>
                      <UniversalTelecomFormField 
                        type="checkbox" 
                        name={`activity_${system.id}_${activity.id}`} 
                        label="" 
                        value={activity.checked === "yes"} 
                        onChange={(e) => handleActivityCheck(system.id, activity.id, e.target.checked)} 
                      />
                    </td>
                    <td>
                      <UniversalTelecomFormField 
                        type="textarea" 
                        name={`remark_${system.id}_${activity.id}`} 
                        label="Remarks" 
                        value={activity.remark} 
                        onChange={(e) => handleActivityRemark(system.id, activity.id, e.target.value)} 
                        rows={2}
                      />
                      
                      {activity.readings && (
                        <div className="mt-2">
                          <div className="row">
                            {Object.keys(activity.readings).map((field) => (
                              <div key={field} className="col-md-6 mb-1">
                                <UniversalTelecomFormField 
                                  type="text"
                                  name={`reading_${system.id}_${activity.id}_${field}`} 
                                  label={field.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
                                  value={activity.readings[field]} 
                                  onChange={(e) => handleReadingChange(system.id, activity.id, field, e.target.value)} 
                                  className="form-control-sm"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="row">
        <div className="col-md-12">
          <UniversalTelecomFormField type="textarea" name="notes" label="Overall Notes" value={formValues.notes} onChange={handleChange} rows={3} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="border rounded p-3">
            <h6 className="text-secondary">Supervisor</h6>
            <UniversalTelecomFormField type="text" name="supervisorName" label="Name" value={formValues.supervisorName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="supervisorId" label="Employee ID" value={formValues.supervisorId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="supervisorDateTime" label="Date & Time" value={formValues.supervisorDateTime} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="border rounded p-3">
            <h6 className="text-secondary">Maintainer</h6>
            <UniversalTelecomFormField type="text" name="maintainerName" label="Name" value={formValues.maintainerName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="maintainerId" label="Employee ID" value={formValues.maintainerId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="maintainerDateTime" label="Date & Time" value={formValues.maintainerDateTime} onChange={handleChange} required />
          </div>
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default PmOccBccQuarterlyForm;