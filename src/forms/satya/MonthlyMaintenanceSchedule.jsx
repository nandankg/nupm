import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addData,
  addMonthly,
} from "../../reducer/satya/MonthlyMaintenanceScheduleReducer";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json";

const MonthlyMaintenanceSchedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const monthlymaintenance = useSelector((state) => state.schedule);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (monthlymaintenance) {
      setSlug(monthlymaintenance.slug);
    }
  }, [monthlymaintenance]);

  const [systems, setSystems] = useState([
    {
      id: 1,
      name: "PAS-PIDS",
      activities: [
        {
          id: 1,
          label:
            "Check announcements at all zones by making local and central announcements. To be checked by visual inspection and observation and record the dB values from NCO",
          BCC1: {
            label: "Previous Values",
            zones: ["Zone 1", "Zone 2", "Zone 3"],
            values: ["", "", ""],
          },
          BCC2: {
            label: "After Modification if any",
            zones: ["Zone 1", "Zone 2", "Zone 3"],
            values: ["", "", ""],
          },
          remark: "",
        },

        {
          id: 2,
          label: "Check the working of all microphones ",
          remark: "",
          sub: ["OCC Mic (TC & CC)", "CSS HMI Mic"],
          subCheckboxes: { OCC_Mic: false, HMI_Mic: false },
        },
        {
          id: 3,
          label: "Remove Temporary files and run disk cleanup on HMI",
          remark: "",
        },
        {
          id: 4,
          label: "Check if disk free space is atleast 10% of disk size in HMI",
          remark: "",
        },
        {
          id: 5,
          label:
            "Check & Record Max. CPU and RAM Utilization values in HMI (shall be <80%)",
          remark: "",
          subInput: [
            "OCC_CPU",
            "OCC_RAM",
            "CSS_CPU",
            "CSS_RAM",
            "BCC_CPU",
            "BCC_RAM",
            "NMS_CPU",
            "NMS_RAM",
          ],
          subInputValues: {
            OCC_CPU: "",
            OCC_RAM: "",
            CSS_CPU: "",
            CSS_RAM: "",
            BCC_CPU: "",
            BCC_RAM: "",
            NMS_CPU: "",
            NMS_RAM: "",
          },
        },
        {
          id: 6,
          label: "Check PAS Live Audio Announcement Recording in CDRS Machine",
          remark: "",
        },
      ],
    },
    {
      id: 2,
      name: "TELEPHONE",
      activities: [
        {
          id: 1,
          label: "Check LED status of EPABX cards",
          remark: "",
        },
        {
          id: 2,
          label: "Cleaning of external surface of EPABX",
          remark: "",
        },
        {
          id: 3,
          label: "Check LED Status of Server in Telephone Rack (CER)",
          remark: "",
        },
        {
          id: 4,
          label:
            "Check Internode & PRI calls functionality for all phones (BCC Theatre)",
          remark: "",
        },
        {
          id: 5,
          label: "Physical Inspection of IDF and MDF",
          remark: "",
        },
        {
          id: 6,
          label: "Remove Temporary Files and Check Memory Process in NMS",
          remark: "",
          subInput: ["CPU", "RAM"],
          subInputValues: { CPU: "", RAM: "" },
        },
        {
          id: 7,
          label:
            "Check if disk free space is atleast 10% of disk size in All Attendant Console",
          remark: "",
        },
        {
          id: 8,
          label:
            " Remove Temporary files and run disk cleanup on All Attendant Console",
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
          label: " External cleaning of CCTV rack equipment(CER)",
          remark: "",
        },
        {
          id: 2,
          label:
            "Reviewing of windows event viewer in CLSTR,ENTZ,BVMS-1,BVMS-2",
          remark: "",
        },
        {
          id: 3,
          label: "Check for abnormal shutdown of recorder from event viewer",
          remark: "",
        },
        {
          id: 4,
          label:
            "Verify time synchronization for CLSTR,ENTZ,BVMS-1,BVMS-2 and HMI",
          remark: "",
        },
        {
          id: 5,
          label: "Verify logging status of recorder log files",
          remark: "",
        },
        {
          id: 6,
          label: " Reviewing disk management in CLSTR,ENTZ,BVMS-1,BVMS-2",
          remark: "",
        },
        {
          id: 7,
          label: "Remove Temporary files and run disk cleanup in OCC/BCC HMI",
          remark: "",
        },
        {
          id: 8,
          label: "Check if disk free space is atleast 10% of disk size in HMI",
          remark: "",
        },
        {
          id: 9,
          label:
            "Run server administrator in CLSTR,ENTZ,BVMS-1,BVMS-2 and check all Hardware status",
          remark: "",
        },
        {
          id: 10,
          label:
            "Verify Disk Space and clean Temp Files of CLSTR,ENTZ,BVMS-1,BVMS-2",
          remark: "",
        },
        {
          id: 11,
          label:
            "Check & Record Max. CPU and RAM Utilization status in HMI (shall be <80%)",
          remark: "",
          subInput: [
            "CC_CPU",
            "CC_RAM",
            "TC_CPU",
            "TC_RAM",
            "CSS_CPU",
            "CSS_RAM",
            "Security_CPU",
            "Security_RAM",
          ],
          subInputValues: {
            CC_CPU: "",
            CC_RAM: "",
            TC_CPU: "",
            TC_RAM: "",
            CSS_CPU: "",
            CSS_RAM: "",
            Security_CPU: "",
            Security_RAM: "",
          },
        },
        {
          id: 12,
          label: "Environmental Conditions Inspection in Server Rack",
          remark: "",
        },
      ],
    },
  ]);

  const [station, setstation] = useState("");
  const [date, setDate] = useState(formatDate(new Date().toLocaleString()));
  const [remarks, setRemarks] = useState("");
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
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/telecommaintenancechecklist/register">
              Monthly Maintenance Schedule
            </Link>
            <Link to="">Register</Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
            <form onSubmit={handleSubmit}>
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
                          onChange={() =>
                            toggleCheckbox(system.id, activity.id)
                          }
                        />
                        <div className="col-2 m-2">
                          <input
                            type="text"
                            className="form-control"
                            style={{ padding: "5px" }}
                            placeholder="Remarks"
                            value={activity.remark} // Bind value to the state
                            onChange={(e) =>
                              updateRemark(
                                system.id,
                                activity.id,
                                e.target.value
                              )
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
                  <select
                    placeholder="STATION"
                    className="form-control"
                    id="inputstnname"
                    value={station}
                    onChange={(e) => setstation(e.target.value)}
                    required
                  >
                    <option value="">Select Station</option>
                    {stationData
                      .filter((station) => station["Station Name"]) // Exclude entries with null station names
                      .map((station) => (
                        <option
                          key={station["STATION Code"]}
                          value={station["Station Name"]}
                        >
                          {station["Station Name"]}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Supervisor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={SName}
                    onChange={(e) => setSName(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={SempId}
                    onChange={(e) => setSEmpId(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <label>Supervisor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={MName}
                    onChange={(e) => setMName(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={MempId}
                    onChange={(e) => setMEmpId(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
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
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  style={{
                    width: "100px",
                    height: "50px",
                    textAlign: "center",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthlyMaintenanceSchedule;
