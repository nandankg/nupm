import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/monika/HandoverrecordReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const Afcgatedrill = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const handover = useSelector((state) => state.handover);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (handover) {
      setSlug(handover.slug);
    }
  }, [handover]);

  const basicInitialValues = {
    date: formatDate(date.toString()),
    time: "",
    changeTo: "",
    changeFrom: "",
    reason: "",
    signOfSC: "",
    remark: "",
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
              Handover Record
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
                {/* <h3 className="form-heading"> Handover Record Register</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label for="inputTime" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTime"
                    onChange={(e) =>
                      setFormValues({ ...formValues, time: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label for="inputchangedFrom" className="form-label">
                    Change From
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputchangedFrom"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        changeFrom: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label for="inputchangeTo" className="form-label">
                    Change To
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputchangeTo"
                    onChange={(e) =>
                      setFormValues({ ...formValues, changeTo: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-3">
                  <label for="inputreason" className="form-label">
                    Reason
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
                {/* <div className="col-6">
                  <label for="inputreason" className="form-label">
                    Signature Of SC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreason"
                    onChange={(e) =>
                      setFormValues({ ...formValues, signOfSC: e.target.value })
                    }
                    required
                  />
                </div> */}

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

export default Afcgatedrill;
