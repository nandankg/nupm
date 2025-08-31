import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addParameter } from "../../reducer/store/ParameterReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const Parameter = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const basicInitialValues = {
    S_No: "sNO",
    date: "",
    parameterversion: "",
    validityform: "",
    parameterdescription: "",
    deviceupdated: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addParameter(formValues));
    const newSrno = sNo + 1;
    setSNo(newSrno);

    navigate("/Parameter/list");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Parameter
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
                <h3 className="form-heading">Parameter</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputPV" className="form-label">
                    parameter Version
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputPV"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        parameterversion: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4">
                  <label for="inputVF" className="form-label">
                    Validity From
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputVF"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        validityform: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-4">
                  <label for="inputPD" className="form-label">
                    parameter description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPD"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        parameterdescription: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label for="inputDU" className="form-label">
                  Device Updated
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="inputDU"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      deviceupdated: e.target.value,
                    })
                  }
                />
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

export default Parameter;
