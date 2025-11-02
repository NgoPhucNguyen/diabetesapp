import React from "react";
import { useNavigate } from "react-router-dom";
import "./RiskFactors.css";
import Button from "../components/Button";
export default function RiskFactors() {
  const navigate = useNavigate();

  return (
    <div className="subpage-section">
      <div className="risk-content" >
        <div className="risk-text">
          <h1>risk factors of diabetes</h1>

          <p>
            Several factors increase the chance of developing diabetes. Some are
            <strong> non-modifiable</strong> — meaning they can’t be changed — such as age, genetics, or
            ethnic background. Others are <strong>modifiable</strong> and can be improved through healthy
            lifestyle choices. Understanding both types of risk factors can help you take steps
            to prevent or delay diabetes.
          </p>

          <h2>Major Diabetes Risk Factors</h2>
          <ul>
            <li>
              <strong>Being overweight or obese:</strong> Carrying extra body fat, especially around the
              waist, makes it harder for insulin to work properly and increases insulin resistance.
            </li>
            <li>
              <strong>Age 45 or older:</strong> The risk of type 2 diabetes rises with age. Most people
              diagnosed are middle-aged or older.
            </li>
            <li>
              <strong>Family history:</strong> Having a parent or sibling with type 2 diabetes significantly
              increases your risk.
            </li>
            <li>
              <strong>Physical inactivity:</strong> Exercising fewer than 3 days per week or having a
              sedentary lifestyle raises the likelihood of developing diabetes. Regular physical
              activity helps your body use insulin more effectively.
            </li>
            <li>
              <strong>History of gestational diabetes:</strong> Women who developed diabetes during
              pregnancy, or who delivered a baby weighing over 9 pounds (4 kg), have a higher chance
              of developing type 2 diabetes later in life.
            </li>
            <li>
              <strong>Certain ethnicities:</strong> People who are African American, Hispanic/Latino,
              American Indian, Alaska Native, Asian American, or Pacific Islander face a higher risk.
            </li>
            <li>
              <strong>Other health conditions:</strong> Having high blood pressure, high cholesterol,
              polycystic ovary syndrome (PCOS), or non-alcoholic fatty liver disease (NAFLD)
              increases the risk of type 2 diabetes.
            </li>
          </ul>

          <h2>Modifiable vs. Non-Modifiable Risks</h2>
          <p>
            Non-modifiable risks include your <strong>age</strong>, <strong>genetic background</strong>,
            and <strong>ethnicity</strong> — factors you can’t change. However, modifiable risks such as
            <strong>diet, physical activity, and body weight</strong> can be managed through lifestyle
            adjustments. Maintaining a balanced diet, exercising regularly, and controlling blood
            pressure and cholesterol can substantially lower your risk.
          </p>

          <h2>Why It Matters</h2>
          <p>
            Knowing your personal risk factors is the first step toward prevention. Even if you have
            inherited or age-related risks, adopting healthy habits can delay or prevent diabetes
            altogether. Talk to your healthcare provider about screening if you have one or more of
            these risk factors.
          </p>
        </div>

        
          <div className="subpage-nav">
            <Button onClick={() => navigate("/symptoms")}>symptoms</Button>
            <Button onClick={() => navigate("/preventing")}>preventing</Button>
          </div>
      </div>
    </div>
  );
}
