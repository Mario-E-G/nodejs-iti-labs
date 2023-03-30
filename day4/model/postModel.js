const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, minlength: 2, require: true },
  body: { type: String, minlength: 2, require: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
