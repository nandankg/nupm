import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm, hardwareFailureValidation } from "../validation/signallingValidationSchemas";
import Papa from "papaparse";
import { addData } from "../../../reducer/pinki/HardwareFailureReducer";

/**
 * Hardware Failure Register Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const HardwareFailureRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hardwarefailure = useSelector((state) => state.hardwarefailure || {});
  
  const [slug, setSlug] = useState("");
  const [station, setStation] = useState("");
  const [availableSystems, setAvailableSystems] = useState([]);
  const [availableGearIds, setAvailableGearIds] = useState([]);
  const [stationsData, setStationsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [sno, setSno] = useState(1);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const [formValues, setFormValues] = useState({
    sno: sno,
    date_of_replace: "",
    idescrip: "",
    gearid: "",
    old_sr_no: "",
    new_sr_no: "",
    reason_of_replace: "",
    date_of_sending: "",
    date_of_receiving: "",
    date_of_restoration: "",
    sign: "",
    remark: "",
    action: "",
    emp_name: "",
    emp_id: "",
    system: "",
    denomination: "",
    quantity: "",
    station: "",
  });

  // Load file data from the public folder (preserved from original)
  const loadFileData = async (filePath) => {
    try {
      const response = await fetch(`/${filePath}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
      }
      const data = await response.text();
      return data;
    } catch (error) {
      console.error("Error fetching file:", error);
      throw error;
    }
  };

  // Loading and parsing CSV data (preserved from original)
  useEffect(() => {
    const loadData = async () => {
      try {
        const csvData = await loadFileData("gear_c.csv");
        Papa.parse(csvData, {
          header: false,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim().replace(/^"|"$/g, ""),
          transform: (value) => {
            const cleaned = value.trim().replace(/^"|"$/g, "");
            return cleaned === "" ? null : cleaned;
          },
          complete: (results) => {
            const data = results.data;
            const stationMap = {};

            // Processing CSV rows to build stationsData (preserved logic)
            data.forEach((row) => {
              const [station, system, subsystem, ...gearIds] = row;
              if (!station || !system) return;

              if (!stationMap[station]) {
                stationMap[station] = {};
              }

              if (!stationMap[station][system]) {
                stationMap[station][system] = [];
              }

              const validGearIds = gearIds.filter(id => id && id.trim() !== "");
              if (validGearIds.length > 0) {
                stationMap[station][system] = [
                  ...stationMap[station][system],
                  ...validGearIds
                ];
              }
            });

            setStationsData(stationMap);
            setLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Update systems when station changes
  useEffect(() => {
    if (station && stationsData[station]) {
      setAvailableSystems(Object.keys(stationsData[station]));
      setFormValues(prev => ({ ...prev, station, system: "", gearid: "" }));
    } else {
      setAvailableSystems([]);
    }
  }, [station, stationsData]);

  // Update gear IDs when system changes
  useEffect(() => {
    if (station && formValues.system && stationsData[station] && stationsData[station][formValues.system]) {
      setAvailableGearIds(stationsData[station][formValues.system]);
      setFormValues(prev => ({ ...prev, gearid: "" }));
    } else {
      setAvailableGearIds([]);
    }
  }, [station, formValues.system, stationsData]);

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
    if (!formValues.date_of_replace) {
      errors.date_of_replace = "Date of replacement is required";
    }
    
    if (!formValues.station) {
      errors.station = "Station is required";
    }
    
    if (!formValues.system) {
      errors.system = "System is required";
    }
    
    if (!formValues.gearid) {
      errors.gearid = "Gear ID is required";
    }
    
    if (!formValues.reason_of_replace) {
      errors.reason_of_replace = "Reason for replacement is required";
    }
    
    if (!formValues.emp_name) {
      errors.emp_name = "Employee name is required";
    }
    
    if (!formValues.emp_id) {
      errors.emp_id = "Employee ID is required";
    }

    // Date validations
    if (formValues.date_of_sending && formValues.date_of_replace) {
      if (new Date(formValues.date_of_sending) < new Date(formValues.date_of_replace)) {
        errors.date_of_sending = "Sending date cannot be before replacement date";
      }
    }

    if (formValues.date_of_receiving && formValues.date_of_sending) {
      if (new Date(formValues.date_of_receiving) < new Date(formValues.date_of_sending)) {
        errors.date_of_receiving = "Receiving date cannot be before sending date";
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
        slug: slug || "hardware-failure-register"
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("Hardware Failure Register saved successfully!");
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
    setFormValues({
      sno: sno,
      date_of_replace: "",
      idescrip: "",
      gearid: "",
      old_sr_no: "",
      new_sr_no: "",
      reason_of_replace: "",
      date_of_sending: "",
      date_of_receiving: "",
      date_of_restoration: "",
      sign: "",
      remark: "",
      action: "",
      emp_name: "",
      emp_id: "",
      system: "",
      denomination: "",
      quantity: "",
      station: "",
    });
    setStation("");
    setFormErrors({});
  };

  if (loading) {
    return (
      <SignallingFormLayout title="Hardware Failure Register">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </SignallingFormLayout>
    );
  }

  return (
    <SignallingFormLayout
      title="Hardware Failure Register"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Hardware Failure Register", path: "/signalling/hardware-failure" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="sno"
              label="Serial Number"
              value={formValues.sno}
              readOnly={true}
              error={formErrors.sno}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="date"
              name="date_of_replace"
              label="Date of Replacement"
              value={formValues.date_of_replace}
              onChange={(e) => handleFieldChange("date_of_replace", e.target.value)}
              required={true}
              error={formErrors.date_of_replace}
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
              name="gearid"
              label="Gear ID"
              value={formValues.gearid}
              onChange={(e) => handleFieldChange("gearid", e.target.value)}
              options={availableGearIds.map(id => ({ value: id, label: id }))}
              required={true}
              disabled={!formValues.system}
              error={formErrors.gearid}
            />
          </div>
        </div>

        {/* Hardware Details */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="old_sr_no"
              label="Old Serial Number"
              value={formValues.old_sr_no}
              onChange={(e) => handleFieldChange("old_sr_no", e.target.value)}
              placeholder="Enter old serial number"
              error={formErrors.old_sr_no}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="new_sr_no"
              label="New Serial Number"
              value={formValues.new_sr_no}
              onChange={(e) => handleFieldChange("new_sr_no", e.target.value)}
              placeholder="Enter new serial number"
              error={formErrors.new_sr_no}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="denomination"
              label="Denomination"
              value={formValues.denomination}
              onChange={(e) => handleFieldChange("denomination", e.target.value)}
              placeholder="Enter denomination"
              error={formErrors.denomination}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="number"
              name="quantity"
              label="Quantity"
              value={formValues.quantity}
              onChange={(e) => handleFieldChange("quantity", e.target.value)}
              placeholder="Enter quantity"
              min="1"
              error={formErrors.quantity}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="sign"
              label="Signature/Initial"
              value={formValues.sign}
              onChange={(e) => handleFieldChange("sign", e.target.value)}
              placeholder="Enter signature or initials"
              error={formErrors.sign}
            />
          </div>
        </div>

        {/* Replacement Reason and Description */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="reason_of_replace"
              label="Reason for Replacement"
              value={formValues.reason_of_replace}
              onChange={(e) => handleFieldChange("reason_of_replace", e.target.value)}
              placeholder="Describe the reason for hardware replacement"
              required={true}
              rows={3}
              error={formErrors.reason_of_replace}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="idescrip"
              label="Issue Description"
              value={formValues.idescrip}
              onChange={(e) => handleFieldChange("idescrip", e.target.value)}
              placeholder="Detailed description of the hardware issue"
              rows={3}
              error={formErrors.idescrip}
            />
          </div>
        </div>

        {/* Important Dates */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="date_of_sending"
              label="Date of Sending"
              value={formValues.date_of_sending}
              onChange={(e) => handleFieldChange("date_of_sending", e.target.value)}
              error={formErrors.date_of_sending}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="date_of_receiving"
              label="Date of Receiving"
              value={formValues.date_of_receiving}
              onChange={(e) => handleFieldChange("date_of_receiving", e.target.value)}
              error={formErrors.date_of_receiving}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="date_of_restoration"
              label="Date of Restoration"
              value={formValues.date_of_restoration}
              onChange={(e) => handleFieldChange("date_of_restoration", e.target.value)}
              error={formErrors.date_of_restoration}
            />
          </div>
        </div>

        {/* Employee Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="emp_name"
              label="Employee Name"
              value={formValues.emp_name}
              onChange={(e) => handleFieldChange("emp_name", e.target.value)}
              placeholder="Enter employee name"
              required={true}
              error={formErrors.emp_name}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="emp_id"
              label="Employee ID"
              value={formValues.emp_id}
              onChange={(e) => handleFieldChange("emp_id", e.target.value)}
              placeholder="Enter employee ID"
              required={true}
              error={formErrors.emp_id}
            />
          </div>
        </div>

        {/* Action and Remarks */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="action"
              label="Action Taken"
              value={formValues.action}
              onChange={(e) => handleFieldChange("action", e.target.value)}
              placeholder="Describe the action taken"
              rows={3}
              error={formErrors.action}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="remark"
              label="Remarks"
              value={formValues.remark}
              onChange={(e) => handleFieldChange("remark", e.target.value)}
              placeholder="Additional remarks or observations"
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
                  "Save Hardware Failure Register"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default HardwareFailureRegisterForm;