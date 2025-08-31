import React, { useEffect, useRef } from 'react';

const LiveRegion = ({ 
  message = '', 
  type = 'polite', 
  clearDelay = 5000,
  className = 'visually-hidden',
  onClear = null
}) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (message && clearDelay > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        onClear?.();
      }, clearDelay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, clearDelay, onClear]);

  if (!message) return null;

  return (
    <div
      aria-live={type}
      aria-atomic="true"
      className={className}
      role="status"
    >
      {message}
    </div>
  );
};

export default LiveRegion;