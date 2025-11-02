import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <p className="about-title">About This Project</p>

      <h1 className="about-intro">
        Members
      </h1>

      <div className="about-section">
        <h2>🎯 Project Goals</h2>
        <ul>
          <li>Provide accurate prediction of diabetes risk based on key health metrics.</li>
          <li>Visualize trends and correlations using interactive plots.</li>
          <li>Demonstrate real-world AI applications in preventive healthcare.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>🧠 Technologies Used</h2>
        <p>
          Built with <strong>React.js</strong> for front-end interactivity, and
          integrated with <strong>R</strong>-based data models for
          machine learning predictions.
        </p>
      </div>

      <div className="about-section">
        <h2>💡 Vision</h2>
        <p>
          We believe in the power of technology to improve lives. By combining
          traditional medical knowledge with modern AI techniques, we can move
          toward a future of personalized, preventive healthcare.
        </p>
      </div>
    </div>
  );
}
