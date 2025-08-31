import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
} from "../../reducer/chanchal/MeasurementVoltageMCBinPDCReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json"; // Update the path to your station.json

const MeasurementVoltageMCBinPDCEdit = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const MeasurementVoltageMCBinPDCList = useSelector((state) => state.MCBinPDC);
  console.log(MeasurementVoltageMCBinPDCList.data.data);
  const [items, setItems] = useState([]);
  const itmm = MeasurementVoltageMCBinPDCList.data.data;
  const [slug, setSlug] = useState("");

  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  useEffect(() => {
    setItems(MeasurementVoltageMCBinPDCList.data.data);
    setSlug(MeasurementVoltageMCBinPDCList.slug);
  }, [MeasurementVoltageMCBinPDCList]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
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

  const mcb3activity = [
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
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 20 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 21 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 22 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 23 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 24 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 25 ",
    },
  ];

  const halfyearlyRanges = ["January-June", "July-December"];

  const fd = filteredData[0];
  console.log(fd);
  const [halfyearlyRange, setHalfyearlyRange] = useState("Januarary-June");
  const [formValues, setFormValues] = useState({
    id: fd.id,
    station: fd.station,
    date: fd.date,
    halfyearly: fd.halfyearly,
    mcb: fd.mcb,
    mcb2: fd.mcb2,
    mcb3: fd.mcb3,
    range: fd.range,
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
  // const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const halfyearlyRangeHandler = (event) => {
    const selectedRange = event.target.value;
    setHalfyearlyRange(selectedRange);
    setFormValues((prevValues) => ({
      ...prevValues,
      pointNo: selectedRange,
      range: selectedRange, // Update name with selectedRange
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

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              Measurement of Voltage at MCB in PDC SIX MONTHLY MAINTENANCE
              RECORD
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
              <div className=" mb-3 form-heading-container">
                {/* <h3 className="form-heading">
                  Edit : Measurement of Voltage at MCB in PDC SIX MONTHLY
                  MAINTENANCE RECORD{" "}
                </h3>
                <div className="heading-line"></div> */}
              </div>
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
                {/* <div className="col-md-2 ml-5">
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
                    {/* <option >Select station</option> 
                    <option>Signal 1 </option>
                    <option>Signal 2 </option>
                    <option>Signal 3 </option>
                  </select>
                </div> */}
                <div className="col-md-2">
                  <label htmlFor="month" className="form-label">
                    Month
                  </label>
                  <select
                    onChange={halfyearlyRangeHandler}
                    value={formValues.range}
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

                <div className="col-md-2 " style={{ marginLeft: "500px" }}>
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
              {halfyearlyactivity.map((activity, index) => {
                const shouldPrintCategory =
                  index === 0 ||
                  activity.category !== halfyearlyactivity[index - 1].category;

                // ||halfyearlyActivities[index - 1].category;

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

                      <div className="d-flex gap-3 col-md-2">
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
                          value={formValues.mcb[index]?.r_y || ""} // Use optional chaining
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
                          value={formValues.mcb[index]?.r_n || ""} // Use optional chaining
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
                      <div className="d-flex gap-3 col-md-10">
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
                          value={formValues.mcb2[index]?.r_y2 || ""} // Use optional chaining
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
                      <div className="d-flex gap-3 col-md-4">
                        <select
                          className=""
                          id={`deptvolt_${index}`}
                          name="deptvolt"
                          onChange={(e) =>
                            handleChange(index, "volt", e.target.value, "mcb3")
                          }
                          value={formValues.mcb3[index]?.volt || ""} // Use optional chaining
                        >
                          <option>Select voltage</option>
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
                        {/* <input
                                                type="text"
                                                placeholder="Value"
                                                value={formValues.mcb3[index]?.val || ""} // Use optional chaining
                                                onChange={(e) => handleChange(index, 'val', e.target.value, 'mcb3')}
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
                    value={formValues.remarks}
                    name="remarks"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
                  />
                  <br />
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
                  value={formValues.designation}
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
                  value={formValues.signature}
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
                  value={formValues.countersign}
                  onChange={(e) =>
                    setFormValues({ ...formValues, countersign: e.target.value })
                  }
                />
              </div>
            </div>
              {/* <div className="row mb-3">
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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
              </div> */}

              {/* <div className="col-md-3">
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
                </div> */}
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

export default MeasurementVoltageMCBinPDCEdit;
