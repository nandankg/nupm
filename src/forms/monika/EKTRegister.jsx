import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/monika/EKTReducer";

const halfYearlyActivities = [
  { category: "STATUS", activity: "EKT Functional Test" },
  { category: "STATUS ", activity: "Cleaning of EKT box" },
  {
    category: " STATUS",
    activity: "Checking of EKT box LED status",
  },
  {
    category: "STATUS",
    activity: "Checking of proper functioning of EKT Switch",
  },
  {
    category: "STATUS",
    activity: "EKT removal/insertion from VDU",
  },
  {
    category: "STATUS",
    activity: "EKT removal/insertion from ATS",
  },
  {
    category: "STATUS",
    activity: "Checking of any abnormality, wear tear of EKT box",
  },
];

const quarterlyRanges = ["January-April", "May-August", "September-December"];
const halfYearlyRanges = ["January-June", "July-December"];

function EKTRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [periodicity, setPeriodicity] = useState("Biweekly");
  const [biweeklyMonth, setBiweeklyMonth] = useState("January");
  const [monthlyMonth, setMonthlyMonth] = useState("January");
  const [quarterlyRange, setQuarterlyRange] = useState("January-April");
  const [halfYearlyRange, setHalfYearlyRange] = useState("January-June");
  const EKTList = useSelector((state) => state.EKTRegister);

  // Date picker
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading 0 for months < 10
    const day = String(today.getDate()).padStart(2, "0"); // Add leading 0 for days < 10
    return `${year}-${month}-${day}`;
  };

  // Initialize state with the current date
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (EKTList) {
      setSlug(EKTList.slug);
    }
  }, [EKTList]);

  const [formValues, setFormValues] = useState({
    pointNo: "",

    halfYearly: halfYearlyActivities.map(() => ({
      range: "January-June",
      status: "",
    })),
    ektNo: "",
    ixl: "",
    date: "",
    remarks: "",
    signature: "sign",
    name: "",
    designation: "",
    empno: "",
    csign: "",
  });

  const selectHandler = (event) => {
    const value = event.target.value;
    setPeriodicity(value);
    if (value === "Quarterly" || value === "Half Yearly") {
      setBiweeklyMonth("");
      setMonthlyMonth("");
    }
  };

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

  const halfYearlyRangeHandler = (event) => {
    const value = event.target.value;
    setHalfYearlyRange(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      halfYearly: prevValues.halfYearly.map((activity) => ({
        ...activity,
        range: value,
      })),
    }));
  };

  const biweeklyMonthHandler = (event) => {
    const value = event.target.value;
    setBiweeklyMonth(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      biweekly: prevValues.biweekly.map((activity) => ({
        ...activity,
        month: value,
      })),
    }));
  };

  const monthlyMonthHandler = (event) => {
    const value = event.target.value;
    setMonthlyMonth(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      monthly: prevValues.monthly.map((activity) => ({
        ...activity,
        month: value,
      })),
    }));
  };

  const handleChange = (index, field, value, type) => {
    console.log(index);
    console.log(field);
    console.log(value);
    console.log(type);
    setFormValues((prevValues) => ({
      ...prevValues,
      [type]: prevValues[type].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
    console.log(formValues);
    // Submit formValues with your API
  };

  console.log(formValues);

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            EKT Maintenance
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div
          className="form-container "
          style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-3">
              <label htmlFor="date">Range</label>
                <select
                  name="halfYearlyRange"
                  className="form-control"
                  onChange={halfYearlyRangeHandler}
                  value={halfYearlyRange}
                >
                  {halfYearlyRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="date">Select a date</label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  
                  name="date"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputbillNo" className="form-label">
                  Point No.
                </label>
                <input
                  type="number"
                  className="form-control"
                  nmae="pointNo"
                  min="1"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      pointNo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputbillNo" className="form-label">
                  IXL-
                </label>
                <select 
                className="form-control"
                  name="ixl"
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues, ixl: e.target.value })
                  }>
<option value="tpnr">tpnr</option>
        <option value="tpd">tpd</option> 
        <option value="hsgj">hsgj</option>
        <option value="idnm">idnm</option>  
                </select>
                
              </div>
            </div>
            {halfYearlyActivities.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== halfYearlyActivities[index - 1].category;

              return (
                <div key={index} className="mb-3">
                  {shouldPrintCategory && (
                    <div className="row">
                      <label className=" form-label mb-1">
                        {activity.category}
                      </label>
                    </div>
                  )}
                  <label
                    className="form-label mb-0 d-flex justify-content-between align-items-center"
                    style={{ textAlign: "left" }}
                  >
                    {activity.activity}
                    <div className="flex">
                      {/* <input
                          type="date"
                          name={`halfYearlyActivity${index + 1}Date`}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "date",
                              e.target.value,
                              "halfYearly"
                            )
                          }
                          value={formValues.halfYearly[index].date}
                        /> */}
                      <select
                        name={`halfYearlyActivity${index + 1}status`}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "status",
                            e.target.value,
                            "halfYearly"
                          )
                        }
                        value={formValues.halfYearly[index].status}
                      >
                        <option value="">Select</option>
                        <option value="Checked Ok">Checked Ok</option>
                        <option value="Checked Not Ok">Checked Not Ok</option>
                      </select>
                    </div>
                  </label>
                </div>
              );
            })}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="inputbillNo" className="form-label">
                  EKT No-
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="ektNo"
                  min="1"
                  onChange={(e) =>
                    setFormValues({ ...formValues, ektNo: e.target.value })
                  }
                />
              </div>
              <div className="col-md-8">
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
              </div>
            </div>{" "}
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EKTRegister;
