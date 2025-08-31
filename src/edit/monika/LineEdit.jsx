import React from "react";
import { fetchData, editData } from "../../reducer/monika/LineDefectReducer";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

function LineEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const LinedefectList = useSelector((state) => state.Linedefect);
  console.log(LinedefectList.data.data);
  const [items, setItems] = useState([]);
  const itmm = LinedefectList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(LinedefectList.data.data);
  }, []);
  useEffect(() => {
    setItems(LinedefectList.data.data);
    setSlug(LinedefectList.slug);
  }, [LinedefectList]);
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
    date: formatDate(fd.date),
    reportedTime: fd.reportedTime,
    nameOfTrainOperator: fd.nameOfTrainOperator,
    empNo: fd.empNo,
    location: fd.location,
    trainNo: fd.trainNo,
    trainSet: fd.trainSet,
    failureDescription: fd.failureDescription,
    signOfTo: fd.signOfTo,
    remarks: fd.remarks,
    signOfCC: fd.signOfCC,
    Employ_id: fd.Employ_id,
    department: fd.department,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
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
            <Link underline="hover" color="inherit" to="/form/line-defect">
              Line Defect
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
                {/* <h3 className="form-heading">Line Defect Register</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputreportedTime" className="form-label">
                    reportedTime
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=" reportedTime"
                    value={formValues.reportedTime}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedTime: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputnameOfTrainOperator" className="form-label">
                    nameOfTrainOperator
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputnameOfTrainOperator"
                    value={formValues.nameOfTrainOperator}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        nameOfTrainOperator: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="input empNo" className="form-label">
                    empNo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input empNo"
                    value={formValues.empNo}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empNo: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3"></div>

              <div className="row mb-3">
                <div className="col-md-3">
                  <label for="input location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input location"
                    value={formValues.location}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        location: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-3">
                  <label for="inputtrainNo" className="form-label">
                    TrainNo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtrainNo"
                    value={formValues.trainNo}
                    onChange={(e) =>
                      setFormValues({ ...formValues, trainNo: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label for="inputtrainSet" className="form-label">
                    TrainSet
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtrainSet"
                    value={formValues.trainSet}
                    onChange={(e) =>
                      setFormValues({ ...formValues, trainSet: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label for="inputfailureDescription" className="form-label">
                    FailureDescription
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputfailureDescription"
                    value={formValues.failureDescription}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        failureDescription: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                {/* <div className="col-md-4">
                  <label for="inputremarks " className="form-label">
                    Signature Of To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    value={formValues.signOfTo}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signOfTo: e.target.value,
                      })
                    }
                    required
                  />
                </div> */}
                <div className="col-md-12">
                  <label for="inputremarks " className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    value={formValues.remarks}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remarks: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                {/* <div className="col-md-4">
                  <label for="inputremarks " className="form-label">
                    Signature Of SC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    value={formValues.signOfCC}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signOfCC: e.target.value,
                      })
                    }
                    required
                  />
                </div> */}
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
}

export default LineEdit;
