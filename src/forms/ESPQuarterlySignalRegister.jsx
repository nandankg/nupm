import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { Category, InsertEmoticon } from "@mui/icons-material";
import { addData } from "../reducer/ESPQuarterlyMaintananceSignalReducer";
import stations from "../data/station.json";

const espquateractivity = [
  {
    category: "Details of Maintenance Activity",
    activity: "ESP Functional Test",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "LED status",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Condition of glass,hammer,chain",
  },
  // {
  //   category: "Details of Maintenance Activity",
  //   activity: "ESP Functional Test",
  // },
  // {
  //   category: "Details of Maintenance Activity",
  //   activity: "LED status",
  // },
  // {
  //   category: "Details of Maintenance Activity",
  //   activity: "Condition of glass,hammer,chain",
  // },
  // {
  //   category: "Details of Maintenance Activity",
  //   activity: "ESP Functional Test",
  // },
  // {
  //   category: "Details of Maintenance Activity",
  //   activity: "LED status",
  // },
  // {
  //   category: "Details of Maintenance Activity",
  //   activity: "Condition of glass,hammer,chain",
  // },
];
const quarterlyRanges = [
  "Select",
  "January-March",
  "April-June",
  "July-September",
  "October-December",
];

const ESPQuaterlyMaintanance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const espquarterly = useSelector((state) => state.espquarterlystate || []);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (espquarterly) {
      setSlug(espquarterly.slug);
    }
  }, [espquarterly]);

  const [quarterlyRange, setQuarterlyRange] = useState("Januarary-March");
  const [formValues, setFormValues] = useState({
    station: "",
    date: "",

    quarterly: espquateractivity.map(() => ({
      range: "January-March",
      checked: "",
      val: "",
    })),
    remarks: "",
    signature: "",
    name: "",
    designation: "",
    empno: "",
    countersign: "",
    employee_id: "",
    department: "",
    unit: "",
  });
  
  const quarterlyRangeHandler = (event) => {
    const value = event.target.value;
    setQuarterlyRange(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      quarterly: prevValues.quarterly.map((activity) => ({
        ...activity,
        range: value,
      })),
    }));
  };

  const handleChange = (index, field, value, type) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [type]: prevValues[type].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="form-container "
          style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">ESP QUARTERLY MAINTENANCE RECORD</h3>
              <div className="heading-line"></div>
            </div>
            <div className="d-flex row mb-3 justify-content-between">
              <div className="col-md-3">
                <label htmlFor="station" className="form-label">
                  Station
                </label>
                <select
                  id="station"
                  name="station"
                  className="form-control"
                  style={{ margin: "0 10px 10px 0", paddingRight: "50px" }}
                  value={formValues.station}
                  onChange={(e) =>
                    setFormValues({ ...formValues, station: e.target.value })
                  }
                >
                  <option value="">Select Station</option>
                  {stations.map(
                    (station, index) =>
                      station["Station Name"] && (
                        <option key={index} value={station["STATION Code"]}>
                          {station["Station Name"]}
                        </option>
                      )
                  )}
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="month" className="form-label">
                  Month
                </label>
                <select
                  onChange={quarterlyRangeHandler}
                  value={quarterlyRange}
                  name="quarterlyRange"
                  className="form-control"
                  style={{ margin: "0 10px 10px 0" }}
                >
                  {quarterlyRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2 float-end">
                <label htmlFor="org" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  required
                  className="form-control"
                  id="org"
                  name="date"
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  }
                />
              </div>
            </div>
            {espquateractivity.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== espquateractivity[index - 1].category;

              // ||quarterlyActivities[index - 1].category;

              return (
                <div key={index} className="mb-3">
                  {shouldPrintCategory && (
                    <div className="row">
                      <label className="form-label mb-1">
                        {activity.category}
                        {/* {activity.Sno} */}
                      </label>
                    </div>
                  )}
                  <label
                    className="form-label mb-0 d-flex justify-content-between align-items-center"
                    style={{ textAlign: "left" }}
                  >
                    {activity.activity}
                    <div className="d-flex gap-3 col-md-4">
                      <select
                        className=" "
                        id="dept"
                        name="dept"
                        onChange={(e) =>
                          handleChange(
                            index,
                            "val",
                            e.target.value,
                            "quarterly"
                          )
                        }
                        value={formValues.quarterly[index].val}
                      >
                        <option value="">Select</option>
                        <option value="ESP DN">ESP DN</option>
                        <option value="ESP UP">ESP UP</option>
                        <option value="ESP SCR">ESP SCR</option>
                      </select>

                      <select
                        className=" "
                        id="dept"
                        name="dept"
                        onChange={(e) =>
                          handleChange(
                            index,
                            "checked",
                            e.target.value,
                            "quarterly"
                          )
                        }
                        value={formValues.quarterly[index].checked}
                      >
                        <option value="">Select</option>
                        <option value="Done">Done</option>
                        <option value="Checked Okay">Checked okay</option>
                        <option value="Checked NOK">checked NOK</option>
                        <option value="N/A">N/A</option>
                      </select>
                      {/* <input
                        type="date"
                        onChange={(e) =>
                          handleChange(
                            index,
                            "date",
                            e.target.value,
                            "quarterly"
                          )
                        }
                        value={formValues.quarterly[index].date}
                      /> */}
                    </div>
                  </label>
                </div>
              );
            })}
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
                <br />
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
  );
};
export default ESPQuaterlyMaintanance;
