import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addEquFaiReg, addData } from "../../reducer/chanchal/EquFaiRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../data/formatDate";

const EquFaiRegReg = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const EquFaiRegList = useSelector((state) => state.equFaiReg);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (EquFaiRegList) {
      setSlug(EquFaiRegList.slug);
    }
  }, [EquFaiRegList]);

  const basicInitialValues = {
    S_No: sNo,
    date: formatDate(new Date().toString),
    time: "",
    location: "",
    type: "",
    no: "",
    natdetfai: "",
    reportedto: "",
    reportedtime: "",
    signSM: "",
    rectifiedtime: "",
    redate: "",
    remarkConstaff: "",
    signConStaff: "",
    signatureSM: "",
    remark: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    // const newSrno = sNo + 1;
    // setSNo(newSrno);
    navigate(`/list/${slug}`);
    // navigate("/list/equipment_failure_register");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Equipment Failure Station Register
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
                <h3 className="form-heading">
                  Equipment Failure Station Register{" "}
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-6 ">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>

                <div className="col-6 ">
                  <label for="inputtime" className="form-label">
                    {" "}
                    Time{" "}
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

                <div className="col-md-6 ">
                  <label for="inputlocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputlocation"
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputnatdetfai" className="form-label">
                    Nature & Details of failure
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputnatdetfai"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        natdetfai: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3 border">
                <h5>Equipment </h5>
                <label for="inputtype" className="form-label">
                  Type
                </label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputtype"
                  onChange={(e) =>
                    setFormValues({ ...formValues, type: e.target.value })
                  }
                />
                <label for="inputno" className="form-label">
                  No.
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputno"
                  min="1"
                  onChange={(e) =>
                    setFormValues({ ...formValues, no: e.target.value })
                  }
                />

                <h5> Action Taken</h5>
                <label for="inputrectifiedtime" className="form-label">
                  Rectified Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="inputrectifiedtime"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      rectifiedtime: e.target.value,
                    })
                  }
                />
                <label for="inputredate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputredate"
                  onChange={(e) =>
                    setFormValues({ ...formValues, redate: e.target.value })
                  }
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputreportedto" className="form-label">
                    Reported To
                  </label>
                  <input
                    type="Text"
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
                <div className="col-4">
                  <label for="inputreportedtime" className="form-label">
                    Reported Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputreportedtime"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedtime: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputsignSM" className="form-label">
                    {" "}
                    Name of SM/SC{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputsignSM"
                    onChange={(e) =>
                      setFormValues({ ...formValues, signSM: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputremarkConstaff" className="form-label">
                    Remark of Concern Staff
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarkConstaff"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remarkConstaff: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6 ">
                  <label for="inputsignConStaff" className="form-label">
                    Name of Concern Staff
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputsignConStaff"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signConStaff: e.target.value,
                      })
                    }
                  />
                </div>

                {/* <div className="col-md-6">
                  <label for="inputsignatureSM" className="form-label">
                    signature SM/SC
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputsignatureSM"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signatureSM: e.target.value,
                      })
                    }
                  />
                </div> */}
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
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

export default EquFaiRegReg;
