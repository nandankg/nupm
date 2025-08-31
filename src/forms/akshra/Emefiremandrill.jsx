import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addemefire,
  addData,
} from "../../reducer/akshra/EmefiremandrillReducer";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import stationData from "../../data/station.json";
const Emefiremandrill = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [station, setStation] = useState("Ranchi");
  const emefireList = useSelector((state) => state.emedrill);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (emefireList) {
      setSlug(emefireList.slug);
    }
  }, [emefireList]);
  //const [afcgateno, setAfcgateno] = useState("123");
  const basicInitialValues = {
    date: "",
    station: "",
    pflevel1: "",
    concourse1: "",
    ground1: "",
    pflevel: "",
    concourse: "",
    ground: "",
    detailsofthedrillperformed: "",
    nameofsc: "current user",
    empid: "empid",
    //sigofsc: "sign",
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
              EMERGENCY/FIREMAN EXIT DRILL REGISTER
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
                  EMERGENCY/FIREMAN EXIT DRILL REGISTER
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label
                    htmlFor="inputDetailsofthedrillperformed"
                    className="form-label"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDetailsofthedrillperformed"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
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
                </div>{" "}
              </div>
              <b>FIREMAN EXIT DOOR STATUS</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor=" inputPflevel1" className="form-label">
                    PF LEVEL1
                  </label>

                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel1"
                    id="checkboxNoLabel1"
                    aria-label="..."
                    onChange={(e) =>
                      setFormValues({ ...formValues, pflevel1: e.target.value })
                    }
                  />
                </div>
                <div className="col -md -6">
                  <label htmlFor="inputConcourse1" className="form-label">
                    Concourse1
                  </label>
                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel1"
                    id="checkboxNoLabel1"
                    aria-label="..."
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        concourse1: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputGround" className="form-label">
                    Ground1
                  </label>
                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel1"
                    id="checkboxNoLabel1"
                    aria-label="..."
                    onChange={(e) =>
                      setFormValues({ ...formValues, ground1: e.target.value })
                    }
                  />
                </div>
              </div>

              <b> EMERGENCY EXIT DOOR STATUS</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputPflevel" className="form-label">
                    PF Level2
                  </label>
                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel1"
                    id="checkboxNoLabel2"
                    aria-label="..."
                    onChange={(e) =>
                      setFormValues({ ...formValues, pflevel: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputConcourse" className="form-label">
                    Concourse2
                  </label>
                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel1"
                    id="checkboxNoLabel2"
                    aria-label="..."
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        concourse: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputGround" className="form-label">
                    Ground2
                  </label>
                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel2"
                    id="checkboxNoLabel2"
                    aria-label="..."
                    onChange={(e) =>
                      setFormValues({ ...formValues, ground: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label
                    htmlFor="inputDetailsofthedrillperformed"
                    className="form-label"
                  >
                    Details Of the drill performed
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDetailsofthedrillperformed"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detailsofthedrillperformed: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputNameofsc" className="form-label">
                    Name of SC
                  </label>
                  <input
                    type="current user"
                    className="form-control"
                    id="inputNameofsc"
                    onChange={(e) =>
                      setFormValues({ ...formValues, nameofsc: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputEmpid" className="form-label">
                    Emp.id
                  </label>
                  <input
                    type="empid"
                    className="form-control"
                    id="inputEmpid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>
                {/*<div className="col-6">
                  <label htmlFor="inputSignofsc" className="form-label">
                    Signature of SC
                  </label>
                  <input
                    type="sign"
                    className="form-control"
                    id="inputSignofsc"
                    onChange={(e) =>
                      setFormValues({ ...formValues, sigofsc: e.target.value })
                    }
                  />
                </div>*/}
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">
                    RemarkS
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
                <button type="submit" className="btn btn-primary">
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

export default Emefiremandrill;
