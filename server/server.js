const express = require('express')
require('dotenv').config();
require('./config.js');
const app = express()
const carBookingRoute = require('./routes/CarBooking');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json())
app.use('/uploads', express.static('uploads'));

app.use('/car-booking', carBookingRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is Running on ${port}`)
})
