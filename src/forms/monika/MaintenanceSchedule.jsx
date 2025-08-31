import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/monika/MaintenanceReducer";
import { formatDate } from "../../data/formatDate";
// import { addDailyTelecomCheckList } from "../reducer/DailyTelecomCheckListReducer";

const MaintenanceSchedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MaintenanceScheduleList = useSelector((state) => state.Maintenance);

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (MaintenanceScheduleList) {
      setSlug(MaintenanceScheduleList.slug);
    }
  }, [MaintenanceScheduleList]);
  const basicInitialValues = {
    systems: [
      {
        id: 1,
        name: "PAS",
        activities: [
          {
            id: 1,
            label: "Checking the NCO,QSC and amplifier switch-over process",
            checked: "no",
          },
        ],
        remarks: "",
        zones: ["", "", "", "", ""],
      },
      {
        id: 2,
        name: "FOTS",
        activities: [
          {
            id: 1,
            label:
              "Checking the switching of Normal to standby path and vice-versa station level",
            checked: "no",
          },
          {
            id: 2,
            label: "Cleaning of internal Fans",
            checked: "no",
          },
          {
            id: 3,
            label: "Check stacking status of DW switches",
            checked: "no",
          },
          {
            id: 4,
            label: "Check stacking status of AW switches",
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
            label: "Physical inspection of all equipment in TER and DCC",
            checked: "no",
          },
          {
            id: 2,
            label: "Perform Defragmentation of Windows drives in NVR",
            checked: "no",
          },
          {
            id: 3,
            label: "Perform disk defragmentation and restart HMI",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 4,
        name: "Clock",
        activities: [
          {
            id: 1,
            label:
              "Cleaning of Racks and checking of all connections (Do not remove any connections)",
            checked: "no",
          },
          {
            id: 2,
            label: "Check Data Circuits",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 5,
        name: "Radio",
        activities: [
          {
            id: 1,
            label: "Inspection of all RF Connections",
            checked: "no",
          },
          {
            id: 2,
            label: "Check TSC switch over",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 6,
        name: "TELEPHONE",
        activities: [
          {
            id: 1,
            label: "Physical inspection of all equipment in TER & DCC",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 7,
        name: "ACS",
        activities: [
          {
            id: 1,
            label: "Physical inspection of all Controller in DCC & COET",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 8,
        name: "OAIT",
        activities: [
          {
            id: 1,
            label:
              "Checking the switching of Normal to standby path and vice-versa station level",
            checked: "no",
          },
          {
            id: 2,
            label: "Cleaning of internal Fans",
            checked: "no",
          },
        ],
        remarks: "",
      },
      {
        id: 9,
        name: "Mics",
        activities: [
          {
            id: 1,
            label: "Check labelling of all cables inside each Rack",
            checked: "no",
          },
          {
            id: 2,
            label:
              "Check status of Locks of Telecom Racks, Equipments at TER, UPS, Concourse &",
            checked: "no",
          },
        ],
        remarks: "",
      },
    ],
    station: "",
    date: formatDate(new Date().toString()),
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

  // const [notes, setNotes] = useState("");
  // const [supervisorName, setSupervisorName] = useState("");
  // const [supervisorEmpId, setSupervisorEmpId] = useState("");
  // const [supervisorSignature, setSupervisorSignature] = useState("");
  // const [supervisorDateTime, setSupervisorDateTime] = useState("");
  // const [maintainerName, setMaintainerName] = useState("");
  // const [maintainerEmpId, setMaintainerEmpId] = useState("");
  // const [maintainerSignature, setMaintainerSignature] = useState("");
  // const [maintainerDateTime, setMaintainerDateTime] = useState("");

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
  const handleZoneChange = (systemId, zoneIndex, newZone) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedZones = system.zones.map((zone, index) =>
          index === zoneIndex ? newZone : zone
        );
        return { ...system, zones: updatedZones };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
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
            HALF YEARLY MAINTENANCE SCHEDULE
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
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
                      </div>
                    </div>
                  ))}
                </div>

                {system.name === "PAS" && (
                  <div>
                    {system.zones.map((zone, index) => (
                      <div className="row mb-3" key={index}>
                        <div className="col-md-2">
                          <label>Zone {index + 1}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={zone}
                            onChange={(e) =>
                              handleZoneChange(system.id, index, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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

export default MaintenanceSchedule;
