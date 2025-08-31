import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from '@mui/material';
import { fetchData,editData } from "../../reducer/redux/tableDataSlice";
import stationData from "../../station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditPMSheetoccYearlyTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const PMsheetList = useSelector((state) => state.data);
  console.log(PMsheetList.data.data);
  const [items, setItems] = useState([]);
  const itmm = PMsheetList.data.data;
  console.log(items);
  useEffect(() => {
   dispatch(fetchData({ formType: slug }));
    setItems(PMsheetList.data.data);
  }, []);
  useEffect(() => {
    setItems(PMsheetList.data.data);
  }, [PMsheetList]);
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
  const initialFormState = {
    id: fd.id,
    systems: fd.systems,
    station: fd.station,
    date: fd.date,
    remarks: fd.remarks,
    notes: fd.notes,
    SName: fd.SName,
    SempId: fd.SempId,
    Ssignature: fd.Ssignature,
    SdateTime: fd.SdateTime,
    MName: fd.MName,
    MempId: fd.MempId,
    Msignature: fd.Msignature,
    MdateTime: fd.MdateTime,
  };

  const [formValues, setFormValues] = useState(initialFormState);
  console.log(formValues);

  const [station, setstation] = useState("---");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [remarks, setRemarks] = useState("");
  const [notes, setNotes] = useState("");
  const [SName, setSName] = useState("");
  const [SempId, setSEmpId] = useState("");
  const [Ssignature, setSSignature] = useState("");
  const [SdateTime, setSDateTime] = useState("");
  const [MName, setMName] = useState("");

  const [MempId, setMEmpId] = useState("");
  const [Msignature, setMSignature] = useState("");
  const [MdateTime, setMDateTime] = useState("");

  const handleBCCChange = (systemId, activityId, type, index, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            const updatedType = {
              ...activity[type],
              values: activity[type].values.map((v, i) =>
                i === index ? value : v
              ),
            };
            return {
              ...activity,
              [type]: updatedType,
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

  // Function to handle sub checkbox changes
  const handleSubCheckboxChange = (systemId, activityId, subLabel, checked) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              subCheckboxes: {
                ...activity.subCheckboxes,
                [subLabel]: checked,
              },
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

  // Function to handle sub input changes
  const handleSubInputChange = (systemId, activityId, subLabel, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              subInputValues: {
                ...activity.subInputValues,
                [subLabel]: value,
              },
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

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(editData({ formType: slug,values:formValues }));
    navigate(`/list/${slug}`);
  };

  // Function to update remarks for an activity
  const updateRemark = (systemId, activityId, value) => {
    const updatedSystems = formValues.systems.map((system) => {
      if (system.id === systemId) {
        const updatedActivities = system.activities.map((activity) => {
          if (activity.id === activityId) {
            return {
              ...activity,
              remark: value,
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

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to>
            YEARLY MAINTENANCE SCHEDUL
          </Link>
          <Link to="">Edit</Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "95%" }}>
          <form onSubmit={handleSubmit}>
            <div className=" mb-3 form-heading-container">
              <h3 className="form-heading">Edit : YEARLY MAINTENANCE SCHEDUL</h3>
              <span className="line-box" style={{ width: "570px" }}></span>
            </div>
            <div className="row mb-3">
                  <div className="col-md-12">
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
            {formValues.systems.map((system) => (
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
                {system.activities.map((activity, index) => (
                  <div className="mb-0" key={activity.id}>
                    <div className="col-md-12 d-flex align-items-center">
                      <label className="text-start">
                        {index + 1}. &nbsp;
                        {activity.label}
                      </label>
                      <input
                        type="checkbox"
                        style={{ flex: 0, marginRight: "80px" }}
                        checked={activity.checked === "yes"}
                        onChange={() => toggleCheckbox(system.id, activity.id)}
                      />
                      <div className="col-2 m-2">
                        <input
                          type="text"
                          style={{ padding: "5px" }}
                          placeholder="Remarks"
                          value={activity.remark} // Bind value to the state
                          onChange={(e) =>
                            updateRemark(system.id, activity.id, e.target.value)
                          }
                        />
                      </div>
                    </div>{" "}
                    <div className="d-flex ">
                      {activity.BCC1 && (
                        <div className="col-3">
                          <label className="text-decoration-underline">
                            {activity.BCC1.label}
                          </label>
                          <div className="">
                            {activity.BCC1.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC1.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC1",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC2 && (
                        <div className="col-3">
                          <label className="text-decoration-underline">
                            {activity.BCC2.label}
                          </label>
                          <div className="">
                            {activity.BCC2.zones.map((zone, zoneIndex) => (
                              <div key={zone}>
                                {zone}:{" "}
                                <input
                                  className="my-1"
                                  type="text"
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC2.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC2",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC3 && (
                        <div className="col-3">
                          <label className="text-decoration-underline">
                            {activity.BCC3.label}
                          </label>
                          <div className="">
                            {activity.BCC3.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC3.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC3",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC4 && (
                        <div className="col-3">
                          <label className="text-decoration-underline">
                            {activity.BCC4.label}
                          </label>
                          <div className="">
                            {activity.BCC4.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC4.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC4",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC5 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC5.label}
                          </label>
                          <div className="">
                            {activity.BCC5.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC5.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC5",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC6 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC6.label}
                          </label>
                          <div className="">
                            {activity.BCC6.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC6.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC6",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC7 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC7.label}
                          </label>
                          <div className="">
                            {activity.BCC7.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC7.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC7",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC8 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC8.label}
                          </label>
                          <div className="">
                            {activity.BCC8.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC8.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC8",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC9 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC9.label}
                          </label>
                          <div className="">
                            {activity.BCC9.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC9.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC9",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC10 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC10.label}
                          </label>
                          <div className="">
                            {activity.BCC10.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC10.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC10",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC11 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC11.label}
                          </label>
                          <div className="">
                            {activity.BCC11.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC11.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC11",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC12 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC12.label}
                          </label>
                          <div className="">
                            {activity.BCC12.zones.map((zone, zoneIndex) => (
                              <div key={zone}>
                                {zone}:{" "}
                                <input
                                  className="my-1"
                                  type="text"
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC12.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC12",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC13 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC13.label}
                          </label>
                          <div className="">
                            {activity.BCC13.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC13.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC13",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC14 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC14.label}
                          </label>
                          <div className="">
                            {activity.BCC14.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC14.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC14",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC15 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC15.label}
                          </label>
                          <div className="">
                            {activity.BCC15.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC15.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC15",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC16 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC16.label}
                          </label>
                          <div className="">
                            {activity.BCC16.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC16.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC16",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC17 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC17.label}
                          </label>
                          <div className="">
                            {activity.BCC17.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC17.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC17",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC18 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC18.label}
                          </label>
                          <div className="">
                            {activity.BCC18.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC18.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC18",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC19 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC19.label}
                          </label>
                          <div className="">
                            {activity.BCC19.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC19.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC19",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC20 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC20.label}
                          </label>
                          <div className="">
                            {activity.BCC20.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC20.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC20",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC21 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC21.label}
                          </label>
                          <div className="">
                            {activity.BCC21.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC21.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC21",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC22 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC22.label}
                          </label>
                          <div className="">
                            {activity.BCC22.zones.map((zone, zoneIndex) => (
                              <div key={zone}>
                                {zone}:{" "}
                                <input
                                  className="my-1"
                                  type="text"
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC22.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC22",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC23 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC23.label}
                          </label>
                          <div className="">
                            {activity.BCC23.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC23.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC23",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC24 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC24.label}
                          </label>
                          <div className="">
                            {activity.BCC24.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC24.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC24",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC25 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC25.label}
                          </label>
                          <div className="">
                            {activity.BCC25.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC25.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC25",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC26 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC26.label}
                          </label>
                          <div className="">
                            {activity.BCC26.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC26.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC26",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC27 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC27.label}
                          </label>
                          <div className="">
                            {activity.BCC27.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC27.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC27",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC28 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC28.label}
                          </label>
                          <div className="">
                            {activity.BCC28.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC28.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC28",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC29 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC29.label}
                          </label>
                          <div className="">
                            {activity.BCC29.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC29.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC29",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activity.BCC30 && (
                        <div className="col-6">
                          <label className="text-decoration-underline">
                            {activity.BCC30.label}
                          </label>
                          <div className="">
                            {activity.BCC30.zones.map((zone, zoneIndex) => (
                              <div className="" key={zone}>
                                {zone}:{" "}
                                <input
                                  type="text"
                                  className="my-1 "
                                  style={{
                                    width: 80,
                                    height: 25,
                                    margin: "0 5px",
                                  }}
                                  value={activity.BCC30.values[zoneIndex]}
                                  onChange={(e) =>
                                    handleBCCChange(
                                      system.id,
                                      activity.id,
                                      "BCC30",
                                      zoneIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {activity.sub && (
                      <div className="d-flex gap-3">
                        {activity.sub.map((subLabel) => (
                          <div key={subLabel}>
                            {subLabel}{" "}
                            <input
                              type="checkbox"
                              placeholder={subLabel}
                              checked={activity.subCheckboxes[subLabel]}
                              onChange={(e) =>
                                handleSubCheckboxChange(
                                  system.id,
                                  activity.id,
                                  subLabel,
                                  e.target.checked
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {activity.subInput && (
                      <div className="d-flex gap-3">
                        {activity.subInput.map((subLabel) => (
                          <div key={subLabel} className="col-1">
                            <input
                              type="text"
                              className="form-control p-2"
                              placeholder={subLabel}
                              value={activity.subInputValues[subLabel]}
                              onChange={(e) =>
                                handleSubInputChange(
                                  system.id,
                                  activity.id,
                                  subLabel,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}


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
};

export default EditPMSheetoccYearlyTable;