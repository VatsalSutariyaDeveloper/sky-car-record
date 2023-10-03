const express = require('express')
require('dotenv').config();
require('./config/DatabseConnection');
const app = express()
const carBookingRoute = require('./routes/CarBooking');
const carRoute = require('./routes/Car');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json())
app.use('/uploads', express.static('uploads'));

app.use('/car-booking', carBookingRoute);
app.use('/car', carRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is Running on ${port}`)
})
