import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import { editData, fetchData } from "../../reducer/manshi/DailyTelecomReducer";
import stationData from "../../data/station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditDailyTelecom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const DailyTelecomListData = useSelector((state) => state.DailyTelecom);
 const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);
 
  const [items, setItems] = useState([]);
  const itmm = DailyTelecomListData.data.data;
  console.log(items);
  console.log(itmm);
  useEffect(() => {
    dispatch(fetchData());
    setItems(DailyTelecomListData.data.data);
  }, []);
  useEffect(() => {
    setItems(DailyTelecomListData.data.data);
  }, [DailyTelecomListData]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const fd = filteredData[0];
  console.log(fd);
  const basicInitialValues = {
    id: fd.id,
    systems: fd.systems,
    date: fd.date,
    station: fd.station,
    remarks: fd.remarks,
    notes: fd.notes,
    verifiedBy: fd.verifiedBy,
    empName: fd.empName,
    empId: fd.empId,
    signature: fd.signature,
    dateTime: fd.dateTime,
    rectifiedDate: fd.rectifiedDate,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const toggleCheckbox = (systemId, activityId) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              checked: activity.checked === "yes" ? "no" : "yes",
            };
          }
          return activity;
        });
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  const toggleAllCheckboxes = (systemId, checked) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => ({
          ...activity,
          checked: checked ? "yes" : "no",
        }));
        return { ...system, activities: updatedActivities };
      }
      return system;
    });
    setFormValues({ ...formValues, systems: updatedSystems });
  };

  console.log(formValues);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={`/list/${slug}`}>
              Daily Telecom Maintenance Checklist
            </Link>
            <Link to="">Edit</Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">
                  {" "}
                  Daily Telecom Maintenance Checklist
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                                                      <div className="col-md-6">
                                                        <label htmlFor="inputstation" className="form-label">
                                                          Station
                                                        </label>
                                                        <select
                                                          className="form-control"
                                                          id="station"
                                                          value={formValues.station}
                                                          onChange={(e) =>
                                                            setFormValues({ ...formValues, station: e.target.value })
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
                                                      </div>
                                      
              {formValues?.systems?.map((system) => (
                <div key={system.id}>
                  <div className="row mb-3">
                    <div className="col-md-12 d-flex">
                      <label className="text-start">
                        <b>{system.name}</b> &nbsp;
                      </label>
                      <span>
                        <input
                          type="checkbox"
                          checked={system.activities.every(
                            (a) => a.checked === "yes"
                          )}
                          onChange={(e) =>
                            toggleAllCheckboxes(system.id, e.target.checked)
                          }
                        />
                        &nbsp; Select All
                      </span>
                    </div>
                  </div>
                  <div>
                    {system.activities.map((activity, index) => (
                      <div className="mb-3" key={activity.id}>
                        <div className="col-md-12 d-flex align-items-center">
                          <label className="text-start">
                            {index + 1}. &nbsp;
                            {activity.label}
                          </label>
                          <input
                            type="checkbox"
                            style={{ flex: 0 }}
                            checked={activity.checked === "yes"}
                            onChange={() =>
                              toggleCheckbox(system.id, activity.id)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="row mb-3">
                <div className="col-md-12">
                  <label>Remarks</label>
                  <input
                    type="text"
                    className="form-control"
                    name="remarks"
                    value={formValues.remarks}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Notes for Installation & other pending issues</label>
                  <input
                    type="text"
                    className="form-control"
                    name="notes"
                    value={formValues.notes}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label>Rectified Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="rectifiedDate"
                    value={formValues.rectifiedDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label>Date & Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="dateTime"
                    value={formValues.dateTime}
                    onChange={handleChange}
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

export default EditDailyTelecom;
