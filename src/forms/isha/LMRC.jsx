import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData, addLats } from "../../reducer/isha/LATSVDUReducer";
import { formatDate, formatTime } from "../../data/formatDate";
const LatsvRegister = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const LatsRegister = useSelector((state) => state.Latsvdu);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (LatsRegister) {
      setSlug(LatsRegister.slug);
    }
  }, [LatsRegister]);
  const basicInitialValues = {
    S_No: sNo,
    date: formatDate(new Date().toDateString()),
    station: "",
    name: "",
    empid: "",
    from: "",
    to: "",
    result: "",
    sign: "sign",
    remarks: "",
    tcid: "",
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
              LATS/VDU
            </Link>
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              List
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ maxWidth: "95%" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">LATS/VDU</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputstation" className="form-label">
                    Station
                  </label>
                  <select
                    className="form-control"
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
                  >
                    <option>None</option>
                    <option>station 1</option>
                    <option> station 2</option>
                    <option>station 3</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <h4 style={{ textAlign: "center" }}>TIME CONTROL TRANSFER</h4>
                <div className="col-md-6">
                  <label for="inputfrom" className="form-label">
                    From
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputtime"
                    onChange={(e) =>
                      setFormValues({ ...formValues, from: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputto" className="form-label">
                    To
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputto"
                    onChange={(e) =>
                      setFormValues({ ...formValues, to: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputresult" className="form-label">
                    LATS/VDU Function/Result
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputresult"
                    onChange={(e) =>
                      setFormValues({ ...formValues, result: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputtcid" className="form-label">
                    TC Employ Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtcid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, tcid: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputremarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
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

export default LatsvRegister;
