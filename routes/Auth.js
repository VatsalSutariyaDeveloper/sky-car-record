const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// router.post("/store", AuthController.store);
router.post("/login", AuthController.login);
// router.get("/show/:id", AuthController.show);
// router.post("/update/:id", AuthController.update);
// router.post("/delete/:id", AuthController.destroy);    


module.exports = router;
