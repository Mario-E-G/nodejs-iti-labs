const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoute.js");
const postRoutes = require("./routes/postRoute.js");
const userModel = require("./model/userModel.js");
const auth = require("./middleware/auth.js");
const postModel = require("./model/postModel.js");
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const app = express();
app.use(express.json());

app.use("/post", auth, postRoutes);
app.use("/user", userRoutes);

app.use(
  morgan(
    "Method: :method - URL: :url - STATUS: :status - RESPONSE TIME: :response-time ms - DATE: :date[clf]"
  )
);

app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(first_name && last_name && email && password)) {
      return res.status(400).json({ Message: "All inputs required" }); //shlt al return
    }

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(409).json({ Message: "User Already Exist" });
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      // dft await
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const generatedToken = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY
    );
    user.token = generatedToken;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({ Message: "All inputs required" });
    }

    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY
      );
      user.token = token;
      return res.status(200).json(user);
    }
    return res.status(400).json({ Message: "Invalid input" });
  } catch (error) {
    console.log(error);
  }
});

app.use("/welcome", auth, (req, res) => {
  let userId = req.user.user_id;
  postModel
    .find({ author: userId }, (err, post) => {
      if (!err) {
        if (post) {
          return res.json(post);
        } else {
          return res.json({ Message: "post is not exist" });
        }
      } else {
        return res.status(500).send({ Message: "Error In Retreival" });
      }
    })
    .populate({ path: "author", select: ["firstName", "lastName"] });
  // return res.status(200).json({ Message: "Welcome *__*" });
});

mongoose.connect(DB_URL, (err) => {
  if (!err)
    return console.log(
      "*-----------------------Connected to db---------------------*"
    );
  return console.log("Error in db");
});

app.listen(process.env.PORT, (err) => {
  if (!err)
    return console.log(
      `*------------------Server Starts on PORT (${PORT})---------------------*`
    );
  return console.log("Error in connection");
});
