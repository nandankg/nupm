import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addData, addGate } from "../../reducer/chanchal/GateReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../data/formatDate";
import stationData from "../../station.json"; // Update the path to your station.json

const GateReg = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const GateList = useSelector((state) => state.gate);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (GateList) {
      setSlug(GateList.slug);
    }
  }, [GateList]);

  const basicInitialValues = {
    S_No: sNo,
    date: formatDate(new Date().toString),
    station: "",
    nameofsc: "",
    empid: "",
    disrecorded: "",
    discreated: "",
    annorecorded: "",
    annomanual: "",
    pilocation: "",
    pistatus: "",
    palocation: "",
    pastatus: "",
    sigofsc: "",
    remark: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    // const newSrno = sNo + 1;
    // setSNo(newSrno);
    navigate(`/list/${slug}`);
    // navigate("/list/night_lift_rescue_drill2_register");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              LIFT RESCUE DRILL
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
                <h3 className="form-heading">LIFT RESCUE DRILL </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputstation" className="form-label">
                    Station
                  </label>
                  <select
                    className="form-control"
                    id="station"
                    value={formValues.station}
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Station</option>
                    {stationData
                      .filter((station) => station["Station Name"]) // Exclude entries with null station names
                      .map((station) => (
                        <option
                          key={station["STATION Code"]}
                          value={station["Station Name"]}
                        >
                          {station["Station Name"]}
                        </option>
                      ))}
                  </select>
                </div>
                {/* <div className="col-md-6">
                  <label for="inputStation" className="form-label">
                    {" "}
                    Station{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStation"
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
                  />
                </div> */}
                <div className="col-md-6">
                  <label for="inputdate" className="form-label">
                    Date{" "}
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
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputnameofsc" className="form-label">
                    {" "}
                    Name of sc{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputnameofsc"
                    onChange={(e) =>
                      setFormValues({ ...formValues, nameofsc: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    Empid{" "}
                  </label>
                  <input
                    type="test"
                    className="form-control"
                    id="inputempid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>
                {/* <div className="col-md-4">
                  <label for="inputsigofsc" className="form-label">
                    sign of sc{" "}
                  </label>
                  <input
                    type="test"
                    className="form-control"
                    id="inputsigofsc"
                    onChange={(e) =>
                      setFormValues({ ...formValues, sigofsc: e.target.value })
                    }
                  />
                </div> */}
              </div>

              <div className="row mb-3">
                <h3 className="text-center">Message</h3>
                <div className="col-md-6 border">
                  <h5>Displayed</h5>

                  <label for="inputdisrecorded" className="form-label">
                    Recorded
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputdisrecorded"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        disrecorded: e.target.value,
                      })
                    }
                  />
                  <label for="inputdiscreated" className="form-label">
                    Created
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputdiscreated"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        discreated: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6 border">
                  <h5>Announce</h5>

                  <label for="inputannorecorded" className="form-label">
                    Recorded
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputannorecorded"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        annorecorded: e.target.value,
                      })
                    }
                  />
                  <label for="inputannomanual" className="form-label">
                    Manual
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputannomanual"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        annomanual: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3 border">
                <h5>PIDS</h5>
                <label for="inputpilocation" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputpilocation"
                  onChange={(e) =>
                    setFormValues({ ...formValues, pilocation: e.target.value })
                  }
                />
                <label for="inputpistatus" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputpistatus"
                  onChange={(e) =>
                    setFormValues({ ...formValues, pistatus: e.target.value })
                  }
                />
              </div>
              <div className="row mb-3 border">
                <h5>PAS</h5>
                <label for="inputpalocation" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputpalocation"
                  onChange={(e) =>
                    setFormValues({ ...formValues, palocation: e.target.value })
                  }
                />
                <label for="inputpastatus" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputpastatus"
                  onChange={(e) =>
                    setFormValues({ ...formValues, pastatus: e.target.value })
                  }
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputCity" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
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

export default GateReg;
