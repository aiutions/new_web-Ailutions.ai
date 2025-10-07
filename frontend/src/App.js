
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazily load the page components
const Homepage = lazy(() => import("./pages/Homepage"));
const DigitalMaturityTracker = lazy(() => import("./pages/DigitalMaturityTracker"));
const ROICalculator = lazy(() => import("./pages/ROICalculator"));
const AutomationReadinessAssessment = lazy(() => import("./pages/AutomationReadinessAssessment"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AIFinanceOSCaseStudy = lazy(() => import("./pages/case-studies/AIFinanceOS"));
const WhatsAppAgentCaseStudy = lazy(() => import("./pages/case-studies/WhatsAppAgent"));
const ERPNextHRCaseStudy = lazy(() => import("./pages/case-studies/ERPNextHR"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const WhatsAppAutomationCaseStudy = lazy(() => import("./pages/case-studies/WhatsAppAutomationCaseStudy"));
const WhatsAppSalesAgentEcommerce = lazy(() => import("./pages/blog/WhatsAppSalesAgentEcommerce"));
const ShopifyMerchantsUAE = lazy(() => import("./pages/blog/ShopifyMerchantsUAE"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
