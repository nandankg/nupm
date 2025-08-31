import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../reducer/rajiv/QuarterlyTrainInspection";
const quarterlyActivities1 = [
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity:
      "Genreal Condition of Metallic Support for fixing Dampers with Train Body",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity:
      "TTightness of all screws and fixing of Metallic Support with train body",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Physical Condition of Dampers",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity:
      "Tightness of all screws & fixing of Dampers with the Metallic support (Torque 19Nm) ",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Screws lengths inside the dampers (must be <5mm)",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity:
      "Tightness of all screws & Fixing of dampers with Lateral plates (Torque 19Nm)",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity:
      "Fixing of STF-DL Antenna with the lateral plates & tightness of all screws (Torque 21Nm)",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Locking of the screws  & availability  of lock washers : “Nord-",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Physical Condition of STF-DL Antenna",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Fixing of grounding braid to the conductor point on the support",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Tightness of SAIB connector (STF-DL Antenna side)",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Tightness of SAIB connector (Car Body Side)",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Clamping of jumper cable",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity:
      "STF-DL Antenna height from Rail Level Nominal=180 mm [105mm<Expected<225mm]",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Lateral Gap[Less than +/- 60 mm]",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Status of Tilting,Pitching & Yawning ",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity: "Object Free Zone around antenna [Dmin< 50mm]",
  },
  {
    category: "I) Underframe STF-DL Antenna Inspection",
    activity:
      "General Condition of STF-DL inter car jumper connector & jumper Cable (DMC-TC)",
  },
];
const quarterlyActivities2 = [
  {
    category: "II) Underframe Odometer Inspection",
    activity: "Physical Condition of Odometer",
  },
  {
    category: "II) Underframe Odometer Inspection",
    activity: "Physical Condition of Odometer Cable",
  },
  {
    category: "II) Underframe Odometer Inspection",
    activity: "Fixing & tightness all Allen screws of odometer (Torque32",
  },
  {
    category: "II) Underframe Odometer Inspection",
    activity:
      "General Condition of odometer inter car jumper connector & jumper Cable (DMC-TC)",
  },
];

const quarterlyRanges = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];

function QuarterlyTrainInspection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = useSelector((state) => state.TrainInspection);

  const [slug, setSlug] = useState("");
  useEffect(() => {
    if (list) {
      setSlug(list.slug);
    }
  }, [list]);
  const [quarterlyRange, setQuarterlyRange] = useState("Jan-Mar");

  const [formValues, setFormValues] = useState({
    trainSet: "",
    date: "",
    quarterly1: quarterlyActivities1.map(() => ({
      range: "Jan-Mar",
      CC1: "",
      CC2: "",
    })),
    quarterly2: quarterlyActivities2.map(() => ({
      range: "Jan-Mar",
      CC1: "",
      CC2: "",
    })),

    qActivity1Remarks: "",
    qActivity2Remarks: "",
    signature: "",
    name: "",
    designation: "",
    empid: "",
    csign: "",
  });

  const quarterlyRangeHandler = (event) => {
    const value = event.target.value;
    setQuarterlyRange(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      quarterly1: prevValues.quarterly1.map((activity) => ({
        ...activity,
        range: value,
      })),
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      quarterly2: prevValues.quarterly2.map((activity) => ({
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
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="bredcrumb">
          <Link underline="hover" color="inherit">
            Quarterly On-board ATC Underframe Inspection{" "}
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
              <label className="form-label text-center d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3">
                  <input
                    type="text"
                    name="trainSet"
                    placeholder="Train Set"
                    required
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        trainSet: e.target.value,
                      });
                    }}
                  />
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
                  <input
                    type="date"
                    name="date"
                    value={formValues.date}
                    onChange={(e) => {
                      setFormValues({ ...formValues, date: e.target.value });
                    }}
                  />{" "}
                </div>
                Activity: ATC On-board Inspection-Underframe
              </label>
            </div>{" "}
            {quarterlyActivities1.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== quarterlyActivities1[index - 1].category;

              return (
                <div key={index} className="mb-3">
                  {shouldPrintCategory && (
                    <div className="row">
                      <label
                        className="form-label mb-1 "
                        style={{ textAlign: "left" }}
                      >
                        {activity.category}
                      </label>
                      <label className="d-flex gap-5 justify-content-end">
                        <span>CC1</span>
                        <span>CC2</span>
                      </label>
                    </div>
                  )}
                  <label
                    className="form-label mb-0 d-flex justify-content-between align-items-center"
                    style={{ textAlign: "left" }}
                  >
                    {index + 1}. {activity.activity}
                    <div className="d-flex gap-3">
                      <select
                        name={`quarterlyActivity${index + 1}CC1`}
                        id=""
                        value={formValues.quarterly1[index].CC1}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "CC1",
                            e.target.value,
                            "quarterly1"
                          )
                        }
                      >
                        <option value="">Select</option>
                        <option value="ok">Ok</option>
                        <option value="not Ok">Not Ok</option>
                      </select>
                      <select
                        name={`quarterlyActivity${index + 1}CC2`}
                        id=""
                        value={formValues.quarterly1[index].CC2}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "CC2",
                            e.target.value,
                            "quarterly1"
                          )
                        }
                      >
                        <option value="">Select</option>
                        <option value="ok">Ok</option>
                        <option value="not Ok">Not Ok</option>
                      </select>
                    </div>
                  </label>
                </div>
              );
            })}
            <div>
              <label className="form-label">Remarks:</label>
              <input
                type="text"
                name="qActivity1Remarks"
                value={formValues.qActivity1Remarks}
                onChange={(e) =>
                  handleRemarkChange("qActivity1Remarks", e.target.value)
                }
              />
            </div>
            {quarterlyActivities2.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== quarterlyActivities2[index - 1].category;

              return (
                <div key={index} className="my-3">
                  {shouldPrintCategory && (
                    <div className="row">
                      <label
                        className="form-label mb-1 "
                        style={{ textAlign: "left" }}
                      >
                        {activity.category}
                      </label>
                      <label className="d-flex gap-5 justify-content-end">
                        <span>CC1</span>
                        <span>CC2</span>
                      </label>
                    </div>
                  )}
                  <label
                    className="form-label mb-0 d-flex justify-content-between align-items-center"
                    style={{ textAlign: "left" }}
                  >
                    {index + 1}. {activity.activity}
                    <div className="d-flex gap-3">
                      <select
                        name={`quarterlyActivity${index + 1}CC1`}
                        id=""
                        value={formValues.quarterly2[index].CC1}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "CC1",
                            e.target.value,
                            "quarterly2"
                          )
                        }
                      >
                        <option value="">Select</option>
                        <option value="ok">Ok</option>
                        <option value="not Ok">Not Ok</option>
                      </select>
                      <select
                        name={`quarterlyActivity${index + 1}CC2`}
                        id=""
                        value={formValues.quarterly2[index].CC2}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "CC2",
                            e.target.value,
                            "quarterly2"
                          )
                        }
                      >
                        <option value="">Select</option>
                        <option value="ok">Ok</option>
                        <option value="not Ok">Not Ok</option>
                      </select>
                    </div>
                  </label>
                </div>
              );
            })}
            <div>
              <label className="form-label">Remarks:</label>
              <input
                type="text"
                name="qActivity2Remarks"
                value={formValues.qActivity2Remarks}
                onChange={(e) =>
                  handleRemarkChange("qActivity2Remarks", e.target.value)
                }
              />
            </div>
            <br />
            {/* <div className="row my-3">
              <div className="col-md-3">
                {" "}
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
                <label className="form-label">SUpervisor Name:</label>
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

export default QuarterlyTrainInspection;
