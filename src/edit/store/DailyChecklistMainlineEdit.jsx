import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import { dtrissue } from "../../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import stationData from "../../data/station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const DailyChecklistMainlineEdit = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));
 
  const[fData,setFdata]=useState([]);
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
  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);
  const itmm = loanregister?.data?.data
let filteredData;
if (itmm) {
  filteredData = itmm.filter((itm) => {
    return itm.id === id;
  });
  console.log(filteredData);
  console.log(filteredData[0]);
}

const fd = filteredData ? filteredData[0] : {};
  const basicInitialValues = {
    data: fd.data,
date:fd.date, 


employee_id_e:fd.employee_id_e,

employee_id_m:fd.employee_id_m, 

employee_name_e: fd.employee_name_e,

employee_name_m: fd.employee_name_m,

id: fd.id,
station: fd.station,

  };
const [formValues, setFormValues] = useState(basicInitialValues);
  // Initialize form values when data is loaded
  useEffect(() => {
    if (loanregister?.data?.data) {
      const filteredData = loanregister.data.data.find(
        (item) => item.id === id
      );
      if (filteredData) {
        
        setFdata(filteredData.data)
      }
    }
  }, [loanregister, id]);
  console.log(formValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckAll = (systemIndex, field) => {
    setFdata((prevFData) =>
      prevFData.map((system, sIndex) =>
        sIndex === systemIndex
          ? {
              ...system,
              activities: system.activities.map((activity) => ({
                ...activity,
                [field]: true,
              })),
            }
          : system
      )
    );
  };

const handleCheckboxChange = (systemIndex, activityIndex, field) => {
  setFdata((prevFData) => 
      prevFData.map((system, sIndex) =>
          sIndex === systemIndex
              ? { 
                  ...system, 
                  activities: system.activities.map((activity, aIndex) => 
                      aIndex === activityIndex 
                          ? { ...activity, [field]: !activity[field] } // ✅ Create new object with updated field
                          : activity
                  ) 
                }
              : system
      )
  );
};

const handleInputChange = (e, systemIndex, field) => {
  setFdata((prevFData) => {
      return prevFData.map((systemData, index) => 
          index === systemIndex 
          ? { ...systemData, [field]: e.target.value } // ✅ Create a new object with updated field
          : systemData
      );
  });
};

  
// Sync formValues with fData
useEffect(() => {
  setFormValues((prev) => ({
    ...prev,
    data: fData,
  }));
}, [fData]);

// Handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await dispatch(editData({ formType: slug, values: formValues })).unwrap();
    navigate(`/list/${slug}`);
  } catch (error) {
    console.error("Failed to save data:", error);
    // Optionally show an error message to the user
    alert("Failed to save changes. Please try again.");
  }
};

//   const handleInputChange = (e, systemIndex, activityIndex, field) => {
//     const updatedData = { ...formData };
//     updatedData.data[systemIndex].activities[activityIndex][field] = e.target.checked;
//     setFormData(updatedData);
// };



if (!formData) return <p>Loading...</p>;
    const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <div className="container mt-4">
    <h3 className="text-center mb-4">Daily Checklist of AFCcc System</h3>
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

      {fData.map((systemData, systemIndex) => (
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
             value= {systemData.deficiencyObserved}
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
              value={formValues.employee_name_e}
              onChange={(e) =>
                setFormValues({ ...formValues, employee_name_e: e.target.value })
              }
             
              />
              </div>
              <div className="col-md-6">
            <label>Employee EID</label>
            <input
              className="form-control"
              value={formValues.employee_id_e}
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

export default DailyChecklistMainlineEdit;
