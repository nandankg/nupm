import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

import { addData } from "../../reducer/rajiv/OperationLiftRescueReducer";

const LiftRescueRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const LiftRescueList = useSelector((state) => state.LiftRescue);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (LiftRescueList) {
      setSlug(LiftRescueList.slug);
    }
  }, [LiftRescueList]);
  const basicInitialValues = {
    date: formatDate(date.toString()),
    station: "",
    lift_no: "",
    from_time: "",
    to_time: "",
    timeTaken: "",
    remarks: "",
    Employ_id: "1",
    name_of_sc: "up",
    Station_name: "up",
    department: "s&t",
    TCEmploy_id: "1",
    name_of_tc: "up",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Replace 'addDocument' with the actual action creator from your redux slice
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Lift Rescue Drill Register
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container"></div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputStation" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputtext"
                    required
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                    disabled
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputESC.NO" className="form-label">
                    Name Of SC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputESC.NO"
                    required
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        name_of_sc: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputLift No." className="form-label">
                    Lift No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLift No."
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        lift_no: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputTimeFrom" className="form-label">
                    Time (From)
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputinputTimeFrom"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        from_time: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputTimeTo" className="form-label">
                    Time (To)
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputinputTimeTo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        to_time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="inputTotalTimeTaken" className="form-label">
                    Total Time Taken
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTotalTimeTaken"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        timeTaken: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-3">
                  <label htmlFor="inputNameOfTC" className="form-label">
                    Name Of TC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNameOfTC"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        name_of_tc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="inputEmpId" className="form-label">
                    Emp.Id Of Tc
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmpId"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        TCEmploy_id: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="inputRemarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemarks"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remarks: e.target.value,
                      })
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

export default LiftRescueRegister;
