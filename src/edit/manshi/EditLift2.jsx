import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { editData, fetchData } from "../../reducer/manshi/LiftRescue2Reducer";
const EditLift2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const Lift2d = useSelector((state) => state.Lift2);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Lift2d) {
      setSlug(Lift2d.slug);
    }
  }, [Lift2d]);
  console.log(Lift2d.data.data);
  const [items, setItems] = useState([]);
  const itmm = Lift2d.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(Lift2d.data.data);
  }, [dispatch]);

  useEffect(() => {
    setItems(Lift2d.data.data);
  }, [Lift2d]);

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
    lift_no: "1klklpkm jnjl23",
    DisRecorded: fd.mess_display_recorded,
    DisCreated: fd.mess_display_created,
    AnnRecorded: fd.mess_anounce_recorded,
    AnnManual: fd.mess_anounce_manual,
    PIDSloc: fd.pids_location,
    PIDSstatus: fd.pids_status,
    PASloc: fd.pas_location,
    PASstatus: fd.pas_status,
    remark: fd.remarks,
    empid: fd.Employ_id,
    nameofsc: fd.name_of_sc,
    sigofsc: fd.Station_name,
    department: "s&t",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container ">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
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
                  <label htmlFor="inputStation" className="form-label">
                    Station
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStation"
                    name="station"
                    value={formValues.station}
                    onChange={handleChange}
                    aria-label="Station"
                  />
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

export default EditLift2;
