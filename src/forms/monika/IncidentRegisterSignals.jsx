import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/monika/IncidentRegisterSignalsReducer";
import { formatDate, formatTime } from "../../data/formatDate";

const IncidentRegisterSignals = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);

  const dispatch = useDispatch();
  const incidentregister = useSelector((state) => state.incidentsignals);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (incidentregister) {
      setSlug(incidentregister.slug);
    }
  }, [incidentregister]);
  const basicInitialValues = {
    S_No: sNo,
    date1: new Date().toString,
    time: "",
    details: "",
    reportedto: "",
    empname:"",
    desig:"",
    sign: "sign",
    remarks: "",
    empid: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Incident Signals
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
                {/* <h3 className="form-heading">Incident Register Signals</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date1: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputtime" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputtime"
                    onChange={(e) =>
                      setFormValues({ ...formValues, time: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputdetails" className="form-label">
                    Details Of Incident
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdetails"
                    onChange={(e) =>
                      setFormValues({ ...formValues, details: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Reported by
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empname: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        desig: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Emp ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empid: e.target.value,
                      })
                    }
                  />
                </div>
</div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputreported to" className="form-label">
                    Reported To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedto: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputremarks" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
                  />
                </div>
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

export default IncidentRegisterSignals;
