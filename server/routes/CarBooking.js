const express = require("express");
const router = express.Router();
const CarBookingController = require("../controllers/CarBookingController");

// Apply the middleware to protect these routes
router.get("/", CarBookingController.index);
router.post("/", CarBookingController.store);
router.put("/:id", CarBookingController.update);
router.delete("/:id", CarBookingController.delete);

module.exports = router;
