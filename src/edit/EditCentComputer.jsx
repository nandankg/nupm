import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../data/formatDate";
import { editData, fetchData } from "../reducer/CentCompPreReducer";

const CentCompPreventive_Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const latsvdudrill = useSelector((state) => state.centcompstate || []);
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
    Date: formatDate(new Date().toString()),
    activities: fd.activities,
    staff1_name: fd.staff1_name,
    staff1_desg: fd.staff1_desg,
    staff1_id: fd.staff1_employee,
    staff1_sign: fd.staff1_sign,
    staff2_name: fd.staff2_name,
    staff2_desg: fd.staff2_desg,
    staff2_id: fd.staff2_employee,
    staff2_sign: fd.staff2_sign,
    staff3_name: fd.staff3_name,
    staff3_desg: fd.staff3_desg,
    staff3_id: fd.staff3_employee,
    staff3_sign: fd.staff3_sign,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  };
  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChangesc = (workKeysc, indexsc, keysc, value = null) => {
    const updatedWorkArray = formValues[workKeysc].map((item, idsc) => {
      if (idsc === indexsc) {
        return {
          ...item,
          [keysc]: value !== null ? value : item[keysc] === "NO" ? "yes" : "NO",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeysc]: updatedWorkArray });
  };

  const handleSelectAllChangesc = (workKeysc, indexsc, isChecked) => {
    const updatedWorkArray = formValues[workKeysc].map((item, idsc) => {
      if (idsc === indexsc) {
        const updatedItem = { ...item };
        for (let keysc in updatedItem) {
          if (keysc.startsWith("S")) {
            updatedItem[keysc] = isChecked ? "yes" : "NO";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeysc]: updatedWorkArray });
  };

  const label = [
    "Checking of all Cable connection and dressing",
    "Check internal fan status of Switches/racks",
    "External Cleaning of equipments      ",
    "External and Internal Cleaning of Switches/racks",
    "Check if Switches are working normal and all equipments are on LAN and sending data properly and check supervision services",
    "Check if Add Values Websites is Working",
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
                  Edit Preventive Maintenance worksheet of central computer
                  (Yearly)
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="col-md-3 text-center justify-content-center">
                <label htmlFor="inputdate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputdate"
                  value={formValues.Date}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      Date: e.target.value,
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
                <label
                  className="col-md-6"
                  style={{ textAlign: "left", minWidth: "350px" }}
                >
                  Description
                </label>
                <label className="col-md-4" style={{ textAlign: "left" }}>
                  Checkbox
                </label>
                <label className="col-md-3" style={{ textAlign: "left" }}>
                  Remarks
                </label>
                <label className="col-md-3" style={{ textAlign: "left" }}>
                  Action Taken
                </label>
                <label className="col-md-3" style={{ textAlign: "left" }}>
                  Deficiency
                </label>
              </div>
              {label.map((label, indexsc) => (
                <FormSection
                  keysc={indexsc}
                  label={label}
                  formValues={formValues}
                  handleInputChangesc={handleInputChangesc}
                  handleSelectAllChangesc={handleSelectAllChangesc}
                  workKeysc="activities"
                  indexsc={indexsc}
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
                    value={formValues.staff1_name}
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
                  <label htmlFor="id" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.staff1_id}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_id: e.target.value,
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
                    value={formValues.staff2_name}
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
                  <label htmlFor="id" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.staff2_id}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_id: e.target.value,
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
                    value={formValues.staff3_name}
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
                  <label htmlFor="id" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.staff3_id}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_id: e.target.value,
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
  handleInputChangesc,
  handleSelectAllChangesc,
  workKeysc,
  indexsc,
}) => {
  const isAllSelected = ["SC1", "SC2", "SC3", "SC4"].every(
    (SC) => formValues[workKeysc][indexsc][SC] === "yes"
  );
  const handleCheckboxChange = (SC) => {
    handleInputChangesc(
      workKeysc,
      indexsc,
      SC,
      formValues[workKeysc][indexsc][SC] === "yes" ? "NO" : "yes"
    );
  };
  return (
    <div className="row mb-3">
      <div className="col-md-7">
        <div className="d-flex align-items-start justify-content-between gap-3">
          <div className="d-flex align-items-center col-md-4 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "None", width: "fit-content" }}
            >
              {label} &nbsp;
              <input
                type="checkbox"
                style={{ width: "20px", height: "20px" }}
                id={`${workKeysc}SelectAll${indexsc}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChangesc(workKeysc, indexsc, e.target.checked)
                }
              />
              <label
                style={{ fontSize: "14px" }}
                htmlFor={`${workKeysc}SelectAll${indexsc}`}
              >
                {isAllSelected ? "UnCheck All" : "Check All"}
              </label>
            </label>
          </div>
          <div
            className="d-flex gap-4 justify-content-between"
            style={{ minWidth: "200px" }}
          >
            {["SC1", "SC2", "SC3", "SC4"].map((s) => (
              <div key={s}>
                <input
                  type="checkbox"
                  style={{ width: "15px", height: "15px" }}
                  id={`${workKeysc}${s}${indexsc}`}
                  name={`${workKeysc}${s}${indexsc}`}
                  checked={formValues[workKeysc][indexsc][s] === "yes"}
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

export default CentCompPreventive_Edit;
