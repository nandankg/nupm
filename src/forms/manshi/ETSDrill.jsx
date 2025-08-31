import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addData, addEtsDrill } from "../../reducer/manshi/EtsDrillReducer";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import stations from "../../station.json";
const ETSDrill = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const etsd = useSelector((state) => state.ets);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (etsd) {
      setSlug(etsd.slug);
    }
  }, [etsd]);
  const [formValues, setFormValues] = useState({
    date: formatDate(new Date().toDateString()),
    station: "",
    nameofsc: "Current User",
    pfno: "",
    operationtime: "",
    resettime: "",
    observation: "",
    empid: "empid",
    Station_name: "",
    remark: "",
  });

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
      <div className="container ">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              ETS Register
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">ETS Drill</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
              
<div className="col-md-6">
                <label htmlFor="inputstation" className="form-label">
                  Station
                </label>
                <select
                  className="form-control"
                  id="inputstation"
                  name="station"
                  required
                  value={formValues.station}
                  onChange={handleChange}
                >
                  <option value="">Select Station</option>
                  {stations.map((station, index) => (
                    <option key={index} value={station["STATION Code"]}>
                      {station["Station Name"] || station["STATION Code"]}
                    </option>
                  ))}
                </select>
              </div>
                <div className="col-md-6">
                  <label htmlFor="inputpfno" className="form-label">
                    PF No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputpfno"
                    name="pfno"
                    value={formValues.pfno}
                    onChange={handleChange}
                    aria-label="PF Number"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputOperationTime" className="form-label">
                    Operation Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputOperationTime"
                    name="operationtime"
                    value={formValues.operationtime}
                    onChange={handleChange}
                    aria-label="Operation Time"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputResetTime" className="form-label">
                    Reset Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputResetTime"
                    name="resettime"
                    value={formValues.resettime}
                    onChange={handleChange}
                    aria-label="Reset Time"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputobservation" className="form-label">
                    Observation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputobservation"
                    name="observation"
                    value={formValues.observation}
                    onChange={handleChange}
                    aria-label="Observation"
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
                    aria-label="Remark"
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn-primary px-3">
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

export default ETSDrill;
