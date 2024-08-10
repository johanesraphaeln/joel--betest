const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'INTERNAL_SERVER_ERROR',
  };
  return res.status(customError.statusCode).json({
    status: customError.statusCode,
    msg: customError.msg,
    data: null,
  });
};

module.exports = errorHandlerMiddleware;
