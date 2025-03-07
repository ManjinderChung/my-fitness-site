import React from "react";

const Footer = () => (
  <footer
    className="bg-primary"
    style={{
      textAlign: "center",
      padding: "0.5rem 0", // Reduced padding for smaller height
      width: "100%",
      position: "fixed", // Fix the footer at the bottom of the viewport
      bottom: "0", // Stick it to the bottom of the viewport
      left: "0",
    }}
  >
    <div className="container px-4">
      <p className="m-0 text-center text-white">
        Copyright &copy; All rights reserved 2025
      </p>
    </div>
  </footer>
);

export default Footer;
