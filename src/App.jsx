// App.jsx
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";


import Home from "./pages/Home";
import Basics from "./pages/Basics";
import Symptoms from "./pages/Symptoms";
import RiskFactors from "./pages/RiskFactors";
import Preventing from "./pages/Preventing";
import Treatment from "./pages/Treatment";

import Plot from "./pages/Plot";
import Predict from "./pages/Predict";
import Model from "./pages/Model";
import About from "./pages/About";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CssBaseline } from "@mui/material";

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <>
      <CssBaseline />
      <div className="app-container">
        <Navbar />

        <main className="page-content">
          <ScrollToTop />
          <Routes>
            {/* Home + topic pages as full pages */}
            <Route path="/" element={<Home />} />
            <Route path="/basics" element={<Basics />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/riskfactors" element={<RiskFactors />} />
            <Route path="/preventing" element={<Preventing />} />
            <Route path="/treatment" element={<Treatment />} />

            {/* Other main pages */}
            <Route path="/predict" element={<Predict />} />
            <Route path="/model" element={<Model />} />
            <Route path="/plot" element={<Plot />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}
