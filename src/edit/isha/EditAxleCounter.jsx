import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, editData } from "../../reducer/isha/AxleCounterReducer";
import stationData from "../../station.json";
function EditAxle() {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  const axelList = useSelector((state) => state.addAxleCounter);
  console.log(axelList.data.data);
  const [items, setItems] = useState([]);
  const [systems, setSystems] = useState([]);
  const itmm = axelList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(axelList.data.data);
  }, []);
  useEffect(() => {
    setItems(axelList.data.data);
  }, [axelList]);
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
    if (axelList) {
      setSlug(axelList.slug);
    }
  }, [axelList]);
  const basicInitialValues = {
    id: fd.id,
    station: fd.station,
    dateofmaintenance: fd.dateofmaintenance,
    maintenanceschedule: fd.maintenanceschedule,
    counterno: fd.counterno,
    checklist1: fd.checklist1,
    checklist2: fd.checklist2,
    checklist3: fd.checklist3,
    checklist4: fd.checklist4,
    checklist5: fd.checklist5,
    checklist6: fd.checklist6,
    checklist7: fd.checklist7,
    checklist8: fd.checklist8,
    checklist9: fd.checklist9,
    checklist10: fd.checklist10,
    checklist11: fd.checklist11,
    checklist12: fd.checklist12,
    checklist13: fd.checklist13,
    checklist14: fd.checklist14,
    checklist15: fd.checklist15,
    checklist16: fd.checklist16,
    checklist17: fd.checklist17,
    blank1: fd.blank1,
    blank2: fd.blank2,
    blank3: fd.blank3,
    blank4: fd.blank4,
    blank5: fd.blank5,
    blank6: fd.blank6,
    blank7: fd.blank7,
    blank8: fd.blank8,
    blank9: fd.blank9,
    blank10: fd.blank10,
    blank11: fd.blank11,
    blank12: fd.blank12,
    blank13: fd.blank13,
    blank14: fd.blank14,
    blank15: fd.blank15,
    blank16: fd.blank16,
    blank17: fd.blank17,
    remarks: fd.remarks,
    name: fd.name,
    designation: fd.designation,
    empno: fd.empno,
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
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Axel Counter (ACS-2000) MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="form-container" style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading"> Edit : Axel Counter (ACS-2000) MAINTENANCE RECORD</h3>
              <span className="line-box" style={{width:"800px"}}></span>
            </div>
            <div className="row mb-3">
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
                  <option>JAN-JUN</option>
                  <option>JUL-DEC</option>
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
                <div className="col-md-4">
                <label for="inputcabinet" className="form-label">
                Axel Counter No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputcabinet"
                  value={formValues.counterno}
                  onChange={(e) =>
                    setFormValues({ ...formValues, counterno: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
                <label className="col-md-8" style={{ textAlign: "left" }} >  Details of Maintenance Activity</label>
                <label className="col-md-6" style={{ textAlign: "center" }} >Status</label>
              </div>

              <label className="col-md-8" style={{ textAlign: "left" }} >
              <b> <u>Details of Maintenance Activity-Outdoor Parameters</u></b>

            </label>
            <div className="row" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
                Visual and mechnical checks on the wheel sensor RSR180 and connecting cables
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
                Checks the condition for clamping bolt (any rust or damage )
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
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
                  value={formValues.blank2}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank2: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
                Measure Dimension A(40 mm - 45 mm)
              </label>
              <div className="col-md-3">
              <input
                  type="text"
                  className="form-control"
                  name="remarks"
                   placeholder='Values'
                   value={formValues.checklist3}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist3: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
                  value={formValues.blank3}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank3: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
                Measure Dimension B(0 mm - 8 mm)
              </label>
              <div className="col-md-3">
              <input
                  type="text"
                  className="form-control"
                  name="remarks"
                   placeholder='Values'
                   value={formValues.checklist4}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist4: e.target.value })
                  }
                />
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
            <div className="row" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
                Check the condition of Track Lead Junction Box
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
                  placeholder='Remark, if any'
                  value={formValues.blank5}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank5: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Measure the power supply to the wheel sensor
              </label>
              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  value={formValues.checklist6}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist6: e.target.value })
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
                  placeholder='Remark, if any'
                  value={formValues.blank6}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank6: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Check the occupancy detection capability of the wheel sensor by means of the testing plate PB200
              </label>
              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  value={formValues.checklist7}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist7: e.target.value })
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
                  placeholder='Remark, if any'
                  value={formValues.blank7}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank7: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Reset the concerned tested axle counter ( if requied)
              </label>
              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  value={formValues.checklist8}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist8: e.target.value })
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
                  placeholder='Remark, if any'
                  value={formValues.blank8}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank8: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Cleaning of TLJB and Cable dressing
              </label>

              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  value={formValues.checklist9}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist9: e.target.value })
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
                  placeholder='Remark, if any'
                  value={formValues.blank9}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank9: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Verification of terminal condition and Earthing of Box
              </label>
              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  value={formValues.checklist10}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist10: e.target.value })
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
                  placeholder='Remark, if any'
                  value={formValues.blank10}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank10: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              All the connection are tightened properly
              </label>
              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  value={formValues.checklist11}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist11: e.target.value })
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
                  placeholder='Remark, if any'
                  value={formValues.blank11}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank11: e.target.value })
                  }
                />
              </div>
            </div>
            <label className="col-md-8" style={{ textAlign: "left" }} >
              <b> 
                <u>Details of Maintenance Activity-Indoor Parameters</u></b>

            </label>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Visual inspection of cubicle boards for dust, if needed clean the dust using a brush or a soft dry cloth
              </label>
              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  value={formValues.checklist12}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist12: e.target.value })
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
                  placeholder='Remark, if any'
                  value={formValues.blank12}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank12: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Check all LEDs are glowing in right condition
              </label>

              <div className="col-md-3">
                <select
                  className="form-control"
                  id="inputmonth"
                  value={formValues.checklist13}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist13: e.target.value })
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
                  placeholder='Remark, if any'
                  value={formValues.blank13}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank13: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Measure Voltage In SER
              </label>
              <div className="col-md-3">
              <input
                  type="text"
                  className="form-control"
                  name="remarks"
                   placeholder='current voltage ratings'
                   value={formValues.checklist14}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist14: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
                  value={formValues.blank14}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank14: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Measure Sys 1 Voltage (280mV -500mV)
              </label>
              <div className="col-md-3">
              <input
                  type="text"
                  className="form-control"
                  name="remarks"
                   placeholder='current voltage ratings'
                   value={formValues.checklist15}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist15: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
                  value={formValues.blank15}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank15: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Measure Sys 2 Voltage  (280mV -500mV)
              </label>
              <div className="col-md-3">
              <input
                  type="text"
                  className="form-control"
                  name="remarks"
                   placeholder='current voltage ratings'
                   value={formValues.checklist16}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist16: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
                  value={formValues.blank16}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank16: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label className='col-md-6' style={{ textAlign: "left" }}>
              Difference of Voltage B/W Sys1 & Sys2
              </label>

              <div className="col-md-3">
              <input
                  type="text"
                  className="form-control"
                  name="remarks"
                   placeholder='current voltage ratings'
                   value={formValues.checklist17}
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist17: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
                  value={formValues.blank17}
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank17: e.target.value })
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
  );
}

export default EditAxle;