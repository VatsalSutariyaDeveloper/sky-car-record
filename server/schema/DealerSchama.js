const mongoose = require('mongoose');

const carBookingSchema = new mongoose.Schema({
    dealer_name: {
        type: String,
        required: true
    },
    number_plate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true,
        default: 'Active'
    }
},
    { timestamps: true },
    { versionKey: false }
);
module.exports = mongoose.model('car_bookings', carBookingSchema);
