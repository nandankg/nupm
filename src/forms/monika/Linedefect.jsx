import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData, addlinedefect } from "../../reducer/monika/LineDefectReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const Linedefect = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const LinedefectList = useSelector((state) => state.Linedefect);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (LinedefectList) {
      setSlug(LinedefectList.slug);
    }
  }, [LinedefectList]);
  const basicInitialValues = {
    date: formatDate(date.toString()),
    reportedTime: "",
    nameOfTrainOperator: "",
    empNo: "",
    location: "",
    trainNo: "",
    trainSet: "",
    failureDescription: "",
    signOfTo: "",
    remarks: "",
    signOfCC: "",
    Employ_id: "",
    department: "",
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
                    ReportedTime
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id=" reportedTime"
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
                    NameOfTrainOperator
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputnameOfTrainOperator"
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
                    EmpNo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input empNo"
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
              <div className="row mb-3">
                <div className="col-md-3">
                  <label for="input location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input location"
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
};

export default Linedefect;
