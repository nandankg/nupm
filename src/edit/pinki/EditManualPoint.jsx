import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editData, fetchData } from "../../reducer/pinki/ManualPointReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

const EditManualPoint = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const manualpoint = useSelector((state) => state.manualpoint);
  console.log(manualpoint.data.data);
  const [items, setItems] = useState([]);
  const itmm = manualpoint.data.data;
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(manualpoint.data.data);
  }, [dispatch]);

  useEffect(() => {
    if (manualpoint.data && manualpoint.data.data) {
      setItems(manualpoint.data.data);
      setSlug(manualpoint.slug);
      // setFilteredItems(materialdistribution.data.data);
    }
  }, [manualpoint]);

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
    station: fd.station,
    point_no: fd.point_no,
    time_operation: fd.operation,
    time_reset: fd.reset,
    totalTime: fd.total_time_taken,
    remarks: fd.remark,
    Employ_id: fd.emp_id,
    sign_of_sc_of_sc: fd.TCEmploy_id,
    name_of_sc: fd.name_of_sc,
    sign_of_sm: fd.sign_of_sm,
    date: formatDate(new Date().toDateString()),
  };

  const [formValues, setformValues] = useState(basicInitialValues);

  useEffect(() => {
    setformValues(basicInitialValues);
  }, [fd]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Manual Point Operational Drill
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
              <h3 className="form-heading">
                {" "}
                Manual Point Operational Drill Register
              </h3>
              <div className="heading-line"></div>
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
              <label htmlFor="inputstation" className="form-label">
                Station
              </label>
              <input
                type="text"
                className="form-control"
                id="inputstation"
                name="station"
                value={formValues.station}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputno" className="form-label">
                Point No.
              </label>
              <input
                type="number"
                className="form-control"
                id="inputno"
                name="point_no"
                value={formValues.point_no}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputop" className="form-label">
                Operation
              </label>
              <input
                type="time"
                className="form-control"
                id="inputop"
                name="operation"
                value={formValues.operation}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputreset" className="form-label">
                Reset
              </label>
              <input
                type="time"
                className="form-control"
                id="inputreset"
                name="reset"
                value={formValues.reset}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputtime" className="form-label">
                Total Time Taken
              </label>
              <input
                type="time"
                className="form-control"
                id="inputtime"
                name="total_time_taken"
                value={formValues.total_time_taken}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputname" className="form-label">
                Name of SC
              </label>
              <input
                type="text"
                className="form-control"
                id="inputname"
                name="name_of_sc"
                value={formValues.name_of_sc}
                onChange={handleChange}
              />
            </div>
            {/* <div className="col-md-6">
              <label htmlFor="inputempid" className="form-label">Emp ID</label>
              <input
                type="text"
                className="form-control"
                id="inputempid"
                name="emp_id"
                value={formValues.emp_id}
                onChange={handleChange}
              />
            </div> */}
            <div className="col-md-6">
              <label htmlFor="inputsign" className="form-label">
                Signature of SC
              </label>
              <input
                type="text"
                className="form-control"
                id="inputsign"
                name="sign_of_sc"
                value={formValues.sign_of_sc}
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
            <div className="col-md-12">
              <label htmlFor="inputsignsm" className="form-label">
                Signature of SM
              </label>
              <input
                type="text"
                className="form-control"
                id="inputsignsm"
                name="sign_of_sm"
                value={formValues.sign_of_sm}
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

export default EditManualPoint;
