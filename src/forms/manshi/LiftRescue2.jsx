import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLift2, addData } from "../../reducer/manshi/LiftRescue2Reducer";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import stations from "../../station.json";
import { formatDate } from "../../data/formatDate";

const LiftRescue2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Lift2d = useSelector((state) => state.Lift2);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Lift2d) {
      setSlug(Lift2d.slug);
    }
  }, [Lift2d]);
  const [formValues, setFormValues] = useState({
    date: formatDate(new Date().toDateString()),
    station: "",
    nameofsc: "Current User",
    DisRecorded: "",
    DisCreated: "",
    AnnManual: "",
    AnnRecorded: "",
    PIDSloc: "",
    PIDSstatus: "",
    PASloc: "",
    PASstatus: "",
    empid: "empid",
    sigofsc: "sign",
    remark: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <div className="container ">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Lift Rescue Drill
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
                <h3 className="form-heading">lift Rescue Drill</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
               
<div className="col-md-6">
                <label htmlFor="inputstation" className="form-label">
                  Station
                </label>
                <select
                  className="form-control"
                  id="inputstation"
                  name="station"
                  required
                  value={formValues.station}
                  onChange={handleChange}
                >
                  <option value="">Select Station</option>
                  {stations.map((station, index) => (
                    <option key={index} value={station["STATION Code"]}>
                      {station["Station Name"] || station["STATION Code"]}
                    </option>
                  ))}
                </select>
              </div>

                <div className="col-md-6">
                  <label htmlFor="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    name="remark"
                    value={formValues.remark}
                    onChange={handleChange}
                    aria-label="Remark"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h3>PIDS</h3>
                <div className="col-md-6">
                  <label htmlFor="PIDSloc" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="PIDSloc"
                    name="PIDSloc"
                    value={formValues.PIDSloc}
                    onChange={handleChange}
                    aria-label="PIDSloc"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="PIDSstatus" className="form-label">
                    Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="PIDSstatus"
                    name="PIDSstatus"
                    value={formValues.PIDSstatus}
                    onChange={handleChange}
                    aria-label="PIDSstatus"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h3>PAS</h3>
                <div className="col-md-6">
                  <label htmlFor="PASloc" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="PASloc"
                    name="PASloc"
                    value={formValues.PASloc}
                    onChange={handleChange}
                    aria-label="PASloc"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="PASstatus" className="form-label">
                    Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="PASstatus"
                    name="PASstatus"
                    value={formValues.PASstatus}
                    onChange={handleChange}
                    aria-label="PASstatus"
                  />
                </div>
              </div>
              {/*Message */}
              <div className="row mb-4">
                <h3>Message</h3>
                <div
                  className="col-md-6"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    gap: "5px",
                  }}
                >
                  <h3>Displayed</h3>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="DisRecorded">Recorded</label>
                      <input
                        type="text"
                        id="DisRecorded"
                        name="DisRecorded"
                        value={formValues.DisRecorded}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="DisCreated">Created</label>
                      <input
                        type="text"
                        id="DisCreated"
                        name="DisCreated"
                        value={formValues.DisCreated}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    gap: "5px",
                  }}
                >
                  <h3>Announce</h3>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="AnnRecorded">Recorded</label>
                      <input
                        type="text"
                        id="AnnRecorded"
                        name="AnnRecorded"
                        value={formValues.AnnRecorded}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="AnnManual">Manual</label>
                      <input
                        type="text"
                        id="AnnManual"
                        name="AnnManual"
                        value={formValues.AnnManual}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn-primary px-3">
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

export default LiftRescue2;
