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
    const margin = 20;

    // Header with branding
    pdf.setFillColor(59, 130, 246); // Blue background
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Digital Maturity Assessment Report', margin, 25);
    
    // User info
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    let yPos = 55;
    
    if (results.userInfo) {
      pdf.text(`Name: ${results.userInfo.name}`, margin, yPos);
      pdf.text(`Company: ${results.userInfo.company}`, margin, yPos + 10);
      pdf.text(`Role: ${results.userInfo.role}`, margin, yPos + 20);
      yPos += 35;
    }
    
    pdf.text(`Assessment Date: ${new Date(results.timestamp).toLocaleDateString()}`, margin, yPos);
    yPos += 20;

    // Overall Score
    pdf.setFontSize(18);
    pdf.setTextColor(34, 197, 94); // Green
    pdf.text('Overall Digital Maturity Score', margin, yPos);
    yPos += 15;

    pdf.setFontSize(32);
    pdf.setTextColor(59, 130, 246); // Blue
    pdf.text(`${results.overallScore}%`, margin, yPos);
    
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Level: ${results.level.name}`, margin + 60, yPos - 8);
    pdf.setFontSize(12);
    pdf.text(results.level.description, margin + 60, yPos + 5);
    yPos += 30;

    // Section Breakdown
    pdf.setFontSize(16);
    pdf.setTextColor(147, 51, 234); // Purple
    pdf.text('Category Breakdown:', margin, yPos);
    yPos += 15;

    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    
    results.sectionScores.forEach((section, index) => {
      pdf.text(`• ${section.name}:`, margin + 5, yPos);
      pdf.text(`${section.score}%`, margin + 100, yPos);
      yPos += 12;
    });

    yPos += 10;

    // Recommendations
    pdf.setFontSize(16);
    pdf.setTextColor(249, 115, 22); // Orange
    pdf.text('Recommended Next Steps:', margin, yPos);
    yPos += 15;

    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    
    results.level.recommendations.forEach((recommendation, index) => {
      // Wrap long text
      const lines = pdf.splitTextToSize(`${index + 1}. ${recommendation}`, pageWidth - 2 * margin);
      lines.forEach(line => {
        if (yPos > pdf.internal.pageSize.height - 30) {
          pdf.addPage();
          yPos = 30;
        }
        pdf.text(line, margin + 5, yPos);
        yPos += 12;
      });
      yPos += 5;
    });

    // Action Items
    yPos += 15;
    if (yPos > pdf.internal.pageSize.height - 80) {
      pdf.addPage();
      yPos = 30;
    }

    pdf.setFontSize(16);
    pdf.setTextColor(220, 38, 127); // Pink
    pdf.text('Immediate Action Items:', margin, yPos);
    yPos += 15;

    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    
    const actionItems = [
      'Schedule a free strategy call to discuss your results',
      'Identify the top 3 processes that can be automated first',
      'Assess your current technology stack for AI integration opportunities',
      'Create a digital transformation roadmap with clear milestones'
    ];

    actionItems.forEach((item, index) => {
      const lines = pdf.splitTextToSize(`□ ${item}`, pageWidth - 2 * margin);
      lines.forEach(line => {
        pdf.text(line, margin + 5, yPos);
        yPos += 12;
      });
      yPos += 3;
    });

    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    const footerY = pdf.internal.pageSize.height - 20;
    pdf.text('Generated by Ailutions Digital Maturity Tracker', margin, footerY);
    pdf.text('Contact: hello@ailutions.com | Book your free strategy call at calendly.com/ailutions', margin, footerY + 8);

    // Save the PDF
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50/30">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">Almost Done! 🎉</h1>
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => window.location.href = '/'}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Your Digital Maturity Report</h1>
              <div></div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/'}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Digital Maturity Tracker</h1>
            <div className="text-sm text-gray-500">
              {currentQuestionNumber} of {totalQuestions}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
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
                  className={`w-full p-6 text-left justify-start hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-transparent hover:shadow-xl bg-gradient-to-r hover:${option.color} hover:text-white group`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${option.color} text-white flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300`}>
                      {option.score}
                    </div>
                    <span className="font-medium">{option.label}</span>
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
            className="border-2 border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-800 font-semibold px-6 py-3 rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="text-sm text-gray-500">
            Section {currentSection + 1} of {digitalMaturitySections.length}
          </div>
          
          <div className="w-24"></div> {/* Spacer for layout balance */}
        </div>
      </div>
    </div>
  );
}