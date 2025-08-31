import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/rajiv/CBTTrainingReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const CBTTrainingReg = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cbtdispatchdata = useSelector((state) => state.cbtTraining);
  const [slug, setSlug] = useState("");
  useEffect(() => {
    if (cbtdispatchdata) {
      setSlug(cbtdispatchdata.slug);
    }
  }, [cbtdispatchdata]);
  const basicInitialValues = {
    name: "",
    emp_id: "",
    date: "",
    time_in: "",
    time_out: "",
    topic: "",
    Batch:"",
    remark: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
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
              CBT Training
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    Employee Id.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputempid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, emp_id: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4">
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
                <div className="col-4">
                  <label for="inputTimein" className="form-label">
                    Time In
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTimein"
                    onChange={(e) =>
                      setFormValues({ ...formValues, time_in: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label for="inputTimeout" className="form-label">
                    Time Out
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTimeout"
                    onChange={(e) =>
                      setFormValues({ ...formValues, time_out: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputTopic" className="form-label">
                    Topic
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    onChange={(e) =>
                      setFormValues({ ...formValues, topic: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputTopic" className="form-label">
                    Batch
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Batch: e.target.value })
                    }
                  />
                </div>
                </div>
                <div className="row mb-3">
                <div className="col-md-12">
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

export default CBTTrainingReg;
