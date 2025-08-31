import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../data/formatDate";
import { editData, fetchData } from "../reducer/LatsVduDrillReducer";
import { formatTime } from "../data/formatDate";
import stations from "../data/station.json";

const LatsVduDrillEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState(new Date());
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const latsvdudrill = useSelector((state) => state.latsvdudrillstate || []);
  console.log(latsvdudrill.data.data);
  const [items, setItems] = useState([]);
  const itmm = latsvdudrill.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(latsvdudrill.data.data);
  }, []);

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (latsvdudrill) {
      setSlug(latsvdudrill.slug);
    }
  }, [latsvdudrill]);

  useEffect(() => {
    setItems(latsvdudrill.data.data);
  }, [latsvdudrill]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    //from api
    id: fd.id,
    date: formatDate(new Date().toString()),
    // date: formatDate,
    station_name: fd.station,
    namesc: fd.name_of_sc,
    emp_id: fd.Employ_id,
    tfrom: formatTime(new Date().toString()),
    tto: fd.time_to,
    result: fd.result,
    nameTC: fd.name_of_tc,
    empidTC: fd.TCEmploy_id,
    remark: fd.remarks,
    Station_name: fd.Station_name,
    department: fd.department,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">EDIT LATS/VDU DRILL REGISTER</h3>
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
                      setFormValues({
                        ...formValues,
                        station_name: e.target.value,
                      })
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
                    value={formValues.namesc}
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
                    className="form-control"
                    value={formValues.emp_id}
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
                    className="form-control"
                    value={formValues.date}
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
                    value={formValues.tfrom}
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
                    value={formValues.tto}
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
                    value={formValues.nameTC}
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
                    value={formValues.empidTC}
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
                    value={formValues.result}
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
                    value={formValues.remark}
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

export default LatsVduDrillEdit;
