// src/components/DropdownSelect.jsx
import React from "react";
import Tooltip from "./Tooltip";
import "./DropdownSelect.css";

export default function DropdownSelect({ label, name, value, onChange, options, tooltip }) {
  return (
    <div className="dropdown-wrapper">
      <label className="dropdown-label">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>

      <select
        className="dropdown-select"
        name={name}
        value={value}
        onChange={onChange}
        required
      >
        <option value="">-- Select --</option>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}
