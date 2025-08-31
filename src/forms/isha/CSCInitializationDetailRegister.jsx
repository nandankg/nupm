import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/isha/CSCInitializationDetailRegisterReducer";
import { formatDate, formatTime } from "../../data/formatDate";
const CSCInitializationDetailRegister = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const csc = useSelector((state) => state.CSCInitializationDetail);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (csc) {
      setSlug(csc.slug);
    }
  }, [csc]);

  const basicInitialValues = {
    sns: "",
    sne: "",
    bn: "",
    dn: "",
    date: formatDate(new Date().toDateString()),
    tq: "",
    nrc: "",
    nic: "",
    signature: "",
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
              CSC Initialization Detail Register
            </Link>
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              List
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  {" "}
                  CSC Initialization Detail Register
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Serial Number Card Start
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, sns: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    Serial Number Card End
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, sne: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputTimein" className="form-label">
                    Box No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTimein"
                    onChange={(e) =>
                      setFormValues({ ...formValues, bn: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputTimeout" className="form-label">
                    Device No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTimeout"
                    onChange={(e) =>
                      setFormValues({ ...formValues, dn: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputTopic" className="form-label">
                    Total Quantity.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    onChange={(e) =>
                      setFormValues({ ...formValues, tq: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputRemark" className="form-label">
                    No. of Rejected Card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, nrc: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputRemark" className="form-label">
                    No. of Initilised Card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, nic: e.target.value })
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

export default CSCInitializationDetailRegister;
