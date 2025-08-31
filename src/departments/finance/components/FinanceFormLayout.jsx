import React from "react";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * Universal Finance Form Layout Component
 * 
 * Provides consistent layout structure for all Finance forms
 * while preserving exact styling and behavior
 */
const FinanceFormLayout = ({
  title,
  breadcrumbItems = [],
  children,
  onSubmit,
  isSubmitting = false,
  submitButtonText = "Save",
  containerWidth = "95%",
  showNote = false,
  noteText = "",
  className = ""
}) => {
  return (
    <div className={`container ${className}`}>
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
          className="col-md-8 form-container"
          style={{ 
            marginLeft: "0", 
            marginRight: "0", 
            maxWidth: containerWidth 
          }}
        >
          <form onSubmit={onSubmit}>
            {/* Form Heading - Preserving exact structure */}
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">{title}</h3>
              <div className="heading-line"></div>
            </div>

            {/* Form Content */}
            {children}

            {/* Submit Button - Preserving exact structure */}
            <div className="col-12 text-center pt-3">
              <button 
                type="submit" 
                className="btn btn-primary px-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : submitButtonText}
              </button>
            </div>
          </form>

          {/* Optional Note - Preserving exact structure */}
          {showNote && noteText && (
            <p className="mt-3">
              {noteText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceFormLayout;