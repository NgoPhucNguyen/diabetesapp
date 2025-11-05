import React from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";


import "./Home.css";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-section home-page">
      {/* ====== 1️⃣ Overview of 5 Subpages ====== */}
      <div className="home-overview">
        <div className="home-intro">
          <h1>Diabetes</h1>
          <p>
            Diabetes is a chronic condition that affects how your body turns food into energy.  
            Learn more about its symptoms, risks, and prevention to protect your health.
          </p>

          <div className="home-buttons">
            <button onClick={() => navigate("/basics")}>Basics</button>
            <button onClick={() => navigate("/symptoms")}>Symptoms</button>
            <button onClick={() => navigate("/riskfactors")}>Risk Factors</button>
            <button onClick={() => navigate("/preventing")}>Preventing</button>
            <button onClick={() => navigate("/treatment")}>Treatment</button>
          </div>
        </div>
      </div>

      {/* ====== 2️⃣ Doctor & Patient Image ====== */}
      <div className="home-quote-section">
        <div className="home-text">
          <h1>
            "The blame, if we've got to extend some here, has been with our advice and it's time we change that."
          </h1>
          <h1>
            “The solution to the diabetes epidemic in my clinic is exceedingly clear:
            stop using medicine to treat food, and for a disease whose root cause is
            carbohydrates, take away the carbohydrates or at least cut them.”
          </h1>
          <h2>Dr. Sarah Hallberg</h2>
        </div>

        <div className="home-image">
          <img src="/images/doctor.jpg" alt="Doctor consulting a diabetes patient" />
        </div>
      </div>

      {/* ====== 3️⃣ Global Diabetes Stats ====== */}
      <div className="home-stats">
        <h1>Global Diabetes Overview</h1>
        <div className="stats-cards">
          <div className="card">
            <h3>580M+</h3>
            <p>People living with diabetes worldwide</p>
          </div>
          <div className="card">
            <h3>4.2M+</h3>
            <p>Receive effective treatment annually</p>
          </div>
          <div className="card">
            <h3>120K+</h3>
            <p>New studies & articles published globally</p>
          </div>
        </div>
      </div>

      {/* ====== 4️⃣ YouTube Educational Video ====== */}
      <div className="home-video">
        <h1>Video Spotlight</h1>
        <div className="video-wrapper">
          <video width="100%" controls>
            <source src="/video/1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>


    </div>
  );
}
