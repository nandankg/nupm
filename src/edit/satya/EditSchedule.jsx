import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import { editData, fetchData } from '../../reducer/satya/MonthlyMaintenanceScheduleReducer';
import stationData from "../../station.json";

const EditSchedule = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [date, setDate] = useState(new Date());
    const { id } = location.state;
    console.log(id);
    const dispatch = useDispatch();
    const monthlymaintenance = useSelector((state) => state.schedule || []);
    const [slug, setSlug] = useState("");
    console.log(slug);
    console.log(monthlymaintenance.data.data);
    const [items, setItems] = useState([]);
    console.log(items);

    useEffect(() => {
        dispatch(fetchData());
      }, [dispatch]);

      useEffect(() => {
        if (monthlymaintenance) {
          setSlug(monthlymaintenance.slug);
        }
      }, [monthlymaintenance]);

      useEffect(() => {
          if (monthlymaintenance.data && monthlymaintenance.data.data) {
              setItems(monthlymaintenance.data.data);
          }
      }, [monthlymaintenance]);
  
      
      let dt = [];
      let filteredData;
      if (items.length > 0) {
        filteredData = items.filter((itm) => itm.id === id);
      } 
      const fd = filteredData ? filteredData[0] : {};

      const basicInitialValues = {
        id: fd.id || "",
        station: fd?.station || '',
        systems: fd?.systems || [],
        date: fd?.date || '',
        remarks: fd?.remarks || '',
        notes: fd?.notes || '',
        SName: fd?.SName || '',
        SempId: fd?.SempId || '',
        Ssignature: fd?.Ssignature || '',
        SdateTime: fd?.SdateTime || '',
        MName: fd?.MName || '',
        MempId: fd?.MempId || '',
        Msignature: fd?.Msignature || '',
        MdateTime: fd?.MdateTime || '',
      };
      const [formValues, setFormValues] = useState(basicInitialValues);
      
      useEffect(() => {
        if (fd) {
            setFormValues(basicInitialValues);
        }
    }, [fd]);

    const [station, setstation] = useState("");
    const [SName, setSName] = useState("");
    const [SempId, setSEmpId] = useState("");
    const [SdateTime, setSDateTime] = useState("");
    const [MName, setMName] = useState("");
  
    const [MempId, setMEmpId] = useState("");
    const [MdateTime, setMDateTime] = useState("");

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

  return (
    <>
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            PM Sheet (OCC & BCC) Monthly
          </Link>
          <Link to="">Edit</Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
       
          <form onSubmit={handleSubmit}>
          <div className=" mb-3 form-heading-container">
                            <h3 className="form-heading">PM Sheet (OCC & BCC) Monthly </h3>
                            <div className="heading-line"></div>
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
                          className="form-control"
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
                              <div className="" key={zone}>
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
                  value={formValues.station || ""}
                  onChange={(e) =>
                    setFormValues({ ...formValues, station: e.target.value }) // Update formValues dynamically
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
              </div></div>
            
            <div className="row mb-3">
              <div className="col-md-4">
                <label>Supervisor Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.SName}
                  onChange={(e) =>
                    setFormValues({ ...formValues, SName: e.target.value }) // Update formValues dynamically
                  }
                />
              </div>
              <div className="col-md-4">
                <label>Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.SempId}
                  onChange={(e) =>
                    setFormValues({ ...formValues, SempId: e.target.value }) // Update formValues dynamically
                  }
                />
              </div>
              <div className="col-md-4">
                <label>Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={formValues.SdateTime}
                  onChange={(e) =>
                    setFormValues({ ...formValues, SdateTime: e.target.value }) // Update formValues dynamically
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label>Supervisor Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.MName}
                  onChange={(e) =>
                    setFormValues({ ...formValues, MName: e.target.value }) // Update formValues dynamically
                  }
                />
              </div>
              <div className="col-md-4">
                <label>Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.MempId}
                  onChange={(e) =>
                    setFormValues({ ...formValues, MempId: e.target.value }) // Update formValues dynamically
                  }
                />
              </div>
              <div className="col-md-4">
                <label>Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={formValues.MdateTime}
                  onChange={(e) =>
                    setFormValues({ ...formValues, MdateTime: e.target.value }) // Update formValues dynamically
                  }
                />
              </div>
            </div>

            <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary mt-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
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

export default EditSchedule;