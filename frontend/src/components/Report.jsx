
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Check, Zap, Target } from 'lucide-react';

// New, more robust Report component
const Report = React.forwardRef(({ score, categoryScores, maturityStage, analysis, aiReport, userInfo }, ref) => {

  const getCategoryStatus = (score) => {
    if (score >= 8) return { text: 'Excellent', color: 'bg-green-500' };
    if (score >= 6) return { text: 'Good', color: 'bg-yellow-500' };
    if (score >= 4) return { text: 'Needs Improvement', color: 'bg-orange-500' };
    return { text: 'Critical', color: 'bg-red-500' };
  };

  return (
    <div ref={ref} className="p-4 sm:p-8 bg-white text-gray-800 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Digital Maturity Report</h1>
        {userInfo?.company && <p className="text-lg sm:text-xl mt-2 text-gray-600">Prepared for: {userInfo.company}</p>}
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Overall Maturity</h2>
          <p className={`text-5xl sm:text-6xl font-extrabold ${maturityStage.color}`}>{maturityStage.name}</p>
          <p className="text-2xl font-semibold text-gray-700 mt-2">Score: {score.toFixed(1)}%</p>
        </div>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={[{ name: 'Score', value: score }, { name: 'Remaining', value: 100 - score }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} innerRadius={80} startAngle={90} endAngle={-270} cornerRadius={5} paddingAngle={2}>
                <Cell fill={maturityStage.pieColor} />
                <Cell fill="#e0e0e0" />
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-gray-800">
                {`${score.toFixed(0)}%`}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">Executive Summary</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          {/* Conditional Rendering: Use AI summary or fallback */}
          {aiReport?.executiveSummary || analysis?.summary || "Your analysis summary will appear here."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Personalized Recommendations</h2>
        <div className="space-y-6">
          {/* Bug Fix & Conditional Rendering: Check for aiReport and personalizedRecommendations before mapping */}
          {aiReport?.personalizedRecommendations?.map((item, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-sm flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                    <Zap size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-blue-800">{item.title}</h3>
                    <p className="text-gray-700 mt-1">{item.description}</p>
                </div>
            </div>
          )) || (
            // Fallback to static analysis
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                {analysis?.recommendations?.map((item, index) => <p key={index}>• {item}</p>)}
            </div>
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Strategic Action Plan</h2>
        <div className="space-y-6">
            {/* Bug Fix & Conditional Rendering: Check for aiReport and actionPlan before mapping */}
            {aiReport?.actionPlan?.map((item, index) => (
                 <div key={index} className="bg-green-50 p-6 rounded-lg shadow-sm flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-4">
                        <Target size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-green-800">{item.step}</h3>
                        <p className="text-gray-700 mt-1">{item.description}</p>
                    </div>
                </div>
            )) || (
              <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-lg text-gray-700">Your prioritized action plan will be displayed here once your report is generated.</p>
              </div>
            )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Category Breakdown</h2>
        <div className="space-y-4">
          {/* Bug Fix: Check for categoryScores before mapping */}
          {Object.entries(categoryScores || {}).map(([key, value]) => {
            const status = getCategoryStatus(value.score);
            return (
              <div key={key} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between shadow-sm">
                <p className="text-lg font-semibold text-gray-800">{value.name}</p>
                <div className="flex items-center space-x-4">
                    <p className="text-xl font-bold">{value.score.toFixed(1)}/10</p>
                    <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${status.color}`}>{status.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>This report was generated by the Ailutions Digital Maturity Tracker.</p>
        <p>www.ailutions.ai</p>
      </footer>
    </div>
  );
});

export default Report;
