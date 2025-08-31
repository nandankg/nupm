import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { editData, fetchData } from "../../reducer/manshi/SerEntryReducer";
import stationData from "../../station.json";

export const EditSerEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const SerF = useSelector((state) => state.Ser);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (SerF) {
      setSlug(SerF.slug);
    }
  }, [SerF]);
  console.log(SerF.data.data);
  const [items, setItems] = useState([]);
  const itmm = SerF.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(SerF.data.data);
  }, [dispatch]);

  useEffect(() => {
    setItems(SerF.data.data);
  }, [SerF]);

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
    date: fd.date,
    ExitDate: fd.ExitDate,
    station: fd.station,
    EntryDate: fd.DateOfEntry,
    Name: fd.Name,
    EmpID: fd.EmpID,
    DesignationDepartment: fd.DesignationDepartment,
    EntryTime: fd.EntryTime,
    PurposeOfVisit: fd.PurposeOfVisit,
    ExitTime: fd.ExitTime,
    VisitorsSign: fd.VisitorsSign,
    SignOnDuty: fd.SignOnDuty,
    Remark: fd.Remark,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            SER Entry
          </Link>
          <Link underline="hover" color="inherit">
            Edit
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              {/* <h3 className="form-heading">SER Entry Register</h3>
              <div className="heading-line"></div> */}
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={formValues.Name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="station">Station</label>
                <select
                  name=""
                  id=""
                  className="me-3 form-control"
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
              <div className="col-md-4">
                <label htmlFor="DesignationDepartment">Desig./Department</label>
                <input
                  type="text"
                  id="DesignationDepartment"
                  name="DesignationDepartment"
                  value={formValues.DesignationDepartment}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Second Row: Entry Date, Entry Time, Purpose of Visit */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="EntryDate">Entry Date</label>
                <input
                  type="date"
                  id="EntryDate"
                  name="EntryDate"
                  value={formValues.EntryDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="EntryTime">Entry Time</label>
                <input
                  type="time"
                  id="EntryTime"
                  name="EntryTime"
                  value={formValues.EntryTime}
                  onChange={handleChange}
                  className="form-control"
                  step="1"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="PurposeOfVisit">Purpose of Visit</label>
                <input
                  type="text"
                  id="PurposeOfVisit"
                  name="PurposeOfVisit"
                  value={formValues.PurposeOfVisit}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Third Row: Exit Date, Exit Time */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="ExitDate">Exit Date</label>
                <input
                  type="date"
                  id="ExitDate"
                  name="ExitDate"
                  value={formValues.ExitDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="ExitTime">Exit Time</label>
                <input
                  type="time"
                  id="ExitTime"
                  name="ExitTime"
                  value={formValues.ExitTime}
                  onChange={handleChange}
                  className="form-control"
                  step="1"
                />
              </div>
            </div>

            {/* Fourth Row: Visitor's Name, Sign On Duty, Remark */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="VisitorsSign">Visitor's Name</label>
                <input
                  type="text"
                  id="VisitorsSign"
                  name="VisitorsSign"
                  value={formValues.VisitorsSign}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="SignOnDuty">Visitor ID</label>
                <input
                  type="text"
                  id="SignOnDuty"
                  name="SignOnDuty"
                  value={formValues.SignOnDuty}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="Remark">Remark</label>
                <input
                  type="text"
                  id="Remark"
                  name="Remark"
                  value={formValues.Remark}
                  onChange={handleChange}
                  className="form-control"
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
};
export default EditSerEntry;
