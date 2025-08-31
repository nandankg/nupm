import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import { fetchData,editData } from "../../reducer/satya/CSSShiftLogReducer";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditCSSShiftLog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  
  const dispatch = useDispatch();
  const shiftlog = useSelector((state) => state.csslog);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);
  // Initial state for staff rows
  const [staffList, setStaffList] = useState([{ name: "", designation: "" }]);

  const [cssStaffList, setCssStaffList] = useState([
    { name: "", designation: "" },
  ]);
  const [failureList, setFailureList] = useState([
    { name: "", designation: "" },
  ]);
  // Add a new row
  const handleAddRow = () => {
    setStaffList([...staffList, { name: "", designation: "" }]);
  };
  const handleCssAddRow = () => {
    setCssStaffList([...cssStaffList, { name: "", designation: "" }]);
  };
  const handleFailureAddRow = () => {
    setFailureList([...failureList, { name: "", designation: "" }]);
  };
  const [items, setItems] = useState([]);
  const itmm = shiftlog.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(shiftlog.data.data);
  }, []);
  useEffect(() => {
    if (shiftlog) {
      setSlug(shiftlog.slug);
    }
  }, [shiftlog]);
  let dt = [];
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


  const initialFormState = {
    id:fd.id,
    date: fd.date,
    shift: fd.shift,
    section: fd.section,
    css_staff: fd.css_staff,
    section_staff: fd.section_staff,
    failures:fd.failures,
    instructionremarks: fd.instructionremarks,
    extraremarks: fd.extraremarks,
    shiftactivities: fd.shiftactivities,
    chargehandedoverby: fd.chargehandedoverby,
    sign1: "sign",
    chargetakenoverby:fd.chargetakenoverby,
    sign2: "sign",
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

  const handleInputChangess = (workKeyss, indexss, keyss, value) => {
    const updatedWorkArray = formValues[workKeyss].map((item, idxxx) => {
      if (idxxx === indexss) {
        return { ...item, [keyss]: value };
      }
      return item;
    });
    setFormValues({ ...formValues, [workKeyss]: updatedWorkArray });
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
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const labels = [
    "CSS Staff On Duty",
    "CSS Staff On Duty",
    "CSS Staff On Duty",
  ];

  const labels1 = [
    "Section Staff On Duty",
    "Section Staff On Duty",
    "Section Staff On Duty",
  ];

  const labels2 = ["Failure", "Failure", "Failure"];

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              CSS Shift Log Book
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">CSS Shift Book</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputshift" className="form-label">
                    Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputshift" className="form-label">
                    Shift:
                  </label>
                  <select
                    className="form-control"
                    id="inputshift"
                    value={formValues.shift}
                    onChange={(e) =>
                      setFormValues({ ...formValues, shift: e.target.value })
                    }
                  >
                    <option>None</option>
                    <option>Shift I</option>
                    <option>Shift II</option>
                    <option>Shift III</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputsection" className="form-label">
                    Section
                  </label>
                  <select
                    className="form-control"
                    id="inputsection"
                    value={formValues.section}
                    onChange={(e) =>
                      setFormValues({ ...formValues, section: e.target.value })
                    }
                  >
                    <option>None</option>
                    <option>Section A</option>
                    <option>Section B</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3" style={{ backgroundColor: "white" }}>
                <h4>CSS STAFF</h4>
              </div>
              {staffList.map((label, index) => (
                <FormSection
                  key={index}
                  label={label}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  workKey="css_staff"
                  index={index}
                />
              ))}
              <button
                style={{ fontSize: 9 }}
                type="button"
                className="btn btn-secondary me-3"
                onClick={handleAddRow}
              >
                ADD CSS STAFF
              </button>

              <div className="row mb-3" style={{ backgroundColor: "white" }}>
                <h4>SECTION STAFF</h4>
              </div>
              {cssStaffList.map((label, indexs) => (
                <FormSection1
                  keys={indexs}
                  label={label}
                  formValues={formValues}
                  handleInputChanges={handleInputChanges}
                  workKeys="section_staff"
                  indexs={indexs}
                />
              ))}
              <button
                style={{ fontSize: 9 }}
                type="button"
                className="btn btn-secondary me-3"
                onClick={handleCssAddRow}
              >
                ADD SECTION STAFF
              </button>

              <div className="row mb-3" style={{ backgroundColor: "white" }}>
                <h4>FAILURE</h4>
              </div>
              {failureList.map((label, indexss) => (
                <FormSection2
                  keyss={indexss}
                  label={label}
                  formValues={formValues}
                  handleInputChangess={handleInputChangess}
                  workKeyss="failures"
                  indexss={indexss}
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

              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputinstructionremarks" className="form-label">
                    ANY SPECIFIC INSTRUCTIONS/PTW REMARKS
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.instructionremarks}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        instructionremarks: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputextraremarks" className="form-label">
                    ANY EXTRA DETAILS/REMARKS
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.extraremarks}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        extraremarks: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputchargehandedoverby" className="form-label">
                    Charge Handed Over By
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.chargehandedoverby}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        chargehandedoverby: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label for="inputchargetakenoverby" className="form-label">
                    Charge Taken Over By
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.chargetakenoverby}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        chargetakenoverby: e.target.value,
                      })
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
      <div className="col-md-4">
        <label for="inputsstaffonduty" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          value={formValues[workKeys][indexs].sstaffonduty}
          onChange={(e) =>
            handleInputChanges(workKeys, indexs, "sstaffonduty", e.target.value)
          }
        />
      </div>
      <div className="col-md-4">
        <label for="inputdesignation2" className="form-label">
          Designation
        </label>
        <input
          type="text"
          className="form-control"
          value={formValues[workKeys][indexs].designation2}
          onChange={(e) =>
            handleInputChanges(workKeys, indexs, "designation2", e.target.value)
          }
        />
      </div>
      <div className="col-md-4">
        <label for="inputcsection" className="form-label">
          Section
        </label>
        <select
          className="form-control"
          id="inputsection"
          value={formValues[workKeys][indexs].section}
          onChange={(e) =>
            handleInputChanges(workKeys, indexs, "section", e.target.value)
          }
        >
          <option>None</option>
          <option>Section A</option>
          <option>Section B</option>
        </select>
      </div>
    </div>
  );
};

