const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const arrayMinLengthValidator = function (value) {
  return value && value.length > 0;
};

const userSchema = new Schema({
  form_details: {
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
      state:{
        type:String,
        required:false
      },
      city:{
        type:String,
        required:false
      },
      github:{
        type:String,
        required:false
      },
      linkdin:{
        type:String,
        required:false
      },
      others:{
        type:String,
        required:false
      }
    },
    education: {
      type: [Object],
      validate: [arrayMinLengthValidator, 'At least one education detail is required'],
      required: true
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
      validate: [arrayMinLengthValidator, 'At least one education detail is required'],
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    involvements: {
      type: String,
      required: false
    }
  },
  templateid: {
    type: [Number],
    validate: [arrayMinLengthValidator, 'At least one template ID is required']
  },
  applied_jobs: [Object],
  emailId: {
    type: String,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model("User", userSchema);
