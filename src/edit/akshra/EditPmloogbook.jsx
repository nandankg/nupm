import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/akshra/PmsheetReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const EditPmloogbook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const PMsheetList = useSelector((state) => state.PmsheetMonthly);
  console.log(PMsheetList.data.data);
  const [items, setItems] = useState([]);
  const itmm = PMsheetList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(PMsheetList.data.data);
  }, []);
  useEffect(() => {
    setItems(PMsheetList.data.data);
  }, [PMsheetList]);
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
    id: fd.id,
    stn_name: fd.stn_name,
    date: fd.date,
    month: fd.month,
    activities: fd.activities1,
    activities2: fd.activities2,
    staff1_name: fd.staff1_name,
    staff1_desg: fd.staff1_desg,
    staff1_sign: fd.staff1_sign,
    staff2_name: fd.staff2_name,
    staff2_desg: fd.staff2_desg,
    staff2_sign: fd.staff2_sign,
    staff3_name: fd.staff3_name,
    staff3_desg: fd.staff3_desg,
    staff3_sign: fd.staff3_sign,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleInputChangetc = (workKeytc, indextc, keytc, value = null) => {
    const updatedWorkArray = formValues[workKeytc].map((item, idx) => {
      if (idx === indextc) {
        return {
          ...item,
          [keytc]: value !== null ? value : item[keytc] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeytc]: updatedWorkArray });
  };

  const handleSelectAllChangetc = (workKeytc, indextc, isChecked) => {
    const updatedWorkArray = formValues[workKeytc].map((item, idx) => {
      if (idx === indextc) {
        const updatedItem = { ...item };
        for (let keytc in updatedItem) {
          if (keytc.startsWith("T")) {
            updatedItem[keytc] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeytc]: updatedWorkArray });
  };
  const handleInputChangeup = (workKeyup, indexup, keyup, value = null) => {
    const updatedWorkArray = formValues[workKeyup].map((item, idup) => {
      if (idup === indexup) {
        return {
          ...item,
          [keyup]: value !== null ? value : item[keyup] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyup]: updatedWorkArray });
  };

  const handleSelectAllChangeup = (workKeyup, indexup, isChecked) => {
    const updatedWorkArray = formValues[workKeyup].map((item, idup) => {
      if (idup === indexup) {
        const updatedItem = { ...item };
        for (let keyup in updatedItem) {
          if (keyup.startsWith("EC")) {
            updatedItem[keyup] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeyup]: updatedWorkArray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(editData(formValues));
    navigate("/pmloog/list");
  };

  const labeltc = [
    "Check Fixing & Alignment of all modules of TOM",
    "Checking of all Cable connection and dressing",
    "Check Date and Time",
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
  ];
  const labelup = [
    "Checking of all Cable connection and dressing",
    "Tightening of all Electrical Connection in EC",
    "Checking of all indicators",
    "Cleaning of Electrical Cabinet",
    " Test ELCB Push Button Operation",
    "Testing of Isolater Mode Selector",
  ];

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PM LOGBOOK MAININLINE-10
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
                  AFC PREVENTIVE MAINTENANCE CHECKLIST (HALF YEARLY)
                  (ANNEXURE-B)
                </h3>
                <div className="heading-line"></div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="stnname" className="form-label">
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
                </div>
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
                  TOM
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
              {labeltc.map((label, indextc) => (
                <FormSection
                  keytc={indextc}
                  label={label}
                  formValues={formValues}
                  handleInputChangetc={handleInputChangetc}
                  handleSelectAllChangetc={handleSelectAllChangetc}
                  workKeytc="activities"
                  index={indextc}
                />
              ))}
              <div className="row mb-3">
                <label className="col-md-4" style={{ textAlign: "left" }}>
                  Description
                </label>
                <label className="col-md-9" style={{ textAlign: "center" }}>
                  EC
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
              {labelup.map((label, indexup) => (
                <FormSection1
                  keyup={indexup}
                  label={label}
                  formValues={formValues}
                  handleInputChangeup={handleInputChangeup}
                  handleSelectAllChangeup={handleSelectAllChangeup}
                  workKeyup="activities2"
                  indexup={indexup}
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
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
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
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
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
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
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
  handleInputChangetc,
  handleSelectAllChangetc,
  workKeytc,
  indextc,
}) => {
  const isAllSelected = ["T1", "T2", "T3", "T4", "T5", "T6", "T7"].every(
    (tc) => formValues[workKeytc][indextc][tc] === "Yes"
  );
  const handleCheckboxChange = (tc) => {
    handleInputChangetc(
      workKeytc,
      indextc,
      tc,
      formValues[workKeytc][indextc][tc] === "Yes" ? "No" : "Yes"
    );
  };

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
              <input
                type="checkbox"
                id={`${workKeytc}SelectAll${indextc}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChangetc(workKeytc, indextc, e.target.checked)
                }
              />
              <label
                style={{ fontSize: "14px" }}
                htmlFor={`${workKeytc}SelectAll${indextc}`}
              >
                {isAllSelected ? "UnCheck All" : "Check All"}
              </label>
            </label>
          </div>
          <div className="d-flex gap-3 justify-content-between">
            {["T1", "T2", "T3", "T4", "T5", "T6", "T7"].map((tc) => (
              <div key={tc}>
                <input
                  type="checkbox"
                  id={`${workKeytc}${tc}${indextc}`}
                  name={`${workKeytc}${tc}${indextc}`}
                  checked={formValues[workKeytc][indextc][tc] === "Yes"}
                  onChange={() => handleInputChangetc(workKeytc, indextc, tc)}
                />
                <label>{tc}</label>
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
              value={formValues[workKeytc][indextc].remark}
              onChange={(e) =>
                handleInputChangetc(
                  workKeytc,
                  indextc,
                  "remark",
                  e.target.value
                )
              }
            />
          </div>
          <div className="col-md-3">
            <label>Action Taken</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKeytc][indextc].action}
              onChange={(e) =>
                handleInputChangetc(
                  workKeytc,
                  indextc,
                  "action",
                  e.target.value
                )
              }
            />
          </div>
          <div className="col-md-5">
            <label>Why Deficiency Could Not Be Rectified</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKeytc][indextc].deficiency}
              onChange={(e) =>
                handleInputChangetc(
                  workKeytc,
                  indextc,
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
  handleInputChangeup,
  handleSelectAllChangeup,
  workKeyup,
  indexup,
}) => {
  const isAllSelected = [
    "EC1",
    "EC2",
    "EC3",
    "EC4",
    "EC5",
    "EC6",
    "EC7",
    "remarks",
    "actions",
    "deficiency1",
  ].every((ec) => formValues[workKeyup][indexup][ec] === "Yes");
  const handleCheckboxChange = (ec) => {
    handleInputChangeup(
      workKeyup,
      indexup,
      ec,
      formValues[workKeyup][indexup][ec] === "Yes" ? "No" : "Yes"
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
              <input
                type="checkbox"
                id={`${workKeyup} SelectAll${indexup}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChangeup(workKeyup, indexup, e.target.checked)
                }
              />
              <label
                style={{ fontSize: "14px" }}
                htmlFor={`${workKeyup} SelectAll${indexup}`}
              >
                {isAllSelected ? "UnCheck All" : "Check All"}
              </label>
            </label>
          </div>
          <div className="d-flex gap-4 justify-content-between">
            {["ISO", "UPS", "SCR", "TO1", "TO2", "EF1", "EF2"].map((ec) => (
              <div key={ec}>
                <input
                  type="checkbox"
                  id={`${workKeyup} ${ec} ${indexup}`}
                  name={`${workKeyup}${ec}${indexup}`}
                  checked={formValues[workKeyup][indexup][ec] === "Yes"}
                  onChange={() => handleInputChangeup(workKeyup, indexup, ec)}
                />
                <label style={{ display: "none" }}>{ec}</label>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Remark"
              value={formValues[workKeyup][indexup].remark}
              onChange={(e) =>
                handleInputChangeup(
                  workKeyup,
                  indexup,
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
              value={formValues[workKeyup][indexup].action}
              onChange={(e) =>
                handleInputChangeup(
                  workKeyup,
                  indexup,
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
              value={formValues[workKeyup][indexup].deficiency}
              onChange={(e) =>
                handleInputChangeup(
                  workKeyup,
                  indexup,
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

export default EditPmloogbook;
