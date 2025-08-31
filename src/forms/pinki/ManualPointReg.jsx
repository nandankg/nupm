import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData, addManual } from "../../reducer/pinki/ManualPointReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";
import { formatDate } from "../../data/formatDate";

const ManualPointReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const manualpoint = useSelector((state) => state.manualpoint);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (manualpoint) {
      setSlug(manualpoint.slug);
    }
  }, [manualpoint]);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const basicInitialValues = {
    date: formatDate(new Date().toDateString()),
    station: "",
    point_no: "",
    operation: "",
    reset: "",
    total_time_taken: "sign",
    name_of_sc: "",
    emp_id: "",
    sign_of_sc: "",
    remark: "",
    action: "",
    sign_of_sm: "",
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
                <label htmlFor="inputdatae" className="form-label">
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
                  min="1"
                  onChange={(e) =>
                    setFormValues({ ...formValues, point_no: e.target.value })
                  }
                />
              </div>
              {/* <div className="col-md-12"> */}
              {/* <label htmlFor="" className="form-heading">Time</label> */}
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

              {/* </div> */}
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
                  onChange={(e) =>
                    setFormValues({ ...formValues, name_of_sc: e.target.value })
                  }
                />
              </div>
              {/* <div className="col-md-6">
                                <label htmlFor="inputempid" className="form-label">Emp ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputempid"
                                    onChange={(e) =>
                                        setFormValues({ ...formValues, emp_id: e.target.value })
                                    }
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
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      TCEmploy_id: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setFormValues({ ...formValues, sign_of_sm: e.target.value })
                  }
                />
              </div>
              <div className="col-12  text-center">
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

export default ManualPointReg;
