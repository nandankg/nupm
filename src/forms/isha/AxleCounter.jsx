import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { addData } from "../../reducer/isha/AxleCounterReducer";
import { Link } from "react-router-dom";
import stationData from "../../station.json";

const AlxeCounter = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axle = useSelector((state) => state.addAxleCounter);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (axle) {
      setSlug(axle.slug);
    }
  }, [axle]);
  const basicInitialValues = {
    date:"",
    dateofmaintenance: "",
    maintenanceschedule: "",
    checklist1: "",
    checklist2: "",
    checklist3: "",
    checklist4: "",
    checklist5: "",
    checklist6: "",
    checklist7: "",
    checklist8: "",
    checklist9: "",
    checklist10: "",
    checklist11: "",
    checklist12: "",
    checklist13: "",
    checklist14: "",
    checklist15: "",
    checklist16: "",
    checklist17: "",
    blank1: "",
    blank2: "",
    blank3: "",
    blank4: "",
    blank5: "",
    blank6: "",
    blank7: "",
    blank8: "",
    blank9: "",
    blank10: "",
    blank11: "",
    blank12: "",
    blank13: "",
    blank14: "",
    blank15: "",
    blank16: "",
    blank17: "",
    remarks: "",
    counterno:"",
    station:"",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };


  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Axle Counter (ACS-2000) MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit">
          Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="form-container" style={{ marginLeft: "0", marginRight: "0", maxWidth: "97%" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">  Axle Counter (ACS-2000) MAINTENANCE RECORD</h3>
              <span className="line-box" style={{width:"720px"}}></span>
            </div>

            <div div className="row mb-3">
              <div className="col-md-3">
                <label for="inputmaintenanceschedule" className='form-label'>
                  Date
                </label>
                <input
                  type="date"required
                  className="form-control"
                  id="inputcabinet"
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  }
                />
                </div>
              <div className="col-md-3">
                <label for="inputmaintenanceschedule" className='form-label'>
                  Maintenance Schedule
                </label>
                <select
                  className='form-control'
                  id="inputmaintenanceschedule"
                  onChange={(e) =>
                    setFormValues({ ...formValues, maintenanceschedule: e.target.value })
                  }
                  required
                >
                  <option>None</option>
                  <option>JAN-JUN</option>
                  <option>JUL-DEC</option>
                </select>
              </div>
              <div className="col-md-3">
              <label htmlFor="inputstation" className="form-label">
                    Station
                  </label>
                  <select
                    className="form-control"
                    id="station"
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
              <div className="col-md-3">
                <label for="inputcabinet" className="form-label">
                Axle Counter No.
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputcabinet"
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
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank4: e.target.value })
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
              <input
                  type="text"
                  className="form-control"
                  name="remarks"
                   placeholder='Values'
                  onChange={(e) =>
                    setFormValues({ ...formValues, checklist6: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder='Remark, if any'
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
                  onChange={(e) =>
                    setFormValues({ ...formValues, blank17: e.target.value })
                  }
                />
              </div>
            </div>



            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="inputbillNo" className="form-label">
                  Remarks
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="remarks"
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
export default AlxeCounter;
