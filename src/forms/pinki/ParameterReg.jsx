import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData, addParameter } from "../../reducer/pinki/ParameterReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../data/formatDate";
import Header from "../../component/Header";

const ParameterReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parameter = useSelector((state) => state.parameter);
  const [slug, setSlug] = useState("");
  console.log(slug);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    if (parameter) {
      setSlug(parameter.slug);
    }
  }, [parameter]);

  const basicInitialValues = {
    date:"",
    pversion: "",
    validityfrom: "",
    pdescription: "",
    deviceupdate: "",
    actions: "",
    remark:"",

  };


  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  console.log(formValues)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
           
          >
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
                required
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
                name="remark"
                value={formValues.remark}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="f-btn btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParameterReg;
