const express = require("express");
const router = express.Router();
router.use(express.json());
const axios = require("axios");

router.post("/translate-recipe-34389792", async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`,
      {
        q: text,
        target: targetLang,
        format: "text",
      }
    );

    const translated = response.data.data.translations[0].translatedText;
    res.json({ translated });
  } catch (err) {
    console.error("Translation Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

module.exports = router;