const mongoose = require('mongoose');
const URL = process.env.DATABASE
mongoose.connect(URL)
  .then(() => console.log('Connected!'))
  .catch(error => console.error('Connection error:', error));