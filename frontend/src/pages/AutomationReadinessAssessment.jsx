import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
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

  const getAutomationSuggestions = (task) => {
    const taskName = task.taskName.toLowerCase();
    const tools = task.toolsUsed.toLowerCase();
    
    // Pattern matching for common automation scenarios
    const suggestions = [];
    
    // Email-related tasks
    if (taskName.includes('email') || tools.includes('email') || tools.includes('outlook')) {
      suggestions.push({
        title: "Email Automation Setup",
        steps: [
          "Set up email filters and rules in Outlook/Gmail",
          "Create email templates for common responses",
          "Use Zapier to connect email to CRM/spreadsheets",
          "Implement auto-forwarding for specific email types"
        ],
        tools: ["Zapier", "Microsoft Power Automate", "Gmail Rules", "Outlook Rules"],
        timeToImplement: "1-2 weeks",
        difficulty: "Easy"
      });
    }
    
    // Data entry tasks
    if (taskName.includes('data entry') || taskName.includes('entry') || taskName.includes('input')) {
      suggestions.push({
        title: "Automated Data Entry Solution",
        steps: [
          "Use OCR tools to extract text from documents",
          "Set up form automation with auto-fill capabilities",
          "Create API connections between systems",
          "Implement validation rules to prevent errors"
        ],
        tools: ["Zapier", "Microsoft Power Platform", "UiPath", "Automation Anywhere"],
        timeToImplement: "2-4 weeks",
        difficulty: "Medium"
      });
    }
    
    // Report generation
    if (taskName.includes('report') || taskName.includes('reporting')) {
      suggestions.push({
        title: "Automated Report Generation",
        steps: [
          "Connect data sources to reporting dashboard",
          "Create scheduled report templates",
          "Set up automatic email distribution",
          "Add real-time data refresh capabilities"
        ],
        tools: ["Power BI", "Tableau", "Google Data Studio", "Excel Macros"],
        timeToImplement: "2-3 weeks",
        difficulty: "Medium"
      });
    }
    
    // Invoice/Financial tasks
    if (taskName.includes('invoice') || taskName.includes('payment') || taskName.includes('billing')) {
      suggestions.push({
        title: "Invoice & Payment Automation",
        steps: [
          "Set up automatic invoice generation",
          "Create approval workflows",
          "Connect to payment processing systems",
          "Implement late payment reminders"
        ],
        tools: ["QuickBooks", "Stripe", "PayPal", "FreshBooks"],
        timeToImplement: "3-4 weeks",
        difficulty: "Medium"
      });
    }
    
    // CRM/Customer tasks
    if (tools.includes('crm') || taskName.includes('customer') || taskName.includes('lead')) {
      suggestions.push({
        title: "CRM Workflow Automation",
        steps: [
          "Create lead scoring and assignment rules",
          "Set up automated follow-up sequences",
          "Integrate with marketing automation tools",
          "Configure pipeline stage automation"
        ],
        tools: ["HubSpot", "Salesforce", "Pipedrive", "ActiveCampaign"],
        timeToImplement: "2-4 weeks",
        difficulty: "Medium"
      });
    }
    
    // Scheduling tasks
    if (taskName.includes('schedul') || taskName.includes('calendar') || taskName.includes('appointment')) {
      suggestions.push({
        title: "Scheduling Automation",
        steps: [
          "Set up online booking system",
          "Create automatic confirmation emails",
          "Add calendar integration",
          "Implement reminder notifications"
        ],
        tools: ["Calendly", "Acuity Scheduling", "Microsoft Bookings", "Zapier"],
        timeToImplement: "1-2 weeks",
        difficulty: "Easy"
      });
    }
    
    // Default suggestion for any task
    if (suggestions.length === 0) {
      suggestions.push({
        title: "Custom Automation Solution",
        steps: [
          "Map out current process step-by-step",
          "Identify decision points and rules",
          "Choose appropriate automation platform",
          "Create and test automated workflow"
        ],
        tools: ["Zapier", "Microsoft Power Automate", "Custom Software"],
        timeToImplement: "3-6 weeks",
        difficulty: "Medium-Hard"
      });
    }
    
    return suggestions[0]; // Return the first/best match
  };

  const downloadPDF = async () => {
    if (!results) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Header with professional branding
    pdf.setFillColor(147, 51, 234); // Purple
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    // Company logo area (text-based)
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Ailutions', margin, 25);
    
    pdf.setFontSize(18);
    pdf.text('Automation Readiness Assessment Report', margin, 40);
    
    // Document info section
    let yPos = 70;
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, margin, yPos);
    
    if (userInfo.name) {
      yPos += 25;
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Assessment Details:', margin, yPos);
      
      yPos += 15;
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      
      // Create a clean info table
      const infoData = [
        ['Name:', userInfo.name],
        ['Company:', userInfo.company],
        ['Role:', userInfo.role || 'Not specified'],
        ['Email:', userInfo.email]
      ];
      
      infoData.forEach(([label, value]) => {
        pdf.text(label, margin, yPos);
        pdf.text(value, margin + 50, yPos);
        yPos += 12;
      });
    }

    // Executive Summary Box
    yPos += 15;
    pdf.setFillColor(248, 250, 252); // Light blue background
    pdf.setDrawColor(147, 51, 234); // Purple border
    pdf.setLineWidth(2);
    pdf.rect(margin - 5, yPos - 10, contentWidth + 10, 80, 'FD');
    
    pdf.setFontSize(16);
    pdf.setTextColor(147, 51, 234);
    pdf.text('Executive Summary', margin + 5, yPos + 5);
    
    // Score display
    pdf.setFontSize(48);
    pdf.setTextColor(219, 39, 119); // Pink
    pdf.text(`${results.readinessScore}%`, margin + 5, yPos + 35);
    
    pdf.setFontSize(14);
    pdf.setTextColor(34, 197, 94); // Green
    pdf.text(`${results.readinessLevel} Automation Readiness`, margin + 80, yPos + 25);
    
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    pdf.text(`Your business shows ${results.readinessLevel.toLowerCase()} potential for automation`, margin + 80, yPos + 35);
    pdf.text(`with ${results.totalTasks} tasks analyzed consuming ${results.totalAnnualHours} hours annually`, margin + 80, yPos + 47);
    pdf.text(`Estimated annual cost: $${results.estimatedSavings.toLocaleString()}`, margin + 80, yPos + 59);
    
    yPos += 95;

    // Key Metrics Section
    if (yPos > pageHeight - 100) {
      pdf.addPage();
      yPos = 30;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(147, 51, 234);
    pdf.text('Key Performance Metrics', margin, yPos);
    yPos += 20;

    // Create metric boxes in a 2x2 grid
    const boxWidth = (contentWidth - 15) / 2;
    const boxHeight = 35;
    const metrics = [
      { label: 'Tasks Analyzed', value: results.totalTasks, color: [147, 51, 234], icon: '📋' },
      { label: 'Annual Hours', value: `${results.totalAnnualHours}h`, color: [59, 130, 246], icon: '⏰' },
      { label: 'Annual Cost', value: `$${results.estimatedSavings.toLocaleString()}`, color: [34, 197, 94], icon: '💰' },
      { label: 'High-Priority Tasks', value: results.highPriorityTasks, color: [249, 115, 22], icon: '⚡' }
    ];

    metrics.forEach((metric, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      const xPos = margin + col * (boxWidth + 15);
      const yBoxPos = yPos + row * (boxHeight + 10);
      
      // Box background
      pdf.setFillColor(metric.color[0], metric.color[1], metric.color[2]);
      pdf.rect(xPos, yBoxPos, boxWidth, boxHeight, 'F');
      
      // Icon and value
      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      pdf.text(metric.icon, xPos + 5, yBoxPos + 15);
      pdf.text(String(metric.value), xPos + 20, yBoxPos + 15);
      
      // Label
      pdf.setFontSize(9);
      pdf.text(metric.label, xPos + 5, yBoxPos + 28);
    });
    
    yPos += 85;

    // Start new page for detailed analysis
    pdf.addPage();
    yPos = 30;

    // Detailed Task Analysis Header
    pdf.setFontSize(18);
    pdf.setTextColor(147, 51, 234);
    pdf.text('Detailed Task Analysis & Automation Roadmap', margin, yPos);
    yPos += 20;

    // Process each task
    results.topAutomationCandidates.forEach((task, index) => {
      const automationGuide = getAutomationSuggestions(task);
      
      // Check if we need a new page
      if (yPos > pageHeight - 150) {
        pdf.addPage();
        yPos = 30;
      }

      // Task header with ranking
      pdf.setFillColor(250, 245, 255); // Very light purple
      pdf.setDrawColor(147, 51, 234);
      pdf.setLineWidth(1);
      pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 25, 'FD');
      
      pdf.setFontSize(14);
      pdf.setTextColor(147, 51, 234);
      pdf.text(`#${index + 1} Priority Task`, margin, yPos + 5);
      
      pdf.setFontSize(10);
      pdf.setTextColor(219, 39, 119);
      pdf.text(`Automation Score: ${task.score}`, pageWidth - margin - 50, yPos + 5);
      
      yPos += 30;

      // Task details in structured format
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Task:', margin, yPos);
      pdf.setTextColor(60, 60, 60);
      const taskLines = pdf.splitTextToSize(task.taskName, contentWidth - 50);
      taskLines.forEach(line => {
        pdf.text(line, margin + 30, yPos);
        yPos += 12;
      });
      
      yPos += 5;
      
      // Task metrics table
      const taskDetails = [
        ['Handled by:', task.whoHandles],
        ['Frequency:', frequencyValues[task.frequency]?.label],
        ['Time per instance:', `${task.timeSpent} minutes`],
        ['Annual impact:', `${Math.round(task.annualHours)} hours`],
        ['Current tools:', task.toolsUsed || 'Not specified']
      ];

      pdf.setFontSize(10);
      taskDetails.forEach(([label, value]) => {
        pdf.setTextColor(0, 0, 0);
        pdf.text(label, margin + 10, yPos);
        pdf.setTextColor(60, 60, 60);
        pdf.text(value, margin + 80, yPos);
        yPos += 12;
      });
      
      yPos += 10;

      // Automation Implementation Guide
      pdf.setFillColor(240, 253, 244); // Light green background
      pdf.setDrawColor(34, 197, 94); // Green border
      pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 15, 'FD');
      
      pdf.setFontSize(12);
      pdf.setTextColor(34, 197, 94);
      pdf.text(`🛠️ Automation Strategy: ${automationGuide.title}`, margin, yPos + 5);
      yPos += 20;

      // Implementation steps
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Implementation Steps:', margin + 5, yPos);
      yPos += 12;

      automationGuide.steps.forEach((step, stepIndex) => {
        pdf.setFontSize(10);
        pdf.setTextColor(34, 197, 94);
        pdf.text(`${stepIndex + 1}.`, margin + 10, yPos);
        
        pdf.setTextColor(60, 60, 60);
        const stepLines = pdf.splitTextToSize(step, contentWidth - 25);
        stepLines.forEach((line, lineIndex) => {
          pdf.text(line, margin + 18, yPos + (lineIndex * 10));
        });
        yPos += Math.max(10, stepLines.length * 10) + 3;
      });

      // Implementation details in a structured box
      yPos += 5;
      pdf.setFillColor(249, 250, 251); // Light gray background
      pdf.setDrawColor(156, 163, 175); // Gray border
      pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 35, 'FD');
      
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Recommended Tools:', margin + 5, yPos + 5);
      pdf.setTextColor(59, 130, 246);
      pdf.text(automationGuide.tools.join(', '), margin + 80, yPos + 5);
      
      pdf.setTextColor(0, 0, 0);
      pdf.text('Implementation Time:', margin + 5, yPos + 15);
      pdf.setTextColor(34, 197, 94);
      pdf.text(automationGuide.timeToImplement, margin + 80, yPos + 15);
      
      pdf.setTextColor(0, 0, 0);
      pdf.text('Difficulty Level:', margin + 5, yPos + 25);
      const difficultyColor = automationGuide.difficulty === 'Easy' ? [34, 197, 94] : 
                             automationGuide.difficulty === 'Medium' ? [249, 115, 22] : [239, 68, 68];
      pdf.setTextColor(difficultyColor[0], difficultyColor[1], difficultyColor[2]);
      pdf.text(automationGuide.difficulty, margin + 80, yPos + 25);
      
      yPos += 50;
    });

    // Next Steps Section
    if (yPos > pageHeight - 100) {
      pdf.addPage();
      yPos = 30;
    }

    pdf.setFillColor(59, 130, 246); // Blue background
    pdf.rect(0, yPos - 10, pageWidth, 40, 'F');
    
    pdf.setFontSize(16);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Your Automation Action Plan', margin, yPos + 10);
    
    yPos += 50;

    const actionItems = [
      {
        priority: 'IMMEDIATE',
        action: `Begin with "${results.topAutomationCandidates[0]?.taskName}" - your highest-impact automation opportunity`,
        timeline: 'This week'
      },
      {
        priority: 'SHORT TERM',
        action: 'Schedule a free strategy call with our automation experts',
        timeline: 'Within 2 weeks'
      },
      {
        priority: 'MEDIUM TERM', 
        action: 'Evaluate and select automation tools for your top 3 tasks',
        timeline: '1 month'
      },
      {
        priority: 'LONG TERM',
        action: 'Implement automated workflows and measure ROI',
        timeline: '2-3 months'
      }
    ];

    actionItems.forEach((item, index) => {
      pdf.setFillColor(index === 0 ? 239 : index === 1 ? 34 : index === 2 ? 59 : 156, 
                       index === 0 ? 68 : index === 1 ? 197 : index === 2 ? 130 : 163, 
                       index === 0 ? 68 : index === 1 ? 94 : index === 2 ? 246 : 175);
      pdf.rect(margin - 5, yPos - 5, contentWidth + 10, 25, 'F');
      
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.text(item.priority, margin, yPos + 5);
      pdf.text(item.timeline, pageWidth - margin - 50, yPos + 5);
      
      pdf.setFontSize(9);
      const actionLines = pdf.splitTextToSize(item.action, contentWidth - 100);
      actionLines.forEach(line => {
        pdf.text(line, margin, yPos + 15);
        yPos += 8;
      });
      
      yPos += 10;
    });

    // Footer with contact information
    yPos = pageHeight - 40;
    pdf.setFillColor(31, 41, 55); // Dark background
    pdf.rect(0, yPos, pageWidth, 40, 'F');
    
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Ready to get started?', margin, yPos + 15);
    pdf.text('📞 Book your free strategy call: calendly.com/ailutions-automation', margin, yPos + 25);
    pdf.text('📧 Questions? Contact us: hello@ailutions.com', margin, yPos + 35);
    
    pdf.setTextColor(147, 51, 234);
    pdf.text('Ailutions - AI that powers your business', pageWidth - margin - 80, yPos + 25);

    // Save with descriptive filename
    const fileName = `Automation-Roadmap-${userInfo.company || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  };

  const isFormValid = () => {
    return tasks.some(task => task.taskName && task.frequency && task.timeSpent);
  };

  // Email capture
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

  // Results page
  if (showResults && results && userInfo.email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
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

          {/* Top Automation Candidates with Guides */}
          <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Top Automation Candidates & Implementation Guides</h2>
              <div className="space-y-8">
                {results.topAutomationCandidates.map((task, index) => {
                  const automationGuide = getAutomationSuggestions(task);
                  return (
                    <div key={task.id} className="border border-gray-100 rounded-xl overflow-hidden">
                      {/* Task Header */}
                      <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
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

                      {/* Automation Guide */}
                      <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">🛠️</span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900">
                            How to Automate: {automationGuide.title}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Implementation Steps */}
                          <div className="lg:col-span-2">
                            <h5 className="font-semibold text-gray-800 mb-3">Implementation Steps:</h5>
                            <div className="space-y-2">
                              {automationGuide.steps.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold">
                                    {stepIndex + 1}
                                  </div>
                                  <p className="text-gray-700 text-sm">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Implementation Details */}
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-gray-800 mb-2">Recommended Tools:</h5>
                              <div className="flex flex-wrap gap-2">
                                {automationGuide.tools.map((tool, toolIndex) => (
                                  <Badge key={toolIndex} className="bg-blue-100 text-blue-700 text-xs">
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-semibold text-gray-700 block">Timeline:</span>
                                <span className="text-green-600 font-medium">{automationGuide.timeToImplement}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700 block">Difficulty:</span>
                                <span className={`font-medium ${
                                  automationGuide.difficulty === 'Easy' ? 'text-green-600' :
                                  automationGuide.difficulty === 'Medium' ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  {automationGuide.difficulty}
                                </span>
                              </div>
                            </div>

                            <Button
                              onClick={() => window.open('https://calendly.com/ailutions-automation-strategy', '_blank')}
                              size="sm"
                              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm"
                            >
                              Get Implementation Help
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

  // Main assessment form
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50/30">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
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
            <h1 className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900 text-center">Automation Readiness Assessment</h1>
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
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}