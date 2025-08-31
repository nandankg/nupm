import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/isha/ContractualSpareTestingReducer";

const ContractualSpareTesting = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const test = useSelector((state) => state.ContractualSpare);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (test) {
      setSlug(test.slug);
    }
  }, [test]);
  const basicInitialValues = {
    sn: sNo,
    item_description: "",
    testing_detail: "",
    item_serialName: "",
    testingLocation: "",
    testedFrom: "",
    testedTo: "",
    dateFrom: "",
    dateTo: "",
    FinalStatus: "",
    remark: "",
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
              Contractual Spare Testing-signals
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "90%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                {/* <h3 className="form-heading">
                  Contractual Spare Testing Register-signals
                </h3>
                <span className="line-box" style={{ width: "600px" }}></span> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label for="inputName" className="form-label">
                    Item Description
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        item_description: e.target.value,
                      })
                    }
                  />
                </div>

                
                <div className="col-md-3">
                  <label for="inputempid" className="form-label">
                    Item Serial No.
                  </label>
                  <input
                    type="Text"
                    required
                    className="form-control"
                    id="inputempid"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        item_serialName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label for="inputTopic" className="form-label">
                    Testing Location/Gear ID
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="inputTopic"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        testingLocation: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label for="inputName" className="form-label">
                    Testing Details
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        testing_detail: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3 d-flex ">
               
                <div className="time col-md-6" style={{ textAlign: "center" }}>
                  <label for="inputhate" className="form-label">
                    TESTED DATE and TIME
                  </label>
                  <div className="d-flex gap-2 ">
                    <div className="col-md-5">
                      <label for="inputTimein" className="form-label">
                        From
                      </label>
                      <input
                        type="datetime-local"
                        required
                        className="form-control"
                        id="inputTimein"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            dateFrom: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-5">
                      <label for="inputTimeout" className="form-label">
                        TO
                      </label>
                      <input
                        type="datetime-local"
                        required
                        className="form-control"
                        id="inputTimeout"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            dateTo: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              
              <div className="time col-md-6" style={{ textAlign: "center" }}>
                  <label for="inputhate" className="form-label">
                    TESTED TIME
                  </label>
                  <div className="d-flex gap-2">
                    <div className="col-md-5">
                      <label for="inputTimein" className="form-label">
                        From
                      </label>
                      <input
                        type="time"
                        required
                        className="form-control"
                        id="inputTimein"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            testedFrom: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-5">
                      <label for="inputTimeout" className="form-label">
                        TO
                      </label>
                      <input
                        type="time"
                        required
                        className="form-control"
                        id="inputTimeout"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            testedTo: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                </div>
              <div className="row mb-3">
                <div className="col-md-3" style={{ textAlign: "left" }}>
                  <label for="inputRemark" className="form-label">
                    Final Status
                  </label>
                  <select
                    className="form-control"
                    required
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        FinalStatus: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="OK">OK</option>
                    <option value="Not-Ok">Not-Ok</option>
                  </select>
                </div>{" "}
                <div className="col-md-9" style={{ textAlign: "left" }}>
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

export default ContractualSpareTesting;
