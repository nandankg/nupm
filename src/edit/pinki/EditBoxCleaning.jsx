import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchData, editData } from "../../reducer/redux/tableDataSlice";
import stations from "../../station.json";
const boxCleaningActivities = [
  {
    category: "Cleaning activity:- Outdoor Boxes",
    activity: "Cleaning of Boxes/Cubicles",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes",
    activity: "Checking of proper dressing of Cubicles",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes",
    activity: "Verification of terminal condition",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes",
    activity: "Verification of Earthing of Box ",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes",
    activity: "Verification of availability of connection details in the Box",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes1",
    activity: "Cleaning of Boxes/Cubicles",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes1",
    activity: "Checking of proper dressing of Cubicles",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes1",
    activity: "Verification of terminal condition",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes1",
    activity: "Verification of Earthing of Box ",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes1",
    activity: "Verification of availability of connection details in the Box",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes2",
    activity: "Cleaning of Boxes/Cubicles",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes2",
    activity: "Checking of proper dressing of Cubicles",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes2",
    activity: "Verification of terminal condition",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes2",
    activity: "Verification of Earthing of Box ",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes2",
    activity: "Verification of availability of connection details in the Box",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes3",
    activity: "Cleaning of Boxes/Cubicles",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes3",
    activity: "Checking of proper dressing of Cubicles",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes3",
    activity: "Verification of terminal condition",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes3",
    activity: "Verification of Earthing of Box ",
  },
  {
    category: "Cleaning activity:- Outdoor Boxes3",
    activity: "Verification of availability of connection details in the Box",
  },
];

const halfYearlyRanges = ["January-June", "July-December"];
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function EditBoxCleaning() {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boxcleaning = useSelector((state) => state.data);
  console.log(boxcleaning.data.data);
  const [items, setItems] = useState([]);
  const [systems, setSystems] = useState([]);
   const [slug, setSlug] = useState(getLastParameter().trim());
  const itmm = boxcleaning.data.data;
  
  useEffect(() => {
      dispatch(fetchData({ formType: slug }));
    }, [dispatch]);
  useEffect(() => {
    
    setItems(boxcleaning.data.data);
  }, []);
  useEffect(() => {
    setItems(boxcleaning.data.data);
  }, [boxcleaning]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  console.log(filteredData);
  const fd = filteredData[0];

  const [halfYearlyRange, setHalfYearlyRange] = useState("January-June");

  const [formValues, setFormValues] = useState({
    id: fd.id,
    pointNo: fd.pointNo,
    halfyearly: fd.halfyearly,
    remarks: fd.remarks,
    signature: fd.signature,
    name: fd.name,
    designation: fd.designation,
    empno: fd.empno,
    csign: fd.csign,
    station: fd.station,
    date_of_maintenance: fd.date_of_maintenance,
  });
 
   
  console.log(slug);
  

  // Update to handle half-yearly range
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
    setFormValues((prevValues) => ({
      ...prevValues,
      [type]: prevValues[type].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData({formType:slug,values:formValues}));
    navigate(`/list/${slug}`);
  };

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
                OUTDOOR JUNCTION/REPEATER BOX CLEANING 
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
                  onChange={halfYearlyRangeHandler}
                  value={halfYearlyRange}
                  name="halfYearlyRange"
                  className="form-select"
                >
                  {halfYearlyRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
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
                  <label
                    className="form-label mb-0 d-flex justify-content-between align-items-center"
                    style={{ textAlign: "left" }}
                  >
                    {activity.activity}
                    <div className="d-flex gap-3">
                      
                      <input 
                      type="text" 
                      className="form-control"
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
                      />
                        
                      {/* <input
                      type="date"
                      onChange={(e) => handleChange(index, "date", e.target.value, "halfyearly")}
                      value={formValues.halfyearly[index].date}
                    /> */}
                    </div>
                  </label>
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

              {/* <div className="col-md-4">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              />
            </div> */}

              <div className="col-md-3">
                <label htmlFor="designation" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="desgination"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-3">
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
              
                
              <div className="col-md-3">
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

export default EditBoxCleaning;
