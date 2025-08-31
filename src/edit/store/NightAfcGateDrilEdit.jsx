import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
} from "../../reducer/chanchal/AfcGateDrillReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

const NightAfcGateDrillEdit = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const AfcGateDrillList = useSelector((state) => state.assuReg);
  console.log(AfcGateDrillList.data.data);
  const [items, setItems] = useState([]);
  const itmm = AfcGateDrillList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(AfcGateDrillList.data.data);
  }, []);
  useEffect(() => {
    setItems(AfcGateDrillList.data.data);
  }, [AfcGateDrillList]);
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
    afcgateno: fd.afcgateno,
    TypeofGate: fd.TypeofGate,
    Incident: fd.Incident,
    Emergency: fd.Emergency,
    nameoftc: fd.nameoftc,
    empidoftc: fd.empidoftc,
    remark: fd.remark,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/list/occ-afc-gate-drill");
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              AFC GATE DRILL
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
                <h3 className="form-heading">Edit : AFC GATE DRILL Register</h3>
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
                    value={formValues.station}
                    id="inputStation"
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputdate" className="form-label">
                    {" "}
                    Date{" "}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={formValues.date}
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
                    value={formValues.nameofsc}
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
                    value={formValues.empid}
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
                    value={formValues.afcgateno}
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
                      value={formValues.TypeofGate}
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
                    value={formValues.nameoftc}
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
              </div>
              <div className="row mb-3">
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
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NightAfcGateDrillEdit;
