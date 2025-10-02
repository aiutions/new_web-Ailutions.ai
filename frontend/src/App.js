
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
import AIFinanceOSCaseStudy from "./pages/case-studies/AIFinanceOS";
import WhatsAppAgentCaseStudy from "./pages/case-studies/WhatsAppAgent";
import ERPNextHRCaseStudy from "./pages/case-studies/ERPNextHR";
import CaseStudies from "./pages/CaseStudies";
import WhatsAppAutomationCaseStudy from "./pages/case-studies/WhatsAppAutomationCaseStudy";
import WhatsAppSalesAgentEcommerce from "./pages/blog/WhatsAppSalesAgentEcommerce";
import ShopifyMerchantsUAE from "./pages/blog/ShopifyMerchantsUAE";

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
          <Route path="/case-studies/ai-finance-os" element={<AIFinanceOSCaseStudy />} />
          <Route path="/case-studies/whatsapp-agent" element={<WhatsAppAgentCaseStudy />} />
          <Route path="/case-studies/erp-hr-payroll" element={<ERPNextHRCaseStudy />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/whatsapp-automation-for-real-estate" element={<WhatsAppAutomationCaseStudy />} />
          <Route path="/blog/whatsapp-sales-agent-ecommerce-uae" element={<WhatsAppSalesAgentEcommerce />} />
          <Route path="/blog/shopify-merchants-uae" element={<ShopifyMerchantsUAE />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
