import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/rajiv/AFCMonthlyReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import stationData from "../../data/station.json";
import deviceData from "../../data/device.json";
import { formatDate } from "../../data/formatDate";

const AFCMonthlyReg = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchData = useSelector((state) => state.afcMonthly);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (dispatchData) {
      setSlug(dispatchData.slug);
    }
  }, [dispatchData]);
  const initialFormState = {
    station: "",
    device_name: "----",
    date: formatDate(new Date().toString()),
    month: "",
    activities1: Array(38).fill({
      G1: "No",
      G2: "No",
      G3: "No",
      G4: "No",
      G5: "No",
      G6: "No",
      G7: "No",
      G8: "No",
      G9: "No",
      G10: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    activities2: [
      {
        SG1: "No",
        SG2: "No",
        remark: "",
        deficiency: "",
      },
    ],

    staff1_name: "--",
    staff1_desg: "--",
    staff1_sign: "--",
    staff2_name: "--",
    staff2_desg: "--",
    staff2_sign: "--",
    staff3_name: "--",
    staff3_desg: "--",
    staff3_sign: "--",
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
          if (key.startsWith("G")) {
            updatedItem[key] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };
  const handleSelectAllChange2 = (workKey, index, isChecked) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item };
        for (let key in updatedItem) {
          if (key.startsWith("SG")) {
            updatedItem[key] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const labels = [
    "Check Fixing & Alignment of all modules of Gates",
    "Checking of all Cable connection and dressing",
    "Checking Silicon sealing of Gate Cabinet",
    "Checking of any opening inside gate cabinet",
    "Checking of Power Supply and Battery",
    "Check whether leaked oil appears on the flap mechanism",
    "Check Date and Time",
    "Check correct position of flap mechanism",
    "Cleaning of all modules of AFC Gate and cabinet",
    "Clean sensor of Limit PCB of flap mechanism",
    "Clean plastic covers of sensors and transmitters in corridor",
    "Check ping to station computer",
    "Check whether Token Capture Unit (TCU) clearing mechanism is Normally closed",
    "Check lock functionality",
    "Check battery backup",
    "Audio Test",
    "Concession Lamp test",
    "Gate Test (Sector Door Test)",
    "End Display Test",
    "Sensor Test",
    "Token Slot Test - Bowl Test",
    "Token Slot Test - Left Containet Test",
    "Token Slot Test - Right Containet Test",
    "Token Bowl Test - Light Test",
    "Token Bowl Test - Door Test",
    "Front Door Test",
    "Power Management Unit (PMU) Test",
    "Card Reader Test",
    "Return Cup LED Test",
    "Shutdown",
    "Reboot",
    "Operation Mode Test",
    "Special Mode test",
    "Token Container Test",
    "Gate Mode Test",
    "Check operation and special mode for its default position",
    "Software - SC",
    "Master Push Button",
  ];

  const labels2 = ["Check the serviceability and fitmenst"];
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
            AFC Preventive Maintenance Checklist(Monthly)
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="form-container "
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
          >
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
                <label for="month">Choose a month:</label>
  <select id="month" name="month" className="form-control"
   onChange={(e) =>
    setFormValues({ ...formValues, month: e.target.value })
  }
  >
    <option value="JAN">January (JAN)</option>
    <option value="FEB">February (FEB)</option>
    <option value="MAR">March (MAR)</option>
    <option value="APR">April (APR)</option>
    <option value="MAY">May (MAY)</option>
    <option value="JUN">June (JUN)</option>
    <option value="JUL">July (JUL)</option>
    <option value="AUG">August (AUG)</option>
    <option value="SEP">September (SEP)</option>
    <option value="OCT">October (OCT)</option>
    <option value="NOV">November (NOV)</option>
    <option value="DEC">December (DEC)</option>
  </select>
                </div>
              </div>
              {labels.map((label, index) => (
                <FormSection
                  key={index}
                  label={label}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleSelectAllChange={handleSelectAllChange}
                  workKey="activities1"
                  index={index}
                />
              ))}
              <div className="row ">
                <lable className="form-label">
                  {" "}
                  Swing Gate - Activity (Visual Inspection)
                </lable>
              </div>
              {labels2.map((label, index) => (
                <FormSection2
                  key={index}
                  label={label}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleSelectAllChange2={handleSelectAllChange2}
                  workKey="activities2"
                  index={index}
                />
              ))}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    required
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Desgination
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_desg: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Desgination
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_desg: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Desgination
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_desg: e.target.value,
                      })
                    }
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
    </>
  );
};

