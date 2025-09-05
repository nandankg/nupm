import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm, hardwareFailureValidation } from "../validation/signallingValidationSchemas";
import Papa from "papaparse";
import { addData } from "../../../reducer/manshi/ReplacementReducer";

/**
 * Replacement Register Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const ReplacementRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const RepF = useSelector((state) => state.Rep);
  
  const [slug, setSlug] = useState("");
  const [station, setStation] = useState("");
  const [availableSystems, setAvailableSystems] = useState([]);
  const [availableGearIds, setAvailableGearIds] = useState([]);
  const [stationsData, setStationsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (RepF) {
      setSlug(RepF.slug);
    }
  }, [RepF]);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const [formValues, setFormValues] = useState({
    sno: 1,
    date: "",
    station: "",
    system: "",
    gearid: "",
    oldPartNo: "",
    newPartNo: "",
    reasonForReplacement: "",
    replacementDate: "",
    replacementTime: "",
    oldSerialNo: "",
    newSerialNo: "",
    testedBy: "",
    testedDate: "",
    remarks: "",
    supervisorName: "",
    supervisorId: "",
    technicianName: "",
    technicianId: "",
    workOrderNo: "",
    vendor: "",
    warranty: "",
    cost: "",
    downtime: "",
    systemStatus: "",
    testResults: "",
    documentation: ""
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

              // Add non-null gear IDs, handling EKT groups specially
              gearIds.forEach((gearId) => {
                if (gearId) {
                  if (system === "EKT" && gearId.includes("Group")) {
                    const ids = gearId
                      .split("\n")
                      .slice(1)
                      .map((id) => id.trim())
                      .filter((id) => id);
                    stationMap[station][system].push(...ids);
                  } else {
                    stationMap[station][system].push(gearId);
                  }
                }
              });
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
    if (!formValues.date) {
      errors.date = "Date is required";
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
    
    if (!formValues.reasonForReplacement) {
      errors.reasonForReplacement = "Reason for replacement is required";
    }
    
    if (!formValues.replacementDate) {
      errors.replacementDate = "Replacement date is required";
    }
    
    if (!formValues.technicianName) {
      errors.technicianName = "Technician name is required";
    }
    
    if (!formValues.technicianId) {
      errors.technicianId = "Technician ID is required";
    }

    // Date validation
    if (formValues.replacementDate && formValues.date) {
      if (new Date(formValues.replacementDate) < new Date(formValues.date)) {
        errors.replacementDate = "Replacement date cannot be before report date";
      }
    }

    if (formValues.testedDate && formValues.replacementDate) {
      if (new Date(formValues.testedDate) < new Date(formValues.replacementDate)) {
        errors.testedDate = "Test date cannot be before replacement date";
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
        slug: slug || "replacement-register"
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("Replacement Register saved successfully!");
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
      sno: 1,
      date: "",
      station: "",
      system: "",
      gearid: "",
      oldPartNo: "",
      newPartNo: "",
      reasonForReplacement: "",
      replacementDate: "",
      replacementTime: "",
      oldSerialNo: "",
      newSerialNo: "",
      testedBy: "",
      testedDate: "",
      remarks: "",
      supervisorName: "",
      supervisorId: "",
      technicianName: "",
      technicianId: "",
      workOrderNo: "",
      vendor: "",
      warranty: "",
      cost: "",
      downtime: "",
      systemStatus: "",
      testResults: "",
      documentation: ""
    });
    setStation("");
    setFormErrors({});
  };

  if (loading) {
    return (
      <SignallingFormLayout title="Replacement Register">
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
      title="Replacement Register"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Replacement Register", path: "/signalling/replacement-register" }
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
              type="date"
              name="replacementDate"
              label="Replacement Date"
              value={formValues.replacementDate}
              onChange={(e) => handleFieldChange("replacementDate", e.target.value)}
              required={true}
              error={formErrors.replacementDate}
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

        {/* Part Information */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="oldPartNo"
              label="Old Part Number"
              value={formValues.oldPartNo}
              onChange={(e) => handleFieldChange("oldPartNo", e.target.value)}
              placeholder="Enter old part number"
              error={formErrors.oldPartNo}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="newPartNo"
              label="New Part Number"
              value={formValues.newPartNo}
              onChange={(e) => handleFieldChange("newPartNo", e.target.value)}
              placeholder="Enter new part number"
              error={formErrors.newPartNo}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="oldSerialNo"
              label="Old Serial Number"
              value={formValues.oldSerialNo}
              onChange={(e) => handleFieldChange("oldSerialNo", e.target.value)}
              placeholder="Enter old serial number"
              error={formErrors.oldSerialNo}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="newSerialNo"
              label="New Serial Number"
              value={formValues.newSerialNo}
              onChange={(e) => handleFieldChange("newSerialNo", e.target.value)}
              placeholder="Enter new serial number"
              error={formErrors.newSerialNo}
            />
          </div>
        </div>

        {/* Replacement Details */}
        <div className="row">
          <div className="col-md-8">
            <UniversalSignallingFormField
              type="textarea"
              name="reasonForReplacement"
              label="Reason for Replacement"
              value={formValues.reasonForReplacement}
              onChange={(e) => handleFieldChange("reasonForReplacement", e.target.value)}
              placeholder="Describe the reason for replacement"
              required={true}
              rows={3}
              error={formErrors.reasonForReplacement}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="time"
              name="replacementTime"
              label="Replacement Time"
              value={formValues.replacementTime}
              onChange={(e) => handleFieldChange("replacementTime", e.target.value)}
              error={formErrors.replacementTime}
            />
          </div>
        </div>

        {/* Testing Information */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="testedBy"
              label="Tested By"
              value={formValues.testedBy}
              onChange={(e) => handleFieldChange("testedBy", e.target.value)}
              placeholder="Enter tester name"
              error={formErrors.testedBy}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="testedDate"
              label="Test Date"
              value={formValues.testedDate}
              onChange={(e) => handleFieldChange("testedDate", e.target.value)}
              error={formErrors.testedDate}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="testResult"
              name="testResults"
              label="Test Results"
              value={formValues.testResults}
              onChange={(e) => handleFieldChange("testResults", e.target.value)}
              error={formErrors.testResults}
            />
          </div>
        </div>

        {/* Personnel Information */}
        <div className="row">
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="technicianName"
              label="Technician Name"
              value={formValues.technicianName}
              onChange={(e) => handleFieldChange("technicianName", e.target.value)}
              placeholder="Enter technician name"
              required={true}
              error={formErrors.technicianName}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="technicianId"
              name="technicianId"
              label="Technician ID"
              value={formValues.technicianId}
              onChange={(e) => handleFieldChange("technicianId", e.target.value)}
              required={true}
              error={formErrors.technicianId}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="supervisorName"
              label="Supervisor Name"
              value={formValues.supervisorName}
              onChange={(e) => handleFieldChange("supervisorName", e.target.value)}
              placeholder="Enter supervisor name"
              error={formErrors.supervisorName}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="supervisorId"
              label="Supervisor ID"
              value={formValues.supervisorId}
              onChange={(e) => handleFieldChange("supervisorId", e.target.value)}
              placeholder="Enter supervisor ID"
              error={formErrors.supervisorId}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="row">
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="workOrderNo"
              label="Work Order Number"
              value={formValues.workOrderNo}
              onChange={(e) => handleFieldChange("workOrderNo", e.target.value)}
              placeholder="Enter work order number"
              error={formErrors.workOrderNo}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="vendor"
              label="Vendor"
              value={formValues.vendor}
              onChange={(e) => handleFieldChange("vendor", e.target.value)}
              placeholder="Enter vendor name"
              error={formErrors.vendor}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="warranty"
              label="Warranty Period"
              value={formValues.warranty}
              onChange={(e) => handleFieldChange("warranty", e.target.value)}
              placeholder="e.g., 12 months"
              error={formErrors.warranty}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="number"
              name="cost"
              label="Cost (₹)"
              value={formValues.cost}
              onChange={(e) => handleFieldChange("cost", e.target.value)}
              placeholder="Enter cost"
              min="0"
              step="0.01"
              error={formErrors.cost}
            />
          </div>
        </div>

        {/* System Status and Remarks */}
        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="select"
              name="systemStatus"
              label="System Status After Replacement"
              value={formValues.systemStatus}
              onChange={(e) => handleFieldChange("systemStatus", e.target.value)}
              options={[
                { value: "", label: "Select Status" },
                { value: "normal", label: "Normal" },
                { value: "under-observation", label: "Under Observation" },
                { value: "needs-attention", label: "Needs Attention" },
                { value: "pending-tests", label: "Pending Tests" }
              ]}
              error={formErrors.systemStatus}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="text"
              name="downtime"
              label="System Downtime"
              value={formValues.downtime}
              onChange={(e) => handleFieldChange("downtime", e.target.value)}
              placeholder="e.g., 2 hours 30 minutes"
              error={formErrors.downtime}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="documentation"
              label="Documentation Requirements"
              value={formValues.documentation}
              onChange={(e) => handleFieldChange("documentation", e.target.value)}
              placeholder="List any additional documentation or certificates"
              rows={3}
              error={formErrors.documentation}
            />
          </div>
          <div className="col-md-6">
            <UniversalSignallingFormField
              type="textarea"
              name="remarks"
              label="Remarks"
              value={formValues.remarks}
              onChange={(e) => handleFieldChange("remarks", e.target.value)}
              placeholder="Additional remarks or observations"
              rows={3}
              error={formErrors.remarks}
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
                  "Save Replacement Register"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default ReplacementRegisterForm;