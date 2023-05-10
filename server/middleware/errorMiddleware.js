const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || `there something happened try later`,
  };

  console.log(customError);

  if (err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `this  ${Object.keys(
      err.keyValue
    )} has been registered before`;
  }

  // return res.status(500).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
