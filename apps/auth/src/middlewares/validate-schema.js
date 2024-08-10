const { StatusCodes } = require('http-status-codes');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        msg: error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
        })),
        data: null,
      });
    }
    next();
  };
};

module.exports = validate;
