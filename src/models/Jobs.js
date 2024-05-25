const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  job_title: {
    type: String,
    required: true
  },
  job_required_skills: {
    type: [String],
    required: false
  },
  job_city: {
    type: String,
    required: false
  },
  job_description: {
    type: String,
    required: true
  },
  employer_name: {
    type: String,
    required: true
  },
  employer_logo: {
    type: String,
    required: false
  },
  job_publisher: {
    type: String,
    required: false
  },
  job_employment_type: {
    type: String,
    required: false
  },
  job_apply_link: {
    type: String,
    required: true
  },
  job_is_remote: {
    type: Boolean,
    required: false
  },
  job_state: {
    type: String,
    required: false
  },
  job_country: {
    type: String,
    required: false
  },
  job_min_salary: {
    type: Number,
    required: false
  },
  job_max_salary: {
    type: Number,
    required: false
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
