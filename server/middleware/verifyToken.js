const jwt = require("jsonwebtoken");
const constant = require("../config/Constant");
const User = require('../schema/UserSchema');

function verifyToken(req, res, next) {
  const token = req.cookies && req.cookies.jwt;

  if (!token) {
    return res.json({ status: false, message: "No token provided" });
  }

  jwt.verify(token, constant.SECRET_TOKEN_KEY, async (err, decoded) => {
    if (err) {
      return res.json({ status: false, message: "Invalid token" });
    }
    return res.json({ status: true, });
  });
}

module.exports = verifyToken;
