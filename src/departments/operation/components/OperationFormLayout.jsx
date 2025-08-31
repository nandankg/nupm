import React from "react";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * Universal Operation Form Layout Component
 * 
 * Provides consistent layout structure for all Operation forms
 * while preserving exact styling and behavior from existing forms
 */
const OperationFormLayout = ({
  title,
  formType = "Operation", // Operation, Crew Control, OCC, COET, etc.
  breadcrumbItems = [],
  children,
  onSubmit,
  isSubmitting = false,
  submitButtonText = "Save",
  containerWidth = "95%",
  showNote = false,
  noteText = "",
  className = "",
  priority = null, // For safety-critical forms
  formId = null,
  department = "Operation Department"
}) => {
  
  // Priority styling for safety-critical forms
  const getPriorityClass = () => {
    switch(priority) {
      case "critical":
        return "border-danger bg-light-danger";
      case "high":
        return "border-warning bg-light-warning";
      default:
        return "";
    }
  };

  return (
    <div className={`container ${className}`}>
      {/* Safety Priority Indicator for Critical Forms */}
      {priority === "critical" && (
        <div className="alert alert-danger mb-3" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          <strong>SAFETY CRITICAL FORM</strong> - Complete all fields accurately for safety compliance
        </div>
      )}

      {/* Breadcrumbs - Preserving exact structure */}
      {breadcrumbItems.length > 0 && (
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                to={item.to || "#"}
              >
                {item.text}
              </Link>
            ))}
          </Breadcrumbs>
        </div>
      )}

      <div className="row justify-content-center">
        <div
          className={`col-md-8 form-container ${getPriorityClass()}`}
          style={{ 
            marginLeft: "0", 
            marginRight: "0", 
            maxWidth: containerWidth 
          }}
        >
          <form onSubmit={onSubmit}>
            {/* Form Heading - Preserving exact structure */}
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">
                {department}: {title}
                {formId && <small className="text-muted ms-2">(Form ID: {formId})</small>}
              </h3>
              <div className="heading-line"></div>
              {formType !== "Operation" && (
                <p className="text-muted small mb-2">
                  <strong>{formType}</strong> Department Form
                </p>
              )}
            </div>

            {/* Form Content */}
            {children}

            {/* Submit Button - Preserving exact structure */}
            <div className="col-12 text-center pt-3">
              <button 
                type="submit" 
                className={`btn px-3 ${priority === 'critical' ? 'btn-danger' : 'btn-primary'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  submitButtonText
                )}
              </button>
              
              {/* Cancel/Reset button for critical forms */}
              {priority === "critical" && (
                <button 
                  type="button" 
                  className="btn btn-secondary px-3 ms-2"
                  onClick={() => window.location.reload()}
                >
                  Reset Form
                </button>
              )}
            </div>
          </form>

          {/* Optional Note - Preserving exact structure */}
          {showNote && noteText && (
            <div className={`mt-3 p-3 ${priority === 'critical' ? 'alert alert-info' : ''}`}>
              <p className={priority === 'critical' ? 'mb-0 fw-bold' : 'mb-0'}>
                {noteText}
              </p>
            </div>
          )}

          {/* Safety reminder for critical forms */}
          {priority === "critical" && (
            <div className="mt-3 alert alert-warning">
              <i className="fas fa-shield-alt me-2"></i>
              <strong>Safety Reminder:</strong> This form contains safety-critical information. 
              Double-check all entries before submission.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { OperationFormLayout };
export default OperationFormLayout;