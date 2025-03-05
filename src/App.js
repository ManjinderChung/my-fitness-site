import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Calculator from "./pages/Calculator";
import Navbar from "./components/NavBar"; // Make sure this is the right path
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <Navbar /> {/* Navbar stays fixed */}
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
