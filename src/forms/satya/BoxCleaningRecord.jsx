import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { addCleaning, addData,} from "../../reducer/satya/BoxCleaningRecordReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import stationData from "../../station.json";

const BoxCleaningRecord = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const boxcleaning = useSelector((state) => state.boxindoor);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (boxcleaning) {
      setSlug(boxcleaning.slug);
    }
  }, [boxcleaning]);

  const basicInitialValues = {
    station: "",
    cabinet: "",
    dateofmaintenance: "",
    maintenanceschedule: "",
    checklist1: "",
    checklist2: "",
    checklist3: "",
    blank1: "",
    blank2: "",
    blank3: "",
    remarks: "",
    name: "",
    designation: "",
    countersign: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/indoor-box-cleaning`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Cleaning Activity-Indoor
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  BOX CLEANING QUATERLY MAINTENANCE RECORD
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputmaintenanceschedule" className="form-label">
                    Maintenance Schedule
                  </label>
                  <select
                    className="form-control"
                    id="inputmaintenanceschedule"
                    onChange={(e) =>
                      setFormValues({ ...formValues, maintenanceschedule: e.target.value })
                    }
                    required
                  >
                    <option>None</option>
                    <option>JAN-MAR</option>
                    <option>APR-JUN</option>
                    <option>JUL-SEP</option>
                    <option>OCT-DEC.</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputstation" className="form-label">
                    Station
                  </label>
                  <select
                    className="form-control"
                    id="inputmonth"
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
                <div className="col-md-4">
                  <label for="inputcabinet" className="form-label">
                    Cabinet
                  </label>
                  <select
                    className="form-control"
                    id="inputcabinet"
                    onChange={(e) =>
                      setFormValues({ ...formValues, cabinet: e.target.value })
                    }
                    required
                  >
                    <option style={{ textAlign: "center" }}>--select--</option>
                    BoxCleaningRecord     <option>N/A</option>
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
                <div className="col-md-4">
                  <label for="inputcubicalname" className="form-label">
                    Date of Maintenance
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputcubicalname"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        dateofmaintenance: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-md-8" style={{ textAlign: "left" }}>
                  Cleaning activity-Indoor
                </label>
                <label className="col-md-6" style={{ textAlign: "center" }}>
                  Done or Not
                </label>
              </div>
              <div
                className="row"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Cleaning of Boxes/Cubical
                </label>

                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        checklist1: e.target.value,
                      })
                    }
                    required
                  >
                    <option style={{ textAlign: "center" }}>--select--</option>
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Checked OKAY</option>
                    <option>Checked NOT OKAY</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    placeholder="Remark, if any"
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank1: e.target.value })
                    }
                    
                  />
                </div>
              </div>
              <div
                className="row mb-3"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Checking of proper dressing of cubical
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        checklist2: e.target.value,
                      })
                    }
                    required
                  >
                    <option style={{ textAlign: "center" }}>--select--</option>
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Checked OKAY</option>
                    <option>Checked NOT OKAY</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    placeholder="Remark, if any"
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank2: e.target.value })
                    }
                   
                  />
                </div>
              </div>
              <div
                className="row mb-3"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Verification of terminal condition
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        checklist3: e.target.value,
                      })
                    }
                    required
                  >
                    <option style={{ textAlign: "center" }}>--select--</option>
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Checked OKAY</option>
                    <option>Checked NOT OKAY</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    placeholder="Remark, if any"
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank3: e.target.value })
                    }
                   
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputremarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
                 
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputremarks" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                 
                  />
                </div>
                 <div className="col-md-4">
                  <label for="inputremarks" className="form-label">
                   EMP No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    onChange={(e) =>
                      setFormValues({ ...formValues, countersign: e.target.value })
                    }
                 
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputremarks" className="form-label">
                   Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    onChange={(e) =>
                      setFormValues({ ...formValues, designation: e.target.value })
                    }
                 
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
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

export default BoxCleaningRecord;
