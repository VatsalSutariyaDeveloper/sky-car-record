const express = require("express");
const router = express.Router();
const CarController = require("../controllers/CarController");

router.get("/", CarController.index);
router.post("/store", CarController.store);
router.get("/show/:id", CarController.show);
router.post("/update/:id", CarController.update);
router.post("/delete/:id", CarController.delete);    

router.get("/car-name", CarController.carNames);
router.get("/number-plate", CarController.numberPlates);

module.exports = router;
