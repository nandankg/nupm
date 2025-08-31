import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/chanchal/DailyWorkReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

const shiftRanges = [
  "Daily",
  "Weekly",
  "Fortnighly",
  "Monthly",
  "Quarterly",
  "Half-yearly",
  "Yearly",
  "Other",
];

const DailyWorkEdit = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const DailyWorkList = useSelector((state) => state.dailyWork);
  console.log(DailyWorkList.data.data);
  const [items, setItems] = useState([]);
  const itmm = DailyWorkList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(DailyWorkList.data.data);
  }, []);
  useEffect(() => {
    setItems(DailyWorkList.data.data);
  }, [DailyWorkList]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const [shiftRange, setShiftRange] = useState("Weekly");

  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    S_No: sNo,
    date: formatDate(new Date().toDateString()),
    range: fd.range,
    System: fd.System,
    Frequency: fd.Frequency,
    MaintenanceActivity: fd.MaintenanceActivity,
    Supervisior: fd.Supervisior,
    GangMember: fd.GangMember,
    OndutySign: fd.OndutySign,
    Remarks: fd.Remarks,
  };

  const shiftRangeHandler = (event) => {
    const selectedRange = event.target.value;
    setShiftRange(selectedRange);
    setFormValues((prevValues) => ({
      ...prevValues,
      pointNo: selectedRange,
      range: selectedRange, // Update name with selectedRange
    }));
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/list/daily-work-done-register");
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              DAILY WORK DONE REGISTER
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">DAILY WORK DONE REGISTER </h3>
                <div className="heading-line"></div>
              </div>
              <div className="d-flex row mb-3">
                <div className="col-md-6">
                  <label htmlFor="shift" className="form-label">
                  Freqency
                  </label>
                  <select
                    onChange={shiftRangeHandler}
                    value={formValues.range}
                    name="shiftRange"
                    className="form-control"
                    
                    style={{ margin: "0 10px 10px 0" }}
                  >
                    {shiftRanges.map((range, index) => (
                      <option key={index} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                <label for="inputdate" className="form-label">
                    Work Done BY
                  </label>
                  <input type="text" className="form-control"
                    id="inputdate"
                    value={formValues.OndutySign}
                    onChange={(e) =>
                      setFormValues({ ...formValues, OndutySign: e.target.value })
                    }/>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputSystem" className="form-label">
                    {" "}
                    System{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSystem"
                    value={formValues.System}
                    onChange={(e) =>
                      setFormValues({ ...formValues, System: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 ">
                 
                </div>

                <div className="col-md-6">
                  <label for="inputMaintenanceActivity" className="form-label">
                    Maintenance Activity
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputMaintenanceActivity"
                    value={formValues.MaintenanceActivity}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        MaintenanceActivity: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputSupervisor" className="form-label">
                    Supervisor
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSupervisor"
                    value={formValues.Supervisior}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Supervisior: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputGangMember" className="form-label">
                    Gang Members
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputGangMember"
                    value={formValues.GangMember}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        GangMember: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputOndutySign" className="form-label">
                    On Duty Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputOndutySign"
                    value={formValues.OndutySign}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        OndutySign: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputRemarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemarks"
                    value={formValues.Remarks}
                    onChange={(e) =>
                      setFormValues({ ...formValues, Remarks: e.target.value })
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
};

export default DailyWorkEdit;
