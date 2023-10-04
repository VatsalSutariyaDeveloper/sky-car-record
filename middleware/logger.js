const constant = require("../config/Constant");
const { ApiLogs } = require("../models");
const winston = require("winston"); // Import the Winston logger library

// Create a logger instance
const logger = winston.createLogger({
  level: "info", // Set the logging level
  format: winston.format.json(), // Use JSON format for log messages
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: "combined.log" }), // Log to a file
  ],
});

const ApiLog = async (req, res, next) => {
  try {
    const { method, originalUrl, params, body, headers } = req;

    const logData = {
      v_api_path: originalUrl,
      v_api_version: headers["api-version"],
      e_api_method: method,
      j_req_parameter: JSON.stringify({
        params,
        body,
      }),
      i_user_id: headers["user-id"] || null,
      v_device_token: headers["device-token"] || null,
      e_device_type: headers["device-type"] || null,
      d_start_time: new Date(),
    };

    const apiLogEntry = await ApiLogs.create(logData);

    res.once("finish", async () => {
      apiLogEntry.d_end_time = new Date();
      await apiLogEntry.save();
    });

    next();
  } catch (error) {
    // Use the logger to log the error
    logger.error(constant.MSG_FOR_API_ACCESS_ERROR, error);
    next(error);
  }
};

module.exports = {
  ApiLog,
};
