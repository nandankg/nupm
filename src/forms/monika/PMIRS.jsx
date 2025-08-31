import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { addData } from "../../reducer/monika/PMIRSReducer";
import { useDispatch, useSelector } from "react-redux";
import stationData from "../../station.json";
import { useNavigate } from "react-router-dom";
const biweeklyActivities = [
  {
    category: "Cleaning",
    activity: "Cleaning the area surrounding the IRS (debris…)",
  },
  {
    category: "Cleaning",
    activity: "Cleaning inside the IRS any accumulation of dust",
  },
  {
    category: "Cleaning",
    activity: "Cleaning inside the IRS any surplus of old grease",
  },
  {
    category: "Checks",
    activity: "Security",
  },
  {
    category: "Checks",
    activity: "Condition / Deterioration",
  },
  {
    category: "Checks",
    activity: "Obstructions	",
  },
  {
    category: "Checks",
    activity: "Condition of rods for proper working ",
  },
  {
    category: "Checks",
    activity: "Detection 2 MM / 5 MM",
  },
  {
    category: "Checks",
    activity: "Presence of Oil / Moisture",
  },
  {
    category: "Checks",
    activity: "Turnout itself in good condition",
  },
  {
    category: "Checks",
    activity: "Blades and Stock-Rails in good condition",
  },
  {
    category: "Checks",
    activity: "Absence of any abnormal appearance",
  },
  {
    category: "Checks",
    activity:
      "Absence of ballast & debris obstructing the movement of Claw Locks",
  },
  {
    category: "Checks",
    activity: "Cleaning of surplus of old grease",
  },
  {
    category: "Checks",
    activity: "Contact between Tongue and Stock-Rails (Less than 1.5 mm gap)",
  },
];

const monthlyActivities = [
  {
    category: "Maintenance of IRS point machine",
    activity: "Oiling of Reduction Gearing",
  },
  {
    category: "Maintenance of IRS point machine",
    activity: "Greasing of the All gears",
  },
  {
    category: "Maintenance of IRS point machine",
    activity: "Cleaning and greasing of Drive bar",
  },
  {
    category: "Maintenance of IRS point machine",
    activity: "Cleaning and greasing of Detector bar ",
  },
  {
    category: "Maintenance of IRS point machine",
    activity: "Cleaning and greasing of Locking bar ",
  },
  {
    category: "Maintenance of IRS point machine",
    activity: "Power Operation ",
  },
  {
    category: "Maintenance of IRS point machine",
    activity: "Manual Operation ",
  },
  {
    category: "Maintenance of IRS point machine",
    activity: "Tightning of electrical termination.",
  },
  {
    category: "Maintenance of IRS point machine",
    activity: "Detection 2 MM / 5 MM",
  },
  {
    category: "Maintenance of IRS point machine",
    activity: "Opening (Left in mm)",
  },
  {
    category: "Maintenance of IRS point machine",
    activity: "Opening (Right in mm)",
  },

  {
    category: "Maintenance of Claw Locks",
    activity: "Condition and tightening of all fastening",
  },
  {
    category: "Maintenance of Claw Locks",
    activity: "Presence and condition of all split pins",
  },

  {
    category: "Maintenance of Drives and Back-Drives",
    activity: "Condition and tighting of all bolts",
  },
  {
    category: "Maintenance of Drives and Back-Drives",
    activity: "Condition of all rods",
  },
  {
    category: "Maintenance of Drives and Back-Drives",
    activity: "Presence and tightening of all bolts securing adjusting forks",
  },
  {
    category: "Maintenance of Drives and Back-Drives",
    activity: "Presence and condition of all split pins",
  },
];

