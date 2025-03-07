import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Calculator from "./pages/Calculator";
import Navbar from "./components/NavBar";
import Layout from "./components/Layout";
import { initGA, logPageView } from "./analytics"; // Import Google Analytics functions
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <div>
      <Navbar /> {/* Navbar stays fixed */}
      <Layout>
        <GAWrapper /> {/* Tracks page views */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </div>
  );
};

// Component to track page views on route changes
const GAWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    initGA(); // Initialize Google Analytics once
    logPageView(location.pathname); // Log the first page load
  }, []);

  useEffect(() => {
    logPageView(location.pathname); // Log page views on route changes
  }, [location.pathname]);

  return null;
};

export default App;
