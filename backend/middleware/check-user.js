// // https://www.youtube.com/watch?v=9N7uqbuODqs&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=15
// // cookies
// // Accessed July 13, 2021
//
// const jwt = require("jsonwebtoken");
// let User = require('../models/User');
//
// module.exports = (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         // const token = req.header('auth-token');
//         if (token) {
//             console.log(token);
//             const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//             res.userData = decoded;
//             let user = User.find({email: decoded.email});
//             console.log("res.userdata");
//             console.log(res.userData);
//             res.locals.user = user;
//
//             next();
//         } else {
//             res.status(401).json('Auth failed');
//             res.locals.user = null;
//         }
//     } catch (err) {
//         console.log(err);
//         res.locals.user = null;
//         next();
//     }
// }