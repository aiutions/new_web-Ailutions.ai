import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DigitalMaturityTracker from "./pages/DigitalMaturityTracker";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/digital-maturity-tracker" element={<DigitalMaturityTracker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;