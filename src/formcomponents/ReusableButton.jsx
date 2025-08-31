import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const ReusableButton = ({ label, description, onClick, btnClass, tooltipClass, iconClass }) => {
  return (
    <div className="position-relative d-inline-block">
      <button
        className={`btn ${btnClass}`}
        onClick={onClick}
        onMouseOver={(e) => e.target.nextSibling.style.visibility = 'visible'}
        onMouseOut={(e) => e.target.nextSibling.style.visibility = 'hidden'}
      >
        {iconClass && <i className={`bi ${iconClass} me-2`}></i>} {/* Icon with margin */}
        {label}
      </button>
      <span className={`tooltip-text position-absolute ${tooltipClass}`}>
        {description}
      </span>
    </div>
  );
};

ReusableButton.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  btnClass: PropTypes.string,
  tooltipClass: PropTypes.string,
  iconClass: PropTypes.string, // Icon class for Bootstrap Icons
};

ReusableButton.defaultProps = {
  btnClass: 'btn-primary', // Default Bootstrap button style
  tooltipClass: 'bg-dark text-white p-2 rounded',
  iconClass: '', // Default to no icon
};

export default ReusableButton;
