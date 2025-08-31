import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/monika/PmLogBookMainlineReducer";
import { formatDate } from "../../data/formatDate";

const PmLogBookMainline = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PmLogBookMainlineList = useSelector((state) => state.PMbookMainline);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (PmLogBookMainlineList) {
      setSlug(PmLogBookMainlineList.slug);
    }
  }, [PmLogBookMainlineList]);
  const initialFormState = {
    stn_name: "----",
    date: formatDate(new Date().toString()),
    month: new Date().getMonth() + 1,
    activities: Array(27).fill({
      T1: "No",
      T2: "No",
      T3: "No",
      T4: "No",
      T5: "No",
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
    employee_id: "21",
    department: "s&t",
    unit: "AFC-Mainline",
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
        for (let key of ["T1", "T2", "T3", "T4", "T5"]) {
          updatedItem[key] = isChecked ? "Yes" : "No";
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
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
    "Cleaning of all modules of TVM ",
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
              PM LogBook Mainline-4
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
                <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    values={formValues.staff1_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    values={formValues.staff1_desg}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_desg: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Sign
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    values={formValues.staff1_sign}
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
                  <label htmlFor="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    values={formValues.staff2_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    values={formValues.staff2_desg}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_desg: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Sign
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    values={formValues.staff2_sign}
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
                  <label htmlFor="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    values={formValues.staff3_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    values={formValues.staff3_desg}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_desg: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Sign
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    values={formValues.staff3_sign}
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
  const isAllSelected = ["T1", "T2", "T3", "T4", "T5"].every(
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
          <div className="d-flex gap-3 justify-content-between">
            {["T1", "T2", "T3", "T4", "T5"].map((g) => (
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

export default PmLogBookMainline;
