
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Download, Calendar, BarChart3, Clock, Users, Target, CheckCircle, TrendingUp, AlertTriangle, ArrowLeft } from 'lucide-react';

const frequencyValues = {
  'daily': { label: 'Daily', multiplier: 365, priority: 'high' },
  'weekly': { label: 'Weekly', multiplier: 52, priority: 'high' },
  'monthly': { label: 'Monthly', multiplier: 12, priority: 'medium' },
  'adhoc': { label: 'Ad-hoc', multiplier: 4, priority: 'low' }
};

const getAutomationSuggestions = (task) => {
  const taskName = task.taskName.toLowerCase();
  const tools = task.toolsUsed.toLowerCase();
  
  const suggestions = [];
  
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
  
  return suggestions[0];
};

export default function AutomationReadinessReport({ results, userInfo, onBack }) {
  const reportRef = useRef();

  const downloadPDF = () => {
    if (!results) return;

    const input = reportRef.current;
    html2canvas(input, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const height = pdfWidth / ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, height);
      
      const fileName = `Automation-Roadmap-${userInfo.company || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    });
  };

  if (!results) {
      return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Assessment
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Your Automation Roadmap</h1>
              <div />
            </div>
          </div>
        </header>

        <div ref={reportRef} className="max-w-6xl mx-auto px-6 py-12 bg-white">
          {/* Report Header */}
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Top Automation Candidates & Implementation Guides</h2>
              <div className="space-y-8">
                {results.topAutomationCandidates.map((task, index) => {
                  const automationGuide = getAutomationSuggestions(task);
                  return (
                    <div key={task.id} className="border border-gray-100 rounded-xl overflow-hidden">
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
                          <div><span className="font-semibold text-gray-700">Handled by:</span><p className="text-gray-600">{task.whoHandles}</p></div>
                          <div><span className="font-semibold text-gray-700">Frequency:</span><p className="text-gray-600">{frequencyValues[task.frequency]?.label}</p></div>
                          <div><span className="font-semibold text-gray-700">Time per instance:</span><p className="text-gray-600">{task.timeSpent} minutes</p></div>
                          <div><span className="font-semibold text-gray-700">Annual impact:</span><p className="text-gray-600">{Math.round(task.annualHours)} hours</p></div>
                        </div>
                        {task.toolsUsed && <div className="mt-3"><span className="font-semibold text-gray-700">Current tools:</span><p className="text-gray-600">{task.toolsUsed}</p></div>}
                      </div>
                      <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center"><span className="text-white text-sm font-bold">🛠️</span></div>
                          <h4 className="text-lg font-bold text-gray-900">How to Automate: {automationGuide.title}</h4>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2">
                            <h5 className="font-semibold text-gray-800 mb-3">Implementation Steps:</h5>
                            <div className="space-y-2">
                              {automationGuide.steps.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold">{stepIndex + 1}</div>
                                  <p className="text-gray-700 text-sm">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-gray-800 mb-2">Recommended Tools:</h5>
                              <div className="flex flex-wrap gap-2">
                                {automationGuide.tools.map((tool, toolIndex) => <Badge key={toolIndex} className="bg-blue-100 text-blue-700 text-xs">{tool}</Badge>)}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div><span className="font-semibold text-gray-700 block">Timeline:</span><span className="text-green-600 font-medium">{automationGuide.timeToImplement}</span></div>
                              <div>
                                <span className="font-semibold text-gray-700 block">Difficulty:</span>
                                <span className={`font-medium ${automationGuide.difficulty === 'Easy' ? 'text-green-600' : automationGuide.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{automationGuide.difficulty}</span>
                              </div>
                            </div>
                            <Button onClick={() => window.open('https://cal.com/ailutions/15-minutes-strategy-call', '_blank')} size="sm" className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm">Get Implementation Help</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Button onClick={downloadPDF} size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
                    <Download className="w-5 h-5 mr-2" />
                    Download Full Report
                </Button>
                <Button onClick={() => window.open('https://cal.com/ailutions/15-minutes-strategy-call', '_blank')} size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Strategy Call
                </Button>
                <Button onClick={() => window.location.href = '/roi-calculator'} variant="outline" size="lg" className="border-2 border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-600 font-semibold px-8 py-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300">
                    Calculate ROI
                </Button>
            </div>
            
            {/* Next Steps CTA */}
            <Card className="border-0 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl">
                <CardContent className="p-12 text-center">
                    <h3 className="text-3xl font-bold mb-6">Ready to Automate Your Top Tasks?</h3>
                    <p className="text-xl mb-8 opacity-90">Let's turn your highest-scoring tasks into automated workflows that save hours every week.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Button onClick={() => window.open('https://cal.com/ailutions/15-minutes-strategy-call', '_blank')} size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300">
                            <Calendar className="w-5 h-5 mr-2" />
                            Book Free Automation Call
                        </Button>
                        <Button onClick={() => window.location.href = '/digital-maturity-tracker'} size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300">
                            Take Maturity Assessment
                        </Button>
                    </div>
                    <p className="text-sm opacity-80 mt-4">⚡ Free 15-minute consultation • Custom automation roadmap • No obligations</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
