import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addData,
  editData,
  fetchData,
} from "../reducer/ESPQuarterlyMaintananceSignalReducer";
import { unix } from "dayjs";
import stations from "../data/station.json";

const quarterlyRanges = [
  "January-March",
  "April-June",
  "July-September",
  "October-December",
];
const ESP_Quarterly_Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  console.log(id);
  const add = useSelector((state) => state.espquarterlystate || []);
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
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => itm.id === id);
    console.log(filteredData);

    if (filteredData.length > 0) {
      // Check if the filteredData array has elements
      console.log(filteredData[0]);
    } else {
      console.log("No matching data found for the provided ID");
    }
  }

  const fd = filteredData && filteredData.length > 0 ? filteredData[0] : {};
  const basicInitialValues = {
    id: fd.id,
    station: fd.station,
    date: fd.date,
    quarterly: fd.quarterly,
    remarks: fd.remarks,
    signature: fd.signature,
    name: fd.name,
    designation: fd.designation,
    empno: fd.empno,
    countersign: fd.countersign,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  };
  const [quarterlyRange, setQuarterlyRange] = useState(
    fd?.quarterly?.[0]?.range
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

  const handleChange = (index, field, value, type) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [type]: prevValues[type].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

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
  ];

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
                EDIT ESP QUARTERLY MAINTENANCE RECORD
              </h3>
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
                  className=""
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
                  value={formValues.quarterlyRange || quarterlyRange}
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
                  className="form-control"
                  value={formValues.date}
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
                  value={formValues.remarks}
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

export default ESP_Quarterly_Edit;
