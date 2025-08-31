import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  addData,
  addChecklist,
} from "../../reducer/chanchal/Pm_logbook_half_yearly_other_mainline_Reducer";
import { formatDate, formatTime } from "../../data/formatDate";
import stationData from "../../station.json"; // Update the path to your station.json

const Checklist = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const ChecklistList = useSelector((state) => state.checklist);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (ChecklistList) {
      setSlug(ChecklistList.slug);
    }
  }, [ChecklistList]);

  const initialFormState = {
    stn_name: "",
    // date: formatDate(new Date().toLocaleDateString()),
    date: formatDate(new Date().toString),
    month: new Date().getMonth(),
    activities1: Array(8).fill({
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
    activities2: Array(9).fill({
      avm1: "No",
      avm2: "No",
      avm3: "No",
      avm4: "No",
      avm5: "No",
      avm6: "No",
      remarkavm: "",
      actionavm: "",
      deficiencyavm: "",
    }),
    activities3: Array(8).fill({
      swt1: "No",
      swt2: "No",
      swt3: "No",
      swt4: "No",
      swt5: "No",
      swt6: "No",
      remarkswt: "",
      actionswt: "",
      deficiencyswt: "",
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

  const handleInputChangesc = (workKeysc, indexsc, keysc, value = null) => {
    const updatedWorkArray = formValues[workKeysc].map((item, idsc) => {
      if (idsc === indexsc) {
        return {
          ...item,
          [keysc]: value !== null ? value : item[keysc] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeysc]: updatedWorkArray });
  };

  const handleInputChangesavm = (
    workKeyavm,
    indexavm,
    keyavm,
    value = null
  ) => {
    const updatedWorkArray = formValues[workKeyavm].map((item, idavm) => {
      if (idavm === indexavm) {
        return {
          ...item,
          [keyavm]:
            value !== null ? value : item[keyavm] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyavm]: updatedWorkArray });
  };

  const handleInputChangesswt = (
    workKeyswt,
    indexswt,
    keyswt,
    value = null
  ) => {
    const updatedWorkArray = formValues[workKeyswt].map((item, idswt) => {
      if (idswt === indexswt) {
        return {
          ...item,
          [keyswt]:
            value !== null ? value : item[keyswt] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyswt]: updatedWorkArray });
  };

  const handleSelectAllChangesc = (workKeysc, indexsc, isChecked) => {
    const updatedWorkArray = formValues[workKeysc].map((item, idsc) => {
      if (idsc === indexsc) {
        const updatedItem = { ...item };
        for (let keysc in updatedItem) {
          if (keysc.startsWith("SC")) {
            updatedItem[keysc] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeysc]: updatedWorkArray });
  };

  const handleSelectAllChangesavm = (workKeyavm, indexavm, isChecked) => {
    const updatedWorkArray = formValues[workKeyavm].map((item, idavm) => {
      if (idavm === indexavm) {
        const updatedItem = { ...item };
        for (let keyavm in updatedItem) {
          if (keyavm.startsWith("avm")) {
            updatedItem[keyavm] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyavm]: updatedWorkArray });
  };

  const handleSelectAllChangesswt = (workKeyswt, indexswt, isChecked) => {
    const updatedWorkArray = formValues[workKeyswt].map((item, idswt) => {
      if (idswt === indexswt) {
        const updatedItem = { ...item };
        for (let keyswt in updatedItem) {
          if (keyswt.startsWith("swt")) {
            updatedItem[keyswt] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyswt]: updatedWorkArray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    // navigate("/list/pm-logbook-half-yearly-other-mainline");
    navigate(`/list/${slug}`);
  };

  const labelsc = [
    "Check Fixing & Alignment of all modules of SC",
    "Checking of all Cable connection and dressing",
    "Check Date and Time",
    "Cleaning of SC Server (interior & exterior)",
    "Cleaning and checking of sub modules of SC ( Printer, Keyboard and Mouse etc)",
    "Cleaning of SC HDD and check their proper fitment",
    "Test different modes in device manager by applying and releasing on equipments",
    "Check working of redundant power supply of SC server",
  ];
  const labelavm = [
    "Check the serviceability of AVM",
    "Checking of all Cable connection and dressing ",
    "Check Date and Time",
    "Check Station ID",
    "Check Device ID",
    "Check Lubrication of all locks with silicone oil",
    "Card Reader Test",
    "Passenger Information Display (PID) Test",
    "Check LAN Status (Ping Server)",
  ];
  const labelswt = [
    "Check Fixing & Alignment of all modules of Switch Rack",
    "Checking of all Cable connection and dressing ",
    "Check internal fan status of Switches",
    "Cleaning of Switch Rack and its fan",
    "Internal cleaning of L3 switch",
    "External cleaning of Switch",
    "Test of redundant link",
    "Check if Switches are working normal and all equipments are on LAN",
  ];

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
            AFC Preventive Maintenance-OTHERS(Half Yearly) (ANNEXURE-B)
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
                AFC Preventive Maintenance-OTHERS(Half Yearly)
                  (ANNEXURE-B)
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
                    value={formValues.stn_name}
                    onChange={(e) =>
                      setFormValues({ ...formValues, stn_name: e.target.value })
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
                {/* <div className="col-md-4">
                  <label For="stnname" className="form-label">
                    STN Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="stnname"
                    placeholder="Name"
                    onChange={(e) =>
                      setFormValues({ ...formValues, stn_name: e.target.value })
                    }
                  />
                </div> */}
                <div className="col-md-4">
                  <label htmlFor="date" className="form-label">
                    Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="month" className="form-label">
                    Month:
                  </label>
                  <input
                    type="month"
                    className="form-control"
                    id="month"
                    onChange={(e) =>
                      setFormValues({ ...formValues, month: e.target.value })
                    }
                  />
                </div>
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
                  Description
                </label>
                <label className="col-md-9" style={{ textAlign: "center" }}>
                  SC
                </label>
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Remarks
                </label>
                <label className="col-md-3" style={{ textAlign: "left" }}>
                  Action Taken
                </label>
                <label className="col-md-7" style={{ textAlign: "left" }}>
                  Deficiency
                </label>
              </div>
              {labelsc.map((label, indexsc) => (
                <FormSection
                  keysc={indexsc}
                  label={label}
                  formValues={formValues}
                  handleInputChangesc={handleInputChangesc}
                  handleSelectAllChangesc={handleSelectAllChangesc}
                  workKeysc="activities1"
                  indexsc={indexsc}
                />
              ))}

              <div className="row mb-3">
                <label className="col-md-4" style={{ textAlign: "left" }}>
                  Description
                </label>
                <label className="col-md-9" style={{ textAlign: "center" }}>
                  AVM
                </label>
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Remarks
                </label>
                <label className="col-md-3" style={{ textAlign: "left" }}>
                  Action Taken
                </label>
                <label className="col-md-7" style={{ textAlign: "left" }}>
                  Deficiency
                </label>
              </div>
              {labelavm.map((label, indexavm) => (
                <FormSection1
                  keyavm={indexavm}
                  label={label}
                  formValues={formValues}
                  handleInputChangeavm={handleInputChangesavm}
                  handleSelectAllChangeavm={handleSelectAllChangesavm}
                  workKeyavm="activities2"
                  indexavm={indexavm}
                />
              ))}

              <div className="row mb-3">
                <label className="col-md-4" style={{ textAlign: "left" }}>
                  Description
                </label>
                <label className="col-md-9" style={{ textAlign: "center" }}>
                  Switch
                </label>
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Remarks
                </label>
                <label className="col-md-3" style={{ textAlign: "left" }}>
                  Action Taken
                </label>
                <label className="col-md-7" style={{ textAlign: "left" }}>
                  Deficiency
                </label>
              </div>
              {labelswt.map((label, indexswt) => (
                <FormSection2
                  keyswt={indexswt}
                  label={label}
                  formValues={formValues}
                  handleInputChangeswt={handleInputChangesswt}
                  handleSelectAllChangeswt={handleSelectAllChangesswt}
                  workKeyswt="activities3"
                  indexswt={indexswt}
                />
              ))}

              <hr
                style={{
                  borderBlockStyle: "double",
                  borderBlockColor: "#f7b3a1",
                  borderWidth: "5px",
                }}
              />
              <div className="row mb-3">
                <div className="col-md-6">
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
                <div className="col-md-6">
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
                {/* <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Sign
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
                </div> */}
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
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_desg: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Sign
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
                </div> */}
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
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_desg: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Sign
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
                </div> */}
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
  handleInputChangesc,
  handleSelectAllChangesc,
  workKeysc,
  indexsc,
}) => {
  const isAllSelected = ["SC1", "SC2", "SC3", "SC4", "SC5", "SC6"].every(
    (SC) => formValues[workKeysc][indexsc][SC] === "Yes"
  );
  const handleCheckboxChange = (SC) => {
    handleInputChangesc(
      workKeysc,
      indexsc,
      SC,
      formValues[workKeysc][indexsc][SC] === "Yes" ? "No" : "Yes"
    );
  };
  return (
    <div className="row mb-3">
      <div className="col-md-7">
        <div className="d-flex align-items-start justify-content-between gap-2">
          <div className="d-flex align-items-center col-md-4 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "None", width: "fit-content" }}
            >
              {label} &nbsp;
            </label>
          </div>
          <div className="col-md-2">
            <input
              type="checkbox"
              id={`${workKeysc} SelectAll${indexsc}`}
              checked={isAllSelected}
              onChange={(e) =>
                handleSelectAllChangesc(workKeysc, indexsc, e.target.checked)
              }
            />
            <label
              style={{ fontSize: "14px" }}
              htmlFor={`${workKeysc} SelectAll${indexsc}`}
            >
              {isAllSelected ? "UnCheck All" : "Check All"}
            </label>
          </div>
          <div className="d-flex gap-4 justify-content-between">
            {["SC1", "SC2", "SC3", "SC4", "SC5", "SC6"].map((s) => (
              <div key={s}>
                <input
                  type="checkbox"
                  id={`${workKeysc} ${s} ${indexsc}`}
                  name={`${workKeysc}${s}${indexsc}`}
                  checked={formValues[workKeysc][indexsc][s] === "Yes"}
                  onChange={() => handleInputChangesc(workKeysc, indexsc, s)}
                />
                <label style={{ display: "none" }}>{s}</label>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Remark"
              value={formValues[workKeysc][indexsc].remark}
              onChange={(e) =>
                handleInputChangesc(
                  workKeysc,
                  indexsc,
                  "remark",
                  e.target.value
                )
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Action Taken"
              value={formValues[workKeysc][indexsc].action}
              onChange={(e) =>
                handleInputChangesc(
                  workKeysc,
                  indexsc,
                  "action",
                  e.target.value
                )
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Deficiency"
              value={formValues[workKeysc][indexsc].deficiency}
              onChange={(e) =>
                handleInputChangesc(
                  workKeysc,
                  indexsc,
                  "deficiency",
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

const FormSection1 = ({
  label,
  formValues,
  handleInputChangeavm,
  handleSelectAllChangeavm,
  workKeyavm,
  indexavm,
}) => {
  const isAllSelected = ["avm1", "avm2", "avm3", "avm4", "avm5", "avm6"].every(
    (avm) => formValues[workKeyavm][indexavm][avm] === "Yes"
  );
  return (
    <div className="row mb-3">
      <div className="col-md-7">
        <div className="d-flex align-items-start justify-content-between gap-2">
          <div className="d-flex align-items-center col-md-4 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "None", width: "fit-content" }}
            >
              {label} &nbsp;
            </label>
          </div>
          <div className="col-md-2">
            <input
              type="checkbox"
              id={`${workKeyavm} SelectAll${indexavm}`}
              checked={isAllSelected}
              onChange={(e) =>
                handleSelectAllChangeavm(workKeyavm, indexavm, e.target.checked)
              }
            />
            <label
              style={{ fontSize: "14px" }}
              htmlFor={`${workKeyavm} SelectAll${indexavm}`}
            >
              {isAllSelected ? "UnCheck All" : "Check All"}
            </label>
          </div>

          <div className="d-flex gap-4 justify-content-between">
            {["avm1", "avm2", "avm3", "avm4", "avm5", "avm6"].map((avm) => (
              <div keys={avm}>
                <input
                  type="checkbox"
                  id={`${workKeyavm} ${avm} ${indexavm}`}
                  name={`${workKeyavm}${avm}${indexavm}`}
                  checked={formValues[workKeyavm][indexavm][avm] === "Yes"}
                  onChange={() =>
                    handleInputChangeavm(workKeyavm, indexavm, avm)
                  }
                />
                <label style={{ display: "none" }}>{avm}</label>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Remark"
              value={formValues[workKeyavm][indexavm].remarkavm}
              onChange={(e) =>
                handleInputChangeavm(
                  workKeyavm,
                  indexavm,
                  "remarkavm",
                  e.target.value
                )
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Action Taken"
              value={formValues[workKeyavm][indexavm].actionavm}
              onChange={(e) =>
                handleInputChangeavm(
                  workKeyavm,
                  indexavm,
                  "actionavm",
                  e.target.value
                )
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Deficiency"
              value={formValues[workKeyavm][indexavm].deficiencyavm}
              onChange={(e) =>
                handleInputChangeavm(
                  workKeyavm,
                  indexavm,
                  "deficiencyavm",
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

const FormSection2 = ({
  label,
  formValues,
  handleInputChangeswt,
  handleSelectAllChangeswt,
  workKeyswt,
  indexswt,
}) => {
  const isAllSelected = ["swt1", "swt2", "swt3", "swt4", "swt5", "swt6"].every(
    (swt) => formValues[workKeyswt][indexswt][swt] === "Yes"
  );
  const handleCheckboxChange = (swt) => {
    handleInputChangeswt(
      workKeyswt,
      indexswt,
      swt,
      formValues[workKeyswt][indexswt][swt] === "Yes" ? "No" : "Yes"
    );
  };
  return (
    <div className="row mb-3">
      <div className="col-md-7">
        <div className="d-flex align-items-start justify-content-between gap-2">
          <div className="d-flex align-items-center col-md-4 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "None", width: "fit-content" }}
            >
              {label} &nbsp;
            </label>
          </div>
          <div className="col-md-2">
            <input
              type="checkbox"
              id={`${workKeyswt} SelectAll${indexswt}`}
              checked={isAllSelected}
              onChange={(e) =>
                handleSelectAllChangeswt(workKeyswt, indexswt, e.target.checked)
              }
            />
            <label
              style={{ fontSize: "14px" }}
              htmlFor={`${workKeyswt} SelectAll${indexswt}`}
            >
              {isAllSelected ? "UnCheck All" : "Check All"}
            </label>
          </div>
          <div className="d-flex gap-4 justify-content-between">
            {["swt1", "swt2", "swt3", "swt4", "swt5", "swt6"].map((swt) => (
              <div key={swt}>
                <input
                  type="checkbox"
                  id={`${workKeyswt} ${swt} ${indexswt}`}
                  name={`${workKeyswt}${swt}${indexswt}`}
                  checked={formValues[workKeyswt][indexswt][swt] === "Yes"}
                  onChange={() =>
                    handleInputChangeswt(workKeyswt, indexswt, swt)
                  }
                />
                <label style={{ display: "none" }}>{swt}</label>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Remark"
              value={formValues[workKeyswt][indexswt].remarkswt}
              onChange={(e) =>
                handleInputChangeswt(
                  workKeyswt,
                  indexswt,
                  "remarkswt",
                  e.target.value
                )
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Action Taken"
              value={formValues[workKeyswt][indexswt].actionswt}
              onChange={(e) =>
                handleInputChangeswt(
                  workKeyswt,
                  indexswt,
                  "actionswt",
                  e.target.value
                )
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Deficiency"
              value={formValues[workKeyswt][indexswt].deficiencyswt}
              onChange={(e) =>
                handleInputChangeswt(
                  workKeyswt,
                  indexswt,
                  "deficiencyswt",
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

export default Checklist;
