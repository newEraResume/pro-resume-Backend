const { enhancePrompt } = require('../services/openAiService');

const updateResumeController = async (req, res) => {
  try {
    let { formdetails , job_description , required_skills } = req.body;
    let prompt = `I am updating my resume so please Modify skills and summary in form dtails object and return only updated form details as response based on the provide job description and required skills . Please keep the key of form details objects unhindered and only updated the required fields like skills , summary etc - formdetails - ${formdetails} jobdescription-${job_description} ${ required_skills ? 'required skills' - required_skills : ''}`;
    const completion = await enhancePrompt(prompt);
    res.json({ completion });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { updateResumeController };
