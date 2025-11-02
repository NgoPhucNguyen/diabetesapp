// src/pages/Predict.jsx
import React, { useState } from "react";
import FormPredict from "../components/FormPredict";
import axios from "axios";
import "./Predict.css"; // ✅ connect your theme-aware CSS

export default function Predict() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [modelType, setModelType] = useState("logistic");

  const handleFormSubmit = async (data) => {
    console.log("📦 Sending JSON to R backend:", JSON.stringify(data, null, 2));
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/predict",
        { ...data, model_type: modelType }, //! 3 DIFF MODELS
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("✅ R backend response:", res.data);
      setResult(res.data);
    } catch (error) {
      console.error("❌ Error sending data:", error);
      setResult({ error: "Failed to connect to backend" });
    } finally {
      setLoading(false);
    }
  };

  const getResultExplanation = (cls) => {
    if (cls === 0) return "No signs of diabetes detected.";
    if (cls === 1)
      return "Possible diabetes risk — consult medical professional.";
    if (cls === 2)
      return "High diabetes likelihood — seek medical advice.";
    return "Unknown classification.";
  };

  return (
    <div className="predict-container">
      {/* 🧠 Model Selector */}
      <div className="model-selector">
        <h2>🧠 Choose Model</h2>
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
      <FormPredict onSubmit={handleFormSubmit}/>

      
      {/* 🩺 Result Section */}
      <div className="result-container">
        <h2>🩺 Prediction Result</h2>

        {loading && (
          <p className="loading-text">🔄 Processing prediction...</p>
        )}

        {result && !result.error && !loading && (
          <>
            <p className="prediction-text">
              Predicted Class:{" "}
              <span className="highlight">{result.predicted_class}</span>
            </p>
            <p>💬 {getResultExplanation(result.predicted_class)}</p>

            <div className="mt-4">
              <strong>Probabilities:</strong>{" "}
              <span className="text-sm">
                {result.probabilities
                  ?.map((p) => p.toFixed(4))
                  .join(", ")}
              </span>
            </div>
          </>
        )}

        {result?.error && !loading && (
          <p className="error-text">{result.error}</p>
        )}
      </div>
    </div>
  );
}
