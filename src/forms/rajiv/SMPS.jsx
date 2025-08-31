import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { addData } from "../../reducer/rajiv/SMPSReducer";
import { useDispatch, useSelector } from "react-redux";
import stationData from "../../station.json";
const smps = [
  {
    category: "Details of Maintenance Activity",
    label: "All Indications (Availabilty)",
  },
  {
    category: "Redundancy check",
    label: "Input-1 Switched OFF  & Input-2 Switch ON",
  },
  {
    category: "Redundancy check",
    label: "Output Voltage",
  },
  {
    category: "Redundancy check",
    label: "Input-1 Switched ON & Input-2 Switch OFF",
  },
  {
    category: "Redundancy check",
    label: "Output Voltage",
  },
];

const ranges = ["Jan-Jun", "Jul-Dec"];

function FalseFloorSixMonthly() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Range, setRange] = useState("Jan-Jun");
  const [slug, setSlug] = useState("");
  const list = useSelector((state) => state.SMPS);
  useEffect(() => {
    if (list) {
      setSlug(list.slug);
    }
  }, [list]);
  console.log(slug);
  console.log(list);
  const [formValues, setFormValues] = useState({
    smps: "",
    station: "",
    date: "",
    activity: smps.map(() => ({
      range: "Jan-Jun",
      value: "",
    })),
    remarks: "",
    signature: "",
    name: "",
    designation: "",
    empno: "",
    csign: "",
  });

  const quarterlyRangeHandler = (event) => {
    const value = event.target.value;
    setRange(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      activity: prevValues.activity.map((activity) => ({
        ...activity,
        range: value,
      })),
    }));
  };

  const handleChange = (index, field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      activity: prevValues.activity.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleRemarkChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
    // Submit formValues with your API
  };
  console.log(formValues);
  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            SMPS SIX MONTHLY MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div
          className="form-container"
          style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-2">
                <select
                  name="quarterlyRange"
                  onChange={quarterlyRangeHandler}
                  value={Range}
                  style={{ width: "200px" }}
                >
                  {ranges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                </div>
                <div className="col-md-2">
                <input
                  type="date"
                  name="date"
                  className=" mx-3"
                  required
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  }
                />
                </div>
                <div className="col-md-2  mx-3">
                <input
                  type="text"
                  name="smps"
                  className=" mx-3"
                  onChange={(e) =>
                    setFormValues({ ...formValues, smps: e.target.value })
                  }
                  placeholder="Enter SMPS No."
                />
              </div>
              <div className="col-md-4  mx-3">
                  

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
            
            {smps.map((activity, index) =>
              index == 1 ? (
                <>
                  <div className="row mb-3">
                    <labe className="form-label">Redundancy check</labe>
                  </div>
                  <div key={index} className="mb-3">
                    <label
                      className="form-label mb-0 d-flex justify-content-between align-items-center"
                      style={{ textAlign: "left" }}
                    >
                      {activity.label}
                      <div className="d-flex gap-3">
                        <input
                          type="text"
                          name={`value-${index}`}
                          onChange={(e) =>
                            handleChange(index, "value", e.target.value)
                          }
                          value={formValues.activity[index].value}
                        />
                      </div>
                    </label>
                  </div>
                </>
              ) : (
                <div key={index} className="mb-3">
                  <label
                    className="form-label mb-0 d-flex justify-content-between align-items-center"
                    style={{ textAlign: "left" }}
                  >
                    {activity.label}
                    <div className="d-flex gap-3">
                      <input
                        type="text"
                        name={`value-${index}`}
                        onChange={(e) =>
                          handleChange(index, "value", e.target.value)
                        }
                        value={formValues.activity[index].value}
                      />
                    </div>
                  </label>
                </div>
              )
            )}
            <div className="row my-3">
              <div className="col-md-12">
                <label>Remarks:</label>
                <input
                  type="text"
                  name="remarks"
                  className="form-control"
                  value={formValues.remarks}
                  onChange={(e) =>
                    handleRemarkChange("remarks", e.target.value)
                  }
                />
              </div>
            </div>
            {/* <div className="row my-3">
              <div className="col-md-3">
                <label className="form-label">Signature:</label>
                <input
                  type="text"
                  name="signature"
                  className="form-control"
                  value={formValues.signature}
                  onChange={(e) =>
                    setFormValues({ ...formValues, signature: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Designation:</label>
                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  value={formValues.designation}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      designation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Counter Sign:</label>
                <input
                  type="text"
                  name="csign"
                  className="form-control"
                  value={formValues.csign}
                  onChange={(e) =>
                    setFormValues({ ...formValues, csign: e.target.value })
                  }
                />
              </div>
            </div> */}
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FalseFloorSixMonthly;
