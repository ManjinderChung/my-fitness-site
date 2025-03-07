import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      {/* SEO Meta Tags */}
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Calculate your daily macronutrient requirements for weight loss or muscle gain with our easy-to-use calculator."
        />
        <meta
          name="keywords"
          content="macronutrient calculator, calorie calculator, weight loss, muscle gain, nutrition"
        />
        <meta name="author" content="Your Website" />
        <title>Macronutrient Calculator - Track Your Nutrition Goals</title>
      </Helmet>

      {/* Header Section */}
      <header className="bg-primary text-white text-center py-5">
        <Container>
          <h1>Welcome to the Macronutrient Calculator</h1>
          <p>
            Get personalised calorie and macronutrient recommendations to help
            you achieve your fitness goals.
          </p>
          <Button href="/calculator" variant="light" size="lg">
            Start Calculating Now
          </Button>
        </Container>
      </header>

      {/* About Section */}
      <section className="py-5" id="about">
        <Container>
          <Row>
            <Col md={6}>
              <h2>What Are Macronutrients?</h2>
              <p>
                Macronutrients are the essential nutrients your body needs in
                large amounts: Protein, Carbohydrates, and Fats. Whether your
                goal is weight loss, muscle gain, or simply improving your
                nutrition, understanding and tracking macronutrients is key to
                success.
              </p>
            </Col>
            <Col md={6}>
              <img
                src="https://via.placeholder.com/500"
                alt="Macronutrients"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="bg-light py-5" id="how-it-works">
        <Container>
          <h2 className="text-center">How It Works</h2>
          <Row className="text-center">
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <h4>Step 1: Input Your Details</h4>
                  <p>
                    Fill in your age, gender, weight, height, and activity level
                    to get an accurate calculation.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <h4>Step 2: Get Your Calorie Needs</h4>
                  <p>
                    Based on your inputs, we'll calculate your Total Daily
                    Energy Expenditure (TDEE) and macronutrient breakdown.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <h4>Step 3: Achieve Your Goals</h4>
                  <p>
                    Whether you're aiming to lose weight or build muscle, we
                    adjust your calorie intake to fit your objectives.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-5" id="cta">
        <Container>
          <h2>Ready to Start Tracking Your Macros?</h2>
          <p>
            Input your details and get your personalised macronutrient breakdown
            now!
          </p>
          <Button href="/calculator" variant="primary" size="lg">
            Calculate Your Macros
          </Button>
        </Container>
      </section>

 
    </div>
  );
};

export default Home;
