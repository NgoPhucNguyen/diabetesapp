// src/pages/Predict.jsx
import React, { useState } from "react";
import FormPredict from "../components/FormPredict";
import axios from "axios";
import "./Predict.css";

export default function Predict() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelType, setModelType] = useState("logistic");

  const handleFormSubmit = async (data) => {
    setLoading(true);
    setResult(null);

    const payload = { ...data, model_type: modelType };
    console.log("📦 Sending JSON to R backend:", JSON.stringify(payload, null, 2));

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ R backend response:", res.data);
      setResult(res.data);
    } catch (error) {
      console.error("❌ Error sending data:", error);
      setResult({ error: "Failed to connect to backend" });
    } finally {
      setLoading(false);
    }
  };

  // Format model names nicely
  const formatModelName = (type) => {
    switch (type) {
      case "lr":
      case "logistic":
        return "Logistic Regression";
      case "rf":
      case "random_forest":
        return "Random Forest";
      case "xgb":
      case "gradient_boosting":
        return "Gradient Boosting";
      default:
        return "Unknown Model";
    }
  };

  return (
    <div className="predict-container">
      {/* 🧠 Model Selector */}
      <div className="model-selector">
        <h2>Choose Model</h2>
        <div className="model-buttons">
          {["logistic", "random_forest", "gradient_boosting"].map((m) => (
            <button
              key={m}
              onClick={() => setModelType(m)}
              className={modelType === m ? "active" : ""}
            >
              {m === "logistic"
                ? "Logistic Regression"
                : m === "random_forest"
                ? "Random Forest"
                : "Gradient Boosting"}
            </button>
          ))}
        </div>
      </div>

      {/* 🧾 Form Section */}
      <FormPredict onSubmit={handleFormSubmit} />

      {/* 🩺 Result Section */}
      <div className="result-container">
        <h2>Prediction Result</h2>

        {loading && <p className="loading-text">🔄 Processing prediction...</p>}

        {result && !result.error && !loading && (
          <>
            <p><strong>Model Used:</strong> {result.model_used}</p>
            <p><strong>Predicted Class:</strong> {result.predicted_class}</p>
            <p><strong>Confidence:</strong> {result.confidence}%</p>
          </>
        )}


        {result?.error && !loading && (
          <p className="error-text">{result.error}</p>
        )}
      </div>
    </div>
  );
}
