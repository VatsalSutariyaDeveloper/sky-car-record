const Cars = require('../schema/CarSchama');
const constant = require('../config/Constant');
const CarSchama = require('../schema/CarSchama');

exports.index = async (req, res) => {
  try {
    const car = await Cars.find();
    res.status(200).json({
        message : constant.MSG_FOR_GET_CAR_DATA_SUCCESSFULLY,
        data : car
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.store = async (req, res) => {
  const { carName, numberPlate } = req.body;

  try {
    const addCar = await Cars.create({
      carName: carName,
      numberPlate: numberPlate,
    });

    res.status(201).json({
      message: constant.MSG_FOR_BOOKING_SUCCEESFULL,
      data: addCar,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.show = async (req, res) => {
  try {
    const car = await Cars.findById(req.params.id);
    if (!car) {
      res.status(404).json({ message: constant.MSG_FOR_CAR_DATA_NOT_FOUND });
    } else {
        res.status(200).json({
            message : constant.MSG_FOR_GET_CAR_DATA_SUCCESSFULLY,
            data : car
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  
  try {
    const updatedCar = await Cars.findByIdAndUpdate(id.trim(), req.body, {
      new: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ message: constant.MSG_FOR_CAR_DATA_NOT_FOUND });
    }

    res.status(200).json({
        message : constant.MSG_FOR_CAR_DATA_UPDATE_SUCCEESFULL,
        data : updatedCar
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCar = await Cars.findByIdAndDelete(id);
    if (!deletedCar) {
      res.status(404).json({ message: constant.MSG_FOR_CAR_DATA_NOT_FOUND });
    } else {
      res.status(200).json({ message: constant.MSG_FOR_CAR_DATA_DELETE_SUCCEESFULL });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};