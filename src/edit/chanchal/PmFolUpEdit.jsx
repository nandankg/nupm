import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/chanchal/PmFolUpReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json"; // Update the path to your station.json

const PmFolUpEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const PmFolUpList = useSelector((state) => state.pmFolUp);
  console.log(PmFolUpList.data.data);
  const [items, setItems] = useState([]);
  const itmm = PmFolUpList.data.data;
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
  
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(PmFolUpList.data.data);
  }, []);
  useEffect(() => {
    setItems(PmFolUpList.data.data);
  }, [PmFolUpList]);
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
  const basicInitialValues = {
    id: fd.id,
    PmDate: fd.date,
    Station: fd.station_name,
    FailDate: fd.failure_date,
    failures:fd.failure,
    FailObsDurPm: fd.failure_observed,
    RectDate: fd.rectification_date,
    Remark: fd.rectification_remarks,
    AttendedBy: fd.AttendedBy,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
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
    dispatch(editData(formValues));
    navigate("/list/pm-follow-up-mainline");
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
                  value={formValues.PmDate}
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

export default PmFolUpEdit;
