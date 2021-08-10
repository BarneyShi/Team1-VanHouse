var express = require("express");
var router = express.Router();
let mongoose = require("mongoose");
const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");
const Schedule = require("../models/Schedule.js");
const User = require("../models/User");
const postCode = require("../util/postCode");
const checkAuth = require("../middleware/check-auth");

// Projection to retrieve only relevant post data on homepage
// CITATION: Syntax to just get images[0]: https://joshtronic.com/2020/07/19/how-to-get-the-first-and-last-item-from-an-array-in-mongodb/
const summaryProj = {
  _id: 1,
  id: 1,
  date: 1,
  title: 1,
  price: 1,
  paymentPeriod: 1,
  mainImage: 1,
  author: 1,
  address: 1,
};

// Search the Posts cluster for documents
// CITATION: I learned the sort, skip, and limit functions here: https://docs.mongodb.com/manual/reference/method/cursor.skip/
const findPostsByPage = async (params, projection, pageSize, pageOffset) => {
  let page = parseInt(pageSize);
  let offset = parseInt(pageOffset);
  const res = await Post.find(params, projection)
    .sort({ date: -1, _id: 1 })
    .skip(page * offset)
    .limit(page)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return res;
};

// Get the most recent posts to display on homepage and reset pageOffset
router.get("/posts", function (req, res) {
  const { pageSize, pageOffset } = req.query;
  findPostsByPage(
    {},
    summaryProj,
    parseInt(pageSize),
    parseInt(pageOffset)
  ).then((result) => {
    res.send(result);
  });
});

// Get the details for a particular post including comments and schedule
router.get("/post/:postId", function (req, res) {
  const postId = req.params.postId;
  let dateIds = null;
  let responseData = { postInfo: {}, comments: [], availableDates: [] };
  Post.findOne({ _id: postId })
    .then((result) => {
      if (result) {
        responseData.postInfo = result;
        dateIds = result.schedule;
        return Comment.find({ _id: { $in: result.comment } });
      } else {
        res.status(404).send({ errorMessage: "Post not found!" });
        return null;
      }
    })
    .then((comments) => {
      if (comments) {
        responseData.comments = comments;
        return Schedule.find({ _id: { $in: dateIds } });
      } else {
        return null;
      }
    })
    .then((dates) => {
      if (dates) {
        responseData.availableDates = dates;
        res.send(responseData);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/search", function (req, res, next) {
  const { high, low, location, keyword, userid, pageSize, pageOffset } =
    req.query;
  let con = {};
  let numLow = low === "" ? 0 : Number(low);
  if (numLow !== 0) {
    con.price = { $gte: numLow };
  }
  if (high !== "") {
    let numHigh = Number(high);
    con.price = { $gte: numLow, $lte: numHigh };
  }

  let searchArr = [];
  if (location != "city" && location !== "") {
    if (location === "Vancouver") {
      searchArr = postCode.vancouver;
    } else if (location === "Burnaby") {
      searchArr = postCode.burnaby;
    } else if (location === "Richmond") {
      searchArr = postCode.richmond;
    }
    con.postalCode = { $in: searchArr };
  }

  if (keyword !== "") {
    con.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { address: { $regex: keyword, $options: "i" } },
    ];
  }

  if (userid !== "") {
    con.authorID = mongoose.Types.ObjectId(userid);
  }

  findPostsByPage(con, summaryProj, pageSize, pageOffset).then((result) => {
    res.send(result);
  });
});

router.get("/user", function (req, res, next) {
  User.find((err, data) => {
    res.json(data);
  });
});

router.get("/userpost/:id", function (req, res, next) {
  const authorID = { authorID: mongoose.Types.ObjectId(req.params.id) };
  const { pageSize, pageOffset } = req.query;
  findPostsByPage(authorID, summaryProj, pageSize, pageOffset).then(
    (result) => {
      res.send(result);
    }
  );
});

// Add a new property listing to the database
router.post("/newPost", checkAuth, function (req, res) {
  let datesToSchedule = req.body.schedule;
  let schedule = datesToSchedule.map((d) => {
    const schId = mongoose.Types.ObjectId(); // CITATION: for id creation https://stackoverflow.com/a/17899751
    return { _id: schId, id: schId, users: [], date: d.date };
  });

  // Create id for postInfo
  let reqPostInfo = req.body;
  const reqId = mongoose.Types.ObjectId(); // CITATION: for id creation https://stackoverflow.com/a/17899751
  reqPostInfo._id = reqId;
  reqPostInfo.id = reqId;

  // Set postInfo schedule data to the appropriate ids
  reqPostInfo.schedule = schedule.map((d) => {
    return d._id;
  });
  let postToAdd = new Post(reqPostInfo);

  // Add scheduled dates and posts to db
  Schedule.insertMany(schedule)
    .then(() => {
      return postToAdd.save();
    })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

// Serve the homepage
router.get("/", function (req, res) {
  const publicPath = path.join(__dirname, "../../vanhouse", "build");
  res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = router;
