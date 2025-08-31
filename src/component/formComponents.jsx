import React from "react";

// Reusable Select Input Component
export const SelectInput = ({ label, id, name, value, options, onChange }) => (
  <div className="col-md-6 mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <select
      className="form-select"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">Select an Option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Reusable Text Input Component
export const TextInput = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
}) => (
  <div className="col-md-6 mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      type={type}
      className="form-control"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

// Reusable TextArea Component
export const TextArea = ({ label, id, name, value, onChange, rows = 3 }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <textarea
      className="form-control"
      id={id}
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
    />
  </div>
);
