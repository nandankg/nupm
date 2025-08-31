import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addTeaCofee } from "../../reducer/store/TeaCofeesReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const TeaCofee = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const basicInitialValues = {
    S_No: "",
    item: "",
    quantity: "",
    datein: "",
    quantity: "",
    dateout: "",

    remark: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTeaCofee(formValues));
    const newSrno = sNo + 1;
    setSNo(newSrno);

    navigate("/TeaCofee/list");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Tea/Cofee
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
                <h3 className="form-heading">TEA/COFEE</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputitem" className="form-label">
                    ITEM
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputitem"
                    onChange={(e) =>
                      setFormValues({ ...formValues, item: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputquan" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputquan"
                    onChange={(e) =>
                      setFormValues({ ...formValues, quantity: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <label for="inputDateIn" className="form-label">
                    Date In
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDateIn"
                    onChange={(e) =>
                      setFormValues({ ...formValues, datein: e.target.value })
                    }
                  />
                </div>
                <div className="col-4">
                  <label for="inputQuant" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputQuant"
                    onChange={(e) =>
                      setFormValues({ ...formValues, quantity: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label for="inputDateout" className="form-label">
                    Date Out
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDateout"
                    onChange={(e) =>
                      setFormValues({ ...formValues, dateout: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
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

export default TeaCofee;
