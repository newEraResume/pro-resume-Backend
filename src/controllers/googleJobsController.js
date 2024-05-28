const { getJobs } = require('../services/jobsServce');
const Job = require('../models/Jobs');

const googleJobsController = async (req, res) => {
  const SerpApi = require("google-search-results-nodejs");
  const search = new SerpApi.GoogleSearch("ca90325171cf558d387bfb1f51740abcc9f04dde5da5a0bb74f9daec70ca689c");

  const { searchString } = req.body; // what we want to search

  const params = {
    engine: "google_jobs", // search engine
    q: searchString, // search query
    hl: "en", // Parameter defines the language to use for the Google search
  };

  const getJson = () => {
    return new Promise((resolve) => {
      search.json(params, resolve);
    });
  };

  const getResults = async () => {
    const organicResults = [];
    while (true) {
      const json = await getJson();
      if (json.search_information?.jobs_results_state === "Fully empty") break;
      organicResults.push(...json.jobs_results);
      params.start ? (params.start += 10) : (params.start = 10);
    }
    return organicResults;
  };

  try {
    const results = await getResults();
    res.json(results); // Send results back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching job listings' });
  }
};

module.exports = { googleJobsController };
