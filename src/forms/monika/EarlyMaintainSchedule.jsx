import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import stationData from "../../station.json";
import { addData, addEarlyMaintain } from "../../reducer/monika/EarlyReducer";
import { formatDate } from "../../data/formatDate";
// import { addDailyTelecomCheckList } from "../reducer/DailyTelecomCheckListReducer";

const EarlyMaintainSchedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const EarlyMaintainScheduleList = useSelector((state) => state.EarlyMaintain);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (EarlyMaintainScheduleList) {
      setSlug(EarlyMaintainScheduleList.slug);
    }
  }, [EarlyMaintainScheduleList]);

  const basicInitialValues = {
    systems: [
      {
        id: 1,
        name: "PAS",
        activities: [
          {
            id: 1,
            label: "Check emergency message priority sequence.",
            checked: "no",
          },
          {
            id: 2,
            label:
              "a.Announcement from PSB overrides SCR HMI Emergency messages",
            checked: "no",
          },
          {
            id: 3,
            label:
              "b.SCR HMI emergency announcement overrides OCC emergency messages",
            checked: "no",
          },
          {
            id: 4,
            label:
              "Perform the Internal cleaning of amplifiers with shutting down of necessary equipments",
            checked: "no",
          },
          {
            id: 5,
            label: "Take the backup of NCO and QSC",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 2,
        name: "PIDS",
        activities: [
          {
            id: 1,
            label:
              "Clean inside of display boards using a clean cloth and a brush",
            checked: "no",
          },
          {
            id: 2,
            label: "Take the backup of Concorse PIDS",
            checked: "no",
          },
          {
            id: 3,
            label: "Take the backup of Concorse PIDS",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 3,
        name: "CCTV",
        activities: [
          {
            id: 1,
            label: "Perform the Internal Cleaning of CCTV HMI & SECURITY HMI.",
            checked: "no",
          },
          {
            id: 2,
            label: "Check the station level ring verification",
            checked: "no",
          },
          {
            id: 3,
            label: "Perform the Internal Cleaning of NVR",
            checked: "no",
          },

          {
            id: 4,
            label: "Take Backup of all Access Switch",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 4,
        name: "FOTS",
        activities: [
          {
            id: 1,
            label:
              "Checking of fiber continuity and fiber loss for dark fibers, using OTDR Power-Source Meter Record the values in Fiber loss sheet.",
            checked: "no",
          },
          {
            id: 2,
            label: "Take the backup of All DSW and ASW",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 5,
        name: "TELEPHONE",
        activities: [
          {
            id: 1,
            label:
              "Internal cleaning of EPABX cabinet by shutting down completely",
            checked: "no",
          },
          {
            id: 2,
            label: " Internal cleaning of IPBX server",
            checked: "no",
          },
          {
            id: 3,
            label: "Take the backup of IPBX and Media Gateway",
            checked: "no",
          },
          {
            id: 4,
            label: "Preform redundancy checks on IPMAX-2(CPUs)",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 6,
        name: "ACDB",
        activities: [
          {
            id: 1,
            label: "Check for Correctness/ tightness of MCBs.",
            checked: "no",
          },
          {
            id: 2,
            label:
              "Measure the Output Voltages and observe for any Abnormalities.",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 7,
        name: "UPS",
        activities: [
          {
            id: 1,
            label:
              "1.Internal cleaning of Cubical of UPS System(ATS,UPS-1,UPS2,SCVS,ACDB)",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 8,
        name: "SMPS",
        activities: [
          {
            id: 1,
            label: "Internal cleaning all Module of SMPS",
            checked: "no",
          },
          {
            id: 2,
            label: "Check parameters of SMPS from Display Panel",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 9,
        name: "IBS",
        activities: [
          {
            id: 1,
            label: "Visual Inspection of MU & RU",
            checked: "no",
          },
          {
            id: 2,
            label: "RF Power measurment",
            checked: "no",
          },
          {
            id: 3,
            label: "Check the redundancy paths functional status",
            checked: "no",
          },
        ],
        remarks: "",
      },

      {
        id: 10,
        name: "RADIO",
        activities: [
          {
            id: 1,
            label: "Base Radio RF test",
            checked: "no",
            details: [
              { label: "Tx Frequency (Mhz)", br1: "", br2: "" },
              { label: "Rx Frequency (Mhz)", br1: "", br2: "" },
              { label: "Forward power", br1: "", br2: "" },
              { label: "Reflected power", br1: "", br2: "" },
              { label: "VSWR", br1: "", br2: "" },
            ],
          },
          {
            id: 2,
            label: "Take the backup of MTS-4",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 11,
        name: "OAIT",
        activities: [
          {
            id: 1,
            label: "Take the backup of OAIT Switch",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 12,
        name: "EARTHING",
        activities: [
          {
            id: 1,
            label: "Measurement of clean earth resistance",
            checked: "no",
          },
          {
            id: 2,
            label:
              "Checking of Earthing continuity and Maintenance of earth pits",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 13,
        name: "ACS",
        activities: [
          {
            id: 1,
            label: "Take Event log from BIS client at NMS",
            checked: "no",
          },
          {
            id: 2,
            label: "Take Backup of BIS server",
            checked: "no",
          },
        ],
        remarks: "",
      },
    ],
    station: "",

    date: formatDate(new Date().toString()),
    station:"",
    date:"",
    remarks: "",
    notes: "--",
    SName: "--",
    SempId: "--",
    Ssignature: "--",
    SdateTime: "--",
    MName: "--",
    MempId: "--",
    Msignature: "--",
    MdateTime: "--",
    employee_id: "21",
    department: "s&t",
    unit: "Telecom",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const toggleCheckbox = (systemId, activityId) => {
    const updatedSystems = formValues.systems.map((system) => {
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
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  // const [notes, setNotes] = useState("");
  // const [supervisorName, setSupervisorName] = useState("");
  // const [supervisorEmpId, setSupervisorEmpId] = useState("");
  // const [supervisorSignature, setSupervisorSignature] = useState("");
  // const [supervisorDateTime, setSupervisorDateTime] = useState("");
  // const [maintainerName, setMaintainerName] = useState("");
  // const [maintainerEmpId, setMaintainerEmpId] = useState("");
  // const [maintainerSignature, setMaintainerSignature] = useState("");
  // const [maintainerDateTime, setMaintainerDateTime] = useState("");

  const toggleAllCheckboxes = (systemId, checked) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => ({
          ...activity,
          checked: checked ? "yes" : "no",
        }));
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const handleRemarksChange = (systemId, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        return { ...system, remarks: value };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const handleDetailChange = (
    systemId,
    activityId,
    detailIndex,
    field,
    value
  ) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            const updatedDetails = activity.details.map((detail, index) => {
              if (index === detailIndex) {
                return { ...detail, [field]: value };
              }
              return detail;
            });
            return { ...activity, details: updatedDetails };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues(updatedSystems);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            YEARLY MAINTENANCE SCHEDULE
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="inputstation" className="form-label">
                              Station
                            </label>
                            <select
                              className="form-control"
                              id="station"
                              onChange={(e) =>
                                setFormValues({ ...formValues, station: e.target.value })
                              }
                              
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
                          <div className="col-md-6">
                          <label htmlFor="inputstation" className="form-label">
                              Date
                            </label>
                          <input
                          type="date"
                              className="form-control"
                              id="station"
                              onChange={(e) =>
                                setFormValues({ ...formValues, date: e.target.value })
                              }
                              
                            />
                          </div>
                        </div>
            {formValues.systems.map((system) => (
              <div key={system.id}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>
                      <b>{system.name}</b> &nbsp;
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
                    </label>
                  </div>
                </div>
                <div>
                  {system.activities.map((activity, index) => (
                    <div className="mb-3" key={activity.id}>
                      <div className="col-md-12">
                        <label>
                          {index + 1}. &nbsp;
                          {activity.label}
                        </label>
                        <input
                          type="checkbox"
                          checked={activity.checked === "yes"}
                          onChange={() =>
                            toggleCheckbox(system.id, activity.id)
                          }
                        />
                        {activity.label === "Base Radio RF test" && (
                          <div>
                            {activity.details.map((detail, index) => (
                              <div key={index}>
                                <label>{detail.label}</label>
                                <input
                                  type="text"
                                  placeholder="BR1"
                                  value={detail.br1}
                                  onChange={(e) =>
                                    handleDetailChange(
                                      system.id,
                                      activity.id,
                                      index,
                                      "br1",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="text"
                                  placeholder="BR2"
                                  value={detail.br2}
                                  onChange={(e) =>
                                    handleDetailChange(
                                      system.id,
                                      activity.id,
                                      index,
                                      "br2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Remarks</label>
                    <input
                      type="text"
                      className="form-control"
                      value={system.remarks}
                      onChange={(e) =>
                        handleRemarksChange(system.id, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="row mb-3">
              <div className="col-md-12">
                <label>Notes</label>
                <input
                  type="text"
                  className="form-control"
                  name="notes"
                  value={formValues.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label>Supervisor Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="SName"
                  value={formValues.SName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Supervisor EMP ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="SempId"
                  value={formValues.SempId}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="col-md-3">
                <label>Supervisor Signature</label>
                <input
                  type="text"
                  className="form-control"
                  name="Ssignature"
                  value={formValues.Ssignature}
                  onChange={handleChange}
                />
              </div> */}
              <div className="col-md-4">
                <label>Supervisor Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="SdateTime"
                  value={formValues.SdateTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label>Maintainer Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="MName"
                  value={formValues.MName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Maintainer EMP ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="MempId"
                  value={formValues.MempId}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="col-md-3">
                <label>Maintainer Signature</label>
                <input
                  type="text"
                  className="form-control"
                  name="Msignature"
                  value={formValues.Msignature}
                  onChange={handleChange}
                />
              </div> */}
              <div className="col-md-4">
                <label>Maintainer Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="MdateTime"
                  value={formValues.MdateTime}
                  onChange={handleChange}
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

export default EarlyMaintainSchedule;
