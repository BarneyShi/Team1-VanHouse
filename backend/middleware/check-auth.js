// https://www.youtube.com/watch?v=8Ip0pcwbWYM
// Accessed July 13, 2021

// https://www.youtube.com/watch?v=mbsmsi7l3r4
// Accessed July 13, 2021

// https://www.youtube.com/watch?v=9N7uqbuODqs&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=15
// cookies
// Accessed July 13, 2021

// https://www.youtube.com/watch?v=2jqok-WgelI
// headers
// Accessed July 13, 2021

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userData = decoded;
    req.isAuth = true;

    next();
  } catch (err) {
    res.status(400).json({
      message: "Invalid token",
    });
    req.isAuth = false;

    next();
  }
};
