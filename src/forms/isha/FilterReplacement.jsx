import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { addData } from "../../reducer/isha/FilterReplacementReducer";
import { Link } from "react-router-dom";
import stationData from "../../station.json";
const FilterReplacement = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.Filter);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (filter) {
      setSlug(filter.slug);
    }
  }, [filter]);

  const basicInitialValues = {
    dateofmaintenance: "",
    maintenanceschedule: "",
    station:"",
    checklist1: "",
    checklist2: "",
    checklist3: "",
    checklist4: "",
    checklist5: "",
    blank1: "",
    blank2: "",
    blank3: "",
    blank4: "",
    blank5: "",
    remarks: "",
    name: "",
    designation: "",
    empno: "",
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
              Filter Replacement Half yearly MAINTENANCE RECORD
            </Link>
            <Link underline="hover" color="inherit" >
            Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="form-container" style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">Filter Replacement Half yearly MAINTENANCE RECORD</h3>
                <span className="line-box" style={{width:"770px"}}></span>
              </div>

              <div className="row mb-3">
              <div className="col-md-4">
                  <label for="inputmaintenanceschedule" className='form-label'>
                    Maintenance Date
                  </label>
                  <input type="date"  className='form-control'
                  onChange={(e) =>
                    setFormValues({ ...formValues, dateofmaintenance: e.target.value })
                  }
                  />
                  </div>
                <div className="col-md-4">
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
                    <option>quarterlyRanges</option>
                    <option>January-June</option>
                    <option>July-December</option>
                  </select>
                </div>
                <div className="col-md-4">
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
              </div>

              <div className="row mb-3">
                <label className="col-md-8" style={{ textAlign: "left" }} >  Details of Maintenance Activity</label>
                <label className="col-md-6" style={{ textAlign: "center" }} >Status</label>
              </div>
              <div className="row" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <label className='col-md-6' style={{ textAlign: "left" }}>
                  BTN door Filter replacement
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
                  Filter replacement of ATS Cubicle
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
                  CLC door Filter replacement
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
                  MSS Filter replacement
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
              <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <label className='col-md-6' style={{ textAlign: "left" }}>
                  PDU Filter replacement
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({ ...formValues, checklist5: e.target.value })
                    }>
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Not Done</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    placeholder='Remark, if any'
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank5: e.target.value })
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

export default FilterReplacement;