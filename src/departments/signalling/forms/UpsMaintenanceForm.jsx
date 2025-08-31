import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import stationData from "../../../station.json";

/**
 * UPS System Maintenance Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const UpsMaintenanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Extract slug from URL path
    const getLastParameter = () => {
      const pathname = window.location.pathname;
      const pathSegments = pathname.split("/").filter(Boolean);
      return pathSegments[pathSegments.length - 1];
    };
    setSlug(getLastParameter().trim());
  }, []);

  // PRESERVED EXACT FIELD STRUCTURE - No changes from original form
  const [formData, setFormData] = useState({
    station: "",
    month: "",
    date: "",
    additionalData: {
      averageTemp: "",
      chargingCurrentAfterLoadTest: "",
      batteryTerminalsCleaned: "",
      looseConnectionChecked: "",
      cellLeakageChecked: "",
      loadDuringTestUPS1: {
        U: "",
        V: "",
        W: "",
      },
      loadDuringTestUPS2: {
        U: "",
        V: "",
        W: "",
      },
      batteryVoltageBeforeLoadTest: "",
      batteryVoltageAfterLoadTest: "",
      batteryChargePercentage: "",
    },
    rows: [
      {
        cellNo: Array.from({ length: 18 }, () => ""),
        onFloatVoltage: Array.from({ length: 18 }, () => ""),
        initialReadingOnLoad: Array.from({ length: 18 }, () => ""),
        after1Point5Hours: Array.from({ length: 18 }, () => ""),
      },
    ],
  });

  // Station options
  const stationOptions = [
    { value: "", label: "Select Station" },
    ...stationData
      .filter((station) => station["Station Name"])
      .map((station) => ({
        value: station["Station Name"],
        label: station["Station Name"]
      }))
  ];

  // Month options
  const monthOptions = [
    { value: "", label: "Select Month" },
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" }
  ];

  // Status options for checks
  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "OK", label: "OK" },
    { value: "NOT OK", label: "NOT OK" },
    { value: "N/A", label: "N/A" }
  ];

  // Handle basic input changes
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    // Clear field error
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle additional data changes
  const handleAdditionalDataChange = (name, value) => {
    setFormData({
      ...formData,
      additionalData: {
        ...formData.additionalData,
        [name]: value,
      },
    });
  };

  // Handle nested data changes (UPS load values)
  const handleNestedDataChange = (parent, key, value) => {
    setFormData({
      ...formData,
      additionalData: {
        ...formData.additionalData,
        [parent]: {
          ...formData.additionalData[parent],
          [key]: value,
        },
      },
    });
  };

  // Handle row changes for battery cell data
  const handleRowChange = (rowIndex, field, colIndex, value) => {
    const updatedRows = [...formData.rows];
    updatedRows[rowIndex][field][colIndex] = value;
    setFormData({ ...formData, rows: updatedRows });
  };

  // Add new row for additional battery sets
  const handleAddRow = () => {
    setFormData({
      ...formData,
      rows: [
        ...formData.rows,
        {
          cellNo: Array.from({ length: 18 }, () => ""),
          onFloatVoltage: Array.from({ length: 18 }, () => ""),
          initialReadingOnLoad: Array.from({ length: 18 }, () => ""),
          after1Point5Hours: Array.from({ length: 18 }, () => ""),
        },
      ],
    });
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formData.station) {
      errors.station = "Station is required";
    }
    
    if (!formData.month) {
      errors.month = "Month is required";
    }
    
    if (!formData.date) {
      errors.date = "Maintenance date is required";
    }

    // Validate voltage readings are numeric
    if (formData.additionalData.batteryVoltageBeforeLoadTest && 
        isNaN(formData.additionalData.batteryVoltageBeforeLoadTest)) {
      errors.batteryVoltageBeforeLoadTest = "Must be a valid voltage reading";
    }

    if (formData.additionalData.batteryVoltageAfterLoadTest && 
        isNaN(formData.additionalData.batteryVoltageAfterLoadTest)) {
      errors.batteryVoltageAfterLoadTest = "Must be a valid voltage reading";
    }

    // Validate UPS load values are numeric
    const upsFields = ['U', 'V', 'W'];
    ['loadDuringTestUPS1', 'loadDuringTestUPS2'].forEach(ups => {
      upsFields.forEach(phase => {
        const value = formData.additionalData[ups][phase];
        if (value && isNaN(value)) {
          errors[`${ups}_${phase}`] = `${ups} ${phase} phase must be a valid number`;
        }
      });
    });

    // Date validation
    if (formData.date) {
      const today = new Date();
      const maintenanceDate = new Date(formData.date);
      if (maintenanceDate > today) {
        errors.date = "Maintenance date cannot be in the future";
      }
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Preserve exact field structure for API compatibility
      const submissionData = {
        formType: slug || "ups-maintenance",
        values: formData
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("UPS System Maintenance record saved successfully!");
      navigate(`/list/${slug}`);
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving UPS maintenance record. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      station: "",
      month: "",
      date: "",
      additionalData: {
        averageTemp: "",
        chargingCurrentAfterLoadTest: "",
        batteryTerminalsCleaned: "",
        looseConnectionChecked: "",
        cellLeakageChecked: "",
        loadDuringTestUPS1: {
          U: "",
          V: "",
          W: "",
        },
        loadDuringTestUPS2: {
          U: "",
          V: "",
          W: "",
        },
        batteryVoltageBeforeLoadTest: "",
        batteryVoltageAfterLoadTest: "",
        batteryChargePercentage: "",
      },
      rows: [
        {
          cellNo: Array.from({ length: 18 }, () => ""),
          onFloatVoltage: Array.from({ length: 18 }, () => ""),
          initialReadingOnLoad: Array.from({ length: 18 }, () => ""),
          after1Point5Hours: Array.from({ length: 18 }, () => ""),
        },
      ],
    });
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="UPS System Maintenance Record"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "UPS Maintenance", path: "/signalling/ups-maintenance" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="select"
              name="station"
              label="Station"
              value={formData.station}
              onChange={(e) => handleInputChange("station", e.target.value)}
              options={stationOptions}
              required={true}
              error={formErrors.station}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="select"
              name="month"
              label="Month"
              value={formData.month}
              onChange={(e) => handleInputChange("month", e.target.value)}
              options={monthOptions}
              required={true}
              error={formErrors.month}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="date"
              label="Maintenance Date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              required={true}
              error={formErrors.date}
            />
          </div>
        </div>

        {/* General Checks */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">General UPS System Checks</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="number"
                  name="averageTemp"
                  label="Average Temperature (°C)"
                  value={formData.additionalData.averageTemp}
                  onChange={(e) => handleAdditionalDataChange("averageTemp", e.target.value)}
                  placeholder="Enter average temperature"
                  step="0.1"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="number"
                  name="chargingCurrentAfterLoadTest"
                  label="Charging Current After Load Test (A)"
                  value={formData.additionalData.chargingCurrentAfterLoadTest}
                  onChange={(e) => handleAdditionalDataChange("chargingCurrentAfterLoadTest", e.target.value)}
                  placeholder="Enter charging current"
                  step="0.1"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="number"
                  name="batteryChargePercentage"
                  label="Battery Charge Percentage (%)"
                  value={formData.additionalData.batteryChargePercentage}
                  onChange={(e) => handleAdditionalDataChange("batteryChargePercentage", e.target.value)}
                  placeholder="Enter charge percentage"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="select"
                  name="batteryTerminalsCleaned"
                  label="Battery Terminals Cleaned"
                  value={formData.additionalData.batteryTerminalsCleaned}
                  onChange={(e) => handleAdditionalDataChange("batteryTerminalsCleaned", e.target.value)}
                  options={statusOptions}
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="select"
                  name="looseConnectionChecked"
                  label="Loose Connection Checked"
                  value={formData.additionalData.looseConnectionChecked}
                  onChange={(e) => handleAdditionalDataChange("looseConnectionChecked", e.target.value)}
                  options={statusOptions}
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="select"
                  name="cellLeakageChecked"
                  label="Cell Leakage Checked"
                  value={formData.additionalData.cellLeakageChecked}
                  onChange={(e) => handleAdditionalDataChange("cellLeakageChecked", e.target.value)}
                  options={statusOptions}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Battery Voltage Readings */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Battery Voltage Readings</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="number"
                  name="batteryVoltageBeforeLoadTest"
                  label="Battery Voltage Before Load Test (V)"
                  value={formData.additionalData.batteryVoltageBeforeLoadTest}
                  onChange={(e) => handleAdditionalDataChange("batteryVoltageBeforeLoadTest", e.target.value)}
                  placeholder="Enter voltage before load test"
                  step="0.01"
                  error={formErrors.batteryVoltageBeforeLoadTest}
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="number"
                  name="batteryVoltageAfterLoadTest"
                  label="Battery Voltage After Load Test (V)"
                  value={formData.additionalData.batteryVoltageAfterLoadTest}
                  onChange={(e) => handleAdditionalDataChange("batteryVoltageAfterLoadTest", e.target.value)}
                  placeholder="Enter voltage after load test"
                  step="0.01"
                  error={formErrors.batteryVoltageAfterLoadTest}
                />
              </div>
            </div>
          </div>
        </div>

        {/* UPS Load Testing */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">UPS Load During Test</h5>
          </div>
          <div className="card-body">
            {/* UPS 1 */}
            <h6 className="text-primary">UPS 1 Load Values</h6>
            <div className="row mb-3">
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="number"
                  name="ups1_u"
                  label="U Phase (A)"
                  value={formData.additionalData.loadDuringTestUPS1.U}
                  onChange={(e) => handleNestedDataChange("loadDuringTestUPS1", "U", e.target.value)}
                  placeholder="Enter U phase current"
                  step="0.1"
                  error={formErrors.loadDuringTestUPS1_U}
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="number"
                  name="ups1_v"
                  label="V Phase (A)"
                  value={formData.additionalData.loadDuringTestUPS1.V}
                  onChange={(e) => handleNestedDataChange("loadDuringTestUPS1", "V", e.target.value)}
                  placeholder="Enter V phase current"
                  step="0.1"
                  error={formErrors.loadDuringTestUPS1_V}
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="number"
                  name="ups1_w"
                  label="W Phase (A)"
                  value={formData.additionalData.loadDuringTestUPS1.W}
                  onChange={(e) => handleNestedDataChange("loadDuringTestUPS1", "W", e.target.value)}
                  placeholder="Enter W phase current"
                  step="0.1"
                  error={formErrors.loadDuringTestUPS1_W}
                />
              </div>
            </div>

            {/* UPS 2 */}
            <h6 className="text-primary">UPS 2 Load Values</h6>
            <div className="row">
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="number"
                  name="ups2_u"
                  label="U Phase (A)"
                  value={formData.additionalData.loadDuringTestUPS2.U}
                  onChange={(e) => handleNestedDataChange("loadDuringTestUPS2", "U", e.target.value)}
                  placeholder="Enter U phase current"
                  step="0.1"
                  error={formErrors.loadDuringTestUPS2_U}
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="number"
                  name="ups2_v"
                  label="V Phase (A)"
                  value={formData.additionalData.loadDuringTestUPS2.V}
                  onChange={(e) => handleNestedDataChange("loadDuringTestUPS2", "V", e.target.value)}
                  placeholder="Enter V phase current"
                  step="0.1"
                  error={formErrors.loadDuringTestUPS2_V}
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="number"
                  name="ups2_w"
                  label="W Phase (A)"
                  value={formData.additionalData.loadDuringTestUPS2.W}
                  onChange={(e) => handleNestedDataChange("loadDuringTestUPS2", "W", e.target.value)}
                  placeholder="Enter W phase current"
                  step="0.1"
                  error={formErrors.loadDuringTestUPS2_W}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Battery Cell Readings */}
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Battery Cell Readings (18 Cells per Row)</h5>
              <button
                type="button"
                onClick={handleAddRow}
                className="btn btn-secondary btn-sm"
              >
                Add Battery Set
              </button>
            </div>
          </div>
          <div className="card-body">
            {formData.rows.map((row, rowIndex) => (
              <BatteryCellTable
                key={rowIndex}
                rowIndex={rowIndex}
                row={row}
                handleRowChange={handleRowChange}
              />
            ))}
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
                  "Save UPS Maintenance Record"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

