import React from "react";
import { useNavigate } from "react-router-dom";
import "./Preventing.css";
import Button from "../components/Button";
export default function Preventing() {
  const navigate = useNavigate();

  return (
    <div className="subpage-section">
      <div className="preventing-content" >
        <div className="preventing-text">
          <h1>preventing diabetes</h1>

          <p>
            While <strong>type 1 diabetes</strong> cannot currently be prevented
            (<a href="https://www.who.int" target="_blank" rel="noreferrer">WHO</a>), most cases of
            <strong> type 2 diabetes</strong> can be delayed or even prevented through healthy lifestyle
            choices. According to the CDC, about <strong>98 million U.S. adults</strong> (roughly 1 in 3)
            have <strong>prediabetes</strong> — a condition where blood sugar levels are higher than normal
            but not yet in the diabetes range — and around 81% of them are unaware of it.
          </p>

          <p>
            Early action makes a big difference. The <strong>CDC’s Diabetes Prevention Program (DPP)</strong>
            found that losing a small amount of weight and being physically active can cut the risk of type 2
            diabetes by up to <strong>58%</strong>, and by as much as <strong>71%</strong> in adults over 60.
            Participants who lost just <strong>5–7% of their body weight</strong> and exercised about
            <strong>150 minutes per week</strong> saw the greatest benefits.
          </p>

          <h2>Proven Ways to Prevent Type 2 Diabetes</h2>
          <ul>
            <li>
              <strong>Healthy eating:</strong> Choose high-fiber foods such as vegetables, fruits, whole grains,
              and lean proteins. Limit processed foods, sugary drinks, and refined carbs. Following WHO dietary
              guidance supports stable blood sugar and heart health.
            </li>
            <li>
              <strong>Regular exercise:</strong> Aim for at least <strong>150 minutes of moderate activity</strong>
              per week — such as brisk walking, swimming, or cycling. Physical activity helps your body use insulin
              more effectively and supports weight management.
            </li>
            <li>
              <strong>Weight management:</strong> If overweight, losing even <strong>5% of body weight</strong> can
              significantly reduce diabetes risk. Continued weight control is one of the most effective preventive
              steps for long-term health.
            </li>
            <li>
              <strong>Avoid smoking:</strong> Tobacco use increases insulin resistance and worsens diabetes-related
              complications. Quitting smoking supports better overall health and blood sugar control.
            </li>
            <li>
              <strong>Regular check-ups:</strong> Get screened if you have risk factors like family history,
              high blood pressure, or obesity. The CDC encourages people with prediabetes to join the
              <strong> National Diabetes Prevention Program</strong>, a year-long lifestyle program that has been
              shown to reduce diabetes risk by more than half.
            </li>
          </ul>

          <h2>Why Prevention Matters</h2>
          <p>
            Preventing diabetes isn’t just about avoiding the disease — it’s about protecting your long-term
            health. Taking early steps can help prevent heart disease, nerve damage, kidney failure, and vision
            problems. Even if you already have prediabetes, consistent lifestyle changes can often bring blood
            sugar back to a healthy range.
          </p>

          <p>
            For example, a CDC study found that a <strong>5–7% weight loss</strong> — about 10–15 pounds for a
            200-pound person — combined with regular activity can lower the risk of developing type 2 diabetes
            by more than half. Small steps truly make a big difference.
          </p>
        </div>

        
          <div className="subpage-nav">
            <Button onClick={() => navigate("/riskfactors")}>riskfactors</Button>
            <Button onClick={() => navigate("/treatment")}>treatment</Button>
          </div>
      </div>
    </div>
  );
}
