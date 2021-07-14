// https://www.youtube.com/watch?v=8Ip0pcwbWYM
// Accessed July 13, 2021
// Starting from 7:35 of this video, need to add protection to routes:
// adding or editing posts, reviewing/commenting

// https://www.youtube.com/watch?v=mbsmsi7l3r4
// Accessed July 13, 2021

// https://www.youtube.com/watch?v=9N7uqbuODqs&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=15
// cookies
// Accessed July 13, 2021

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userData = decoded;
        req.isAuth = true;
        req.userFirstName = decoded.firstName;

        next();
    } catch (err) {
        window.alert('Please login to continue')
        res.status(401).json({
            message: 'Auth failed'
        });
        next();
    }
}