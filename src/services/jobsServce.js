const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const getJobs = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: query,
          page: '1',
          num_pages: '1'
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };
  try {
    const response = await axios.request(options);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const getJobsByFilter = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: query?.title,
          actively_hiring: query?.actively_hiring,
          job_titles: query?.job_titles,
          employment_types: query?.employment_types,
          remote_jobs_only: query?.remote_jobs_only,
          date_posted: query?.date_posted,
          page: '1',
          num_pages: '1'
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return error;
  }
};

module.exports =  { getJobs , getJobsByFilter };