const quarterlyActivities = [
  {
    category: "Cleaning and Lubrication",
    activity: "Greasing of the worm and worm-wheel",
  },
  {
    category: "Cleaning and Lubrication",
    activity: "Cleaning of commutator ",
  },
  {
    category: "Cleaning and Lubrication",
    activity: "Incoming Power Cable",
  },
  {
    category: "Cleaning and Lubrication",
    activity:
      "Visual Inspection of Electrical Contacts Assmbly for accumilation of carbon ",
  },
  {
    category: "Cleaning and Lubrication",
    activity: "External adequate Lubrication",
  },
  {
    category: "Cleaning and Lubrication",
    activity: "Electrical Connections",
  },
  {
    category: "Cleaning and Lubrication",
    activity: "Quarterly Use Manual operation",
  },
  {
    category: "Cleaning and Lubrication",
    activity: "Detection Contacts & Rollers-Visual check",
  },

  {
    category: "Maintenance of Claw Locks:-",
    activity: "Checking wearing of Claw-Locks",
  },
  {
    category: "Maintenance of Claw Locks:-",
    activity: "Cleaning and Lubrication",
  },
  {
    category: "Maintenance of Claw Locks:-",
    activity: "Cleaning of surplus of old grease and dust",
  },
  {
    category: "Maintenance of Claw Locks:-",
    activity: "Greasing of Locking Parts corridors",
  },
  {
    category: "Maintenance of Claw Locks:-",
    activity: "Greasing of Sliding surfaces of Locking Clips",
  },
  {
    category: "Maintenance of Claw Locks:-",
    activity: "Greasing of eccentric axle (With a M10 Greaser & Grease Gun)",
  },

  {
    category: "Measurements",
    activity: "Measurement of peak current (N)",
  },
  {
    category: "Measurements",
    activity: "Measurement of peak current (R)",
  },
  {
    category: "Measurements",
    activity: "Measurement of working current (N)",
  },
  {
    category: "Measurements",
    activity: "Measurement of working current ( R)",
  },
  {
    category: "Measurements",
    activity: "Measurement of obstruction current (N)",
  },

  {
    category: "Measurements",
    activity: "Measurement of obstruction current (R)",
  },
  {
    category: "Measurements",
    activity: "Measurement of working Voltage (R)",
  },
  {
    category: "Measurements",
    activity: "Measurement of working Voltage (N)",
  },
  {
    category: "Maintenance of PMDB",
    activity: "PMDB Cleaning and Checking of proper dressing",
  },
  {
    category: "Maintenance of PMDB",
    activity: "Verification of terminal condition and Earthing of Box",
  },
  {
    category: "Maintenance of PMDB",
    activity: "Verification of availability of connection details in the Box",
  },
];

const quarterlyRanges = ["January-April", "May-August", "September-December"];

