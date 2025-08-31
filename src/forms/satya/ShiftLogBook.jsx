import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

import { addData } from "../../reducer/satya/ShiftLogBookReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import stationData from "../../station.json"
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const ShiftLogBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shiftlog = useSelector((state) => state.shiftbook);
const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);
 const [staffList, setStaffList] = useState([{ name: "", designation: "" },
  ]);
const [failureList, setFailureList] = useState([
    { name: "", designation: "" },
  ]);
  const handleAddRow = () => {
    setStaffList([...staffList, { name: "", designation: "" }]);
  };
  const handleFailureAddRow = () => {
    setFailureList([...failureList, { name: "", designation: "" }]);
  };
  const initialFormState = {
    date: "",
    shift: "",
    section: "",
    station:"",
    staff: Array(9).fill({
      cssstaffonduty: "",
      designation1: "",
    }),
    failures: Array(9).fill({
      failuredetails: "",
      time1: "",
      time2: "",
      remarks: "",
      attendedby: "",
    }),
    instructionremarks: "",
    extraremarks: "",
    chargehandedoverby: "",
    sign1: "",
    chargetakenoverby: "",
    sign2: "",
  };
  const [formValues, setFormValues] = useState(initialFormState);
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

  const handleInputChanges = (workKeys, indexs, keys, value) => {
    const updatedWorkArray = formValues[workKeys].map((item, idxx) => {
      if (idxx === indexs) {
        return { ...item, [keys]: value };
      }
      return item;
    });
    setFormValues({ ...formValues, [workKeys]: updatedWorkArray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const labels = [
    "Staff On Duty",
    "Staff On Duty",
    "Staff On Duty",
  ];

  const labels1 = ["Failures", "Failures", "Failures"];

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              SHIFT LOG
            </Link>
            <Link underline="hover" color="inherit">
              BOOK
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">SHIFT LOG BOOK</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputshift" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                

                </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputshift" className="form-label">
                    Shift:
                  </label>
                  <select
                    className="form-control"
                    id="inputshift"
                    onChange={(e) =>
                      setFormValues({ ...formValues, shift: e.target.value })
                    }
                  >
                    <option>select Shift</option>
                    <option>Morning</option>
                    <option>Evening</option>
                    <option>Night</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputsection" className="form-label">
                    Section:
                  </label>
                  <input type="text" 
                   className="form-control"
                   id="inputsection"
                   onChange={(e) =>
                     setFormValues({ ...formValues, section: e.target.value })
                   }
                  />
                  
                </div>
              </div>
<h4>Staff On Duty</h4>
              {staffList.map((label, index) => (
                <FormSection
                  key={index}
                  label={label}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  workKey="staff"
                  index={index}
                />
              ))}
 <button
                style={{ fontSize: 9 }}
                type="button"
                className="btn btn-secondary me-3"
                onClick={handleAddRow}
              >
                ADD  STAFF
              </button>
<h4>Failure Details</h4>
              {failureList.map((label, indexs) => (
                <FormSection1
                  keys={indexs}
                  label={label}
                  formValues={formValues}
                  handleInputChanges={handleInputChanges}
                  workKeys="failures"
                  indexs={indexs}
                />
              ))}
               <button
                style={{ fontSize: 9 }}
                type="button"
                className="btn btn-secondary me-3"
                onClick={handleFailureAddRow}
              >
                ADD FAILURE
              </button>
              <h4>Other Detail</h4>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputinstructionremarks" className="form-label">
                  Any Specific Instruction/PTW Remarks
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        instructionremarks: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputextraremarks" className="form-label">
                  Any Extra Detail/Remarks
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        extraremarks: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputchargehandedoverby" className="form-label">
                    Charge Handed Over By
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        chargehandedoverby: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputsign1" className="form-label">
                    Emp ID
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({ ...formValues, sign1: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputchargetakenoverby" className="form-label">
                    Charge Taken Over By
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        chargetakenoverby: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputsign2" className="form-label">
                    Emp ID
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({ ...formValues, sign2: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary mt-3">
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

const FormSection = ({ formValues, handleInputChange, workKey, index }) => {
  return (
    <div className="row mb-3">
      <div className="col-md-6">
        <label for="inputcssstaffonduty" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          value={formValues[workKey][index].cssstaffonduty}
          onChange={(e) =>
            handleInputChange(workKey, index, "cssstaffonduty", e.target.value)
          }
        />
      </div>
      <div className="col-md-6">
        <label for="inputdesignation1" className="form-label">
          Designation
        </label>
        <input
          type="text"
          className="form-control"
          value={formValues[workKey][index].designation1}
          onChange={(e) =>
            handleInputChange(workKey, index, "designation1", e.target.value)
          }
        />
      </div>
    </div>
  );
};

const FormSection1 = ({ formValues, handleInputChanges, workKeys, indexs }) => {
  return (
    <div className="row mb-3">
      <div className="col-md-8">
        <label for="inputfailuredetails" className="form-label">
          Failure Details
        </label>
        <input
          type="text"
          className="form-control"
          value={formValues[workKeys][indexs].failuredetails}
          onChange={(e) =>
            handleInputChanges(
              workKeys,
              indexs,
              "failuredetails",
              e.target.value
            )
          }
        />
      </div>
      <div className="col-md-2">
        <label for="inputtime1" className="form-label">
        Failure time 
        </label>
        <input
          type="time"
          className="form-control"
          value={formValues[workKeys][indexs].time1}
          onChange={(e) =>
            handleInputChanges(workKeys, indexs, "time1", e.target.value)
          }
        />
      </div>

      <div className="col-md-2">
        <label for="inputtime2" className="form-label">
        Rectification Time
        </label>
        <input
          type="time"
          className="form-control"
          value={formValues[workKeys][indexs].time2}
          onChange={(e) =>
            handleInputChanges(workKeys, indexs, "time2", e.target.value)
          }
        />
      </div>
      <div className="col-md-6">
        <label for="inputremarks" className="form-label">
          Rectification/Remark
        </label>
        <input
          type="text"
          className="form-control"
          value={formValues[workKeys][indexs].remarks}
          onChange={(e) =>
            handleInputChanges(workKeys, indexs, "remarks", e.target.value)
          }
        />
      </div>
      <div className="col-md-6">
        <label for="inputattendedby" className="form-label">
          Attended By
        </label>
        <input
          type="text"
          className="form-control"
          value={formValues[workKeys][indexs].attendedby}
          onChange={(e) =>
            handleInputChanges(workKeys, indexs, "attendedby", e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default ShiftLogBook;
