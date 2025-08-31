import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/akshra/FalsefloorReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { createSelector } from "reselect";

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

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditFalsefloor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const ffcl = useSelector((state) => state.signallightstate);

  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);
  
  console.log(ffcl.data.data);
  const [items, setItems] = useState([]);
  const itmm = ffcl.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(ffcl.data.data);
  }, []);
  useEffect(() => {
    setItems(ffcl.data.data);
  }, [ffcl]);
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
  const [halfyearlyRange, setHalfyearlyRanges] = useState("January-June");
  const basicInitialValues = {
    id: fd.id,
    station: fd.station,
    date: fd.date,
    halfyearly: fd.halfyearly,
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
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
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
                    <option>{formValues.station} </option>
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
                    value={formValues.date}
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

export default EditFalsefloor;
