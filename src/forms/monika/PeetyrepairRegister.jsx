import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import station from "../../data/station.json";
import {
  addData,
  addpeetyrepairregister,
} from "../../reducer/monika/peetyrepairReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const PeetyrepairRegister = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const peetyrepairregisterList = useSelector(
    (state) => state.peetyrepairregister
  );
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (peetyrepairregisterList) {
      setSlug(peetyrepairregisterList.slug);
    }
  }, [peetyrepairregisterList]);
  const basicInitialValues = {
    date: formatDate(date.toString()),
    location: "",
    natureDetailsOfComplaint1: "",
    natureDetailsOfComplaint2: "",
    natureDetailsOfComplaint3: "",
    pertainsTo: "",
    reportedTo: "",
    signOfSM: "",
    actiondate: "",
    attendedBy: "",
    detailsOfWorkDone: "",
    remarkOfSE: "",
    signOfSE: "",
    signOfAM: "",
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
              Peety Repair
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
                {/* <h3 className="form-heading"> Preety Repair Register</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label for="inputLocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Location"
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label
                    for="inputNature & Details Of Complaint1"
                    className="form-label"
                  >
                    Nature & Details Of Complaint1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNature & Details Of Complaint"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        natureDetailsOfComplaint1: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label
                    for="inputNature & Details Of Complaint2"
                    className="form-label"
                  >
                    Nature & Details Of Complaint2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNature & Details Of Complaint"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        natureDetailsOfComplaint2: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label
                    for="inputNature & Details Of Complaint3"
                    className="form-label"
                  >
                    Nature & Details Of Complaint3
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNature & Details Of Complaint"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        natureDetailsOfComplaint3: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <label for="inputPertainsTo" className="form-label">
                    Pertains To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPertainsTo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        pertainsTo: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label for="inputReported To" className="form-label">
                    Reported To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReported To"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedTo: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                {/* <div className="col-md-3">
                  <label for="inputReported To" className="form-label">
                    Signature Of SM
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReported To"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signOfSM: e.target.value,
                      })
                    }
                    required
                  />
                </div> */}

                <div className="col-md-4">
                  <label for="inputActionDate" className="form-label">
                    Action Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputAction Taken"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        actiondate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputActionAttendedBy " className="form-label">
                    Action AttendedBy
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputvActionAttendedBy"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        attendedBy: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputActionDetails" className="form-label">
                    Action Details
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputActionDetails"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detailsOfWorkDone: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label for="inputRemark Of SSE/SE" className="form-label">
                    Remark Of SSE/SE
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark Of SSE/SE"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remarkOfSE: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              {/* <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputRemark Of SSE/SE" className="form-label">
                    Signature Of Se
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark Of SSE/SE"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signOfSE: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputRemark Of SSE/SE" className="form-label">
                    {" "}
                    Signature Of AM{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark Of SSE/SE"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signOfAM: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div> */}
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

export default PeetyrepairRegister;
