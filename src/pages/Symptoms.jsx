import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./Symptoms.css";
export default function Symptoms() {
  const navigate = useNavigate();

  return (
    <div className="subpage-section">
      <div className="symptoms-content" >
        <div className="symptoms-text">
          <h1>diabetes signs and symptoms</h1>
          <p>
            Symptoms of diabetes can include classic signs like frequent urination and excessive thirst,
            but they vary by type. Type 1 diabetes symptoms tend to appear suddenly and are often more
            severe, while Type 2 diabetes symptoms may develop gradually over years or even go unnoticed.
            Gestational diabetes usually shows no obvious symptoms, which is why pregnant women are
            routinely tested between 24–28 weeks.
          </p>

          <h2>Common Warning Signs</h2>
          <p>
            If you experience any of the following symptoms, it’s important to speak with a healthcare
            provider and get a blood sugar test:
          </p>
          <ul>
            <li>Frequent urination, especially at night</li>
            <li>Extreme thirst or feeling very thirsty</li>
            <li>Unexplained weight loss</li>
            <li>Increased hunger, even after eating</li>
            <li>Blurred vision</li>
            <li>Numbness or tingling in hands or feet</li>
            <li>Fatigue or feeling unusually tired</li>
            <li>Dry skin or slow-healing sores</li>
            <li>Frequent infections, such as skin, gum, or bladder infections</li>
          </ul>

          <h2>Differences by Type</h2>
          <p>
            According to the CDC, people with <strong>Type 1 diabetes</strong> may also experience symptoms like
            nausea, vomiting, or stomach pain due to a rapid rise in blood sugar. In contrast, many people
            with <strong>Type 2 diabetes</strong> might not notice any symptoms at all in the early stages, which
            makes regular screening and awareness of risk factors especially important.
          </p>

          <h2>Why Early Detection Matters</h2>
          <p>
            Detecting diabetes early can help prevent long-term health problems such as heart disease,
            nerve damage, vision loss, and kidney failure. Even mild or infrequent symptoms should not
            be ignored — regular checkups and blood glucose testing are key to managing and maintaining
            good health.
          </p>
        </div>

        
          <div className="subpage-nav">
            <Button className="" onClick={() => navigate("/basics")}> Basics</Button>
            <Button onClick={() => navigate("/riskfactors")}>Risk Factors</Button>
          </div>
      </div>
    </div>
  );
}
