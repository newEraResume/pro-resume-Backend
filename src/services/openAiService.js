const OpenAI = require('openai');
const openai = new OpenAI.OpenAI({ apiKey: "sk-proj-qS6YPKe9d3HskjELkhjUT3BlbkFJOOYlmxyqr3dtN9Y569KV" });

const enhancePrompt = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-3.5-turbo',
  });
  return completion;
};

module.exports = { enhancePrompt };
