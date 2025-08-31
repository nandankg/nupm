import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, editData } from "../../reducer/monika/EKTReducer";

function EKTEdit() {
  const location = useLocation();
  const { id } = location.state;
  const [slug, setSlug] = useState("");

  const EKTList = useSelector((state) => state.EKTRegister);
  console.log(EKTList.data.data);
  const [items, setItems] = useState([]);
  const [systems, setSystems] = useState([]);
  const itmm = EKTList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(EKTList.data.data);
  }, []);
  useEffect(() => {
    setItems(EKTList.data.data);
    setSlug(EKTList.slug);
  }, [EKTList]);
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

  const halfYearlyActivities = [
    { category: " EKT No", activity: "EKT Functional Test" },
    { category: " EKT No ", activity: "Cleaning of EKT box" },
    {
      category: " EKT No",
      activity: "Checking of EKT box LED status",
    },
    {
      category: "EKT No",
      activity: "Checking of proper functioning of EKT Switch",
    },
    {
      category: "EKT No",
      activity: "EKT removal/insertion from VDU",
    },
    {
      category: "EKT No",
      activity: "EKT removal/insertion from ATS",
    },
    {
      category: "EKT No",
      activity: "Checking of any abnormality, wear tear of EKT box",
    },
  ];

  const halfYearlyRanges = ["January-June", "July-December"];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [periodicity, setPeriodicity] = useState("Biweekly");
  const [biweeklyMonth, setBiweeklyMonth] = useState("January");
  const [monthlyMonth, setMonthlyMonth] = useState("January");
  const [quarterlyRange, setQuarterlyRange] = useState("January-April");
  const [formValues, setFormValues] = useState({
    id: fd.id,
    pointNo: fd.pointNo,
    biweekly: fd.biweekly,
    monthly: fd.monthly,
    quarterly: fd.quarterly,
    halfYearly: fd.halfYearly,
    ektNo: fd.ektNo,
    ixl: fd.ixl,
    remarks: fd.remarks,
    signature: fd.signature,
    name: fd.name,
    date: fd.date,
    designation: fd.designation,
    empno: fd.empno,
    csign: fd.csign,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  });
  const [halfYearlyRange, setHalfYearlyRange] = useState(
    fd?.halfYearly?.[0]?.range
  );

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
    setFormValues((prevValues) => ({
      ...prevValues,
      [type]: prevValues[type].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };
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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
    console.log(formValues);
    // Submit formValues with your API
  };
  console.log(formValues);

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/">
            EKT Maintenance
          </Link>
          <Link underline="hover" color="inherit">
            Edit
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
                  value={selectedDate}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputbillNo" className="form-label">
                  Point No.
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="pointNo"
                  value={formValues.pointNo}
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
                <input
                  type="text"
                  className="form-control"
                  name="ixl"
                  value={formValues.ixl}
                  onChange={(e) =>
                    setFormValues({ ...formValues, ixl: e.target.value })
                  }
                />
              </div>
            </div>
            {halfYearlyActivities?.map((activity, index) => {
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
                        value={formValues?.halfYearly?.[index].status}
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
                  value={formValues.ektNo}
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
                  value={formValues.remarks}
                  onChange={(e) =>
                    setFormValues({ ...formValues, remarks: e.target.value })
                  }
                />
              </div>
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EKTEdit;
