import React from "react";
import "./Button.css";

export default function Button({ children, onClick, type = "button" }) {
  return (
    <button className="subpage-nav-button" onClick={onClick} type={type}>
      {children}
    </button>
  );
}
