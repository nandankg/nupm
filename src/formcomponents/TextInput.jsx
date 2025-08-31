import React from "react";

const TextInput = ({ label, name, type, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      className="form-control"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextInput;
