const APIError = require("../error.class");
const logger = require("../logger.config");

const errorHandler = (error, req, res, next) => {
  if (error instanceof APIError) {
    res.status(error.statusCode).json({ success: false, error: error.message });
    logger.log({
      level: "error",
      message: error.log,
      methodName: error.methodName,
      stack: error.stack,
    });
    console.log(error.stack);
    logger.log();
    next();
  } else {
    logger.log({ level: "error", message: error.message, stack: error.stack });
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = errorHandler;
