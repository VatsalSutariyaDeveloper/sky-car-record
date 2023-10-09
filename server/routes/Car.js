const express = require("express");
const router = express.Router();
const CarController = require("../controllers/CarController");

router.get("/car-name", CarController.carNames);
router.get("/number-plate/:carName", CarController.numberPlates);

router.get("/", CarController.index);
router.post("/", CarController.store);
router.get("/:id", CarController.show);
router.put("/:id", CarController.update);
router.delete("/:id", CarController.delete);   


module.exports = router;
