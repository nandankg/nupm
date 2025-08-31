import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addFailureReport,
  addData,
} from "../../reducer/chanchal/FailureReportReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../data/formatDate";
import stationData from "../../station.json"; // Update the path to your station.json

const FailureReportReg = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const FailureReportList = useSelector((state) => state.failureReport);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (FailureReportList) {
      setSlug(FailureReportList.slug);
    }
  }, [FailureReportList]);

  const basicInitialValues = {
    Faulty: "",
    Newly: "",
    Description: "",
    defect_detection: "",
    Cc: "False",
    Ts: "False",
    Ixl: "False",
    Ats: "False",
    Dcs: "False",
    Mss: "False",
    Station: "",
    Section: "",
    Train_no: "",
    Cab_no: "",
    IncidentDate: "",
    IncidentTime: "",
    Details: "",
    LabRemark: "",
    StoreRemark: "",
    ReturnSign: "",
    StoreSign: "",
    ReturnName: "",
    StoreName: "",
    ReturnDesign: "",
    StoreDesign: "",
    ReturnEmpId: "",
    StoreEmpId: "",
    ReplacementDate: "",
    CollectionDate: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    // const newSrno = sNo + 1;
    // setSNo(newSrno);
    navigate(`/list/${slug}`);
    // navigate("/list/efr-register");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              EQUIPMENT FAILURE REPORT
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ maxWidth: "1000px" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">EQUIPMENT FAILURE REPORT</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputFaulty" className="form-label">
                    {" "}
                    Serial Number of Faulty LRU{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFaulty"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Faulty: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputNewly" className="form-label">
                    Serial Number of newly installed LRU{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNewly"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Newly: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputDescription" className="form-label">
                    Description of LRU(Make, Model & Part No.){" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDescription"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <h5>Defect detection phase (Tick one choice)</h5>
              <div className="row mb-3">
                <div className="col-4 border">
                 
                  <input
                      className="form-check-input ms-1"
                      type="radio"
                      name="defect_detection"
                      id="radioCc"
                      value="Failure Found During DLP"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          defect_detection: e.target.value,
                        })
                      }
                    />
                   Failure Found During DLP
                   </div>
                   <div className="col-4 border">
                   <input
                      className="form-check-input ms-1"
                      type="radio"
                      name="defect_detection"
                      id="radioCc"
                      value="Failure Found During Preventive Maintenance"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          defect_detection: e.target.value,
                        })
                      }
                    />
                    Failure Found During Preventive Maintenance
                    </div>
                      <div className="col-4 border">
                    <input
                      className="form-check-input ms-1"
                      type="radio"
                      name="defect_detection"
                      id="radioCc"
                      value="Failure Found During Corrective Maintenance"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          defect_detection: e.target.value,
                        })
                      }
                    />
                    Failure Found During Corrective Maintenance
                    </div>
                </div>
              
              <h5>  Sub-System  (Tick only one choice )</h5>
              <div className="row mb-3">
                <div className="col-4 border">
                 
                   <input
                      className="form-check-input ms-1"
                      type="radio"
                      name="radioNoLabel1"
                      id="radioCc"
                      value="True"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          Cc: e.target.value,
                        })
                      }
                    />
                    ATC CC
                  
                  <input
                    className="form-check-input ms-1"
                    type="radio"
                    name="radioNoLabel1"
                    id="radioTs"
                    value="True"
                    aria-label="..."
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Ts: e.target.value,
                      })
                    }
                  />
                  ATC T/S
                </div>
                <div className="col-4 border">
                 
                  <div>
                    <input
                      className="form-check-input ms-1"
                      type="radio"
                      name="radioNoLabel1"
                      id="radioIxl"
                      value="True"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          Ixl: e.target.value,
                        })
                      }
                    />
                    IXL & PDU
                  </div>
                  <input
                    className="form-check-input ms-1"
                    type="radio"
                    name="radioNoLabel1"
                    id="radioAts"
                    value="True"
                    aria-label="..."
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Ats: e.target.value,
                      })
                    }
                  />
                  ATC
                </div>
                <div className="col-4 border">
                 
                  <div>
                    <input
                      className="form-check-input ms-1"
                      type="radio"
                      name="radioNoLabel1"
                      id="radioDcs"
                      value="True"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          Dcs: e.target.value,
                        })
                      }
                    />
                    DCS
                  </div>
                  <input
                    className="form-check-input ms-1"
                    type="radio"
                    name="radioNoLabel1"
                    id="radioMss"
                    value="True"
                    aria-label="..."
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Mss: e.target.value,
                      })
                    }
                  />
                  MSS
                </div>
              </div>
              <div className="row mb-3">
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
                    {" "}
                    Station
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStation"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Station: e.target.value })
                    }
                  />
                </div> */}
                <div className="col-md-6 ">
                  <label for="inputSection" className="form-label">
                    {" "}
                    Section
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSection"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Section: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputTrain_no" className="form-label">
                    {" "}
                    Train Number{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTrain_no"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Train_no: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputCab_no" className="form-label">
                    Cab Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCab_no"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Cab_no: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputIncidentDate" className="form-label">
                    {" "}
                    Incident Date{" "}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputIncidentDate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        IncidentDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputIncidentTime" className="form-label">
                    Incident Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputIncidentTime"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        IncidentTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputDetails" className="form-label">
                    {" "}
                    Description of fault mentioning complete gear id details:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDetails"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Details: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h5 className="text-center">Returning Engineer</h5>

                {/* <div className="col-md-6 ">
                  <label for="inputReturnSign" className="form-label">
                    {" "}
                    Signature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReturnSign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        ReturnSign: e.target.value,
                      })
                    }
                  />
                </div> */}
                <div className="col-md-6 ">
                  <label for="inputReturnName" className="form-label">
                    {" "}
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReturnName"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        ReturnName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputReturnDesign" className="form-label">
                    {" "}
                    Designation{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReturnDesign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        ReturnDesign: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputReturnEmpId" className="form-label">
                    Emp id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReturnEmpId"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        ReturnEmpId: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputReplacementDate" className="form-label">
                    {" "}
                    Date of Replacement{" "}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputReplacementDate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        ReplacementDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputLabRemark" className="form-label">
                    {" "}
                    Lab Remarks{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLabRemark"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        LabRemark: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
             
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputStoreRemark" className="form-label">
                    {" "}
                    Store Remarks:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStoreRemark"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        StoreRemark: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

             
                            <div className="row mb-3 ">
                <h5 className="text-center">Store-in-Charge</h5>

                {/* <div className="col-md-6 ">
                  <label for="inputStoreSign" className="form-label">
                    {" "}
                    Signature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStoreSign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        StoreSign: e.target.value,
                      })
                    }
                  />
                </div> */}
                <div className="col-md-6 ">
                  <label for="inputStoreName" className="form-label">
                    {" "}
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStoreName"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        StoreName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputStoreDesign" className="form-label">
                    {" "}
                    Designation{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStoreDesign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        StoreDesign: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputStoreEmpId" className="form-label">
                    Emp id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStoreEmpId"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        StoreEmpId: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputCollectionDate" className="form-label">
                    {" "}
                    Date of Collection
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputCollectionDate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        CollectionDate: e.target.value,
                      })
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

export default FailureReportReg;
