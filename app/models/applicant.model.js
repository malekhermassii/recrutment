// model
const mongoose = require("mongoose");

const ApplicantSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    village: String,
    birthDate: Date,
    experienceLevel: String,
    phone: Number,
    work: String, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Applicant", ApplicantSchema);