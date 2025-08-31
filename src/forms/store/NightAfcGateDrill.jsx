import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addAfcGateDrill,
  addData,
} from "../../reducer/store/NightAfcGateDrillReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../data/formatDate";

const NightAfcGateDrill = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const AfcGateDrillList = useSelector((state) => state.nightafcgate);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (AfcGateDrillList) {
      setSlug(AfcGateDrillList.slug);
    }
  }, [AfcGateDrillList]);

  const basicInitialValues = {
    sno: "sNo",
    date: "",
    station: "",
    nameofsc: " ",
    empid: "",
    afcgateno: "",
    TypeofGate: "",
    Incident: "",
    Emergency: "",
    nameoftc: "",
    empidoftc: "",
    remark: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  //   console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    // const newSrno = sNo + 1;
    // setSNo(newSrno);
    navigate(`/list/${slug}`);
    // navigate("/list/occ-afc-gate-drill");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              NIGHT AFC GATE DRILL
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
                <h3 className="form-heading">NIGHT AFC GATE DRILL Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
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
                </div>
                <div className="col-md-4">
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

                <div className="col-md-4">
                  <label for="inputnameofsc" className="form-label">
                    {" "}
                    Name of SC{" "}
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
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    {" "}
                    Employee ID{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputafcgateno" className="form-label">
                    {" "}
                    AFC Gate No.{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputafcgateno"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        afcgateno: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="row p-1 m-1 border">
                  <h3 className="text-center">Messages</h3>
                  <div className="col-md-6 ">
                    <label for="inputTypeofGate" className="form-label">
                      {" "}
                      Type of Gate{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTypeofGate"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          TypeofGate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-6 ">
                    <label for="inputopmode" className="form-label">
                      Mode of Operation
                    </label>
                    <div>
                      <input
                        className="form-check-input ms-1"
                        type="radio"
                        name="radioNoLabel"
                        id="radioNoLabel1"
                        value="Incedent"
                        aria-label="..."
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            Incident: e.target.value,
                          })
                        }
                      />
                      Incident
                    </div>
                    <input
                      className="form-check-input ms-1"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Emergency"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          Emergency: e.target.value,
                        })
                      }
                    />
                    Emergency
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputnameoftc" className="form-label">
                    Name of TC{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputnameoftc"
                    onChange={(e) =>
                      setFormValues({ ...formValues, nameoftc: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputempidoftc" className="form-label">
                    {" "}
                    Emp. ID of TC{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempidoftc"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empidoftc: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
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

export default NightAfcGateDrill;
