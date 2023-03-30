const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: 2,
    // required: [true, "Firstname required"],
  },
  last_name: {
    type: String,
    minlength: 2,
    // required: [true, "lastname required"],
  },
  email: { type: String, unique: true },
  password: { type: String },
  token: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
