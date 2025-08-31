import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editData, fetchData } from "../../reducer/manshi/ShuntReducer";
const quarterlyRanges = [
  "January-March",
  "April-June",
  "July-September",
  "October-December",
];
function EditShunt() {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  const Shunt = useSelector((state) => state.Shunt);
  console.log(Shunt.data.data);
  const [items, setItems] = useState([]);
  const [systems, setSystems] = useState([]);
  const itmm = Shunt.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(Shunt.data.data);
  }, []);
  useEffect(() => {
    setItems(Shunt.data.data);
  }, [Shunt]);
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
      label: "Cleaning of Aspect Housing & LED Unit.",
    },
    {
      label: "LED Functioning.",
    },
    {
      label: "Earthing Verification",
    },
    {
      label: "Cleaning of MSB",
    },
    {
      label: "Tightening of all terminations inside MSB & Signal Unit",
    },
    {
      label: "Proper illumination of LED",
    },
    {
      label: "Tightening of all Nuts & Bolts.",
    },
    {
      label: "Healthiness of all Supports, Brackets & Foundation etc.",
    },
    {
      label: "Corrosion Observed/Painting Needed",
    },
    {
      label: "Voltage Check in LED Unit Pivot Aspect.",
    },
    {
      label: "Current Check in LED Unit Pivot Aspect",
    },
    {
      label: "Voltage Check in LED Unit ON Aspect",
    },
    {
      label: "Current Check in LED Unit ON Aspect",
    },
    {
      label: "Voltage Check in LED Unit ON Aspect",
    },
    {
      label: "Current Check in LED Unit OFF Aspect.",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Shunt) {
      setSlug(Shunt.slug);
    }
  }, [Shunt]);
  const [quarterlyRange, setQuarterlyRange] = useState("January-March");
  const [formValues, setFormValues] = useState({
    id: fd.id,
    signalNo: fd.signalNo,
    quarterly: fd.quarterly,
    remarks: fd.remarks,
    signature: fd.signature,
    name: fd.name,
    designation: fd.designation,
    empno: fd.empno,
    csign: fd.csign,

    ixl: fd.ixl,
    employee_id: "21",
    department: " s&t",
    unit: "Signalling",
    V1: fd.ektNo,
  });

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
          <Link underline="hover" color="inherit">
            Shunt Connectivity
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">
                SHUNT SIGNAL MAINTENANCE RECORD QUARTERLY
              </h3>
              <div className="heading-line"></div>
            </div>

            <div className="row d-flex">
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

              <input
                type="text"
                className="form-control"
                name="signalNo"
                value={formValues.signalNo}
                placeholder="Signal Number"
                onChange={(e) =>
                  setFormValues({ ...formValues, signalNo: e.target.value })
                }
                style={{ margin: "0 10px 10px 0" }}
              />
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
                  <div className="d-flex gap-3">
                    <input
                      type="text"
                      placeholder="Values"
                      onChange={(e) =>
                        handleChange(index, "val", e.target.value, "quarterly")
                      }
                      value={formValues.quarterly[index].val}
                    />
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

export default EditShunt;
