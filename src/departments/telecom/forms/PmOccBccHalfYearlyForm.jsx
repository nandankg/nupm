import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const PmOccBccHalfYearlyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    location: "",
    systems: [
      {
        id: 1,
        name: "PAS System - Half Yearly Comprehensive Check",
        activities: [
          {
            id: 1,
            label: "External cleaning of speakers at all Zones and Control Room equipment",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Checking the amplifier switch over process and redundancy verification",
            checked: "no",
            remark: "",
            zones: {
              label: "Zone Values & Switch-over Time",
              values: ["Zone 1", "Zone 2", "Zone 3", "Control Room"],
              readings: ["", "", "", ""]
            }
          },
          {
            id: 3,
            label: "Complete audio system calibration and sound level optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Emergency announcement system fail-safe testing",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 2,
        name: "FOTS System - Network Infrastructure Review",
        activities: [
          {
            id: 1,
            label: "Checking the switching of Normal to standby path and vice-versa",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Cleaning & Redundancy check of Core Switch Power supply",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Checking of Dressing & Labeling of Fiber patch cords and LAN cables",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Comprehensive network performance analysis and optimization",
            checked: "no",
            remark: "",
            readings: {
              latency_ms: "",
              throughput_mbps: "",
              packet_loss: ""
            }
          }
        ]
      },
      {
        id: 3,
        name: "CCTV System - Surveillance Infrastructure Assessment",
        activities: [
          {
            id: 1,
            label: "Physical inspection of all equipment in Control Rooms",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Perform Defragmentation of Windows drives in Video Management Systems",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Perform Defragmentation of Windows drives in Network Management System",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Clean CPU chassis air filter of Video Wall Server and Controllers",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Comprehensive video quality assessment and camera alignment verification",
            checked: "no",
            remark: "",
            readings: {
              video_quality_score: "",
              camera_alignment_status: ""
            }
          }
        ]
      },
      {
        id: 4,
        name: "Radio System - Communication Network Optimization",
        activities: [
          {
            id: 1,
            label: "Ensure that all devices & Cables are labeled properly in Control Rooms",
            checked: "no",
            remark: "",
            subItems: ["MSO", "CAD", "RCW", "Base_Station"],
            subValues: { MSO: "", CAD: "", RCW: "", Base_Station: "" }
          },
          {
            id: 2,
            label: "Optimize Network Management Servers and check component status",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Clean dust filter of Network Management Server and cooling systems",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Backup of Control Systems and restart critical services",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Perform comprehensive RF coverage analysis and optimization",
            checked: "no",
            remark: "",
            readings: {
              coverage_percentage: "",
              signal_strength_avg: "",
              interference_level: ""
            }
          }
        ]
      },
      {
        id: 5,
        name: "Master Clock System - Time Synchronization Review",
        activities: [
          {
            id: 1,
            label: "Disk cleanup and defragmentation of NMS, restart system",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Cleaning of racks and checking all connections (Do not remove connections)",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Comprehensive time synchronization accuracy verification",
            checked: "no",
            remark: "",
            readings: {
              time_accuracy_ms: "",
              gps_sync_status: ""
            }
          }
        ]
      },
      {
        id: 6,
        name: "OAIT System - Operational Analysis Infrastructure",
        activities: [
          {
            id: 1,
            label: "Checking the switching of Normal to standby path and vice-versa",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Cleaning of Fan tray and ventilation systems",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Check redundancy at EPRS level and failover mechanisms",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Performance benchmarking and system optimization",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 7,
        name: "Control Room Infrastructure - Environmental & Security",
        activities: [
          {
            id: 1,
            label: "Check labelling of all cables inside each Control Room Rack",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check status of Locks of Control Room Racks & Equipments",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Environmental monitoring system calibration and testing",
            checked: "no",
            remark: "",
            readings: {
              temperature_c: "",
              humidity_percent: "",
              air_pressure_hpa: ""
            }
          },
          {
            id: 4,
            label: "Emergency systems and safety protocols verification",
            checked: "no",
            remark: ""
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

  const handleZoneReadingChange = (systemId, activityId, index, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId && activity.zones) {
            const updatedReadings = [...activity.zones.readings];
            updatedReadings[index] = value;
            return { ...activity, zones: { ...activity.zones, readings: updatedReadings } };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const handleSubValueChange = (systemId, activityId, subItem, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId && activity.subValues) {
            return { 
              ...activity, 
              subValues: { ...activity.subValues, [subItem]: value } 
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
    <TelecomFormLayout title="PM OCC/BCC Half Yearly Maintenance Schedule" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4">
        <h4>PM OCC/BCC HALF YEARLY MAINTENANCE SCHEDULE</h4>
        <p className="text-muted">Comprehensive Control Center Systems Assessment</p>
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

              {activity.zones && (
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="border rounded p-3 bg-white">
                      <label className="text-decoration-underline fw-bold text-primary">{activity.zones.label}</label>
                      <div className="row mt-2">
                        {activity.zones.values.map((zone, zoneIndex) => (
                          <div key={zone} className="col-md-3 mb-2">
                            <UniversalTelecomFormField 
                              type="text" 
                              name={`zone_${system.id}_${activity.id}_${zoneIndex}`} 
                              label={zone}
                              value={activity.zones.readings[zoneIndex]} 
                              onChange={(e) => handleZoneReadingChange(system.id, activity.id, zoneIndex, e.target.value)} 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activity.subItems && activity.subValues && (
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="border rounded p-3 bg-white">
                      <label className="fw-bold text-primary">Component Status Check:</label>
                      <div className="row mt-2">
                        {activity.subItems.map((subItem) => (
                          <div key={subItem} className="col-md-3 mb-2">
                            <UniversalTelecomFormField 
                              type="text" 
                              name={`sub_${system.id}_${activity.id}_${subItem}`} 
                              label={subItem.replace(/_/g, ' ')}
                              value={activity.subValues[subItem]} 
                              onChange={(e) => handleSubValueChange(system.id, activity.id, subItem, e.target.value)} 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activity.readings && (
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="border rounded p-3 bg-white">
                      <label className="fw-bold text-primary">Technical Parameters:</label>
                      <div className="row mt-2">
                        {Object.keys(activity.readings).map((field) => (
                          <div key={field} className="col-md-4 mb-2">
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
                    label="Detailed Observations & Action Taken" 
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

      <div className="row">
        <div className="col-md-12">
          <UniversalTelecomFormField type="textarea" name="notes" label="Half Yearly Assessment Summary" value={formValues.notes} onChange={handleChange} rows={4} />
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

export default PmOccBccHalfYearlyForm;