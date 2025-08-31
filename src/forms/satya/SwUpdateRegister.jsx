import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addData,
  addSwupdate,
} from "../../reducer/satya/SwUpdateRegisterReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const SwUpdateRegister = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const dispatch = useDispatch();

  const swupdate = useSelector((state) => state.swregister);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (swupdate) {
      setSlug(swupdate.slug);
    }
  }, [swupdate]);

  const basicInitialValues = {
    S_No: sNo,
    version: "",
    date: "",
    startdate: "",
    enddate: "",
    refno: "",
    safno: "",
    remarks: "",
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
              Software Update
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
                <h3 className="form-heading">Software Update Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputversion" className="form-label">
                    Software Version
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputversion"
                    onChange={(e) =>
                      setFormValues({ ...formValues, version: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputdate" className="form-label">
                    SW Release Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputstartdate" className="form-label">
                    Deployment Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputstatedate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        startdate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-6">
                  <label for="inputenddate" className="form-label">
                    Deployment End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputenddate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, enddate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputrefno" className="form-label">
                    Release Note File Ref. No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputrefno"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, refno: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputsafno" className="form-label">
                    PTW/SAF No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputsafno"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, safno: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputremark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
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

export default SwUpdateRegister;
