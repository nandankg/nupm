import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { addData } from "../../reducer/isha/FanRackReducer";
import { Link } from "react-router-dom";
import stationData from "../../station.json";

const FanRack = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fan = useSelector((state) => state.Fan);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (fan) {
      setSlug(fan.slug);
    }
  }, [fan]);

  const basicInitialValues = {
    date:"",
    station: "",
    cabinet: "",
    dateofmaintenance: "",
    maintenanceschedule: "",
    checklist1: "",
    checklist2: "",
    checklist3: "",
    checklist4: "",
    blank1: "",
    blank2: "",
    blank3: "",
    blank4: "",
    remarks: "",
    name:"",
    signature:"",
    csign:"",
    empno:"",

  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            FAN Rack QUARTERLY MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit" >
          Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="form-container" style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}>
          <form onSubmit={handleSubmit}>
            <div className=" form-heading-container">
              <h3 className="form-heading">FAN Rack QUARTERLY MAINTENANCE RECORD </h3>
              <span className="line-box" style={{ width: "700px" }}></span>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
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

              <div className="col-md-3">
                <label for="inputmaintenanceschedule" className='form-label'>
                  Maintenance Schedule
                </label>
                <select
                  className='form-control'
                  id="inputmaintenanceschedule"
                  onChange={(e) =>
                    setFormValues({ ...formValues, maintenanceschedule: e.target.value })
                  }
                >
                  <option>None</option>
                  <option>JAN-MAR</option>
                  <option>APR-JUN</option>
                  <option>JUL-SEP</option>
                  <option>OCT-DEC</option>
                </select>
              </div>

              <div className="col-md-3">
                <label for="inputcabinet" className="form-label">
                  Cabinet
                </label>
                <select
                  className='form-control'
                  required
                  id="inputmaintenanceschedule"
                onChange={(e) =>
                    setFormValues({ ...formValues, cabinet: e.target.value })
                  }
                  >
                  <option>N/A</option>
                  <option>RC</option>
                  <option>BTN</option>
                  <option>CLC</option>
                  <option>ZC</option>
                  <option>LC</option>
                  <option>ATS</option>
                  <option>SMIO</option>
                  <option>PDU</option>
                  <option>ACC</option>
                  <option>OTHER</option>
                </select>
              </div>
              <div className="col-md-3">
                <label for="inputcabinet" className="form-label">
                  Date
                </label>
                <input type="date"  className="form-control"
                  id="inputtext"
                  placeholder='Date'
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  } />
                </div>
            </div>
            <div className="row mb-3">
              <label className="col-md-8" style={{ textAlign: "left" }} >  Details of Maintenance Activity</label>
              <label className="col-md-6" style={{ textAlign: "center" }} >Status</label>
            </div>

            <div className="row" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
                Cleaning of Fan Rack
              </label>

              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist1: e.target.value })
                  }>
                  <option>N/A</option>
                  <option>Done</option>
                  <option>Not Done</option>
                  <option>Checked Okay</option>
                  <option>Checked NOK</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank1: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
                Checking of fan’s working
              </label>
              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist2: e.target.value })
                  }>
                  <option>N/A</option>
                  <option>Done</option>
                  <option>Not Done</option>
                  <option>Checked Okay</option>
                  <option>Checked NOK</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank2: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
                Replacement of faulty fan
              </label>
              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist3: e.target.value })
                  }>
                  <option>N/A</option>
                  <option>Done</option>
                  <option>Not Done</option>
                  <option>Checked Okay</option>
                  <option>Checked NOK</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank3: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
                Checking of ON/OFF switch and their indication
              </label>
              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist4: e.target.value })
                  }>
                  <option>N/A</option>
                  <option>Done</option>
                  <option>Not Done</option>
                  <option>Checked Okay</option>
                  <option>Checked NOK</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank4: e.target.value })
                  }
                />
              </div>
            </div>


            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="inputbillNo" className="form-label">
                  Remarks
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="remarks"
                  onChange={(e) =>
                    setFormValues({ ...formValues, remarks: e.target.value })
                  }
                />
              </div>
              
            </div>
            <div className="row mb-3">
            <div className="col-md-4">
            <label htmlFor="inputbillNo" className="form-label">
            Gang Members Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={(e) =>
                    setFormValues({ ...formValues, 
                      name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
            <label htmlFor="inputbillNo" className="form-label">
            Gang Members EmpID
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="signature"
                  onChange={(e) =>
                    setFormValues({ ...formValues, 
                      signature: e.target.value })
                  }
                />
              </div>
              </div>
              <div className="row mb-3">
            <div className="col-md-4">
            <label htmlFor="inputbillNo" className="form-label">
            Supervisor name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="csign"
                  onChange={(e) =>
                    setFormValues({ ...formValues, 
                      csign: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
            <label htmlFor="inputbillNo" className="form-label">
            Supervisor EmpID
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="empno"
                  onChange={(e) =>
                    setFormValues({ ...formValues, 
                      empno: e.target.value })
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
  );
}
export default FanRack;