
const { GoogleGenerativeAI } = require("@google/generative-ai");

// IMPORTANT: Set the Gemini API key in your Vercel project environment variables
// The key should be named GEMINI_API_KEY
const geminiApiKey = process.env.GEMINI_API_KEY;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!geminiApiKey) {
    console.error("Gemini API key is not configured.");
    return res.status(500).json({ error: "Server configuration error." });
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const { answers, results } = req.body;

  if (!answers || !results) {
    return res.status(400).json({ error: 'The request must include "answers" and "results".' });
  }

  const prompt = `
    You are an expert digital transformation consultant and business strategist, providing a detailed analysis for a business that has just completed a digital maturity assessment. Your tone should be encouraging, professional, and highly specific, avoiding generic advice.

    Here is the user's assessment data:
    - Overall Score: ${results.score.toFixed(2)}%
    - Maturity Stage: ${results.maturityStage.name}

    - Category Scores:
      ${Object.values(results.categoryScores).map(cat => `- ${cat.name}: ${cat.score.toFixed(2)}/10`).join('\n')}

    Here's a brief explanation of each category:
    - **Strategy & Leadership:** Vision, planning, and leadership support for digital initiatives.
    - **Process & Operations:** How streamlined and automated the core business processes are.
    - **Data & Decisions:** How data is used to make informed decisions.
    - **Automation & Technology:** The tools and technologies used to automate tasks.
    - **Security & Compliance:** Measures to protect data and comply with regulations.
    - **Customer & People:** The digital customer experience and the team's digital skills.

    Based on this data, generate a comprehensive and personalized report in a valid JSON format. The report must contain the following three sections:

    1.  **executiveSummary**: A concise, insightful paragraph (3-4 sentences) that interprets the user's overall situation. Go beyond simply listing the scores. Analyze the *relationship* between the high-scoring and low-scoring areas to provide a nuanced overview. For example, connect a low score in "Automation" to a low score in "Process & Operations".

    2.  **personalizedRecommendations**: An array of 3 highly specific, actionable recommendations. Each recommendation must be an object with a "title" and a "description". The description should include concrete examples, and where appropriate, suggest specific types of tools or strategies. These recommendations must be directly tailored to the user's unique strengths and weaknesses shown in the category scores.

    3.  **actionPlan**: An array of 2-3 prioritized steps for the next 1-6 months. Each step must be an object with a "step" (e.g., "Step 1: The First 30 Days") and a "description".
        - The first step must be a "Quick Win": a high-impact, low-effort action that the user can take in the next 30 days to build momentum.
        - Subsequent steps should build on the quick win and address the most critical areas for improvement.

    The entire output must be a single, valid JSON object and nothing else.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const cleanedText = text.replace(/\`\`\`json\n|\`\`\`/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);

    res.status(200).json(jsonResponse);

  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    res.status(500).json({ error: 'Failed to generate the report.' });
  }
};
