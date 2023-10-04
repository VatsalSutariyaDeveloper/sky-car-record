const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken);
router.post("/login", AuthController.login);


module.exports = router;