const FormSection2 = ({
  formValues,
  handleInputChangess,
  workKeyss,
  indexss,
}) => {
  return (
    <div className="row mb-3">
      <div className="col-md-8">
        <label for="inputfailuredetails" className="form-label">
          Failure Details
        </label>
        <input
          type="text"
          className="form-control"
          value={formValues[workKeyss][indexss].failuredetails}
          onChange={(e) =>
            handleInputChangess(
              workKeyss,
              indexss,
              "failuredetails",
              e.target.value
            )
          }
        />
      </div>
      <div className="col-md-2">
        <label for="inputtime1" className="form-label">
          Failure Reporting Times
        </label>
        <input
          type="time"
          className="form-control"
          value={formValues[workKeyss][indexss].time1}
          onChange={(e) =>
            handleInputChangess(workKeyss, indexss, "time1", e.target.value)
          }
        />
      </div>

      <div className="col-md-2">
        <label for="inputtime2" className="form-label">
          Failure Closing Time
        </label>
        <input
          type="time"
          className="form-control"
          value={formValues[workKeyss][indexss].time2}
          onChange={(e) =>
            handleInputChangess(workKeyss, indexss, "time2", e.target.value)
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
          value={formValues[workKeyss][indexss].remarks}
          onChange={(e) =>
            handleInputChangess(workKeyss, indexss, "remarks", e.target.value)
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
          value={formValues[workKeyss][indexss].attendedby}
          onChange={(e) =>
            handleInputChangess(
              workKeyss,
              indexss,
              "attendedby",
              e.target.value
            )
          }
        />
      </div>
    </div>
  );
};

export default EditCSSShiftLog;
