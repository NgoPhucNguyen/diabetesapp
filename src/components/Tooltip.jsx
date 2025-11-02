// src/components/Tooltip.jsx
import React, { useState } from "react";
import "./Tooltip.css";

export default function Tooltip({ text }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span className="info-icon">?</span>
      {visible && <div className="tooltip-box">{text}</div>}
    </div>
  );
}
