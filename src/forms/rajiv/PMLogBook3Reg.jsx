import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/rajiv/PMLogBook3Reducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import stationData from "../../station.json";

const PMLogBook3Reg = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PMLogBook3List = useSelector((state) => state.PMLogBook3);

  const [slug, setSlug] = useState("");
  useEffect(() => {
    if (PMLogBook3List) {
      setSlug(PMLogBook3List.slug);
    }
  }, [PMLogBook3List]);
  const initialFormState = {
    date: "",
    station: "",
    month: new Date().getMonth() + 1,
    activities: Array(19).fill({
      ServerRack: "No",
      NetworkRack: "No",
      CCHSServerNetworkRack: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),

    staff1_name: "",
    staff1_desg: "",
    staff1_employee: "",
    staff1_sign: "",
    staff2_name: "",
    staff2_desg: "",
    staff2_employee: "",
    staff2_sign: "",
    staff3_name: "",
    staff3_desg: "",
    staff3_employee: "",
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
        return {
          ServerRack: isChecked ? "Yes" : "No",
          NetworkRack: isChecked ? "Yes" : "No",
          CCHSServerNetworkRack: isChecked ? "Yes" : "No",
          remark: item.remark,
          action: item.action,
          deficiency: item.deficiency,
        };
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
    "Checking of all Cable connection and dressing",
    "Checking of physical condition of all cable (specially for Rodent cut)",
    "Checking of any opening inside rack",
    "Checking of Fan status of Racks and Equipments",
    "Checking of power indication of Rack",
    "Checking of LED indication of all the 20 drive of Main storage",
    "Checking of LED indication of all the 10 drive of Backup storage",
    "Checking of health Status of all the server inside Rack",
    "Checking of health Status of all the Networking equipment inside rack",
    "Checking of health Status of the Tape Library",
    "Checking and ensuring that no excessive heat accumulated inside rack",
    "Cleaning of Rack",
    "Exterior cleaning of equipments in the rack",
    "Check voltage between neutral & earth in the rack",
    "Check patch updates of servers.",
    "Check Firmware of Firewall.",
    "Check LAN status of all the equipments in the rack",
    "Checking of room temperature",
    "Check all the services of the server",
  ];

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PREVENTIVE MAINTENACE WORKSHEET OF CENTRAL COMPUER (MONTYLY)
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
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputshift" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputstation" className="form-label">
                    Station
                  </label>

                  <select
                    className="form-control"
                    id="inputstation"
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
              <StaffDetailsSection
                formValues={formValues}
                setFormValues={setFormValues}
              />
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
    "ServerRack",
    "NetworkRack",
    "CCHSServerNetworkRack",
  ].every((key) => formValues[workKey][index][key] === "Yes");

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
          <div className=" col-md-2 ">
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
            {["ServerRack", "NetworkRack", "CCHSServerNetworkRack"].map(
              (key) => (
                <div key={key}>
                  <input
                    type="checkbox"
                    id={`${workKey}${key}${index}`}
                    name={`${workKey}${key}${index}`}
                    checked={formValues[workKey][index][key] === "Yes"}
                    onChange={() => handleInputChange(workKey, index, key)}
                  />
                  <label>{key}</label>
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
            <label>Why Defficiencies Could Not Be Rectified</label>
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

const StaffDetailsSection = ({ formValues, setFormValues }) => (
  <>
    {["staff1", "staff2", "staff3"].map((staff, index) => (
      <div className="row mb-3" key={index}>
        <div className="col-md-3">
          <label htmlFor="inputName" className="form-label">
            Staff Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={formValues[`${staff}_name`]}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [`${staff}_name`]: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputDesignation" className="form-label">
            Designation
          </label>
          <input
            type="text"
            className="form-control"
            id="inputDesignation"
            value={formValues[`${staff}_desg`]}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [`${staff}_desg`]: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="inputempid" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="inputempid"
            value={formValues[`${staff}_employee`]}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [`${staff}_employee`]: e.target.value,
              })
            }
          />
        </div>
        {/* <div className="col-md-3">
          <label htmlFor="inputempid" className="form-label">
            Signature
          </label>
          <input
            type="text"
            className="form-control"
            id="inputempid"
            value={formValues[`${staff}_sign`]}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [`${staff}_sign`]: e.target.value,
              })
            }
          />
        </div> */}
      </div>
    ))}
  </>
);

export default PMLogBook3Reg;