function PMIRS() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [periodicity, setPeriodicity] = useState("Biweekly");
  const [biweeklyMonth, setBiweeklyMonth] = useState("January");
  const [monthlyMonth, setMonthlyMonth] = useState("January");
  const [quarterlyRange, setQuarterlyRange] = useState("January-April");
  const [halfYearlyRange, setHalfYearlyRange] = useState("January-June");
  const PMIRSList = useSelector((state) => state.PMIRS);

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
    if (PMIRSList) {
      setSlug(PMIRSList.slug);
    }
  }, [PMIRSList]);

  const [formValues, setFormValues] = useState({
    station:"",
    pointNo: "",
    biweekly: biweeklyActivities.map(() => ({
      month: "January",
      status: "",
    })),
    monthly: monthlyActivities.map(() => ({
      month: "January",
      status: "",
    })),
    quarterly: quarterlyActivities.map(() => ({
      range: "January-April",
      status: "",
    })),

    ektNo: "",
    ixl: "",
    date: selectedDate,
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
            Point Machine maintenance record Depot Point Machine(IRS)
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
            <select
              onChange={selectHandler}
              value={periodicity}
              name="periodicity"
              className=""
              style={{ margin: "0 10px 10px 0" }}
            >
              <option value="Biweekly">Biweekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
            {periodicity === "Quarterly" && (
              <select
                name="quarterlyRange"
                onChange={quarterlyRangeHandler}
                value={quarterlyRange}
              >
                {quarterlyRanges.map((range, index) => (
                  <option key={index} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            )}
            {periodicity === "Biweekly" && (
              <>
                <select
                  name="biweeklyMonth"
                  onChange={biweeklyMonthHandler}
                  value={biweeklyMonth}
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label htmlFor="date">Select a date:</label>
                    <input type="date" id="date" value={selectedDate} />
                  </div>
                  <div className="col-md-2">
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
                  <div className="col-md-2">
                    <label htmlFor="inputbillNo" className="form-label">
                      IXL-
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="ixl"
                      min="1"
                      onChange={(e) =>
                        setFormValues({ ...formValues, ixl: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                <label htmlFor="inputSendto" className="form-label">
                 Station
                </label>
                <select
                  
                  className="form-control"
                  
                  id="inputSendto"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,station: e.target.value })
                  }
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

                {biweeklyActivities.map((activity, index) => {
                  const shouldPrintCategory =
                    index === 0 ||
                    activity.category !==
                      biweeklyActivities[index - 1].category;

                  return (
                    <div key={index} className=" mb-3">
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
                        <div className="d-flex gap-3">
                          {/* <input
                            type="date"
                            name={`biweeklyActivity${index + 1}Date1`}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "date1",
                                e.target.value,
                                "biweekly"
                              )
                            }
                            value={formValues.biweekly[index].date1}
                          />
                          <input
                            type="date"
                            name={`biweeklyActivity${index + 1}Date2`}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "date2",
                                e.target.value,
                                "biweekly"
                              )
                            }
                            value={formValues.biweekly[index].date2}
                          /> */}
                          <select
                            name={`biweeklyActivity${index + 1}status`}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "status",
                                e.target.value,
                                "biweekly"
                              )
                            }
                            value={formValues.biweekly[index].status}
                          >
                            <option value="">Select</option>
                            <option value="Done">
                              Done
                            </option>
                            <option value="Checked Ok">Checked Ok</option>
                            <option value="Checked Not Ok">
                              Checked Not Ok
                            </option>
                          </select>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </>
            )}
            {periodicity === "Monthly" && (
              <>
                <select
                  name="monthlyMonth"
                  onChange={monthlyMonthHandler}
                  value={monthlyMonth}
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>

                <div className="row mb-3">
                  <div className="col-md-2">
                    <label htmlFor="date">Select a date:</label>
                    <input type="date" id="date" value={selectedDate} />
                  </div>
                  <div className="col-md-2">
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
                  <div className="col-md-2">
                    <label htmlFor="inputbillNo" className="form-label">
                      IXL-
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="ixl"
                      onChange={(e) =>
                        setFormValues({ ...formValues, ixl: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                <label htmlFor="inputSendto" className="form-label">
                 Station
                </label>
                <select
                  
                  className="form-control"
                  
                  id="inputSendto"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,station: e.target.value })
                  }
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

                {monthlyActivities.map((activity, index) => {
                  const shouldPrintCategory =
                    index === 0 ||
                    activity.category !== monthlyActivities[index - 1].category;

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
                        {activity.activity}:
                        <div className="flex">
                          {/* <input
                            type="date"
                            name={`monthlyActivity${index + 1}Date`}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "date",
                                e.target.value,
                                "monthly"
                              )
                            }
                            value={formValues.monthly[index].date}
                          /> */}
                          <select
                            name={`monthlyActivity${index + 1}status`}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "status",
                                e.target.value,
                                "monthly"
                              )
                            }
                            value={formValues.monthly[index].status}
                          >
                            <option value="">Select</option>
                            <option value="Done">
                              Done
                            </option>
                            <option value="Checked Ok">Checked Ok</option>
                            <option value="Checked Not Ok">
                              Checked Not Ok
                            </option>
                          </select>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </>
            )}
            {periodicity === "Quarterly" && (
              <>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label htmlFor="date">Select a date:</label>
                    <input type="date" id="date" value={selectedDate} />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputbillNo" className="form-label">
                      Point No.
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      nmae="pointNo"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          pointNo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputbillNo" className="form-label">
                      IXL-
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="ixl"
                      onChange={(e) =>
                        setFormValues({ ...formValues, ixl: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                <label htmlFor="inputSendto" className="form-label">
                 Station
                </label>
                <select
                  
                  className="form-control"
                  
                  id="inputSendto"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,station: e.target.value })
                  }
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

                {quarterlyActivities.map((activity, index) => {
                  const shouldPrintCategory =
                    index === 0 ||
                    activity.category !==
                      quarterlyActivities[index - 1].category;

                  return (
                    <div key={index} className="mb-3">
                      {shouldPrintCategory && (
                        <div className="row">
                          <label className="form-label mb-1">
                            {activity.category}
                          </label>
                        </div>
                      )}
                      <label
                        className="form-label mb-0 d-flex justify-content-between align-items-center"
                        style={{ textAlign: "left" }}
                      >
                        {activity.activity}

                        <div className="d-flex gap-3">
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
                          <select
                            onChange={(e) =>
                              handleChange(
                                index,
                                "status",
                                e.target.value,
                                "quarterly"
                              )
                            }
                            value={formValues.quarterly[index].status}
                          >
                            <option value="">Select</option>
                            <option value="Done">
                              Done
                            </option>
                            <option value="Checked Ok">Checked Ok</option>
                            <option value="Checked Not Ok">
                              Checked Not Ok
                            </option>
                          </select>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </>
            )}
            {periodicity === "Half Yearly" && (
              <>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label htmlFor="date">Select a date</label>
                    <input type="date" id="date" value={selectedDate} />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputbillNo" className="form-label">
                      Point No.
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      nmae="pointNo"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          pointNo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputbillNo" className="form-label">
                      IXL-
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="ixl"
                      onChange={(e) =>
                        setFormValues({ ...formValues, ixl: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            )}
            ;
            <div className="row mb-3">
              <div className="col-md-6">
                
              </div>
              <div className="col-md-6">
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

export default PMIRS;
