import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { editData, fetchData } from "../../reducer/pinki/ParameterReducer";
import { formatDate } from "../../data/formatDate";

const EditParameter1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const parameter = useSelector((state) => state.parameter);
  console.log(parameter.data.data);
  const [items, setItems] = useState([]);
  const itmm = parameter.data.data;
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(parameter.data.data);
  }, [dispatch]);

  useEffect(() => {
    if (parameter) {
      setItems(parameter.data.data);
      setSlug(parameter.slug);
    }
  }, [parameter]);

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
    date: fd.date || "",
    pversion: fd.parameterversion || "",
    validityfrom: fd.validityform || "",
    pdescription: fd.parameterdescription || "",
    deviceupdate: fd.deviceupdated || "",
    remarks: fd.remarks || "",
    actions: "",
    employee_id: "21",
    department: "s&t",
    unit: "AFC",
  };


  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="parameter">
              Parameter
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
                <h3 className="form-heading"> Parameter Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="col-md-6">
              <label htmlFor="inputversion" className="form-label">
                Parameter Date
              </label>
              <input
                type="date"
                className="form-control"
                id="inputversion"
                name="date"
                required
                value={formValues.date}
                onChange={handleChange}
              />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputversion" className="form-label">
                  Parameter Version
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputversion"
                  name="pversion"
                  value={formValues.pversion}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputvalidity" className="form-label">
                  Validity From
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputvalidity"
                  name="validityfrom"
                  value={formValues.validityfrom}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputdis" className="form-label">
                  Parameter Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdis"
                  name="pdescription"
                  value={formValues.pdescription}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputupdate" className="form-label">
                  Devices Updated
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputupdate"
                  name="deviceupdate"
                  value={formValues.deviceupdate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputremark" className="form-label">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputremark"
                  name="remarks"
                value={formValues.remarks}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3">
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

export default EditParameter1;
