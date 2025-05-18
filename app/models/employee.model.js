const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    image: {
      type: String,
      required: true
    },
    city: {
      type: String,
      // required: true
    },
    salary: {
      type: Number,
    },
    payment: {
      type: Date,
    }, 
    phone: {
      type: Number,
    },
    position: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', EmployeeSchema);
