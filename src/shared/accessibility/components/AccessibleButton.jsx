import React from 'react';

const AccessibleButton = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = '',
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  ariaLabel,
  ariaDescribedBy,
  className = '',
  ...otherProps
}) => {
  const baseClasses = `btn btn-${variant}`;
  const sizeClass = size ? `btn-${size}` : '';
  const classes = [baseClasses, sizeClass, className].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const buttonProps = {
    type,
    className: classes,
    onClick: handleClick,
    disabled: disabled || loading,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-busy': loading ? 'true' : undefined,
    ...otherProps,
  };

  return (
    <button {...buttonProps}>
      {loading && (
        <span 
          className="spinner-border spinner-border-sm me-2" 
          role="status" 
          aria-hidden="true"
        />
      )}
      <span className={loading ? 'visually-hidden' : ''}>
        {children}
      </span>
      {loading && (
        <span aria-live="polite" className="visually-hidden">
          {loadingText}
        </span>
      )}
    </button>
  );
};

export default AccessibleButton;