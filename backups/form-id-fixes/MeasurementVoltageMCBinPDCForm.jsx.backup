import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { addData } from "../../../reducer/chanchal/MeasurementVoltageMCBinPDCReducer";
import stationData from "../../../station.json";

/**
 * Measurement of Voltage at MCB in PDC Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const MeasurementVoltageMCBinPDCForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const esphalfyearly = useSelector((state) => state.MCBinPDC || {});
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // PRESERVED EXACT ACTIVITY STRUCTURES - No changes from original form
  const halfyearlyactivity = [
    {
      category: "Details of Maintenance Activity",
      activity: " Check lamp indication on PDC",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " ELD Status",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " IMD status ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " VMR Status ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: "Masurement of Incomer Voltage from UPS on MCB No.",
    },
  ];

  const mcbactivity = [
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 2 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 3 ",
    },
  ];

  const mcb2activity = [
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 1 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 4 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 5 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 6 ",
    },
  ];

  const [mcb3activity, setMcb3activity] = useState([
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 7 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 8 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 9 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 10 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 11 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 12 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 13 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 14 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 15 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 16 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 17 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 18 ",
    },
    {
      category: "Details of Maintenance Activity",
      activity: " MCB 19 ",
    },
  ]);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const [formValues, setFormValues] = useState({
    station: "",
    date: "",
    halfyearly: halfyearlyactivity.map(() => ({
      checked: "",
    })),
    mcb: mcbactivity.map(() => ({
      r_y: "",
      y_b: "",
      r_b: "",
      r_n: "",
      y_n: "",
      b_n: "",
    })),
    mcb2: mcb2activity.map(() => ({
      r_y2: "",
      y_b2: "",
      r_b2: "",
    })),
    mcb3: mcb3activity.map(() => ({
      volt: "",
      val: "",
    })),
    range: "January-June",
    remarks: "",
    signature: "",
    name: "",
    designation: "",
    empno: "",
    countersign: "",
    employee_id: "",
    department: "",
    unit: "",
  });

  const [halfyearlyRange, setHalfyearlyRange] = useState("January-June");
  const halfyearlyRanges = ["January-June", "July-December"];

  useEffect(() => {
    if (esphalfyearly.slug !== slug) {
      setSlug(esphalfyearly.slug || "");
    }
  }, [esphalfyearly.slug]);

  // Station options for dropdown
  const stationOptions = [
    { value: "", label: "Select Station" },
    ...stationData
      .filter((station) => station["Station Name"])
      .map((station) => ({
        value: station["Station Name"],
        label: station["Station Name"]
      }))
  ];

  // Range options
  const rangeOptions = [
    { value: "January-June", label: "January-June" },
    { value: "July-December", label: "July-December" }
  ];

  // Status options for checklist items
  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "OK", label: "OK" },
    { value: "NOT OK", label: "NOT OK" },
    { value: "N/A", label: "N/A" }
  ];

  // Add MCB functionality preserved exactly
  const addMCB = () => {
    const newMCBNumber = mcb3activity.length + 7;
    const newMCBId = ` MCB ${newMCBNumber < 10 ? '0' + newMCBNumber : newMCBNumber}`;
    const newMCB = {
      category: "Details of Maintenance Activity",
      activity: newMCBId,
    };

    setMcb3activity((prev) => [...prev, newMCB]);
    setFormValues((prevValues) => ({
      ...prevValues,
      mcb3: [...prevValues.mcb3, { volt: "", val: "" }],
    }));
  };

  // Handle range change
  const halfyearlyRangeHandler = (selectedRange) => {
    setHalfyearlyRange(selectedRange);
    setFormValues((prevValues) => ({
      ...prevValues,
      range: selectedRange,
    }));
  };

  // Handle field changes
  const handleChange = (index, field, value, type) => {
    if (type) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [type]: prevValues[type].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [field]: value,
      }));
    }

    // Clear field error when user starts typing
    const errorKey = type ? `${type}_${index}_${field}` : field;
    if (formErrors[errorKey]) {
      setFormErrors(prev => ({
        ...prev,
        [errorKey]: ""
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formValues.station) {
      errors.station = "Station is required";
    }
    
    if (!formValues.date) {
      errors.date = "Date is required";
    }

    // Validate voltage readings are numeric
    formValues.mcb.forEach((mcb, index) => {
      ['r_y', 'y_b', 'r_b', 'r_n', 'y_n', 'b_n'].forEach(field => {
        if (mcb[field] && isNaN(mcb[field])) {
          errors[`mcb_${index}_${field}`] = "Must be a valid voltage reading";
        }
      });
    });

    formValues.mcb2.forEach((mcb, index) => {
      ['r_y2', 'y_b2', 'r_b2'].forEach(field => {
        if (mcb[field] && isNaN(mcb[field])) {
          errors[`mcb2_${index}_${field}`] = "Must be a valid voltage reading";
        }
      });
    });

    formValues.mcb3.forEach((mcb, index) => {
      if (mcb.volt && isNaN(mcb.volt)) {
        errors[`mcb3_${index}_volt`] = "Must be a valid voltage reading";
      }
      if (mcb.val && isNaN(mcb.val)) {
        errors[`mcb3_${index}_val`] = "Must be a valid measurement";
      }
    });

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
        ...formValues,
        slug: slug || "measurement-voltage-mcb-pdc"
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("Measurement of Voltage at MCB in PDC record saved successfully!");
      navigate(`/list/${slug}`);
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving record. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormValues({
      station: "",
      date: "",
      halfyearly: halfyearlyactivity.map(() => ({
        checked: "",
      })),
      mcb: mcbactivity.map(() => ({
        r_y: "",
        y_b: "",
        r_b: "",
        r_n: "",
        y_n: "",
        b_n: "",
      })),
      mcb2: mcb2activity.map(() => ({
        r_y2: "",
        y_b2: "",
        r_b2: "",
      })),
      mcb3: mcb3activity.map(() => ({
        volt: "",
        val: "",
      })),
      range: "January-June",
      remarks: "",
      signature: "",
      name: "",
      designation: "",
      empno: "",
      countersign: "",
      employee_id: "",
      department: "",
      unit: "",
    });
    setHalfyearlyRange("January-June");
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="Measurement of Voltage at MCB in PDC - Six Monthly Maintenance Record"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "MCB Voltage Measurement", path: "/signalling/mcb-voltage-measurement" }
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
              value={formValues.station}
              onChange={(e) => handleChange(null, "station", e.target.value, null)}
              options={stationOptions}
              required={true}
              error={formErrors.station}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="select"
              name="range"
              label="Month Range"
              value={formValues.range}
              onChange={(e) => halfyearlyRangeHandler(e.target.value)}
              options={rangeOptions}
              required={true}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="date"
              label="Date"
              value={formValues.date}
              onChange={(e) => handleChange(null, "date", e.target.value, null)}
              required={true}
              error={formErrors.date}
            />
          </div>
        </div>

        {/* Status Check Activities */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Details of Maintenance Activity</h5>
          </div>
          <div className="card-body">
            {halfyearlyactivity.map((activity, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-8">
                  <label className="form-label">{activity.activity}</label>
                </div>
                <div className="col-md-4">
                  <UniversalSignallingFormField
                    type="select"
                    name={`checked_${index}`}
                    value={formValues.halfyearly[index]?.checked || ""}
                    onChange={(e) => handleChange(index, "checked", e.target.value, "halfyearly")}
                    options={statusOptions}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MCB Voltage Measurements - First Section */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">MCB Voltage Measurements (Section 1)</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>MCB</th>
                    <th>R-Y (V)</th>
                    <th>Y-B (V)</th>
                    <th>R-B (V)</th>
                    <th>R-N (V)</th>
                    <th>Y-N (V)</th>
                    <th>B-N (V)</th>
                  </tr>
                </thead>
                <tbody>
                  {mcbactivity.map((activity, index) => (
                    <tr key={index}>
                      <td><strong>{activity.activity}</strong></td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb[index]?.r_y || ""}
                          onChange={(e) => handleChange(index, "r_y", e.target.value, "mcb")}
                          placeholder="Volts"
                        />
                        {formErrors[`mcb_${index}_r_y`] && (
                          <small className="text-danger">{formErrors[`mcb_${index}_r_y`]}</small>
                        )}
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb[index]?.y_b || ""}
                          onChange={(e) => handleChange(index, "y_b", e.target.value, "mcb")}
                          placeholder="Volts"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb[index]?.r_b || ""}
                          onChange={(e) => handleChange(index, "r_b", e.target.value, "mcb")}
                          placeholder="Volts"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb[index]?.r_n || ""}
                          onChange={(e) => handleChange(index, "r_n", e.target.value, "mcb")}
                          placeholder="Volts"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb[index]?.y_n || ""}
                          onChange={(e) => handleChange(index, "y_n", e.target.value, "mcb")}
                          placeholder="Volts"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb[index]?.b_n || ""}
                          onChange={(e) => handleChange(index, "b_n", e.target.value, "mcb")}
                          placeholder="Volts"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MCB Voltage Measurements - Second Section */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">MCB Voltage Measurements (Section 2)</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>MCB</th>
                    <th>R-Y (V)</th>
                    <th>Y-B (V)</th>
                    <th>R-B (V)</th>
                  </tr>
                </thead>
                <tbody>
                  {mcb2activity.map((activity, index) => (
                    <tr key={index}>
                      <td><strong>{activity.activity}</strong></td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb2[index]?.r_y2 || ""}
                          onChange={(e) => handleChange(index, "r_y2", e.target.value, "mcb2")}
                          placeholder="Volts"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb2[index]?.y_b2 || ""}
                          onChange={(e) => handleChange(index, "y_b2", e.target.value, "mcb2")}
                          placeholder="Volts"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb2[index]?.r_b2 || ""}
                          onChange={(e) => handleChange(index, "r_b2", e.target.value, "mcb2")}
                          placeholder="Volts"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dynamic MCB Section */}
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Additional MCB Measurements</h5>
              <button
                type="button"
                onClick={addMCB}
                className="btn btn-secondary btn-sm"
              >
                Add MCB
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>MCB</th>
                    <th>Voltage (V)</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {mcb3activity.map((activity, index) => (
                    <tr key={index}>
                      <td><strong>{activity.activity}</strong></td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb3[index]?.volt || ""}
                          onChange={(e) => handleChange(index, "volt", e.target.value, "mcb3")}
                          placeholder="Volts"
                        />
                        {formErrors[`mcb3_${index}_volt`] && (
                          <small className="text-danger">{formErrors[`mcb3_${index}_volt`]}</small>
                        )}
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formValues.mcb3[index]?.val || ""}
                          onChange={(e) => handleChange(index, "val", e.target.value, "mcb3")}
                          placeholder="Value"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Staff Details */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Staff Details</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="name"
                  label="Name"
                  value={formValues.name}
                  onChange={(e) => handleChange(null, "name", e.target.value, null)}
                  placeholder="Staff name"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="designation"
                  label="Designation"
                  value={formValues.designation}
                  onChange={(e) => handleChange(null, "designation", e.target.value, null)}
                  placeholder="Staff designation"
                />
              </div>
              <div className="col-md-4">
                <UniversalSignallingFormField
                  type="text"
                  name="empno"
                  label="Employee No"
                  value={formValues.empno}
                  onChange={(e) => handleChange(null, "empno", e.target.value, null)}
                  placeholder="Employee number"
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-12">
                <UniversalSignallingFormField
                  type="textarea"
                  name="remarks"
                  label="Remarks"
                  value={formValues.remarks}
                  onChange={(e) => handleChange(null, "remarks", e.target.value, null)}
                  placeholder="Additional remarks about measurements"
                  rows={3}
                />
              </div>
            </div>
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
                  "Save MCB Voltage Record"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default MeasurementVoltageMCBinPDCForm;