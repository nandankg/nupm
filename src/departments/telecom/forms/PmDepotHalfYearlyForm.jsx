import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const PmDepotHalfYearlyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    location: "",
    systems: [
      {
        id: 1,
        name: "PAS System",
        activities: [
          {
            id: 1,
            label: "External cleaning of speakers at all Zones and TER rack",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Checking the amplifier switch over process",
            checked: "no",
            remark: "",
            zones: {
              label: "Zone Values",
              values: ["Zone 1", "Zone 2", "Zone 3"],
              readings: ["", "", ""]
            }
          },
          {
            id: 3,
            label: "Deep cleaning and inspection of all HMI components",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Check and calibrate sound levels across all zones",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Comprehensive backup and restore test of PA system configuration",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 2,
        name: "FOTS System",
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
            label: "Fiber optic cable loss measurement and documentation",
            checked: "no",
            remark: "",
            readings: {
              loss_dB: "",
              link_quality: ""
            }
          },
          {
            id: 5,
            label: "Network performance testing and optimization",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 3,
        name: "CCTV System",
        activities: [
          {
            id: 1,
            label: "Physical inspection of all equipment in CER and BCC",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Perform Defragmentation of Windows drives in CLSTR, ENTZ, BVMS-1, BVMS-2",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Perform Defragmentation of Windows drives in NMS",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Clean CPU chassis air filter of Video Wall Server",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Comprehensive camera alignment and focus adjustment",
            checked: "no",
            remark: ""
          },
          {
            id: 6,
            label: "Storage system health check and cleanup",
            checked: "no",
            remark: "",
            readings: {
              storage_usage: "",
              disk_health: ""
            }
          }
        ]
      },
      {
        id: 4,
        name: "Radio System",
        activities: [
          {
            id: 1,
            label: "Ensure that all devices & Cables are labeled properly",
            checked: "no",
            remark: "",
            subItems: ["MSO", "CAD", "RCW"],
            subValues: { MSO: "", CAD: "", RCW: "" }
          },
          {
            id: 2,
            label: "Optimize NM Servers and check component status",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Clean dust filter of NM Server",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Backup of RCW, Vortex, CAD server and ATSS GW and restart them",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Perform Tx/Rx check for MTS-4 (RF site) from NMS",
            checked: "no",
            remark: "",
            readings: {
              tx_power: "",
              rx_signal: "",
              swr: ""
            }
          },
          {
            id: 6,
            label: "Antenna system inspection and VSWR measurements",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 5,
        name: "MCS System",
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
            label: "Time synchronization accuracy verification across all clocks",
            checked: "no",
            remark: "",
            readings: {
              time_accuracy: "",
              sync_status: ""
            }
          },
          {
            id: 4,
            label: "Master clock system redundancy testing",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 6,
        name: "OAIT System",
        activities: [
          {
            id: 1,
            label: "Checking the switching of Normal to standby path and vice-versa",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Cleaning of Fan tray",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Check redundancy at EPRS level",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Comprehensive system health diagnostics",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 7,
        name: "Miscellaneous",
        activities: [
          {
            id: 1,
            label: "Check labelling of all cables inside each Rack",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check status of Locks of Telecom Racks & Equipments",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Environmental monitoring and control system check",
            checked: "no",
            remark: "",
            readings: {
              temperature: "",
              humidity: "",
              airflow: ""
            }
          },
          {
            id: 4,
            label: "Power quality analysis and harmonic measurement",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Emergency procedures and safety system verification",
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
    <TelecomFormLayout title="PM Depot Half Yearly Maintenance Schedule" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4">
        <h4>PM DEPOT HALF YEARLY MAINTENANCE SCHEDULE</h4>
        <p className="text-muted">Comprehensive Telecom Systems Maintenance</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="date" name="date" label="Date" value={formValues.date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField type="location-type" name="location" label="Depot Location" value={formValues.location} onChange={handleChange} required />
        </div>
      </div>

      {formValues.systems.map((system) => (
        <div key={system.id} className="system-section mb-4 border rounded p-3 shadow-sm">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center mb-3 bg-light p-2 rounded">
                <h5 className="mb-0 me-3 text-primary">{system.name}</h5>
                <UniversalTelecomFormField 
                  type="checkbox" 
                  name={`system_${system.id}_all`} 
                  label="Check All Activities" 
                  value={system.activities.every(a => a.checked === "yes")} 
                  onChange={(e) => handleSystemSelectAll(system.id, e.target.checked)} 
                />
              </div>
            </div>
          </div>

          {system.activities.map((activity, index) => (
            <div key={activity.id} className="activity-row mb-4 border-bottom pb-3">
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex align-items-start">
                    <span className="badge bg-secondary me-2">{index + 1}</span>
                    <span className="activity-label fw-semibold">{activity.label}</span>
                  </div>
                </div>
                <div className="col-md-2">
                  <UniversalTelecomFormField 
                    type="checkbox" 
                    name={`activity_${system.id}_${activity.id}`} 
                    label="Completed" 
                    value={activity.checked === "yes"} 
                    onChange={(e) => handleActivityCheck(system.id, activity.id, e.target.checked)} 
                  />
                </div>
                <div className="col-md-2">
                  <UniversalTelecomFormField 
                    type="text" 
                    name={`remark_${system.id}_${activity.id}`} 
                    label="Remarks" 
                    value={activity.remark} 
                    onChange={(e) => handleActivityRemark(system.id, activity.id, e.target.value)} 
                  />
                </div>
              </div>

              {activity.zones && (
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="border rounded p-2 bg-light">
                      <label className="text-decoration-underline fw-bold">{activity.zones.label}</label>
                      <div className="d-flex gap-3 mt-2">
                        {activity.zones.values.map((zone, zoneIndex) => (
                          <div key={zone} className="zone-reading">
                            <label className="form-label small">{zone}:</label>
                            <UniversalTelecomFormField 
                              type="text" 
                              name={`zone_${system.id}_${activity.id}_${zoneIndex}`} 
                              label=""
                              value={activity.zones.readings[zoneIndex]} 
                              onChange={(e) => handleZoneReadingChange(system.id, activity.id, zoneIndex, e.target.value)} 
                              className="form-control-sm"
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
                    <div className="border rounded p-2 bg-light">
                      <label className="fw-bold">Component Status:</label>
                      <div className="d-flex gap-3 mt-2">
                        {activity.subItems.map((subItem) => (
                          <div key={subItem} className="sub-value">
                            <label className="form-label small">{subItem}:</label>
                            <UniversalTelecomFormField 
                              type="text" 
                              name={`sub_${system.id}_${activity.id}_${subItem}`} 
                              label=""
                              value={activity.subValues[subItem]} 
                              onChange={(e) => handleSubValueChange(system.id, activity.id, subItem, e.target.value)} 
                              className="form-control-sm"
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
                    <div className="border rounded p-2 bg-light">
                      <label className="fw-bold">Measurements/Readings:</label>
                      <div className="row mt-2">
                        {Object.keys(activity.readings).map((field) => (
                          <div key={field} className="col-md-6 mb-2">
                            <UniversalTelecomFormField 
                              type={field.includes('temperature') ? "temperature-reading" : 
                                    field.includes('voltage') ? "voltage-reading" : "text"}
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
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="row">
        <div className="col-md-12">
          <UniversalTelecomFormField type="textarea" name="notes" label="Overall Notes and Observations" value={formValues.notes} onChange={handleChange} rows={4} />
        </div>
      </div>

      <h6 className="mt-4 text-primary">Maintenance Personnel</h6>
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

export default PmDepotHalfYearlyForm;