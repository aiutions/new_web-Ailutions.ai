import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, Calculator, Download, Calendar, TrendingUp, DollarSign, Clock, Users, BarChart3 } from 'lucide-react';
import jsPDF from 'jspdf';

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    employees: '',
    avgSalary: '',
    hoursPerDay: '',
    automationPercentage: '',
    implementationCost: '',
    industry: ''
  });
  
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const industries = [
    { value: 'manufacturing', label: 'Manufacturing', multiplier: 1.2 },
    { value: 'finance', label: 'Financial Services', multiplier: 1.5 },
    { value: 'healthcare', label: 'Healthcare', multiplier: 1.3 },
    { value: 'retail', label: 'Retail/E-commerce', multiplier: 1.1 },
    { value: 'technology', label: 'Technology', multiplier: 1.4 },
    { value: 'professional', label: 'Professional Services', multiplier: 1.3 },
    { value: 'education', label: 'Education', multiplier: 1.0 },
    { value: 'logistics', label: 'Logistics/Supply Chain', multiplier: 1.2 },
    { value: 'other', label: 'Other', multiplier: 1.0 }
  ];

  const calculateROI = () => {
    const employees = parseFloat(inputs.employees) || 0;
    const avgSalary = parseFloat(inputs.avgSalary) || 0;
    const hoursPerDay = parseFloat(inputs.hoursPerDay) || 0;
    const automationPercentage = parseFloat(inputs.automationPercentage) || 0;
    const implementationCost = parseFloat(inputs.implementationCost) || 0;
    
    const selectedIndustry = industries.find(ind => ind.value === inputs.industry);
    const industryMultiplier = selectedIndustry?.multiplier || 1.0;

    // Calculate hourly rate
    const workingDaysPerYear = 250;
    const workingHoursPerDay = 8;
    const hourlyRate = avgSalary / (workingDaysPerYear * workingHoursPerDay);

    // Calculate time savings
    const hoursAutomatedPerDay = (hoursPerDay * automationPercentage) / 100;
    const dailySavings = employees * hoursAutomatedPerDay * hourlyRate * industryMultiplier;
    const monthlySavings = dailySavings * 22; // Working days per month
    const yearlySavings = dailySavings * workingDaysPerYear;

    // Calculate payback period
    const paybackMonths = implementationCost / monthlySavings;
    
    // Calculate 3-year ROI
    const threeYearSavings = yearlySavings * 3;
    const netROI = threeYearSavings - implementationCost;
    const roiPercentage = (netROI / implementationCost) * 100;

    // Additional benefits (estimated)
    const errorReduction = yearlySavings * 0.15; // 15% additional savings from error reduction
    const productivityIncrease = yearlySavings * 0.20; // 20% additional from productivity gains
    const totalAnnualBenefit = yearlySavings + errorReduction + productivityIncrease;

    const calculatedResults = {
      hourlyRate: Math.round(hourlyRate),
      hoursAutomatedPerDay: Math.round(hoursAutomatedPerDay * 10) / 10,
      dailySavings: Math.round(dailySavings),
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      threeYearSavings: Math.round(threeYearSavings),
      netROI: Math.round(netROI),
      roiPercentage: Math.round(roiPercentage),
      errorReduction: Math.round(errorReduction),
      productivityIncrease: Math.round(productivityIncrease),
      totalAnnualBenefit: Math.round(totalAnnualBenefit),
      industryMultiplier,
      industry: selectedIndustry?.label || 'Other'
    };

    setResults(calculatedResults);
    setShowResults(true);
    
    // Save to localStorage
    const calculations = JSON.parse(localStorage.getItem('roiCalculations') || '[]');
    calculations.push({
      ...calculatedResults,
      inputs,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('roiCalculations', JSON.stringify(calculations));
  };

  const downloadPDF = () => {
    if (!results) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Professional header
    pdf.setFillColor(34, 197, 94); // Green
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Ailutions', margin, 25);
    
    pdf.setFontSize(18);
    pdf.text('AI Automation ROI Analysis Report', margin, 40);
    
    // Document info
    let yPos = 70;
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, margin, yPos);
    
    yPos += 25;
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Analysis Parameters:', margin, yPos);
    
    yPos += 15;
    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);
    
    const parameters = [
      ['Number of Employees:', inputs.employees],
      ['Average Annual Salary:', `$${parseInt(inputs.avgSalary).toLocaleString()}`],
      ['Manual Hours per Day:', inputs.hoursPerDay],
      ['Automation Potential:', `${inputs.automationPercentage}%`],
      ['Implementation Cost:', `$${parseInt(inputs.implementationCost).toLocaleString()}`],
      ['Industry:', industries.find(ind => ind.value === inputs.industry)?.label || 'Other']
    ];
    
    parameters.forEach(([label, value]) => {
      pdf.text(label, margin, yPos);
      pdf.text(value, margin + 80, yPos);
      yPos += 12;
    });

    // ROI Summary Box
    yPos += 15;
    pdf.setFillColor(240, 253, 244); // Light green background
    pdf.setDrawColor(34, 197, 94); // Green border
    pdf.setLineWidth(2);
    pdf.rect(margin - 5, yPos - 10, contentWidth + 10, 80, 'FD');
    
    pdf.setFontSize(16);
    pdf.setTextColor(34, 197, 94);
    pdf.text('ROI Summary', margin + 5, yPos + 5);
    
    // Key metrics display
    pdf.setFontSize(36);
    pdf.setTextColor(59, 130, 246); // Blue
    pdf.text(`${results.roiPercentage}%`, margin + 5, yPos + 35);
    
    pdf.setFontSize(14);
    pdf.setTextColor(34, 197, 94);
    pdf.text('3-Year ROI', margin + 5, yPos + 48);
    
    pdf.setFontSize(12);
    pdf.setTextColor(60, 60, 60);
    pdf.text(`Payback Period: ${results.paybackMonths} months`, margin + 100, yPos + 20);
    pdf.text(`Annual Savings: $${results.yearlySavings.toLocaleString()}`, margin + 100, yPos + 32);
    pdf.text(`Hours Automated: ${results.hoursAutomatedPerDay}/day`, margin + 100, yPos + 44);
    pdf.text(`3-Year Net Benefit: $${results.netROI.toLocaleString()}`, margin + 100, yPos + 56);
    
    yPos += 95;

    // Detailed Financial Analysis
    if (yPos > pageHeight - 150) {
      pdf.addPage();
      yPos = 30;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(59, 130, 246);
    pdf.text('Financial Impact Analysis', margin, yPos);
    yPos += 20;

    // Savings breakdown table
    const savingsData = [
      ['Daily Savings:', `$${results.dailySavings.toLocaleString()}`],
      ['Monthly Savings:', `$${results.monthlySavings.toLocaleString()}`],
      ['Annual Savings:', `$${results.yearlySavings.toLocaleString()}`],
      ['3-Year Total Savings:', `$${results.threeYearSavings.toLocaleString()}`],
      ['Less: Implementation Cost:', `-$${parseInt(inputs.implementationCost).toLocaleString()}`],
      ['Net 3-Year Benefit:', `$${results.netROI.toLocaleString()}`]
    ];

    // Table header
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 15, 'F');
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Savings Breakdown', margin, yPos + 5);
    yPos += 20;

    savingsData.forEach(([label, value], index) => {
      if (index === savingsData.length - 1) {
        // Highlight net benefit
        pdf.setFillColor(240, 253, 244);
        pdf.rect(margin - 5, yPos - 3, contentWidth + 10, 15, 'F');
        pdf.setFontSize(11);
        pdf.setTextColor(34, 197, 94);
      } else {
        pdf.setFontSize(10);
        pdf.setTextColor(60, 60, 60);
      }
      
      pdf.text(label, margin, yPos);
      pdf.text(value, pageWidth - margin - 80, yPos);
      yPos += 15;
    });

    // Additional Benefits Section
    yPos += 10;
    pdf.setFillColor(249, 250, 251);
    pdf.setDrawColor(156, 163, 175);
    pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 60, 'FD');
    
    pdf.setFontSize(14);
    pdf.setTextColor(147, 51, 234);
    pdf.text('Additional Benefits Beyond Direct Savings', margin, yPos + 10);
    
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    const benefits = [
      `Error Reduction Value: $${results.errorReduction.toLocaleString()}/year`,
      `Productivity Increase: $${results.productivityIncrease.toLocaleString()}/year`,
      `Total Annual Benefit: $${results.totalAnnualBenefit.toLocaleString()}`
    ];
    
    benefits.forEach((benefit, index) => {
      pdf.text(`• ${benefit}`, margin + 5, yPos + 25 + (index * 12));
    });
    
    yPos += 75;

    // Implementation Roadmap
    pdf.addPage();
    yPos = 30;
    
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, yPos - 10, pageWidth, 30, 'F');
    
    pdf.setFontSize(16);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Implementation Roadmap', margin, yPos + 10);
    
    yPos += 40;

    const roadmapPhases = [
      {
        phase: 'Phase 1: Assessment & Planning',
        timeline: 'Weeks 1-2',
        activities: [
          'Detailed process mapping and analysis',
          'Technology stack evaluation',
          'ROI validation and business case development',
          'Implementation team formation'
        ]
      },
      {
        phase: 'Phase 2: Design & Development', 
        timeline: 'Weeks 3-8',
        activities: [
          'Automation workflow design',
          'System integration planning',
          'Pilot program development',
          'Testing and quality assurance'
        ]
      },
      {
        phase: 'Phase 3: Deployment & Training',
        timeline: 'Weeks 9-12', 
        activities: [
          'Production deployment',
          'Team training and change management',
          'Performance monitoring setup',
          'Success metrics tracking'
        ]
      }
    ];

    roadmapPhases.forEach((phase, index) => {
      // Phase header
      pdf.setFillColor(index === 0 ? 239 : index === 1 ? 34 : 59, 
                       index === 0 ? 68 : index === 1 ? 197 : 130, 
                       index === 0 ? 68 : index === 1 ? 94 : 246);
      pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 20, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(255, 255, 255);
      pdf.text(phase.phase, margin, yPos + 5);
      pdf.text(phase.timeline, pageWidth - margin - 50, yPos + 5);
      
      yPos += 25;
      
      // Activities
      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      phase.activities.forEach(activity => {
        pdf.text(`• ${activity}`, margin + 5, yPos);
        yPos += 12;
      });
      
      yPos += 10;
    });

    // Footer
    yPos = pageHeight - 40;
    pdf.setFillColor(31, 41, 55);
    pdf.rect(0, yPos, pageWidth, 40, 'F');
    
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Ready to achieve these results?', margin, yPos + 15);
    pdf.text('📞 Book your free strategy call: calendly.com/ailutions', margin, yPos + 25);
    pdf.text('📧 Questions? Contact us: hello@ailutions.com', margin, yPos + 35);
    
    pdf.setTextColor(34, 197, 94);
    pdf.text('Ailutions - AI that powers your business', pageWidth - margin - 80, yPos + 25);

    pdf.save(`AI-ROI-Analysis-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return inputs.employees && inputs.avgSalary && inputs.hoursPerDay && 
           inputs.automationPercentage && inputs.implementationCost && inputs.industry;
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50/30">
        {/* Header */}
        <header className="bg-luxury-bg-primary/95 backdrop-blur-sm border-b border-luxury-grid-divider sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setShowResults(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Calculator
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Your ROI Report</h1>
              <Button 
                variant="ghost" 
                onClick={() => window.location.href = '/'}
                className="text-gray-600 hover:text-gray-900"
              >
                Home
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 rounded-full px-6 py-3 mb-6">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">ROI Analysis Complete</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Your AI Automation ROI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on your inputs, here's the potential return on investment for AI automation in your business.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <CardContent className="p-8 text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-4xl font-bold mb-2">{results.roiPercentage}%</div>
                <div className="text-green-100">3-Year ROI</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-4xl font-bold mb-2">{results.paybackMonths}</div>
                <div className="text-blue-100">Months to Payback</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">${results.yearlySavings.toLocaleString()}</div>
                <div className="text-purple-100">Annual Savings</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">{results.hoursAutomatedPerDay}</div>
                <div className="text-orange-100">Hours Saved/Day</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Savings Breakdown */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Savings Breakdown</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-700">Daily Savings</span>
                    <span className="font-semibold text-green-600">${results.dailySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-700">Monthly Savings</span>
                    <span className="font-semibold text-green-600">${results.monthlySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-700">Annual Savings</span>
                    <span className="font-semibold text-green-600">${results.yearlySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-900 font-semibold">3-Year Total</span>
                    <span className="font-bold text-xl text-green-600">${results.threeYearSavings.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Benefits */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Benefits</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Error Reduction</span>
                      <span className="font-semibold text-blue-600">${results.errorReduction.toLocaleString()}/year</span>
                    </div>
                    <p className="text-sm text-gray-500">15% additional savings from reduced errors</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Productivity Increase</span>
                      <span className="font-semibold text-purple-600">${results.productivityIncrease.toLocaleString()}/year</span>
                    </div>
                    <p className="text-sm text-gray-500">20% boost from employee focus on high-value tasks</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-semibold">Total Annual Benefit</span>
                      <span className="font-bold text-xl text-green-600">${results.totalAnnualBenefit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={downloadPDF}
              className="btn-primary btn-large text-lg px-8 py-6"
              style={{borderRadius: '20px'}}
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF Report
            </button>
            
            <button
              onClick={() => window.open('https://calendly.com/ailutions-strategy-call', '_blank')}
              className="btn-accent btn-large text-lg px-8 py-6"
              style={{borderRadius: '20px'}}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Strategy Call
            </button>

            <button
              onClick={() => window.location.href = '/digital-maturity-tracker'}
              className="btn-secondary btn-large text-lg px-8 py-6"
              style={{borderRadius: '20px'}}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Take Assessment
            </button>
          </div>

          {/* Next Steps */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-blue-50">
            <CardContent className="p-10 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Automation Journey?</h3>
              <p className="text-lg text-gray-600 mb-6">
                These numbers represent just the beginning. Let's discuss how to make this ROI a reality for your business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  onClick={() => window.open('https://calendly.com/ailutions-strategy-call', '_blank')}
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
                >
                  Book Free Strategy Call
                </Button>
                <p className="text-gray-500">
                  ⚡ 15-minute call • Free consultation • Custom roadmap
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-bg-primary">
      {/* Header */}
      <header className="bg-luxury-bg-primary/95 backdrop-blur-sm border-b border-luxury-grid-divider sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/'}
              className="text-gray-600 hover:text-gray-900 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <a href="/" className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_ai-lead-toolkit/artifacts/lr58t0dk_ailutions.%20logo.svg" 
                alt="Ailutions Logo" 
                className="h-6 sm:h-8 w-auto hover:scale-105 transition-transform duration-200"
              />
            </a>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-luxury-bg-secondary border border-luxury-grid-divider text-luxury-ai-start rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 luxury-card">
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">ROI Calculator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-text-heading mb-4 sm:mb-6 leading-tight">
            Calculate Your AI Automation ROI
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-luxury-text-body max-w-3xl mx-auto px-4">
            Discover how much time and money you could save with AI automation. Get your personalized ROI report in minutes.
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 lg:p-10">
            <form onSubmit={(e) => { e.preventDefault(); calculateROI(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Number of Employees */}
                <div>
                  <Label htmlFor="employees" className="text-base font-semibold text-gray-700 mb-3 block">
                    Number of Employees *
                  </Label>
                  <Input
                    id="employees"
                    type="number"
                    value={inputs.employees}
                    onChange={(e) => handleInputChange('employees', e.target.value)}
                    placeholder="e.g., 25"
                    className="text-lg p-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">How many employees would benefit from automation?</p>
                </div>

                {/* Average Salary */}
                <div>
                  <Label htmlFor="avgSalary" className="text-base font-semibold text-gray-700 mb-3 block">
                    Average Annual Salary ($) *
                  </Label>
                  <Input
                    id="avgSalary"
                    type="number"
                    value={inputs.avgSalary}
                    onChange={(e) => handleInputChange('avgSalary', e.target.value)}
                    placeholder="e.g., 65000"
                    className="text-lg p-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">Average salary of affected employees</p>
                </div>

                {/* Hours per day */}
                <div>
                  <Label htmlFor="hoursPerDay" className="text-base font-semibold text-gray-700 mb-3 block">
                    Manual Hours per Day *
                  </Label>
                  <Input
                    id="hoursPerDay"
                    type="number"
                    step="0.5"
                    value={inputs.hoursPerDay}
                    onChange={(e) => handleInputChange('hoursPerDay', e.target.value)}
                    placeholder="e.g., 3.5"
                    className="text-lg p-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">Hours spent on manual/repetitive tasks per day</p>
                </div>

                {/* Automation Percentage */}
                <div>
                  <Label htmlFor="automationPercentage" className="text-base font-semibold text-gray-700 mb-3 block">
                    Automation Potential (%) *
                  </Label>
                  <Input
                    id="automationPercentage"
                    type="number"
                    min="0"
                    max="100"
                    value={inputs.automationPercentage}
                    onChange={(e) => handleInputChange('automationPercentage', e.target.value)}
                    placeholder="e.g., 70"
                    className="text-lg p-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">What percentage of manual work can be automated?</p>
                </div>

                {/* Implementation Cost */}
                <div>
                  <Label htmlFor="implementationCost" className="text-base font-semibold text-gray-700 mb-3 block">
                    Implementation Cost ($) *
                  </Label>
                  <Input
                    id="implementationCost"
                    type="number"
                    value={inputs.implementationCost}
                    onChange={(e) => handleInputChange('implementationCost', e.target.value)}
                    placeholder="e.g., 50000"
                    className="text-lg p-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">Estimated cost for AI automation implementation</p>
                </div>

                {/* Industry */}
                <div>
                  <Label htmlFor="industry" className="text-base font-semibold text-gray-700 mb-3 block">
                    Industry *
                  </Label>
                  <select
                    value={inputs.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full text-lg p-4 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                    required
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-2">Your industry affects automation potential</p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className="btn-accent btn-large w-full text-xl py-6"
                  style={{borderRadius: '20px'}}
                >
                  Calculate My ROI
                  <Calculator className="w-6 h-6 ml-3" />
                </button>
                <p className="text-gray-500 mt-4">
                  ⚡ Instant results • Downloadable report • Free consultation
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}