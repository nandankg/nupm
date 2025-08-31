import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addData,
  addPmlogMaintain,
} from "../../reducer/manshi/PmlogMaintainReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import stationData from "../../data/station.json";
import deviceData from "../../data/device.json";
const PmlogMaintain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Pmlog = useSelector((state) => state.PmlogMaintain);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Pmlog) {
      setSlug(Pmlog.slug);
    }
  }, [Pmlog]);
  const initialFormState = {
    stn_name: "----",
    device_name: "----",
    date: "",
    month: "",
    work1: Array(24).fill({
      TOM1: "No",
      TOM2: "No",
      TOM3: "No",
      TOM4: "No",
      TOM5: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
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
        ["TOM1", "TOM2", "TOM3", "TOM4", "TOM5"].forEach((key) => {
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
    navigate(`/list/${slug}`);
  };

  const labels = [
    "Check Fixing & Alignment of all modules of TOM",
    "Checking of all Cable connection and dressing",
    "Check Date and Time",
    "Sealing of unused USB Port",
    "Check TOM should be logged in via login card only",
    "Check for disabled USB drives",
    "Check Lubrication of all locks with silicone oil",
    "Cleaning of Opto sensor, Antenna, Token tray, Reject bin, Token box, token path, token hopper",
    "Cleaning of all modules of TOM",
    "Cleaning of Trench",
    "Card Reader Writer (CRW) Test",
    "Printer Test",
    "Passenger Display Unit (PDU) Test",
    "Token Dispensing Machine (TDM) Test",
    "Touch Screen Test",
    "Counter Communication System Test",
    "Keyboard, Mouse Test",
    "Check LAN Status",
    "Check Power strip",
    "Checking of all Cable connection and dressing",
    "Tightening of all Electrical Connection in EC",
    "Checking of all indicators",
    "Cleaning of Electrical Cabinet",
    "ELCB Push Button Operation",
  ];

  return (
    <>
      {" "}
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
            AFC PREVENTIVE MAINTENANCE CHECKLIST(MONTHLY)
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading"> AFC PREVENTIVE MAINTENANCE CHECKLIST(MONTHLY)</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
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

                <div className="col-md-3">
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
                <div className="col-md-3">
                <label htmlFor="inputstation" className="form-label">
                  Date
                    </label>
                <input
                type="date"
                    className="form-control"
                    id="month"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                <label htmlFor="inputstation" className="form-label">
                    Month
                    </label>
                <input
                type="month"
                    className="form-control"
                    id="month"
                    value={formValues.month}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        month: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {labels.map((label, index) => (
                <FormSection
                  key={index}
                  label={label}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleSelectAllChange={handleSelectAllChange}
                  workKey="work1"
                  index={index}
                />
              ))}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputName" className="form-label">
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
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
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
                  <label htmlFor="inputempid" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="text"
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
                  <label htmlFor="inputName" className="form-label">
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
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
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
                  <label htmlFor="inputempid" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="text"
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
                  <label htmlFor="inputName" className="form-label">
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
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
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
                  <label htmlFor="inputempid" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="text"
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
  const isAllSelected = ["TOM1", "TOM2", "TOM3", "TOM4", "TOM5"].every(
    (g) => formValues[workKey][index][g] === "Yes"
  );

  return (
    <div className="row mb-3">
      <div className="col-md-12">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center col-md-4 flex-wrap">
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
                {isAllSelected ? "Uncheck All" : "Check All"}
              </label>
            
          </div>
          <div className="d-flex gap-1 justify-content-between">
            {["TOM1", "TOM2", "TOM3", "TOM4", "TOM5"].map((g) => (
              <div key={g} className="d-flex align-items-center">
                <input
                  type="checkbox"
                  id={`${workKey}${g}${index}`}
                  name={`${workKey}${g}${index}`}
                  checked={formValues[workKey][index][g] === "Yes"}
                  onChange={() => handleInputChange(workKey, index, g)}
                  style={{ marginRight: "3px" }}
                />
                <label htmlFor={`${workKey}${g}${index}`}>{g}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="row mt-2">
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

export default PmlogMaintain;
