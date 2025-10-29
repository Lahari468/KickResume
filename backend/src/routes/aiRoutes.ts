import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

router.post("/generate-summary", async (req, res) => {
  try {
    const { personalInfo, skills, experience, education } = req.body;

    // 🧠 Build prompt dynamically
    const prompt = `
Write a concise, professional resume summary for ${personalInfo.fullName || "a candidate"}.
Consider their skills, experience, and education below:
Skills: ${skills.map((s: any) => s.name).join(", ")}
Experience: ${experience.map((e: any) => `${e.position} at ${e.company}`).join("; ")}
Education: ${education.map((e: any) => `${e.degree} in ${e.field}`).join("; ")}
Keep it under 80 words, in a confident, professional tone.
`;

    // ✅ OpenAI v4+ syntax
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // can also use "gpt-4-turbo" or "gpt-3.5-turbo"
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const summary = completion.choices[0]?.message?.content?.trim();
    res.json({ summary });
  } catch (error: any) {
    console.error("❌ OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to generate summary",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
