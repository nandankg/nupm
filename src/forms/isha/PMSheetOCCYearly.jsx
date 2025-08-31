import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import { addData } from "../../reducer/isha/PM8reducer";
import stationData from "../../station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const PMSheetoccYearly = () => {
  const navigate = useNavigate();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const dispatch = useDispatch();
  const basicInitialValues = {
    systems: [
      {
        id: 1,
        name: "PAS-PIDS",
        activities: [
          {
            id: 1,
            label:
              "Perform the Internal cleaning of amplifiers with shutting down if necessary equipments ",
            remark: "",
          },

          {
            id: 2,
            label: "Perform Central Servers Redundancy Check",
            remark: "",
          },
          {
            id: 3,
            label:
              "Check PIDS-PAS and Telephone/Radio Integration by Making Announcements",
            remark: "",
          },
          {
            id: 4,
            label:
              "Perform PIDS-PAS ATS Link Redundancy Check in co-ordination with Signalling Depratment",
            remark: "",
          },
          {
            id: 5,
            label: "Take Backup of PIDS-PAS Server,NCO,QSC",
            remark: "",
          },
        ],
      },
      {
        id: 2,
        name: "FOTS",
        activities: [
          {
            id: 1,
            label:
              "Checking of fiber continuity and fiber loss for Dark fibers, using OTDR. Record the values in Fiber loss sheet. ",
            remark: "",
          },
          {
            id: 2,
            label: "Take the backup of Core Switch and ASW server farm",
            remark: "",
          },
          {
            id: 3,
            label: "Calculation of link loss",
            remark: "",
          },
          {
            id: 4,
            BCC1: {
              label: "Next Station to present station - TPND to BCC",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            BCC2: {
              label: "Present Station to Next station - BCC to TPND",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            BCC3: {
              label: "Previous Station to present station - SHVA to BCC",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            BCC4: {
              label: "Present Station to previous station - BCC to SHVA",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 5,
            label: "Measure Signal strength of Linkage ports (in dBs)",
            remark: "",
          },
          {
            id: 6,
            label: "Measure Signal strength of VFL Linkage ports BCC-OCC",
            remark: "",
          },
          {
            id: 7,
            label: "Calculation of link loss",
            BCC5: {
              label: "BCC to OCC VFL link 1 loss",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 8,
            label: "Calculation of link loss",
            BCC6: {
              label: "BCC to OCC VFL link 2 loss",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 9,
            label: "Measure Signal strength of Linkage ports TPND-BCC",
            remark: "",
          },
          {
            id: 10,
            BCC7: {
              label: "TPND - S1- PORT 50-BCC",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 11,
            BCC8: {
              label: "BCC - 2/2/3",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 12,
            label: "Measure Signal strength of Linkage ports ABST- BCC",
            remark: "",
          },
          {
            id: 13,
            BCC9: {
              label: "ABST- S1- PORT 50-BCC",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 14,
            BCC10: {
              label: "BCC - 2/2/10",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 15,
            label: "Measure Signal strength of Linkage ports AMSM - BCC",
            remark: "",
          },
          {
            id: 16,
            BCC11: {
              label: "AMSM- S2- PORT 26-BCC",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 17,
            BCC12: {
              label: "BCC - 2/1/18",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 18,
            label: "Measure Signal strength of Linkage ports HSGJ - BCC",
            remark: "",
          },
          {
            id: 19,
            BCC13: {
              label: "HSGJ- S2- PORT 26-BCC",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 20,
            BCC14: {
              label: "BCC - 2/1/10",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 21,
            label: "Measure Signal strength of Linkage ports BSNM - BCC",
            remark: "",
          },
          {
            id: 22,
            BCC15: {
              label: "BSNM - S2- PORT 26-BCC ",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 23,
            BCC16: {
              label: "BCC - 2/1/12",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 24,
            label: "Measure Signal strength of Linkage ports LHMT - BCC",
            remark: "",
          },
          {
            id: 25,
            BCC17: {
              label: "LHMT - S1- PORT 50-BCC",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 26,
            BCC18: {
              label: "BCC - 2/1/17",
              zones: ["Tx", "Rx"],
              values: ["", ""],
            },
            remark: "",
          },
          {
            id: 27,
            label: "Calculation of link loss (in dBs)",
            remark: "",
          },
          {
            id: 28,
            label: "Ring 1:BCC-TPND-ALMB-SHVA",
            remark: "",
          },
          {
            id: 29,
            BCC19: {
              label: "ALMB to BCC",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 30,
            BCC20: {
              label: "BCC to ALMB",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 31,
            label: "Ring 2:BCC-ABST-CHBG-SHVA",
            remark: "",
          },
          {
            id: 32,
            BCC21: {
              label: "ABST to BCC",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 33,
            BCC22: {
              label: "BCC to ABST",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 34,
            label: "Ring 3:BCC-AMSM-CCAP-SHVA",
            remark: "",
          },
          {
            id: 35,
            BCC23: {
              label: "AMSM to BCC",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 36,
            BCC24: {
              label: "BCC to AMSM",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 37,
            label: "Ring 4:BCC-HSGJ-KDSS-SHVA",
            remark: "",
          },
          {
            id: 38,
            BCC25: {
              label: "HSGJ to BCC",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 39,
            BCC26: {
              label: "BCC to HSGJ",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 40,
            label: "Ring 5:BCC-BSNM-VSVM-SHVA",
            remark: "",
          },
          {
            id: 41,
            BCC27: {
              label: "BSNM to BCC ",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 42,
            BCC28: {
              label: "BCC to BSNM",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 43,
            label: "Ring 6:BCC-LHMT-MSPA-SHVA",
            remark: "",
          },
          {
            id: 44,
            BCC29: {
              label: "LHMT to BCC",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
          {
            id: 45,
            BCC30: {
              label: "BCC to LHMT",
              zones: ["Tx", "Rx", "Loss", "Prev.loss"],
              values: ["", "", "", ""],
            },
            remark: "",
          },
        ],
      },
      {
        id: 3,
        name: "Radio",
        activities: [
          {
            id: 1,
            label:
              "Clean Interior: Shutdown, cleanout dust by Dry Smooth Cloth, Blower, Vacuum Etc of RCW",
            remark: "",
          },
          {
            id: 2,
            label: "Take the backup of All Radio(MSO) and CAD Rack Equipmets",
            remark: "",
          },
        ],
      },
      {
        id: 4,
        name: "Telephone",
        activities: [
          {
            id: 1,
            label:
              "Internal cleaning of EPABX cabinet by shutting down completely",
            remark: "",
          },
        ],
      },
      {
        id: 5,
        name: "MSC ",
        activities: [
          {
            id: 1,
            label: "Cleaning and Tightening of GPS Receiver",
            remark: "",
          },
        ],
      },
      {
        id: 6,
        name: "CCTV",
        activities: [
          {
            id: 1,
            label:
              "Checking of CCTV Server OCC Node to BCC node changeover and vice versa",
            remark: "",
          },
          {
            id: 2,
            label: "Internal Cleaning of All CCTV Server",
            remark: "",
          },
          {
            id: 3,
            label: "Take the backup of CCTV Configuration",
            remark: "",
          },
        ],
      },
      {
        id: 7,
        name: "UPS(60KVA)",
        activities: [
          {
            id: 1,
            label:
              "Internal Cleaning of All cubical of UPS System(ATS,UPS,SCVS,ACDB)",
            remark: "",
          },
        ],
      },
      {
        id: 8,
        name: "ACS ",
        activities: [
          {
            id: 1,
            label: "Take the backup of ACS Configuration",
            remark: "",
          },
          {
            id: 2,
            label: " Internal Cleaning of ACS Server",
            remark: "",
          },
        ],
      },
    ],
    station: "",
    date:"",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const [remarks, setRemarks] = useState("");
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
  const mms = useSelector((state) => state.MMS);

  console.log(slug);

  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };
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
          <Link underline="hover" color="inherit">
            YEARLY MAINTENANCE SCHEDUL
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "95%" }}>
          <form onSubmit={handleSubmit}>
            <div className=" mb-3 form-heading-container">
              <h3 className="form-heading">YEARLY MAINTENANCE SCHEDUL</h3>
              <span className="line-box" style={{ width: "470px" }}></span>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputstation" className="form-label">
                  Station
                </label>
                <select
                  className="form-control"
                  id="station"
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
              <div className="col-md-6">
              <label htmlFor="inputstation" className="form-label">
                  Date
                </label>
              <input
              type="date"
                  className="form-control"
                  id="station"
                  onChange={(e) =>
                    setFormValues({ ...formValues, station: e.target.value })
                  }
                  
                />
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
                    <div className="d-flex flex-column bd-highlight mb-3 ">
                      {activity.BCC1 && (
                        <div className="col-6">
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
                        <div className="col-6">
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
                        <div className="col-6">
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
                        <div className="col-6">
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
export default PMSheetoccYearly;
