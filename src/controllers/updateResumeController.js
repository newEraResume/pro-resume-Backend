const { enhancePrompt } = require('../services/openAiService');
const  ResumeDetails  = require('../models/ResumeDetails'); // Assuming you have a ResumeDetails model

const updateResumeController = async (req, res) => {
  try {
    const { emailId, job_description, required_skills } = req.body;
    const resumeDetails = await ResumeDetails.findOne({ emailId: emailId });
    if (!resumeDetails) {
      return res.status(404).json({ error: 'User Not Found' , status:404 });
    }
    const formdetails = resumeDetails?.form_details;
    let prompt = `
      I am updating my resume so please modify skills and summary in the form details object by suggesting more meaningful skills and summary based on the job_description.Please suggest at least 3-4 extra skills
      and return only updated form details as response based on the provided job description and required skills.
      Please keep the keys of form details objects unchanged and only update the required fields like skills, summary, etc.
      formdetails - ${JSON.stringify(formdetails)}
      jobdescription - ${job_description}
      ${required_skills ? `required skills - ${required_skills}` : ''}
    `;

    const completion = await enhancePrompt(prompt);
    const content = completion.choices[0].message.content;
    res.json(JSON.parse(content))
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { updateResumeController };
