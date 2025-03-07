import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { logEvent } from "../analytics"; // Import your analytics logEvent function
import "./CalculatorForm.css"; // Import custom CSS for styling

const CalculatorForm = () => {
  const [isImperial, setIsImperial] = useState(true); // Toggle state for Imperial/Metric
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState(""); // Weight in either imperial or metric unit
  const [heightFeet, setHeightFeet] = useState(""); // Height in feet (Imperial)
  const [heightInches, setHeightInches] = useState(""); // Height in inches (Imperial)
  const [heightCm, setHeightCm] = useState(""); // Height in cm (Metric)
  const [activityLevel, setActivityLevel] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [jobActivityLevel, setJobActivityLevel] = useState(""); // New state for job activity level
  const [goal, setGoal] = useState("");
  const [maintenanceCalories, setMaintenanceCalories] = useState(null);
  const [calorieDeficitOrSurplus, setCalorieDeficitOrSurplus] = useState(null);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });

  const handleImperialMetricToggle = () => {
    setIsImperial(!isImperial);
  };

  // Helper function to ensure inputs are numeric
  const toNumber = (value) => {
    return value ? parseFloat(value) : 0; // Ensure a number, default to 0 if invalid
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logEvent("calculate", "User clicked calculate button"); // Log the event for GA

    // Ensure all required fields are filled
    if (
      !gender ||
      !age ||
      !weight ||
      (!isImperial ? !heightCm : !heightFeet || !heightInches) ||
      !activityLevel ||
      !bodyFat ||
      !jobActivityLevel ||
      !goal
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const weightKg = isImperial
      ? toNumber(weight) * 0.453592
      : toNumber(weight);
    const heightCmValue = isImperial
      ? toNumber(heightFeet) * 30.48 + toNumber(heightInches) * 2.54
      : toNumber(heightCm);

    // Activity factor map
    const activityFactors = {
      Sedentary: 1.2,
      "Lightly Active": 1.35,
      "Moderately Active": 1.55,
      "Very Active": 1.75,
      "Extremely Active": 1.95,
    };
    const activityFactor = activityFactors[activityLevel] || 1;

    // Job activity factor map
    const jobActivityFactors = {
      "Very light": 1.3,
      Light: 1.55,
      Moderate: 1.65,
      Heavy: 1.8,
      "Very heavy": 2,
    };
    const jobActivityFactor = jobActivityFactors[jobActivityLevel] || 1;

    // Calculate maintenance calories (calculation 1)
    let calc1 = 0;
    if (gender === "male") {
      calc1 = 10 * weightKg + 6.25 * heightCmValue - (5 * age + 5);
    } else if (gender === "female") {
      calc1 = 10 * weightKg + 6.25 * heightCmValue - 5 * age - 161;
    }
    calc1 = calc1 * activityFactor;

    // Calculate additional body-fat factor adjustment (calculation 2)
    let calc2 = 0;
    if (bodyFat !== "Not Sure") {
      const bodyFatFactors = {
        "10% - 14%": 1,
        "15% - 20%": 0.95,
        "21% - 28%": 0.9,
        "over 28%": 0.85,
        "Not Sure": 1,
      };
      const bodyFatFactor = bodyFatFactors[bodyFat] || 1;

      if (gender === "male") {
        calc2 = 24 * weightKg * bodyFatFactor * jobActivityFactor;
      } else if (gender === "female") {
        calc2 = weightKg * 0.9 * 24 * bodyFatFactor * jobActivityFactor;
      }
    }

    const averageCalories =
      bodyFat === "Not Sure" ? calc1 : (calc1 + calc2) / 2;
    setMaintenanceCalories(averageCalories);

    // Calorie adjustment based on goal
    let calorieAdjustment = 0;
    if (goal === "lose weight") {
      calorieAdjustment = averageCalories * 0.8;
      setCalorieDeficitOrSurplus(calorieAdjustment);
    } else if (goal === "gain muscle") {
      calorieAdjustment = averageCalories * 1.2;
      setCalorieDeficitOrSurplus(calorieAdjustment);
    }

    // Macronutrient calculations
    const protein = 2 * weightKg;
    const proteinCalories = protein * 4;
    const carbsCalories = calorieAdjustment * 0.35;
    const carbs = carbsCalories / 4;
    const fatCalories = calorieAdjustment - (proteinCalories + carbsCalories);
    const fats = fatCalories / 9;

    setMacros({
      protein: protein.toFixed(1),
      carbs: carbs.toFixed(1),
      fats: fats.toFixed(1),
    });
  };

  return (
    <Form className="calculator-form" onSubmit={handleSubmit}>
      <h2>Macro Calculator</h2>

      {/* Imperial/Metric Toggle */}
      <Form.Group as={Row}>
        <Col>
          <Form.Check
            type="switch"
            id="imperial-metric-toggle"
            label={isImperial ? "Imperial" : "Metric"}
            onChange={handleImperialMetricToggle}
          />
        </Col>
      </Form.Group>

      {/* Gender */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Gender
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="select"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
        </Col>
      </Form.Group>

      {/* Age */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Age
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            min="0"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </Col>
      </Form.Group>

      {/* Weight */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Weight
        </Form.Label>
        <Col sm="10">
          <InputGroup>
            <FormControl
              type="number"
              min="0"
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
            />
            <InputGroup.Text>{isImperial ? "lbs" : "kg"}</InputGroup.Text>
          </InputGroup>
        </Col>
      </Form.Group>

      {/* Height */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Height
        </Form.Label>
        <Col sm="10">
          {isImperial ? (
            <>
              <InputGroup>
                <FormControl
                  type="number"
                  min="0"
                  onChange={(e) => setHeightFeet(e.target.value)}
                  value={heightFeet}
                  placeholder="Feet"
                />
                <FormControl
                  type="number"
                  min="0"
                  onChange={(e) => setHeightInches(e.target.value)}
                  value={heightInches}
                  placeholder="Inches"
                />
              </InputGroup>
            </>
          ) : (
            <Form.Control
              type="number"
              min="0"
              onChange={(e) => setHeightCm(e.target.value)}
              value={heightCm}
              placeholder="cm"
            />
          )}
        </Col>
      </Form.Group>

      {/* Activity Level */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Activity Level
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="select"
            onChange={(e) => setActivityLevel(e.target.value)}
            value={activityLevel}
          >
            <option value="">Select Activity Level</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Lightly Active">Lightly Active</option>
            <option value="Moderately Active">Moderately Active</option>
            <option value="Very Active">Very Active</option>
            <option value="Extremely Active">Extremely Active</option>
          </Form.Control>
        </Col>
      </Form.Group>

      {/* Job Activity Level */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Job Activity Level?
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="select"
            onChange={(e) => setJobActivityLevel(e.target.value)}
            value={jobActivityLevel}
          >
            <option value="">Select Job Activity Level</option>
            <option value="Very light">Very light</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Heavy">Heavy</option>
            <option value="Very heavy">Very heavy</option>
          </Form.Control>
        </Col>
      </Form.Group>

      {/* Body Fat */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Est. Body Fat %?
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="select"
            onChange={(e) => setBodyFat(e.target.value)}
            value={bodyFat}
          >
            <option value="Not Sure">Not Sure</option>
            <option value="10% - 14%">10% - 14%</option>
            <option value="15% - 20%">15% - 20%</option>
            <option value="21% - 28%">21% - 28%</option>
            <option value="over 28%">over 28%</option>
          </Form.Control>
        </Col>
      </Form.Group>

      {/* Goal */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Are you aiming to...
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="select"
            onChange={(e) => setGoal(e.target.value)}
            value={goal}
          >
            <option value="">Select Goal</option>
            <option value="lose weight">Lose weight</option>
            <option value="gain muscle">Gain muscle</option>
          </Form.Control>
        </Col>
      </Form.Group>

      {/* Submit Button */}
      <Button type="submit" variant="primary">
        Calculate
      </Button>

      {/* Results */}
      {maintenanceCalories && (
        <div>
          <h3>Your Maintenance Calories: {maintenanceCalories.toFixed(1)}</h3>
          {goal === "lose weight" && (
            <h3>Your Calorie Deficit: {calorieDeficitOrSurplus.toFixed(1)}</h3>
          )}
          {goal === "gain muscle" && (
            <h3>Your Calorie Surplus: {calorieDeficitOrSurplus.toFixed(1)}</h3>
          )}
          <h4>Protein: {macros.protein} g</h4>
          <h4>Carbs: {macros.carbs} g</h4>
          <h4>Fats: {macros.fats} g</h4>
        </div>
      )}
    </Form>
  );
};

export default CalculatorForm;
