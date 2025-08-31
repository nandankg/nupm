import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";

import {
  SelectInput,
  TextInput,
  TextArea,
} from "../../component/formComponents";
import { initializeFormValues } from "../../utils/formUtils";
import {
  editData,
  fetchData,
  saveData,
} from "../../reducer/manshi/ContractorReducer";
import stationData from "../../station.json";

const EditContractor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [fd, setFd] = useState({});
  const dispatch = useDispatch();
  const assetreg = useSelector((state) => state.contract);
  const [formValues, setFormValues] = useState({});
  const { toPDF, targetRef } = usePDF({ filename: "Asset Register.pdf" });

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Initialize form values when data is loaded
  useEffect(() => {
    if (assetreg?.data?.data) {
      const filteredData = assetreg.data.data.find((item) => item.id === id);
      if (filteredData) {
        setFormValues(basicInitialValues(filteredData));
      }
    }
  }, [assetreg, id]);
  const basicInitialValues = (fd) => ({
    id: fd.id,
    date: fd.date,
    department: fd.selected_department,
    station: fd.station,
    registerserialno: fd.registerserialno,
    name: fd.name,
    organization: fd.organization,
    designation: fd.designation,
    detailsofwork: fd.detailsofwork,
    possesPtw: fd.possesPtw,
    finalstatus: fd.finalstatus,
    exittime: fd.exittime,
    entrytime: fd.entrytime,
    signaturecontractorstaff: fd.signaturecontractorstaff,
    signatureondutystaff: fd.signatureondutystaff,
    remark: fd.remark,
    date: fd.date,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${assetreg.slug}`);
  };

  const handleSave = () => {
    dispatch(saveData(id));
  };
  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Contract Work Done
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
                <h3 className="form-heading">Contract Work Done Register</h3>
                <div className="heading-line"></div>
              </div>

              {/* First row */}
              <div className="row mb-3">
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
                    Emp Id(On Duty Staff)
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
                <button type="submit" className="btn btn-primary px-3">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditContractor;
