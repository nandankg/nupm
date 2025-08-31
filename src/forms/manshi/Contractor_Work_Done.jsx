import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { addContractor, addData } from "../../reducer/manshi/ContractorReducer";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json";
const Contractor_Work_Done = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contra = useSelector((state) => state.contract);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (contra) {
      setSlug(contra.slug);
    }
  }, [contra]);
  console.log(contra.data.data);
  const basicInitialValues = {
    date: "",
    department: "",
    station: "",
    registerserialno: "",
    name: "",
    organization: "",
    designation: "",
    detailsofwork: "",
    possesPtw: "",
    finalstatus: "",
    exittime: "",
    entrytime: "",
    signaturecontractorstaff: "",
    signatureondutystaff: "",
    remark: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Contractor Work Done
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
                <h3 className="form-heading">Contractor Work Done Register</h3>
                <div className="heading-line"></div>
              </div>

              {/* First row */}
              <div className="row mb-4">
                <div className="col-md-4">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formValues.department}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="registerserialno">Station</label>
               <select
                                   className="form-control"
                                   id="inputmonth"
                                   value={formValues.station}
                                   onChange={(e) =>
                                     setFormValues({ ...formValues, station: e.target.value })
                                   }
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
              </div>

              {/* Second row */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="organization">Organization</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formValues.organization}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="designation">Designation</label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formValues.designation}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Third row */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="detailsofwork">Details of work</label>
                  <input
                    type="text"
                    id="detailsofwork"
                    name="detailsofwork"
                    value={formValues.detailsofwork}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="possesPtw">Possess PTW</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="possesPtwYes"
                      name="possesPtw"
                      value="yes"
                      checked={formValues.possesPtw === "yes"}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label htmlFor="possesPtwYes" className="form-check-label">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="possesPtwNo"
                      name="possesPtw"
                      value="no"
                      checked={formValues.possesPtw === "no"}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label htmlFor="possesPtwNo" className="form-check-label">
                      No
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="finalstatus">Final Status</label>
                  <input
                    type="text"
                    id="finalstatus"
                    name="finalstatus"
                    value={formValues.finalstatus}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Fourth row */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="entrytime">Entry Time</label>
                  <input
                    type="time"
                    id="entrytime"
                    name="entrytime"
                    value={formValues.entrytime}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="exittime">Exit Time</label>
                  <input
                    type="time"
                    id="exittime"
                    name="exittime"
                    value={formValues.exittime}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="remark">Remark</label>
                  <input
                    type="text"
                    id="remark"
                    name="remark"
                    value={formValues.remark}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Fifth row */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="signaturecontractorstaff">
                    Name(On Duty Staff)
                  </label>
                  <input
                    type="text"
                    id="signaturecontractorstaff"
                    name="signaturecontractorstaff"
                    value={formValues.signaturecontractorstaff}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="signatureondutystaff">
                    Emp ID(On Duty Staff)
                  </label>
                  <input
                    type="text"
                    id="signatureondutystaff"
                    name="signatureondutystaff"
                    value={formValues.signatureondutystaff}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn-primary px-3">
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

export default Contractor_Work_Done;
