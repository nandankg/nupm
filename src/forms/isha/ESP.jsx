import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { espdrill, addData } from "../../reducer/isha/ESPDRILLReducer";
import { formatDate, formatTime } from "../../data/formatDate";
import stationData from "../../station.json";
const ESP = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  
  const dispatch = useDispatch();
  const esp = useSelector((state) => state.espdrill);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (esp) {
      setSlug(esp.slug);
    }
  }, [esp]);
  const basicInitialValues = {
    date: formatDate(new Date().toDateString()),
    station: "",
    pf_no: "",
    operation_time: "",
    reset_time: "",
    observation: "",
    name_of_sc: "",
    Employ_id: "",
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
              ESP DRILL
            </Link>
            <Link underline="hover" color="inherit" >
             Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{maxWidth:"95%"}}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">ESP DRILL</h3>
                <span className="line-box" style={{width:"150px"}}></span>
              </div>
              <div className="row mb-3">
                
              <div className="col-md-6">
                <label htmlFor="inputstation" className="form-label">
                    Station
                  </label>
                  <select
                    className="form-control"
                    id="station"
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
                <div className="col-md-6">
                  <label htmlFor="inputpfno" className="form-label">
                    PF No
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputpfno"
                    name="pfno"
                    onChange={(e) =>
                      setFormValues({ ...formValues, pf_no: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="time" style={{ textAlign: "center" }}>
                  <label for="inputhate" className="form-label">
                    TIME
                  </label>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label
                        htmlFor="inputOperationTime"
                        className="form-label"
                      >
                        Operation Time
                      </label>
                      <input
                        type="time"required
                        className="form-control"
                        id="inputOperationTime"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            operation_time: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="inputResetTime" className="form-label">
                        Reset Time
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id="inputResetTime"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            reset_time: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="inputobservation" className="form-label">
                        Observation
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputobservation"
                        name="observation"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            observation: e.target.value,
                          })
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
                        name="remark"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            remarks: e.target.value,
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ESP;
