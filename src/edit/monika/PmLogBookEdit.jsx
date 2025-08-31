import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, editData } from "../../reducer/monika/PmLogBookReducer";
import { formatDate } from "../../data/formatDate";

function PmLogBookEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const PmLogBook5List = useSelector((state) => state.PmLogBook);
  console.log(PmLogBook5List.data.data);
  const [items, setItems] = useState([]);
  const [systems, setSystems] = useState([]);
  const itmm = PmLogBook5List.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(PmLogBook5List.data.data);
  }, []);
  useEffect(() => {
    setItems(PmLogBook5List.data.data);
    setSlug(PmLogBook5List.slug);
  }, [PmLogBook5List]);
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
    date: formatDate(fd.date),
    frequency: fd.frequency,
    activities: fd.activities,
    staff1_name: fd.staff1_name,
    staff1_desg: fd.staff1_desg,
    staff1_employee: fd.staff1_employee,
    staff1_sign: fd.staff1_sign,
    staff2_name: fd.staff2_name,
    staff2_employee: fd.staff2_employee,
    staff2_desg: fd.staff2_desg,
    staff2_sign: fd.staff2_sign,
    staff3_name: fd.staff3_name,
    staff3_desg: fd.staff3_desg,
    staff3_employee: fd.staff3_employee,
    staff3_sign: fd.staff3_sign,

    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleInputChange = (workKey, index, key, value = null) => {
    setFormValues((prevFormValues) => {
      const updatedWorkArray = [...prevFormValues[workKey]];
      const updatedItem = { ...updatedWorkArray[index] };
      updatedItem[key] =
        value !== null ? value : updatedItem[key] === "No" ? "Yes" : "No";
      updatedWorkArray[index] = updatedItem;

      return { ...prevFormValues, [workKey]: updatedWorkArray };
    });
  };

  const handleSelectAllChange = (workKey, index, isChecked) => {
    setFormValues((prevFormValues) => {
      const updatedWorkArray = [...prevFormValues[workKey]];
      const updatedItem = { ...updatedWorkArray[index] };

      for (let key in updatedItem) {
        if (key.startsWith("G")) {
          updatedItem[key] = isChecked ? "Yes" : "No";
        }
      }
      updatedWorkArray[index] = updatedItem;

      return { ...prevFormValues, [workKey]: updatedWorkArray };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const labels = [
    "Check Fixing & Alignment of all modules of Gates",
    "Checking of all Cable connection and dressing",
    "Checking Silicon sealing of Gate Cabinet",
    "Checking of any opening inside gate cabinet",
    "Checking of Power Supply and Battery",
    "Check whether leaked oil appears on the flap mechanism",
    "Check AG cabinet case for corrosion",
    "Check the covering glass of the validator",
    "Check power source fan filter",
    "Check Lubrication of all locks with silicone oil",
    "Check Date and Time",
    "Check correct position of flap mechanism",
    "Cleaning of all modules of AFC Gate and cabinet",
    "Clean opto sensors of flap mechanism",
    "Clean plastic covers of sensors and transmitters in corridor",
    "Check ping to station computer",
    "Check whether Token Capture Unit (TCU) clearing mechanism is Normally closed",
    "Check lock functionality",
    "Check battery backup",
    "Audio Test",
    "Concession Lamp test",
    "Sector Door Test",
    "End Display Test",
    "Sensor Test",
    "Token Slot Test",
    "Token Bowl Test",
    "Token Passage Test",
    "Front Door Test",
    " PMU Test",
    "Card Reader Test",
    "Return Cup LED Test",
    "Shutdown",
    "Reboot",
    "Operation Mode Test",
    "Special Mode test",
    "Token Container Test",
    "Gate Mode Test",
    "Check operation and special mode for its default position",
    "Software - SC",
    "Master Push Button",
  ];

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/form/pm-logbook-gate-half-yearly-sdc"
            >
              PM Log Book-5
            </Link>
            <Link underline="hover" color="inherit" to="/register">
              Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
          >
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
                <div className="col-md-3">
                  <label htmlFor="inputName" className="form-label">
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
                  <label htmlFor="inputDesg" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDesg"
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
                  <label htmlFor="inputEmployee" className="form-label">
                    Employee No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmployee"
                    value={formValues.staff1_employee}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_employee: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputSign" className="form-label">
                    Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSign"
                    value={formValues.staff1_sign}
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
                <div className="col-md-3">
                  <label htmlFor="inputName2" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName2"
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
                  <label htmlFor="inputDesg2" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDesg2"
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
                  <label htmlFor="inputEmployee2" className="form-label">
                    Employee No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmployee2"
                    value={formValues.staff2_employee}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_employee: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputSign2" className="form-label">
                    Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSign2"
                    value={formValues.staff2_sign}
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
                <div className="col-md-3">
                  <label htmlFor="inputName3" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName3"
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
                  <label htmlFor="inputDesg3" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDesg3"
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
                  <label htmlFor="inputEmployee3" className="form-label">
                    Employee No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmployee3"
                    value={formValues.staff3_employee}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_employee: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputSign3" className="form-label">
                    Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSign3"
                    value={formValues.staff3_sign}
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
}
const FormSection = ({
  label,
  formValues,
  handleInputChange,
  handleSelectAllChange,
  workKey,
  index,
}) => {
  const isAllSelected = ["G1", "G2", "G3", "G4", "G5"].every(
    (g) => formValues[workKey][index][g] === "Yes"
  );

  return (
    <div className="row mb-3">
      <div className="col-md-12">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center col-md-4 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{
                textAlign: "left",
                flex: "none",
                width: "fit-content",
              }}
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
                {isAllSelected ? "UnCheck All" : "Check All"}
              </label>
          
          </div>
          <div className="d-flex gap-3 justify-content-between">
            {["G1", "G2", "G3", "G4", "G5"].map((g) => (
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
            ))}
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

export default PmLogBookEdit;
