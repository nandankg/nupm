import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData, addData } from "../../reducer/redux/tableDataSlice";
import stationData from "../../data/station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const DailycheckListMainline = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const dailychecklist = useSelector((state) => state.data);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const initialFormData = [
    {
      system: "AG",
      activities: [
        "Check serviceability of gates",
        "Check flap alignment",
        "Check LAN status of all gates",
        "Check date and time synchronization",
      ],
      deficiencyObserved: "",
      actionTaken: "",
    },
    {
      system: "TOM",
      activities: [
        "Check serviceability of all TOM",
        "Check display on monitors",
        "Check touch is working on monitors",
        "Check serviceability of POS",
        "Check display on PID",
        "Check printer functionality",
        "Check serviceability of all Counter comm. system",
        "Check LAN status of all TOM",
        "Check date and time synchronization",
      ],
      deficiencyObserved: "",
      actionTaken: "",
    },
    {
      system: "TVM",
      activities: [
        "Check serviceability of all TVM",
        "Check touch is working on monitors",
        "Check LAN status of all TVM",
        "Check date and time synchronization",
      ],
      deficiencyObserved: "",
      actionTaken: "",
    },
    {
      system: "RCTM",
      activities: [
        "Check serviceability of all RCTM",
        "Check touch is working on monitors",
        "Check LAN status of all RCTM",
        "Check date and time synchronization",
      ],
      deficiencyObserved: "",
      actionTaken: "",
    },
    {
      system: "AVM",
      activities: [
        "Check serviceability of all AVM",
        "Check LAN status of all AVM",
        "Check date and time synchronization",
      ],
      deficiencyObserved: "",
      actionTaken: "",
    },
    {
      system: "SC",
      activities: [
        "Check serviceability of SC",
        "Check LAN status of each device in Device Manager",
        "Check LAN status of SC",
        "Check date and time synchronization",
      ],
      deficiencyObserved: "",
      actionTaken: "",
    },
    {
      system: "EC & Isolator",
      activities: [
        "Visual Inspection of all EC (TOM, UPS, SCR, EFO) and Isolator",
      ],
      deficiencyObserved: "",
      actionTaken: "",
    },
    {
      system: "Switches",
      activities: ["Rack Fan Status", "LED indications on L2/L3 Switches"],
      deficiencyObserved: "",
      actionTaken: "",
    },
    {
      system: "Miscellaneous",
      activities: [
        "Check availability of Jumper Cable in Inspection register",
        "Availability of 63A Fuse in 9u rack (Priority Section)",
        "Other deficiency observed in TER/TOM room",
      ],
      deficiencyObserved: "",
      actionTaken: "",
    },
  ];

  const [formData, setFormData] = useState(
    initialFormData.map((systemData) => ({
      system: systemData.system,
      activities: systemData.activities.map((activity) => ({
        name: activity,
        statusM: false,
        statusE: false,
      })),
      deficiencyObserved: systemData.deficiencyObserved,
      actionTaken: systemData.actionTaken,
    }))
  );
  const [station, setStation] = useState("");
  const [date, setDate] = useState("");

  const handleCheckAll = (systemIndex, field) => {
    const updatedFormData = [...formData];
    updatedFormData[systemIndex].activities = updatedFormData[
      systemIndex
    ].activities.map((activity) => ({
      ...activity,
      [field]: true,
    }));
    setFormData(updatedFormData);
  };

  const handleCheckboxChange = (systemIndex, activityIndex, field) => {
    const updatedFormData = [...formData];
    updatedFormData[systemIndex].activities[activityIndex][field] =
      !updatedFormData[systemIndex].activities[activityIndex][field];
    setFormData(updatedFormData);
  };

  const handleInputChange = (e, systemIndex, field) => {
    const updatedFormData = [...formData];
    updatedFormData[systemIndex][field] = e.target.value;
    setFormData(updatedFormData);
  };
  const basicInitialValues = {
    date: "",
    station: "",
    employee_name_e:"",
    employee_id_e:"",
    employee_id:user.employeeid,
    data: formData,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData({ formType: slug, values: formValues }));
    navigate(`/list/${slug}`);
  };
  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Daily Checklist of AFC System</h3>
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
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={formValues.date}
              onChange={(e) =>
                setFormValues({ ...formValues, date: e.target.value })
              }
              required
            />
          </div>
        </div>

        {formData.map((systemData, systemIndex) => (
          <div key={systemIndex} className="mb-4">
            <h5>{systemData.system}</h5>
            <div className="mb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleCheckAll(systemIndex, "statusM")}
              >
                Check All M
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={() => handleCheckAll(systemIndex, "statusE")}
              >
                Check All E
              </button>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Activity Carried Out</th>
                  <th>Status (✓/X) M</th>
                  <th>Status (✓/X) E</th>
                </tr>
              </thead>
              <tbody>
                {systemData.activities.map((activity, activityIndex) => (
                  <tr key={activityIndex}>
                    <td>{activityIndex + 1}</td>
                    <td>{activity.name}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={activity.statusM}
                        onChange={() =>
                          handleCheckboxChange(
                            systemIndex,
                            activityIndex,
                            "statusM"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={activity.statusE}
                        onChange={() =>
                          handleCheckboxChange(
                            systemIndex,
                            activityIndex,
                            "statusE"
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mb-3">
              <label>Deficiency Observed</label>
              <textarea
                className="form-control"
                value={systemData.deficiencyObserved}
                onChange={(e) =>
                  handleInputChange(e, systemIndex, "deficiencyObserved")
                }
              />
            </div>
            <div className="mb-3">
              <label>Action Taken</label>
              <textarea
                className="form-control"
                value={systemData.actionTaken}
                onChange={(e) =>
                  handleInputChange(e, systemIndex, "actionTaken")
                }
              />
            </div>
          </div>
        ))}
          <div className=" row mb-3">
            <div className="col-md-6">
              <label>Employee Name</label>
              <input
                className="form-control"
                value={user.employee_name_e}
                onChange={(e) =>
                  setFormValues({ ...formValues, employee_name_e: e.target.value })
                }
               
                />
                </div>
                <div className="col-md-6">
              <label>Employee EID</label>
              <input
                className="form-control"
                value={user.employee_id_e}
                onChange={(e) =>
                  setFormValues({ ...formValues, 
                    employee_id_e: e.target.value })
                }
              
                />
                </div>
                </div>
        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>
      </form>
    </div>
  );
};

export default DailycheckListMainline;
