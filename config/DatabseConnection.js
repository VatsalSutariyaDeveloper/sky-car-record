const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sky_car_rental')
  .then(() => console.log('Connected!'))
  .catch(error => console.error('Connection error:', error));