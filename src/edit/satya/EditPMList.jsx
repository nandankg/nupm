import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { editData, fetchData } from "../../reducer/satya/PMLogBookTVMReducer";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import stationData from "../../station.json";

const EditPMList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState(new Date());
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const pmlogbook = useSelector((state) => state.book || []);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(pmlogbook.data.data);
  const [items, setItems] = useState([]);
  const itmm = pmlogbook.data.data;
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(pmlogbook.data.data);
  }, []);

  useEffect(() => {
    if (pmlogbook) {
      setSlug(pmlogbook.slug);
    }
  }, [pmlogbook]);
  let dt = [];
  let filteredData;
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
    station: fd.station,
    date: fd.date,
    activities: fd.activities,
    staff1_name: fd.staff1_name,
    staff1_desg: fd.staff1_desg,
    staff1_empno: fd.staff1_employee,
    staff1_sign: fd.staff1_sign,
    staff2_name: fd.staff2_name,
    staff2_desg: fd.staff2_desg,
    staff2_empno: fd.staff2_employee,
    staff2_sign: fd.staff2_sign,
    staff3_name: fd.staff3_name,
    staff3_desg: fd.staff3_desg,
    staff3_empno: fd.staff3_employee,
    staff3_sign: fd.staff3_sign,
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

  const handleSelectAllChange = (workKey, index, isChecked) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item };
        for (let key in updatedItem) {
          if (key.startsWith("TPNR")) {
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
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const labels = [
    "Fixing & Alignment of all modules of TVM/RCTM ",
    "Checking of all Cable connection and dressing",
    "Checking Silicon sealing of TVM/RCTM Cabinet",
    "Checking of any opening inside TVM/RCTM cabinet",
    "Checking of Power Supply and Battery",
    "Check Lubrication of all locks with silicone oil",
    "Check Station ID",
    "Check Device ID",
    "Check Date and Time",
    "Cleaning of all modules of TVM/RCTM",
    "Cleaning of lexan covering board of display",
    "Cleaning of Coin hopper opto sensor of TVM",
    "Cleaning of Cooling fans",
    "Checking and Cleaning of Cooling fan filter",
    "Cleaning of BNR/BNA",
    "Cleaning of Printer and printer heating head",
    "Cleaning of Bank card reader",
    "Cleaning of Display",
    "Cleaning of Token hopper of TVM",
    "Check LAN Status",
    "BNA/BNR Module Test",
    "Coin Dispenser Test",
    "Token Dispenser Test ",
    "Card Reader Test",
    "LCD Test",
    "PID Test",
    "Printer Test /Test Print",
    "Audio Test",
  ];

  const { toPDF, targetRef } = usePDF({
    filename: "Preventive_Maintenance_Worksheet_Tvm_Form.pdf",
  });

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Preventive Maintenance Worksheet
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
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  EDIT: PREVENTIVE MAINTENACE WORKSHEET OF TVM, RCTM & AVM (
                  HALF YEARLY)
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row ">
              <div className="col-md-6">
                  <label for="inputshift" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
              <div className="col-md-6">
              <label for="inputshift" className="form-label">
              Station
                  </label>
                <select
                  placeholder="STATION"
                  className="form-control"
                  id="inputstnname"
                  value={formValues.station}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      station: e.target.value,
                    })
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
              <div className="row mb-3">
                <label className="col-md-4" style={{ textAlign: "left" }}>
                  Description
                </label>
                <label className="col-md-2" style={{ textAlign: "left" }}>
                  TVM &nbsp;RCTM&nbsp;AVM
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
                <div className="col-md-3">
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
                <div className="col-md-3">
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
                <div className="col-md-3">
                  <label for="inputempno" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputempno"
                     min="1"
                    value={formValues.staff1_empno}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_empno: e.target.value,
                      })
                    }
                  />
                </div>
                
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
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
                <div className="col-md-3">
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
                <div className="col-md-3">
                  <label for="inputempno" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputempno"
                     min="1"
                    value={formValues.staff2_empno}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_empno: e.target.value,
                      })
                    }
                  />
                </div>
               </div>
              <div className="row mb-3">
                <div className="col-md-3">
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
                <div className="col-md-3">
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
                <div className="col-md-3">
                  <label for="inputempno" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputempno"
                    min="1"
                    value={formValues.staff3_empno}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_empno: e.target.value,
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
  const isAllSelected = ["TPNR1", "TPNR2", "TPNR3"].every(
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
             </label>
             </div>
             <div className="col-md-2">
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
            
          </div>

          <div className="d-flex gap-3 justify-content-between">
            {["TPNR1", "TPNR2", "TPNR3"].map((g) => (
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
export default EditPMList;
