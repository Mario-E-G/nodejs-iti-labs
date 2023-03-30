const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    required: [true, "Email Is Required"],
  }, // minlength for strings
  lastName: String,
  email: {
    type: String,
    unique: [true, "Email Is Exists"],
    match: /.+@.+\..+/,
    required: [true, "Email Is Required"],
  },
  age: { type: Number, min: 18 }, //min for numbers,
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
