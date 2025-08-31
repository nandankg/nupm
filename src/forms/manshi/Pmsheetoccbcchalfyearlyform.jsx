import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  addData,
  addPmsheet,
} from "../../reducer/manshi/Pmsheetoccbcchalfyearlyreducer";
const Pmsheetoccbcchalfyearlyform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pmsheetoccbccData = useSelector((state) => state.pmsheetoccbcc);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (pmsheetoccbccData) {
      setSlug(pmsheetoccbccData.slug);
    }
  }, [pmsheetoccbccData]);
  const [systems, setSystems] = useState([
    {
      id: 1,
      name: "PAS",
      activities: [
        {
          id: 1,
          label: "External cleaning of speakers at all Zones and TER rack",
          remark: "",
        },

        {
          id: 2,
          label: "Checking the amplifier switch over process",
          remark: "",
          BCC1: {
            label: "Values",
            zones: ["Zone 1", "Zone 2", "Zone 3"],
            values: ["", "", ""],
          },
        },
      ],
    },
    {
      id: 2,
      name: "FOTS",
      activities: [
        {
          id: 1,
          label:
            "Checking the switching of Normal to standby path and vice-versa",
          remark: "",
        },
        {
          id: 2,
          label: "Cleaning & Redundancy check of Core Switch Power supply",
          remark: "",
        },
        {
          id: 3,
          label:
            " Checking of Dressing & Labeling of Fiber patch cords and LAN cables",
          remark: "",
        },
      ],
    },

    {
      id: 3,
      name: "CCTV",
      activities: [
        {
          id: 1,
          label: "Physical inspection of all equipment in CER and BCC",
          remark: "",
        },
        {
          id: 2,
          label:
            "Perform Defragmentation of Windows drives in CLSTR,ENTZ,BVMS-1,BVMS-2",
          remark: "",
        },
        {
          id: 3,
          label: "Perform Defragmentation of Windows drives in NMS",
          remark: "",
        },
        {
          id: 4,
          label: "Clean CPU chassis air filter of Video Wall Server",
          remark: "",
        },
      ],
    },
    {
      id: 4,
      name: "Radio",
      activities: [
        {
          id: 1,
          label: "Ensure that all devices & Cables are labeled properly",
          remark: "",
          subInput: ["MSO", "CAD", "RCW"],
          subInputValues: { MSO: "", CAD: "", RCW: "" },
        },
        {
          id: 2,
          label: "Optimize NM Servers and check component status",
          remark: "",
        },

        {
          id: 3,
          label: "Clean dust filter of NM Server",
          remark: "",
        },
        {
          id: 4,
          label:
            "Backup of RCW, Vortex, CAD server and ATSS GW and restart them",
          remark: "",
        },
        {
          id: 5,
          label: "Perform Tx/Rx check for MTS-4 (RF site) from NMS",
          remark: "",
        },
      ],
    },
    {
      id: 5,
      name: "MCS",
      activities: [
        {
          id: 1,
          label: "Disk cleanup and defragmentation of NMS, restart system",
          remark: "",
        },
        {
          id: 2,
          label:
            "Cleaning of racks and checking all connections (Do not remove connections)",
          remark: "",
        },
      ],
    },
    {
      id: 6,
      name: "OAIT",
      activities: [
        {
          id: 1,
          label:
            "Checking the switching of Normal to standby path and vice-versa",
          remark: "",
        },
        {
          id: 2,
          label: " Cleaning of Fan tray",
          remark: "",
        },
        {
          id: 3,
          label: " Check redundancy at EPRS level",
          remark: "",
        },
      ],
    },

    {
      id: 7,
      name: "Mics",
      activities: [
        {
          id: 1,
          label: "Check labelling of all cables inside each Rack",
          remark: "",
        },
        {
          id: 2,
          label: "Check status of Locks of Telecom Racks & Equipments",
          remark: "",
        },
      ],
    },
  ]);

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

  const handleBCCChange = (systemId, activityId, type, index, value) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            const updatedType = {
              ...activity[type],
              values: activity[type].values.map((v, i) =>
                i === index ? value : v
              ),
            };
            return {
              ...activity,
              [type]: updatedType,
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

  // Function to handle sub checkbox changes
  const handleSubCheckboxChange = (systemId, activityId, subLabel, checked) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              subCheckboxes: {
                ...activity.subCheckboxes,
                [subLabel]: checked,
              },
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

  // Function to handle sub input changes
  const handleSubInputChange = (systemId, activityId, subLabel, value) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              subInputValues: {
                ...activity.subInputValues,
                [subLabel]: value,
              },
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

  const toggleCheckbox = (systemId, activityId) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              checked: activity.checked === "yes" ? "no" : "yes",
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

  const toggleAllCheckboxes = (systemId, checked) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => ({
          ...activity,
          checked: checked ? "yes" : "no",
        }));
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setSystems(updatedSystems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const checklistData = {
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
    };
    dispatch(addData(checklistData));
    navigate(`/list/${slug}`);
  };

  // Function to update remarks for an activity
  const updateRemark = (systemId, activityId, value) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              remark: value,
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

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="">PM Sheet (OCC & BCC) Half Yearly</Link>
          <Link to="">Register</Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className=" mb-3 form-heading-container">
              <h3 className="form-heading">
                PM Sheet (OCC & BCC) Half Yearly Form
              </h3>
              <div className="heading-line"></div>
            </div>
            {systems.map((system) => (
              <div key={system.id}>
                <div className="row my-3">
                  <div className="col-md-12 d-flex">
                    <label className="text-start">
                      <b>{system.name}</b> &nbsp;
                    </label>
                    <span>
                      <input
                        type="checkbox"
                        checked={system.activities.every(
                          (a) => a.checked === "yes"
                        )}
                        onChange={(e) =>
                          toggleAllCheckboxes(system.id, e.target.checked)
                        }
                      />
                      &nbsp; Select All
                    </span>
                  </div>
                </div>
                {system.activities.map((activity, index) => (
                  <div className="mb-0" key={activity.id}>
                    <div className="col-md-12 d-flex align-items-center">
                      <label className="text-start">
                        {index + 1}. &nbsp;
                        {activity.label}
                      </label>
                      <input
                        type="checkbox"
                        style={{ flex: 0, marginRight: "80px" }}
                        checked={activity.checked === "yes"}
                        onChange={() => toggleCheckbox(system.id, activity.id)}
                      />
                      <div className="col-2 m-2">
                        <input
                          type="text"
                          style={{ padding: "5px" }}
                          placeholder="Remarks"
                          value={activity.remark} // Bind value to the state
                          onChange={(e) =>
                            updateRemark(system.id, activity.id, e.target.value)
                          }
                        />
                      </div>
                    </div>{" "}
                    <div className="d-flex ">
                      {activity.BCC1 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC1.label}
                          </label>
                          <div className="">
                            {activity.BCC1.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC1.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC1",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC2 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC2.label}
                          </label>
                          <div className="">
                            {activity.BCC2.zones.map((zone, zoneIndex) => (
                              <div key={zone}>
                                {zone}:{" "}
                                <input
                                  className="my-1"
                                  type="text"
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC2.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC2",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {activity.sub && (
                      <div className="d-flex gap-3">
                        {activity.sub.map((subLabel) => (
                          <div key={subLabel}>
                            {subLabel}{" "}
                            <input
                              type="checkbox"
                              placeholder={subLabel}
                              checked={activity.subCheckboxes[subLabel]}
                              onChange={(e) =>
                                handleSubCheckboxChange(
                                  system.id,
                                  activity.id,
                                  subLabel,
                                  e.target.checked
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {activity.subInput && (
                      <div className="d-flex gap-3">
                        {activity.subInput.map((subLabel) => (
                          <div key={subLabel} className="col-1">
                            <input
                              type="text"
                              className="form-control p-2"
                              placeholder={subLabel}
                              value={activity.subInputValues[subLabel]}
                              onChange={(e) =>
                                handleSubInputChange(
                                  system.id,
                                  activity.id,
                                  subLabel,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
            <div className="row mb-3">
              <div className="col-md-12">
                <label>Notes</label>
                <input
                  type="text"
                  className="form-control"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label>Supervisor Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={SName}
                  onChange={(e) => setSName(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label>Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={SempId}
                  onChange={(e) => setSEmpId(e.target.value)}
                />
              </div>
             
              <div className="col-md-3">
                <label>Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={SdateTime}
                  onChange={(e) => setSDateTime(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label>Maintainer Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={MName}
                  onChange={(e) => setMName(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label>Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={MempId}
                  onChange={(e) => setMEmpId(e.target.value)}
                />
              </div>
              
              <div className="col-md-3">
                <label>Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={MdateTime}
                  onChange={(e) => setMDateTime(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 text-center pt-3">
              <button type="submit" className="btn btn-primary mt-3">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pmsheetoccbcchalfyearlyform;
