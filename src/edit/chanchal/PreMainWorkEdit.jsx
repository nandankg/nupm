import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/chanchal/PreMainWorkReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

const PreMainWorkEdit = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const PreMainWorkList = useSelector((state) => state.preMainWork);
  console.log(PreMainWorkList.data.data);
  const [items, setItems] = useState([]);
  const itmm = PreMainWorkList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(PreMainWorkList.data.data);
  }, []);
  useEffect(() => {
    setItems(PreMainWorkList.data.data);
  }, [PreMainWorkList]);
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
    S_No: sNo,
    date: formatDate(new Date().toDateString()),
    activities: [
      {
        CCServerRack: fd.CCCCServerRack,
        NetworkRack: fd.NetworkRack,
        CCHSServerNetworkRack: fd.CCHSServerNetworkRack,
        remark: fd.remark,
        action: fd.action,
        deficiency: fd.deficiency,
      },
    ],
    activities: fd.activities,
    staff1_name: fd.staff1_name,
    staff1_desg: fd.staff1_desg,
    staff1_employee: fd.staff1_employee,
    staff1_sign: fd.staff1_sign,
    staff2_name: fd.staff2_name,
    staff2_desg: fd.staff2_desg,
    staff2_employee: fd.staff2_employee,
    staff2_sign: fd.staff2_sign,
    staff3_name: fd.staff3_name,
    staff3_desg: fd.staff3_desg,
    staff3_employee: fd.staff3_employee,
    staff3_sign: fd.staff3_sign,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/list/pm-logbook-yearly1-sdc");
  };
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
        const updatedItem = {
          ...item,
          CCServerRack: isChecked ? "Yes" : "No",
          NetworkRack: isChecked ? "Yes" : "No",
          CCHSServerNetworkRack: isChecked ? "Yes" : "No",
        };
        for (let key in updatedItem) {
          if (key.startsWith("G")) {
            updatedItem[key] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  const labels = [
    "Checking of all Cable connection and dressing",
    "Checking of physical condition of all cable (specially for Rodent cut)",
    "Checking of any opening inside rack",
    "Checking of Fan status of Racks and Equipments",
    "Checking of power indication of Rack",
    "Checking of status of KMS",
    "Checking of LED indication of all the 20 drive of Main storage",
    "Checking of LED indication of all the 10 drive of Backup storage",
    "Checking of health Status of all the server inside Rack",
    "Checking of health Status of all the Networking equipment inside rack",
    "Checking of health Status of the Tape Library",
    "Checking and ensuring that no excessive heat accumulated inside rack",
    "Checking of LED indication of NTP servers",
    "Checking of health Status of all the Networking equipment inside CER rack",
    "Cleaning of Rack",
    "Exterior cleaning of equipments in the rack",
    "Internal cleaning of CC servers.",
    "Internal cleaning of CC Storage devices and Tape Library including tapes.",
    "Internal cleaning of CC networking equipments.",
    "Internal cleaning of Firewall",
    "Internal cleaning of L2 switch and LIU in CER",
    "Check Voltage between neutral & earth in the rack",
    "Checking of the storage (Fare On DB, AVW DB)",
    "Check Patch updates of servers.",
    "Check Firmware of firewall",
    "Check LAN status of all the equipments in the rack",
    "Checking of room temperature",
    "Check all the services of the server",
    "Check if Add Value Website is working",
  ];

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PREVENTIVE MAINTENACE WORKSHEET OF CENTRAL COMPUTER (YEARLY)
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
            <div className=" mb-3 form-heading-container">
              <h3 className="form-heading">
                Edit : PREVENTIVE MAINTENACE WORKSHEET OF CENTRAL COMPUTER
                (YEARLY)
              </h3>
              <div className="heading-line"></div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputDate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={formValues.date}
                  id="inputDate"
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  }
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
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
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff1_name}
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
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.staff1_employee}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_employee: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="col-md-3">
                                    <label for="inputempid" className="form-label">
                                        Sign
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control" value={formValues.staff1_sign}
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
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff2_name}
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
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.staff2_employee}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_employee: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="col-md-3">
                                    <label for="inputempid" className="form-label">
                                        Sign
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control" value={formValues.staff2_sign}
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
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff3_name}
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
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.staff3_employee}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_employee: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="col-md-3">
                                    <label for="inputempid" className="form-label">
                                        Sign
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control" value={formValues.staff3_sign}
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
  handleInputChange,
  handleSelectAllChange,
  workKey,
  index,
}) => {
  const isAllSelected = [
    "CCServerRack",
    "NetworkRack",
    "CCHSServerNetworkRack",
  ].every((g) => formValues[workKey][index][g] === "Yes");

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
            </label>
          </div>
          <div className="d-flex gap-3 justify-content-between">
            {["CCServerRack", "NetworkRack", "CCHSServerNetworkRack"].map(
              (g) => (
                <div key={g}>
                  <input
                    type="checkbox"
                    id={`${workKey}${g}${index}`}
                    name={`${workKey}${g}${index}`}
                    checked={formValues[workKey][index][g] === "Yes"}
                    onChange={() => handleInputChange(workKey, index, g)}
                  />
                  <label>{g}</label>
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

export default PreMainWorkEdit;
