import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import { addData, fetchData,editData } from "../../reducer/manshi/Afc_preventionReducer";
import stationData from "../../data/station.json";
import deviceData from "../../data/device.json";

const Editafc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const addafc = useSelector((state) => state.afc);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (addafc) {
      setSlug(addafc.slug);
    }
  }, [addafc]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (addafc.data && addafc.data.data) {
      setItems(addafc.data.data);
    }
  }, [addafc]);

  let filteredData;
  if (items.length > 0) {
    filteredData = items.filter((itm) => itm.id === id);
  }

  const fd = filteredData ? filteredData[0] : {};

  const basicInitialValues = {
    id: fd.id || "",
    station: fd.stn_name,
    device_name: fd.device_name,
    date: fd.date,
    month: fd.month,
    work1: fd.activities,
    staff1_name: fd.staff1_name,
    staff1_desg: fd.staff1_desg,
    staff1_employee: "",
    staff1_sign: fd.staff1_sign,
    staff2_name: fd.staff2_name,
    staff2_employee: "",
    staff2_desg: fd.staff2_desg,
    staff2_sign: fd.staff2_sign,
    staff3_name: fd.staff3_name,
    staff3_desg: fd.staff3_desg,
    staff3_employee: "",
    staff3_sign: fd.staff3_sign,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  useEffect(() => {
    if (fd) {
      setFormValues(basicInitialValues);
    }
  }, [fd]);

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
        ["TVM1", "TVM2", "TVM3", "TVM4", "TVM5"].forEach((key) => {
          updatedItem[key] = isChecked ? "Yes" : "No";
        });
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const labels = [
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
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              AFC Preventive Maintenance (Monthly)
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
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  AFC PREVENTIVE MAINTAINANCE CHECKLIST
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
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

                <div className="col-md-4">
                <label htmlFor="inputdate" className="form-label">
                    Date
                  </label>
                  <input type="date" className="form-control"
                   id="date"
                   value={formValues.date}
                   onChange={(e) =>
                     setFormValues({ ...formValues, date: e.target.value })
                   }
                   required/>

                </div>
                <div className="col-md-4">
                <label htmlFor="inputdate" className="form-label">
                    Month
                  </label>
                  <input type="month" className="form-control"
                   id="month"
                   value={formValues.month}
                   onChange={(e) =>
                     setFormValues({ ...formValues, month: e.target.value })
                   }
                   required/>

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
                    name="staff1_name"
                    value={formValues.staff1_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff1_desg"
                    value={formValues.staff1_desg}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    {" "}
                    Employee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff1_sign"
                    value={formValues.staff1_sign}
                    onChange={handleChange}
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
                    name="staff2_name"
                    value={formValues.staff2_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff2_desg"
                    value={formValues.staff2_desg}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Employee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff2_sign"
                    value={formValues.staff2_sign}
                    onChange={handleChange}
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
                    name="staff3_name"
                    value={formValues.staff3_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff3_desg"
                    value={formValues.staff3_desg}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Employee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff3_sign"
                    value={formValues.staff3_sign}
                    onChange={handleChange}
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
  if (!formValues[workKey] || !formValues[workKey][index]) {
    return null;
  }

  const isAllSelected = ["TVM1", "TVM2", "TVM3", "TVM4", "TVM5"].every(
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
            {["TVM1", "TVM2", "TVM3", "TVM4", "TVM5"].map((g) => (
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

export default Editafc;
