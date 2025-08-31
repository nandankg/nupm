import React from "react";

const TextArea = ({ label, name, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      className="form-control"
      rows="3"
      value={value}
      onChange={onChange}
    ></textarea>
  </div>
);

export default TextArea;
