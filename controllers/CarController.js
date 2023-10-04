const Car = require('../schema/CarSchama');
const constant = require('../config/Constant');

exports.index = async (req, res) => {
  try {
    const car = await Car.find();
    res.status(200).json({
        message : constant.MSG_FOR_GET_CAR_DATA_SUCCESSFULLY,
        data : car
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.store = async (req, res) => {
  const { fullName, email, phoneNumber, course, hobbies, gender } = req.body;

  const carData = {
    fullName: fullName || '',
    email: email || '',
    phoneNumber: phoneNumber || '',
    course: course || '',
    hobbies: hobbies || '',
    gender: gender || '',
    profileImage: req.file ? req.file.filename : '', // Store the new file name in the database
  };

  try {
    const car = await Car.create(carData);
    res.status(201).json({
        message: constant.MSG_FOR_ADD_CAR_DATA_SUCCEESFULL,
        data:car
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.show = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!Car) {
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
  
  if (req.file) {
    req.body.profileImage = req.file.filename; 
  }
  
  try {
    const updatedCar = await Car.findByIdAndUpdate(id.trim(), req.body, {
      new: true, // Return the updated document
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
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      res.status(404).json({ message: constant.MSG_FOR_CAR_DATA_NOT_FOUND });
    } else {
      res.status(200).json({ message: constant.MSG_FOR_CAR_DATA_DELETE_SUCCEESFULL });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
