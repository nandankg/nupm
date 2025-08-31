import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/chanchal/LineDefectReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

const LineDefectEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const LineDefectList = useSelector((state) => state.lineDefect);
  console.log(LineDefectList.data.data);
  const [items, setItems] = useState([]);
  const itmm = LineDefectList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(LineDefectList.data.data);
  }, []);
  useEffect(() => {
    setItems(LineDefectList.data.data);
  }, [LineDefectList]);
  let dt = [];
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
    reportTime: fd.reportedTime,
    name: fd.nameOfTrainOperator,
    emp_no: fd.empNo,
    location: fd.location,
    train_no: fd.trainNo,
    train_set: fd.trainSet,
    failDescription: fd.failureDescription,
    signOfTO: fd.signOfTo,
    remark: fd.remarks,
    signOfCC: fd.signOfCC,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/list/line-defect");
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
                <h3 className="form-heading">Edit : Line Defect Register</h3>
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
                    value={formValues.date}
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
                    value={formValues.reportTime}
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
                    value={formValues.name}
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
                    value={formValues.emp_no}
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
                    value={formValues.location}
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
                    value={formValues.train_no}
                    id="inputtrain_no"
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
                    value={formValues.train_set}
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
                    value={formValues.failDescription}
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
                    value={formValues.signOfTO}
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
                    value={formValues.remark}
                    id="inputRemark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
                    }
                  />
                </div>
                {/* </div>
              <div className="row mb-3"> */}
                <div className="col-md-6">
                  <label for="inputsignOfCC" className="form-label">
                    Name of CC/CDI
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.signOfCC}
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

export default LineDefectEdit;
