const express = require("express");
const router = express.Router();
const CarBookingController = require("../controllers/CarBookingController");

router.get("/", CarBookingController.index);
router.post("/", CarBookingController.store);
router.get("/:id", CarBookingController.show);
router.put("/:id", CarBookingController.update);
router.delete("/:id", CarBookingController.delete);    

module.exports = router;
