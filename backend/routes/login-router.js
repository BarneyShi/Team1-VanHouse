var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var checkAuth = require("../middleware/check-auth");
// var checkUser = require("../middleware/check-user");
var crypto = require("crypto");
var nodemailer = require("nodemailer");

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
        })
        .catch(err => {
            return res.status(409).json({
                message: "Email already exists"
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
                    // const refreshToken = jwt.sign({
                    //         email: user[0].email,
                    //         firstName: user[0].firstName
                    //     },
                    //     process.env.REFRESH_TOKEN_SECRET);

                    const accessToken = jwt.sign(
                        {
                            userId: user[0]._id,
                            email: user[0].email,
                            firstName: user[0].firstName,
                            lastName: user[0].lastName
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
                    res.cookie('jwt', accessToken,
                        {
                            httpOnly: true,
                            maxAge: 180000
                        });
                    res.setHeader('auth-token', accessToken);
                    let sendUser = {
                        userId: user[0]._id,
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                        email: user[0].email
                    };
                    return res.status(200).json(sendUser);
                }
                res.status(401).json('Auth failed');
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

// LOGOUT USER
router.post('/logout', (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json('Cookie deleted.');
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

// FORGOT PASSWORD
// https://www.youtube.com/watch?v=NOuiitBbAcU
// Accessed Jul 27, 2021
router.post('/forgot', (req, res) => {
    console.log("we are in backend of forgot");
    User.find({email: req.body.forgotEmail})
        .exec()
        .then((user) => {
            console.log(user);
            if (user.length < 1) {
                return res.status(401).json({
                    message: "User not found."
                });
            }
            const token = crypto.randomBytes(20).toString('hex');
            user[0].updateOne({
                resetToken: token,
                expireToken: Date.now() + 3600000,
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: `vanhouse455@gmail.com`,
                to: `${user[0].email}`,
                subject: `Link to reset password`,
                text:
                    `You requested a password reset for your account. \n\n` +
                    `Please click on the following link within one hour of receiving this email: \n\n` +
                    `http://localhost:4000/resetPassword/${token}\n\n` +
                    `If you did not request this, please ignore this email and your password will remain unchanged. \n`,
            };

            console.log("Sending email");

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error("There was an error: ", err);
                } else {
                    console.log("Here is the response: ", response);
                    res.status(200).json({
                        message: "Recovery email sent."
                    });
                }
            });
        })
        .catch((err) => {
            console.log("Error in sending email");
            console.log(err);
        });
});


// FOR TESTING CHECK-AUTH MIDDLEWARE
router.get('/account', checkAuth, (req, res) => {
    console.log("GET authenticated userData");
    console.log(req.userData);
    try {
        return res.status(200).json(req.userData);
    } catch (err) {
        return res.status(500).json({error: err});
    }
});

// Making refresh tokens
// router.post('/token', (req, res) => {
//     const refreshToken = req.body.token
// })


module.exports = router;
