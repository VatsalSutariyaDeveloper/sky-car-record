const User = require('../schema/UserSchema');
const constant = require('../config/Constant');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// exports.store = async (req, res) => {
//     const { userName, email, phone, password } = req.body;

//     try {
//         const Users = await User.create({
//             userName: userName,
//             email: email,
//             phone: phone,
//             password: password,
//         });

//         res.status(201).json({
//             message: constant.MSG_FOR_BOOKING_SUCCEESFULL,
//             data: Users
//         });

//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

exports.login = async (req, res) => {
    const { userName, password } = req.body;
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
  
      // Create and sign a JWT token
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h", // Token expires in 1 hour
      });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };