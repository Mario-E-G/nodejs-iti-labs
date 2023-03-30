const express = require("express");
// const { model } = require("mongoose");
const router = express.Router();
// const {
//   addUser,
//   editUser,
//   listAllUsers,
//   listUserById,
//   removeUser,
// } = require("../controllers/userControllers.js");
const userModel = require("../model/userModel");

// add new user
router.post("/", (req, res) => {
  const user = { ...req.body };
  userModel.create(user, (err, createdUser) => {
    if (!err) {
      return res.json(createdUser);
    } else {
      return res.status(500).send(err.message);
    }
  });
});

// update user
router.put("/:id", (req, res) => {
  // let result = editUser(req.body);
  const userData = { ...req.body };
  userModel.findByIdAndUpdate(req.params.id, userData, (err, user) => {
    if (!err) {
      if (user) {
        return res.json(user);
      } else {
        return res.json({ Message: "User is not exist" });
      }
    } else {
      return res.status(500).send({ Message: "Error In Deletion" });
    }
  });
});

//delete user
router.delete("/:id", (req, res) => {
  // let result = removeUser(req.body);
  userModel.findByIdAndRemove(req.params.id, (err, user) => {
    if (!err) {
      if (user) {
        return res.json(user);
      } else {
        return res.json({ Message: "User is not exist" });
      }
    } else {
      return res.status(500).send({ Message: "Error In Deletion" });
    }
  });
});

//get all user
router.get("/", (req, res) => {
  userModel.find({}, (err, users) => {
    if (!err) {
      if (users) {
        return res.json(users);
      } else {
        return res.json({ Message: "No User exist" });
      }
    } else {
      return res.status(500).send("Error In Retreival");
    }
  });
});

//get user by id
router.get("/:id", (req, res) => {
  // let result = listUserById(req.body);
  userModel.findById(req.params.id, (err, user) => {
    if (!err) {
      if (user) {
        return res.json(user);
      } else {
        return res.json({ Message: "User is not exist" });
      }
    } else {
      return res.status(500).send({ Message: "Error In Retreival" });
    }
  });
});

module.exports = router;
