const express = require('express');
require('dotenv').config();
require('./config/DatabseConnection'); // Assuming this is the correct path
const app = express();
const carBookingRoute = require('./routes/CarBooking');
const authRoute = require('./routes/Auth');
const carRoute = require('./routes/Car');
const cors = require('cors');
const jwt = require('jsonwebtoken'); 
const verifyToken = require("./middleware/verifyToken");

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/car-booking', carBookingRoute);
app.use('/auth', authRoute);
app.use('/car', carRoute);

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json({ auth: false, message: "Token not provided" });
    }

    jwt.verify(token, "jwtSecret", (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: "Failed to authenticate" });
        }

        req.userId = decoded.id;
        next();
    });
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send("Yo, you are authenticated! Congrats!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
