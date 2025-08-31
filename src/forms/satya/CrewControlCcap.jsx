import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCrewcontrol,
  addData,
} from "../../reducer/satya/CrewControlCcapReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../data/formatDate";

const CrewControlCcap = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const crewcontrol = useSelector((state) => state.crewccap);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (crewcontrol) {
      setSlug(crewcontrol.slug);
    }
  }, [crewcontrol]);

  const basicInitialValues = {
    date: formatDate(new Date().toDateString()),
    department: "",
    purposeofreq: "",
    time: formatTime(new Date().toString()),
    toprovided: "",
    reason: "",
    nameofcc: "",
    signofcc: "",
    remark: "",
    empid: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate("/list/unplanned-to-record");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              CREW CONTROL CCAP
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
                  UNPLANNED TRAIN OPERATOR DEMAND RECORD
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputDepartment" className="form-label">
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDepartment"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        department: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputpurpose" className="form-label">
                    Purpose of Request
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputpurpose"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        purposeofreq: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputtoprovided" className="form-label">
                    Whether TO was provided or not
                  </label>
                  <div>
                    <input
                      className="form-check-input ms-2"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Yes"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          toprovided: e.target.value,
                        })
                      }
                    />
                    Yes
                    <input
                      className="form-check-input ms-2"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="No"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          toprovided: e.target.value,
                        })
                      }
                    />
                    No
                  </div>
                </div>

                <div className="col-md-6">
                  <label for="inputreason" className="form-label">
                    Reason, if TO not provided
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreason"
                    onChange={(e) =>
                      setFormValues({ ...formValues, reason: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputnameofcc" className="form-label">
                    Name of CC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputnameofcc"
                    onChange={(e) =>
                      setFormValues({ ...formValues, nameofcc: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputremark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary mt-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
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

export default CrewControlCcap;
