import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/pinki/StockMovementRegisterReducer";
import stations from "../../station.json";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const Stockmovementregister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const stockmovement = useSelector((state) => state.stockmovement);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (stockmovement) {
      setSlug(stockmovement.slug);
    }
  }, [stockmovement]);

  const basicInitialValues = {
    date: "",
    idofcscissued: "",
    type: "",
    soldtick: false,
    freshtick: false,
    defectivetick: false,
    cscid: "",
    afcamt: "",
    actual: "",
    diff: "",
    remark: "",
    action: "",
    station: "", //added
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <div className="container">
        <div role="presentation" className="breadcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Stock Movement
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">Stock Movement Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="col-md-4">
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
              <div className="col-md-4">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange} // Ensure this function updates the state
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="idofcscissued" className="form-label">
                  ID of CSC Issued
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="idofcscissued"
                  name="idofcscissued"
                  value={formValues.idofcscissued}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="type" className="form-label">
                  Type SV-2/SV-6
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  value={formValues.type}
                  onChange={handleChange}
                />
              </div>
              <div className="check-boxx col-md-12">
                <div className="check-one">
                  <label htmlFor="soldtick" className="form-label">
                    Tick if sold
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="soldtick"
                    name="soldtick"
                    checked={formValues.soldtick}
                    onChange={handleChange}
                    style={{ marginRight: "20px" }}
                  />
                  <label htmlFor="freshtick" className="form-label">
                    Fresh (Tick only)
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="freshtick"
                    name="freshtick"
                    checked={formValues.freshtick}
                    onChange={handleChange}
                    style={{ marginRight: "20px" }}
                  />
                  <label htmlFor="defectivetick" className="form-label">
                    Defective (Tick only)
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="defectivetick"
                    name="defectivetick"
                    checked={formValues.defectivetick}
                    onChange={handleChange}
                    style={{ marginRight: "20px" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="cscid" className="form-label">
                  CSC ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cscid"
                  name="cscid"
                  value={formValues.cscid}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="afcamt" className="form-label">
                  AFC Amt
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="afcamt"
                  name="afcamt"
                  value={formValues.afcamt}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="actual" className="form-label">
                  Actual
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="actual"
                  name="actual"
                  value={formValues.actual}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="diff" className="form-label">
                  Diff(if any)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="diff"
                  name="diff"
                  value={formValues.diff}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="diff" className="form-label">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="remark"
                  name="remark"
                  value={formValues.remark}
                  onChange={handleChange}
                />
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

export default Stockmovementregister;
