import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addData } from "../../reducer/akshra/FalsefloorReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import stations from "../../station.json";
const falsehalfactivity = [
  {
    category: "Details of Maintenance Activity",
    activity: "Cleaning of under false floor in SER",
  },
  {
    category: "Details of Maintenance Activity",
    activity:
      "Checking of proper routing of under false floor cables/Wires through cable tray",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Checking for openings/ holes in rooms for Rat/Rodent entry",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Checking for possible water entry/seepage in rooms",
  },
];
const halfyearlyRanges = ["January-June", "July-December"];

const UnderFalseFloorCleaning = () => {
  const navigate = useNavigate();

  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const FalseFloorCleaningList = useSelector((state) => state.falsefloor || []);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (FalseFloorCleaningList) {
      setSlug(FalseFloorCleaningList.slug);
    }
  }, [FalseFloorCleaningList]);

  const [halfyearlyRange, setHalfyearlyRanges] = useState("January-June");
  const [formValues, setFormValues] = useState({
    station: "",
    date: "",
    halfyearly: falsehalfactivity.map(() => ({
      range: "January-June",
      checked: "",
      val: "",
    })),
    remarks: "",
    //signature: "",
    name: "",
    designation: "",
    empno: "",
    countersign: "",
    employee_id: "",
    department: "",
    unit: "",
  });
  const halfyearlyRangeHandler = (event) => {
    const value = event.target.value;
    setHalfyearlyRanges(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      halfyearly: prevValues.halfyearly.map((activity) => ({
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
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Measurement of Voltage at MCB in PDC SIX MONTHLY MAINTENANCE
              RECORD
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  Under False Floor Cleaning Six Monthly Maintenance Record{" "}
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="d-flex row mb-3">
                <div className="col-md-2 ml-5">
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
                    {stations.map((station, index) => (
                      <option key={index} value={station["STATION Code"]}>
                        {station["Station Name"] || station["STATION Code"]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="month" className="form-label">
                    Month
                  </label>
                  <select
                    onChange={halfyearlyRangeHandler}
                    value={halfyearlyRange}
                    name="halfyearlyRanges"
                    className=""
                    style={{ margin: "0 10px 10px 0" }}
                  >
                    {halfyearlyRanges.map((range, index) => (
                      <option key={index} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2 " style={{ marginLeft: "600px" }}>
                  <label htmlFor="org" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="org"
                    name="date"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
              </div>
              {falsehalfactivity.map((activity, index) => {
                const shouldPrintCategory =
                  index === 0 ||
                  activity.category !== falsehalfactivity[index - 1].category;
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
                              "checked",
                              e.target.value,
                              "halfyearly"
                            )
                          }
                          value={formValues.halfyearly[index].checked}
                        >
                          <option>Done</option>
                          <option>Checked okay</option>
                          <option>checked NOK</option>
                          <option>N/A</option>
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
                <div className="col-md-3">
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
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputbillNo" className="form-label">
                    Employee No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="empno"
                    value={formValues.empno}
                    onChange={(e) =>
                      setFormValues({ ...formValues, empno: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
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
                </div>

                {/*<div className="col-md-3">
                  <label htmlFor="inputbillNo" className="form-label">
                    Signature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="sign"
                    value={formValues.signature}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signature: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="row mb-3"></div>
                <div className="col-md-4">
                  <label htmlFor="inputbillNo" className="form-label">
                    Counter Signature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="csign"
                    value={formValues.countersign}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        countersign: e.target.value,
                      })
                    }
                  />
                </div>*/}
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

export default UnderFalseFloorCleaning;
