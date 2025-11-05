// Plot.jsx
import { useState } from "react";
import "./Plot.css";

export default function Plot() {
  const [selectedPlot, setSelectedPlot] = useState(null);

  // Hardcoded plot data
  const plots = [
    {
      file: "src/assets/plots/bmi_distribution.png",
      title: "BMI Distribution",
      summary: "Comparison of BMI distributions between diabetic and non-diabetic individuals",
      description:
        "This density plot illustrates how Body Mass Index (BMI) values differ between people with and without diabetes. The diabetic group generally shows higher BMI values, suggesting a link between excess body weight and diabetes risk.",
    },
    {
      file: "src/assets/plots/corr_with_target.png",
      title: "Feature Correlation with Target",
      summary: "Ranking of health-related features based on correlation with diabetes status",
      description:
        "This bar chart displays Pearson correlation coefficients between each feature and the diabetes target variable. Strong positive correlations (e.g., general health, high blood pressure, BMI) indicate key predictors of diabetes, while negative values (e.g., income, physical activity) show protective factors.",
    },
    {
      file: "src/assets/plots/diffwalk_distribution.png",
      title: "Difficulty Walking Distribution",
      summary: "Comparison of walking difficulty prevalence in diabetic and non-diabetic groups",
      description:
        "The grouped bar chart shows the proportion of individuals reporting difficulty walking among those with and without diabetes. People with diabetes are substantially more likely to experience mobility challenges, reflecting the physical complications associated with the disease.",
    },
    {
      file: "src/assets/plots/genhlth_distribution.png",
      title: "General Health Rating Distribution",
      summary: "Distribution of self-reported general health among diabetic vs non-diabetic individuals",
      description:
        "This bar chart compares how respondents rated their overall health on a scale from 1 (Excellent) to 5 (Poor). Individuals with diabetes tend to report poorer general health compared to those without, underscoring the broader impact of diabetes on perceived well-being.",
    },
    {
      file: "src/assets/plots/highcol.png",
      title: "High Cholesterol and Diabetes",
      summary: "Relationship between cholesterol levels and diabetes prevalence",
      description:
        "This bar chart demonstrates that diabetes prevalence is higher among those with high cholesterol levels. It emphasizes how metabolic factors such as cholesterol dysregulation often coexist with diabetes.",
    },
    {
      file: "src/assets/plots/highbp_distribution.png",
      title: "High Blood Pressure and Diabetes",
      summary: "Relationship between high blood pressure presence and diabetes occurrence.",
      description:
        "This visualization shows that a significantly higher percentage of diabetic individuals also have high blood pressure. The strong overlap highlights hypertension as a major comorbidity and risk factor linked to diabetes.",
    },
    {
      file: "src/assets/plots/physical.png",
      title: "Physical Activity and Diabetes",
      summary: "Comparison of diabetes prevalence among physically active and inactive individuals.",
      description:
        "The chart shows that individuals who engage in regular physical activity have a lower rate of diabetes. This highlights the protective effect of an active lifestyle in reducing diabetes risk and improving overall health outcomes.",
    },
    {
      file: "src/assets/plots/correlation_heatmap.png",
      title: "Health Feature Pairwise Relationships",
      summary: "Pairwise correlation and distribution of key health variables.",
      description:
        "This scatterplot matrix visualizes relationships between BMI, mental health, physical health, age, general health, and diabetes status. It provides both correlation coefficients and distribution insights, revealing how these health factors interact and contribute to diabetes likelihood.",
    },
  ];

  return (
    <div className="plot-page page-section">
      <div className="plot-header">
        <h1>Diabetes Plots</h1>
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
              <p className="plot-summary">{plot.summary}</p>
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
}
