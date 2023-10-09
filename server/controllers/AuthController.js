const User = require('../schema/UserSchema');
const constant = require('../config/Constant');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const creatToken = (id, maxAge) => {
  return jwt.sign({id},process.env.SECRET_TOKEN_KEY,{
    expiresIn:maxAge
  })
} 

exports.login = async (req, res) => {
    const { userName, password, rememberMe } = req.body;
    try {
      // Find the user by username
      const user = await User.findOne({ userName });

      if (!user) {
        return res.json({ status:false, message: constant.MSG_FOR_USER_NOT_FOUND });
      }
        const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.json({ status:false, message: constant.MSG_FOR_WRONG_PASSWORD });
      }
  
      const maxAge = rememberMe == false ? 5 * 24 * 60 * 60 : 50 * 365 * 24 * 60 * 60;
      
      const token = creatToken(user._id, maxAge)
      res.cookie("jwt", token, {
        withCrdentials:true,
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      res.status(200).json({ status:true, user: user._id, created:true });
    } catch (error) {
      res.json({ status:false, message: constant.MSG_FOR_INTERNAL_SERVER_ERROR, error:error });
    }
  };


  exports.resetPassword = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });

        if (!user) {
            return res.json({ status:false, message: constant.MSG_FOR_USER_NOT_FOUND });
        }
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ status:true, message: constant.MSG_FOR_PASSEORD_RESET_SUCCESSFULL });
    } catch (error) {
        res.json({ status:false, message: constant.MSG_FOR_INTERNAL_SERVER_ERROR, error:error });
    }
};
