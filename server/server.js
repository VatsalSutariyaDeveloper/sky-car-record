const express = require('express');
require('dotenv').config();
require('./config/DatabseConnection');
const carBookingRoute = require('./routes/CarBooking');
const authRoute = require('./routes/Auth');
const carRoute = require('./routes/Car');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

// Define CORS options
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

// Use the CORS middleware with the defined options
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/car-booking', carBookingRoute);
app.use('/auth', authRoute);
app.use('/car', carRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
