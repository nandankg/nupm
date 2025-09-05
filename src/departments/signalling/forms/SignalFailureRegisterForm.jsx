import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm, signalFailureValidation } from "../validation/signallingValidationSchemas";
import { addData, addSignal } from "../../../reducer/pinki/SignalFailureReducer";
import { formatDate, formatTime } from "../../../data/formatDate";

/**
 * Signal Failure Register Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const SignalFailureRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [sno, setSno] = useState(1);
  const [date, setDate] = useState(new Date());
  const [station, setStation] = useState("");
  const [availableSystems, setAvailableSystems] = useState([]);
  const [availableGearIds, setAvailableGearIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const [formValues, setFormValues] = useState({
    sno: sno,
    date: formatDate(new Date().toDateString()),
    ftime: "", // Failure date and time
    gearfdescrip: "", // Failure description
    attended: "", // Attended date and time
    rectified: "", // Rectified date and time
    duration: "",
    observ: "",
    action: "",
    detention: "",
    sign: "",
    remark: "",
    system: "",
    station: ""
      });

  // Station data (preserved from original)
  const stationsData = {
    ABST: {
      ATS: ["ATS_SUP"],
      DCS: ["CCTV WORKSTATION", "BTN TYPE 3"],
      ESP: ["PF_DN_ESP_01", "PF_UP_ESP_02", "SCR_ESP_03"],
      "Indoor ": ["LOOP BOX", "PDU", "BTN TYPE 3"],
      Signal: ["3701RS", "3702RS"]
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
      Signal: ["3601RS", "3604RS", "3602RS", "3603RS"]
      },
    AMSM: {
      ATS: ["ATS_TECH", "ATS_VDU", "ATS_SUP"],
      "Axle Counter": [
        "3806T_3804T",
        "3704T_3702T",
        "3602T_3516T",
        "3702T_3606T",
        "3804T_3802T",
        "3706T_3704T",
        "3802T_3706T",
        "3606T_3604T",
        "3604T_3602T",
      ],
      DCS: ["CCTV WORKSTATION", "BTN TYPE 3"],
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
      Point: ["3802P", "3801P"],
      Signal: ["3801RS", "3804RS", "3802RS", "3803RS"]
      }
  };

  // Update systems when station changes
  useEffect(() => {
    if (station && stationsData[station]) {
      setAvailableSystems(Object.keys(stationsData[station]));
      setFormValues(prev => ({ ...prev, station, system: "", gearId: "" }));
    }
  }, [station, stationsData]);

  // Update gear IDs when system changes
  useEffect(() => {
    if (station && formValues.system && stationsData[station] && stationsData[station][formValues.system]) {
      setAvailableGearIds(stationsData[station][formValues.system]);
      setFormValues(prev => ({ ...prev, gearId: "" }));
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

    // Auto-calculate duration if attended and rectified times are available
    if ((fieldName === "attended" || fieldName === "rectified") && formValues.attended && formValues.rectified) {
      const attendedTime = new Date(`${formValues.date} ${fieldName === "attended" ? value : formValues.attended}`);
      const rectifiedTime = new Date(`${formValues.date} ${fieldName === "rectified" ? value : formValues.rectified}`);
      
      if (attendedTime && rectifiedTime && rectifiedTime > attendedTime) {
        const durationMs = rectifiedTime - attendedTime;
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        const calculatedDuration = `${hours}h ${minutes}m`;
        
        setFormValues(prev => ({
          ...prev,
          [fieldName]: value,
          duration: calculatedDuration
        }));
      }
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
    if (!formValues.date) {
      errors.date = "Date is required";
    }
    
    if (!formValues.ftime) {
      errors.ftime = "Failure time is required";
    }
    
    if (!formValues.station) {
      errors.station = "Station is required";
    }
    
    if (!formValues.system) {
      errors.system = "System is required";
    }
    
    if (!formValues.gearid) {
      errors.gearid = "Signal/Gear ID is required";
    }
    
    if (!formValues.fdescrip || formValues.fdescrip.trim().length < 10) {
      errors.fdescrip = "Failure description is required (minimum 10 characters)";
    }

    // Time validation
    if (formValues.attended && formValues.ftime) {
      const failureTime = new Date(`${formValues.date} ${formValues.ftime}`);
      const attendedTime = new Date(`${formValues.date} ${formValues.attended}`);
      
      if (attendedTime < failureTime) {
        errors.attended = "Attended time cannot be before failure time";
      }
    }

    if (formValues.rectified && formValues.attended) {
      const attendedTime = new Date(`${formValues.date} ${formValues.attended}`);
      const rectifiedTime = new Date(`${formValues.date} ${formValues.rectified}`);
      
      if (rectifiedTime < attendedTime) {
        errors.rectified = "Rectified time cannot be before attended time";
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
        // FIXED: Remove client-side IDs - form_id is auto-generated by database
        ...formValues,
        slug: "signal-failure-register"
      };

      dispatch(addData(submissionData));
      dispatch(addSignal(submissionData));
      
      // Success feedback
      alert("Signal Failure Register saved successfully!");
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
      date: formatDate(new Date().toDateString()),
      ftime: "",
      gearfdescrip: "",
      attended: "",
      rectified: "",
      duration: "",
      observ: "",
      action: "",
      detention: "",
      sign: "",
      remark: "",
      system: "",
      station: ""
      });
    setStation("");
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="Signal Failure Register"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Signal Failure Register", path: "/signalling/signal-failure" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="sno"
              label="Serial Number"
              value={formValues.sno}
              readOnly={true}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="date"
              label="Date"
              value={formValues.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              required={true}
              error={formErrors.date}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="time"
              name="ftime"
              label="Failure Time"
              value={formValues.ftime}
              onChange={(e) => handleFieldChange("ftime", e.target.value)}
              required={true}
              error={formErrors.ftime}
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
              label="System Type"
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
              label="Signal/Gear ID"
              value={formValues.gearid}
              onChange={(e) => handleFieldChange("gearid", e.target.value)}
              options={availableGearIds.map(id => ({ value: id, label: id }))}
              required={true}
              disabled={!formValues.system}
              error={formErrors.gearid}
            />
          </div>
        </div>

        {/* Failure Description */}
        <div className="row">
          <div className="col-md-12">
            <UniversalSignallingFormField
              type="textarea"
              name="fdescrip"
              label="Failure Description"
              value={formValues.fdescrip}
              onChange={(e) => handleFieldChange("fdescrip", e.target.value)}
              placeholder="Provide detailed description of the signal failure"
              required={true}
              rows={4}
              error={formErrors.fdescrip}
            />
          </div>
        </div>

        {/* Time Management */}
        <div className="row">
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="time"
              name="attended"
              label="Attended Time"
              value={formValues.attended}
              onChange={(e) => handleFieldChange("attended", e.target.value)}
              error={formErrors.attended}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="time"
              name="rectified"
              label="Rectified Time"
              value={formValues.rectified}
              onChange={(e) => handleFieldChange("rectified", e.target.value)}
              error={formErrors.rectified}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="duration"
              label="Duration"
              value={formValues.duration}
              onChange={(e) => handleFieldChange("duration", e.target.value)}
              placeholder="Auto-calculated or manual entry"
              readOnly={formValues.attended && formValues.rectified}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="detention"
              label="Detention (if any)"
              value={formValues.detention}
              onChange={(e) => handleFieldChange("detention", e.target.value)}
              placeholder="Enter detention details"
            />
          </div>
        </div>

        {/* Observations and Actions */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="observ"
              label="Observations"
              value={formValues.observ}
              onChange={(e) => handleFieldChange("observ", e.target.value)}
              placeholder="Technical observations during inspection"
              rows={3}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="action"
              label="Action Taken"
              value={formValues.action}
              onChange={(e) => handleFieldChange("action", e.target.value)}
              placeholder="Describe corrective actions taken"
              rows={3}
            />
          </div>
        </div>

        {/* Signature and Remarks */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="sign"
              label="Signature/Initial"
              value={formValues.sign}
              onChange={(e) => handleFieldChange("sign", e.target.value)}
              placeholder="Enter signature or initials"
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
                  "Save Signal Failure Register"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default SignalFailureRegisterForm;