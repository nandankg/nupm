import React from 'react';

const TelecomFormLayout = ({ 
  title, 
  children, 
  onSubmit, 
  loading = false,
  className = "",
  subtitle = "",
  showActions = true,
  customActions = null
}) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className={`telecom-form-container ${className}`}>
      <div className="card shadow-sm">
        <div className="card-header bg-info text-white">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <i className="fas fa-broadcast-tower fs-4"></i>
            </div>
            <div>
              <h4 className="mb-0">Telecom Department</h4>
              <h5 className="mb-0 fw-normal">{title}</h5>
              {subtitle && <small className="opacity-75">{subtitle}</small>}
            </div>
          </div>
        </div>
        
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                {children}
              </div>
            </div>
            
            {showActions && (
              <div className="form-actions mt-4 pt-3 border-top">
                {customActions ? customActions : (
                  <div className="d-flex gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-info"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Save Form
                        </>
                      )}
                    </button>
                    
                    <button 
                      type="reset" 
                      className="btn btn-outline-secondary"
                      disabled={loading}
                    >
                      <i className="fas fa-undo me-2"></i>
                      Clear Form
                    </button>
                    
                    <button 
                      type="button" 
                      className="btn btn-outline-info"
                      onClick={() => window.print()}
                      disabled={loading}
                    >
                      <i className="fas fa-print me-2"></i>
                      Print
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Loading Overlay */}
      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25" style={{ zIndex: 1050 }}>
          <div className="card p-4">
            <div className="d-flex align-items-center">
              <div className="spinner-border text-info me-3"></div>
              <div>
                <h6 className="mb-0">Processing...</h6>
                <small className="text-muted">Please wait while we save your data</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelecomFormLayout;