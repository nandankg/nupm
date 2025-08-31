import React from "react";

const SelectInput = ({ label, name, value, options, onChange }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <select
      id={name}
      name={name}
      className="form-select"
      value={value}
      onChange={onChange}
    >
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
