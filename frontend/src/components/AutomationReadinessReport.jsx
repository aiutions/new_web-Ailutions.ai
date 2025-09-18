
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Download, Calendar, ArrowLeft, CheckCircle, Target, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

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

const ReportHeader = ({ userInfo }) => (
  <div className="px-8 py-10 bg-white">
    <div className="flex justify-between items-start">
      <div>
        <img src="https://customer-assets.emergentagent.com/job_ai-lead-toolkit/artifacts/lr58t0dk_ailutions.%20logo.svg" alt="Ailutions Logo" className="h-12 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900">Automation Readiness Report</h1>
      </div>
      <div className="text-right">
        <p className="font-bold">{userInfo.company || 'Your Company'}</p>
        <p>{userInfo.name}</p>
        <p>{userInfo.email}</p>
        <p>Generated on: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  </div>
);

const ReportFooter = () => (
  <div className="px-8 py-4 bg-white text-center text-xs text-gray-500">
    <p>Generated by Ailutions | For inquiries, contact info@ailutions.ai</p>
  </div>
);

export default function AutomationReadinessReport({ results, userInfo, onBack }) {
  const reportRef = useRef();

  const downloadPDF = () => {
    if (!results) return;

    const input = reportRef.current;
    const buttons = input.querySelectorAll('button');
    buttons.forEach(btn => btn.style.display = 'none');

    html2canvas(input, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: true
    }).then(canvas => {
      buttons.forEach(btn => btn.style.display = 'block');
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      const width = pdfWidth;
      const height = width / ratio;

      let position = 0;
      let pageHeight = height;
      let heightLeft = pageHeight;

      if (height < pdfHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      } else {
        let page = 1;
        while(heightLeft > 0) {
          pdf.addImage(imgData, 'PNG', 0, position, width, height);
          heightLeft -= pdfHeight;
          position -= pdfHeight;
          if (heightLeft > 0) {
            pdf.addPage();
            page++;
          }
        }
      }
      
      const fileName = `Automation-Roadmap-${userInfo.company || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    });
  };

  if (!results) {
      return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assessment
            </Button>
            <h1 className="text-lg font-semibold text-gray-800">Your Automation Roadmap</h1>
            <div />
          </div>
        </div>
      </header>

      <main className="py-10">
        <div ref={reportRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white py-12">
            <ReportHeader userInfo={userInfo} />

            <div className="px-8">
              <div className="text-center my-10">
                <h2 className="text-5xl font-bold text-gray-900 mb-2">Automation Readiness Score: {results.readinessScore}%</h2>
                <Badge className={`text-base px-4 py-1 border-0 ${results.readinessColor}`}>
                  {results.readinessLevel} Readiness
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 text-center">
                <Card>
                  <CardContent className="p-6">
                    <Target className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                    <div className="text-3xl font-bold">{results.totalTasks}</div>
                    <div className="text-gray-600">Tasks Analyzed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Clock className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                    <div className="text-3xl font-bold">{results.totalAnnualHours}</div>
                    <div className="text-gray-600">Hours/Year</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <TrendingUp className="w-10 h-10 mx-auto mb-3 text-green-600" />
                    <div className="text-3xl font-bold">${results.estimatedSavings.toLocaleString()}</div>
                    <div className="text-gray-600">Annual Cost</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-orange-600" />
                    <div className="text-3xl font-bold">{results.highPriorityTasks}</div>
                    <div className="text-gray-600">High-Priority Tasks</div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Top Automation Candidates</h2>
                <div className="space-y-6">
                  {results.topAutomationCandidates.map((task, index) => {
                    const automationGuide = getAutomationSuggestions(task);
                    return (
                      <Card key={task.id} className="overflow-hidden break-inside-avoid">
                        <div className="p-6 bg-gray-50 border-b">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-gray-800">#{index + 1} {task.taskName}</h3>
                            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Score: {task.score}</Badge>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                            <div><p className="text-sm text-gray-500">Handled by</p><p className="font-semibold">{task.whoHandles}</p></div>
                            <div><p className="text-sm text-gray-500">Frequency</p><p className="font-semibold">{frequencyValues[task.frequency]?.label}</p></div>
                            <div><p className="text-sm text-gray-500">Time per instance</p><p className="font-semibold">{task.timeSpent} mins</p></div>
                            <div><p className="text-sm text-gray-500">Annual impact</p><p className="font-semibold">{Math.round(task.annualHours)} hours</p></div>
                          </div>
                          {task.toolsUsed && <div><p className="text-sm text-gray-500">Current tools</p><p className="font-semibold">{task.toolsUsed}</p></div>}
                        </div>
                        <div className="p-6 bg-green-50">
                          <h4 className="text-lg font-bold text-green-800 mb-4">How to Automate: {automationGuide.title}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                              <h5 className="font-semibold text-gray-700 mb-3">Implementation Steps:</h5>
                              <ul className="space-y-2">
                                {automationGuide.steps.map((step, i) => <li key={i} className="flex items-start"><span className="font-bold text-green-600 mr-2">✓</span><p className="text-sm">{step}</p></li>)}
                              </ul>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-semibold text-gray-700 mb-2">Recommended Tools:</h5>
                                <div className="flex flex-wrap gap-2">
                                  {automationGuide.tools.map((tool, i) => <Badge key={i} variant="secondary">{tool}</Badge>)}
                                </div>
                              </div>
                              <div><p className="text-sm text-gray-500">Timeline</p><p className="font-semibold">{automationGuide.timeToImplement}</p></div>
                              <div><p className="text-sm text-gray-500">Difficulty</p><p className={`font-semibold ${automationGuide.difficulty === 'Easy' ? 'text-green-600' : automationGuide.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{automationGuide.difficulty}</p></div>
                              <Button onClick={() => window.open('https://cal.com/ailutions/15-minutes-strategy-call', '_blank')} size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">Get Help</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            <ReportFooter />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-10 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to Automate?</h3>
                <p className="opacity-90">Book a free strategy call to discuss your automation roadmap.</p>
              </div>
              <Button onClick={() => window.open('https://cal.com/ailutions/15-minutes-strategy-call', '_blank')} size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg text-lg"> 
                <Calendar className="w-5 h-5 mr-2" />
                Book Strategy Call
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <Button onClick={downloadPDF} size="lg" className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 rounded-lg text-lg">
            <Download className="w-5 h-5 mr-2" />
            Download Full Report as PDF
          </Button>
        </div>

      </main>
    </div>
  );
}
