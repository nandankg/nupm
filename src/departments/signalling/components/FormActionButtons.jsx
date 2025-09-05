import React from "react";

/**
 * Consistent Form Action Buttons Component
 * 
 * Provides clear, consistent button actions across all signalling forms:
 * - Reset Form (left side)
 * - Save as Draft (right side, outline)
 * - Submit (right side, primary)
 * 
 * Includes helpful tooltips to eliminate user confusion
 */
const FormActionButtons = ({
  loading = false,
  onReset,
  onSaveDraft,
  onSubmit,
  resetLabel = "Reset Form",
  draftLabel = "Save as Draft",
  submitLabel = "Submit",
  loadingLabel = "Processing...",
  disabled = false,
  showHelpText = true,
  formName = "form" // Used in help text
}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex gap-2 justify-content-between align-items-center">
          {/* Left side - Reset button */}
          <button
            type="button"
            onClick={onReset}
            className="btn btn-outline-secondary"
            disabled={loading || disabled}
            title="Clear all form fields and start over"
          >
            <i className="fas fa-undo me-2"></i>
            {resetLabel}
          </button>
          
          {/* Right side - Action buttons */}
          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={onSaveDraft}
              className="btn btn-outline-primary"
              disabled={loading || disabled}
              title="Save your work to continue editing later"
            >
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {loadingLabel}
                </span>
              ) : (
                <>
                  <i className="fas fa-save me-2"></i>
                  {draftLabel}
                </>
              )}
            </button>
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-success"
              disabled={loading || disabled}
              title="Finalize and submit the form (cannot be edited after submission)"
            >
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {loadingLabel}
                </span>
              ) : (
                <>
                  <i className="fas fa-paper-plane me-2"></i>
                  {submitLabel}
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Help text to clarify button actions */}
        {showHelpText && (
          <div className="mt-2">
            <small className="text-muted d-flex justify-content-end">
              <span className="me-4">
                <i className="fas fa-info-circle me-1 text-primary"></i>
                <strong>Save as Draft:</strong> Save your work to continue later
              </span>
              <span>
                <i className="fas fa-info-circle me-1 text-success"></i>
                <strong>Submit:</strong> Final submission (cannot be edited)
              </span>
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormActionButtons;