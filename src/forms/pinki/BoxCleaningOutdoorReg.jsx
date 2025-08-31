import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../reducer/pinki/BoxCleaningOutdoorReducer";
import stations from "../../station.json";

const boxCleaningActivities = [
  {
    category: "Cleaning activity",
    activity: "Cleaning of Boxes/Cubicles",
  },
  {
    category: "Cleaning activity",
    activity: "Checking of proper dressing of Cubicles",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of terminal condition",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of Earthing of Box ",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of availability of connection details in the Box",
  },
  {
    category: "Cleaning activity",
    activity: "Cleaning of Boxes/Cubicles",
  },
  {
    category: "Cleaning activity",
    activity: "Checking of proper dressing of Cubicles",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of terminal condition",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of Earthing of Box ",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of availability of connection details in the Box",
  },
  {
    category: "Cleaning activity",
    activity: "Cleaning of Boxes/Cubicles",
  },
  {
    category: "Cleaning activity",
    activity: "Checking of proper dressing of Cubicles",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of terminal condition",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of Earthing of Box ",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of availability of connection details in the Box",
  },
  {
    category: "Cleaning activity",
    activity: "Cleaning of Boxes/Cubicles",
  },
  {
    category: "Cleaning activity",
    activity: "Checking of proper dressing of Cubicles",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of terminal condition",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of Earthing of Box ",
  },
  {
    category: "Cleaning activity",
    activity: "Verification of availability of connection details in the Box",
  },
];

const halfYearlyRanges = ["January-June", "July-December"];
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
  }
function BoxCleaningOutdoorReg() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boxcleaning = useSelector((state) => state.boxcleaningoutdoor);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);

  

  const [halfYearlyRange, setHalfYearlyRange] = useState("January-June");

  const [formValues, setFormValues] = useState({
    pointNo: "",
    date_of_maintenance: "",
    halfyearly: boxCleaningActivities.map(() => ({
      date: "",
      boxName: "",
      range: "January-June", // Initialize with the default range
      checklistStatus: "N/A", // Add checklist status
    })),
    remarks: "",
    signature: "",
    name: " ", // Change name here
    designation: "",
    empno: "",
    csign: "",
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
      name: value, // Update the name property with the selected value
    }));
  };

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
        [field]: value, // Directly update fields like 'station'
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
//
    navigate(`/list/${slug}`);
  };
  console.log(slug);
  console.log(formValues);

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Outdoor Junction/Repeater Box Cleaning
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
              <h3 className="form-heading">
                OUTDOOR JUNCTION/REPEATER BOX CLEANING MAINTENANCE RECORD
              </h3>
              <div className="heading-line"></div>
            </div>

            {/* Station Dropdown */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="station" className="form-label">
                  Station
                </label>
                <select
                  className="form-control"
                  id="inputstation"
                  name="station"
                  required
                  value={formValues.station}
                  onChange={
                    (e) => handleChange(null, "station", e.target.value, null) // Passing null for index and type
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

              {/* Date of Maintenance (Calendar Dropdown) */}
              <div className="col-md-3">
                <label htmlFor="date_of_maintenance" className="form-label">
                  Date of Maintenance
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="date_of_maintenance"
                  value={formValues.date_of_maintenance}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      date_of_maintenance: e.target.value,
                    })
                  }
                />
              </div>
 {/* Date of Maintenance (Calendar Dropdown) */}
              <div className="col-md-3">
                <label htmlFor="date_of_maintenance" className="form-label">
                 Name of Outdoor Cabinet
                </label>
                <input
                  type="text"
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
              {/* Half Yearly Range Dropdown */}
              <div className="col-md-3">
                <label htmlFor="halfYearlyRange" className="form-label">
                  Half Yearly Range
                </label>
                <select
                  
                  
                  name="csign"
                  className="form-select"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      csign: e.target.value,
                    })
                  }
                >
                  
                    <option >
                    January-June
                    </option>
                    <option >
                    July-December
                    </option>
                </select>
              </div>
            </div>

            {boxCleaningActivities.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== boxCleaningActivities[index - 1].category;

              return (
                <div key={index} className="mb-3">
                  {shouldPrintCategory && (
                    <div className="row">
                      <label className="form-label mb-1">
                        {activity.category}
                      </label>
                    </div>
                  )}
                  <div className="row ">
                  <label
                    className="form-label col-md-6 text-start"
                    
                  >
                    {activity.activity}
                    </label>
                    
                    <div className=" col-md-3 gap-3">
                      
                      <input
                      type="text"
                      className="form-control"
                    
                        onChange={(e) =>
                          handleChange(
                            index,
                            "boxName",
                            e.target.value,
                            "halfyearly"
                          )
                        }
                        value={formValues.halfyearly[index].boxName}
                        style={{ marginRight: "10px" }}
                      />
                        
                        
                      {/* <input
                        type="date"
                        onChange={(e) => handleChange(index, "date", e.target.value, "halfyearly")}
                        value={formValues.halfyearly[index].date}
                      /> */}
                    </div>
                    <div className=" col-md-3 gap-3">
                      
                      <select
                        onChange={(e) =>
                          handleChange(
                            index,
                            "checklistStatus",
                            e.target.value,
                            "halfyearly"
                          )
                        }
                        value={formValues.halfyearly[index].checklistStatus}
                        style={{ marginRight: "10px" }}
                      >
                        <option value="N/A">N/A</option>
                        <option value="Done">Done</option>
                        <option value="Not Done">Not Done</option>
                        <option value="Checked Okay">Checked Okay</option>
                        <option value="Checked NOK">Checked NOK</option>
                      </select>
                      {/* <input
                        type="date"
                        onChange={(e) => handleChange(index, "date", e.target.value, "halfyearly")}
                        value={formValues.halfyearly[index].date}
                      /> */}
                    </div>
                    </div>
                    </div>
               
              );
            })}

            <div className="row mb-3">
              <div className="col-md-12">
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
            </div>

            <div className="row mb-3">
              {/* <div className="col-md-3">
                <label htmlFor="signature" className="form-label">Signature</label>
                <input
                  type="text"
                  className="form-control"
                  name="signature"
                  value={formValues.signature}
                  onChange={(e) => setFormValues({ ...formValues, signature: e.target.value })}
                />
              </div> */}

              <div className="col-md-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formValues.name}
                  onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                />
              </div> 

              <div className="col-md-4">
                <label htmlFor="designation" className="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="desgination"
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
                  Employee No
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
            </div>

            <div className="text-center">
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

export default BoxCleaningOutdoorReg;
