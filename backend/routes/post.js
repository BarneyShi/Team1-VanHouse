var express = require("express");
var mongoose = require("mongoose");
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

  try {
    form.parse(req, async (err, fields) => {
      if (err) {
        throw new Error(err);
      }
      const { newComment, userId, username } = fields;

      // New Comment
      const today = getToday();
      let comment = new CommentModel({
        user: userId,
        username,
        text: newComment,
        date: today,
      });
      const savedComment = await comment.save();

      // Update POST comment array
      PostModel.findOneAndUpdate(
        { id: postID },
        { $push: { comment: mongoose.Types.ObjectId(savedComment._id) } }
      )
        .then((res) => console.log("Post's comment array's been updated", res))
        .catch((err) => {
          console.log("Error while update Post", err);
        });
      res.json({ comment, today, user: username, _id: savedComment._id });
    });
  } catch (err) {
    console.log("Error while making a comment ", err);
    next(err);
  }
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
        images,
      } = fields;
      const parsedImgs = JSON.parse(images);
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
          images: parsedImgs,
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
router.put("/:id/vote", async function (req, res, next) {
  const { id: postId } = req.params;
  const { method, userId } = req.query;

  const postObjectId = postId;
  const userObjectId = userId;
  try {
    const { upvote, downvote } = await UserModel.findOne({
      _id: userObjectId,
    });

    let result;
    if (method === "upvote") {
      let vote = upvote.includes(postObjectId) ? -1 : 1;
      result = await PostModel.findOneAndUpdate(
        { _id: postObjectId },
        { $inc: { upvote: vote } },
        { new: true }
      );
      console.log("The upvote is ", postId);
      // Modify user's vote history arrays
      if (vote === 1) {
        await UserModel.findOneAndUpdate(
          { _id: userObjectId },
          { $push: { upvote: postObjectId } }
        );
      } else {
        await UserModel.findOneAndUpdate(
          { _id: userObjectId },
          { $pull: { upvote: postObjectId } }
        );
      }
      // Substract 1 from downvote if user just upvoted
      if (downvote.includes(postObjectId)) {
        result = await PostModel.findOneAndUpdate(
          { _id: postObjectId },
          { $inc: { downvote: -1 } },
          { new: true }
        );
        await UserModel.findOneAndUpdate(
          { _id: userObjectId },
          { $pull: { downvote: postObjectId } }
        );
      }
    } else if (method === "downvote") {
      let vote = downvote.includes(postObjectId) ? -1 : 1;
      result = await PostModel.findOneAndUpdate(
        { _id: postObjectId },
        { $inc: { downvote: vote } },
        { new: true }
      );
      // Modify user's vote history arrays
      if (vote === 1) {
        await UserModel.findOneAndUpdate(
          { _id: userObjectId },
          { $push: { downvote: postObjectId } }
        );
      } else {
        await UserModel.findOneAndUpdate(
          { _id: userObjectId },
          { $pull: { downvote: postObjectId } }
        );
      }
      if (upvote.includes(postObjectId)) {
        result = await PostModel.findOneAndUpdate(
          { _id: postObjectId },
          { $inc: { upvote: -1 } },
          { new: true }
        );
        await UserModel.findOneAndUpdate(
          { _id: userObjectId },
          { $pull: { upvote: postObjectId } }
        );
      }
    }

    res.json({ upvote: result.upvote, downvote: result.downvote });
  } catch (err) {
    console.log("Error while rating ", err);
  }
});

/* GET Check vote */
router.get("/:id/checkvote", async function (req, res, next) {
  const { userId } = req.query;
  const { id: postId } = req.params;
  try {
    const user = await UserModel.findOne({
      _id: mongoose.Types.ObjectId(userId),
    });
    if (!user) {
      throw new Error("User not found");
    }
    const { upvote, downvote } = user;
    console.log("THE USER upvote", upvote);
    res.json({
      upvote: upvote.includes(mongoose.Types.ObjectId(postId)),
      downvote: downvote.includes(mongoose.Types.ObjectId(postId)),
    });
  } catch (err) {
    console.log("Error while checking if the user's rated ", err);
    next(errƒ);
  }
});

/* DELETE Post */
router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    // Delete records in POST document
    const postToDelete = await PostModel.findOneAndDelete({ _id: id });
    // Delete comments of the post
    const { comment } = postToDelete;
    for (let id of comment) {
      const commentToDelete = await CommentModel.findOneAndDelete({
        _id: id,
      });
    }

    res.json({ postToDelete, comment });
  } catch (err) {
    console.log("Error while deleting post and its comments ", err);
    next(err);
  }
});

/* DELETE COMMENT */
router.delete("/:id/comment", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { commentId } = req.query;

    const commentToDelete = await CommentModel.findOneAndDelete({
      _id: commentId,
    });
    const postToUpdate = await PostModel.findOneAndUpdate(
      { _id: id },
      { $pull: { comment: mongoose.Types.ObjectId(commentId) } },
      { new: true }
    );
    res.json(commentToDelete);
  } catch (err) {
    console.log("Error while deleting comment:", err);
  }
});

module.exports = router;