const FormSection = ({
  label,
  formValues,
  handleInputChange,
  handleSelectAllChange,
  workKey,
  index,
}) => {
  const isAllSelected = [
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "G6",
    "G7",
    "G8",
    "G9",
    "G10",
  ].every((g) => formValues[workKey][index][g] === "Yes");

  return (
    <div className="row mb-3">
      <div className="col-md-12">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center col-md-4 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "none", width: "fit-content" }}
            >
              {label} &nbsp;
              </label>
              </div>
              <div className="col-md-2">
              <input
                type="checkbox"
                id={`${workKey}SelectAll${index}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChange(workKey, index, e.target.checked)
                }
              />
              <label
                style={{ fontSize: "14px" }}
                htmlFor={`${workKey}SelectAll${index}`}
              >
                {isAllSelected ? "UnCheck All" : "Check All"}
              </label>
            
          </div>
          <div className="d-flex gap-3 justify-content-between">
            {["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"].map(
              (g) => (
                <div key={g}>
                  <input
                    type="checkbox"
                    id={`${workKey}${g}${index}`}
                    name={`${workKey}${g}${index}`}
                    checked={formValues[workKey][index][g] === "Yes"}
                    onChange={() => handleInputChange(workKey, index, g)}
                  />
                  <label>{g}</label>
                </div>
              )
            )}
          </div>
        </div>
        <div className="row mt-0">
          <div className="col-md-4">
            <label>Remarks/Deficiencies</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].remark}
              onChange={(e) =>
                handleInputChange(workKey, index, "remark", e.target.value)
              }
            />
          </div>
          <div className="col-md-3">
            <label>Action Taken</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].action}
              onChange={(e) =>
                handleInputChange(workKey, index, "action", e.target.value)
              }
            />
          </div>
          <div className="col-md-5">
            <label>Why Deficiency Could Not Be Rectified</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].deficiency}
              onChange={(e) =>
                handleInputChange(workKey, index, "deficiency", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const FormSection2 = ({
  label,
  formValues,
  handleInputChange,
  handleSelectAllChange2,
  workKey,
  index,
}) => {
  const isAllSelected = ["SG1", "SG2"].every(
    (g) => formValues[workKey][index][g] === "Yes"
  );

  return (
    <div className="row mb-3">
      <div className="col-md-12">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center col-md-4 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "none", width: "fit-content" }}
            >
              {label} &nbsp;
              </label>
              </div>
              <div className="col-md-2">
              <input
                type="checkbox"
                id={`${workKey}SelectAll${index}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChange2(workKey, index, e.target.checked)
                }
              />
              <label
                style={{ fontSize: "14px" }}
                htmlFor={`${workKey}SelectAll${index}`}
              >
                {isAllSelected ? "UnCheck All" : "Check All"}
              </label>
          
          </div>
          <div className="d-flex gap-3 justify-content-between">
            {["SG1", "SG2"].map((g) => (
              <div key={g}>
                <input
                  type="checkbox"
                  id={`${workKey}${g}${index}`}
                  name={`${workKey}${g}${index}`}
                  checked={formValues[workKey][index][g] === "Yes"}
                  onChange={() => handleInputChange(workKey, index, g)}
                />
                <label>{g}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="row mt-0">
          <div className="col-md-4">
            <label>Remarks/Deficiencies</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].remark}
              onChange={(e) =>
                handleInputChange(workKey, index, "remark", e.target.value)
              }
            />
          </div>
          <div className="col-md-3">
            <label>Action Taken</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].action}
              onChange={(e) =>
                handleInputChange(workKey, index, "action", e.target.value)
              }
            />
          </div>
          <div className="col-md-5">
            <label>Why Deficiency Could Not Be Rectified</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].deficiency}
              onChange={(e) =>
                handleInputChange(workKey, index, "deficiency", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AFCMonthlyReg;
