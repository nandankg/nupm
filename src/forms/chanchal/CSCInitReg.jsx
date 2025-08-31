import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addCSCInitReg,
  addData,
} from "../../reducer/chanchal/CSCInitRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const CSCInitRegReg = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const CSCInitRegList = useSelector((state) => state.cSCInitReg);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (CSCInitRegList) {
      setSlug(CSCInitRegList.slug);
    }
  }, [CSCInitRegList]);

  const basicInitialValues = {
    S_No: sNo,
    S_start: "",
    S_end: "",
    BoxNo: "",
    DeviceNo: "",
    Date: "",
    TotalQty: "",
    Rejected: "",
    Initilised: "",
    Signature: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    // const newSrno = sNo + 1;
    // setSNo(newSrno);
    navigate(`/list/${slug}`);
    // navigate("/list/card-initialization-tender-sdc");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              CSC Initialization Detail Register
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
                <h3 className="form-heading">
                  CSC Initialization Detail Register{" "}
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputS_start" className="form-label">
                    {" "}
                    Serial Number Card start{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputS_start"
                    onChange={(e) =>
                      setFormValues({ ...formValues, S_start: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6 ">
                  <label for="inputS_end" className="form-label">
                    Serial Number Card End
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputS_end"
                    onChange={(e) =>
                      setFormValues({ ...formValues, S_end: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputBoxNo" className="form-label">
                    Box No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputBoxNo"
                    onChange={(e) =>
                      setFormValues({ ...formValues, BoxNo: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputDeviceNo" className="form-label">
                    Device No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDeviceNo"
                    onChange={(e) =>
                      setFormValues({ ...formValues, DeviceNo: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="Date"
                    className="form-control"
                    id="inputDate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Date: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label for="inputTotalQty" className="form-label">
                    Total Qty.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTotalQty"
                    onChange={(e) =>
                      setFormValues({ ...formValues, TotalQty: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputRejected" className="form-label">
                    No. of Rejected Card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRejected"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Rejected: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label for="inputInitilised" className="form-label">
                    No. of Initilised Card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputInitilised"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Initilised: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* <div className="row mb-3">
                <div className="col-6">
                  <label for="inputSignature" className="form-label">
                    Signature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSignature"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Signature: e.target.value,
                      })
                    }
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

export default CSCInitRegReg;
