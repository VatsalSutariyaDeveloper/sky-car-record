const mongoose = require('mongoose');
const URL = process.env.DATABASE;

// Define options with useNewUrlParser set to true
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // Other connection options...
};

mongoose.connect(URL, options)
  .then(() => console.log('Connected!'))
  .catch(error => console.error('Connection error:', error));
