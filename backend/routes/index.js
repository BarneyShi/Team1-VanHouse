var express = require("express");
var router = express.Router();

const Post = require("../models/Post");
const User = require("../models/User");
const postCode = require("../routes/postCode");


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
