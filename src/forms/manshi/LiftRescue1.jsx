import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../reducer/manshi/LiftRescue1Reducer";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const LiftRescue1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Lift1d = useSelector((state) => state.Lift1);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Lift1d) {
      setSlug(Lift1d.slug);
    }
  }, [Lift1d]);
  const [formValues, setFormValues] = useState({
    date: formatDate(new Date().toDateString()),
    station: "",
    nameofsc: "Current User",
    liftno: "",
    from: "",
    to: "",
    totaltimetaken: "",
    empid: "empid",
    sigofsc: "sign",
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

export default LiftRescue1;
