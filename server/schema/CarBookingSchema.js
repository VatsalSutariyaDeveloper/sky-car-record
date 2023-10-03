const mongoose = require('mongoose');

const carBookingSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    dealerName: {
        type: String,
        required: true
    },
    carName: {
        type: String,
        required: true
    },
    numberPlate: {
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
    bookingDate: {
        type: Date,
        required: true
    },
    returnDate: {
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
    { 
        timestamps: true ,
        versionKey: false
    }
);

module.exports = mongoose.model('car_bookings', carBookingSchema);
