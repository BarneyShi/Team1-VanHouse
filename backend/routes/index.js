var express = require("express");
var router = express.Router();
const post = require("../models/Post.js");
const comment = require("../models/Comment.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello world!");
});

// Get posts to display on homepage
router.get('/posts', function(req, res) {
  // CITATION: Syntax to just get images[0]: https://joshtronic.com/2020/07/19/how-to-get-the-first-and-last-item-from-an-array-in-mongodb/
  const query = {id: 1, date: 1, title: 1, price: 1, images: {$slice: 1}, author: 1, address: 1};
  post.find({}, query).then((result) => {
    res.send(result);
  }).catch((error) => {
    res.send(error);
  });
});

// Get the details for a particular post including comments and schedule
router.get('/post/:postId', function(req, res) {
  const postId = req.params.postId;
  let responseData = {postInfo: {}, comments: []};
  post.findOne({id: postId}).then((result) => {
    if (result) {
      responseData.postInfo = result;
      return comment.find({id: {$in: result.comment}});
    } else {
      res.status(404).send({errorMessage: 'Post not found!'});
      return null;
    }
  }).then((comments) => {
    if (comments) {
      responseData.comments = comments;
      res.send(responseData);
    }
  }).catch((error) => {
    console.log(error);
  });
});

module.exports = router;
