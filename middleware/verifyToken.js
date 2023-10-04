const jwt = require("jsonwebtoken");
const Constant = require("../config/Constant");

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, constant.SECRET_TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
}
