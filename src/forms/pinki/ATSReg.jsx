import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../reducer/pinki/ATSReducer";
import stations from "../../station.json";

const halfyearlyActivities = [
  {
    category: "Visual Checks",
    activity: "Notice the status of CLC & ZC/LC links in system view",
  },
  {
    category: "Visual Checks",
    activity: "Notice all the indications of FEP/Server/Workstation",
  },
  { category: "Visual Checks", activity: "Check power supply status" },
  {
    category: "FEP/VDU/SERVER/WORKSTATION",
    activity: "Switch-off the FEP/VDU/Server/Workstation",
  },
  {
    category: "FEP/VDU/SERVER/WORKSTATION",
    activity: "Remove Cables(Power, Ethernet etc.)",
  },
  {
    category: "FEP/VDU/SERVER/WORKSTATION",
    activity: "Blow dust from motherboard using power blower",
  },
  {
    category: "FEP/VDU/SERVER/WORKSTATION",
    activity: "Blow dust from floppy/CD using power blower",
  },
  {
    category: "FEP/VDU/SERVER/WORKSTATION",
    activity: "Blow the dust cover using low power blower",
  },
  { category: "FEP/VDU/SERVER/WORKSTATION", activity: "Put the cover back" },
  {
    category: "FEP/VDU/SERVER/WORKSTATION",
    activity: "Clean the cover & KVM/Monitor screen with a cloth",
  },
  { category: "FEP/VDU/SERVER/WORKSTATION", activity: "Plugin all cables" },
  {
    category: "FEP/VDU/SERVER/WORKSTATION",
    activity:
      "Ensure the FEP/Server/Workstations are working fine and all application are running.",
  },
  {
    category: "Checks after maintenance:-",
    activity:
      "Verify system status from system view. It should be same as the before the maintenance.",
  },
  {
    category: "Checks after maintenance:-",
    activity: "Check ping status of Router, Server, FEP, Workstations.",
  },
  {
    category: "Checks after maintenance:-",
    activity:
      "Check each FEP/Server individually on load. All MMI indications should be proper with each FEP at LATS & CATS Workstations.",
  },
  {
    category: "Checks after maintenance:-",
    activity:
      "Check switching between both the FEP at LATS and CATS workstations.",
  },
];

const halfYearlyRanges = ["January-June", "July-December"];

function ATSReg() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const atshalfyearly = useSelector((state) => state.atshalfyearly);
  const [slug, setSlug] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // For validation
  useEffect(() => {
    if (atshalfyearly) {
      setSlug(atshalfyearly.slug);
    }
  }, [atshalfyearly]);

  const [halfYearlyRange, setHalfYearlyRange] = useState("January-June");

  const [formValues, setFormValues] = useState({
    pointNo: "",
    date: "", // Added
    halfyearly: halfyearlyActivities.map(() => ({
      range: "January-June",
      date: "",
      status: "Not Done",
      remark:"" // Initial status for Done/Not Done/Remark
    })),

    remarks: "",
    signature: "",
    name: "January-June",
    designation: "",
    empno: "",
    csign: "",
    equipment: "",
    station: "",
  });

  console.log(formValues);

  const halfYearlyRangeHandler = (event) => {
    const value = event.target.value;
    setHalfYearlyRange(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      halfyearly: prevValues.halfyearly.map((activity) => ({
        ...activity,
        range: value,
      })),
      name: value,
    }));
  };

  console.log(formValues);

  const handleChange = (index, field, value, type) => {
    if (type === "halfyearly") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [type]: prevValues[type].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [field]: value, // Directly update fields like 'station', 'equipment', etc.
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    // Validation check: Ensure at least one activity is done
    const allActivitiesFilled = formValues.halfyearly.some(
      (activity) => activity.status !== "Not Done"
    );
    if (allActivitiesFilled) {
      dispatch(addData(formValues));
      navigate(`/list/${slug}`);
    } else {
      alert("Please mark at least one activity as done.");
    }
  };

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            ATS Half Yearly Maintenance
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
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">ATS HALF YEARLY MAINTENANCE</h3>
              <div className="heading-line"></div>
            </div>

            <select
              onChange={halfYearlyRangeHandler}
              value={halfYearlyRange}
              name="halfYearlyRange"
              style={{ margin: "0 10px 10px 0" }}
            >
              {halfYearlyRanges.map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))}
            </select>

            {/* DATE Field */}
            <div className="mb-3">
              <label className="form-label">DATE</label>
              <input
                type="date"
                className="form-control"
                value={formValues.date}
                onChange={(e) =>
                  setFormValues({ ...formValues, date: e.target.value })
                }
              />
            </div>

            {halfyearlyActivities.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== halfyearlyActivities[index - 1].category;

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
                      {/* Maintenance Activity Status Dropdown */}
                      <select
                        onChange={(e) =>
                          handleChange(
                            index,
                            "status",
                            e.target.value,
                            "halfyearly"
                          )
                        }
                        value={formValues.halfyearly[index].status}
                      >
                        <option value="Done">Done</option>
                        <option value="Not Done">Not Done</option>
                        <option value="Remark">Remark</option>
                      </select>
                     
                       <input
                                              type="text"
                                                onChange={(e) =>
                                                    handleChange(index, "remark", e.target.value, "halfyearly")
                                                }
                                                placeholder="Remark"
                                                value={formValues.halfyearly[index].remark}
                                            /> 
                    </div>
                  </label>
                </div>
              );
            })}

            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="equipment" className="form-label">
                  Equipment
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="equipment"
                  value={formValues.equipment}
                  onChange={(e) =>
                    setFormValues({ ...formValues, equipment: e.target.value })
                  }
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="inputstation" className="form-label">
                  Station
                </label>
                <select
                  className="form-control"
                  id="inputstation"
                  name="station"
                  required
                  value={formValues.station}
                  onChange={(e) =>
                    handleChange(null, "station", e.target.value)
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

              <div className="col-md-4">
                <label htmlFor="remarks" className="form-label">
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

              <div className="col-md-4">
                <label htmlFor="designation" className="form-label">
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
              <div className="col-md-4">
                <label htmlFor="empno" className="form-label">
                  Emp No
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
                <label htmlFor="csign" className="form-label">
                  Counter Name
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

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ATSReg;
