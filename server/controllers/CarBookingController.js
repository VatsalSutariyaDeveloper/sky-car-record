const CarBooking = require('../schema/CarBookingSchema');
const constant = require('../config/Constant');

exports.index = async (req, res) => {
  try {
    const carBooking = await CarBooking.find();
    res.status(200).json({
      status: true,
      message: constant.MSG_FOR_GET_BOOKING_DATA_SUCCESSFULLY,
      data: carBooking
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.store = async (req, res) => {
  const { clientName, dealerName, carName, numberPlate, price, destination, bookingDate, returnDate } = req.body;

  const carBookingData = {
    clientName: clientName,
    dealerName: dealerName,
    carName: carName,
    numberPlate: numberPlate,
    price: price,
    destination: destination,
    bookingDate: bookingDate,
    returnDate: returnDate,
  };

  try {
    const carBooking = await CarBooking.create(carBookingData);
    res.status(201).json({
      status: true,
      message: constant.MSG_FOR_BOOKING_SUCCEESFULL,
      data: carBooking,
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.show = async (req, res) => {
  try {
    const carBooking = await CarBooking.findById(req.params.id);
    res.status(201).json({
      status: true,
      message: constant.MSG_FOR_GET_BOOKING_DATA_SUCCESSFULLY,
      data: carBooking
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;

  if (req.file) {
    req.body.profileImage = req.file.filename;
  }

  try {
    const updatedCarBooking = await CarBooking.findByIdAndUpdate(id.trim(), req.body, {
      new: true, // Return the updated document
    });

    if (!updatedCarBooking) {
      return res.json({ status: false, message: constant.MSG_FOR_BOOKING_NOT_FOUND });
    }

    res.status(200).json({
      status: true,
      message: constant.MSG_FOR_BOOKING_UPDATE_SUCCEESFULL,
      data: updatedCarBooking
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCarBooking = await CarBooking.findByIdAndDelete(id);
    if (!deletedCarBooking) {
      res.json({ status: false, message: constant.MSG_FOR_BOOKING_NOT_FOUND });
    } else {
      res.status(200).json({ status: true, message: constant.MSG_FOR_BOOKING_DELETE_SUCCEESFULL });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
