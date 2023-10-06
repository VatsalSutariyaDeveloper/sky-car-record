const jwt = require("jsonwebtoken");
const constant = require("../config/Constant");

function verifyToken(req, res, next) {
  const token = req.cookies && req.cookies.jwt;

  if (!token) {
    return res.json({ status: false, message: constant.MSG_FOR_UNAUTHORIZED_USER });
  }

  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (err, decoded) => {
    if (err) {
      return res.json({ status: false, message: constant.MSG_FOR_INVALID_TOKEN });
    }
    return res.json({ status: true, message: constant.MSG_FOR_VALID_TOKEN});
  });
}

module.exports = verifyToken;
