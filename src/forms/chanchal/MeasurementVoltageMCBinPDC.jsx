import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { addData } from "../../reducer/chanchal/MeasurementVoltageMCBinPDCReducer";
import stationData from "../../station.json";

const halfyearlyactivity = [
  {
    category: "Details of Maintenance Activity",
    activity: " Check lamp indication on PDC",
  },
  {
    category: "Details of Maintenance Activity",
    activity: " ELD Status",
  },
  {
    category: "Details of Maintenance Activity",
    activity: " IMD status ",
  },
  {
    category: "Details of Maintenance Activity",
    activity: " VMR Status ",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Masurement of Incomer Voltage from UPS on MCB No.",
  },
];

const mcbactivity = [
  {
    category: "Details of Maintenance Activity",
    activity: " MCB 2 ",
  },
  {
    category: "Details of Maintenance Activity",
    activity: " MCB 3 ",
  },
];

const mcb2activity = [
  {
    category: "Details of Maintenance Activity",
    activity: " MCB 1 ",
  },
  {
    category: "Details of Maintenance Activity",
    activity: " MCB 4 ",
  },
  {
    category: "Details of Maintenance Activity",
    activity: " MCB 5 ",
  },
  {
    category: "Details of Maintenance Activity",
    activity: " MCB 6 ",
  },
];

const halfyearlyRanges = ["January-June", "July-December"];

