const mongoose = require("mongoose");

const OfferSchema = mongoose.Schema(
  {
    location: String,
    post_type: String,
    missions: String,
    skills: String,
    work_requirements: String,
    work_time: String,
    domain: String,
    salary: String,
    publication_date: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Offer", OfferSchema);
