import React from "react";
import { useNavigate } from "react-router-dom";
import "./Treatment.css";
import Button from "../components/Button";
export default function Treatment() {
  const navigate = useNavigate();

  return (
    <div className="subpage-section">
      <div className="treatment-content" >
        <div className="treatment-text">
          <h1>treatment of diabetes</h1>

          <p>
            While there is currently no cure for diabetes, it can be effectively managed so that
            people can live long, healthy lives. The main goal of treatment is to keep blood sugar
            levels within your <strong>target range</strong> as much as possible
            (<a href="https://www.cdc.gov" target="_blank" rel="noreferrer">CDC</a>), which helps
            prevent or delay serious complications. The treatment approach depends on the
            <strong> type of diabetes</strong>.
          </p>

          <h2>Type 1 Diabetes</h2>
          <p>
            Type 1 diabetes occurs when the body produces little or no insulin. People with this
            condition require <strong>daily insulin therapy</strong> — either through injections
            or an insulin pump — to maintain normal blood sugar levels
            (<a href="https://www.cdc.gov" target="_blank" rel="noreferrer">CDC</a>). They also
            learn how to monitor blood glucose regularly and adjust food, exercise, and insulin
            accordingly. Continuous glucose monitors (CGMs) are increasingly used to provide
            real-time tracking and help improve control.
          </p>

          <h2>Type 2 Diabetes</h2>
          <p>
            Treatment for type 2 diabetes often begins with <strong>lifestyle changes</strong> such
            as healthy eating, regular physical activity, and weight management. If blood sugar
            remains high, doctors usually prescribe <strong>oral medications</strong> like
            metformin. Over time, some individuals may need additional drugs or insulin therapy to
            maintain control
            (<a href="https://www.mayoclinic.org" target="_blank" rel="noreferrer">Mayo Clinic</a>).
          </p>

          <p>
            Newer medications, including <strong>GLP-1 receptor agonists</strong> and
            <strong> SGLT2 inhibitors</strong>, can help lower blood sugar, promote weight loss,
            and protect the heart and kidneys. In cases of diabetes during pregnancy,
            <strong>insulin</strong> is often preferred because it is safe for both mother and
            baby.
          </p>

          <h2>General Management Tips</h2>
          <ul>
            <li>
              <strong>Monitor blood sugar regularly:</strong> Use a glucometer or continuous glucose
              monitor (CGM). Typical targets are <strong>80–130 mg/dL before meals</strong> and
              <strong> under 180 mg/dL two hours after eating</strong>.
            </li>
            <li>
              <strong>Healthy diet and weight control:</strong> Eat plenty of non-starchy vegetables,
              whole grains, lean proteins, and healthy fats. Limit sugary foods, white bread, and
              saturated fats
              (<a href="https://www.mayoclinic.org" target="_blank" rel="noreferrer">Mayo Clinic</a>).
              Even losing <strong>5–7% of body weight</strong> can improve blood sugar and cholesterol
              levels.
            </li>
            <li>
              <strong>Stay physically active:</strong> Aim for at least
              <strong> 150 minutes of moderate exercise per week</strong> — about 30 minutes a day,
              five days a week
              (<a href="https://www.cdc.gov" target="_blank" rel="noreferrer">CDC</a>).
              Activities like brisk walking, swimming, or cycling can make your body more sensitive
              to insulin.
            </li>
            <li>
              <strong>Medication adherence:</strong> Take prescribed medications and insulin exactly
              as directed. Regular follow-ups with your healthcare team are vital for adjusting doses
              and preventing side effects.
            </li>
            <li>
              <strong>Monitor related health factors:</strong> Managing blood pressure, cholesterol,
              and weight reduces the risk of heart disease
              (<a href="https://www.who.int" target="_blank" rel="noreferrer">WHO</a>).
              Schedule regular screenings for eyes, kidneys, and feet to catch complications early.
            </li>
          </ul>

          <h2>Why Treatment Matters</h2>
          <p>
            Managing diabetes is a <strong>team effort</strong> between patients and healthcare
            professionals. Education, ongoing support, and self-management programs have been shown
            to greatly improve health outcomes. By following a personalized care plan and making
            small, consistent changes, people with diabetes can maintain good control and prevent
            long-term complications.
          </p>
        </div>

        
          <div className="subpage-nav">
            <Button onClick={() => navigate("/preventing")}>preventing</Button>
            <Button onClick={() => navigate("/basics")}>basics</Button>
          </div>
      </div>
    </div>
  );
}
