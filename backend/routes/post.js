var express = require("express");
var router = express.Router();
var PostModel = require("../models/Post");
var ScheduleModel = require("../models/Schedule");
var CommentModel = require("../models/Comment");

/* GET post detail */
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    const post = await PostModel.findOne({ id });

    const { schedule: scheduleID, comment: commentID } = post;
    const schedule = await ScheduleModel.findOne({ id: scheduleID });
    const comment = await CommentModel.findOne({ id: commentID });

    res.send({ post, schedule, comment });
  } catch (err) {
    console.log("Error while fetching post detail. ", err);
  }
});

module.exports = router;
