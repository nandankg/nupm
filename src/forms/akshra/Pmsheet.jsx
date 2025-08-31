import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addsheet, addData } from "../../reducer/akshra/PmsheetReducer";

const Pmsheet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PMsheetList = useSelector((state) => state.PmsheetMonthly);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (PMsheetList) {
      setSlug(PMsheetList.slug);
    }
  }, [PMsheetList]);
  const [systems, setSystems] = useState([
    {
      id: 1,
      name: "PAS",
      activities: [
        {
          id: 1,
          label:
            "Check announcements at all zones by making local and central announcements. To be checked by visual inspection and observation and record the dB values from NCO.",
          BCC1: {
            label: "Previous Values",
            zones: ["Zone 1", "Zone 2", "Zone 3", "zone 4", "zone 5"],
            values: ["", "", "", "", ""],
          },
          BCC2: {
            label: "After Modification if any",
            zones: ["Zone 1", "Zone 2", "Zone 3", "zone 4", "zone 5"],
            values: ["", "", "", "", ""],
          },
          remark: "",
        },

        {
          id: 2,
          label: "Check the working of all microphones",
          remark: "",

          sub: ["PSB1", "PSB2"],
          subCheckboxes: { PSB1: false, PSB2: false },
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
          subInput: ["CPU", "RAM"],
          subInputValues: { CPU: "", RAM: "" },
        },
      ],
    },
    {
      id: 2,
      name: "PIDS",
      activities: [
        {
          id: 1,
          label: "Check PIDS panel all LED status by sending letter l from HMI",
          remark: "",
        },
        {
          id: 2,
          label:
            "Check  functionality of PIDS  by sending local and central messages.",
          remark: "",
        },
      ],
    },
    {
      id: 3,
      name: "FOTS",
      activities: [
        {
          id: 1,
          label:
            "Verification of signal for Main and standby paths for different Fots rings by using",
          remark: "",
        },
      ],
    },
    {
      id: 4,
      name: "Tele phone",
      activities: [
        {
          id: 1,
          label: "Check the functionality of IP phone",
          remark: "",
        },
        {
          id: 2,
          label: "Cleaning of external surface of EPABX & IPBX",
          remark: "",
        },
        {
          id: 3,
          label:
            "Check Internode & PSTN calls functionality for all phones (SCR)",
          remark: "",
        },
        {
          id: 4,
          label: "Check HDD LED  status of IPBX-1 & IPBX-2",
          remark: "",
        },
        {
          id: 5,
          label:
            "Check status  of both help phone & Emergency Phone and Make a call",
          remark: "",
        },
      ],
    },
    {
      id: 5,
      name: "CCTV",
      activities: [
        {
          id: 1,
          label: "External cleaning of CCTV rack equipment",
          remark: "",
        },
        {
          id: 2,
          label: "Reviewing of windows event viewer in NVR",
          remark: "",
        },
        {
          id: 3,
          label: "Check for abnormal shutdown of recorder from event viewer",
          remark: "",
        },
        {
          id: 4,
          label: "Verify time synchronization for HMI & NVR",
          remark: "",
        },
        {
          id: 5,
          label: "Reviewing disk management in NVR",
          remark: "",
        },
        {
          id: 6,
          label: "Remove Temporary files and run disk cleanup in CCTV HMI",
          remark: "",
        },
        {
          id: 7,
          label:
            "External cleaning of all cameras in platform,cocourse & Entry/Exit Areas.",
          remark: "",
        },

        {
          id: 8,
          label:
            "Check if disk free space is atleast 10% of disk size in CCTV HMI",
          remark: "",
        },
        {
          id: 9,
          label:
            " Check & Record Max.CPU & RAM Utilization status in CCTV HMI (shall be<80%)",
          remark: "",
          subInput: ["CPU", "RAM"],
          subInputValues: { CPU: "", RAM: "" },
        },
      ],
    },
    {
      id: 6,
      name: "CLOCK",
      activities: [
        {
          id: 1,
          label: "Check Back light status of Analog Clock",
          remark: "",
        },
        {
          id: 2,
          label:
            "Check the working of all outdoor digital clock and Analog Clock",
          remark: "",
        },
        {
          id: 3,
          label: "External Cleaning of Platform Digital & Analog Clocks",
          remark: "",
        },
        {
          id: 4,
          label: "Check Sync. status of Sub-master clock unit.",
          remark: "",
        },
      ],
    },

    {
      id: 7,
      name: "Radio",
      activities: [
        {
          id: 1,
          label: "Check status of TSC, BR and DPM",
          remark: "",
        },
        {
          id: 2,
          label: "Cleaning of RCPs, Call functions, RCP Antenna checking",
          remark: "",

          sub: [
            "Group_Call",
            "Private_Call",
            "Text_Message_Sending",
            "Emergency_Call",
          ],
          subCheckboxes: {
            Group_Call: false,
            Private_Call: false,
            Text_Message_Sending: false,
            Emergency_Call: false,
          },
        },

        {
          id: 3,
          label: "Verify Tower Aviation lamp status",
          remark: "",
        },

        {
          id: 4,
          label: "Check RSSI level in SCR (above -95 dBm)",
          remark: "",

          subInput: [
            "RCP_Radio_ID",
            "RSSI_value",
            "HP_Radio_ID",
            "RSSI_value2",
          ],
          subInputValues: {
            RCP_Radio_ID: "",
            RSSI_value: "",
            P_Radio_ID: "",
            RSSI_value2: "",
          },
        },
        {
          id: 5,
          label: "External cleaning of RCP",
          remark: "",
        },
        {
          id: 6,
          label:
            "Check the status of All Module(TSC,BR,PSU,Fan Rack etc.) of MTS-4",
          remark: "",
        },
      ],
    },
    {
      id: 8,
      name: "Radio-IBS",
      activities: [
        {
          id: 1,
          label: "Check the status of All Module of Master & Remote Unit",
          remark: "",
        },
      ],
    },

    {
      id: 9,
      name: "ACS",
      activities: [
        {
          id: 1,
          label: "Check the Power ON Status of EML of Doors",
          remark: "",
        },
        {
          id: 2,
          label: "Check the physical inspection of EML and Reader",
          remark: "",
        },
      ],
    },
    {
      id: 10,
      name: "Misc",
      activities: [
        {
          id: 1,
          label:
            "Perform Cleaning of all the Racks and External Cleaning of all the Rack Equipments in TER",
          remark: "",
        },
        {
          id: 2,
          label: "Check the status of Rack Fans",
          remark: "",
        },
        {
          id: 3,
          label:
            "Check the status of Earthing cables of each Rack  its Equipments",
          remark: "",
        },
      ],
    },

    // Add other systems similarly
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
      //Ssignature,
      SdateTime,
      MName,
      MempId,
      //Msignature,
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
          <Link to="/telecommaintenancechecklist/register">
            PM Sheet (STATION) Monthly
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
              {/*<div className="col-md-3">
                <label>Signature</label>
                <input
                  type="text"
                  className="form-control"
                  value={Ssignature}
                  onChange={(e) => setSSignature(e.target.value)}
                />
              </div>*/}
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
              {/*<div className="col-md-3">
                <label>Signature</label>
                <input
                  type="text"
                  className="form-control"
                  value={Msignature}
                  onChange={(e) => setMSignature(e.target.value)}
                />
              </div>*/}
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

export default Pmsheet;
