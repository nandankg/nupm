import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { editData, fetchData } from "../../reducer/manshi/EtsDrillReducer";

const EditEtsDrill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const etsd = useSelector((state) => state.ets);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (etsd) {
      setSlug(etsd.slug);
    }
  }, [etsd]);
  console.log(etsd.data.data);
  const [items, setItems] = useState([]);
  const itmm = etsd.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(etsd.data.data);
  }, [dispatch]);

  useEffect(() => {
    setItems(etsd.data.data);
  }, [etsd]);

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
    date: fd.date,
    station: fd.station,
    pfno: fd.pf_no,
    operationtime: fd.operation_time,
    resettime: fd.reset_time,
    remark: fd.remarks,
    empid: fd.Employ_id,
    nameofsc: fd.name_of_sc,
    observation: fd.observation,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
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
                  <label htmlFor="inputStation" className="form-label">
                    Station
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStation"
                    name="station"
                    value={formValues.station}
                    onChange={handleChange}
                    aria-label="Station"
                  />
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
                <button type="submit" className="btn btn-primary px-3">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEtsDrill;
