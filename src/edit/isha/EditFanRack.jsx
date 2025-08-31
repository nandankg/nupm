import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, editData } from "../../reducer/isha/FanRackReducer";
import stationData from "../../station.json";
function EditFanRack() {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  const FanList = useSelector((state) => state.Fan);
  console.log(FanList.data.data);
  const [items, setItems] = useState([]);
  const [systems, setSystems] = useState([]);
  const itmm = FanList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(FanList.data.data);
  }, []);
  useEffect(() => {
    setItems(FanList.data.data);
  }, [FanList]);
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



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (FanList) {
      setSlug(FanList.slug);
    }
  }, [FanList]);
  const basicInitialValues = {
    id: fd.id,
    station: fd.station,
    cabinet: fd.cabinet,
    dateofmaintenance: fd.dateofmaintenance,
    maintenanceschedule: fd.maintenanceschedule,
    checklist1: fd.checklist1,
    checklist2: fd.checklist2,
    checklist3: fd.checklist3,
    checklist4: fd.checklist4,
    blank1: fd.blank1,
    blank2: fd.blank2,
    blank3: fd.blank3,
    blank4: fd.blank4,
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
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              FAN Rack QUARTERLY MAINTENANCE RECORD
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="form-container" style={{ maxWidth: "100%" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading"> Edit : FAN Rack QUARTERLY MAINTENANCE RECORD </h3>
                <span className="line-box" style={{width:"750px"}}></span>
              </div>
              <div className="row mb-3">
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
                    <option>None</option>
                    <option>JAN-MAR</option>
                    <option>APR-JUN</option>
                    <option>JUL-SEP</option>
                    <option>OCT-DEC</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label for="inputcabinet" className="form-label">
                    Cabinet
                  </label>
                  <select
                    className="form-control"
                    id="inputcabinet"
                    value={formValues.cabinet}
                    onChange={(e) =>
                      setFormValues({ ...formValues, cabinet: e.target.value })
                    }
                  >
                  <option>N/A</option>
                  <option>RC</option>
                  <option>BTN</option>
                  <option>CLC</option>
                  <option>ZC</option>
                  <option>LC</option>
                  <option>ATS</option>
                  <option>SMIO</option>
                  <option>PDU</option>
                  <option>ACC</option>
                  <option>OTHER</option>
                </select>
                </div> 
              </div>
              <div className="row mb-3">
                <label className="col-md-8" style={{ textAlign: "left" }} >  Details of Maintenance Activity</label>
                <label className="col-md-6" style={{ textAlign: "center" }} >Status</label>
              </div>
              <div className="row" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <label className='col-md-6' style={{ textAlign: "left" }}>
                Cleaning of Fan Rack
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
                    <option>Checked Okay</option>
                    <option>Checked NOK</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    placeholder='Remark, if any'
                    value={formValues.blank1}
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank1: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <label className='col-md-6' style={{ textAlign: "left" }}>
                Checking of fan’s working
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputmonth"
                    value={formValues.checklist2}
                    onChange={(e) =>
                      setFormValues({ ...formValues, checklist2: e.target.value })
                    }>
                   <option>N/A</option>
                    <option>Done</option>
                    <option>Not Done</option>
                    <option>Checked Okay</option>
                    <option>Checked NOK</option>
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
                Replacement of faulty fan
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
                    <option>Checked Okay</option>
                    <option>Checked NOK</option>
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
                Checking of ON/OFF switch and their indication
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputmonth"
                    value={formValues.checklist4}
                    onChange={(e) =>
                      setFormValues({ ...formValues, checklist4: e.target.value })
                    }>
                   <option>N/A</option>
                    <option>Done</option>
                    <option>Not Done</option>
                    <option>Checked Okay</option>
                    <option>Checked NOK</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    placeholder='Remark, if any'
                    value={formValues.blank4}
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank4: e.target.value })
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
              <div className="row mb-3">
            <div className="col-md-4">
            <label htmlFor="inputbillNo" className="form-label">
            Gang Members Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, 
                      name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
            <label htmlFor="inputbillNo" className="form-label">
            Gang Members EmpID
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="signature"
                  value={formValues.signature}
                  onChange={(e) =>
                    setFormValues({ ...formValues, 
                      signature: e.target.value })
                  }
                />
              </div>
              </div>
              <div className="row mb-3">
            <div className="col-md-4">
            <label htmlFor="inputbillNo" className="form-label">
            Supervisor name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="csign"
                  value={formValues.csign}
                  onChange={(e) =>
                    setFormValues({ ...formValues, 
                      csign: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
            <label htmlFor="inputbillNo" className="form-label">
            Supervisor EmpID
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="empno"
                  value={formValues.empno}
                  onChange={(e) =>
                    setFormValues({ ...formValues, 
                      empno: e.target.value })
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

export default EditFanRack;