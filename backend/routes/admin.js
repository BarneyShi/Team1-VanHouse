var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var checkAuth = require("../middleware/check-auth");
var UserModel = require("../models/User");

/* GET check username */
router.get("/user", async function (req, res, next) {
  try {
    const { userId } = req.query;
    const user = await UserModel.findOne({
      _id: mongoose.Types.ObjectId(userId),
    });
    if (!user) {
      throw Error("User not found");
    }
    res.send(user);
  } catch (err) {
    console.log("Error while get username:", err);
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
