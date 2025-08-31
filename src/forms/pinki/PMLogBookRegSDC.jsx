import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData, addLogBook } from "../../reducer/pinki/PMLogBookReducerSDC";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import stations from "../../stations.json";

const PMLogBookReg = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Pmlog = useSelector((state) => state.pmlogbook);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    setSlug(Pmlog.slug);
  }, [Pmlog]);

  const initialFormState = {
    stn_name: "----",
    date: formatDate(new Date().toDateString()),
    month: new Date().getMonth(),
    work1: Array(12).fill({
      TPNR_SC: "No",
      MWYA_SC: "No",
      TOSDC_CC_ServerM3: "No",
      SDC_Switch: "No",
      TOMSDC_EC5: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    work2: Array(6).fill({
      interface: "No",
      kms: "No",
      ad: "No",
      bim: "No",
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
        if (workKey === "work1") {
          [
            "TPNR_SC",
            "MWYA_SC",
            "TOSDC_CC_ServerM3",
            "SDC_Switch",
            "TOMSDC_EC5",
          ].forEach((key) => {
            updatedItem[key] = isChecked ? "Yes" : "No";
          });
        } else if (workKey === "work2") {
          ["interface", "kms", "ad", "bim"].forEach((key) => {
            updatedItem[key] = isChecked ? "Yes" : "No";
          });
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  const handleChange = (index, field, value, type) => {
    if (type === "halfyearly") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [type]: prevValues[type].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [field]: value, // Directly update fields like 'station', 'equipment', etc.
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };

  const labels1 = [
    "Check Date and Time of Server",
    "check Switch rack fan",
    "Check internal fan status of Switches",
    "Checking of all Cable connection and dressing",
    "Cleaning of Server (interior & exterior)",
    "Cleaning and checking of sub modules of Server( Printer, Keyboard and Mouse etc)",
    "Cleaning of SC HDD and check their proper fitment",
    "Exterior Cleaning of Switches",
    "External and internal cleaning of network switch racks",
    "Test different modes in device manager by applying and releasing on",
    "Check if all equipments are on LAN in Device manager",
    "Check if Switches are working normal and all equipments are on LAN and",
  ];

  const labels2 = [
    " Check Date and Time of Server",
    "Cleaning of Server (interior & exterior)",
    "Cleaning and checking of sub modules of Server( Keyboard and Mouse etc) ",
    "Check if all equipments are on LAN",
    "Check Fareon Module of BIM",
    "Check if Card reader of BIM are working",
  ];

  return (
    <>
      <div className="container">
        <div role="presentation" className="breadcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PM Log 8
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
                <h3 className="form-heading">
                  PREVENTIVE MAINTENANCE WORKSHEET OF SDC SERVERS (HALF YEARLY)
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="col-md-5 text-center justify-content-center">
                <label htmlFor="stationName" className="form-label">
                  Station
                </label>
                <select
                  required
                  id="station"
                  name="station"
                  className="form-control"
                  value={formValues.stn_name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, stn_name: e.target.value })
                  }
                >
                  <option value="">Select Station</option>
                  {stations.map(
                    (station, index) =>
                      station["Station Name"] && (
                        <option key={index} value={station["STATION Code"]}>
                          {station["Station Name"]}
                        </option>
                      )
                  )}
                </select>
              </div>
              <hr
                style={{
                  borderBlockStyle: "double",
                  borderBlockColor: "#f7b3a1",
                  borderWidth: "5px",
                }}
              />
              {labels1.map((label, index) => (
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
              {labels2.map((label, index) => (
                <FormSection
                  key={index}
                  label={label}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleSelectAllChange={handleSelectAllChange}
                  workKey="work2"
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
                    Emp Id
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
                    Emp Id
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
                    Emp Id
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
  const isAllSelected =
    workKey === "work1"
      ? [
          "TPNR_SC",
          "MWYA_SC",
          "TOSDC_CC_ServerM3",
          "SDC_Switch",
          "TOMSDC_EC5",
        ].every((g) => formValues[workKey][index][g] === "Yes")
      : ["interface", "kms", "ad", "bim"].every(
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
            </label>
          </div>
          <div className="d-flex gap-1 justify-content-between">
            {workKey === "work1"
              ? [
                  "TPNR_SC",
                  "MWYA_SC",
                  "TOSDC_CC_ServerM3",
                  "SDC_Switch",
                  "TOMSDC_EC5",
                ].map((g) => (
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
                ))
              : ["interface", "kms", "ad", "bim"].map((g) => (
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

export default PMLogBookReg;
