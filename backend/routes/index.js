var express = require("express");
var router = express.Router();
let mongoose = require("mongoose");
const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");
const Schedule = require("../models/Schedule.js");
const User = require("../models/User");
const postCode = require("../util/postCode");

const summaryProj = {_id: 1, id: 1, date: 1, title: 1, price: 1, paymentPeriod: 1, images: {$slice: 1}, author: 1, address: 1};

// Get posts to display on homepage
router.get('/posts', function(req, res) {
  // CITATION: Syntax to just get images[0]: https://joshtronic.com/2020/07/19/how-to-get-the-first-and-last-item-from-an-array-in-mongodb/
  Post.find({}, summaryProj).then((result) => {
    res.send(result);
  }).catch((error) => {
    res.send(error);
  });
});

// Get the details for a particular post including comments and schedule
router.get('/post/:postId', function(req, res) {
  const postId = req.params.postId;
  let dateIds = null;
  let responseData = {postInfo: {}, comments: [], availableDates: []};
  Post.findOne({_id: postId}).then((result) => {
    if (result) {
      responseData.postInfo = result;
      dateIds = result.schedule;
      return Comment.find({_id: {$in: result.comment}});
    } else {
      res.status(404).send({errorMessage: 'Post not found!'});
      return null;
    }
  }).then((comments) => {
    if (comments) {
      responseData.comments = comments;
      return Schedule.find({id: {$in: dateIds}});
    } else {
      return null;
    }
  }).then((dates) => {
    if (dates) {
      responseData.availableDates = dates;
      res.send(responseData);
    }
  }).catch((error) => {
    console.log(error);
    res.send(error);
  });
});

router.get("/search", function(req, res, next){
  const {high, low, location, keyword, userid} = req.query;
  let con = {};
  let numLow = low === "" ? 0 : Number(low);
  if(numLow !== 0){
    con.price = { $gte: numLow};
  }
  if(high !== ""){
    let numHigh = Number(high);
    con.price = { $gte: numLow, $lte: numHigh};
  }
  
  
  let searchArr = [];
  if(location != 'city' && location !== ""){
    if (location === "Vancouver") {
      searchArr = postCode.vancouver;
    } else if (location === "Burnaby") {
      searchArr = postCode.burnaby;
    } else if (location === "Richmond"){
      searchArr = postCode.richmond;
    }
    con.postalCode = {$in:searchArr}
  }

  if(keyword !== ""){
    con.$or = [
      {title :{$regex:keyword, "$options":"i"}},
      {address :{$regex:keyword, "$options":"i"}},
    ];
  }

  if(userid !== ""){
    con.authorID = mongoose.Types.ObjectId(userid);
  }

  // console.log("location is null ", location == null)
  // console.log("con is : ", con)
  // console.log("keyword is : ", "-"+keyword+"-", keyword == null)


  Post.find(con, summaryProj, (err, data) => {
    // console.log(data);
    res.json(data);
  });
});

router.get("/price", function (req, res, next) {
  const { high, low } = req.query;
  Post.find({ price: { $gte: low, $lte: high } }, summaryProj, (err, data) => {
    res.json(data);
  });
});

router.get("/location/:path", function (req, res) {
  const location = req.params.path;
  let searchArr = [];
  if (location === "Vancouver") {
    searchArr = postCode.vancouver;
  } else if (location === "Burnaby") {
    searchArr = postCode.burnaby;
  } else {
    searchArr = postCode.richmond;
  }
  
  Post.find({ postalCode: { $in: searchArr } }, summaryProj, function (err, data) {
    res.json(data);
  });
});

router.get("/category", function (req, res, next) {
  const { location, high, low } = req.query;
  let searchArr = [];
  if (location === "Vancouver") {
    searchArr = postCode.vancouver;
  } else if (location === "Burnaby") {
    searchArr = postCode.burnaby;
  } else {
    searchArr = postCode.richmond;
  }
  Post.find(
    { postalCode: { $in: searchArr }, price: { $gte: low, $lte: high } },
    summaryProj,
    function (err, data) {
      res.json(data);
    }
  );
});

router.get("/user", function (req, res, next) {
  User.find((err, data) => {
    res.json(data);
  });
});

router.get("/userpost/:id", function (req, res, next) {
  Post.find({authorID: mongoose.Types.ObjectId(req.params.id)}, summaryProj, (err, data) => {
    res.json(data);
  });
});

// Add a new property listing to the database
router.post('/newPost', function(req, res) {
  // Map schedule dates to an array of schedule objects
  let datesToSchedule = req.body.schedule;
  let schedule = datesToSchedule.map((d) => {
    const schId = mongoose.Types.ObjectId(); // CITATION: for id creation https://stackoverflow.com/a/17899751
    return {_id: schId, id: schId, users: [], date: d.date}
  });
  
  // Create id for postInfo
  let reqPostInfo = req.body;
  const reqId = mongoose.Types.ObjectId(); // CITATION: for id creation https://stackoverflow.com/a/17899751
  reqPostInfo._id = reqId;
  reqPostInfo.id = reqId;
  
  // Set postInfo schedule data to the appropriate ids
  reqPostInfo.schedule = schedule.map((d) => {return d._id;});
  let postToAdd = new Post(reqPostInfo);

  // Add scheduled dates and posts to db
  Schedule.insertMany(schedule).then(() => {
    return postToAdd.save();
  }).then((result) => {
    res.status(201).send(result);
  }).catch((error) => {
    res.send(error);
  });
});

module.exports = router;
