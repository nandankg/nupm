import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/rajiv/MJL11Reducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
const EditMJL11 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const mjl11List = useSelector((state) => state.MJL11);

  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState("");
  const itmm = mjl11List.data.data;
  console.log(items);
  console.log(itmm);
  useEffect(() => {
    dispatch(fetchData());
    setItems(mjl11List.data.data);
  }, []);
  useEffect(() => {
    setItems(mjl11List.data.data);
    setSlug(mjl11List.slug);
  }, [mjl11List]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    date: fd.date,
    id: fd.id,
    pointNo: fd.pointNo,
    biweekly: fd.biweekly,
    monthly: fd.monthly,
    quarterly1: fd.quarterly1,
    quarterly2: fd.quarterly2,
    halfYearly: fd.halfYearly,
    remarks: fd.remarks,
    signature: fd.signature,
    name: fd.name,
    designation: fd.designation,
    empno: fd.empno,
    csign: fd.csign,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "Police Custody form.pdf",
  });
  const biweeklyActivities = [
    {
      category: "Visual Inspection",
      activity: "Checking for Absence of Ballast & Debris",
    },
    {
      category: "Visual Inspection",
      activity:
        "Checking for the control arm in good condition and properly secured",
    },
    {
      category: "Visual Inspection",
      activity: "Checking for Good Sliding Condition of the Brass Piston",
    },
    {
      category: "Visual Inspection",
      activity: "Checking for the Point itself in Good Condition.",
    },
    {
      category: "Visual Inspection",
      activity:
        "Checking for Proper Operating of the point by Manual Operation",
    },
    {
      category: "Visual Inspection",
      activity:
        "Checking for Proper Operating of the point by Power Operation.	",
    },
    {
      category: "Visual Inspection",
      activity: "Oiling in chair plates till ACD (if required)",
    },
    {
      category: "Visual Inspection",
      activity: "Checking of 6mm U-Spacer",
    },
  ];

  const monthlyActivities = [
    {
      category: "General",
      activity: "Checking for any Abnormal Appearance of Parts.",
    },
    {
      category: "General",
      activity: "Checking for Presence and Condition of Split Pins",
    },
    {
      category: "General",
      activity: "Checking for condition & tightening of all screws and bolts.",
    },
    {
      category: "Maintenance of MJ L11",
      activity:
        "Checking for Case, Cover & Gear Box Housing in Good Conditions. ",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for Internal Gear Box Components in Good Condition. ",
    },
    {
      category: "Maintenance of MJ L11",
      activity:
        "Checking for Crank- Pin/ Crown, Roller & Lyre in Good Condition. ",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for Absence of any Abnormal Oxidation. ",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for incoming Wires Properly Secured.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for Electrical Contacts in Good Condition.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Cleaning Inside the MJ L11.",
    },
    {
      category: "Maintenance of MJ L11",
      activity:
        "Oiling of Gears, Teeth of Crank- Pin Crown & Control Shaft Bearings.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Greasing of Internal Part of the Lyre.",
    },
    {
      category: "Maint. of Drives",
      activity: "Removing of the Surplus of old Grease from all axles.",
    },
    {
      category: "Maint. of Drives",
      activity: "Greasing of all axles.",
    },
    {
      category: "Maint. of VCC Detector",
      activity: "Checking for Wiring & Contacts in Good Condition.",
    },
    {
      category: "Maint. of VCC Detector",
      activity: "Oil in each Hole over the Camshafts.",
    },
    {
      category: "",
      activity: "Oiling of chair plates till ACD",
    },
    {
      category: "",
      activity:
        "Checking of tightning and condition of all roddings of points, stretcher bar and second drive",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Contact Between the Locking Crank Slide & Plastic Sleeve.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Cleaning of all Greased parts of the VCC.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Lubrication of the Internal Corridor of the VCC Frame.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Lubrication of the Locking Piece.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Lubrication of the Stabilization Roller. ",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Lubrication with Motor Oil of the Shaft of the Locking Crank. ",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws or Nuts Fixing the Base Plate.  ",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws fixing the Frame on the Base Plate ",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws fixing the Frame on the Rail Foot.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Bolt fixing the frame on the Rail Web.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Bolts fixing the Locking Crank on to the Switch- Blade.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws fixing the Plastic Sleeve Support on the Base Plate.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws fixing wear pads on the Locking Crank Assembly.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws fixing the wear plate on the Base Plate.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for contact between the Locking Crank  Slide and Plastic sleeve.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Check C arm Bolt Spacing(0.5mm to 1mm)",
    },
    {
      category: "Final Testing",
      activity: "Gauge testing with 2 mm  test piece",
    },
    {
      category: "Final Testing",
      activity: "Gauge testing with 5 mm  test piece",
    },
    {
      category: "Final Testing",
      activity: "Measurement of Opening of Switch Blade-LHS[160mm-163mm]",
    },
    {
      category: "Final Testing",
      activity: "Measurement of Opening of Switch Blade-RHS[160mm-163mm]",
    },
    {
      category: "Final Testing",
      activity: "Track Locking",
    },
    {
      category: "Final Testing",
      activity: "Checking of 6mm U-Spacer",
    },
    {
      category: "Final Testing",
      activity:
        "Measurement of gap between C arm locking head and VCC frame (Gap  >1mm)",
    },
    {
      category: "Final Testing",
      activity: "Checking of mark of shoe",
    },
    {
      category: "Final Testing",
      activity: "Meaurement of gap at brake pad assembly (Gap >1mm)",
    },
  ];

  const quarterlyActivities1 = [
    {
      category: "Maintenance of Drives",
      activity: "Checking for Condition & Tightening of all Fittings & Bolts.",
    },
    {
      category: "Maintenance of Drives",
      activity:
        "Checking for Condition & Tightening of all nuts securing the Forks.",
    },
    {
      category: "Maintenance of Drives",
      activity: "Checking of all Rods in Good Condition.",
    },
    {
      category: "Maintenance of Drives",
      activity: "Checking for Presence & Condition of All Split Pins.",
    },
    {
      category: "Maintenance of Drives",
      activity: "Checking for wear on crank pins.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Checking for Wear of Insulating Bushes & Washers on Axles.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Checking for Wear of the Locking Crank Pad.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Checking for Wear of the Locking Piece.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Wear of the Locking Crank Supporting Shoe (presence of the chamfer).",
    },
    {
      category: "Maintenance of VCC Detector",
      activity:
        "Checking for Wear of the Locking Crank Joint (when gap on shim plates).",
    },
    {
      category: "Maintenance of VCC Detector",
      activity: "Checking of Finger Working with Switch Rail Open Condition.",
    },
    {
      category: "Maintenance of VCC Detector",
      activity:
        "Checking for the good compression stroke of contact blades of detector.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for good sliding stroke of the cam assembly.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for Condition & Tightening of all Fittings & Bolts.",
    },
    {
      category: "Maintenance of MJ L11",
      activity:
        "Measurement of the Manual/ Motor establishment Contact Distance.",
    },
    {
      category: "Maintenance of MJ L11",
      activity:
        "Measurement of the Clearance of the Dog Clutch on Motor Position.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for Gap Between Plastic Control Roller & dog Clutch.",
    },
    {
      category: "Maintenance of PMDB",
      activity: "PMDB Cleaning and Checking of proper dressing.",
    },
    {
      category: "Maintenance of PMDB",
      activity: "Verification of terminal condition and Earthing of Box.",
    },
    {
      category: "Maintenance of PMDB",
      activity:
        "Verification of availability of connection details in the Box.",
    },
  ];
  const quarterlyActivities2 = [
    {
      supcategory: "RUNNING CURRENT(AMPERES)",
      category: "NORMAL",
      activity: "R",
    },
    {
      supcategory: "RUNNING CURRENT(AMPERES)",
      category: "NORMAL",
      activity: "Y",
    },
    {
      supcategory: "RUNNING CURRENT(AMPERES)",

      category: "NORMAL",
      activity: "B",
    },
    {
      supcategory: "RUNNING CURRENT(AMPERES)",
      category: "REVERSE",
      activity: "R",
    },
    {
      supcategory: "RUNNING CURRENT(AMPERES)",
      category: "REVERSE",
      activity: "Y",
    },
    {
      supcategory: "RUNNING CURRENT(AMPERES)",
      category: "REVERSE",
      activity: "B",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",
      category: "NORMAL",
      activity: "R",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",
      category: "NORMAL",
      activity: "Y",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",

      category: "NORMAL",
      activity: "B",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",
      category: "REVERSE",
      activity: "R",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",
      category: "REVERSE",
      activity: "Y",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",
      category: "REVERSE",
      activity: "B",
    },
  ];

  const halfYearlyActivities = [
    { category: " EKT Maintenance	- General", activity: "EKT Functional Test" },
    { category: " EKT Maintenance	- General", activity: "Cleaning of EKT box" },
    {
      category: " EKT Maintenance	- General",
      activity: "Checking of EKT box LED status",
    },
    {
      category: " EKT Maintenance	- General",
      activity: "Checking of proper functioning of EKT Switch",
    },
    {
      category: " EKT Maintenance	- General",
      activity: "EKT removal/insertion from VDU",
    },
    {
      category: " EKT Maintenance	- General",
      activity: "EKT removal/insertion from ATS",
    },
    {
      category: " EKT Maintenance	- General",
      activity: "Checking of any abnormality, wear tear of EKT box",
    },
  ];
  const quarterlyRanges = [
    "January-March",
    "April-June",
    "July-September",
    "October-December",
  ];
  const halfYearlyRanges = ["January-June", "July-December"];
  const [periodicity, setPeriodicity] = useState("Biweekly");
  const [biweeklyMonth, setBiweeklyMonth] = useState("January");
  const [monthlyMonth, setMonthlyMonth] = useState("January");
  const [quarterlyRange, setQuarterlyRange] = useState("January-April");
  const [halfYearlyRange, setHalfYearlyRange] = useState("January-June");
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
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PM-Point Machine maintenance record Main Line Point Machine(MJ)
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
              <input
                type="date"
                name="date"
                id="date"
                className="me-3"
                value={formValues.date}
                onChange={(e) =>
                  setFormValues({ ...formValues, date: e.target.value })
                }
              />
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
                <option value="Half Yearly">Half Yearly</option>
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
              {periodicity === "Half Yearly" && (
                <select
                  name="halfYearlyRange"
                  onChange={halfYearlyRangeHandler}
                  value={halfYearlyRange}
                >
                  {halfYearlyRanges.map((range, index) => (
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
                            <div className="d-flex gap-3">
                              <select
                                id="status"
                                value={formValues.biweekly[index].status}
                                name={`biweeklyActivity${index + 1}status`}
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    "status",
                                    e.target.value,
                                    "biweekly"
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option value="Done">Done</option>
                                <option value="Not Done">Not Done</option>
                              </select>

                              <input
                                type="text"
                                name={`biweeklyActivity${index + 1}remark`}
                                placeholder="remark"
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    "remark",
                                    e.target.value,
                                    "biweekly"
                                  )
                                }
                                value={formValues.biweekly[index].remark}
                              />
                            </div>
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
                  {monthlyActivities.map((activity, index) => {
                    const shouldPrintCategory =
                      index === 0 ||
                      activity.category !==
                        monthlyActivities[index - 1].category;

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
                          <div className="d-flex gap-3">
                            <select
                              id="status"
                              name={`monthlyActivity${index + 1}status`}
                              value={formValues.monthly[index].status}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "status",
                                  e.target.value,
                                  "monthly"
                                )
                              }
                            >
                              {" "}
                              <option value="">Select</option>
                              <option value="Done">Done</option>
                              <option value="Not Done">Not Done</option>
                            </select>
                            <input
                              type="text"
                              name={`monthlyActivity${index + 1}remark`}
                              placeholder="remark"
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "remark",
                                  e.target.value,
                                  "monthly"
                                )
                              }
                              value={formValues.monthly[index].remark}
                            />
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </>
              )}
              {periodicity === "Quarterly" && (
                <>
                  {quarterlyActivities1.map((activity, index) => {
                    const shouldPrintCategory =
                      index === 0 ||
                      activity.category !==
                        quarterlyActivities1[index - 1].category;

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
                            <select
                              id="status"
                              name={`quarterlyActivity${index + 1}status`}
                              value={formValues.quarterly1[index].status}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "status",
                                  e.target.value,
                                  "quarterly1"
                                )
                              }
                            >
                              {" "}
                              <option value="">Select</option>
                              <option value="Done">Done</option>
                              <option value="Not Done">Not Done</option>
                            </select>
                            <input
                              type="text"
                              name={`quarterlyActivity${index + 1}remark`}
                              placeholder="remark"
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "remark",
                                  e.target.value,
                                  "quarterly1"
                                )
                              }
                              value={formValues.quarterly1[index].remark}
                            />
                          </div>
                        </label>
                      </div>
                    );
                  })}
                  <div className="row">
                    <label className="form-label text-center">
                      CURRENT MEASUREMENT OF POINT MACHINE
                    </label>
                  </div>{" "}
                  {quarterlyActivities2.map((activity, index) => {
                    const shouldPrintCategory =
                      index === 0 ||
                      activity.category !==
                        quarterlyActivities2[index - 1].category;
                    const shouldPrintsupCategory =
                      index === 0 ||
                      activity.supcategory !==
                        quarterlyActivities2[index - 1].supcategory;

                    return (
                      <div key={index} className="mb-3">
                        <div className="row ">
                          {shouldPrintsupCategory && (
                            <label className=" form-label mb-1">
                              {activity.supcategory}
                            </label>
                          )}
                          {shouldPrintCategory && (
                            <label className=" form-label mb-1">
                              {activity.category}
                            </label>
                          )}
                          <label
                            className="form-label mb-0 d-flex justify-content-between align-items-center"
                            style={{ textAlign: "left" }}
                          >
                            {activity.activity}
                            <div className="d-flex gap-3">
                              <select
                                id="status"
                                name={`quarterlyActivity${index + 1}status`}
                                value={formValues.quarterly2[index].status}
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    "status",
                                    e.target.value,
                                    "quarterly2"
                                  )
                                }
                              >
                                {" "}
                                <option value="">Select</option>
                                <option value="Done">Done</option>
                                <option value="Not Done">Not Done</option>
                              </select>
                              <input
                                type="text"
                                name={`quarterlyActivity${index + 1}remark`}
                                placeholder="remark"
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    "remark",
                                    e.target.value,
                                    "quarterly2"
                                  )
                                }
                                value={formValues.quarterly2[index].remark}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
              {periodicity === "Half Yearly" &&
                halfYearlyActivities.map((activity, index) => {
                  const shouldPrintCategory =
                    index === 0 ||
                    activity.category !==
                      halfYearlyActivities[index - 1].category;

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
                        <div className="d-flex gap-3">
                          <select
                            id="status"
                            name={`halfYearlyActivity${index + 1}status`}
                            value={formValues.halfYearly[index].status}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "status",
                                e.target.value,
                                "halfYearly"
                              )
                            }
                          >
                            {" "}
                            <option value="">Select</option>
                            <option value="Done">Done</option>
                            <option value="Not Done">Not Done</option>
                          </select>
                          <input
                            type="text"
                            name={`halfYearlyActivity${index + 1}remark`}
                            placeholder="remark"
                            onChange={(e) =>
                              handleChange(
                                index,
                                "remark",
                                e.target.value,
                                "halfYearly"
                              )
                            }
                            value={formValues.halfYearly[index].remark}
                          />
                        </div>
                      </label>
                    </div>
                  );
                })}
              <div className="row mb-3">
                <div className="col-md-2">
                  <label htmlFor="inputbillNo" className="form-label">
                    Point Name P.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    nmae="pointNo"
                    value={formValues?.pointNo}
                    onChange={(e) =>
                      setFormValues({ ...formValues, pointNo: e.target.value })
                    }
                  />
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
                </div>{" "}
              </div>{" "}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputbillNo" className="form-label">
                    Signature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="signature"
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
                    Counter Signature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="csign"
                    value={formValues.csign}
                    onChange={(e) =>
                      setFormValues({ ...formValues, csign: e.target.value })
                    }
                  />
                </div>
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMJL11;
