import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/monika/InspactionReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json"; // Update the path to your station.json

const user = JSON.parse(localStorage.getItem("userdata"));

const InspactionRegister = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const InspactionRegister = useSelector((state) => state.InspactionRegister);
  const [slug, setSlug] = useState("");

  const basicInitialValues = {
    
    date: "",
    station:"",
    remark:"",
    name:"",
    observation:"",
   reportedby:"",
    designation:"",
    employee_id:""
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  useEffect(() => {
    if (InspactionRegister) {
      setSlug(InspactionRegister.slug);
    }
  }, [InspactionRegister]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="bredcrumb">
            <Link underline="hover" color="inherit">
              INSPECTION REGISTER
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container"></div>
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
                <div className="col-md-6">
                  <label htmlFor="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputobservation" className="form-label">
                    Enter Observation/Inspection
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="observation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        observation: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputname" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="remark"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remark: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Inspected by
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Emp ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        employee_id: e.target.value,
                      })
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

export default InspactionRegister;
