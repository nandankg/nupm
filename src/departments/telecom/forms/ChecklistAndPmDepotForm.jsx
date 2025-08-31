import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";
import { validateForm } from "../validation";
import { formatDate } from "../../../data/formatDate";
import { addData } from "../../../reducer/manshi/DailyTelecomReducer";
import stationData from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const ChecklistAndPmDepotForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const DailyTelecomListData = useSelector((state) => state.DailyTelecom);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    systems: [
      {
        id: 1,
        name: "PAS-PIDS",
        activities: [
          {
            id: 1,
            label: "Check and clear alarms in PIDS-PAS HMI",
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
            label: "Check both recording of all camera is available for both main and redundant",
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
            label: "Check working of RCP and SCR Handportable by making test call",
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
            label: "Check Incomer-I and Incomer-II availability Status on ATS Rack",
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
            label: "Check status of AC & Note down TER and UPS Room Temperature (Maintained below 30°C)",
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // Validate form
      const formErrors = validateForm('logBook', formValues);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        setLoading(false);
        return;
      }
      
      await dispatch(addData(formValues));
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error('Error saving form:', error);
      setErrors({ submit: 'Error saving form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout 
      title="Daily Telecom Maintenance Checklist (Depot)"
      subtitle="Tele System Daily Check List Register (Depot)"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {errors.submit && (
        <div className="alert alert-danger mb-3">
          {errors.submit}
        </div>
      )}
      
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="custom-select"
            name="station"
            label="Station"
            value={formValues.station}
            onChange={handleChange}
            options={stationData
              .filter((station) => station["Station Name"])
              .map((station) => ({
                value: station["Station Name"],
                label: station["Station Name"]
              }))}
            required
            error={errors.station}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="date"
            name="date"
            label="Date"
            value={formValues.date}
            onChange={handleChange}
            required
            error={errors.date}
          />
        </div>
      </div>

      {formValues.systems.map((system) => (
        <div key={system.id} className="card mb-4">
          <div className="card-header bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold text-primary">
                <i className="fas fa-cog me-2"></i>
                {system.name}
              </h6>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={system.activities.every((a) => a.checked === "yes")}
                  onChange={(e) => toggleAllCheckboxes(system.id, e.target.checked)}
                  id={`selectAll${system.id}`}
                />
                <label className="form-check-label text-muted" htmlFor={`selectAll${system.id}`}>
                  Select All
                </label>
              </div>
            </div>
          </div>
          <div className="card-body">
            {system.activities.map((activity, index) => (
              <div className="form-check mb-3" key={activity.id}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={activity.checked === "yes"}
                  onChange={() => toggleCheckbox(system.id, activity.id)}
                  id={`activity${system.id}_${activity.id}`}
                />
                <label 
                  className="form-check-label" 
                  htmlFor={`activity${system.id}_${activity.id}`}
                >
                  <strong>{index + 1}.</strong> {activity.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="row">
        <div className="col-md-12">
          <UniversalTelecomFormField
            type="textarea"
            name="remarks"
            label="Remarks"
            value={formValues.remarks}
            onChange={handleChange}
            placeholder="Enter any remarks or observations"
            error={errors.remarks}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="textarea"
            name="notes"
            label="Notes for Installation & Other Pending Issues"
            value={formValues.notes}
            onChange={handleChange}
            placeholder="Enter notes for installation and pending issues"
            error={errors.notes}
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField
            type="date"
            name="rectifiedDate"
            label="Rectified Date"
            value={formValues.rectifiedDate}
            onChange={handleChange}
            error={errors.rectifiedDate}
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField
            type="date-time"
            name="dateTime"
            label="Date & Time"
            value={formValues.dateTime}
            onChange={handleChange}
            error={errors.dateTime}
          />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default ChecklistAndPmDepotForm;