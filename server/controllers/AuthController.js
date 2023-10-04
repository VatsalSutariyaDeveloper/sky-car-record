const User = require('../schema/UserSchema');
const constant = require('../config/Constant');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const creatToken = (id, maxAge) => {
  return jwt.sign({id},constant.SECRET_TOKEN_KEY,{
    expiresIn:maxAge
  })
} 

exports.login = async (req, res) => {
    const { userName, password, rememberMe } = req.body;
    try {
      // Find the user by username
      const user = await User.findOne({ userName });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
        const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const maxAge = rememberMe == false ? 50 * 365 * 24 * 60 * 60 : 5 * 24 * 60 * 60;

      const token = creatToken(user._id, maxAge)
      res.cookie("jwt", token, {
        withCrdentials:true,
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      res.status(200).json({ user: user._id, created:true });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };