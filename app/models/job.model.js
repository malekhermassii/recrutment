const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    locationAddress: {
      type: String,
    },
    postType: {
      type: String,
    },
    missions: {
      type: String,
    },
    skills: {
      type: String,
    },
    workRequirements: {
      type: String,
    },
    startTime: {
      type: String,
      // type: Date,
      // validate: {
      //   validator: function(value) {
      //     // Check if the value is a valid time
      //     return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      //   },
      //   message: 'Invalid time format. Time should be in the format HH:MM (24-hour).'
      // }
    },
    endTime: {
      type: String,
      // type: Date,
      // validate: {
      //   validator: function(value) {
      //     // Check if the value is a valid time
      //     return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      //   },
      //   message: 'Invalid time format. Time should be in the format HH:MM (24-hour).'
      // }
    }

    ,
    domain: {
      type: String,
    },
    salary: {
      type: Number,
    },
    postDate: {
      type: Date,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", JobSchema);
