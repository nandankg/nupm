import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="d-flex gap-1 justify-content-center mt-3">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => onPageChange(index + 1)}
        className={`btn btn-primary ${
          index + 1 === currentPage ? "active" : ""
        }`}
      >
        {index + 1}
      </button>
    ))}
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default React.memo(Pagination);
