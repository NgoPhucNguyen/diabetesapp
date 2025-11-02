import React from "react";
import "./Model.css";
import Carousel from "../components/Carousel";

export default function Model() {
  const models = [
    {
      name: "Logistic Regression",
      description:
        "A linear model that predicts the probability of diabetes based on input features. It’s interpretable and fast for small datasets.",
      accuracy: "85%",
    },
    {
      name: "Random Forest",
      description:
        "An ensemble of decision trees that improves accuracy by reducing overfitting. It works well on structured medical data.",
      accuracy: "90%",
    },
    {
      name: "Gradient Boosting",
      description:
        "A powerful boosting algorithm that builds trees sequentially to correct previous errors, offering strong predictive performance.",
      accuracy: "92%",
    },
  ];

  return (
    <div className="model-page">
      <h1>FEATURES</h1>
      <Carousel/>
      <h1>Machine Learning Models Used</h1>
      <p className="intro">
        Our diabetes prediction system uses three machine learning models. Each model has its own
        strengths and characteristics for analyzing patient data.
      </p>

      <div className="model-grid">
        {models.map((model, index) => (
          <div className="model-card" key={index}>
            <h2>{model.name}</h2>
            <p>{model.description}</p>
            <div className="accuracy">Accuracy: {model.accuracy}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
