import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, ArrowRight, Download, Calendar, CheckCircle, MessageCircle, FileText } from 'lucide-react';
import { digitalMaturitySections, maturityLevels } from '../data/mock';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DigitalMaturityTracker() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });

  const totalQuestions = digitalMaturitySections.length * 3;
  const currentQuestionNumber = (currentSection * 3) + currentQuestion + 1;
  const progress = (Object.keys(answers).length / totalQuestions) * 100;

  const handleAnswer = (score) => {
    const questionKey = `${currentSection}-${currentQuestion}`;
    setAnswers(prev => ({
      ...prev,
      [questionKey]: score
    }));

    // Move to next question
    if (currentQuestion < 2) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < digitalMaturitySections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      // Assessment complete - show user form
      setShowUserForm(true);
    }
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    setUserInfo(formData);
    calculateResults();
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const percentage = Math.round((totalScore / (totalQuestions * 3)) * 100);
    
    const level = maturityLevels.find(level => 
      percentage >= level.range[0] && percentage <= level.range[1]
    );
    
    // Calculate section scores
    const sectionScores = digitalMaturitySections.map((section, sectionIndex) => {
      const sectionAnswers = Object.entries(answers)
        .filter(([key]) => key.startsWith(`${sectionIndex}-`))
        .map(([, score]) => score);
      
      const sectionTotal = sectionAnswers.reduce((sum, score) => sum + score, 0);
      const sectionPercentage = Math.round((sectionTotal / (3 * 3)) * 100);
      
      return {
        name: section.name,
        score: sectionPercentage
      };
    });

    const calculatedResults = {
      overallScore: percentage,
      level: level,
      sectionScores: sectionScores,
      timestamp: new Date().toISOString(),
      userInfo: userInfo || formData
    };

    setResults(calculatedResults);
    setIsComplete(true);
    
    // Save to localStorage
    const assessments = JSON.parse(localStorage.getItem('maturityAssessments') || '[]');
    assessments.push(calculatedResults);
    localStorage.setItem('maturityAssessments', JSON.stringify(assessments));
  };

  const downloadPDF = async () => {
    if (!results) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Professional header
    pdf.setFillColor(59, 130, 246); // Blue
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Ailutions', margin, 25);
    
    pdf.setFontSize(18);
    pdf.text('Digital Maturity Assessment Report', margin, 40);
    
    // Document info
    let yPos = 70;
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${new Date(results.timestamp).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, margin, yPos);
    
    if (results.userInfo) {
      yPos += 25;
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Assessment Details:', margin, yPos);
      
      yPos += 15;
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      
      const userDetails = [
        ['Name:', results.userInfo.name],
        ['Company:', results.userInfo.company],
        ['Role:', results.userInfo.role || 'Not specified'],
        ['Email:', results.userInfo.email]
      ];
      
      userDetails.forEach(([label, value]) => {
        pdf.text(label, margin, yPos);
        pdf.text(value, margin + 50, yPos);
        yPos += 12;
      });
    }

    // Maturity Score Summary Box
    yPos += 15;
    pdf.setFillColor(239, 246, 255); // Light blue background
    pdf.setDrawColor(59, 130, 246); // Blue border
    pdf.setLineWidth(2);
    pdf.rect(margin - 5, yPos - 10, contentWidth + 10, 80, 'FD');
    
    pdf.setFontSize(16);
    pdf.setTextColor(59, 130, 246);
    pdf.text('Digital Maturity Assessment Summary', margin + 5, yPos + 5);
    
    // Score display
    pdf.setFontSize(48);
    pdf.setTextColor(34, 197, 94); // Green
    pdf.text(`${results.overallScore}%`, margin + 5, yPos + 35);
    
    pdf.setFontSize(14);
    pdf.setTextColor(59, 130, 246);
    pdf.text(`${results.level.name} Level`, margin + 5, yPos + 48);
    
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    const description = pdf.splitTextToSize(results.level.description, 100);
    description.forEach((line, index) => {
      pdf.text(line, margin + 80, yPos + 20 + (index * 10));
    });
    
    yPos += 95;

    // Category Breakdown Section
    if (yPos > pageHeight - 150) {
      pdf.addPage();
      yPos = 30;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(59, 130, 246);
    pdf.text('Category Performance Analysis', margin, yPos);
    yPos += 20;

    // Create category performance boxes
    results.sectionScores.forEach((section, index) => {
      if (yPos > pageHeight - 40) {
        pdf.addPage();
        yPos = 30;
      }

      // Category header
      const scoreColor = section.score >= 75 ? [34, 197, 94] : section.score >= 50 ? [249, 115, 22] : [239, 68, 68];
      pdf.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
      pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 20, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(255, 255, 255);
      pdf.text(section.name, margin, yPos + 5);
      pdf.text(`${section.score}%`, pageWidth - margin - 30, yPos + 5);
      
      // Progress bar representation
      yPos += 25;
      pdf.setFillColor(229, 231, 235); // Gray background
      pdf.rect(margin + 5, yPos - 3, contentWidth - 10, 8, 'F');
      
      pdf.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
      pdf.rect(margin + 5, yPos - 3, (contentWidth - 10) * (section.score / 100), 8, 'F');
      
      yPos += 20;
    });

    // Recommendations Section
    pdf.addPage();
    yPos = 30;
    
    pdf.setFillColor(147, 51, 234); // Purple
    pdf.rect(0, yPos - 10, pageWidth, 30, 'F');
    
    pdf.setFontSize(16);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Personalized Recommendations', margin, yPos + 10);
    
    yPos += 40;

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Based on your ${results.level.name} maturity level:`, margin, yPos);
    yPos += 20;

    results.level.recommendations.forEach((recommendation, index) => {
      if (yPos > pageHeight - 40) {
        pdf.addPage();
        yPos = 30;
      }

      // Recommendation box
      pdf.setFillColor(249, 250, 251); // Light gray background
      pdf.setDrawColor(156, 163, 175); // Gray border
      pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 25, 'FD');
      
      pdf.setFontSize(10);
      pdf.setTextColor(147, 51, 234);
      pdf.text(`${index + 1}.`, margin, yPos + 5);
      
      pdf.setTextColor(60, 60, 60);
      const recLines = pdf.splitTextToSize(recommendation, contentWidth - 15);
      recLines.forEach((line, lineIndex) => {
        pdf.text(line, margin + 10, yPos + 5 + (lineIndex * 10));
      });
      
      yPos += Math.max(25, recLines.length * 10 + 10);
    });

    // Action Plan Section
    yPos += 20;
    if (yPos > pageHeight - 120) {
      pdf.addPage();
      yPos = 30;
    }

    pdf.setFillColor(34, 197, 94); // Green
    pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 20, 'F');
    
    pdf.setFontSize(14);
    pdf.setTextColor(255, 255, 255);
    pdf.text('90-Day Action Plan', margin, yPos + 10);
    
    yPos += 30;

    const actionPlan = [
      {
        timeframe: 'Days 1-30: Foundation',
        actions: [
          'Complete digital strategy documentation',
          'Audit current technology stack',
          'Identify quick wins for automation'
        ]
      },
      {
        timeframe: 'Days 31-60: Implementation',
        actions: [
          'Begin process standardization initiatives',
          'Implement basic automation tools',
          'Start team digital skills training'
        ]
      },
      {
        timeframe: 'Days 61-90: Optimization',
        actions: [
          'Measure and analyze initial results', 
          'Scale successful automation projects',
          'Plan advanced digital transformation phases'
        ]
      }
    ];

    actionPlan.forEach((phase, index) => {
      if (yPos > pageHeight - 80) {
        pdf.addPage();
        yPos = 30;
      }

      // Phase header
      const phaseColor = index === 0 ? [239, 68, 68] : index === 1 ? [249, 115, 22] : [34, 197, 94];
      pdf.setFillColor(phaseColor[0], phaseColor[1], phaseColor[2]);
      pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 15, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(255, 255, 255);
      pdf.text(phase.timeframe, margin, yPos + 5);
      
      yPos += 20;
      
      // Actions
      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      phase.actions.forEach(action => {
        pdf.text(`• ${action}`, margin + 5, yPos);
        yPos += 12;
      });
      
      yPos += 10;
    });

    // Resources Section
    yPos += 15;
    if (yPos > pageHeight - 80) {
      pdf.addPage();
      yPos = 30;
    }

    pdf.setFillColor(249, 250, 251); // Light gray
    pdf.setDrawColor(156, 163, 175); // Gray border
    pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 60, 'FD');
    
    pdf.setFontSize(14);
    pdf.setTextColor(147, 51, 234);
    pdf.text('Additional Resources Available', margin, yPos + 10);
    
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    const resources = [
      '📊 Take our ROI Calculator to quantify potential savings',
      '🔧 Use our Automation Readiness Assessment for specific tasks',
      '📞 Book a free strategy call for personalized guidance',
      '📧 Join our digital transformation newsletter'
    ];
    
    resources.forEach((resource, index) => {
      pdf.text(resource, margin + 5, yPos + 25 + (index * 12));
    });

    // Footer
    yPos = pageHeight - 40;
    pdf.setFillColor(31, 41, 55); // Dark background
    pdf.rect(0, yPos, pageWidth, 40, 'F');
    
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Ready to accelerate your digital transformation?', margin, yPos + 15);
    pdf.text('📞 Book your free strategy call: calendly.com/ailutions-strategy', margin, yPos + 25);
    pdf.text('📧 Questions? Contact us: hello@ailutions.com', margin, yPos + 35);
    
    pdf.setTextColor(59, 130, 246);
    pdf.text('Ailutions - AI that powers your business', pageWidth - margin - 80, yPos + 25);

    // Save with descriptive filename
    const fileName = `Digital-Maturity-Report-${results.userInfo?.company || 'Assessment'}-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  };

  const bookStrategyCall = () => {
    window.open('https://calendly.com/ailutions-strategy-call', '_blank');
  };

  const contactWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I just completed the Digital Maturity Assessment and got ${results?.overallScore}% (${results?.level?.name} level). I'd like to discuss next steps for automation in my business.`
    );
    window.open(`https://wa.me/YOUR_WHATSAPP_NUMBER?text=${message}`, '_blank');
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(2);
    }
  };

  const resetAssessment = () => {
    setCurrentSection(0);
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    setResults(null);
    setUserInfo(null);
    setShowUserForm(false);
    setFormData({ name: '', email: '', company: '', role: '' });
  };

  // User form for lead capture
  if (showUserForm && !isComplete) {
    return (
      <div className="min-h-screen bg-luxury-bg-primary">
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
              <div className="text-center text-sm sm:text-base font-semibold text-gray-900">Almost Done! 🎉</div>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-6 py-12">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Get Your Personalized Report
                </h2>
                <p className="text-lg text-gray-600">
                  Enter your details to receive your detailed Digital Maturity Assessment report and personalized recommendations.
                </p>
              </div>

              <form onSubmit={handleUserFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 text-lg"
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 text-lg"
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 text-lg"
                    required
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({...prev, role: e.target.value}))}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 text-lg"
                  >
                    <option value="">Select your role</option>
                    <option value="CEO/Founder">CEO/Founder</option>
                    <option value="CTO/Technology Leader">CTO/Technology Leader</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="Business Owner">Business Owner</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Generate My Report
                </Button>

                <p className="text-center text-sm text-gray-500">
                  🔒 Your information is secure and will never be shared
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Results page
  if (isComplete && results) {
    return (
      <div className="min-h-screen bg-luxury-bg-primary">
        {/* Header */}
        <header className="bg-luxury-bg-primary/95 backdrop-blur-sm border-b border-luxury-grid-divider sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
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

        <div className="max-w-6xl mx-auto px-6 py-12" id="results-content">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 rounded-full px-6 py-3 mb-6">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Assessment Complete</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Your Digital Maturity Score
            </h1>
            <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-2">
              {results.overallScore}%
            </div>
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-blue-100 to-green-100 text-gray-700 border-0">
              {results.level.name}
            </Badge>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              {results.level.description}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Button
              onClick={downloadPDF}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF Report
            </Button>
            
            <Button
              onClick={bookStrategyCall}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Strategy Call
            </Button>

            <Button
              onClick={contactWhatsApp}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>

          {/* Section Breakdown */}
          <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Category Breakdown</h2>
              <div className="space-y-6">
                {results.sectionScores.map((section, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{section.name}</span>
                      <span className="font-semibold text-gray-900">{section.score}%</span>
                    </div>
                    <Progress value={section.score} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recommended Next Steps</h2>
              <div className="space-y-4">
                {results.level.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-green-500"></div>
                    </div>
                    <p className="text-gray-700 font-medium">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-green-600 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">Ready to Improve Your Digital Maturity?</h3>
              <p className="text-xl mb-8 opacity-90">
                Let's discuss how to implement these recommendations and automate your business processes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  onClick={bookStrategyCall}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Strategy Call
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/roi-calculator'}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
                >
                  Calculate ROI Potential
                </Button>
              </div>
              <p className="text-sm opacity-80 mt-4">
                ⚡ Free 15-minute consultation • No obligations • Custom automation roadmap
              </p>
            </CardContent>
          </Card>

          {/* Reset Option */}
          <div className="text-center mt-8">
            <Button
              onClick={resetAssessment}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              Take Assessment Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Assessment questions
  const section = digitalMaturitySections[currentSection];
  const question = section.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-luxury-bg-primary">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
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
            <div className="text-xs sm:text-sm text-gray-500 text-right">
              {currentQuestionNumber} of {totalQuestions}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-green-100 text-gray-700 border-0 text-sm px-4 py-2">
                {section.name}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { score: 3, label: "Excellent - We excel in this area", color: "from-green-500 to-green-600" },
                { score: 2, label: "Good - We're doing well with room to improve", color: "from-blue-500 to-blue-600" },
                { score: 1, label: "Basic - We have foundational capabilities", color: "from-yellow-500 to-yellow-600" },
                { score: 0, label: "Poor - This is a significant weakness", color: "from-red-500 to-red-600" }
              ].map((option) => (
                <Button
                  key={option.score}
                  onClick={() => handleAnswer(option.score)}
                  variant="outline"
                  size="lg"
                  className={`w-full p-4 sm:p-6 text-left justify-start hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-transparent hover:shadow-xl bg-gradient-to-r hover:${option.color} hover:text-white group`}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r ${option.color} text-white flex items-center justify-center font-bold text-xs sm:text-sm group-hover:scale-110 transition-transform duration-300`}>
                      {option.score}
                    </div>
                    <span className="font-medium text-sm sm:text-base">{option.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={goBack}
            variant="outline"
            disabled={currentSection === 0 && currentQuestion === 0}
            className="border-2 border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-800 font-semibold px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <div className="text-xs sm:text-sm text-gray-500 text-center">
            Section {currentSection + 1} of {digitalMaturitySections.length}
          </div>
          
          <div className="w-16 sm:w-24"></div> {/* Spacer for layout balance */}
        </div>
      </div>
    </div>
  );
}