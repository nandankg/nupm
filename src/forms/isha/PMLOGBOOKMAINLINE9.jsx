import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/isha/PMLBM9REducer";
import { formatDate, formatTime } from "../../data/formatDate";
import stationData from "../../data/station.json";
import deviceData from "../../data/device.json";
const PMLOGBOOKMAINLINE9 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pmlbm9 = useSelector((state) => state.PMbm9);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (pmlbm9) {
      setSlug(pmlbm9.slug);
    }
  }, [pmlbm9]);
  const initialFormState = {
    station: "----",
    date: formatDate(new Date().toDateString()),
    month: new Date().getMonth(),
    activities: Array(35).fill({
      T1: "❌",
      T2: "❌",
      T3: "❌",
      T4: "❌",
      T5: "❌",
      remark: "",
      action: "",
      deficiency: "",
      whydeficiency: "",

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
          [key]: value !== null ? value : item[key] === "❌" ? "✔" : "❌",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  const handleInputChanges = (workKeys, indexs, keys, value = null) => {
    const updatedWorkArray = formValues[workKeys].map((item, idxx) => {
      if (idxx === indexs) {
        return {
          ...item,
          [keys]: value !== null ? value : item[keys] === "❌" ? "✔" : "❌",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeys]: updatedWorkArray });
  };

  const handleSelectAllChange = (workKey, index, isChecked) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item };
        for (let key in updatedItem) {
          if (key.startsWith("T")) {
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
    navigate(`/list/${slug}`);
  };

  const labels = [
    "Check Fixing & Alignment of all modules of TVM",
    "Checking of all Cable connection and dressing",
    "Checking Silicon sealing of TVM Cabinet",
    " Checking of any opening inside TVM cabinet",
    "Checking of Power Supply and Battery",
    " Check Station ID",
    " Check Device ID",
    "Check Date and Time",
    " Check Passenger Information Display (PID)",
    " Check Lubrication of all locks with silicone oil",
    " Cleaning of all modules of TVM",
    "Cleaning of lexan covering board of display",
    "Cleaning of Coin hopper opto sensor",
    "Cleaning of Cooling fans",
    " Checking and Cleaning of Cooling fan filter",
    "Cleaning of BNR",
    "Cleaning of Bank card reader",
    " Cleaning of BNR maintenance - rollers",
    " Cleaning of Coin hopper opto senso",
    " Cleaning of Printer and printer heating head",
    "Cleaning of Display",
    " Cleaning of Token hopper",
    "Cleaning of Token Sorter",
 
    "Check LAN Status (Ping Server)",
    "Component Status",
    "Token Dispenser Test",
    "Bank Note system Test",
    "Payment Terminal Test",
    " Printer Test",
    " Audio Test",
    "Bowl LED Test",
    "Alarm Test",
    " Coin Dispenser Test",
    " Card Reader Test",
  ];
  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              AFC PREVENTIVE MAINTENANCE CHECKLIST (HALF YEARLY) (ANNEXURE-B)
            </Link>
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              List
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  {" "}
                  AFC PREVENTIVE MAINTENANCE CHECKLIST (HALF YEARLY)
                  (ANNEXURE-B)
                </h3>
                <span className="line-box" style={{ width: "900px" }}></span>
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

                <div className="col-md-6">
                  <label htmlFor="inputDevice" className="form-label">
                    Device Name
                  </label>
                  <select
                    className="form-control"
                    id="device"
                    value={formValues.device_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        device_name: e.target.value,
                      })
                    }
                  >
                    <option value="----">Select Device</option>
                    {Object.entries(deviceData).map(([deviceType, devices]) => (
                      <optgroup label={deviceType} key={deviceType}>
                        {devices.map((device, index) => (
                          <option key={index} value={device}>
                            {device}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-md-2" style={{ textAlign: "left" }}>
                  Description
                </label>
                <label className="col-md-3" style={{ textAlign: "center" }}>
                  TVM
                </label>
                <label className="col-md-2" style={{ textAlign: "right" }}>
                  Remarks
                </label>
                <label className="col-md-2" style={{ textAlign: "right" }}>
                  Action Taken
                </label>
                
                <label className="col-md-2" style={{ textAlign: "center" }}>
                why deficiency couldnt be rectified
                </label>
              </div>
              {labels.map((label, index) => (
                <FormSection
                  key={index}
                  label={label}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleSelectAllChange={handleSelectAllChange}
                  workKey="activities"
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
                    Designation
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
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                  ID
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_sign: e.target.value,
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
                    Designation
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
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                  ID
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_sign: e.target.value,
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
                    Designation
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
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                  ID
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_sign: e.target.value,
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
  const isAllSelected = ["T1", "T2", "T3", "T4", "T5"].every(
    (g) => formValues[workKey][index][g] === "✔"
  );

  return (
    <div className="row mb-3">
      <div className="col-md-7">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center col-md-6 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "none", width: "fit-content" }}
            >
              {label}
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

          <div className="d-flex gap-2 justify-content-between">
            {["T1", "T2", "T3", "T4", "T5"].map((g) => (
              <div key={g}>
                <input
                  type="checkbox"
                  id={`${workKey}${g}${index}`}
                  name={`${workKey}${g}${index}`}
                  checked={formValues[workKey][index][g] === "✔"}
                  onChange={() => handleInputChange(workKey, index, g)}
                />
                <label>{g}</label>
              </div>
            ))}
          </div>

          <div className="col-md-3">
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
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].action}
              onChange={(e) =>
                handleInputChange(workKey, index, "action", e.target.value)
              }
            />
          </div>
          <div className="col-md-3">
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
export default PMLOGBOOKMAINLINE9;
