const express = require("express");
const router = express.Router();

const {
  addpost,
  editpost,
  listAllposts,
  listpostById,
  removepost,
} = require("../controllers/postControllers.js");
const postModel = require("../models/postModel");

// add new post
router.post("/", async (req, res) => {
  const post = { ...req.body };
  try {
    const createdpost = await postModel.create(post);
    return res.json(createdpost);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// update post
router.put("/:id", async (req, res) => {
  const postData = { ...req.body };
  try {
    const post = await postModel.findByIdAndUpdate(req.params.id, postData);
    if (post) {
      return res.json(post);
    } else {
      return res.json({ Message: "post is not exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error In Deletion" });
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = postModel.findByIdAndRemove(req.params.id);
    if (post) {
      return res.json(post);
    } else {
      return res.json({ Message: "post is not exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error In Deletion" });
  }
});

//get all post
router.get("/", async (req, res) => {
  try {
    const post = await postModel.find({}).populate("author");
    if (post) {
      return res.json(post);
    } else {
      return res.json({ Message: "No post exist" });
    }
  } catch (error) {
    return res.status(500).send("Error In Retreival");
  }
});

//get post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post) {
      return res.json(post);
    } else {
      return res.json({ Message: "post is not exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error In Retreival" });
  }
});

module.exports = router;
