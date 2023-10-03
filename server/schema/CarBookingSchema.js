const mongoose = require('mongoose');

const carBookingSchema = new mongoose.Schema({
    client_name: {
        type: String,
        required: true
    },
    dealer_name: {
        type: String,
        required: true
    },
    car_name: {
        type: String,
        required: true
    },
    number_plate: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    booking_date: {
        type: Date,
        required: true
    },
    return_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Complate'],
        required: true,
        default: 'Active'
    }
},
    { timestamps: true },
    { versionKey: false }
);

module.exports = mongoose.model('car_bookings', carBookingSchema);
