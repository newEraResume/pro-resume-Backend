const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();
const openai = new OpenAI.OpenAI({ apiKey: process.env.OPEN_AI_KEY });

const enhancePrompt = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-3.5-turbo',
  });
  return completion;
};

module.exports = { enhancePrompt };
