const express = require("express");
const router = express.Router();
const CarBookingController = require("../controllers/CarBookingController");
const {upload} = require("../helpers/image-upload");

router.get("/", CarBookingController.index);
router.post("/store", upload.any(), CarBookingController.store);
router.get("/show/:id", CarBookingController.show);
router.post("/update/:id", CarBookingController.update);
// router.post("/delete/:id", CarBookingController.destroy);


module.exports = router;
