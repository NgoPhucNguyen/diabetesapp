// src/components/InfoInput.jsx
import { useState } from "react";
import "./InfoInput.css";

export default function InfoInput({ label, name, value, onChange, placeholder, tooltip }) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div
      className="info-input"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <label>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ""}
        required
      />
      {showTip && (
        <div className="tooltip-box">
          <pre>{tooltip}</pre>
        </div>
      )}
    </div>
  );
}
