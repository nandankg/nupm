import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addData,
  addLineDefect,
} from "../../reducer/chanchal/LineDefectReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../data/formatDate";

const LineDefectReg = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const LineDefectList = useSelector((state) => state.lineDefect);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (LineDefectList) {
      setSlug(LineDefectList.slug);
    }
  }, [LineDefectList]);

  const basicInitialValues = {
    S_No: sNo,
    date: formatDate(new Date().toString),
    reportTime: "",
    name: "",
    emp_no: "",
    location: "",
    train_no: "",
    train_set: "",
    failDescription: "",
    signOfTO: "",
    remark: "",
    signOfCC: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    console.log(formValues);
    // const newSrno = sNo + 1;
    // setSNo(newSrno);
    navigate(`/list/${slug}`);
    // navigate("/list/line-defect");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Line Defect Register
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
                <h3 className="form-heading">Line Defect Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputreportTime" className="form-label">
                    Reported Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputreportTime"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputname" className="form-label">
                    Name of Train Operator
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputname"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputemp_no" className="form-label">
                    Emp No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputemp_no"
                    onChange={(e) =>
                      setFormValues({ ...formValues, emp_no: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputlocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlocation"
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputtrain_no" className="form-label">
                    Train No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputtrain_no"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, train_no: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputtrain_set" className="form-label">
                    Train Set
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtrain_set"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        train_set: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputfailDescription" className="form-label">
                    Failure Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputfailDescription"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        failDescription: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                {/* <div className="col-md-6">
                  <label for="inputsignOfTO" className="form-label">
                    Sign of TO
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputsignOfTO"
                    onChange={(e) =>
                      setFormValues({ ...formValues, signOfTO: e.target.value })
                    }
                  />
                </div> */}
                <div className="col-md-6">
                  <label for="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputsignOfCC" className="form-label">
                    Name of CC/CDI
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputsignOfCC"
                    onChange={(e) =>
                      setFormValues({ ...formValues, signOfCC: e.target.value })
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

export default LineDefectReg;
