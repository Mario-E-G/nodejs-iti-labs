const express = require("express");
const router = express.Router();
const {
  addUser,
  editUser,
  listAllUsers,
  listUserById,
  removeUser,
} = require("../controllers/userControllers.js");
const userModel = require("../models/userModel");

// add new user
router.post("/", addUser);

// update user
router.put("/:id", editUser);

//delete user
router.delete("/:id", removeUser);

//get all user
router.get("/", listAllUsers);

//get user by id
router.get("/:id", listUserById);

module.exports = router;
