import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '../components/ui/button';

const Report = React.forwardRef(({ score, categoryScores, maturityStage, analysis }, ref) => {
  const COLORS = { A: '#4CAF50', B: '#FFC107', C: '#FF5722', D: '#F44336' };

  const getCategoryStatus = (score) => {
    if (score >= 8) return { text: 'Excellent', color: 'bg-green-500' };
    if (score >= 6) return { text: 'Good', color: 'bg-yellow-500' };
    if (score >= 4) return { text: 'Needs Improvement', color: 'bg-orange-500' };
    return { text: 'Critical', color: 'bg-red-500' };
  };

  return (
    <div ref={ref} className="p-8 bg-white text-gray-800">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900">Digital Maturity Report</h1>
        <p className="text-xl mt-2 text-gray-600">Generated for: Ailutions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center bg-gray-50 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Overall Maturity</h2>
          <p className={`text-6xl font-extrabold ${maturityStage.color}`}>{maturityStage.name}</p>
          <p className="text-2xl font-semibold text-gray-700 mt-2">Score: {score.toFixed(2)}%</p>
        </div>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={[{ name: 'Score', value: score }, { name: 'Remaining', value: 100 - score }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} innerRadius={80} startAngle={90} endAngle={-270} cornerRadius={5} paddingAngle={2}>
                <Cell fill={maturityStage.pieColor} />
                <Cell fill="#e0e0e0" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">Current Status Analysis</h2>
        <p className="text-lg leading-relaxed text-gray-700">{analysis.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Key Strengths</h3>
          <ul className="list-disc list-inside space-y-2 text-green-700">
            {analysis.strengths.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
        <div className="bg-red-50 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold text-red-800 mb-4">Areas for Improvement</h3>
          <ul className="list-disc list-inside space-y-2 text-red-700">
            {analysis.challenges.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">Category Breakdown</h2>
        <div className="space-y-6">
          {Object.entries(categoryScores).map(([key, value]) => {
            const status = getCategoryStatus(value.score);
            return (
              <div key={key} className="bg-gray-100 p-4 rounded-lg flex items-center justify-between shadow-sm">
                <p className="text-xl font-semibold text-gray-800">{value.name}</p>
                <div className="flex items-center space-x-4">
                    <p className="text-lg font-bold">{value.score.toFixed(1)} / 10</p>
                    <span className={`px-4 py-1 text-sm font-semibold text-white rounded-full ${status.color}`}>{status.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">Detailed Recommendations</h2>
        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            {analysis.recommendations.map((item, index) => <p key={index}>• {item}</p>)}
        </div>
      </div>

      <div className="bg-blue-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">What to Do Next</h2>
        <ol className="list-decimal list-inside space-y-4 text-lg text-blue-900">
          <li><strong>Review & Prioritize:</strong> Go through the recommendations and identify the highest-impact, lowest-effort tasks.</li>
          <li><strong>Create a Roadmap:</strong> Develop a 3-6 month plan to address the identified areas for improvement.</li>
          <li><strong>Assign Ownership:</strong> Make specific team members responsible for each initiative.</li>
          <li><strong>Seek Expertise:</strong> Don't hesitate to bring in external help for areas where your team lacks expertise, like AI integration or ERP implementation.</li>
          <li><strong>Book a Strategy Call:</strong> Schedule a free call with our experts to discuss your results and create a tailored action plan.</li>
        </ol>
      </div>

      <div className="mt-12 text-center text-gray-500">
        <p>This report was generated by Ailutions' Digital Maturity Tracker.</p>
        <p>www.ailutions.ai</p>
      </div>
    </div>
  );
});

export default Report;
