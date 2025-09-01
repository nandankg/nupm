import React from "react";

/**
 * Signalling Form Layout Component
 * 
 * Specialized layout for Signalling department forms with safety-critical considerations
 * Features technical equipment context, safety alerts, and compliance indicators
 */
const SignallingFormLayout = ({
  title,
  children,
  onSubmit,
  onCancel,
  isLoading = false,
  showSafetyAlert = false,
  safetyMessage = "",
  equipmentContext = "",
  complianceStatus = "",
  emergencyEscalation = false,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  showSubmitButton = true,
  showCancelButton = true,
  className = ""
}) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className={`container-fluid p-4 ${className}`}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          
          {/* Form Header with Equipment Context */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <div className="row align-items-center">
                <div className="col">
                  <h4 className="mb-0">
                    <i className="fas fa-traffic-light me-2"></i>
                    {title}
                  </h4>
                  {equipmentContext && (
                    <small className="text-light opacity-75">
                      Equipment: {equipmentContext}
                    </small>
                  )}
                </div>
                <div className="col-auto">
                  {complianceStatus && (
                    <span className={`badge ${
                      complianceStatus === 'compliant' ? 'bg-success' : 
                      complianceStatus === 'pending' ? 'bg-warning' : 
                      'bg-danger'
                    }`}>
                      {complianceStatus.charAt(0).toUpperCase() + complianceStatus.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Safety Alert Section */}
            {showSafetyAlert && (
              <div className={`alert ${emergencyEscalation ? 'alert-danger' : 'alert-warning'} mb-0 border-0`}>
                <div className="d-flex align-items-start">
                  <i className={`fas ${emergencyEscalation ? 'fa-exclamation-triangle' : 'fa-shield-alt'} me-2 mt-1`}></i>
                  <div>
                    <strong>
                      {emergencyEscalation ? 'SAFETY CRITICAL:' : 'Safety Notice:'}
                    </strong>
                    <span className="ms-2">{safetyMessage}</span>
                    {emergencyEscalation && (
                      <div className="mt-2 small">
                        <i className="fas fa-phone me-1"></i>
                        Immediate escalation required for safety-critical issues
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Form Content */}
                <div className="row">
                  <div className="col-12">
                    {children}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      
                      {/* Left side - Cancel button */}
                      <div>
                        {showCancelButton && (
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleCancel}
                            disabled={isLoading}
                          >
                            <i className="fas fa-times me-2"></i>
                            {cancelButtonText}
                          </button>
                        )}
                      </div>

                      {/* Right side - Submit button */}
                      <div>
                        {showSubmitButton && (
                          <button
                            type="submit"
                            className={`btn ${emergencyEscalation ? 'btn-danger' : 'btn-primary'}`}
                            disabled={isLoading}
                          >
                            {isLoading && (
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            )}
                            <i className={`fas ${emergencyEscalation ? 'fa-exclamation-circle' : 'fa-save'} me-2`}></i>
                            {isLoading ? "Processing..." : submitButtonText}
                          </button>
                        )}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Technical Guidelines */}
          <div className="card border-left-info">
            <div className="card-body py-3">
              <div className="row align-items-center">
                <div className="col">
                  <div className="text-muted small">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Technical Guidelines:</strong>
                    Ensure all equipment IDs follow railway standards. 
                    Report safety-critical issues immediately through proper channels.
                    {complianceStatus === 'pending' && (
                      <span className="text-warning ms-2">
                        <i className="fas fa-clock me-1"></i>
                        Compliance validation in progress
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <small className="text-muted">
                    Double-check all entries before submission.
                  </small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export { SignallingFormLayout };
export default SignallingFormLayout;