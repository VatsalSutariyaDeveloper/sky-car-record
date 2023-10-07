const mongoose = require('mongoose');

const carBookingSchema = new mongoose.Schema(
  {
    carName: {
      type: String,
      required: true,
      unique: true, 
    },
    numberPlate: {
      type: String,
      required: true,
      unique: true, 
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      required: true,
      default: 'Active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('cars', carBookingSchema);
