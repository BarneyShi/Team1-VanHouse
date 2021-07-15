var express = require("express");
var router = express.Router();

// let User = require('../models/User');

/* GET home page. */
router.get("/", function (req, res, next) {
    res.send("Hello world!");
});
// router.get('/', (req, res, next) => {
//     if(res.locals && res.locals.user) {
//         res.render('login-router');
//     }
// })

// // https://www.youtube.com/watch?v=7CqJlxBYj-M
// // Accessed July 11, 2021
// router.route("/").get((req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json(err));
// });
//
// router.route("/add").post((req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const newUser = new User({
//         email,
//         password,
//         firstName,
//         lastName,
//     });
//
//     newUser.save()
//         .then(() => {
//             res.json('Registered.');
//         })
//         .catch((err) => {
//             res.status(400).json(err);
//         });
// });


module.exports = router;
