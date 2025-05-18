const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
