var express = require("express");
var formidable = require("formidable");
var { v4: uuid } = require("uuid");
var router = express.Router();
var PostModel = require("../models/Post");
var ScheduleModel = require("../models/Schedule");
var CommentModel = require("../models/Comment");
var getToday = require("../util/util").getToday;

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

/* POST comment */
router.post("/:id/comment", function (req, res, next) {
  const { id: postID } = req.params;
  // Disclaim: Code snippets from https://www.npmjs.com/package/formidable#readme
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields) => {
    if (err) {
      console.log("Error while creating a comment", err);
      next(err);
      return;
    }
    const { newComment } = fields;
    const commentID = uuid();

    // New Comment
    const today = getToday();
    let comment = new CommentModel({
      id: commentID,
      user: "user_0",
      text: newComment,
      date: today,
    });
    comment
      .save()
      .then((res) => console.log("New comment has been made", res))
      .catch((err) => {
        console.log("Error while making a new comment", err);
      });
    // Update POST comment array
    PostModel.findOneAndUpdate(
      { id: postID },
      { $push: { comment: commentID } }
    ).then((res) =>
      console.log("Post's comment array's been updated", res).catch((err) => {
        console.log("Error while update Post", err);
      })
    );
    res.json({ comment, today, user: "user_0" });
  });
});

module.exports = router;
