const { enhancePrompt } = require('../services/openAiService');

const getSkillsFromProjectsAndExperiences = async (req, res) => {
  try {
    const { projects, experiences } = req.body;
    const prompt = `
      Projects: ${projects.join(', ')}
      Experiences: ${experiences.join(', ')}
      Please generate a list of skills in array form based on the provided projects and experiences.
    `;
    const completion = await enhancePrompt(prompt);
    const content = completion.choices[0].message.content;
    res.json(JSON.parse(content))
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getSkillsFromProjectsAndExperiences };
