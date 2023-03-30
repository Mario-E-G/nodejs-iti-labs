const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = function (req, res, next) {
  const token = req.headers["token"];
  if (!token) return res.status(400).json({ Message: "token require" });

  try {
    const tokenVerification = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = tokenVerification;
    return next();
  } catch (error) {
    return res.status(400).json({ Message: "Wrong Token" });
  }
};

module.exports = auth;
