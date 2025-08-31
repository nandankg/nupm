import React from 'react';

class ChunkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Check if this is a chunk loading error
    const isChunkError = error?.name === 'ChunkLoadError' || 
                        error?.message?.includes('Loading chunk') ||
                        error?.message?.includes('timeout');
    
    return { 
      hasError: true, 
      error,
      isChunkError 
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Chunk Error Boundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    // Clear the error state and reload the page to get fresh chunks
    this.setState({ hasError: false, error: null });
    
    // If it's a chunk error, try reloading the page
    if (this.state.isChunkError) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      const { isChunkError } = this.state;
      
      return (
        <div className="chunk-error-container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '5px',
          margin: '20px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#dc3545', marginBottom: '10px' }}>
              {isChunkError ? 'Loading Failed' : 'Something went wrong'}
            </h4>
            <p style={{ color: '#6c757d', marginBottom: '15px' }}>
              {isChunkError 
                ? 'Failed to load the page content. This may be due to a network issue.'
                : 'An unexpected error occurred.'
              }
            </p>
          </div>
          
          <div>
            <button
              className="btn btn-primary"
              onClick={this.handleRetry}
              style={{
                padding: '8px 16px',
                marginRight: '10px',
                backgroundColor: '#007bff',
                border: '1px solid #007bff',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              {isChunkError ? 'Reload Page' : 'Try Again'}
            </button>
            
            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = '/dashboard'}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                border: '1px solid #6c757d',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Go to Dashboard
            </button>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '20px', textAlign: 'left', width: '100%' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                Error Details (Development Only)
              </summary>
              <pre style={{ 
                backgroundColor: '#f1f1f1', 
                padding: '10px', 
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
                {this.state.error?.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChunkErrorBoundary;