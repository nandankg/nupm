import { useRef, useCallback, useEffect } from 'react';

export const useFocusManagement = () => {
  const focusRef = useRef(null);
  const previousFocusRef = useRef(null);

  const saveFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current && previousFocusRef.current.focus) {
      previousFocusRef.current.focus();
    }
  }, []);

  const setFocus = useCallback((element) => {
    if (element && element.focus) {
      element.focus();
    } else if (focusRef.current && focusRef.current.focus) {
      focusRef.current.focus();
    }
  }, []);

  const trapFocus = useCallback((containerElement) => {
    if (!containerElement) return () => {};

    const focusableElements = containerElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return () => {};

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    containerElement.addEventListener('keydown', handleKeyDown);
    firstFocusable.focus();

    return () => {
      containerElement.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleEscape = useCallback((callback) => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  return {
    focusRef,
    saveFocus,
    restoreFocus,
    setFocus,
    trapFocus,
    handleEscape,
  };
};