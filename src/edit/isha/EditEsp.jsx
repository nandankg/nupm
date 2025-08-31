import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/isha/ESPDRILLReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import stationData from "../../station.json";
const EditEsp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const espd = useSelector((state) => state.espdrill);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(espd.data.data);
  const [items, setItems] = useState([]);
  const itmm = espd.data.data;
  console.log(items);
  useEffect(() => {
    if (espd) {
      setSlug(espd.slug);
    }
    dispatch(fetchData());
    setItems(espd.data.data);
  }, []);
  useEffect(() => {
    setItems(espd.data.data);
  }, [espd]);
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
    id: fd.id,
    date: fd.date,
    station: fd.station,
    pfno: fd.pf_no,
    operation: fd.operation_time,
    observation:fd.observation,
    reset: fd.reset_time,
    observation: fd.remarks,
    nameofsc: fd.name_of_sc,
    emp: "emp",
    remark: fd.remarks,
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
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              ESP DRILL
            </Link>
            <Link underline="hover" color="inherit">
              Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container"  style={{maxWidth:"95%"}}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Edit : ESP DRILL</h3>
                <span className="line-box" style={{width:"250px"}}></span>
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
                <div className="col-md-6">
                  <label htmlFor="inputpfno" className="form-label">
                    PF No
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputpfno"
                    name="pfno"
                    value={formValues.pfno}
                    onChange={(e) =>
                      setFormValues({ ...formValues, pfno: e.target.value })
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
                        type="time"
                        className="form-control"
                        id="inputOperationTime"
                        name="operation"
                        value={formValues.operation}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            operation: e.target.value,
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
                        name="reset"
                        value={formValues.reset}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            reset: e.target.value,
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
                        value={formValues.observation}
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
                        value={formValues.remark}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            remark: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 text-center pt-3">
                    <button type="submit" className="btn btn-primary px-3">
                      save
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

export default EditEsp;
