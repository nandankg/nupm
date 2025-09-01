import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AFCMainlineFormLayout, UniversalAFCMainlineFormField } from "../components";
import { afcMainlineValidationSchemas } from "../utils/afcMainlineValidationSchemas";
import { addData } from "../../../reducer/monika/PmLogBookMainlineReducer";

const PmLogbookMonthlyTvmMainlineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormState = {
    stn_name: "",
    date: "",
    month: new Date().getMonth() + 1,
    activities: Array(27).fill({
      T1: "No",
      T2: "No",
      T3: "No",
      T4: "No",
      T5: "No",
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
    employee_id: "21",
    department: "s&t",
    unit: "AFC-Mainline",
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
        for (let key of ["T1", "T2", "T3", "T4", "T5"]) {
          updatedItem[key] = isChecked ? "Yes" : "No";
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
    navigate("/list/pmlogbook-monthly-tvm-mainline");
  };

  const activities = [
    "Check Fixing & Alignment of all modules of TVM",
    "Checking of all Cable connection and dressing",
    "Checking Silicon sealing of TVM Cabinet",
    "Checking of any opening inside TVM cabinet",
    "Checking of Power Supply and Battery",
    "Check Station ID",
    "Check Device ID",
    "Check Date and Time",
    "Check Passenger Information Display (PID)",
    "Cleaning of all modules of TVM",
    "Cleaning of lexan covering board of display",
    "Cleaning of Coin hopper opto sensor",
    "Cleaning of Cooling fans",
    "Checking and Cleaning of Cooling fan filter",
    "Cleaning of BNR",
    "Cleaning of Bank card reader",
    "Check LAN Status (Ping Server)",
    "Component Status",
    "Token Dispenser Test",
    "Bank Note system Test",
    "Payment Terminal Test",
    "Printer Test",
    "Audio Test",
    "Bowl LED Test",
    "Alarm Test",
    "Coin Dispenser Test",
    "Card Reader Test",
  ];

  return (
    <AFCMainlineFormLayout
      title="PM LOGBOOK MAINLINE TVM (MONTHLY)"
      onSubmit={handleSubmit}
    >
      <div className="row mb-4">
        <div className="col-md-6">
          <UniversalAFCMainlineFormField
            type="text"
            label="Station Name"
            name="stn_name"
            value={formValues.stn_name}
            onChange={(e) => setFormValues({ ...formValues, stn_name: e.target.value })}
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
          <label>TVM Units (T1-T5)</label>
        </div>
        <div className="col-md-6">
          <label>Remarks & Actions</label>
        </div>
      </div>

      {/* Activities */}
      {activities.map((activity, index) => (
        <TvmMonthlyActivitySection
          key={index}
          activity={activity}
          index={index}
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleSelectAllChange={handleSelectAllChange}
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

const TvmMonthlyActivitySection = ({
  activity,
  index,
  formValues,
  handleInputChange,
  handleSelectAllChange,
}) => {
  const workKey = "activities";
  const isAllSelected = ["T1", "T2", "T3", "T4", "T5"].every(
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
          
          <div className="d-flex gap-2 flex-wrap">
            {["T1", "T2", "T3", "T4", "T5"].map((unit) => (
              <div key={unit} className="form-check">
                <input
                  type="checkbox"
                  id={`${workKey}${unit}${index}`}
                  name={`${workKey}${unit}${index}`}
                  checked={formValues[workKey][index][unit] === "Yes"}
                  onChange={() => handleInputChange(workKey, index, unit)}
                  className="form-check-input"
                />
                <label
                  htmlFor={`${workKey}${unit}${index}`}
                  className="form-check-label"
                >
                  {unit}
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

export default PmLogbookMonthlyTvmMainlineForm;