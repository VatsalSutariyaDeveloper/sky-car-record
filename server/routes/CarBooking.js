const express = require("express");
const router = express.Router();
const CarBookingController = require("../controllers/CarBookingController");

// Apply the middleware to protect these routes
router.post("/", CarBookingController.store);
// router.get("/:id", verifyToken, CarBookingController.show);
// router.put("/:id", verifyToken, CarBookingController.update);
// router.delete("/:id", verifyToken, CarBookingController.delete);

module.exports = router;
