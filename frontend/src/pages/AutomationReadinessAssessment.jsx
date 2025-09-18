
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Plus, Trash2, BarChart3, Download } from 'lucide-react';
import AutomationReadinessReport from '../components/AutomationReadinessReport';

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
    
    const baseScore = frequency.multiplier * timeSpent;
    
    let bonusMultiplier = 1;
    if (frequency.multiplier >= 365) bonusMultiplier += 0.5;
    if (frequency.multiplier >= 52) bonusMultiplier += 0.3;
    if (timeSpent >= 60) bonusMultiplier += 0.4;
    if (timeSpent >= 30) bonusMultiplier += 0.2;
    
    return Math.round(baseScore * bonusMultiplier);
  };

  const analyzeResults = () => {
    const completeTasks = tasks.filter(task => 
      task.taskName && task.frequency && task.timeSpent
    );

    if (completeTasks.length === 0) return;

    const sortedTasks = completeTasks
      .map(task => ({
        ...task,
        annualHours: (frequencyValues[task.frequency]?.multiplier || 0) * (parseFloat(task.timeSpent) || 0) / 60,
        priority: frequencyValues[task.frequency]?.priority || 'low'
      }))
      .sort((a, b) => b.score - a.score);

    const totalAnnualHours = sortedTasks.reduce((sum, task) => sum + task.annualHours, 0);
    const totalTasks = sortedTasks.length;
    const highPriorityTasks = sortedTasks.filter(task => task.priority === 'high').length;
    
    let readinessScore = 0;
    if (totalTasks >= 3) readinessScore += 20;
    if (highPriorityTasks >= 2) readinessScore += 30;
    if (totalAnnualHours >= 100) readinessScore += 25;
    if (sortedTasks[0]?.score >= 500) readinessScore += 25;
    
    readinessScore = Math.min(readinessScore, 100);

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
      estimatedSavings: Math.round(totalAnnualHours * 35),
      timestamp: new Date().toISOString()
    };

    setResults(analysisResults);
    setShowResults(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setShowEmailCapture(false);
    
    const assessments = JSON.parse(localStorage.getItem('automationAssessments') || '[]');
    assessments.push({
      ...results,
      userInfo,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('automationAssessments', JSON.stringify(assessments));
  };
  
  const handleShowReport = () => {
      if (!userInfo.email) {
          setShowEmailCapture(true);
      } else {
          setShowResults(true);
      }
  }

  const isFormValid = () => {
    return tasks.some(task => task.taskName && task.frequency && task.timeSpent);
  };

  if (showResults && results && userInfo.email) {
    return <AutomationReadinessReport results={results} userInfo={userInfo} onBack={() => {setShowResults(false); setUserInfo({name: '', email: '', company: '', role: ''})}} />;
  }

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
                  Enter your details to receive your detailed automation analysis with prioritized recommendations.
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

  return (
    <div className="min-h-screen bg-luxury-bg-primary">
      <header className="bg-luxury-bg-primary/95 backdrop-blur-sm border-b border-luxury-grid-divider sticky top-0 z-50">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">Automation Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            Spot What's Slowing Your Team Down
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            Enter your repetitive tasks below and get an instant analysis of your automation potential. See which processes are costing you the most time and money.
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6 lg:p-10">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                onClick={handleShowReport}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-10 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
              >
                Get My Full Automation Roadmap
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
