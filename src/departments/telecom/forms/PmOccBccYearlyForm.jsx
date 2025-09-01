import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const PmOccBccYearlyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    location: "",
    systems: [
      {
        id: 1,
        name: "Control Center Infrastructure - Annual Certification",
        activities: [
          {
            id: 1,
            label: "Complete control room architecture review and documentation update",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Comprehensive disaster recovery testing and business continuity verification",
            checked: "no",
            remark: "",
            readings: {
              recovery_time: "",
              data_integrity: "",
              system_availability: ""
            }
          },
          {
            id: 3,
            label: "Power system redundancy and UPS comprehensive load testing",
            checked: "no",
            remark: "",
            readings: {
              ups_efficiency: "",
              battery_life: "",
              load_capacity: ""
            }
          },
          {
            id: 4,
            label: "Environmental control system annual calibration and certification",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 2,
        name: "Communication Systems - Annual Performance Assessment",
        activities: [
          {
            id: 1,
            label: "Inter-control center communication infrastructure complete audit",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Emergency communication protocols comprehensive testing",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Voice communication system quality assessment and optimization",
            checked: "no",
            remark: "",
            readings: {
              voice_quality: "",
              call_completion: "",
              system_reliability: ""
            }
          },
          {
            id: 4,
            label: "Radio system coverage analysis and performance certification",
            checked: "no",
            remark: "",
            readings: {
              coverage_area: "",
              signal_quality: "",
              interference_level: ""
            }
          }
        ]
      },
      {
        id: 3,
        name: "Network Infrastructure - Annual Security & Performance Audit",
        activities: [
          {
            id: 1,
            label: "Complete network security assessment and vulnerability testing",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Fiber optic infrastructure end-to-end performance verification",
            checked: "no",
            remark: "",
            readings: {
              fiber_loss: "",
              link_quality: "",
              bandwidth_utilization: ""
            }
          },
          {
            id: 3,
            label: "Network redundancy and failover mechanism comprehensive testing",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Core switch hardware diagnostics and lifecycle assessment",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 4,
        name: "Monitoring & Surveillance - Annual System Certification",
        activities: [
          {
            id: 1,
            label: "CCTV system comprehensive health assessment and performance optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Video analytics system calibration and accuracy verification",
            checked: "no",
            remark: "",
            readings: {
              detection_accuracy: "",
              false_alarm_rate: "",
              system_uptime: ""
            }
          },
          {
            id: 3,
            label: "Storage system performance analysis and data retention verification",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Video wall display system comprehensive testing and calibration",
            checked: "no",
            remark: "",
            readings: {
              color_accuracy: "",
              brightness_uniformity: "",
              response_time: ""
            }
          }
        ]
      },
      {
        id: 5,
        name: "Control Systems - Annual Operational Excellence Review",
        activities: [
          {
            id: 1,
            label: "HMI system performance benchmarking and user experience optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Alarm management system effectiveness review and optimization",
            checked: "no",
            remark: "",
            readings: {
              alarm_response_time: "",
              false_alarm_rate: "",
              system_reliability: ""
            }
          },
          {
            id: 3,
            label: "Data logging and historical data integrity verification",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "System integration and interoperability testing",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 6,
        name: "Safety & Security Systems - Annual Compliance Audit",
        activities: [
          {
            id: 1,
            label: "Access control system comprehensive security audit",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Fire detection and suppression system annual testing and certification",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Emergency evacuation and safety protocol verification",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Cybersecurity assessment and penetration testing",
            checked: "no",
            remark: "",
            readings: {
              security_score: "",
              vulnerabilities_found: "",
              remediation_status: ""
            }
          }
        ]
      },
      {
        id: 7,
        name: "Time Synchronization - Annual Precision Verification",
        activities: [
          {
            id: 1,
            label: "Master clock system precision measurement and GPS synchronization verification",
            checked: "no",
            remark: "",
            readings: {
              time_accuracy: "",
              gps_signal_quality: "",
              drift_measurement: ""
            }
          },
          {
            id: 2,
            label: "All slave clock synchronization accuracy verification across the network",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "NTP server performance and network time distribution verification",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 8,
        name: "Documentation & Compliance - Annual Records Review",
        activities: [
          {
            id: 1,
            label: "Complete system documentation review and update",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Maintenance history analysis and predictive maintenance optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Regulatory compliance verification and certification renewal",
            checked: "no",
            remark: ""
          },
          {
            id: 4,
            label: "Asset lifecycle management and replacement planning",
            checked: "no",
            remark: ""
          }
        ]
      }
    ],
    overallSystemHealth: "",
    criticalIssuesIdentified: "",
    recommendationsNextYear: "",
    complianceStatus: "",
    notes: "",
    technicalLeadName: "",
    technicalLeadId: "",
    technicalLeadDateTime: "",
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
    <TelecomFormLayout title="Annual PM OCC/BCC Maintenance & Certification" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4 border-bottom pb-3">
        <h3 className="text-primary">ANNUAL PM OCC/BCC MAINTENANCE & CERTIFICATION</h3>
        <h5 className="text-secondary">Control Center Annual Health Assessment & Compliance Audit</h5>
        <p className="text-muted">Comprehensive Systems Performance Evaluation & Future Planning</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="date" name="date" label="Annual Assessment Date" value={formValues.date} onChange={handleChange} required />
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
        <div key={system.id} className="system-section mb-4 border rounded p-3 shadow">
          <div className="d-flex align-items-center mb-3 bg-dark text-white p-3 rounded">
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

          {system.activities.map((activity, index) => (
            <div key={activity.id} className="activity-row mb-4 p-3 border rounded bg-light">
              <div className="row">
                <div className="col-md-10">
                  <div className="d-flex align-items-start">
                    <span className="badge bg-danger me-2 fs-6">{index + 1}</span>
                    <span className="activity-label fw-bold">{activity.label}</span>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="d-flex align-items-center justify-content-end">
                    <UniversalTelecomFormField 
                      type="checkbox" 
                      name={`activity_${system.id}_${activity.id}`} 
                      label="Certified" 
                      value={activity.checked === "yes"} 
                      onChange={(e) => handleActivityCheck(system.id, activity.id, e.target.checked)} 
                      className="me-2"
                    />
                    {activity.checked === "yes" && <span className="badge bg-success">✓ CERTIFIED</span>}
                  </div>
                </div>
              </div>

              {activity.readings && (
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="border rounded p-3 bg-white">
                      <label className="fw-bold text-danger">Critical Performance Metrics:</label>
                      <div className="row mt-2">
                        {Object.keys(activity.readings).map((field) => (
                          <div key={field} className="col-md-4 mb-2">
                            <UniversalTelecomFormField 
                              type={field.includes('temperature') ? "temperature-reading" : 
                                    field.includes('time') ? "time-only" : "technical-parameter"}
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
                    label="Detailed Assessment Report & Certification Notes" 
                    value={activity.remark} 
                    onChange={(e) => handleActivityRemark(system.id, activity.id, e.target.value)} 
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <h5 className="mt-5 text-primary border-bottom pb-2">Annual Assessment Executive Summary</h5>
      <div className="row">
        <div className="col-md-6 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="overallSystemHealth" 
            label="Overall System Health Status" 
            value={formValues.overallSystemHealth} 
            onChange={handleChange} 
            rows={4} 
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="complianceStatus" 
            label="Regulatory Compliance Status" 
            value={formValues.complianceStatus} 
            onChange={handleChange} 
            rows={4} 
          />
        </div>
        <div className="col-md-12 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="criticalIssuesIdentified" 
            label="Critical Issues Identified & Resolution Plan" 
            value={formValues.criticalIssuesIdentified} 
            onChange={handleChange} 
            rows={4} 
          />
        </div>
        <div className="col-md-12 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="recommendationsNextYear" 
            label="Strategic Recommendations for Next Year" 
            value={formValues.recommendationsNextYear} 
            onChange={handleChange} 
            rows={4} 
          />
        </div>
        <div className="col-md-12">
          <UniversalTelecomFormField 
            type="textarea" 
            name="notes" 
            label="Additional Executive Notes" 
            value={formValues.notes} 
            onChange={handleChange} 
            rows={3} 
          />
        </div>
      </div>

      <h6 className="mt-5 text-primary border-bottom pb-2">Annual Certification Authority</h6>
      <div className="row">
        <div className="col-md-4">
          <div className="border rounded p-3 bg-light">
            <h6 className="text-secondary">Technical Lead / Engineer-in-Charge</h6>
            <UniversalTelecomFormField type="text" name="technicalLeadName" label="Name" value={formValues.technicalLeadName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="technicalLeadId" label="Employee ID" value={formValues.technicalLeadId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="technicalLeadDateTime" label="Certification Date & Time" value={formValues.technicalLeadDateTime} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="border rounded p-3 bg-light">
            <h6 className="text-secondary">Supervisor</h6>
            <UniversalTelecomFormField type="text" name="supervisorName" label="Name" value={formValues.supervisorName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="supervisorId" label="Employee ID" value={formValues.supervisorId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="supervisorDateTime" label="Approval Date & Time" value={formValues.supervisorDateTime} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="border rounded p-3 bg-light">
            <h6 className="text-secondary">Lead Maintainer</h6>
            <UniversalTelecomFormField type="text" name="maintainerName" label="Name" value={formValues.maintainerName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="maintainerId" label="Employee ID" value={formValues.maintainerId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="maintainerDateTime" label="Execution Date & Time" value={formValues.maintainerDateTime} onChange={handleChange} required />
          </div>
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default PmOccBccYearlyForm;