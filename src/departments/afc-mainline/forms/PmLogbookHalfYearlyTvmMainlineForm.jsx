import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AFCMainlineFormLayout, UniversalAFCMainlineFormField } from "../components";
import { afcMainlineValidationSchemas } from "../utils/afcMainlineValidationSchemas";
import { addData } from "../../../reducer/satya/PMLogBookTVMReducer";
import stationData from "../../../station.json";

const PmLogbookHalfYearlyTvmMainlineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormState = {
    frequency: "Half Yearly",
    station: "",
    date: "",
    activities: Array(28).fill({
      TPNR1: "❌",
      TPNR2: "❌", 
      TPNR3: "❌",
      remark: "",
      action: "",
      deficiency: "",
    }),
    staff1_name: "",
    staff1_desg: "",
    staff1_empno: "",
    staff1_sign: "",
    staff2_name: "",
    staff2_desg: "",
    staff2_empno: "",
    staff2_sign: "",
    staff3_name: "",
    staff3_desg: "",
    staff3_empno: "",
    staff3_sign: "",
    nill: "NA",
  };

  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (workKey, index, key, value = null) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [key]: value !== null ? value : item[key] === "❌" ? "✔" : "❌",
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
          if (key.startsWith("TPNR")) {
            updatedItem[key] = isChecked ? "✔" : "❌";
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
    navigate("/list/pmlogbook-half-yearly-tvm-mainline");
  };

  const activities = [
    "Fixing & Alignment of all modules of TVM/RCTM",
    "Checking of all Cable connection and dressing",
    "Checking Silicon sealing of TVM/RCTM Cabinet",
    "Checking of any opening inside TVM/RCTM cabinet",
    "Checking of Power Supply and Battery",
    "Check Lubrication of all locks with silicone oil",
    "Check Station ID",
    "Check Device ID",
    "Check Date and Time",
    "Cleaning of all modules of TVM/RCTM",
    "Cleaning of lexan covering board of display",
    "Cleaning of Coin hopper opto sensor of TVM",
    "Cleaning of Cooling fans",
    "Checking and Cleaning of Cooling fan filter",
    "Cleaning of BNR/BNA",
    "Cleaning of Printer and printer heating head",
    "Cleaning of Bank card reader",
    "Cleaning of Display",
    "Cleaning of Token hopper of TVM",
    "Check LAN Status",
    "BNA/BNR Module Test",
    "Coin Dispenser Test",
    "Token Dispenser Test",
    "Card Reader Test",
    "LCD Test",
    "PID Test",
    "Printer Test /Test Print",
    "Audio Test",
  ];

  const equipmentTypes = ["TPNR TVM", "MWYA RCTM", "TPNR AVM"];

  return (
    <AFCMainlineFormLayout
      title="PREVENTIVE MAINTENANCE WORKSHEET OF TVM, RCTM & AVM (HALF YEARLY)"
      onSubmit={handleSubmit}
    >
      <div className="row mb-4">
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
        <div className="col-md-6">
          <UniversalAFCMainlineFormField
            type="select"
            label="Station"
            name="station"
            value={formValues.station}
            onChange={(e) => setFormValues({ ...formValues, station: e.target.value })}
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
      </div>

      {/* Activity Headers */}
      <div className="row mb-3 fw-bold">
        <div className="col-md-4">
          <label>Description</label>
        </div>
        <div className="col-md-2">
          <label>TVM RCTM AVM</label>
        </div>
        <div className="col-md-2">
          <label>Remarks</label>
        </div>
        <div className="col-md-2">
          <label>Action Taken</label>
        </div>
        <div className="col-md-2">
          <label>Deficiency</label>
        </div>
      </div>

      {/* Activities */}
      {activities.map((activity, index) => (
        <TvmActivitySection
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
            <div className="col-md-3">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
              <UniversalAFCMainlineFormField
                type="number"
                label="Employee No."
                name={`staff${staffIndex}_empno`}
                value={formValues[`staff${staffIndex}_empno`]}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [`staff${staffIndex}_empno`]: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-3">
              <UniversalAFCMainlineFormField
                type="text"
                label="Signature"
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

const TvmActivitySection = ({
  activity,
  index,
  formValues,
  handleInputChange,
  handleSelectAllChange,
  equipmentTypes,
}) => {
  const workKey = "activities";
  const isAllSelected = ["TPNR1", "TPNR2", "TPNR3"].every(
    (equipment) => formValues[workKey][index][equipment] === "✔"
  );

  return (
    <div className="row mb-3 align-items-center">
      <div className="col-md-4">
        <span className="form-label">{activity}</span>
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
          
          <div className="d-flex justify-content-between">
            {["TPNR1", "TPNR2", "TPNR3"].map((equipment, equipIndex) => (
              <div key={equipment} className="form-check">
                <input
                  type="checkbox"
                  id={`${workKey}${equipment}${index}`}
                  name={`${workKey}${equipment}${index}`}
                  checked={formValues[workKey][index][equipment] === "✔"}
                  onChange={() => handleInputChange(workKey, index, equipment)}
                  className="form-check-input"
                />
                <label
                  htmlFor={`${workKey}${equipment}${index}`}
                  className="form-check-label small"
                >
                  {equipmentTypes[equipIndex]}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-md-2">
        <input
          type="text"
          className="form-control form-control-sm"
          value={formValues[workKey][index].remark}
          onChange={(e) =>
            handleInputChange(workKey, index, "remark", e.target.value)
          }
          placeholder="Remarks"
        />
      </div>

      <div className="col-md-2">
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

      <div className="col-md-2">
        <input
          type="text"
          className="form-control form-control-sm"
          value={formValues[workKey][index].deficiency}
          onChange={(e) =>
            handleInputChange(workKey, index, "deficiency", e.target.value)
          }
          placeholder="Deficiency"
        />
      </div>
    </div>
  );
};

export default PmLogbookHalfYearlyTvmMainlineForm;