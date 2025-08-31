import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchData, editData } from "../../reducer/isha/FilterReplacementReducer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import stationData from "../../station.json";
function EditFilter() {

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const FilterList = useSelector((state) => state.Filter);
  const [slug, setSlug] = useState("");
  console.log(slug);

  console.log(FilterList.data.data);
  const [items, setItems] = useState([]);
  const itmm = FilterList.data.data;
  console.log(items);
  useEffect(() => {
    if (FilterList) {
      setSlug(FilterList.slug);
    }
    dispatch(fetchData());
    setItems(FilterList.data.data);
  }, []);
  useEffect(() => {
    setItems(FilterList.data.data);
  }, [FilterList]);
  let filteredData;
  console.log(itmm);
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData[0];

  const basicInitialValues = {
    id: fd.id,
    station: fd.station,
    dateofmaintenance: fd.dateofmaintenance,
    maintenanceschedule: fd.maintenanceschedule,
    checklist1: fd.checklist1,
    checklist2: fd.checklist2,
    checklist3: fd.checklist3,
    checklist4: fd.checklist4,
    checklist5: fd.checklist5,
    blank1: fd.blank1,
    blank2: fd.blank2,
    blank3: fd.blank3,
    blank4: fd.blank4,
    blank5: fd.blank5,
    remarks: fd.remarks,
    name: fd.name,
    designation: fd.designation,
    empno: fd.empno,
    signature: fd.signature,
    csign: fd.csign,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));

    navigate(`/list/${slug}`);
  };


  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Filter Replacement Half yearly MAINTENANCE RECORD
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="form-container" style={{ maxWidth: "95%" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Edit : Filter Replacement Half yearly MAINTENANCE RECORD		</h3>
                <span className="line-box" style={{width:"890px"}}></span>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputmaintenanceschedule" className='form-label'>
                  Date of  Maintenance 
                  </label>
                     <input
                    type="date"
                    className="form-control"
                    id="inputtext"
                    value={formValues.dateofmaintenance}
                    placeholder='Date of  Maintenance '
                    onChange={(e) =>
                      setFormValues({ ...formValues, dateofmaintenance: e.target.value })
                    }
                  />
                  </div>
                <div className="col-md-4">
                  <label for="inputmaintenanceschedule" className='form-label'>
                    Maintenance Schedule
                  </label>
                  <select
                    className='form-control'
                    id="inputmaintenanceschedule"
                    value={formValues.maintenanceschedule}
                    onChange={(e) =>
                      setFormValues({ ...formValues, maintenanceschedule: e.target.value })
                    }
                  >
                    <option>quarterlyRanges</option>
                    <option>January-June</option>
                    <option>July-December</option>
                  </select>
                </div>
                <div className="col-md-4">
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
              </div>


              <div className="row mb-3">
                <label className="col-md-8" style={{ textAlign: "left" }} >  Details of Maintenance Activity</label>
                <label className="col-md-6" style={{ textAlign: "center" }} >Status</label>
              </div>

              <div className="row" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <label className='col-md-6' style={{ textAlign: "left" }}>
                  BTN door Filter replacement
                </label>

                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputmonth"
                    value={formValues.checklist1}
                    onChange={(e) =>
                      setFormValues({ ...formValues, checklist1: e.target.value })
                    }>
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Not Done</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    value={formValues.blank1}
                    placeholder='Remark, if any'
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank1: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <label className='col-md-6' style={{ textAlign: "left" }}>
                  Filter replacement of ATS Cubicle
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={formValues.checklist2}
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({ ...formValues, checklist2: e.target.value })
                    }>
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Not Done</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    value={formValues.blank2}
                    placeholder='Remark, if any'
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank2: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <label className='col-md-6' style={{ textAlign: "left" }}>
                  CLC door Filter replacement
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={formValues.checklist3}
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({ ...formValues, checklist3: e.target.value })
                    }>
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Not Done</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    value={formValues.blank3}
                    placeholder='Remark, if any'
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank3: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <label className='col-md-6' style={{ textAlign: "left" }}>
                  MSS Filter replacement
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={formValues.checklist4}
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({ ...formValues, checklist4: e.target.value })
                    }>
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Not Done</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    value={formValues.blank4}
                    placeholder='Remark, if any'
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank4: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <label className='col-md-6' style={{ textAlign: "left" }}>
                  PDU Filter replacement
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputmonth"
                    value={formValues.checklist5}
                    onChange={(e) =>
                      setFormValues({ ...formValues, checklist5: e.target.value })
                    }>
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Not Done</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    value={formValues.blank5}
                    placeholder='Remark, if any'
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank5: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputremarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
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
    </>
  );
}

export default EditFilter;