// https://www.youtube.com/watch?v=8Ip0pcwbWYM
// Accessed July 13, 2021
// Starting from 7:35 of this video, need to add protection to routes:
// adding or editing posts, reviewing/commenting

var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch(err) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}