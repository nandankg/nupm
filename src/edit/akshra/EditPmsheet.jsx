import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/akshra/PmsheetReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const EditPmsheet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const PMsheetList = useSelector((state) => state.PmsheetMonthly);
  console.log(PMsheetList.data.data);
  const [items, setItems] = useState([]);
  
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(PMsheetList.data.data);
  }, []);
  useEffect(() => {
    setItems(PMsheetList.data.data);
  }, [PMsheetList]);
  let dt = [];
  const itmm = PMsheetList.data.data;
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const fd = filteredData[0];
  const initialFormState = {
    id: fd.id,
    systems: fd.systems,
    station: fd.station,
    date: fd.date,
    remarks: fd.remarks,
    notes: fd.notes,
    SName: fd.SName,
    SempId: fd.SempId,
    Ssignature: fd.Ssignature,
    SdateTime: fd.SdateTime,
    MName: fd.MName,
    MempId: fd.MempId,
    Msignature: fd.Msignature,
    MdateTime: fd.MdateTime,
  };

  const [formValues, setFormValues] = useState(initialFormState);
  console.log(formValues);

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

    dispatch(editData(formValues));
    navigate("/pmsheet/list");
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
                <label>Signature</label>
                <input
                  type="text"
                  className="form-control"
                  value={Ssignature}
                  onChange={(e) => setSSignature(e.target.value)}
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
                <label>Signature</label>
                <input
                  type="text"
                  className="form-control"
                  value={Msignature}
                  onChange={(e) => setMSignature(e.target.value)}
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

export default EditPmsheet;