const MeasurementVoltageMCBinPDC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const esphalfyearly = useSelector((state) => state.MCBinPDC || {});
  const [slug, setSlug] = useState("");

  const [mcb3activity, setMcb3activity] = useState([
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 7 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 8 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 9 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 10 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 11 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 12 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 13 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 14 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 15 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 16 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 17 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 18 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 19 ",
    },
  ]);

  const [formValues, setFormValues] = useState({
    station: "",
    date: "",
    halfyearly: halfyearlyactivity.map(() => ({
      checked: "",
    })),
    mcb: mcbactivity.map(() => ({
      r_y: "",
      y_b: "",
      r_b: "",
      r_n: "",
      y_n: "",
      b_n: "",
    })),
    mcb2: mcb2activity.map(() => ({
      r_y2: "",
      y_b2: "",
      r_b2: "",
    })),
    mcb3: mcb3activity.map(() => ({
      volt: "",
      val: "",
    })),
    range: "January-June",
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

  const [halfyearlyRange, setHalfyearlyRange] = useState("January-June");

  useEffect(() => {
    if (esphalfyearly.slug !== slug) {
      setSlug(esphalfyearly.slug || "");
    }
  }, [esphalfyearly.slug]); // Only depend on esphalfyearly.slug

  const addMCB = () => {
    const newMCBNumber = mcb3activity.length + 7;
    const newMCBId = ` MCB ${newMCBNumber < 10 ? '0' + newMCBNumber : newMCBNumber}`;
    const newMCB = {
      category: "Details of Maintenance Activity",
      activity: newMCBId,
    };

    setMcb3activity((prev) => [...prev, newMCB]);
    setFormValues((prevValues) => ({
      ...prevValues,
      mcb3: [...prevValues.mcb3, { volt: "", val: "" }],
    }));
  };

  const halfyearlyRangeHandler = (event) => {
    const selectedRange = event.target.value;
    setHalfyearlyRange(selectedRange);
    setFormValues((prevValues) => ({
      ...prevValues,
      range: selectedRange,
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
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Measurement of Voltage at MCB in PDC SIX MONTHLY MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>

      <div className="row justify-content-center">
        <div className="form-container" style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="d-flex row mb-3">
              <div className="col-md-2 ml-5">
                <label htmlFor="inputstation" className="form-label">
                  Station
                </label>
                <select
                  className="form-control"
                  id="station"
                  value={formValues.station}
                  onChange={(e) =>
                    setFormValues({ ...formValues, station: e.target.value })
                  }
                  required
                >
                  <option value="">Select Station</option>
                  {stationData
                    .filter((station) => station["Station Name"])
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
              <div className="col-md-2">
                <label htmlFor="month" className="form-label">
                  Month
                </label>
                <select
                  onChange={halfyearlyRangeHandler}
                  value={halfyearlyRange}
                  name="halfyearlyRange"
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
              <div className="col-md-2" style={{ marginLeft: "500px" }}>
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

            {halfyearlyactivity.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== halfyearlyactivity[index - 1].category;

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
                    <div className="d-flex gap-3 col-md-2">
                      <select
                        className=""
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
                        <option>Select Status</option>
                        <option value="OK">OK</option>
                        <option value="Not-Ok">Not-Ok</option>
                        <option value="N/A">N/A</option>
                      </select>
                    </div>
                  </label>
                </div>
              );
            })}

            {mcbactivity.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== mcbactivity[index - 1].category;

              return (
                <div key={index} className="mb-3">
                  {shouldPrintCategory && (
                    <div className="row">
                      <label className="form-label mb-1">
                        {activity.category}
                      </label>
                    </div>
                  )}
                  <label className="form-label mb-0 d-flex justify-content-between align-items-center">
                    {activity.activity}
                    <div className="d-flex gap-2 col-md-11">
                      <label
                        htmlFor={`inputr_y_${index}`}
                        className="form-label"
                      >
                        R-Y
                      </label>
                      <input
                        type="text"
                        id={`inputr_y_${index}`}
                        className="form-control"
                        value={formValues.mcb[index]?.r_y || ""}
                        onChange={(e) =>
                          handleChange(index, "r_y", e.target.value, "mcb")
                        }
                      />
                      <label
                        htmlFor={`inputy_b_${index}`}
                        className="form-label"
                      >
                        Y-B
                      </label>
                      <input
                        type="text"
                        id={`inputy_b_${index}`}
                        className="form-control"
                        value={formValues.mcb[index]?.y_b || ""}
                        onChange={(e) =>
                          handleChange(index, "y_b", e.target.value, "mcb")
                        }
                      />
                      <label
                        htmlFor={`inputr_b_${index}`}
                        className="form-label"
                      >
                        R-B
                      </label>
                      <input
                        type="text"
                        id={`inputr_b_${index}`}
                        className="form-control"
                        value={formValues.mcb[index]?.r_b || ""}
                        onChange={(e) =>
                          handleChange(index, "r_b", e.target.value, "mcb")
                        }
                      />
                      <label
                        htmlFor={`inputr_n_${index}`}
                        className="form-label"
                      >
                        R-N
                      </label>
                      <input
                        type="text"
                        id={`inputr_n_${index}`}
                        className="form-control"
                        value={formValues.mcb[index]?.r_n || ""}
                        onChange={(e) =>
                          handleChange(index, "r_n", e.target.value, "mcb")
                        }
                      />
                      <label
                        htmlFor={`inputy_n_${index}`}
                        className="form-label"
                      >
                        Y-N
                      </label>
                      <input
                        type="text"
                        id={`inputy_n_${index}`}
                        className="form-control"
                        value={formValues.mcb[index]?.y_n || ""}
                        onChange={(e) =>
                          handleChange(index, "y_n", e.target.value, "mcb")
                        }
                      />
                      <label
                        htmlFor={`inputb_n_${index}`}
                        className="form-label"
                      >
                        B-N
                      </label>
                      <input
                        type="text"
                        id={`inputb_n_${index}`}
                        className="form-control"
                        value={formValues.mcb[index]?.b_n || ""}
                        onChange={(e) =>
                          handleChange(index, "b_n", e.target.value, "mcb")
                        }
                      />
                    </div>
                  </label>
                </div>
              );
            })}

            {mcb2activity.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== mcb2activity[index - 1].category;

              return (
                <div key={index} className="mb-3">
                  {shouldPrintCategory && (
                    <div className="row">
                      <label className="form-label mb-1">
                        {activity.category}
                      </label>
                    </div>
                  )}
                  <label className="form-label mb-0 d-flex justify-content-between align-items-center">
                    {activity.activity}
                    <div className="d-flex gap-2 col-md-10">
                      <label
                        htmlFor={`inputr_y2_${index}`}
                        className="form-label"
                      >
                        R-Y
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id={`inputr_y2_${index}`}
                        value={formValues.mcb2[index]?.r_y2 || ""}
                        onChange={(e) =>
                          handleChange(index, "r_y2", e.target.value, "mcb2")
                        }
                      />
                      <label
                        htmlFor={`inputy_b2_${index}`}
                        className="form-label"
                      >
                        Y-B
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id={`inputy_b2_${index}`}
                        value={formValues.mcb2[index]?.y_b2 || ""}
                        onChange={(e) =>
                          handleChange(index, "y_b2", e.target.value, "mcb2")
                        }
                      />
                      <label
                        htmlFor={`inputr_b2_${index}`}
                        className="form-label"
                      >
                        R-B
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id={`inputr_b2_${index}`}
                        value={formValues.mcb2[index]?.r_b2 || ""}
                        onChange={(e) =>
                          handleChange(index, "r_b2", e.target.value, "mcb2")
                        }
                      />
                    </div>
                  </label>
                </div>
              );
            })}

            {mcb3activity.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== mcb3activity[index - 1].category;

              return (
                <div key={index} className="mb-3">
                  {shouldPrintCategory && (
                    <div className="row">
                      <label className="form-label mb-1">
                        {activity.category}
                      </label>
                    </div>
                  )}
                  <label className="form-label mb-0 d-flex justify-content-between align-items-center">
                    {activity.activity}
                    <div className="d-flex gap-2 col-md-4">
                      <select
                        className=""
                        id={`deptvolt_${index}`}
                        name="deptvolt"
                        onChange={(e) =>
                          handleChange(index, "volt", e.target.value, "mcb3")
                        }
                        value={formValues.mcb3[index]?.volt || ""}
                      >
                        <option value="">Select voltage</option>
                        <option value="AC">AC</option>
                        <option value="DC">DC</option>
                      </select>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Value"
                        id={`inputval_${index}`}
                        value={formValues.mcb3[index]?.val || ""}
                        onChange={(e) =>
                          handleChange(index, "val", e.target.value, "mcb3")
                        }
                      />
                    </div>
                  </label>
                </div>
              );
            })}

            <Button variant="secondary" onClick={addMCB} className="mb-3">
              Add MCB
            </Button>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="inputremarks" className="form-label">
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
            </div>
 <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="inputremarks" className="form-label">
                  Designation(Filling Form)
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  onChange={(e) =>
                    setFormValues({ ...formValues, designation: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputremarks" className="form-label">
                  Supervisor Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="signature"
                  onChange={(e) =>
                    setFormValues({ ...formValues, signature: e.target.value })
                  }
                />
              </div>
                   <div className="col-md-4">
                <label htmlFor="inputremarks" className="form-label">
                  Gang Members
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="countersign"
                  onChange={(e) =>
                    setFormValues({ ...formValues, countersign: e.target.value })
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
  );
};

export default MeasurementVoltageMCBinPDC;