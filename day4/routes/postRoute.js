const express = require("express");
const router = express.Router();
// const {
//   addpost,
//   editpost,
//   listAllposts,
//   listpostById,
//   removepost,
// } = require("../controllers/postControllers.js");
const postModel = require("../model/postModel");

// add new post
router.post("/", (req, res) => {
  const post = { ...req.body };
  postModel.create(post, (err, createdpost) => {
    if (!err) {
      return res.json(createdpost);
    } else {
      return res.status(500).send("Error In Post Creation");
    }
  });
});

// update post
router.put("/:id", (req, res) => {
  // let result = editpost(req.body);
  const postData = { ...req.body };
  postModel.findByIdAndUpdate(req.params.id, postData, (err, post) => {
    if (!err) {
      if (post) {
        return res.json(post);
      } else {
        return res.json({ Message: "post is not exist" });
      }
    } else {
      return res.status(500).send({ Message: "Error In Post Deletion" });
    }
  });
});

//delete post
router.delete("/:id", (req, res) => {
  // let result = removepost(req.body);
  postModel.findByIdAndRemove(req.params.id, (err, post) => {
    if (!err) {
      if (post) {
        return res.json(post);
      } else {
        return res.json({ Message: "post is not exist" });
      }
    } else {
      return res.status(500).send({ Message: "Error In Deletion" });
    }
  });
});

//get all post
router.get("/", (req, res) => {
  postModel
    .find({}, (err, posts) => {
      if (!err) {
        if (posts) {
          return res.json(posts);
        } else {
          return res.json({ Message: "No post exist" });
        }
      } else {
        return res.status(500).send("Error In Retreival");
      }
    })
    .populate({ path: "author", select: ["firstName", "lastName"] });
});

//get post by id
router.get("/:id", (req, res) => {
  // let result = listpostById(req.body);
  postModel.findById(req.params.id, (err, post) => {
    if (!err) {
      if (post) {
        return res.json(post);
      } else {
        return res.json({ Message: "post is not exist" });
      }
    } else {
      return res.status(500).send({ Message: "Error In Retreival" });
    }
  });
});

module.exports = router;
