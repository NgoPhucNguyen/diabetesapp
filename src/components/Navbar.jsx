// Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      {/* Logo / Brand */}
      <NavLink to="/" className="navbar-logo">
        Diabetes AI
      </NavLink>

      {/* Simple hamburger (3 bars, no animation) */}
      <div
        className="navbar-toggle"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Menu links */}
      <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/predict">Predict</NavLink></li>
        <li><NavLink to="/model">Model</NavLink></li>
        <li><NavLink to="/plot">Plot</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
