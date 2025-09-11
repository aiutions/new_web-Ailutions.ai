import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, ArrowRight, Download, Calendar, CheckCircle } from 'lucide-react';
import { digitalMaturitySections, maturityLevels } from '../data/mock';

export default function DigitalMaturityTracker() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState(null);

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
      // Assessment complete
      calculateResults();
    }
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

    setResults({
      overallScore: percentage,
      level: level,
      sectionScores: sectionScores,
      timestamp: new Date().toISOString()
    });
    
    setIsComplete(true);
  };

  const downloadResults = () => {
    if (!results) return;
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `digital-maturity-assessment-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
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
  };

  if (isComplete && results) {
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
              <h1 className="text-xl font-semibold text-gray-900">Assessment Results</h1>
              <div></div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-6">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Assessment Complete</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              onClick={downloadResults}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Results
            </Button>
            
            <Button
              onClick={() => window.location.href = '/#contact'}
              size="lg"
              className="bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book a Call
            </Button>
            
            <Button
              onClick={resetAssessment}
              variant="outline"
              size="lg"
              className="border-2 border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-800 font-semibold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-300"
            >
              Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

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