const ResumeDetails = require('../models/ResumeDetails');
const { enhancePrompt } = require('../services/openAiService');

const getAtsScores = async (req, res) => {
  try {
    let { job_description ,emailId } = req.body;
    const resumeDetails = await ResumeDetails.findOne({ emailId: emailId });
    if (!resumeDetails) {
      return res.status(404).json({ error: 'User Not Found' , status:404 });
    }
    const formdetails = resumeDetails?.form_details;
    prompt = `Please provide a similarity score like ats ,  based on the formdetails and the given job description . Please give response in key value pair for seperate fields in formdetails
    formdetails - ${formdetails}
    job description - ${job_description}`;
    const completion = await enhancePrompt(prompt);
    let content = completion.choices[0].message.content;
    res.json(JSON.parse(content));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAtsScores };
