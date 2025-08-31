// Utility to handle chunk loading errors with retry mechanism
const importWithRetry = (importFunc, retryCount = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const attemptImport = () => {
      attempts++;
      importFunc()
        .then(resolve)
        .catch((error) => {
          // Check if this is a chunk loading error
          const isChunkError = error?.name === 'ChunkLoadError' || 
                              error?.message?.includes('Loading chunk') ||
                              error?.message?.includes('timeout');
          
          if (isChunkError && attempts < retryCount) {
            console.warn(`Chunk loading failed, attempt ${attempts}/${retryCount}. Retrying in ${delay}ms...`, error);
            setTimeout(attemptImport, delay);
          } else {
            console.error(`Chunk loading failed after ${attempts} attempts:`, error);
            reject(error);
          }
        });
    };
    
    attemptImport();
  });
};

// Lazy import with automatic retry
export const lazyWithRetry = (importFunc, retryCount = 3, delay = 1000) => {
  return importWithRetry(importFunc, retryCount, delay);
};

// React lazy wrapper with retry
export const lazyComponentWithRetry = (importFunc, retryCount = 3, delay = 1000) => {
  return React.lazy(() => lazyWithRetry(importFunc, retryCount, delay));
};

export default importWithRetry;