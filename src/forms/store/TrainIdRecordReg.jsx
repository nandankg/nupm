import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addTrainId } from "../../reducer/store/TrainIdRecordRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const TrainIdRecordReg = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const basicInitialValues = {
    S_No: "",
    date: "",
    paid: "",
    newid: "",
    purandact: "",
    nameoftc: "",

    nameofapprovingacc: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTrainId(formValues));
    const newSrno = sNo + 1;
    setSNo(newSrno);

    navigate("/TrainId/list");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Train Id Record Register
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
                <h3 className="form-heading">Train Id Record Register</h3>
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
                  <label for="inputPAID" className="form-label">
                    Previous Associated Id
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputPAID"
                    onChange={(e) =>
                      setFormValues({ ...formValues, paid: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <label for="inputNewId" className="form-label">
                    New Id Associated Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNewId"
                    onChange={(e) =>
                      setFormValues({ ...formValues, newid: e.target.value })
                    }
                  />
                </div>
                <div className="col-4">
                  <label for="inputPurpose" className="form-label">
                    Purpose And Action
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPurpose"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        purandact: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label for="inputNameOfTc" className="form-label">
                    Name of Tc
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNameOfTc"
                    onChange={(e) =>
                      setFormValues({ ...formValues, nameoftc: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputnameofacc" className="form-label">
                    Name of Approving ACC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputnameofacc"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        nameofapprovingacc: e.target.value,
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

export default TrainIdRecordReg;
