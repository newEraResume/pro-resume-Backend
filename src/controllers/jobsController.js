const { getJobs } = require('../services/jobsServce');
const Job = require('../models/Jobs');

const jobsController = async (req, res) => {
  try {
    let { prompt } = req.body;
    if(!prompt){
        prompt = 'Software developer jobs';
    }
    const jobs = await getJobs(prompt);
    const mappedJobs = jobs?.data?.map(jobData => ({
      job_title: jobData?.job_title,
      job_required_skills: jobData?.job_required_skills,
      job_city: jobData?.job_city,
      job_description:jobData?.job_description ,
      employer_name: jobData?.employer_name,
      employer_logo:jobData?.employer_logo,
      job_publisher:jobData?.job_publisher,
      job_employment_type:jobData?.job_employment_type,
      job_apply_link:jobData?.job_apply_link,
      job_is_remote:jobData?.job_is_remote,
      job_state:jobData?.job_state,
      job_country:jobData?.job_country ,
      job_min_salary:jobData?.job_min_salary,
      job_max_salary:jobData?.job_max_salary
    }));

    // Save each mapped job to the database
    const savedJobs = [];
    for (const mappedJobData of mappedJobs) {
      const job = new Job(mappedJobData); // Assuming mappedJobData matches your Job model schema
      const savedJob = await job.save();
      savedJobs.push(savedJob);
    }

    res.json({ jobs });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getJobLists = async (req, res) => {
  try {
    const jobs = await Job.find(); // Retrieve all jobs from the database

    res.json({ jobs });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { jobsController , getJobLists};
