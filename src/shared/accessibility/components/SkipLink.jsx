import React from 'react';

const SkipLink = ({ 
  href = '#main-content', 
  children = 'Skip to main content',
  className = 'skip-link'
}) => {
  return (
    <a
      href={href}
      className={className}
      onFocus={(e) => {
        e.target.style.position = 'absolute';
        e.target.style.top = '10px';
        e.target.style.left = '10px';
        e.target.style.zIndex = '9999';
      }}
      onBlur={(e) => {
        e.target.style.position = 'absolute';
        e.target.style.top = '-9999px';
        e.target.style.left = '-9999px';
      }}
      style={{
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        backgroundColor: '#000',
        color: '#fff',
        padding: '8px 16px',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 'bold',
      }}
    >
      {children}
    </a>
  );
};

export default SkipLink;