
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';
import { digitalMaturitySections, maturityLevels } from '../data/mock';
import Report from '../components/Report';

export default function DigitalMaturityTracker() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiReport, setAiReport] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const reportRef = useRef();

  // Removed the useEffect that loaded previous results to ensure a fresh start every time.

  const totalQuestions = digitalMaturitySections.reduce((sum, section) => sum + section.questions.length, 0);
  const currentQuestionNumber = digitalMaturitySections.slice(0, currentSection).reduce((sum, section) => sum + section.questions.length, 0) + currentQuestion + 1;
  const progress = (Object.keys(answers).length / totalQuestions) * 100;

  const handleAnswer = (score) => {
    const questionKey = `${currentSection}-${currentQuestion}`;
    setAnswers(prev => ({ ...prev, [questionKey]: score }));

    const currentSectionQuestions = digitalMaturitySections[currentSection].questions.length;
    if (currentQuestion < currentSectionQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < digitalMaturitySections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      setShowUserForm(true);
    }
  };

  const calculateResults = () => {
    const categoryScores = digitalMaturitySections.reduce((acc, section, index) => {
      const sectionAnswers = Object.entries(answers).filter(([key]) => key.startsWith(`${index}-`)).map(([, score]) => score);
      const totalScore = sectionAnswers.reduce((sum, score) => sum + score, 0);
      const maxScore = sectionAnswers.length * 3;
      const score = (totalScore / maxScore) * 10;
      acc[section.id] = { name: section.name, score };
      return acc;
    }, {});

    const totalScore = Object.values(categoryScores).reduce((sum, cat) => sum + cat.score, 0);
    const overallPercentage = (totalScore / (digitalMaturitySections.length * 10)) * 100;
    const maturityStage = maturityLevels.find(level => overallPercentage >= level.range[0] && overallPercentage <= level.range[1]) || maturityLevels[0];
    
    const staticAnalysis = {
      summary: `Your overall digital maturity score of ${overallPercentage.toFixed(0)}% places you in the '${maturityStage.name}' stage. ${maturityStage.description}`,
      recommendations: maturityStage.recommendations
    };

    return { score: overallPercentage, categoryScores, maturityStage, analysis: staticAnalysis };
  };

  const handleUserFormSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setShowUserForm(false);
    setUserInfo(formData);

    const calculatedResults = calculateResults();

    try {
      const response = await fetch('/api/generateReport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, results: calculatedResults }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const aiContent = await response.json();

      if (aiContent && aiContent.executiveSummary && aiContent.personalizedRecommendations && aiContent.actionPlan) {
        setAiReport(aiContent);
        localStorage.setItem('digitalMaturityResults', JSON.stringify({ results: calculatedResults, userInfo: formData, aiReport: aiContent, timestamp: new Date().toISOString() }));
      } else {
        throw new Error("Incomplete AI report data received.");
      }

    } catch (error) {
      console.error("Error generating or saving AI report:", error);
      setAiReport(null); 
      localStorage.setItem('digitalMaturityResults', JSON.stringify({ results: calculatedResults, userInfo: formData, aiReport: null, timestamp: new Date().toISOString() }));
    } finally {
      setResults(calculatedResults);
      setIsComplete(true);
      setIsGenerating(false);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      const prevSectionLength = digitalMaturitySections[currentSection - 1].questions.length;
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(prevSectionLength - 1);
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
    setAiReport(null);
    setFormData({ name: '', email: '', company: '', role: '' });
    localStorage.removeItem('digitalMaturityResults');
  };

  const AppHeader = () => (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Button variant="ghost" onClick={() => window.location.href = '/'}><ArrowLeft className="w-4 h-4 mr-2" /> Home</Button>
        <a href="/">
          <img src="https://customer-assets.emergentagent.com/job_ai-lead-toolkit/artifacts/lr58t0dk_ailutions.%20logo.svg" alt="Ailutions Logo" className="h-8" />
        </a>
        <div className="text-sm text-gray-500">{isComplete ? 'Report' : `${currentQuestionNumber} of ${totalQuestions}`}</div>
      </div>
    </header>
  );

  if (isGenerating) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl text-center">
                <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-10">
                        <div className="flex justify-center items-center mb-6">
                            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Generating Your Personalized Report...</h2>
                        <p className="text-lg text-gray-600">Our AI is analyzing your results to create custom recommendations just for you. This may take up to 30 seconds.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }
  
  if (showUserForm) {
    return (
        <div className="min-h-screen bg-luxury-bg-primary flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-10">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Personalized Report</h2>
                            <p className="text-lg text-gray-600">Enter your details to view your Digital Maturity results and get a downloadable report.</p>
                        </div>
                        <form onSubmit={handleUserFormSubmit} className="space-y-6">
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 border border-gray-200 rounded-lg text-lg" required placeholder="Full Name" />
                            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-4 border border-gray-200 rounded-lg text-lg" required placeholder="Email Address" />
                            <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full p-4 border border-gray-200 rounded-lg text-lg" required placeholder="Company Name" />
                            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full p-4 border border-gray-200 rounded-lg text-lg">
                                <option value="">Select your role</option>
                                <option value="CEO/Founder">CEO/Founder</option>
                                <option value="CTO/Technology Leader">CTO/Technology Leader</option>
                                <option value="Operations Manager">Operations Manager</option>
                                <option value="Business Owner">Business Owner</option>
                                <option value="Department Head">Department Head</option>
                                <option value="Other">Other</option>
                            </select>
                            <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 text-lg">Generate My Report</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  if (isComplete && results) {
    return (
        <div className="min-h-screen bg-gray-100">
            <AppHeader />
            <main className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <Report ref={reportRef} {...results} aiReport={aiReport} userInfo={userInfo} />
                </div>
                 <div className="text-center mt-8">
                  <Button
                    onClick={resetAssessment}
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Take Assessment Again
                  </Button>
                </div>
            </main>
        </div>
    );
  }

  const section = digitalMaturitySections[currentSection];
  const question = section.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-luxury-bg-primary">
        <AppHeader />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
            <Progress value={progress} className="mb-12 h-3" />
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-12">
                    <div className="text-center mb-10">
                        <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-green-100 text-gray-700 border-0 text-sm px-4 py-2">{section.name}</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{question}</h2>
                    </div>
                    <div className="space-y-4 max-w-2xl mx-auto">
                        {[
                            { score: 3, label: "Excellent - We excel here.", color: "green" },
                            { score: 2, label: "Good - We're doing well.", color: "blue" },
                            { score: 1, label: "Basic - We have some capabilities.", color: "yellow" },
                            { score: 0, label: "Poor - A significant weakness.", color: "red" }
                        ].map((option) => (
                            <Button key={option.score} onClick={() => handleAnswer(option.score)} variant="outline" size="lg" className={`w-full p-6 text-left text-lg justify-start hover:bg-${option.color}-500 hover:text-white`}>
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <div className="flex items-center justify-between mt-8">
                <Button onClick={goBack} disabled={currentSection === 0 && currentQuestion === 0}> <ArrowLeft className="w-4 h-4 mr-2" /> Previous</Button>
            </div>
        </main>
    </div>
  );
}
