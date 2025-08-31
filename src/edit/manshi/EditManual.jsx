import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { editData, fetchData } from "../../reducer/manshi/ManualPointReducer";

const EditManual = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const manual = useSelector((state) => state.manualdrill);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (manual) {
      setSlug(manual.slug);
    }
  }, [manual]);
  console.log(manual.data.data);
  const [items, setItems] = useState([]);
  const itmm = manual.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(manual.data.data);
  }, [dispatch]);

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
    date: formatDate(new Date().toDateString()),
    station: fd.station,
    pointno: fd.point_no,
    operationtime: fd.time_operation,
    resettime: fd.time_reset,
    totaltime: fd.totalTime,
    remark: fd.remarks,
    empid: fd.Employ_id,
    sigofsc: fd.TCEmploy_id,
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
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              Manual Point Operation
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">Manual Point Drill</h3>
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
                  <label htmlFor="inputPointNo" className="form-label">
                    Point No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPointNo"
                    name="pointno"
                    value={formValues.pointno}
                    onChange={handleChange}
                    aria-label="Point Number"
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
                <div className="col-md-6">
                  <label htmlFor="inputTotalTime" className="form-label">
                    Total Time
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTotalTime"
                    name="totaltime"
                    value={formValues.totaltime}
                    onChange={handleChange}
                    aria-label="Total Time"
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

export default EditManual;
