const express = require("express");
const router = express.Router();
router.use(express.json());

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: "YOUR_API_KEY",
});

router.post("/ai-analysis-34389792", async (req, res) => {
  try {
    const ingredients = req.body.ingredients;
    const prompt = `
      Analyze the overall healthiness of this recipe based on its ingredients,
      and provide suggestions for improving nutritional balance:
      ${ingredients}.
      Please include a short summary of nutritional insights and improvement ideas.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ output: response.text });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
