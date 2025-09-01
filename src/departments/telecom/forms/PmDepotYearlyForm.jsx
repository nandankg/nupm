import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const PmDepotYearlyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    location: "",
    systems: [
      {
        id: 1,
        name: "PAS System - Comprehensive Annual Overhaul",
        activities: [
          {
            id: 1,
            label: "Complete system architecture review and documentation update",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Full amplifier calibration and performance verification",
            checked: "no",
            remark: "",
            readings: {
              thd_percentage: "",
              snr_db: "",
              power_output: ""
            }
          },
          {
            id: 3,
            label: "Speaker impedance testing and frequency response analysis",
            checked: "no",
            remark: "",
            zones: {
              label: "Impedance Values (Ohms) & Frequency Response",
              values: ["Zone 1", "Zone 2", "Zone 3", "Zone 4"],
              readings: ["", "", "", ""]
            }
          },
          {
            id: 4,
            label: "HMI software upgrade and configuration backup/restore testing",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Emergency announcement system fail-over testing",
            checked: "no",
            remark: ""
          },
          {
            id: 6,
            label: "Audio quality assessment and noise floor measurement",
            checked: "no",
            remark: "",
            readings: {
              noise_floor_db: "",
              signal_clarity: ""
            }
          }
        ]
      },
      {
        id: 2,
        name: "FOTS System - Annual Infrastructure Assessment",
        activities: [
          {
            id: 1,
            label: "Complete fiber optic infrastructure audit and documentation",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "End-to-end link performance testing with OTDR analysis",
            checked: "no",
            remark: "",
            readings: {
              insertion_loss: "",
              return_loss: "",
              link_length: ""
            }
          },
          {
            id: 3,
            label: "Core switch hardware diagnostics and performance benchmarking",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Redundancy path verification and failover testing",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Network security assessment and vulnerability patching",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 3,
        name: "CCTV System - Complete Security Infrastructure Review",
        activities: [
          {
            id: 1,
            label: "Camera system comprehensive health assessment",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Storage system optimization and data integrity verification",
            checked: "no",
            remark: "",
            readings: {
              storage_health: "",
              data_integrity: "",
              backup_status: ""
            }
          },
          {
            id: 3,
            label: "Video analytics system calibration and testing",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Recording quality assessment and retention policy verification",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Network video management system performance optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 6,
            label: "Cybersecurity audit and access control review",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 4,
        name: "Radio Communication - RF System Annual Certification",
        activities: [
          {
            id: 1,
            label: "Complete RF system performance analysis and certification",
            checked: "no",
            remark: "",
            readings: {
              tx_power_output: "",
              antenna_vswr: "",
              coverage_area: ""
            }
          },
          {
            id: 2,
            label: "Base station equipment comprehensive diagnostics",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Handheld radio fleet programming and testing",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Emergency communication protocols verification",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Interference analysis and spectrum management",
            checked: "no",
            remark: "",
            readings: {
              interference_level: "",
              channel_occupancy: ""
            }
          },
          {
            id: 6,
            label: "Tower and antenna structure inspection and maintenance",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 5,
        name: "MCS System - Master Clock System Annual Synchronization",
        activities: [
          {
            id: 1,
            label: "GPS synchronization accuracy verification and calibration",
            checked: "no",
            remark: "",
            readings: {
              gps_accuracy: "",
              sync_deviation: ""
            }
          },
          {
            id: 2,
            label: "All slave clock synchronization testing and adjustment",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "System redundancy and backup power testing",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "NTP server configuration and network time propagation verification",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 6,
        name: "Telephone System - Complete Communication Infrastructure",
        activities: [
          {
            id: 1,
            label: "EPABX system comprehensive health check and optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Voice quality testing and line impedance measurements",
            checked: "no",
            remark: "",
            readings: {
              voice_quality: "",
              line_impedance: ""
            }
          },
          {
            id: 3,
            label: "Emergency telephone system end-to-end testing",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "PSTN connectivity and trunk line verification",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "VoIP system performance assessment and optimization",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 7,
        name: "Power Systems - Electrical Infrastructure Annual Assessment",
        activities: [
          {
            id: 1,
            label: "UPS system comprehensive testing and battery assessment",
            checked: "no",
            remark: "",
            readings: {
              battery_capacity: "",
              backup_duration: "",
              load_capacity: ""
            }
          },
          {
            id: 2,
            label: "SMPS system efficiency testing and thermal analysis",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Grounding system integrity verification and resistance measurement",
            checked: "no",
            remark: "",
            readings: {
              ground_resistance: "",
              continuity_status: ""
            }
          },
          {
            id: 4,
            label: "Power quality analysis and harmonic distortion measurement",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Emergency power transfer system testing",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 8,
        name: "Environmental & Safety Systems - Annual Compliance Review",
        activities: [
          {
            id: 1,
            label: "Environmental monitoring system calibration and verification",
            checked: "no",
            remark: "",
            readings: {
              temperature_range: "",
              humidity_levels: "",
              air_quality: ""
            }
          },
          {
            id: 2,
            label: "Fire detection and suppression system testing",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Access control system security audit and upgrade",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Emergency evacuation and alarm system verification",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Equipment room ventilation and cooling system assessment",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 9,
        name: "Documentation & Compliance - Annual Records Management",
        activities: [
          {
            id: 1,
            label: "Complete system documentation review and update",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Maintenance history analysis and trend identification",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Compliance certification and regulatory requirement verification",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Preventive maintenance schedule optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 5,
            label: "Asset inventory update and lifecycle planning",
            checked: "no",
            remark: ""
          }
        ]
      }
    ],
    overallAssessment: "",
    recommendationsNextYear: "",
    criticalIssuesIdentified: "",
    notes: "",
    supervisorName: "",
    supervisorId: "",
    supervisorDateTime: "",
    maintainerName: "",
    maintainerId: "",
    maintainerDateTime: "",
    technicalLeadName: "",
    technicalLeadId: "",
    technicalLeadDateTime: "",
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
    <TelecomFormLayout title="Annual PM Depot Maintenance Schedule" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4 border-bottom pb-3">
        <h3 className="text-primary">ANNUAL PM DEPOT MAINTENANCE SCHEDULE</h3>
        <h5 className="text-secondary">Comprehensive Telecom Infrastructure Assessment</h5>
        <p className="text-muted">Complete System Health Check & Performance Certification</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="date" name="date" label="Annual Maintenance Date" value={formValues.date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField type="location-type" name="location" label="Depot Location" value={formValues.location} onChange={handleChange} required />
        </div>
      </div>

      {formValues.systems.map((system) => (
        <div key={system.id} className="system-section mb-4 border rounded p-3 shadow">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center mb-3 bg-primary text-white p-3 rounded">
                <h5 className="mb-0 me-3">{system.name}</h5>
                <UniversalTelecomFormField 
                  type="checkbox" 
                  name={`system_${system.id}_all`} 
                  label="Complete All Activities" 
                  value={system.activities.every(a => a.checked === "yes")} 
                  onChange={(e) => handleSystemSelectAll(system.id, e.target.checked)} 
                  className="text-white"
                />
              </div>
            </div>
          </div>

          {system.activities.map((activity, index) => (
            <div key={activity.id} className="activity-row mb-4 p-3 border rounded bg-light">
              <div className="row">
                <div className="col-md-9">
                  <div className="d-flex align-items-start">
                    <span className="badge bg-success me-2 fs-6">{index + 1}</span>
                    <span className="activity-label fw-bold">{activity.label}</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
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

              {activity.readings && (
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="border rounded p-3 bg-white">
                      <label className="fw-bold text-primary">Technical Measurements & Readings:</label>
                      <div className="row mt-2">
                        {Object.keys(activity.readings).map((field) => (
                          <div key={field} className="col-md-4 mb-2">
                            <UniversalTelecomFormField 
                              type={field.includes('temperature') ? "temperature-reading" : 
                                    field.includes('voltage') ? "voltage-reading" : 
                                    field.includes('power') ? "technical-parameter" : "text"}
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
                    label="Detailed Observations & Recommendations" 
                    value={activity.remark} 
                    onChange={(e) => handleActivityRemark(system.id, activity.id, e.target.value)} 
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <h5 className="mt-5 text-primary border-bottom pb-2">Annual Assessment Summary</h5>
      <div className="row">
        <div className="col-md-12 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="overallAssessment" 
            label="Overall System Health Assessment" 
            value={formValues.overallAssessment} 
            onChange={handleChange} 
            rows={4} 
            required
          />
        </div>
        <div className="col-md-12 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="criticalIssuesIdentified" 
            label="Critical Issues Identified" 
            value={formValues.criticalIssuesIdentified} 
            onChange={handleChange} 
            rows={3} 
          />
        </div>
        <div className="col-md-12 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="recommendationsNextYear" 
            label="Recommendations for Next Year" 
            value={formValues.recommendationsNextYear} 
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

      <h6 className="mt-5 text-primary border-bottom pb-2">Maintenance Team Certification</h6>
      <div className="row">
        <div className="col-md-4">
          <div className="border rounded p-3 bg-light">
            <h6 className="text-secondary">Technical Lead</h6>
            <UniversalTelecomFormField type="text" name="technicalLeadName" label="Name" value={formValues.technicalLeadName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="technicalLeadId" label="Employee ID" value={formValues.technicalLeadId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="technicalLeadDateTime" label="Date & Time" value={formValues.technicalLeadDateTime} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="border rounded p-3 bg-light">
            <h6 className="text-secondary">Supervisor</h6>
            <UniversalTelecomFormField type="text" name="supervisorName" label="Name" value={formValues.supervisorName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="supervisorId" label="Employee ID" value={formValues.supervisorId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="supervisorDateTime" label="Date & Time" value={formValues.supervisorDateTime} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="col-md-4">
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

export default PmDepotYearlyForm;