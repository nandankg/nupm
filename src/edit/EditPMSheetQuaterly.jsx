import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../data/formatDate";
import stations from "../data/station.json";
import { editData, fetchData } from "../reducer/PmSheetReducer";

const PMSheetQuaterly_Edit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    console.log(id);
    const dispatch = useDispatch();
    const latsvdudrill = useSelector((state) => state.pmsheetstate || []);
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
    const initialFormState = {
        //from api
        id: fd.id,
        stn_name: fd.station,
        date: formatDate(new Date().toString()),

        activities1: fd.activities1,
        activities2: fd.activities2,

        sup_name: fd.sup_name,
        sup_id: fd.sup_id,
        sup_sign: fd.sup_sign,
        sup_date: fd.sup_date,
        sup_time: fd.sup_time,
        mtn_name: fd.mtn_name,
        mtn_id: fd.mtn_id,
        mtn_sign: fd.mtn_sign,
        mtn_date: fd.mtn_date,
        mtn_time: fd.mtn_time,
        notes: fd.notes,
        employee_id: fd.employee_id,
        department: fd.department,
        unit: fd.unit,
    };

    const [formValues, setFormValues] = useState(initialFormState);

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


    const handleSelectAllChange = (workKey, index, isChecked) => {
        const updatedWorkArray = formValues[workKey].map((item, idx) => {
            if (idx === index) {
                const updatedItem = { ...item };
                for (let key in updatedItem) {
                    if (key.startsWith("ch1")) {
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

    const labels = [
        "Checking of HMI Functionalities",
        "Making Live Announcement (HMI Normal)",
        "Making Live Announcement (HMI Emergency)",
        "Message Recording, Preview and announcement",
        "Message Scheduling & Repetition",
        "Check message origin status in HMI",
        "External cleaning of Sprakers at all Zones",
        "Perform disk defragmentation and restart HMI",
        "Login individual SWs for Alarms",
        "Check Redundant Power supply status of DSW",
        "Physical inspection of IDF & MDF",
        "External cleaning of all cameras in Depot Boundary, RSS,Workshop,SBL,IBL,IBL & Staff Zone",
        "Check forFocussing and alignment of all cameras in All Zones",
        "Check network ping test of MCLK and SMCLK",
        "External cleaning of all Modules of Train Radio",
        "Check for Correctness/tightness of MCBs",
        "Measure the Output Voltagesand observe for any Abnormalities ",
        "Verify the Buzzer Functioning ",
        "Verify the Emergency glass functioning",
        "External cleaning of all cubicals, video engine & controller ",
        "Load test of battery banl 1 & 2 ",
        "Load test of battery banl 1 & 2 ",

    ];
    const labels2 = [
        "Check Redundancy Power supply status of ASW",
        "Checking of Power supply Voltage on Back panel of Media Gatway (-45 Vdc to -57 Vdc)",
        "Check & Record Max CPU  Utilization values in NVR (shall be <80%) CPU ",
        "Check & Record Max RAM Utilization values in NVR (shall be <80%) RAM ",
        "Voltage Measurements at data SPD/Terminal block output to measure Time Code Signal (Shall be >24 Vdc)"
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(editData(formValues));
        navigate(`/list/${slug}`);
    };
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
                    <h3 className="form-heading">
                     EDIT PM Sheet Quarterly Maintenance Schedule
                    </h3>
                    <div className="heading-line"></div>
                  </div>
                  <div className="d-flex justify-content-around">
                    <div className="row mb-3 align-items-center justify-content-between ">
                      <div className="col-md-5 text-center justify-content-center">
                        <label htmlFor="stationName" className="form-label">
                          Station
                        </label>
                        <select 
                        id="station"
                        name="station"
                        className="form-control"
                        value={formValues.stn_name}
                        onChange={(e) => setFormValues({...formValues,stn_name: e.target.value})}
                        >
                          <option value="">Select Station</option>
                          {stations.map((station, index) =>
                          station["Station Name"] &&(
                            <option key={index} value={station["STATION Code"]}>{station["Station Name"]}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-5 text-center justify-content-center">
                        <label htmlFor="dateInput" className="form-label">
                          Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          value={formValues.date}
                          id="dateInput"
                          onChange={(e) =>
                            setFormValues({ ...formValues, date: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
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
                  <div className="row mb-3">
                    <label className="col-md-4" style={{ textAlign: "left" }}>
                      Activity
                    </label>
                    <label className="col-md-6" style={{ textAlign: "right" }}>
                      Checkbox
                    </label>
                    <label className="col-md-6" style={{ textAlign: "center" }}>
                      Input
                    </label>
                    <label className="col-md-6" style={{ textAlign: "center" }}>
                      Remarks
                    </label>
                  </div>
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
                        value={formValues.stn_name}
                        placeholder="Name"
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
                        value={formValues.sup_id}
                        id="inputName"
                        placeholder="Emp ID"
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
                        value={formValues.sup_date}
                        id="inputName"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            sup_date: e.target.value,
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
                        value={formValues.mtn_name}
                        id="inputName"
                        placeholder="Name"
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
                        value={formValues.mtn_id}
                        placeholder="Emp ID"
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
                        value={formValues.mtn_date}
                        id="inputName"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            mtn_date: e.target.value,
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
    const isAllSelected = ["ch1"].every((g) => formValues[workKey][index][g] === "yes");

    const handleCheckboxChange = (g) => {
        handleInputChange(workKey, index, g, formValues[workKey][index][g] === "yes" ? "NO" : "yes");
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
    const isAllSelected = ["ch2"].every((m) => formValues[workKeys][indexs][m] === "yes");

    const handleCheckboxChange = (m) => {
        // Call the corrected function name with appropriate arguments
        handleInputChanges(workKeys, indexs, m, formValues[workKeys][indexs][m] === "yes" ? "NO" : "yes");
    };

    return (
        <div className="row mb-3">
            <div className="col-md-12">
                <div className="d-flex align-items-start justify-content-between">
                    <div className="d-flex align-items-center col-md-4 flex-wrap">
                        <label className="form-label mb-0" style={{ textAlign: "left", flex: "none", width: "fit-content" }}>
                            {label} &nbsp;
                        </label>
                    </div>
                    <div className="d-flex gap-3 justify-content-between">
                        {["ch2"].map((m) => (
                            <div key={m}>
                                <input
                                    type="checkbox"
                                    style={{ width: "20px", height: "20px" }}
                                    id={`${workKeys}${m}${indexs}`}
                                    name={`${workKeys}${m}${indexs}`}
                                    checked={formValues[workKeys][indexs][m] === "yes"}
                                    onChange={() => handleCheckboxChange(m)} // Call the corrected function directly
                                />
                                <label style={{ display: "none" }}>{m}</label>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            placeholder="data"
                            className="form-control"
                            value={formValues[workKeys][indexs].input}
                            onChange={(e) =>
                                handleInputChanges(workKeys, indexs, "input", e.target.value) // Use the corrected function name
                            }
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            placeholder="Remark"
                            className="form-control"
                            value={formValues[workKeys][indexs].remark2}
                            onChange={(e) =>
                                handleInputChanges(workKeys, indexs, "remark2", e.target.value) // Use the corrected function name
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PMSheetQuaterly_Edit;