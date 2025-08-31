import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm } from "../validation/operationValidationSchemas";
import { formatDate } from "../../../data/formatDate";
import station from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const OperationStationDiaryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const stationDiary = useSelector((state) => state.data);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
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

  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formData.stationName) {
      errors.stationName = "Station name is required";
    }
    
    if (!formData.date) {
      errors.date = "Date is required";
    }

    // Staff validation
    if (formData.staffOnDuty.length === 0) {
      errors.staffOnDuty = "At least one staff member is required";
    }

    // Numeric validations
    formData.contractorStaff.forEach((contractor, index) => {
      if (contractor.numberOfStaff && contractor.numberOfStaff < 1) {
        errors[`contractor_${index}`] = "Number of staff must be positive";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT CHANGE HANDLER
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
    
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // PRESERVED EXACT SELECT ALL HANDLER
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

  // PRESERVED EXACT ARRAY HANDLERS
  const handleArrayChange = (index, field, value, arrayName) => {
    const updatedArray = formData[arrayName].map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const addArrayItem = (arrayName, newItem) => {
    if (arrayName === "staffOnDuty" || arrayName === "contractorStaff") {
      const updatedArray = [...formData[arrayName]];
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

  // PRESERVED EXACT SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    dispatch(addData({ formType: slug, values: formData }))
      .then(() => {
        console.log("Form Data Submitted:", formData);
        navigate(`/list/${slug}`);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { text: "Station Diary", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="OPERATION STATION DIARY REGISTER"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="medium"
      formId="29"
      containerWidth="100%"
    >
      {/* PRESERVED EXACT BASIC INFORMATION SECTION */}
      <div className='row mb-3'>
        <div className='col-md-4'>
          <div className="mb-3">
            <label htmlFor="stationName" className="form-label">
              Station Name:
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.stationName ? 'is-invalid' : ''}`}
              name="stationName"
              value={formData.stationName}
              onChange={handleChange}
              required
            >
              <option value="">Select a Station</option>
              {station.map((stn, index) => (
                <option key={index} value={stn["Station Name"]}>
                  {stn["Station Name"]}
                </option>
              ))}
            </select>
            {formErrors.stationName && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.stationName}
              </div>
            )}
          </div>
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="date"
            name="date"
            label="Date:"
            value={formData.date}
            onChange={handleChange}
            required={true}
            error={formErrors.date}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="time"
            name="dutyShiftTimings"
            label="Duty Shift Timings:"
            value={formData.dutyShiftTimings}
            onChange={handleChange}
            error={formErrors.dutyShiftTimings}
          />
        </div>
      </div>

      {/* PRESERVED EXACT STAFF ON DUTY SECTION */}
      <h5>1. Staff On Duty</h5>
      <div className="mb-3">
        {formData.staffOnDuty.map((staff, index) => (
          <div key={index} className="d-flex align-items-center gap-3 mb-3 p-3 border rounded">
            <div className="col-md-5">
              <label>Name & Designation:</label>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  value={staff.name}
                  placeholder="Name"
                  onChange={(e) =>
                    handleArrayChange(index, "name", e.target.value, "staffOnDuty")
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Designation"
                  value={staff.designation}
                  onChange={(e) =>
                    handleArrayChange(index, "designation", e.target.value, "staffOnDuty")
                  }
                />
              </div>
            </div>
            <div className="col-md-3">
              <label>Location:</label>
              <input
                type="text"
                className="form-control"
                value={staff.location}
                onChange={(e) =>
                  handleArrayChange(index, "location", e.target.value, "staffOnDuty")
                }
              />
            </div>
            <div className="col-md-2">
              <label>Duty Shift Timing:</label>
              <input
                type="time"
                className="form-control"
                value={staff.shiftTiming}
                onChange={(e) =>
                  handleArrayChange(index, "shiftTiming", e.target.value, "staffOnDuty")
                }
              />
            </div>
            <div className="col-md-1">
              <button
                type="button"
                className="btn btn-danger btn-sm mt-4"
                onClick={() => removeArrayItem(index, "staffOnDuty")}
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-primary btn-sm"
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
            className="btn btn-secondary btn-sm"
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
        </div>
      </div>

      {/* PRESERVED EXACT CONTRACTOR STAFF SECTION */}
      <h5>2. Contractor/Other Staff On Duty</h5>
      <div className="mb-3">
        {formData.contractorStaff.map((contractor, index) => (
          <div key={index} className="d-flex align-items-center gap-3 mb-3 p-3 border rounded">
            <div className="col-md-2">
              <label><strong>{contractor.agency}:</strong></label>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Agency Name"
                value={contractor.agencyName}
                onChange={(e) =>
                  handleArrayChange(index, "agencyName", e.target.value, "contractorStaff")
                }
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="No. of Staff"
                value={contractor.numberOfStaff}
                min="1"
                onChange={(e) =>
                  handleArrayChange(index, "numberOfStaff", e.target.value, "contractorStaff")
                }
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Remarks"
                value={contractor.remarks}
                onChange={(e) =>
                  handleArrayChange(index, "remarks", e.target.value, "contractorStaff")
                }
              />
            </div>
            <div className="col-md-1">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeArrayItem(index, "contractorStaff")}
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() =>
            addArrayItem("contractorStaff", {
              agency: "Other (if available)",
              agencyName: "",
              numberOfStaff: "",
              remarks: "",
            })
          }
        >
          Add Other (if available)
        </button>
      </div>

      {/* PRESERVED EXACT EVENTS SECTION */}
      <h5>3. Events/Incidents/Accidents</h5>
      <div className="mb-3">
        {formData.events.map((event, index) => (
          <div key={index} className="d-flex gap-3 mb-3 p-3 border rounded">
            <div className="col-md-3">
              <label>Time:</label>
              <input
                type="time"
                className="form-control"
                value={event.time}
                onChange={(e) =>
                  handleArrayChange(index, "time", e.target.value, "events")
                }
              />
            </div>
            <div className="col-md-8">
              <label>Details:</label>
              <input
                type="text"
                className="form-control"
                value={event.details}
                onChange={(e) =>
                  handleArrayChange(index, "details", e.target.value, "events")
                }
              />
            </div>
            <div className="col-md-1">
              <button
                type="button"
                className="btn btn-danger btn-sm mt-4"
                onClick={() => removeArrayItem(index, "events")}
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={() => addArrayItem("events", { time: "", details: "" })}
        >
          Add Event
        </button>
      </div>

      {/* PRESERVED EXACT CONDITION OF EQUIPMENT SECTION */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>4. Condition of Equipment</h5>
          <label>
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
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label>A) VDU : (OK/Not Ok)</label>
              <input
                type="checkbox"
                name="a"
                checked={formData.conditionOfEquipment.a}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label>B) MMI: (OK/Not Ok)</label>
              <input
                type="checkbox"
                name="b"
                checked={formData.conditionOfEquipment.b}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label>C) Points & Crossing: (OK/Not Ok)</label>
              <input
                type="checkbox"
                name="c"
                checked={formData.conditionOfEquipment.c}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label>E) Station Radio/Hand Portable : (Ok/Not ok)</label>
              <input
                type="checkbox"
                name="e"
                checked={formData.conditionOfEquipment.e}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label>F) Telexom System: (OK/Not Ok)</label>
              <input
                type="checkbox"
                name="f"
                checked={formData.conditionOfEquipment.f}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label>G) Fire Panel (FACP): (OK/Not Ok)</label>
              <input
                type="checkbox"
                name="g"
                checked={formData.conditionOfEquipment.g}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label>H) Air Condition:</label>
              <input
                type="checkbox"
                name="h"
                checked={formData.conditionOfEquipment.h}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label>I) Essential Equipment as per SWO: (Available/Not Available)</label>
              <input
                type="checkbox"
                name="i"
                checked={formData.conditionOfEquipment.i}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label>J) Private Number Book : (Available/Not Available)</label>
              <input
                type="checkbox"
                name="j"
                checked={formData.conditionOfEquipment.j}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT COINS & CASH SECTION */}
      <h5>5. Coins & Cash Details</h5>
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="coinsCash.coins"
            label="Coins:"
            value={formData.coinsCash.coins}
            onChange={handleChange}
            error={formErrors.coins}
          />
        </div>
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="coinsCash.sanctionedAmount"
            label="Sanctioned Imprest Amount as Per Finance (in Rs.):"
            value={formData.coinsCash.sanctionedAmount}
            onChange={handleChange}
            error={formErrors.sanctionedAmount}
          />
        </div>
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="coinsCash.totalImprest"
            label="Total Available Imprest/float at station (in Rs.):"
            value={formData.coinsCash.totalImprest}
            onChange={handleChange}
            error={formErrors.totalImprest}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="coinsCash.earning"
            label="Station Earning for the Day:"
            value={formData.coinsCash.earning}
            onChange={handleChange}
            error={formErrors.earning}
          />
        </div>
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="coinsCash.totalCash"
            label="Total Cash:"
            value={formData.coinsCash.totalCash}
            onChange={handleChange}
            error={formErrors.totalCash}
          />
        </div>
      </div>

      {/* PRESERVED EXACT AVAILABILITY SECTION - TOKENS */}
      <h5>6. Availability/Non Availability</h5>
      <h6>Tokens</h6>
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="availability.tokens.openingBalance"
            label="Opening Balance:"
            value={formData.availability.tokens.openingBalance}
            onChange={handleChange}
            error={formErrors.openingBalance}
          />
        </div>
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="availability.tokens.receivedFromAFC"
            label="Received from AFC:"
            value={formData.availability.tokens.receivedFromAFC}
            onChange={handleChange}
            error={formErrors.receivedFromAFC}
          />
        </div>
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="availability.tokens.issuedToOtherStation"
            label="Issued to Other Station:"
            value={formData.availability.tokens.issuedToOtherStation}
            onChange={handleChange}
            error={formErrors.issuedToOtherStation}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="availability.tokens.receivedFromOtherStation"
            label="Received from Other Station:"
            value={formData.availability.tokens.receivedFromOtherStation}
            onChange={handleChange}
            error={formErrors.receivedFromOtherStation}
          />
        </div>
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="availability.tokens.balanceInHand"
            label="Balance in Hand:"
            value={formData.availability.tokens.balanceInHand}
            onChange={handleChange}
            error={formErrors.balanceInHand}
          />
        </div>
      </div>

      {/* PRESERVED EXACT AVAILABILITY SECTION - CSC */}
      <h6>CSC</h6>
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="availability.csc.openingBalance"
            label="Opening Balance:"
            value={formData.availability.csc.openingBalance}
            onChange={handleChange}
            error={formErrors.cscOpeningBalance}
          />
        </div>
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="availability.csc.receivedFromAFC"
            label="Received from AFC:"
            value={formData.availability.csc.receivedFromAFC}
            onChange={handleChange}
            error={formErrors.cscReceivedFromAFC}
          />
        </div>
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="availability.csc.issuedToOtherStation"
            label="Issued to Other Station:"
            value={formData.availability.csc.issuedToOtherStation}
            onChange={handleChange}
            error={formErrors.cscIssuedToOtherStation}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="availability.csc.receivedFromOtherStation"
            label="Received from Other Station:"
            value={formData.availability.csc.receivedFromOtherStation}
            onChange={handleChange}
            error={formErrors.cscReceivedFromOtherStation}
          />
        </div>
        <div className="col-md-6">
          <UniversalOperationFormField
            type="text"
            name="availability.csc.balanceInHand"
            label="Balance in Hand:"
            value={formData.availability.csc.balanceInHand}
            onChange={handleChange}
            error={formErrors.cscBalanceInHand}
          />
        </div>
      </div>

      {/* WATER BOTTLE SECTION */}
      <h6>Water Bottle (if Applicable)</h6>
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="availability.waterBottle"
            label="Water Bottle:"
            value={formData.availability.waterBottle}
            onChange={handleChange}
            error={formErrors.waterBottle}
          />
        </div>
      </div>

      {/* PRESERVED EXACT REMAINING SECTIONS */}
      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="afcReport"
            label="7. AFC Report :OK/Not OK (Any mismatch to be mentioned):"
            value={formData.afcReport}
            onChange={handleChange}
            error={formErrors.afcReport}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="shortcomings"
            label="8. Shortcomings in Housekeeping:"
            value={formData.shortcomings}
            onChange={handleChange}
            error={formErrors.shortcomings}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="upcomingVIPVisit"
            label="9. Upcoming VIP Visit (if any):"
            value={formData.upcomingVIPVisit}
            onChange={handleChange}
            error={formErrors.upcomingVIPVisit}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="newInstallations"
            label="10. New Installations/Changes:"
            value={formData.newInstallations}
            onChange={handleChange}
            error={formErrors.newInstallations}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="workPermit"
            label="11. Work Permit given to other department that continues:"
            value={formData.workPermit}
            onChange={handleChange}
            error={formErrors.workPermit}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="newDocument"
            label="12. New Document Received:"
            value={formData.newDocument}
            onChange={handleChange}
            error={formErrors.newDocument}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="reportsCompleted"
            label="13. Reports to be completed or sent:"
            value={formData.reportsCompleted}
            onChange={handleChange}
            error={formErrors.reportsCompleted}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="instructions"
            label="14. Instructions/Message from OCC or higher authority:"
            value={formData.instructions}
            onChange={handleChange}
            error={formErrors.instructions}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="publicComplaints"
            label="15. Public Complaints lodged during the shift (if Yes, mention the number):"
            value={formData.publicComplaints}
            onChange={handleChange}
            error={formErrors.publicComplaints}
          />
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-md-12'>
          <UniversalOperationFormField
            type="text"
            name="remarks"
            label="Remarks (if any):"
            value={formData.remarks}
            onChange={handleChange}
            error={formErrors.remarks}
          />
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default OperationStationDiaryForm;