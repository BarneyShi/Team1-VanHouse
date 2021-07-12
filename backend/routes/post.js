var express = require("express");
var formidable = require("formidable");
var { v4: uuid } = require("uuid");
var router = express.Router();
var PostModel = require("../models/Post");
var ScheduleModel = require("../models/Schedule");
var CommentModel = require("../models/Comment");
var UserModel = require("../models/User");

var getToday = require("../util/util").getToday;
var getCoords = require("../util/util").getCoordinates;

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

/* GET coords */
router.get("/:id/coords", async function (req, res, next) {
  const { location } = req.query;

  try {
    const coords = await getCoords(location);
    res.json(coords);
  } catch (err) {
    console.log("Error while fetch coordinates ", err);
  }
});

/* PUT post */
router.put("/:id/edit", function (req, res, next) {
  const { id } = req.params;
  // Disclaim: Code snippets from https://www.npmjs.com/package/formidable#readme
  const form = formidable({ multiples: true });

  try {
    form.parse(req, async (err, fields) => {
      if (err) {
        throw new Error(err);
      }
      const {
        title,
        email,
        phone,
        address,
        postalCode,
        price,
        paymentPeriod,
        leaseLength,
        bedrooms,
        bathrooms,
        sqft,
        utilities,
        pets,
        laundry,
        furnished,
      } = fields;
      const updatedPost = await PostModel.findOneAndUpdate(
        { id },
        {
          title,
          email,
          phone,
          address,
          postalCode,
          price,
          paymentPeriod,
          leaseLength,
          bedrooms,
          bathrooms,
          sqft,
          utilities,
          pets,
          laundry,
          furnished,
        },
        { new: true }
      );
      res.json(updatedPost);
    });
  } catch (err) {
    console.log("Error while updating post ", err);
    next(err);
  }
});

/* PATCH rating */
router.patch("/:id/vote", async function (req, res, next) {
  const { id } = req.params;
  const { method } = req.query;

  try {
    const user = "user_1";
    const { upvote, downvote } = await UserModel.findOne({ id: user });

    let result;
    if (method === "upvote") {
      let vote = upvote.includes(id) ? -1 : 1;
      result = await PostModel.findOneAndUpdate(
        { id },
        { $inc: { upvote: vote } },
        { new: true }
      );
      console.log("The result is ", result.upvote);
      // Modify user's vote history arrays
      if (vote === 1) {
        await UserModel.findOneAndUpdate(
          { id: user },
          { $push: { upvote: id } }
        );
      } else {
        await UserModel.findOneAndUpdate(
          { id: user },
          { $pull: { upvote: id } }
        );
      }
      // Substract 1 from downvote if user just upvoted
      if (downvote.includes(id)) {
        result = await PostModel.findOneAndUpdate(
          { id },
          { $inc: { downvote: -1 } },
          { new: true }
        );
        await UserModel.findOneAndUpdate(
          { id: user },
          { $pull: { downvote: id } }
        );
      }
    } else if (method === "downvote") {
      let vote = downvote.includes(id) ? -1 : 1;
      result = await PostModel.findOneAndUpdate(
        { id },
        { $inc: { downvote: vote } },
        { new: true }
      );
      // Modify user's vote history arrays
      if (vote === 1) {
        await UserModel.findOneAndUpdate(
          { id: user },
          { $push: { downvote: id } }
        );
      } else {
        await UserModel.findOneAndUpdate(
          { id: user },
          { $pull: { downvote: id } }
        );
      }
      if (upvote.includes(id)) {
        result = await PostModel.findOneAndUpdate(
          { id },
          { $inc: { upvote: -1 } },
          { new: true }
        );
        await UserModel.findOneAndUpdate(
          { id: user },
          { $pull: { upvote: id } }
        );
      }
    }

    res.json({ upvote: result.upvote, downvote: result.downvote });
  } catch (err) {
    console.log("Error while rating ", err);
  }
});

/* DELETE Post */
router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    // Delete records in POST document
    const postToDelete = await PostModel.findOneAndDelete({ id });
    // Delete comments of the post
    const { comment } = postToDelete;
    for (let id of comment) {
      const commentToDelete = await CommentModel.findOneAndDelete({
        id,
      });
    }

    res.json(postToDelete);
  } catch (err) {
    console.log("Error while deleting post and its comments ", err);
    next(err);
  }
});

module.exports = router;
