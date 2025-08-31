import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  editData,
  fetchData,
} from "../reducer/ColorLightSignalMainlineReducer";

const SignalMainline_Edit = () => {
  const quarterlyActivities = [
    {
      category: "	SIGNAL & LED UNIT",

      Sno: "1",
      activity: "Cleaning of Aspect Housing & LED Unit.",
    },
    {
      category: "	SIGNAL & LED UNIT",
      Sno: "2",
      activity: "LED Functioning.",
    },
    {
      category: "	SIGNAL & LED UNIT",
      Sno: "3",
      activity: "Earthing Verification.",
    },
    {
      category: "	SIGNAL & LED UNIT",
      Sno: "4",
      activity: "Cleaning of MSB",
    },
    {
      category: "	SIGNAL & LED UNIT",
      Sno: "5",
      activity: "Tightening of all terminations inside MSB & Signal Unit",
    },
    {
      category: "	SIGNAL & LED UNIT",
      Sno: "6",
      activity: "Proper illumination of LED",
    },
    {
      category: "	SIGNAL & LED UNIT",
      Sno: "7",
      activity: "Tightening of all Nuts & Bolts including Ladder",
    },
    {
      category: "	SIGNAL & LED UNIT",
      Sno: "8",
      activity: "Healthiness of all Supports, Brackets & Foundation etc.",
    },
    {
      category: "	SIGNAL & LED UNIT",
      Sno: "9",
      activity: "Corrosion Observed/Painting Needed",
    },
  ];
  //second
  const quarterlyActivitiestwo = [
    {
      Sno: "10",
      activity: "Voltage Check in LED Unit Red Aspect",
    },
    {
      Sno: "10",
      activity: "Current Check in LED Unit Red Aspect",
    },
    {
      Sno: "10",
      activity: "Voltage Check in LED Unit Voilet Aspect",
    },
    {
      Sno: "10",
      activity: "Current Check in LED Unit Voilet Aspect",
    },
    {
      Sno: "10",
      activity: "Voltage Check in LED Unit Green Aspect",
    },
    {
      Sno: "10",
      activity: "Current Check in LED Unit Green Aspect",
    },
    //third
  ];
  const quarterlyActivitiesthree = [
    {
      category: "ROUTE INDICATOR",
      Sno: "1",
      activity: "Cleaning of Route Indicator Housing. ",
    },
    {
      category: "ROUTE INDICATOR",
      Sno: "2",
      activity: "Voltage in M-Aspect ",
    },
    {
      category: "ROUTE INDICATOR",
      Sno: "2",
      activity: "Current in M-Aspect",
    },
    {
      category: "ROUTE INDICATOR",
      Sno: "2",
      activity: "Voltage in D-Aspect ",
    },
    {
      category: "ROUTE INDICATOR",
      Sno: "2",
      activity: "Current in D-Aspect",
    },
    {
      category: "ROUTE INDICATOR",
      Sno: "2",
      activity: "Voltage in S-Aspect ",
    },
    {
      category: "ROUTE INDICATOR",
      Sno: "2",
      activity: "Current in S-Aspect ",
    },
  ];
  const quarterlyRanges = [
    "January-March",
    "April-June",
    "July-September",
    "October-December",
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState(new Date());
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const add = useSelector((state) => state.signallightstate || []);
  console.log(add.data.data);
  const [items, setItems] = useState([]);
  const itmm = add.data.data;
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(add.data.data);
  }, []);

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (add) {
      setSlug(add.slug);
    }
  }, [add]);

  useEffect(() => {
    setItems(add.data.data);
  }, [add]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const fd = filteredData[0];

  const [formValues, setFormValues] = useState({
    id: fd.id,
    signalno: fd.signalno,
    date: fd.date,
    quarterly: fd.quarterly,
    quarterlytwo: fd.quarterlytwo,
    quarterlythree: fd.quarterlythree,
    remarks: fd.remarks,
    signature: fd.signature,
    name: fd.name,
    designation: fd.designation,
    empno: fd.empno,
    countersign: fd.countersign,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  });

  console.log(formValues);
  const [quarterlyRange, setQuarterlyRange] = useState(
    fd.quarterly?.[0]?.range
  );
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

  const handleQuarterlyChange = (index, field, value, type) => {
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
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  const renderActivities = (activities, type) => {
    return activities.map((activity, index) => {
      const shouldPrintCategory =
        index === 0 || activity.category !== activities[index - 1]?.category;

      return (
        <div key={index} className="mb-3">
          {shouldPrintCategory && (
            <div className="row">
              <label className="form-label mb-1">{activity.category}</label>
            </div>
          )}
          <label
            className="form-label mb-0 d-flex justify-content-between align-items-center"
            style={{ textAlign: "left" }}
          >
            {activity.activity}
            <div className="">
              {type === "quarterlytwo" && (
                <div
                  className="d-flex gap-3"
                  style={{ position: "relative", alignItems: "center" }}
                >
                  <input
                    type="text"
                    placeholder="Enter rating"
                    className="form-control"
                    value={formValues[type][index]?.val || ""} // Ensure safe access to the value
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setFormValues((prev) => ({
                        ...prev,
                        [type]: prev[type].map((item, idx) =>
                          idx === index ? { ...item, val: newVal } : item
                        ),
                      }));
                    }}
                    style={{ width: "100%", paddingRight: "100px" }} // Add padding to accommodate select
                  />
                  <select
                    onChange={(e) => {
                      const newUnit = e.target.value;
                      setFormValues((prev) => ({
                        ...prev,
                        [type]: prev[type].map((item, idx) =>
                          idx === index ? { ...item, unit: newUnit } : item
                        ),
                      }));
                    }}
                    value={formValues[type][index]?.unit || ""}
                    style={{
                      position: "absolute",
                      right: "10px", // Adjust the distance from the right edge
                      top: "50%", // Align vertically to the middle of the input
                      transform: "translateY(-50%)", // Center vertically
                      background: "transparent",
                      border: "1px solid #ccc", // Add a visible border
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Amps">Amps</option>
                    <option value="Volts">Volts</option>
                  </select>
                </div>
              )}

              {type === "quarterlythree" && (
                <div
                  className="d-flex gap-3"
                  style={{ position: "relative", alignItems: "center" }}
                >
                  <input
                    type="text"
                    placeholder="Enter rating"
                    className="form-control"
                    value={formValues[type][index]?.val || ""} // Ensure safe access to the value
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setFormValues((prev) => ({
                        ...prev,
                        [type]: prev[type].map((item, idx) =>
                          idx === index ? { ...item, val: newVal } : item
                        ),
                      }));
                    }}
                    style={{ width: "100%", paddingRight: "100px" }} // Add padding to accommodate select
                  />
                  <select
                    onChange={(e) => {
                      const newUnit = e.target.value;
                      setFormValues((prev) => ({
                        ...prev,
                        [type]: prev[type].map((item, idx) =>
                          idx === index ? { ...item, unit: newUnit } : item
                        ),
                      }));
                    }}
                    value={formValues[type][index]?.unit || ""}
                    style={{
                      position: "absolute",
                      right: "10px", // Adjust the distance from the right edge
                      top: "50%", // Align vertically to the middle of the input
                      transform: "translateY(-50%)", // Center vertically
                      background: "transparent",
                      border: "1px solid #ccc", // Add a visible border
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Amps">Amps</option>
                    <option value="Volts">Volts</option>
                  </select>
                </div>
              )}
              {type === "quarterly" && (
                <select
                  onChange={(e) =>
                    handleQuarterlyChange(
                      index,
                      "checked",
                      e.target.value,
                      type
                    )
                  }
                  value={formValues[type][index]?.checked || ""}
                >
                  <option value="">Select</option>
                  <option value="Done">Done</option>
                  <option value="Not Done">Not Done</option>
                </select>
              )}
            </div>
          </label>
        </div>
      );
    });
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
              <h3 className="form-heading">
                EDIT COLOUR LIGHT SIGNAL MAINTENANCE RECORD QUARTERLY
              </h3>
              <div className="heading-line"></div>
            </div>
            <div className="d-flex row mb-3 ">
              <div className="col-md-3">
                <label htmlFor="month" className="form-label">
                  Month
                </label>
                <select
                  onChange={quarterlyRangeHandler}
                  value={quarterlyRange}
                  name="quarterlyRange"
                  className=""
                  style={{ margin: "0 10px 10px 0" }}
                >
                  {quarterlyRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className=" col-md-3"
                style={{ position: "relative", gap: "5px" }}
              >
                <label htmlFor="signalno" className="form-lebel">
                  Signal No.
                </label>
                <div className="d-flex align-items-center ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" input & select"
                    name="signalNo"
                    value={formValues.signalno}
                    onChange={(e) => {
                      // Only update signal number without appending the unit here
                      setFormValues({
                        ...formValues,
                        signalno: e.target.value, // Allow editing or clearing the signal number
                      });
                    }}
                  />
                  <select
                    onChange={(e) => {
                      const newRating = e.target.value;
                      if (formValues.signalno) {
                        // Append unit only if there is a signal number
                        setFormValues({
                          ...formValues,
                          signalno: `${
                            formValues.signalno.split(" ")[0]
                          } ${newRating}`.trim(), // Append unit without repeating
                          unit: newRating,
                        });
                      } else {
                        // Just update the unit if there's no signal number
                        setFormValues({
                          ...formValues,
                          unit: newRating,
                        });
                      }
                    }}
                    value={formValues.unit || ""}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "55%",
                      background: "transparent",
                      cursor: "pointer",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Rs">Rs</option>
                    <option value="Bs">Bs</option>
                  </select>
                </div>
              </div>

              <div className="col-md-3">
                <label htmlFor="org" className="form-label text-start">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="org"
                  value={formValues.date}
                  name="date"
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Render activities */}
            {renderActivities(quarterlyActivities, "quarterly")}
            {renderActivities(quarterlyActivitiestwo, "quarterlytwo")}
            {renderActivities(quarterlyActivitiesthree, "quarterlythree")}

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="inputbillNo" className="form-label">
                  Remarks
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="remarks"
                  value={formValues.remarks}
                  onChange={(e) =>
                    setFormValues({ ...formValues, remarks: e.target.value })
                  }
                />
              </div>
              <div className="row mb-3 justify-content-around">
                <div
                  className="col-md-3 d-flex"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                ></div>

                {/* <div className="col-md-3">
                  <label htmlFor="inputbillNo" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </div> */}
                {/* <div className="col-md-3">
                  <label htmlFor="inputbillNo" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="designation"
                    value={formValues.designation}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation: e.target.value,
                      })
                    }
                  />
                </div> */}
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

export default SignalMainline_Edit;
