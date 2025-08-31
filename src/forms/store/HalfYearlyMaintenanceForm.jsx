import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/store/HalfYearlyMaintenanceFormReducer";
import stationData from "../../data/station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const HalfYearlyMaintenanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PMsheetMonthlyList = useSelector((state) => state.pmdepothalfyearly);

  const [slug, setSlug] = useState(getLastParameter().trim());
  const basicInitialValues = {
    systems: [
      {
        id: 1,
        name: "PAS",
        activities: [
          {
            id: 1,
            label:
              "Checking the NCO,QSC and amplifier switch-over process",
            BCC1: {
        
              zones: ["Zone 1", "Zone 2", "Zone 3","Zone 4","Zone 5"],
              values: ["", "", "","",""],
            },
            
            remark: "",
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
              "Checking the switching of Normal to standby path and vice-versa station level",
            remark: "",
          },
          {
            id: 2,
            label:
              "Cleaning of internal Fans",
            remark: "",
          },
          {
            id: 3,
            label:
              " Check stacking status of DW switches",
            remark: "",
          },
          {
            id: 4,
            label:
              " Check stacking status of AW switches",
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
            label: "Physical inspection of all equipment in TER and DCC",
            remark: "",
          },
          {
            id: 2,
            label: "Perform Defragmentation of Windows drives in NVR",
            remark: "",
          },
          {
            id: 3,
            label: "Perform disk defragmentation and restart HMI.",
            remark: "",
          },
          
        ],
      },
      {
        id: 4,
        name: "Clock",
        activities: [
          {
            id: 1,
            label: "Cleaning of Racks and checking of all connections (Do not remove any connections)",
            remark: "",
          },
          {
            id: 2,
            label: "Check Data Circuits",
            remark: "",
          },
          
        ],
      },
      {
        id: 5,
        name: "Radio",
        activities: [
          {
            id: 1,
            label: "Inspection of all RF Connections",
            remark: "",
          },
          {
            id: 2,
            label: " Check TSC switch over",
            remark: "",

           
          },

          
        ],
      },
     
      {
        id: 6,
        name: "Tele phone",
        activities: [
          {
            id: 1,
            label: "Physical inspection of all equipment in TER & DCC",
            remark: "",
          },
         
        ],
      },
      
      {
        id: 7,
        name: "ACS",
        activities: [
          {
            id: 1,
            label: ".Physical inspection of all Controller in DCC & COET",
            remark: "",
          },
        ],
      },
      {
        id: 8,
        name: "OAIT",
        activities: [
          {
            id: 1,
            label: "Checking the switching of Normal to standby path and vice-versa station level",
            remark: "",
          },
          {
            id: 2,
            label: ".Cleaning of internal Fans",
            remark: "",
          },
        ],
      },
      {
        id: 9,
        name: "Mics",
        activities: [
          {
            id: 1,
            label: "Check labelling of all cables inside each Rack",
            remark: "",
          },
          {
            id: 2,
            label: " Check status of Locks of Telecom Racks, Equipments at TER, UPS, Concourse & PF level.",
            remark: "",
          },
        ],
      },
     
    ],
date:"",
    station: "",
    remarks: "",
    notes: "",
    SName: "",
    SempId: "",
    Ssignature: "",
    SdateTime: "",
    MName: "",
    MempId: "",
    Msignature: "",
    MdateTime: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
console.log(formValues)
  const handleBCCChange = (systemId, activityId, type, index, value) => {
    const updatedSystems = formValues.systems.map((system) => {
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
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  // Function to handle sub checkbox changes
  const handleSubCheckboxChange = (systemId, activityId, subLabel, checked) => {
    const updatedSystems = formValues.systems.map((system) => {
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
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  // Function to handle sub input changes
  const handleSubInputChange = (systemId, activityId, subLabel, value) => {
    const updatedSystems = formValues.systems.map((system) => {
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
    setFormValues({ ...formValues, systems: updatedSystems });
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  // Function to update remarks for an activity
  const updateRemark = (systemId, activityId, value) => {
    const updatedSystems = formValues.systems.map((system) => {
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
    setFormValues({ ...formValues, systems: updatedSystems });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/telecommaintenancechecklist/register">
            PM Sheet Depot Half Yearly
          </Link>
          <Link to="">Register</Link>
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
                                                      value={formValues.station}
                                                      onChange={(e) =>
                                                        setFormValues({ ...formValues, station: e.target.value })
                                                      }
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
                                                  <div className="col-md-6">
                                                  <label htmlFor="date" className="form-label">Date</label>
                                                  <input type="date" className="form-control"
                                                      id="date"
                                                      value={formValues.date}
                                                      onChange={(e) =>
                                                        setFormValues({ ...formValues, date: e.target.value })
                                                      }
                                                      required/>
                                                      </div>
                                                  </div>
                       
            {formValues.systems.map((system) => (
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
                                  required
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
                  name="notes"
                  value={formValues.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label>Supervisor Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="SName"
                  value={formValues.SName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="SempId"
                  className="form-control"
                  value={formValues.SempId}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="col-md-3">
                <label>Signature</label>
                <input
                  type="text"
                  name="Ssignature"
                  className="form-control"
                  value={formValues.Ssignature}
                  onChange={handleChange}
                />
              </div> */}
              <div className="col-md-3">
                <label>Date & Time</label>
                <input
                  type="datetime-local"
                  name="SdateTime"
                  className="form-control"
                  value={formValues.SdateTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label>Maintainer Name</label>
                <input
                  type="text"
                  name="MName"
                  className="form-control"
                  value={formValues.MName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="MempId"
                  className="form-control"
                  value={formValues.MempId}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="col-md-3">
                <label>Signature</label>
                <input
                  type="text"
                  name="Msignature"
                  className="form-control"
                  value={formValues.Msignature}
                  onChange={handleChange}
                />
              </div> */}
              <div className="col-md-3">
                <label>Date & Time</label>
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

export default HalfYearlyMaintenanceForm;
