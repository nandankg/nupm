import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/rajiv/DailyTelecomCheckListReducer";
const user = JSON.parse(localStorage.getItem("userdata"));
const EditDailyTelecomCheckList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const dailyTelecomCheckList = useSelector(
    (state) => state.dailyTelecomCheckList
  );
  const [items, setItems] = useState([]);
  const itmm = dailyTelecomCheckList.data.data;

  useEffect(() => {
    dispatch(fetchData());
    setItems(dailyTelecomCheckList.data.data);
  }, []);
  const [slug, setSlug] = useState("");
  useEffect(() => {
    setItems(dailyTelecomCheckList.data.data);
    setSlug(dailyTelecomCheckList.slug);
  }, [dailyTelecomCheckList]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
  const fd = filteredData[0];
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  const { toPDF, targetRef } = usePDF({
    filename: "Daily Telecom Maintenance.pdf",
  });

  const handleSave = () => {
    dispatch(saveData(id));
  };
  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/">Daily Telecom Maintenance Checklist</Link>
            <Link to="/">Edit</Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
            <form onSubmit={handleSubmit}>
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
                <div className="col-md-4">
                  <label>Employee Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="empName"
                    value={formValues.empName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="empId"
                    value={formValues.empId}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="col-md-4">
                  <label>Signature</label>
                  <input
                    type="text"
                    className="form-control"
                    name="signature"
                    value={formValues.signature}
                    onChange={handleChange}
                  />
                </div> */}
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
               
                    <button type="submit" className="btn btn-primary">
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

export default EditDailyTelecomCheckList;
