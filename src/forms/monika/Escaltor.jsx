import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

import { addData } from "../../reducer/monika/EscalatorReducer";
import { formatDate } from "../../data/formatDate";
const Escalator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const Escalatorregister = useSelector((state) => state.Escalator);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Escalatorregister) {
      setSlug(Escalatorregister.slug);
    }
  }, [Escalatorregister]);

  const basicInitialValues = {
    date: formatDate(date.toString()),
    station: "",
    esc_no: "",
    operation_offon: "",
    operation_emergency: "",
    from_time: "",
    to_time: "",
    timeTaken: "",
    remarks: "",
    Employ_id: "",
    name_of_sc: "",
    Station_name: "",
    department: "",
    TCEmploy_id: "",
    name_of_tc: "",
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
              Escalator Drill
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
                <div className="col-md-6">
                  <label htmlFor="inputDate" className="form-label">
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
                  <label htmlFor="inputESC.NO" className="form-label">
                    ESC. NO
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputESC.NO"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        esc_no: e.target.value,
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
                <div className="col-md-6">
                  <label htmlFor="inputOperationModeOff" className="form-label">
                    Operation Mode(Off)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputOperationModeOff"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        operation_offon: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="inputOperationModeEmergency"
                    className="form-label"
                  >
                    Operation Mode(Emergency)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputOperationModeEmergency"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        operation_emergency: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
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
                {/* <div className="col-3">
                  <label htmlFor="inputNameOfSC" className="form-label">
                    Name Of SC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNameOfSC"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        name_of_sc: e.target.value,
                      })
                    }
                  />
                </div> */}
                {/* <div className="col-3">
                  <label htmlFor="inputEmpId" className="form-label">
                    Emp.Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmpId"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Employ_id: e.target.value,
                      })
                    }
                  />
                </div> */}
                <div className="col-6">
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

export default Escalator;
