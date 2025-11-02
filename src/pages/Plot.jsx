// Plot.jsx
import { useState } from "react";
import "./Plot.css";

const Plot = () => {
  const [selectedPlot, setSelectedPlot] = useState(null);

  // Hardcoded plot data
  const plots = [
    {
      file: "backend/data/plots/hist_bmi.png",
      title: "BMI Distribution",
      description: "Shows the overall BMI distribution in the dataset.",
    },
    {
      file: "backend/data/plots/bar_diabetes_by_sex.png",
      title: "Diabetes by Sex",
      description: "Shows how diabetes cases vary between sexes.",
    },
    {
      file: "backend/data/plots/box_bmi_by_diabetes.png",
      title: "BMI vs Diabetes",
      description: "Compare BMI across diabetes categories.",
    },
    {
      file: "backend/data/plots/scatter_bmi_highchol.png",
      title: "BMI vs HighChol",
      description: "Relationship between BMI and cholesterol levels.",
    },
    {
      file: "backend/data/plots/corr_heatmap.png",
      title: "Correlation Heatmap",
      description: "Correlation matrix among numeric health indicators.",
    },
  ];

  return (
    <div className="plot-page page-section">
      <div className="plot-header">
        <h1>Diabetes Plot</h1>
        <p>Explore pre-rendered plots generated from the dataset using R.</p>
      </div>

      <div className="plot-grid">
        {plots.map((plot, index) => (
          <div
            className="plot-card"
            key={index}
            onClick={() => setSelectedPlot(plot)}
          >
            <img src={plot.file} alt={plot.title} className="plot-image" />
            <div className="plot-content">
              <h3 className="plot-title">{plot.title}</h3>
              <p className="plot-description">{plot.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal (Lightbox) */}
      {selectedPlot && (
        <div className="plot-modal" onClick={() => setSelectedPlot(null)}>
          <div
            className="plot-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="plot-close-btn"
              onClick={() => setSelectedPlot(null)}
            >
              ✕
            </button>
            <img
              src={selectedPlot.file}
              alt={selectedPlot.title}
              className="plot-modal-image"
            />
            <h2>{selectedPlot.title}</h2>
            <p>{selectedPlot.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plot;
