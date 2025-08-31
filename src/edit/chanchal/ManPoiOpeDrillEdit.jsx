import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
} from "../../reducer/chanchal/ManPoiOpeDrillReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json"; // Update the path to your station.json

const ManPoiOpeDrillEdit = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const ManPoiOpeDrillList = useSelector((state) => state.manPoiOpeDrill);
  console.log(ManPoiOpeDrillList.data.data);
  const [items, setItems] = useState([]);
  const itmm = ManPoiOpeDrillList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(ManPoiOpeDrillList.data.data);
  }, []);
  useEffect(() => {
    setItems(ManPoiOpeDrillList.data.data);
  }, [ManPoiOpeDrillList]);
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
    S_No: sNo,
    date: formatDate(new Date().toDateString()),
    station: fd.station,
    nameofsc: fd.nameofsc,
    empid: fd.empid,
    pointno: fd.pointno,
    from: fd.from,
    to: fd.to,
    totaltimtaken: fd.totaltimtaken,
    nameoftc: fd.nameoftc,
    empidoftc: fd.empidoftc,
    remark: fd.remark,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/list/manual-point-operation-drill");
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Manual point operation Drill
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
                  Edit : Manual point operation Drill{" "}
                </h3>
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
                    value={formValues.station}
                    id="inputStation"
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
                  />
                </div> */}
                <div className="col-md-6">
                  <label for="inputpointno" className="form-label">
                    {" "}
                    Point No.{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={formValues.pointno}
                    id="inputpointno"
                    onChange={(e) =>
                      setFormValues({ ...formValues, pointno: e.target.value })
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
                    value={formValues.nameofsc}
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
                    value={formValues.empid}
                    id="inputempid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputtotaltimtaken" className="form-label">
                    {" "}
                    Total Time Taken{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.totaltimtaken}
                    id="inputtotaltimtaken"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        totaltimtaken: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputnameoftc" className="form-label">
                    {" "}
                    Name of TC{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.nameoftc}
                    id="inputnameoftc"
                    onChange={(e) =>
                      setFormValues({ ...formValues, nameoftc: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h3 className="text-center">Time</h3>
                <div className="col-md-6">
                  <label for="inputfrom" className="form-label">
                    {" "}
                    From{" "}
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    value={formValues.from}
                    id="inputfrom"
                    onChange={(e) =>
                      setFormValues({ ...formValues, from: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputto" className="form-label">
                    {" "}
                    To{" "}
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    value={formValues.to}
                    id="inputto"
                    onChange={(e) =>
                      setFormValues({ ...formValues, to: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputempidoftc" className="form-label">
                    {" "}
                    Empl. ID of TC{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.empidoftc}
                    id="inputempidoftc"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empidoftc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.remark}
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

export default ManPoiOpeDrillEdit;
