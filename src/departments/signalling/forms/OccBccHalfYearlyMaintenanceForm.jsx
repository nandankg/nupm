import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import {
  addData,
  addPmsheet
      } from "../../../reducer/manshi/Pmsheetoccbcchalfyearlyreducer";

/**
 * OCC/BCC Half Yearly Maintenance Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const OccBccHalfYearlyMaintenanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pmsheetoccbccData = useSelector((state) => state.pmsheetoccbcc);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (pmsheetoccbccData) {
      setSlug(pmsheetoccbccData.slug);
    }
  }, [pmsheetoccbccData]);

  // PRESERVED EXACT SYSTEM STRUCTURE - No changes from original form
  const [systems, setSystems] = useState([
    {
      name: "PAS",
      activities: [
        {
          label: "External cleaning of speakers at all Zones and TER rack",
          remark: ""
      },
        {
          label: "Checking the amplifier switch over process",
          remark: "",
          BCC1: {
            label: "Values",
            zones: ["Zone 1", "Zone 2", "Zone 3"],
            values: ["", "", ""]
      }
      },
      ]
      },
    {
      name: "FOTS",
      activities: [
        {
          label: "Checking the switching of Normal to standby path and vice-versa",
          remark: ""
      },
        {
          label: "Cleaning & Redundancy check of Core Switch Power supply",
          remark: ""
      },
        {
          label: " Checking of Dressing & Labeling of Fiber patch cords and LAN cables",
          remark: ""
      },
      ]
      },
    {
      name: "CCTV",
      activities: [
        {
          label: "Physical inspection of all equipment in CER and BCC",
          remark: ""
      },
        {
          label: "Perform Defragmentation of Windows drives in CLSTR,ENTZ,BVMS-1,BVMS-2",
          remark: ""
      },
        {
          label: "Perform Defragmentation of Windows drives in NMS",
          remark: ""
      },
        {
          label: "Clean CPU chassis air filter of Video Wall Server",
          remark: ""
      },
      ]
      },
    {
      name: "Radio",
      activities: [
        {
          label: "Ensure that all devices & Cables are labeled properly",
          remark: "",
          subInput: ["MSO", "CAD", "RCW"],
          subInputValues: { MSO: "", CAD: "", RCW: "" }
      },
        {
          label: "Optimize NM Servers and check component status",
          remark: ""
      },
        {
          label: "Clean dust filter of NM Server",
          remark: ""
      },
        {
          label: "Backup of RCW, Vortex, CAD server and ATSS GW and restart them",
          remark: ""
      },
        {
          label: "Perform Tx/Rx check for MTS-4 (RF site) from NMS",
          remark: ""
      },
      ]
      },
    {
      name: "MCS",
      activities: [
        {
          label: "Disk cleanup and defragmentation of NMS, restart system",
          remark: ""
      },
        {
          label: "Cleaning of racks and checking all connections (Do not remove connections)",
          remark: ""
      },
      ]
      },
    {
      name: "OAIT",
      activities: [
        {
          label: "Checking the switching of Normal to standby path and vice-versa",
          remark: ""
      },
        {
          label: " Cleaning of Fan tray",
          remark: ""
      },
        {
          label: " Check redundancy at EPRS level",
          remark: ""
      },
      ]
      },
    {
      name: "Mics",
      activities: [
        {
          label: "Check labelling of all cables inside each Rack",
          remark: ""
      },
        {
          label: "Check status of Locks of Telecom Racks & Equipments",
          remark: ""
      },
      ]
      },
  ]);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const [station, setstation] = useState("---");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [remarks, setRemarks] = useState("");
  const [notes, setNotes] = useState("");
  const [SName, setSName] = useState("");
  const [SempId, setSEmpId] = useState("");
  const [Ssignature, setSSignature] = useState("");
  const [SdateTime, setSDateTime] = useState("");
  const [MName, setMName] = useState("");
  const [MempId, setMEmpId] = useState("");
  const [Msignature, setMSignature] = useState("");
  const [MdateTime, setMDateTime] = useState("");

  // Handle BCC changes
  const handleBCCChange = (systemId, activityId, type, index, value) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            const updatedType = {
              ...activity[type],
              values: activity[type].values.map((v, i) =>
                i === index ? value : v
              )
      };
            return {
              ...activity,
              [type]: updatedType
      };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setSystems(updatedSystems);
  };

  // Handle sub checkbox changes
  const handleSubCheckboxChange = (systemId, activityId, subLabel, checked) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              subCheckboxes: {
                ...activity.subCheckboxes,
                [subLabel]: checked
      }
      };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setSystems(updatedSystems);
  };

  // Handle sub input changes
  const handleSubInputChange = (systemId, activityId, subLabel, value) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              subInputValues: {
                ...activity.subInputValues,
                [subLabel]: value
      }
      };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setSystems(updatedSystems);
  };

  // Handle remark changes
  const handleRemarkChange = (systemId, activityId, value) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              remark: value
      };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setSystems(updatedSystems);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!date || date === new Date().toLocaleDateString()) {
      errors.date = "Maintenance date is required";
    }
    
    if (!station || station === "---") {
      errors.station = "Station is required";
    }

    // Validate at least some activities have remarks
    const hasActivityRemarks = systems.some(system => 
      system.activities.some(activity => activity.remark.trim() !== "")
    );
    if (!hasActivityRemarks) {
      errors.activities = "At least some maintenance activities should have remarks";
    }

    // Validate staff information
    if (!SName) {
      errors.SName = "Supervisor name is required";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Preserve exact field structure for API compatibility
      const submissionData = {
        // FIXED: Remove client-side IDs - form_id is auto-generated by database
        systems,
        station,
        date,
        remarks,
        notes,
        SName,
        SempId,
        Ssignature,
        SdateTime,
        MName,
        MempId,
        Msignature,
        MdateTime,
        slug: slug || "occ-bcc-half-yearly-maintenance"
      };

      dispatch(addData(submissionData));
      dispatch(addPmsheet(submissionData));
      
      // Success feedback
      alert("OCC/BCC Half Yearly Maintenance record saved successfully!");
      navigate(`/list/${slug}`);
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving maintenance record. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setSystems(systems.map(system => ({
      ...system,
      activities: system.activities.map(activity => ({
        ...activity,
        remark: "",
        ...(activity.BCC1 && {
          BCC1: {
            ...activity.BCC1,
            values: activity.BCC1.values.map(() => "")
          }
        }),
        ...(activity.subInputValues && {
          subInputValues: Object.keys(activity.subInputValues).reduce((acc, key) => ({
            ...acc,
            [key]: ""
          }), {})
        })
      }))
    })));
    
    setstation("---");
    setDate(new Date().toLocaleDateString());
    setRemarks("");
    setNotes("");
    setSName("");
    setSEmpId("");
    setSSignature("");
    setSDateTime("");
    setMName("");
    setMEmpId("");
    setMSignature("");
    setMDateTime("");
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="OCC/BCC Half Yearly Maintenance Record"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "OCC/BCC PM Sheet", path: "/signalling/occ-bcc-half-yearly" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="station"
              label="Station"
              value={station === "---" ? "" : station}
              onChange={(e) => setstation(e.target.value)}
              placeholder="Enter station name"
              required={true}
              error={formErrors.station}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="date"
              name="date"
              label="Maintenance Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required={true}
              error={formErrors.date}
            />
          </div>
        </div>

        {/* Systems Maintenance */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Systems Maintenance Activities</h5>
            {formErrors.activities && (
              <small className="text-danger">{formErrors.activities}</small>
            )}
          </div>
          <div className="card-body">
            {systems.map((system) => (
              <SystemMaintenanceSection
                key={system.id}
                system={system}
                handleRemarkChange={handleRemarkChange}
                handleBCCChange={handleBCCChange}
                handleSubInputChange={handleSubInputChange}
                handleSubCheckboxChange={handleSubCheckboxChange}
              />
            ))}
          </div>
        </div>

        {/* General Remarks */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="remarks"
              label="General Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter general maintenance remarks"
              rows={4}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="notes"
              label="Additional Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter additional notes or observations"
              rows={4}
            />
          </div>
        </div>

        {/* Staff Information */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Staff Information</h5>
          </div>
          <div className="card-body">
            {/* Supervisor Information */}
            <h6 className="text-primary mb-3">Supervisor Details</h6>
            <div className="row mb-3">
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="SName"
                  label="Supervisor Name"
                  value={SName}
                  onChange={(e) => setSName(e.target.value)}
                  placeholder="Enter supervisor name"
                  required={true}
                  error={formErrors.SName}
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="SempId"
                  label="Supervisor Emp ID"
                  value={SempId}
                  onChange={(e) => setSEmpId(e.target.value)}
                  placeholder="Enter employee ID"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="Ssignature"
                  label="Supervisor Signature"
                  value={Ssignature}
                  onChange={(e) => setSSignature(e.target.value)}
                  placeholder="Supervisor signature"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="datetime-local"
                  name="SdateTime"
                  label="Supervisor Date & Time"
                  value={SdateTime}
                  onChange={(e) => setSDateTime(e.target.value)}
                />
              </div>
            </div>

            {/* Manager Information */}
            <h6 className="text-primary mb-3">Manager Details</h6>
            <div className="row">
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="MName"
                  label="Manager Name"
                  value={MName}
                  onChange={(e) => setMName(e.target.value)}
                  placeholder="Enter manager name"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="MempId"
                  label="Manager Emp ID"
                  value={MempId}
                  onChange={(e) => setMEmpId(e.target.value)}
                  placeholder="Enter employee ID"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="text"
                  name="Msignature"
                  label="Manager Signature"
                  value={Msignature}
                  onChange={(e) => setMSignature(e.target.value)}
                  placeholder="Manager signature"
                />
              </div>
              <div className="col-md-3">
                <UniversalSignallingFormField
                  type="datetime-local"
                  name="MdateTime"
                  label="Manager Date & Time"
                  value={MdateTime}
                  onChange={(e) => setMDateTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </span>
                ) : (
                  "Save OCC/BCC Maintenance Record"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

// System Maintenance Section Component
const SystemMaintenanceSection = ({
  system,
  handleRemarkChange,
  handleBCCChange,
  handleSubInputChange,
  handleSubCheckboxChange
      }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h6 className="mb-0 text-primary">
          {system.name} System Maintenance
        </h6>
      </div>
      <div className="card-body">
        {system.activities.map((activity) => (
          <div key={activity.id} className="border rounded p-3 mb-3">
            <h6 className="mb-3">
              <span className="badge bg-info me-2">{activity.id}</span>
              {activity.label}
            </h6>

            {/* BCC Values Input */}
            {activity.BCC1 && (
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label fw-bold">{activity.BCC1.label}</label>
                  <div className="row">
                    {activity.BCC1.zones.map((zone, index) => (
                      <div key={index} className="col-md-4">
                        <label className="form-label">{zone}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={activity.BCC1.values[index]}
                          onChange={(e) =>
                            handleBCCChange(system.id, activity.id, "BCC1", index, e.target.value)
                          }
                          placeholder={`Enter ${zone} value`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sub Input Fields */}
            {activity.subInput && (
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label fw-bold">System Components</label>
                  <div className="row">
                    {activity.subInput.map((subLabel) => (
                      <div key={subLabel} className="col-md-4">
                        <label className="form-label">{subLabel}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={activity.subInputValues[subLabel] || ""}
                          onChange={(e) =>
                            handleSubInputChange(system.id, activity.id, subLabel, e.target.value)
                          }
                          placeholder={`Enter ${subLabel} details`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Remarks */}
            <div className="row">
              <div className="col-md-12">
                <label className="form-label fw-bold">Remarks</label>
                <textarea
                  className="form-control"
                  value={activity.remark}
                  onChange={(e) =>
                    handleRemarkChange(system.id, activity.id, e.target.value)
                  }
                  rows={2}
                  placeholder="Enter maintenance remarks, observations, or issues found"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OccBccHalfYearlyMaintenanceForm;