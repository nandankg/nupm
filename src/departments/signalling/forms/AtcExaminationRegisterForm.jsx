import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { validateSignallingForm, atcExaminationValidation } from "../validation/signallingValidationSchemas";
import { addData } from "../../../reducer/pinki/AtcExaminationReducer";
import { formatDate } from "../../../data/formatDate";

/**
 * ATC Examination Register Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const AtcExaminationRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const atcexamination = useSelector((state) => state.atcexamination);
  
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (atcexamination) {
      setSlug(atcexamination.slug);
    }
  }, [atcexamination]);

  // PRESERVED EXACT INITIAL VALUES - No changes to field names from original
  const initialFormState = {
    sl_no: "----",
    from1: "",
    upto1: "",
    fitness1: "",
    from2: "",
    upto2: "",
    fitness2: "",
    from3: "",
    upto3: "",
    fitness3: "",
    from4: "",
    upto4: "",
    fitness4: "",
    from5: "",
    upto5: "",
    fitness5: "",
    from6: "",
    upto6: "",
    fitness6: "",
    from7: "",
    upto7: "",
    fitness7: "",
    from8: "",
    upto8: "",
    fitness8: "",
    from9: "",
    upto9: "",
    fitness9: "",
    from10: "",
    upto10: "",
    fitness10: "",
    from11: "",
    upto11: "",
    fitness11: "",
    from12: "",
    upto12: "",
    fitness12: "",
    from13: "",
    upto13: "",
    fitness13: "",
    from14: "",
    upto14: "",
    fitness14: "",
    from15: "",
    upto15: "",
    fitness15: "",
    from16: "",
    upto16: "",
    fitness16: "",
    from17: "",
    upto17: "",
    fitness17: "",
    from18: "",
    upto18: "",
    fitness18: "",
    from19: "",
    upto19: "",
    fitness19: "",
    from20: "",
    upto20: "",
    fitness20: "",
    remarksf: "",
    remarksf2: "",
    remarksf3: "",
    remarksf4: "",
    remarksf5: "",
    remarksf6: "",
    remarksf7: "",
    remarksf8: "",
    remarksf9: "",
    remarksf10: "",
    date: formatDate(new Date().toString()),
  };

  const [formValues, setFormValues] = useState(initialFormState);

  // Fitness status options - preserved from original
  const fitnessOptions = [
    { value: "", label: "Select Status" },
    { value: "fit", label: "Fit" },
    { value: "unfit", label: "Unfit" },
    { value: "conditionally-fit", label: "Conditionally Fit" },
    { value: "pending", label: "Pending" },
  ];

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

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Date validation
    if (!formValues.date) {
      errors.date = "Date is required";
    }

    // At least one examination entry should be filled
    let hasExaminationData = false;
    for (let i = 1; i <= 20; i++) {
      if (formValues[`from${i}`] || formValues[`upto${i}`] || formValues[`fitness${i}`]) {
        hasExaminationData = true;
        
        // If any field is filled, all should be filled for that entry
        if (!formValues[`from${i}`]) {
          errors[`from${i}`] = `From date is required for entry ${i}`;
        }
        if (!formValues[`upto${i}`]) {
          errors[`upto${i}`] = `Up to date is required for entry ${i}`;
        }
        if (!formValues[`fitness${i}`]) {
          errors[`fitness${i}`] = `Fitness status is required for entry ${i}`;
        }
      }
    }

    if (!hasExaminationData) {
      errors.general = "At least one examination entry is required";
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

    setIsLoading(true);
    
    try {
      // Preserve exact field structure for API compatibility
      const submissionData = {
        ...formValues,
        slug: slug || "atc-examination-register"
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("ATC Examination Register saved successfully!");
      navigate("/admin/AllDeptFormList");
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormValues(initialFormState);
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="ATC Examination Register"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "ATC Examination Register", path: "/signalling/atc-examination" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UniversalSignallingFormField
            type="text"
            name="sl_no"
            label="Serial Number"
            value={formValues.sl_no}
            onChange={(e) => handleFieldChange("sl_no", e.target.value)}
            readOnly={true}
            error={formErrors.sl_no}
          />
          
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

        {formErrors.general && (
          <div className="alert alert-danger" role="alert">
            {formErrors.general}
          </div>
        )}

        {/* ATC Examination Entries */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">ATC Examination Records</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>From Date</th>
                    <th>Up To Date</th>
                    <th>Fitness Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, index) => {
                    const num = index + 1;
                    return (
                      <tr key={num}>
                        <td>{num}</td>
                        <td>
                          <UniversalSignallingFormField
                            type="date"
                            name={`from${num}`}
                            value={formValues[`from${num}`]}
                            onChange={(e) => handleFieldChange(`from${num}`, e.target.value)}
                            error={formErrors[`from${num}`]}
                            className="form-control-sm"
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="date"
                            name={`upto${num}`}
                            value={formValues[`upto${num}`]}
                            onChange={(e) => handleFieldChange(`upto${num}`, e.target.value)}
                            error={formErrors[`upto${num}`]}
                            className="form-control-sm"
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="select"
                            name={`fitness${num}`}
                            value={formValues[`fitness${num}`]}
                            onChange={(e) => handleFieldChange(`fitness${num}`, e.target.value)}
                            options={fitnessOptions}
                            error={formErrors[`fitness${num}`]}
                            className="form-control-sm"
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="text"
                            name={`remarksf${num}`}
                            value={formValues[`remarksf${num}`]}
                            onChange={(e) => handleFieldChange(`remarksf${num}`, e.target.value)}
                            placeholder="Optional remarks"
                            className="form-control-sm"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Examination Entries (11-20) */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Additional Examination Records (11-20)</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>From Date</th>
                    <th>Up To Date</th>
                    <th>Fitness Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, index) => {
                    const num = index + 11;
                    return (
                      <tr key={num}>
                        <td>{num}</td>
                        <td>
                          <UniversalSignallingFormField
                            type="date"
                            name={`from${num}`}
                            value={formValues[`from${num}`]}
                            onChange={(e) => handleFieldChange(`from${num}`, e.target.value)}
                            error={formErrors[`from${num}`]}
                            className="form-control-sm"
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="date"
                            name={`upto${num}`}
                            value={formValues[`upto${num}`]}
                            onChange={(e) => handleFieldChange(`upto${num}`, e.target.value)}
                            error={formErrors[`upto${num}`]}
                            className="form-control-sm"
                          />
                        </td>
                        <td>
                          <UniversalSignallingFormField
                            type="select"
                            name={`fitness${num}`}
                            value={formValues[`fitness${num}`]}
                            onChange={(e) => handleFieldChange(`fitness${num}`, e.target.value)}
                            options={fitnessOptions}
                            error={formErrors[`fitness${num}`]}
                            className="form-control-sm"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
                disabled={isLoading}
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </span>
                ) : (
                  "Save ATC Examination Register"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default AtcExaminationRegisterForm;