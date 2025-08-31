import React from "react";

const CheckboxInput = ({ label, name, checked, onChange }) => (
  <div className="mb-3">
    <div className="form-check">
      <input
        type="checkbox"
        id={name}
        name={name}
        className="form-check-input"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name} className="form-check-label">
        {label}
      </label>
    </div>
  </div>
);

export default CheckboxInput;
