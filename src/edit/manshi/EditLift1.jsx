import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { editData, fetchData } from "../../reducer/manshi/LiftRescue1Reducer";

const EditLift1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const Lift1d = useSelector((state) => state.Lift1);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Lift1d) {
      setSlug(Lift1d.slug);
    }
  }, [Lift1d]);
  console.log(Lift1d.data.data);
  const [items, setItems] = useState([]);
  const itmm = Lift1d.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(Lift1d.data.data);
  }, [dispatch]);

  useEffect(() => {
    setItems(Lift1d.data.data);
  }, [Lift1d]);

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
    nameofsc: fd.name_of_sc,
    liftno: fd.lift_no,
    from: fd.from_time,
    to: fd.to_time,
    totaltimetaken: fd.timeTaken,
    empid: fd.Employ_id,
    sigofsc: fd.TCEmploy_id,
    remark: fd.remarks,
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
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              Lift Rescue Drill
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
                <h3 className="form-heading">Lift Rescue Drill</h3>
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
                  <label htmlFor="inputliftno" className="form-label">
                    Lift No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputliftno"
                    name="liftno"
                    value={formValues.liftno}
                    onChange={handleChange}
                    aria-label="lift Number"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputfrom" className="form-label">
                    Time(From)
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputfrom"
                    name="from"
                    value={formValues.from}
                    onChange={handleChange}
                    aria-label="From"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputto" className="form-label">
                    Time(To)
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputto"
                    name="to"
                    value={formValues.to}
                    onChange={handleChange}
                    aria-label="to"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputtotaltimetaken" className="form-label">
                    Total time taken
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtotaltimetaken"
                    name="totaltimetaken"
                    value={formValues.totaltimetaken}
                    onChange={handleChange}
                    aria-label="totaltimetaken"
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

export default EditLift1;
