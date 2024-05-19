const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  contact: Object,
  education: Object,
  experience: Object,
  projects: Object,
  skills:String,
  summary:String,
  involvements:String
});

module.exports = mongoose.model("User", userSchema);
