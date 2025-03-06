import React, { useState } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { logEvent } from "../analytics"; // Import event tracking function

const Calculator = () => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    weight: "",
    height: "",
    activityLevel1: "",
    bodyFat: "",
    activityLevel2: "",
    goal: "",
  });

  const [results, setResults] = useState(null);

  // Activity factor mappings
  const activityFactors1 = {
    Sedentary: 1.2,
    "Lightly Active": 1.35,
    "Moderately Active": 1.55,
    "Very Active": 1.75,
    "Extremely Active": 1.95,
  };

  const activityFactors2 = {
    "Very light": 1.3,
    Light: 1.55,
    Moderate: 1.65,
    Heavy: 1.8,
    "Very heavy": 2,
  };

  const bodyFatFactors = {
    "10% - 14%": 1,
    "15% - 20%": 0.95,
    "21% - 28%": 0.9,
    "over 28%": 0.85,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log event when "Calculate" button is clicked
    logEvent("Form", "Calculate Button Clicked", "Calculator Form");

    // Destructure form data
    const {
      gender,
      age,
      weight,
      height,
      activityLevel1,
      bodyFat,
      activityLevel2,
      goal,
    } = formData;

    // Convert input values to numbers
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const activityFactor1 = activityFactors1[activityLevel1];
    const activityFactor2 = activityFactors2[activityLevel2];
    const bodyFatFactor = bodyFatFactors[bodyFat];

    // Calculations based on gender
    let calculation1, calculation2;

    if (gender === "male") {
      calculation1 =
        (10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5) * activityFactor1;
      calculation2 = 24 * weightNum * bodyFatFactor * activityFactor2;
    } else {
      calculation1 =
        (10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161) *
        activityFactor1;
      calculation2 = weightNum * 0.9 * 24 * bodyFatFactor * activityFactor2;
    }

    const avgMaintenanceCalories = (calculation1 + calculation2) / 2;

    let calorieChange = 0;
    if (goal === "Lose weight") {
      calorieChange = avgMaintenanceCalories * 0.8; // 20% less
    } else if (goal === "Gain muscle") {
      calorieChange = avgMaintenanceCalories * 1.2; // 20% more
    }

    const proteinCalories = 2 * weightNum * 4;
    const carbCalories = (calorieChange * 0.35) / 4;
    const fatCalories = calorieChange - proteinCalories - carbCalories;

    // Set results to state
    setResults({
      avgMaintenanceCalories,
      calorieChange,
      proteinCalories,
      carbCalories,
      fatCalories,
    });
  };

  return (
    <div className="container">
      <h1>Welcome to My Macro Calculator</h1>
      <h3>Get your personalized calorie and macro breakdown</h3>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>Are you male or female?</Form.Label>
            <Form.Check
              inline
              type="radio"
              label="Male"
              name="gender"
              value="male"
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              label="Female"
              name="gender"
              value="female"
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>What is your age?</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>What is your weight in kg?</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>What is your height in cm?</Form.Label>
            <Form.Control
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Button type="submit" variant="primary">
          Calculate
        </Button>
      </Form>

      {results && (
        <div className="mt-4">
          <Alert variant="info">
            <h4>
              Your maintenance calories are:{" "}
              {Math.round(results.avgMaintenanceCalories)}
            </h4>
            <h4>
              {formData.goal === "Lose weight"
                ? `Your calorie deficit is: ${Math.round(
                    results.calorieChange
                  )}`
                : `Your calorie surplus is: ${Math.round(
                    results.calorieChange
                  )}`}
            </h4>
            <h5>Protein: {results.proteinCalories} calories</h5>
            <h5>Carbohydrates: {Math.round(results.carbCalories)} grams</h5>
            <h5>Fat: {Math.round(results.fatCalories)} calories</h5>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Calculator;
