import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Push Header Below Navbar */}
      <div className="pt-24">
        {" "}
        {/* Add padding to create space below the navbar */}
        <Header />
      </div>

      {/* Transparent Content Box */}
      <main
        className="flex-grow flex items-center justify-center px-4 min-h-screen"
        style={{ paddingBottom: "3rem" }}
      >
        <section className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 md:p-10 max-w-5xl w-full overflow-y-auto">
          {children}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
