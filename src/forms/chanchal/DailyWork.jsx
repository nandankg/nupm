import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addData, addDailyWork } from "../../reducer/chanchal/DailyWorkReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../data/formatDate";

const shiftRanges = [
  "Daily",
  "Fortnighly",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Half-yearly",
  "Yearly",
  "Other",
];

const DailyWorkReg = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const DailyWorkList = useSelector((state) => state.dailyWork);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (DailyWorkList) {
      setSlug(DailyWorkList.slug);
    }
  }, [DailyWorkList]);

  const [shiftRange, setShiftRange] = useState("Weekly");

  const basicInitialValues = {
    S_No: sNo,
    date: formatDate(new Date().toString),
    range: "Weekly",
    System: "",
    Frequency: "",
    MaintenanceActivity: "",
    Supervisor: "",
    GangMember: "",
    OndutySign: "",
    Remarks: "",
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
    dispatch(addData(formValues));
    // const newSrno = sNo + 1;
    // setSNo(newSrno);
    navigate(`/list/${slug}`);
    // navigate("/list/daily-work-done-register");
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
                    value={shiftRange}
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
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Supervisor: e.target.value,
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

export default DailyWorkReg;
