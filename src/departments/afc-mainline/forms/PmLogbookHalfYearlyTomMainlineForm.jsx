import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AFCMainlineFormLayout, UniversalAFCMainlineFormField } from "../components";
import { afcMainlineValidationSchemas } from "../utils/afcMainlineValidationSchemas";
import { addData } from "../../../reducer/manshi/Pmlog6Reducer";
import stationData from "../../../station.json";

const PmLogbookHalfYearlyTomMainlineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormState = {
    stn_name: "",
    date: "",
    month: new Date().getMonth(),
    work1: Array(15).fill({
      TOM1: "No",
      TOM2: "No",
      EFO: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    staff1_name: "",
    staff1_desg: "",
    staff1_sign: "",
    staff2_name: "",
    staff2_desg: "",
    staff2_sign: "",
    staff3_name: "",
    staff3_desg: "",
    staff3_sign: "",
  };

  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (workKey, index, key, value = null) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [key]: value !== null ? value : item[key] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  const handleSelectAllChange = (workKey, index, isChecked) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item };
        for (let key in updatedItem) {
          if (key.startsWith("T") || key === "EFO") {
            updatedItem[key] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate("/list/pmlogbook-half-yearly-tom-mainline");
  };

  const activities = [
    "Fixing & Alignment of all modules of TOM",
    "Checking of all Cable connection and dressing",
    "Check Date and Time",
    "Check Lubrication of all locks with silicone oil",
    "Cleaning of all modules of TOM",
    "Cleaning of Opto sensor, Antenna, Token tray, Reject",
    "CRW Test",
    "PRINTER Test",
    "TDM Test",
    "PDU Test",
    "Touch Screen Test",
    "Counter Communication System Test",
    "Keyboard, Mouse Test",
    "Check LAN Status",
    "Check Power strip",
  ];

  const equipmentTypes = ["TPNR TOM", "MWYA TOM", "TPNR EFO"];

  return (
    <AFCMainlineFormLayout
      title="PREVENTIVE MAINTENANCE WORKSHEET OF TOM (HALF YEARLY)"
      onSubmit={handleSubmit}
    >
      <div className="row mb-4">
        <div className="col-md-6">
          <UniversalAFCMainlineFormField
            type="select"
            label="Station"
            name="stn_name"
            value={formValues.stn_name}
            onChange={(e) => setFormValues({ ...formValues, stn_name: e.target.value })}
            options={[
              { value: "", label: "Select Station" },
              ...stationData
                .filter((station) => station["Station Name"])
                .map((station) => ({
                  value: station["Station Name"],
                  label: station["Station Name"],
                })),
            ]}
            required
          />
        </div>
        <div className="col-md-6">
          <UniversalAFCMainlineFormField
            type="date"
            label="Date"
            name="date"
            value={formValues.date}
            onChange={(e) => setFormValues({ ...formValues, date: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Activity Headers */}
      <div className="row mb-3 fw-bold">
        <div className="col-md-4">
          <label>Activity Description</label>
        </div>
        <div className="col-md-2">
          <label>TOM Units</label>
        </div>
        <div className="col-md-6">
          <label>Remarks & Actions</label>
        </div>
      </div>

      {/* Activities */}
      {activities.map((activity, index) => (
        <TomHalfYearlyActivitySection
          key={index}
          activity={activity}
          index={index}
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleSelectAllChange={handleSelectAllChange}
          equipmentTypes={equipmentTypes}
        />
      ))}

      {/* Staff Information */}
      <div className="mt-5">
        <h5 className="mb-4">Staff Information</h5>
        {[1, 2, 3].map((staffIndex) => (
          <div key={staffIndex} className="row mb-3">
            <div className="col-md-4">
              <UniversalAFCMainlineFormField
                type="text"
                label="Staff Name"
                name={`staff${staffIndex}_name`}
                value={formValues[`staff${staffIndex}_name`]}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [`staff${staffIndex}_name`]: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <UniversalAFCMainlineFormField
                type="text"
                label="Designation"
                name={`staff${staffIndex}_desg`}
                value={formValues[`staff${staffIndex}_desg`]}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [`staff${staffIndex}_desg`]: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <UniversalAFCMainlineFormField
                type="text"
                label="Employee No."
                name={`staff${staffIndex}_sign`}
                value={formValues[`staff${staffIndex}_sign`]}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [`staff${staffIndex}_sign`]: e.target.value,
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>
    </AFCMainlineFormLayout>
  );
};

const TomHalfYearlyActivitySection = ({
  activity,
  index,
  formValues,
  handleInputChange,
  handleSelectAllChange,
  equipmentTypes,
}) => {
  const workKey = "work1";
  const isAllSelected = ["TOM1", "TOM2", "EFO"].every(
    (unit) => formValues[workKey][index][unit] === "Yes"
  );

  return (
    <div className="row mb-3">
      <div className="col-md-4">
        <div className="d-flex align-items-center">
          <span className="form-label">{activity}</span>
        </div>
      </div>
      
      <div className="col-md-2">
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input
              type="checkbox"
              id={`${workKey}SelectAll${index}`}
              checked={isAllSelected}
              onChange={(e) =>
                handleSelectAllChange(workKey, index, e.target.checked)
              }
              className="form-check-input me-2"
            />
            <label
              htmlFor={`${workKey}SelectAll${index}`}
              className="form-check-label small"
            >
              {isAllSelected ? "Uncheck All" : "Check All"}
            </label>
          </div>
          
          <div className="d-flex flex-column gap-1">
            {["TOM1", "TOM2", "EFO"].map((unit, equipIndex) => (
              <div key={unit} className="form-check">
                <input
                  type="checkbox"
                  id={`${unit}-${index}`}
                  checked={formValues[workKey][index][unit] === "Yes"}
                  onChange={() => handleInputChange(workKey, index, unit)}
                  className="form-check-input"
                />
                <label
                  htmlFor={`${unit}-${index}`}
                  className="form-check-label small"
                >
                  {equipmentTypes[equipIndex]}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control form-control-sm"
              value={formValues[workKey][index].remark}
              onChange={(e) =>
                handleInputChange(workKey, index, "remark", e.target.value)
              }
              placeholder="Remarks/Deficiencies"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control form-control-sm"
              value={formValues[workKey][index].action}
              onChange={(e) =>
                handleInputChange(workKey, index, "action", e.target.value)
              }
              placeholder="Action Taken"
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-sm"
              value={formValues[workKey][index].deficiency}
              onChange={(e) =>
                handleInputChange(workKey, index, "deficiency", e.target.value)
              }
              placeholder="Why Deficiency Could Not Be Rectified"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PmLogbookHalfYearlyTomMainlineForm;