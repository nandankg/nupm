import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const PmOccBccMonthlyForm = () => {
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
            label: "Check announcements at all zones by making local and central announcements (Record dB values from NCO)",
            checked: "no",
            remark: "",
            zones: {
              label: "dB Values from NCO",
              values: ["Zone 1", "Zone 2", "Zone 3", "Control Room"],
              readings: ["", "", "", ""]
            }
          },
          {
            id: 2,
            label: "Check the working of all microphones in control room",
            checked: "no",
            remark: "",
            subItems: ["DCC_Mic", "BCC_Mic", "Emergency_Mic"],
            subChecked: { DCC_Mic: false, BCC_Mic: false, Emergency_Mic: false }
          },
          {
            id: 3,
            label: "Remove temporary files and run disk cleanup on PA HMI",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Check if disk free space is at least 10% of disk size in PA HMI",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Check & Record Max CPU and RAM Utilization values in PA HMI (shall be <80%)",
            checked: "no",
            remark: "",
            readings: {
              CPU: "",
              RAM: ""
            }
          }
        ]
      },
      {
        id: 2,
        name: "FOTS System",
        activities: [
          {
            id: 1,
            label: "Verification of Signal for Main and Standby paths for OCC-BCC FOTS rings using NMS",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check status of core switches and redundant links",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Monitor network traffic and performance parameters",
            checked: "no",
            remark: "",
            readings: {
              traffic_utilization: "",
              packet_loss: ""
            }
          }
        ]
      },
      {
        id: 3,
        name: "Telephone System",
        activities: [
          {
            id: 1,
            label: "Check LED status of all EPABX cards in OCC/BCC",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check HDD LED status of IPBX-1 & IPBX-2 servers",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Check the functionality of all IP phones & FSR in control room",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Verify Backup of all EPABX data and configuration",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Cleaning of external surface of EPABX & IPBX equipment",
            checked: "no",
            remark: ""
          },
          {
            id: 6,
            label: "Check Inter-OCC, BCC & PSTN calls functionality",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 4,
        name: "CCTV System",
        activities: [
          {
            id: 1,
            label: "External cleaning of CCTV control room equipment and monitors",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Reviewing of windows event viewer in all NVR systems",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Check for abnormal shutdown of recorders from event viewer",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Verify time synchronization for all HMI & NVR systems",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Reviewing disk management in all NVR systems",
            checked: "no",
            remark: ""
          },
          {
            id: 6,
            label: "Remove temporary files and run disk cleanup in CCTV management systems",
            checked: "no",
            remark: ""
          },
          {
            id: 7,
            label: "Run server administrator and check all Hardware status",
            checked: "no",
            remark: ""
          },
          {
            id: 8,
            label: "Check if disk free space is at least 10% in all CCTV systems",
            checked: "no",
            remark: ""
          },
          {
            id: 9,
            label: "Check & Record Max CPU & RAM Utilization in CCTV Control HMI (shall be <80%)",
            checked: "no",
            remark: "",
            readings: {
              CPU: "",
              RAM: ""
            }
          },
          {
            id: 10,
            label: "Check & Record Max CPU & RAM Utilization in Video Wall Controller (shall be <80%)",
            checked: "no",
            remark: "",
            readings: {
              CPU: "",
              RAM: ""
            }
          }
        ]
      },
      {
        id: 5,
        name: "Radio System",
        activities: [
          {
            id: 1,
            label: "Check status of Base Station Controller, Base Radio and DPM",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check Call functions from OCC/BCC control positions",
            checked: "no",
            remark: "",
            subItems: ["Group_Call", "Private_Call", "Text_Message", "Emergency_Call"],
            subChecked: { Group_Call: false, Private_Call: false, Text_Message: false, Emergency_Call: false }
          },
          {
            id: 3,
            label: "Verify Radio coverage status and signal strength monitoring",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Check RSSI levels from all active radios (above -95 dBm)",
            checked: "no",
            remark: "",
            readings: {
              min_RSSI: "",
              max_RSSI: "",
              average_RSSI: ""
            }
          },
          {
            id: 5,
            label: "External cleaning of control room radio equipment",
            checked: "no",
            remark: ""
          },
          {
            id: 6,
            label: "Check the status of all Radio Network Management modules",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 6,
        name: "Master Clock System",
        activities: [
          {
            id: 1,
            label: "Check the working of master clock displays in OCC/BCC",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check synchronization status of all slave clocks from master",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Verify GPS synchronization and backup time source",
            checked: "no",
            remark: "",
            readings: {
              gps_status: "",
              backup_source: ""
            }
          }
        ]
      },
      {
        id: 7,
        name: "Access Control System",
        activities: [
          {
            id: 1,
            label: "Check the Power ON Status of door controllers in OCC/BCC areas",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check the physical inspection of card readers and door sensors",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Test emergency door release and access override functions",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 8,
        name: "Control Room Infrastructure",
        activities: [
          {
            id: 1,
            label: "Perform cleaning of all control room racks and equipment",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check the status of all rack cooling fans",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Check the status of earthing cables and rack grounding",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Monitor control room environmental parameters",
            checked: "no",
            remark: "",
            readings: {
              temperature: "",
              humidity: "",
              air_pressure: ""
            }
          }
        ]
      },
      {
        id: 9,
        name: "Video Wall System",
        activities: [
          {
            id: 1,
            label: "External cleaning of video wall screens and bezels",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "External cleaning of video wall controllers and processing units",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Check video wall display quality and color calibration",
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

  const handleSubItemCheck = (systemId, activityId, subItem, checked) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId && activity.subChecked) {
            return { 
              ...activity, 
              subChecked: { ...activity.subChecked, [subItem]: checked } 
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
    <TelecomFormLayout title="PM OCC/BCC Monthly Maintenance Schedule" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4">
        <h4>PM OCC/BCC MONTHLY MAINTENANCE SCHEDULE</h4>
        <p className="text-muted">Operations Control Center & Backup Control Center Systems</p>
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
        <div key={system.id} className="system-section mb-4 border rounded p-3">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center mb-3 bg-info text-white p-2 rounded">
                <h5 className="mb-0 me-3">{system.name}</h5>
                <UniversalTelecomFormField 
                  type="checkbox" 
                  name={`system_${system.id}_all`} 
                  label="Check All" 
                  value={system.activities.every(a => a.checked === "yes")} 
                  onChange={(e) => handleSystemSelectAll(system.id, e.target.checked)} 
                />
              </div>
            </div>
          </div>

          {system.activities.map((activity, index) => (
            <div key={activity.id} className="activity-row mb-3 p-2 border-bottom">
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex align-items-start">
                    <span className="badge bg-primary me-2">{index + 1}</span>
                    <span className="activity-label">{activity.label}</span>
                  </div>
                </div>
                <div className="col-md-2">
                  <UniversalTelecomFormField 
                    type="checkbox" 
                    name={`activity_${system.id}_${activity.id}`} 
                    label="Done" 
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
                <div className="row mt-2">
                  <div className="col-md-12">
                    <div className="border rounded p-2 bg-light">
                      <label className="text-decoration-underline fw-bold">{activity.zones.label}</label>
                      <div className="d-flex gap-3 mt-2">
                        {activity.zones.values.map((zone, zoneIndex) => (
                          <div key={zone} className="zone-reading">
                            <small>{zone}:</small>
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

              {activity.subItems && (
                <div className="row mt-2">
                  <div className="col-md-12">
                    <div className="d-flex gap-3">
                      {activity.subItems.map((subItem) => (
                        <UniversalTelecomFormField 
                          key={subItem}
                          type="checkbox" 
                          name={`sub_${system.id}_${activity.id}_${subItem}`} 
                          label={subItem.replace(/_/g, ' ')} 
                          value={activity.subChecked[subItem]} 
                          onChange={(e) => handleSubItemCheck(system.id, activity.id, subItem, e.target.checked)} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activity.readings && (
                <div className="row mt-2">
                  <div className="col-md-12">
                    <div className="border rounded p-2 bg-light">
                      <div className="d-flex gap-3">
                        {Object.keys(activity.readings).map((field) => (
                          <div key={field} className="reading-field">
                            <UniversalTelecomFormField 
                              type={field.includes('temperature') ? "temperature-reading" : "text"}
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
          <UniversalTelecomFormField type="textarea" name="notes" label="Notes" value={formValues.notes} onChange={handleChange} rows={3} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h6 className="text-secondary">Supervisor</h6>
          <UniversalTelecomFormField type="text" name="supervisorName" label="Name" value={formValues.supervisorName} onChange={handleChange} required />
          <UniversalTelecomFormField type="employee-id" name="supervisorId" label="Employee ID" value={formValues.supervisorId} onChange={handleChange} required />
          <UniversalTelecomFormField type="date-time" name="supervisorDateTime" label="Date & Time" value={formValues.supervisorDateTime} onChange={handleChange} required />
        </div>
        
        <div className="col-md-6">
          <h6 className="text-secondary">Maintainer</h6>
          <UniversalTelecomFormField type="text" name="maintainerName" label="Name" value={formValues.maintainerName} onChange={handleChange} required />
          <UniversalTelecomFormField type="employee-id" name="maintainerId" label="Employee ID" value={formValues.maintainerId} onChange={handleChange} required />
          <UniversalTelecomFormField type="date-time" name="maintainerDateTime" label="Date & Time" value={formValues.maintainerDateTime} onChange={handleChange} required />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default PmOccBccMonthlyForm;