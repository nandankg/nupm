import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const PmStationYearlyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    station: "",
    systems: [
      {
        id: 1,
        name: "Station Infrastructure - Annual Certification",
        activities: [
          {
            id: 1,
            label: "Complete station telecom architecture review and documentation update",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "End-to-end system integration testing and performance certification",
            checked: "no",
            remark: "",
            readings: {
              integration_score: "",
              performance_rating: ""
            }
          },
          {
            id: 3,
            label: "Emergency response system comprehensive testing and certification",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 2,
        name: "Communication Systems - Annual Performance Review",
        activities: [
          {
            id: 1,
            label: "Public announcement system complete calibration and certification",
            checked: "no",
            remark: "",
            readings: {
              audio_quality: "",
              coverage_uniformity: ""
            }
          },
          {
            id: 2,
            label: "Telephone system performance assessment and optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Inter-station communication links performance verification",
            checked: "no",
            remark: "",
            readings: {
              link_reliability: "",
              call_quality: ""
            }
          }
        ]
      },
      {
        id: 3,
        name: "Surveillance & Security - Annual Assessment",
        activities: [
          {
            id: 1,
            label: "CCTV system comprehensive health check and performance optimization",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Video analytics accuracy assessment and system calibration",
            checked: "no",
            remark: "",
            readings: {
              detection_accuracy: "",
              false_positive_rate: ""
            }
          },
          {
            id: 3,
            label: "Access control system security audit and penetration testing",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 4,
        name: "Network Infrastructure - Annual Reliability Assessment",
        activities: [
          {
            id: 1,
            label: "Fiber optic network end-to-end performance analysis",
            checked: "no",
            remark: "",
            readings: {
              optical_loss: "",
              bandwidth_utilization: ""
            }
          },
          {
            id: 2,
            label: "Network security assessment and vulnerability testing",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Redundancy and failover mechanism comprehensive testing",
            checked: "no",
            remark: "",
            readings: {
              failover_time: "",
              redundancy_status: ""
            }
          }
        ]
      },
      {
        id: 5,
        name: "Power & Environmental - Annual Compliance Audit",
        activities: [
          {
            id: 1,
            label: "UPS and power backup systems comprehensive testing and certification",
            checked: "no",
            remark: "",
            readings: {
              backup_capacity: "",
              efficiency_rating: ""
            }
          },
          {
            id: 2,
            label: "Environmental monitoring and HVAC systems annual assessment",
            checked: "no",
            remark: "",
            readings: {
              temperature_stability: "",
              humidity_control: ""
            }
          },
          {
            id: 3,
            label: "Grounding and electrical safety systems comprehensive audit",
            checked: "no",
            remark: "",
            readings: {
              ground_resistance: "",
              insulation_status: ""
            }
          }
        ]
      },
      {
        id: 6,
        name: "Time Synchronization - Annual Precision Verification",
        activities: [
          {
            id: 1,
            label: "Master and slave clock systems precision measurement and certification",
            checked: "no",
            remark: "",
            readings: {
              time_accuracy: "",
              sync_stability: ""
            }
          },
          {
            id: 2,
            label: "GPS synchronization system performance verification",
            checked: "no",
            remark: ""
          }
        ]
      },
      {
        id: 7,
        name: "Documentation & Compliance - Annual Review",
        activities: [
          {
            id: 1,
            label: "Complete system documentation review and update",
            checked: "no",
            remark: ""
          },
          {
            id: 2,
            label: "Regulatory compliance verification and certification renewal",
            checked: "no",
            remark: ""
          },
          {
            id: 3,
            label: "Asset lifecycle management and replacement planning",
            checked: "no",
            remark: ""
          }
        ]
      }
    ],
    annualSystemHealth: "",
    complianceCertification: "",
    futureUpgradeRecommendations: "",
    criticalMaintenance: "",
    notes: "",
    technicalOfficerName: "",
    technicalOfficerId: "",
    technicalOfficerDateTime: "",
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
    <TelecomFormLayout title="Annual PM Station Maintenance & Certification" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4 border-bottom pb-3">
        <h3 className="text-primary">ANNUAL PM STATION MAINTENANCE & CERTIFICATION</h3>
        <h5 className="text-secondary">Station Telecom Infrastructure Annual Health Assessment</h5>
        <p className="text-muted">Complete System Performance Evaluation & Compliance Certification</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="date" name="date" label="Annual Certification Date" value={formValues.date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField type="location-type" name="station" label="Station" value={formValues.station} onChange={handleChange} required />
        </div>
      </div>

      {formValues.systems.map((system) => (
        <div key={system.id} className="system-section mb-4 border rounded p-3 shadow">
          <div className="d-flex align-items-center mb-3 bg-danger text-white p-3 rounded">
            <h5 className="mb-0 me-3">{system.name}</h5>
            <UniversalTelecomFormField 
              type="checkbox" 
              name={`system_${system.id}_all`} 
              label="Certify All Activities" 
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
                    <span className="badge bg-success me-2 fs-6">{index + 1}</span>
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
                      <label className="fw-bold text-danger">Annual Performance Metrics:</label>
                      <div className="row mt-2">
                        {Object.keys(activity.readings).map((field) => (
                          <div key={field} className="col-md-6 mb-2">
                            <UniversalTelecomFormField 
                              type={field.includes('temperature') ? "temperature-reading" : "technical-parameter"}
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
                    label="Annual Assessment Report & Certification Details" 
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

      <h5 className="mt-5 text-primary border-bottom pb-2">Annual Certification Summary</h5>
      <div className="row">
        <div className="col-md-6 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="annualSystemHealth" 
            label="Annual System Health Status" 
            value={formValues.annualSystemHealth} 
            onChange={handleChange} 
            rows={4} 
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="complianceCertification" 
            label="Compliance Certification Status" 
            value={formValues.complianceCertification} 
            onChange={handleChange} 
            rows={4} 
          />
        </div>
        <div className="col-md-6 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="criticalMaintenance" 
            label="Critical Maintenance Required" 
            value={formValues.criticalMaintenance} 
            onChange={handleChange} 
            rows={4} 
          />
        </div>
        <div className="col-md-6 mb-3">
          <UniversalTelecomFormField 
            type="textarea" 
            name="futureUpgradeRecommendations" 
            label="Future Upgrade Recommendations" 
            value={formValues.futureUpgradeRecommendations} 
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
            <h6 className="text-secondary">Technical Officer / Station Manager</h6>
            <UniversalTelecomFormField type="text" name="technicalOfficerName" label="Name" value={formValues.technicalOfficerName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="technicalOfficerId" label="Employee ID" value={formValues.technicalOfficerId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="technicalOfficerDateTime" label="Certification Date & Time" value={formValues.technicalOfficerDateTime} onChange={handleChange} required />
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

export default PmStationYearlyForm;