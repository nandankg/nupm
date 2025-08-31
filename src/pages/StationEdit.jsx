import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Addstation, editStation } from "../reducer/AuthReducer";
import { useLocation } from "react-router-dom";

function StationEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const luser = JSON.parse(localStorage.getItem("userdata"));
  const user = useSelector((state) => state.auth.data);
  const location = useLocation();
  const { data } = location.state;
  console.log(data);

  const basicInitialValues = {
    station_name: data.station,
    id: data.id,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editStation(formValues)).then((action) => {
      console.log(action.payload);
      navigate("/station/list");
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  console.log(formValues);

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              Home Page
            </Link>
            <Link underline="hover" color="inherit">
              Station Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-11">
                <label htmlFor="inputname" className="form-label">
                  Station Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputname"
                  name="station_name"
                  value={formValues?.station_name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="f-btn btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default StationEdit;
