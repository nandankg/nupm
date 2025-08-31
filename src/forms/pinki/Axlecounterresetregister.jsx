import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addAxlecounter,
  addData,
} from "../../reducer/pinki/AxleCounterResetRegisterReducer";
import { hover } from "@testing-library/user-event/dist/hover";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const Axlecounterresetregister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const axlecounter = useSelector((state) => state.axlecounter);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (axlecounter) {
      setSlug(axlecounter.slug);
    }
  }, [axlecounter]);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const basicInitialValues = {
    date:"",
    time: time,
    ocounterno: "",
    ccounterno: "",
    axlecounterno: "",
    reason: "",
    signatureofsc: "sign",
    remark: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
                <h3 className="form-heading">Axle Counter Reset Register</h3>
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
                  min="1"
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
                  min="1"
                  required
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

export default Axlecounterresetregister;
