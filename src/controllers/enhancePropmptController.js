const { enhancePrompt } = require('../services/openAiService');

const enhancePromptController = async (req, res) => {
  try {
    let { prompt } = req.body;
    prompt = `restructure the sentence in a more prominent and impressive way in 50 words - + ${prompt}`;
    const completion = await enhancePrompt(prompt);
    res.json({ completion });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { enhancePromptController };
