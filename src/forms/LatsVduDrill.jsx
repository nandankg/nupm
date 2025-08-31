import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addData, addlatsvdudrill } from "../reducer/LatsVduDrillReducer";
import Header from "../component/Header";
import { formatDate } from "../data/formatDate";
import { formatTime } from "../data/formatDate";
import stations from "../data/station.json";

const LatsVduDrillReg = () => {
  const navigate = useNavigate();
  const [s_no, setSno] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [station_name, setStationName] = useState("abc");
  const [namesc, setNameSC] = useState("abc");
  const [emp_id, setEmpId] = useState("123");
  const [tfrom, setTfrom] = useState("12");
  const [tto, setTto] = useState("12");
  const [result, setResult] = useState("abc");
  const [nameTC, setNameTC] = useState("abc");
  const [empidTC, setEmpIdTC] = useState("abc");

  const latsvdudrill = useSelector((state) => state.latsvdudrillstate || []);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (latsvdudrill) {
      setSlug(latsvdudrill.slug);
    }
  }, [latsvdudrill]);

  const basicInitialValues = {
    s_no: s_no,
    date: formatDate(new Date().toString()),
    station_name: "",
    namesc: "",
    emp_id: "",
    tfrom: formatTime(new Date().toString()),
    tto: "",
    result: "",
    nameTC: "",
    empidTC: "",
    remark: "",
    formtype: "",
    Station_name: "",
    department: "",
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
       
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">LATS/VDU DRILL REGISTER</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="stationname" className="form-label">
                    Station
                  </label>
                  <select
                  id="station"
                  name="station"
                  className="form-control"
                  style={{ margin: "0 10px 10px 0", paddingRight: "50px" }}
                  value={formValues.station_name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, station_name: e.target.value })
                  }
                >
                  <option value="">Select Station</option>
                  {stations.map(
                    (station, index) =>
                      station["Station Name"] && (
                        <option key={index} value={station["STATION Code"]}>
                          {station["Station Name"]}
                        </option>
                      )
                  )}
                </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="name" className="form-label">
                    Name of SC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    onChange={(e) =>
                      setFormValues({ ...formValues, namesc: e.target.value })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-4">
                  <label htmlFor="empid" className="form-label">
                    Emp.Id.
                  </label>
                  <input
                    type="Text"
                    required
                    className="form-control"
                    id="empid"
                    placeholder="Id"
                    onChange={(e) =>
                      setFormValues({ ...formValues, emp_id: e.target.value })
                    }
                  />
                </div>
              </div>

              <hr
                style={{
                  borderBlockStyle: "double",
                  borderBlockColor: "#f7b3a1",
                  borderWidth: "5px",
                }}
              />

              <h6 className="form-heading">Time Control Transfer</h6>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    id="date"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="tfrom" className="form-label">
                    Time From
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="tfrom"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        tfrom: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="tto" className="form-label">
                    Time To
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="tto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        tto: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="nametc"
                    className="form-label"
                    style={{ marginTop: "30px" }}
                  >
                    Name of TC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="result"
                    onChange={(e) =>
                      setFormValues({ ...formValues, nameTC: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label
                    htmlFor="empidtc"
                    className="form-label"
                    style={{ marginTop: "30px" }}
                  >
                    Emp ID of TC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="empidtc"
                    onChange={(e) =>
                      setFormValues({ ...formValues, empidTC: e.target.value })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-4">
                  <label htmlFor="result" className="form-label text-start">
                    LATS/VDU Function/Result
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="result"
                    onChange={(e) =>
                      setFormValues({ ...formValues, result: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="remark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="remark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
                    }
                  />
                </div>
                <div className="col-12 text-center pt-3">
                  <button type="submit" className="btn btn-primary px-3">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatsVduDrillReg;
