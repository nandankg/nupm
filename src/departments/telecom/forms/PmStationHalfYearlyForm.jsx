import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const PmStationHalfYearlyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    station: "",
    systems: [
      {
        id: 1,
        name: "PAS System - Advanced Maintenance",
        activities: [
          {
            id: 1,
            label: "Comprehensive speaker and amplifier system calibration",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Audio quality assessment and frequency response testing",
            checked: "no",
            remark: "",
            readings: {
              frequency_response: "",
              snr_ratio: ""
            }
          },
          {
            id: 3,
            label: "Complete HMI system optimization and performance tuning",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 2,
        name: "FOTS System - Network Performance Review",
        activities: [
          {
            id: 1,
            label: "Fiber optic link performance measurement and optimization",
            checked: "no",
            remark: "",
            readings: {
              link_loss: "",
              optical_power: ""
            }
          },
          {
            id: 2,
            label: "Network redundancy testing and failover verification",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 3,
        name: "CCTV System - Comprehensive Review",
        activities: [
          {
            id: 1,
            label: "Camera image quality assessment and lens cleaning",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Storage system health check and data integrity verification",
            checked: "no",
            remark: "",
            readings: {
              storage_health: "",
              retention_compliance: ""
            }
          },
          {
            id: 3,
            label: "Network video management system performance optimization",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 4,
        name: "Communication Systems - Integration Testing",
        activities: [
          {
            id: 1,
            label: "Inter-system communication testing and protocol verification",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Emergency communication system end-to-end testing",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Voice and data quality assessment across all systems",
            checked: "no",
            remark: "",
            readings: {
              voice_quality: "",
              data_integrity: ""
            }
          }
        ]
      },
      {
        id: 5,
        name: "Power & Environmental Systems",
        activities: [
          {
            id: 1,
            label: "UPS system comprehensive testing and battery assessment",
            checked: "no",
            remark: "",
            readings: {
              battery_capacity: "",
              backup_time: ""
            }
          },
          {
            id: 2,
            label: "Environmental monitoring and HVAC system verification",
            checked: "no",
            remark: "",
            readings: {
              temperature: "",
              humidity: ""
            }
          },
          {
            id: 3,
            label: "Grounding system integrity and resistance measurement",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 6,
        name: "Access Control & Security Systems",
        activities: [
          {
            id: 1,
            label: "Access control system comprehensive audit and testing",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Emergency procedures and safety system verification",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Security system integration and response testing",
            checked: "no",
            remark: ""
          }
        ]
      }
    ],
    halfYearlyAssessment: "",
    maintenanceRecommendations: "",
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
    <TelecomFormLayout title="PM Station Half Yearly Maintenance Schedule" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4">
        <h4>PM STATION HALF YEARLY MAINTENANCE SCHEDULE</h4>
        <p className="text-muted">Comprehensive Station Systems Assessment</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="date" name="date" label="Date" value={formValues.date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField type="location-type" name="station" label="Station" value={formValues.station} onChange={handleChange} required />
        </div>
      </div>

      {formValues.systems.map((system) => (
        <div key={system.id} className="system-section mb-4 border rounded p-3 shadow-sm">
          <div className="d-flex align-items-center mb-3 bg-success text-white p-3 rounded">
            <h5 className="mb-0 me-3">{system.name}</h5>
            <UniversalTelecomFormField 
              type="checkbox" 
              name={`system_${system.id}_all`} 
              label="Complete All Activities" 
              value={system.activities.every(a => a.checked === "yes")} 
              onChange={(e) => handleSystemSelectAll(system.id, e.target.checked)} 
            />
          </div>

          {system.activities.map((activity, index) => (
            <div key={activity.id} className="activity-row mb-4 p-3 border-bottom bg-light">
              <div className="row">
                <div className="col-md-9">
                  <div className="d-flex align-items-start">
                    <span className="badge bg-info me-2 fs-6">{index + 1}</span>
                    <span className="activity-label fw-semibold">{activity.label}</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center justify-content-end">
                    <UniversalTelecomFormField 
                      type="checkbox" 
                      name={`activity_${system.id}_${activity.id}`} 
                      label="Completed" 
                      value={activity.checked === "yes"} 
                      onChange={(e) => handleActivityCheck(system.id, activity.id, e.target.checked)} 
                      className="me-2"
                    />
                    {activity.checked === "yes" && <span className="badge bg-success">✓</span>}
                  </div>
                </div>
              </div>

              {activity.readings && (
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="border rounded p-3 bg-white">
                      <label className="fw-bold text-primary">Technical Measurements:</label>
                      <div className="row mt-2">
                        {Object.keys(activity.readings).map((field) => (
                          <div key={field} className="col-md-6 mb-2">
                            <UniversalTelecomFormField 
                              type={field.includes('temperature') ? "temperature-reading" : "text"}
                              name={`reading_${system.id}_${activity.id}_${field}`} 
                              label={field.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
                              value={activity.readings[field]} 
                              onChange={(e) => handleReadingChange(system.id, activity.id, field, e.target.value)} 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="row mt-3">
                <div className="col-md-12">
                  <UniversalTelecomFormField 
                    type="textarea" 
                    name={`remark_${system.id}_${activity.id}`} 
                    label="Detailed Observations & Actions Taken" 
                    value={activity.remark} 
                    onChange={(e) => handleActivityRemark(system.id, activity.id, e.target.value)} 
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <h5 className="mt-5 text-primary border-bottom pb-2">Half Yearly Assessment Summary</h5>
      <div className="row">
        <div className="col-md-6 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="halfYearlyAssessment" 
            label="Overall Station Systems Assessment" 
            value={formValues.halfYearlyAssessment} 
            onChange={handleChange} 
            rows={4} 
          />
        </div>
        <div className="col-md-6 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="maintenanceRecommendations" 
            label="Maintenance Recommendations" 
            value={formValues.maintenanceRecommendations} 
            onChange={handleChange} 
            rows={4} 
          />
        </div>
        <div className="col-md-12">
          <UniversalTelecomFormField 
            type="textarea" 
            name="notes" 
            label="Additional Notes" 
            value={formValues.notes} 
            onChange={handleChange} 
            rows={3} 
          />
        </div>
      </div>

      <h6 className="mt-4 text-primary">Maintenance Personnel</h6>
      <div className="row">
        <div className="col-md-6">
          <div className="border rounded p-3 bg-light">
            <h6 className="text-secondary">Supervisor</h6>
            <UniversalTelecomFormField type="text" name="supervisorName" label="Name" value={formValues.supervisorName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="supervisorId" label="Employee ID" value={formValues.supervisorId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="supervisorDateTime" label="Date & Time" value={formValues.supervisorDateTime} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="border rounded p-3 bg-light">
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

export default PmStationHalfYearlyForm;