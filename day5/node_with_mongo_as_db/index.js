const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 6000;
const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post.js");

// Middleware to translate into json
app.use(express.json());

// Middleware To log all action happen to DB
app.use(
  morgan(
    "Method: :method - URL: :url - STATUS: :status - RESPONSE TIME: :response-time ms - DATE: :date[clf]"
  )
);

app.use("/user", userRoutes);
app.use("/post", postRoutes);

mongoose.connect("mongodb://localhost:27017/blogs", (err) => {
  if (!err)
    return console.log(
      "*-----------------------Connected to db---------------------*"
    );
  return console.log("Error in db");
});

app.listen(PORT, (err) => {
  if (!err)
    return console.log(
      `*------------------Server Starts on PORT (${PORT})---------------------*`
    );
});
