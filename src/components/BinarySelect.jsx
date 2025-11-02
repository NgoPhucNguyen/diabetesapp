// src/components/BinarySelect.jsx
import React from "react";
import Tooltip from "./Tooltip";
import "./BinarySelect.css";

export default function BinarySelect({ label, name, value, onChange, tooltip, options, required = false }) {
  return (
    <div className={`binary-select ${required && value === "" ? "missing" : ""}`}>
      <label> 
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="binary-options">
        {options.map(([val, text]) => (
          <button
            key={val}
            type="button"
            className={`binary-btn ${value === String(val) ? "selected" : ""}`}
            onClick={() => onChange({ target: { name, value: String(val) } })}
            required
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
