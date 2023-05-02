// const errHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode ? res.statusCode : 500;

//   res.status(statusCode);

//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });

//   next();
// };

// module.exports = {
//   errHandler,
// };

const { StatusCodes } = require("http-status-codes");

const middlewareErrorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || `there something happened try later`,
  };

  if (err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `this  ${Object.keys(
      err.keyValue
    )} has been registered before`;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = middlewareErrorHandler;
