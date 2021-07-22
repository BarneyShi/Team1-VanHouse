var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
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

module.exports = router;
