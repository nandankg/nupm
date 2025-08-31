import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, editData } from "../../reducer/monika/EarlyReducer";
import { formatDate } from "../../data/formatDate";

function EarlyMaintainEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const EarlyMaintainScheduleList = useSelector((state) => state.EarlyMaintain);
  console.log(EarlyMaintainScheduleList.data.data);
  const [items, setItems] = useState([]);
  const [systems, setSystems] = useState([]);
  const itmm = EarlyMaintainScheduleList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(EarlyMaintainScheduleList.data.data);
  }, []);
  useEffect(() => {
    setItems(EarlyMaintainScheduleList.data.data);
    setSlug(EarlyMaintainScheduleList.slug);
  }, [EarlyMaintainScheduleList]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    date: formatDate(fd.date),
    station: fd.station,
    systems: fd.systems,

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
    formType: "pm-station-yearly",
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
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
    const updatedSystems = formValues.map((system) => {
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
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/form/pm-station-yearly">
            YEARLY MAINTENANCE SCHEDULE
          </Link>
          <Link underline="hover" color="inherit">
            Edit
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
                <label>Supervisor EMP ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="SempId"
                  value={formValues.SempId}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label>Supervisor Signature</label>
                <input
                  type="text"
                  className="form-control"
                  name="Ssignature"
                  value={formValues.Ssignature}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
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
              <div className="col-md-3">
                <label>Maintainer Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="MName"
                  value={formValues.MName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label>Maintainer EMP ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="MempId"
                  value={formValues.MempId}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label>Maintainer Signature</label>
                <input
                  type="text"
                  className="form-control"
                  name="Msignature"
                  value={formValues.Msignature}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
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
}

export default EarlyMaintainEdit;
