/**
 * Backend API route for generating flashcards.
 * 
 * Responsibilities:
 * 1. Receive topic input from frontend.
 * 2. Call OpenAI API with a structured system prompt.
 * 3. Return a flashcard in a standardized JSON format.
 * 4. Support both local development and Vercel production.
 * --------------------------------------
 */

import OpenAI from "openai";

/**
 * - In production: API key is read from Vercel environment variable.
 * - In local development: fallback reads from process.env (after loading .env.local).
 */
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * API Route Handler.
 * @param {Object} req - Incoming HTTP request.
 * @param {Object} res - Outgoing HTTP response.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST instead." });
  }

  const { topic, quizMode } = req.body;

  if (!topic || typeof topic !== "string") {
    return res.status(400).json({
      error:
        "Invalid input. Please provide a non-empty 'topic' field in your request body."
    });
  }

  try {
    // AI PROMPT CONFIGURATION

    const systemPrompt = `
      You are a helpful AI tutor specializing in concise educational flashcards.
      Respond with clear Markdown formatting.
      Include both **Front** (question) and **Back** (answer).
      When math is involved, format equations using LaTeX.
      If quizMode is enabled, craft the "Front" as a challenge question.
    `;

    const userPrompt = quizMode
      ? `Generate a QUIZ-STYLE flashcard about: ${topic}`
      : `Generate a STANDARD flashcard about: ${topic}`;

    // CALL OPENAI
    
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    const flashcard =
      completion.choices[0]?.message?.content?.trim() ||
      "No content was returned by the AI.";

    return res.status(200).json({ flashcard });
  } catch (err) {
    console.error("OpenAI API Error:", err);
    return res.status(500).json({
      error:
        "An internal error occurred while generating the flashcard. Please try again later."
    });
  }
}
