var express = require("express");
var router = express.Router();

const Post = require("../models/Post");
const User = require("../models/User");

const v = [
  /V5K/,
  /V5L/,
  /V5M/,
  /V5N/,
  /V5P/,
  /V5R/,
  /V5S/,
  /V5T/,
  /V5V/,
  /V5W/,
  /V5X/,
  /V5Y/,
  /V5Z/,
  /V6A/,
  /V6B/,
  /V6C/,
  /V6E/,
  /V6G/,
  /V6H/,
  /V6J/,
  /V6K/,
  /V6L/,
  /V6M/,
  /V6N/,
  /V6P/,
  /V6R/,
  /V6S/,
  /V6T/,
  /V6Z/,
  /V6X/,
  /V6Y/,
  /V7X/,
  /V7Y/,
];
const l = [/V6V/, /V6W/, /V6X/, /V6Y/, /V7A/, /V7B/, /V7C/, /V7E/];
const b = [
  /V3J/,
  /V3N/,
  /V5A/,
  /V5B/,
  /V5C/,
  /V5E/,
  /V5G/,
  /V5H/,
  /V5J/,
  /V5K/,
];

/* GET home page. */
router.get("/", function (req, res, next) {
  Post.find((err, data) => {
    data.forEach((item) => {
      // console.log("---------------");
      // console.log(item.postalCode);
    });
    res.json(data);
  });
});

router.get("/getpost", function (req, res, next) {
  Post.find((err, data) => {
    res.json(data);
    data.forEach(item => {
      User.findOne({id: item.authorID}, (err, da) => {
        console.log(da);
      })
    })
  });
});

router.get("/price", function (req, res, next) {
  const { high, low } = req.query;
  console.log(low, high);
  Post.find({ price: { $gte: low, $lte: high } }, (err, data) => {
    // console.log(data);
    res.json(data);
  });
});

router.post("/createpost", function (req, res, next) {
  console.log(req.body);
  res.json('---')
});

router.get("/location/:path", function (req, res, next) {
  const location = req.params.path;
  // console.log(location);
  let searchArr = [];
  if (location === "Vancouver") {
    searchArr = v;
  } else if (location === "Burnaby") {
    searchArr = b;
  } else {
    searchArr = l;
  }
  Post.find({ postalCode: { $in: searchArr } }, function (err, data) {
    res.json(data);
  });
});

router.get("/category", function (req, res, next) {
  const { location, high, low } = req.query;
  // console.log(location);
  let searchArr = [];
  if (location === "Vancouver") {
    searchArr = v;
  } else if (location === "Burnaby") {
    searchArr = b;
  } else {
    searchArr = l;
  }
  Post.find(
    { postalCode: { $in: searchArr }, price: { $gte: low, $lte: high } },
    function (err, data) {
      // console.log(data);
      res.json(data);
    }
  );
});

router.get("/user", function (req, res, next) {
  User.find((err, data) => {
    // console.log(data);
    res.json(data);
  })
});

router.get("/userpost/:id", function (req, res, next) {
  // console.log(req.params);
  Post.find({authorID: req.params.id}, (err, data) => {
    res.json(data);
  })
})

module.exports = router;
