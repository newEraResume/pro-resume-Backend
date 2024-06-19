const userDetailsModel = require("../models/UserProfile");

exports.getAllUserProfile = async () => {
  return await userDetailsModel.find();
};

exports.createUserProfile = async (user) => {
  return await userDetailsModel.create(user);
};

exports.getUserProfileByEmailId = async (emailId) => {
    try {
      const userProfile = await userDetailsModel.findOne({ emailId: emailId });
      return userProfile;
    } catch (error) {
      console.error("Error fetching user profile by email:", error);
      throw error;
    }
  };

exports.updateUserProfileByEmail = async (emailId, user) => {
    try {
        console.log(user);
      const updatedUser = await userDetailsModel.findOneAndUpdate({ emailId: emailId }, user, { new: true });
      return updatedUser;
    } catch (error) {
      console.error("Error updating user profile by email:", error);
      throw error;
    }
  };
 
exports.deleteUserProfileByEmail = async (emailId) => {
    try {
      const deletedUser = await userDetailsModel.findOneAndDelete({ emailId: emailId });
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user profile by email:", error);
      throw error;
    }
  };
