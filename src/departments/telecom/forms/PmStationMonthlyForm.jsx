import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const PmStationMonthlyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    station: "",
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
              label: "Previous Values",
              values: ["Zone 1", "Zone 2", "Zone 3"],
              readings: ["", "", ""]
            },
            zonesAfter: {
              label: "After Modification if any",
              values: ["Zone 1", "Zone 2", "Zone 3"],
              readings: ["", "", ""]
            }
          },
          {
            id: 2,
            label: "Check the working of all microphones",
            checked: "no",
            remark: "",
            subItems: ["DCC_Mic", "PPIO_Mic"],
            subChecked: { DCC_Mic: false, PPIO_Mic: false }
          },
          {
            id: 3,
            label: "Remove Temporary files and run disk cleanup on HMI",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Check if disk free space is atleast 10% of disk size in HMI",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Check & Record Max. CPU and RAM Utilization values in HMI (shall be <80%)",
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
            label: "Verification of Signal for Main and Standby paths for different FOTS rings by using NMS (Check links to adjacent nodes only)",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 3,
        name: "Telephone System",
        activities: [
          {
            id: 1,
            label: "Check LED status of all EPABX cards",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check HDD LED status of IPBX-1 & IPBX-2",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Check the functionality of IP phone & FSR",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Verify Backup of all EPABX data on OCC/BCC-NMS (also when subscriber reconfigured and H/w changed)",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Cleaning of external surface of EPABX & IPBX",
            checked: "no",
            remark: ""
          },
          {
            id: 6,
            label: "Check Internode & PSTN calls functionality for all phones (DCC)",
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
            label: "External cleaning of CCTV rack equipment",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Reviewing of windows event viewer in NVR",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Check for abnormal shutdown of recorder from event viewer",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Verify time synchronization for HMI & NVR",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Reviewing disk management in NVR",
            checked: "no",
            remark: ""
          },
          {
            id: 6,
            label: "Remove Temporary files and run disk cleanup in CCTV HMI",
            checked: "no",
            remark: ""
          },
          {
            id: 7,
            label: "Run server administrator in NVR and check all Hardware status",
            checked: "no",
            remark: ""
          },
          {
            id: 8,
            label: "External cleaning of all cameras",
            checked: "no",
            remark: ""
          },
          {
            id: 9,
            label: "Check if disk free space is atleast 10% of disk size in CCTV & SECURITY HMI",
            checked: "no",
            remark: ""
          },
          {
            id: 10,
            label: "Check & Record Max.CPU & RAM Utilization status in CCTV HMI (shall be<80%)",
            checked: "no",
            remark: "",
            readings: {
              CPU: "",
              RAM: ""
            }
          },
          {
            id: 11,
            label: "Check & Record Max.CPU & RAM Utilization status in SEC HMI (shall be<80%)",
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
            label: "Check status of TSC, BR and DPM",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Cleaning of RCPs, Call functions, RCP Antenna checking",
            checked: "no",
            remark: "",
            subItems: ["Group_Call", "Private_Call", "Text_Message_Sending", "Emergency_Call"],
            subChecked: { Group_Call: false, Private_Call: false, Text_Message_Sending: false, Emergency_Call: false }
          },
          {
            id: 3,
            label: "Verify Tower Aviation lamp status",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Check Call functions of DCC_RCW",
            checked: "no",
            remark: "",
            subItems: ["Group_Call", "Private_Call", "Text_Message_Sending", "Emergency_Call"],
            subChecked: { Group_Call: false, Private_Call: false, Text_Message_Sending: false, Emergency_Call: false }
          },
          {
            id: 5,
            label: "Check RSSI level in DCC (above -95 dBm)",
            checked: "no",
            remark: "",
            readings: {
              RCP_Radio_ID: "",
              RSSI_value: "",
              HP_Radio_ID: "",
              RSSI_value2: ""
            }
          },
          {
            id: 6,
            label: "External cleaning of RCP",
            checked: "no",
            remark: ""
          },
          {
            id: 7,
            label: "Check the status of All Module(TSC,BR,PSU,Fan Rack etc.) of MTS-4",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 6,
        name: "Radio-IBS System",
        activities: [
          {
            id: 1,
            label: "Check the status of All Module of Master & Remote Unit",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 7,
        name: "MCS System",
        activities: [
          {
            id: 1,
            label: "Check the working of all indoor & outdoor digital clock",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check Sync. Status of Sub-master clock unit",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 8,
        name: "ACS System",
        activities: [
          {
            id: 1,
            label: "Check the Power ON Status of EML of Doors",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check the physical inspection of EML and Reader",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 9,
        name: "Miscellaneous",
        activities: [
          {
            id: 1,
            label: "Perform Cleaning of all the Racks and External Cleaning of all the Rack Equipments in TER",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check the status of Rack Fans",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Check the status of Earthing cables of each Rack and its Equipments",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 10,
        name: "VideoWall System",
        activities: [
          {
            id: 1,
            label: "External cleaning of Videowall screen",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "External cleaning of Controllers and internal racks",
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

  const handleZoneReadingChange = (systemId, activityId, zoneType, index, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId && activity[zoneType]) {
            const updatedReadings = [...activity[zoneType].readings];
            updatedReadings[index] = value;
            return { ...activity, [zoneType]: { ...activity[zoneType], readings: updatedReadings } };
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
    <TelecomFormLayout title="PM Station Monthly Maintenance Schedule" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4">
        <h4>PM STATION MONTHLY MAINTENANCE SCHEDULE</h4>
        <p className="text-muted">Station-Level Telecom Systems Monthly Check</p>
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
        <div key={system.id} className="system-section mb-4 border rounded p-3">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center mb-3 bg-primary text-white p-2 rounded">
                <h5 className="mb-0 me-3">{system.name}</h5>
                <UniversalTelecomFormField 
                  type="checkbox" 
                  name={`system_${system.id}_all`} 
                  label="Select All" 
                  value={system.activities.every(a => a.checked === "yes")} 
                  onChange={(e) => handleSystemSelectAll(system.id, e.target.checked)} 
                />
              </div>
            </div>
          </div>

          {system.activities.map((activity, index) => (
            <div key={activity.id} className="activity-row mb-3 border-bottom pb-3">
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex align-items-start">
                    <span className="me-2 fw-bold">{index + 1}.</span>
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
                  <div className="col-md-6">
                    <div className="border rounded p-2 bg-light">
                      <label className="text-decoration-underline fw-bold">{activity.zones.label}</label>
                      <div className="mt-2">
                        {activity.zones.values.map((zone, zoneIndex) => (
                          <div key={zone} className="d-flex align-items-center mb-1">
                            <span className="me-2">{zone}:</span>
                            <UniversalTelecomFormField 
                              type="text" 
                              name={`zone_${system.id}_${activity.id}_${zoneIndex}`} 
                              label=""
                              value={activity.zones.readings[zoneIndex]} 
                              onChange={(e) => handleZoneReadingChange(system.id, activity.id, 'zones', zoneIndex, e.target.value)} 
                              className="form-control-sm"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {activity.zonesAfter && (
                    <div className="col-md-6">
                      <div className="border rounded p-2 bg-light">
                        <label className="text-decoration-underline fw-bold">{activity.zonesAfter.label}</label>
                        <div className="mt-2">
                          {activity.zonesAfter.values.map((zone, zoneIndex) => (
                            <div key={zone} className="d-flex align-items-center mb-1">
                              <span className="me-2">{zone}:</span>
                              <UniversalTelecomFormField 
                                type="text" 
                                name={`zone_after_${system.id}_${activity.id}_${zoneIndex}`} 
                                label=""
                                value={activity.zonesAfter.readings[zoneIndex]} 
                                onChange={(e) => handleZoneReadingChange(system.id, activity.id, 'zonesAfter', zoneIndex, e.target.value)} 
                                className="form-control-sm"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="row">
        <div className="col-md-12">
          <UniversalTelecomFormField type="textarea" name="notes" label="Notes" value={formValues.notes} onChange={handleChange} />
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

export default PmStationMonthlyForm;