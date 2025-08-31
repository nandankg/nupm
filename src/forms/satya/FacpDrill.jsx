import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData, addFacpdrill } from "../../reducer/satya/FacpDrillReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json";

const FacpDrill = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const dispatch = useDispatch();

  const FacpdrillList = useSelector((state) => state.facp);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (FacpdrillList) {
      setSlug(FacpdrillList.slug);
    }
  }, [FacpdrillList]);

  const basicInitialValues = {
    date: formatDate(new Date().toDateString()),
    station: "",
    mcpno: "",
    location: "",
    alarm: "",
    from: "",
    to: "",
    name: "",
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
              FACP DRILL
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
                <h3 className="form-heading">FACP DRILL</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputstation" className="form-label">
                    Station:
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
                <div className="col-md-6">
                  <label for="inputmcpno" className="form-label">
                    MCP No.:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputmcpno"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, mcpno: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h4>Operated:</h4>
                <div className="col-md-6">
                  <label for="inputlocation" className="form-label">
                    Location/Zone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="locstionHint"
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-4">
                  <label for="radioNoLabel1" className="form-label">
                    Alarm:
                  </label>
                  <div>
                    <input
                      type="radio"
                      className="form-check-input ms-2"
                      id="radioNoLabel1"
                      value="Yes"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({ ...formValues, alarm: e.target.value })
                      }
                    />
                    Yes
                    <input
                      className="form-check-input ms-2"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="No"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          alarm: e.target.value,
                        })
                      }
                    />
                    No
                  </div>
                </div>
                <div className="row mb-3">
                  <h4>Time:</h4>
                  <div className="col-md-6">
                    <label for="inputfrom" className="form-label">
                      From
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputfromt"
                      onChange={(e) =>
                        setFormValues({ ...formValues, from: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputto" className="form-label">
                      To
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputto"
                      onChange={(e) =>
                        setFormValues({ ...formValues, to: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputname" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputname"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputremarks" className="form-label">
                    Remarks:
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
                <button type="submit" className="btn btn-primary mt-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
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

export default FacpDrill;
