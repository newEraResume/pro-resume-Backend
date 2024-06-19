const userProfileService = require("../services/userProfileService");

exports.getAllUserProfiles = async (req, res) => {
  try {
    const users = await userProfileService.getAllUserProfile();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUserProfile = async (req, res) => {
  try {
    const { emailId } = req.body;
    const existingUser = await userProfileService.getUserProfileByEmailId(emailId);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const user = await userProfileService.createUserProfile(req.body);
    res.json({ data: user, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getuserProfileByEmailId = async (req, res) => {
  try {
    const { emailId } = req.body;
    if (!emailId) {
      return res.status(400).json({ error: 'Please Provide valid Email Id' });
    }
    const user = await userProfileService.getUserProfileByEmailId(emailId);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const {emailId , userprofileDetails} = req.body;
    if (!emailId) {
        return res.status(400).json({ error: 'Please Provide valid Email Id' });
    }
    console.log(userprofileDetails);
    const user = await userProfileService.updateUserProfileByEmail(emailId, userprofileDetails);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteuserProfile = async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await userProfileService.deleteUserProfileByEmail(emailId);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
