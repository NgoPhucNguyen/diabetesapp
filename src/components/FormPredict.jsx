import React, { useState, useEffect } from "react";
import BinarySelect from "./BinarySelect";
import DropdownSelect from "./DropdownSelect";
import NumberInput from "./NumberInput";
import "./FormPredict.css";

export default function FormPredict({ onSubmit }) {
  const [formData, setFormData] = useState({
    Sex: "",
    Age: "",
    Education: "",
    Income: "",
    HighBP: "",
    HighChol: "",
    CholCheck: "",
    BMI: "",
    //add inputs
    weight: "",
    height: "",
    Stroke: "",
    HeartDiseaseorAttack: "",
    PhysHlth: "",
    DiffWalk: "",
    MentHlth: "",
    GenHlth: "",
    Smoker: "",
    HvyAlcoholConsump: "",
    PhysActivity: "",
    Fruits: "",
    Veggies: "",
    AnyHealthcare: "",
    NoDocbcCost: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  // Mark form complete only when every field (including weight/height) is filled.
  useEffect(() => {
    const allFilled = Object.values(formData).every((v) => v !== "");
    setIsFormComplete(allFilled);
  }, [formData]);

  // Centralized change handler: updates field and recalculates BMI when
  // weight or height change. BMI stored in formData.BMI (string, 1 decimal).
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // If we have both weight and height, compute BMI
      const weightVal = parseFloat(updated.weight);
      const heightVal = parseFloat(updated.height); // assume cm input

      if (
        !Number.isNaN(weightVal) &&
        !Number.isNaN(heightVal) &&
        weightVal >= 20 && weightVal <= 300 &&
        heightVal >= 50 && heightVal <= 250
      ) {
        const heightMeters = heightVal / 100; // convert cm → m
        const bmi = weightVal / (heightMeters * heightMeters);
        updated.BMI = (Math.round(bmi).toString());
      } else {
        // clear BMI if missing or invalid
        updated.BMI = "";
      }


      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormComplete) return;

    // Exclude weight & height from the payload:
    const { weight, height, ...dataToSend } = formData;

    // Convert BMI to a number (optional — depends on backend expectations)
    if (dataToSend.BMI !== "") {
      dataToSend.BMI = Number(dataToSend.BMI);
    }

    console.log("✅ JSON generated (sent to backend):", JSON.stringify(dataToSend, null, 2));
    if (onSubmit) onSubmit(dataToSend);
  };

  return (
    <div className="predict-form" onSubmit={handleSubmit}>
      <h2> Prediction Form</h2>

      {/* 1️⃣ DEMOGRAPHICS & SOCIAL */}
      <fieldset>
        <legend>Demographics & Social</legend>

        <BinarySelect
          label="Gender (Sex)"
          name="Sex"
          value={formData.Sex}
          onChange={handleChange}
          options={[
            [0, "Female"],
            [1, "Male"],
          ]}
          required
        />

        <DropdownSelect
          label="Age"
          name="Age"
          value={formData.Age}
          onChange={handleChange}
          options={[
            [1, "18–24"],
            [2, "25–29"],
            [3, "30–34"],
            [4, "35–39"],
            [5, "40–44"],
            [6, "45–49"],
            [7, "50–54"],
            [8, "55–59"],
            [9, "60–64"],
            [10, "65–69"],
            [11, "70–74"],
            [12, "75–79"],
            [13, "80+"],
          ]}
        />

        <DropdownSelect
          label="Education Level"
          name="Education"
          value={formData.Education}
          onChange={handleChange}
          options={[
            [1, "Never attended school or only kindergarten"],
            [2, "Grades 1–8 (Elementary)"],
            [3, "Grades 9–11 (Some high school)"],
            [4, "Grade 12 or GED (High school graduate)"],
            [5, "College 1–3 years (Some college or technical school)"],
            [6, "College 4+ years (College graduate)"],
          ]}
        />

        <DropdownSelect
          label="Income Level"
          name="Income"
          value={formData.Income}
          onChange={handleChange}
          tooltip="Estimated annual income"
          options={[
            [1, "<$10k"],
            [2, "$10k–15k"],
            [3, "$15k–20k"],
            [4, "$20k–25k"],
            [5, "$25k–35k"],
            [6, "$35k–50k"],
            [7, "$50k–75k"],
            [8, "≥$75k"],
          ]}
        />
      </fieldset>

      {/* 2️⃣ PHYSICAL HEALTH */}
      <fieldset>
        <legend>Physical Health</legend>

        <BinarySelect
          label="High Blood Pressure"
          name="HighBP"
          value={formData.HighBP}
          onChange={handleChange}
          tooltip=" Have you EVER been told by a doctor, nurse or other health professional that you have high  BLOOD PRESSURE?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />

        <BinarySelect
          label="High Cholesterol"
          name="HighChol"
          value={formData.HighChol}
          onChange={handleChange}
          tooltip="Have you EVER been told by a doctor, nurse or other health professional that you have high CHOLESTEROL?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />

        <BinarySelect
          label="Cholesterol Check"
          name="CholCheck"
          value={formData.CholCheck}
          onChange={handleChange}
          tooltip="Have you checked cholesterol in past 5 years?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />
        
        {/* NEW: Weight (kg) */}
        <NumberInput
          label="Weight (kg)"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="e.g. 70"
          min="20"
          max="300"
          tooltip="Enter weight in kilograms"
          required
        />

        {/* NEW: Height (cm) */}
        <NumberInput
          label="Height (cm)"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="e.g. 170"
          min="50"
          max="250"
          tooltip="Enter height in centimeters"
          required
        />

        {/* BMI: calculated, readOnly */}
        <NumberInput
          label="Body Mass Index (BMI)"
          name="BMI"
          value={formData.BMI}
          // onChange={handleChange} // harmless; it's readOnly below
          placeholder="Calculated automatically"
          min="10"
          max="80"
          tooltip="BMI = weight (kg) / (height (m))²"
          readOnly
        />

        <BinarySelect
          label="Stroke"
          name="Stroke"
          value={formData.Stroke}
          onChange={handleChange}
          tooltip="(Ever told) you had a stroke?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />

        <BinarySelect
          label="Heart Disease or Attack"
          name="HeartDiseaseorAttack"
          value={formData.HeartDiseaseorAttack}
          onChange={handleChange}
          tooltip="Ever diagnosed with coronary heart disease or heart attack?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />

        <NumberInput
          label="Physical Health (days not good)"
          name="PhysHlth"
          value={formData.PhysHlth}
          onChange={handleChange}
          placeholder="Days physical health not good (0–30)"
          min="0"
          max="30"
          tooltip="For how many days during past 30 days was physical health not good?"
        />

        <BinarySelect
          label="Difficulty Walking"
          name="DiffWalk"
          value={formData.DiffWalk}
          onChange={handleChange}
          tooltip="Do you have serious difficulty walking or climbing stairs?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />
      </fieldset>

      {/* 3️⃣ MENTAL HEALTH & BEHAVIOR */}
      <fieldset>
        <legend>Mental Health & Behavior</legend>

        <NumberInput
          label="Mental Health (days not good)"
          name="MentHlth"
          value={formData.MentHlth}
          onChange={handleChange}
          placeholder="Days mental health not good (0–30)"
          min="0"
          max="30"
          tooltip="Now thinking about your mental health, which includes stress, depression, and problems with emotions, for how many 
          days during the past 30 days was your mental health not good?"
        />

        <DropdownSelect
          label="General Health"
          name="GenHlth"
          value={formData.GenHlth}
          onChange={handleChange}
          tooltip= "Would you say that in general your health is:"
          options={[
            [1, "Excellent"],
            [2, "Very Good"],
            [3, "Good"],
            [4, "Fair"],
            [5, "Poor"],
          ]}
        />

        <BinarySelect
          label="Smoker"
          name="Smoker"
          value={formData.Smoker}
          onChange={handleChange}
          tooltip="Have you smoked at least 100 cigarettes (5 packs = 100 cigarettes) in your life?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />

        <BinarySelect
          label="Heavy Alcohol Consumption"
          name="HvyAlcoholConsump"
          value={formData.HvyAlcoholConsump}
          onChange={handleChange}
          tooltip="Heavy drinkers (adult men having more than 14 drinks per week and adult women having more than 7 drinks per week)?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />

        <BinarySelect
          label="Physical Activity"
          name="PhysActivity"
          value={formData.PhysActivity}
          onChange={handleChange}
          tooltip="Any physical activity or exercise in past 30 days (not including job) ?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />

        <BinarySelect
          label="Fruits"
          name="Fruits"
          value={formData.Fruits}
          onChange={handleChange}
          tooltip="Consume Fruit 1 or more times per day?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />

        <BinarySelect
          label="Vegetables"
          name="Veggies"
          value={formData.Veggies}
          onChange={handleChange}
          tooltip="Consume Vegetables 1 or more times per day?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />
      </fieldset>

      {/* 4️⃣ HEALTHCARE ACCESS */}
      <fieldset>
        <legend>Healthcare Access</legend>

        <BinarySelect
          label="Any Healthcare Coverage"
          name="AnyHealthcare"
          value={formData.AnyHealthcare}
          onChange={handleChange}
          tooltip="Do you have any form of health care coverage?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />

        <BinarySelect
          label="Unable to See Doctor (Cost)"
          name="NoDocbcCost"
          value={formData.NoDocbcCost}
          onChange={handleChange}
          tooltip="Was there a time in the past 12 months when you needed to see a doctor but couldn't because of cost?"
          options={[
            [0, "No"],
            [1, "Yes"],
          ]}
          required
        />
      </fieldset>

      <button
        type="submit"
        className={`submit-btn ${!isFormComplete ? "disabled" : ""}`}
        disabled={!isFormComplete}
      >
        {isFormComplete ? "Submit" : "Complete all fields to submit"}
      </button>
    </div>
  );
}
