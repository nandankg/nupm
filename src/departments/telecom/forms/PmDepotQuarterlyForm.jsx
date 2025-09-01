import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const PmDepotQuarterlyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    location: "",
    docReference: "Annexure-III, Version: 1.0",
    docNumber: "08/M/Tele/CHO2",
    systems: [
      {
        id: 1,
        name: "PAS System",
        activities: [
          {
            id: 1,
            label: "Checking of HMI functionalities",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Making Live announcements",
            checked: "no",
            remark: "",
            readings: {
              hmiNormal: "",
              hmiEmergency: ""
            }
          },
          {
            id: 3,
            label: "Message recording, preview and announcement: HMI Emergency",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Message Scheduling & Repetition",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Check message origin status in HMI",
            checked: "no",
            remark: ""
          },
          {
            id: 6,
            label: "Cleaning of all ANS as per the recommendation",
            checked: "no",
            remark: ""
          },
          {
            id: 7,
            label: "External cleaning of speakers at all Zones",
            checked: "no",
            remark: ""
          },
          {
            id: 8,
            label: "Perform disk defragmentation and restart HMI",
            checked: "no",
            remark: ""
          },
          {
            id: 9,
            label: "Cleaning of external surface of display boards",
            checked: "no",
            remark: ""
          },
          {
            id: 10,
            label: "Login individual SWs for Alarms",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 2,
        name: "PIDS System",
        activities: [
          {
            id: 1,
            label: "Cleaning of external surface of display boards",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 3,
        name: "FOTS System",
        activities: [
          {
            id: 1,
            label: "Check Redundant power supply status of DSW",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Checking of Power Supply Voltage on back panel of Media Gateway (45Vdc to 57Vdc)",
            checked: "no",
            remark: "",
            readings: {
              voltage: ""
            }
          }
        ]
      },
      {
        id: 4,
        name: "Tele-Phone System",
        activities: [
          {
            id: 1,
            label: "Testing of Emergency telephone in tunnel",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Physical inspection of IDF & MDF",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "External cleaning of all Platform monitors",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 5,
        name: "CCTV System",
        activities: [
          {
            id: 1,
            label: "Check for Focusing & alignment of all cameras in Platform, Concourse, Staff & Entry/Exit Areas",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check Record CPU and RAM Utilization values in NVR (shall be <80%)",
            checked: "no",
            remark: "",
            readings: {
              cpu: "",
              ram: ""
            }
          },
          {
            id: 3,
            label: "Check network ping test of MCL, K & SMCLK",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Voltage Measurements at data SPDS (Terminal block output to measure)",
            checked: "no",
            remark: "",
            readings: {
              voltage: ""
            }
          }
        ]
      },
      {
        id: 6,
        name: "Clock System",
        activities: [
          {
            id: 1,
            label: "Check the tightness of nuts which holds the clocks (Platform)",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Check for Correctness/tightness of MCBs",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 7,
        name: "ACDB System",
        activities: [
          {
            id: 1,
            label: "Measure the Output Voltages and observe for any Abnormalities",
            checked: "no",
            remark: "",
            readings: {
              voltage: ""
            }
          }
        ]
      },
      {
        id: 8,
        name: "ACS System",
        activities: [
          {
            id: 1,
            label: "Verify the Buzzer functioning",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 9,
        name: "UPS System",
        activities: [
          {
            id: 1,
            label: "Load Test of Battery Bank-1 & Battery Bank-2",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 10,
        name: "SMPS System",
        activities: [
          {
            id: 1,
            label: "Load Test of Battery Bank-1 & Battery Bank-2",
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
    <TelecomFormLayout title="Quarterly PM Maintenance Schedule" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4">
        <h4>QUARTERLY MAINTENANCE SCHEDULE</h4>
        <p className="text-muted">DOC: {formValues.docReference} | DOCUMENT_NO: {formValues.docNumber}</p>
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
        <div key={system.id} className="system-section mb-4 border rounded p-3">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center mb-3">
                <h5 className="mb-0 me-3 text-primary">{system.name}</h5>
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

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th width="50%">Activity</th>
                  <th width="10%">Done</th>
                  <th width="40%">Remarks / Readings</th>
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
                              <div key={field} className="col-md-6 mb-2">
                                <UniversalTelecomFormField 
                                  type={field.includes('voltage') ? "voltage-reading" : "text"}
                                  name={`reading_${system.id}_${activity.id}_${field}`} 
                                  label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
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
          <UniversalTelecomFormField type="textarea" name="notes" label="Notes" value={formValues.notes} onChange={handleChange} rows={3} />
        </div>
      </div>

      <h6 className="mt-4 text-primary">Personnel Information</h6>
      <div className="row">
        <div className="col-md-6">
          <h6 className="text-secondary">Supervisor</h6>
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField type="text" name="supervisorName" label="Name" value={formValues.supervisorName} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField type="employee-id" name="supervisorId" label="Employee ID" value={formValues.supervisorId} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <UniversalTelecomFormField type="date-time" name="supervisorDateTime" label="Date & Time" value={formValues.supervisorDateTime} onChange={handleChange} required />
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <h6 className="text-secondary">Maintainer</h6>
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField type="text" name="maintainerName" label="Name" value={formValues.maintainerName} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField type="employee-id" name="maintainerId" label="Employee ID" value={formValues.maintainerId} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <UniversalTelecomFormField type="date-time" name="maintainerDateTime" label="Date & Time" value={formValues.maintainerDateTime} onChange={handleChange} required />
            </div>
          </div>
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default PmDepotQuarterlyForm;