import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, editData } from "../../reducer/monika/OfficerReducer";
import { formatDate } from "../../data/formatDate";
function OfficersEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const OfficersList = useSelector((state) => state.Officers);
  console.log(OfficersList.data.data);
  const [items, setItems] = useState([]);
  const [systems, setSystems] = useState([]);
  const itmm = OfficersList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(OfficersList.data.data);
  }, []);

  useEffect(() => {
    setItems(OfficersList.data.data);
    setSlug(OfficersList.slug);
  }, [OfficersList]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData ? filteredData[0] : {};
  const basicInitialValues = {
    id: fd?.id || "",
    date: fd?.date || "",
    update_id: fd?.id || "",
    systems: fd?.systems || [],
    remarks: fd?.remarks || "",
    staffname: fd?.staffname || "",
    signature: fd?.signature || "",
    employee_id: fd?.employee_id || "",
    department: fd?.department || "",
    unit: fd?.unit || "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
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

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/form/officer-colony">Location: Officers Colony</Link>
          <Link to="">Edit</Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            {formValues.systems.map((system) => (
              <div key={system.id}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>
                      <b>{system.name}</b> &nbsp;
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
                    </label>
                  </div>
                </div>
                <div
                // className="d-flex flex-wrap justify-content-between"
                // style={{ columnGap: "50px" }}
                >
                  {system.activities.map((activity, index) => (
                    <div className=" mb-3  " key={activity.id}>
                      <div className="col-md-12 ">
                        <label>
                          {index + 1}. &nbsp;
                          {activity.label}
                        </label>
                        <input
                          type="checkbox"
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
            {/* <div className="row mb-3">
              <div className="col-md-6">
                <label>Signature</label>
                <input
                  type="text"
                  className="form-control"
                  name="signature"
                  value={formValues.signature}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Name Of Staff Verified:</label>
                <input
                  type="text"
                  className="form-control"
                  name="staffname"
                  value={formValues.staffname}
                  onChange={handleChange}
                />
              </div>
            </div> */}

            <div className="col-12 text-center pt-3">
              <button type="submit" className="btn btn-primary mt-3">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OfficersEdit;
