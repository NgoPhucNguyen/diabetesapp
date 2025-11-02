import React from "react";
import "./Carousel.css";

// ✅ Import each icon manually (ensures bundler finds them)
import age from "../assets/icons/age.png";
import anyhealthcare from "../assets/icons/AnyHealthcare.png";
import bmi from "../assets/icons/bmi.png";
import cholcheck from "../assets/icons/cholcheck.png";
import diabetes from "../assets/icons/diabetes.png";
import DiffWalk from "../assets/icons/DiffWalk.png";
import eduction from "../assets/icons/eduction.png";
import Fruits from "../assets/icons/Fruits.png";
import GenHlth from "../assets/icons/GenHlth.png";
import HeartDiseaseorAttack from "../assets/icons/HeartDiseaseorAttack.png";
import highbp from "../assets/icons/highbp.png";
import HighChol from "../assets/icons/HighChol.png";
import HvyAlcoholConsump from "../assets/icons/HvyAlcoholConsump.png";
import income from "../assets/icons/income.png";
import MentlHlth from "../assets/icons/MentlHlth.png";
import NoDocbcCost from "../assets/icons/NoDocbcCost.png";
import PhysActivity from "../assets/icons/PhysActivity.png";
import PhysHlth from "../assets/icons/PhysHlth.png";
import sex from "../assets/icons/sex.png";
import smoker from "../assets/icons/smoker.png";
import stroke from "../assets/icons/stroke.png";
import Veggies from "../assets/icons/Veggies.png";

export default function InfiniteCarousel() {
  // ✅ Define all 21 icons + labels
  const cards = [
    { icon: age, text: "Age" },
    { icon: anyhealthcare, text: "Any Healthcare" },
    { icon: bmi, text: "BMI" },
    { icon: cholcheck, text: "Cholesterol Check" },
    { icon: diabetes, text: "Diabetes" },
    { icon: DiffWalk, text: "Difficulty Walking" },
    { icon: eduction, text: "Education" },
    { icon: Fruits, text: "Fruits Intake" },
    { icon: GenHlth, text: "General Health" },
    { icon: HeartDiseaseorAttack, text: "Heart Disease or Attack" },
    { icon: highbp, text: "High Blood Pressure" },
    { icon: HighChol, text: "High Cholesterol" },
    { icon: HvyAlcoholConsump, text: "Heavy Alcohol Consumption" },
    { icon: income, text: "Income" },
    { icon: MentlHlth, text: "Mental Health" },
    { icon: NoDocbcCost, text: "No Doctor Because of Cost" },
    { icon: PhysActivity, text: "Physical Activity" },
    { icon: PhysHlth, text: "Physical Health" },
    { icon: sex, text: "Sex" },
    { icon: smoker, text: "Smoker" },
    { icon: stroke, text: "Stroke" },
    { icon: Veggies, text: "Vegetable Intake" },
  ];

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track">
        {[...cards, ...cards].map((card, i) => (
          <div className="carousel-card" key={i}>
            <img src={card.icon} alt={card.text} />
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
