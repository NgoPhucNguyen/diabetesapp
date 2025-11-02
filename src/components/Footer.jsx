import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const location = useLocation();
  const scrollTop = () => window.scrollTo(0, 0);

  // helper to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* <h2 className="footer-title">For Everyone</h2> */}

        {/* Main pages */}
        <ul className="footer-links">
          <li><Link to="/" onClick={scrollTop} className={isActive("/") ? "active" : ""}>Home</Link></li>
          <li><Link to="/predict" onClick={scrollTop} className={isActive("/predict") ? "active" : ""}>Predict</Link></li>
          <li><Link to="/model" onClick={scrollTop} className={isActive("/model") ? "active" : ""}>Model</Link></li>
          <li><Link to="/plot" onClick={scrollTop} className={isActive("/plot") ? "active" : ""}>Plot</Link></li>
          <li><Link to="/about" onClick={scrollTop} className={isActive("/about") ? "active" : ""}>About</Link></li>
        </ul>

        {/* Subpages under Home */}
        <ul className="footer-subpages">
          <li><Link to="/basics" onClick={scrollTop} className={isActive("/basics") ? "active" : ""}>Basics</Link></li>
          <li><Link to="/symptoms" onClick={scrollTop} className={isActive("/symptoms") ? "active" : ""}>Symptoms</Link></li>
          <li><Link to="/riskfactors" onClick={scrollTop} className={isActive("/riskfactors") ? "active" : ""}>Risk Factors</Link></li>
          <li><Link to="/preventing" onClick={scrollTop} className={isActive("/preventing") ? "active" : ""}>Preventing</Link></li>
          <li><Link to="/treatment" onClick={scrollTop} className={isActive("/treatment") ? "active" : ""}>Treatment</Link></li>
        </ul>

        <p className="footer-description">
          Explore data, visualize trends, and predict diabetes risk
        </p>
      </div>
    </footer>
  );
}
