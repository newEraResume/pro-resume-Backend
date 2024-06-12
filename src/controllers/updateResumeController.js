const { enhancePrompt } = require('../services/openAiService');
const  ResumeDetails  = require('../models/ResumeDetails'); // Assuming you have a ResumeDetails model

const createPrompt = (data) => {
  const { job_description, summary, projects, work_exp, required_skills } = data;

  return `
    Here is the provided data:
    job description - ${job_description}
    summary - ${summary && summary.length > 0 ? summary : "N/A"}
    project work - ${JSON.stringify(projects)}
    work experience - ${JSON.stringify(work_exp)}
    ${required_skills ? `required skills - ${required_skills.join(", ")}` : ''}

    I need a comprehensive analysis based on the job description, project work, and work experience provided. The output should include the following:

    1. Skills: An array form of categorized list of skills in JSON format, where keys are the categories (like Programming Languages, Frameworks, Databases, Domains, Tools/Technologies, Soft Skills) and the values are the relevant skills. Include both the required skills mentioned and any inferred from the projects and work experience provided below.
    2. Summary:An array form of a short professional summary relevant to the job description, project work, and work experience. Take the above entered summary (only if it is given) into account. Limit to 4 lines. 
    3. Projects:An array form of Rephrased project descriptions for the resume in sequential order, without using pronouns (the projects are of the JSON format, {projectname: description}). Tailor it to the job description, highlighting key skills relevant to the job. Provide the result in the same JSON format as entered.
    4. Work Experience:An array form of Rewritten work experience descriptions in sequential order, without using pronouns (the work experiences are of the JSON format, {jobtitle: description}). Ensure the rewritten text is as short and concise as possible, removing unnecessary details while keeping all important ones to improve my chances of getting the job. Provide the result in the same JSON format as entered.

    Haha, I know you skipped my output details request, reread them again and ENSURE THAT ALL POINTS ARE FOLLOWED PROPERLY, also ENSURE THAT RESULT IS HUMANIZED. Final output should be in JSON format like {skills: [output of pt1], summary: [output of pt2], projects: [output of pt3], work_experience: [output of pt4]}.
  `;
};

const updateResumeController = async (req, res) => {
  try {
    const { emailId, job_description, required_skills } = req.body;
    const resumeDetails = await ResumeDetails.findOne({ emailId: emailId });
    if (!resumeDetails) {
      return res.status(404).json({ error: 'User Not Found' , status:404 });
    }
    const formdetails = resumeDetails?.form_details;
    const {summary, projects, work_experience} = formdetails;
    const data = {
      summary:summary,
      projects:projects,
      work_exp:work_experience,
      job_description:job_description,
      required_skills:required_skills
    }
    let prompt = createPrompt(data);
    let responseFormDetails = {...formdetails};
    const completion = await enhancePrompt(prompt);
    const content = completion.choices[0].message.content;
    let openAiAnswer = JSON.parse(content);
    responseFormDetails.skills = openAiAnswer.skills;
    responseFormDetails.summary = openAiAnswer.summary;
    responseFormDetails.work_experience = openAiAnswer.work_experience;
    responseFormDetails.projects = openAiAnswer.projects;

    res.json(responseFormDetails)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { updateResumeController };
