const mongoose = require('mongoose');
const constant = require('../config/Constant');

mongoose.connect(process.env.DB_URL)
  .then(() => console.log(constant.MSG_FOR_CONNECTION_SUCCESSFUL))
  .catch(error => console.error(constant.MSG_FOR_CONNECTION_ERROR, error));