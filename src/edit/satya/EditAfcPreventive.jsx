import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  addAfcpreventive,
  addData,
  editData,
  fetchData,
} from "../../reducer/satya/AfcPreventiveMaintenanceReducer";
import { formatDate } from "../../data/formatDate";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import stationData from "../../station.json";

const EditAfcPreventive = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const afcpreventive = useSelector((state) => state.afcmaintenance);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(afcpreventive.data.data);
  const [items, setItems] = useState([]);
  const itmm = afcpreventive.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(afcpreventive.data.data);
  }, []);
  useEffect(() => {
    if (afcpreventive) {
      setSlug(afcpreventive.slug);
    }
  }, [afcpreventive]);
  let dt = [];
  let filteredData;
  console.log(itmm);
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    // console.log(filteredData[0]);
  }
  const fd = filteredData[0];
  const initialFormState = {
    id: fd.id,
    stn_name: fd.stn_name,
    date: formatDate(new Date().toDateString()),
    month: fd.month,
    activities1: fd.activities1,
    activities2: fd.activities2,
    staff1_name: fd.staff1_name,
    staff1_desg: fd.staff1_desg,
    staff2_name: fd.staff2_name,
    staff2_desg: fd.staff2_desg,
    staff3_name: fd.staff3_name,
    staff3_desg: fd.staff3_desg,
  };

  const [formValues, setFormValues] = useState(initialFormState);
  console.log(formValues);

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
          if (key.startsWith("TOM")) {
            updatedItem[key] = isChecked ? "✔" : "❌";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  const handleSelectAllChanges = (workKeys, indexs, isChecked) => {
    const updatedWorkArray = formValues[workKeys].map((item, idxx) => {
      if (idxx === indexs) {
        const updatedItem = { ...item };
        for (let keys in updatedItem) {
          if (keys.startsWith("EC")) {
            updatedItem[keys] = isChecked ? "✔" : "❌";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeys]: updatedWorkArray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  const { toPDF, targetRef } = usePDF({
    filename: "afc_preventive_checklist_monthly(tom) form.pdf",
  });

  const labels = [
    "Check Fixing & Alignment of all modules of TOM",
    "Checking of all Cable connection and dressing",
    "Check Date and Time",
    "Check Lubrication of all locks with silicone oil",
    "Cleaning of Opto sensor, Antenna, Token tray, Reject bin, Token box, Token Path, Token Banner",
    "Cleaning of all modules of TOM ",
    "Cleaning of Trench ",
    "Card Reader Writer (CRW) Test",
    "Printer Test",
    "Passenger Display Unit (PDU) Test",
    "Token Dispensing Machine (TDM) Test",
    "Touch Screen Test",
    "Counter Communication System Test",
    "Keyboard, Mouse Test",
    "Check LAN Status",
    "Check Power Strip",
  ];

  const labels1 = [
    "Checking of all Cable connection and dressing",
    "Tightening of all Electrical Connection in EC",
    "Checking of all indicators",
    "Cleaning of Electrical Cabinet",
    "ELCB Push Button Operation",
  ];

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              AFC Preventive Maintenance (Monthly)
            </Link>
            <Link underline="hover" color="inherit">
              Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
          >
            <button className="btn btn-primary" onClick={() => toPDF()}>
              <MdPictureAsPdf size={"25px"} color="#fff" />
              {/* Export To Pdf */}
            </button>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  EDIT: AFC PREVENTIVE MAINTENANCE CHECKLIST(HALF YEARLY)
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row col-md-12">
                <select
                  placeholder="STATION"
                  className="form-control"
                  id="inputstnname"
                  value={formValues.stn_name}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      stn_name: e.target.value,
                    })
                  }
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
              <div className="row mb-3">
                <label className="col-md-4" style={{ textAlign: "left" }}>
                  Description
                </label>
                <label className="col-md-9" style={{ textAlign: "center" }}>
                  TOM
                </label>
                <label className="col-md-6" style={{ textAlign: "right" }}>
                  Remarks
                </label>
                <label className="col-md-3" style={{ textAlign: "right" }}>
                  Action Taken
                </label>
                <label className="col-md-7" style={{ textAlign: "center" }}>
                  Deficiency
                </label>
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

              <div className="row mb-3">
                <label className="col-md-4" style={{ textAlign: "left" }}>
                  Description
                </label>
                <label className="col-md-9" style={{ textAlign: "center" }}>
                  EC
                </label>
                <label className="col-md-6" style={{ textAlign: "right" }}>
                  Remarks
                </label>
                <label className="col-md-3" style={{ textAlign: "center" }}>
                  Action Taken
                </label>
                <label className="col-md-7" style={{ textAlign: "left" }}>
                  Deficiency
                </label>
              </div>
              {labels1.map((label, indexs) => (
                <FormSection1
                  keys={indexs}
                  label={label}
                  formValues={formValues}
                  handleInputChanges={handleInputChanges}
                  handleSelectAllChanges={handleSelectAllChanges}
                  workKeys="activities2"
                  indexs={indexs}
                />
              ))}

              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.staff1_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    Desgination
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.staff1_desg}
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
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.staff2_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    Desgination
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.staff2_desg}
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
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.staff3_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    Desgination
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.staff3_desg}
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
                <button type="submit" className="btn btn-primary mt-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
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
    (g) => formValues[workKey][index][g] === "✔"
  );

  return (
    <div className="row mb-3">
      <div className="col-md-7">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center col-md-4 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "none", width: "fit-content" }}
            >
              {label}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                id={`${workKey}SelectAll${index}`}
                checked={isAllSelected}
                value={formValues[workKey][index]}
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
            </label>
          </div>

          <div className="d-flex gap-2 justify-content-between">
            {["TOM1", "TOM2", "TOM3", "TOM4", "TOM5"].map((g) => (
              <div key={g}>
                <input
                  type="checkbox"
                  id={`${workKey}${g}${index}`}
                  name={`${workKey}${g}${index}`}
                  checked={formValues[workKey][index][g] === "✔"}
                  value={formValues[workKey][index][g]}
                  onChange={() => handleInputChange(workKey, index, g)}
                />
                <label>{g}</label>
              </div>
            ))}
          </div>

          <div className="col-md-4">
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
          <div className="col-md-4">
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
const FormSection1 = ({
  label,
  formValues,
  handleInputChanges,
  handleSelectAllChanges,
  workKeys,
  indexs,
}) => {
  const isAllSelected = ["EC1", "EC2", "EC3", "EC4", "EC5"].every(
    (c) => formValues[workKeys][indexs][c] === "✔"
  );

  return (
    <div className="row mb-3">
      <div className="col-md-7">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center col-md-4 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "none", width: "fit-content" }}
            >
              {label}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                id={`${workKeys}SelectAll${indexs}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChanges(workKeys, indexs, e.target.checked)
                }
              />
              <label
                style={{ fontSize: "14px" }}
                htmlFor={`${workKeys}SelectAll${indexs}`}
              >
                {isAllSelected ? "UnCheck All" : "Check All"}
              </label>
            </label>
          </div>

          <div className="d-flex gap-4 justify-content-between">
            {["EC1", "EC2", "EC3", "EC4", "EC5"].map((c) => (
              <div keys={c}>
                <input
                  type="checkbox"
                  id={`${workKeys}${c}${indexs}`}
                  name={`${workKeys}${c}${indexs}`}
                  checked={formValues[workKeys][indexs][c] === "✔"}
                  onChange={() => handleInputChanges(workKeys, indexs, c)}
                />
                <label>{c}</label>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              value={formValues[workKeys][indexs].remarks}
              onChange={(e) =>
                handleInputChanges(workKeys, indexs, "remarks", e.target.value)
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              value={formValues[workKeys][indexs].actions}
              onChange={(e) =>
                handleInputChanges(workKeys, indexs, "actions", e.target.value)
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              value={formValues[workKeys][indexs].deficiency1}
              onChange={(e) =>
                handleInputChanges(
                  workKeys,
                  indexs,
                  "deficiency1",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAfcPreventive;
