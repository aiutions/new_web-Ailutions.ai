import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Plus, Trash2, Download, Calendar, BarChart3, Clock, Users, Target, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import jsPDF from 'jspdf';

export default function AutomationReadinessAssessment() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskName: '',
      whoHandles: '',
      frequency: '',
      toolsUsed: '',
      timeSpent: '',
      score: 0
    }
  ]);
  
  const [showResults, setShowResults] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [results, setResults] = useState(null);

  const frequencyValues = {
    'daily': { label: 'Daily', multiplier: 365, priority: 'high' },
    'weekly': { label: 'Weekly', multiplier: 52, priority: 'high' },
    'monthly': { label: 'Monthly', multiplier: 12, priority: 'medium' },
    'adhoc': { label: 'Ad-hoc', multiplier: 4, priority: 'low' }
  };

  const addTask = () => {
    if (tasks.length < 10) {
      setTasks([...tasks, {
        id: Date.now(),
        taskName: '',
        whoHandles: '',
        frequency: '',
        toolsUsed: '',
        timeSpent: '',
        score: 0
      }]);
    }
  };

  const removeTask = (id) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const updateTask = (id, field, value) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, [field]: value };
        // Recalculate score
        updatedTask.score = calculateTaskScore(updatedTask);
        return updatedTask;
      }
      return task;
    }));
  };

  const calculateTaskScore = (task) => {
    if (!task.frequency || !task.timeSpent) return 0;
    
    const frequency = frequencyValues[task.frequency];
    const timeSpent = parseFloat(task.timeSpent) || 0;
    
    // Base score: frequency multiplier × time spent
    const baseScore = frequency.multiplier * timeSpent;
    
    // Bonus factors
    let bonusMultiplier = 1;
    
    // Repetitive tasks get higher scores
    if (frequency.multiplier >= 365) bonusMultiplier += 0.5; // Daily tasks
    if (frequency.multiplier >= 52) bonusMultiplier += 0.3;  // Weekly tasks
    
    // Time-intensive tasks get higher scores
    if (timeSpent >= 60) bonusMultiplier += 0.4; // >1 hour
    if (timeSpent >= 30) bonusMultiplier += 0.2; // >30 mins
    
    return Math.round(baseScore * bonusMultiplier);
  };

  const analyzeResults = () => {
    const completeTasks = tasks.filter(task => 
      task.taskName && task.frequency && task.timeSpent
    );

    if (completeTasks.length === 0) return;

    // Calculate scores and sort by automation potential
    const sortedTasks = completeTasks
      .map(task => ({
        ...task,
        annualHours: (frequencyValues[task.frequency]?.multiplier || 0) * (parseFloat(task.timeSpent) || 0) / 60,
        priority: frequencyValues[task.frequency]?.priority || 'low'
      }))
      .sort((a, b) => b.score - a.score);

    // Calculate total metrics
    const totalAnnualHours = sortedTasks.reduce((sum, task) => sum + task.annualHours, 0);
    const totalTasks = sortedTasks.length;
    const highPriorityTasks = sortedTasks.filter(task => task.priority === 'high').length;
    
    // Automation readiness score (0-100)
    let readinessScore = 0;
    if (totalTasks >= 3) readinessScore += 20; // Has multiple tasks
    if (highPriorityTasks >= 2) readinessScore += 30; // Has frequent tasks
    if (totalAnnualHours >= 100) readinessScore += 25; // Significant time investment
    if (sortedTasks[0]?.score >= 500) readinessScore += 25; // Has high-impact task
    
    readinessScore = Math.min(readinessScore, 100);

    // Categorize readiness level
    let readinessLevel = '';
    let readinessColor = '';
    if (readinessScore >= 80) {
      readinessLevel = 'High';
      readinessColor = 'text-green-600 bg-green-100';
    } else if (readinessScore >= 60) {
      readinessLevel = 'Medium-High';
      readinessColor = 'text-blue-600 bg-blue-100';
    } else if (readinessScore >= 40) {
      readinessLevel = 'Medium';
      readinessColor = 'text-yellow-600 bg-yellow-100';
    } else {
      readinessLevel = 'Low';
      readinessColor = 'text-red-600 bg-red-100';
    }

    const analysisResults = {
      tasks: sortedTasks,
      totalTasks,
      totalAnnualHours: Math.round(totalAnnualHours),
      highPriorityTasks,
      readinessScore,
      readinessLevel,
      readinessColor,
      topAutomationCandidates: sortedTasks.slice(0, 3),
      estimatedSavings: Math.round(totalAnnualHours * 35), // $35/hour avg
      timestamp: new Date().toISOString()
    };

    setResults(analysisResults);
    setShowResults(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setShowEmailCapture(false);
    
    // Save to localStorage
    const assessments = JSON.parse(localStorage.getItem('automationAssessments') || '[]');
    assessments.push({
      ...results,
      userInfo,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('automationAssessments', JSON.stringify(assessments));
  };

  const downloadPDF = async () => {
    if (!results) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;

    // Header
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    pdf.setFontSize(22);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Automation Readiness Assessment', margin, 25);
    
    // User info
    let yPos = 55;
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    
    if (userInfo.name) {
      pdf.text(`Name: ${userInfo.name}`, margin, yPos);
      pdf.text(`Company: ${userInfo.company}`, margin, yPos + 10);
      pdf.text(`Role: ${userInfo.role}`, margin, yPos + 20);
      yPos += 35;
    }
    
    pdf.text(`Assessment Date: ${new Date().toLocaleDateString()}`, margin, yPos);
    yPos += 20;

    // Overall Score
    pdf.setFontSize(18);
    pdf.setTextColor(34, 197, 94);
    pdf.text('Automation Readiness Score', margin, yPos);
    yPos += 15;

    pdf.setFontSize(28);
    pdf.setTextColor(59, 130, 246);
    pdf.text(`${results.readinessScore}%`, margin, yPos);
    
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Level: ${results.readinessLevel}`, margin + 60, yPos - 8);
    yPos += 20;

    // Key Metrics
    pdf.setFontSize(16);
    pdf.setTextColor(147, 51, 234);
    pdf.text('Key Insights:', margin, yPos);
    yPos += 15;

    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`• Total Tasks Analyzed: ${results.totalTasks}`, margin + 5, yPos);
    pdf.text(`• Annual Hours Spent: ${results.totalAnnualHours} hours`, margin + 5, yPos + 12);
    pdf.text(`• Estimated Annual Cost: $${results.estimatedSavings.toLocaleString()}`, margin + 5, yPos + 24);
    pdf.text(`• High-Frequency Tasks: ${results.highPriorityTasks}`, margin + 5, yPos + 36);
    yPos += 55;

    // Top Automation Candidates
    pdf.setFontSize(16);
    pdf.setTextColor(249, 115, 22);
    pdf.text('Top Automation Candidates:', margin, yPos);
    yPos += 15;

    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    
    results.topAutomationCandidates.forEach((task, index) => {
      if (yPos > pdf.internal.pageSize.height - 60) {
        pdf.addPage();
        yPos = 30;
      }
      
      pdf.setFontSize(12);
      pdf.setTextColor(59, 130, 246);
      pdf.text(`${index + 1}. ${task.taskName}`, margin + 5, yPos);
      yPos += 12;
      
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`   • Frequency: ${frequencyValues[task.frequency]?.label}`, margin + 5, yPos);
      pdf.text(`   • Time per instance: ${task.timeSpent} minutes`, margin + 5, yPos + 10);
      pdf.text(`   • Annual impact: ${Math.round(task.annualHours)} hours`, margin + 5, yPos + 20);
      pdf.text(`   • Automation score: ${task.score} points`, margin + 5, yPos + 30);
      yPos += 45;
    });

    // Recommendations
    yPos += 10;
    if (yPos > pdf.internal.pageSize.height - 100) {
      pdf.addPage();
      yPos = 30;
    }

    pdf.setFontSize(16);
    pdf.setTextColor(220, 38, 127);
    pdf.text('Recommended Next Steps:', margin, yPos);
    yPos += 15;

    const recommendations = [
      'Start with your highest-scoring task for maximum impact',
      'Look for tasks that follow clear, predictable rules',
      'Consider tasks that involve data entry or file processing',
      'Evaluate integration opportunities between your current tools',
      'Calculate ROI potential for each automation project'
    ];

    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    
    recommendations.forEach((rec, index) => {
      const lines = pdf.splitTextToSize(`${index + 1}. ${rec}`, pageWidth - 2 * margin);
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
    pdf.text('Generated by Ailutions Automation Readiness Assessment', margin, footerY);
    pdf.text('Contact: hello@ailutions.com | Book your automation strategy call', margin, footerY + 8);

    const fileName = `Automation-Readiness-Report-${userInfo.company || 'Assessment'}-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  };

  const isFormValid = () => {
    return tasks.some(task => task.taskName && task.frequency && task.timeSpent);
  };

  // Email capture modal
  if (showEmailCapture && !userInfo.email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50/30">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">Get Your Full Report 📊</h1>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-6 py-12">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Get Your Custom Automation Roadmap
                </h2>
                <p className="text-lg text-gray-600">
                  Enter your details to receive your detailed automation analysis with prioritized recommendations and next steps.
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({...prev, name: e.target.value}))}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-purple-500/20 text-lg"
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
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({...prev, email: e.target.value}))}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-purple-500/20 text-lg"
                    required
                    placeholder="your@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={userInfo.company}
                    onChange={(e) => setUserInfo(prev => ({...prev, company: e.target.value}))}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-purple-500/20 text-lg"
                    required
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Role
                  </label>
                  <select
                    value={userInfo.role}
                    onChange={(e) => setUserInfo(prev => ({...prev, role: e.target.value}))}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-purple-500/20 text-lg"
                  >
                    <option value="">Select your role</option>
                    <option value="CEO/Founder">CEO/Founder</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="CTO/Technology Leader">CTO/Technology Leader</option>
                    <option value="Business Owner">Business Owner</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Get My Automation Roadmap
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
  if (showResults && results && userInfo.email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
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
              <h1 className="text-xl font-semibold text-gray-900">Your Automation Roadmap</h1>
              <div></div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-6 py-3 mb-6">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Analysis Complete</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Automation Readiness Score
            </h1>
            <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
              {results.readinessScore}%
            </div>
            <Badge className={`text-lg px-6 py-2 border-0 ${results.readinessColor}`}>
              {results.readinessLevel} Readiness
            </Badge>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-4xl font-bold mb-2">{results.totalTasks}</div>
                <div className="text-purple-100">Tasks Analyzed</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-4xl font-bold mb-2">{results.totalAnnualHours}</div>
                <div className="text-blue-100">Hours/Year</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">${results.estimatedSavings.toLocaleString()}</div>
                <div className="text-green-100">Annual Cost</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <CardContent className="p-8 text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-4xl font-bold mb-2">{results.highPriorityTasks}</div>
                <div className="text-orange-100">High-Priority Tasks</div>
              </CardContent>
            </Card>
          </div>

          {/* Top Automation Candidates */}
          <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Top Automation Candidates</h2>
              <div className="space-y-6">
                {results.topAutomationCandidates.map((task, index) => (
                  <div key={task.id} className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        #{index + 1} {task.taskName}
                      </h3>
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        Score: {task.score}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Handled by:</span>
                        <p className="text-gray-600">{task.whoHandles}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Frequency:</span>
                        <p className="text-gray-600">{frequencyValues[task.frequency]?.label}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Time per instance:</span>
                        <p className="text-gray-600">{task.timeSpent} minutes</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Annual impact:</span>
                        <p className="text-gray-600">{Math.round(task.annualHours)} hours</p>
                      </div>
                    </div>
                    {task.toolsUsed && (
                      <div className="mt-3">
                        <span className="font-semibold text-gray-700">Current tools:</span>
                        <p className="text-gray-600">{task.toolsUsed}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Button
              onClick={downloadPDF}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Full Report
            </Button>
            
            <Button
              onClick={() => window.open('https://calendly.com/ailutions-automation-strategy', '_blank')}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Strategy Call
            </Button>

            <Button
              onClick={() => window.location.href = '/roi-calculator'}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-600 font-semibold px-8 py-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300"
            >
              Calculate ROI
            </Button>
          </div>

          {/* Next Steps CTA */}
          <Card className="border-0 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">Ready to Automate Your Top Tasks?</h3>
              <p className="text-xl mb-8 opacity-90">
                Let's turn your highest-scoring tasks into automated workflows that save hours every week.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  onClick={() => window.open('https://calendly.com/ailutions-automation-strategy', '_blank')}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Automation Call
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/digital-maturity-tracker'}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
                >
                  Take Maturity Assessment
                </Button>
              </div>
              <p className="text-sm opacity-80 mt-4">
                ⚡ Free 15-minute consultation • Custom automation roadmap • No obligations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
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
            <h1 className="text-xl font-semibold text-gray-900">Automation Readiness Assessment</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-6 py-3 mb-6">
            <BarChart3 className="w-5 h-5" />
            <span className="font-semibold">Automation Assessment</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Spot What's Slowing Your Team Down
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Enter your repetitive tasks below and get an instant analysis of your automation potential. See which processes are costing you the most time and money.
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Repetitive Tasks</h2>
              <Button
                onClick={addTask}
                disabled={tasks.length >= 10}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task {tasks.length >= 10 && '(Max 10)'}
              </Button>
            </div>

            <div className="space-y-6">
              {tasks.map((task, index) => (
                <Card key={task.id} className="border-2 border-gray-100 hover:border-purple-200 transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">Task #{index + 1}</h3>
                      <div className="flex items-center space-x-3">
                        {task.score > 0 && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            Score: {task.score}
                          </Badge>
                        )}
                        <Button
                          onClick={() => removeTask(task.id)}
                          disabled={tasks.length === 1}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Task/Decision *
                        </Label>
                        <Input
                          value={task.taskName}
                          onChange={(e) => updateTask(task.id, 'taskName', e.target.value)}
                          placeholder="e.g., Data entry from emails"
                          className="border-gray-200 focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Who Handles It
                        </Label>
                        <Input
                          value={task.whoHandles}
                          onChange={(e) => updateTask(task.id, 'whoHandles', e.target.value)}
                          placeholder="e.g., Sarah, Admin team"
                          className="border-gray-200 focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Frequency *
                        </Label>
                        <select
                          value={task.frequency}
                          onChange={(e) => updateTask(task.id, 'frequency', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500/20"
                        >
                          <option value="">Select frequency</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="adhoc">Ad-hoc</option>
                        </select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Time (minutes) *
                        </Label>
                        <Input
                          type="number"
                          value={task.timeSpent}
                          onChange={(e) => updateTask(task.id, 'timeSpent', e.target.value)}
                          placeholder="30"
                          className="border-gray-200 focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Tools Used
                        </Label>
                        <Input
                          value={task.toolsUsed}
                          onChange={(e) => updateTask(task.id, 'toolsUsed', e.target.value)}
                          placeholder="Excel, Email, CRM"
                          className="border-gray-200 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                onClick={analyzeResults}
                disabled={!isFormValid()}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-12 py-6 rounded-2xl text-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl disabled:opacity-50"
              >
                <BarChart3 className="w-6 h-6 mr-3" />
                Analyze My Tasks
              </Button>
              <p className="text-gray-500 mt-4">
                ⚡ Instant analysis • Priority ranking • Custom recommendations
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Preview */}
        {showResults && results && (
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-pink-50 mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎉 Analysis Complete!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Your automation readiness score is <strong>{results.readinessScore}%</strong> with <strong>{results.topAutomationCandidates.length}</strong> high-priority tasks identified.
              </p>
              <Button
                onClick={() => setShowEmailCapture(true)}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-10 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
              >
                Get My Full Automation Roadmap
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}