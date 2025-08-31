import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import {
  editData,
  fetchData,
} from "../../reducer/pinki/AxleCounterResetRegisterReducer";
import { formatDate } from "../../data/formatDate";
import AxelCounteMaintenanceRecord from "../../list/isha/AxleCounterMaintenanceList";
import AxelCounter from "../../forms/isha/AxleCounter";

const EditAxleCounter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || "";
  console.log(id);
  const dispatch = useDispatch();
  const axlecounter = useSelector((state) => state.axlecounter);
  // console.log(axlecounter.data.data);
  const [items, setItems] = useState([]);
  const itmm = axlecounter.data.data;
  // console.log(items);
  const [slug, setSlug] = useState("");
  // console.log(slug);

  useEffect(() => {
    dispatch(fetchData());
    setItems(axlecounter.data.data);
  }, []);

  useEffect(() => {
    if(axlecounter.data && axlecounter.data.data){
      setItems(axlecounter.data.data);
      setSlug(axlecounter.slug);
    }
   
  }, [axlecounter]);

  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData ? filteredData[0] : {};

  const basicInitialValues = {
    id: fd.id || "",
    date: formatDate(new Date().toString()),
    time: fd.time,
    ocounterno: fd.ocounterno,
    ccounterno: fd.ccounterno,
    axlecounterno: fd.axlecounterno,
    reason: fd.reason,
    signatureofsc: fd.Employ_id,
    remark: fd.remark,
    employee_id: fd.Employ_id,
    department: fd.department,
    unit: fd.unit,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    console.log(slug);
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Axle Counter
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading"> Axle Counter Reset Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputOCounter" className="form-label">
                  Opening Counter Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputOCounter"
                  name="ocounterno"
                  value={formValues.ocounterno}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputdate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputdate"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCCounter" className="form-label">
                  Closing Counter Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputCCounter"
                  name="ccounterno"
                  value={formValues.ccounterno}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputAxleCounter" className="form-label">
                  AXLE Counter Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAxleCounter"
                  name="axlecounterno"
                  value={formValues.axlecounterno}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputReason" className="form-label">
                  Reason
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputReason"
                  name="reason"
                  value={formValues.reason}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputRemark" className="form-label">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputRemark"
                  name="remark"
                  value={formValues.remark}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="f-btn btn ">
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

export default EditAxleCounter;