// Battery Cell Table Component
const BatteryCellTable = ({ rowIndex, row, handleRowChange }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <h6 className="mb-0">Battery Set {rowIndex + 1}</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Cell No.</th>
                {Array.from({ length: 18 }, (_, i) => (
                  <th key={i}>Cell {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Cell No</strong></td>
                {Array.from({ length: 18 }, (_, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={row.cellNo[colIndex]}
                      onChange={(e) => handleRowChange(rowIndex, "cellNo", colIndex, e.target.value)}
                      placeholder={`${colIndex + 1}`}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td><strong>On Float Voltage (V)</strong></td>
                {Array.from({ length: 18 }, (_, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={row.onFloatVoltage[colIndex]}
                      onChange={(e) => handleRowChange(rowIndex, "onFloatVoltage", colIndex, e.target.value)}
                      placeholder="V"
                      step="0.01"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td><strong>Initial Reading On Load (V)</strong></td>
                {Array.from({ length: 18 }, (_, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={row.initialReadingOnLoad[colIndex]}
                      onChange={(e) => handleRowChange(rowIndex, "initialReadingOnLoad", colIndex, e.target.value)}
                      placeholder="V"
                      step="0.01"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td><strong>After 1.5 Hours (V)</strong></td>
                {Array.from({ length: 18 }, (_, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={row.after1Point5Hours[colIndex]}
                      onChange={(e) => handleRowChange(rowIndex, "after1Point5Hours", colIndex, e.target.value)}
                      placeholder="V"
                      step="0.01"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpsMaintenanceForm;