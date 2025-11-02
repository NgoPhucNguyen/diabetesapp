import React from "react";
import "./Basics.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Basics() {
  const navigate = useNavigate();
  
  return (
    <>
    <div className="subpage-section">
      <div className="basics-content">
        <div className="basics-text">
          <h1>diabetes basics</h1>
          <p>
            Diabetes is a chronic condition that affects how your body turns food into energy. Normally, most of the food you eat is broken down into sugar (glucose) and released into your bloodstream. When blood sugar levels rise, your pancreas releases insulin — a hormone that allows sugar to enter your cells and be used for energy.
          </p>

          <p>
            If you have diabetes, your body either doesn’t make enough insulin or can’t use it effectively. Without enough insulin (or if your cells stop responding to it), too much sugar stays in your blood. Over time, high blood sugar can lead to serious health problems like heart disease, vision loss, and kidney disease.
          </p>

          <h2>Types of Diabetes</h2>
          <ul>
            <li>
              <strong>Type 1 Diabetes:</strong> A condition in which the body produces little or no insulin. It’s usually diagnosed in children and young adults.
            </li>
            <li>
              <strong>Type 2 Diabetes:</strong> A condition where the body doesn’t use insulin properly (insulin resistance). It’s the most common form and usually develops in adults.
            </li>
            <li>
              <strong>Gestational Diabetes:</strong> A type that develops during pregnancy. It often goes away after the baby is born but increases the risk of Type 2 diabetes later in life.
            </li>
          </ul>

          <h2>Why It Matters</h2>
          <p>
            Understanding diabetes is key to managing or preventing it. With healthy eating, regular physical activity, and proper medical care (like taking insulin or other medications if needed), you can keep your blood sugar in a healthy range. This reduces the risk of complications and helps you live a long, healthy life.
          </p>
        </div>

          <div className="subpage-nav">
            <Button onClick={() => navigate("/treatment")}> treatment  </Button>
            <Button onClick={() => navigate("/symptoms")}> symptoms</Button>
          </div>
      
      </div>
    </div>
    </>
  );
}
