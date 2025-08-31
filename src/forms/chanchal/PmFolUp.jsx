import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addData, addPmFolUp } from "../../reducer/chanchal/PmFolUpReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "date-fns";
import stationData from "../../station.json"; // Update the path to your station.json

const PmFolUpReg = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const PmFolUpList = useSelector((state) => state.pmFolUp);
  const [slug, setSlug] = useState("");

const [failureList, setFailureList] = useState([
    {  
      FailObsDurPm: "",
      RectDate: "",
      Remark: "",
      AttendedBy: "",
    },
  ]);
 
  const handleFailureAddRow = () => {
    setFailureList([...failureList, { name: "", designation: "" }]);
  };
  
  console.log(slug);
  useEffect(() => {
    if (PmFolUpList) {
      setSlug(PmFolUpList.slug);
    }
  }, [PmFolUpList]);

  const basicInitialValues = {
    S_No: sNo,
    PmDate: "",
    Station: "",
    FailDate: "",
    failures: Array(9).fill({
    FailObsDurPm: "",
    RectDate: "",
    Remark: "",
    AttendedBy: "",
    })
  };
  
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleInputChange = (workKey, index, key, value) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = formValues.failures.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormValues((prevData) => ({
      ...prevData,
      failures: updatedItems,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    console.log(formValues);
    // const newSrno = sNo + 1;
    // setSNo(newSrno);
    // navigate("/list/pm-follow-up-mainline");
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PM FOLLOWUP SHEET
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
                <h3 className="form-heading">PM FOLLOWUP SHEET </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
               
                <div className="col-md-6">
                  <label for="inputPmDate" className="form-label">
                    PM DATE{" "}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputPmDate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, PmDate: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputstation" className="form-label">
                    Station
                  </label>
                  <select
                    className="form-control"
                    id="station"
                    value={formValues.Station}
                    onChange={(e) =>
                      setFormValues({ ...formValues, Station: e.target.value })
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
                {/* <div className="col-md-6 ">
                  <label for="inputStation" className="form-label">
                    STATION
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputStation"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Station: e.target.value })
                    }
                  />
                </div> */}
              </div>
              {failureList.map((itm, index) => (
                <>
                 <h5 className="text-center">FAILURE DETAILS</h5>
              <div className="row mb-3">
                

                <div className="col-md-12">
                  <label for="inputFailObsDurPm" className="form-label">
                    FAILURE OBSERVED DURING PM
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFailObsDurPm"
                    name="FailObsDurPm"
                    value={formValues.failures[index].FailObsDurPm}
                    onChange={(e) => handleItemChange(index, e)}
                   
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h5 className="text-center">RECTIFICATION DETAILS</h5>
                <div className="col-md-6">
                  <label for="inputRectDate" className="form-label">
                    RECTIFICATION DATE
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputRectDate"
                    name="RectDate"
                    value={formValues.failures[index].RectDate}
                    onChange={(e) => handleItemChange(index, e)}
                  
                  />
                </div>
                <div className="col-6">
                  <label for="inputAttendedBy" className="form-label">
                    ATTENDED BY
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAttendedBy"
                    
                    name="AttendedBy"
                    value={formValues.failures[index].AttendedBy}
                    onChange={(e) => handleItemChange(index, e)}
                  
                  />
                </div>
                <div className="col-12">
                  <label for="inputRemark" className="form-label">
                    RECTIFICATION/ REMARKS
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    name="Remark"
                    value={formValues.failures[index].Remark}
                    onChange={(e) => handleItemChange(index, e)}
                   
                  />
                </div>
                
              </div>
              </>
))}
 <button
                style={{ fontSize: 9,width:250 }}
                type="button"
                className="btn btn-secondary me-3"
                onClick={handleFailureAddRow}
              >
                ADD Row
              </button>
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

export default PmFolUpReg;
