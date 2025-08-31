import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../data/formatDate";
import { editData, fetchData } from "../reducer/DepotyearlyReducer";

const DeportForm_Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [s_no, setSno] = useState(1);
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const latsvdudrill = useSelector((state) => state.deportstate || []);
  console.log(latsvdudrill.data.data);
  const [items, setItems] = useState([]);
  const itmm = latsvdudrill.data.data;
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(latsvdudrill.data.data);
  }, []);

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (latsvdudrill) {
      setSlug(latsvdudrill.slug);
      console.log(slug);
    }
  }, [latsvdudrill]);

  useEffect(() => {
    setItems(latsvdudrill.data.data);
  }, [latsvdudrill]);

  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData[0];
  const basicInitialValues = {
    //from api
    id: fd.id,
    stn_name: fd.station,
    date: formatDate(new Date().toString()),

    activities1: fd.activities1,

    activities2: fd.activities2,
    activities3: fd.activities3,

    sup_name: fd.SName,
    sup_id: fd.SempId,
    sup_sign: fd.Ssignature,
    sup_date_time: fd.SdateTime,
    mtn_name: fd.MName,
    mtn_id: fd.MempId,
    mtn_sign: fd.Msignature,
    mtn_date_time: fd.MdateTime,
    notes: fd.notes,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

  const handleInputChange = (workKey, index, key, value = null) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [key]: value !== null ? value : item[key] === "NO" ? "yes" : "NO",
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
          [keys]: value !== null ? value : item[keys] === "NO" ? "yes" : "NO",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeys]: updatedWorkArray });
  };
  const handleInputChangess = (workKeyss, indexss, keyss, value = null) => {
    const updatedWorkArray = formValues[workKeyss].map((item, idxxx) => {
      if (idxxx === indexss) {
        return {
          ...item,
          [keyss]: value !== null ? value : item[keyss] === "NO" ? "yes" : "NO",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyss]: updatedWorkArray });
  };

  const handleSelectAllChange = (workKey, index, isChecked) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item };
        for (let key in updatedItem) {
          if (key.startsWith("Ch1")) {
            updatedItem[key] = isChecked ? "yes" : "NO";
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
          if (keys.startsWith("Ch2")) {
            updatedItem[keys] = isChecked ? "yes" : "NO";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeys]: updatedWorkArray });
  };

  const handleSelectAllChangess = (workKeyss, indexss, isChecked) => {
    const updatedWorkArray = formValues[workKeyss].map((item, idxxx) => {
      if (idxxx === indexss) {
        const updatedItem = { ...item };
        for (let keyss in updatedItem) {
          if (keyss.startsWith("Ch3")) {
            updatedItem[keyss] = isChecked ? "yes" : "NO";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyss]: updatedWorkArray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const labels = [
    "Check emergency message priority sequence",
    "Announcement from PSB overrides SCR HMI Emergency messages",
    "DCC HMI emergency announcement overrides OCC emergency messages",
    "Perform the Internal Cleaning of amplifiers with shutting down of necessary equipments",
    "Take the backups of NCO and QSR",
    "Perform the Internal Cleaning of CCTV HMI & SECURITY HMI",
    "Check the Station level ring Verification",
    "Perform the Internal Cleaning of NVR",
    "Take Backups all Access Switch",
    "Checking of fiber continuity and fiber loss for dark fibers, using OTDR/Power-Source Meter. Record the values in fiber loss sheet",
    "Take the backup of All DSW and ASW",
    "Internal Cleaning of EPABX cabinet by shutting down completely",
    "Internal cleaning of IPBX server",
    "Take the backup of IPBX and Media Gateway",
    "Check for Correctness/tightness of MCBs.",
    "Measures the Output Voltages and observe for any Abnormalities.",
    "Internal Cleaning of Cubical of UPS /system (ATS,UPS-1,UPS-2,SCVS,ACDB)",
    "Check parameters of UPS from Display Panel",
    "Internal cleaning all Modules of SMPS",
    "Check parameters of SMPS from Display Panel",
    "Internal cleaning all Modules of videowall",
    "Take the backups of controlleres",
    "Check the redundancy functional status",
    "Measuresment of clean earth resistance ",
    "Checking of Earthing continuity and Maintenance of earth pits",
    "visuals Inspection of MU & RU",
    "RF Power measurement",
    "Check the redundancy paths functional status",
    "Base Radio RF test",
  ];
  const labels2 = [
    "Tx Frequency (Mhz)",
    "Rx Frequency (Mhz)",
    "Forward Power",
    "Reflected Power",
    "VSWR",
  ];
  const labels3 = [
    "Take the backups of MTS-4",
    "Take the backups of OAIT Switch",
  ];
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="form-container "
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Edit Deport Form Yearly </h3>
                <div className="heading-line"></div>
              </div>
              <div className="col-md-3 text-center justify-content-center">
                <label htmlFor="inputName" className="form-label">
                  Station
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  value={formValues.stn_name}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      stn_name: e.target.value,
                    })
                  }
                />
              </div>
              <hr
                style={{
                  borderBlockStyle: "double",
                  borderBlockColor: "#f7b3a1",
                  borderWidth: "5px",
                }}
              />
              <div className="row mb-3">
                <label className="col-md-4" style={{ textAlign: "left" }}>
                  Activity
                </label>
                <label className="col-md-9" style={{ textAlign: "center" }}>
                  Checkbox
                </label>
                <label className="col-md-6" style={{ textAlign: "center" }}>
                  Remarks
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

              {labels2.map((label, indexs) => (
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
              {labels3.map((label, indexss) => (
                <FormSection2
                  keyss={indexss}
                  label={label}
                  formValues={formValues}
                  handleInputChangess={handleInputChangess}
                  handleSelectAllChangess={handleSelectAllChangess}
                  workKeyss="activities3"
                  indexss={indexss}
                />
              ))}
              <div className="row mb-3 justify-content-between">
                <div className="col-md-12, row-md-12">
                  <label htmlFor="inputName" className="form-label">
                    Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="inputName"
                    value={formValues.notes}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3 justify-content-between">
                <div className="col-md-3">
                  <label htmlFor="inputName" className="form-label">
                    Supervisor Name & ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Name"
                    value={formValues.sup_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sup_name: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Emp ID"
                    value={formValues.sup_id}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sup_id: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="inputName" className="form-label">
                    Data & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="inputName"
                    value={formValues.sup_date_time}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sup_date_time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3 justify-content-between">
                <div className="col-md-3">
                  <label htmlFor="inputName" className="form-label">
                    Maintainer Name & ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Name"
                    value={formValues.mtn_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        mtn_name: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Emp ID"
                    value={formValues.mtn_id}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        mtn_id: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="inputName" className="form-label">
                    Data & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="inputName"
                    value={formValues.mtn_date_time}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        mtn_date_time: e.target.value,
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
  const isAllSelected = ["ch1"].every(
    (g) => formValues[workKey][index][g] === "yes"
  );

  const handleCheckboxChange = (g) => {
    handleInputChange(
      workKey,
      index,
      g,
      formValues[workKey][index][g] === "yes" ? "NO" : "yes"
    );
  };

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
          <div className="d-flex gap-3 justify-content-between">
            {["ch1"].map((g) => (
              <div key={g}>
                <input
                  type="checkbox"
                  style={{ width: "20px", height: "20px" }}
                  id={`${workKey}${g}${index}`}
                  name={`${workKey}${g}${index}`}
                  checked={formValues[workKey][index][g] === "yes"}
                  onChange={() => handleCheckboxChange(g)}
                />
                <label style={{ display: "none" }}>{g}</label>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Remark"
              className="form-control"
              value={formValues[workKey][index].remark}
              onChange={(e) =>
                handleInputChange(workKey, index, "remark", e.target.value)
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
  handleInputChanges, // Use the corrected function name
  handleSelectAllChanges,
  workKeys,
  indexs,
}) => {
  const isAllSelected = ["BR1", "BR2"].every(
    (m) => formValues[workKeys][indexs][m] === "yes"
  );

  const handleCheckboxChange = (m) => {
    // Call the corrected function name with appropriate arguments
    handleInputChanges(
      workKeys,
      indexs,
      m,
      formValues[workKeys][indexs][m] === "yes" ? "NO" : "yes"
    );
  };

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
          <div className="d-flex gap-3 justify-content-between">
            {["BR1", "BR2"].map((m) => (
              <div key={m}>
                <input
                  type="checkbox"
                  style={{ width: "20px", height: "20px" }}
                  id={`${workKeys}${m}${indexs}`}
                  name={`${workKeys}${m}${indexs}`}
                  checked={formValues[workKeys][indexs][m] === "yes"}
                  onChange={() => handleCheckboxChange(m)} // Call the corrected function directly
                />
                <label style={{ paddingLeft: "4px" }}>{m}</label>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Remark"
              className="form-control"
              value={formValues[workKeys][indexs].remark2}
              onChange={(e) =>
                handleInputChanges(workKeys, indexs, "remark2", e.target.value)
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
  handleInputChangess, // Use the corrected function name
  handleSelectAllChangess,
  workKeyss,
  indexss,
}) => {
  const isAllSelected = ["ch3"].every(
    (t) => formValues[workKeyss][indexss][t] === "yes"
  );

  const handleCheckboxChange = (t) => {
    // Call the corrected function name with appropriate arguments
    handleInputChangess(
      workKeyss,
      indexss,
      t,
      formValues[workKeyss][indexss][t] === "yes" ? "NO" : "yes"
    );
  };

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
          <div className="d-flex gap-3 justify-content-between">
            {["ch3"].map((t) => (
              <div key={t}>
                <input
                  type="checkbox"
                  style={{ width: "20px", height: "20px" }}
                  id={`${workKeyss}${t}${indexss}`}
                  name={`${workKeyss}${t}${indexss}`}
                  checked={formValues[workKeyss][indexss][t] === "yes"}
                  onChange={() => handleCheckboxChange(t)} // Call the corrected function directly
                />
                <label style={{ display: "none" }}>{t}</label>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Remark"
              className="form-control"
              value={formValues[workKeyss][indexss].remark3}
              onChange={(e) =>
                handleInputChangess(
                  workKeyss,
                  indexss,
                  "remark3",
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
export default DeportForm_Edit;
