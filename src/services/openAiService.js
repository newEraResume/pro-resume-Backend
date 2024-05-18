const OpenAI = require('openai');
let apiKey = "sk-proj-RMXaq8BrNpUgJdqGhMXRT3BlbkFJGAYPRqhJ6OKxSGyHlpMA";
const openai = new OpenAI.OpenAI({ apiKey: apiKey });

const enhancePrompt = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-3.5-turbo',
  });
  return completion;
};

module.exports = { enhancePrompt };
