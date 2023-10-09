const Cars = require('../schema/CarSchama');
const constant = require('../config/Constant');
const CarSchama = require('../schema/CarSchama');

exports.index = async (req, res) => {
  try {
    const car = await Cars.find();
    res.status(200).json({
      status: true,
      message: constant.MSG_FOR_GET_CAR_DATA_SUCCESSFULLY,
      data: car
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
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
      status: true,
      message: constant.MSG_FOR_BOOKING_SUCCEESFULL,
      data: addCar,
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};


exports.show = async (req, res) => {
  try {
    const car = await Cars.findById(req.params.id);
    if (!car) {
      res.json({ status: FontFaceSetLoadEvent, message: constant.MSG_FOR_CAR_DATA_NOT_FOUND });
    } else {
      res.status(200).json({
        status: true,
        message: constant.MSG_FOR_GET_CAR_DATA_SUCCESSFULLY,
        data: car
      });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCar = await Cars.findByIdAndUpdate(id.trim(), req.body, {
      new: true,
    });

    if (!updatedCar) {
      return res.json({ status: false, message: constant.MSG_FOR_CAR_DATA_NOT_FOUND });
    }

    res.status(200).json({
      status: true,
      message: constant.MSG_FOR_CAR_DATA_UPDATE_SUCCEESFULL,
      data: updatedCar
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCar = await Cars.findByIdAndDelete(id);
    if (!deletedCar) {
      res.json({ status: false, message: constant.MSG_FOR_CAR_DATA_NOT_FOUND });
    } else {
      res.status(200).json({ message: constant.MSG_FOR_CAR_DATA_DELETE_SUCCEESFULL });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.carNames = async (req, res) => {
  try {
    const cars = await Cars.find({}, 'carName'); 
    const carNames = cars.map((car) => car.carName);
    res.status(200).json({
      status: true,
      message: constant.MSG_FOR_GET_CAR_NAMES_SUCCESSFULLY,
      data: carNames,
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.numberPlates = async (req, res) => {
  try {
    const cars = await Cars.find(req.params.carName, 'numberPlate');
    const numberPlate = cars.length > 0 ? cars[0].numberPlate : null;

    if (numberPlate) {
      res.status(200).json({
        status: true,
        message: constant.MSG_FOR_GET_NUMBER_PLATES_SUCCESSFULLY,
        data: numberPlate,
      });   
    } else {
      // Handle the case where there are no matching cars     
      res.json({
        status: false,
        message: constant.MSG_FOR_CAR_NOT_FOUND_AND_NUMBER_PLATE_NOT_EXIST,
      });   
    }
  } catch (error) {
    resjson({ status: false, message: error.message });
  }
};

