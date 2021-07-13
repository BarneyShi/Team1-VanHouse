var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var checkAuth = require("../middleware/check-auth");

let User = require('../models/User');

// REGISTER USER
// https://www.youtube.com/watch?v=_EP2qCmLzSE
// Accessed July 13, 2021
// the path will be /login-router/register

// https://www.youtube.com/watch?v=7CqJlxBYj-M
// Accessed July 11, 2021

router.post('/register', (req, res) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            // id: req.body.id,
                            email: req.body.email,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            password: hash
                        });
                        user.save()
                            .then((result) => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Successfully registered new user"
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

// DELETE USER
// this 'works' but is not actually deleting from mongo .. prob an issue with primary key
// also we don't need this right now unless we create an admin user that can delete users
router.delete('/deleteUser/:userId', checkAuth, (req, res) => {
    User.deleteOne({id: req.body.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// end of copied code from https://www.youtube.com/watch?v=_EP2qCmLzSE

// LOGIN USER
// https://www.youtube.com/watch?v=0D5EEKH97NA
// Accessed July 11, 2021
router.post('/login', (req, res) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    // could be email or password issue
                    message: 'Auth failed'
                });
            }
            // now need to check password
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        // could be email or password issue
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    // https://www.youtube.com/watch?v=mbsmsi7l3r4
                    const refreshToken = jwt.sign({
                            email: user[0].email,
                            firstName: user[0].firstName
                        },
                        process.env.REFRESH_TOKEN_SECRET);

                    const accessToken = jwt.sign(
                        {
                            email: user[0].email,
                            firstName: user[0].firstName
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: "15m"
                        }
                    );

                    // https://www.youtube.com/watch?v=mbsmsi7l3r4
                    // https://www.youtube.com/watch?v=S-ZIfNuT5H8&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=11
                    // Accessed July 13, 2021
                    // res.json({accessToken: accessToken, refreshToken: refreshToken});
                    res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1800 });

                    res.status(200).json({
                        message: 'Auth successful',
                        token: accessToken
                    });
                }
                res.status(401).json({
                    // could be email or password issue
                    message: 'Auth failed'
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
// end of copied code

// Making refresh tokens
// router.post('/token', (req, res) => {
//     const refreshToken = req.body.token
// })


module.exports = router;
