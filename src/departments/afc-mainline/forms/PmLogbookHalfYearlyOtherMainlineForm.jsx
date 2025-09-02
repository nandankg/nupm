import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AFCMainlineFormLayout, UniversalAFCMainlineFormField } from "../components";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { afcMainlineValidationSchemas } from "../utils/afcMainlineValidationSchemas";
import { addData } from "../../../reducer/chanchal/Pm_logbook_half_yearly_other_mainline_Reducer";

const PmLogbookHalfYearlyOtherMainlineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormState = {
    stnName: "",
    date: "",
    month: new Date().getMonth() + 1,
    scActivities: Array(8).fill({
      SC1: "No",
      SC2: "No",
      SC3: "No",
      SC4: "No",
      SC5: "No",
      SC6: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    avmActivities: Array(9).fill({
      avm1: "No",
      avm2: "No", 
      avm3: "No",
      avm4: "No",
      avm5: "No",
      avm6: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    switchActivities: Array(8).fill({
      swt1: "No",
      swt2: "No",
      swt3: "No",
      swt4: "No",
      swt5: "No",
      swt6: "No",
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

  const handleSelectAllChange = (workKey, index, isChecked, equipmentKeys) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item };
        equipmentKeys.forEach(key => {
          updatedItem[key] = isChecked ? "Yes" : "No";
        });
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate("/list/pmlogbook-half-yearly-other-mainline");
  };

  const scActivities = [
    "Fixing & Alignment of all modules of SC",
    "Checking of all Cable connection and dressing",  
    "Check Date and Time",
    "Check Lubrication of all locks with silicone oil",
    "Cleaning of all modules of SC",
    "Check LAN Status",
    "System Performance Check",
    "Overall Functionality Test",
  ];

  const avmActivities = [
    "Fixing & Alignment of all modules of AVM",
    "Checking of all Cable connection and dressing",
    "Check Date and Time", 
    "Check Lubrication of all locks with silicone oil",
    "Cleaning of all modules of AVM",
    "Display Screen Check",
    "Audio System Test",
    "Check LAN Status",
    "Overall Performance Verification",
  ];

  const switchActivities = [
    "Switch Hardware Inspection",
    "Port Connection Verification",
    "Network Cable Testing",
    "Power Supply Check",
    "Configuration Backup",
    "Performance Monitoring",
    "Security Settings Review",
    "Overall Network Functionality",
  ];

  const getCompletionStats = (activities, workKey) => {
    const completedActivities = activities.filter((_, index) => {
      const activity = formValues[workKey][index];
      const equipmentKeys = Object.keys(activity).filter(key => 
        key !== 'remark' && key !== 'action' && key !== 'deficiency'
      );
      return equipmentKeys.some(key => activity[key] === "Yes");
    }).length;
    return { completed: completedActivities, total: activities.length };
  };

  const scStats = getCompletionStats(scActivities, 'scActivities');
  const avmStats = getCompletionStats(avmActivities, 'avmActivities');
  const switchStats = getCompletionStats(switchActivities, 'switchActivities');

  return (
    <AFCMainlineFormLayout
      title="PM LOGBOOK HALF YEARLY OTHER EQUIPMENT (SC/AVM/SWITCH)"
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

      {/* SC Activities Section */}
      <Accordion defaultExpanded className="mb-4">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Typography variant="h6">SC Equipment Activities</Typography>
            <div className="me-3">
              <Chip
                label={`${scStats.completed}/${scStats.total} Activities`}
                color={scStats.completed === scStats.total ? "success" : "primary"}
                size="small"
              />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row mb-3 fw-bold">
            <div className="col-md-4">
              <label>SC Activity Description</label>
            </div>
            <div className="col-md-2">
              <label>SC Units (1-6)</label>
            </div>
            <div className="col-md-6">
              <label>Remarks & Actions</label>
            </div>
          </div>

          {scActivities.map((activity, index) => (
            <OtherEquipmentActivitySection
              key={index}
              activity={activity}
              index={index}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleSelectAllChange={handleSelectAllChange}
              workKey="scActivities"
              equipmentUnits={["SC1", "SC2", "SC3", "SC4", "SC5", "SC6"]}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* AVM Activities Section */}
      <Accordion defaultExpanded className="mb-4">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Typography variant="h6">AVM Equipment Activities</Typography>
            <div className="me-3">
              <Chip
                label={`${avmStats.completed}/${avmStats.total} Activities`}
                color={avmStats.completed === avmStats.total ? "success" : "primary"}
                size="small"
              />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row mb-3 fw-bold">
            <div className="col-md-4">
              <label>AVM Activity Description</label>
            </div>
            <div className="col-md-2">
              <label>AVM Units (1-6)</label>
            </div>
            <div className="col-md-6">
              <label>Remarks & Actions</label>
            </div>
          </div>

          {avmActivities.map((activity, index) => (
            <OtherEquipmentActivitySection
              key={index}
              activity={activity}
              index={index}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleSelectAllChange={handleSelectAllChange}
              workKey="avmActivities"
              equipmentUnits={["avm1", "avm2", "avm3", "avm4", "avm5", "avm6"]}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Switch Activities Section */}
      <Accordion defaultExpanded className="mb-4">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Typography variant="h6">Switch Equipment Activities</Typography>
            <div className="me-3">
              <Chip
                label={`${switchStats.completed}/${switchStats.total} Activities`}
                color={switchStats.completed === switchStats.total ? "success" : "primary"}
                size="small"
              />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row mb-3 fw-bold">
            <div className="col-md-4">
              <label>Switch Activity Description</label>
            </div>
            <div className="col-md-2">
              <label>Switch Units (1-6)</label>
            </div>
            <div className="col-md-6">
              <label>Remarks & Actions</label>
            </div>
          </div>

          {switchActivities.map((activity, index) => (
            <OtherEquipmentActivitySection
              key={index}
              activity={activity}
              index={index}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleSelectAllChange={handleSelectAllChange}
              workKey="switchActivities"
              equipmentUnits={["swt1", "swt2", "swt3", "swt4", "swt5", "swt6"]}
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

const OtherEquipmentActivitySection = ({
  activity,
  index,
  formValues,
  handleInputChange,
  handleSelectAllChange,
  workKey,
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
                handleSelectAllChange(workKey, index, e.target.checked, equipmentUnits)
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
          
          <div className="d-flex flex-wrap gap-1">
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
                  {unit.toUpperCase()}
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

export default PmLogbookHalfYearlyOtherMainlineForm;