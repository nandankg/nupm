import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import {
  editData,
  fetchData,
} from "../../reducer/pinki/PMsheetMonthlyDepotReducer";

const EditPMsheetMonthlyDepot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");
  console.log(slug);
  const PMsheetMonthlyLists = useSelector((state) => state.pmsheetmonthly);
  const [items, setItems] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (PMsheetMonthlyLists.data && PMsheetMonthlyLists.data.data) {
      setItems(PMsheetMonthlyLists.data.data);
      setSlug(PMsheetMonthlyLists.slug);
    }
  }, [PMsheetMonthlyLists]);

  let filteredData;
  if (items.length > 0) {
    filteredData = items.filter((itm) => itm.id === id);
  }

  const fd = filteredData ? filteredData[0] : {};

  const basicInitialValues = {
    id: fd.id || "",
    systems: fd.systems || [],
    date: fd.date || "",
    station: fd.station || "",
    remarks: fd.remarks || "",
    notes: fd.notes || "",
    SName: fd.SName || "",
    SempId: fd.SempId || "",
    Ssignature: fd.Ssignature || "",
    SdateTime: fd.SdateTime || "",
    MName: fd.MName || "",
    MempId: fd.MempId || "",
    Msignature: fd.Msignature || "",
    MdateTime: fd.MdateTime || "",
    employee_id: fd.employee_id || "",
    department: fd.department || "",
    unit: fd.unit || "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  useEffect(() => {
    if (fd) {
      setFormValues(basicInitialValues);
    }
  }, [fd]);

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

  const updateRemark = (systemId, activityId, remark) => {
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

  const handleBCCChange = (systemId, activityId, BCCKey, zoneIndex, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            const updatedBCC = {
              ...activity[BCCKey],
              values: activity[BCCKey].values.map((v, i) =>
                i === zoneIndex ? value : v
              ),
            };
            return { ...activity, [BCCKey]: updatedBCC };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const handleSubCheckboxChange = (systemId, activityId, subLabel, checked) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            const updatedSubCheckboxes = {
              ...activity.subCheckboxes,
              [subLabel]: checked,
            };
            return { ...activity, subCheckboxes: updatedSubCheckboxes };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const handleSubInputChange = (systemId, activityId, subLabel, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            const updatedSubInputValues = {
              ...activity.subInputValues,
              [subLabel]: value,
            };
            return { ...activity, subInputValues: updatedSubInputValues };
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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "PM_Sheet Monthly Depot.pdf",
  });

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/pmsheetmonthlylist">PM Sheet Depot Monthly</Link>
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
                          {index + 1}. &nbsp;{activity.label}
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
                            style={{ padding: "5px" }}
                            placeholder="Remarks"
                            value={activity.remark}
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
                    className="form-control"
                    name="SempId"
                    value={formValues.SempId}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label>Signature</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Ssignature"
                    value={formValues.Ssignature}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label>Date & Time</label>
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
                  <label>Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="MempId"
                    value={formValues.MempId}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label>Signature</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Msignature"
                    value={formValues.Msignature}
                    onChange={handleChange}
                  />
                </div>
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
    </>
  );
};

export default EditPMsheetMonthlyDepot;
