const ResumeDetailsModel = require("../models/ResumeDetails");

exports.getAllResume = async () => {
  return await ResumeDetailsModel.find();
};

exports.createResume = async (user) => {
  return await ResumeDetailsModel.create(user);
};
exports.getResumeById = async (id) => {
  return await ResumeDetailsModel.findById(id);
};

exports.updateResume = async (id, user) => {
  return await ResumeDetailsModel.findByIdAndUpdate(id, user);
};

exports.deleteResume = async (id) => {
  return await ResumeDetailsModel.findByIdAndDelete(id);
};

exports.getResumeByEmail = async (emailId) => {
  return await ResumeDetailsModel.findOne({ emailId: emailId });
}
