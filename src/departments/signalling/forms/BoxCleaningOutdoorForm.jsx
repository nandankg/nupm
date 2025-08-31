import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { addData } from "../../../reducer/pinki/BoxCleaningOutdoorReducer";
import stations from "../../../station.json";

/**
 * Outdoor Junction/Repeater Box Cleaning Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const BoxCleaningOutdoorForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boxcleaning = useSelector((state) => state.boxcleaningoutdoor);
  
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

  // PRESERVED EXACT ACTIVITY STRUCTURE - No changes from original form
  const boxCleaningActivities = [
    {
      category: "Cleaning activity",
      activity: "Cleaning of Boxes/Cubicles",
    },
    {
      category: "Cleaning activity",
      activity: "Checking of proper dressing of Cubicles",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of terminal condition",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of Earthing of Box ",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of availability of connection details in the Box",
    },
    {
      category: "Cleaning activity",
      activity: "Cleaning of Boxes/Cubicles",
    },
    {
      category: "Cleaning activity",
      activity: "Checking of proper dressing of Cubicles",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of terminal condition",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of Earthing of Box ",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of availability of connection details in the Box",
    },
    {
      category: "Cleaning activity",
      activity: "Cleaning of Boxes/Cubicles",
    },
    {
      category: "Cleaning activity",
      activity: "Checking of proper dressing of Cubicles",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of terminal condition",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of Earthing of Box ",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of availability of connection details in the Box",
    },
    {
      category: "Cleaning activity",
      activity: "Cleaning of Boxes/Cubicles",
    },
    {
      category: "Cleaning activity",
      activity: "Checking of proper dressing of Cubicles",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of terminal condition",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of Earthing of Box ",
    },
    {
      category: "Cleaning activity",
      activity: "Verification of availability of connection details in the Box",
    },
  ];

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const [formValues, setFormValues] = useState({
    pointNo: "",
    date_of_maintenance: "",
    halfyearly: boxCleaningActivities.map(() => ({
      date: "",
      boxName: "",
      range: "January-June",
      checklistStatus: "N/A",
    })),
    remarks: "",
    signature: "",
    name: " ",
    designation: "",
    empno: "",
    csign: "",
    station: "",
  });

  const [halfYearlyRange, setHalfYearlyRange] = useState("January-June");

  // Station options for dropdown
  const stationOptions = [
    { value: "", label: "Select Station" },
    ...stations.map((station) => ({
      value: station["STATION Code"],
      label: station["Station Name"] || station["STATION Code"]
    }))
  ];

  // Half yearly range options
  const halfYearlyRangeOptions = [
    { value: "January-June", label: "January-June" },
    { value: "July-December", label: "July-December" }
  ];

  // Checklist status options
  const checklistStatusOptions = [
    { value: "N/A", label: "N/A" },
    { value: "Done", label: "Done" },
    { value: "Not Done", label: "Not Done" },
    { value: "Checked Okay", label: "Checked Okay" },
    { value: "Checked NOK", label: "Checked NOK" }
  ];

  // Handle half yearly range change
  const halfYearlyRangeHandler = (value) => {
    setHalfYearlyRange(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      halfyearly: prevValues.halfyearly.map((activity) => ({
        ...activity,
        range: value,
      })),
      name: value, // Update the name property with the selected value (preserved from original)
    }));
  };

  // Handle field changes
  const handleChange = (index, field, value, type) => {
    if (type === "halfyearly") {
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
    
    if (!formValues.date_of_maintenance) {
      errors.date_of_maintenance = "Date of maintenance is required";
    }
    
    if (!formValues.pointNo) {
      errors.pointNo = "Name of Outdoor Cabinet is required";
    }

    // Validate at least some activities are checked
    const hasCheckedActivities = formValues.halfyearly.some(activity => 
      activity.checklistStatus && activity.checklistStatus !== "N/A"
    );
    if (!hasCheckedActivities) {
      errors.activities = "At least one activity must be checked";
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
        ...formValues,
        slug: slug || "box-cleaning-outdoor-register"
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("Outdoor Junction/Repeater Box Cleaning record saved successfully!");
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
      pointNo: "",
      date_of_maintenance: "",
      halfyearly: boxCleaningActivities.map(() => ({
        date: "",
        boxName: "",
        range: "January-June",
        checklistStatus: "N/A",
      })),
      remarks: "",
      signature: "",
      name: " ",
      designation: "",
      empno: "",
      csign: "",
      station: "",
    });
    setHalfYearlyRange("January-June");
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="Outdoor Junction/Repeater Box Cleaning Maintenance Record"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Box Cleaning Outdoor", path: "/signalling/box-cleaning-outdoor" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-3">
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
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="date"
              name="date_of_maintenance"
              label="Date of Maintenance"
              value={formValues.date_of_maintenance}
              onChange={(e) => handleChange(null, "date_of_maintenance", e.target.value, null)}
              required={true}
              error={formErrors.date_of_maintenance}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="text"
              name="pointNo"
              label="Name of Outdoor Cabinet"
              value={formValues.pointNo}
              onChange={(e) => handleChange(null, "pointNo", e.target.value, null)}
              placeholder="Cabinet/Box name"
              required={true}
              error={formErrors.pointNo}
            />
          </div>
          <div className="col-md-3">
            <UniversalSignallingFormField
              type="select"
              name="csign"
              label="Half Yearly Range"
              value={formValues.csign}
              onChange={(e) => halfYearlyRangeHandler(e.target.value)}
              options={halfYearlyRangeOptions}
            />
          </div>
        </div>

        {/* Cleaning Activities */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Cleaning Activities</h5>
            {formErrors.activities && (
              <small className="text-danger">{formErrors.activities}</small>
            )}
          </div>
          <div className="card-body">
            {boxCleaningActivities.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== boxCleaningActivities[index - 1].category;

              return (
                <div key={index} className="mb-3">
                  {shouldPrintCategory && (
                    <div className="row">
                      <div className="col-md-12">
                        <h6 className="text-primary">{activity.category}</h6>
                        <hr />
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">{activity.activity}</label>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Box/Cabinet Name"
                        onChange={(e) =>
                          handleChange(index, "boxName", e.target.value, "halfyearly")
                        }
                        value={formValues.halfyearly[index].boxName}
                      />
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-control"
                        onChange={(e) =>
                          handleChange(index, "checklistStatus", e.target.value, "halfyearly")
                        }
                        value={formValues.halfyearly[index].checklistStatus}
                      >
                        {checklistStatusOptions.map((option, optIndex) => (
                          <option key={optIndex} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  placeholder="Additional remarks about cleaning activities"
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
                  "Save Box Cleaning Record"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default BoxCleaningOutdoorForm;