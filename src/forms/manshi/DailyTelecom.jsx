import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import { addData } from "../../reducer/manshi/DailyTelecomReducer";
import stationData from "../../data/station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const DailyTelecom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const DailyTelecomListData = useSelector((state) => state.DailyTelecom);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);

  const basicInitialValues = {
    
    systems: [
      {
        id: 1,
        name: "PAS-PIDS",
        activities: [
          {
            id: 1,
            label: ".Check and clear alarms in PIDS-PAS HMI",
            checked: "no",
          },
          {
            id: 2,
            label: "Visual Inspection of CL,PF PIDS Display & PF Adv. Panel",
            checked: "no",
          },
          {
            id: 3,
            label: "Checking of PAS equipment in TER & PF",
            checked: "no",
          },
        ],
      },
      {
        id: 2,
        name: "FOTS",
        activities: [
          {
            id: 1,
            label: "Check for alarm indications in DSW, ASW & CCTV SWITCH",
            checked: "no",
          },
          {
            id: 2,
            label: "Visual Inspection of LED Status of DSW,ASW & CCTV SWITCH",
            checked: "no",
          },
        ],
      },
      {
        id: 3,
        name: "CCTV",
        activities: [
          {
            id: 1,
            label: "Check Camera Status on Operator Client",
            checked: "no",
          },
          {
            id: 2,
            label: "Check NVR & All HDD LED status",
            checked: "no",
          },
          {
            id: 3,
            label: "Check and clear alarms in CCTV HMI",
            checked: "no",
          },
          {
            id: 4,
            label: "Check platform monitor working",
            checked: "no",
          },
          {
            id: 5,
            label:
              "Check both recording of all camera is available for both main and redundant ",
            checked: "no",
          },
        ],
      },
      {
        id: 4,
        name: "Clock",
        activities: [
          {
            id: 1,
            label: "Visual Inspection of Sub-Master Clock",
            checked: "no",
          },
          {
            id: 2,
            label: "Check working of Platform clocks & Analog clocks",
            checked: "no",
          },
        ],
      },
      {
        id: 5,
        name: "Radio",
        activities: [
          {
            id: 1,
            label:
              "Check working of RCP and SCR Handportable by making test call",
            checked: "no",
          },
          {
            id: 2,
            label: "Check if any alarm indications in MTS-4",
            checked: "no",
          },
        ],
      },
      {
        id: 6,
        name: "ACS",
        activities: [
          {
            id: 1,
            label: "Check the display of AMC-1 & AMC-2",
            checked: "no",
          },
          {
            id: 2,
            label: "Check LED Status of PSU of AMC & EML of all door",
            checked: "no",
          },
        ],
      },
      {
        id: 7,
        name: "OAIT",
        activities: [
          {
            id: 1,
            label: "Check for alarm indications in OAIT SW",
            checked: "no",
          },
          {
            id: 2,
            label: "Visual Inspection of LED Status of OAIT SW",
            checked: "no",
          },
        ],
      },
      {
        id: 8,
        name: "IBS",
        activities: [
          {
            id: 1,
            label: "Check Master Unit & Remote Unit LED status and Alarm",
            checked: "no",
          },
        ],
      },
      {
        id: 9,
        name: "ACDB/DCDB",
        activities: [
          {
            id: 1,
            label: "Check the lamp status of ACDB & DCDB",
            checked: "no",
          },
        ],
      },
      {
        id: 10,
        name: "UPS",
        activities: [
          {
            id: 1,
            label:
              "Check Incomer-I and Incomer-II availbility Status on ATS Rack",
            checked: "no",
          },
          {
            id: 2,
            label: "Check Alarm LED Status of ELCB in ATS Rack",
            checked: "no",
          },
          {
            id: 3,
            label: "Check Alarm LED Status of SCVS Rack",
            checked: "no",
          },
          {
            id: 4,
            label: "Check Status of UPS-1 and UPS-2 On Display",
            checked: "no",
          },
          {
            id: 5,
            label: "Check LED Status of ACDB",
            checked: "no",
          },
          {
            id: 6,
            label: "Visual inspection of BB-1 & BB-2",
            checked: "no",
          },
        ],
      },
      {
        id: 11,
        name: "SMPS",
        activities: [
          {
            id: 1,
            label: "Check and clear alarms in SMPS-1 & SMPS-2",
            checked: "no",
          },
          {
            id: 2,
            label: "Visual Inspection of LED Status of all SMR",
            checked: "no",
          },
          {
            id: 3,
            label: "Visual inspection of BB-1 & BB-2",
            checked: "no",
          },
        ],
      },
      {
        id: 12,
        name: "GENERAL",
        activities: [
          {
            id: 1,
            label:
              "Check status of AC & Note down TER and UPS Room Temperature (Maintained below 30°C)",
            checked: "no",
          },
          {
            id: 2,
            label: "Check Working Status of Rack Fans",
            checked: "no",
          },
          {
            id: 3,
            label: "Check water leakage in TER & UPS Rooms",
            checked: "no",
          },
        ],
      },
      {
        id: 13,
        name: "TELEPHONE",
        activities: [
          {
            id: 1,
            label: "Check LED Status of IPBX-1 & IPBX-2",
            checked: "no",
          },
          {
            id: 2,
            label: "Check Status of Cards of Media Gateways",
            checked: "no",
          },
          {
            id: 3,
            label: "Check the LED Status of VOIP Switch",
            checked: "no",
          },
        ],
      },
      // Add the rest of the systems here...
    ],
    date: formatDate(new Date().toDateString()),
    station: "",
    remarks: "",
    notes: "",
    verifiedBy: "----",
    empName: "",
    empId: "",
    signature: "",
    dateTime: "",
    rectifiedDate: "",
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
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link>Daily Telecom Maintenance Checklist</Link>
          <Link to="">Register</Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">
                Daily Telecom Maintenance Checklist
              </h3>
              <div className="heading-line"></div>
            </div>
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
                                        </div>
                        
            {formValues.systems.map((system) => (
              <div key={system.id}>
                <div className="row mb-3">
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
                <div>
                  {system.activities.map((activity, index) => (
                    <div className="mb-3" key={activity.id}>
                      <div className="col-md-12 d-flex align-items-center">
                        <label className="text-start">
                          {index + 1}. &nbsp;
                          {activity.label}
                        </label>
                        <input
                          type="checkbox"
                          style={{ flex: 0 }}
                          checked={activity.checked === "yes"}
                          onChange={() =>
                            toggleCheckbox(system.id, activity.id)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="row mb-3">
              <div className="col-md-12">
                <label>Remarks</label>
                <input
                  type="text"
                  className="form-control"
                  name="remarks"
                  value={formValues.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Notes for Installation & other pending issues</label>
                <input
                  type="text"
                  className="form-control"
                  name="notes"
                  value={formValues.notes}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label>Rectified Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="rectifiedDate"
                  value={formValues.rectifiedDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label>Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="dateTime"
                  value={formValues.dateTime}
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

export default DailyTelecom;
