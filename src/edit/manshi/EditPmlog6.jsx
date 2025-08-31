import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import {
  addData,
  editData,
  fetchData,
} from "../../reducer/manshi/Pmlog6Reducer";

const EditPmlog6 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();

  const Pmlog6h = useSelector((state) => state.Pmlog6);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Pmlog6h) {
      setSlug(Pmlog6h.slug);
    }
  }, [Pmlog6h]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (Pmlog6h.data && Pmlog6h.data.data) {
      setItems(Pmlog6h.data.data);
    }
  }, [Pmlog6h]);

  let filteredData;
  if (items.length > 0) {
    filteredData = items.filter((itm) => itm.id === id);
  }

  const fd = filteredData ? filteredData[0] : {};

  const basicInitialValues = {
    id: fd.id || "",

    date: fd.date,
    work1: fd.activities,
    staff1_name: fd.staff1_name,
    staff1_desg: fd.staff1_desg,
    staff1_employee: "",
    staff1_sign: fd.staff1_sign,
    staff2_name: fd.staff2_name,
    staff2_employee: "",
    staff2_desg: fd.staff2_desg,
    staff2_sign: fd.staff2_sign,
    staff3_name: fd.staff3_name,
    staff3_desg: fd.staff3_desg,
    staff3_employee: "",
    staff3_sign: fd.staff3_sign,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  useEffect(() => {
    if (fd) {
      setFormValues(basicInitialValues);
    }
  }, [fd]);

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
        for (let key in updatedItem) {
          if (key.startsWith("T") || key === "EFO") {
            updatedItem[key] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const labels = [
    "Fixing & Alignment of all modules of TOM",
    "Checking of all Cable connection and dressing",
    "Check Date and Time",
    "Check Lubrication of all locks with silicone oil",
    "Cleaning of all modules of TOM",
    "Cleaning of Opto sensor, Antenna, Token tray, Reject ",
    "CRW Test",
    "PRINTER Test",
    "TDM Test",
    "PDU Test",
    "Touch Screen Test",
    "Counter Communication System Test",
    "Keyboard, Mouse Test",
    "Check LAN Status",
    "Check Power strip",
  ];

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              PM Log
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
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">
                  PREVENTIVE MAINTENANCE WORKSHEET OF TOM (HALF YEARLY)
                </h3>
                <div className="heading-line"></div>
              </div>
              {labels.map((label, index) => (
                <FormSection
                  key={index}
                  label={label}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleSelectAllChange={handleSelectAllChange}
                  workKey="work1"
                  index={index}
                />
              ))}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    name="staff1_name"
                    value={formValues.staff1_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff1_desg"
                    value={formValues.staff1_desg}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    {" "}
                    Employee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff1_sign"
                    value={formValues.staff1_sign}
                    onChange={handleChange}
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
                    name="staff2_name"
                    value={formValues.staff2_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff2_desg"
                    value={formValues.staff2_desg}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Employee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff2_sign"
                    value={formValues.staff2_sign}
                    onChange={handleChange}
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
                    name="staff3_name"
                    value={formValues.staff3_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff3_desg"
                    value={formValues.staff3_desg}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Employee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff3_sign"
                    value={formValues.staff3_sign}
                    onChange={handleChange}
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
  if (!formValues[workKey] || !formValues[workKey][index]) {
    return null;
  }

  const isAllSelected = ["TOM1", "TOM2", "EFO"].every(
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
              <div className=" col-md-2">
              <input
                type="checkbox"
                id={`${workKey}SelectAll${index}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChange(workKey, index, e.target.checked)
                }
              />
              <label
                style={{ fontSize: "14px", marginLeft: "5px" }}
                htmlFor={`${workKey}SelectAll${index}`}
              >
                {isAllSelected ? "Uncheck All" : "Check All"}
              </label>
            
          </div>
          <div className="d-flex align-items-center col-md-8">
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id={`TOM1-${index}`}
                checked={formValues[workKey][index].TOM1 === "Yes"}
                onChange={() => handleInputChange(workKey, index, "TOM1")}
              />
              <label className="form-check-label" htmlFor={`TOM1-${index}`}>
                TPNR TOM
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id={`TOM2-${index}`}
                checked={formValues[workKey][index].TOM2 === "Yes"}
                onChange={() => handleInputChange(workKey, index, "TOM2")}
              />
              <label className="form-check-label" htmlFor={`TOM2-${index}`}>
                MWYA TOM
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id={`EFO-${index}`}
                checked={formValues[workKey][index].EFO === "Yes"}
                onChange={() => handleInputChange(workKey, index, "EFO")}
              />
              <label className="form-check-label" htmlFor={`EFO-${index}`}>
                TPNR EFO
              </label>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4">
            <label htmlFor={`remark-${index}`}>Remarks/Deficiencies</label>
            <input
              type="text"
              className="form-control"
              id={`remark-${index}`}
              value={formValues[workKey][index].remark}
              onChange={(e) =>
                handleInputChange(workKey, index, "remark", e.target.value)
              }
            />
          </div>
          <div className="col-md-3">
            <label htmlFor={`action-${index}`}>Action Taken</label>
            <input
              type="text"
              className="form-control"
              id={`action-${index}`}
              value={formValues[workKey][index].action}
              onChange={(e) =>
                handleInputChange(workKey, index, "action", e.target.value)
              }
            />
          </div>
          <div className="col-md-5">
            <label htmlFor={`deficiency-${index}`}>
              Why Deficiency Could Not Be Rectified
            </label>
            <input
              type="text"
              className="form-control"
              id={`deficiency-${index}`}
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

export default EditPmlog6;
