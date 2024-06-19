const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userProfileSchema = new Schema({
  details: {
    personal_details: {
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      phone:{
        type:Number,
        required:true
      },
    },
    education: {
      type: [Object],
      required: false
    },
    work_experience: {
      type: [Object],
      required: false
    },
    projects: {
      type: [Object],
      required: false
    },
    skills: {
      type: [String],
      required: false
    },
    intrestedDomains:{
      type: [String],
      required: false
    },
    summary: {
      type: String,
      required: false
    },
    links: {
      linkedin:{
        type: String,
        required: false 
      },
      github: {
        type: String,
        required: false
      },
      others: {
        type: String,
        required: false
      },
    },
    location: {
      city:{
        type: String,
        required: false 
      },
      state: {
        type: String,
        required: false
      },
      postal: {
        type: String,
        required: false
      },
    }
  },
  applied_jobs: [Object],
  isOnboarded:{
    type:Boolean,
    required:true,
    default:false
  },
  jobSeekerType:{
    type:String,
    required:false
  },
  emailId: {
    type: String,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model("userProfile", userProfileSchema);
