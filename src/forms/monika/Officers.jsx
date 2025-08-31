import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../reducer/monika/OfficerReducer";
import { formatDate } from "../../data/formatDate";

const Officers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Officers = useSelector((state) => state.Officers);
  const [slug, setSlug] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (Officers) {
      setSlug(Officers.slug);
    }
  }, [Officers]);

  const basicInitialValues = {
    systems: [
      {
        id: 1,
        name: "CCTV",
        activities: [
          {
            id: 1,
            label: "Check Camera Status On Display",
            checked: "no",
            remark: "",
          },
          {
            id: 2,
            label: "Check NVR & All HDD LED status",
            checked: "no",
            remark: "",
          },
          {
            id: 3,
            label: "Check for alarm indications in CCTV SW",
            checked: "no",
            remark: "",
          },
          {
            id: 4,
            label: "Check all Camera recording availbility Status",
            checked: "no",
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
            label: "Check LED Status of Telepnone Exchange",
            checked: "no",
            remark: "",
          },
          {
            id: 2,
            label: "Check Status of Telephone dail tone",
            checked: "no",
            remark: "",
          },
        ],
      },
      {
        id: 3,
        name: "PAS",
        activities: [
          {
            id: 1,
            label: "Check the working Status PAS Call station",
            checked: "no",
            remark: "",
          },
          {
            id: 2,
            label: "Checking of PAS equipment in Telecom room",
            checked: "no",
            remark: "",
          },
          {
            id: 3,
            label: "Checking of PAS equipment of Temple",
            checked: "no",
            remark: "",
          },
          {
            id: 4,
            label: "Check the working Status of fire integration with PAS",
            checked: "no",
            remark: "",
          },
        ],
      },
      {
        id: 4,
        name: "UPS",
        activities: [
          {
            id: 1,
            label: "Check Incomer availbility Status",
            checked: "no",
            remark: "",
          },
          {
            id: 2,
            label: "Check Status of UPS On Display",
            checked: "no",
            remark: "",
          },
          {
            id: 3,
            label: "Visual inspection of Battery bank",
            checked: "no",
            remark: "",
          },
          {
            id: 4,
            label: "Check Status of ACDB",
            checked: "no",
            remark: "",
          },
        ],
      },
      {
        id: 5,
        name: "GENERAL",
        activities: [
          {
            id: 1,
            label:
              "Check status of AC & Note down Telecom roomTemperature (Maintained below 30°C)",
            checked: "no",
            remark: "",
          },
          {
            id: 2,
            label: "Check Working Status of Rack Fans",
            checked: "no",
            remark: "",
          },
          {
            id: 3,
            label: "Check water leakage in Telecom room & CCTV SW Rack",
            checked: "no",
            remark: "",
          },
        ],
      },
    ],
    date: "",
    remarks: "",
    staffname: "",
    signature: "--",
    employee_id: "21",
    department: "s&t",
    unit: "Telecom",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

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

  const handleRemarkChange = (systemId, activityId, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return { ...activity, remark: value };
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(addData(formValues)).unwrap();
      alert("Data saved successfully!");
      navigate(`/list/${slug}`);
    } catch (error) {
      setError("Failed to save data: " + error.message);
    }
  };

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link>Location: Officers Colony</Link>
          <Link to="">Register</Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            {formValues.systems.map((system) => (
              <div key={system.id}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label className="form-label">
                      <b>{system.name}</b> &nbsp;
                      <input
                        type="checkbox"
                        checked={system.activities.every(
                          (a) => a.checked === "yes"
                        )}
                        onChange={(e) =>
                          toggleAllCheckboxes(system.id, e.target.checked)
                        }
                        aria-label={`Select all activities for ${system.name}`}
                      />
                      &nbsp; Select All
                    </label>
                  </div>
                </div>
                <div>
                  {system.activities.map((activity, index) => (
                    <div className="row mb-3" key={activity.id}>
                      <div className="col-md-6">
                        <label
                          htmlFor={`activity-${system.id}-${activity.id}`}
                          className="form-label"
                        >
                          {index + 1}. {activity.label}
                        </label>
                        <input
                          type="checkbox"
                          id={`activity-${system.id}-${activity.id}`}
                          checked={activity.checked === "yes"}
                          onChange={() => toggleCheckbox(system.id, activity.id)}
                          aria-label={activity.label}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`remark-${system.id}-${activity.id}`}
                          className="form-label"
                        >
                          Remark
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`remark-${system.id}-${activity.id}`}
                          value={activity.remark}
                          onChange={(e) =>
                            handleRemarkChange(system.id, activity.id, e.target.value)
                          }
                          aria-label={`Remark for ${activity.label}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="remarks" className="form-label">
                  Remarks
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="remarks"
                  name="remarks"
                  value={formValues.remarks}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="staffname" className="form-label">
                  Name Of Staff Verified
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="staffname"
                  name="staffname"
                  value={formValues.staffname}
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

export default Officers;