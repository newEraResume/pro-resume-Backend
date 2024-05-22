const { getJobs } = require('../services/jobsServce');

const jobsController = async (req, res) => {
  try {
    let { prompt } = req.body;
    if(!prompt){
        prompt = 'Software developer jobs';
    }
    const jobs = await getJobs(prompt);
    res.json({ jobs });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { jobsController };
