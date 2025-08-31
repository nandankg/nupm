import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editData, fetchData } from "../../reducer/manshi/EarthReducer";
import stationData from "../../station.json";

const quarterlyRanges = [
  "January-March",
  "April-June",
  "July-September",
  "October-December",
];
function EditEarth() {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  const EarthC = useSelector((state) => state.Earth);
  console.log(EarthC.data.data);
  const [items, setItems] = useState([]);
  const [systems, setSystems] = useState([]);
  const itmm = EarthC.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(EarthC.data.data);
  }, []);
  useEffect(() => {
    setItems(EarthC.data.data);
  }, [EarthC]);
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

  const quarterlyActivities = [
    {
      label:
        "Verification of availability of earth/Earth BAR in good condition",
    },
    {
      label:
        "Writing of earth values with permanent marker/paint at the earth point",
    },
    { label: "Verification of earth connectivity and continuity" },
    {
      label:
        "Verification of earth connectivity of all cubicle/Equipment with earth strip in SER",
    },
    { label: "Value of earth resistance(yearly)" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (EarthC) {
      setSlug(EarthC.slug);
    }
  }, [EarthC]);
  const [quarterlyRange, setQuarterlyRange] = useState("January-March");
  console.log(fd);
  const [formValues, setFormValues] = useState({
    id: fd.id,
    quarterly: fd.quarterly,
    remarks: fd.remarks,
    signature: fd.signature,
    station: fd.station,
    month: fd.month,
    name: fd.name,
    designation: fd.designation,
    empno: fd.empno,
    csign: fd.csign,
    dates: fd.date,
    station: fd.station,
  });
  console.log(formValues);
  const quarterlyRangeHandler = (event) => {
    const selectedRange = event.target.value;
    setQuarterlyRange(selectedRange);
    setFormValues((prevValues) => ({
      ...prevValues,
      pointNo: selectedRange,
      name: selectedRange, // Update name with selectedRange
    }));
  };

  const handleChange = (index, field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      quarterly: prevValues.quarterly.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  console.log(formValues);
  return (
    <div className="container">
      <style>
        {`
          .details-of-maintenance .form-label {
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 1rem;
          }
          .form-container {
            margin-left: 0;
            margin-right: 0;
            max-width: 100%;
          }
          .form-heading-container .form-heading {
            font-size: 1.5rem;
            font-weight: bold;
          }
        `}
      </style>

      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/">
            Earth connection
          </Link>
          <Link underline="hover" color="inherit">
            Edit
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              {/* <h3 className="form-heading"> */}
              {/* Earth Connectivity & Continuity Quarterly MAINTENANCE RECORD
              </h3>
              <div className="heading-line"></div> */}
            </div>
            <div className="row d-flex">
              <div className="col-md-4">
                <select
                  onChange={quarterlyRangeHandler}
                  value={quarterlyRange}
                  name="quarterlyRange"
                  style={{ margin: "0 10px 10px 0" }}
                >
                  {quarterlyRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <select
                  name=""
                  id=""
                  className="me-3"
                  value={formValues.station}
                  onChange={(e) =>
                    setFormValues({ ...formValues, station: e.target.value })
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
              <div className="col-md-4">
              <label className="form-label mb-1">
                  Date
                </label>
                <input type="date" 
                name="dates"
                value={formValues.dates}
                onChange={(e) =>
                  setFormValues({ ...formValues, dates: e.target.value })
                }
                />
              </div>
            </div>
            <div className="details-of-maintenance">
              <div className="row">
                <label className="form-label mb-1">
                  Details of Maintenance Activity
                </label>
              </div>
            </div>

            {quarterlyActivities.map((activity, index) => (
              <div key={index} className="mb-3">
                <label
                  className="form-label mb-0 d-flex justify-content-between align-items-center"
                  style={{ textAlign: "left" }}
                >
                  {activity.label}

                  <div className="d-flex ">
                  {index==4?(<input type="text"
                   value={formValues.quarterly[index].date}
                     onChange={(e) =>
                        handleChange(index, "date", e.target.value, "quarterly")
                      }
                     />):(
                    <select
                      onChange={(e) =>
                        handleChange(index, "date", e.target.value, "quarterly")
                      }
                      value={formValues.quarterly[index].date}
                    >
                      <option>Select Status</option>
                      <option value="OK">OK</option>
                      <option value="Not-Ok">Not-Ok</option>
                      <option value="NA">NA</option>
                    </select>
                     )}
                  </div>
                </label>
              </div>
            ))}

            <div className="row mb-3">
              <div className="col-md-4">
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
}

export default EditEarth;
