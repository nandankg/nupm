import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm } from "../validation/signallingValidationSchemas";
import { addAssetRegister } from "../../../reducer/store/AssetRegisterReducer";

/**
 * Asset Register Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const AssetRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [station, setStation] = useState("");
  const [availableSystems, setAvailableSystems] = useState([]);
  const [availableGearIds, setAvailableGearIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const basicInitialValues = {
    S_No: "",
    station: "",
    system: "",
    gearID: "",
    Dateofinstallation: "",
    DescriptionOfMaterial: "",
    make: "",
    serialno: "",
    qty: "",
    location: "",
    remark: "",
    employeeName: "",
    employeeID: "",
    designation: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  // Station data (preserved from original)
  const stationsData = {
    ABST: {
      ATS: ["ATS_SUP"],
      DCS: ["CCTV WORKSTATION", "BTN TYPE 3"],
      ESP: ["PF_DN_ESP_01", "PF_UP_ESP_02", "SCR_ESP_03"],
      "Indoor ": ["LOOP BOX", "PDU", "BTN TYPE 3"],
      Signal: ["3701RS", "3702RS"],
    },
    ALMB: {
      ATS: ["ATS_TECH", "ATS_VDU", "ATS_SUP"],
      "Axle Counter": [
        "3604T_3602T",
        "3504T_3502T",
        "3402T_3314T",
        "3502T_3406T",
        "3606T_3604T",
        "3506T_3504T",
        "3602T_3506T",
        "3406T_3404T",
        "3404T_3402T",
      ],
      DCS: ["CCTV WORKSTATION", "BTN TYPE 3"],
      EKT: ["EKT_6_SCR_ALMB_3601P_3602P"],
      ESP: ["PF_DN_ESP_01", "PF_UP_ESP_02", "SCR_ESP_03"],
      "Indoor ": [
        "AXLE COUNTER",
        "EART CONNECTIVITY ",
        "PDC",
        "LOOP BOX",
        "RELAY CUBICLE",
        "SMPS",
        "PDU",
        "SMIO",
        "BTN TYPE 3",
      ],
      Point: ["3602P", "3601P"],
      Signal: ["3601RS", "3604RS", "3602RS", "3603RS"],
    },
    AMSM: {
      ATS: ["ATS_SUP"],
      DCS: ["CCTV WORKSTATION", "BTN TYPE 3"],
      ESP: ["PF_DN_ESP_01", "PF_UP_ESP_02", "SCR_ESP_03"],
      "Indoor ": ["LOOP BOX", "PDU", "BTN TYPE 3"],
      Signal: ["3201RS", "3202RS"],
    },
    BSNM: {
      ATS: ["ATS_SUP"],
      DCS: ["CCTV WORKSTATION", "BTN TYPE 3"],
      ESP: ["PF_DN_ESP_01", "PF_UP_ESP_02", "SCR_ESP_03"],
      "Indoor ": ["LOOP BOX", "PDU", "BTN TYPE 3"],
      Signal: ["3001RS", "3002RS"],
    }
  };

  // Update systems when station changes
  useEffect(() => {
    if (station && stationsData[station]) {
      setAvailableSystems(Object.keys(stationsData[station]));
      setFormValues(prev => ({ ...prev, station, system: "", gearID: "" }));
    } else {
      setAvailableSystems([]);
    }
  }, [station]);

  // Update gear IDs when system changes
  useEffect(() => {
    if (station && formValues.system && stationsData[station] && stationsData[station][formValues.system]) {
      setAvailableGearIds(stationsData[station][formValues.system]);
      setFormValues(prev => ({ ...prev, gearID: "" }));
    } else {
      setAvailableGearIds([]);
    }
  }, [station, formValues.system]);

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear field error when user starts typing
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({
        ...prev,
        [fieldName]: ""
      }));
    }
  };

  // Station change handler
  const handleStationChange = (e) => {
    const selectedStation = e.target.value;
    setStation(selectedStation);
  };

  // System change handler
  const handleSystemChange = (e) => {
    const selectedSystem = e.target.value;
    handleFieldChange("system", selectedSystem);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formValues.station) {
      errors.station = "Station is required";
    }
    
    if (!formValues.system) {
      errors.system = "System is required";
    }
    
    if (!formValues.gearID) {
      errors.gearID = "Gear ID is required";
    }
    
    if (!formValues.Dateofinstallation) {
      errors.Dateofinstallation = "Installation date is required";
    }
    
    if (!formValues.DescriptionOfMaterial) {
      errors.DescriptionOfMaterial = "Description of material is required";
    }
    
    if (!formValues.make) {
      errors.make = "Make is required";
    }
    
    if (!formValues.serialno) {
      errors.serialno = "Serial number is required";
    }
    
    if (!formValues.qty || isNaN(formValues.qty) || Number(formValues.qty) <= 0) {
      errors.qty = "Valid quantity is required";
    }
    
    if (!formValues.location) {
      errors.location = "Location is required";
    }
    
    if (!formValues.employeeName) {
      errors.employeeName = "Employee name is required";
    }
    
    if (!formValues.employeeID) {
      errors.employeeID = "Employee ID is required";
    }

    // Date validation
    if (formValues.Dateofinstallation) {
      const installDate = new Date(formValues.Dateofinstallation);
      const today = new Date();
      if (installDate > today) {
        errors.Dateofinstallation = "Installation date cannot be in the future";
      }
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Preserve exact field structure for API compatibility
      const submissionData = {
        ...formValues,
        S_No: sNo,
        slug: "asset-register"
      };

      dispatch(addAssetRegister(submissionData));
      
      // Success feedback
      alert("Asset Register saved successfully!");
      navigate("/admin/AllDeptFormList");
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormValues(basicInitialValues);
    setStation("");
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="Asset Register"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Asset Register", path: "/signalling/asset-register" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="S_No"
              label="Serial Number"
              value={sNo}
              readOnly={true}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="date"
              name="Dateofinstallation"
              label="Date of Installation"
              value={formValues.Dateofinstallation}
              onChange={(e) => handleFieldChange("Dateofinstallation", e.target.value)}
              required={true}
              error={formErrors.Dateofinstallation}
            />
          </div>
        </div>

        {/* Station and System Selection */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="select"
              name="station"
              label="Station"
              value={station}
              onChange={handleStationChange}
              options={Object.keys(stationsData).map(st => ({ value: st, label: st }))}
              required={true}
              error={formErrors.station}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="select"
              name="system"
              label="System"
              value={formValues.system}
              onChange={handleSystemChange}
              options={availableSystems.map(sys => ({ value: sys, label: sys }))}
              required={true}
              disabled={!station}
              error={formErrors.system}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="select"
              name="gearID"
              label="Gear ID"
              value={formValues.gearID}
              onChange={(e) => handleFieldChange("gearID", e.target.value)}
              options={availableGearIds.map(id => ({ value: id, label: id }))}
              required={true}
              disabled={!formValues.system}
              error={formErrors.gearID}
            />
          </div>
        </div>

        {/* Asset Details */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="DescriptionOfMaterial"
              label="Description of Material"
              value={formValues.DescriptionOfMaterial}
              onChange={(e) => handleFieldChange("DescriptionOfMaterial", e.target.value)}
              placeholder="Detailed description of the asset/material"
              required={true}
              rows={3}
              error={formErrors.DescriptionOfMaterial}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="make"
              label="Make/Brand"
              value={formValues.make}
              onChange={(e) => handleFieldChange("make", e.target.value)}
              placeholder="Manufacturer name"
              required={true}
              error={formErrors.make}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="serialno"
              label="Serial Number"
              value={formValues.serialno}
              onChange={(e) => handleFieldChange("serialno", e.target.value)}
              placeholder="Asset serial number"
              required={true}
              error={formErrors.serialno}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="number"
              name="qty"
              label="Quantity"
              value={formValues.qty}
              onChange={(e) => handleFieldChange("qty", e.target.value)}
              placeholder="Enter quantity"
              required={true}
              min="1"
              error={formErrors.qty}
            />
          </div>
        </div>

        {/* Location Information */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="location"
              label="Location"
              value={formValues.location}
              onChange={(e) => handleFieldChange("location", e.target.value)}
              placeholder="Detailed location description (Building, Room, Rack, etc.)"
              required={true}
              rows={2}
              error={formErrors.location}
            />
          </div>
        </div>

        {/* Personnel Information */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="employeeName"
              label="Employee Name"
              value={formValues.employeeName}
              onChange={(e) => handleFieldChange("employeeName", e.target.value)}
              placeholder="Responsible employee name"
              required={true}
              error={formErrors.employeeName}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="employeeID"
              label="Employee ID"
              value={formValues.employeeID}
              onChange={(e) => handleFieldChange("employeeID", e.target.value)}
              placeholder="Employee identification number"
              required={true}
              error={formErrors.employeeID}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="designation"
              label="Designation"
              value={formValues.designation}
              onChange={(e) => handleFieldChange("designation", e.target.value)}
              placeholder="Employee designation"
              error={formErrors.designation}
            />
          </div>
        </div>

        {/* Remarks */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="remark"
              label="Remarks"
              value={formValues.remark}
              onChange={(e) => handleFieldChange("remark", e.target.value)}
              placeholder="Additional remarks or observations about the asset"
              rows={3}
              error={formErrors.remark}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </span>
                ) : (
                  "Save Asset Register"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default AssetRegisterForm;