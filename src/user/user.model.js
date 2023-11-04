const mongoose = require("mongoose");
const ROLE_ENUM = require("../utils/constants");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  role: {
    type: String,
    enum: Object.values(ROLE_ENUM),
    default: ROLE_ENUM.PUBLIC,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  otp: {
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
