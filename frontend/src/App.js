import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DigitalMaturityTracker from "./pages/DigitalMaturityTracker";
import ROICalculator from "./pages/ROICalculator";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/digital-maturity-tracker" element={<DigitalMaturityTracker />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;