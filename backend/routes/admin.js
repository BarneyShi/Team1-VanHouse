const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const UserModel = require("../models/User");
const PostModel = require("../models/Post");

/* GET check username */
router.get("/user", async function (req, res, next) {
  try {
    const { keyword } = req.query;
    let user;
    if (mongoose.Types.ObjectId.isValid(keyword)) {
      user = await UserModel.findOne({
        $or: [
          { _id: mongoose.Types.ObjectId(keyword) },
          { firstName: keyword },
          { email: keyword },
        ],
      });
    } else {
      user = await UserModel.findOne({
        $or: [{ firstName: keyword }, { email: keyword }],
      });
    }
    if (!user) {
      res.send(null);
    }
    res.send(user);
  } catch (err) {
    console.log("Error while get user:", err);
    res.send(null);
  }
});

/* GET search Post by ID */
router.get("/post", async function (req, res) {
  try {
    const { postID } = req.query;
    const post = await PostModel.findOne({
      _id: mongoose.Types.ObjectId(postID),
    });
    if (post) {
      res.send([post]);
      return;
    }
    res.send(null);
  } catch (err) {
    console.log("Error while searching by ID:", err);
    res.send(null);
  }
});

/* PUT change user role */
router.put("/user", checkAuth, async function (req, res, next) {
  try {
    if (req.userData.admin) {
      const { userId, role } = req.query;
      const user = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: { admin: role } },
        { new: true }
      );
      res.send(user);
    } else {
      res.status(401).json({ message: "Not an admin" });
    }
  } catch (err) {
    console.log("Error while updating user:", err);
  }
});

/* DELELTE User */
router.delete("/user", checkAuth, async function (req, res) {
  try {
    if (req.userData.admin) {
      const { userId } = req.query;
      const user = await UserModel.findOneAndDelete({ _id: userId });
      res.send(user);
    } else {
      res.status(401).json({ message: "Not an admin" });
    }
  } catch (err) {
    console.log("Error while updating user:", err);
  }
});

module.exports = router;
