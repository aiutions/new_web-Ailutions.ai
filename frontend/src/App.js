
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DigitalMaturityTracker from "./pages/DigitalMaturityTracker";
import ROICalculator from "./pages/ROICalculator";
import AutomationReadinessAssessment from "./pages/AutomationReadinessAssessment";
import AboutUs from "./pages/AboutUs";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/digital-maturity-tracker" element={<DigitalMaturityTracker />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/automation-assessment" element={<AutomationReadinessAssessment />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
