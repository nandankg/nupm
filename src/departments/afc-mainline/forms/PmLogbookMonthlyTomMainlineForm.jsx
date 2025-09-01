import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AFCMainlineFormLayout, UniversalAFCMainlineFormField } from "../components";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { afcMainlineValidationSchemas } from "../utils/afcMainlineValidationSchemas";
import { addData } from "../../../reducer/akshra/PmlogBookReducer";

const PmLogbookMonthlyTomMainlineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormState = {
    stnName: "",
    date: "",
    month: new Date().getMonth() + 1,
    tomActivities: Array(16).fill({
      TOM1: "No",
      TOM2: "No", 
      TOM3: "No",
      TOM4: "No",
      TOM5: "No",
      TOM6: "No",
      TOM7: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    ecActivities: Array(6).fill({
      EC1: "No",
      EC2: "No",
      EC3: "No", 
      EC4: "No",
      EC5: "No",
      EC6: "No",
      EC7: "No",
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

  const handleSelectAllChange = (workKey, index, isChecked, equipmentPrefix) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item };
        for (let key in updatedItem) {
          if (key.startsWith(equipmentPrefix)) {
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
    navigate("/list/pmlogbook-monthly-tom-mainline");
  };

  const tomActivities = [
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
    "System Overall Performance Check",
  ];

  const ecActivities = [
    "Electrical Cabinet Cleaning",
    "Power Supply Unit Check",
    "UPS Battery Status Verification", 
    "Cooling System Inspection",
    "Cable Termination Check",
    "Grounding System Verification",
  ];

  const getCompletionStats = (activities, workKey) => {
    const completedActivities = activities.filter((_, index) => {
      const activity = formValues[workKey][index];
      const equipmentKeys = Object.keys(activity).filter(key => 
        key.startsWith('TOM') || key.startsWith('EC')
      );
      return equipmentKeys.some(key => activity[key] === "Yes");
    }).length;
    return { completed: completedActivities, total: activities.length };
  };

  const tomStats = getCompletionStats(tomActivities, 'tomActivities');
  const ecStats = getCompletionStats(ecActivities, 'ecActivities');

  return (
    <AFCMainlineFormLayout
      title="PM LOGBOOK TOM & ELECTRICAL CABINET (MONTHLY)"
      onSubmit={handleSubmit}
    >
      <div className="row mb-4">
        <div className="col-md-6">
          <UniversalAFCMainlineFormField
            type="text"
            label="Station Name"
            name="stnName"
            value={formValues.stnName}
            onChange={(e) => setFormValues({ ...formValues, stnName: e.target.value })}
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

      {/* TOM Activities Section */}
      <Accordion defaultExpanded className="mb-4">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Typography variant="h6">TOM Equipment Activities</Typography>
            <div className="me-3">
              <Chip
                label={`${tomStats.completed}/${tomStats.total} Activities`}
                color={tomStats.completed === tomStats.total ? "success" : "primary"}
                size="small"
              />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row mb-3 fw-bold">
            <div className="col-md-4">
              <label>TOM Activity Description</label>
            </div>
            <div className="col-md-2">
              <label>TOM Units (1-7)</label>
            </div>
            <div className="col-md-6">
              <label>Remarks & Actions</label>
            </div>
          </div>

          {tomActivities.map((activity, index) => (
            <TomActivitySection
              key={index}
              activity={activity}
              index={index}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleSelectAllChange={handleSelectAllChange}
              workKey="tomActivities"
              equipmentPrefix="TOM"
              equipmentUnits={["TOM1", "TOM2", "TOM3", "TOM4", "TOM5", "TOM6", "TOM7"]}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Electrical Cabinet Activities Section */}
      <Accordion defaultExpanded className="mb-4">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Typography variant="h6">Electrical Cabinet Activities</Typography>
            <div className="me-3">
              <Chip
                label={`${ecStats.completed}/${ecStats.total} Activities`}
                color={ecStats.completed === ecStats.total ? "success" : "primary"}
                size="small"
              />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row mb-3 fw-bold">
            <div className="col-md-4">
              <label>EC Activity Description</label>
            </div>
            <div className="col-md-2">
              <label>EC Units (1-7)</label>
            </div>
            <div className="col-md-6">
              <label>Remarks & Actions</label>
            </div>
          </div>

          {ecActivities.map((activity, index) => (
            <TomActivitySection
              key={index}
              activity={activity}
              index={index}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleSelectAllChange={handleSelectAllChange}
              workKey="ecActivities"
              equipmentPrefix="EC"
              equipmentUnits={["EC1", "EC2", "EC3", "EC4", "EC5", "EC6", "EC7"]}
            />
          ))}
        </AccordionDetails>
      </Accordion>

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

const TomActivitySection = ({
  activity,
  index,
  formValues,
  handleInputChange,
  handleSelectAllChange,
  workKey,
  equipmentPrefix,
  equipmentUnits,
}) => {
  const isAllSelected = equipmentUnits.every(
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
                handleSelectAllChange(workKey, index, e.target.checked, equipmentPrefix)
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
          
          <div className="d-flex flex-wrap gap-2">
            {equipmentUnits.map((unit) => (
              <div key={unit} className="form-check">
                <input
                  type="checkbox"
                  id={`${workKey}${unit}${index}`}
                  checked={formValues[workKey][index][unit] === "Yes"}
                  onChange={() => handleInputChange(workKey, index, unit)}
                  className="form-check-input"
                />
                <label
                  htmlFor={`${workKey}${unit}${index}`}
                  className="form-check-label small"
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

export default PmLogbookMonthlyTomMainlineForm;