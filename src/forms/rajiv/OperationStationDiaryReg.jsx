import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../reducer/rajiv/OperationStationDiaryReducer";
import { formatDate } from "../../data/formatDate";
const MetroRailForm = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const OperationStationDiaryList = useSelector(
    (state) => state.OperationStationDiary
  );
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (OperationStationDiaryList) {
      setSlug(OperationStationDiaryList.slug);
    }
  }, [OperationStationDiaryList]);
  const [formData, setFormData] = useState({
    stationName: "",
    date: formatDate(new Date().toString()),
    dutyShiftTimings: "",
    name: "",
    designation: "",
    empNo: "",
    staffOnDuty: [{ name: "", designation: "", location: "", shiftTiming: "" }],
    contractorStaff: [
      {
        agency: "Housekeeping",
        agencyName: "",
        numberOfStaff: "",
        remarks: "",
      },
      { agency: "Ticketing", agencyName: "", numberOfStaff: "", remarks: "" },
      { agency: "CFA", agencyName: "", numberOfStaff: "", remarks: "" },
      { agency: "Security", agencyName: "", numberOfStaff: "", remarks: "" },
    ],
    events: [{ time: "", details: "" }],
    coinsCash: {
      coins: "",
      sanctionedAmount: "",
      totalImprest: "",
      earning: "",
      totalCash: "",
    },
    availability: {
      tokens: {
        openingBalance: "",
        receivedFromAFC: "",
        issuedToOtherStation: "",
        receivedFromOtherStation: "",
        balanceInHand: "",
      },
      csc: {
        openingBalance: "",
        receivedFromAFC: "",
        issuedToOtherStation: "",
        receivedFromOtherStation: "",
        balanceInHand: "",
      },
      waterBottle: "",
    },
    afcReport: "",
    shortcomings: "",
    upcomingVIPVisit: "",
    newInstallations: "",
    workPermit: "",
    newDocument: "",
    reportsCompleted: "",
    instructions: "",
    publicComplaints: "",
    remarks: "",
    conditionOfEquipment: {
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: false,
      h: false,
      i: false,
      j: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("coinsCash.")) {
      setFormData((prevState) => ({
        ...prevState,
        coinsCash: {
          ...prevState.coinsCash,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name.startsWith("availability.")) {
      const nestedKeys = name.split(".");
      if (nestedKeys.length === 2) {
        setFormData((prevState) => ({
          ...prevState,
          availability: {
            ...prevState.availability,
            [nestedKeys[1]]: value,
          },
        }));
      } else if (nestedKeys.length === 3) {
        setFormData((prevState) => ({
          ...prevState,
          availability: {
            ...prevState.availability,
            [nestedKeys[1]]: {
              ...prevState.availability[nestedKeys[1]],
              [nestedKeys[2]]: value,
            },
          },
        }));
      }
    } else if (name === "availability.waterBottle") {
      setFormData((prevState) => ({
        ...prevState,
        availability: {
          ...prevState.availability,
          waterBottle: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        conditionOfEquipment: {
          ...prevState.conditionOfEquipment,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handler for "Select All" checkbox change
  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    const updatedEquipment = {};
    for (let key in formData.conditionOfEquipment) {
      updatedEquipment[key] = checked;
    }
    setFormData((prevState) => ({
      ...prevState,
      conditionOfEquipment: updatedEquipment,
    }));
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    const updatedArray = formData[arrayName].map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const addArrayItem = (arrayName, newItem) => {
    if (arrayName === "staffOnDuty" || arrayName === "contractorStaff") {
      const updatedArray = [...formData[arrayName]];
      // Check if "Other (if available)" entry already exists
      const otherAvailable = updatedArray.some(
        (item) => item.agencyName === "Other (if available)"
      );
      if (!otherAvailable) {
        updatedArray.push(newItem);
        setFormData({ ...formData, [arrayName]: updatedArray });
      }
    } else {
      const updatedArray = [...formData[arrayName], newItem];
      setFormData({ ...formData, [arrayName]: updatedArray });
    }
  };

  const removeArrayItem = (index, arrayName) => {
    const updatedArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    dispach(addData(formData));
    navigate(`/list/${slug}`);
  };
  console.log(formData);

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/operation/stationdiary/register">Station Diary </Link>
          <Link to="">Register</Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="row my-3">
              <div className="col-md-12">
                <label>1. Staff On Duty</label>
              </div>
            </div>
            {formData.staffOnDuty.map((staff, index) => (
              <div key={index} className="d-flex align-items-center gap-3 mb-3">
                <div className="col-md-5">
                  <label>Name & Designation:</label>
                  <br />
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      value={staff.name}
                      required
                      placeholder="Name"
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "name",
                          e.target.value,
                          "staffOnDuty"
                        )
                      }
                    />
                    <input
                      type="text"
                      placeholder="Designation"
                      value={staff.designation}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "designation",
                          e.target.value,
                          "staffOnDuty"
                        )
                      }
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <label>Location:</label>
                  <br />
                  <input
                    type="text"
                    value={staff.location}
                    required
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        "location",
                        e.target.value,
                        "staffOnDuty"
                      )
                    }
                  />
                </div>
                <div className="col-md-2">
                  <label>Duty Shift Timing:</label>
                  <br />
                  <input
                    type="time"
                    value={staff.shiftTiming}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        "shiftTiming",
                        e.target.value,
                        "staffOnDuty"
                      )
                    }
                  />
                </div>
                <div className="col-md-2">
                  <TiDelete
                    size={30}
                    onClick={() => removeArrayItem(index, "staffOnDuty")}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary "
              onClick={() =>
                addArrayItem("staffOnDuty", {
                  name: "",
                  designation: "",
                  location: "",
                  shiftTiming: "",
                })
              }
            >
              Add Staff
            </button>
            <button
              type="button"
              className="btn btn-primary mx-3"
              onClick={() =>
                addArrayItem("staffOnDuty", {
                  name: "Other (if available)",
                  designation: "",
                  location: "",
                  shiftTiming: "",
                })
              }
            >
              Add Other (if available)
            </button>
            <div className="row my-3">
              <div className="col-md-12">
                <label>2. Contractor/Other Staff On Duty</label>
              </div>
            </div>
            {formData.contractorStaff.map((contractor, index) => (
              <div
                key={index}
                className="col-md-12 d-flex  align-items-center gap-3 mb-3"
              >
                <div className="col-md-2">
                  <label>{contractor.agency}: </label>
                </div>
                <div className="col-md-3">
                  {/* <label>:</label> */}

                  <input
                    type="text"
                    placeholder="Agency Name"
                    value={contractor.agencyName}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        "agencyName",
                        e.target.value,
                        "contractorStaff"
                      )
                    }
                  />
                </div>
                <div className="col-md-3">
                  {/* <label>:</label> */}

                  <input
                    type="number"
                    placeholder="No. of Staff"
                    value={contractor.numberOfStaff}
                    min="1"
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        "numberOfStaff",
                        e.target.value,
                        "contractorStaff"
                      )
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    placeholder="Remarks"
                    value={contractor.remarks}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        "remarks",
                        e.target.value,
                        "contractorStaff"
                      )
                    }
                  />
                  <TiDelete
                    size={30}
                    style={{ marginLeft: "10px" }}
                    onClick={() => removeArrayItem(index, "contractorStaff")}
                  />
                </div>
              </div>
            ))}
            {/* <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                addArrayItem("contractorStaff", {
                  agencyName: "",
                  numberOfStaff: "",
                  remarks: "",
                })
              }
            >
              Add Contractor
            </button> */}
            <button
              type="button"
              className="btn btn-primary "
              onClick={() =>
                addArrayItem("contractorStaff", {
                  agencyName: "Other (if available)",
                  numberOfStaff: "",
                  remarks: "",
                })
              }
            >
              Add Other (if available)
            </button>
            <div className="row my-3">
              <div className="col-md-12">
                <label>3. Events/Incidents/Accidents</label>
              </div>
            </div>
            {formData.events.map((event, index) => (
              <div key={index} className="col-md-12 d-flex gap-3 mb-3">
                <div className="col-md-3">
                  <label>Time:</label>
                  <input
                    type="time"
                    value={event.time}
                    onChange={(e) =>
                      handleArrayChange(index, "time", e.target.value, "events")
                    }
                  />
                </div>
                <div className="col-md-9">
                  <label>Details:</label>
                  <input
                    type="text"
                    style={{ width: "inherit" }}
                    value={event.details}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        "details",
                        e.target.value,
                        "events"
                      )
                    }
                  />
                  <TiDelete
                    size={30}
                    onClick={() => removeArrayItem(index, "events")}
                  />
                </div>
              </div>
            ))}
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => addArrayItem("events", { time: "", details: "" })}
            >
              Add Event
            </button>
            <div className="row my-3">
              <div className="col-md-12 d-flex justify-content-between">
                <label className="text-start">4. Condition of Equipment</label>
                <label className="text-end">
                  Select All &nbsp;
                  <input
                    type="checkbox"
                    onChange={handleSelectAllChange}
                    checked={Object.values(formData.conditionOfEquipment).every(
                      (val) => val === true
                    )}
                  />
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="d-flex justify-content-between align-items-center">
                <label className="text-start">A) VDU : (OK/Not Ok)</label>
                <input
                  type="checkbox"
                  name="a"
                  style={{ flex: "none", marginRight: "20px" }}
                  checked={formData.conditionOfEquipment.a}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <label className="text-start">B) MMI: (OK/Not Ok)</label>
                <input
                  type="checkbox"
                  name="b"
                  style={{ flex: "none", marginRight: "20px" }}
                  checked={formData.conditionOfEquipment.b}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <label className="text-start">
                  C) Points & Crossing: (OK/Not Ok)
                </label>
                <input
                  style={{ flex: "none", marginRight: "20px" }}
                  type="checkbox"
                  name="c"
                  checked={formData.conditionOfEquipment.c}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* <label className="text-start">D) Axle Counter Reset: (Yes/No)</label>
              <input
                type="checkbox"
                name="d"
                                    style={{ flex: "none", marginRight: "20px" }}


                checked={formData.conditionOfEquipment.d}
                onChange={handleChange}
              /> */}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <label className="text-start">
                  E) Station Radio/Hand Portable : (Ok/Not ok)
                </label>
                <input
                  type="checkbox"
                  name="g"
                  style={{ flex: "none", marginRight: "20px" }}
                  checked={formData.conditionOfEquipment.e}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <label className="text-start">
                  F) Telexom System: (OK/Not Ok)
                </label>
                <input
                  type="checkbox"
                  name="e"
                  style={{ flex: "none", marginRight: "20px" }}
                  checked={formData.conditionOfEquipment.f}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <label className="text-start">
                  G) Fire Panel (FACP): (OK/Not Ok)
                </label>
                <input
                  type="checkbox"
                  name="f"
                  style={{ flex: "none", marginRight: "20px" }}
                  checked={formData.conditionOfEquipment.g}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <label className="text-start">H) Air Condition:</label>
                <input
                  type="checkbox"
                  name="h"
                  style={{ flex: "none", marginRight: "20px" }}
                  checked={formData.conditionOfEquipment.h}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <label className="text-start">
                  I) Essential Equipment as per SWO: (Available/Not Available)
                </label>
                <input
                  type="checkbox"
                  name="i"
                  style={{ flex: "none", marginRight: "20px" }}
                  checked={formData.conditionOfEquipment.i}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <label className="text-start">
                  J) Private Number Book : (Available/Not Available)
                </label>
                <input
                  type="checkbox"
                  name="j"
                  style={{ flex: "none", marginRight: "20px" }}
                  checked={formData.conditionOfEquipment.j}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                <label>5. Coins & Cash Details</label>
              </div>
            </div>
            <div>
              <div className="col-md-12 d-flex flex-wrap gap-3">
                <div className="d-inline">
                  <label>Coins:</label>
                  <input
                    type="text"
                    name="coinsCash.coins"
                    value={formData.coinsCash.coins}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-inline">
                  <label>
                    Sanctioned Imprest Amount as Per Finance (in Rs.):
                  </label>
                  <input
                    type="text"
                    name="coinsCash.sanctionedAmount"
                    value={formData.coinsCash.sanctionedAmount}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-inline">
                  <label>
                    Total Available Imprest/float at station (in Rs.):
                  </label>
                  <input
                    type="text"
                    name="coinsCash.totalImprest"
                    value={formData.coinsCash.totalImprest}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-inline">
                  <label>Station Earning for the Day :</label>
                  <input
                    type="text"
                    name="coinsCash.earning"
                    value={formData.coinsCash.earning}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-inline">
                  <label>Total Cash:</label>
                  <input
                    type="text"
                    name="coinsCash.totalCash"
                    value={formData.coinsCash.totalCash}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                <label>6. Availability/Non Availability</label>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                <label>Tokens</label>
              </div>
            </div>
            <div className="col-md-12 d-flex flex-wrap">
              <div>
                <label className="text-start" style={{ fontSize: "15px" }}>
                  Opening Balance:
                  <br />
                  <input
                    type="text"
                    name="availability.tokens.openingBalance"
                    value={formData.availability.tokens.openingBalance}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="text-start" style={{ fontSize: "15px" }}>
                  Received from AFC:
                  <br />
                  <input
                    type="text"
                    name="availability.tokens.receivedFromAFC"
                    value={formData.availability.tokens.receivedFromAFC}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="text-start" style={{ fontSize: "15px" }}>
                  Issued to Other Station:
                  <br />
                  <input
                    type="text"
                    name="availability.tokens.issuedToOtherStation"
                    value={formData.availability.tokens.issuedToOtherStation}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="text-start" style={{ fontSize: "15px" }}>
                  Received from Other Station:
                  <br />
                  <input
                    type="text"
                    name="availability.tokens.receivedFromOtherStation"
                    value={
                      formData.availability.tokens.receivedFromOtherStation
                    }
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="text-start" style={{ fontSize: "15px" }}>
                  Balance in Hand:
                  <br />
                  <input
                    style={{ width: "150px" }}
                    type="text"
                    name="availability.tokens.balanceInHand"
                    value={formData.availability.tokens.balanceInHand}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                <label>CSC</label>
              </div>
            </div>
            <div className="col-md-12 d-flex flex-wrap">
              <div>
                <label className="text-start" style={{ fontSize: "15px" }}>
                  Opening Balance:
                  <br />
                  <input
                    type="text"
                    name="availability.csc.openingBalance"
                    value={formData.availability.csc.openingBalance}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="text-start" style={{ fontSize: "15px" }}>
                  Received from AFC:
                  <br />
                  <input
                    type="text"
                    name="availability.csc.receivedFromAFC"
                    value={formData.availability.csc.receivedFromAFC}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="text-start" style={{ fontSize: "15px" }}>
                  Issued to Other Station:
                  <br />
                  <input
                    type="text"
                    name="availability.csc.issuedToOtherStation"
                    value={formData.availability.csc.issuedToOtherStation}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="text-start" style={{ fontSize: "15px" }}>
                  Received from Other Station:
                  <br />
                  <input
                    type="text"
                    name="availability.csc.receivedFromOtherStation"
                    value={formData.availability.csc.receivedFromOtherStation}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="text-start" style={{ fontSize: "15px" }}>
                  Balance in Hand:
                  <br />
                  <input
                    style={{ width: "150px" }}
                    type="text"
                    name="availability.csc.balanceInHand"
                    value={formData.availability.csc.balanceInHand}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                <label>Water Bottle (if Applicable)</label>
              </div>
            </div>
            <div>
              <label className="text-start" style={{ fontSize: "15px" }}>
                Water Bottle:
                <br />
                <input
                  type="text"
                  name="availability.waterBottle"
                  value={formData.availability.waterBottle}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                <label>
                  7. AFC Report :OK/Not OK (Any mismatch to be mentioned):
                </label>
                <input
                  type="text"
                  name="afcReport"
                  value={formData.afcReport}
                  onChange={handleChange}
                />
              </div>
            </div>{" "}
            <div className="row my-3">
              <div className="col-md-12">
                <label>8. Shortcomings in Housekeeping:</label>
                <input
                  type="text"
                  name="shortcomings"
                  value={formData.shortcomings}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                {" "}
                <label>9. Upcoming VIP Visit (if any):</label>
                <input
                  type="text"
                  name="upcomingVIPVisit"
                  value={formData.upcomingVIPVisit}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                <label>10. New Installations/Changes:</label>
                <input
                  type="text"
                  name="newInstallations"
                  value={formData.newInstallations}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                {" "}
                <label>
                  11. Work Permit given to other department that continues:
                </label>
                <input
                  type="text"
                  name="workPermit"
                  value={formData.workPermit}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                {" "}
                <label>12. New Document Received:</label>
                <input
                  type="text"
                  name="newDocument"
                  value={formData.newDocument}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                {" "}
                <label>13. eports to be completed or sent:</label>
                <input
                  type="text"
                  name="reportsCompleted"
                  value={formData.reportsCompleted}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                {" "}
                <label>
                  14. Instructions/Message from OCC or higher authority:
                </label>
                <input
                  type="text"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                {" "}
                <label>
                  15. Public Complaints lodged during the shift (if Yes, mention
                  the number):
                </label>
                <input
                  type="text"
                  name="publicComplaints"
                  value={formData.publicComplaints}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                {" "}
                <label> Remarks (if any):</label>
                <input
                  style={{ width: "80%" }}
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MetroRailForm;
