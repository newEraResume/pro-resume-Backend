const resumeDetailsService = require("../services/resumeDetailsService");

exports.getAllResume = async (req, res) => {
  try {
    const users = await resumeDetailsService.getAllResume();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createResume = async (req, res) => {
  try {
    const { emailId } = req.body;
    const existingUser = await resumeDetailsService.getResumeByEmail(emailId);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const user = await resumeDetailsService.createResume(req.body);
    res.json({ data: user, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const user = await resumeDetailsService.getResumeById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const user = await resumeDetailsService.updateResume(req.params.id, req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const user = await resumeDetailsService.deleteResume(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
