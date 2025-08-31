import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  addCabinet,
  addData,
} from "../../reducer/satya/MonthlyCabinetRecordReducer";
import { Breadcrumbs } from "@mui/material";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json"

const MonthlyCabinetRecord = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cabinetrecord = useSelector((state) => state.monthlyrecord);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (cabinetrecord) {
      setSlug(cabinetrecord.slug);
    }
  }, [cabinetrecord]);

  const basicInitialValues = {
    cabinet: "",
    date: "",
    station: "",
    year: "",
    month: "",
    done1: "",
    done2: "",
    done3: "",
    done4: "",
    done5: "",
    done6: "",
    done7: "",
    remarks: "",
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
              ATS Cabinet Record
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
                 ATS Cabinet Maintenance Records
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
              <div className="col-md-3">
                  <label for="inputyear" className="form-label">
                    Maintenance Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                  
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                    required
                  />
                </div>
                </div>
              <div className="row mb-3">
                <div className="col-md-3">
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
                  <label for="inputyear" className="form-label">
                    Year
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputdate"
                    max={3000}
                    min={2000}
                    step={1}
                    onChange={(e) =>
                      setFormValues({ ...formValues, year: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label for="inputmonth" className="form-label">
                    Month
                  </label>

                  <select
                    className="form-control"
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({ ...formValues, month: e.target.value })
                    }
                    required
                  >
                    <option>--select--</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label for="inputstation" className="form-label">
                    Station
                  </label>

                  <select
                    className="form-control"
                    id="inputstation"
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
              </div>
              <div className="row mb-3">
                <label className="col-md-8" style={{ textAlign: "left" }}>
                Maintenance activity
                </label>
                <label className="col-md-6">
                  Done or Not &nbsp;&nbsp;&nbsp;&nbsp;
                </label>
              </div>
              <div
                className="row"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Visual Inspection
                </label>

                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputdone"
                    onChange={(e) =>
                      setFormValues({ ...formValues, done1: e.target.value })
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
              </div>
              <div
                className="row"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Dust Cleaning
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputdone"
                    onChange={(e) =>
                      setFormValues({ ...formValues, done2: e.target.value })
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
              </div>
              <div
                className="row"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Electrical Connection
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputdone"
                    onChange={(e) =>
                      setFormValues({ ...formValues, done3: e.target.value })
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
              </div>
              <div
                className="row"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Fan
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputdone"
                    onChange={(e) =>
                      setFormValues({ ...formValues, done4: e.target.value })
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
              </div>
              <div
                className="row"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Eathing Connection
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputdone"
                    onChange={(e) =>
                      setFormValues({ ...formValues, done5: e.target.value })
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
              </div>
              <div className="row mb-3">
                <label className="col-md-8" style={{ textAlign: "left" }}>
                  Checks After Maintenance
                </label>
                <label className="col-md-2">
                  Done or Not&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
              </div>
              <div
                className="row"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Verify system status from system view. It should be same as
                  before the maintenance
                </label>

                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputdone"
                    onChange={(e) =>
                      setFormValues({ ...formValues, done6: e.target.value })
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
              </div>
              <div
                className="row"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Cck ping status of central router, sever, central work
                  stations
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputdone"
                    onChange={(e) =>
                      setFormValues({ ...formValues, done7: e.target.value })
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
              </div>
              <div className="row">
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
                    required
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3" style={{width:"100px", height: "50px", textAlign: "center"}} >
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

export default MonthlyCabinetRecord;
