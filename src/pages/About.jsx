import "./About.css";

export default function About() {
  const members = [
    { name: "Đỗ Trần Đăng Khoa", id: "SE190563" },
    { name: "Đặng Nguyễn Cường Thịnh", id: "SE190738" },
    { name: "Nguyễn Võ Trung Hưng", id: "SE193635" },
    { name: "Lê Như Đạt", id: "SE192807" },
    { name: "Ngô Phúc Nguyên", id: "SE192616" },
  ];

  return (
    <div className="about-container">
      <h1 className="about-title">About This Project</h1>

      {/* ===== 👥 Team Members ===== */}
      <section className="about-members">
        <h2>Team Members</h2>

        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ===== 🎯 Project Goals ===== */}
      <section className="about-section">
        <h2>Project Goals</h2>
        <ul>
          <li>
            Provide accurate prediction of diabetes risk based on key health
            metrics (21 features).
          </li>
          <li>Visualize trends and correlations through interactive charts.</li>
          <li>
            Demonstrate real-world AI applications in preventive healthcare.
          </li>
        </ul>
      </section>

      {/* ===== 🧠 Technologies Used ===== */}
    <section className="tech-section">
      <h2>Technologies Used</h2>
      <ul>
        <li>
          <strong>React.js:</strong> Powers the front-end interface with modern components,
          responsive design, and smooth navigation.
        </li>
        <li>
          <strong>R Language:</strong> Handles data processing and machine learning models
          for analyzing and predicting diabetes risk.
        </li>
      </ul>
    </section>




      {/* ===== 💡 Vision ===== */}
      <section className="about-section">
        <h2>Vision</h2>
        <p>
          We believe in the power of technology to improve lives. By combining
          traditional medical knowledge with modern AI techniques, we can move
          toward a future of personalized, preventive healthcare.
        </p>
      </section>
    </div>
  );
}
