// src/components/NumberInput.jsx
import React from "react";
import Tooltip from "./Tooltip";
import "./NumberInput.css";

export default function NumberInput({ label, name, value, onChange, min, max, tooltip }) {
  return (
    <div className="number-input-wrapper">
      <label className="number-label">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <input
        className="number-input"
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        placeholder={`${label} (${min}–${max})`}
        required
      />
    </div>
  );
}
